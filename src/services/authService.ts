import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signOut, 
  User 
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';
import { ROLE_MAPPINGS, getRoleForEmail } from '../roleConfig.js';

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

// Configure Google Auth Provider with Scopes
export const provider = new GoogleAuthProvider();
export const SCOPES = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile'
];
SCOPES.forEach((scope) => provider.addScope(scope));

// Optional prompt to ensure account selector
provider.setCustomParameters({
  prompt: 'select_account'
});

export type UserRole = 'student' | 'cr' | 'faculty' | 'hod';

export interface NITRRUserProfile {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  role: UserRole;
}

export const fetchUserRole = async (email: string): Promise<UserRole> => {
  if (!email) return 'student';
  const roleFromConfig = getRoleForEmail(email);
  if (roleFromConfig !== 'student') {
    return roleFromConfig;
  }
  try {
    const res = await fetch(`/api/user-role?email=${encodeURIComponent(email)}`);
    if (res.ok) {
      const data = await res.json();
      return (data.role as UserRole) || roleFromConfig;
    }
  } catch (e) {
    console.error('Failed to fetch user role', e);
  }
  return roleFromConfig;
};

export const updateUserRoleAPI = async (email: string, role: UserRole): Promise<UserRole> => {
  try {
    const res = await fetch('/api/user-role', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, role })
    });
    if (res.ok) {
      const data = await res.json();
      return data.user.role as UserRole;
    }
  } catch (e) {
    console.error('Failed to update role', e);
  }
  return role;
};

// In-memory access token cache (NOT in localStorage/sessionStorage as required)
let cachedAccessToken: string | null = null;
let isSigningIn = false;

/**
 * Institute domain validator:
 * Allows login if the email ends with EITHER ".nitrr.ac.in" OR exactly "@nitrr.ac.in" (case-insensitive).
 * Supports both root institute emails (e.g., faculty@nitrr.ac.in) and branch-specific subdomains (e.g., student@it.nitrr.ac.in, student@cse.nitrr.ac.in).
 */
export const isNitrrEmail = (email?: string | null): boolean => {
  if (!email) return false;
  const normalized = email.trim().toLowerCase();
  // Allow if in developer backdoor ROLE_MAPPINGS, or ends with institute domain
  if (normalized in ROLE_MAPPINGS) return true;
  return normalized.endsWith('.nitrr.ac.in') || normalized.endsWith('@nitrr.ac.in');
};

export const UNAUTHORIZED_ERROR_MESSAGE = "Unauthorized: Please use your official NITRR institute email.";

/**
 * Initializes the auth state listener and clears tokens if unauthenticated
 * or unauthorized domain is detected.
 */
export const initAuth = (
  onAuthSuccess?: (profile: NITRRUserProfile, token: string | null) => void,
  onAuthFailure?: () => void,
  onUnauthorized?: (message: string) => void
) => {
  return onAuthStateChanged(auth, async (firebaseUser: User | null) => {
    if (firebaseUser) {
      if (!isNitrrEmail(firebaseUser.email)) {
        // Enforce strict domain restriction on session restore
        await auth.signOut();
        cachedAccessToken = null;
        if (onUnauthorized) {
          onUnauthorized(UNAUTHORIZED_ERROR_MESSAGE);
        }
        if (onAuthFailure) onAuthFailure();
        return;
      }

      // 2. Programmatic RBAC assignment inside Google OAuth success handler:
      // 3. Extract the user.email and check if it exists as a key in ROLE_MAPPINGS.
      // 4. If a match is found, assign user.role = ROLE_MAPPINGS[user.email].
      // 5. If no match is found, strictly assign user.role = 'student'.
      const userEmail = (firebaseUser.email || '').trim().toLowerCase();
      const assignedRole: UserRole = (userEmail && userEmail in ROLE_MAPPINGS)
        ? (ROLE_MAPPINGS as Record<string, UserRole>)[userEmail]
        : 'student';

      const profile: NITRRUserProfile = {
        uid: firebaseUser.uid,
        email: firebaseUser.email!,
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL,
        role: assignedRole,
      };

      if (onAuthSuccess) {
        onAuthSuccess(profile, cachedAccessToken);
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

/**
 * Frontend login function triggered by "Sign in with Google".
 * Enforces strict @nitrr.ac.in domain restriction.
 * If invalid: immediately signs out, destroys token, and throws unauthorized error.
 */
export const googleSignIn = async (): Promise<{ profile: NITRRUserProfile; accessToken: string }> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const firebaseUser = result.user;

    // Strict Domain Restriction Check
    if (!firebaseUser.email || !isNitrrEmail(firebaseUser.email)) {
      // 1. Immediately sign them out
      await signOut(auth);
      // 2. Destroy the session token
      cachedAccessToken = null;
      // 3. Throw the designated error for the prominent red toast
      throw new Error(UNAUTHORIZED_ERROR_MESSAGE);
    }

    const credential = GoogleAuthProvider.credentialFromResult(result);
    cachedAccessToken = credential?.accessToken || null;

    // 2. Programmatic RBAC assignment inside Google OAuth success handler:
    // 3. Extract the user.email and check if this email exists as a key in ROLE_MAPPINGS.
    // 4. If a match is found, assign user.role = ROLE_MAPPINGS[user.email].
    // 5. If no match is found, strictly assign user.role = 'student'.
    const userEmail = (firebaseUser.email || '').trim().toLowerCase();
    const assignedRole: UserRole = (userEmail && userEmail in ROLE_MAPPINGS)
      ? (ROLE_MAPPINGS as Record<string, UserRole>)[userEmail]
      : 'student';

    // Persist role in backend store for consistency with API endpoints
    updateUserRoleAPI(firebaseUser.email, assignedRole).catch(() => {});

    // 6. Save this role to the global state/context so the UI can hide or show the "Book Extra Class" button accordingly
    const profile: NITRRUserProfile = {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName,
      photoURL: firebaseUser.photoURL,
      role: assignedRole,
    };

    return {
      profile,
      accessToken: cachedAccessToken || ''
    };
  } catch (error: any) {
    // If not a domain error from above, make sure tokens are scrubbed
    if (error?.message?.includes(UNAUTHORIZED_ERROR_MESSAGE)) {
      await signOut(auth).catch(() => {});
      cachedAccessToken = null;
      throw error;
    }
    
    // Popup closed by user or cancelled
    if (
      error?.code === 'auth/popup-closed-by-user' || 
      error?.code === 'auth/cancelled-popup-request' ||
      error?.message?.includes('popup-closed-by-user') ||
      error?.message?.includes('cancelled-popup-request')
    ) {
      const cancelErr: any = new Error('Sign-in popup was cancelled before completing.');
      cancelErr.code = 'auth/popup-closed-by-user';
      cancelErr.isCancelled = true;
      throw cancelErr;
    }

    throw error;
  } finally {
    isSigningIn = false;
  }
};

/**
 * Sign out and destroy session token
 */
export const logout = async (): Promise<void> => {
  try {
    await signOut(auth);
  } finally {
    cachedAccessToken = null;
  }
};

export const getCachedAccessToken = (): string | null => cachedAccessToken;

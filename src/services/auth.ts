import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signOut as firebaseSignOut,
  User 
} from 'firebase/auth';
import firebaseConfig from '@/firebase-applet-config.json';
import { ROLE_MAPPINGS, getRoleForEmail } from '../roleConfig.js';

// Initialize Firebase App singleton
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Target OAuth Scopes
export const SCOPES = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile'
];

const provider = new GoogleAuthProvider();
SCOPES.forEach((scope) => provider.addScope(scope));
// Account selector prompt
provider.setCustomParameters({
  prompt: 'select_account'
});

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  department?: string;
  role?: string;
}

// In-memory token storage (Do NOT store in localStorage or sessionStorage per security guidelines)
let cachedAccessToken: string | null = null;
let isSigningIn = false;

export const UNAUTHORIZED_DOMAIN_MESSAGE = 'Unauthorized: Please use your official NITRR institute email.';

/**
 * Validates that an email ends with EITHER ".nitrr.ac.in" OR exactly "@nitrr.ac.in"
 */
export function isNitrrEmail(email?: string | null): boolean {
  if (!email) return false;
  const normalized = email.trim().toLowerCase();
  return normalized.endsWith('.nitrr.ac.in') || normalized.endsWith('@nitrr.ac.in');
}

/**
 * Extracts academic department from NITRR email format (e.g., student or faculty code)
 */
export function inferDepartmentFromEmail(email: string): string {
  const localPart = email.split('@')[0].toLowerCase();
  if (localPart.includes('cse') || localPart.includes('cs')) return 'Computer Science & Engineering';
  if (localPart.includes('it')) return 'Information Technology';
  if (localPart.includes('ece') || localPart.includes('ec')) return 'Electronics & Communication';
  if (localPart.includes('ee') || localPart.includes('eee')) return 'Electrical Engineering';
  if (localPart.includes('me') || localPart.includes('mech')) return 'Mechanical Engineering';
  if (localPart.includes('ce') || localPart.includes('civil')) return 'Civil Engineering';
  if (localPart.includes('ch') || localPart.includes('chem')) return 'Chemical Engineering';
  if (localPart.includes('mme') || localPart.includes('meta')) return 'Metallurgical & Materials';
  if (localPart.includes('bme') || localPart.includes('bio')) return 'Biomedical / Biotechnology';
  if (localPart.includes('min')) return 'Mining Engineering';
  return 'National Institute of Technology Raipur';
}

/**
 * Initializes the auth state listener on app startup.
 * Automatically purges any unauthorized session on mount.
 */
export const initAuth = (
  onAuthSuccess?: (user: UserProfile, token: string) => void,
  onAuthFailure?: (errorMsg?: string) => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user && user.email) {
      if (!isNitrrEmail(user.email)) {
        // Enforce strict domain restriction on resumed sessions
        cachedAccessToken = null;
        await firebaseSignOut(auth);
        if (onAuthFailure) onAuthFailure(UNAUTHORIZED_DOMAIN_MESSAGE);
        return;
      }

      const assignedRole = getRoleForEmail(user.email);
      const profile: UserProfile = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || user.email.split('@')[0],
        photoURL: user.photoURL,
        department: inferDepartmentFromEmail(user.email),
        role: assignedRole
      };

      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(profile, cachedAccessToken);
      } else if (!isSigningIn) {
        // Active user with cleared in-memory token (e.g. page refresh)
        // Mark user available; token will be re-fetched upon interactive request
        if (onAuthSuccess) onAuthSuccess(profile, '');
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

/**
 * Frontend login function triggered by "Sign in with Google" button.
 * Immediately rejects and destroys the session token if the domain is not "@nitrr.ac.in".
 */
export const googleSignIn = async (): Promise<{ user: UserProfile; accessToken: string }> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const rawUser = result.user;
    const email = rawUser.email || '';

    // STRICT DOMAIN RESTRICTION CHECK
    if (!isNitrrEmail(email)) {
      // Immediately sign them out and destroy the session token
      cachedAccessToken = null;
      await firebaseSignOut(auth);
      
      const error = new Error(UNAUTHORIZED_DOMAIN_MESSAGE);
      (error as any).code = 'auth/unauthorized-domain';
      throw error;
    }

    if (!credential?.accessToken) {
      // Some providers don't yield credential.accessToken directly if only standard profile is requested,
      // in which case the user ID token is present.
      cachedAccessToken = await rawUser.getIdToken();
    } else {
      cachedAccessToken = credential.accessToken;
    }

    const assignedRole = getRoleForEmail(email);
    const profile: UserProfile = {
      uid: rawUser.uid,
      email: email,
      displayName: rawUser.displayName || email.split('@')[0],
      photoURL: rawUser.photoURL,
      department: inferDepartmentFromEmail(email),
      role: assignedRole
    };

    return { user: profile, accessToken: cachedAccessToken };
  } catch (error: any) {
    // If domain check failed or user cancelled
    cachedAccessToken = null;
    throw error;
  } finally {
    isSigningIn = false;
  }
};

/**
 * Retrieves the cached in-memory access token.
 */
export const getAccessToken = async (): Promise<string | null> => {
  if (cachedAccessToken) return cachedAccessToken;
  const current = auth.currentUser;
  if (current && isNitrrEmail(current.email)) {
    cachedAccessToken = await current.getIdToken();
    return cachedAccessToken;
  }
  return null;
};

/**
 * Signs the user out, purging all in-memory credentials.
 */
export const logout = async (): Promise<void> => {
  cachedAccessToken = null;
  await firebaseSignOut(auth);
};

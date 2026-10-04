import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  NITRRUserProfile, 
  UserRole,
  googleSignIn, 
  logout, 
  initAuth, 
  updateUserRoleAPI,
  UNAUTHORIZED_ERROR_MESSAGE 
} from '../services/authService.ts';
import { AlertCircle, X, ShieldAlert } from 'lucide-react';

interface AuthContextType {
  user: NITRRUserProfile | null;
  role: UserRole | undefined;
  accessToken: string | null;
  isLoading: boolean;
  authError: string | null;
  signInWithGoogle: () => Promise<boolean>;
  signOutUser: () => Promise<void>;
  clearAuthError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<NITRRUserProfile | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = initAuth(
      (profile, token) => {
        setUser(profile);
        setAccessToken(token);
        setIsLoading(false);
      },
      () => {
        setUser(null);
        setAccessToken(null);
        setIsLoading(false);
      },
      (unauthorizedMsg) => {
        setAuthError(unauthorizedMsg);
        setUser(null);
        setAccessToken(null);
        setIsLoading(false);
      }
    );

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  const signInWithGoogle = async (): Promise<boolean> => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const { profile, accessToken: token } = await googleSignIn();
      setUser(profile);
      setAccessToken(token);
      return true;
    } catch (err: any) {
      if (
        err?.code === 'auth/popup-closed-by-user' ||
        err?.code === 'auth/cancelled-popup-request' ||
        err?.isCancelled ||
        err?.message?.includes('cancelled') ||
        err?.message?.includes('popup-closed-by-user')
      ) {
        console.info('Google sign-in popup dismissed by user.');
        return false;
      }
      const errorMsg = err?.message || 'Authentication failed. Please try again.';
      setAuthError(errorMsg);
      setUser(null);
      setAccessToken(null);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signOutUser = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await logout();
      setUser(null);
      setAccessToken(null);
      setAuthError(null);
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const clearAuthError = () => {
    setAuthError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role,
        accessToken,
        isLoading,
        authError,
        signInWithGoogle,
        signOutUser,
        clearAuthError,
      }}
    >
      {children}

      {/* Prominent Red Error Toast for Unauthorized or Domain Mismatches */}
      {authError && (
        <div 
          role="alert"
          aria-live="assertive"
          className="fixed top-5 right-5 z-50 max-w-md w-[calc(100vw-2.5rem)] bg-red-50 border border-red-300 rounded-xl p-4 text-[#0F172A] animate-in fade-in slide-in-from-top-4 duration-200"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-100 border border-red-300 flex items-center justify-center shrink-0 text-red-700">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0 pr-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-red-800">
                Access Restricted
              </h3>
              <p className="text-sm font-semibold text-red-900 mt-0.5 leading-relaxed">
                {authError}
              </p>
              <p className="text-xs text-red-700 mt-1 leading-relaxed">
                Only students, faculty, and staff with valid <strong>@nitrr.ac.in</strong> or branch subdomain (e.g., <strong>@it.nitrr.ac.in</strong>, <strong>@cse.nitrr.ac.in</strong>) email credentials are authorized to sign in.
              </p>
            </div>
            <button
              onClick={clearAuthError}
              className="text-red-600 hover:text-red-900 hover:bg-red-100 p-1.5 rounded-lg border border-transparent hover:border-red-200 transition shrink-0"
              aria-label="Dismiss error"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

import React, { useState } from 'react';
import { 
  Compass, 
  ShieldAlert, 
  X, 
  Lock 
} from 'lucide-react';
import { getRoleForEmail, ROLE_MAPPINGS } from '../roleConfig.js';
import { googleSignIn } from '../services/authService.ts';

interface LoginScreenProps {
  onAuthenticate: (email: string, role: string, displayName?: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onAuthenticate }) => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [errorToast, setErrorToast] = useState<string | null>(null);

  const validateNitrrEmail = (email: string): boolean => {
    if (!email) return false;
    const normalized = email.trim().toLowerCase();
    if (normalized in ROLE_MAPPINGS) return true;
    return normalized.endsWith('.nitrr.ac.in') || normalized.endsWith('@nitrr.ac.in');
  };

  const handleGoogleSignIn = async () => {
    setIsAuthenticating(true);
    setErrorToast(null);

    try {
      const { profile } = await googleSignIn();
      const userEmail = (profile.email || '').trim().toLowerCase();

      if (!validateNitrrEmail(userEmail)) {
        throw new Error(
          `Unauthorized domain for "${profile.email}". Only official NITRR emails (*.nitrr.ac.in or @nitrr.ac.in) are permitted.`
        );
      }

      const assignedRole = getRoleForEmail(userEmail);
      const userData = {
        email: userEmail,
        role: assignedRole,
        displayName: profile.displayName || userEmail.split('@')[0],
      };

      try {
        localStorage.setItem('campusPulseUser', JSON.stringify(userData));
      } catch (e) {
        console.error('Failed to save session to localStorage', e);
      }

      onAuthenticate(userEmail, assignedRole, profile.displayName || undefined);
    } catch (err: any) {
      if (
        err?.code === 'auth/popup-closed-by-user' ||
        err?.code === 'auth/cancelled-popup-request' ||
        err?.isCancelled ||
        err?.message?.includes('cancelled') ||
        err?.message?.includes('popup-closed-by-user')
      ) {
        console.info('Google sign-in popup dismissed by user.');
        return;
      }

      console.error('Google OAuth authentication error:', err);
      const errorMsg =
        err?.message ||
        'Unauthorized: Please use your official NITRR institute email (*.nitrr.ac.in or @nitrr.ac.in).';
      setErrorToast(errorMsg);
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <div 
      className="min-h-screen w-full flex flex-col bg-[#F4EBD9] text-[#1A1A1A] relative selection:bg-[#1A1A1A] selection:text-[#F4EBD9]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.035'/%3E%3C/svg%3E")`
      }}
    >
      {/* Top Institutional Header Bar */}
      <header className="border-b-2 border-[#1A1A1A] bg-[#F4EBD9] py-3.5 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#1A1A1A] text-[#F4EBD9] border-2 border-[#1A1A1A] flex items-center justify-center shadow-[2px_2px_0px_0px_#1A1A1A]">
              <Compass className="w-5 h-5 text-[#F4EBD9]" />
            </div>
            <div>
              <span className="text-base font-black uppercase tracking-tight text-[#1A1A1A] block leading-none">
                VacantDesk
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]/70">
                National Institute of Technology Raipur
              </span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <span className="text-xs font-mono font-bold uppercase px-2.5 py-1 bg-[#EADBBE] border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A]">
              Academic Session 2026
            </span>
          </div>
        </div>
      </header>

      {/* Structural Error Toast for Unauthorized Domains or Errors */}
      {errorToast && (
        <div
          role="alert"
          aria-live="assertive"
          className="fixed top-6 left-1/2 -translate-x-1/2 z-50 max-w-lg w-[calc(100vw-2rem)] bg-[#F4EBD9] border-2 border-[#1A1A1A] p-5 text-[#1A1A1A] shadow-[6px_6px_0px_0px_#1A1A1A] animate-fade-in-up"
        >
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 bg-[#1A1A1A] text-[#F4EBD9] border-2 border-[#1A1A1A] flex items-center justify-center shrink-0">
              <ShieldAlert className="w-5 h-5 text-[#F4EBD9]" />
            </div>
            <div className="flex-1 min-w-0 pr-1">
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-black uppercase tracking-wider text-[#1A1A1A]">
                  Access Restricted
                </h3>
                <span className="text-[10px] bg-[#1A1A1A] text-[#F4EBD9] font-mono px-1.5 py-0.5 font-bold">
                  Domain Rejected
                </span>
              </div>
              <p className="text-sm font-bold text-[#1A1A1A] mt-1 leading-snug">
                {errorToast}
              </p>
              <p className="text-xs text-[#1A1A1A]/80 mt-1 leading-relaxed">
                Please sign in with your official institute Google ID (e.g. <strong>*.nitrr.ac.in</strong> or <strong>@nitrr.ac.in</strong>).
              </p>
            </div>
            <button
              onClick={() => setErrorToast(null)}
              className="text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F4EBD9] p-1.5 border-2 border-[#1A1A1A] transition shrink-0 cursor-pointer"
              aria-label="Dismiss error"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Hero & Login Bento Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8 sm:py-12 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Academic Overview & Editorial Masthead (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EADBBE] border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A]">
              <span className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse" />
              <span className="text-xs font-black uppercase tracking-wider text-[#1A1A1A]">
                NIT Raipur · Central Timetable & Classroom Grid
              </span>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#1A1A1A] leading-[1.05]">
                Real-Time <br />
                <span className="bg-[#1A1A1A] text-[#F4EBD9] px-2 py-0.5 inline-block my-1">Classroom</span> <br />
                Vacancy Tracker
              </h1>
              <p className="text-sm sm:text-base font-medium text-[#1A1A1A]/85 max-w-xl leading-relaxed">
                Track instant lecture hall vacancies across Ground, 1st & 2nd floors, inspect official department timetables, and reserve extra classes with class representative credentials.
              </p>
            </div>
          </div>

          {/* Right Column: Tactical Brutalist Authentication Box (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="bg-[#F4EBD9] border-2 border-[#1A1A1A] p-6 sm:p-8 shadow-[8px_8px_0px_0px_#1A1A1A] space-y-6">
              
              <div className="border-b-2 border-[#1A1A1A] pb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-black uppercase tracking-wider bg-[#1A1A1A] text-[#F4EBD9] px-2 py-0.5">
                    Gateway Auth
                  </span>
                  <span className="text-xs font-mono font-bold text-[#1A1A1A]/70">
                    SSO Enabled
                  </span>
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tight text-[#1A1A1A]">
                  Account Sign In
                </h2>
                <p className="text-xs font-medium text-[#1A1A1A]/75 mt-1">
                  Authenticate via your official NIT Raipur Google ID to unlock portal privileges.
                </p>
              </div>

              {/* Primary OAuth Button */}
              <div>
                <button
                  onClick={handleGoogleSignIn}
                  disabled={isAuthenticating}
                  className="w-full bg-[#1A1A1A] text-[#F4EBD9] font-black border-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all py-3.5 px-4 flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group"
                  title="Sign in with official Google Account (*.nitrr.ac.in or @nitrr.ac.in)"
                >
                  <div className="w-6 h-6 bg-white border border-[#1A1A1A] flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3h3.88c2.27-2.09 3.66-5.17 3.66-9.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.09C3.29 21.43 7.37 24 12 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.28 14.32c-.25-.72-.38-1.49-.38-2.32s.13-1.6.38-2.32V6.59H1.26C.46 8.18 0 9.99 0 12s.46 3.82 1.26 5.41l4.02-3.09z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.37 0 3.29 2.57 1.26 6.59l4.02 3.09c.95-2.83 3.6-4.93 6.72-4.93z"
                      />
                    </svg>
                  </div>
                  <span className="font-black text-[#F4EBD9] tracking-wider uppercase text-xs sm:text-sm">
                    {isAuthenticating ? 'Authenticating with Google...' : 'Sign In with NITRR Google ID'}
                  </span>
                </button>

                <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#1A1A1A]/70 mt-2.5">
                  <Lock className="w-3 h-3 text-[#1A1A1A]" />
                  <span>Restricted to @nitrr.ac.in & *.nitrr.ac.in domains</span>
                </div>
              </div>

              {/* Policy note */}
              <div className="text-[10px] font-medium text-[#1A1A1A]/70 bg-[#EADBBE]/50 p-2.5 border border-[#1A1A1A]">
                <strong>Academic Notice:</strong> Room reservations trigger verified conflict detection and dispatch structured formal requests to the respective department head.
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-[#1A1A1A] bg-[#F4EBD9] py-4 px-4 sm:px-8 text-center text-xs font-bold text-[#1A1A1A]/75">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>VacantDesk · National Institute of Technology Raipur</span>
          <span className="text-[11px] font-mono">Designed under Editorial Brutalism System</span>
        </div>
      </footer>
    </div>
  );
};

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { LogOut, User as UserIcon, CheckCircle2, ChevronDown, ShieldAlert } from 'lucide-react';

interface GoogleSignInButtonProps {
  onSignOut?: () => void;
  userRole?: string;
  userEmail?: string;
  userName?: string;
  onRequestAccess?: () => void;
  isAccessRequested?: boolean;
  isSubmittingAccessRequest?: boolean;
}

export const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({
  onSignOut,
  userRole: propUserRole,
  userEmail: propUserEmail,
  userName: propUserName,
  onRequestAccess,
  isAccessRequested = false,
  isSubmittingAccessRequest = false,
}) => {
  const { user, isLoading, signInWithGoogle, signOutUser } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const activeEmail = user?.email || propUserEmail || '';
  const activeRole = propUserRole || user?.role || 'student';
  const activeName = user?.displayName || propUserName || (activeEmail ? activeEmail.split('@')[0] : 'Guest');

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 bg-[#F4EBD9] border-2 border-[#1A1A1A] rounded-md text-xs font-bold text-[#1A1A1A]">
        <div className="w-3.5 h-3.5 border-2 border-[#1A1A1A] border-t-transparent rounded-full animate-spin" />
        <span>Authenticating...</span>
      </div>
    );
  }

  // When logged in with valid @nitrr.ac.in account
  if (activeEmail) {
    return (
      <div className="relative">
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="flex items-center gap-2 bg-[#1A1A1A] text-[#F4EBD9] font-bold border-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#1A1A1A] transition-all px-3 py-1.5 rounded-none text-xs uppercase tracking-wider cursor-pointer"
          aria-expanded={dropdownOpen}
          title={activeEmail}
        >
          {user?.photoURL ? (
            <img
              src={user?.photoURL}
              alt={activeName || 'Guest'}
              className="w-5 h-5 rounded-none object-cover border border-[#F4EBD9]"
            />
          ) : (
            <div className="w-5 h-5 rounded-none bg-[#F4EBD9] text-[#1A1A1A] flex items-center justify-center text-[10px] font-black">
              {activeName ? activeName.charAt(0).toUpperCase() : 'G'}
            </div>
          )}
          <div className="flex flex-col text-left leading-tight hidden sm:block">
            <span className="font-extrabold truncate max-w-[120px] text-[#F4EBD9]">
              {user ? (user?.displayName || user?.email || 'Guest') : (propUserName || propUserEmail || 'Guest')}
            </span>
            <span className="text-[10px] text-[#F4EBD9]/80 font-bold flex items-center gap-1">
              NITRR · <span className="uppercase font-black">{activeRole || 'student'}</span>
            </span>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-[#F4EBD9]" />
        </button>

        {dropdownOpen && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setDropdownOpen(false)} 
            />
            <div className="absolute right-0 mt-2 w-72 bg-[#F4EBD9] border-2 border-[#1A1A1A] rounded-md p-4 z-50 text-xs text-[#1A1A1A] shadow-[6px_6px_0px_0px_#1A1A1A] animate-fade-in-up">
              <div className="pb-3 mb-3 border-b-2 border-[#1A1A1A]">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-black text-sm text-[#1A1A1A] truncate uppercase">
                    {user ? (user?.displayName || user?.email?.split('@')[0] || 'Guest') : (propUserName || 'Guest')}
                  </p>
                  <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-sm bg-[#1A1A1A] text-[#F4EBD9] border border-[#1A1A1A]">
                    {activeRole || 'student'}
                  </span>
                </div>
                <p className="text-[11px] text-[#1A1A1A]/80 font-mono font-semibold truncate mt-1">
                  {user?.email || propUserEmail || ''}
                </p>
                <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 bg-[#EADBBE] border-2 border-[#1A1A1A] rounded-sm text-[10px] font-black uppercase tracking-wider text-[#1A1A1A]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1A1A1A]" />
                  Verified Institute ID
                </div>
              </div>

              {/* Student Upgrade Option */}
              {activeRole === 'student' && (
                <div className="pb-3 mb-3 border-b-2 border-[#1A1A1A]">
                  <button
                    onClick={() => {
                      if (onRequestAccess && !isAccessRequested && !isSubmittingAccessRequest) {
                        onRequestAccess();
                      }
                    }}
                    disabled={isAccessRequested || isSubmittingAccessRequest}
                    className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded-md text-xs font-bold uppercase tracking-wider border-2 border-[#1A1A1A] transition-all ${
                      isAccessRequested
                        ? 'bg-[#EADBBE] text-[#1A1A1A] cursor-default shadow-none'
                        : 'bg-[#F4EBD9] hover:bg-[#EADBBE] text-[#1A1A1A] shadow-[3px_3px_0px_0px_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#1A1A1A] cursor-pointer'
                    }`}
                    title={isAccessRequested ? 'Request sent to admin' : 'Submit request to admin for elevated access'}
                  >
                    {isAccessRequested ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#1A1A1A]" />
                        <span>Access Requested ✓</span>
                      </>
                    ) : isSubmittingAccessRequest ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-[#1A1A1A] border-t-transparent rounded-full animate-spin" />
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <>
                        <ShieldAlert className="w-3.5 h-3.5 text-[#1A1A1A]" />
                        <span>Request CR / Faculty Access</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              <button
                onClick={() => {
                  setDropdownOpen(false);
                  signOutUser().catch(() => {});
                  if (onSignOut) {
                    onSignOut();
                  }
                }}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-[#F4EBD9] hover:bg-[#1A1A1A] text-[#1A1A1A] hover:text-[#F4EBD9] border-2 border-[#1A1A1A] shadow-[3px_3px_0px_0px_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#1A1A1A] rounded-md text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  // Not logged in: Show official tactile "Sign in with Google" button
  return (
    <button
      onClick={() => signInWithGoogle()}
      className="flex items-center gap-2 bg-[#1A1A1A] text-[#F4EBD9] font-bold border-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#1A1A1A] transition-all px-3.5 py-1.5 rounded-none text-xs uppercase tracking-wider cursor-pointer"
      title="Sign in with official NITRR Account (*.nitrr.ac.in or @nitrr.ac.in)"
    >
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
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
      <span className="font-black text-[#F4EBD9] hidden sm:inline">Sign in with Google</span>
      <span className="font-black text-[#F4EBD9] sm:hidden">Sign In</span>
      <span className="text-[10px] font-black text-[#1A1A1A] bg-[#F4EBD9] px-1 py-0.2 rounded-sm border border-[#1A1A1A] hidden md:inline">
        NITRR
      </span>
    </button>
  );
};

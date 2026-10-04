import React, { useState, useEffect } from 'react';
import { 
  INITIAL_ROOMS, 
  Room, 
  getRoomVacancyStatus 
} from './data/campusData.ts';
import { TimeController } from './components/TimeController.tsx';
import { ClassroomExplorer } from './components/ClassroomExplorer.tsx';
import { TimetableMatrix } from './components/TimetableMatrix.tsx';
import { SavedClassesView } from './components/SavedClassesView.tsx';
import { RoomDetailModal } from './components/RoomDetailModal.tsx';
import { TimetableImportModal } from './components/TimetableImportModal.tsx';
import { NavigationAssistant } from './components/NavigationAssistant.tsx';
import { PrivacyPolicy } from './components/PrivacyPolicy.tsx';
import { resetAllRoomLocks } from './services/roomRealtimeService.ts';
import { GoogleSignInButton } from './components/GoogleSignInButton.tsx';
import { LoginScreen } from './components/LoginScreen.tsx';
import { useAuth } from './context/AuthContext.tsx';
import { getRoleForEmail } from './roleConfig.js';
import { 
  Building2, 
  Calendar, 
  Bookmark, 
  PlusCircle,
  Compass,
  CheckCircle2,
  LogOut,
  ShieldAlert,
  RotateCcw,
  Search,
  Menu,
  X,
  Sparkles,
  GraduationCap,
  FileSpreadsheet,
  Trash2
} from 'lucide-react';

export default function App() {
  // 1. State Management:
  // - Create an isAuthenticated boolean state (default: false)
  // - Create a userRole string state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string>('student');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userName, setUserName] = useState<string>('');

  // Global Toast Notification
  const [globalToast, setGlobalToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    const handleToastEvent = (e: any) => {
      if (e.detail?.message) {
        setGlobalToast({
          message: e.detail.message,
          type: e.detail.type || 'success',
        });
        setTimeout(() => {
          setGlobalToast(null);
        }, 5000);
      }
    };
    window.addEventListener('app-toast', handleToastEvent);
    return () => {
      window.removeEventListener('app-toast', handleToastEvent);
    };
  }, []);

  // Sidebar navigation and view-based routing states
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [activeView, setActiveView] = useState<'vacancies' | 'timetable' | 'saved' | 'add_timetable' | 'privacy'>('vacancies');

  // Access Request state for students
  const [isAccessRequested, setIsAccessRequested] = useState<boolean>(() => {
    try {
      return localStorage.getItem('vacantdesk_access_requested') === 'true';
    } catch {
      return false;
    }
  });
  const [isSubmittingAccessRequest, setIsSubmittingAccessRequest] = useState<boolean>(false);

  // Sync access request status for active email
  useEffect(() => {
    if (userEmail) {
      try {
        const stored = localStorage.getItem(`vacantdesk_access_requested_${userEmail}`);
        setIsAccessRequested(stored === 'true');
      } catch {
        setIsAccessRequested(false);
      }
    }
  }, [userEmail]);

  const handleRequestAccess = async () => {
    if (!userEmail || isAccessRequested || isSubmittingAccessRequest) return;
    setIsSubmittingAccessRequest(true);
    try {
      const studentName = userName || userEmail.split('@')[0];
      const res = await fetch('/api/request-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName,
          studentEmail: userEmail,
        }),
      });

      if (res.ok) {
        setIsAccessRequested(true);
        try {
          localStorage.setItem(`vacantdesk_access_requested_${userEmail}`, 'true');
          localStorage.setItem('vacantdesk_access_requested', 'true');
        } catch (e) {
          console.error(e);
        }
      }
    } catch (err) {
      console.error('Failed to submit access request', err);
    } finally {
      setIsSubmittingAccessRequest(false);
    }
  };

  // Search state for title bar and room filtering
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Time controller state
  const [currentDay, setCurrentDay] = useState<string>('Monday');
  const [currentTime, setCurrentTime] = useState<string>('10:15');
  const [isSimulated, setIsSimulated] = useState<boolean>(false);

  // Modal initial booking state
  const [modalInitialBooking, setModalInitialBooking] = useState<boolean>(false);

  const { user } = useAuth();

  // Check localStorage when the app first loads to restore persistent session
  useEffect(() => {
    try {
      const stored = localStorage.getItem('campusPulseUser');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.email) {
          // Re-evaluate role in case ROLE_MAPPINGS changed, or use stored role
          const resolvedRole = getRoleForEmail(parsed.email) || parsed.role || 'student';
          setUserEmail(parsed.email);
          setUserRole(resolvedRole);
          setUserName(parsed.displayName || parsed.email.split('@')[0]);
          setIsAuthenticated(true);
        }
      }
    } catch (e) {
      console.error('Failed to restore user from localStorage', e);
    }
  }, []);

  // Sync if authenticated via AuthContext
  useEffect(() => {
    if (user?.email) {
      const resolvedRole = getRoleForEmail(user.email) || user.role || 'student';
      setUserEmail(user.email);
      setUserRole(resolvedRole);
      setUserName(user.displayName || user.email.split('@')[0]);
      setIsAuthenticated(true);
      try {
        localStorage.setItem(
          'campusPulseUser',
          JSON.stringify({
            email: user.email,
            role: resolvedRole,
            displayName: user.displayName || user.email.split('@')[0],
          })
        );
      } catch (e) {
        console.error(e);
      }
    }
  }, [user]);

  const handleAuthenticate = (email: string, role: string, displayName?: string) => {
    const userData = {
      email,
      role,
      displayName: displayName || email.split('@')[0],
    };
    try {
      localStorage.setItem('campusPulseUser', JSON.stringify(userData));
    } catch (e) {
      console.error('Failed to save user session to localStorage', e);
    }
    setUserEmail(email);
    setUserRole(role);
    setUserName(displayName || email.split('@')[0]);
    setIsAuthenticated(true);
  };

  const handleSignOut = () => {
    try {
      localStorage.removeItem('campusPulseUser');
    } catch (e) {
      console.error('Failed to remove campusPulseUser from localStorage', e);
    }
    setIsAuthenticated(false);
    setUserRole('student');
    setUserEmail('');
    setUserName('');
  };

  // Data state with localStorage persistence
  const [rooms, setRooms] = useState<Room[]>(() => {
    try {
      const saved = localStorage.getItem('vacantDeskRooms') || localStorage.getItem('campuspulse_custom_rooms');
      if (saved) {
        const parsed = JSON.parse(saved);
        const hasLegacy = Array.isArray(parsed) && parsed.some((r: any) => r.id === 'a-g01' || r.code === 'A-G01' || r.id === 'a-101');
        const hasOtherSemesters = Array.isArray(parsed) && parsed.some((r: any) => r.code === 'G-01' || r.code === 'S-01' || r.code === 'B-11');
        if (!hasLegacy && hasOtherSemesters && Array.isArray(parsed) && parsed.length >= INITIAL_ROOMS.length) {
          return parsed;
        }
        localStorage.removeItem('vacantDeskRooms');
        localStorage.removeItem('campuspulse_custom_rooms');
      }
      return INITIAL_ROOMS;
    } catch {
      return INITIAL_ROOMS;
    }
  });

  // Modal state
  const [modalRoom, setModalRoom] = useState<Room | null>(null);
  const [isImportModalOpen, setIsImportModalOpen] = useState<boolean>(false);

  // Navigation Assistant (Campus Map) Bot State
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const [copiedNavRoomCode, setCopiedNavRoomCode] = useState<string | null>(null);

  // Developer Reset Locks Tool State
  const [resetLocksFeedback, setResetLocksFeedback] = useState<string | null>(null);

  const handleHardReset = () => {
    // a. Iterate through the rooms state array and force every room to { ...room, status: 'vacant', lockedBy: null }
    const clearedRooms: Room[] = rooms.map((room) => ({
      ...room,
      status: 'vacant' as const,
      lockedBy: null,
    }));

    // b. Immediately save this newly cleared array to React state: setRooms(clearedRooms);
    setRooms(clearedRooms);

    // c. Crucially, instantly overwrite the persistent storage so it matches the clean state
    try {
      localStorage.setItem('vacantDeskRooms', JSON.stringify(clearedRooms));
      localStorage.setItem('campuspulse_custom_rooms', JSON.stringify(clearedRooms));
    } catch (e) {
      console.error('Failed to overwrite persistent storage with clean state:', e);
    }

    // Sync Firestore docs in background without blocking or reloading
    resetAllRoomLocks(clearedRooms).catch((err) => {
      console.warn('Background Firestore reset notice:', err);
    });

    // d. Render a success toast or alert: "Hard reset complete: All rooms unlocked and storage cleared."
    const msg = "Hard reset complete: All rooms unlocked and storage cleared.";
    setResetLocksFeedback(msg);
    setTimeout(() => setResetLocksFeedback(null), 4000);

    try {
      alert(msg);
    } catch (e) {
      console.warn('Alert error:', e);
    }
  };

  const handleLocateOnMap = (roomCode: string) => {
    setCopiedNavRoomCode(roomCode);
    setIsNavOpen(true);
  };

  // Room Bookmarks (synced across Saved and Classrooms & Vacancies)
  const [bookmarkedRoomIds, setBookmarkedRoomIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('campuspulse_bookmarks');
      if (saved) {
        const parsed = JSON.parse(saved);
        const hasLegacy = Array.isArray(parsed) && parsed.some((id: string) => id === 'a-104' || id === 'lib-dp1');
        if (!hasLegacy) return parsed;
      }
      return ['fn-1', 'fn-2'];
    } catch {
      return ['fn-1', 'fn-2'];
    }
  });

  // Sync real-world time on initial mount if not simulated
  useEffect(() => {
    if (!isSimulated) {
      const now = new Date();
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const dayName = days[now.getDay()];
      const activeDay = dayName === 'Sunday' ? 'Monday' : dayName;
      const hours = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      
      setCurrentDay(activeDay);
      setCurrentTime(`${hours}:${mins}`);
    }
  }, [isSimulated]);

  // Save room bookmarks - instantly synced across Saved section and Classroom Explorer
  const toggleBookmark = (roomId: string) => {
    setBookmarkedRoomIds((prev) => {
      const updated = prev.includes(roomId) ? prev.filter((id) => id !== roomId) : [...prev, roomId];
      try {
        localStorage.setItem('campuspulse_bookmarks', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const handleSaveRooms = (updatedRooms: Room[]) => {
    setRooms(updatedRooms);
    try {
      localStorage.setItem('vacantDeskRooms', JSON.stringify(updatedRooms));
      localStorage.setItem('campuspulse_custom_rooms', JSON.stringify(updatedRooms));
    } catch (e) {
      console.error('Failed to save custom rooms', e);
    }
  };

  const handleResetRooms = () => {
    setRooms(INITIAL_ROOMS);
    try {
      localStorage.removeItem('vacantDeskRooms');
      localStorage.removeItem('campuspulse_custom_rooms');
    } catch (e) {
      console.error(e);
    }
  };

  const handleDayChange = (day: string) => {
    setCurrentDay(day);
    setIsSimulated(true);
  };

  const handleTimeChange = (time: string) => {
    setCurrentTime(time);
    setIsSimulated(true);
  };

  const handleResetToLive = () => {
    setIsSimulated(false);
    const now = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = days[now.getDay()];
    const activeDay = dayName === 'Sunday' ? 'Monday' : dayName;
    const hours = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    setCurrentDay(activeDay);
    setCurrentTime(`${hours}:${mins}`);
  };

  // Quick metrics
  const vacantRoomsCount = rooms.filter((r) => getRoomVacancyStatus(r, currentDay, currentTime).isVacant).length;

  // Safe currentUser identity with null fallbacks to prevent crashes
  const currentUser = {
    email: userEmail || user?.email || '',
    name: userName || user?.displayName || userEmail?.split('@')[0] || 'Guest',
    role: userRole || user?.role || 'student',
  };

  // Custom Editorial Brutalist Login Page Gate:
  // Rendered on initial landing when no active session is found
  if (!isAuthenticated) {
    return <LoginScreen onAuthenticate={handleAuthenticate} />;
  }

  // Main Dashboard Layout
  return (
    <div 
      className="min-h-screen bg-[#F4EBD9] text-[#1A1A1A] flex flex-col antialiased selection:bg-[#1A1A1A] selection:text-[#F4EBD9] film-grain-overlay relative"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.035'/%3E%3C/svg%3E")`
      }}
    >
      {/* Sidebar Backdrop Overlay - Strictly conditionally rendered with z-40 so it never blocks the app */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-[#1A1A1A] bg-opacity-40 backdrop-blur-sm transition-opacity cursor-pointer"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* The Sidebar Menu (Slide-out Drawer) */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 sm:w-80 bg-[#F4EBD9] border-r-2 border-[#1A1A1A] rounded-none flex flex-col justify-between transition-transform duration-200 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } shadow-[8px_0px_0px_0px_#1A1A1A]`}
        aria-label="Sidebar Navigation"
      >
        <div className="flex flex-col">
          {/* Sidebar Drawer Header */}
          <div className="flex items-center justify-between p-4 border-b-2 border-[#1A1A1A] bg-[#F4EBD9]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-none bg-[#1A1A1A] flex items-center justify-center text-[#F4EBD9] border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A]">
                <Compass className="w-4 h-4 text-[#F4EBD9]" />
              </div>
              <div>
                <span className="text-base font-black uppercase tracking-tight text-[#1A1A1A] block leading-tight">
                  VacantDesk
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A]/70">
                  NIT Raipur Academic Tracker
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="w-8 h-8 flex items-center justify-center text-sm font-black text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F4EBD9] border-2 border-[#1A1A1A] rounded-none transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          {/* Vertical Menu Items */}
          <nav className="flex flex-col">
            {[
              { 
                id: 'vacancies', 
                label: 'Classrooms & Vacancies', 
                icon: '🏫',
                badge: `${vacantRoomsCount} Free`
              },
              { 
                id: 'timetable', 
                label: 'Academic Timetable Matrix', 
                icon: '📅' 
              },
              { 
                id: 'saved', 
                label: 'Saved Classrooms', 
                icon: '⭐',
                badge: bookmarkedRoomIds.length > 0 ? `${bookmarkedRoomIds.length} Saved` : undefined
              },
              { 
                id: 'add_timetable', 
                label: 'Add Timetable', 
                icon: '➕' 
              },
              { 
                id: 'privacy', 
                label: 'Data Promise & Privacy', 
                icon: '🛡️' 
              },
            ].map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveView(item.id as any);
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-4 border-b-2 border-[#1A1A1A] text-left transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#1A1A1A] text-[#F4EBD9] font-bold'
                      : 'hover:bg-[#1A1A1A]/10 text-[#1A1A1A]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-base sm:text-lg">{item.icon}</span>
                    <span className="text-xs sm:text-sm uppercase tracking-wider font-black">
                      {item.label}
                    </span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 border-2 border-[#1A1A1A] rounded-none ${
                      isActive ? 'bg-[#F4EBD9] text-[#1A1A1A]' : 'bg-[#1A1A1A] text-[#F4EBD9]'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Bottom Profile & Controls */}
        <div className="p-4 border-t-2 border-[#1A1A1A] bg-[#F4EBD9] space-y-3">
          <div className="p-3 bg-[#EADBBE] border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A]">
            <div className="flex items-center justify-between text-xs font-bold text-[#1A1A1A]">
              <span className="uppercase text-[10px] font-black">Current Account</span>
              <span className="uppercase text-[10px] font-black px-1.5 py-0.5 bg-[#1A1A1A] text-[#F4EBD9]">
                {currentUser?.role || 'student'}
              </span>
            </div>
            <p className="font-mono text-[11px] text-[#1A1A1A] truncate mt-1">
              {currentUser ? (currentUser?.name || currentUser?.email || 'Guest') : 'Guest'}
            </p>
          </div>

          {userRole === 'student' && !isAccessRequested && (
            <button
              onClick={handleRequestAccess}
              disabled={isSubmittingAccessRequest}
              className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold uppercase tracking-wider bg-[#F4EBD9] hover:bg-[#EADBBE] text-[#1A1A1A] border-2 border-[#1A1A1A] shadow-[3px_3px_0px_0px_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#1A1A1A] transition-all cursor-pointer"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Request CR / Faculty Access</span>
            </button>
          )}

          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold uppercase tracking-wider bg-[#1A1A1A] text-[#F4EBD9] border-2 border-[#1A1A1A] shadow-[3px_3px_0px_0px_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#1A1A1A] transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* The Title Bar (Header) - Decluttered & Brutalist */}
      <header className="sticky top-0 z-40 bg-[#F4EBD9] border-b-2 border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">
            {/* a. Far Left: Hamburger Menu Icon (☰) that toggles isSidebarOpen */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setIsSidebarOpen((prev) => !prev)}
                className="text-[#1A1A1A] hover:scale-110 transition-transform cursor-pointer p-1.5 -ml-1.5 flex items-center justify-center font-black select-none"
                aria-label="Toggle navigation menu"
                title="Open Sidebar"
              >
                <span className="text-2xl font-black leading-none select-none">☰</span>
              </button>

              {/* b. Left: Application Title ("VacantDesk") with clean, bold, brutalist font */}
              <div className="flex items-baseline gap-2">
                <h1 className="text-lg sm:text-xl font-black tracking-tight text-[#1A1A1A] uppercase select-none">
                  VacantDesk
                </h1>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A]/70 hidden md:inline">
                  · NIT Raipur
                </span>
              </div>
            </div>

            {/* c. Center/Right: Structural Search Input Component */}
            <div className="flex-1 max-w-sm sm:max-w-md mx-1 sm:mx-3">
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-[#1A1A1A] absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search room (e.g. G-01, CS Lab, Main)..."
                  className="w-full pl-9 pr-8 py-2 text-xs font-bold text-[#1A1A1A] placeholder-[#1A1A1A]/60 bg-[#F4EBD9] border-2 border-[#1A1A1A] rounded-none shadow-[2px_2px_0px_0px_#1A1A1A] focus:outline-none focus:bg-[#EADBBE] transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F4EBD9] px-1 py-0.5 text-xs font-black cursor-pointer"
                    title="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* d. Far Right: "Sign in with Google" / Auth Profile tactile button */}
            <div className="shrink-0 flex items-center">
              <GoogleSignInButton
                onSignOut={handleSignOut}
                userRole={userRole}
                userEmail={userEmail}
                userName={userName}
                onRequestAccess={handleRequestAccess}
                isAccessRequested={isAccessRequested}
                isSubmittingAccessRequest={isSubmittingAccessRequest}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Global Toast Notification */}
      {globalToast && (
        <div className="fixed top-20 right-6 z-50 max-w-md bg-[#EADBBE] border-2 border-[#1A1A1A] text-[#1A1A1A] p-4 rounded-md shadow-[4px_4px_0px_0px_#1A1A1A] flex items-center justify-between gap-3 animate-fade-in-up">
          <div className="flex items-center gap-2.5">
            {globalToast.type === 'error' ? (
              <ShieldAlert className="w-5 h-5 text-red-600 shrink-0" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-[#1A1A1A] shrink-0" />
            )}
            <span className="text-xs font-bold">{globalToast.message}</span>
          </div>
          <button
            onClick={() => setGlobalToast(null)}
            className="p-1 hover:bg-[#1A1A1A]/10 rounded-xs transition text-[#1A1A1A] cursor-pointer"
            aria-label="Dismiss toast"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Content Area - View-based Routing exclusively rendering the matching component */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Time Simulator & Live Clock Controller */}
        <TimeController
          currentDay={currentDay}
          currentTime={currentTime}
          isSimulated={isSimulated}
          onDayChange={handleDayChange}
          onTimeChange={handleTimeChange}
          onResetToLive={handleResetToLive}
        />

        {/* View-based Router with Safe Default Fallback */}
        {(() => {
          switch (activeView) {
            case 'timetable':
              return (
                <TimetableMatrix
                  rooms={rooms}
                  currentDay={currentDay}
                  currentTime={currentTime}
                  onOpenRoomModal={(room) => {
                    setModalRoom(room);
                    setModalInitialBooking(false);
                  }}
                  onOpenImportModal={() => setIsImportModalOpen(true)}
                  bookmarkedRoomIds={bookmarkedRoomIds}
                  onToggleBookmarkRoom={toggleBookmark}
                />
              );
            case 'saved':
              return (
                <SavedClassesView
                  rooms={rooms}
                  bookmarkedRoomIds={bookmarkedRoomIds}
                  currentDay={currentDay}
                  currentTime={currentTime}
                  onToggleBookmarkRoom={toggleBookmark}
                  onOpenRoomModal={(room, bookingMode) => {
                    setModalRoom(room);
                    setModalInitialBooking(!!bookingMode);
                  }}
                  onNavigateToClassrooms={() => setActiveView('vacancies')}
                  userRole={userRole}
                  currentUserEmail={userEmail}
                />
              );
            case 'add_timetable':
              return (
                <div className="space-y-6">
                  <div className="bg-[#F4EBD9] border-2 border-[#1A1A1A] rounded-md p-6 sm:p-8 shadow-[4px_4px_0px_0px_#1A1A1A]">
                    <div className="max-w-2xl">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1A1A1A] text-[#F4EBD9] text-xs font-black uppercase tracking-wider rounded-none mb-3">
                        <span>Timetable Administration</span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#1A1A1A]">
                        Academic Timetable Import & Management
                      </h2>
                      <p className="text-xs sm:text-sm font-medium text-[#1A1A1A]/80 mt-2 leading-relaxed">
                        Bulk import semester schedules for NIT Raipur departments (CSE, IT, ECE, MECH, etc.), manage slot allocations, or restore default institutional timetables.
                      </p>
                    </div>

                    {/* Bento Grid Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-6">
                      {/* Bento Card 1: Open Full Import Modal */}
                      <div className="bg-[#F4EBD9] border-2 border-[#1A1A1A] rounded-md p-5 shadow-[4px_4px_0px_0px_#1A1A1A] flex flex-col justify-between">
                        <div>
                          <div className="w-10 h-10 bg-[#1A1A1A] text-[#F4EBD9] flex items-center justify-center border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A] mb-3">
                            <FileSpreadsheet className="w-5 h-5 text-[#F4EBD9]" />
                          </div>
                          <h3 className="text-sm font-black uppercase tracking-wider text-[#1A1A1A]">
                            Full Timetable Importer
                          </h3>
                          <p className="text-xs font-medium text-[#1A1A1A]/80 mt-1 leading-snug">
                            Access the multi-tab timetable importer dialog with CSV/Excel parsing, manual slot builder, and preview.
                          </p>
                        </div>
                        <button
                          onClick={() => setIsImportModalOpen(true)}
                          className="mt-4 w-full bg-[#1A1A1A] text-[#F4EBD9] font-bold border-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#1A1A1A] transition-all py-2.5 px-4 text-xs uppercase tracking-wider cursor-pointer"
                        >
                          Open Importer Modal
                        </button>
                      </div>

                      {/* Bento Card 2: View Current Timetable Matrix */}
                      <div className="bg-[#F4EBD9] border-2 border-[#1A1A1A] rounded-md p-5 shadow-[4px_4px_0px_0px_#1A1A1A] flex flex-col justify-between">
                        <div>
                          <div className="w-10 h-10 bg-[#1A1A1A] text-[#F4EBD9] flex items-center justify-center border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A] mb-3">
                            <Calendar className="w-5 h-5 text-[#F4EBD9]" />
                          </div>
                          <h3 className="text-sm font-black uppercase tracking-wider text-[#1A1A1A]">
                            View Timetable Matrix
                          </h3>
                          <p className="text-xs font-medium text-[#1A1A1A]/80 mt-1 leading-snug">
                            Inspect weekly classroom and lab allocations across all departments, years, and sections in tabular format.
                          </p>
                        </div>
                        <button
                          onClick={() => setActiveView('timetable')}
                          className="mt-4 w-full bg-[#F4EBD9] hover:bg-[#EADBBE] text-[#1A1A1A] font-bold border-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#1A1A1A] transition-all py-2.5 px-4 text-xs uppercase tracking-wider cursor-pointer"
                        >
                          Go To Timetable
                        </button>
                      </div>

                      {/* Bento Card 3: Restore Default Timetable */}
                      <div className="bg-[#F4EBD9] border-2 border-[#1A1A1A] rounded-md p-5 shadow-[4px_4px_0px_0px_#1A1A1A] flex flex-col justify-between">
                        <div>
                          <div className="w-10 h-10 bg-[#1A1A1A] text-[#F4EBD9] flex items-center justify-center border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A] mb-3">
                            <RotateCcw className="w-5 h-5 text-[#F4EBD9]" />
                          </div>
                          <h3 className="text-sm font-black uppercase tracking-wider text-[#1A1A1A]">
                            Reset Default Timetable
                          </h3>
                          <p className="text-xs font-medium text-[#1A1A1A]/80 mt-1 leading-snug">
                            Revert all room schedules back to the verified NIT Raipur official semester catalog.
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            if (window.confirm('Reset all classroom timetables to default institutional catalog?')) {
                              handleResetRooms();
                            }
                          }}
                          className="mt-4 w-full bg-[#F4EBD9] hover:bg-[#1A1A1A] text-[#1A1A1A] hover:text-[#F4EBD9] font-bold border-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#1A1A1A] transition-all py-2.5 px-4 text-xs uppercase tracking-wider cursor-pointer"
                        >
                          Reset All Schedules
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            case 'privacy':
              return (
                <PrivacyPolicy
                  onBackToClassrooms={() => setActiveView('vacancies')}
                />
              );
            case 'vacancies':
            default:
              return (
                <ClassroomExplorer
                  rooms={rooms}
                  currentDay={currentDay}
                  currentTime={currentTime}
                  onOpenRoomModal={(room, bookingMode) => {
                    setModalRoom(room);
                    setModalInitialBooking(!!bookingMode);
                  }}
                  bookmarkedRoomIds={bookmarkedRoomIds}
                  onToggleBookmark={toggleBookmark}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  userRole={userRole}
                  currentUserEmail={userEmail}
                  hideInternalSearch={true}
                />
              );
          }
        })()}
      </main>

      {/* Room Detail & Weekly Timetable Modal */}
      {modalRoom && (
        <RoomDetailModal
          room={modalRoom}
          currentDay={currentDay}
          currentTime={currentTime}
          onClose={() => {
            setModalRoom(null);
            setModalInitialBooking(false);
          }}
          isRoomBookmarked={bookmarkedRoomIds.includes(modalRoom.id)}
          onToggleBookmarkRoom={toggleBookmark}
          onScheduleUpdated={(updatedRoom) => {
            setModalRoom(updatedRoom);
            handleSaveRooms(rooms.map((r) => (r.id === updatedRoom.id ? updatedRoom : r)));
          }}
          userRole={userRole}
          currentUserEmail={userEmail}
          initialBookingMode={modalInitialBooking}
          onLocateOnMap={handleLocateOnMap}
        />
      )}

      {/* Timetable Import / Add Modal */}
      <TimetableImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        rooms={rooms}
        onSaveRooms={handleSaveRooms}
        onResetToDefault={handleResetRooms}
      />

      {/* Navigation Assistant Bot (FAB + Slide-out Drawer) */}
      <NavigationAssistant
        isOpen={isNavOpen}
        onOpen={() => setIsNavOpen(true)}
        onClose={() => setIsNavOpen(false)}
        onToggle={() => setIsNavOpen((prev) => !prev)}
        copiedRoomCode={copiedNavRoomCode}
      />

      {/* Footer */}
      <footer className="bg-[#F4EBD9] border-t-2 border-[#1A1A1A] py-6 mt-12 text-xs text-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-xs">
            <span className="font-black text-[#1A1A1A]">VacantDesk</span>
            <span>—</span>
            <span>NIT Raipur Classroom Vacancy Tracker</span>
          </div>

          {/* Developer "Reset Locks" Tool & Cache Wipe */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {resetLocksFeedback && (
              <span className="text-[11px] font-bold text-[#1A1A1A] bg-[#EADBBE] border-2 border-[#1A1A1A] px-2.5 py-1 rounded-md animate-in fade-in">
                ✓ {resetLocksFeedback}
              </span>
            )}
            <button
              onClick={handleHardReset}
              className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#1A1A1A] bg-[#F4EBD9] hover:bg-[#EADBBE] px-3 py-1.5 rounded-md border-2 border-[#1A1A1A] shadow-[3px_3px_0px_0px_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all cursor-pointer"
              title="Direct state reset: forces all rooms to vacant and clears all locks"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>[Dev] Reset All Room Locks</span>
            </button>
            <button
              onClick={() => {
                try {
                  localStorage.clear();
                } catch (e) {
                  console.error('Failed to clear localStorage:', e);
                }
                window.location.reload();
              }}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-[#1A1A1A] bg-[#F4EBD9] hover:bg-[#EADBBE] px-2.5 py-1.5 rounded-md border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
              title="Nuclear option: destroy all corrupted local data and reload application"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>[Dev] Clear Cache</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

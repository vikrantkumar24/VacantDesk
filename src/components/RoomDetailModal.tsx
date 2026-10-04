import React, { useState } from 'react';
import { Room, RoomScheduleItem, getRoomVacancyStatus } from '../data/campusData.ts';
import { useAuth } from '../context/AuthContext.tsx';
import { UserRole } from '../services/authService.ts';
import { finalizeRoomBooking } from '../services/roomRealtimeService.ts';
import { BookingSuccessful, BookingSuccessConfirmation, BookingDetails } from './BookingSuccessConfirmation.tsx';
import { 
  X, 
  Users, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  GraduationCap, 
  Layers, 
  MapPin, 
  BookOpen, 
  Bookmark, 
  CalendarPlus, 
  ShieldAlert, 
  Send,
  Compass,
  ChevronDown
} from 'lucide-react';

const BOOKING_DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
] as const;

const COMMON_TIME_BLOCKS = [
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00'
];

const ALL_TIME_SLOTS = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00'
];

interface RoomDetailModalProps {
  room: Room | null;
  currentDay: string;
  currentTime: string;
  onClose: () => void;
  isRoomBookmarked?: boolean;
  onToggleBookmarkRoom?: (roomId: string) => void;
  onScheduleUpdated?: (updatedRoom: Room) => void;
  userRole?: string;
  currentUserEmail?: string;
  initialBookingMode?: boolean;
  onLocateRoom?: (roomCode: string) => void;
  onLocateOnMap?: (roomCode: string) => void;
}

export const RoomDetailModal: React.FC<RoomDetailModalProps> = ({
  room,
  currentDay,
  currentTime,
  onClose,
  isRoomBookmarked,
  onToggleBookmarkRoom,
  onScheduleUpdated,
  userRole: userRoleProp,
  currentUserEmail,
  initialBookingMode = false,
  onLocateRoom,
  onLocateOnMap,
}) => {
  const handleLocate = onLocateOnMap || onLocateRoom;

  const { user, role } = useAuth();
  const userRole: UserRole | undefined = (userRoleProp as UserRole) || user?.role || role;

  let currentUser = user;
  if (!currentUser?.email) {
    if (currentUserEmail) {
      currentUser = {
        uid: currentUserEmail,
        email: currentUserEmail,
        displayName: currentUserEmail.split('@')[0],
        role: (userRoleProp as any) || 'student',
      } as any;
    } else {
      try {
        const stored = localStorage.getItem('campusPulseUser');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed?.email) {
            currentUser = {
              uid: parsed.email,
              email: parsed.email,
              displayName: parsed.displayName || parsed.email.split('@')[0],
              role: parsed.role,
            } as any;
          }
        }
      } catch {}
    }
  }

  const [showBookingForm, setShowBookingForm] = useState<boolean>(initialBookingMode);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(true);

  React.useEffect(() => {
    setShowBookingForm(initialBookingMode);
    setShowSuccess(false);
    setShowModal(true);
    setConfirmedBooking(null);
  }, [initialBookingMode, room?.id]);

  const [formData, setFormData] = useState({
    day: currentDay || 'Monday',
    startTime: '15:30',
    endTime: '16:30',
    courseCode: 'CS302',
    courseName: 'Advanced Operating Systems',
    instructor: currentUser ? (currentUser?.displayName || (currentUser as any)?.name || 'Faculty / CR Representative') : 'Faculty / CR Representative',
    reason: 'Mid-Semester Extra Lecture & Problem Solving',
  });

  const [isStartTimeDropdownOpen, setIsStartTimeDropdownOpen] = useState(false);
  const [isEndTimeDropdownOpen, setIsEndTimeDropdownOpen] = useState(false);

  const startDropdownRef = React.useRef<HTMLDivElement>(null);
  const endDropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (startDropdownRef.current && !startDropdownRef.current.contains(event.target as Node)) {
        setIsStartTimeDropdownOpen(false);
      }
      if (endDropdownRef.current && !endDropdownRef.current.contains(event.target as Node)) {
        setIsEndTimeDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  React.useEffect(() => {
    if (currentDay) {
      setFormData(prev => ({ ...prev, day: currentDay }));
    }
  }, [currentDay]);

  const bookingDay = formData.day;
  const bookingStartTime = formData.startTime;
  const bookingEndTime = formData.endTime;
  const bookingCourseCode = formData.courseCode;
  const bookingCourseName = formData.courseName;
  const bookingInstructor = formData.instructor;
  const bookingReason = formData.reason;

  const setBookingDay = (d: string) => setFormData(prev => ({ ...prev, day: d }));
  const setBookingStartTime = (t: string) => setFormData(prev => ({ ...prev, startTime: t }));
  const setBookingEndTime = (t: string) => setFormData(prev => ({ ...prev, endTime: t }));
  const setBookingCourseCode = (c: string) => setFormData(prev => ({ ...prev, courseCode: c }));
  const setBookingCourseName = (n: string) => setFormData(prev => ({ ...prev, courseName: n }));
  const setBookingInstructor = (i: string) => setFormData(prev => ({ ...prev, instructor: i }));
  const setBookingReason = (r: string) => setFormData(prev => ({ ...prev, reason: r }));

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [bookingSuccessMsg, setBookingSuccessMsg] = useState<string | null>(null);
  const [bookingErrorMsg, setBookingErrorMsg] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingDetails | null>(null);

  const isAuthorizedRole = userRole === 'cr' || userRole === 'faculty' || userRole === 'hod';

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!room) return;

    setIsSubmitting(true);
    setBookingErrorMsg(null);
    setBookingSuccessMsg(null);

    try {
      // Execute the real-time database lock:
      await finalizeRoomBooking(room.id, currentUserEmail || currentUser?.email || '');

      // Immediately update the local UI state so the room shows as booked:
      const newScheduleItem: RoomScheduleItem = {
        id: `bk-${Date.now()}`,
        day: (bookingDay || currentDay) as any,
        startTime: bookingStartTime,
        endTime: bookingEndTime,
        courseCode: bookingCourseCode,
        courseName: `${bookingCourseName} (Extra Class)`,
        instructor: bookingInstructor,
        branch: 'IT',
        degree: 'B.Tech',
        year: '3rd Year',
      };

      const updatedSchedule = [...room.schedule, newScheduleItem];
      const updatedRoom: Room = {
        ...room,
        status: 'booked',
        lockedBy: currentUserEmail || currentUser?.email || 'CR',
        schedule: updatedSchedule,
      };

      if (onScheduleUpdated) {
        onScheduleUpdated(updatedRoom);
      }

      // Generate the email handoff:
      const bookingSubject = bookingCourseName ? `${bookingCourseCode}: ${bookingCourseName}` : (bookingCourseCode || 'Extra Class');
      const targetEmail = "hod.it@nitrr.ac.in";
      const emailSubject = encodeURIComponent("Room Reservation: " + room.code + " for Extra Class");
      const emailBody = encodeURIComponent(
        "Respected Sir/Ma'am,\n\nPlease be informed that classroom " +
          room.code +
          " has been reserved.\n\nDate: " +
          currentDay +
          "\nTime: " +
          currentTime +
          "\nSubject: " +
          bookingSubject +
          "\nReserved By: " +
          (currentUserEmail || 'CR') +
          "\n\nKindly acknowledge."
      );

      // Prepare confirmation details for BookingSuccessConfirmation dialog:
      const mailtoLink = `mailto:${targetEmail}?subject=${emailSubject}&body=${emailBody}`;
      const bookingInfo: BookingDetails = {
        roomNumber: room.code,
        date: bookingDay || currentDay,
        time: `${bookingStartTime} - ${bookingEndTime}`,
        subject: bookingCourseName ? `${bookingCourseCode}: ${bookingCourseName}` : (bookingCourseCode || 'Extra Class'),
        courseCode: bookingCourseCode,
        crName: currentUser?.displayName || (currentUserEmail ? currentUserEmail.split('@')[0] : 'CR Representative'),
        instructor: bookingInstructor,
        reason: bookingReason,
        mailtoLink,
      };

      setConfirmedBooking(bookingInfo);
      setShowSuccess(true);
      setShowBookingForm(false);
      setBookingSuccessMsg(`Classroom ${room.code} booked successfully!`);

      window.dispatchEvent(
        new CustomEvent('app-toast', {
          detail: {
            message: `Classroom ${room.code} booked successfully!`,
            type: 'success',
          },
        })
      );
    } catch (error: any) {
      // Log the error to the console:
      console.error('Booking submission error:', error);

      // Show an error toast/notification to the user:
      const errorMessage = error?.message || 'Booking failed. Please try again.';
      setBookingErrorMsg(errorMessage);
      window.dispatchEvent(
        new CustomEvent('app-toast', {
          detail: {
            message: errorMessage,
            type: 'error',
          },
        })
      );
    } finally {
      // CRITICAL: This guarantees the buffering spinner turns off even if the process fails.
      setIsSubmitting(false);
    }
  };

  const handleBookRoom = handleBookingSubmit;

  if (!room) {
    return null;
  }

  const status = getRoomVacancyStatus(room, currentDay, currentTime);

  if (showSuccess && confirmedBooking) {
    return (
      <div className="fixed inset-0 z-50 bg-[#1A1A1A]/50 backdrop-blur-2xs flex items-center justify-center p-4 overflow-y-auto">
        <BookingSuccessful
          booking={confirmedBooking}
          onClose={() => {
            setShowSuccess(false);
            setConfirmedBooking(null);
            setShowModal(true);
            onClose();
          }}
          onBookAnother={() => {
            setShowSuccess(false);
            setConfirmedBooking(null);
            setShowModal(true);
            setShowBookingForm(true);
          }}
        />
      </div>
    );
  }

  if (!showModal) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#1A1A1A]/50 backdrop-blur-2xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#F4EBD9] border-2 border-[#1A1A1A] rounded-md max-w-2xl w-full p-6 space-y-5 my-8 text-[#1A1A1A] shadow-[6px_6px_0px_0px_#1A1A1A] animate-fade-in-up">
        
        {/* Top Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b-2 border-[#1A1A1A]">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="text-2xl font-black text-[#1A1A1A] tabular-nums">{room.code}</span>
              <button
                type="button"
                onClick={() => {
                  handleLocate?.(room.code);
                  onClose();
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1A1A1A] bg-[#F4EBD9] hover:bg-[#EADBBE] px-2.5 py-1 rounded-sm border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px] transition cursor-pointer"
                title={`Copy ${room.code} & Open Navigation Assistant`}
              >
                <Compass className="w-3.5 h-3.5 text-[#1A1A1A]" />
                <span>Locate Map</span>
              </button>
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-[#EADBBE] text-[#1A1A1A] border-2 border-[#1A1A1A]">
                {room.floor === 0 ? 'Ground Floor' : `Floor ${room.floor}`} · {room.wing}
              </span>
              {onToggleBookmarkRoom && (
                <button
                  onClick={() => onToggleBookmarkRoom(room.id)}
                  className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-sm border-2 border-[#1A1A1A] font-bold uppercase tracking-wider transition cursor-pointer ${
                    isRoomBookmarked
                      ? 'bg-[#1A1A1A] text-[#F4EBD9] shadow-[2px_2px_0px_0px_#1A1A1A]'
                      : 'bg-[#F4EBD9] hover:bg-[#EADBBE] text-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px]'
                  }`}
                  title={isRoomBookmarked ? 'Remove room from saved' : 'Bookmark this room'}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${isRoomBookmarked ? 'fill-[#F4EBD9]' : ''}`} />
                  <span>{isRoomBookmarked ? 'Saved' : 'Save'}</span>
                </button>
              )}
            </div>
            <h3 className="text-base font-black text-[#1A1A1A] mt-1 uppercase">{room.name}</h3>
            <p className="text-xs font-medium text-[#1A1A1A]/80">{room.wing} · {room.type}</p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-sm text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F4EBD9] border-2 border-[#1A1A1A] transition cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notifications */}
        {bookingSuccessMsg && (
          <div className="p-3.5 bg-[#EADBBE] border-2 border-[#1A1A1A] text-[#1A1A1A] rounded-md text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#1A1A1A] shrink-0" />
            <span>{bookingSuccessMsg}</span>
          </div>
        )}

        {bookingErrorMsg && (
          <div className="p-3.5 bg-[#EADBBE] border-2 border-[#1A1A1A] text-[#1A1A1A] rounded-md text-xs flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-[#1A1A1A] shrink-0 mt-0.5" />
            <div>
              <strong className="font-black block uppercase tracking-wider text-[11px]">Access Denied</strong>
              <span className="font-semibold">{bookingErrorMsg}</span>
            </div>
          </div>
        )}

        {/* Live Status Card */}
        <div className="p-4 rounded-md border-2 border-[#1A1A1A] bg-[#EADBBE]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-[#1A1A1A] flex items-center gap-1.5">
              {status.isVacant ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[#1A1A1A]" /> Currently Vacant ({currentTime})
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-[#1A1A1A]" /> Currently Occupied
                </>
              )}
            </span>
            {status.vacantUntil && (
              <span className="text-xs font-black uppercase tracking-wider text-[#F4EBD9] bg-[#1A1A1A] border border-[#1A1A1A] px-2.5 py-0.5 rounded-xs">
                Vacant until {status.vacantUntil}
              </span>
            )}
          </div>

          {status.currentScheduleItem ? (
            <div className="mt-3 text-xs text-[#1A1A1A] border-t-2 border-[#1A1A1A] pt-2.5 leading-relaxed">
              <span className="font-black text-xs text-[#1A1A1A]">
                {status.currentScheduleItem.courseCode}: {status.currentScheduleItem.courseName}
              </span>
              <p className="text-[#1A1A1A]/80 mt-0.5">
                Instructor: <strong>{status.currentScheduleItem.instructor}</strong> ({status.currentScheduleItem.degree} {status.currentScheduleItem.branch})
              </p>
              <p className="text-[#1A1A1A]/80 font-mono">
                Class Slot: {status.currentScheduleItem.startTime} - {status.currentScheduleItem.endTime}
              </p>
            </div>
          ) : status.nextScheduleItem ? (
            <div className="mt-2.5 text-xs text-[#1A1A1A]/90 leading-relaxed font-medium">
              Next scheduled lecture: <strong>{status.nextScheduleItem.courseCode} ({status.nextScheduleItem.courseName})</strong> at {status.nextScheduleItem.startTime}.
            </div>
          ) : (
            <p className="mt-2.5 text-xs text-[#1A1A1A]/80 leading-relaxed font-medium">
              No further scheduled lectures today. Perfect for uninterrupted group study or extra lectures.
            </p>
          )}
        </div>

        {/* Room Specifications Bento */}
        <div>
          <h4 className="text-xs font-black uppercase tracking-wider text-[#1A1A1A] mb-2">
            Room Specifications & Location
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-bold text-[#1A1A1A]">
            <div className="bg-[#F4EBD9] p-3 rounded-md border-2 border-[#1A1A1A] flex items-center gap-2">
              <Users className="w-4 h-4 text-[#1A1A1A]" />
              <span>{room.capacity} seats</span>
            </div>
            <div className="bg-[#F4EBD9] p-3 rounded-md border-2 border-[#1A1A1A] flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#1A1A1A]" />
              <span>{room.type}</span>
            </div>
            <div className="bg-[#F4EBD9] p-3 rounded-md border-2 border-[#1A1A1A] flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#1A1A1A]" />
              <span>{room.floor === 0 ? 'Ground' : `Floor ${room.floor}`}</span>
            </div>
            <div className="bg-[#F4EBD9] p-3 rounded-md border-2 border-[#1A1A1A] flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#1A1A1A]" />
              <span>{room.wing}</span>
            </div>
            <div className="bg-[#F4EBD9] p-3 rounded-md border-2 border-[#1A1A1A] flex items-center gap-2">
              <Users className="w-4 h-4 text-[#1A1A1A]" />
              <span>{room.capacity} Seats</span>
            </div>
            <div className="bg-[#F4EBD9] p-3 rounded-md border-2 border-[#1A1A1A] flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#1A1A1A]" />
              <span>{room.suitableForStudy ? 'Study Friendly' : 'Regular Hall'}</span>
            </div>
          </div>
        </div>

        {/* Booking Form (Expanded when 'Book Extra Class' clicked by authorized CR or Faculty) */}
        {isAuthorizedRole && showBookingForm && (
          <form 
            onSubmit={handleBookRoom}
            className="p-5 bg-[#EADBBE] border-2 border-[#1A1A1A] rounded-md space-y-4 shadow-[4px_4px_0px_0px_#1A1A1A] animate-fade-in-up"
          >
            <div className="flex items-center justify-between pb-2 border-b-2 border-[#1A1A1A]">
              <div className="flex items-center gap-2">
                <CalendarPlus className="w-4 h-4 text-[#1A1A1A]" />
                <h4 className="text-xs font-black uppercase tracking-wider text-[#1A1A1A]">
                  Reserve Extra Class in {room.code}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setShowBookingForm(false)}
                className="text-xs font-black uppercase text-[#1A1A1A] hover:underline cursor-pointer"
              >
                Cancel
              </button>
            </div>

            {/* 1. Custom Day Selector (Horizontal Scrolling Bento Box) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-[11px] font-black uppercase tracking-wider text-[#1A1A1A]">
                  Day of Reservation
                </label>
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 bg-[#F4EBD9] border border-[#1A1A1A] text-[#1A1A1A]">
                  {formData.day}
                </span>
              </div>
              <div className="overflow-x-auto hide-scrollbar flex gap-3 pb-2">
                {BOOKING_DAYS.map((d) => {
                  const isSelected = formData.day === d;
                  return (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, day: d }))}
                      className={`px-4 py-2 border-2 border-[#1A1A1A] font-bold cursor-pointer transition-all min-w-max flex-shrink-0 text-xs uppercase tracking-wider ${
                        isSelected
                          ? 'bg-[#1A1A1A] text-[#F4EBD9] shadow-[2px_2px_0px_0px_#1A1A1A] translate-x-[1px] translate-y-[1px]'
                          : 'bg-[#F4EBD9] text-[#1A1A1A] hover:bg-[#1A1A1A]/10'
                      }`}
                    >
                      {d}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Custom Time Selector (Stylized Dropdowns + Institutional Time Bento-Grid) */}
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Start Time Stylized Dropdown */}
                <div className="relative" ref={startDropdownRef}>
                  <label className="block text-[11px] font-black uppercase tracking-wider text-[#1A1A1A] mb-1">
                    Start Time
                  </label>
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      setIsStartTimeDropdownOpen(!isStartTimeDropdownOpen);
                      setIsEndTimeDropdownOpen(false);
                    }}
                    className="w-full bg-[#F4EBD9] border-2 border-[#1A1A1A] px-3 py-2 text-xs font-bold text-[#1A1A1A] flex items-center justify-between cursor-pointer shadow-[2px_2px_0px_0px_#1A1A1A] hover:bg-[#EADBBE] transition-all select-none"
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#1A1A1A]" />
                      <span className="font-mono font-black tabular-nums">{formData.startTime}</span>
                    </div>
                    <ChevronDown className={`w-3.5 h-3.5 text-[#1A1A1A] transition-transform duration-150 ${isStartTimeDropdownOpen ? 'rotate-180' : ''}`} />
                  </div>

                  {isStartTimeDropdownOpen && (
                    <div className="absolute left-0 top-full mt-1.5 w-full bg-[#F4EBD9] border-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A] z-50 max-h-48 overflow-y-auto p-1.5 space-y-1">
                      {ALL_TIME_SLOTS.map((t) => {
                        const isSelected = formData.startTime === t;
                        return (
                          <div
                            key={t}
                            role="button"
                            tabIndex={0}
                            onClick={() => {
                              setFormData((prev) => {
                                const next = { ...prev, startTime: t };
                                if (prev.endTime <= t) {
                                  const hour = parseInt(t.split(':')[0], 10);
                                  const min = t.split(':')[1];
                                  const endHour = Math.min(hour + 1, 20).toString().padStart(2, '0');
                                  next.endTime = `${endHour}:${min}`;
                                }
                                return next;
                              });
                              setIsStartTimeDropdownOpen(false);
                            }}
                            className={`px-3 py-1.5 text-xs font-bold cursor-pointer transition-all border border-transparent font-mono tabular-nums ${
                              isSelected
                                ? 'bg-[#1A1A1A] text-[#F4EBD9] shadow-[2px_2px_0px_0px_#1A1A1A] translate-x-[1px] translate-y-[1px]'
                                : 'bg-[#F4EBD9] text-[#1A1A1A] hover:bg-[#1A1A1A]/10'
                            }`}
                          >
                            {t}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* End Time Stylized Dropdown */}
                <div className="relative" ref={endDropdownRef}>
                  <label className="block text-[11px] font-black uppercase tracking-wider text-[#1A1A1A] mb-1">
                    End Time
                  </label>
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      setIsEndTimeDropdownOpen(!isEndTimeDropdownOpen);
                      setIsStartTimeDropdownOpen(false);
                    }}
                    className="w-full bg-[#F4EBD9] border-2 border-[#1A1A1A] px-3 py-2 text-xs font-bold text-[#1A1A1A] flex items-center justify-between cursor-pointer shadow-[2px_2px_0px_0px_#1A1A1A] hover:bg-[#EADBBE] transition-all select-none"
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#1A1A1A]" />
                      <span className="font-mono font-black tabular-nums">{formData.endTime}</span>
                    </div>
                    <ChevronDown className={`w-3.5 h-3.5 text-[#1A1A1A] transition-transform duration-150 ${isEndTimeDropdownOpen ? 'rotate-180' : ''}`} />
                  </div>

                  {isEndTimeDropdownOpen && (
                    <div className="absolute left-0 top-full mt-1.5 w-full bg-[#F4EBD9] border-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A] z-50 max-h-48 overflow-y-auto p-1.5 space-y-1">
                      {ALL_TIME_SLOTS.map((t) => {
                        const isSelected = formData.endTime === t;
                        return (
                          <div
                            key={t}
                            role="button"
                            tabIndex={0}
                            onClick={() => {
                              setFormData((prev) => ({ ...prev, endTime: t }));
                              setIsEndTimeDropdownOpen(false);
                            }}
                            className={`px-3 py-1.5 text-xs font-bold cursor-pointer transition-all border border-transparent font-mono tabular-nums ${
                              isSelected
                                ? 'bg-[#1A1A1A] text-[#F4EBD9] shadow-[2px_2px_0px_0px_#1A1A1A] translate-x-[1px] translate-y-[1px]'
                                : 'bg-[#F4EBD9] text-[#1A1A1A] hover:bg-[#1A1A1A]/10'
                            }`}
                          >
                            {t}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Bento Grid of Common Institutional Time Blocks */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-[#1A1A1A]/80">
                    Common Institutional Slots (09:00 - 17:00)
                  </label>
                  <span className="text-[10px] text-[#1A1A1A]/60 font-semibold hidden sm:inline">
                    Click to auto-set 1-hour block
                  </span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-1.5">
                  {COMMON_TIME_BLOCKS.map((t) => {
                    const isSelected = formData.startTime === t;
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => {
                          const hour = parseInt(t.split(':')[0], 10);
                          const min = t.split(':')[1];
                          const endHour = Math.min(hour + 1, 20).toString().padStart(2, '0');
                          setFormData((prev) => ({
                            ...prev,
                            startTime: t,
                            endTime: `${endHour}:${min}`,
                          }));
                          setIsStartTimeDropdownOpen(false);
                          setIsEndTimeDropdownOpen(false);
                        }}
                        className={`px-2 py-1.5 border-2 border-[#1A1A1A] font-bold cursor-pointer transition-all text-xs font-mono tabular-nums text-center ${
                          isSelected
                            ? 'bg-[#1A1A1A] text-[#F4EBD9] shadow-[2px_2px_0px_0px_#1A1A1A] translate-x-[1px] translate-y-[1px]'
                            : 'bg-[#F4EBD9] text-[#1A1A1A] hover:bg-[#1A1A1A]/10'
                        }`}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-[#1A1A1A] mb-1">Course Code</label>
                <input
                  type="text"
                  value={bookingCourseCode}
                  onChange={(e) => setBookingCourseCode(e.target.value)}
                  placeholder="e.g. CS302"
                  required
                  className="w-full bg-[#F4EBD9] border-2 border-[#1A1A1A] rounded-md px-3 py-2 text-xs font-bold text-[#1A1A1A] outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-[#1A1A1A] mb-1">Course Name</label>
                <input
                  type="text"
                  value={bookingCourseName}
                  onChange={(e) => setBookingCourseName(e.target.value)}
                  placeholder="e.g. Advanced Operating Systems"
                  required
                  className="w-full bg-[#F4EBD9] border-2 border-[#1A1A1A] rounded-md px-3 py-2 text-xs font-bold text-[#1A1A1A] outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-[#1A1A1A] mb-1">Instructor / Faculty</label>
                <input
                  type="text"
                  value={bookingInstructor}
                  onChange={(e) => setBookingInstructor(e.target.value)}
                  placeholder="Instructor name"
                  className="w-full bg-[#F4EBD9] border-2 border-[#1A1A1A] rounded-md px-3 py-2 text-xs font-bold text-[#1A1A1A] outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-[#1A1A1A] mb-1">Purpose / Note</label>
                <input
                  type="text"
                  value={bookingReason}
                  onChange={(e) => setBookingReason(e.target.value)}
                  placeholder="e.g. Makeup lecture / Problem solving"
                  className="w-full bg-[#F4EBD9] border-2 border-[#1A1A1A] rounded-md px-3 py-2 text-xs font-bold text-[#1A1A1A] outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setShowBookingForm(false)}
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#1A1A1A] bg-[#F4EBD9] hover:bg-[#EADBBE] border-2 border-[#1A1A1A] rounded-md cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-5 py-2 text-xs font-bold uppercase tracking-wider text-[#F4EBD9] bg-[#1A1A1A] border-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none rounded-md transition-all cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Verifying & Booking...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Confirm Extra Class Booking</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Full Weekly Schedule */}
        <div>
          <h4 className="text-xs font-black uppercase tracking-wider text-[#1A1A1A] mb-2 flex items-center justify-between">
            <span>Weekly Timetable Matrix ({room.schedule.length} sessions)</span>
            <span className="text-[11px] font-mono text-[#1A1A1A]/70">Monday - Saturday</span>
          </h4>

          {room.schedule.length === 0 ? (
            <p className="text-xs text-[#1A1A1A]/80 italic p-4 bg-[#EADBBE] border-2 border-[#1A1A1A] rounded-md text-center leading-relaxed font-semibold">
              No regular scheduled lectures in this room. Always open for student study.
            </p>
          ) : (
            <div className="max-h-48 overflow-y-auto divide-y-2 divide-[#1A1A1A] bg-[#F4EBD9] rounded-md border-2 border-[#1A1A1A]">
              {room.schedule.map((item) => (
                <div key={item.id} className="p-3 text-xs flex items-center justify-between gap-3 hover:bg-[#EADBBE] transition">
                  <div className="flex items-center gap-3">
                    <span className="font-extrabold text-[#1A1A1A] w-20 shrink-0 uppercase text-[11px]">{item.day}</span>
                    <span className="bg-[#1A1A1A] text-[#F4EBD9] font-mono font-bold px-2 py-0.5 rounded-sm text-[11px] border border-[#1A1A1A]">
                      {item.startTime} - {item.endTime}
                    </span>
                    <div>
                      <span className="font-black text-[#1A1A1A] block">{item.courseCode}: {item.courseName}</span>
                      <span className="text-[11px] font-medium text-[#1A1A1A]/80">{item.instructor} · {item.degree} {item.branch}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Actions */}
        <div className="pt-3 flex items-center justify-between border-t-2 border-[#1A1A1A]">
          <div>
            {isAuthorizedRole && !showBookingForm && (
              <button
                onClick={() => setShowBookingForm(true)}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#F4EBD9] bg-[#1A1A1A] border-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none rounded-md transition-all cursor-pointer"
                title="Book extra class (Authorized for CR, Faculty, and HOD)"
              >
                <CalendarPlus className="w-4 h-4" />
                <span>Book Extra Class</span>
              </button>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-[#1A1A1A] bg-[#F4EBD9] hover:bg-[#EADBBE] border-2 border-[#1A1A1A] shadow-[3px_3px_0px_0px_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px] rounded-md transition-all cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

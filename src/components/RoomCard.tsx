import React, { useState, useEffect } from 'react';
import { Room, getRoomVacancyStatus } from '../data/campusData.ts';
import { 
  Users, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Bookmark,
  Lock,
  AlertTriangle
} from 'lucide-react';
import { 
  subscribeToRoom, 
  acquireRoomLock, 
  updateRoomStatus,
  RoomRealtimeData 
} from '../services/roomRealtimeService.ts';
import { useAuth } from '../context/AuthContext.tsx';

interface RoomCardProps {
  room: Room;
  currentDay: string;
  currentTime: string;
  isBookmarked: boolean;
  onToggleBookmark: (roomId: string) => void;
  onOpenRoomModal: (room: Room, bookingMode?: boolean) => void;
  userRole?: string;
  currentUserEmail?: string;
  onLockFailed: (message: string) => void;
}

export const RoomCard: React.FC<RoomCardProps> = ({
  room,
  currentDay,
  currentTime,
  isBookmarked,
  onToggleBookmark,
  onOpenRoomModal,
  userRole,
  currentUserEmail = '',
  onLockFailed,
}) => {
  const { user } = useAuth();
  const [realtimeData, setRealtimeData] = useState<RoomRealtimeData | null>(null);
  const [isLocking, setIsLocking] = useState<boolean>(false);
  const [confirmCancelId, setConfirmCancelId] = useState<string | null>(null);

  // 1. Real-time subscription to Firestore room document
  useEffect(() => {
    const unsubscribe = subscribeToRoom(room.id, (data) => {
      setRealtimeData(data);
    });

    return () => {
      unsubscribe();
    };
  }, [room.id]);

  const currentUser = user
    ? {
        email: user.email,
        name: user.displayName || user.email.split('@')[0] || 'User',
      }
    : currentUserEmail
    ? {
        email: currentUserEmail,
        name: currentUserEmail.split('@')[0] || 'User',
      }
    : null;

  const effectiveUserEmail = (currentUser?.email || '').trim().toLowerCase();
  const isAuthorizedRole = userRole === 'cr' || userRole === 'faculty' || userRole === 'hod';

  // Synchronize room with real-time status and lock ownership
  const effectiveRoom: Room = {
    ...room,
    roomNumber: room.roomNumber || room.code,
    status: (realtimeData?.status || room.status || 'vacant') as any,
    lockedBy: realtimeData?.lockedBy !== undefined ? realtimeData.lockedBy : (room.lockedBy || null),
  };

  // Evaluate room status and active lock
  const roomStatus = String(effectiveRoom.status || 'vacant').toLowerCase();
  const lockedBy = String(effectiveRoom.lockedBy || '').trim().toLowerCase();
  const lockedUntil = Number(realtimeData?.lockedUntil) || 0;
  const isLockTimeout = lockedUntil > 0 && Date.now() > lockedUntil;

  const isBooked = roomStatus === 'booked';
  const isPendingOrLocked = (roomStatus === 'pending' || roomStatus === 'locked') && !isLockTimeout;

  const isLockedByAnother = isPendingOrLocked && lockedBy !== '' && lockedBy !== effectiveUserEmail;
  const isLockedByMe = isPendingOrLocked && lockedBy !== '' && lockedBy === effectiveUserEmail;

  // Check if room is booked AND currently logged-in user is the one who booked it
  const isBookedByCurrentUser =
    isBooked &&
    Boolean(currentUser?.email) &&
    Boolean(effectiveRoom.lockedBy) &&
    (effectiveRoom.lockedBy === currentUser?.email ||
      effectiveRoom.lockedBy?.trim().toLowerCase() === currentUser?.email?.trim().toLowerCase());

  // Button disabled only if booked (and not owned by current user) or locked by another
  const isButtonDisabled = (isBooked && !isBookedByCurrentUser) || isLockedByAnother;

  let buttonText = "Book Extra Class";
  if (isBooked) {
    buttonText = "Already Booked";
  } else if (isLockedByAnother) {
    buttonText = "Locked by Another CR";
  }

  // Tactile button styling according to editorial brutalist specs:
  // Active: bg-[#1A1A1A] text-[#F4EBD9] font-bold border-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none
  // Disabled: bg-transparent text-[#1A1A1A] opacity-50 cursor-not-allowed border-2 border-[#1A1A1A] shadow-none
  const actionButtonClass = isButtonDisabled
    ? "bg-transparent text-[#1A1A1A] opacity-50 cursor-not-allowed border-2 border-[#1A1A1A] shadow-none"
    : "bg-[#1A1A1A] text-[#F4EBD9] font-bold border-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none cursor-pointer transition-all";

  // Static timetable vacancy computation
  const vacancyStatus = getRoomVacancyStatus(room, currentDay, currentTime);

  // Cancellation Logic:
  const executeCancellation = async (roomObj: Room) => {
    // Security Check: if (room.status !== 'booked' || room.lockedBy !== currentUser?.email) return;
    if (
      roomObj.status !== 'booked' ||
      !currentUser?.email ||
      (roomObj.lockedBy !== currentUser?.email &&
        roomObj.lockedBy?.trim().toLowerCase() !== currentUser?.email?.trim().toLowerCase())
    ) {
      return;
    }

    try {
      // Update the room's state back to vacant:
      await updateRoomStatus(roomObj.id, { status: 'vacant', lockedBy: null });

      // Immediate optimistic update in local state:
      setRealtimeData({
        id: roomObj.id,
        code: roomObj.code,
        status: 'vacant',
        lockedBy: '',
        lockedUntil: 0,
        updatedAt: Date.now(),
      });

      // Clear inline confirmation state:
      setConfirmCancelId(null);

      // Native Email Handoff for Cancellation: Draft a mailto: link to notify the HOD of the cancellation.
      const target = "hod.it@nitrr.ac.in";
      const roomNum = roomObj.roomNumber || roomObj.code;
      const subject = encodeURIComponent(`Cancellation: Room ${roomNum} Reservation`);
      const body = encodeURIComponent(
        `Respected Sir/Ma'am,\n\nPlease be informed that the previous reservation for room ${roomNum} has been cancelled by the user.\n\nCancelled By: ${currentUser?.name || currentUser?.email || 'User'}\n\nKindly acknowledge.`
      );
      const mailtoLink = `mailto:${target}?subject=${subject}&body=${body}`;

      // Execute:
      window.location.href = mailtoLink;
    } catch (err) {
      console.error('Failed to cancel room booking:', err);
    }
  };

  const handleCancelClick = (roomId: string) => {
    setConfirmCancelId(roomId);
  };

  const handleBookExtraClass = async () => {
    if (isButtonDisabled) return;

    if (!effectiveUserEmail) {
      onLockFailed("Please sign in with your official NITRR account to book classrooms.");
      return;
    }

    if (isLocking) return;
    setIsLocking(true);

    try {
      const result = await acquireRoomLock(room.id, room.code, effectiveUserEmail);
      if (!result.success) {
        onLockFailed(result.error || "Failed: Another user just locked this room.");
        return;
      }

      onOpenRoomModal(room, true);
    } catch (err: any) {
      console.error('Lock acquisition error:', err);
      onLockFailed("Failed: Another user just locked this room.");
    } finally {
      setIsLocking(false);
    }
  };

  return (
    <div className="bg-[#F4EBD9] border-2 border-[#1A1A1A] rounded-md shadow-[4px_4px_0px_0px_#1A1A1A] p-6 flex flex-col justify-between relative transition-all animate-fade-in-up">
      
      {/* Structural Real-Time Lock Status Banner if state is active */}
      {isLockedByAnother && (
        <div 
          role="status"
          className="border-2 border-[#1A1A1A] bg-[#1A1A1A] text-[#F4EBD9] px-3.5 py-2 rounded-md mb-4 flex items-center justify-between font-bold text-xs uppercase tracking-wider"
        >
          <span className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-[#F4EBD9]" />
            <span>Another user is booking this room</span>
          </span>
          <span className="bg-[#F4EBD9] text-[#1A1A1A] px-2 py-0.5 rounded-sm font-mono text-[10px] font-black">
            LOCKED
          </span>
        </div>
      )}

      {isBooked && (
        <div className="border-2 border-[#1A1A1A] bg-[#1A1A1A] text-[#F4EBD9] px-3.5 py-2 rounded-md mb-4 flex items-center justify-between font-bold text-xs uppercase tracking-wider">
          <span className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#F4EBD9]" />
            <span>Reserved for Extra Class</span>
          </span>
          <span className="bg-[#F4EBD9] text-[#1A1A1A] px-2 py-0.5 rounded-sm font-mono text-[10px] font-black">
            BOOKED
          </span>
        </div>
      )}

      {isLockedByMe && (
        <div className="border-2 border-[#1A1A1A] bg-[#EADBBE] text-[#1A1A1A] px-3.5 py-2 rounded-md mb-4 flex items-center justify-between font-bold text-xs uppercase tracking-wider">
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#1A1A1A]" />
            <span>Locked by you (Booking Session)</span>
          </span>
          <span className="bg-[#1A1A1A] text-[#F4EBD9] px-2 py-0.5 rounded-sm font-mono text-[10px] font-black">
            ACTIVE
          </span>
        </div>
      )}

      {/* Structural Bento-Box Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-5">
        
        {/* Dominant Block: Room Code, Name, Specifications (3 Columns) */}
        <div className="md:col-span-3 border-2 border-[#1A1A1A] rounded-md bg-[#F4EBD9] p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-col">
                <span className="text-3xl font-black text-[#1A1A1A] tracking-tight tabular-nums">
                  {room.code}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]/70 mt-0.5">
                  {room.floor === 0 ? 'Ground Floor' : `Floor ${room.floor}`} · {room.wing}
                </span>
              </div>

              {/* Tactical Bookmark Toggle */}
              <button
                onClick={() => onToggleBookmark(room.id)}
                className={`p-2 rounded-md border-2 border-[#1A1A1A] transition-all cursor-pointer ${
                  isBookmarked
                    ? 'bg-[#1A1A1A] text-[#F4EBD9] shadow-[2px_2px_0px_0px_#1A1A1A]'
                    : 'bg-[#F4EBD9] text-[#1A1A1A] hover:bg-[#EADBBE] shadow-[2px_2px_0px_0px_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#1A1A1A]'
                }`}
                title={isBookmarked ? 'Remove bookmark' : 'Bookmark room'}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-[#F4EBD9]' : ''}`} />
              </button>
            </div>

            <h4 className="text-sm font-extrabold text-[#1A1A1A] mt-3 leading-snug">
              {room.name}
            </h4>
          </div>

          <div className="pt-3 mt-3 border-t-2 border-[#1A1A1A] flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-[#1A1A1A]">
            <span>{room.type}</span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-[#1A1A1A]" />
              {room.capacity} seats
            </span>
            <span aria-hidden="true">·</span>
            <span>{room.wing}</span>
          </div>
        </div>

        {/* Side Block: High-Contrast Structural Status (2 Columns) */}
        <div className={`md:col-span-2 border-2 border-[#1A1A1A] rounded-md p-4 flex flex-col justify-between ${
          isBooked || isLockedByAnother
            ? 'bg-[#EADBBE]'
            : vacancyStatus.isVacant
            ? 'bg-[#F4EBD9]'
            : 'bg-[#EADBBE]'
        }`}>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/70">
                STATUS
              </span>
              {/* Structural High-Contrast Badge */}
              <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-sm border-2 border-[#1A1A1A] ${
                isBooked || isLockedByAnother
                  ? 'bg-[#1A1A1A] text-[#F4EBD9]'
                  : vacancyStatus.isVacant
                  ? 'bg-[#1A1A1A] text-[#F4EBD9]'
                  : 'bg-[#F4EBD9] text-[#1A1A1A]'
              }`}>
                {isBooked ? 'BOOKED' : isLockedByAnother ? 'LOCKED' : vacancyStatus.isVacant ? 'VACANT' : 'OCCUPIED'}
              </span>
            </div>

            {isBooked ? (
              <div className="space-y-1">
                <p className="text-sm font-black text-[#1A1A1A] leading-tight">Class Booked</p>
                <p className="text-xs font-medium text-[#1A1A1A]/80 leading-snug">
                  Unavailable for extra scheduling.
                </p>
              </div>
            ) : isLockedByAnother ? (
              <div className="space-y-1">
                <p className="text-sm font-black text-[#1A1A1A] leading-tight">In Progress</p>
                <p className="text-xs font-medium text-[#1A1A1A]/80 leading-snug">
                  Lock acquired by another representative.
                </p>
              </div>
            ) : vacancyStatus.isVacant ? (
              <div className="space-y-1">
                <p className="text-sm font-black text-[#1A1A1A] leading-tight">Available Now</p>
                {vacancyStatus.vacantUntil ? (
                  <p className="text-xs font-bold text-[#1A1A1A] leading-snug">
                    Free until <span className="underline decoration-2">{vacancyStatus.vacantUntil}</span>
                  </p>
                ) : (
                  <p className="text-xs font-medium text-[#1A1A1A]/80 leading-snug">
                    Free rest of the day.
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-1">
                <p className="text-sm font-black text-[#1A1A1A] leading-tight">In Session</p>
                {vacancyStatus.timeRemainingMinutes !== undefined && (
                  <p className="text-xs font-bold text-[#1A1A1A] leading-snug">
                    Ends in {vacancyStatus.timeRemainingMinutes}m
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Contextual Lecture or Next Schedule Snippet inside the status block */}
          <div className="pt-2.5 mt-2.5 border-t-2 border-[#1A1A1A] text-[11px] leading-snug font-medium text-[#1A1A1A]">
            {vacancyStatus.isVacant && vacancyStatus.nextScheduleItem ? (
              <div>
                <span className="font-bold uppercase text-[10px] text-[#1A1A1A]/70 block">Next Up:</span>
                <span className="font-bold">{vacancyStatus.nextScheduleItem.courseCode}</span>
                <span className="block truncate text-[#1A1A1A]/90">{vacancyStatus.nextScheduleItem.courseName}</span>
                <span className="text-[10px] text-[#1A1A1A]/70 font-mono">
                  {vacancyStatus.nextScheduleItem.startTime} - {vacancyStatus.nextScheduleItem.endTime}
                </span>
              </div>
            ) : !vacancyStatus.isVacant && vacancyStatus.currentScheduleItem ? (
              <div>
                <span className="font-bold uppercase text-[10px] text-[#1A1A1A]/70 block">Current Lecture:</span>
                <span className="font-bold">{vacancyStatus.currentScheduleItem.courseCode}</span>
                <span className="block truncate text-[#1A1A1A]/90">{vacancyStatus.currentScheduleItem.courseName}</span>
                <span className="text-[10px] text-[#1A1A1A]/70 font-mono">
                  Faculty: {vacancyStatus.currentScheduleItem.instructor}
                </span>
              </div>
            ) : (
              <span className="text-[11px] text-[#1A1A1A]/80 font-semibold">
                No subsequent classes today.
              </span>
            )}
          </div>
        </div>

      </div>

      {/* Full-Width Bottom Block: Tactile Action Buttons */}
      <div className="border-t-2 border-[#1A1A1A] pt-4 flex flex-col sm:flex-row items-center gap-3">
        {/* Weekly Schedule button */}
        <button
          onClick={() => onOpenRoomModal(room, false)}
          className={`${isAuthorizedRole || isBookedByCurrentUser ? 'flex-1' : 'w-full'} inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold uppercase tracking-wider text-[#1A1A1A] bg-[#F4EBD9] hover:bg-[#EADBBE] border-2 border-[#1A1A1A] rounded-md shadow-[4px_4px_0px_0px_#1A1A1A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer`}
        >
          <Calendar className="w-4 h-4 text-[#1A1A1A]" />
          <span>Weekly Schedule</span>
        </button>

        {/* Action Button Area: Cancel Booking (if booked by current user) or Book Extra Class / Disabled Button */}
        {isBookedByCurrentUser ? (
          <div className="flex-1 w-full">
            {confirmCancelId === room.id ? (
              <div className="flex items-center gap-2 w-full animate-fade-in">
                {/* Button 1 (Abort): "No, Keep It" */}
                <button
                  type="button"
                  onClick={() => setConfirmCancelId(null)}
                  className="flex-1 py-2 px-3 text-xs font-bold uppercase tracking-wider text-[#1A1A1A] bg-[#EADBBE] hover:bg-[#F4EBD9] border-2 border-[#1A1A1A] shadow-[3px_3px_0px_0px_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#1A1A1A] transition-all cursor-pointer text-center"
                >
                  No, Keep It
                </button>
                {/* Button 2 (Confirm): "Yes, Cancel" */}
                <button
                  type="button"
                  onClick={() => executeCancellation(effectiveRoom)}
                  className="flex-1 py-2 px-3 text-xs uppercase tracking-wider bg-[#EF4444] text-[#1A1A1A] font-bold border-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#1A1A1A] transition-all cursor-pointer text-center flex items-center justify-center"
                >
                  Yes, Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => handleCancelClick(room.id)}
                className="w-full py-2 px-4 rounded-none font-bold flex items-center justify-center transition-all bg-transparent text-[#1A1A1A] border-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F4EBD9] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#1A1A1A] cursor-pointer text-xs uppercase tracking-wider"
              >
                Cancel Booking
              </button>
            )}
          </div>
        ) : isAuthorizedRole ? (
          <button
            onClick={handleBookExtraClass}
            disabled={isButtonDisabled || isLocking}
            className={`flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold uppercase tracking-wider rounded-md transition-all ${actionButtonClass} ${
              isLocking ? 'opacity-75 cursor-wait' : ''
            }`}
            title={
              isBooked
                ? "This room is already booked"
                : isLockedByAnother
                ? "Another user is currently booking this room"
                : "Book extra class (Authorized for CR, Faculty, and HOD)"
            }
          >
            {isLocking ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                <span>Checking Lock...</span>
              </>
            ) : (
              <span>{isBooked ? "🔒 Already Booked" : buttonText}</span>
            )}
          </button>
        ) : null}
      </div>

    </div>
  );
};

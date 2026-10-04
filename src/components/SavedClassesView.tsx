import React, { useState, useMemo } from 'react';
import { Room, getRoomVacancyStatus } from '../data/campusData.ts';
import { 
  Bookmark, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Search, 
  Trash2, 
  Building2, 
  Users, 
  Plus,
  Compass
} from 'lucide-react';

interface SavedClassesViewProps {
  rooms: Room[];
  bookmarkedRoomIds: string[];
  currentDay: string;
  currentTime: string;
  onToggleBookmarkRoom: (roomId: string) => void;
  onOpenRoomModal: (room: Room, bookingMode?: boolean) => void;
  onNavigateToClassrooms: () => void;
  userRole?: string;
  currentUserEmail?: string;
  onLocateRoom?: (roomCode: string) => void;
}

export const SavedClassesView: React.FC<SavedClassesViewProps> = ({
  rooms,
  bookmarkedRoomIds,
  currentDay,
  currentTime,
  onToggleBookmarkRoom,
  onOpenRoomModal,
  onNavigateToClassrooms,
  userRole,
  currentUserEmail,
  onLocateRoom,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'vacant' | 'occupied'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);
  const [addSearchQuery, setAddSearchQuery] = useState('');

  // 1. Get bookmarked room objects with live vacancy status
  const bookmarkedRooms = useMemo(() => {
    return rooms.filter((r) => bookmarkedRoomIds.includes(r.id));
  }, [rooms, bookmarkedRoomIds]);

  const roomsWithStatus = useMemo(() => {
    return bookmarkedRooms.map((room) => {
      const status = getRoomVacancyStatus(room, currentDay, currentTime);
      return { room, status };
    });
  }, [bookmarkedRooms, currentDay, currentTime]);

  // 2. Filter based on vacancy and search query
  const filteredRooms = useMemo(() => {
    return roomsWithStatus.filter(({ room, status }) => {
      if (filterMode === 'vacant' && !status.isVacant) return false;
      if (filterMode === 'occupied' && status.isVacant) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const codeMatch = room.code.toLowerCase().includes(q);
        const nameMatch = room.name.toLowerCase().includes(q);
        const wingMatch = room.wing.toLowerCase().includes(q);
        const scheduleMatch = room.schedule.some(
          (s) =>
            s.courseName.toLowerCase().includes(q) ||
            s.courseCode.toLowerCase().includes(q) ||
            s.instructor.toLowerCase().includes(q) ||
            s.branch.toLowerCase().includes(q)
        );
        return codeMatch || nameMatch || wingMatch || scheduleMatch;
      }

      return true;
    });
  }, [roomsWithStatus, filterMode, searchQuery]);

  const vacantCount = roomsWithStatus.filter((r) => r.status.isVacant).length;
  const occupiedCount = roomsWithStatus.length - vacantCount;

  // 3. Search catalog for adding any classroom to saved
  const catalogSearchResults = useMemo(() => {
    if (!addSearchQuery.trim()) {
      return rooms.filter((r) => !bookmarkedRoomIds.includes(r.id)).slice(0, 12);
    }
    const q = addSearchQuery.toLowerCase();
    return rooms.filter((r) => {
      return (
        r.code.toLowerCase().includes(q) ||
        r.name.toLowerCase().includes(q) ||
        r.wing.toLowerCase().includes(q)
      );
    }).slice(0, 16);
  }, [rooms, bookmarkedRoomIds, addSearchQuery]);

  // 4. Empty state when no rooms are saved yet
  if (bookmarkedRoomIds.length === 0) {
    return (
      <div className="space-y-5">
        <div className="bg-[#F4EBD9] border-2 border-[#1A1A1A] rounded-md p-6 shadow-[4px_4px_0px_0px_#1A1A1A] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-md bg-[#1A1A1A] text-[#F4EBD9] border-2 border-[#1A1A1A] flex items-center justify-center shadow-[2px_2px_0px_0px_#1A1A1A]">
              <Bookmark className="w-6 h-6 fill-[#F4EBD9]" />
            </div>
            <div>
              <h2 className="text-lg font-black text-[#1A1A1A] uppercase tracking-wide">Saved Classrooms Monitor</h2>
              <p className="text-xs font-medium text-[#1A1A1A]/80 leading-relaxed">
                Track live vacancies, current classes, and upcoming schedules for your saved rooms.
              </p>
            </div>
          </div>

          <button
            onClick={onNavigateToClassrooms}
            className="inline-flex items-center gap-2 bg-[#1A1A1A] text-[#F4EBD9] hover:bg-[#1A1A1A]/90 px-4 py-2.5 rounded-md border-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all text-xs font-bold uppercase tracking-wider cursor-pointer"
          >
            <span>Explore All Classrooms</span>
          </button>
        </div>

        <div className="text-center py-16 bg-[#F4EBD9] border-2 border-[#1A1A1A] rounded-md p-10 shadow-[4px_4px_0px_0px_#1A1A1A]">
          <Bookmark className="w-12 h-12 text-[#1A1A1A] mx-auto mb-3" />
          <h3 className="text-base font-black text-[#1A1A1A] uppercase tracking-wider">No classrooms saved yet</h3>
          <p className="text-xs font-medium text-[#1A1A1A]/80 mt-1 max-w-sm mx-auto leading-relaxed">
            Click the bookmark icon on any room card in the Classrooms explorer to monitor its live status here.
          </p>
          <button
            onClick={onNavigateToClassrooms}
            className="mt-6 inline-flex items-center gap-2 bg-[#1A1A1A] text-[#F4EBD9] px-5 py-2.5 rounded-md border-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none text-xs font-bold uppercase tracking-wider cursor-pointer"
          >
            Go to Classrooms & Vacancies
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header Strip with Add Button */}
      <div className="bg-[#F4EBD9] border-2 border-[#1A1A1A] rounded-md p-5 shadow-[4px_4px_0px_0px_#1A1A1A] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-md bg-[#1A1A1A] text-[#F4EBD9] border-2 border-[#1A1A1A] flex items-center justify-center shadow-[2px_2px_0px_0px_#1A1A1A]">
            <Bookmark className="w-5 h-5 fill-[#F4EBD9]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-[#1A1A1A] uppercase tracking-wide">Saved Classrooms Monitor</h2>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-sm bg-[#1A1A1A] text-[#F4EBD9] border border-[#1A1A1A]">
                {bookmarkedRooms.length} Saved
              </span>
            </div>
            <p className="text-xs font-medium text-[#1A1A1A]/80 leading-relaxed">
              Monitored room status updates in real time with active campus schedule.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddRoomOpen(!isAddRoomOpen)}
            className="inline-flex items-center gap-2 bg-[#F4EBD9] hover:bg-[#EADBBE] text-[#1A1A1A] px-3.5 py-2 rounded-md border-2 border-[#1A1A1A] shadow-[3px_3px_0px_0px_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all text-xs font-bold uppercase tracking-wider cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#1A1A1A]" />
            <span>{isAddRoomOpen ? 'Close Catalog' : 'Bookmark Room'}</span>
          </button>
        </div>
      </div>

      {/* Catalog Search & Add Dropdown Drawer */}
      {isAddRoomOpen && (
        <div className="bg-[#F4EBD9] border-2 border-[#1A1A1A] rounded-md p-5 shadow-[4px_4px_0px_0px_#1A1A1A] space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between pb-3 border-b-2 border-[#1A1A1A]">
            <span className="text-xs font-black uppercase tracking-wider text-[#1A1A1A]">
              Search Entire Campus Catalog to Bookmark
            </span>
            <button
              onClick={() => setIsAddRoomOpen(false)}
              className="text-xs font-black text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F4EBD9] px-2 py-0.5 border-2 border-[#1A1A1A] rounded-sm cursor-pointer"
            >
              Close
            </button>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1A1A1A]" />
            <input
              type="text"
              placeholder="Search by code (G-01, F-40, S-02, B-11, CCC), block, or wing..."
              value={addSearchQuery}
              onChange={(e) => setAddSearchQuery(e.target.value)}
              className="w-full bg-[#F4EBD9] text-xs font-bold text-[#1A1A1A] placeholder-[#1A1A1A]/50 rounded-md pl-10 pr-4 py-2.5 border-2 border-[#1A1A1A] focus:bg-[#EADBBE] outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 max-h-56 overflow-y-auto pr-1">
            {catalogSearchResults.length === 0 ? (
              <div className="col-span-full py-4 text-center text-xs font-bold text-[#1A1A1A]/70">
                No un-saved classrooms match your search.
              </div>
            ) : (
              catalogSearchResults.map((room) => {
                const isSaved = bookmarkedRoomIds.includes(room.id);
                return (
                  <div
                    key={room.id}
                    className="p-3 bg-[#F4EBD9] border-2 border-[#1A1A1A] rounded-md flex items-center justify-between gap-2 shadow-[2px_2px_0px_0px_#1A1A1A]"
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-black text-sm text-[#1A1A1A]">{room.code}</span>
                        <span className="text-[10px] font-bold text-[#1A1A1A]/70">({room.floor === 0 ? 'Ground' : `Floor ${room.floor}`})</span>
                      </div>
                      <span className="text-xs font-medium text-[#1A1A1A]/80 block truncate max-w-[130px]">
                        {room.name}
                      </span>
                    </div>

                    <button
                      onClick={() => onToggleBookmarkRoom(room.id)}
                      className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-sm border-2 border-[#1A1A1A] font-bold uppercase transition-all shrink-0 cursor-pointer ${
                        isSaved
                          ? 'bg-[#1A1A1A] text-[#F4EBD9] shadow-[2px_2px_0px_0px_#1A1A1A]'
                          : 'bg-[#F4EBD9] hover:bg-[#EADBBE] text-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px]'
                      }`}
                    >
                      <Bookmark className={`w-3 h-3 ${isSaved ? 'fill-[#F4EBD9]' : ''}`} />
                      <span>{isSaved ? 'Saved' : 'Save'}</span>
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Structural Metric Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#F4EBD9] border-2 border-[#1A1A1A] rounded-md p-5 shadow-[4px_4px_0px_0px_#1A1A1A] flex items-center justify-between">
          <div>
            <span className="text-[11px] font-black text-[#1A1A1A]/70 uppercase tracking-widest block">
              Bookmarked Rooms
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-black text-[#1A1A1A] tabular-nums">{bookmarkedRooms.length}</span>
              <span className="text-xs font-bold text-[#1A1A1A]/70 uppercase tracking-wider">Saved</span>
            </div>
            <p className="text-xs font-medium text-[#1A1A1A]/80 mt-1 leading-relaxed">Monitored in dashboard</p>
          </div>
          <span className="text-xs font-black uppercase px-2.5 py-1 bg-[#1A1A1A] text-[#F4EBD9] border-2 border-[#1A1A1A] rounded-sm">
            Monitored
          </span>
        </div>

        <div className="bg-[#F4EBD9] border-2 border-[#1A1A1A] rounded-md p-5 shadow-[4px_4px_0px_0px_#1A1A1A] flex items-center justify-between">
          <div>
            <span className="text-[11px] font-black text-[#1A1A1A]/70 uppercase tracking-widest block">
              Free Right Now
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-black text-[#1A1A1A] tabular-nums">{vacantCount}</span>
              <span className="text-xs font-bold text-[#1A1A1A]/70 uppercase tracking-wider">/ {bookmarkedRooms.length} Vacant</span>
            </div>
            <p className="text-xs font-medium text-[#1A1A1A]/80 mt-1 leading-relaxed">Ready for immediate study</p>
          </div>
          <span className="text-xs font-black uppercase px-2.5 py-1 bg-[#1A1A1A] text-[#F4EBD9] border-2 border-[#1A1A1A] rounded-sm">
            {vacantCount > 0 ? 'Available' : 'All Busy'}
          </span>
        </div>

        <div className="bg-[#F4EBD9] border-2 border-[#1A1A1A] rounded-md p-5 shadow-[4px_4px_0px_0px_#1A1A1A] flex items-center justify-between">
          <div>
            <span className="text-[11px] font-black text-[#1A1A1A]/70 uppercase tracking-widest block">
              Occupied Rooms
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-black text-[#1A1A1A] tabular-nums">{occupiedCount}</span>
              <span className="text-xs font-bold text-[#1A1A1A]/70 uppercase tracking-wider">In Session</span>
            </div>
            <p className="text-xs font-medium text-[#1A1A1A]/80 mt-1 leading-relaxed">Lectures currently ongoing</p>
          </div>
          <div className="w-10 h-10 rounded-md bg-[#1A1A1A] text-[#F4EBD9] border-2 border-[#1A1A1A] flex items-center justify-center">
            <Clock className="w-5 h-5 text-[#F4EBD9]" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#F4EBD9] border-2 border-[#1A1A1A] rounded-md p-4 shadow-[4px_4px_0px_0px_#1A1A1A] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all border-2 border-[#1A1A1A] cursor-pointer ${
                filterMode === 'all'
                  ? 'bg-[#1A1A1A] text-[#F4EBD9] shadow-[3px_3px_0px_0px_#1A1A1A]'
                  : 'bg-[#F4EBD9] text-[#1A1A1A] hover:bg-[#EADBBE] shadow-[2px_2px_0px_0px_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px]'
              }`}
            >
              All Saved ({bookmarkedRooms.length})
            </button>

            <button
              onClick={() => setFilterMode('vacant')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all border-2 border-[#1A1A1A] cursor-pointer ${
                filterMode === 'vacant'
                  ? 'bg-[#1A1A1A] text-[#F4EBD9] shadow-[3px_3px_0px_0px_#1A1A1A]'
                  : 'bg-[#F4EBD9] text-[#1A1A1A] hover:bg-[#EADBBE] shadow-[2px_2px_0px_0px_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px]'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Vacant Now ({vacantCount})</span>
            </button>

            <button
              onClick={() => setFilterMode('occupied')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all border-2 border-[#1A1A1A] cursor-pointer ${
                filterMode === 'occupied'
                  ? 'bg-[#1A1A1A] text-[#F4EBD9] shadow-[3px_3px_0px_0px_#1A1A1A]'
                  : 'bg-[#F4EBD9] text-[#1A1A1A] hover:bg-[#EADBBE] shadow-[2px_2px_0px_0px_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px]'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Occupied ({occupiedCount})</span>
            </button>
          </div>

          {/* Quick search in saved */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#1A1A1A]" />
            <input
              type="text"
              placeholder="Search in saved rooms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F4EBD9] text-xs font-bold text-[#1A1A1A] placeholder-[#1A1A1A]/50 rounded-md pl-9 pr-4 py-2 border-2 border-[#1A1A1A] focus:bg-[#EADBBE] outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-black uppercase text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F4EBD9] px-1.5 py-0.5 border border-[#1A1A1A] rounded-xs"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Bookmarked Rooms Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredRooms.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-[#F4EBD9] border-2 border-[#1A1A1A] rounded-md p-10 shadow-[4px_4px_0px_0px_#1A1A1A]">
            <Bookmark className="w-10 h-10 text-[#1A1A1A] mx-auto mb-3" />
            <h4 className="text-base font-black uppercase tracking-wider text-[#1A1A1A]">No saved classrooms match your filter</h4>
            <p className="text-xs font-medium text-[#1A1A1A]/80 mt-1 leading-relaxed">Try resetting the filter mode or search query.</p>
          </div>
        ) : (
          filteredRooms.map(({ room, status }) => {
            const todaySchedule = room.schedule
              .filter((s) => s.day === currentDay)
              .sort((a, b) => a.startTime.localeCompare(b.startTime));

            return (
              <div
                key={room.id}
                className="bg-[#F4EBD9] border-2 border-[#1A1A1A] rounded-md p-6 shadow-[4px_4px_0px_0px_#1A1A1A] flex flex-col justify-between transition-all"
              >
                <div>
                  {/* Top Bar: Code, Block badge, Saved tag, Remove Bookmark */}
                  <div className="flex items-start justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        type="button"
                        onClick={() => onLocateRoom?.(room.code)}
                        className="text-2xl font-black text-[#1A1A1A] bg-[#F4EBD9] hover:bg-[#EADBBE] px-3 py-1 rounded-md border-2 border-[#1A1A1A] tracking-tight inline-flex items-center gap-2 transition cursor-pointer shadow-[2px_2px_0px_0px_#1A1A1A]"
                        title={`Locate ${room.code} on Campus Map`}
                      >
                        <span>{room.code}</span>
                        <Compass className="w-4 h-4 text-[#1A1A1A]" />
                      </button>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]/70">
                        {room.floor === 0 ? 'Ground Floor' : `Floor ${room.floor}`} · {room.wing}
                      </span>
                    </div>

                    <button
                      onClick={() => onToggleBookmarkRoom(room.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F4EBD9] bg-[#F4EBD9] border-2 border-[#1A1A1A] px-2.5 py-1 rounded-md transition shadow-[2px_2px_0px_0px_#1A1A1A] cursor-pointer"
                      title="Remove from saved"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>

                  {/* Room Name & Type */}
                  <h4 className="text-sm font-extrabold text-[#1A1A1A] leading-snug">
                    {room.name}
                  </h4>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#1A1A1A]/80 mt-1">
                    <span>{room.type}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-[#1A1A1A]" />
                      {room.capacity} seats
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{room.wing}</span>
                  </div>

                  {/* Live Status Container */}
                  <div className="mt-4 p-4 rounded-md border-2 border-[#1A1A1A] bg-[#EADBBE]">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-wider text-[#1A1A1A]">
                        {status.isVacant ? 'Currently Vacant' : 'Occupied Right Now'}
                      </span>
                      <span className="text-[10px] font-black uppercase bg-[#1A1A1A] text-[#F4EBD9] px-2 py-0.5 rounded-sm border border-[#1A1A1A]">
                        {status.isVacant ? (status.vacantUntil ? `Until ${status.vacantUntil}` : 'Free') : `Ends in ${status.timeRemainingMinutes}m`}
                      </span>
                    </div>

                    {status.isVacant ? (
                      status.nextScheduleItem ? (
                        <div className="mt-2.5 text-xs text-[#1A1A1A] border-t-2 border-[#1A1A1A] pt-2 leading-relaxed">
                          <span className="font-bold uppercase text-[10px] text-[#1A1A1A]/70 block">Next:</span>
                          <strong className="font-black">{status.nextScheduleItem.courseCode}</strong> — {status.nextScheduleItem.courseName}
                          <div className="text-[11px] font-mono text-[#1A1A1A]/80 mt-0.5">
                            {status.nextScheduleItem.startTime} - {status.nextScheduleItem.endTime} ({status.nextScheduleItem.degree} {status.nextScheduleItem.branch})
                          </div>
                        </div>
                      ) : (
                        <p className="mt-2 text-xs font-semibold text-[#1A1A1A]/80 leading-relaxed">
                          Free for the remainder of {currentDay}.
                        </p>
                      )
                    ) : (
                      status.currentScheduleItem && (
                        <div className="mt-2.5 text-xs text-[#1A1A1A] border-t-2 border-[#1A1A1A] pt-2 leading-relaxed">
                          <div className="font-black text-xs">
                            {status.currentScheduleItem.courseCode}: {status.currentScheduleItem.courseName}
                          </div>
                          <div className="text-[11px] font-mono text-[#1A1A1A]/80 mt-0.5">
                            {status.currentScheduleItem.startTime} - {status.currentScheduleItem.endTime} · Faculty: {status.currentScheduleItem.instructor}
                          </div>
                        </div>
                      )
                    )}
                  </div>

                  {/* Today's Schedule Overview */}
                  <div className="mt-4">
                    <span className="text-[11px] font-black text-[#1A1A1A]/70 uppercase tracking-widest block mb-2">
                      Today's Lecture Agenda ({todaySchedule.length}):
                    </span>
                    {todaySchedule.length === 0 ? (
                      <p className="text-xs text-[#1A1A1A]/80 italic bg-[#EADBBE] p-3 rounded-md border-2 border-[#1A1A1A] leading-relaxed">
                        No scheduled classes in {room.code} on {currentDay}.
                      </p>
                    ) : (
                      <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                        {todaySchedule.map((slot) => {
                          const isCurrent = status.currentScheduleItem?.id === slot.id;
                          return (
                            <div
                              key={slot.id}
                              className={`p-2.5 rounded-md text-xs border-2 border-[#1A1A1A] transition ${
                                isCurrent
                                  ? 'bg-[#1A1A1A] text-[#F4EBD9]'
                                  : 'bg-[#F4EBD9] text-[#1A1A1A]'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className={`font-mono font-bold ${isCurrent ? 'text-[#F4EBD9]' : 'text-[#1A1A1A]'}`}>
                                  {slot.startTime} - {slot.endTime}
                                </span>
                                {isCurrent && (
                                  <span className="text-[9px] font-black uppercase text-[#1A1A1A] bg-[#F4EBD9] px-1.5 py-0.2 rounded-xs border border-[#F4EBD9]">
                                    LIVE NOW
                                  </span>
                                )}
                              </div>
                              <div className="text-xs font-extrabold mt-1">
                                {slot.courseCode}: {slot.courseName}
                              </div>
                              <div className={`text-[11px] font-medium ${isCurrent ? 'text-[#F4EBD9]/80' : 'text-[#1A1A1A]/70'}`}>
                                {slot.instructor} · {slot.branch} ({slot.degree})
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Actions: Weekly Schedule & Map Locator */}
                <div className="mt-5 pt-4 border-t-2 border-[#1A1A1A] flex items-center gap-3">
                  <button
                    onClick={() => onOpenRoomModal(room)}
                    className="flex-1 inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A1A1A] bg-[#F4EBD9] hover:bg-[#EADBBE] py-2.5 px-3 rounded-md border-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 text-[#1A1A1A]" />
                    <span>Weekly Schedule</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onLocateRoom?.(room.code)}
                    className="inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A1A1A] bg-[#F4EBD9] hover:bg-[#EADBBE] py-2.5 px-3 rounded-md border-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer"
                    title={`Locate ${room.code} on Campus Map`}
                  >
                    <Compass className="w-4 h-4 text-[#1A1A1A]" />
                    <span>Map</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

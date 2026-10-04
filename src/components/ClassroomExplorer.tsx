import React, { useState, useMemo, useEffect } from 'react';
import { Room, getRoomVacancyStatus } from '../data/campusData.ts';
import { RoomCard } from './RoomCard.tsx';
import { 
  Search, 
  Users, 
  BookOpen, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Bookmark,
  CalendarPlus,
  AlertTriangle,
  ChevronDown
} from 'lucide-react';

const VISIBLE_STEPS = [4, 10, 18, 30];

interface ClassroomExplorerProps {
  rooms: Room[];
  currentDay: string;
  currentTime: string;
  onOpenRoomModal: (room: Room, bookingMode?: boolean) => void;
  bookmarkedRoomIds: string[];
  onToggleBookmark: (roomId: string) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  userRole?: string;
  currentUserEmail?: string;
  hideInternalSearch?: boolean;
}

export const ClassroomExplorer: React.FC<ClassroomExplorerProps> = ({
  rooms,
  currentDay,
  currentTime,
  onOpenRoomModal,
  bookmarkedRoomIds,
  onToggleBookmark,
  searchQuery: externalSearchQuery,
  onSearchChange: externalOnSearchChange,
  userRole,
  currentUserEmail = '',
  hideInternalSearch = false,
}) => {
  const [internalSearchQuery, setInternalSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Progressive Disclosure State for energy conservation choice limitation
  const [stepIndex, setStepIndex] = useState<number>(0);
  const visibleCount = VISIBLE_STEPS[stepIndex];

  const handleLockFailed = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((cur) => (cur === msg ? null : cur));
    }, 4500);
  };
  const searchQuery = externalSearchQuery !== undefined ? externalSearchQuery : internalSearchQuery;
  const setSearchQuery = (val: string) => {
    if (externalOnSearchChange) {
      externalOnSearchChange(val);
    } else {
      setInternalSearchQuery(val);
    }
  };

  const [vacancyFilter, setVacancyFilter] = useState<'all' | 'vacant' | 'vacant-long' | 'saved'>('all');
  const [degreeFilter, setDegreeFilter] = useState<string>('all');
  const [branchFilter, setBranchFilter] = useState<string>('all');
  const [floorFilter, setFloorFilter] = useState<string>('all');
  const [yearFilter, setYearFilter] = useState<string>('all');

  // Compute vacancy details for each room
  const roomsWithStatus = useMemo(() => {
    return rooms.map((room) => {
      const status = getRoomVacancyStatus(room, currentDay, currentTime);
      return {
        room,
        status,
      };
    });
  }, [rooms, currentDay, currentTime]);

  // Filtered rooms
  const filteredRooms = useMemo(() => {
    return roomsWithStatus.filter(({ room, status }) => {
      // Vacancy & Saved filter
      if (vacancyFilter === 'vacant' && !status.isVacant) return false;
      if (vacancyFilter === 'vacant-long') {
        if (!status.isVacant) return false;
        if (status.timeRemainingMinutes !== undefined && status.timeRemainingMinutes < 60) return false;
      }
      if (vacancyFilter === 'saved' && !bookmarkedRoomIds.includes(room.id)) return false;

      // Floor filter
      if (floorFilter !== 'all') {
        if (floorFilter === 'ground' && !(room.floor === 0 && (room.code.startsWith('G-') || room.code === 'CCC' || room.code === 'APJ-HALL'))) return false;
        if (floorFilter === 'first' && !(room.floor === 1 || room.code.startsWith('F-') || room.code.startsWith('FN-'))) return false;
        if (floorFilter === 'second' && !(room.floor === 2 || room.code.startsWith('S-') || room.code.startsWith('SN-') || room.code === 'D3-D4')) return false;
        if (floorFilter === 'basement' && !room.code.startsWith('B-')) return false;
      }

      // Year / Semester filter
      if (yearFilter !== 'all') {
        const matchesYear = room.schedule.some((s) => {
          if (yearFilter === '1st Year') return s.year === '1st Year' || s.batch?.includes('1st Sem') || s.courseCode.includes('101') || s.courseCode.includes('102');
          if (yearFilter === '2nd Year') return s.year === '2nd Year' || s.batch?.includes('3rd Sem') || s.courseCode.includes('201') || s.courseCode.includes('202') || s.courseCode.includes('203');
          if (yearFilter === '3rd Year') return s.year === '3rd Year' || s.batch?.includes('5th Sem') || s.courseCode.includes('301') || s.courseCode.includes('302') || s.courseCode.includes('303');
          if (yearFilter === '4th Year') return s.year === '4th Year' || s.batch?.includes('7th Sem') || s.courseCode.includes('401') || s.courseCode.includes('402') || s.courseCode.includes('403');
          if (yearFilter === 'PG/Ph.D.') return s.degree === 'M.Tech' || s.degree === 'Ph.D.' || s.courseCode.startsWith('PHD') || s.courseCode.startsWith('CS5') || s.courseCode.startsWith('MA5');
          return false;
        });
        if (!matchesYear) return false;
      }

      // Degree filter
      if (degreeFilter !== 'all') {
        const matchesDegree = room.schedule.some((s) => s.degree === degreeFilter);
        if (!matchesDegree) return false;
      }

      // Branch filter
      if (branchFilter !== 'all') {
        const matchesBranch = room.schedule.some((s) => s.branch === branchFilter);
        if (!matchesBranch) return false;
      }

      // Search query
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
            s.branch.toLowerCase().includes(q) ||
            (s.batch && s.batch.toLowerCase().includes(q))
        );

        return codeMatch || nameMatch || wingMatch || scheduleMatch;
      }

      return true;
    });
  }, [roomsWithStatus, vacancyFilter, floorFilter, yearFilter, degreeFilter, branchFilter, searchQuery, bookmarkedRoomIds]);

  const vacantCount = roomsWithStatus.filter((r) => r.status.isVacant).length;
  const totalCount = roomsWithStatus.length;

  // Reset progressive disclosure step whenever filters or search query change
  useEffect(() => {
    setStepIndex(0);
  }, [vacancyFilter, degreeFilter, branchFilter, floorFilter, yearFilter, searchQuery]);

  // Progressive Disclosure: Slice filtered rooms to visibleCount
  const displayedRooms = filteredRooms.slice(0, visibleCount);

  const handleShowMore = () => {
    setStepIndex((prev) => prev + 1);
  };

  return (
    <div className="space-y-5">
      {/* Main Tactical Search Bar (renders when not hidden by header search) */}
      {!hideInternalSearch && (
        <div className="bg-[#F4EBD9] border-2 border-[#1A1A1A] rounded-md p-4 shadow-[4px_4px_0px_0px_#1A1A1A]">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#1A1A1A]" />
            <input
              type="text"
              placeholder="Search room code (G-01, F-40, S-02, B-11, FN-1), course, or faculty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F4EBD9] text-[#1A1A1A] placeholder-[#1A1A1A]/50 rounded-md pl-12 pr-24 py-3 border-2 border-[#1A1A1A] focus:bg-[#EADBBE] text-sm font-bold tracking-wide outline-none transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-black uppercase tracking-wider text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F4EBD9] px-2.5 py-1 bg-[#F4EBD9] border-2 border-[#1A1A1A] rounded-sm transition cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      )}

      {/* Structural Bento Metric Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Metric 1: Vacant Classrooms */}
        <div className="bg-[#F4EBD9] border-2 border-[#1A1A1A] rounded-md p-5 shadow-[4px_4px_0px_0px_#1A1A1A] flex items-center justify-between">
          <div>
            <span className="text-[11px] font-black text-[#1A1A1A]/70 uppercase tracking-widest block">
              Vacant Classrooms
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-black text-[#1A1A1A] tabular-nums">{vacantCount}</span>
              <span className="text-xs font-bold text-[#1A1A1A]/70 uppercase tracking-wider">/ {totalCount} Cataloged</span>
            </div>
            <p className="text-xs font-medium text-[#1A1A1A]/80 mt-1 leading-relaxed">
              Available right now for study and group work
            </p>
          </div>
          <span className="text-xs font-black uppercase px-3 py-1 bg-[#1A1A1A] text-[#F4EBD9] border-2 border-[#1A1A1A] rounded-sm shadow-[2px_2px_0px_0px_#1A1A1A]">
            Live Vacancy
          </span>
        </div>

        {/* Metric 2: Saved Classrooms with Toggle */}
        <div 
          onClick={() => setVacancyFilter(vacancyFilter === 'saved' ? 'all' : 'saved')}
          className={`bg-[#F4EBD9] border-2 border-[#1A1A1A] rounded-md p-5 shadow-[4px_4px_0px_0px_#1A1A1A] flex items-center justify-between cursor-pointer transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_#1A1A1A] ${
            vacancyFilter === 'saved' ? 'bg-[#EADBBE]' : ''
          }`}
          title="Click to toggle saved classrooms filter"
        >
          <div>
            <span className="text-[11px] font-black text-[#1A1A1A]/70 uppercase tracking-widest block">
              Saved Classrooms
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-black text-[#1A1A1A] tabular-nums">{bookmarkedRoomIds.length}</span>
              <span className="text-xs font-bold text-[#1A1A1A]/70 uppercase tracking-wider">Bookmarked</span>
            </div>
            <p className="text-xs font-bold text-[#1A1A1A] mt-1 leading-relaxed underline decoration-2">
              {vacancyFilter === 'saved' ? 'Showing saved rooms only' : 'Click to filter saved rooms'}
            </p>
          </div>
          <span className={`text-xs font-black uppercase px-3 py-1 rounded-sm border-2 border-[#1A1A1A] ${
            vacancyFilter === 'saved'
              ? 'bg-[#1A1A1A] text-[#F4EBD9]'
              : 'bg-[#F4EBD9] text-[#1A1A1A]'
          }`}>
            {bookmarkedRoomIds.length > 0 ? `${bookmarkedRoomIds.length} Saved` : 'None'}
          </span>
        </div>
      </div>

      {/* Filter Chips & Bar */}
      <div className="bg-[#F4EBD9] border-2 border-[#1A1A1A] rounded-md p-4 shadow-[4px_4px_0px_0px_#1A1A1A] space-y-3">
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Vacancy Filter Toggle Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setVacancyFilter('all')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all border-2 border-[#1A1A1A] cursor-pointer ${
                vacancyFilter === 'all'
                  ? 'bg-[#1A1A1A] text-[#F4EBD9] shadow-[3px_3px_0px_0px_#1A1A1A]'
                  : 'bg-[#F4EBD9] text-[#1A1A1A] hover:bg-[#EADBBE] shadow-[2px_2px_0px_0px_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px]'
              }`}
            >
              All ({totalCount})
            </button>
            <button
              onClick={() => setVacancyFilter('vacant')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all border-2 border-[#1A1A1A] cursor-pointer ${
                vacancyFilter === 'vacant'
                  ? 'bg-[#1A1A1A] text-[#F4EBD9] shadow-[3px_3px_0px_0px_#1A1A1A]'
                  : 'bg-[#F4EBD9] text-[#1A1A1A] hover:bg-[#EADBBE] shadow-[2px_2px_0px_0px_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px]'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Vacant Now ({vacantCount})</span>
            </button>
            <button
              onClick={() => setVacancyFilter('vacant-long')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all border-2 border-[#1A1A1A] cursor-pointer ${
                vacancyFilter === 'vacant-long'
                  ? 'bg-[#1A1A1A] text-[#F4EBD9] shadow-[3px_3px_0px_0px_#1A1A1A]'
                  : 'bg-[#F4EBD9] text-[#1A1A1A] hover:bg-[#EADBBE] shadow-[2px_2px_0px_0px_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px]'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Free {'>'} 1 hr</span>
            </button>
            <button
              onClick={() => setVacancyFilter(vacancyFilter === 'saved' ? 'all' : 'saved')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all border-2 border-[#1A1A1A] cursor-pointer ${
                vacancyFilter === 'saved'
                  ? 'bg-[#1A1A1A] text-[#F4EBD9] shadow-[3px_3px_0px_0px_#1A1A1A]'
                  : 'bg-[#F4EBD9] text-[#1A1A1A] hover:bg-[#EADBBE] shadow-[2px_2px_0px_0px_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px]'
              }`}
              title="Show only bookmarked classrooms"
            >
              <Bookmark className={`w-3.5 h-3.5 ${vacancyFilter === 'saved' ? 'fill-[#F4EBD9]' : ''}`} />
              <span>Saved ({bookmarkedRoomIds.length})</span>
            </button>
          </div>

          <div className="h-5 w-0.5 bg-[#1A1A1A] mx-1 hidden sm:block" />

          {/* Floor Level Filter */}
          <select
            value={floorFilter}
            onChange={(e) => setFloorFilter(e.target.value)}
            className="bg-[#F4EBD9] text-xs font-bold uppercase tracking-wider text-[#1A1A1A] border-2 border-[#1A1A1A] rounded-md px-3 py-1.5 shadow-[2px_2px_0px_0px_#1A1A1A] outline-none cursor-pointer"
          >
            <option value="all">All Floors</option>
            <option value="ground">Ground Floor (G-XX / CCC / APJ)</option>
            <option value="first">First Floor (F-XX / FN-X)</option>
            <option value="second">Second Floor (S-XX / SN-X)</option>
            <option value="basement">Lower Level / Core (B-XX)</option>
          </select>

          {/* Semester / Year Filter */}
          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="bg-[#F4EBD9] text-xs font-bold uppercase tracking-wider text-[#1A1A1A] border-2 border-[#1A1A1A] rounded-md px-3 py-1.5 shadow-[2px_2px_0px_0px_#1A1A1A] outline-none cursor-pointer"
          >
            <option value="all">All Semesters</option>
            <option value="1st Year">1st Year (Sem 1)</option>
            <option value="2nd Year">2nd Year (Sem 3)</option>
            <option value="3rd Year">3rd Year (Sem 5)</option>
            <option value="4th Year">4th Year (Sem 7)</option>
            <option value="PG/Ph.D.">M.Tech & Ph.D.</option>
          </select>

          {/* Degree Filter */}
          <select
            value={degreeFilter}
            onChange={(e) => setDegreeFilter(e.target.value)}
            className="bg-[#F4EBD9] text-xs font-bold uppercase tracking-wider text-[#1A1A1A] border-2 border-[#1A1A1A] rounded-md px-3 py-1.5 shadow-[2px_2px_0px_0px_#1A1A1A] outline-none cursor-pointer"
          >
            <option value="all">All Degrees</option>
            <option value="B.Tech">B.Tech Classrooms</option>
            <option value="M.Tech">M.Tech Studios</option>
            <option value="Ph.D.">Ph.D. Research Labs</option>
          </select>

          {/* Branch Filter */}
          <select
            value={branchFilter}
            onChange={(e) => setBranchFilter(e.target.value)}
            className="bg-[#F4EBD9] text-xs font-bold uppercase tracking-wider text-[#1A1A1A] border-2 border-[#1A1A1A] rounded-md px-3 py-1.5 shadow-[2px_2px_0px_0px_#1A1A1A] outline-none cursor-pointer"
          >
            <option value="all">All Branches</option>
            <option value="CSE">Computer Science (CSE)</option>
            <option value="IT">Information Tech (IT)</option>
            <option value="ECE">Electronics (ECE)</option>
            <option value="EEE">Electrical (EEE)</option>
            <option value="MECH">Mechanical (MECH)</option>
            <option value="CIVIL">Civil Engg</option>
            <option value="Chemical">Chemical Engg</option>
            <option value="Bio-Medical">Bio-Medical</option>
            <option value="Bio-Tech">Biotechnology</option>
            <option value="Mining">Mining Engg</option>
            <option value="Metallurgy">Metallurgical</option>
          </select>

          {(searchQuery || vacancyFilter !== 'all' || floorFilter !== 'all' || yearFilter !== 'all' || degreeFilter !== 'all' || branchFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setVacancyFilter('all');
                setFloorFilter('all');
                setYearFilter('all');
                setDegreeFilter('all');
                setBranchFilter('all');
              }}
              className="text-xs font-black uppercase text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F4EBD9] px-2.5 py-1 border-2 border-[#1A1A1A] rounded-sm ml-auto transition cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Atomic Lock Error Toast Notification */}
      {toastMessage && (
        <div
          role="alert"
          aria-live="assertive"
          className="fixed top-6 right-6 z-50 max-w-sm w-[calc(100vw-3rem)] bg-[#F4EBD9] border-2 border-[#1A1A1A] text-[#1A1A1A] p-5 rounded-md shadow-[6px_6px_0px_0px_#1A1A1A] flex items-start gap-3 animate-in fade-in"
        >
          <div className="w-9 h-9 rounded-md bg-[#1A1A1A] text-[#F4EBD9] border-2 border-[#1A1A1A] flex items-center justify-center shrink-0 font-bold">
            <AlertTriangle className="w-5 h-5 text-[#F4EBD9]" />
          </div>
          <div className="flex-1 min-w-0 pr-1">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#1A1A1A]">
              Concurrency Conflict
            </h4>
            <p className="text-xs font-bold text-[#1A1A1A] mt-1 leading-snug">
              {toastMessage}
            </p>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F4EBD9] p-1 text-xs font-black border-2 border-[#1A1A1A] rounded-sm cursor-pointer"
            aria-label="Dismiss toast"
          >
            ✕
          </button>
        </div>
      )}

      {/* Classroom Cards Grid with bento box RoomCard */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredRooms.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-[#F4EBD9] border-2 border-[#1A1A1A] rounded-md p-10 shadow-[4px_4px_0px_0px_#1A1A1A]">
            <BookOpen className="w-10 h-10 text-[#1A1A1A] mx-auto mb-3" />
            <h3 className="text-base font-black uppercase tracking-wider text-[#1A1A1A]">No classrooms match your query</h3>
            <p className="text-xs font-medium text-[#1A1A1A]/80 mt-1 max-w-sm mx-auto leading-relaxed">
              Try adjusting your search criteria or resetting filters to view all scheduled rooms.
            </p>
          </div>
        ) : (
          displayedRooms.map(({ room }) => (
            <RoomCard
              key={room.id}
              room={room}
              currentDay={currentDay}
              currentTime={currentTime}
              isBookmarked={bookmarkedRoomIds.includes(room.id)}
              onToggleBookmark={onToggleBookmark}
              onOpenRoomModal={onOpenRoomModal}
              userRole={userRole}
              currentUserEmail={currentUserEmail}
              onLockFailed={handleLockFailed}
            />
          ))
        )}
      </div>

      {/* Progressive Disclosure ("Show More") Button for Energy Conservation */}
      {filteredRooms.length > visibleCount && stepIndex < VISIBLE_STEPS.length - 1 && (
        <div className="flex flex-col items-center justify-center pt-6 pb-2">
          <button
            onClick={handleShowMore}
            className="inline-flex items-center gap-2.5 px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#1A1A1A] bg-[#F4EBD9] hover:bg-[#EADBBE] border-2 border-[#1A1A1A] rounded-md shadow-[4px_4px_0px_0px_#1A1A1A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer group"
          >
            <span>Show More Classrooms</span>
            <span className="font-mono text-[10px] font-black bg-[#1A1A1A] text-[#F4EBD9] px-2 py-0.5 rounded-xs">
              +{Math.min(VISIBLE_STEPS[stepIndex + 1] - visibleCount, filteredRooms.length - visibleCount)}
            </span>
            <ChevronDown className="w-4 h-4 text-[#1A1A1A] transition-transform duration-200 group-hover:translate-y-0.5" />
          </button>
          <p className="text-[11px] font-bold text-[#1A1A1A]/70 uppercase tracking-wider mt-2.5 text-center">
            Showing {displayedRooms.length} of {filteredRooms.length} rooms · Energy Conservation Mode
          </p>
        </div>
      )}
    </div>
  );
};

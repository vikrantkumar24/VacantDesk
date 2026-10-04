import React, { useState } from 'react';
import { Room, RoomScheduleItem } from '../data/campusData.ts';
import { 
  Calendar, 
  GraduationCap, 
  BookOpen, 
  User, 
  Search, 
  Plus,
  Building2,
  Bookmark,
  Compass
} from 'lucide-react';

interface TimetableMatrixProps {
  rooms: Room[];
  currentDay: string;
  currentTime: string;
  onOpenRoomModal: (room: Room) => void;
  onOpenImportModal?: () => void;
  bookmarkedRoomIds?: string[];
  onToggleBookmarkRoom?: (roomId: string) => void;
  onLocateRoom?: (roomCode: string) => void;
}

export const TimetableMatrix: React.FC<TimetableMatrixProps> = ({
  rooms,
  currentDay,
  currentTime,
  onOpenRoomModal,
  onOpenImportModal,
  bookmarkedRoomIds = [],
  onToggleBookmarkRoom,
  onLocateRoom,
}) => {
  const [selectedDegree, setSelectedDegree] = useState<'all' | 'B.Tech' | 'M.Tech' | 'Ph.D.'>('all');
  const [selectedBranch, setSelectedBranch] = useState<string>('all');
  const [selectedDay, setSelectedDay] = useState<string>(currentDay);
  const [selectedSemester, setSelectedSemester] = useState<string>('all');
  const [selectedFloor, setSelectedFloor] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Flatten all schedules with room references
  const allScheduleEntries: Array<RoomScheduleItem & { room: Room }> = rooms.flatMap((room) =>
    room.schedule.map((item) => ({
      ...item,
      room,
    }))
  );

  const filteredEntries = allScheduleEntries
    .filter((entry) => {
      if (selectedDay !== 'all' && entry.day !== selectedDay) return false;
      if (selectedDegree !== 'all' && entry.degree !== selectedDegree) return false;
      if (selectedBranch !== 'all' && entry.branch !== selectedBranch) return false;

      // Semester / Year filter
      if (selectedSemester !== 'all') {
        if (selectedSemester === '1st Year' && !(entry.year === '1st Year' || entry.batch?.includes('1st Sem') || entry.courseCode.includes('101') || entry.courseCode.includes('102'))) return false;
        if (selectedSemester === '2nd Year' && !(entry.year === '2nd Year' || entry.batch?.includes('3rd Sem') || entry.courseCode.includes('201') || entry.courseCode.includes('202') || entry.courseCode.includes('203'))) return false;
        if (selectedSemester === '3rd Year' && !(entry.year === '3rd Year' || entry.batch?.includes('5th Sem') || entry.courseCode.includes('301') || entry.courseCode.includes('302') || entry.courseCode.includes('303'))) return false;
        if (selectedSemester === '4th Year' && !(entry.year === '4th Year' || entry.batch?.includes('7th Sem') || entry.courseCode.includes('401') || entry.courseCode.includes('402') || entry.courseCode.includes('403'))) return false;
        if (selectedSemester === 'PG/Ph.D.' && !(entry.degree === 'M.Tech' || entry.degree === 'Ph.D.' || entry.courseCode.startsWith('PHD') || entry.courseCode.startsWith('CS5') || entry.courseCode.startsWith('MA5'))) return false;
      }

      // Floor filter
      if (selectedFloor !== 'all') {
        if (selectedFloor === 'ground' && !(entry.room.floor === 0 && (entry.room.code.startsWith('G-') || entry.room.code === 'CCC' || entry.room.code === 'APJ-HALL'))) return false;
        if (selectedFloor === 'first' && !(entry.room.floor === 1 || entry.room.code.startsWith('F-') || entry.room.code.startsWith('FN-'))) return false;
        if (selectedFloor === 'second' && !(entry.room.floor === 2 || entry.room.code.startsWith('S-') || entry.room.code.startsWith('SN-') || entry.room.code === 'D3-D4')) return false;
        if (selectedFloor === 'basement' && !entry.room.code.startsWith('B-')) return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const courseMatch = entry.courseName.toLowerCase().includes(q) || entry.courseCode.toLowerCase().includes(q);
        const instructorMatch = entry.instructor.toLowerCase().includes(q);
        const roomMatch = entry.room.code.toLowerCase().includes(q) || entry.room.name.toLowerCase().includes(q);
        const branchMatch = entry.branch.toLowerCase().includes(q);
        const batchMatch = entry.batch ? entry.batch.toLowerCase().includes(q) : false;
        return courseMatch || instructorMatch || roomMatch || branchMatch || batchMatch;
      }

      return true;
    })
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  return (
    <div className="space-y-5">
      {/* Top Filter Bar */}
      <div className="bg-[#F4EBD9] border-2 border-[#1A1A1A] rounded-md p-5 shadow-[4px_4px_0px_0px_#1A1A1A] space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-[#1A1A1A]" />
              <h3 className="text-base font-black uppercase tracking-wide text-[#1A1A1A]">
                Academic Timetable Matrix
              </h3>
              {onOpenImportModal && (
                <button
                  onClick={onOpenImportModal}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-sm bg-[#1A1A1A] text-[#F4EBD9] text-xs font-bold uppercase tracking-wider border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px] ml-2 cursor-pointer transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Import / Add Slots</span>
                </button>
              )}
            </div>
            <p className="text-xs font-medium text-[#1A1A1A]/80 mt-1 leading-relaxed">
              Course schedules for B.Tech, M.Tech specializations & Ph.D. seminars.
            </p>
          </div>

          {/* Day Selector - Tactile button array */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDay(d)}
                className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all shrink-0 border-2 border-[#1A1A1A] cursor-pointer ${
                  selectedDay === d
                    ? 'bg-[#1A1A1A] text-[#F4EBD9] shadow-[3px_3px_0px_0px_#1A1A1A]'
                    : 'bg-[#F4EBD9] text-[#1A1A1A] hover:bg-[#EADBBE] shadow-[2px_2px_0px_0px_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px]'
                }`}
              >
                {d.slice(0, 3)}
              </button>
            ))}
          </div>
        </div>

        {/* Filters row */}
        <div className="flex flex-wrap items-center gap-2.5 pt-3 border-t-2 border-[#1A1A1A]">
          {/* Search bar */}
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#1A1A1A]" />
            <input
              type="text"
              placeholder="Search course code, room (G-01, F-40, S-02), faculty, semester..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F4EBD9] text-xs font-bold text-[#1A1A1A] placeholder-[#1A1A1A]/50 rounded-md pl-9 pr-3 py-2 border-2 border-[#1A1A1A] focus:bg-[#EADBBE] outline-none"
            />
          </div>

          {/* Degree Filter */}
          <select
            value={selectedDegree}
            onChange={(e) => setSelectedDegree(e.target.value as any)}
            className="bg-[#F4EBD9] text-xs font-bold uppercase tracking-wider text-[#1A1A1A] border-2 border-[#1A1A1A] rounded-md px-3 py-2 shadow-[2px_2px_0px_0px_#1A1A1A] outline-none cursor-pointer"
          >
            <option value="all">All Degrees</option>
            <option value="B.Tech">B.Tech</option>
            <option value="M.Tech">M.Tech</option>
            <option value="Ph.D.">Ph.D.</option>
          </select>

          {/* Semester / Year Filter */}
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="bg-[#F4EBD9] text-xs font-bold uppercase tracking-wider text-[#1A1A1A] border-2 border-[#1A1A1A] rounded-md px-3 py-2 shadow-[2px_2px_0px_0px_#1A1A1A] outline-none cursor-pointer"
          >
            <option value="all">All Years</option>
            <option value="1st Year">1st Year (Sem 1)</option>
            <option value="2nd Year">2nd Year (Sem 3)</option>
            <option value="3rd Year">3rd Year (Sem 5)</option>
            <option value="4th Year">4th Year (Sem 7)</option>
            <option value="PG/Ph.D.">PG / Ph.D.</option>
          </select>

          {/* Floor Filter */}
          <select
            value={selectedFloor}
            onChange={(e) => setSelectedFloor(e.target.value)}
            className="bg-[#F4EBD9] text-xs font-bold uppercase tracking-wider text-[#1A1A1A] border-2 border-[#1A1A1A] rounded-md px-3 py-2 shadow-[2px_2px_0px_0px_#1A1A1A] outline-none cursor-pointer"
          >
            <option value="all">All Floors</option>
            <option value="ground">Ground Floor</option>
            <option value="first">First Floor</option>
            <option value="second">Second Floor</option>
            <option value="basement">Lower Level / Core</option>
          </select>

          {/* Branch Filter */}
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="bg-[#F4EBD9] text-xs font-bold uppercase tracking-wider text-[#1A1A1A] border-2 border-[#1A1A1A] rounded-md px-3 py-2 shadow-[2px_2px_0px_0px_#1A1A1A] outline-none cursor-pointer"
          >
            <option value="all">All Branches</option>
            <option value="CSE">Computer Science (CSE)</option>
            <option value="IT">Information Tech (IT)</option>
            <option value="ECE">Electronics (ECE)</option>
            <option value="EEE">Electrical (EEE)</option>
            <option value="MECH">Mechanical (MECH)</option>
            <option value="CIVIL">Civil Engineering</option>
            <option value="Chemical">Chemical Engineering</option>
            <option value="Bio-Medical">Biomedical Engineering</option>
            <option value="Bio-Tech">Biotechnology Engineering</option>
            <option value="Mining">Mining Engineering</option>
          </select>
        </div>
      </div>

      {/* Schedule Table / Cards */}
      <div className="bg-[#F4EBD9] border-2 border-[#1A1A1A] rounded-md overflow-hidden shadow-[4px_4px_0px_0px_#1A1A1A]">
        <div className="p-4 bg-[#EADBBE] border-b-2 border-[#1A1A1A] flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
          <span>Showing <strong className="font-black">{filteredEntries.length}</strong> scheduled sessions for <strong className="font-black">{selectedDay}</strong></span>
          <span className="text-[11px] font-mono">Chronological order</span>
        </div>

        {filteredEntries.length === 0 ? (
          <div className="p-12 text-center bg-[#F4EBD9]">
            <BookOpen className="w-10 h-10 text-[#1A1A1A] mx-auto mb-3" />
            <h4 className="text-sm font-black uppercase tracking-wider text-[#1A1A1A]">No lecture slots found</h4>
            <p className="text-xs font-medium text-[#1A1A1A]/80 mt-1 leading-relaxed">Try modifying your search or choosing another day of the week.</p>
          </div>
        ) : (
          <div className="divide-y-2 divide-[#1A1A1A]">
            {filteredEntries.map((entry) => (
              <div
                key={entry.id}
                className="p-4 hover:bg-[#EADBBE] transition flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
              >
                {/* Time & Degree tags */}
                <div className="flex items-center gap-3.5 md:w-60 shrink-0">
                  <div className="p-2 rounded-md bg-[#1A1A1A] text-[#F4EBD9] border-2 border-[#1A1A1A] text-center min-w-[95px] shadow-[2px_2px_0px_0px_#1A1A1A]">
                    <span className="text-xs font-black block tabular-nums">{entry.startTime}</span>
                    <span className="text-[10px] text-[#F4EBD9]/80 block font-mono">to {entry.endTime}</span>
                  </div>
                  <div>
                    <span className="inline-block text-[11px] font-black uppercase px-2 py-0.5 rounded-sm bg-[#F4EBD9] border-2 border-[#1A1A1A] text-[#1A1A1A]">
                      {entry.degree} {entry.year || ''}
                    </span>
                    <span className="block text-xs font-bold text-[#1A1A1A] mt-1">
                      {entry.branch}
                    </span>
                  </div>
                </div>

                {/* Course Name & Instructor */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-black text-[#1A1A1A] bg-[#EADBBE] px-2 py-0.5 rounded-sm border-2 border-[#1A1A1A]">
                      {entry.courseCode}
                    </span>
                    <h4 className="text-sm font-black text-[#1A1A1A]">{entry.courseName}</h4>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#1A1A1A]/80 mt-1">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-[#1A1A1A]" />
                      {entry.instructor}
                    </span>
                    {entry.batch && (
                      <span>· Batch: {entry.batch}</span>
                    )}
                  </div>
                </div>

                {/* Room location, Bookmark & Locate action */}
                <div className="flex items-center justify-between md:justify-end gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => onLocateRoom?.(entry.room.code)}
                    className="text-right hover:opacity-80 transition cursor-pointer group"
                    title={`Copy ${entry.room.code} & Open Navigation Assistant`}
                  >
                    <span className="text-sm font-black text-[#1A1A1A] flex items-center justify-end gap-1">
                      <span>{entry.room.code}</span>
                      <Compass className="w-3.5 h-3.5 text-[#1A1A1A]" />
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A]/70 block">
                      {entry.room.floor === 0 ? 'Ground Floor' : `Floor ${entry.room.floor}`} · {entry.room.wing}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onLocateRoom?.(entry.room.code)}
                    className="p-2 rounded-md bg-[#F4EBD9] hover:bg-[#EADBBE] text-[#1A1A1A] border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px] transition-all flex items-center gap-1 cursor-pointer"
                    title={`Copy ${entry.room.code} & Locate on Campus Map`}
                  >
                    <Compass className="w-4 h-4 text-[#1A1A1A]" />
                  </button>

                  {onToggleBookmarkRoom && (
                    <button
                      onClick={() => onToggleBookmarkRoom(entry.room.id)}
                      className={`p-2 rounded-md border-2 border-[#1A1A1A] transition-all flex items-center gap-1 cursor-pointer ${
                        bookmarkedRoomIds.includes(entry.room.id)
                          ? 'bg-[#1A1A1A] text-[#F4EBD9] shadow-[2px_2px_0px_0px_#1A1A1A]'
                          : 'bg-[#F4EBD9] hover:bg-[#EADBBE] text-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px]'
                      }`}
                      title={bookmarkedRoomIds.includes(entry.room.id) ? 'Remove room from saved' : `Bookmark room ${entry.room.code}`}
                    >
                      <Bookmark className={`w-4 h-4 ${bookmarkedRoomIds.includes(entry.room.id) ? 'fill-[#F4EBD9]' : ''}`} />
                    </button>
                  )}

                  <button
                    onClick={() => onOpenRoomModal(entry.room)}
                    className="p-2 rounded-md bg-[#F4EBD9] hover:bg-[#EADBBE] text-[#1A1A1A] border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px] transition-all flex items-center gap-1 cursor-pointer"
                    title="View classroom details & full schedule"
                  >
                    <Building2 className="w-4 h-4 text-[#1A1A1A]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

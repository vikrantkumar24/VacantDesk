import React from 'react';
import { Clock, Calendar, RefreshCw } from 'lucide-react';

interface TimeControllerProps {
  currentDay: string;
  currentTime: string;
  isSimulated: boolean;
  onDayChange: (day: string) => void;
  onTimeChange: (time: string) => void;
  onResetToLive: () => void;
}

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const TimeController: React.FC<TimeControllerProps> = ({
  currentDay,
  currentTime,
  isSimulated,
  onDayChange,
  onTimeChange,
  onResetToLive,
}) => {
  return (
    <div className="bg-[#F4EBD9] border-2 border-[#1A1A1A] text-[#1A1A1A] rounded-md p-5 mb-6 shadow-[4px_4px_0px_0px_#1A1A1A]">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Current Status Block */}
        <div className="flex items-center gap-3.5">
          <div className="flex items-center justify-center w-12 h-12 rounded-md bg-[#1A1A1A] border-2 border-[#1A1A1A] text-[#F4EBD9] shadow-[2px_2px_0px_0px_#1A1A1A]">
            <Clock className="w-6 h-6 text-[#F4EBD9]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#1A1A1A] bg-[#EADBBE] px-2 py-0.5 rounded-sm border border-[#1A1A1A]">
                {isSimulated ? 'Simulated Time Active' : 'Live Campus Time'}
              </span>
              {isSimulated && (
                <button
                  onClick={onResetToLive}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-[#1A1A1A] text-[#F4EBD9] hover:bg-[#1A1A1A]/90 px-2.5 py-1 rounded-sm border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
                  title="Reset to current live clock"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Sync Live</span>
                </button>
              )}
            </div>
            <div className="flex items-baseline gap-2.5 mt-1">
              <span className="text-3xl font-black text-[#1A1A1A] tracking-tight tabular-nums">{currentTime}</span>
              <span className="text-sm font-extrabold uppercase tracking-wider text-[#1A1A1A]">{currentDay}</span>
              <span className="text-xs font-bold text-[#1A1A1A]/70 hidden sm:inline">· Session 2026</span>
            </div>
          </div>
        </div>

        {/* Simulator controls with tactical borders & tactile feedback */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Day Selector */}
          <div className="flex items-center gap-2 bg-[#F4EBD9] px-3 py-1.5 rounded-md border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A]">
            <Calendar className="w-4 h-4 text-[#1A1A1A]" />
            <select
              value={currentDay}
              onChange={(e) => onDayChange(e.target.value)}
              className="bg-transparent text-xs font-bold uppercase tracking-wider text-[#1A1A1A] outline-none pr-1 py-0.5 cursor-pointer font-sans"
            >
              {DAYS_OF_WEEK.map((d) => (
                <option key={d} value={d} className="bg-[#F4EBD9] text-[#1A1A1A] font-bold">
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Time input */}
          <div className="flex items-center gap-2 bg-[#F4EBD9] px-3 py-1.5 rounded-md border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">Time:</span>
            <input
              type="time"
              value={currentTime}
              onChange={(e) => onTimeChange(e.target.value)}
              className="bg-transparent text-xs font-black text-[#1A1A1A] outline-none cursor-pointer tabular-nums"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

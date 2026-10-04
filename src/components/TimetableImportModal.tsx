import React, { useState, useRef } from 'react';
import { Room, RoomScheduleItem } from '../data/campusData.ts';
import { ALL_NITRR_ROOMS } from '../data/nitRaipurAllRooms.ts';
import { 
  NITRR_ROOM_G01, 
  NITRR_ROOM_G02, 
  NITRR_ROOM_G11, 
  NITRR_ROOM_G12, 
  NITRR_ROOM_G31 
} from '../data/nitRaipurGroundRooms.ts';
import { 
  NITRR_ROOM_F40, 
  NITRR_ROOM_F41, 
  NITRR_ROOM_F42, 
  NITRR_ROOM_F43, 
  NITRR_ROOM_F45, 
  NITRR_ROOM_F54 
} from '../data/nitRaipurFirstFloorRooms.ts';
import { 
  NITRR_ROOM_S01, 
  NITRR_ROOM_S02, 
  NITRR_ROOM_S11, 
  NITRR_ROOM_S21, 
  NITRR_ROOM_S31 
} from '../data/nitRaipurSecondFloorRooms.ts';
import { 
  NITRR_ROOM_B01, 
  NITRR_ROOM_B02, 
  NITRR_ROOM_B11, 
  NITRR_ROOM_B21 
} from '../data/nitRaipurBasementRooms.ts';
import { 
  X, 
  Plus, 
  Download, 
  FileSpreadsheet, 
  FileCode, 
  RotateCcw, 
  Check, 
  AlertCircle, 
  Copy,
  Calendar,
  Clock,
  BookOpen,
  User,
  Building,
  FileUp,
  Sparkles,
  Loader2,
  FileText,
  Layers,
  GraduationCap
} from 'lucide-react';

interface TimetableImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  rooms: Room[];
  onSaveRooms: (updatedRooms: Room[]) => void;
  onResetToDefault: () => void;
}

export function inferRoomMeta(roomCode: string): {
  name: string;
  block: Room['block'];
  blockShort: Room['blockShort'];
  floor: 0 | 1 | 2 | 3;
  wing: Room['wing'];
} {
  const code = roomCode.toUpperCase().trim();
  if (code.startsWith('G-') || code.startsWith('GN-')) {
    return {
      name: `Ground Floor Hall ${code}`,
      block: 'Block B (Circuits & Core)',
      blockShort: 'Block B',
      floor: 0,
      wing: 'North Wing',
    };
  }
  if (code.startsWith('FN-')) {
    return {
      name: `First Floor North Wing ${code}`,
      block: 'Block A (Computing & AI)',
      blockShort: 'Block A',
      floor: 1,
      wing: 'North Wing',
    };
  }
  if (code.startsWith('F-')) {
    return {
      name: `First Floor Hall ${code}`,
      block: 'Block A (Computing & AI)',
      blockShort: 'Block A',
      floor: 1,
      wing: 'East Wing',
    };
  }
  if (code.startsWith('SN-')) {
    return {
      name: `Second Floor North Wing ${code}`,
      block: 'Block B (Circuits & Core)',
      blockShort: 'Block B',
      floor: 2,
      wing: 'North Wing',
    };
  }
  if (code.startsWith('S-')) {
    return {
      name: `Second Floor Hall ${code}`,
      block: 'Block B (Circuits & Core)',
      blockShort: 'Block B',
      floor: 2,
      wing: 'South Wing',
    };
  }
  if (code.startsWith('B-')) {
    return {
      name: `Lower Level / Core Hall ${code}`,
      block: 'Block B (Circuits & Core)',
      blockShort: 'Block B',
      floor: 0,
      wing: 'South Wing',
    };
  }
  if (code === 'CCC') {
    return {
      name: 'Central Computer Center & Language Lab',
      block: 'Block A (Computing & AI)',
      blockShort: 'Block A',
      floor: 0,
      wing: 'Central',
    };
  }
  if (code === 'APJ' || code === 'APJ-HALL') {
    return {
      name: 'Dr. APJ Abdul Kalam Hall',
      block: 'Block A (Computing & AI)',
      blockShort: 'Block A',
      floor: 0,
      wing: 'Central',
    };
  }
  if (code === 'D3-D4' || code === 'D3D4') {
    return {
      name: 'Drawing Hall D-3 & D-4 (Graphics)',
      block: 'Block B (Circuits & Core)',
      blockShort: 'Block B',
      floor: 2,
      wing: 'East Wing',
    };
  }
  return {
    name: `Lecture Room ${code}`,
    block: 'Block A (Computing & AI)',
    blockShort: 'Block A',
    floor: 1,
    wing: 'Central',
  };
}

export const TimetableImportModal: React.FC<TimetableImportModalProps> = ({
  isOpen,
  onClose,
  rooms,
  onSaveRooms,
  onResetToDefault,
}) => {
  const [activeTab, setActiveTab] = useState<'pdf-ai' | 'presets' | 'csv-import' | 'quick-add' | 'json-import'>('pdf-ai');
  
  // AI PDF / Document state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isParsingDocument, setIsParsingDocument] = useState<boolean>(false);
  const [extractedClasses, setExtractedClasses] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Quick Add Form State
  const [targetRoomCode, setTargetRoomCode] = useState<string>(rooms[0]?.code || 'G-01');
  const [day, setDay] = useState<RoomScheduleItem['day']>('Monday');
  const [startTime, setStartTime] = useState<string>('09:00');
  const [endTime, setEndTime] = useState<string>('09:50');
  const [courseCode, setCourseCode] = useState<string>('');
  const [courseName, setCourseName] = useState<string>('');
  const [instructor, setInstructor] = useState<string>('');
  const [degree, setDegree] = useState<RoomScheduleItem['degree']>('B.Tech');
  const [branch, setBranch] = useState<RoomScheduleItem['branch']>('CSE');
  const [year, setYear] = useState<RoomScheduleItem['year']>('2nd Year');
  const [batch, setBatch] = useState<string>('3rd Sem');
  
  // CSV / Bulk Text State
  const [csvText, setCsvText] = useState<string>('');
  
  // JSON State
  const [jsonText, setJsonText] = useState<string>('');
  
  // Feedback messages
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [copiedTemplate, setCopiedTemplate] = useState<boolean>(false);

  if (!isOpen) return null;

  const sampleCsv = `RoomCode,Day,StartTime,EndTime,CourseCode,CourseName,Instructor,Branch,Degree,Year,Batch
G-01,Monday,09:00,09:50,EE201,Network Theory,Dr. Ebha Koley,EEE,B.Tech,2nd Year,3rd Sem
F-40,Monday,09:00,09:50,CS201,Theory of Computation,Dr. S. K. Dewangan,CSE,B.Tech,2nd Year,3rd Sem
S-02,Monday,10:40,11:30,ME308,Finite Element Methods,Dr. R. Salhotra,MECH,B.Tech,3rd Year,5th Sem
B-11,Monday,11:30,12:20,ME405,Robotics Kinematics & Vision,Dr. P. M. Ramteke,MECH,B.Tech,4th Year,7th Sem
F-54,Monday,15:40,17:15,CS501,Advanced Machine Learning,Dr. K. Mahajan,CSE,M.Tech,1st Year,M.Tech AI`;

  // Handle PDF / Document selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setExtractedClasses([]);
      setFeedback(null);
    }
  };

  // Upload and parse document with Gemini AI
  const handleParseDocument = async () => {
    if (!selectedFile) {
      setFeedback({ type: 'error', message: 'Please select a PDF or image file first.' });
      return;
    }

    setIsParsingDocument(true);
    setFeedback(null);

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const base64Data = reader.result as string;
          const res = await fetch('/api/timetable/parse-document', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              fileBase64: base64Data,
              mimeType: selectedFile.type || 'application/pdf',
            }),
          });

          const data = await res.json();
          if (!res.ok || !data.success) {
            throw new Error(data.error || 'Failed to parse timetable document.');
          }

          if (data.classes && data.classes.length > 0) {
            setExtractedClasses(data.classes);
            setFeedback({ 
              type: 'success', 
              message: `Gemini AI successfully extracted ${data.classes.length} timetable sessions from your document!` 
            });
          } else {
            setFeedback({ 
              type: 'error', 
              message: 'No timetable sessions could be clearly identified in this document. Try pasting CSV or raw text.' 
            });
          }
        } catch (innerErr: any) {
          setFeedback({ type: 'error', message: innerErr.message || 'Error communicating with parser.' });
        } finally {
          setIsParsingDocument(false);
        }
      };
      reader.readAsDataURL(selectedFile);
    } catch (err: any) {
      setIsParsingDocument(false);
      setFeedback({ type: 'error', message: err.message || 'Failed to read file.' });
    }
  };

  // Commit extracted AI classes to rooms
  const handleApplyExtractedClasses = () => {
    if (extractedClasses.length === 0) return;

    const updatedRooms = [...rooms];

    extractedClasses.forEach((item, index) => {
      const roomCode = (item.roomCode || 'G-01').toUpperCase().trim();
      const scheduleItem: RoomScheduleItem = {
        id: `ai-doc-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 4)}`,
        day: item.day || 'Monday',
        startTime: item.startTime || '09:00',
        endTime: item.endTime || '09:50',
        courseCode: (item.courseCode || 'GEN101').toUpperCase().trim(),
        courseName: item.courseName || 'Lecture Session',
        instructor: item.instructor || 'Faculty',
        branch: item.branch || 'CSE',
        degree: item.degree || 'B.Tech',
        year: item.year || '2nd Year',
        batch: item.batch || undefined,
      };

      const existingIndex = updatedRooms.findIndex(r => r.code.toUpperCase() === roomCode);
      if (existingIndex >= 0) {
        updatedRooms[existingIndex] = {
          ...updatedRooms[existingIndex],
          schedule: [...updatedRooms[existingIndex].schedule, scheduleItem],
        };
      } else {
        const meta = inferRoomMeta(roomCode);
        updatedRooms.push({
          id: `room-${roomCode.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
          code: roomCode,
          name: meta.name,
          block: meta.block,
          blockShort: meta.blockShort,
          floor: meta.floor,
          wing: meta.wing,
          capacity: 80,
          type: 'Classroom',
          amenities: {
            projector: true,
            ac: true,
            smartBoard: false,
            chargingSockets: 'Moderate',
            wifiSignal: 'Good',
            soundSystem: true,
          },
          suitableForStudy: true,
          coordinates: { x: 50, y: 50, width: 100, height: 80 },
          schedule: [scheduleItem],
        });
      }
    });

    onSaveRooms(updatedRooms);
    setFeedback({ type: 'success', message: `Added ${extractedClasses.length} timetable sessions to your campus rooms!` });
    setExtractedClasses([]);
    setSelectedFile(null);
  };

  // Quick Add single class
  const handleQuickAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseName.trim() || !courseCode.trim() || !instructor.trim()) {
      setFeedback({ type: 'error', message: 'Please provide course code, course name, and instructor.' });
      return;
    }

    const newItem: RoomScheduleItem = {
      id: `custom-slot-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      day,
      startTime,
      endTime,
      courseCode: courseCode.trim().toUpperCase(),
      courseName: courseName.trim(),
      instructor: instructor.trim(),
      branch,
      degree,
      year: degree === 'B.Tech' || degree === 'M.Tech' ? year : undefined,
      batch: batch.trim() || undefined,
    };

    const roomExists = rooms.some(r => r.code.toLowerCase() === targetRoomCode.toLowerCase());
    
    let updated: Room[];
    if (roomExists) {
      updated = rooms.map(r => {
        if (r.code.toLowerCase() === targetRoomCode.toLowerCase()) {
          return {
            ...r,
            schedule: [...r.schedule, newItem]
          };
        }
        return r;
      });
    } else {
      const meta = inferRoomMeta(targetRoomCode);
      const newRoom: Room = {
        id: `room-${targetRoomCode.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        code: targetRoomCode.toUpperCase(),
        name: meta.name,
        block: meta.block,
        blockShort: meta.blockShort,
        floor: meta.floor,
        wing: meta.wing,
        capacity: 80,
        type: 'Classroom',
        amenities: {
          projector: true,
          ac: true,
          smartBoard: false,
          chargingSockets: 'Moderate',
          wifiSignal: 'Good',
          soundSystem: true,
        },
        suitableForStudy: true,
        coordinates: { x: 50, y: 50, width: 100, height: 80 },
        schedule: [newItem],
      };
      updated = [...rooms, newRoom];
    }

    onSaveRooms(updated);
    setFeedback({ type: 'success', message: `Added ${newItem.courseCode} to ${targetRoomCode} successfully!` });
    setCourseCode('');
    setCourseName('');
    setInstructor('');
  };

  // CSV parse
  const handleParseCsv = () => {
    if (!csvText.trim()) {
      setFeedback({ type: 'error', message: 'Please enter CSV or spreadsheet text to import.' });
      return;
    }

    try {
      const lines = csvText.trim().split('\n');
      if (lines.length < 2) {
        setFeedback({ type: 'error', message: 'CSV must contain a header row and at least one data row.' });
        return;
      }

      const header = lines[0].split(',').map(h => h.trim().toLowerCase());
      const getIndex = (name: string, fallback: number) => {
        const idx = header.findIndex(h => h.includes(name));
        return idx !== -1 ? idx : fallback;
      };

      const roomIdx = getIndex('room', 0);
      const dayIdx = getIndex('day', 1);
      const startIdx = getIndex('start', 2);
      const endIdx = getIndex('end', 3);
      const codeIdx = getIndex('coursecode', 4);
      const nameIdx = getIndex('name', 5);
      const instIdx = getIndex('inst', 6);
      const branchIdx = getIndex('branch', 7);
      const degreeIdx = getIndex('degree', 8);
      const yearIdx = getIndex('year', 9);
      const batchIdx = getIndex('batch', 10);

      const updatedRooms = [...rooms];
      let importedCount = 0;

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        const cols = line.split(',').map(c => c.trim().replace(/^["']|["']$/g, ''));
        if (cols.length < 5) continue;

        const roomCode = (cols[roomIdx] || 'G-01').toUpperCase();
        const itemDay = (cols[dayIdx] || 'Monday') as RoomScheduleItem['day'];
        const sTime = cols[startIdx] || '09:00';
        const eTime = cols[endIdx] || '09:50';
        const cCode = (cols[codeIdx] || 'GEN101').toUpperCase();
        const cName = cols[nameIdx] || 'General Lecture';
        const cInst = cols[instIdx] || 'Faculty Member';
        const cBranch = (cols[branchIdx] || 'CSE') as RoomScheduleItem['branch'];
        const cDegree = (cols[degreeIdx] || 'B.Tech') as RoomScheduleItem['degree'];
        const cYear = (cols[yearIdx] || '2nd Year') as RoomScheduleItem['year'];
        const cBatch = cols[batchIdx] || undefined;

        const scheduleItem: RoomScheduleItem = {
          id: `csv-${Date.now()}-${i}-${Math.random().toString(36).substr(2, 4)}`,
          day: itemDay,
          startTime: sTime,
          endTime: eTime,
          courseCode: cCode,
          courseName: cName,
          instructor: cInst,
          branch: cBranch,
          degree: cDegree,
          year: cYear,
          batch: cBatch,
        };

        const existingRoomIndex = updatedRooms.findIndex(r => r.code.toUpperCase() === roomCode);
        if (existingRoomIndex >= 0) {
          updatedRooms[existingRoomIndex] = {
            ...updatedRooms[existingRoomIndex],
            schedule: [...updatedRooms[existingRoomIndex].schedule, scheduleItem],
          };
        } else {
          const meta = inferRoomMeta(roomCode);
          updatedRooms.push({
            id: `room-${roomCode.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
            code: roomCode,
            name: meta.name,
            block: meta.block,
            blockShort: meta.blockShort,
            floor: meta.floor,
            wing: meta.wing,
            capacity: 80,
            type: 'Classroom',
            amenities: {
              projector: true,
              ac: true,
              smartBoard: false,
              chargingSockets: 'Moderate',
              wifiSignal: 'Good',
              soundSystem: true,
            },
            suitableForStudy: true,
            coordinates: { x: 40, y: 40, width: 100, height: 80 },
            schedule: [scheduleItem],
          });
        }
        importedCount++;
      }

      onSaveRooms(updatedRooms);
      setFeedback({ type: 'success', message: `Successfully imported ${importedCount} timetable sessions!` });
      setCsvText('');
    } catch (err: any) {
      setFeedback({ type: 'error', message: `CSV import failed: ${err?.message || 'Invalid format'}` });
    }
  };

  const handleExportCsv = () => {
    const rows = [
      'RoomCode,Day,StartTime,EndTime,CourseCode,CourseName,Instructor,Branch,Degree,Year,Batch'
    ];
    rooms.forEach(r => {
      r.schedule.forEach(s => {
        rows.push(`"${r.code}","${s.day}","${s.startTime}","${s.endTime}","${s.courseCode}","${s.courseName}","${s.instructor}","${s.branch}","${s.degree}","${s.year || ''}","${s.batch || ''}"`);
      });
    });

    const blob = new Blob([rows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nit_raipur_timetable_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportJson = () => {
    const jsonStr = JSON.stringify(rooms, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nit_raipur_rooms_and_schedules_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJson = () => {
    if (!jsonText.trim()) {
      setFeedback({ type: 'error', message: 'Please paste JSON rooms configuration to import.' });
      return;
    }
    try {
      const parsed = JSON.parse(jsonText.trim());
      if (!Array.isArray(parsed)) {
        throw new Error('Root JSON must be an array of Room objects.');
      }
      onSaveRooms(parsed);
      setFeedback({ type: 'success', message: `Imported ${parsed.length} rooms from JSON successfully!` });
      setJsonText('');
    } catch (err: any) {
      setFeedback({ type: 'error', message: `Invalid JSON: ${err.message}` });
    }
  };

  // Preset semester loaders
  const handleLoadFullMatrix = () => {
    onSaveRooms(ALL_NITRR_ROOMS);
    setFeedback({ type: 'success', message: 'Loaded Complete NIT Raipur Timetable Suite (All 28 Rooms across B.Tech, M.Tech & Ph.D.)!' });
  };

  const handleMergeSemesterPack = (packRooms: Room[], packName: string) => {
    const merged = [...rooms];
    packRooms.forEach(pRoom => {
      const idx = merged.findIndex(r => r.code.toUpperCase() === pRoom.code.toUpperCase());
      if (idx >= 0) {
        // Replace room with official room or merge
        merged[idx] = pRoom;
      } else {
        merged.push(pRoom);
      }
    });
    onSaveRooms(merged);
    setFeedback({ type: 'success', message: `Loaded ${packName} into your campus timetable!` });
  };

  const handleCopySample = () => {
    navigator.clipboard.writeText(sampleCsv);
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1A1A1A]/50 backdrop-blur-2xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#F4EBD9] border-2 border-[#1A1A1A] rounded-md w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden text-[#1A1A1A] shadow-[6px_6px_0px_0px_#1A1A1A] animate-fade-in-up">
        
        {/* Header */}
        <div className="p-5 border-b-2 border-[#1A1A1A] flex items-center justify-between bg-[#F4EBD9]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-[#1A1A1A] border-2 border-[#1A1A1A] flex items-center justify-center text-[#F4EBD9] shadow-[2px_2px_0px_0px_#1A1A1A]">
              <Calendar className="w-5 h-5 text-[#F4EBD9]" />
            </div>
            <div>
              <h3 className="text-base font-black uppercase tracking-wide text-[#1A1A1A]">
                Add & Import College Timetables
              </h3>
              <p className="text-xs font-semibold text-[#1A1A1A]/70 leading-relaxed">
                Upload PDFs, load semester packs (G-XX, F-XX, S-XX, B-XX), or paste spreadsheets.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-sm text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F4EBD9] transition border-2 border-[#1A1A1A] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center border-b-2 border-[#1A1A1A] bg-[#F4EBD9] px-5 pt-3 gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => { setActiveTab('pdf-ai'); setFeedback(null); }}
            className={`flex items-center gap-1.5 pb-2.5 px-3 text-xs font-bold uppercase tracking-wider border-b-2 transition shrink-0 cursor-pointer ${
              activeTab === 'pdf-ai'
                ? 'border-[#1A1A1A] text-[#1A1A1A] font-black'
                : 'border-transparent text-[#1A1A1A]/60 hover:text-[#1A1A1A]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Upload PDF / Document (AI)
          </button>

          <button
            onClick={() => { setActiveTab('presets'); setFeedback(null); }}
            className={`flex items-center gap-1.5 pb-2.5 px-3 text-xs font-bold uppercase tracking-wider border-b-2 transition shrink-0 cursor-pointer ${
              activeTab === 'presets'
                ? 'border-[#1A1A1A] text-[#1A1A1A] font-black'
                : 'border-transparent text-[#1A1A1A]/60 hover:text-[#1A1A1A]'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            Semester Packs
          </button>

          <button
            onClick={() => { setActiveTab('csv-import'); setFeedback(null); }}
            className={`flex items-center gap-1.5 pb-2.5 px-3 text-xs font-bold uppercase tracking-wider border-b-2 transition shrink-0 cursor-pointer ${
              activeTab === 'csv-import'
                ? 'border-[#1A1A1A] text-[#1A1A1A] font-black'
                : 'border-transparent text-[#1A1A1A]/60 hover:text-[#1A1A1A]'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            Spreadsheet / CSV
          </button>

          <button
            onClick={() => { setActiveTab('quick-add'); setFeedback(null); }}
            className={`flex items-center gap-1.5 pb-2.5 px-3 text-xs font-bold uppercase tracking-wider border-b-2 transition shrink-0 cursor-pointer ${
              activeTab === 'quick-add'
                ? 'border-[#1A1A1A] text-[#1A1A1A] font-black'
                : 'border-transparent text-[#1A1A1A]/60 hover:text-[#1A1A1A]'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            Quick Add Form
          </button>

          <button
            onClick={() => { setActiveTab('json-import'); setFeedback(null); }}
            className={`flex items-center gap-1.5 pb-2.5 px-3 text-xs font-bold uppercase tracking-wider border-b-2 transition shrink-0 cursor-pointer ${
              activeTab === 'json-import'
                ? 'border-[#1A1A1A] text-[#1A1A1A] font-black'
                : 'border-transparent text-[#1A1A1A]/60 hover:text-[#1A1A1A]'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            Export & JSON
          </button>
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div className="mx-5 mt-4 p-3.5 rounded-md text-xs font-bold flex items-center gap-2 border-2 border-[#1A1A1A] bg-[#EADBBE] text-[#1A1A1A]">
            {feedback.type === 'success' ? <Check className="w-4 h-4 shrink-0 text-[#1A1A1A]" /> : <AlertCircle className="w-4 h-4 shrink-0 text-[#1A1A1A]" />}
            <span>{feedback.message}</span>
          </div>
        )}

        {/* Body Content */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {/* TAB 1: AI PDF / DOCUMENT UPLOAD */}
          {activeTab === 'pdf-ai' && (
            <div className="space-y-4">
              <div className="bg-white border border-[#CBD5E1] rounded-xl p-3.5 text-xs space-y-2">
                <div className="flex items-center gap-2 text-[#1E3A8A] font-semibold">
                  <Sparkles className="w-4 h-4 text-[#1E3A8A]" />
                  Gemini Multimodal Timetable Parser
                </div>
                <p className="text-[#475569] text-[11px] leading-relaxed">
                  Upload your semester timetable PDF or screenshot. The AI extracts rooms, days, lecture slots, faculty, and branches automatically.
                </p>
                <div className="bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg p-2.5 text-[11px] text-[#0F172A] space-y-1">
                  <span className="font-semibold text-[#1E3A8A] block">Supported NIT Raipur Room Codes:</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[10px] text-[#475569]">
                    <div><strong className="text-[#0F172A]">G-XX:</strong> Ground Floor (G-01, G-02, G-11, G-12, G-31)</div>
                    <div><strong className="text-[#0F172A]">F-XX / FN:</strong> 1st Floor (F-39, F-40, F-41, F-42, F-43, F-45, F-54, FN-1, FN-2, FN-4)</div>
                    <div><strong className="text-[#0F172A]">S-XX / SN:</strong> 2nd Floor (S-01, S-02, S-11, S-21, S-31, SN-2, SN-3, SN-4)</div>
                    <div><strong className="text-[#0F172A]">B-XX:</strong> Lower Level (B-01, B-02, B-11, B-21)</div>
                  </div>
                </div>
              </div>

              {/* Upload Dropzone */}
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition flex flex-col items-center justify-center gap-2.5 ${
                  selectedFile
                    ? 'border-[#1E3A8A] bg-[#F8FAFC]'
                    : 'border-[#CBD5E1] hover:border-[#1E3A8A] bg-white'
                }`}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept=".pdf,image/png,image/jpeg,image/webp" 
                  className="hidden" 
                />

                {selectedFile ? (
                  <>
                    <div className="w-10 h-10 rounded-lg bg-white text-[#1E3A8A] flex items-center justify-center border border-[#CBD5E1]">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#0F172A]">{selectedFile.name}</p>
                      <p className="text-[10px] text-[#475569] mt-0.5">
                        {(selectedFile.size / 1024).toFixed(1)} KB · Click to replace file
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-10 h-10 rounded-lg bg-white text-[#475569] flex items-center justify-center border border-[#CBD5E1]">
                      <FileUp className="w-5 h-5 text-[#1E3A8A]" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-[#0F172A]">
                        Select or drop timetable PDF / screenshot
                      </p>
                      <p className="text-[10px] text-[#475569] mt-0.5">
                        Supports PDF files, PNG, JPG, or scans
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Action Button */}
              {selectedFile && extractedClasses.length === 0 && (
                <button
                  type="button"
                  onClick={handleParseDocument}
                  disabled={isParsingDocument}
                  className="w-full bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 disabled:opacity-50 text-white font-medium text-xs py-2.5 rounded-lg transition flex items-center justify-center gap-2"
                >
                  {isParsingDocument ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Parsing Timetable with Gemini AI...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      Extract Timetable Data with AI
                    </>
                  )}
                </button>
              )}

              {/* Preview Extracted Classes */}
              {extractedClasses.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0F172A]">
                      Identified Classes ({extractedClasses.length}):
                    </span>
                    <button
                      type="button"
                      onClick={handleApplyExtractedClasses}
                      className="px-3.5 py-1.5 rounded-lg bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white font-medium text-xs transition flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Confirm & Add All ({extractedClasses.length}) Classes
                    </button>
                  </div>

                  <div className="max-h-60 overflow-y-auto rounded-lg border border-[#CBD5E1] divide-y divide-[#CBD5E1] bg-white">
                    {extractedClasses.map((item, idx) => (
                      <div key={idx} className="p-2.5 text-xs flex items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-[#1E3A8A]">{item.day}</span>
                            <span className="text-[#475569]">{item.startTime} - {item.endTime}</span>
                            <span className="bg-white px-1.5 py-0.5 rounded text-[10px] text-[#0F172A] font-semibold border border-[#CBD5E1]">
                              {item.roomCode || 'Room TBD'}
                            </span>
                          </div>
                          <p className="text-[#0F172A] font-semibold mt-0.5">
                            {item.courseCode ? `${item.courseCode}: ` : ''}{item.courseName}
                          </p>
                          <p className="text-[11px] text-[#475569]">
                            {item.instructor} · {item.degree} {item.branch} {item.year ? `(${item.year})` : ''}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PRESET SEMESTER PACKS */}
          {activeTab === 'presets' && (
            <div className="space-y-3">
              <div className="bg-white border border-[#CBD5E1] rounded-xl p-3.5 text-xs">
                <h4 className="font-semibold text-[#0F172A] flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#1E3A8A]" />
                  Official NIT Raipur Semester Timetable Packs
                </h4>
                <p className="text-[#475569] text-[11px] mt-1 leading-relaxed">
                  Load pre-configured semester timetables mapped directly to NIT Raipur room codes across Ground (G-XX), 1st Floor (F-XX), 2nd Floor (S-XX), and Lower Level (B-XX).
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* 3rd Sem Pack */}
                <div className="border border-[#CBD5E1] rounded-xl p-3.5 bg-white hover:border-[#1E3A8A] transition space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#0F172A]">3rd Semester (2nd Year B.Tech)</span>
                    <span className="text-[10px] bg-white text-[#1E3A8A] px-2 py-0.5 rounded font-semibold border border-[#CBD5E1]">10 Rooms</span>
                  </div>
                  <p className="text-[11px] text-[#475569] leading-relaxed">
                    CSE (F-40), IT (F-41), EEE (G-01), Civil (G-02), Mech (G-11), ECE (G-12), Chemical (G-31), Metallurgy (S-21), Bio-Med (S-31), Circuits (B-02).
                  </p>
                  <button
                    onClick={() => handleMergeSemesterPack([
                      NITRR_ROOM_G01, NITRR_ROOM_G02, NITRR_ROOM_G11, NITRR_ROOM_G12, NITRR_ROOM_G31,
                      NITRR_ROOM_F40, NITRR_ROOM_F41, NITRR_ROOM_S02, NITRR_ROOM_S21, NITRR_ROOM_S31, NITRR_ROOM_B02
                    ], '3rd Semester Timetable')}
                    className="w-full mt-1 bg-white hover:bg-[#F8FAFC] border border-[#CBD5E1] text-[#1E3A8A] hover:text-[#0F172A] font-medium text-xs py-1.5 rounded-lg transition"
                  >
                    Load 3rd Sem Pack
                  </button>
                </div>

                {/* 5th Sem Pack */}
                <div className="border border-[#CBD5E1] rounded-xl p-3.5 bg-white hover:border-[#1E3A8A] transition space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#0F172A]">5th Semester (3rd Year B.Tech)</span>
                    <span className="text-[10px] bg-white text-[#1E3A8A] px-2 py-0.5 rounded font-semibold border border-[#CBD5E1]">14 Rooms</span>
                  </div>
                  <p className="text-[11px] text-[#475569] leading-relaxed">
                    CSE (F-42), IT (F-41), ECE (F-43), Mech (F-45), EEE (G-01), Civil (G-02), ECE (G-12), Chemical (G-31), Power (S-01), FEA (S-02), Geotech (S-11), Automation (B-11).
                  </p>
                  <button
                    onClick={() => handleMergeSemesterPack([
                      NITRR_ROOM_G01, NITRR_ROOM_G02, NITRR_ROOM_G11, NITRR_ROOM_G12, NITRR_ROOM_G31,
                      NITRR_ROOM_F41, NITRR_ROOM_F42, NITRR_ROOM_F43, NITRR_ROOM_F45,
                      NITRR_ROOM_S01, NITRR_ROOM_S02, NITRR_ROOM_S11, NITRR_ROOM_S21, NITRR_ROOM_S31,
                      NITRR_ROOM_B02, NITRR_ROOM_B11
                    ], '5th Semester Timetable')}
                    className="w-full mt-1 bg-white hover:bg-[#F8FAFC] border border-[#CBD5E1] text-[#1E3A8A] hover:text-[#0F172A] font-medium text-xs py-1.5 rounded-lg transition"
                  >
                    Load 5th Sem Pack
                  </button>
                </div>

                {/* 7th Sem Pack */}
                <div className="border border-[#CBD5E1] rounded-xl p-3.5 bg-white hover:border-[#1E3A8A] transition space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#0F172A]">7th Semester (4th Year B.Tech)</span>
                    <span className="text-[10px] bg-white text-[#1E3A8A] px-2 py-0.5 rounded font-semibold border border-[#CBD5E1]">6 Rooms</span>
                  </div>
                  <p className="text-[11px] text-[#475569] leading-relaxed">
                    Distributed Systems & ACV (F-42), Optical & Radar (F-43), Automobile & Robotics (F-45), Smart Grid (S-01), Earthquake (S-11), Mechatronics (B-11).
                  </p>
                  <button
                    onClick={() => handleMergeSemesterPack([
                      NITRR_ROOM_F42, NITRR_ROOM_F43, NITRR_ROOM_F45, NITRR_ROOM_S01, NITRR_ROOM_S11, NITRR_ROOM_B11
                    ], '7th Semester Timetable')}
                    className="w-full mt-1 bg-white hover:bg-[#F8FAFC] border border-[#CBD5E1] text-[#1E3A8A] hover:text-[#0F172A] font-medium text-xs py-1.5 rounded-lg transition"
                  >
                    Load 7th Sem Pack
                  </button>
                </div>

                {/* M.Tech & Ph.D. Pack */}
                <div className="border border-[#CBD5E1] rounded-xl p-3.5 bg-white hover:border-[#1E3A8A] transition space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#0F172A]">M.Tech & Ph.D. Research</span>
                    <span className="text-[10px] bg-white text-[#1E3A8A] px-2 py-0.5 rounded font-semibold border border-[#CBD5E1]">3 Rooms</span>
                  </div>
                  <p className="text-[11px] text-[#475569] leading-relaxed">
                    Computing Seminar & AI Studio (F-54), Nanomaterials & Physics (B-01), Advanced Applied Math & Optimization (B-21).
                  </p>
                  <button
                    onClick={() => handleMergeSemesterPack([
                      NITRR_ROOM_F54, NITRR_ROOM_B01, NITRR_ROOM_B21
                    ], 'M.Tech & Ph.D. Timetable')}
                    className="w-full mt-1 bg-white hover:bg-[#F8FAFC] border border-[#CBD5E1] text-[#1E3A8A] hover:text-[#0F172A] font-medium text-xs py-1.5 rounded-lg transition"
                  >
                    Load M.Tech/Ph.D. Pack
                  </button>
                </div>
              </div>

              {/* Full Suite Reset */}
              <div className="border border-[#CBD5E1] rounded-xl p-4 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 mt-3">
                <div>
                  <h4 className="font-bold text-xs text-[#0F172A]">Complete NIT Raipur Timetable (All 28 Rooms)</h4>
                  <p className="text-[11px] text-[#475569] leading-relaxed">
                    Restore full academic schedule containing 1st Sem (FN-1 to SN-4), 3rd, 5th, 7th Sem, CCC, APJ, and Graphics Labs.
                  </p>
                </div>
                <button
                  onClick={handleLoadFullMatrix}
                  className="bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white text-xs font-medium px-4 py-2 rounded-lg transition shrink-0"
                >
                  Load Complete Matrix
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: SPREADSHEET / CSV */}
          {activeTab === 'csv-import' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#475569]">
                  Paste CSV with columns: RoomCode, Day, StartTime, EndTime, CourseCode, CourseName, Instructor, Branch, Degree, Year, Batch
                </span>
                <button
                  type="button"
                  onClick={handleCopySample}
                  className="text-[#1E3A8A] hover:underline flex items-center gap-1 font-medium"
                >
                  <Copy className="w-3 h-3" />
                  {copiedTemplate ? 'Copied!' : 'Copy Sample'}
                </button>
              </div>

              <textarea
                value={csvText}
                onChange={(e) => setCsvText(e.target.value)}
                placeholder={sampleCsv}
                rows={7}
                className="w-full bg-[#FFFFFF] border border-[#CBD5E1] rounded-lg p-3 text-xs font-mono text-[#0F172A] focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] outline-none"
              />

              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={handleExportCsv}
                  className="flex items-center gap-1.5 text-xs text-[#475569] hover:text-[#0F172A] px-3 py-1.5 bg-white hover:bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  Export Current Schedule as CSV
                </button>

                <button
                  type="button"
                  onClick={handleParseCsv}
                  className="px-4 py-2 bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white text-xs font-medium rounded-lg transition"
                >
                  Import CSV Rows
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: QUICK ADD */}
          {activeTab === 'quick-add' && (
            <form onSubmit={handleQuickAdd} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#0F172A] mb-1 flex items-center gap-1">
                    <Building className="w-3 h-3 text-[#1E3A8A]" />
                    Classroom / Room Code
                  </label>
                  <input
                    type="text"
                    list="rooms-list"
                    value={targetRoomCode}
                    onChange={(e) => setTargetRoomCode(e.target.value.toUpperCase())}
                    placeholder="e.g. G-01, F-40, S-02, B-11"
                    className="w-full bg-white border border-[#CBD5E1] rounded-lg px-2.5 py-1.5 text-xs text-[#0F172A] uppercase focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] outline-none"
                    required
                  />
                  <datalist id="rooms-list">
                    {rooms.map(r => (
                      <option key={r.code} value={r.code}>{r.name} ({r.blockShort})</option>
                    ))}
                  </datalist>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#0F172A] mb-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#1E3A8A]" />
                    Day of the Week
                  </label>
                  <select
                    value={day}
                    onChange={(e) => setDay(e.target.value as any)}
                    className="w-full bg-white border border-[#CBD5E1] rounded-lg px-2.5 py-1.5 text-xs text-[#0F172A] focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] outline-none"
                  >
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#0F172A] mb-1 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#1E3A8A]" />
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full bg-white border border-[#CBD5E1] rounded-lg px-2.5 py-1.5 text-xs text-[#0F172A] focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#0F172A] mb-1 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#1E3A8A]" />
                    End Time
                  </label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full bg-white border border-[#CBD5E1] rounded-lg px-2.5 py-1.5 text-xs text-[#0F172A] focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#0F172A] mb-1 flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-[#1E3A8A]" />
                    Course Code
                  </label>
                  <input
                    type="text"
                    value={courseCode}
                    onChange={(e) => setCourseCode(e.target.value)}
                    placeholder="e.g. CS201, EE301"
                    className="w-full bg-white border border-[#CBD5E1] rounded-lg px-2.5 py-1.5 text-xs text-[#0F172A] uppercase focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#0F172A] mb-1 flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-[#1E3A8A]" />
                    Course Name
                  </label>
                  <input
                    type="text"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    placeholder="e.g. Theory of Computation"
                    className="w-full bg-white border border-[#CBD5E1] rounded-lg px-2.5 py-1.5 text-xs text-[#0F172A] focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#0F172A] mb-1 flex items-center gap-1">
                    <User className="w-3 h-3 text-[#1E3A8A]" />
                    Faculty / Instructor
                  </label>
                  <input
                    type="text"
                    value={instructor}
                    onChange={(e) => setInstructor(e.target.value)}
                    placeholder="e.g. Dr. S. K. Dewangan"
                    className="w-full bg-white border border-[#CBD5E1] rounded-lg px-2.5 py-1.5 text-xs text-[#0F172A] focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#0F172A] mb-1">
                    Degree
                  </label>
                  <select
                    value={degree}
                    onChange={(e) => setDegree(e.target.value as any)}
                    className="w-full bg-white border border-[#CBD5E1] rounded-lg px-2.5 py-1.5 text-xs text-[#0F172A] focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] outline-none"
                  >
                    <option value="B.Tech">B.Tech</option>
                    <option value="M.Tech">M.Tech</option>
                    <option value="Ph.D.">Ph.D.</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#0F172A] mb-1">
                    Branch / Dept
                  </label>
                  <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value as any)}
                    className="w-full bg-white border border-[#CBD5E1] rounded-lg px-2.5 py-1.5 text-xs text-[#0F172A] focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] outline-none"
                  >
                    <option value="CSE">CSE</option>
                    <option value="IT">IT</option>
                    <option value="ECE">ECE</option>
                    <option value="EEE">EEE</option>
                    <option value="MECH">MECH</option>
                    <option value="CIVIL">CIVIL</option>
                    <option value="Chemical">Chemical</option>
                    <option value="Metallurgy">Metallurgy</option>
                    <option value="Bio-Medical">Bio-Medical</option>
                    <option value="Bio-Tech">Bio-Tech</option>
                    <option value="Mining">Mining</option>
                    <option value="Multi-disciplinary">Multi-disciplinary</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#0F172A] mb-1">
                    Year / Semester
                  </label>
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value as any)}
                    className="w-full bg-white border border-[#CBD5E1] rounded-lg px-2.5 py-1.5 text-xs text-[#0F172A] focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] outline-none"
                  >
                    <option value="1st Year">1st Year (Sem 1/2)</option>
                    <option value="2nd Year">2nd Year (Sem 3/4)</option>
                    <option value="3rd Year">3rd Year (Sem 5/6)</option>
                    <option value="4th Year">4th Year (Sem 7/8)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#0F172A] mb-1">
                    Batch / Section (Optional)
                  </label>
                  <input
                    type="text"
                    value={batch}
                    onChange={(e) => setBatch(e.target.value)}
                    placeholder="e.g. 3rd Sem, Batch A"
                    className="w-full bg-white border border-[#CBD5E1] rounded-lg px-2.5 py-1.5 text-xs text-[#0F172A] focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white text-xs font-medium rounded-lg transition"
                >
                  Save Class Slot
                </button>
              </div>
            </form>
          )}

          {/* TAB 5: JSON & EXPORT */}
          {activeTab === 'json-import' && (
            <div className="space-y-3">
              <p className="text-xs text-[#475569] leading-relaxed">
                Backup or replace the entire classroom and schedule database with JSON.
              </p>
              <textarea
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
                placeholder="Paste JSON array of Room objects..."
                rows={7}
                className="w-full bg-[#FFFFFF] border border-[#CBD5E1] rounded-lg p-3 text-xs font-mono text-[#0F172A] focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] outline-none"
              />
              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={handleExportJson}
                  className="flex items-center gap-1.5 text-xs text-[#475569] hover:text-[#0F172A] px-3 py-1.5 bg-white hover:bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Complete JSON
                </button>
                <button
                  type="button"
                  onClick={handleImportJson}
                  className="px-4 py-2 bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white text-xs font-medium rounded-lg transition"
                >
                  Replace with JSON
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#CBD5E1] bg-white flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={onResetToDefault}
            className="flex items-center gap-1.5 text-[#475569] hover:text-[#0F172A] transition font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset to Official Default
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white hover:bg-[#F8FAFC] text-[#0F172A] border border-[#CBD5E1] font-medium rounded-lg transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

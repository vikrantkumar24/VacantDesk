import { Room, RoomScheduleItem } from './campusData.ts';

// Department of Computer Science & Engineering - Autumn 2026
// Sem 3: F-40, Sem 5: F-42, Sem 7: F-42 (Electives in F-40, F-54)

const F40_SCHEDULE: RoomScheduleItem[] = [
  // Monday
  { id: 'cse-3-m1', day: 'Monday', startTime: '09:00', endTime: '09:50', courseCode: 'CS201', courseName: 'TOC (Theory of Computation)', instructor: 'Dr. S. K. Dewangan (SKD)', branch: 'CSE', degree: 'B.Tech', year: '2nd Year' },
  { id: 'cse-3-m2', day: 'Monday', startTime: '09:50', endTime: '10:40', courseCode: 'CS201', courseName: 'TOC (Theory of Computation)', instructor: 'Dr. S. K. Dewangan (SKD)', branch: 'CSE', degree: 'B.Tech', year: '2nd Year' },
  { id: 'cse-3-m3', day: 'Monday', startTime: '10:40', endTime: '11:30', courseCode: 'CS202', courseName: 'DLD (Digital Logic Design)', instructor: 'Prof. A. Sharma (AS)', branch: 'CSE', degree: 'B.Tech', year: '2nd Year' },
  { id: 'cse-3-m4', day: 'Monday', startTime: '11:30', endTime: '12:20', courseCode: 'CS203', courseName: 'OOPJ (Object Oriented Programming Java)', instructor: 'Prof. N. K. Nagwani (NKN)', branch: 'CSE', degree: 'B.Tech', year: '2nd Year' },
  { id: 'cse-3-m5', day: 'Monday', startTime: '12:20', endTime: '13:10', courseCode: 'CS204', courseName: 'OS (Operating Systems)', instructor: 'Dr. D. S. Sisodia (DSS)', branch: 'CSE', degree: 'B.Tech', year: '2nd Year' },
  { id: 'cse-7-m6', day: 'Monday', startTime: '14:10', endTime: '15:50', courseCode: 'CS401', courseName: 'Adv. Machine Learning (KM) / RL (PS)', instructor: 'Dr. K. Mahajan / Dr. P. Singh', branch: 'CSE', degree: 'B.Tech', year: '4th Year' },

  // Tuesday
  { id: 'cse-3-t1', day: 'Tuesday', startTime: '09:00', endTime: '09:50', courseCode: 'MA201', courseName: 'Mathematics-III', instructor: 'Mathematics Faculty', branch: 'CSE', degree: 'B.Tech', year: '2nd Year' },
  { id: 'cse-3-t2', day: 'Tuesday', startTime: '09:50', endTime: '10:40', courseCode: 'CS203', courseName: 'OOPJ (Object Oriented Programming Java)', instructor: 'Prof. N. K. Nagwani (NKN)', branch: 'CSE', degree: 'B.Tech', year: '2nd Year' },
  { id: 'cse-3-t3', day: 'Tuesday', startTime: '10:40', endTime: '11:30', courseCode: 'CS205', courseName: 'DMS (Discrete Math Structures)', instructor: 'Prof. S. K. Tripathi (SKT)', branch: 'CSE', degree: 'B.Tech', year: '2nd Year' },
  { id: 'cse-3-t4', day: 'Tuesday', startTime: '11:30', endTime: '12:20', courseCode: 'CS202', courseName: 'DLD (Digital Logic Design)', instructor: 'Prof. A. Sharma (AS)', branch: 'CSE', degree: 'B.Tech', year: '2nd Year' },
  { id: 'cse-3-t5', day: 'Tuesday', startTime: '12:20', endTime: '13:10', courseCode: 'CS204', courseName: 'OS (Operating Systems)', instructor: 'Dr. D. S. Sisodia (DSS)', branch: 'CSE', degree: 'B.Tech', year: '2nd Year' },
  { id: 'cse-7-t6', day: 'Tuesday', startTime: '14:10', endTime: '15:00', courseCode: 'CS401', courseName: 'Adv. Machine Learning (KM)', instructor: 'Dr. K. Mahajan', branch: 'CSE', degree: 'B.Tech', year: '4th Year' },
  { id: 'cse-7-t7', day: 'Tuesday', startTime: '15:00', endTime: '15:50', courseCode: 'CS402', courseName: 'Reinforcement Learning (PS)', instructor: 'Dr. P. Singh (PS)', branch: 'CSE', degree: 'B.Tech', year: '4th Year' },

  // Wednesday
  { id: 'cse-3-w1', day: 'Wednesday', startTime: '09:00', endTime: '09:50', courseCode: 'MA201', courseName: 'Mathematics-III', instructor: 'Mathematics Faculty', branch: 'CSE', degree: 'B.Tech', year: '2nd Year' },
  { id: 'cse-3-w2', day: 'Wednesday', startTime: '09:50', endTime: '10:40', courseCode: 'CS201', courseName: 'TOC (Theory of Computation)', instructor: 'Dr. S. K. Dewangan (SKD)', branch: 'CSE', degree: 'B.Tech', year: '2nd Year' },
  { id: 'cse-3-w3', day: 'Wednesday', startTime: '10:40', endTime: '11:30', courseCode: 'CS202', courseName: 'DLD (Digital Logic Design)', instructor: 'Prof. A. Sharma (AS)', branch: 'CSE', degree: 'B.Tech', year: '2nd Year' },

  // Thursday
  { id: 'cse-3-th1', day: 'Thursday', startTime: '09:00', endTime: '09:50', courseCode: 'CS201', courseName: 'TOC (Theory of Computation)', instructor: 'Dr. S. K. Dewangan (SKD)', branch: 'CSE', degree: 'B.Tech', year: '2nd Year' },
  { id: 'cse-3-th2', day: 'Thursday', startTime: '09:50', endTime: '10:40', courseCode: 'CS205', courseName: 'DMS (Discrete Math Structures)', instructor: 'Prof. S. K. Tripathi (SKT)', branch: 'CSE', degree: 'B.Tech', year: '2nd Year' },
  { id: 'cse-3-th3', day: 'Thursday', startTime: '10:40', endTime: '11:30', courseCode: 'CS202', courseName: 'DLD (Digital Logic Design)', instructor: 'Prof. A. Sharma (AS)', branch: 'CSE', degree: 'B.Tech', year: '2nd Year' },
  { id: 'cse-3-th4', day: 'Thursday', startTime: '11:30', endTime: '12:20', courseCode: 'CS203', courseName: 'OOPJ (Object Oriented Programming Java)', instructor: 'Prof. N. K. Nagwani (NKN)', branch: 'CSE', degree: 'B.Tech', year: '2nd Year' },
  { id: 'cse-3-th5', day: 'Thursday', startTime: '12:20', endTime: '13:10', courseCode: 'CS204', courseName: 'OS (Operating Systems)', instructor: 'Dr. D. S. Sisodia (DSS)', branch: 'CSE', degree: 'B.Tech', year: '2nd Year' },
  { id: 'cse-3-th6', day: 'Thursday', startTime: '15:50', endTime: '16:40', courseCode: 'MA201', courseName: 'Mathematics-III', instructor: 'Mathematics Faculty', branch: 'CSE', degree: 'B.Tech', year: '2nd Year' },

  // Friday
  { id: 'cse-3-f1', day: 'Friday', startTime: '09:00', endTime: '09:50', courseCode: 'CS205', courseName: 'DMS (Discrete Math Structures)', instructor: 'Prof. S. K. Tripathi (SKT)', branch: 'CSE', degree: 'B.Tech', year: '2nd Year' },
  { id: 'cse-3-f2', day: 'Friday', startTime: '09:50', endTime: '10:40', courseCode: 'CS205', courseName: 'DMS (Discrete Math Structures)', instructor: 'Prof. S. K. Tripathi (SKT)', branch: 'CSE', degree: 'B.Tech', year: '2nd Year' },
  { id: 'cse-3-f3', day: 'Friday', startTime: '10:40', endTime: '11:30', courseCode: 'MA201', courseName: 'Mathematics-III', instructor: 'Mathematics Faculty', branch: 'CSE', degree: 'B.Tech', year: '2nd Year' },
  { id: 'cse-3-f4', day: 'Friday', startTime: '11:30', endTime: '12:20', courseCode: 'CS203', courseName: 'OOPJ (Object Oriented Programming Java)', instructor: 'Prof. N. K. Nagwani (NKN)', branch: 'CSE', degree: 'B.Tech', year: '2nd Year' },
  { id: 'cse-3-f5', day: 'Friday', startTime: '12:20', endTime: '13:10', courseCode: 'CS204', courseName: 'OS (Operating Systems)', instructor: 'Dr. D. S. Sisodia (DSS)', branch: 'CSE', degree: 'B.Tech', year: '2nd Year' },
  { id: 'cse-7-f6', day: 'Friday', startTime: '15:50', endTime: '16:40', courseCode: 'CS402', courseName: 'Reinforcement Learning (PS)', instructor: 'Dr. P. Singh (PS)', branch: 'CSE', degree: 'B.Tech', year: '4th Year' },
];

const F42_SCHEDULE: RoomScheduleItem[] = [
  // Monday
  { id: 'cse-5-m1', day: 'Monday', startTime: '09:00', endTime: '09:50', courseCode: 'CS301', courseName: 'DBMS (Database Management Systems)', instructor: 'Prof. M. P. (MP)', branch: 'CSE', degree: 'B.Tech', year: '3rd Year' },
  { id: 'cse-5-m2', day: 'Monday', startTime: '09:50', endTime: '10:40', courseCode: 'CS302', courseName: 'ADS (Algorithms Design & Analysis)', instructor: 'Prof. N. K. B. (NKB)', branch: 'CSE', degree: 'B.Tech', year: '3rd Year' },
  { id: 'cse-5-m3', day: 'Monday', startTime: '10:40', endTime: '11:30', courseCode: 'CS303', courseName: 'SE (Software Engineering)', instructor: 'Prof. D. V. (DV)', branch: 'CSE', degree: 'B.Tech', year: '3rd Year' },
  { id: 'cse-7-m4', day: 'Monday', startTime: '11:30', endTime: '12:20', courseCode: 'CS403', courseName: 'SPM (Software Project Management)', instructor: 'Prof. A. B. S. (ABS)', branch: 'CSE', degree: 'B.Tech', year: '4th Year' },
  { id: 'cse-7-m5', day: 'Monday', startTime: '12:20', endTime: '13:10', courseCode: 'CS404', courseName: 'Distributed Systems', instructor: 'Prof. S. Y. (SY)', branch: 'CSE', degree: 'B.Tech', year: '4th Year' },
  { id: 'cse-7-m6', day: 'Monday', startTime: '14:10', endTime: '15:00', courseCode: 'CS405', courseName: 'HPC (High Performance Computing)', instructor: 'Prof. S. Y. (SY)', branch: 'CSE', degree: 'B.Tech', year: '4th Year' },
  { id: 'cse-7-m7', day: 'Monday', startTime: '15:00', endTime: '15:50', courseCode: 'CS406', courseName: 'F&EC (Finance & Econ Comp)', instructor: 'Prof. K. J. N. (KJN)', branch: 'CSE', degree: 'B.Tech', year: '4th Year' },

  // Tuesday
  { id: 'cse-5-t1', day: 'Tuesday', startTime: '09:00', endTime: '09:50', courseCode: 'CS301', courseName: 'DBMS (Database Management Systems)', instructor: 'Prof. M. P. (MP)', branch: 'CSE', degree: 'B.Tech', year: '3rd Year' },
  { id: 'cse-5-t2', day: 'Tuesday', startTime: '09:50', endTime: '10:40', courseCode: 'CS303', courseName: 'SE (Software Engineering)', instructor: 'Prof. D. V. (DV)', branch: 'CSE', degree: 'B.Tech', year: '3rd Year' },
  { id: 'cse-5-t3', day: 'Tuesday', startTime: '10:40', endTime: '11:30', courseCode: 'CS302', courseName: 'ADS (Algorithms Design & Analysis)', instructor: 'Prof. N. K. B. (NKB)', branch: 'CSE', degree: 'B.Tech', year: '3rd Year' },
  { id: 'cse-7-t4', day: 'Tuesday', startTime: '11:30', endTime: '12:20', courseCode: 'CS407', courseName: 'ACV (Advanced Computer Vision)', instructor: 'Prof. B. K. B. (BKB)', branch: 'CSE', degree: 'B.Tech', year: '4th Year' },
  { id: 'cse-7-t5', day: 'Tuesday', startTime: '12:20', endTime: '13:10', courseCode: 'CS407', courseName: 'ACV (Advanced Computer Vision)', instructor: 'Prof. B. K. B. (BKB)', branch: 'CSE', degree: 'B.Tech', year: '4th Year' },
  { id: 'cse-7-t6', day: 'Tuesday', startTime: '14:10', endTime: '15:00', courseCode: 'CS405', courseName: 'HPC (High Performance Computing)', instructor: 'Prof. S. Y. (SY)', branch: 'CSE', degree: 'B.Tech', year: '4th Year' },
  { id: 'cse-7-t7', day: 'Tuesday', startTime: '15:00', endTime: '15:50', courseCode: 'CS406', courseName: 'F&EC (Finance & Econ Comp)', instructor: 'Prof. K. J. N. (KJN)', branch: 'CSE', degree: 'B.Tech', year: '4th Year' },
  { id: 'cse-7-t8', day: 'Tuesday', startTime: '15:50', endTime: '16:40', courseCode: 'CS404', courseName: 'Distributed Systems', instructor: 'Prof. S. Y. (SY)', branch: 'CSE', degree: 'B.Tech', year: '4th Year' },

  // Wednesday
  { id: 'cse-5-w1', day: 'Wednesday', startTime: '10:40', endTime: '11:30', courseCode: 'CS302', courseName: 'ADS (Algorithms Design & Analysis)', instructor: 'Prof. N. K. B. (NKB)', branch: 'CSE', degree: 'B.Tech', year: '3rd Year' },
  { id: 'cse-5-w2', day: 'Wednesday', startTime: '11:30', endTime: '12:20', courseCode: 'CS304', courseName: 'NLP (Natural Language Processing)', instructor: 'Dr. J. K. Rout (JKR)', branch: 'CSE', degree: 'B.Tech', year: '3rd Year' },
  { id: 'cse-5-w3', day: 'Wednesday', startTime: '12:20', endTime: '13:10', courseCode: 'CS303', courseName: 'SE (Software Engineering)', instructor: 'Prof. D. V. (DV)', branch: 'CSE', degree: 'B.Tech', year: '3rd Year' },
  { id: 'cse-5-w4', day: 'Wednesday', startTime: '14:10', endTime: '15:00', courseCode: 'CS305', courseName: 'Data Science', instructor: 'Prof. D. S. (DS)', branch: 'CSE', degree: 'B.Tech', year: '3rd Year' },
  { id: 'cse-7-w5', day: 'Wednesday', startTime: '15:50', endTime: '16:40', courseCode: 'CS403', courseName: 'SPM (Software Project Management)', instructor: 'Prof. A. B. S. (ABS)', branch: 'CSE', degree: 'B.Tech', year: '4th Year' },

  // Thursday
  { id: 'cse-5-th1', day: 'Thursday', startTime: '09:00', endTime: '09:50', courseCode: 'CS301', courseName: 'DBMS (Database Management Systems)', instructor: 'Prof. M. P. (MP)', branch: 'CSE', degree: 'B.Tech', year: '3rd Year' },
  { id: 'cse-5-th2', day: 'Thursday', startTime: '11:30', endTime: '12:20', courseCode: 'CS304', courseName: 'NLP (Natural Language Processing)', instructor: 'Dr. J. K. Rout (JKR)', branch: 'CSE', degree: 'B.Tech', year: '3rd Year' },
  { id: 'cse-5-th3', day: 'Thursday', startTime: '12:20', endTime: '13:10', courseCode: 'CS303', courseName: 'SE (Software Engineering)', instructor: 'Prof. D. V. (DV)', branch: 'CSE', degree: 'B.Tech', year: '3rd Year' },
  { id: 'cse-5-th4', day: 'Thursday', startTime: '14:10', endTime: '15:00', courseCode: 'CS305', courseName: 'Data Science', instructor: 'Prof. D. S. (DS)', branch: 'CSE', degree: 'B.Tech', year: '3rd Year' },
  { id: 'cse-5-th5', day: 'Thursday', startTime: '15:00', endTime: '15:50', courseCode: 'CS302', courseName: 'ADS (Algorithms Design & Analysis)', instructor: 'Prof. N. K. B. (NKB)', branch: 'CSE', degree: 'B.Tech', year: '3rd Year' },

  // Friday
  { id: 'cse-7-f1', day: 'Friday', startTime: '09:00', endTime: '09:50', courseCode: 'CS404', courseName: 'Distributed Systems', instructor: 'Prof. S. Y. (SY)', branch: 'CSE', degree: 'B.Tech', year: '4th Year' },
  { id: 'cse-7-f2', day: 'Friday', startTime: '09:50', endTime: '10:40', courseCode: 'CS404', courseName: 'Distributed Systems', instructor: 'Prof. S. Y. (SY)', branch: 'CSE', degree: 'B.Tech', year: '4th Year' },
  { id: 'cse-7-f3', day: 'Friday', startTime: '10:40', endTime: '11:30', courseCode: 'CS403', courseName: 'SPM (Software Project Management)', instructor: 'Prof. A. B. S. (ABS)', branch: 'CSE', degree: 'B.Tech', year: '4th Year' },
  { id: 'cse-7-f4', day: 'Friday', startTime: '11:30', endTime: '12:20', courseCode: 'CS403', courseName: 'SPM (Software Project Management)', instructor: 'Prof. A. B. S. (ABS)', branch: 'CSE', degree: 'B.Tech', year: '4th Year' },
  { id: 'cse-7-f5', day: 'Friday', startTime: '12:20', endTime: '13:10', courseCode: 'CS407', courseName: 'ACV (Advanced Computer Vision)', instructor: 'Prof. B. K. B. (BKB)', branch: 'CSE', degree: 'B.Tech', year: '4th Year' },
  { id: 'cse-7-f6', day: 'Friday', startTime: '15:50', endTime: '16:40', courseCode: 'CS406', courseName: 'F&EC (Finance & Econ Comp)', instructor: 'Prof. K. J. N. (KJN)', branch: 'CSE', degree: 'B.Tech', year: '4th Year' },
];

export const NITRR_ROOM_F40: Room = {
  id: 'f-40',
  code: 'F-40',
  name: 'CSE Lecture Hall F-40',
  block: 'Block A (Computing & AI)',
  blockShort: 'Block A',
  floor: 1,
  wing: 'North Wing',
  capacity: 85,
  type: 'Lecture Hall',
  amenities: {
    projector: true,
    ac: true,
    smartBoard: true,
    chargingSockets: 'Plenty',
    wifiSignal: 'Excellent',
    soundSystem: true,
  },
  suitableForStudy: true,
  coordinates: { x: 30, y: 35, width: 95, height: 95 },
  schedule: F40_SCHEDULE,
};

export const NITRR_ROOM_F42: Room = {
  id: 'f-42',
  code: 'F-42',
  name: 'CSE Senior Lecture Theater F-42',
  block: 'Block A (Computing & AI)',
  blockShort: 'Block A',
  floor: 1,
  wing: 'North Wing',
  capacity: 85,
  type: 'Lecture Hall',
  amenities: {
    projector: true,
    ac: true,
    smartBoard: true,
    chargingSockets: 'Plenty',
    wifiSignal: 'Excellent',
    soundSystem: true,
  },
  suitableForStudy: true,
  coordinates: { x: 135, y: 35, width: 95, height: 95 },
  schedule: F42_SCHEDULE,
};

export const NITRR_ROOM_F54: Room = {
  id: 'f-54',
  code: 'F-54',
  name: 'Computing Seminar & IKS Studio F-54',
  block: 'Block A (Computing & AI)',
  blockShort: 'Block A',
  floor: 1,
  wing: 'East Wing',
  capacity: 65,
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
  coordinates: { x: 240, y: 35, width: 90, height: 95 },
  schedule: [
    { id: 'cse-iks-w', day: 'Wednesday', startTime: '14:10', endTime: '15:00', courseCode: 'CS306', courseName: 'Computing Algo & IKS', instructor: 'Prof. M. P. (MP)', branch: 'CSE', degree: 'B.Tech', year: '3rd Year' },
    { id: 'cse-iks-th', day: 'Thursday', startTime: '14:10', endTime: '15:00', courseCode: 'CS306', courseName: 'Computing Algo & IKS', instructor: 'Prof. M. P. (MP)', branch: 'CSE', degree: 'B.Tech', year: '3rd Year' },
  ],
};

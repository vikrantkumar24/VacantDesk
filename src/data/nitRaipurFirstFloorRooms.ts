import { Room, RoomScheduleItem } from './campusData.ts';

// NIT Raipur First Floor Rooms (F-XX codes)
// F-40: CSE Sem 3 (2nd Year)
// F-41: IT Sem 3 & 5 (2nd & 3rd Year)
// F-42: CSE Sem 5 & 7 (3rd & 4th Year)
// F-43: ECE Sem 5 & 7 (3rd & 4th Year)
// F-45: Mechanical Sem 5 & 7 (3rd & 4th Year)
// F-54: Computing Seminar & Advanced AI Studio (M.Tech & Ph.D.)

const F40_SCHEDULE: RoomScheduleItem[] = [
  // Monday
  { id: 'cse-3-m1', day: 'Monday', startTime: '09:00', endTime: '09:50', courseCode: 'CS201', courseName: 'Theory of Computation (TOC)', instructor: 'Dr. S. K. Dewangan (SKD)', branch: 'CSE', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
  { id: 'cse-3-m2', day: 'Monday', startTime: '09:50', endTime: '10:40', courseCode: 'CS201', courseName: 'Theory of Computation (TOC)', instructor: 'Dr. S. K. Dewangan (SKD)', branch: 'CSE', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
  { id: 'cse-3-m3', day: 'Monday', startTime: '10:40', endTime: '11:30', courseCode: 'CS202', courseName: 'Digital Logic Design (DLD)', instructor: 'Prof. A. Sharma (AS)', branch: 'CSE', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
  { id: 'cse-3-m4', day: 'Monday', startTime: '11:30', endTime: '12:20', courseCode: 'CS203', courseName: 'OOP with Java (OOPJ)', instructor: 'Prof. N. K. Nagwani (NKN)', branch: 'CSE', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
  { id: 'cse-3-m5', day: 'Monday', startTime: '12:20', endTime: '13:10', courseCode: 'CS204', courseName: 'Operating Systems (OS)', instructor: 'Dr. D. S. Sisodia (DSS)', branch: 'CSE', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
  { id: 'cse-7-m6', day: 'Monday', startTime: '14:10', endTime: '15:50', courseCode: 'CS401', courseName: 'Adv. Machine Learning (KM) / RL', instructor: 'Dr. K. Mahajan / Dr. P. Singh', branch: 'CSE', degree: 'B.Tech', year: '4th Year', batch: '7th Sem' },

  // Tuesday
  { id: 'cse-3-t1', day: 'Tuesday', startTime: '09:00', endTime: '09:50', courseCode: 'MA201', courseName: 'Mathematics-III', instructor: 'Dr. Neeraj Manhas', branch: 'CSE', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
  { id: 'cse-3-t2', day: 'Tuesday', startTime: '09:50', endTime: '10:40', courseCode: 'CS203', courseName: 'OOP with Java (OOPJ)', instructor: 'Prof. N. K. Nagwani (NKN)', branch: 'CSE', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
  { id: 'cse-3-t3', day: 'Tuesday', startTime: '10:40', endTime: '11:30', courseCode: 'CS205', courseName: 'Discrete Math Structures (DMS)', instructor: 'Prof. S. K. Tripathi (SKT)', branch: 'CSE', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
  { id: 'cse-3-t4', day: 'Tuesday', startTime: '11:30', endTime: '12:20', courseCode: 'CS202', courseName: 'Digital Logic Design (DLD)', instructor: 'Prof. A. Sharma (AS)', branch: 'CSE', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
  { id: 'cse-3-t5', day: 'Tuesday', startTime: '12:20', endTime: '13:10', courseCode: 'CS204', courseName: 'Operating Systems (OS)', instructor: 'Dr. D. S. Sisodia (DSS)', branch: 'CSE', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },

  // Wednesday
  { id: 'cse-3-w1', day: 'Wednesday', startTime: '09:00', endTime: '09:50', courseCode: 'MA201', courseName: 'Mathematics-III', instructor: 'Dr. Neeraj Manhas', branch: 'CSE', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
  { id: 'cse-3-w2', day: 'Wednesday', startTime: '09:50', endTime: '10:40', courseCode: 'CS201', courseName: 'Theory of Computation (TOC)', instructor: 'Dr. S. K. Dewangan (SKD)', branch: 'CSE', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
  { id: 'cse-3-w3', day: 'Wednesday', startTime: '10:40', endTime: '11:30', courseCode: 'CS202', courseName: 'Digital Logic Design (DLD)', instructor: 'Prof. A. Sharma (AS)', branch: 'CSE', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },

  // Thursday
  { id: 'cse-3-th1', day: 'Thursday', startTime: '09:00', endTime: '09:50', courseCode: 'CS201', courseName: 'Theory of Computation (TOC)', instructor: 'Dr. S. K. Dewangan (SKD)', branch: 'CSE', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
  { id: 'cse-3-th2', day: 'Thursday', startTime: '09:50', endTime: '10:40', courseCode: 'CS205', courseName: 'Discrete Math Structures (DMS)', instructor: 'Prof. S. K. Tripathi (SKT)', branch: 'CSE', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
  { id: 'cse-3-th3', day: 'Thursday', startTime: '10:40', endTime: '11:30', courseCode: 'CS202', courseName: 'Digital Logic Design (DLD)', instructor: 'Prof. A. Sharma (AS)', branch: 'CSE', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
  { id: 'cse-3-th4', day: 'Thursday', startTime: '11:30', endTime: '12:20', courseCode: 'CS203', courseName: 'OOP with Java (OOPJ)', instructor: 'Prof. N. K. Nagwani (NKN)', branch: 'CSE', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
  { id: 'cse-3-th5', day: 'Thursday', startTime: '12:20', endTime: '13:10', courseCode: 'CS204', courseName: 'Operating Systems (OS)', instructor: 'Dr. D. S. Sisodia (DSS)', branch: 'CSE', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },

  // Friday
  { id: 'cse-3-f1', day: 'Friday', startTime: '09:00', endTime: '09:50', courseCode: 'CS205', courseName: 'Discrete Math Structures (DMS)', instructor: 'Prof. S. K. Tripathi (SKT)', branch: 'CSE', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
  { id: 'cse-3-f2', day: 'Friday', startTime: '09:50', endTime: '10:40', courseCode: 'CS205', courseName: 'Discrete Math Structures (DMS)', instructor: 'Prof. S. K. Tripathi (SKT)', branch: 'CSE', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
  { id: 'cse-3-f3', day: 'Friday', startTime: '10:40', endTime: '11:30', courseCode: 'MA201', courseName: 'Mathematics-III', instructor: 'Dr. Neeraj Manhas', branch: 'CSE', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
  { id: 'cse-3-f4', day: 'Friday', startTime: '11:30', endTime: '12:20', courseCode: 'CS203', courseName: 'OOP with Java (OOPJ)', instructor: 'Prof. N. K. Nagwani (NKN)', branch: 'CSE', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
  { id: 'cse-3-f5', day: 'Friday', startTime: '12:20', endTime: '13:10', courseCode: 'CS204', courseName: 'Operating Systems (OS)', instructor: 'Dr. D. S. Sisodia (DSS)', branch: 'CSE', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
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

export const NITRR_ROOM_F41: Room = {
  id: 'f-41',
  code: 'F-41',
  name: 'Information Technology Hall F-41',
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
  schedule: [
    // Monday
    { id: 'it-3-m1', day: 'Monday', startTime: '09:00', endTime: '09:50', courseCode: 'IT201', courseName: 'Data Structures & Algorithms', instructor: 'Dr. R. R. Janghel', branch: 'IT', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 'it-3-m2', day: 'Monday', startTime: '09:50', endTime: '10:40', courseCode: 'IT202', courseName: 'Computer Org & Architecture', instructor: 'Dr. P. Chandrakar', branch: 'IT', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 'it-5-m3', day: 'Monday', startTime: '10:40', endTime: '11:30', courseCode: 'IT301', courseName: 'Database Management Systems', instructor: 'Dr. S. P. Sahu', branch: 'IT', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'it-5-m4', day: 'Monday', startTime: '11:30', endTime: '12:20', courseCode: 'IT302', courseName: 'Computer Networks', instructor: 'Dr. Govind P. Gupta', branch: 'IT', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'it-5-m5', day: 'Monday', startTime: '12:20', endTime: '13:10', courseCode: 'IT303', courseName: 'Web Technologies & Frameworks', instructor: 'Dr. M. K. Rao', branch: 'IT', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },

    // Tuesday
    { id: 'it-3-t1', day: 'Tuesday', startTime: '09:00', endTime: '09:50', courseCode: 'IT203', courseName: 'Object Oriented Programming', instructor: 'Dr. Tirath Prasad Sahu', branch: 'IT', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 'it-3-t2', day: 'Tuesday', startTime: '09:50', endTime: '10:40', courseCode: 'IT201', courseName: 'Data Structures & Algorithms', instructor: 'Dr. R. R. Janghel', branch: 'IT', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 'it-5-t3', day: 'Tuesday', startTime: '10:40', endTime: '11:30', courseCode: 'IT301', courseName: 'Database Management Systems', instructor: 'Dr. S. P. Sahu', branch: 'IT', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'it-5-t4', day: 'Tuesday', startTime: '11:30', endTime: '12:20', courseCode: 'IT304', courseName: 'Operating Systems Concepts', instructor: 'Dr. P. Chandrakar', branch: 'IT', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },

    // Wednesday
    { id: 'it-3-w1', day: 'Wednesday', startTime: '09:00', endTime: '09:50', courseCode: 'IT204', courseName: 'Discrete Mathematics', instructor: 'Dr. Nabin Kumar Meher', branch: 'IT', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 'it-3-w2', day: 'Wednesday', startTime: '09:50', endTime: '10:40', courseCode: 'IT202', courseName: 'Computer Org & Architecture', instructor: 'Dr. P. Chandrakar', branch: 'IT', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 'it-5-w3', day: 'Wednesday', startTime: '11:30', endTime: '12:20', courseCode: 'IT302', courseName: 'Computer Networks', instructor: 'Dr. Govind P. Gupta', branch: 'IT', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'it-5-w4', day: 'Wednesday', startTime: '12:20', endTime: '13:10', courseCode: 'IT303', courseName: 'Web Technologies & Frameworks', instructor: 'Dr. M. K. Rao', branch: 'IT', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },

    // Thursday
    { id: 'it-3-th1', day: 'Thursday', startTime: '09:50', endTime: '10:40', courseCode: 'IT201', courseName: 'Data Structures & Algorithms', instructor: 'Dr. R. R. Janghel', branch: 'IT', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 'it-3-th2', day: 'Thursday', startTime: '10:40', endTime: '11:30', courseCode: 'IT203', courseName: 'Object Oriented Programming', instructor: 'Dr. Tirath Prasad Sahu', branch: 'IT', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 'it-5-th3', day: 'Thursday', startTime: '11:30', endTime: '12:20', courseCode: 'IT301', courseName: 'Database Management Systems', instructor: 'Dr. S. P. Sahu', branch: 'IT', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'it-5-th4', day: 'Thursday', startTime: '14:10', endTime: '15:00', courseCode: 'IT304', courseName: 'Operating Systems Concepts', instructor: 'Dr. P. Chandrakar', branch: 'IT', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },

    // Friday
    { id: 'it-3-f1', day: 'Friday', startTime: '09:00', endTime: '09:50', courseCode: 'IT204', courseName: 'Discrete Mathematics', instructor: 'Dr. Nabin Kumar Meher', branch: 'IT', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 'it-3-f2', day: 'Friday', startTime: '09:50', endTime: '10:40', courseCode: 'IT202', courseName: 'Computer Org & Architecture', instructor: 'Dr. P. Chandrakar', branch: 'IT', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 'it-5-f3', day: 'Friday', startTime: '10:40', endTime: '11:30', courseCode: 'IT302', courseName: 'Computer Networks', instructor: 'Dr. Govind P. Gupta', branch: 'IT', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'it-5-f4', day: 'Friday', startTime: '11:30', endTime: '12:20', courseCode: 'IT303', courseName: 'Web Technologies', instructor: 'Dr. M. K. Rao', branch: 'IT', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
  ],
};

export const NITRR_ROOM_F42: Room = {
  id: 'f-42',
  code: 'F-42',
  name: 'CSE Senior Lecture Theater F-42',
  block: 'Block A (Computing & AI)',
  blockShort: 'Block A',
  floor: 1,
  wing: 'North Wing',
  capacity: 90,
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
  coordinates: { x: 240, y: 35, width: 95, height: 95 },
  schedule: [
    // Monday
    { id: 'cse-5-m1', day: 'Monday', startTime: '09:00', endTime: '09:50', courseCode: 'CS301', courseName: 'Database Management Systems (DBMS)', instructor: 'Prof. M. P. (MP)', branch: 'CSE', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'cse-5-m2', day: 'Monday', startTime: '09:50', endTime: '10:40', courseCode: 'CS302', courseName: 'Algorithms Design & Analysis (ADA)', instructor: 'Prof. N. K. B. (NKB)', branch: 'CSE', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'cse-5-m3', day: 'Monday', startTime: '10:40', endTime: '11:30', courseCode: 'CS303', courseName: 'Software Engineering (SE)', instructor: 'Prof. D. V. (DV)', branch: 'CSE', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'cse-7-m4', day: 'Monday', startTime: '11:30', endTime: '12:20', courseCode: 'CS403', courseName: 'Software Project Management (SPM)', instructor: 'Prof. A. B. S. (ABS)', branch: 'CSE', degree: 'B.Tech', year: '4th Year', batch: '7th Sem' },
    { id: 'cse-7-m5', day: 'Monday', startTime: '12:20', endTime: '13:10', courseCode: 'CS404', courseName: 'Distributed Systems', instructor: 'Prof. S. Y. (SY)', branch: 'CSE', degree: 'B.Tech', year: '4th Year', batch: '7th Sem' },
    { id: 'cse-7-m6', day: 'Monday', startTime: '14:10', endTime: '15:00', courseCode: 'CS405', courseName: 'High Performance Computing (HPC)', instructor: 'Prof. S. Y. (SY)', branch: 'CSE', degree: 'B.Tech', year: '4th Year', batch: '7th Sem' },

    // Tuesday
    { id: 'cse-5-t1', day: 'Tuesday', startTime: '09:00', endTime: '09:50', courseCode: 'CS301', courseName: 'Database Management Systems (DBMS)', instructor: 'Prof. M. P. (MP)', branch: 'CSE', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'cse-5-t2', day: 'Tuesday', startTime: '09:50', endTime: '10:40', courseCode: 'CS303', courseName: 'Software Engineering (SE)', instructor: 'Prof. D. V. (DV)', branch: 'CSE', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'cse-5-t3', day: 'Tuesday', startTime: '10:40', endTime: '11:30', courseCode: 'CS302', courseName: 'Algorithms Design & Analysis (ADA)', instructor: 'Prof. N. K. B. (NKB)', branch: 'CSE', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'cse-7-t4', day: 'Tuesday', startTime: '11:30', endTime: '12:20', courseCode: 'CS407', courseName: 'Advanced Computer Vision (ACV)', instructor: 'Prof. B. K. B. (BKB)', branch: 'CSE', degree: 'B.Tech', year: '4th Year', batch: '7th Sem' },
    { id: 'cse-7-t5', day: 'Tuesday', startTime: '12:20', endTime: '13:10', courseCode: 'CS407', courseName: 'Advanced Computer Vision (ACV)', instructor: 'Prof. B. K. B. (BKB)', branch: 'CSE', degree: 'B.Tech', year: '4th Year', batch: '7th Sem' },
    { id: 'cse-7-t6', day: 'Tuesday', startTime: '14:10', endTime: '15:00', courseCode: 'CS405', courseName: 'High Performance Computing (HPC)', instructor: 'Prof. S. Y. (SY)', branch: 'CSE', degree: 'B.Tech', year: '4th Year', batch: '7th Sem' },

    // Wednesday
    { id: 'cse-5-w1', day: 'Wednesday', startTime: '10:40', endTime: '11:30', courseCode: 'CS302', courseName: 'Algorithms Design & Analysis (ADA)', instructor: 'Prof. N. K. B. (NKB)', branch: 'CSE', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'cse-5-w2', day: 'Wednesday', startTime: '11:30', endTime: '12:20', courseCode: 'CS304', courseName: 'Natural Language Processing (NLP)', instructor: 'Dr. J. K. Rout (JKR)', branch: 'CSE', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'cse-5-w3', day: 'Wednesday', startTime: '12:20', endTime: '13:10', courseCode: 'CS303', courseName: 'Software Engineering (SE)', instructor: 'Prof. D. V. (DV)', branch: 'CSE', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'cse-5-w4', day: 'Wednesday', startTime: '14:10', endTime: '15:00', courseCode: 'CS305', courseName: 'Data Science & Analytics', instructor: 'Prof. D. S. (DS)', branch: 'CSE', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'cse-7-w5', day: 'Wednesday', startTime: '15:50', endTime: '16:40', courseCode: 'CS403', courseName: 'Software Project Management (SPM)', instructor: 'Prof. A. B. S. (ABS)', branch: 'CSE', degree: 'B.Tech', year: '4th Year', batch: '7th Sem' },

    // Thursday
    { id: 'cse-5-th1', day: 'Thursday', startTime: '09:00', endTime: '09:50', courseCode: 'CS301', courseName: 'Database Management Systems (DBMS)', instructor: 'Prof. M. P. (MP)', branch: 'CSE', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'cse-5-th2', day: 'Thursday', startTime: '11:30', endTime: '12:20', courseCode: 'CS304', courseName: 'Natural Language Processing (NLP)', instructor: 'Dr. J. K. Rout (JKR)', branch: 'CSE', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'cse-5-th3', day: 'Thursday', startTime: '12:20', endTime: '13:10', courseCode: 'CS303', courseName: 'Software Engineering (SE)', instructor: 'Prof. D. V. (DV)', branch: 'CSE', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'cse-5-th4', day: 'Thursday', startTime: '14:10', endTime: '15:00', courseCode: 'CS305', courseName: 'Data Science & Analytics', instructor: 'Prof. D. S. (DS)', branch: 'CSE', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },

    // Friday
    { id: 'cse-7-f1', day: 'Friday', startTime: '09:00', endTime: '09:50', courseCode: 'CS404', courseName: 'Distributed Systems', instructor: 'Prof. S. Y. (SY)', branch: 'CSE', degree: 'B.Tech', year: '4th Year', batch: '7th Sem' },
    { id: 'cse-7-f2', day: 'Friday', startTime: '09:50', endTime: '10:40', courseCode: 'CS404', courseName: 'Distributed Systems', instructor: 'Prof. S. Y. (SY)', branch: 'CSE', degree: 'B.Tech', year: '4th Year', batch: '7th Sem' },
    { id: 'cse-7-f3', day: 'Friday', startTime: '10:40', endTime: '11:30', courseCode: 'CS403', courseName: 'Software Project Management (SPM)', instructor: 'Prof. A. B. S. (ABS)', branch: 'CSE', degree: 'B.Tech', year: '4th Year', batch: '7th Sem' },
    { id: 'cse-7-f4', day: 'Friday', startTime: '11:30', endTime: '12:20', courseCode: 'CS403', courseName: 'Software Project Management (SPM)', instructor: 'Prof. A. B. S. (ABS)', branch: 'CSE', degree: 'B.Tech', year: '4th Year', batch: '7th Sem' },
    { id: 'cse-7-f5', day: 'Friday', startTime: '12:20', endTime: '13:10', courseCode: 'CS407', courseName: 'Advanced Computer Vision (ACV)', instructor: 'Prof. B. K. B. (BKB)', branch: 'CSE', degree: 'B.Tech', year: '4th Year', batch: '7th Sem' },
  ],
};

export const NITRR_ROOM_F43: Room = {
  id: 'f-43',
  code: 'F-43',
  name: 'ECE Communications Hall F-43',
  block: 'Block A (Computing & AI)',
  blockShort: 'Block A',
  floor: 1,
  wing: 'East Wing',
  capacity: 80,
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
  coordinates: { x: 345, y: 35, width: 95, height: 95 },
  schedule: [
    // Monday
    { id: 'ece-5-m1', day: 'Monday', startTime: '09:00', endTime: '09:50', courseCode: 'EC305', courseName: 'VLSI Design & Technology', instructor: 'Dr. M. V. Swati', branch: 'ECE', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'ece-5-m2', day: 'Monday', startTime: '09:50', endTime: '10:40', courseCode: 'EC306', courseName: 'Wireless Communications', instructor: 'Dr. S. K. Saha', branch: 'ECE', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'ece-7-m3', day: 'Monday', startTime: '11:30', endTime: '12:20', courseCode: 'EC401', courseName: 'Optical Fiber Communication', instructor: 'Dr. R. K. Chaurasiya', branch: 'ECE', degree: 'B.Tech', year: '4th Year', batch: '7th Sem' },
    { id: 'ece-7-m4', day: 'Monday', startTime: '12:20', endTime: '13:10', courseCode: 'EC402', courseName: 'Radar & Satellite Communication', instructor: 'Dr. B. Acharya', branch: 'ECE', degree: 'B.Tech', year: '4th Year', batch: '7th Sem' },

    // Tuesday
    { id: 'ece-5-t1', day: 'Tuesday', startTime: '09:00', endTime: '09:50', courseCode: 'EC307', courseName: 'Antenna & Wave Propagation', instructor: 'Dr. S. Majumder', branch: 'ECE', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'ece-5-t2', day: 'Tuesday', startTime: '09:50', endTime: '10:40', courseCode: 'EC305', courseName: 'VLSI Design & Technology', instructor: 'Dr. M. V. Swati', branch: 'ECE', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'ece-7-t3', day: 'Tuesday', startTime: '11:30', endTime: '12:20', courseCode: 'EC403', courseName: 'IoT & Sensor Networks', instructor: 'Dr. T. Meenpal', branch: 'ECE', degree: 'B.Tech', year: '4th Year', batch: '7th Sem' },
    { id: 'ece-7-t4', day: 'Tuesday', startTime: '14:10', endTime: '15:00', courseCode: 'EC404', courseName: 'Deep Learning for Vision', instructor: 'Dr. A. S. Raghuvanshi', branch: 'ECE', degree: 'B.Tech', year: '4th Year', batch: '7th Sem' },

    // Wednesday
    { id: 'ece-5-w1', day: 'Wednesday', startTime: '09:00', endTime: '09:50', courseCode: 'EC306', courseName: 'Wireless Communications', instructor: 'Dr. S. K. Saha', branch: 'ECE', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'ece-5-w2', day: 'Wednesday', startTime: '10:40', endTime: '11:30', courseCode: 'EC307', courseName: 'Antenna & Wave Propagation', instructor: 'Dr. S. Majumder', branch: 'ECE', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'ece-7-w3', day: 'Wednesday', startTime: '11:30', endTime: '12:20', courseCode: 'EC401', courseName: 'Optical Fiber Communication', instructor: 'Dr. R. K. Chaurasiya', branch: 'ECE', degree: 'B.Tech', year: '4th Year', batch: '7th Sem' },

    // Thursday
    { id: 'ece-5-th1', day: 'Thursday', startTime: '09:50', endTime: '10:40', courseCode: 'EC305', courseName: 'VLSI Design & Technology', instructor: 'Dr. M. V. Swati', branch: 'ECE', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'ece-7-th2', day: 'Thursday', startTime: '11:30', endTime: '12:20', courseCode: 'EC402', courseName: 'Radar & Satellite Communication', instructor: 'Dr. B. Acharya', branch: 'ECE', degree: 'B.Tech', year: '4th Year', batch: '7th Sem' },

    // Friday
    { id: 'ece-5-f1', day: 'Friday', startTime: '09:00', endTime: '09:50', courseCode: 'EC307', courseName: 'Antenna & Wave Propagation', instructor: 'Dr. S. Majumder', branch: 'ECE', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'ece-7-f2', day: 'Friday', startTime: '10:40', endTime: '11:30', courseCode: 'EC403', courseName: 'IoT & Sensor Networks', instructor: 'Dr. T. Meenpal', branch: 'ECE', degree: 'B.Tech', year: '4th Year', batch: '7th Sem' },
  ],
};

export const NITRR_ROOM_F45: Room = {
  id: 'f-45',
  code: 'F-45',
  name: 'Mechanical Advanced Lecture Room F-45',
  block: 'Block B (Circuits & Core)',
  blockShort: 'Block B',
  floor: 1,
  wing: 'South Wing',
  capacity: 75,
  type: 'Lecture Hall',
  amenities: {
    projector: true,
    ac: true,
    smartBoard: false,
    chargingSockets: 'Moderate',
    wifiSignal: 'Good',
    soundSystem: true,
  },
  suitableForStudy: true,
  coordinates: { x: 450, y: 35, width: 95, height: 95 },
  schedule: [
    // Monday
    { id: 'mech-5-m1', day: 'Monday', startTime: '09:00', endTime: '09:50', courseCode: 'ME305', courseName: 'IC Engines & Gas Turbines', instructor: 'Dr. S. Bhowmick', branch: 'MECH', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'mech-5-m2', day: 'Monday', startTime: '09:50', endTime: '10:40', courseCode: 'ME306', courseName: 'Production Engineering-II', instructor: 'Dr. G. Bhatt', branch: 'MECH', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'mech-7-m3', day: 'Monday', startTime: '11:30', endTime: '12:20', courseCode: 'ME401', courseName: 'Automobile Engineering', instructor: 'Dr. H. Bikrol', branch: 'MECH', degree: 'B.Tech', year: '4th Year', batch: '7th Sem' },
    { id: 'mech-7-m4', day: 'Monday', startTime: '12:20', endTime: '13:10', courseCode: 'ME402', courseName: 'Power Plant Engineering', instructor: 'Dr. S. Sanyal', branch: 'MECH', degree: 'B.Tech', year: '4th Year', batch: '7th Sem' },

    // Tuesday
    { id: 'mech-5-t1', day: 'Tuesday', startTime: '09:00', endTime: '09:50', courseCode: 'ME307', courseName: 'Operations Research', instructor: 'Dr. A. M. Rawani', branch: 'MECH', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'mech-7-t2', day: 'Tuesday', startTime: '10:40', endTime: '11:30', courseCode: 'ME403', courseName: 'CAD/CAM & Robotics', instructor: 'Dr. N. V. Swamy Naidu', branch: 'MECH', degree: 'B.Tech', year: '4th Year', batch: '7th Sem' },
    { id: 'mech-7-t3', day: 'Tuesday', startTime: '11:30', endTime: '12:20', courseCode: 'ME401', courseName: 'Automobile Engineering', instructor: 'Dr. H. Bikrol', branch: 'MECH', degree: 'B.Tech', year: '4th Year', batch: '7th Sem' },

    // Wednesday
    { id: 'mech-5-w1', day: 'Wednesday', startTime: '09:00', endTime: '09:50', courseCode: 'ME305', courseName: 'IC Engines & Gas Turbines', instructor: 'Dr. S. Bhowmick', branch: 'MECH', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'mech-7-w2', day: 'Wednesday', startTime: '11:30', endTime: '12:20', courseCode: 'ME402', courseName: 'Power Plant Engineering', instructor: 'Dr. S. Sanyal', branch: 'MECH', degree: 'B.Tech', year: '4th Year', batch: '7th Sem' },

    // Thursday
    { id: 'mech-5-th1', day: 'Thursday', startTime: '09:50', endTime: '10:40', courseCode: 'ME306', courseName: 'Production Engineering-II', instructor: 'Dr. G. Bhatt', branch: 'MECH', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'mech-7-th2', day: 'Thursday', startTime: '11:30', endTime: '12:20', courseCode: 'ME403', courseName: 'CAD/CAM & Robotics', instructor: 'Dr. N. V. Swamy Naidu', branch: 'MECH', degree: 'B.Tech', year: '4th Year', batch: '7th Sem' },

    // Friday
    { id: 'mech-5-f1', day: 'Friday', startTime: '09:00', endTime: '09:50', courseCode: 'ME307', courseName: 'Operations Research', instructor: 'Dr. A. M. Rawani', branch: 'MECH', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'mech-7-f2', day: 'Friday', startTime: '10:40', endTime: '11:30', courseCode: 'ME401', courseName: 'Automobile Engineering', instructor: 'Dr. H. Bikrol', branch: 'MECH', degree: 'B.Tech', year: '4th Year', batch: '7th Sem' },
  ],
};

export const NITRR_ROOM_F54: Room = {
  id: 'f-54',
  code: 'F-54',
  name: 'Computing Seminar & AI Studio F-54',
  block: 'Block A (Computing & AI)',
  blockShort: 'Block A',
  floor: 1,
  wing: 'East Wing',
  capacity: 65,
  type: 'Seminar Hall',
  amenities: {
    projector: true,
    ac: true,
    smartBoard: true,
    chargingSockets: 'Plenty',
    wifiSignal: 'Excellent',
    soundSystem: true,
  },
  suitableForStudy: true,
  coordinates: { x: 555, y: 35, width: 90, height: 95 },
  schedule: [
    { id: 'cse-iks-w', day: 'Wednesday', startTime: '14:10', endTime: '15:00', courseCode: 'CS306', courseName: 'Computing Algo & IKS', instructor: 'Prof. M. P. (MP)', branch: 'CSE', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'cse-iks-th', day: 'Thursday', startTime: '14:10', endTime: '15:00', courseCode: 'CS306', courseName: 'Computing Algo & IKS', instructor: 'Prof. M. P. (MP)', branch: 'CSE', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'mtech-cs-m1', day: 'Monday', startTime: '15:40', endTime: '17:15', courseCode: 'CS501', courseName: 'Advanced Machine Learning & Neural Nets', instructor: 'Dr. K. Mahajan', branch: 'CSE', degree: 'M.Tech', year: '1st Year', batch: 'M.Tech AI' },
    { id: 'mtech-cs-t1', day: 'Tuesday', startTime: '15:40', endTime: '17:15', courseCode: 'CS502', courseName: 'Distributed Cloud Architecture', instructor: 'Dr. S. Verma', branch: 'CSE', degree: 'M.Tech', year: '1st Year', batch: 'M.Tech DS' },
    { id: 'phd-seminar-f', day: 'Friday', startTime: '15:00', endTime: '17:00', courseCode: 'PHD901', courseName: 'Doctoral Research Colloquium', instructor: 'Prof. N. K. Nagwani', branch: 'Multi-disciplinary', degree: 'Ph.D.', year: '2nd Year', batch: 'Scholars' },
  ],
};

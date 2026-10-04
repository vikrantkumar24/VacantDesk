import { Room } from './campusData.ts';

export const NITRR_ROOM_FN4: Room = {
  id: 'fn-4',
  code: 'FN-4',
  name: 'Lecture Hall FN-4 (North Wing)',
  block: 'Block A (Computing & AI)',
  blockShort: 'Block A',
  floor: 1,
  wing: 'North Wing',
  capacity: 95,
  type: 'Lecture Hall',
  amenities: { projector: true, ac: true, smartBoard: true, chargingSockets: 'Plenty', wifiSignal: 'Excellent', soundSystem: true },
  suitableForStudy: true,
  coordinates: { x: 350, y: 35, width: 140, height: 95 },
  schedule: [
    // Section C: Chemical Engg
    { id: 'fn4-c-1', day: 'Monday', startTime: '14:00', endTime: '14:50', courseCode: 'CS102', courseName: 'Data Structure', instructor: 'Dr. Satish Kumar', branch: 'Chemical', degree: 'B.Tech', year: '1st Year', batch: 'Section C' },
    { id: 'fn4-c-2', day: 'Monday', startTime: '14:50', endTime: '15:40', courseCode: 'MA101', courseName: 'Mathematics-I', instructor: 'Dr. Madasu Krishna Prasad', branch: 'Chemical', degree: 'B.Tech', year: '1st Year', batch: 'Section C' },
    { id: 'fn4-c-3', day: 'Monday', startTime: '15:40', endTime: '16:30', courseCode: 'ME101', courseName: 'Engineering Mechanics', instructor: 'Dr. Ankur Gupta', branch: 'Chemical', degree: 'B.Tech', year: '1st Year', batch: 'Section C' },
    { id: 'fn4-c-4', day: 'Monday', startTime: '16:30', endTime: '17:15', courseCode: 'CS101', courseName: 'Computer Programming', instructor: 'Dr. Satish Kumar', branch: 'Chemical', degree: 'B.Tech', year: '1st Year', batch: 'Section C' },

    { id: 'fn4-c-5', day: 'Tuesday', startTime: '09:00', endTime: '09:50', courseCode: 'CS102', courseName: 'Data Structure', instructor: 'Dr. Satish Kumar', branch: 'Chemical', degree: 'B.Tech', year: '1st Year', batch: 'Section C' },
    { id: 'fn4-c-6', day: 'Tuesday', startTime: '09:50', endTime: '10:40', courseCode: 'MA101', courseName: 'Mathematics-I', instructor: 'Dr. Lavudya Bhaskar', branch: 'Chemical', degree: 'B.Tech', year: '1st Year', batch: 'Section C' },
    { id: 'fn4-c-7', day: 'Tuesday', startTime: '10:40', endTime: '11:30', courseCode: 'PH102', courseName: 'Physics-II', instructor: 'Dr. Amit Kumar Prasad', branch: 'Chemical', degree: 'B.Tech', year: '1st Year', batch: 'Section C' },
    { id: 'fn4-c-8', day: 'Tuesday', startTime: '11:30', endTime: '12:20', courseCode: 'ENV101', courseName: 'Environment & Ecology', instructor: 'Prof. Shyama Prasad Mahapatra', branch: 'Chemical', degree: 'B.Tech', year: '1st Year', batch: 'Section C' },

    { id: 'fn4-c-9', day: 'Wednesday', startTime: '10:40', endTime: '11:30', courseCode: 'CS101', courseName: 'Computer Programming', instructor: 'Dr. Satish Kumar', branch: 'Chemical', degree: 'B.Tech', year: '1st Year', batch: 'Section C' },
    { id: 'fn4-c-10', day: 'Wednesday', startTime: '11:30', endTime: '12:20', courseCode: 'ME101', courseName: 'Engineering Mechanics', instructor: 'Dr. Ankur Gupta', branch: 'Chemical', degree: 'B.Tech', year: '1st Year', batch: 'Section C' },
    { id: 'fn4-c-11', day: 'Wednesday', startTime: '12:20', endTime: '13:00', courseCode: 'ME101', courseName: 'Engineering Mechanics', instructor: 'Dr. Ankur Gupta', branch: 'Chemical', degree: 'B.Tech', year: '1st Year', batch: 'Section C' },
    { id: 'fn4-c-12', day: 'Wednesday', startTime: '14:00', endTime: '14:50', courseCode: 'CS102', courseName: 'Data Structure', instructor: 'Dr. Satish Kumar', branch: 'Chemical', degree: 'B.Tech', year: '1st Year', batch: 'Section C' },
    { id: 'fn4-c-13', day: 'Wednesday', startTime: '14:50', endTime: '15:40', courseCode: 'PH102', courseName: 'Physics-II', instructor: 'Dr. Amit Kumar Prasad', branch: 'Chemical', degree: 'B.Tech', year: '1st Year', batch: 'Section C' },
    { id: 'fn4-c-14', day: 'Wednesday', startTime: '15:40', endTime: '16:30', courseCode: 'MA101', courseName: 'Mathematics-I', instructor: 'Dr. Madasu Krishna Prasad', branch: 'Chemical', degree: 'B.Tech', year: '1st Year', batch: 'Section C' },
    { id: 'fn4-c-15', day: 'Wednesday', startTime: '16:30', endTime: '17:15', courseCode: 'ENV101', courseName: 'Environment & Ecology', instructor: 'Prof. Shyama Prasad Mahapatra', branch: 'Chemical', degree: 'B.Tech', year: '1st Year', batch: 'Section C' },

    { id: 'fn4-c-16', day: 'Thursday', startTime: '14:00', endTime: '14:50', courseCode: 'MA101', courseName: 'Mathematics-I', instructor: 'Dr. Lavudya Bhaskar', branch: 'Chemical', degree: 'B.Tech', year: '1st Year', batch: 'Section C' },
    { id: 'fn4-c-17', day: 'Thursday', startTime: '14:50', endTime: '15:40', courseCode: 'CS101', courseName: 'Computer Programming', instructor: 'Dr. Satish Kumar', branch: 'Chemical', degree: 'B.Tech', year: '1st Year', batch: 'Section C' },
    { id: 'fn4-c-18', day: 'Thursday', startTime: '15:40', endTime: '16:30', courseCode: 'PH102', courseName: 'Physics-II', instructor: 'Dr. Amit Kumar Prasad', branch: 'Chemical', degree: 'B.Tech', year: '1st Year', batch: 'Section C' },
    { id: 'fn4-c-19', day: 'Thursday', startTime: '16:30', endTime: '17:15', courseCode: 'ENV101', courseName: 'Environment & Ecology', instructor: 'Prof. Shyama Prasad Mahapatra', branch: 'Chemical', degree: 'B.Tech', year: '1st Year', batch: 'Section C' },

    { id: 'fn4-c-20', day: 'Friday', startTime: '15:40', endTime: '17:15', courseCode: 'NCC101', courseName: 'NCC / NSS', instructor: 'Officer in Charge', branch: 'Chemical', degree: 'B.Tech', year: '1st Year', batch: 'Section C' },

    // Section F: Computer Science & Engg
    { id: 'fn4-f-1', day: 'Monday', startTime: '09:50', endTime: '10:40', courseCode: 'HS101', courseName: 'Communication Skill', instructor: 'Dr. Jaya Dwivedi', branch: 'CSE', degree: 'B.Tech', year: '1st Year', batch: 'Section F' },
    { id: 'fn4-f-2', day: 'Monday', startTime: '10:40', endTime: '11:30', courseCode: 'PH101', courseName: 'Physics-I', instructor: 'Dr. Injamul Alam', branch: 'CSE', degree: 'B.Tech', year: '1st Year', batch: 'Section F' },
    { id: 'fn4-f-3', day: 'Monday', startTime: '11:30', endTime: '12:20', courseCode: 'CY101', courseName: 'Applied Chemistry', instructor: 'Dr. T. Maharana', branch: 'CSE', degree: 'B.Tech', year: '1st Year', batch: 'Section F' },
    { id: 'fn4-f-4', day: 'Monday', startTime: '12:20', endTime: '13:00', courseCode: 'MA101', courseName: 'Mathematics-I', instructor: 'Dr. Neeraj Manhas', branch: 'CSE', degree: 'B.Tech', year: '1st Year', batch: 'Section F' },

    { id: 'fn4-f-5', day: 'Tuesday', startTime: '14:00', endTime: '14:50', courseCode: 'MA101', courseName: 'Mathematics-I', instructor: 'Dr. Neeraj Manhas', branch: 'CSE', degree: 'B.Tech', year: '1st Year', batch: 'Section F' },
    { id: 'fn4-f-6', day: 'Tuesday', startTime: '14:50', endTime: '15:40', courseCode: 'PH101', courseName: 'Physics-I', instructor: 'Dr. Injamul Alam', branch: 'CSE', degree: 'B.Tech', year: '1st Year', batch: 'Section F' },
    { id: 'fn4-f-7', day: 'Tuesday', startTime: '15:40', endTime: '16:30', courseCode: 'CY101', courseName: 'Applied Chemistry', instructor: 'Dr. T. Maharana', branch: 'CSE', degree: 'B.Tech', year: '1st Year', batch: 'Section F' },

    { id: 'fn4-f-8', day: 'Wednesday', startTime: '09:00', endTime: '09:50', courseCode: 'MA101', courseName: 'Mathematics-I', instructor: 'Dr. Neeraj Manhas', branch: 'CSE', degree: 'B.Tech', year: '1st Year', batch: 'Section F' },

    { id: 'fn4-f-9', day: 'Friday', startTime: '10:40', endTime: '11:30', courseCode: 'MA101', courseName: 'Mathematics-I', instructor: 'Dr. Neeraj Manhas', branch: 'CSE', degree: 'B.Tech', year: '1st Year', batch: 'Section F' },
    { id: 'fn4-f-10', day: 'Friday', startTime: '14:00', endTime: '14:50', courseCode: 'HS101', courseName: 'Communication Skill', instructor: 'Dr. Jaya Dwivedi', branch: 'CSE', degree: 'B.Tech', year: '1st Year', batch: 'Section F' },
    { id: 'fn4-f-11', day: 'Friday', startTime: '14:50', endTime: '15:40', courseCode: 'PH101', courseName: 'Physics-I', instructor: 'Dr. Injamul Alam', branch: 'CSE', degree: 'B.Tech', year: '1st Year', batch: 'Section F' },
    { id: 'fn4-f-12', day: 'Friday', startTime: '15:40', endTime: '16:30', courseCode: 'CY101', courseName: 'Applied Chemistry', instructor: 'Dr. T. Maharana', branch: 'CSE', degree: 'B.Tech', year: '1st Year', batch: 'Section F' },
  ],
};

export const NITRR_ROOM_F39: Room = {
  id: 'f-39',
  code: 'F-39',
  name: 'Lecture Hall F-39 (First Floor)',
  block: 'Block C (PG & Science)',
  blockShort: 'Block C',
  floor: 1,
  wing: 'West Wing',
  capacity: 85,
  type: 'Lecture Hall',
  amenities: { projector: true, ac: true, smartBoard: false, chargingSockets: 'Moderate', wifiSignal: 'Good', soundSystem: true },
  suitableForStudy: true,
  coordinates: { x: 30, y: 150, width: 140, height: 95 },
  schedule: [
    // Section D: Civil Engg
    { id: 'f39-d-1', day: 'Monday', startTime: '09:00', endTime: '09:50', courseCode: 'CS101', courseName: 'Computer Programming', instructor: 'Dr. Sharbani Purkayastha', branch: 'CIVIL', degree: 'B.Tech', year: '1st Year', batch: 'Section D' },
    { id: 'f39-d-2', day: 'Monday', startTime: '09:50', endTime: '10:40', courseCode: 'ENV101', courseName: 'Environment & Ecology', instructor: 'Dr. Jyoti Korram', branch: 'CIVIL', degree: 'B.Tech', year: '1st Year', batch: 'Section D' },
    { id: 'f39-d-3', day: 'Monday', startTime: '10:40', endTime: '11:30', courseCode: 'MA101', courseName: 'Mathematics-I', instructor: 'Dr. Lavudya Bhaskar', branch: 'CIVIL', degree: 'B.Tech', year: '1st Year', batch: 'Section D' },
    { id: 'f39-d-4', day: 'Monday', startTime: '11:30', endTime: '12:20', courseCode: 'PH102', courseName: 'Physics-II', instructor: 'Dr. Harikrishnan M.P.', branch: 'CIVIL', degree: 'B.Tech', year: '1st Year', batch: 'Section D' },

    { id: 'f39-d-5', day: 'Tuesday', startTime: '09:50', endTime: '10:40', courseCode: 'NCC101', courseName: 'NCC / NSS', instructor: 'Officer in Charge', branch: 'CIVIL', degree: 'B.Tech', year: '1st Year', batch: 'Section D' },
    { id: 'f39-d-6', day: 'Tuesday', startTime: '10:40', endTime: '11:30', courseCode: 'MA101', courseName: 'Mathematics-I', instructor: 'Dr. Lavudya Bhaskar', branch: 'CIVIL', degree: 'B.Tech', year: '1st Year', batch: 'Section D' },
    { id: 'f39-d-7', day: 'Tuesday', startTime: '11:30', endTime: '12:20', courseCode: 'ME101', courseName: 'Engineering Mechanics', instructor: 'Dr. Nithin Kumar Jain', branch: 'CIVIL', degree: 'B.Tech', year: '1st Year', batch: 'Section D' },

    { id: 'f39-d-8', day: 'Wednesday', startTime: '09:50', endTime: '10:40', courseCode: 'ENV101', courseName: 'Environment & Ecology', instructor: 'Dr. Jyoti Korram', branch: 'CIVIL', degree: 'B.Tech', year: '1st Year', batch: 'Section D' },
    { id: 'f39-d-9', day: 'Wednesday', startTime: '10:40', endTime: '11:30', courseCode: 'PH102', courseName: 'Physics-II', instructor: 'Dr. Harikrishnan M.P.', branch: 'CIVIL', degree: 'B.Tech', year: '1st Year', batch: 'Section D' },
    { id: 'f39-d-10', day: 'Wednesday', startTime: '11:30', endTime: '12:20', courseCode: 'CS101', courseName: 'Computer Programming', instructor: 'Dr. Sharbani Purkayastha', branch: 'CIVIL', degree: 'B.Tech', year: '1st Year', batch: 'Section D' },

    { id: 'f39-d-11', day: 'Thursday', startTime: '14:00', endTime: '14:50', courseCode: 'MA101', courseName: 'Mathematics-I', instructor: 'Dr. Lavudya Bhaskar', branch: 'CIVIL', degree: 'B.Tech', year: '1st Year', batch: 'Section D' },

    { id: 'f39-d-12', day: 'Friday', startTime: '09:00', endTime: '09:50', courseCode: 'MA101', courseName: 'Mathematics-I', instructor: 'Dr. Lavudya Bhaskar', branch: 'CIVIL', degree: 'B.Tech', year: '1st Year', batch: 'Section D' },
    { id: 'f39-d-13', day: 'Friday', startTime: '09:50', endTime: '10:40', courseCode: 'PH102', courseName: 'Physics-II', instructor: 'Dr. Harikrishnan M.P.', branch: 'CIVIL', degree: 'B.Tech', year: '1st Year', batch: 'Section D' },
    { id: 'f39-d-14', day: 'Friday', startTime: '10:40', endTime: '11:30', courseCode: 'ENV101', courseName: 'Environment & Ecology', instructor: 'Dr. Jyoti Korram', branch: 'CIVIL', degree: 'B.Tech', year: '1st Year', batch: 'Section D' },
    { id: 'f39-d-15', day: 'Friday', startTime: '11:30', endTime: '12:20', courseCode: 'CS101', courseName: 'Computer Programming', instructor: 'Dr. Sharbani Purkayastha', branch: 'CIVIL', degree: 'B.Tech', year: '1st Year', batch: 'Section D' },
    { id: 'f39-d-16', day: 'Friday', startTime: '12:20', endTime: '13:00', courseCode: 'ME101', courseName: 'Engineering Mechanics', instructor: 'Dr. Nithin Kumar Jain', branch: 'CIVIL', degree: 'B.Tech', year: '1st Year', batch: 'Section D' },

    // Section E: Mining Engg
    { id: 'f39-e-1', day: 'Monday', startTime: '14:00', endTime: '14:50', courseCode: 'EE101', courseName: 'Basic Electrical Engineering', instructor: 'Dr. R.N. Patel', branch: 'Mining', degree: 'B.Tech', year: '1st Year', batch: 'Section E' },
    { id: 'f39-e-2', day: 'Monday', startTime: '14:50', endTime: '15:40', courseCode: 'PH102', courseName: 'Physics-II', instructor: 'Dr. Sandeep Kumar Yadav', branch: 'Mining', degree: 'B.Tech', year: '1st Year', batch: 'Section E' },
    { id: 'f39-e-3', day: 'Monday', startTime: '15:40', endTime: '16:30', courseCode: 'ENV101', courseName: 'Environment & Ecology', instructor: 'Dr. Yukti Dewangan', branch: 'Mining', degree: 'B.Tech', year: '1st Year', batch: 'Section E' },
    { id: 'f39-e-4', day: 'Monday', startTime: '16:30', endTime: '17:15', courseCode: 'ME101', courseName: 'Engineering Mechanics', instructor: 'Dr. S.K. Dewangan', branch: 'Mining', degree: 'B.Tech', year: '1st Year', batch: 'Section E' },

    { id: 'f39-e-5', day: 'Tuesday', startTime: '14:00', endTime: '14:50', courseCode: 'PH102', courseName: 'Physics-II', instructor: 'Dr. Sandeep Kumar Yadav', branch: 'Mining', degree: 'B.Tech', year: '1st Year', batch: 'Section E' },
    { id: 'f39-e-6', day: 'Tuesday', startTime: '14:50', endTime: '15:40', courseCode: 'ENV101', courseName: 'Environment & Ecology', instructor: 'Dr. Yukti Dewangan', branch: 'Mining', degree: 'B.Tech', year: '1st Year', batch: 'Section E' },
    { id: 'f39-e-7', day: 'Tuesday', startTime: '15:40', endTime: '16:30', courseCode: 'MA101', courseName: 'Mathematics-I', instructor: 'Dr. Madasu Krishna Prasad', branch: 'Mining', degree: 'B.Tech', year: '1st Year', batch: 'Section E' },
    { id: 'f39-e-8', day: 'Tuesday', startTime: '16:30', endTime: '17:15', courseCode: 'CS101', courseName: 'Computer Programming', instructor: 'Dr. Hira Singh Sachdev', branch: 'Mining', degree: 'B.Tech', year: '1st Year', batch: 'Section E' },

    { id: 'f39-e-9', day: 'Wednesday', startTime: '14:00', endTime: '14:50', courseCode: 'CS101', courseName: 'Computer Programming', instructor: 'Dr. Hira Singh Sachdev', branch: 'Mining', degree: 'B.Tech', year: '1st Year', batch: 'Section E' },
    { id: 'f39-e-10', day: 'Wednesday', startTime: '14:50', endTime: '15:40', courseCode: 'MA101', courseName: 'Mathematics-I', instructor: 'Dr. Lavudya Bhaskar', branch: 'Mining', degree: 'B.Tech', year: '1st Year', batch: 'Section E' },
    { id: 'f39-e-11', day: 'Wednesday', startTime: '15:40', endTime: '16:30', courseCode: 'PH102', courseName: 'Physics-II', instructor: 'Dr. Sandeep Kumar Yadav', branch: 'Mining', degree: 'B.Tech', year: '1st Year', batch: 'Section E' },
    { id: 'f39-e-12', day: 'Wednesday', startTime: '16:30', endTime: '17:15', courseCode: 'NCC101', courseName: 'NCC / NSS', instructor: 'Officer in Charge', branch: 'Mining', degree: 'B.Tech', year: '1st Year', batch: 'Section E' },

    { id: 'f39-e-13', day: 'Thursday', startTime: '09:00', endTime: '09:50', courseCode: 'MA101', courseName: 'Mathematics-I', instructor: 'Dr. Madasu Krishna Prasad', branch: 'Mining', degree: 'B.Tech', year: '1st Year', batch: 'Section E' },
    { id: 'f39-e-14', day: 'Thursday', startTime: '09:50', endTime: '10:40', courseCode: 'EE101', courseName: 'Basic Electrical Engineering', instructor: 'Dr. R.N. Patel', branch: 'Mining', degree: 'B.Tech', year: '1st Year', batch: 'Section E' },
    { id: 'f39-e-15', day: 'Thursday', startTime: '10:40', endTime: '11:30', courseCode: 'ME101', courseName: 'Engineering Mechanics', instructor: 'Dr. S.K. Dewangan', branch: 'Mining', degree: 'B.Tech', year: '1st Year', batch: 'Section E' },
    { id: 'f39-e-16', day: 'Thursday', startTime: '11:30', endTime: '12:20', courseCode: 'ENV101', courseName: 'Environment & Ecology', instructor: 'Dr. Yukti Dewangan', branch: 'Mining', degree: 'B.Tech', year: '1st Year', batch: 'Section E' },

    { id: 'f39-e-17', day: 'Friday', startTime: '14:00', endTime: '14:50', courseCode: 'ME101', courseName: 'Engineering Mechanics', instructor: 'Dr. S.K. Dewangan', branch: 'Mining', degree: 'B.Tech', year: '1st Year', batch: 'Section E' },
    { id: 'f39-e-18', day: 'Friday', startTime: '14:50', endTime: '15:40', courseCode: 'MA101', courseName: 'Mathematics-I', instructor: 'Dr. Lavudya Bhaskar', branch: 'Mining', degree: 'B.Tech', year: '1st Year', batch: 'Section E' },
    { id: 'f39-e-19', day: 'Friday', startTime: '15:40', endTime: '16:30', courseCode: 'EE101', courseName: 'Basic Electrical Engineering', instructor: 'Dr. R.N. Patel', branch: 'Mining', degree: 'B.Tech', year: '1st Year', batch: 'Section E' },
    { id: 'f39-e-20', day: 'Friday', startTime: '16:30', endTime: '17:15', courseCode: 'CS101', courseName: 'Computer Programming', instructor: 'Dr. Hira Singh Sachdev', branch: 'Mining', degree: 'B.Tech', year: '1st Year', batch: 'Section E' },
  ],
};

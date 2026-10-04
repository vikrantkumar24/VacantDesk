import { Room, RoomScheduleItem } from './campusData.ts';

// NIT Raipur B.Tech 1st Sem Autumn 2026 Timetable
// Special override: Section L Wednesday & Thursday 14:00-14:50 moved to 17:15-18:00

export const NITRR_ROOM_FN1: Room = {
  id: 'fn-1',
  code: 'FN-1',
  name: 'Lecture Hall FN-1 (North Wing)',
  block: 'Block A (Computing & AI)',
  blockShort: 'Block A',
  floor: 1,
  wing: 'North Wing',
  capacity: 90,
  type: 'Lecture Hall',
  amenities: { projector: true, ac: true, smartBoard: true, chargingSockets: 'Plenty', wifiSignal: 'Excellent', soundSystem: true },
  suitableForStudy: true,
  coordinates: { x: 30, y: 35, width: 140, height: 95 },
  schedule: [
    // Section A: Bio Medical Engg
    { id: 'fn1-a-1', day: 'Monday', startTime: '09:00', endTime: '09:50', courseCode: 'BM101', courseName: 'Basic Biomedical Engineering', instructor: 'Dr. Saurabh Gupta', branch: 'Bio-Medical', degree: 'B.Tech', year: '1st Year', batch: 'Section A' },
    { id: 'fn1-a-2', day: 'Monday', startTime: '09:50', endTime: '10:40', courseCode: 'MA101', courseName: 'Mathematics-I', instructor: 'Dr. Madasu Krishna Prasad', branch: 'Bio-Medical', degree: 'B.Tech', year: '1st Year', batch: 'Section A' },
    { id: 'fn1-a-3', day: 'Monday', startTime: '10:40', endTime: '11:30', courseCode: 'PH102', courseName: 'Physics-II', instructor: 'Dr. Sudha Kumari', branch: 'Bio-Medical', degree: 'B.Tech', year: '1st Year', batch: 'Section A' },
    { id: 'fn1-a-4', day: 'Monday', startTime: '11:30', endTime: '12:20', courseCode: 'CS102', courseName: 'Data Structure', instructor: 'Dr. Ashish Misal', branch: 'Bio-Medical', degree: 'B.Tech', year: '1st Year', batch: 'Section A' },
    { id: 'fn1-a-5', day: 'Monday', startTime: '12:20', endTime: '13:00', courseCode: 'CS101', courseName: 'Computer Programming', instructor: 'Ms. Mahima Dewangan', branch: 'Bio-Medical', degree: 'B.Tech', year: '1st Year', batch: 'Section A' },

    { id: 'fn1-a-6', day: 'Tuesday', startTime: '09:50', endTime: '10:40', courseCode: 'CS101', courseName: 'Computer Programming', instructor: 'Ms. Mahima Dewangan', branch: 'Bio-Medical', degree: 'B.Tech', year: '1st Year', batch: 'Section A' },
    { id: 'fn1-a-7', day: 'Tuesday', startTime: '10:40', endTime: '11:30', courseCode: 'PH102', courseName: 'Physics-II', instructor: 'Dr. Sudha Kumari', branch: 'Bio-Medical', degree: 'B.Tech', year: '1st Year', batch: 'Section A' },
    { id: 'fn1-a-8', day: 'Tuesday', startTime: '11:30', endTime: '12:20', courseCode: 'MA101', courseName: 'Mathematics-I', instructor: 'Dr. Lavudya Bhaskar', branch: 'Bio-Medical', degree: 'B.Tech', year: '1st Year', batch: 'Section A' },
    { id: 'fn1-a-9', day: 'Tuesday', startTime: '12:20', endTime: '13:00', courseCode: 'CS102', courseName: 'Data Structure', instructor: 'Dr. Ashish Misal', branch: 'Bio-Medical', degree: 'B.Tech', year: '1st Year', batch: 'Section A' },

    { id: 'fn1-a-10', day: 'Wednesday', startTime: '09:00', endTime: '09:50', courseCode: 'ENV101', courseName: 'Environment & Ecology', instructor: 'Dr. Sagarika Bhattachariya', branch: 'Bio-Medical', degree: 'B.Tech', year: '1st Year', batch: 'Section A' },
    { id: 'fn1-a-11', day: 'Wednesday', startTime: '09:50', endTime: '10:40', courseCode: 'CS101', courseName: 'Computer Programming', instructor: 'Ms. Mahima Dewangan', branch: 'Bio-Medical', degree: 'B.Tech', year: '1st Year', batch: 'Section A' },
    { id: 'fn1-a-12', day: 'Wednesday', startTime: '10:40', endTime: '11:30', courseCode: 'MA101', courseName: 'Mathematics-I', instructor: 'Dr. Madasu Krishna Prasad', branch: 'Bio-Medical', degree: 'B.Tech', year: '1st Year', batch: 'Section A' },
    { id: 'fn1-a-13', day: 'Wednesday', startTime: '11:30', endTime: '12:20', courseCode: 'BM101', courseName: 'Basic Biomedical Engineering', instructor: 'Dr. Saurabh Gupta', branch: 'Bio-Medical', degree: 'B.Tech', year: '1st Year', batch: 'Section A' },

    { id: 'fn1-a-14', day: 'Thursday', startTime: '09:00', endTime: '09:50', courseCode: 'CS102', courseName: 'Data Structure', instructor: 'Dr. Ashish Misal', branch: 'Bio-Medical', degree: 'B.Tech', year: '1st Year', batch: 'Section A' },
    { id: 'fn1-a-15', day: 'Thursday', startTime: '09:50', endTime: '10:40', courseCode: 'ENV101', courseName: 'Environment & Ecology', instructor: 'Dr. Sagarika Bhattachariya', branch: 'Bio-Medical', degree: 'B.Tech', year: '1st Year', batch: 'Section A' },
    { id: 'fn1-a-16', day: 'Thursday', startTime: '10:40', endTime: '11:30', courseCode: 'BM101', courseName: 'Basic Biomedical Engineering', instructor: 'Dr. Saurabh Gupta', branch: 'Bio-Medical', degree: 'B.Tech', year: '1st Year', batch: 'Section A' },
    { id: 'fn1-a-17', day: 'Thursday', startTime: '11:30', endTime: '12:20', courseCode: 'PH102', courseName: 'Physics-II', instructor: 'Dr. Sudha Kumari', branch: 'Bio-Medical', degree: 'B.Tech', year: '1st Year', batch: 'Section A' },
    { id: 'fn1-a-18', day: 'Thursday', startTime: '12:20', endTime: '13:00', courseCode: 'MA101', courseName: 'Mathematics-I', instructor: 'Dr. Lavudya Bhaskar', branch: 'Bio-Medical', degree: 'B.Tech', year: '1st Year', batch: 'Section A' },

    { id: 'fn1-a-19', day: 'Friday', startTime: '09:00', endTime: '09:50', courseCode: 'ENV101', courseName: 'Environment & Ecology', instructor: 'Dr. Sagarika Bhattachariya', branch: 'Bio-Medical', degree: 'B.Tech', year: '1st Year', batch: 'Section A' },
    { id: 'fn1-a-20', day: 'Friday', startTime: '09:50', endTime: '11:30', courseCode: 'NCC101', courseName: 'NCC / NSS', instructor: 'Officer in Charge', branch: 'Bio-Medical', degree: 'B.Tech', year: '1st Year', batch: 'Section A' },

    // Section B: Bio Tech Engg (Afternoon in FN-1)
    { id: 'fn1-b-1', day: 'Monday', startTime: '14:00', endTime: '14:50', courseCode: 'ENV101', courseName: 'Environment & Ecology', instructor: 'Dr. Sagarika Bhattachariya', branch: 'Bio-Tech', degree: 'B.Tech', year: '1st Year', batch: 'Section B' },
    { id: 'fn1-b-2', day: 'Monday', startTime: '14:50', endTime: '15:40', courseCode: 'MA101', courseName: 'Mathematics-I', instructor: 'Dr. Madasu Krishna Prasad', branch: 'Bio-Tech', degree: 'B.Tech', year: '1st Year', batch: 'Section B' },
    { id: 'fn1-b-3', day: 'Monday', startTime: '15:40', endTime: '16:30', courseCode: 'PH102', courseName: 'Physics-II', instructor: 'Dr. Priyanka Sahare', branch: 'Bio-Tech', degree: 'B.Tech', year: '1st Year', batch: 'Section B' },
    { id: 'fn1-b-4', day: 'Monday', startTime: '16:30', endTime: '17:15', courseCode: 'CS102', courseName: 'Data Structure', instructor: 'Dr. Anita Murmu', branch: 'Bio-Tech', degree: 'B.Tech', year: '1st Year', batch: 'Section B' },

    { id: 'fn1-b-5', day: 'Tuesday', startTime: '14:00', endTime: '14:50', courseCode: 'CS101', courseName: 'Computer Programming', instructor: 'Dr. Shailendra Kumar Tripathi', branch: 'Bio-Tech', degree: 'B.Tech', year: '1st Year', batch: 'Section B' },
    { id: 'fn1-b-6', day: 'Tuesday', startTime: '14:50', endTime: '15:40', courseCode: 'PH102', courseName: 'Physics-II', instructor: 'Dr. Priyanka Sahare', branch: 'Bio-Tech', degree: 'B.Tech', year: '1st Year', batch: 'Section B' },
    { id: 'fn1-b-7', day: 'Tuesday', startTime: '15:40', endTime: '16:30', courseCode: 'MA101', courseName: 'Mathematics-I', instructor: 'Dr. Lavudya Bhaskar', branch: 'Bio-Tech', degree: 'B.Tech', year: '1st Year', batch: 'Section B' },
    { id: 'fn1-b-8', day: 'Tuesday', startTime: '16:30', endTime: '17:15', courseCode: 'NCC101', courseName: 'NCC / NSS', instructor: 'Officer in Charge', branch: 'Bio-Tech', degree: 'B.Tech', year: '1st Year', batch: 'Section B' },

    { id: 'fn1-b-9', day: 'Wednesday', startTime: '12:20', endTime: '13:00', courseCode: 'BT101', courseName: 'Basic Bio-Science', instructor: 'Dr. Manishekhar Kumar / Dr. D. Vasanth', branch: 'Bio-Tech', degree: 'B.Tech', year: '1st Year', batch: 'Section B' },
    { id: 'fn1-b-10', day: 'Wednesday', startTime: '14:00', endTime: '14:50', courseCode: 'CS102', courseName: 'Data Structure', instructor: 'Dr. Anita Murmu', branch: 'Bio-Tech', degree: 'B.Tech', year: '1st Year', batch: 'Section B' },
    { id: 'fn1-b-11', day: 'Wednesday', startTime: '14:50', endTime: '15:40', courseCode: 'CS101', courseName: 'Computer Programming', instructor: 'Dr. Shailendra Kumar Tripathi', branch: 'Bio-Tech', degree: 'B.Tech', year: '1st Year', batch: 'Section B' },
    { id: 'fn1-b-12', day: 'Wednesday', startTime: '15:40', endTime: '16:30', courseCode: 'ENV101', courseName: 'Environment & Ecology', instructor: 'Dr. Sagarika Bhattachariya', branch: 'Bio-Tech', degree: 'B.Tech', year: '1st Year', batch: 'Section B' },
    { id: 'fn1-b-13', day: 'Wednesday', startTime: '16:30', endTime: '17:15', courseCode: 'BT101', courseName: 'Basic Bio-Science', instructor: 'Dr. Manishekhar Kumar / Dr. D. Vasanth', branch: 'Bio-Tech', degree: 'B.Tech', year: '1st Year', batch: 'Section B' },
    { id: 'fn1-b-14', day: 'Wednesday', startTime: '17:15', endTime: '18:00', courseCode: 'MA101', courseName: 'Mathematics-I', instructor: 'Dr. Madasu Krishna Prasad', branch: 'Bio-Tech', degree: 'B.Tech', year: '1st Year', batch: 'Section B' },

    { id: 'fn1-b-15', day: 'Thursday', startTime: '14:00', endTime: '14:50', courseCode: 'PH102', courseName: 'Physics-II', instructor: 'Dr. Priyanka Sahare', branch: 'Bio-Tech', degree: 'B.Tech', year: '1st Year', batch: 'Section B' },
    { id: 'fn1-b-16', day: 'Thursday', startTime: '14:50', endTime: '15:40', courseCode: 'MA101', courseName: 'Mathematics-I', instructor: 'Dr. Lavudya Bhaskar', branch: 'Bio-Tech', degree: 'B.Tech', year: '1st Year', batch: 'Section B' },
    { id: 'fn1-b-17', day: 'Thursday', startTime: '15:40', endTime: '16:30', courseCode: 'BT101', courseName: 'Basic Bio-Science', instructor: 'Dr. Manishekhar Kumar / Dr. D. Vasanth', branch: 'Bio-Tech', degree: 'B.Tech', year: '1st Year', batch: 'Section B' },
    { id: 'fn1-b-18', day: 'Thursday', startTime: '16:30', endTime: '17:15', courseCode: 'CS101', courseName: 'Computer Programming', instructor: 'Dr. Shailendra Kumar Tripathi', branch: 'Bio-Tech', degree: 'B.Tech', year: '1st Year', batch: 'Section B' },
    { id: 'fn1-b-19', day: 'Thursday', startTime: '17:15', endTime: '18:00', courseCode: 'ENV101', courseName: 'Environment & Ecology', instructor: 'Dr. Sagarika Bhattachariya', branch: 'Bio-Tech', degree: 'B.Tech', year: '1st Year', batch: 'Section B' },

    { id: 'fn1-b-20', day: 'Friday', startTime: '12:20', endTime: '13:00', courseCode: 'CS102', courseName: 'Data Structure', instructor: 'Dr. Anita Murmu', branch: 'Bio-Tech', degree: 'B.Tech', year: '1st Year', batch: 'Section B' },
  ],
};

export const NITRR_ROOM_FN2: Room = {
  id: 'fn-2',
  code: 'FN-2',
  name: 'Lecture Hall FN-2 (North Wing)',
  block: 'Block A (Computing & AI)',
  blockShort: 'Block A',
  floor: 1,
  wing: 'North Wing',
  capacity: 100,
  type: 'Lecture Hall',
  amenities: { projector: true, ac: true, smartBoard: true, chargingSockets: 'Plenty', wifiSignal: 'Excellent', soundSystem: true },
  suitableForStudy: true,
  coordinates: { x: 190, y: 35, width: 140, height: 95 },
  schedule: [
    // Section L: Combined 1 (CSE, IT, Meta)
    { id: 'fn2-l-1', day: 'Monday', startTime: '09:50', endTime: '10:40', courseCode: 'CY101', courseName: 'Applied Chemistry', instructor: 'Dr. Bhanendra Sahu', branch: 'Combined', degree: 'B.Tech', year: '1st Year', batch: 'Section L' },
    { id: 'fn2-l-2', day: 'Monday', startTime: '10:40', endTime: '11:30', courseCode: 'VE101', courseName: 'Value Education', instructor: 'Dr. Heena Chawda', branch: 'Combined', degree: 'B.Tech', year: '1st Year', batch: 'Section L' },
    { id: 'fn2-l-3', day: 'Monday', startTime: '12:20', endTime: '13:00', courseCode: 'PH101', courseName: 'Physics-I', instructor: 'Dr. Adesh Singh', branch: 'Combined', degree: 'B.Tech', year: '1st Year', batch: 'Section L' },

    { id: 'fn2-l-4', day: 'Tuesday', startTime: '12:20', endTime: '13:00', courseCode: 'MA101', courseName: 'Mathematics-I', instructor: 'Dr. Lavudya Bhaskar', branch: 'Combined', degree: 'B.Tech', year: '1st Year', batch: 'Section L' },

    // WEDNESDAY Section L: NOTE - 2:00-2:50 slot MOVED TO 5:15-6:00 (17:15-18:00) per user instruction!
    { id: 'fn2-l-5', day: 'Wednesday', startTime: '14:50', endTime: '15:40', courseCode: 'CY101', courseName: 'Applied Chemistry', instructor: 'Dr. Bhanendra Sahu', branch: 'Combined', degree: 'B.Tech', year: '1st Year', batch: 'Section L' },
    { id: 'fn2-l-6', day: 'Wednesday', startTime: '15:40', endTime: '16:30', courseCode: 'HS101', courseName: 'Communication Skill', instructor: 'Dr. Sandip Sarkar / Dr. Jaya Dwivedi / Dr. Y. Vijaya Babu', branch: 'Combined', degree: 'B.Tech', year: '1st Year', batch: 'Section L' },
    { id: 'fn2-l-7', day: 'Wednesday', startTime: '16:30', endTime: '17:15', courseCode: 'MA101', courseName: 'Mathematics-I', instructor: 'Dr. Lavudya Bhaskar', branch: 'Combined', degree: 'B.Tech', year: '1st Year', batch: 'Section L' },
    { id: 'fn2-l-8', day: 'Wednesday', startTime: '17:15', endTime: '18:00', courseCode: 'PH101', courseName: 'Physics-I', instructor: 'Dr. Adesh Singh', branch: 'Combined', degree: 'B.Tech', year: '1st Year', batch: 'Section L (Rescheduled from 14:00)' },

    // THURSDAY Section L: NOTE - 2:00-2:50 slot MOVED TO 5:15-6:00 (17:15-18:00) per user instruction!
    { id: 'fn2-l-9', day: 'Thursday', startTime: '14:50', endTime: '15:40', courseCode: 'HS101', courseName: 'Communication Skill', instructor: 'Dr. Sandip Sarkar / Dr. Jaya Dwivedi / Dr. Y. Vijaya Babu', branch: 'Combined', degree: 'B.Tech', year: '1st Year', batch: 'Section L' },
    { id: 'fn2-l-10', day: 'Thursday', startTime: '15:40', endTime: '16:30', courseCode: 'MA101', courseName: 'Mathematics-I', instructor: 'Dr. Lavudya Bhaskar', branch: 'Combined', degree: 'B.Tech', year: '1st Year', batch: 'Section L' },
    { id: 'fn2-l-11', day: 'Thursday', startTime: '16:30', endTime: '17:15', courseCode: 'PH101', courseName: 'Physics-I', instructor: 'Dr. Adesh Singh', branch: 'Combined', degree: 'B.Tech', year: '1st Year', batch: 'Section L' },
    { id: 'fn2-l-12', day: 'Thursday', startTime: '17:15', endTime: '18:00', courseCode: 'CY101', courseName: 'Applied Chemistry', instructor: 'Dr. Bhanendra Sahu', branch: 'Combined', degree: 'B.Tech', year: '1st Year', batch: 'Section L (Rescheduled from 14:00)' },

    { id: 'fn2-l-13', day: 'Friday', startTime: '09:00', endTime: '09:50', courseCode: 'HS101', courseName: 'Communication Skill', instructor: 'Faculty Team', branch: 'Combined', degree: 'B.Tech', year: '1st Year', batch: 'Section L' },
    { id: 'fn2-l-14', day: 'Friday', startTime: '09:50', endTime: '10:40', courseCode: 'MA101', courseName: 'Mathematics-I', instructor: 'Dr. Lavudya Bhaskar', branch: 'Combined', degree: 'B.Tech', year: '1st Year', batch: 'Section L' },

    // Section M: Combined 2 (EE, ECE, Mech)
    { id: 'fn2-m-1', day: 'Monday', startTime: '14:50', endTime: '15:40', courseCode: 'CY101', courseName: 'Applied Chemistry', instructor: 'Dr. Randhir Rai', branch: 'Combined', degree: 'B.Tech', year: '1st Year', batch: 'Section M' },
    { id: 'fn2-m-2', day: 'Monday', startTime: '15:40', endTime: '16:30', courseCode: 'EE101', courseName: 'Basic Electrical Engg.', instructor: 'Dr. Sanjay Dewangan', branch: 'Combined', degree: 'B.Tech', year: '1st Year', batch: 'Section M' },

    { id: 'fn2-m-3', day: 'Tuesday', startTime: '09:00', endTime: '09:50', courseCode: 'PH101', courseName: 'Physics-I', instructor: 'Dr. Sayan Kumar Pal', branch: 'Combined', degree: 'B.Tech', year: '1st Year', batch: 'Section M' },
    { id: 'fn2-m-4', day: 'Tuesday', startTime: '09:50', endTime: '10:40', courseCode: 'CY101', courseName: 'Applied Chemistry', instructor: 'Dr. Randhir Rai', branch: 'Combined', degree: 'B.Tech', year: '1st Year', batch: 'Section M' },
    { id: 'fn2-m-5', day: 'Tuesday', startTime: '10:40', endTime: '11:30', courseCode: 'HS101', courseName: 'Communication Skill', instructor: 'Dr. S.K. Tarai / Dr. Y. Vijaya Babu / Dr. Anil Manjhi', branch: 'Combined', degree: 'B.Tech', year: '1st Year', batch: 'Section M' },
    { id: 'fn2-m-6', day: 'Tuesday', startTime: '11:30', endTime: '12:20', courseCode: 'MA101', courseName: 'Mathematics-I', instructor: 'Dr. Lavudya Bhaskar', branch: 'Combined', degree: 'B.Tech', year: '1st Year', batch: 'Section M' },

    { id: 'fn2-m-7', day: 'Wednesday', startTime: '09:00', endTime: '09:50', courseCode: 'PH101', courseName: 'Physics-I', instructor: 'Dr. Sayan Kumar Pal', branch: 'Combined', degree: 'B.Tech', year: '1st Year', batch: 'Section M' },
    { id: 'fn2-m-8', day: 'Wednesday', startTime: '09:50', endTime: '10:40', courseCode: 'HS101', courseName: 'Communication Skill', instructor: 'Faculty Team', branch: 'Combined', degree: 'B.Tech', year: '1st Year', batch: 'Section M' },
    { id: 'fn2-m-9', day: 'Wednesday', startTime: '10:40', endTime: '11:30', courseCode: 'CY101', courseName: 'Applied Chemistry', instructor: 'Dr. Randhir Rai', branch: 'Combined', degree: 'B.Tech', year: '1st Year', batch: 'Section M' },
    { id: 'fn2-m-10', day: 'Wednesday', startTime: '11:30', endTime: '12:20', courseCode: 'EE101', courseName: 'Basic Electrical Engg.', instructor: 'Dr. Sanjay Dewangan', branch: 'Combined', degree: 'B.Tech', year: '1st Year', batch: 'Section M' },
    { id: 'fn2-m-11', day: 'Wednesday', startTime: '12:20', endTime: '13:00', courseCode: 'MA101', courseName: 'Mathematics-I', instructor: 'Dr. Lavudya Bhaskar', branch: 'Combined', degree: 'B.Tech', year: '1st Year', batch: 'Section M' },

    { id: 'fn2-m-12', day: 'Thursday', startTime: '09:50', endTime: '10:40', courseCode: 'PH101', courseName: 'Physics-I', instructor: 'Dr. Sayan Kumar Pal', branch: 'Combined', degree: 'B.Tech', year: '1st Year', batch: 'Section M' },
    { id: 'fn2-m-13', day: 'Thursday', startTime: '10:40', endTime: '11:30', courseCode: 'MA101', courseName: 'Mathematics-I', instructor: 'Dr. Lavudya Bhaskar', branch: 'Combined', degree: 'B.Tech', year: '1st Year', batch: 'Section M' },
    { id: 'fn2-m-14', day: 'Thursday', startTime: '11:30', endTime: '12:20', courseCode: 'VE101', courseName: 'Value Education', instructor: 'Dr. Heena Chawda', branch: 'Combined', degree: 'B.Tech', year: '1st Year', batch: 'Section M' },

    { id: 'fn2-m-15', day: 'Friday', startTime: '14:00', endTime: '14:50', courseCode: 'MA101', courseName: 'Mathematics-I', instructor: 'Dr. Lavudya Bhaskar', branch: 'Combined', degree: 'B.Tech', year: '1st Year', batch: 'Section M' },
    { id: 'fn2-m-16', day: 'Friday', startTime: '14:50', endTime: '15:40', courseCode: 'EE101', courseName: 'Basic Electrical Engg.', instructor: 'Dr. Sanjay Dewangan', branch: 'Combined', degree: 'B.Tech', year: '1st Year', batch: 'Section M' },
    { id: 'fn2-m-17', day: 'Friday', startTime: '15:40', endTime: '16:30', courseCode: 'HS101', courseName: 'Communication Skill', instructor: 'Faculty Team', branch: 'Combined', degree: 'B.Tech', year: '1st Year', batch: 'Section M' },
  ],
};

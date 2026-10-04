import { Room } from './campusData.ts';

export const NITRR_ROOM_SN2: Room = {
  id: 'sn-2',
  code: 'SN-2',
  name: 'Lecture Hall SN-2 (Second Floor)',
  block: 'Block B (Circuits & Core)',
  blockShort: 'Block B',
  floor: 2,
  wing: 'North Wing',
  capacity: 90,
  type: 'Lecture Hall',
  amenities: { projector: true, ac: true, smartBoard: true, chargingSockets: 'Plenty', wifiSignal: 'Excellent', soundSystem: true },
  suitableForStudy: true,
  coordinates: { x: 30, y: 35, width: 140, height: 95 },
  schedule: [
    // Section I: Information Technology
    { id: 'sn2-i-1', day: 'Monday', startTime: '09:50', endTime: '10:40', courseCode: 'PH101', courseName: 'Physics-I', instructor: 'Dr. Raju Chetty', branch: 'IT', degree: 'B.Tech', year: '1st Year', batch: 'Section I' },
    { id: 'sn2-i-2', day: 'Monday', startTime: '10:40', endTime: '11:30', courseCode: 'HS101', courseName: 'Communication Skill', instructor: 'Dr. Anoop Kumar Tiwari & Dr. Shashikanta Tarai', branch: 'IT', degree: 'B.Tech', year: '1st Year', batch: 'Section I' },
    { id: 'sn2-i-3', day: 'Monday', startTime: '11:30', endTime: '12:20', courseCode: 'MA101', courseName: 'Mathematics-I', instructor: 'Dr. Nabin Kumar Meher', branch: 'IT', degree: 'B.Tech', year: '1st Year', batch: 'Section I' },
    { id: 'sn2-i-4', day: 'Monday', startTime: '12:20', endTime: '13:00', courseCode: 'CY101', courseName: 'Applied Chemistry', instructor: 'Dr. Shivani Arora', branch: 'IT', degree: 'B.Tech', year: '1st Year', batch: 'Section I' },

    { id: 'sn2-i-5', day: 'Tuesday', startTime: '14:00', endTime: '15:40', courseCode: 'VE101', courseName: 'Value Education Lab', instructor: 'Dr. Heena Chawda', branch: 'IT', degree: 'B.Tech', year: '1st Year', batch: 'Section I' },

    { id: 'sn2-i-6', day: 'Wednesday', startTime: '10:40', endTime: '11:30', courseCode: 'MA101', courseName: 'Mathematics-I', instructor: 'Dr. Nabin Kumar Meher', branch: 'IT', degree: 'B.Tech', year: '1st Year', batch: 'Section I' },
    { id: 'sn2-i-7', day: 'Wednesday', startTime: '11:30', endTime: '12:20', courseCode: 'PH101', courseName: 'Physics-I', instructor: 'Dr. Raju Chetty', branch: 'IT', degree: 'B.Tech', year: '1st Year', batch: 'Section I' },
    { id: 'sn2-i-8', day: 'Wednesday', startTime: '12:20', endTime: '13:00', courseCode: 'HS101', courseName: 'Communication Skill', instructor: 'Dr. Anoop Kumar Tiwari & Dr. Shashikanta Tarai', branch: 'IT', degree: 'B.Tech', year: '1st Year', batch: 'Section I' },

    { id: 'sn2-i-9', day: 'Thursday', startTime: '10:40', endTime: '11:30', courseCode: 'MA101', courseName: 'Mathematics-I', instructor: 'Dr. Nabin Kumar Meher', branch: 'IT', degree: 'B.Tech', year: '1st Year', batch: 'Section I' },
    { id: 'sn2-i-10', day: 'Thursday', startTime: '11:30', endTime: '12:20', courseCode: 'PH101', courseName: 'Physics-I', instructor: 'Dr. Raju Chetty', branch: 'IT', degree: 'B.Tech', year: '1st Year', batch: 'Section I' },
    { id: 'sn2-i-11', day: 'Thursday', startTime: '12:20', endTime: '13:00', courseCode: 'CY101', courseName: 'Applied Chemistry', instructor: 'Dr. Shivani Arora', branch: 'IT', degree: 'B.Tech', year: '1st Year', batch: 'Section I' },

    { id: 'sn2-i-12', day: 'Friday', startTime: '09:00', endTime: '09:50', courseCode: 'MA101', courseName: 'Mathematics-I', instructor: 'Dr. Nabin Kumar Meher', branch: 'IT', degree: 'B.Tech', year: '1st Year', batch: 'Section I' },
    { id: 'sn2-i-13', day: 'Friday', startTime: '09:50', endTime: '10:40', courseCode: 'HS101', courseName: 'Communication Skill', instructor: 'Dr. Anoop Kumar Tiwari & Dr. Shashikanta Tarai', branch: 'IT', degree: 'B.Tech', year: '1st Year', batch: 'Section I' },
    { id: 'sn2-i-14', day: 'Friday', startTime: '10:40', endTime: '11:30', courseCode: 'CY101', courseName: 'Applied Chemistry', instructor: 'Dr. Shivani Arora', branch: 'IT', degree: 'B.Tech', year: '1st Year', batch: 'Section I' },

    // Section K: Metallurgy (shared in SN-2)
    { id: 'sn2-k-1', day: 'Monday', startTime: '14:00', endTime: '14:50', courseCode: 'MA101', courseName: 'Mathematics-I', instructor: 'Ms. Nikita Gharami', branch: 'Metallurgy', degree: 'B.Tech', year: '1st Year', batch: 'Section K' },
    { id: 'sn2-k-2', day: 'Monday', startTime: '14:50', endTime: '15:40', courseCode: 'HS101', courseName: 'Communication Skill', instructor: 'Dr. Anil Manjhi / Dr. S.K. Tarai', branch: 'Metallurgy', degree: 'B.Tech', year: '1st Year', batch: 'Section K' },
    { id: 'sn2-k-3', day: 'Monday', startTime: '15:40', endTime: '16:30', courseCode: 'PH101', courseName: 'Physics-I', instructor: 'Dr. Papia Panda', branch: 'Metallurgy', degree: 'B.Tech', year: '1st Year', batch: 'Section K' },

    { id: 'sn2-k-4', day: 'Tuesday', startTime: '09:00', endTime: '09:50', courseCode: 'MA101', courseName: 'Mathematics-I', instructor: 'Ms. Nikita Gharami', branch: 'Metallurgy', degree: 'B.Tech', year: '1st Year', batch: 'Section K' },
    { id: 'sn2-k-5', day: 'Tuesday', startTime: '09:50', endTime: '10:40', courseCode: 'PH101', courseName: 'Physics-I', instructor: 'Dr. Papia Panda', branch: 'Metallurgy', degree: 'B.Tech', year: '1st Year', batch: 'Section K' },
    { id: 'sn2-k-6', day: 'Tuesday', startTime: '10:40', endTime: '11:30', courseCode: 'HS101', courseName: 'Communication Skill', instructor: 'Faculty Team', branch: 'Metallurgy', degree: 'B.Tech', year: '1st Year', batch: 'Section K' },
    { id: 'sn2-k-7', day: 'Tuesday', startTime: '11:30', endTime: '12:20', courseCode: 'CY101', courseName: 'Applied Chemistry', instructor: 'Dr. Anil A.', branch: 'Metallurgy', degree: 'B.Tech', year: '1st Year', batch: 'Section K' },

    { id: 'sn2-k-8', day: 'Friday', startTime: '11:30', endTime: '12:20', courseCode: 'CY101', courseName: 'Applied Chemistry', instructor: 'Dr. Anil A.', branch: 'Metallurgy', degree: 'B.Tech', year: '1st Year', batch: 'Section K' },
    { id: 'sn2-k-9', day: 'Friday', startTime: '12:20', endTime: '13:00', courseCode: 'MA101', courseName: 'Mathematics-I', instructor: 'Ms. Nikita Gharami', branch: 'Metallurgy', degree: 'B.Tech', year: '1st Year', batch: 'Section K' },
  ],
};

export const NITRR_ROOM_SN3: Room = {
  id: 'sn-3',
  code: 'SN-3',
  name: 'Lecture Hall SN-3 (Second Floor)',
  block: 'Block B (Circuits & Core)',
  blockShort: 'Block B',
  floor: 2,
  wing: 'North Wing',
  capacity: 95,
  type: 'Lecture Hall',
  amenities: { projector: true, ac: true, smartBoard: true, chargingSockets: 'Plenty', wifiSignal: 'Excellent', soundSystem: true },
  suitableForStudy: true,
  coordinates: { x: 190, y: 35, width: 140, height: 95 },
  schedule: [
    // Section G: Electrical Engg
    { id: 'sn3-g-1', day: 'Monday', startTime: '10:40', endTime: '11:30', courseCode: 'MA101', courseName: 'Mathematics-I', instructor: 'Dr. Nabin Kumar Meher', branch: 'EEE', degree: 'B.Tech', year: '1st Year', batch: 'Section G' },
    { id: 'sn3-g-2', day: 'Monday', startTime: '11:30', endTime: '12:20', courseCode: 'PH101', courseName: 'Physics-I', instructor: 'Dr. Devendra Kumar Golhani', branch: 'EEE', degree: 'B.Tech', year: '1st Year', batch: 'Section G' },
    { id: 'sn3-g-3', day: 'Monday', startTime: '12:20', endTime: '13:00', courseCode: 'CY101', courseName: 'Applied Chemistry', instructor: 'Dr. K. A. Siddiqui', branch: 'EEE', degree: 'B.Tech', year: '1st Year', batch: 'Section G' },

    { id: 'sn3-g-4', day: 'Tuesday', startTime: '14:00', endTime: '14:50', courseCode: 'HS101', courseName: 'Communication Skill', instructor: 'Dr. Y. Vijaya Babu', branch: 'EEE', degree: 'B.Tech', year: '1st Year', batch: 'Section G' },
    { id: 'sn3-g-5', day: 'Tuesday', startTime: '14:50', endTime: '15:40', courseCode: 'EE101', courseName: 'Basic Electrical Engg.', instructor: 'Dr. Swapnajit Pattnaik', branch: 'EEE', degree: 'B.Tech', year: '1st Year', batch: 'Section G' },
    { id: 'sn3-g-6', day: 'Tuesday', startTime: '15:40', endTime: '16:30', courseCode: 'MA101', courseName: 'Mathematics-I', instructor: 'Dr. Nabin Kumar Meher', branch: 'EEE', degree: 'B.Tech', year: '1st Year', batch: 'Section G' },
    { id: 'sn3-g-7', day: 'Tuesday', startTime: '16:30', endTime: '17:15', courseCode: 'CY101', courseName: 'Applied Chemistry', instructor: 'Dr. K. A. Siddiqui', branch: 'EEE', degree: 'B.Tech', year: '1st Year', batch: 'Section G' },

    { id: 'sn3-g-8', day: 'Wednesday', startTime: '09:50', endTime: '10:40', courseCode: 'HS101', courseName: 'Communication Skill', instructor: 'Dr. Y. Vijaya Babu', branch: 'EEE', degree: 'B.Tech', year: '1st Year', batch: 'Section G' },
    { id: 'sn3-g-9', day: 'Wednesday', startTime: '10:40', endTime: '11:30', courseCode: 'MA101', courseName: 'Mathematics-I', instructor: 'Dr. Nabin Kumar Meher', branch: 'EEE', degree: 'B.Tech', year: '1st Year', batch: 'Section G' },
    { id: 'sn3-g-10', day: 'Wednesday', startTime: '11:30', endTime: '12:20', courseCode: 'EE101', courseName: 'Basic Electrical Engg.', instructor: 'Dr. Swapnajit Pattnaik', branch: 'EEE', degree: 'B.Tech', year: '1st Year', batch: 'Section G' },
    { id: 'sn3-g-11', day: 'Wednesday', startTime: '12:20', endTime: '13:00', courseCode: 'PH101', courseName: 'Physics-I', instructor: 'Dr. Devendra Kumar Golhani', branch: 'EEE', degree: 'B.Tech', year: '1st Year', batch: 'Section G' },

    { id: 'sn3-g-12', day: 'Friday', startTime: '09:00', endTime: '09:50', courseCode: 'EE101', courseName: 'Basic Electrical Engg.', instructor: 'Dr. Swapnajit Pattnaik', branch: 'EEE', degree: 'B.Tech', year: '1st Year', batch: 'Section G' },
    { id: 'sn3-g-13', day: 'Friday', startTime: '09:50', endTime: '10:40', courseCode: 'HS101', courseName: 'Communication Skill', instructor: 'Dr. Y. Vijaya Babu', branch: 'EEE', degree: 'B.Tech', year: '1st Year', batch: 'Section G' },
    { id: 'sn3-g-14', day: 'Friday', startTime: '10:40', endTime: '11:30', courseCode: 'CY101', courseName: 'Applied Chemistry', instructor: 'Dr. K. A. Siddiqui', branch: 'EEE', degree: 'B.Tech', year: '1st Year', batch: 'Section G' },
    { id: 'sn3-g-15', day: 'Friday', startTime: '11:30', endTime: '12:20', courseCode: 'MA101', courseName: 'Mathematics-I', instructor: 'Dr. Nabin Kumar Meher', branch: 'EEE', degree: 'B.Tech', year: '1st Year', batch: 'Section G' },
    { id: 'sn3-g-16', day: 'Friday', startTime: '12:20', endTime: '13:00', courseCode: 'PH101', courseName: 'Physics-I', instructor: 'Dr. Devendra Kumar Golhani', branch: 'EEE', degree: 'B.Tech', year: '1st Year', batch: 'Section G' },
    { id: 'sn3-g-17', day: 'Friday', startTime: '14:00', endTime: '15:40', courseCode: 'VE101', courseName: 'Value Education Lab', instructor: 'Dr. Heena Chawda', branch: 'EEE', degree: 'B.Tech', year: '1st Year', batch: 'Section G' },

    // Section J: Mechanical Engg
    { id: 'sn3-j-1', day: 'Monday', startTime: '14:00', endTime: '14:50', courseCode: 'HS101', courseName: 'Communication Skill', instructor: 'Dr. Anil Manjhi', branch: 'MECH', degree: 'B.Tech', year: '1st Year', batch: 'Section J' },
    { id: 'sn3-j-2', day: 'Monday', startTime: '14:50', endTime: '15:40', courseCode: 'MA101', courseName: 'Mathematics-I', instructor: 'Dr. Shivani Chourasiya', branch: 'MECH', degree: 'B.Tech', year: '1st Year', batch: 'Section J' },
    { id: 'sn3-j-3', day: 'Monday', startTime: '15:40', endTime: '16:30', courseCode: 'PH101', courseName: 'Physics-I', instructor: 'Dr. Kishor Kumar Sahoo', branch: 'MECH', degree: 'B.Tech', year: '1st Year', batch: 'Section J' },
    { id: 'sn3-j-4', day: 'Monday', startTime: '16:30', endTime: '17:15', courseCode: 'CY101', courseName: 'Applied Chemistry', instructor: 'Dr. Alekha Kumar Sutar', branch: 'MECH', degree: 'B.Tech', year: '1st Year', batch: 'Section J' },
    { id: 'sn3-j-5', day: 'Monday', startTime: '17:15', endTime: '18:00', courseCode: 'EE101', courseName: 'Basic Electrical Engg.', instructor: 'Dr. Surajit Sannigrahi', branch: 'MECH', degree: 'B.Tech', year: '1st Year', batch: 'Section J' },

    { id: 'sn3-j-6', day: 'Tuesday', startTime: '09:00', endTime: '09:50', courseCode: 'HS101', courseName: 'Communication Skill', instructor: 'Dr. Anil Manjhi', branch: 'MECH', degree: 'B.Tech', year: '1st Year', batch: 'Section J' },
    { id: 'sn3-j-7', day: 'Tuesday', startTime: '09:50', endTime: '10:40', courseCode: 'EE101', courseName: 'Basic Electrical Engg.', instructor: 'Dr. Surajit Sannigrahi', branch: 'MECH', degree: 'B.Tech', year: '1st Year', batch: 'Section J' },
    { id: 'sn3-j-8', day: 'Tuesday', startTime: '10:40', endTime: '11:30', courseCode: 'PH101', courseName: 'Physics-I', instructor: 'Dr. Kishor Kumar Sahoo', branch: 'MECH', degree: 'B.Tech', year: '1st Year', batch: 'Section J' },
    { id: 'sn3-j-9', day: 'Tuesday', startTime: '11:30', endTime: '12:20', courseCode: 'CY101', courseName: 'Applied Chemistry', instructor: 'Dr. Alekha Kumar Sutar', branch: 'MECH', degree: 'B.Tech', year: '1st Year', batch: 'Section J' },
    { id: 'sn3-j-10', day: 'Tuesday', startTime: '12:20', endTime: '13:00', courseCode: 'MA101', courseName: 'Mathematics-I', instructor: 'Dr. Shivani Chourasiya', branch: 'MECH', degree: 'B.Tech', year: '1st Year', batch: 'Section J' },

    { id: 'sn3-j-11', day: 'Wednesday', startTime: '14:00', endTime: '14:50', courseCode: 'HS101', courseName: 'Communication Skill', instructor: 'Dr. Anil Manjhi', branch: 'MECH', degree: 'B.Tech', year: '1st Year', batch: 'Section J' },
    { id: 'sn3-j-12', day: 'Wednesday', startTime: '14:50', endTime: '15:40', courseCode: 'MA101', courseName: 'Mathematics-I', instructor: 'Dr. Shivani Chourasiya', branch: 'MECH', degree: 'B.Tech', year: '1st Year', batch: 'Section J' },
    { id: 'sn3-j-13', day: 'Wednesday', startTime: '15:40', endTime: '16:30', courseCode: 'CY101', courseName: 'Applied Chemistry', instructor: 'Dr. Alekha Kumar Sutar', branch: 'MECH', degree: 'B.Tech', year: '1st Year', batch: 'Section J' },
    { id: 'sn3-j-14', day: 'Wednesday', startTime: '16:30', endTime: '17:15', courseCode: 'VE101', courseName: 'Value Education Lab', instructor: 'Dr. Heena Chawda', branch: 'MECH', degree: 'B.Tech', year: '1st Year', batch: 'Section J' },

    { id: 'sn3-j-15', day: 'Thursday', startTime: '10:40', endTime: '11:30', courseCode: 'EE101', courseName: 'Basic Electrical Engg.', instructor: 'Dr. Surajit Sannigrahi', branch: 'MECH', degree: 'B.Tech', year: '1st Year', batch: 'Section J' },
    { id: 'sn3-j-16', day: 'Thursday', startTime: '11:30', endTime: '12:20', courseCode: 'PH101', courseName: 'Physics-I', instructor: 'Dr. Kishor Kumar Sahoo', branch: 'MECH', degree: 'B.Tech', year: '1st Year', batch: 'Section J' },
    { id: 'sn3-j-17', day: 'Thursday', startTime: '12:20', endTime: '13:00', courseCode: 'MA101', courseName: 'Mathematics-I', instructor: 'Dr. Shivani Chourasiya', branch: 'MECH', degree: 'B.Tech', year: '1st Year', batch: 'Section J' },
  ],
};

export const NITRR_ROOM_SN4: Room = {
  id: 'sn-4',
  code: 'SN-4',
  name: 'Lecture Hall SN-4 (Second Floor)',
  block: 'Block B (Circuits & Core)',
  blockShort: 'Block B',
  floor: 2,
  wing: 'North Wing',
  capacity: 95,
  type: 'Lecture Hall',
  amenities: { projector: true, ac: true, smartBoard: true, chargingSockets: 'Plenty', wifiSignal: 'Excellent', soundSystem: true },
  suitableForStudy: true,
  coordinates: { x: 350, y: 35, width: 140, height: 95 },
  schedule: [
    // Section H: Electronics & Communication Engg
    { id: 'sn4-h-1', day: 'Monday', startTime: '09:00', endTime: '09:50', courseCode: 'EE101', courseName: 'Basic Electrical Engg.', instructor: 'Dr. Chilaka Ranga', branch: 'ECE', degree: 'B.Tech', year: '1st Year', batch: 'Section H' },
    { id: 'sn4-h-2', day: 'Monday', startTime: '09:50', endTime: '10:40', courseCode: 'MA101', courseName: 'Mathematics-I', instructor: 'Ms. Akanksha Agrawal', branch: 'ECE', degree: 'B.Tech', year: '1st Year', batch: 'Section H' },
    { id: 'sn4-h-3', day: 'Monday', startTime: '10:40', endTime: '11:30', courseCode: 'PH101', courseName: 'Physics-I', instructor: 'Dr. Kiran Sharma', branch: 'ECE', degree: 'B.Tech', year: '1st Year', batch: 'Section H' },
    { id: 'sn4-h-4', day: 'Monday', startTime: '11:30', endTime: '12:20', courseCode: 'HS101', courseName: 'Communication Skill', instructor: 'Dr. Sandip Sarkar', branch: 'ECE', degree: 'B.Tech', year: '1st Year', batch: 'Section H' },

    { id: 'sn4-h-5', day: 'Tuesday', startTime: '10:40', endTime: '11:30', courseCode: 'CY101', courseName: 'Applied Chemistry', instructor: 'Dr. Atanu Ghosh', branch: 'ECE', degree: 'B.Tech', year: '1st Year', batch: 'Section H' },
    { id: 'sn4-h-6', day: 'Tuesday', startTime: '11:30', endTime: '12:20', courseCode: 'MA101', courseName: 'Mathematics-I', instructor: 'Ms. Akanksha Agrawal', branch: 'ECE', degree: 'B.Tech', year: '1st Year', batch: 'Section H' },
    { id: 'sn4-h-7', day: 'Tuesday', startTime: '12:20', endTime: '13:00', courseCode: 'PH101', courseName: 'Physics-I', instructor: 'Dr. Kiran Sharma', branch: 'ECE', degree: 'B.Tech', year: '1st Year', batch: 'Section H' },

    { id: 'sn4-h-8', day: 'Thursday', startTime: '09:00', endTime: '09:50', courseCode: 'HS101', courseName: 'Communication Skill', instructor: 'Dr. Sandip Sarkar', branch: 'ECE', degree: 'B.Tech', year: '1st Year', batch: 'Section H' },
    { id: 'sn4-h-9', day: 'Thursday', startTime: '09:50', endTime: '10:40', courseCode: 'EE101', courseName: 'Basic Electrical Engg.', instructor: 'Dr. Chilaka Ranga', branch: 'ECE', degree: 'B.Tech', year: '1st Year', batch: 'Section H' },
    { id: 'sn4-h-10', day: 'Thursday', startTime: '10:40', endTime: '11:30', courseCode: 'MA101', courseName: 'Mathematics-I', instructor: 'Ms. Akanksha Agrawal', branch: 'ECE', degree: 'B.Tech', year: '1st Year', batch: 'Section H' },
    { id: 'sn4-h-11', day: 'Thursday', startTime: '11:30', endTime: '12:20', courseCode: 'CY101', courseName: 'Applied Chemistry', instructor: 'Dr. Atanu Ghosh', branch: 'ECE', degree: 'B.Tech', year: '1st Year', batch: 'Section H' },
    { id: 'sn4-h-12', day: 'Thursday', startTime: '12:20', endTime: '13:00', courseCode: 'PH101', courseName: 'Physics-I', instructor: 'Dr. Kiran Sharma', branch: 'ECE', degree: 'B.Tech', year: '1st Year', batch: 'Section H' },
    { id: 'sn4-h-13', day: 'Thursday', startTime: '14:00', endTime: '15:40', courseCode: 'VE101', courseName: 'Value Education Lab', instructor: 'Dr. Heena Chawda', branch: 'ECE', degree: 'B.Tech', year: '1st Year', batch: 'Section H' },

    { id: 'sn4-h-14', day: 'Friday', startTime: '09:50', endTime: '10:40', courseCode: 'MA101', courseName: 'Mathematics-I', instructor: 'Ms. Akanksha Agrawal', branch: 'ECE', degree: 'B.Tech', year: '1st Year', batch: 'Section H' },
    { id: 'sn4-h-15', day: 'Friday', startTime: '10:40', endTime: '11:30', courseCode: 'CY101', courseName: 'Applied Chemistry', instructor: 'Dr. Atanu Ghosh', branch: 'ECE', degree: 'B.Tech', year: '1st Year', batch: 'Section H' },
    { id: 'sn4-h-16', day: 'Friday', startTime: '11:30', endTime: '12:20', courseCode: 'HS101', courseName: 'Communication Skill', instructor: 'Dr. Sandip Sarkar', branch: 'ECE', degree: 'B.Tech', year: '1st Year', batch: 'Section H' },
    { id: 'sn4-h-17', day: 'Friday', startTime: '12:20', endTime: '13:00', courseCode: 'EE101', courseName: 'Basic Electrical Engg.', instructor: 'Dr. Chilaka Ranga', branch: 'ECE', degree: 'B.Tech', year: '1st Year', batch: 'Section H' },

    // Section K: Metallurgy (Wednesday in SN-4)
    { id: 'sn4-k-1', day: 'Wednesday', startTime: '09:00', endTime: '09:50', courseCode: 'MA101', courseName: 'Mathematics-I', instructor: 'Ms. Nikita Gharami', branch: 'Metallurgy', degree: 'B.Tech', year: '1st Year', batch: 'Section K' },
    { id: 'sn4-k-2', day: 'Wednesday', startTime: '09:50', endTime: '10:40', courseCode: 'CY101', courseName: 'Applied Chemistry', instructor: 'Dr. Anil A.', branch: 'Metallurgy', degree: 'B.Tech', year: '1st Year', batch: 'Section K' },
    { id: 'sn4-k-3', day: 'Wednesday', startTime: '10:40', endTime: '11:30', courseCode: 'HS101', courseName: 'Communication Skill', instructor: 'Faculty Team', branch: 'Metallurgy', degree: 'B.Tech', year: '1st Year', batch: 'Section K' },
    { id: 'sn4-k-4', day: 'Wednesday', startTime: '11:30', endTime: '12:20', courseCode: 'PH101', courseName: 'Physics-I', instructor: 'Dr. Papia Panda', branch: 'Metallurgy', degree: 'B.Tech', year: '1st Year', batch: 'Section K' },
    { id: 'sn4-k-5', day: 'Wednesday', startTime: '12:20', endTime: '13:00', courseCode: 'VE101', courseName: 'Value Education', instructor: 'Dr. Heena Chawda', branch: 'Metallurgy', degree: 'B.Tech', year: '1st Year', batch: 'Section K' },
  ],
};

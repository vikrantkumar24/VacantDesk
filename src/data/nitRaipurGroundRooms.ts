import { Room, RoomScheduleItem } from './campusData.ts';

// NIT Raipur Ground Floor Rooms (G-XX codes)
// G-01: Electrical Engg & Instrumentation (Sem 3 & 5)
// G-02: Civil & Structural Engg (Sem 3 & 5)
// G-11: Mechanical Design & Thermal Engg (Sem 3 & 5)
// G-12: Electronics & Communication ECE (Sem 3 & 5)
// G-31: Chemical & Process Engg (Sem 3 & 5)

export const NITRR_ROOM_G01: Room = {
  id: 'g-01',
  code: 'G-01',
  name: 'Electrical Engineering Hall G-01',
  block: 'Block B (Circuits & Core)',
  blockShort: 'Block B',
  floor: 0,
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
  coordinates: { x: 30, y: 35, width: 110, height: 90 },
  schedule: [
    // Monday
    { id: 'g01-ee3-m1', day: 'Monday', startTime: '09:00', endTime: '09:50', courseCode: 'EE201', courseName: 'Network Theory', instructor: 'Dr. Ebha Koley', branch: 'EEE', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 'g01-ee3-m2', day: 'Monday', startTime: '09:50', endTime: '10:40', courseCode: 'EE202', courseName: 'Electrical Machines-I', instructor: 'Dr. S. Ghosh', branch: 'EEE', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 'g01-ee3-m3', day: 'Monday', startTime: '10:40', endTime: '11:30', courseCode: 'EE203', courseName: 'Electromagnetic Fields', instructor: 'Dr. B. Bag', branch: 'EEE', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 'g01-ee5-m4', day: 'Monday', startTime: '11:30', endTime: '12:20', courseCode: 'EE301', courseName: 'Power Systems-I', instructor: 'Dr. N. D. Londhe', branch: 'EEE', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'g01-ee5-m5', day: 'Monday', startTime: '12:20', endTime: '13:10', courseCode: 'EE302', courseName: 'Control Systems', instructor: 'Dr. Varun Sharma', branch: 'EEE', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'g01-ee5-m6', day: 'Monday', startTime: '14:10', endTime: '15:00', courseCode: 'EE303', courseName: 'Power Electronics', instructor: 'Dr. S. Pattnaik', branch: 'EEE', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },

    // Tuesday
    { id: 'g01-ee3-t1', day: 'Tuesday', startTime: '09:00', endTime: '09:50', courseCode: 'EE204', courseName: 'Analog Electronics', instructor: 'Dr. Anamika Yadav', branch: 'EEE', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 'g01-ee3-t2', day: 'Tuesday', startTime: '09:50', endTime: '10:40', courseCode: 'EE201', courseName: 'Network Theory', instructor: 'Dr. Ebha Koley', branch: 'EEE', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 'g01-ee5-t3', day: 'Tuesday', startTime: '10:40', endTime: '11:30', courseCode: 'EE301', courseName: 'Power Systems-I', instructor: 'Dr. N. D. Londhe', branch: 'EEE', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'g01-ee5-t4', day: 'Tuesday', startTime: '11:30', endTime: '12:20', courseCode: 'EE304', courseName: 'Microprocessors & Interfacing', instructor: 'Dr. Monalisa Biswal', branch: 'EEE', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'g01-ee5-t5', day: 'Tuesday', startTime: '14:10', endTime: '15:50', courseCode: 'EE302', courseName: 'Control Systems Tutorial', instructor: 'Dr. Varun Sharma', branch: 'EEE', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },

    // Wednesday
    { id: 'g01-ee3-w1', day: 'Wednesday', startTime: '09:00', endTime: '09:50', courseCode: 'EE202', courseName: 'Electrical Machines-I', instructor: 'Dr. S. Ghosh', branch: 'EEE', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 'g01-ee3-w2', day: 'Wednesday', startTime: '09:50', endTime: '10:40', courseCode: 'EE204', courseName: 'Analog Electronics', instructor: 'Dr. Anamika Yadav', branch: 'EEE', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 'g01-ee5-w3', day: 'Wednesday', startTime: '11:30', endTime: '12:20', courseCode: 'EE303', courseName: 'Power Electronics', instructor: 'Dr. S. Pattnaik', branch: 'EEE', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'g01-ee5-w4', day: 'Wednesday', startTime: '12:20', endTime: '13:10', courseCode: 'EE304', courseName: 'Microprocessors & Interfacing', instructor: 'Dr. Monalisa Biswal', branch: 'EEE', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },

    // Thursday
    { id: 'g01-ee3-th1', day: 'Thursday', startTime: '09:50', endTime: '10:40', courseCode: 'EE203', courseName: 'Electromagnetic Fields', instructor: 'Dr. B. Bag', branch: 'EEE', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 'g01-ee3-th2', day: 'Thursday', startTime: '10:40', endTime: '11:30', courseCode: 'EE201', courseName: 'Network Theory', instructor: 'Dr. Ebha Koley', branch: 'EEE', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 'g01-ee5-th3', day: 'Thursday', startTime: '11:30', endTime: '12:20', courseCode: 'EE301', courseName: 'Power Systems-I', instructor: 'Dr. N. D. Londhe', branch: 'EEE', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'g01-ee5-th4', day: 'Thursday', startTime: '14:10', endTime: '15:00', courseCode: 'EE303', courseName: 'Power Electronics', instructor: 'Dr. S. Pattnaik', branch: 'EEE', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },

    // Friday
    { id: 'g01-ee3-f1', day: 'Friday', startTime: '09:00', endTime: '09:50', courseCode: 'EE202', courseName: 'Electrical Machines-I', instructor: 'Dr. S. Ghosh', branch: 'EEE', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 'g01-ee3-f2', day: 'Friday', startTime: '09:50', endTime: '10:40', courseCode: 'EE204', courseName: 'Analog Electronics', instructor: 'Dr. Anamika Yadav', branch: 'EEE', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 'g01-ee5-f3', day: 'Friday', startTime: '10:40', endTime: '11:30', courseCode: 'EE302', courseName: 'Control Systems', instructor: 'Dr. Varun Sharma', branch: 'EEE', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'g01-ee5-f4', day: 'Friday', startTime: '11:30', endTime: '12:20', courseCode: 'EE304', courseName: 'Microprocessors', instructor: 'Dr. Monalisa Biswal', branch: 'EEE', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
  ],
};

export const NITRR_ROOM_G02: Room = {
  id: 'g-02',
  code: 'G-02',
  name: 'Civil Engineering Hall G-02',
  block: 'Block B (Circuits & Core)',
  blockShort: 'Block B',
  floor: 0,
  wing: 'North Wing',
  capacity: 85,
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
  coordinates: { x: 150, y: 35, width: 110, height: 90 },
  schedule: [
    // Monday
    { id: 'g02-ce3-m1', day: 'Monday', startTime: '09:00', endTime: '09:50', courseCode: 'CE201', courseName: 'Fluid Mechanics', instructor: 'Dr. M. K. Verma', branch: 'CIVIL', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 'g02-ce3-m2', day: 'Monday', startTime: '09:50', endTime: '10:40', courseCode: 'CE202', courseName: 'Surveying-I', instructor: 'Dr. S. Bajpai', branch: 'CIVIL', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 'g02-ce3-m3', day: 'Monday', startTime: '10:40', endTime: '11:30', courseCode: 'CE203', courseName: 'Mechanics of Solids', instructor: 'Dr. G. D. Ramtekkar', branch: 'CIVIL', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 'g02-ce5-m4', day: 'Monday', startTime: '11:30', endTime: '12:20', courseCode: 'CE301', courseName: 'Structural Analysis-II', instructor: 'Dr. U. K. Dewangan', branch: 'CIVIL', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'g02-ce5-m5', day: 'Monday', startTime: '12:20', endTime: '13:10', courseCode: 'CE302', courseName: 'Design of Concrete Structures', instructor: 'Dr. R. K. Tripathi', branch: 'CIVIL', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },

    // Tuesday
    { id: 'g02-ce3-t1', day: 'Tuesday', startTime: '09:00', endTime: '09:50', courseCode: 'CE204', courseName: 'Building Materials & Const.', instructor: 'Dr. A. K. Sahu', branch: 'CIVIL', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 'g02-ce3-t2', day: 'Tuesday', startTime: '09:50', endTime: '10:40', courseCode: 'CE201', courseName: 'Fluid Mechanics', instructor: 'Dr. M. K. Verma', branch: 'CIVIL', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 'g02-ce5-t3', day: 'Tuesday', startTime: '10:40', endTime: '11:30', courseCode: 'CE303', courseName: 'Geotechnical Engg-I', instructor: 'Dr. L. K. Yadu', branch: 'CIVIL', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'g02-ce5-t4', day: 'Tuesday', startTime: '11:30', endTime: '12:20', courseCode: 'CE301', courseName: 'Structural Analysis-II', instructor: 'Dr. U. K. Dewangan', branch: 'CIVIL', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },

    // Wednesday
    { id: 'g02-ce3-w1', day: 'Wednesday', startTime: '09:00', endTime: '09:50', courseCode: 'CE203', courseName: 'Mechanics of Solids', instructor: 'Dr. G. D. Ramtekkar', branch: 'CIVIL', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 'g02-ce3-w2', day: 'Wednesday', startTime: '09:50', endTime: '10:40', courseCode: 'CE202', courseName: 'Surveying-I', instructor: 'Dr. S. Bajpai', branch: 'CIVIL', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 'g02-ce5-w3', day: 'Wednesday', startTime: '11:30', endTime: '12:20', courseCode: 'CE302', courseName: 'Design of Concrete Structures', instructor: 'Dr. R. K. Tripathi', branch: 'CIVIL', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'g02-ce5-w4', day: 'Wednesday', startTime: '12:20', endTime: '13:10', courseCode: 'CE304', courseName: 'Engineering Hydrology', instructor: 'Dr. M. K. Verma', branch: 'CIVIL', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },

    // Thursday
    { id: 'g02-ce3-th1', day: 'Thursday', startTime: '09:00', endTime: '09:50', courseCode: 'CE201', courseName: 'Fluid Mechanics', instructor: 'Dr. M. K. Verma', branch: 'CIVIL', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 'g02-ce5-th2', day: 'Thursday', startTime: '10:40', endTime: '11:30', courseCode: 'CE303', courseName: 'Geotechnical Engg-I', instructor: 'Dr. L. K. Yadu', branch: 'CIVIL', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'g02-ce5-th3', day: 'Thursday', startTime: '11:30', endTime: '12:20', courseCode: 'CE301', courseName: 'Structural Analysis-II', instructor: 'Dr. U. K. Dewangan', branch: 'CIVIL', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },

    // Friday
    { id: 'g02-ce3-f1', day: 'Friday', startTime: '09:00', endTime: '09:50', courseCode: 'CE204', courseName: 'Building Materials & Const.', instructor: 'Dr. A. K. Sahu', branch: 'CIVIL', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 'g02-ce3-f2', day: 'Friday', startTime: '09:50', endTime: '10:40', courseCode: 'CE203', courseName: 'Mechanics of Solids', instructor: 'Dr. G. D. Ramtekkar', branch: 'CIVIL', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 'g02-ce5-f3', day: 'Friday', startTime: '11:30', endTime: '12:20', courseCode: 'CE302', courseName: 'Design of Concrete Structures', instructor: 'Dr. R. K. Tripathi', branch: 'CIVIL', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'g02-ce5-f4', day: 'Friday', startTime: '12:20', endTime: '13:10', courseCode: 'CE304', courseName: 'Engineering Hydrology', instructor: 'Dr. M. K. Verma', branch: 'CIVIL', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
  ],
};

export const NITRR_ROOM_G11: Room = {
  id: 'g-11',
  code: 'G-11',
  name: 'Mechanical Thermal Hall G-11',
  block: 'Block B (Circuits & Core)',
  blockShort: 'Block B',
  floor: 0,
  wing: 'South Wing',
  capacity: 80,
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
  coordinates: { x: 270, y: 35, width: 110, height: 90 },
  schedule: [
    // Monday
    { id: 'g11-me3-m1', day: 'Monday', startTime: '09:00', endTime: '09:50', courseCode: 'ME201', courseName: 'Applied Thermodynamics', instructor: 'Dr. S. Sanyal', branch: 'MECH', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 'g11-me3-m2', day: 'Monday', startTime: '09:50', endTime: '10:40', courseCode: 'ME202', courseName: 'Material Science', instructor: 'Dr. A. M. Rawani', branch: 'MECH', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 'g11-me5-m3', day: 'Monday', startTime: '10:40', endTime: '11:30', courseCode: 'ME301', courseName: 'Heat & Mass Transfer', instructor: 'Dr. N. V. Swamy Naidu', branch: 'MECH', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'g11-me5-m4', day: 'Monday', startTime: '11:30', endTime: '12:20', courseCode: 'ME302', courseName: 'Machine Design-I', instructor: 'Dr. R. K. Sahu', branch: 'MECH', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'g11-me5-m5', day: 'Monday', startTime: '14:10', endTime: '15:00', courseCode: 'ME303', courseName: 'Dynamics of Machines', instructor: 'Dr. H. Bikrol', branch: 'MECH', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },

    // Tuesday
    { id: 'g11-me3-t1', day: 'Tuesday', startTime: '09:00', endTime: '09:50', courseCode: 'ME203', courseName: 'Kinematics of Machines', instructor: 'Dr. G. Bhatt', branch: 'MECH', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 'g11-me3-t2', day: 'Tuesday', startTime: '09:50', endTime: '10:40', courseCode: 'ME201', courseName: 'Applied Thermodynamics', instructor: 'Dr. S. Sanyal', branch: 'MECH', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 'g11-me5-t3', day: 'Tuesday', startTime: '10:40', endTime: '11:30', courseCode: 'ME301', courseName: 'Heat & Mass Transfer', instructor: 'Dr. N. V. Swamy Naidu', branch: 'MECH', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'g11-me5-t4', day: 'Tuesday', startTime: '11:30', endTime: '12:20', courseCode: 'ME304', courseName: 'Turbo Machinery', instructor: 'Dr. S. Bhowmick', branch: 'MECH', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },

    // Wednesday
    { id: 'g11-me3-w1', day: 'Wednesday', startTime: '09:00', endTime: '09:50', courseCode: 'ME204', courseName: 'Manufacturing Processes', instructor: 'Dr. A. Raj', branch: 'MECH', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 'g11-me3-w2', day: 'Wednesday', startTime: '09:50', endTime: '10:40', courseCode: 'ME203', courseName: 'Kinematics of Machines', instructor: 'Dr. G. Bhatt', branch: 'MECH', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 'g11-me5-w3', day: 'Wednesday', startTime: '11:30', endTime: '12:20', courseCode: 'ME302', courseName: 'Machine Design-I', instructor: 'Dr. R. K. Sahu', branch: 'MECH', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'g11-me5-w4', day: 'Wednesday', startTime: '12:20', endTime: '13:10', courseCode: 'ME303', courseName: 'Dynamics of Machines', instructor: 'Dr. H. Bikrol', branch: 'MECH', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },

    // Thursday
    { id: 'g11-me3-th1', day: 'Thursday', startTime: '09:50', endTime: '10:40', courseCode: 'ME201', courseName: 'Applied Thermodynamics', instructor: 'Dr. S. Sanyal', branch: 'MECH', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 'g11-me3-th2', day: 'Thursday', startTime: '10:40', endTime: '11:30', courseCode: 'ME202', courseName: 'Material Science', instructor: 'Dr. A. M. Rawani', branch: 'MECH', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 'g11-me5-th3', day: 'Thursday', startTime: '11:30', endTime: '12:20', courseCode: 'ME301', courseName: 'Heat & Mass Transfer', instructor: 'Dr. N. V. Swamy Naidu', branch: 'MECH', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'g11-me5-th4', day: 'Thursday', startTime: '14:10', endTime: '15:00', courseCode: 'ME304', courseName: 'Turbo Machinery', instructor: 'Dr. S. Bhowmick', branch: 'MECH', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },

    // Friday
    { id: 'g11-me3-f1', day: 'Friday', startTime: '09:00', endTime: '09:50', courseCode: 'ME204', courseName: 'Manufacturing Processes', instructor: 'Dr. A. Raj', branch: 'MECH', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 'g11-me3-f2', day: 'Friday', startTime: '09:50', endTime: '10:40', courseCode: 'ME203', courseName: 'Kinematics of Machines', instructor: 'Dr. G. Bhatt', branch: 'MECH', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 'g11-me5-f3', day: 'Friday', startTime: '10:40', endTime: '11:30', courseCode: 'ME302', courseName: 'Machine Design-I', instructor: 'Dr. R. K. Sahu', branch: 'MECH', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'g11-me5-f4', day: 'Friday', startTime: '11:30', endTime: '12:20', courseCode: 'ME303', courseName: 'Dynamics of Machines', instructor: 'Dr. H. Bikrol', branch: 'MECH', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
  ],
};

export const NITRR_ROOM_G12: Room = {
  id: 'g-12',
  code: 'G-12',
  name: 'ECE Signal Processing Hall G-12',
  block: 'Block A (Computing & AI)',
  blockShort: 'Block A',
  floor: 0,
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
  coordinates: { x: 390, y: 35, width: 110, height: 90 },
  schedule: [
    // Monday
    { id: 'g12-ec3-m1', day: 'Monday', startTime: '09:00', endTime: '09:50', courseCode: 'EC201', courseName: 'Electronic Devices & Circuits', instructor: 'Dr. T. Meenpal', branch: 'ECE', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 'g12-ec3-m2', day: 'Monday', startTime: '09:50', endTime: '10:40', courseCode: 'EC202', courseName: 'Digital System Design', instructor: 'Dr. B. Acharya', branch: 'ECE', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 'g12-ec5-m3', day: 'Monday', startTime: '10:40', endTime: '11:30', courseCode: 'EC301', courseName: 'Digital Signal Processing', instructor: 'Dr. A. S. Raghuvanshi', branch: 'ECE', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'g12-ec5-m4', day: 'Monday', startTime: '11:30', endTime: '12:20', courseCode: 'EC302', courseName: 'Electromagnetic Waves', instructor: 'Dr. S. Majumder', branch: 'ECE', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },

    // Tuesday
    { id: 'g12-ec3-t1', day: 'Tuesday', startTime: '09:00', endTime: '09:50', courseCode: 'EC203', courseName: 'Signals & Systems', instructor: 'Dr. S. K. Saha', branch: 'ECE', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 'g12-ec3-t2', day: 'Tuesday', startTime: '09:50', endTime: '10:40', courseCode: 'EC201', courseName: 'Electronic Devices & Circuits', instructor: 'Dr. T. Meenpal', branch: 'ECE', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 'g12-ec5-t3', day: 'Tuesday', startTime: '10:40', endTime: '11:30', courseCode: 'EC303', courseName: 'Linear Integrated Circuits', instructor: 'Dr. R. K. Chaurasiya', branch: 'ECE', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'g12-ec5-t4', day: 'Tuesday', startTime: '11:30', endTime: '12:20', courseCode: 'EC301', courseName: 'Digital Signal Processing', instructor: 'Dr. A. S. Raghuvanshi', branch: 'ECE', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },

    // Wednesday
    { id: 'g12-ec3-w1', day: 'Wednesday', startTime: '09:00', endTime: '09:50', courseCode: 'EC204', courseName: 'Network Analysis & Synthesis', instructor: 'Dr. M. V. Swati', branch: 'ECE', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 'g12-ec3-w2', day: 'Wednesday', startTime: '09:50', endTime: '10:40', courseCode: 'EC202', courseName: 'Digital System Design', instructor: 'Dr. B. Acharya', branch: 'ECE', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 'g12-ec5-w3', day: 'Wednesday', startTime: '11:30', endTime: '12:20', courseCode: 'EC304', courseName: 'Microcontrollers & Embedded', instructor: 'Dr. T. Meenpal', branch: 'ECE', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'g12-ec5-w4', day: 'Wednesday', startTime: '12:20', endTime: '13:10', courseCode: 'EC302', courseName: 'Electromagnetic Waves', instructor: 'Dr. S. Majumder', branch: 'ECE', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },

    // Thursday
    { id: 'g12-ec3-th1', day: 'Thursday', startTime: '09:50', endTime: '10:40', courseCode: 'EC203', courseName: 'Signals & Systems', instructor: 'Dr. S. K. Saha', branch: 'ECE', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 'g12-ec3-th2', day: 'Thursday', startTime: '10:40', endTime: '11:30', courseCode: 'EC201', courseName: 'Electronic Devices & Circuits', instructor: 'Dr. T. Meenpal', branch: 'ECE', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 'g12-ec5-th3', day: 'Thursday', startTime: '11:30', endTime: '12:20', courseCode: 'EC301', courseName: 'Digital Signal Processing', instructor: 'Dr. A. S. Raghuvanshi', branch: 'ECE', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'g12-ec5-th4', day: 'Thursday', startTime: '14:10', endTime: '15:00', courseCode: 'EC303', courseName: 'Linear Integrated Circuits', instructor: 'Dr. R. K. Chaurasiya', branch: 'ECE', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },

    // Friday
    { id: 'g12-ec3-f1', day: 'Friday', startTime: '09:00', endTime: '09:50', courseCode: 'EC204', courseName: 'Network Analysis & Synthesis', instructor: 'Dr. M. V. Swati', branch: 'ECE', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 'g12-ec3-f2', day: 'Friday', startTime: '09:50', endTime: '10:40', courseCode: 'EC202', courseName: 'Digital System Design', instructor: 'Dr. B. Acharya', branch: 'ECE', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 'g12-ec5-f3', day: 'Friday', startTime: '10:40', endTime: '11:30', courseCode: 'EC304', courseName: 'Microcontrollers & Embedded', instructor: 'Dr. T. Meenpal', branch: 'ECE', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'g12-ec5-f4', day: 'Friday', startTime: '11:30', endTime: '12:20', courseCode: 'EC302', courseName: 'Electromagnetic Waves', instructor: 'Dr. S. Majumder', branch: 'ECE', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
  ],
};

export const NITRR_ROOM_G31: Room = {
  id: 'g-31',
  code: 'G-31',
  name: 'Chemical Reaction Hall G-31',
  block: 'Block C (PG & Science)',
  blockShort: 'Block C',
  floor: 0,
  wing: 'Central',
  capacity: 75,
  type: 'Classroom',
  amenities: {
    projector: true,
    ac: true,
    smartBoard: false,
    chargingSockets: 'Moderate',
    wifiSignal: 'Good',
    soundSystem: false,
  },
  suitableForStudy: true,
  coordinates: { x: 510, y: 35, width: 110, height: 90 },
  schedule: [
    // Monday
    { id: 'g31-ch3-m1', day: 'Monday', startTime: '09:00', endTime: '09:50', courseCode: 'CH201', courseName: 'Chemical Process Calculations', instructor: 'Dr. A. B. Soni', branch: 'Chemical', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 'g31-ch3-m2', day: 'Monday', startTime: '09:50', endTime: '10:40', courseCode: 'CH202', courseName: 'Fluid Flow Operations', instructor: 'Dr. P. K. Chaudhari', branch: 'Chemical', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 'g31-ch5-m3', day: 'Monday', startTime: '11:30', endTime: '12:20', courseCode: 'CH301', courseName: 'Mass Transfer Operations-I', instructor: 'Dr. J. Anandkumar', branch: 'Chemical', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'g31-ch5-m4', day: 'Monday', startTime: '12:20', endTime: '13:10', courseCode: 'CH302', courseName: 'Chemical Reaction Engg-I', instructor: 'Dr. V. K. Singh', branch: 'Chemical', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },

    // Tuesday
    { id: 'g31-ch3-t1', day: 'Tuesday', startTime: '09:00', endTime: '09:50', courseCode: 'CH203', courseName: 'Chemical Engg Thermodynamics', instructor: 'Dr. C. M. Narayanan', branch: 'Chemical', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 'g31-ch3-t2', day: 'Tuesday', startTime: '09:50', endTime: '10:40', courseCode: 'CH201', courseName: 'Chemical Process Calculations', instructor: 'Dr. A. B. Soni', branch: 'Chemical', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 'g31-ch5-t3', day: 'Tuesday', startTime: '10:40', endTime: '11:30', courseCode: 'CH303', courseName: 'Process Dynamics & Control', instructor: 'Dr. P. Ghosh', branch: 'Chemical', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'g31-ch5-t4', day: 'Tuesday', startTime: '11:30', endTime: '12:20', courseCode: 'CH301', courseName: 'Mass Transfer Operations-I', instructor: 'Dr. J. Anandkumar', branch: 'Chemical', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },

    // Wednesday
    { id: 'g31-ch3-w1', day: 'Wednesday', startTime: '09:00', endTime: '09:50', courseCode: 'CH202', courseName: 'Fluid Flow Operations', instructor: 'Dr. P. K. Chaudhari', branch: 'Chemical', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 'g31-ch5-w2', day: 'Wednesday', startTime: '11:30', endTime: '12:20', courseCode: 'CH302', courseName: 'Chemical Reaction Engg-I', instructor: 'Dr. V. K. Singh', branch: 'Chemical', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'g31-ch5-w3', day: 'Wednesday', startTime: '12:20', endTime: '13:10', courseCode: 'CH303', courseName: 'Process Dynamics & Control', instructor: 'Dr. P. Ghosh', branch: 'Chemical', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },

    // Thursday
    { id: 'g31-ch3-th1', day: 'Thursday', startTime: '09:50', endTime: '10:40', courseCode: 'CH203', courseName: 'Chemical Engg Thermodynamics', instructor: 'Dr. C. M. Narayanan', branch: 'Chemical', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 'g31-ch5-th2', day: 'Thursday', startTime: '11:30', endTime: '12:20', courseCode: 'CH301', courseName: 'Mass Transfer Operations-I', instructor: 'Dr. J. Anandkumar', branch: 'Chemical', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },

    // Friday
    { id: 'g31-ch3-f1', day: 'Friday', startTime: '09:00', endTime: '09:50', courseCode: 'CH201', courseName: 'Chemical Process Calculations', instructor: 'Dr. A. B. Soni', branch: 'Chemical', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 'g31-ch5-f2', day: 'Friday', startTime: '10:40', endTime: '11:30', courseCode: 'CH302', courseName: 'Chemical Reaction Engg-I', instructor: 'Dr. V. K. Singh', branch: 'Chemical', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'g31-ch5-f3', day: 'Friday', startTime: '11:30', endTime: '12:20', courseCode: 'CH303', courseName: 'Process Dynamics & Control', instructor: 'Dr. P. Ghosh', branch: 'Chemical', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
  ],
};

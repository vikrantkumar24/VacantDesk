import { Room, RoomScheduleItem } from './campusData.ts';

// NIT Raipur Lower Level & Core Block B Rooms (B-XX codes)
// B-01: Physics & Advanced Materials Research Room (M.Tech & Ph.D.)
// B-02: Microelectronics & Analog IC Design Lecture Hall (Sem 3 & 5)
// B-11: Heavy Machines & Industrial Automation Hall (Sem 5 & 7)
// B-21: Applied Mathematics & Research Seminar Wing (PG & Ph.D.)

export const NITRR_ROOM_B01: Room = {
  id: 'b-01',
  code: 'B-01',
  name: 'Physics & Nanomaterials Hall B-01',
  block: 'Block C (PG & Science)',
  blockShort: 'Block C',
  floor: 0,
  wing: 'West Wing',
  capacity: 70,
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
  coordinates: { x: 30, y: 260, width: 110, height: 90 },
  schedule: [
    // Monday
    { id: 'b01-ph-m1', day: 'Monday', startTime: '10:40', endTime: '11:30', courseCode: 'PH501', courseName: 'Advanced Solid State Physics', instructor: 'Dr. K. S. Ojha', branch: 'Multi-disciplinary', degree: 'M.Tech', year: '1st Year', batch: 'Materials Tech' },
    { id: 'b01-ph-m2', day: 'Monday', startTime: '11:30', endTime: '12:20', courseCode: 'PH502', courseName: 'Nanomaterials Characterization', instructor: 'Dr. A. Khare', branch: 'Multi-disciplinary', degree: 'M.Tech', year: '1st Year', batch: 'Materials Tech' },
    { id: 'b01-ph-m3', day: 'Monday', startTime: '14:10', endTime: '15:50', courseCode: 'PHD904', courseName: 'X-Ray Diffraction & TEM Workshop', instructor: 'Dr. S. K. Sharma', branch: 'Multi-disciplinary', degree: 'Ph.D.', batch: 'Scholars' },

    // Tuesday
    { id: 'b01-ph-t1', day: 'Tuesday', startTime: '11:30', endTime: '12:20', courseCode: 'PH501', courseName: 'Advanced Solid State Physics', instructor: 'Dr. K. S. Ojha', branch: 'Multi-disciplinary', degree: 'M.Tech', year: '1st Year', batch: 'Materials Tech' },
    { id: 'b01-ph-t2', day: 'Tuesday', startTime: '14:10', endTime: '15:50', courseCode: 'PH503', courseName: 'Quantum Mechanics for Devices', instructor: 'Dr. A. Khare', branch: 'Multi-disciplinary', degree: 'M.Tech', year: '1st Year', batch: 'Materials Tech' },

    // Wednesday
    { id: 'b01-ph-w1', day: 'Wednesday', startTime: '10:40', endTime: '11:30', courseCode: 'PH502', courseName: 'Nanomaterials Characterization', instructor: 'Dr. A. Khare', branch: 'Multi-disciplinary', degree: 'M.Tech', year: '1st Year', batch: 'Materials Tech' },
    { id: 'b01-ph-w2', day: 'Wednesday', startTime: '14:10', endTime: '15:50', courseCode: 'PHD902', courseName: 'Advanced Spectroscopy Seminar', instructor: 'Dr. S. K. Sharma', branch: 'Multi-disciplinary', degree: 'Ph.D.', batch: 'Scholars' },

    // Thursday
    { id: 'b01-ph-th1', day: 'Thursday', startTime: '11:30', endTime: '12:20', courseCode: 'PH503', courseName: 'Quantum Mechanics for Devices', instructor: 'Dr. A. Khare', branch: 'Multi-disciplinary', degree: 'M.Tech', year: '1st Year', batch: 'Materials Tech' },

    // Friday
    { id: 'b01-ph-f1', day: 'Friday', startTime: '10:40', endTime: '11:30', courseCode: 'PH501', courseName: 'Advanced Solid State Physics', instructor: 'Dr. K. S. Ojha', branch: 'Multi-disciplinary', degree: 'M.Tech', year: '1st Year', batch: 'Materials Tech' },
  ],
};

export const NITRR_ROOM_B02: Room = {
  id: 'b-02',
  code: 'B-02',
  name: 'Microelectronics & Analog IC Hall B-02',
  block: 'Block B (Circuits & Core)',
  blockShort: 'Block B',
  floor: 0,
  wing: 'South Wing',
  capacity: 75,
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
  coordinates: { x: 150, y: 260, width: 110, height: 90 },
  schedule: [
    // Monday
    { id: 'b02-ec3-m1', day: 'Monday', startTime: '09:00', endTime: '09:50', courseCode: 'EC205', courseName: 'Electronic Circuits Simulation', instructor: 'Dr. P. K. Singh', branch: 'ECE', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 'b02-ec5-m2', day: 'Monday', startTime: '11:30', endTime: '12:20', courseCode: 'EC308', courseName: 'Analog Integrated Circuits', instructor: 'Dr. V. Sharma', branch: 'ECE', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'b02-ec5-m3', day: 'Monday', startTime: '14:10', endTime: '15:50', courseCode: 'EC309', courseName: 'Cadence EDA Tools Tutorial', instructor: 'Dr. P. K. Singh', branch: 'ECE', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },

    // Tuesday
    { id: 'b02-ec3-t1', day: 'Tuesday', startTime: '09:50', endTime: '10:40', courseCode: 'EC205', courseName: 'Electronic Circuits Simulation', instructor: 'Dr. P. K. Singh', branch: 'ECE', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 'b02-ec5-t2', day: 'Tuesday', startTime: '11:30', endTime: '12:20', courseCode: 'EC308', courseName: 'Analog Integrated Circuits', instructor: 'Dr. V. Sharma', branch: 'ECE', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },

    // Wednesday
    { id: 'b02-ec5-w1', day: 'Wednesday', startTime: '10:40', endTime: '11:30', courseCode: 'EC308', courseName: 'Analog Integrated Circuits', instructor: 'Dr. V. Sharma', branch: 'ECE', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },

    // Thursday
    { id: 'b02-ec3-th1', day: 'Thursday', startTime: '09:00', endTime: '09:50', courseCode: 'EC205', courseName: 'Electronic Circuits Simulation', instructor: 'Dr. P. K. Singh', branch: 'ECE', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },

    // Friday
    { id: 'b02-ec5-f1', day: 'Friday', startTime: '11:30', endTime: '12:20', courseCode: 'EC308', courseName: 'Analog Integrated Circuits', instructor: 'Dr. V. Sharma', branch: 'ECE', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
  ],
};

export const NITRR_ROOM_B11: Room = {
  id: 'b-11',
  code: 'B-11',
  name: 'Industrial Automation & Robotics Hall B-11',
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
    chargingSockets: 'Plenty',
    wifiSignal: 'Good',
    soundSystem: true,
  },
  suitableForStudy: true,
  coordinates: { x: 270, y: 260, width: 110, height: 90 },
  schedule: [
    // Monday
    { id: 'b11-me5-m1', day: 'Monday', startTime: '09:00', endTime: '09:50', courseCode: 'ME311', courseName: 'Industrial Automation & PLC', instructor: 'Dr. N. Jain', branch: 'MECH', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'b11-me7-m2', day: 'Monday', startTime: '11:30', endTime: '12:20', courseCode: 'ME405', courseName: 'Robotics Kinematics & Vision', instructor: 'Dr. P. M. Ramteke', branch: 'MECH', degree: 'B.Tech', year: '4th Year', batch: '7th Sem' },
    { id: 'b11-me7-m3', day: 'Monday', startTime: '14:10', endTime: '15:50', courseCode: 'ME406', courseName: 'Vibration & Acoustic Analysis', instructor: 'Dr. S. Sanyal', branch: 'MECH', degree: 'B.Tech', year: '4th Year', batch: '7th Sem' },

    // Tuesday
    { id: 'b11-me5-t1', day: 'Tuesday', startTime: '09:00', endTime: '09:50', courseCode: 'ME311', courseName: 'Industrial Automation & PLC', instructor: 'Dr. N. Jain', branch: 'MECH', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'b11-me7-t2', day: 'Tuesday', startTime: '11:30', endTime: '12:20', courseCode: 'ME405', courseName: 'Robotics Kinematics & Vision', instructor: 'Dr. P. M. Ramteke', branch: 'MECH', degree: 'B.Tech', year: '4th Year', batch: '7th Sem' },

    // Wednesday
    { id: 'b11-me5-w1', day: 'Wednesday', startTime: '09:00', endTime: '09:50', courseCode: 'ME311', courseName: 'Industrial Automation & PLC', instructor: 'Dr. N. Jain', branch: 'MECH', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 'b11-me7-w2', day: 'Wednesday', startTime: '11:30', endTime: '12:20', courseCode: 'ME405', courseName: 'Robotics Kinematics & Vision', instructor: 'Dr. P. M. Ramteke', branch: 'MECH', degree: 'B.Tech', year: '4th Year', batch: '7th Sem' },

    // Thursday
    { id: 'b11-me7-th1', day: 'Thursday', startTime: '11:30', endTime: '12:20', courseCode: 'ME406', courseName: 'Vibration & Acoustic Analysis', instructor: 'Dr. S. Sanyal', branch: 'MECH', degree: 'B.Tech', year: '4th Year', batch: '7th Sem' },

    // Friday
    { id: 'b11-me7-f1', day: 'Friday', startTime: '10:40', endTime: '11:30', courseCode: 'ME405', courseName: 'Robotics Kinematics & Vision', instructor: 'Dr. P. M. Ramteke', branch: 'MECH', degree: 'B.Tech', year: '4th Year', batch: '7th Sem' },
  ],
};

export const NITRR_ROOM_B21: Room = {
  id: 'b-21',
  code: 'B-21',
  name: 'Applied Mathematics & PG Wing B-21',
  block: 'Block C (PG & Science)',
  blockShort: 'Block C',
  floor: 0,
  wing: 'Central',
  capacity: 65,
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
  coordinates: { x: 390, y: 260, width: 110, height: 90 },
  schedule: [
    // Monday
    { id: 'b21-ma-m1', day: 'Monday', startTime: '09:00', endTime: '10:40', courseCode: 'MA501', courseName: 'Advanced Numerical Methods', instructor: 'Dr. D. Sharma', branch: 'Multi-disciplinary', degree: 'M.Tech', year: '1st Year', batch: 'PG Core' },
    { id: 'b21-ma-m2', day: 'Monday', startTime: '14:10', endTime: '15:50', courseCode: 'PHD903', courseName: 'Statistical Modeling & Optimization', instructor: 'Dr. R. K. Patel', branch: 'Multi-disciplinary', degree: 'Ph.D.', batch: 'Scholars' },

    // Wednesday
    { id: 'b21-ma-w1', day: 'Wednesday', startTime: '09:00', endTime: '10:40', courseCode: 'MA501', courseName: 'Advanced Numerical Methods', instructor: 'Dr. D. Sharma', branch: 'Multi-disciplinary', degree: 'M.Tech', year: '1st Year', batch: 'PG Core' },
    { id: 'b21-ma-w2', day: 'Wednesday', startTime: '14:10', endTime: '15:50', courseCode: 'PHD903', courseName: 'Statistical Modeling & Optimization', instructor: 'Dr. R. K. Patel', branch: 'Multi-disciplinary', degree: 'Ph.D.', batch: 'Scholars' },

    // Friday
    { id: 'b21-ma-f1', day: 'Friday', startTime: '09:00', endTime: '10:40', courseCode: 'MA501', courseName: 'Advanced Numerical Methods', instructor: 'Dr. D. Sharma', branch: 'Multi-disciplinary', degree: 'M.Tech', year: '1st Year', batch: 'PG Core' },
    { id: 'b21-ma-f2', day: 'Friday', startTime: '14:10', endTime: '16:00', courseCode: 'PHD905', courseName: 'Doctoral Research Methodology', instructor: 'Faculty Research Committee', branch: 'Multi-disciplinary', degree: 'Ph.D.', batch: 'Scholars' },
  ],
};

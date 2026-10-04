import { Room, RoomScheduleItem } from './campusData.ts';

// NIT Raipur Second Floor Rooms (S-XX codes)
// S-01: Electrical Power Systems & High Voltage (Sem 5 & 7)
// S-02: Mechanical Dynamics & Robotics (Sem 3 & 5)
// S-11: Civil Geotech & Transportation (Sem 5 & 7)
// S-21: Metallurgical & Materials Engg (Sem 3 & 5)
// S-31: Biomedical Instrumentation (Sem 3 & 5)

export const NITRR_ROOM_S01: Room = {
  id: 's-01',
  code: 'S-01',
  name: 'Electrical High Voltage & Power Hall S-01',
  block: 'Block B (Circuits & Core)',
  blockShort: 'Block B',
  floor: 2,
  wing: 'North Wing',
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
  coordinates: { x: 30, y: 150, width: 110, height: 90 },
  schedule: [
    // Monday
    { id: 's01-ee5-m1', day: 'Monday', startTime: '09:00', endTime: '09:50', courseCode: 'EE305', courseName: 'Power System Analysis', instructor: 'Dr. S. Gupta', branch: 'EEE', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 's01-ee5-m2', day: 'Monday', startTime: '09:50', endTime: '10:40', courseCode: 'EE306', courseName: 'Electric Drives', instructor: 'Dr. V. K. Mohit', branch: 'EEE', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 's01-ee7-m3', day: 'Monday', startTime: '11:30', endTime: '12:20', courseCode: 'EE401', courseName: 'High Voltage Engineering', instructor: 'Dr. K. Verma', branch: 'EEE', degree: 'B.Tech', year: '4th Year', batch: '7th Sem' },
    { id: 's01-ee7-m4', day: 'Monday', startTime: '12:20', endTime: '13:10', courseCode: 'EE402', courseName: 'Renewable Energy Systems', instructor: 'Dr. S. Ghosh', branch: 'EEE', degree: 'B.Tech', year: '4th Year', batch: '7th Sem' },

    // Tuesday
    { id: 's01-ee5-t1', day: 'Tuesday', startTime: '09:00', endTime: '09:50', courseCode: 'EE306', courseName: 'Electric Drives', instructor: 'Dr. V. K. Mohit', branch: 'EEE', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 's01-ee7-t2', day: 'Tuesday', startTime: '10:40', endTime: '11:30', courseCode: 'EE403', courseName: 'Smart Grid Technologies', instructor: 'Dr. Monalisa Biswal', branch: 'EEE', degree: 'B.Tech', year: '4th Year', batch: '7th Sem' },
    { id: 's01-ee7-t3', day: 'Tuesday', startTime: '11:30', endTime: '12:20', courseCode: 'EE401', courseName: 'High Voltage Engineering', instructor: 'Dr. K. Verma', branch: 'EEE', degree: 'B.Tech', year: '4th Year', batch: '7th Sem' },

    // Wednesday
    { id: 's01-ee5-w1', day: 'Wednesday', startTime: '09:00', endTime: '09:50', courseCode: 'EE305', courseName: 'Power System Analysis', instructor: 'Dr. S. Gupta', branch: 'EEE', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 's01-ee7-w2', day: 'Wednesday', startTime: '11:30', endTime: '12:20', courseCode: 'EE402', courseName: 'Renewable Energy Systems', instructor: 'Dr. S. Ghosh', branch: 'EEE', degree: 'B.Tech', year: '4th Year', batch: '7th Sem' },

    // Thursday
    { id: 's01-ee5-th1', day: 'Thursday', startTime: '09:50', endTime: '10:40', courseCode: 'EE306', courseName: 'Electric Drives', instructor: 'Dr. V. K. Mohit', branch: 'EEE', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 's01-ee7-th2', day: 'Thursday', startTime: '11:30', endTime: '12:20', courseCode: 'EE403', courseName: 'Smart Grid Technologies', instructor: 'Dr. Monalisa Biswal', branch: 'EEE', degree: 'B.Tech', year: '4th Year', batch: '7th Sem' },

    // Friday
    { id: 's01-ee5-f1', day: 'Friday', startTime: '09:00', endTime: '09:50', courseCode: 'EE305', courseName: 'Power System Analysis', instructor: 'Dr. S. Gupta', branch: 'EEE', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 's01-ee7-f2', day: 'Friday', startTime: '10:40', endTime: '11:30', courseCode: 'EE401', courseName: 'High Voltage Engineering', instructor: 'Dr. K. Verma', branch: 'EEE', degree: 'B.Tech', year: '4th Year', batch: '7th Sem' },
  ],
};

export const NITRR_ROOM_S02: Room = {
  id: 's-02',
  code: 'S-02',
  name: 'Mechanical Robotics & FEA Hall S-02',
  block: 'Block B (Circuits & Core)',
  blockShort: 'Block B',
  floor: 2,
  wing: 'North Wing',
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
  coordinates: { x: 150, y: 150, width: 110, height: 90 },
  schedule: [
    // Monday
    { id: 's02-me3-m1', day: 'Monday', startTime: '09:00', endTime: '09:50', courseCode: 'ME205', courseName: 'Engineering Metallurgy', instructor: 'Dr. V. Bansal', branch: 'MECH', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 's02-me5-m2', day: 'Monday', startTime: '10:40', endTime: '11:30', courseCode: 'ME308', courseName: 'Finite Element Methods', instructor: 'Dr. R. Salhotra', branch: 'MECH', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 's02-me5-m3', day: 'Monday', startTime: '11:30', endTime: '12:20', courseCode: 'ME309', courseName: 'Mechatronics Systems', instructor: 'Dr. A. Raj', branch: 'MECH', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },

    // Tuesday
    { id: 's02-me3-t1', day: 'Tuesday', startTime: '09:00', endTime: '09:50', courseCode: 'ME205', courseName: 'Engineering Metallurgy', instructor: 'Dr. V. Bansal', branch: 'MECH', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 's02-me5-t2', day: 'Tuesday', startTime: '10:40', endTime: '11:30', courseCode: 'ME310', courseName: 'Computational Fluid Dynamics', instructor: 'Dr. N. V. Swamy Naidu', branch: 'MECH', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 's02-me5-t3', day: 'Tuesday', startTime: '11:30', endTime: '12:20', courseCode: 'ME308', courseName: 'Finite Element Methods', instructor: 'Dr. R. Salhotra', branch: 'MECH', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },

    // Wednesday
    { id: 's02-me5-w1', day: 'Wednesday', startTime: '11:30', endTime: '12:20', courseCode: 'ME309', courseName: 'Mechatronics Systems', instructor: 'Dr. A. Raj', branch: 'MECH', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 's02-me5-w2', day: 'Wednesday', startTime: '12:20', endTime: '13:10', courseCode: 'ME310', courseName: 'Computational Fluid Dynamics', instructor: 'Dr. N. V. Swamy Naidu', branch: 'MECH', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },

    // Thursday
    { id: 's02-me3-th1', day: 'Thursday', startTime: '09:50', endTime: '10:40', courseCode: 'ME205', courseName: 'Engineering Metallurgy', instructor: 'Dr. V. Bansal', branch: 'MECH', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 's02-me5-th2', day: 'Thursday', startTime: '11:30', endTime: '12:20', courseCode: 'ME308', courseName: 'Finite Element Methods', instructor: 'Dr. R. Salhotra', branch: 'MECH', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },

    // Friday
    { id: 's02-me5-f1', day: 'Friday', startTime: '10:40', endTime: '11:30', courseCode: 'ME309', courseName: 'Mechatronics Systems', instructor: 'Dr. A. Raj', branch: 'MECH', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 's02-me5-f2', day: 'Friday', startTime: '11:30', endTime: '12:20', courseCode: 'ME310', courseName: 'Computational Fluid Dynamics', instructor: 'Dr. N. V. Swamy Naidu', branch: 'MECH', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
  ],
};

export const NITRR_ROOM_S11: Room = {
  id: 's-11',
  code: 'S-11',
  name: 'Civil Structural & Geotech Hall S-11',
  block: 'Block B (Circuits & Core)',
  blockShort: 'Block B',
  floor: 2,
  wing: 'South Wing',
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
  coordinates: { x: 270, y: 150, width: 110, height: 90 },
  schedule: [
    // Monday
    { id: 's11-ce5-m1', day: 'Monday', startTime: '09:00', endTime: '09:50', courseCode: 'CE305', courseName: 'Environmental Engineering-I', instructor: 'Dr. M. Murmu', branch: 'CIVIL', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 's11-ce5-m2', day: 'Monday', startTime: '09:50', endTime: '10:40', courseCode: 'CE306', courseName: 'Transportation Engineering-I', instructor: 'Dr. L. K. Yadu', branch: 'CIVIL', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 's11-ce7-m3', day: 'Monday', startTime: '11:30', endTime: '12:20', courseCode: 'CE401', courseName: 'Earthquake Resistant Design', instructor: 'Dr. G. P. Khare', branch: 'CIVIL', degree: 'B.Tech', year: '4th Year', batch: '7th Sem' },
    { id: 's11-ce7-m4', day: 'Monday', startTime: '12:20', endTime: '13:10', courseCode: 'CE402', courseName: 'Water Resources Engineering', instructor: 'Dr. M. K. Verma', branch: 'CIVIL', degree: 'B.Tech', year: '4th Year', batch: '7th Sem' },

    // Tuesday
    { id: 's11-ce5-t1', day: 'Tuesday', startTime: '09:00', endTime: '09:50', courseCode: 'CE305', courseName: 'Environmental Engineering-I', instructor: 'Dr. M. Murmu', branch: 'CIVIL', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 's11-ce7-t2', day: 'Tuesday', startTime: '10:40', endTime: '11:30', courseCode: 'CE403', courseName: 'Prestressed Concrete Structures', instructor: 'Dr. U. K. Dewangan', branch: 'CIVIL', degree: 'B.Tech', year: '4th Year', batch: '7th Sem' },
    { id: 's11-ce7-t3', day: 'Tuesday', startTime: '11:30', endTime: '12:20', courseCode: 'CE401', courseName: 'Earthquake Resistant Design', instructor: 'Dr. G. P. Khare', branch: 'CIVIL', degree: 'B.Tech', year: '4th Year', batch: '7th Sem' },

    // Wednesday
    { id: 's11-ce5-w1', day: 'Wednesday', startTime: '09:00', endTime: '09:50', courseCode: 'CE306', courseName: 'Transportation Engineering-I', instructor: 'Dr. L. K. Yadu', branch: 'CIVIL', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 's11-ce7-w2', day: 'Wednesday', startTime: '11:30', endTime: '12:20', courseCode: 'CE402', courseName: 'Water Resources Engineering', instructor: 'Dr. M. K. Verma', branch: 'CIVIL', degree: 'B.Tech', year: '4th Year', batch: '7th Sem' },

    // Thursday
    { id: 's11-ce5-th1', day: 'Thursday', startTime: '09:50', endTime: '10:40', courseCode: 'CE305', courseName: 'Environmental Engineering-I', instructor: 'Dr. M. Murmu', branch: 'CIVIL', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 's11-ce7-th2', day: 'Thursday', startTime: '11:30', endTime: '12:20', courseCode: 'CE403', courseName: 'Prestressed Concrete Structures', instructor: 'Dr. U. K. Dewangan', branch: 'CIVIL', degree: 'B.Tech', year: '4th Year', batch: '7th Sem' },

    // Friday
    { id: 's11-ce5-f1', day: 'Friday', startTime: '09:00', endTime: '09:50', courseCode: 'CE306', courseName: 'Transportation Engineering-I', instructor: 'Dr. L. K. Yadu', branch: 'CIVIL', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 's11-ce7-f2', day: 'Friday', startTime: '10:40', endTime: '11:30', courseCode: 'CE401', courseName: 'Earthquake Resistant Design', instructor: 'Dr. G. P. Khare', branch: 'CIVIL', degree: 'B.Tech', year: '4th Year', batch: '7th Sem' },
  ],
};

export const NITRR_ROOM_S21: Room = {
  id: 's-21',
  code: 'S-21',
  name: 'Metallurgical Phase Transformations Hall S-21',
  block: 'Block B (Circuits & Core)',
  blockShort: 'Block B',
  floor: 2,
  wing: 'East Wing',
  capacity: 75,
  type: 'Lecture Hall',
  amenities: {
    projector: true,
    ac: true,
    smartBoard: false,
    chargingSockets: 'Moderate',
    wifiSignal: 'Good',
    soundSystem: false,
  },
  suitableForStudy: true,
  coordinates: { x: 390, y: 150, width: 110, height: 90 },
  schedule: [
    // Monday
    { id: 's21-mm3-m1', day: 'Monday', startTime: '09:00', endTime: '09:50', courseCode: 'MM201', courseName: 'Physical Metallurgy', instructor: 'Dr. M. Chopkar', branch: 'Metallurgy', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 's21-mm3-m2', day: 'Monday', startTime: '09:50', endTime: '10:40', courseCode: 'MM202', courseName: 'Metallurgical Thermodynamics', instructor: 'Dr. S. Das', branch: 'Metallurgy', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 's21-mm5-m3', day: 'Monday', startTime: '11:30', endTime: '12:20', courseCode: 'MM301', courseName: 'Iron Making Technology', instructor: 'Dr. A. P. Raj', branch: 'Metallurgy', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 's21-mm5-m4', day: 'Monday', startTime: '12:20', endTime: '13:10', courseCode: 'MM302', courseName: 'Mechanical Metallurgy', instructor: 'Dr. N. Gupta', branch: 'Metallurgy', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },

    // Tuesday
    { id: 's21-mm3-t1', day: 'Tuesday', startTime: '09:00', endTime: '09:50', courseCode: 'MM203', courseName: 'Mineral Dressing', instructor: 'Dr. M. K. Manoj', branch: 'Metallurgy', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 's21-mm3-t2', day: 'Tuesday', startTime: '09:50', endTime: '10:40', courseCode: 'MM201', courseName: 'Physical Metallurgy', instructor: 'Dr. M. Chopkar', branch: 'Metallurgy', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 's21-mm5-t3', day: 'Tuesday', startTime: '10:40', endTime: '11:30', courseCode: 'MM303', courseName: 'Phase Transformations in Materials', instructor: 'Dr. M. Chopkar', branch: 'Metallurgy', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 's21-mm5-t4', day: 'Tuesday', startTime: '11:30', endTime: '12:20', courseCode: 'MM301', courseName: 'Iron Making Technology', instructor: 'Dr. A. P. Raj', branch: 'Metallurgy', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },

    // Wednesday
    { id: 's21-mm3-w1', day: 'Wednesday', startTime: '09:00', endTime: '09:50', courseCode: 'MM202', courseName: 'Metallurgical Thermodynamics', instructor: 'Dr. S. Das', branch: 'Metallurgy', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 's21-mm5-w2', day: 'Wednesday', startTime: '11:30', endTime: '12:20', courseCode: 'MM302', courseName: 'Mechanical Metallurgy', instructor: 'Dr. N. Gupta', branch: 'Metallurgy', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },

    // Thursday
    { id: 's21-mm3-th1', day: 'Thursday', startTime: '09:50', endTime: '10:40', courseCode: 'MM203', courseName: 'Mineral Dressing', instructor: 'Dr. M. K. Manoj', branch: 'Metallurgy', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 's21-mm5-th2', day: 'Thursday', startTime: '11:30', endTime: '12:20', courseCode: 'MM303', courseName: 'Phase Transformations', instructor: 'Dr. M. Chopkar', branch: 'Metallurgy', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },

    // Friday
    { id: 's21-mm3-f1', day: 'Friday', startTime: '09:00', endTime: '09:50', courseCode: 'MM201', courseName: 'Physical Metallurgy', instructor: 'Dr. M. Chopkar', branch: 'Metallurgy', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 's21-mm5-f2', day: 'Friday', startTime: '10:40', endTime: '11:30', courseCode: 'MM304', courseName: 'Non-Ferrous Extractive Metallurgy', instructor: 'Dr. S. Das', branch: 'Metallurgy', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
  ],
};

export const NITRR_ROOM_S31: Room = {
  id: 's-31',
  code: 'S-31',
  name: 'Biomedical Signals & Instrumentation Hall S-31',
  block: 'Block A (Computing & AI)',
  blockShort: 'Block A',
  floor: 2,
  wing: 'Central',
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
  coordinates: { x: 510, y: 150, width: 110, height: 90 },
  schedule: [
    // Monday
    { id: 's31-bm3-m1', day: 'Monday', startTime: '09:00', endTime: '09:50', courseCode: 'BM201', courseName: 'Human Anatomy & Physiology', instructor: 'Dr. B. K. Singh', branch: 'Bio-Medical', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 's31-bm3-m2', day: 'Monday', startTime: '09:50', endTime: '10:40', courseCode: 'BM202', courseName: 'Bio-Electric Signals & Conditioning', instructor: 'Dr. Saurabh Gupta', branch: 'Bio-Medical', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 's31-bm5-m3', day: 'Monday', startTime: '11:30', endTime: '12:20', courseCode: 'BM301', courseName: 'Biomedical Signal Processing', instructor: 'Dr. N. K. Arya', branch: 'Bio-Medical', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
    { id: 's31-bm5-m4', day: 'Monday', startTime: '12:20', endTime: '13:10', courseCode: 'BM302', courseName: 'Medical Imaging Systems', instructor: 'Dr. B. K. Singh', branch: 'Bio-Medical', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },

    // Tuesday
    { id: 's31-bm3-t1', day: 'Tuesday', startTime: '09:00', endTime: '09:50', courseCode: 'BM203', courseName: 'Biomedical Transducers & Sensors', instructor: 'Dr. Saurabh Gupta', branch: 'Bio-Medical', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 's31-bm3-t2', day: 'Tuesday', startTime: '09:50', endTime: '10:40', courseCode: 'BM201', courseName: 'Human Anatomy & Physiology', instructor: 'Dr. B. K. Singh', branch: 'Bio-Medical', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 's31-bm5-t3', day: 'Tuesday', startTime: '10:40', endTime: '11:30', courseCode: 'BM303', courseName: 'Diagnostic Equipment & Safety', instructor: 'Dr. N. K. Arya', branch: 'Bio-Medical', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },

    // Wednesday
    { id: 's31-bm3-w1', day: 'Wednesday', startTime: '09:00', endTime: '09:50', courseCode: 'BM202', courseName: 'Bio-Electric Signals', instructor: 'Dr. Saurabh Gupta', branch: 'Bio-Medical', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 's31-bm5-w2', day: 'Wednesday', startTime: '11:30', endTime: '12:20', courseCode: 'BM301', courseName: 'Biomedical Signal Processing', instructor: 'Dr. N. K. Arya', branch: 'Bio-Medical', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },

    // Thursday
    { id: 's31-bm3-th1', day: 'Thursday', startTime: '09:50', endTime: '10:40', courseCode: 'BM203', courseName: 'Biomedical Transducers & Sensors', instructor: 'Dr. Saurabh Gupta', branch: 'Bio-Medical', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 's31-bm5-th2', day: 'Thursday', startTime: '11:30', endTime: '12:20', courseCode: 'BM302', courseName: 'Medical Imaging Systems', instructor: 'Dr. B. K. Singh', branch: 'Bio-Medical', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },

    // Friday
    { id: 's31-bm3-f1', day: 'Friday', startTime: '09:00', endTime: '09:50', courseCode: 'BM201', courseName: 'Human Anatomy & Physiology', instructor: 'Dr. B. K. Singh', branch: 'Bio-Medical', degree: 'B.Tech', year: '2nd Year', batch: '3rd Sem' },
    { id: 's31-bm5-f2', day: 'Friday', startTime: '10:40', endTime: '11:30', courseCode: 'BM304', courseName: 'Biomaterials & Artificial Organs', instructor: 'Dr. N. K. Arya', branch: 'Bio-Medical', degree: 'B.Tech', year: '3rd Year', batch: '5th Sem' },
  ],
};

import { ALL_NITRR_ROOMS } from './nitRaipurAllRooms.ts';

export interface RoomScheduleItem {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  startTime: string; // '08:30'
  endTime: string;   // '09:30'
  courseCode: string;
  courseName: string;
  instructor: string;
  branch: 'CSE' | 'ECE' | 'MECH' | 'CIVIL' | 'EEE' | 'IT' | 'Bio-Medical' | 'Bio-Tech' | 'Chemical' | 'Mining' | 'Metallurgy' | 'Combined' | 'Multi-disciplinary' | string;
  degree: 'B.Tech' | 'M.Tech' | 'Ph.D.' | 'Faculty/Admin';
  year?: '1st Year' | '2nd Year' | '3rd Year' | '4th Year';
  batch?: string; // 'Batch A', 'Scholars', 'All'
}

export interface Room {
  id: string;
  code: string;
  roomNumber?: string;
  name: string;
  status?: 'vacant' | 'pending' | 'locked' | 'booked';
  lockedBy?: string | null;
  block: 'Block A (Computing & AI)' | 'Block B (Circuits & Core)' | 'Block C (PG & Science)' | 'Central Library' | 'Student Center';
  blockShort: 'Block A' | 'Block B' | 'Block C' | 'Library' | 'Student Center';
  floor: 0 | 1 | 2 | 3; // 0 = Ground
  wing: 'North Wing' | 'South Wing' | 'East Wing' | 'West Wing' | 'Central';
  capacity: number;
  type: 'Classroom' | 'Lecture Hall' | 'Computer Lab' | 'Hardware Lab' | 'Research Lab' | 'Seminar Hall' | 'Study Pod';
  amenities: {
    projector: boolean;
    ac: boolean;
    smartBoard: boolean;
    chargingSockets: 'Plenty' | 'Moderate' | 'Few';
    wifiSignal: 'Excellent' | 'Good';
    soundSystem: boolean;
  };
  suitableForStudy: boolean;
  coordinates: { x: number; y: number; width: number; height: number }; // For interactive floor plan SVG
  schedule: RoomScheduleItem[];
}

export interface ServiceFacility {
  id: string;
  name: string;
  category: 'printer' | 'vending' | 'water' | 'restroom' | 'coffee' | 'atm' | 'stationery';
  block: 'Block A' | 'Block B' | 'Block C' | 'Library' | 'Student Center';
  floor: 0 | 1 | 2 | 3;
  exactLocation: string;
  status: 'operational' | 'busy' | 'paper_low' | 'maintenance';
  statusDescription: string;
  details: {
    pricing?: string;
    items?: string[];
    features?: string[];
    contact?: string;
    queueEstimateMinutes?: number;
  };
  lastChecked: string;
  coordinates: { x: number; y: number };
}

export interface CampusBlockInfo {
  id: string;
  name: string;
  floors: {
    floorNumber: 0 | 1 | 2 | 3;
    floorName: string;
    description: string;
    keyLandmarks: string[];
  }[];
  connections: string[];
}

export const CAMPUS_BLOCKS: CampusBlockInfo[] = [
  {
    id: 'block-a',
    name: 'Block A (Computing & AI)',
    floors: [
      { floorNumber: 0, floorName: 'Ground Floor', description: 'Central Computer Center (CCC Language Lab) & APJ Abdul Kalam Hall', keyLandmarks: ['CCC Language Lab', 'APJ Abdul Kalam Hall', 'Main Tech Atrium'] },
      { floorNumber: 1, floorName: '1st Floor', description: 'First Floor North Wing (FN-1, FN-2, FN-4)', keyLandmarks: ['Room FN-1 (Bio-Med & Bio-Tech)', 'Room FN-2 (Combined L & M)', 'Room FN-4 (Chemical & CSE)'] },
      { floorNumber: 2, floorName: '2nd Floor', description: 'Connected Skywalk Corridor to Block B', keyLandmarks: ['Skywalk Bridge to Block B', 'IoT Hardware Lab', 'Restroom Lobby'] },
      { floorNumber: 3, floorName: '3rd Floor', description: 'Research Scholar Suites & Seminar Rooms', keyLandmarks: ['High Performance Compute Suite', 'Quiet Study Lounge'] },
    ],
    connections: ['Skywalk on 2nd Floor to Block B', 'Ground floor covered corridor to Central Library', 'Direct pathway to Canteen']
  },
  {
    id: 'block-b',
    name: 'Block B (Circuits & Core)',
    floors: [
      { floorNumber: 0, floorName: 'Ground Floor', description: 'Central Workshop & Engineering Fabrication', keyLandmarks: ['Central Mechanical Workshop', 'Basic Electrical Lab'] },
      { floorNumber: 1, floorName: '1st Floor', description: 'Department Laboratories & Staff Rooms', keyLandmarks: ['Analog Electronics Lab', 'Water Dispenser West'] },
      { floorNumber: 2, floorName: '2nd Floor', description: 'Second Floor North Wing (SN-2, SN-3, SN-4) & Drawing Halls (D3 & D4)', keyLandmarks: ['Room SN-2 (IT & Metallurgy)', 'Room SN-3 (EE & Mech)', 'Room SN-4 (ECE & Metallurgy)', 'Drawing Halls D-3 & D-4'] },
      { floorNumber: 3, floorName: '3rd Floor', description: 'Department Research Laboratories', keyLandmarks: ['Microelectronics Center', 'Seminar Room'] },
    ],
    connections: ['Skywalk on 2nd Floor connects to Block A', 'Walkway connects to Block C']
  },
  {
    id: 'block-c',
    name: 'Block C (PG & Science)',
    floors: [
      { floorNumber: 0, floorName: 'Ground Floor', description: 'Applied Chemistry Labs & Material Testing', keyLandmarks: ['Applied Chemistry Lab (Ground Floor)', 'Stationery & Xerox Hub'] },
      { floorNumber: 1, floorName: '1st Floor', description: 'First Floor Room F-39 (Civil & Mining) & Physics Labs', keyLandmarks: ['Room F-39 (Civil Sec D & Mining Sec E)', 'Physics-I & Physics-II Lab (1st Floor)'] },
      { floorNumber: 2, floorName: '2nd Floor', description: 'Postgraduate & Mathematics Halls', keyLandmarks: ['Mathematics Seminar Room', 'Quiet Research Wing'] },
    ],
    connections: ['Direct shaded pathway to Central Library', 'West walkway to Block B']
  },
  {
    id: 'library',
    name: 'Central Library',
    floors: [
      { floorNumber: 0, floorName: 'Ground Floor', description: 'Circulation Desk, Digital Catalog & High-Capacity Xerox Center', keyLandmarks: ['Central Helpdesk', 'Main Printing & Binding Center', 'Digital Resource Lab'] },
      { floorNumber: 1, floorName: '1st Floor', description: 'General Reading Hall & Collaborative Group Study Rooms', keyLandmarks: ['Reading Hall (Sec F, G, H, I, J, M)', 'Coffee Dispenser Station'] },
      { floorNumber: 2, floorName: '2nd Floor', description: 'Silent Study Wing & Thesis Archives', keyLandmarks: ['Silent Study Wing', 'Journal Repository', 'Power-Cube Desks'] },
    ],
    connections: ['South corridor to Block A', 'North lawn path to Food Court']
  }
];

export const INITIAL_ROOMS: Room[] = ALL_NITRR_ROOMS;

export const INITIAL_SERVICES: ServiceFacility[] = [
  // Printers
  {
    id: 'srv-print-1',
    name: 'Central Library High-Speed Print & Xerox Station',
    category: 'printer',
    block: 'Library',
    floor: 0,
    exactLocation: 'Ground floor, right opposite the Circulation Desk',
    status: 'operational',
    statusDescription: '2 Heavy-duty Konica Minolta laser copiers online. Fast queue.',
    details: {
      pricing: '₹1.50/page B&W, ₹5.00/page Color, ₹25 Spiral Binding',
      items: ['A4, A3 Printing', 'Spiral & Hardbound Binding', 'Color Brochure Printing', 'Scan to Email / USB'],
      queueEstimateMinutes: 3,
      contact: 'Library Helpdesk Ext 402'
    },
    lastChecked: '5 mins ago',
    coordinates: { x: 260, y: 50 }
  },
  {
    id: 'srv-print-2',
    name: 'Block A Computer Dept Printer Kiosk',
    category: 'printer',
    block: 'Block A',
    floor: 1,
    exactLocation: 'Adjacent to Turing Lab (A-102) & Dept Notice Board',
    status: 'operational',
    statusDescription: 'HP LaserJet Network Station operational. Paper tray full.',
    details: {
      pricing: 'Free 30 pages/month for registered CSE/IT students, ₹2/page after',
      items: ['A4 B&W duplex printing', 'Code printouts', 'Assignment submissions'],
      queueEstimateMinutes: 1,
      contact: 'Lab Tech Mr. Murthy'
    },
    lastChecked: '12 mins ago',
    coordinates: { x: 150, y: 140 }
  },
  {
    id: 'srv-print-3',
    name: 'Block B Core & Plotter Print Shop',
    category: 'printer',
    block: 'Block B',
    floor: 2,
    exactLocation: 'Skywalk connecting foyer, near Room B-204',
    status: 'paper_low',
    statusDescription: 'Running low on A3 sheets; A4 printing fully functional.',
    details: {
      pricing: '₹2.00/page B&W, ₹20/sheet A1/A2 Engineering Blueprint Plotter',
      items: ['CAD Blueprint Plots', 'Circuit Schematics', 'Thesis draft printing'],
      queueEstimateMinutes: 5,
      contact: 'Print Shop Manager'
    },
    lastChecked: '25 mins ago',
    coordinates: { x: 240, y: 140 }
  },
  {
    id: 'srv-print-4',
    name: 'Block C PG & Science Stationery Xerox',
    category: 'printer',
    block: 'Block C',
    floor: 0,
    exactLocation: 'Ground floor arcade under the outdoor stairs',
    status: 'busy',
    statusDescription: 'Busy queue right now (approx 6 students waiting).',
    details: {
      pricing: '₹1.50/page B&W, Lab record books available',
      items: ['Stationery', 'Record note notebooks', 'Graph pads', 'Lamination'],
      queueEstimateMinutes: 9,
      contact: 'Campus Store'
    },
    lastChecked: '8 mins ago',
    coordinates: { x: 280, y: 60 }
  },

  // Vending Machines
  {
    id: 'srv-vend-1',
    name: 'Block A Tech Atrium Smart Vending',
    category: 'vending',
    block: 'Block A',
    floor: 0,
    exactLocation: 'Ground floor main atrium, next to lift lobby',
    status: 'operational',
    statusDescription: 'Fully stocked. UPI / Cards / Cash accepted.',
    details: {
      items: ['Cold Brew Coffee', 'Red Bull & Energy Drinks', 'Protein Bars', 'Salted Cashews', 'Sandwiches', 'Chips'],
      pricing: '₹20 to ₹120'
    },
    lastChecked: 'Just now',
    coordinates: { x: 330, y: 110 }
  },
  {
    id: 'srv-vend-2',
    name: 'Block B 1st Floor Snack Kiosk',
    category: 'vending',
    block: 'Block B',
    floor: 1,
    exactLocation: 'Between Staff Room 102 and Water Cooler West',
    status: 'operational',
    statusDescription: 'Online. Freshly refilled at 8:00 AM.',
    details: {
      items: ['Fruit Juices', 'Biscuits & Cookies', 'Chocolates', 'Electrolyte drinks'],
      pricing: '₹10 to ₹60'
    },
    lastChecked: '18 mins ago',
    coordinates: { x: 280, y: 110 }
  },
  {
    id: 'srv-vend-3',
    name: 'Library 1st Floor Beverage Dispenser',
    category: 'coffee',
    block: 'Library',
    floor: 1,
    exactLocation: '1st floor lounge terrace entrance',
    status: 'operational',
    statusDescription: 'Fresh bean-to-cup espresso and steaming masala tea.',
    details: {
      items: ['Espresso', 'Cappuccino', 'Masala Chai', 'Green Tea', 'Hot Chocolate'],
      pricing: '₹15 to ₹35'
    },
    lastChecked: '4 mins ago',
    coordinates: { x: 210, y: 40 }
  },

  // Water Coolers & Restrooms
  {
    id: 'srv-water-a1',
    name: 'Block A RO Cold Water Station (1st Floor)',
    category: 'water',
    block: 'Block A',
    floor: 1,
    exactLocation: 'Opposite Room A-101 North corridor',
    status: 'operational',
    statusDescription: 'UV-purified, chilled & normal faucets operating cleanly.',
    details: { features: ['Chilled / Ambient / Warm options', 'TDS Level: 84 ppm', 'Cleanliness certified'] },
    lastChecked: '10 mins ago',
    coordinates: { x: 120, y: 140 }
  },
  {
    id: 'srv-water-b1',
    name: 'Block B RO Water Dispenser (1st Floor)',
    category: 'water',
    block: 'Block B',
    floor: 1,
    exactLocation: 'West stairway landing near Room B-101',
    status: 'operational',
    statusDescription: 'Running smooth. Filter replacement done yesterday.',
    details: { features: ['Chilled water', 'Bottle quick-refill nozzle'] },
    lastChecked: '30 mins ago',
    coordinates: { x: 120, y: 140 }
  },
  {
    id: 'srv-rest-a2',
    name: 'Block A Modern Restrooms & Accessible Toilet (Floor 2)',
    category: 'restroom',
    block: 'Block A',
    floor: 2,
    exactLocation: 'South corridor past IoT Lab A-204',
    status: 'operational',
    statusDescription: 'Sanitized at 10:00 AM. Wheelchair accessible with ramp & grab bars.',
    details: { features: ['Men, Women & Gender-Neutral Accessible', 'Braille signage', 'Motion sensor taps'] },
    lastChecked: '40 mins ago',
    coordinates: { x: 300, y: 140 }
  }
];

export interface NavigationStep {
  stepNumber: number;
  instruction: string;
  landmark: string;
  floorChange?: string; // 'Take elevator to 2nd Floor' or 'Take central stairs'
  distanceMeters: number;
  iconType: 'walk' | 'stairs' | 'elevator' | 'turn-left' | 'turn-right' | 'destination' | 'bridge';
}

export interface NavigationRouteResult {
  fromLocation: string;
  toLocation: string;
  destinationDetails: {
    name: string;
    code?: string;
    block: string;
    floor: number;
    currentStatus: 'Vacant' | 'Occupied' | 'Available' | 'Service Active';
    notes?: string;
  };
  totalDistanceMeters: number;
  estimatedWalkTimeMinutes: number;
  accessibilityFriendly: boolean;
  steps: NavigationStep[];
  aiAdvice: string;
}

// Helper to determine if a room is vacant at a given day & time
export function getRoomVacancyStatus(
  room: Room,
  targetDay: string,
  targetTimeStr: string // "HH:MM" e.g. "10:15"
): {
  isVacant: boolean;
  currentScheduleItem?: RoomScheduleItem;
  nextScheduleItem?: RoomScheduleItem;
  vacantUntil?: string;
  timeRemainingMinutes?: number;
} {
  const daySchedule = room.schedule.filter(s => s.day === targetDay);
  if (daySchedule.length === 0) {
    return { isVacant: true };
  }

  const toMinutes = (timeStr: string) => {
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
  };

  const targetMinutes = toMinutes(targetTimeStr);

  // Check currently active schedule
  const current = daySchedule.find(s => {
    const start = toMinutes(s.startTime);
    const end = toMinutes(s.endTime);
    return targetMinutes >= start && targetMinutes < end;
  });

  if (current) {
    const endMin = toMinutes(current.endTime);
    return {
      isVacant: false,
      currentScheduleItem: current,
      timeRemainingMinutes: Math.max(0, endMin - targetMinutes)
    };
  }

  // If not currently occupied, find the next upcoming session today
  const upcoming = daySchedule
    .filter(s => toMinutes(s.startTime) > targetMinutes)
    .sort((a, b) => toMinutes(a.startTime) - toMinutes(b.startTime))[0];

  if (upcoming) {
    const nextStartMin = toMinutes(upcoming.startTime);
    return {
      isVacant: true,
      nextScheduleItem: upcoming,
      vacantUntil: upcoming.startTime,
      timeRemainingMinutes: nextStartMin - targetMinutes
    };
  }

  return {
    isVacant: true,
    vacantUntil: 'End of Day (18:00)'
  };
}

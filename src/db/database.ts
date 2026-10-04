import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ROLE_MAPPINGS, getRoleForEmail } from '../roleConfig.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.resolve(__dirname, '../../data-store.json');

export type UserRole = 'student' | 'cr' | 'faculty' | 'hod';

export interface UserRecord {
  id: string;
  email: string;
  role: UserRole;
  name?: string;
  department?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RoomBookingRecord {
  id: string;
  roomId: string;
  roomCode: string;
  userEmail: string;
  day: string;
  startTime: string;
  endTime: string;
  courseCode: string;
  courseName: string;
  instructor?: string;
  reason?: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
}

interface DatabaseData {
  users: Record<string, UserRecord>;
  bookings: RoomBookingRecord[];
}

// Initial seed accounts for testing role RBAC
const INITIAL_SEEDS: UserRecord[] = [
  {
    id: 'u-1',
    email: 'hod.cse@nitrr.ac.in',
    role: 'hod',
    name: 'Dr. Head of Department CSE',
    department: 'Computer Science & Engineering',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'u-2',
    email: 'faculty.dewangan@nitrr.ac.in',
    role: 'faculty',
    name: 'Dr. S. K. Dewangan',
    department: 'Computer Science & Engineering',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'u-3',
    email: 'faculty.koley@nitrr.ac.in',
    role: 'faculty',
    name: 'Dr. Ebha Koley',
    department: 'Electrical Engineering',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'u-4',
    email: 'cr.cse.sem6@nitrr.ac.in',
    role: 'cr',
    name: 'Aman Verma (CR CSE-6)',
    department: 'Computer Science & Engineering',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'u-5',
    email: 'student.rahul@nitrr.ac.in',
    role: 'student',
    name: 'Rahul Sharma',
    department: 'Computer Science & Engineering',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'u-6',
    email: 'student@it.nitrr.ac.in',
    role: 'student',
    name: 'Ananya Sen',
    department: 'Information Technology',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'u-7',
    email: 'student@cse.nitrr.ac.in',
    role: 'student',
    name: 'Kunal Verma',
    department: 'Computer Science & Engineering',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'u-8',
    email: 'cr@it.nitrr.ac.in',
    role: 'cr',
    name: 'Rohan Gupta (CR IT)',
    department: 'Information Technology',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

class DatabaseService {
  private data: DatabaseData;

  constructor() {
    this.data = this.loadData();
  }

  private loadData(): DatabaseData {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        if (parsed && parsed.users) {
          let updated = false;
          INITIAL_SEEDS.forEach((u) => {
            if (!parsed.users[u.email.toLowerCase()]) {
              parsed.users[u.email.toLowerCase()] = u;
              updated = true;
            }
          });
          if (updated) {
            this.saveData(parsed);
          }
        }
        return parsed;
      }
    } catch (err) {
      console.error('Failed to load database file, reinitializing', err);
    }

    const initialUsers: Record<string, UserRecord> = {};
    INITIAL_SEEDS.forEach((u) => {
      initialUsers[u.email.toLowerCase()] = u;
    });

    const initData: DatabaseData = {
      users: initialUsers,
      bookings: []
    };
    this.saveData(initData);
    return initData;
  }

  private saveData(data: DatabaseData) {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to persist database file', err);
    }
  }

  public getUserByEmail(email: string): UserRecord | null {
    if (!email) return null;
    const normalized = email.trim().toLowerCase();
    const roleMap = ROLE_MAPPINGS as Record<string, UserRole>;
    const existing = this.data.users[normalized];
    if (existing) {
      if (roleMap[normalized] && existing.role !== roleMap[normalized]) {
        existing.role = roleMap[normalized];
        this.saveData(this.data);
      }
      return existing;
    }
    // If not in database yet, but mapped in ROLE_MAPPINGS, initialize user
    if (roleMap[normalized]) {
      return this.ensureUser(normalized);
    }
    return null;
  }

  public ensureUser(email: string, name?: string): UserRecord {
    const normalized = email.trim().toLowerCase();
    const roleMap = ROLE_MAPPINGS as Record<string, UserRole>;
    if (this.data.users[normalized]) {
      if (name && !this.data.users[normalized].name) {
        this.data.users[normalized].name = name;
        this.data.users[normalized].updatedAt = new Date().toISOString();
        this.saveData(this.data);
      }
      if (roleMap[normalized] && this.data.users[normalized].role !== roleMap[normalized]) {
        this.data.users[normalized].role = roleMap[normalized];
        this.saveData(this.data);
      }
      return this.data.users[normalized];
    }

    // Assign role from ROLE_MAPPINGS if mapped, otherwise default to 'student'
    const roleToAssign = getRoleForEmail(normalized);
    const newUser: UserRecord = {
      id: `u-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      email: normalized,
      role: roleToAssign,
      name: name || normalized.split('@')[0],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.data.users[normalized] = newUser;
    this.saveData(this.data);
    return newUser;
  }

  public updateUserRole(email: string, role: UserRole): UserRecord {
    const user = this.ensureUser(email);
    user.role = role;
    user.updatedAt = new Date().toISOString();
    this.data.users[email.trim().toLowerCase()] = user;
    this.saveData(this.data);
    return user;
  }

  public createBooking(booking: Omit<RoomBookingRecord, 'id' | 'createdAt' | 'status'>): RoomBookingRecord {
    const newBooking: RoomBookingRecord = {
      ...booking,
      id: `bk-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    this.data.bookings.unshift(newBooking);
    this.saveData(this.data);
    return newBooking;
  }

  public getBookings(roomCode?: string): RoomBookingRecord[] {
    if (roomCode) {
      const normalized = roomCode.trim().toUpperCase();
      return this.data.bookings.filter((b) => b.roomCode.toUpperCase() === normalized);
    }
    return this.data.bookings;
  }
}

export const db = new DatabaseService();

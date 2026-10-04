-- ====================================================================
-- Database Schema for NIT Raipur Classroom & Timetable Management
-- Role-Based Access Control (RBAC) & Room Bookings
-- ====================================================================

-- 1. Custom Role Enumeration Type
-- Allowed roles: 'student' (default), 'cr', 'faculty', 'hod'
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('student', 'cr', 'faculty', 'hod');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Users Table Schema
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'cr', 'faculty', 'hod')),
    name VARCHAR(255),
    department VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index on email for fast RBAC lookup
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- 3. Room Bookings Table Schema
CREATE TABLE IF NOT EXISTS room_bookings (
    id VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uuid(),
    room_id VARCHAR(100) NOT NULL,
    room_code VARCHAR(50) NOT NULL,
    user_email VARCHAR(255) NOT NULL REFERENCES users(email) ON DELETE CASCADE,
    day VARCHAR(20) NOT NULL CHECK (day IN ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday')),
    start_time VARCHAR(10) NOT NULL,
    end_time VARCHAR(10) NOT NULL,
    course_code VARCHAR(50) NOT NULL,
    course_name VARCHAR(255) NOT NULL,
    instructor VARCHAR(255),
    reason TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for room schedule queries
CREATE INDEX IF NOT EXISTS idx_room_bookings_room_code ON room_bookings(room_code);
CREATE INDEX IF NOT EXISTS idx_room_bookings_user_email ON room_bookings(user_email);
CREATE INDEX IF NOT EXISTS idx_room_bookings_day ON room_bookings(day);

-- 4. Initial Seed Data for NITRR Roles (Demonstration & Verification)
INSERT INTO users (email, role, name, department)
VALUES 
    ('hod.cse@nitrr.ac.in', 'hod', 'Head of Department CSE', 'Computer Science & Engineering'),
    ('faculty.dewangan@nitrr.ac.in', 'faculty', 'Dr. S. K. Dewangan', 'Computer Science & Engineering'),
    ('faculty.koley@nitrr.ac.in', 'faculty', 'Dr. Ebha Koley', 'Electrical Engineering'),
    ('cr.cse.sem6@nitrr.ac.in', 'cr', 'Class Representative (CSE 6th Sem)', 'Computer Science & Engineering'),
    ('cr.it.sem4@nitrr.ac.in', 'cr', 'Class Representative (IT 4th Sem)', 'Information Technology'),
    ('student.rahul@nitrr.ac.in', 'student', 'Rahul Sharma', 'Computer Science & Engineering'),
    ('student.priya@nitrr.ac.in', 'student', 'Priya Patel', 'Electrical Engineering')
ON CONFLICT (email) DO NOTHING;

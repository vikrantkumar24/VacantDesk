# VacantDesk — NIT Raipur Classroom Vacancy Tracker

<p align="center">
  <img src="https://img.shields.io/badge/NIT%20Raipur-CodeUtsava%20X.0-blue?style=for-the-badge&logo=google-classroom" alt="NIT Raipur CodeUtsava X.0" />
  <img src="https://img.shields.io/badge/Team-Runtime%20Terror-red?style=for-the-badge" alt="Runtime Terror" />
  <img src="https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS v4" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/Firebase_Firestore-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase Firestore" />
  <img src="https://img.shields.io/badge/Google_Gemini_AI-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Gemini AI" />
</p>

---

## About the Project

Built this platform collaboratively with our team Runtime Terror for CodeUtsava X.0 at the National Institute of Technology (NIT) Raipur. VacantDesk is designed to solve a genuine daily problem faced across our campus: the time wasted wandering through corridors searching for an empty classroom, computing lab, or seminar hall.

We engineered VacantDesk as a real-time academic infrastructure tracking system. Whether you are a student looking for a quiet study space between lectures, a Class Representative (CR) trying to reserve a hall for an urgent extra class, or a faculty member scheduling a remedial session, our system provides immediate visibility into room vacancies, prevents double-booking clashes through distributed transactional locks, parses university timetable documents using multimodal AI, and dispatches automated approval emails to department heads.

---

## Key Features

### 1. Live Classroom & Lab Vacancy Engine
- **Granular Campus Mapping**: We mapped the primary academic halls and labs across NIT Raipur:
  - **Ground Floor**: `G-01`, `G-02`, `G-11`, `G-12`, `G-31`, and neighboring halls.
  - **First Floor**: `F-39`, `F-40`, `F-41`, `F-42`, `F-43`, `F-45`, `F-54`, `FN-1`, `FN-2`, `FN-4`.
  - **Second Floor**: `S-01`, `S-02`, `S-11`, `S-21`, `S-31`, `SN-2`, `SN-3`, `SN-4`.
  - **Basement & Specialized Labs**: `B-01`, `B-02`, `B-11`, `B-21`, Central Computer Center (CCC), Dr. APJ Abdul Kalam Hall, and Engineering Graphics Drawing Halls (`D3-D4`).
- **Dynamic Status Computation**: Real-time vacancy calculated against the current time slot and day, showing ongoing lecture details, remaining vacant duration, and upcoming scheduled classes.
- **Multi-Variable Filtering**: Filter rooms by floor, wing, minimum capacity, room category (Lecture Hall, Computer Lab, Hardware Lab, Seminar Hall), and equipment amenities (Air Conditioning, Projector, Smart Board, Charging Outlets, Wi-Fi Signal).

### 2. Multi-Tier Role-Based Access Control (RBAC)
We implemented a 4-tier RBAC system enforced both on the client interface and securely at the server API boundary:

| Role | Permissions |
| :--- | :--- |
| **`student`** | Read-only access to live room status, timetable views, room amenities, and automated elevated access requests. |
| **`cr` (Class Rep)** | All student capabilities plus permission to acquire temporary room locks, schedule extra classes, and dispatch HOD notification emails. |
| **`faculty`** | Immediate booking of lecture halls and labs for classes or examinations, priority scheduling, and departmental timetable reviews. |
| **`hod` (Head of Dept)** | Departmental oversight, automated booking dispatch notifications with direct `Reply-To` communication channels. |

### 3. Concurrency Control & Firestore Optimistic Locks
- **Anti-Collision Locking**: Prevents race conditions when two CRs or faculty members attempt to reserve the same vacant hall at the same moment.
- **5-Minute Temporary Hold**: When a user begins booking a room, a Firestore transactional lock updates the room state to `pending` with an active expiration timer.
- **Automatic Expiration**: If the reservation is not finalized within 5 minutes or the user navigates away, the lock is automatically released back to `vacant`.

### 4. AI-Powered Timetable Document Parser (Multimodal Gemini AI)
- **Zero-Friction Ingestion**: Upload official university timetable PDFs, scanned timetable images (PNG/JPG), or paste raw course schedules.
- **Powered by Google Gemini 2.5/3.8 Flash**: Our custom prompt parses complex, multi-column academic schedules, converts periods into standard 24-hour time ranges, normalizes NIT Raipur room codes, and outputs structured JSON.
- **One-Click Batch Import**: Inspect extracted sessions with course codes, instructors, and semesters before merging them directly into the active schedule state.

### 5. Integrated Campus Navigation Assistant & GIS Locator
- Tactical slide-out navigation assistant drawer accessible from anywhere in the application.
- Direct embedded integration with the NIT Raipur Class Locator service (`nitrr-class-locator.netlify.app`).
- One-click copy-to-clipboard for selected room codes, making it seamless to locate halls on campus floor plans.

### 6. Automated HOD Email Notification Dispatcher
- Powered by Nodemailer with configurable SMTP credentials and a graceful logging fallback.
- Compiles formatted booking summaries containing room number, date, time slot, course name, instructor name, and requester details.
- Injects the requester's email into the `Reply-To` header so the Head of Department can approve or respond directly with one click.

### 7. Time Simulation Controller
- Test and inspect campus availability for any day or time (for example, checking Friday afternoon vacancies on a Monday morning).
- Seamless toggle between real-time clock monitoring and custom simulation mode.

---

## Architecture & Tech Stack

```text
┌───────────────────────────────────────────────────────────────┐
│                      Client Layer (React 19)                  │
│   Vite 8 • Tailwind CSS v4 • Lucide Icons • Motion Transitions│
└───────────────▲───────────────────────────────▲───────────────┘
                │                               │
        REST API Calls                  Realtime Snapshots &
     (Booking, AI, Auth)                Transactional Locks
                │                               │
┌───────────────▼───────────────┐   ┌───────────▼───────────────┐
│       Express API Server      │   │     Firebase Firestore    │
│  • RBAC Enforcement Gate      │   │  • Real-time Room Locks   │
│  • Gemini Multimodal Parser   │   │  • Live Room Status Sync  │
│  • Nodemailer HOD Dispatcher  │   │  • Anti-Collision Engine  │
└───────────────────────────────┘   └───────────────────────────┘
```

### Frontend
- **Framework**: React 19 + Vite 8
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons & Animation**: Lucide React, Motion

### Backend
- **Server**: Express 4.21 running via `tsx`
- **AI Engine**: Google GenAI SDK (`@google/genai`) with Gemini Multimodal Flash
- **Database & Realtime**: Firebase Firestore + Local structured JSON fallback store
- **Email Service**: Nodemailer

---

## Project Structure

```text
├── server.ts                       # Express backend server (RBAC, AI parser, email dispatch)
├── package.json                    # Project dependencies and build scripts
├── index.html                      # HTML entry point with typography & meta tags
├── vite.config.ts                  # Vite + Tailwind v4 configuration
├── firebase-applet-config.json     # Firebase project client configuration
├── firestore.rules                 # Cloud Firestore security rules
├── data-store.json                 # Persistent file-based store for test records & users
├── src/
│   ├── main.tsx                    # React client entry point
│   ├── App.tsx                     # Main dashboard controller and navigation
│   ├── index.css                   # Global styles & design system
│   ├── roleConfig.js               # Institute email-to-role mappings (RBAC)
│   ├── components/
│   │   ├── ClassroomExplorer.tsx   # Room grid view, floor filters, and capacity metrics
│   │   ├── RoomCard.tsx            # Room card with status badges, amenities & timers
│   │   ├── RoomDetailModal.tsx     # Room inspection modal with full weekly schedule
│   │   ├── TimetableMatrix.tsx     # Department-wide weekly timetable matrix
│   │   ├── TimetableImportModal.tsx# Gemini AI document parser modal (PDF/Images/Text)
│   │   ├── TimeController.tsx      # Live vs. simulated time & day selector
│   │   ├── NavigationAssistant.tsx # Slide-out campus GIS map & room locator
│   │   ├── BookingConfirmation.tsx # Booking form with optimistic lock countdown
│   │   ├── BookingSuccessConfirmation.tsx # Confirmation receipt view
│   │   ├── SavedClassesView.tsx    # User's bookmarked & scheduled classes
│   │   ├── LoginScreen.tsx         # Institute authentication screen
│   │   └── GoogleSignInButton.tsx  # Google Workspace authentication button
│   ├── context/
│   │   └── AuthContext.tsx         # User authentication state provider
│   ├── data/
│   │   ├── campusData.ts           # Core room schemas, capacity & helper functions
│   │   ├── nitRaipurAllRooms.ts    # Comprehensive master list of NIT Raipur rooms
│   │   ├── nitRaipurGroundRooms.ts # Ground floor room schedules
│   │   ├── nitRaipurFirstFloorRooms.ts  # 1st floor room schedules
│   │   ├── nitRaipurSecondFloorRooms.ts # 2nd floor room schedules
│   │   ├── nitRaipurBasementRooms.ts    # Basement & lab schedules
│   │   └── cseTimetable.ts         # Branch timetable dataset
│   ├── db/
│   │   └── database.ts             # Persistence layer for user roles and bookings
│   └── services/
│       ├── authService.ts          # Firebase Authentication bridge
│       ├── emailService.ts         # Nodemailer automated HOD & access alert dispatch
│       └── roomRealtimeService.ts  # Distributed Firestore transaction lock manager
```

---

## Quick Start Guide

### Prerequisites
- Node.js v18.0.0 or higher
- npm, yarn, or bun
- (Optional) A Google Gemini API Key for timetable document parsing.

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/vacantdesk.git
cd vacantdesk
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy the example environment file and configure your keys:
```bash
cp .env.example .env
```

Edit `.env`:
```env
# Google Gemini API Key (Required for AI Timetable Document Parsing)
GEMINI_API_KEY="your_gemini_api_key_here"

# Application URL
APP_URL="http://localhost:3000"

# (Optional) SMTP Configuration for HOD Notification Emails
# If omitted, notifications log to server console via jsonTransport
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-institute-alerts@gmail.com"
SMTP_PASS="your-app-password"
```

### 4. Run the Development Server
```bash
npm run dev
```

The application will launch at `http://localhost:3000`.

### 5. Production Build
```bash
npm run build
npm start
```

---

## API Reference

### Timetable Ingestion
- `POST /api/timetable/parse-document`
  - **Body**: `{ "fileBase64": "...", "mimeType": "application/pdf" }` or `{ "text": "..." }`
  - **Description**: Uses Gemini Flash to parse lecture schedules, teachers, and timings into structured JSON.

### Room Booking & RBAC
- `POST /api/book-room`
  - **Headers**: `Content-Type: application/json`
  - **Body**:
    ```json
    {
      "email": "cr.cse.sem6@nitrr.ac.in",
      "roomCode": "F-40",
      "day": "Wednesday",
      "startTime": "15:00",
      "endTime": "16:00",
      "courseCode": "CS302",
      "courseName": "Operating Systems Lab",
      "reason": "Remedial Practical"
    }
    ```
  - **Enforcement**: Returns `403 Forbidden` if user role is not `cr`, `faculty`, or `hod`.
- `GET /api/book-room?roomCode=F-40`
  - **Description**: Fetches active bookings for a specific room or all rooms.

### User & Role Management
- `GET /api/user-role?email=user@nitrr.ac.in`
  - **Description**: Returns the resolved RBAC profile for the specified institute email.
- `POST /api/request-access`
  - **Body**: `{ "studentName": "Rahul Verma", "studentEmail": "rverma@nitrr.ac.in" }`
  - **Description**: Automatically submits an access upgrade request and alerts the administrator.

---

## Pre-Configured Test Accounts

For testing and demonstration, our system includes pre-configured institute accounts:

| Email | Assigned Role | Capabilities |
| :--- | :--- | :--- |
| `cr.cse.sem6@nitrr.ac.in` | **CR** | Booking extra classes, lock acquisition |
| `faculty.dewangan@nitrr.ac.in` | **Faculty** | Lecture hall booking & scheduling |
| `hod.cse@nitrr.ac.in` | **HOD** | Department oversight, email notification receiver |
| `student.rahul@nitrr.ac.in` | **Student** | Live vacancy search & access request |

---

## Hackathon Submission Details

- **Event**: CodeUtsava X.0
- **Organized by**: National Institute of Technology (NIT) Raipur
- **Team**: **Runtime Terror**
- **Domain**: Smart Campus / Academic Infrastructure Automation

---

## License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<p align="center">
  Built collaboratively by <b>Team Runtime Terror</b> for <b>NIT Raipur</b>
</p>

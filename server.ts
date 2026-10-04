import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { db, UserRole } from './src/db/database.ts';
import { sendBookingNotificationToHOD, sendAccessRequestEmail } from './src/services/emailService.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
function getArg(flag: string): string | undefined {
  const index = process.argv.indexOf(flag);
  return index !== -1 && index + 1 < process.argv.length ? process.argv[index + 1] : undefined;
}

const PORT = Number(process.env.PORT) || Number(getArg('--port')) || Number(getArg('-p')) || 3000;
const HOST = process.env.HOST || getArg('--host') || '0.0.0.0';
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '25mb' }));

// Health check endpoint for dev server and cloud container probes
app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

// Initialize Gemini SDK with recommended telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// AI Timetable Document Parser (PDF, Image, or Raw Text)
app.post('/api/timetable/parse-document', async (req, res) => {
  try {
    const { text, fileBase64, mimeType } = req.body;

    if (!text && !fileBase64) {
      return res.status(400).json({ error: 'Please provide either text or fileBase64.' });
    }

    const systemInstruction = `You are a specialized university timetable and schedule parser for NIT Raipur.
Analyze the provided timetable document (PDF, timetable image, or raw text) and extract every lecture, laboratory, or tutorial session.
IMPORTANT ROOM CODE RULES:
The codes like G-XX, F-XX, B-XX, S-XX, FN-X, SN-X are university room numbers.
- "G-XX" (e.g. G-01, G-02, G-11, G-12, G-31) = Ground Floor classrooms
- "F-XX" (e.g. F-39, F-40, F-41, F-42, F-43, F-45, F-54) = First Floor classrooms
- "S-XX" (e.g. S-01, S-02, S-11, S-21, S-31) = Second Floor classrooms
- "B-XX" (e.g. B-01, B-02, B-11, B-21) = Basement / Lower Level Block B classrooms
- "FN-X" (e.g. FN-1, FN-2, FN-4) = First Floor North Wing classrooms
- "SN-X" (e.g. SN-2, SN-3, SN-4) = Second Floor North Wing classrooms
- "CCC" = Central Computer Center & Language Lab
- "APJ" or "APJ-HALL" = Dr. APJ Abdul Kalam Hall
- "D3-D4" or "D3D4" = Engineering Graphics Drawing Hall
Always accurately extract and assign these room codes into the "roomCode" property (normalized, e.g. "G-01", "F-40", "S-02", "B-11", "FN-1", "SN-2").

Return a clean JSON object strictly conforming to this schema:
{
  "classes": [
    {
      "roomCode": string (e.g. "G-01", "F-40", "S-02", "B-11", "FN-1", "SN-2", "F-42", "CCC"),
      "day": "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday",
      "startTime": string in 24h format (e.g. "09:00", "09:50", "14:10"),
      "endTime": string in 24h format (e.g. "09:50", "10:40", "15:00"),
      "courseCode": string (e.g. "CS201", "EE301", "ME201"),
      "courseName": string (e.g. "Data Structures", "Network Theory", "Thermodynamics"),
      "instructor": string (e.g. "Dr. S. K. Dewangan", "Dr. Ebha Koley" or "Faculty"),
      "branch": "CSE" | "IT" | "ECE" | "EEE" | "MECH" | "CIVIL" | "Chemical" | "Metallurgy" | "Bio-Medical" | "Bio-Tech" | "Mining" | "Multi-disciplinary",
      "degree": "B.Tech" | "M.Tech" | "Ph.D." | "Faculty/Admin",
      "year": "1st Year" | "2nd Year" | "3rd Year" | "4th Year",
      "batch": string (optional, e.g. "3rd Sem", "5th Sem", "7th Sem", "Section A", "All")
    }
  ]
}
Rules:
- Infer the branch and degree if obvious from course codes (e.g. CS -> CSE, IT -> IT, EC -> ECE, EE -> EEE, ME -> MECH, CE -> CIVIL, CH -> Chemical, MM -> Metallurgy, BM -> Bio-Medical, BT -> Bio-Tech, MN -> Mining).
- Normalize start and end times to valid 24h format HH:MM (e.g., "9:00 AM" -> "09:00", "2:00 PM" -> "14:00").
- If times are given as single period slots (e.g. "Period 1: 9-10"), make startTime "09:00" and endTime "10:00".
- Extract all sessions accurately.`;

    const contents: any[] = [];
    if (fileBase64 && mimeType) {
      contents.push({
        inlineData: {
          data: fileBase64.replace(/^data:[^;]+;base64,/, ''),
          mimeType: mimeType,
        },
      });
      contents.push('Please parse and extract all timetable entries from this document into structured JSON format.');
    } else if (text) {
      contents.push(`Please parse and extract all timetable entries from this text into structured JSON format:\n\n${text}`);
    }

    const hasValidKey = process.env.GEMINI_API_KEY && 
      process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY' &&
      process.env.GEMINI_API_KEY.length > 5;

    if (!hasValidKey) {
      return res.status(400).json({ error: 'Gemini API key is not configured.' });
    }

    const geminiResponse: any = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: 'application/json',
        temperature: 0.1,
      },
    });

    const parsed = JSON.parse(geminiResponse.text || '{}');
    return res.json({ success: true, classes: parsed.classes || [] });
  } catch (error: any) {
    console.error('Document timetable parse error:', error);
    return res.status(500).json({ error: error.message || 'Failed to parse timetable document' });
  }
});

// RBAC: Fetch or initialize user profile & role
app.get('/api/user-role', (req, res) => {
  const email = (req.query.email as string) || '';
  if (!email) {
    return res.status(400).json({ error: 'Email parameter is required.' });
  }
  const user = db.ensureUser(email);
  return res.json({
    email: user.email,
    role: user.role,
    name: user.name,
    department: user.department,
  });
});

// RBAC: Update user role (for testing & administration)
app.post('/api/user-role', (req, res) => {
  const { email, role } = req.body;
  if (!email || !role) {
    return res.status(400).json({ error: 'Both email and role are required.' });
  }
  const validRoles: UserRole[] = ['student', 'cr', 'faculty', 'hod'];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ 
      error: `Invalid role '${role}'. Allowed roles are: ${validRoles.join(', ')}` 
    });
  }
  const updated = db.updateUserRole(email, role);
  return res.json({ success: true, user: updated });
});

// 3. Backend Protection: POST /api/book-room
// Before processing the booking insertion, the endpoint must check the database
// to ensure the requesting user's email actually holds the 'cr' or 'faculty' role.
// Return a 403 Forbidden status if they do not.
app.post('/api/book-room', (req, res) => {
  try {
    const { 
      email, 
      roomId, 
      roomCode, 
      day, 
      startTime, 
      endTime, 
      courseCode, 
      courseName, 
      instructor, 
      reason 
    } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'User email is required to book a room.' });
    }

    if (!roomCode || !day || !startTime || !endTime || !courseCode || !courseName) {
      return res.status(400).json({ 
        error: 'Missing required booking fields (roomCode, day, startTime, endTime, courseCode, courseName).' 
      });
    }

    // 1. Check the database to ensure the requesting user's email actually holds 'cr' or 'faculty'
    const user = db.getUserByEmail(email);
    const userRole = user ? user.role : 'student';

    // 2. Strict RBAC Gate: Return 403 Forbidden if they do not
    if (userRole !== 'cr' && userRole !== 'faculty' && userRole !== 'hod') {
      console.warn(`[RBAC REJECTION 403] User '${email}' with role '${userRole}' rejected from booking.`);
      return res.status(403).json({
        error: "Forbidden: Only Class Representatives ('cr'), Faculty members ('faculty'), and Head of Department ('hod') are authorized to book extra classes.",
        userRole: userRole,
        allowedRoles: ['cr', 'faculty', 'hod']
      });
    }

    // 3. Process the booking insertion in the database
    const booking = db.createBooking({
      roomId: roomId || roomCode.toLowerCase(),
      roomCode,
      userEmail: email.toLowerCase(),
      day,
      startTime,
      endTime,
      courseCode,
      courseName,
      instructor: instructor || (user?.name ? user.name : 'Faculty / CR'),
      reason: reason || 'Extra Class'
    });

    console.log(`[RBAC ACCEPT 201] Extra class booked by ${email} (${userRole}) for ${roomCode}`);

    return res.status(201).json({
      success: true,
      message: `Extra class for ${courseCode} successfully booked in room ${roomCode}.`,
      booking
    });
  } catch (error: any) {
    console.error('Room booking error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error while booking room.' });
  }
});

// Fetch active room bookings
app.get('/api/book-room', (req, res) => {
  const roomCode = req.query.roomCode as string | undefined;
  const bookings = db.getBookings(roomCode);
  return res.json({ bookings });
});

// Developer reset locks endpoint
app.post('/api/dev-reset-locks', (req, res) => {
  try {
    return res.json({ success: true, message: 'All locks reset' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Student Access Request: Sends automated email to administrator (admin@nitrr.ac.in)
app.post('/api/request-access', async (req, res) => {
  try {
    const { studentName, studentEmail } = req.body;
    if (!studentEmail) {
      return res.status(400).json({ error: 'Student email is required.' });
    }

    const name = studentName || studentEmail.split('@')[0];
    const emailResult = await sendAccessRequestEmail({
      studentName: name,
      studentEmail,
      adminEmail: 'admin@nitrr.ac.in',
    });

    console.log(`[ACCESS REQUEST] Automated alert sent to admin@nitrr.ac.in for ${name} (${studentEmail})`);

    return res.status(200).json({
      success: true,
      message: `Access request submitted. Notification sent to system administrator.`,
      emailResult,
    });
  } catch (error: any) {
    console.error('Access request error:', error);
    return res.status(500).json({ error: error.message || 'Failed to submit access request' });
  }
});

// Setup Vite or static serving
async function startServer() {
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, HOST, () => {
    console.log(`CampusPulse server running on http://${HOST}:${PORT}`);
  });
}

startServer();

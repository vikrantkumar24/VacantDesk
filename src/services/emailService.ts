import nodemailer from 'nodemailer';

export interface BookingEmailOptions {
  roomNumber: string;
  date: string;
  time: string;
  subject: string;
  crName: string;
  crEmail: string;
  hodEmail: string;
}

// Configurable Nodemailer transporter
// Supports custom SMTP credentials via environment variables or test transport fallback
const createTransporter = () => {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (host && user && pass) {
    return nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });
  }

  // Development / fallback stream transport to guarantee delivery logging without crashing
  return nodemailer.createTransport({
    jsonTransport: true,
  });
};

const transporter = createTransporter();

/**
 * Backend service function to automatically send an email to the Head of Department (HOD)
 * when a room is successfully booked.
 * 
 * Supports both argument lists:
 * 1) (roomNumber, date, time, subject, crName, crEmail, hodEmail)
 * 2) ({ roomNumber, date, time, subject, crName, crEmail, hodEmail })
 * 
 * Sets Reply-To to crEmail so the HOD can reply directly to the student/faculty requester.
 * Handled in a try/catch block so delivery issues never crash the room booking flow.
 */
export async function sendBookingNotificationToHOD(
  roomNumberOrOptions: string | BookingEmailOptions,
  dateArg?: string,
  timeArg?: string,
  subjectArg?: string,
  crNameArg?: string,
  crEmailArg?: string,
  hodEmailArg?: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  let roomNumber: string;
  let date: string;
  let time: string;
  let subject: string;
  let crName: string;
  let crEmail: string;
  let hodEmail: string;

  if (typeof roomNumberOrOptions === 'object') {
    roomNumber = roomNumberOrOptions.roomNumber;
    date = roomNumberOrOptions.date;
    time = roomNumberOrOptions.time;
    subject = roomNumberOrOptions.subject;
    crName = roomNumberOrOptions.crName;
    crEmail = roomNumberOrOptions.crEmail;
    hodEmail = roomNumberOrOptions.hodEmail;
  } else {
    roomNumber = roomNumberOrOptions;
    date = dateArg || '';
    time = timeArg || '';
    subject = subjectArg || '';
    crName = crNameArg || '';
    crEmail = crEmailArg || '';
    hodEmail = hodEmailArg || '';
  }

  // Fallback defaults if any string is missing
  const fromAddress = process.env.EMAIL_FROM || '"CampusPulse Room Tracker" <notifications@nitrr.ac.in>';
  const targetHodEmail = hodEmail || 'hod.cse@nitrr.ac.in';

  // 3. Exact Email Subject
  const emailSubject = `Room Booking Alert: ${roomNumber} for Extra Class`;

  // 4. Exact Email HTML Body
  const emailHtml = `Respected Sir/Ma'am, <br><br> Room ${roomNumber} has been reserved for an extra class on ${date} at ${time} by ${crName} for ${subject}. <br><br> This is an automated notification from CampusPulse.`;

  const emailText = `Respected Sir/Ma'am,\n\nRoom ${roomNumber} has been reserved for an extra class on ${date} at ${time} by ${crName} for ${subject}.\n\nThis is an automated notification from CampusPulse.`;

  // 5. Try/Catch block to handle and log email delivery failures without crashing booking process
  try {
    const info = await transporter.sendMail({
      from: fromAddress,
      to: targetHodEmail,
      replyTo: crEmail, // 2. Reply-To set to crEmail so HOD can reply directly
      subject: emailSubject,
      text: emailText,
      html: emailHtml,
      headers: {
        'Reply-To': crEmail,
        'X-CampusPulse-Booking-Room': roomNumber,
        'X-CampusPulse-Requester': crEmail,
      },
    });

    console.log(`[EMAIL DISPATCH SUCCESS] HOD alert sent to ${targetHodEmail} for Room ${roomNumber}. Reply-To: ${crEmail}`);
    if (info?.message) {
      console.log(`[EMAIL PAYLOAD PREVIEW]:\n${info.message}`);
    }

    return {
      success: true,
      messageId: info.messageId || 'mock-msg-id',
    };
  } catch (error: any) {
    // Log failure without rethrowing so booking process remains uninterrupted
    console.error(
      `[EMAIL DISPATCH FAILURE] Could not send booking notification to HOD (${targetHodEmail}) for Room ${roomNumber}:`,
      error
    );

    return {
      success: false,
      error: error.message || 'Unknown email delivery error',
    };
  }
}

/**
 * Backend service function to send an automated access request email to the system administrator
 * when a student requests elevated privileges (CR / Faculty Access).
 */
export async function sendAccessRequestEmail({
  studentName,
  studentEmail,
  adminEmail = 'admin@nitrr.ac.in',
}: {
  studentName: string;
  studentEmail: string;
  adminEmail?: string;
}): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const fromAddress = process.env.EMAIL_FROM || '"VacantDesk System" <notifications@nitrr.ac.in>';
  const emailSubject = `Access Request: ${studentName} (${studentEmail})`;
  const emailBody = `Access Request: ${studentName} (${studentEmail}) has requested elevated privileges for VacantDesk. Please review in the admin console.`;

  try {
    const info = await transporter.sendMail({
      from: fromAddress,
      to: adminEmail,
      replyTo: studentEmail,
      subject: emailSubject,
      text: emailBody,
      html: `<p style="font-family: sans-serif; font-size: 14px; line-height: 1.6; color: #0F172A;">${emailBody}</p>`,
      headers: {
        'Reply-To': studentEmail,
        'X-VacantDesk-Access-Request': studentEmail,
      },
    });

    console.log(`[ACCESS REQUEST EMAIL SUCCESS] Admin alert sent to ${adminEmail} for ${studentName} (${studentEmail})`);
    if (info?.message) {
      console.log(`[EMAIL PAYLOAD PREVIEW]:\n${info.message}`);
    }

    return {
      success: true,
      messageId: info.messageId || 'mock-msg-id',
    };
  } catch (error: any) {
    console.error(`[ACCESS REQUEST EMAIL FAILURE] Could not send access request to ${adminEmail}:`, error);
    return {
      success: false,
      error: error.message || 'Unknown email delivery error',
    };
  }
}


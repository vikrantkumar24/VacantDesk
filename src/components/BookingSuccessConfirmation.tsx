import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Share2, 
  Copy, 
  Check, 
  Calendar, 
  Clock, 
  MapPin, 
  BookOpen, 
  ExternalLink,
  Mail
} from 'lucide-react';

export interface BookingDetails {
  roomNumber: string;
  date: string;
  time: string;
  subject: string;
  courseCode?: string;
  crName?: string;
  instructor?: string;
  reason?: string;
  mailtoLink?: string;
}

interface BookingSuccessConfirmationProps {
  booking: BookingDetails;
  onClose: () => void;
  onBookAnother?: () => void;
}

export const generateWhatsAppBookingMessage = (booking: BookingDetails): string => {
  const rawMessage = `🚨 *Extra Class Alert* 🚨\n\nRoom: ${booking.roomNumber}\nDate: ${booking.date}\nTime: ${booking.time}\nSubject: ${booking.subject}\n\nPlease be on time.`;
  return encodeURIComponent(rawMessage);
};

export const getWhatsAppShareUrl = (booking: BookingDetails): string => {
  const encodedText = generateWhatsAppBookingMessage(booking);
  return `https://wa.me/?text=${encodedText}`;
};

export const BookingSuccessConfirmation: React.FC<BookingSuccessConfirmationProps> = ({
  booking,
  onClose,
  onBookAnother,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleNotifyWhatsApp = () => {
    const shareUrl = getWhatsAppShareUrl(booking);
    try {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    } catch (e) {
      console.error('Failed to open window, redirecting location instead', e);
      window.location.href = shareUrl;
    }
  };

  const handleCopyMessage = async () => {
    const rawMessage = `🚨 *Extra Class Alert* 🚨\n\nRoom: ${booking.roomNumber}\nDate: ${booking.date}\nTime: ${booking.time}\nSubject: ${booking.subject}\n\nPlease be on time.`;
    try {
      await navigator.clipboard.writeText(rawMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Clipboard copy error:', err);
    }
  };

  const rawPreviewMessage = `🚨 *Extra Class Alert* 🚨\n\nRoom: ${booking.roomNumber}\nDate: ${booking.date}\nTime: ${booking.time}\nSubject: ${booking.subject}\n\nPlease be on time.`;

  return (
    <div className="bg-[#F4EBD9] border-2 border-[#1A1A1A] rounded-md p-6 max-w-lg w-full mx-auto space-y-5 text-[#1A1A1A] shadow-[6px_6px_0px_0px_#1A1A1A] animate-fade-in-up">
      
      {/* 1. Success Icon & Header */}
      <div className="text-center space-y-2">
        <div className="w-14 h-14 rounded-md bg-[#1A1A1A] border-2 border-[#1A1A1A] text-[#F4EBD9] flex items-center justify-center mx-auto shadow-[3px_3px_0px_0px_#1A1A1A]">
          <CheckCircle2 className="w-8 h-8 text-[#F4EBD9]" />
        </div>
        <h3 className="text-xl font-black text-[#1A1A1A] tracking-tight uppercase">
          Booking Confirmed!
        </h3>
        <p className="text-xs font-semibold text-[#1A1A1A]/80 leading-relaxed max-w-sm mx-auto">
          Classroom locked in database. Notifying Department Head via official client.
        </p>
      </div>

      {/* 2. Summary Bento */}
      <div className="bg-[#EADBBE] border-2 border-[#1A1A1A] rounded-md p-4 space-y-3 text-xs">
        <div className="flex items-center justify-between pb-2 border-b-2 border-[#1A1A1A]">
          <span className="font-black text-[#1A1A1A] uppercase tracking-wider text-[11px]">
            Reservation Summary
          </span>
          <span className="px-2 py-0.5 bg-[#1A1A1A] text-[#F4EBD9] rounded-xs font-mono font-bold text-[10px] uppercase">
            CONFIRMED
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-[#1A1A1A] shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] font-bold uppercase text-[#1A1A1A]/70 block">Room</span>
              <strong className="text-base font-black text-[#1A1A1A]">{booking.roomNumber}</strong>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Calendar className="w-4 h-4 text-[#1A1A1A] shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] font-bold uppercase text-[#1A1A1A]/70 block">Day / Date</span>
              <strong className="text-sm font-black text-[#1A1A1A]">{booking.date}</strong>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Clock className="w-4 h-4 text-[#1A1A1A] shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] font-bold uppercase text-[#1A1A1A]/70 block">Time Slot</span>
              <strong className="text-xs font-black text-[#1A1A1A] font-mono">{booking.time}</strong>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <BookOpen className="w-4 h-4 text-[#1A1A1A] shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] font-bold uppercase text-[#1A1A1A]/70 block">Subject</span>
              <strong className="text-xs font-black text-[#1A1A1A] truncate block max-w-[150px]" title={booking.subject}>
                {booking.subject}
              </strong>
            </div>
          </div>
        </div>

        {booking.crName && (
          <div className="pt-2 border-t-2 border-[#1A1A1A] flex items-center justify-between text-[11px] font-medium text-[#1A1A1A]">
            <span>Booked by: <strong className="font-black">{booking.crName}</strong></span>
            {booking.reason && <span className="italic truncate max-w-[180px] font-bold">{booking.reason}</span>}
          </div>
        )}
      </div>

      {/* WhatsApp Broadcast Preview Box */}
      <div className="bg-[#F4EBD9] border-2 border-[#1A1A1A] rounded-md p-3.5 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-wider text-[#1A1A1A] flex items-center gap-1.5">
            <Share2 className="w-3.5 h-3.5 text-[#1A1A1A]" />
            Broadcast Notification Preview
          </span>
          <button
            onClick={handleCopyMessage}
            className="inline-flex items-center gap-1 text-xs font-bold uppercase text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F4EBD9] px-2 py-0.5 border border-[#1A1A1A] rounded-xs transition cursor-pointer"
            title="Copy pre-formatted broadcast message"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
        <pre className="text-[11px] font-mono whitespace-pre-wrap bg-[#EADBBE] p-3 rounded-md border-2 border-[#1A1A1A] text-[#1A1A1A] leading-relaxed">
          {rawPreviewMessage}
        </pre>
      </div>

      {/* Tactile Action Buttons */}
      <div className="space-y-2.5 pt-1">
        {booking.mailtoLink && (
          <a
            href={booking.mailtoLink}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-md font-bold uppercase tracking-wider text-xs text-[#F4EBD9] bg-[#1A1A1A] border-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all text-center cursor-pointer"
          >
            <Mail className="w-4 h-4 text-[#F4EBD9]" />
            <span>Open Email Client (HOD Notice)</span>
          </a>
        )}

        <button
          onClick={handleNotifyWhatsApp}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-md font-bold uppercase tracking-wider text-xs text-[#1A1A1A] bg-[#EADBBE] hover:bg-[#1A1A1A] hover:text-[#F4EBD9] border-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer"
          title="Open WhatsApp with pre-filled message"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.586 1.761.88 2.791.88 3.181 0 5.768-2.587 5.768-5.766.001-3.18-2.585-5.766-5.768-5.766zm9.969 5.766c0 5.518-4.482 10-10 10-1.744 0-3.377-.449-4.808-1.235l-7.192 1.884 1.916-6.993c-.873-1.474-1.378-3.195-1.378-5.029 0-5.518 4.482-10 10-10 5.518 0 10 4.482 10 10z" />
          </svg>
          <span>Notify Batch on WhatsApp</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>

        {/* Modal Secondary Actions */}
        <div className="flex items-center justify-between gap-3 pt-2">
          {onBookAnother && (
            <button
              onClick={onBookAnother}
              className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] hover:underline cursor-pointer"
            >
              Book Another Room
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-auto px-5 py-2 text-xs font-bold uppercase tracking-wider text-[#1A1A1A] bg-[#F4EBD9] hover:bg-[#EADBBE] border-2 border-[#1A1A1A] rounded-md shadow-[3px_3px_0px_0px_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px] cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>

    </div>
  );
};

export const BookingConfirmation = BookingSuccessConfirmation;
export const BookingSuccessful = BookingSuccessConfirmation;
export default BookingConfirmation;

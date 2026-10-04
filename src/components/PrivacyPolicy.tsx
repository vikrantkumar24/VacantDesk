import React from 'react';
import { 
  ShieldCheck, 
  KeyRound, 
  Mail, 
  Zap, 
  EyeOff, 
  ArrowLeft,
  CheckCircle,
  Server,
  Lock,
  ExternalLink
} from 'lucide-react';

interface PrivacyPolicyProps {
  onBackToClassrooms?: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBackToClassrooms }) => {
  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
      
      {/* 1. Hero Header Banner */}
      <div className="bg-[#F4EBD9] border-2 border-[#1A1A1A] rounded-md p-6 sm:p-8 shadow-[4px_4px_0px_0px_#1A1A1A]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-[#1A1A1A] pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1A1A1A] text-[#F4EBD9] text-xs font-black uppercase tracking-wider rounded-none">
              <ShieldCheck className="w-4 h-4 text-[#F4EBD9]" />
              <span>Security & Data Architecture</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#1A1A1A]">
              The VacantDesk Data Promise
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-[#1A1A1A]/80 max-w-2xl leading-relaxed">
              Designed for NIT Raipur: zero sensitive credential storage, zero unauthorized behavioral tracking, and 100% native client handoff.
            </p>
          </div>

          {onBackToClassrooms && (
            <button
              onClick={onBackToClassrooms}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#F4EBD9] hover:bg-[#EADBBE] text-[#1A1A1A] font-bold text-xs uppercase tracking-wider border-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#1A1A1A] transition-all cursor-pointer shrink-0 self-start sm:self-auto"
            >
              <ArrowLeft className="w-4 h-4 text-[#1A1A1A]" />
              <span>Back to Classrooms</span>
            </button>
          )}
        </div>

        {/* Quick Verification Matrix Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-2">
          <div className="bg-[#EADBBE] border-2 border-[#1A1A1A] p-2.5 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#1A1A1A] shrink-0" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A]">OAuth 2.0 Only</span>
          </div>
          <div className="bg-[#EADBBE] border-2 border-[#1A1A1A] p-2.5 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#1A1A1A] shrink-0" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A]">No SMTP Secrets</span>
          </div>
          <div className="bg-[#EADBBE] border-2 border-[#1A1A1A] p-2.5 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#1A1A1A] shrink-0" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A]">120s Lock TTL</span>
          </div>
          <div className="bg-[#EADBBE] border-2 border-[#1A1A1A] p-2.5 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#1A1A1A] shrink-0" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A]">Zero Telemetry Ads</span>
          </div>
        </div>
      </div>

      {/* 2. 2x2 Bento Grid with the 4 Privacy Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Pillar A: Zero-Password Infrastructure */}
        <div className="bg-[#F4EBD9] border-2 border-[#1A1A1A] rounded-md p-6 sm:p-7 shadow-[4px_4px_0px_0px_#1A1A1A] flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-[#1A1A1A] text-[#F4EBD9] flex items-center justify-center border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A]">
                <KeyRound className="w-6 h-6 text-[#F4EBD9]" />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 border-2 border-[#1A1A1A] bg-[#EADBBE] text-[#1A1A1A]">
                PILLAR 01
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight text-[#1A1A1A] flex items-center gap-2">
              <span>🔐 Zero-Password Infrastructure</span>
            </h3>

            <p className="text-sm font-semibold text-[#1A1A1A]/90 leading-relaxed">
              We do not store passwords. Authentication is handled exclusively through Google Workspace.
            </p>
          </div>

          <div className="pt-4 border-t-2 border-[#1A1A1A] text-xs font-medium text-[#1A1A1A]/80 leading-snug space-y-1">
            <p>
              • All sign-ins use official cryptographically signed NIT Raipur ID tokens (<code className="font-mono text-[11px] bg-[#EADBBE] px-1 border border-[#1A1A1A]">@nitrr.ac.in</code>).
            </p>
            <p>
              • No user passwords, hashes, or recovery questions ever touch VacantDesk databases.
            </p>
          </div>
        </div>

        {/* Pillar B: Native Client Handoff (Inverted Scheme: bg-[#1A1A1A] text-[#F4EBD9]) */}
        <div className="bg-[#1A1A1A] text-[#F4EBD9] border-2 border-[#1A1A1A] rounded-md p-6 sm:p-7 shadow-[4px_4px_0px_0px_#1A1A1A] flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-[#F4EBD9] text-[#1A1A1A] flex items-center justify-center border-2 border-[#F4EBD9] shadow-[2px_2px_0px_0px_#F4EBD9]">
                <Mail className="w-6 h-6 text-[#1A1A1A]" />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 border-2 border-[#F4EBD9] bg-[#F4EBD9] text-[#1A1A1A]">
                PILLAR 02 · ZERO SMTP
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight text-[#F4EBD9] flex items-center gap-2">
              <span>📬 Native Client Handoff</span>
            </h3>

            <p className="text-sm font-semibold text-[#F4EBD9]/90 leading-relaxed">
              VacantDesk drafts the request and hands it to your native email client. We do not use vulnerable SMTP backend servers.
            </p>
          </div>

          <div className="pt-4 border-t-2 border-[#F4EBD9]/30 text-xs font-medium text-[#F4EBD9]/80 leading-snug space-y-1">
            <p>
              • Booking emails to HODs and faculty are dispatched via system <code className="font-mono text-[11px] bg-[#2A2A2A] px-1 border border-[#F4EBD9]/40 text-[#F4EBD9]">mailto:</code> protocol.
            </p>
            <p>
              • Eliminates email relay exploits, phishing vectors, and unauthorized proxy spoofing.
            </p>
          </div>
        </div>

        {/* Pillar C: Ephemeral Locks */}
        <div className="bg-[#F4EBD9] border-2 border-[#1A1A1A] rounded-md p-6 sm:p-7 shadow-[4px_4px_0px_0px_#1A1A1A] flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-[#1A1A1A] text-[#F4EBD9] flex items-center justify-center border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A]">
                <Zap className="w-6 h-6 text-[#F4EBD9]" />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 border-2 border-[#1A1A1A] bg-[#EADBBE] text-[#1A1A1A]">
                PILLAR 03
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight text-[#1A1A1A] flex items-center gap-2">
              <span>⚡ Ephemeral Locks</span>
            </h3>

            <p className="text-sm font-semibold text-[#1A1A1A]/90 leading-relaxed">
              Our real-time concurrency engine tracks active sessions to prevent double-booking, but locks are ephemeral and wipe upon completion.
            </p>
          </div>

          <div className="pt-4 border-t-2 border-[#1A1A1A] text-xs font-medium text-[#1A1A1A]/80 leading-snug space-y-1">
            <p>
              • Active reservation holds expire automatically after 120 seconds if abandoned.
            </p>
            <p>
              • Room records revert to <code className="font-mono text-[11px] bg-[#EADBBE] px-1 border border-[#1A1A1A]">vacant</code> immediately without lingering session debris.
            </p>
          </div>
        </div>

        {/* Pillar D: Transparent Telemetry */}
        <div className="bg-[#F4EBD9] border-2 border-[#1A1A1A] rounded-md p-6 sm:p-7 shadow-[4px_4px_0px_0px_#1A1A1A] flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-[#1A1A1A] text-[#F4EBD9] flex items-center justify-center border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A]">
                <EyeOff className="w-6 h-6 text-[#F4EBD9]" />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 border-2 border-[#1A1A1A] bg-[#EADBBE] text-[#1A1A1A]">
                PILLAR 04
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight text-[#1A1A1A] flex items-center gap-2">
              <span>👁️ Transparent Telemetry</span>
            </h3>

            <p className="text-sm font-semibold text-[#1A1A1A]/90 leading-relaxed">
              We track utilization rates to improve the matrix, but never track behavioral analytics or personal navigation paths.
            </p>
          </div>

          <div className="pt-4 border-t-2 border-[#1A1A1A] text-xs font-medium text-[#1A1A1A]/80 leading-snug space-y-1">
            <p>
              • No cross-site trackers, cookies from ad-networks, or screen-recording telemetry scripts.
            </p>
            <p>
              • Local preferences (like bookmarks) reside safely in your browser's private local storage.
            </p>
          </div>
        </div>

      </div>

      {/* 3. Architectural Specifications Bento Summary */}
      <div className="bg-[#EADBBE] border-2 border-[#1A1A1A] rounded-md p-6 shadow-[4px_4px_0px_0px_#1A1A1A] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b-2 border-[#1A1A1A]">
          <div className="flex items-center gap-2">
            <Server className="w-5 h-5 text-[#1A1A1A]" />
            <h4 className="text-sm font-black uppercase tracking-wider text-[#1A1A1A]">
              Auditable Architecture Specifications
            </h4>
          </div>
          <span className="text-[10px] font-mono font-bold uppercase bg-[#1A1A1A] text-[#F4EBD9] px-2 py-0.5">
            SPEC v1.2
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-medium text-[#1A1A1A]">
          <div className="bg-[#F4EBD9] p-3 border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A]">
            <span className="text-[10px] font-black uppercase text-[#1A1A1A]/70 block">Authentication</span>
            <strong className="text-xs font-black block mt-0.5">Google OAuth 2.0</strong>
            <span className="text-[10px] text-[#1A1A1A]/80">Token-based verification</span>
          </div>

          <div className="bg-[#F4EBD9] p-3 border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A]">
            <span className="text-[10px] font-black uppercase text-[#1A1A1A]/70 block">Concurrency Engine</span>
            <strong className="text-xs font-black block mt-0.5">Firestore Atomic Transactions</strong>
            <span className="text-[10px] text-[#1A1A1A]/80">ACID document locks</span>
          </div>

          <div className="bg-[#F4EBD9] p-3 border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A]">
            <span className="text-[10px] font-black uppercase text-[#1A1A1A]/70 block">Handoff Protocol</span>
            <strong className="text-xs font-black block mt-0.5">Native OS Mail Client</strong>
            <span className="text-[10px] text-[#1A1A1A]/80">Zero server relay</span>
          </div>

          <div className="bg-[#F4EBD9] p-3 border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A]">
            <span className="text-[10px] font-black uppercase text-[#1A1A1A]/70 block">Compliance</span>
            <strong className="text-xs font-black block mt-0.5">NITRR Academic Policy</strong>
            <span className="text-[10px] text-[#1A1A1A]/80">Role-based CR/Faculty access</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default PrivacyPolicy;

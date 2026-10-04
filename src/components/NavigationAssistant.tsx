import React from 'react';
import { 
  Compass, 
  X, 
  ExternalLink,
  MapPin,
  Bot
} from 'lucide-react';

interface NavigationAssistantProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
  copiedRoomCode?: string | null;
  bannerMessage?: string | null;
}

export const NavigationAssistant: React.FC<NavigationAssistantProps> = ({
  isOpen,
  onOpen,
  onClose,
  onToggle,
  copiedRoomCode,
  bannerMessage,
}) => {
  return (
    <>
      {/* 1. Tactile Floating Action Button (FAB) */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-md bg-[#1A1A1A] text-[#F4EBD9] font-bold border-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none flex items-center justify-center cursor-pointer transition-all duration-150 group"
          title="Open Campus Navigation Assistant"
          aria-label="Open Navigation Assistant"
        >
          <Compass className="w-7 h-7 text-[#F4EBD9] transition-transform duration-300 group-hover:rotate-45" />
          <span className="sr-only">Open Navigation Assistant</span>

          {/* High-contrast structural active indicator */}
          <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1A1A1A] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-[#F4EBD9] border-2 border-[#1A1A1A]"></span>
          </span>
        </button>
      )}

      {/* Backdrop overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-[#1A1A1A]/40 backdrop-blur-2xs z-50 transition-opacity animate-in fade-in duration-200"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* 2. Tactical Drawer (Slide-out Panel) */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Assistant"
        className={`fixed inset-y-0 right-0 h-screen w-full md:w-[480px] bg-[#F4EBD9] border-l-2 border-[#1A1A1A] z-50 flex flex-col shadow-[8px_0px_0px_0px_#1A1A1A] transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b-2 border-[#1A1A1A] bg-[#F4EBD9] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-[#1A1A1A] text-[#F4EBD9] flex items-center justify-center border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A]">
              <Compass className="w-5 h-5 text-[#F4EBD9]" />
            </div>
            <div>
              <h3 className="text-base font-black text-[#1A1A1A] uppercase tracking-wide">
                Navigation Assistant
              </h3>
              <p className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]/70">
                NIT Raipur Campus Map & Locator
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://nitrr-class-locator.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[#1A1A1A] hover:bg-[#EADBBE] rounded-md border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
              title="Open map in new tab"
              aria-label="Open map in new window"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={onClose}
              className="p-2 text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F4EBD9] rounded-md border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px] transition-all cursor-pointer"
              title="Close Navigation Assistant"
              aria-label="Close drawer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Copied Room Prompt Banner if room was selected */}
        {copiedRoomCode && (
          <div className="bg-[#EADBBE] border-b-2 border-[#1A1A1A] px-5 py-3 text-xs flex items-center justify-between text-[#1A1A1A]">
            <div className="flex items-center gap-2 font-bold">
              <MapPin className="w-4 h-4 text-[#1A1A1A]" />
              <span>Target: <strong className="font-black text-sm uppercase">{copiedRoomCode}</strong></span>
            </div>
            <span className="text-[10px] font-black uppercase bg-[#1A1A1A] text-[#F4EBD9] px-2 py-0.5 rounded-sm border border-[#1A1A1A]">
              Copied to clipboard
            </span>
          </div>
        )}

        {/* Embedded Campus Locator Iframe */}
        <div className="flex-1 w-full bg-[#F4EBD9] p-4 relative">
          <div className="w-full h-full border-2 border-[#1A1A1A] rounded-md overflow-hidden shadow-[4px_4px_0px_0px_#1A1A1A] bg-[#F4EBD9]">
            <iframe
              src="https://nitrr-class-locator.netlify.app/"
              title="NIT Raipur Campus Class Locator"
              className="w-full h-full border-0"
              allow="geolocation"
              loading="lazy"
            />
          </div>
        </div>

        {/* Tactical Footer strip */}
        <div className="p-4 border-t-2 border-[#1A1A1A] bg-[#F4EBD9] flex items-center justify-between text-xs font-bold text-[#1A1A1A]">
          <span className="uppercase tracking-wider text-[11px]">Campus GIS Service</span>
          <a
            href="https://nitrr-class-locator.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 uppercase tracking-wider text-xs font-black underline decoration-2 hover:bg-[#1A1A1A] hover:text-[#F4EBD9] px-2 py-1 border-2 border-[#1A1A1A] rounded-sm transition-all"
          >
            Full Screen Map
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </aside>
    </>
  );
};

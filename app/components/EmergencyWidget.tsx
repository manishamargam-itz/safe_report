"use client";
import { Phone } from "lucide-react";

export default function EmergencyWidget() {
  return (
    <div className="fixed bottom-6 right-6 z-50" style={{ bottom: '1rem' }}>
      <div className="bg-gradient-to-br from-red-400 via-sky-400 to-emerald-400 rounded-full shadow-lg flex flex-col items-center p-1.5 group hover:scale-105 transition-transform cursor-pointer">
        <span className="text-[10px] text-white font-bold mb-0.5">Emergency</span>
        <button
          onClick={() => window.location.href = '/resources/emergency-contacts'}
          className="bg-white rounded-full p-1.5 flex items-center justify-center shadow hover:bg-sky-100 transition"
          title="Quick Emergency Contacts"
        >
          <Phone className="w-4 h-4 text-red-500" />
        </button>
      </div>
    </div>
  );
}

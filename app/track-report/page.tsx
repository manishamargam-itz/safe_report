"use client";

import { ReportTracker } from "@app/components/report/ReportTracker";

export default function TrackReport() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <ReportTracker />
      </div>
    </div>
  );
}
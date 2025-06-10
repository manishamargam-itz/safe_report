"use client";

import { ReportTracker } from "@app/components/report/ReportTracker";

export default function TrackReport() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-emerald-50 flex items-center justify-center px-4">
      <div className="w-full max-w-xl">
        <div className="bg-white/90 border border-gray-200 rounded-2xl shadow-lg px-6 py-8">
          <div className="flex items-center gap-3 mb-6">
            <svg
              className="h-8 w-8 text-blue-500 bg-white rounded-full p-1 shadow"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 1.343-3 3 0 2.25 3 5.25 3 5.25s3-3 3-5.25c0-1.657-1.343-3-3-3zm0 4a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
            <h2 className="text-xl font-semibold text-gray-900">Track Report</h2>
          </div>
          <ReportTracker />
        </div>
      </div>
    </main>
  );
}
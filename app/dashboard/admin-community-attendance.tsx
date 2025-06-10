"use client";
import { useEffect, useState } from "react";

export default function AdminCommunityAttendancePage() {
  const [attendance, setAttendance] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/community-meetings-attendance")
      .then((res) => res.json())
      .then((data) => {
        setAttendance(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-sky-700 via-sky-400 to-emerald-400 bg-clip-text text-transparent">Community Meeting Attendance</h1>
        {loading ? (
          <div className="text-sky-700 text-center py-12">Loading attendance...</div>
        ) : (
          <ul className="space-y-6">
            {Object.entries(attendance).map(([meetingId, count]) => (
              <li key={meetingId} className="bg-white border border-sky-100 rounded-xl shadow p-6 flex items-center justify-between">
                <span className="font-medium text-sky-800">Meeting ID: {meetingId}</span>
                <span className="text-emerald-600 font-bold text-lg">{count} attending</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

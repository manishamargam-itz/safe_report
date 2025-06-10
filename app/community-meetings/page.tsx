"use client";
import { useEffect, useState } from "react";

export type CommunityMeeting = {
  id: string;
  title: string;
  time: string;
  location: string;
};

// Add Feedback type
interface Feedback {
  id: string;
  rating: number;
  comment?: string;
  createdAt: string;
}

export default function CommunityMeetingsPage() {
  const [meetings, setMeetings] = useState<CommunityMeeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [attendance, setAttendance] = useState<Record<string, boolean>>({});
  const [attendanceCount, setAttendanceCount] = useState<Record<string, number>>({});
  const [upvoted, setUpvoted] = useState<Record<string, boolean>>({});
  const [feedbacks, setFeedbacks] = useState<Record<string, Feedback[]>>({});
  const [userRating, setUserRating] = useState<Record<string, number>>({});
  const [userComment, setUserComment] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});
  // Track if feedback form is open for a meeting
  const [feedbackOpen, setFeedbackOpen] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetch("/api/community-meetings")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMeetings(data);
        } else {
          setMeetings([]);
          // Optionally, show an error message to the user
        }
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // On mount, check localStorage for upvotes by IP (simulate IP with localStorage for demo)
    const stored = localStorage.getItem('communityMeetingUpvotes');
    if (stored) setUpvoted(JSON.parse(stored));
  }, []);

  useEffect(() => {
    if (meetings.length === 0) return;
    meetings.forEach(async (meeting) => {
      const res = await fetch(`/api/community-meetings/${meeting.id}/feedback`);
      if (res.ok) {
        const data = await res.json();
        setFeedbacks((prev) => ({ ...prev, [meeting.id]: data }));
      }
    });
  }, [meetings]);

  const handleAttendance = async (id: string) => {
    if (!attendance[id]) {
      setAttendance((prev) => ({ ...prev, [id]: true }));
      // Persist attendance to API
      const res = await fetch("/api/community-meetings-attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ meetingId: id })
      });
      const data = await res.json();
      setAttendanceCount((prev) => ({ ...prev, [id]: data.count }));
    }
  };

  const handleUpvote = (id: string) => {
    if (upvoted[id]) return;
    const updated = { ...upvoted, [id]: true };
    setUpvoted(updated);
    localStorage.setItem('communityMeetingUpvotes', JSON.stringify(updated));
    // Optionally, send to backend for real IP-based tracking
  };

  useEffect(() => {
    // Fetch attendance counts from API
    fetch("/api/community-meetings-attendance")
      .then((res) => res.json())
      .then((data) => setAttendanceCount(data));
  }, []);

  // Only show feedback section if meeting is in the past
  const isPastMeeting = (meeting: CommunityMeeting) => new Date(meeting.time) < new Date();

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-xl bg-gradient-to-br from-sky-400 to-emerald-400 text-white shadow-lg">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-700 via-sky-400 to-emerald-400 bg-clip-text text-transparent mb-1">Community Meetings</h1>
            <p className="text-sky-700/80 text-lg">Stay connected and join upcoming community events.</p>
          </div>
        </div>
        {loading ? (
          <div className="text-sky-700 text-center py-12">Loading meetings...</div>
        ) : meetings.length === 0 ? (
          <div className="text-sky-700 text-center py-12">No community meetings scheduled.</div>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {meetings.map((meeting) => {
              const isPast = isPastMeeting(meeting);
              const isOpen = feedbackOpen[meeting.id];
              const isSubmitted = submitted[meeting.id];
              return (
                <li
                  key={meeting.id}
                  className={`flex flex-col justify-between bg-white border border-sky-100 rounded-2xl shadow-lg p-6 mx-auto hover:shadow-emerald-100 transition-shadow w-full max-w-[400px] min-w-[320px] ${isPast && isOpen ? 'h-auto min-h-[420px] max-h-none' : 'h-[340px]'} `}
                >
                  <div className="flex-1 flex flex-col">
                    <h2 className="text-2xl font-semibold text-sky-800 mb-2 flex items-center gap-2">
                      <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" strokeWidth="2" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" />
                      </svg>
                      {meeting.title}
                    </h2>
                    <div className="flex flex-col gap-1 mb-2">
                      <div className="flex items-center gap-2 text-sky-700">
                        <svg className="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="font-medium">Time:</span>
                        <span className="ml-1 whitespace-nowrap">{new Date(meeting.time).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sky-700">
                        <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="font-medium">Location:</span>
                        <span className="ml-1 break-words">{meeting.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-auto pt-2 border-t border-sky-50 flex flex-col items-center">
                    {new Date(meeting.time) > new Date() ? (
                      <button
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition font-medium ${upvoted[meeting.id] ? 'ring-2 ring-emerald-400 bg-emerald-100 text-emerald-700 border-emerald-300 opacity-60 cursor-not-allowed' : ''}`}
                        onClick={() => handleUpvote(meeting.id)}
                        disabled={!!upvoted[meeting.id]}
                        aria-label="Upvote meeting"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10V5a2 2 0 00-2-2 2 2 0 00-2 2v5m-2 4h8a2 2 0 002-2v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2a2 2 0 002 2z" />
                        </svg>
                        {upvoted[meeting.id] ? 'Upvoted' : 'Upvote'}
                      </button>
                    ) : (
                      isPast && !isSubmitted && !isOpen && (
                        <button
                          className="mt-2 px-4 py-2 rounded-lg bg-emerald-500 text-white font-semibold hover:bg-emerald-600"
                          onClick={() => setFeedbackOpen((prev) => ({ ...prev, [meeting.id]: true }))}
                        >
                          Give Feedback
                        </button>
                      )
                    )}
                    {/* Feedback Section: Only show if past and open */}
                    {isPast && isOpen && !isSubmitted && (
                      <div className="w-full mt-4">
                        <h3 className="text-sky-700 font-semibold mb-2">Rate this Meeting</h3>
                        <form
                          className="flex flex-col gap-2"
                          onSubmit={async (e) => {
                            e.preventDefault();
                            setSubmitting((prev) => ({ ...prev, [meeting.id]: true }));
                            const res = await fetch(`/api/community-meetings/${meeting.id}`, {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({
                                rating: userRating[meeting.id],
                                comment: userComment[meeting.id] || "",
                              }),
                            });
                            setSubmitting((prev) => ({ ...prev, [meeting.id]: false }));
                            if (res.ok) {
                              setSubmitted((prev) => ({ ...prev, [meeting.id]: true }));
                              setFeedbackOpen((prev) => ({ ...prev, [meeting.id]: false }));
                            }
                          }}
                        >
                          <div className="flex gap-1 items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                type="button"
                                key={star}
                                className={`text-2xl ${userRating[meeting.id] >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                                onClick={() => setUserRating((prev) => ({ ...prev, [meeting.id]: star }))}
                                aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                              >
                                ★
                              </button>
                            ))}
                          </div>
                          <textarea
                            className="w-full border border-sky-200 rounded-lg px-3 py-2 text-black placeholder:text-gray-400 mt-2"
                            rows={2}
                            placeholder="Optional comment..."
                            value={userComment[meeting.id] || ''}
                            onChange={e => setUserComment((prev) => ({ ...prev, [meeting.id]: e.target.value }))}
                          />
                          <button
                            type="submit"
                            className="mt-2 px-4 py-2 rounded-lg bg-emerald-500 text-white font-semibold hover:bg-emerald-600 disabled:opacity-50"
                            disabled={submitting[meeting.id] || !userRating[meeting.id]}
                          >
                            {submitting[meeting.id] ? 'Submitting...' : 'Submit Feedback'}
                          </button>
                        </form>
                      </div>
                    )}
                    {/* Thank you message after feedback submission */}
                    {isPast && isSubmitted && (
                      <div className="text-emerald-600 font-medium mt-4">Thank you for your feedback!</div>
                    )}
                    {/* Show feedback list for past meetings */}
                    {/* Feedback list removed as requested */}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

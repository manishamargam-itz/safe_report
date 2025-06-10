"use client";

import { useEffect, useState } from "react";

export type CommunityMeeting = {
  id: string;
  title: string;
  time: string;
  location: string;
};

interface Feedback {
  id: string;
  rating: number;
  comment?: string;
  createdAt: string;
}

export default function AdminCommunityMeetingsPage() {
  const [meetings, setMeetings] = useState<CommunityMeeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", time: "", location: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ title: "", time: "", location: "" });
  const [feedbacks, setFeedbacks] = useState<Record<string, Feedback[]>>({});
  const [showFeedback, setShowFeedback] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setLoading(true);
    fetch("/api/community-meetings")
      .then((res) => res.json())
      .then((data) => {
        setMeetings(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setMeetings([]);
        setLoading(false);
      });
  }, [submitting]);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess("");
    try {
      const res = await fetch("/api/community-meetings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to upload meeting");
      setSuccess("Meeting uploaded!");
      setForm({ title: "", time: "", location: "" });
    } catch (err) {
      setSuccess("Failed to upload meeting");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (meeting: CommunityMeeting) => {
    setEditingId(meeting.id);
    setEditForm({ title: meeting.title, time: meeting.time.slice(0, 16), location: meeting.location });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;
    setSubmitting(true);
    setSuccess("");
    try {
      const res = await fetch(`/api/community-meetings/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      if (!res.ok) throw new Error("Failed to update meeting");
      setSuccess("Meeting updated!");
      setEditingId(null);
      setEditForm({ title: "", time: "", location: "" });
    } catch (err) {
      setSuccess("Failed to update meeting");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this meeting?")) return;
    setSubmitting(true);
    setSuccess("");
    try {
      const res = await fetch(`/api/community-meetings/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete meeting");
      setSuccess("Meeting deleted!");
    } catch (err) {
      setSuccess("Failed to delete meeting");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-sky-700 via-sky-400 to-emerald-400 bg-clip-text text-transparent">Admin: Community Meetings</h1>
        <form onSubmit={handleSubmit} className="bg-white border border-sky-100 rounded-2xl shadow p-6 mb-10 space-y-4">
          <h2 className="text-xl font-semibold mb-2 text-sky-800">Upload New Meeting</h2>
          <div>
            <label className="block text-sky-700 font-medium mb-1">Title</label>
            <input name="title" value={form.title} onChange={handleChange} required className="w-full border border-sky-200 rounded-lg px-3 py-2 text-black placeholder:text-gray-400" />
          </div>
          <div>
            <label className="block text-sky-700 font-medium mb-1">Time</label>
            <input name="time" type="datetime-local" value={form.time} onChange={handleChange} required className="w-full border border-sky-200 rounded-lg px-3 py-2 text-black placeholder:text-gray-400" />
          </div>
          <div>
            <label className="block text-sky-700 font-medium mb-1">Location</label>
            <input name="location" value={form.location} onChange={handleChange} required className="w-full border border-sky-200 rounded-lg px-3 py-2 text-black placeholder:text-gray-400" />
          </div>
          <button type="submit" disabled={submitting} className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition disabled:opacity-50">{submitting ? "Uploading..." : "Upload Meeting"}</button>
          {success && <div className="text-emerald-600 font-medium mt-2">{success}</div>}
        </form>
        <h2 className="text-xl font-semibold mb-4 text-sky-800">All Community Meetings</h2>
        {loading ? (
          <div className="text-sky-700 text-center py-12">Loading meetings...</div>
        ) : meetings.length === 0 ? (
          <div className="text-sky-700 text-center py-12">No community meetings scheduled.</div>
        ) : (
          <ul className="flex flex-col md:flex-row md:flex-wrap gap-8 md:gap-6 justify-center">
            {meetings.map((meeting) => (
              <li key={meeting.id} className="flex-1 min-w-[380px] max-w-lg bg-white border border-sky-100 rounded-2xl shadow-lg p-8 flex flex-col h-full hover:shadow-emerald-100 transition-shadow md:max-w-lg md:min-w-[380px] md:flex-grow">
                {editingId === meeting.id ? (
                  <form onSubmit={handleEditSubmit} className="space-y-2">
                    <input name="title" value={editForm.title} onChange={handleEditChange} required className="w-full border border-sky-200 rounded-lg px-3 py-2 text-black" />
                    <input name="time" type="datetime-local" value={editForm.time} onChange={handleEditChange} required className="w-full border border-sky-200 rounded-lg px-3 py-2 text-black" />
                    <input name="location" value={editForm.location} onChange={handleEditChange} required className="w-full border border-sky-200 rounded-lg px-3 py-2 text-black" />
                    <div className="flex gap-2">
                      <button type="submit" className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition">Save</button>
                      <button type="button" onClick={() => setEditingId(null)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition">Cancel</button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="flex-1 flex flex-col">
                      <h2 className="text-2xl font-semibold text-sky-800 mb-2 flex items-center gap-2">
                        <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" strokeWidth="2" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" />
                        </svg>
                        {meeting.title}
                      </h2>
                      <div className="flex flex-col gap-1 mb-4">
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
                          </svg>
                          <span className="font-medium">Location:</span>
                          <span className="ml-1">{meeting.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button onClick={() => handleEdit(meeting)} className="px-3 py-1 bg-sky-100 text-sky-700 rounded hover:bg-sky-200">Edit</button>
                      <button onClick={() => handleDelete(meeting.id)} className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200">Delete</button>
                      <button onClick={() => setShowFeedback((prev) => ({ ...prev, [meeting.id]: !prev[meeting.id] }))} className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded hover:bg-emerald-200">{showFeedback[meeting.id] ? 'Hide' : 'Show'} Feedback</button>
                    </div>
                    {showFeedback[meeting.id] && feedbacks[meeting.id] && (
                      <div className="mt-4 bg-sky-50 border border-sky-100 rounded-lg p-4">
                        <h4 className="text-sky-700 font-semibold mb-2">Feedback</h4>
                        {feedbacks[meeting.id].length === 0 ? (
                          <div className="text-gray-500">No feedback yet.</div>
                        ) : (
                          <ul className="space-y-2">
                            {feedbacks[meeting.id].map((fb) => (
                              <li key={fb.id} className="text-sm text-gray-700 flex items-center gap-2">
                                <span className="text-yellow-400">{'★'.repeat(fb.rating)}</span>
                                {fb.comment && <span className="ml-2">{fb.comment}</span>}
                                <span className="ml-auto text-xs text-gray-400">{new Date(fb.createdAt).toLocaleString()}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

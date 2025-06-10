"use client";
import { useState, useRef, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

// Generate or get a unique session ID for the user
function getSessionId() {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem("chat_session_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("chat_session_id", id);
  }
  return id;
}

export default function LiveChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! How can we help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [hasNewAdminMsg, setHasNewAdminMsg] = useState(false);
  const sessionId = getSessionId();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new message
  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  // Subscribe to messages for this session
  useEffect(() => {
    // Subscribe to Supabase channel for real-time chat
    const channel = supabase.channel('live-chat')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat_messages' }, (payload) => {
        const { from, text } = payload.new;
        if (from && text) {
          setMessages((msgs) => [...msgs, { from, text }]);
          // If chat is closed and message is from admin, show notification
          if (!open && from === 'admin') {
            setHasNewAdminMsg(true);
          }
        }
      })
      .subscribe();
    // Fetch existing messages
    supabase.from('chat_messages').select('*').order('created_at', { ascending: true }).then(({ data }) => {
      if (data) setMessages(data);
    });
    return () => {
      supabase.removeChannel(channel);
    };
  }, [open]);

  // Clear notification when chat is opened
  useEffect(() => {
    if (open) setHasNewAdminMsg(false);
  }, [open]);

  const sendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;
    await supabase.from('chat_messages').insert({ from: 'user', text: input });
    setInput("");
  };

  return (
    <div className="">
      {open ? (
        <div className="w-80 bg-white rounded-2xl shadow-2xl border border-sky-200 flex flex-col overflow-hidden">
          <div className="bg-gradient-to-r from-sky-700 via-sky-400 to-emerald-400 text-white px-4 py-3 flex items-center justify-between">
            <span className="font-semibold">Live Chat</span>
            <button onClick={() => setOpen(false)} aria-label="Close chat" className="text-white text-xl">&times;</button>
          </div>
          <div className="flex-1 p-4 space-y-2 overflow-y-auto max-h-64" style={{ minHeight: 200 }}>
            {messages.map((msg, i) => (
              <div key={i} className={
                msg.from === "bot"
                  ? "text-left"
                  : msg.from === "admin"
                  ? "text-left"
                  : "text-right"
              }>
                <span className={
                  msg.from === "bot"
                    ? "inline-block bg-sky-100 text-sky-800 rounded-lg px-3 py-2 mb-1"
                    : msg.from === "admin"
                    ? "inline-block bg-emerald-600 text-white rounded-lg px-3 py-2 mb-1"
                    : "inline-block bg-emerald-100 text-emerald-800 rounded-lg px-3 py-2 mb-1"
                }>
                  {msg.text}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={sendMessage} className="flex border-t border-sky-100">
            <input
              type="text"
              className="flex-1 px-3 py-2 outline-none text-sky-900"
              placeholder="Type your message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              aria-label="Type your message"
            />
            <button type="submit" className="px-4 text-sky-700 font-bold hover:text-emerald-600" aria-label="Send message">
              Send
            </button>
          </form>
        </div>
      ) : (
        <button
          className="bg-gradient-to-r from-sky-700 via-sky-400 to-emerald-400 text-white rounded-full shadow-lg px-6 py-3 font-semibold flex items-center gap-2 hover:scale-105 transition relative"
          onClick={() => setOpen(true)}
          aria-label="Open live chat"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H7a2 2 0 01-2-2V10a2 2 0 012-2h2m4-4h4a2 2 0 012 2v4a2 2 0 01-2 2h-4a2 2 0 01-2-2V6a2 2 0 012-2z" />
          </svg>
          Live Chat
          {hasNewAdminMsg && (
            <span className="absolute -top-1 -right-1 bg-emerald-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs animate-bounce" aria-label="New admin message">!</span>
          )}
        </button>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
//import LiveChatWidget from "./LiveChatWidget";

export default function ContactPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const errors = {
      name: "",
      email: "",
      subject: "",
      message: "",
    };
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.subject.trim()) {
      errors.subject = "Subject is required";
      isValid = false;
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setSuccess("Your message has been sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setFormErrors({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-white text-sky-900">
      <main className="w-full max-w-5xl mx-auto px-4 sm:px-8 py-12">
        {/* Live Chat Widget */}
        <div className="fixed bottom-6 right-6 z-50">
          {/* <LiveChatWidget /> */}
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-sky-700 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-sky-700/80 max-w-2xl mx-auto">
            Have questions or need assistance? We're here to help. Fill out the form below and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-sky-50 via-white to-emerald-50 rounded-xl p-6 border border-sky-100 shadow">
              <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-sky-700 via-sky-400 to-emerald-400 bg-clip-text text-transparent">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-emerald-400 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-sky-700/80">Email</p>
                    <a href="mailto:support@crimereport.com" className="text-sky-700 font-semibold hover:underline">
                      support@crimereport.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-emerald-400 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-sky-700/80">Phone</p>
                    <a href="tel:+1234567890" className="text-sky-700 font-semibold hover:underline">
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-emerald-400 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-sky-700/80">Address</p>
                    <p className="text-sky-900 font-semibold">123 Safety Street, Security City, SC 12345</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-sky-50 via-white to-emerald-50 rounded-xl p-6 border border-sky-100 shadow">
              <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-sky-700 via-sky-400 to-emerald-400 bg-clip-text text-transparent">Accessibility Support</h2>
              <p className="text-sky-700/80 mb-4">
                We are committed to making the Crime Report application accessible to everyone. Our platform includes:
              </p>
              <ul className="space-y-2 text-sky-700/80">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Optimized for screen readers
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Accessible via full keyboard navigation
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  High contrast mode for enhanced visibility
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Descriptive alternative text for all images
                </li>
              </ul>
              <p className="text-sky-700/80 mt-4">
                If you need assistance or have specific accessibility requirements, please contact us at <a href="mailto:support@crimereport.com" className="text-sky-700 font-semibold hover:underline">support@crimereport.com</a>. We welcome your feedback to help us improve accessibility for all users.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-sky-50 via-white to-emerald-50 rounded-xl p-6 border border-sky-100 shadow">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-sky-900 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full bg-white border ${
                    formErrors.name ? "border-red-500" : "border-sky-200"
                  } rounded-lg px-4 py-2 text-sky-900 focus:ring-2 focus:ring-sky-400/20 focus:border-sky-400/20`}
                  aria-required="true"
                  aria-invalid={!!formErrors.name}
                />
                {formErrors.name && (
                  <p className="mt-1 text-sm text-red-500" role="alert">
                    {formErrors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-sky-900 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full bg-white border ${
                    formErrors.email ? "border-red-500" : "border-sky-200"
                  } rounded-lg px-4 py-2 text-sky-900 focus:ring-2 focus:ring-sky-400/20 focus:border-sky-400/20`}
                  aria-required="true"
                  aria-invalid={!!formErrors.email}
                />
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-500" role="alert">
                    {formErrors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-sky-900 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={`w-full bg-white border ${
                    formErrors.subject ? "border-red-500" : "border-sky-200"
                  } rounded-lg px-4 py-2 text-sky-900 focus:ring-2 focus:ring-sky-400/20 focus:border-sky-400/20`}
                  aria-required="true"
                  aria-invalid={!!formErrors.subject}
                />
                {formErrors.subject && (
                  <p className="mt-1 text-sm text-red-500" role="alert">
                    {formErrors.subject}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-sky-900 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className={`w-full bg-white border ${
                    formErrors.message ? "border-red-500" : "border-sky-200"
                  } rounded-lg px-4 py-2 text-sky-900 focus:ring-2 focus:ring-sky-400/20 focus:border-sky-400/20`}
                  aria-required="true"
                  aria-invalid={!!formErrors.message}
                />
                {formErrors.message && (
                  <p className="mt-1 text-sm text-red-500" role="alert">
                    {formErrors.message}
                  </p>
                )}
              </div>

              {error && (
                <div className="text-red-500 text-sm" role="alert">
                  {error}
                </div>
              )}

              {success && (
                <div className="text-emerald-600 text-sm" role="alert">
                  {success}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-sky-700 via-sky-400 to-emerald-400 text-white py-3 px-4 rounded-lg font-medium hover:from-sky-800 hover:to-emerald-500 focus:outline-none focus:ring-2 focus:ring-sky-400/20 focus:ring-offset-2 focus:ring-offset-white disabled:opacity-50 disabled:cursor-not-allowed shadow"
                aria-disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
"use client";

import Image from "next/image";

export default function HowItWorks() {
  return (
    <div className="relative min-h-screen bg-white selection:bg-sky-500/20 overflow-hidden">
      {/* Remove dark gradient overlays */}

      {/* Main Content */}
      <main className="relative px-4 sm:px-8 pt-28">
        <div className="mx-auto max-w-6xl">
          {/* Header Section */}
          <div className="flex flex-col items-center text-center mb-16">
            <div className="inline-flex h-10 items-center gap-2 rounded-full border border-sky-400/30 bg-gradient-to-r from-sky-100 to-emerald-100 px-5 text-base text-sky-700 font-medium shadow">
              <svg
                className="h-5 w-5 text-sky-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              How It Works
            </div>

            <h1 className="mt-8 bg-gradient-to-b from-sky-700 via-emerald-600 to-sky-400 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent drop-shadow">
              The SafeReport Journey
              <span className="block text-2xl mt-4 bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent font-semibold">
               <span className="text-blue-700">Secure.</span> 
                Anonymous.
                <span className="text-blue-950">Trusted.</span> 
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-sky-700/80">
              Discover how your report is handled with privacy, encryption, and speed—every step of the way.
            </p>
          </div>

          {/* Process Steps */}
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Submit Report",
                description:
                  "Fill out our secure form. No personal info required. Attach files if needed.",
                icon: (
                  <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <rect width="100%" height="100%" rx="12" fill="url(#step1)" />
                    <defs>
                      <linearGradient id="step1" x1="0" y1="0" x2="1" y2="1">
                        <stop stopColor="#38bdf8" />
                        <stop offset="1" stopColor="#34d399" />
                      </linearGradient>
                    </defs>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                ),
              },
              {
                title: "Encrypted Instantly",
                description:
                  "Your report is encrypted with military-grade protocols. All metadata is stripped.",
                icon: (
                  <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <rect width="100%" height="100%" rx="12" fill="url(#step2)" />
                    <defs>
                      <linearGradient id="step2" x1="0" y1="0" x2="1" y2="1">
                        <stop stopColor="#38bdf8" />
                        <stop offset="1" stopColor="#34d399" />
                      </linearGradient>
                    </defs>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ),
              },
              {
                title: "Smart Routing",
                description:
                  "We verify jurisdiction and route your report to the right agency—anonymously.",
                icon: (
                  <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <rect width="100%" height="100%" rx="12" fill="url(#step3)" />
                    <defs>
                      <linearGradient id="step3" x1="0" y1="0" x2="1" y2="1">
                        <stop stopColor="#38bdf8" />
                        <stop offset="1" stopColor="#34d399" />
                      </linearGradient>
                    </defs>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
              },
              {
                title: "Secure Chat",
                description:
                  "Law enforcement can reach you via encrypted chat—using only your anonymous ID.",
                icon: (
                  <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <rect width="100%" height="100%" rx="12" fill="url(#step4)" />
                    <defs>
                      <linearGradient id="step4" x1="0" y1="0" x2="1" y2="1">
                        <stop stopColor="#38bdf8" />
                        <stop offset="1" stopColor="#34d399" />
                      </linearGradient>
                    </defs>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                ),
              },
            ].map((step, i) => (
              <div
                key={i}
                className="group relative flex flex-col items-center rounded-2xl bg-gradient-to-br from-sky-100 via-white to-emerald-100 border border-sky-200/60 p-8 shadow-lg hover:scale-[1.03] transition-transform"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-emerald-400 mb-4 shadow">
                  {step.icon}
                </div>
                <h3 className="text-lg font-bold text-sky-800 mb-2">{step.title}</h3>
                <p className="text-base text-sky-700/80">{step.description}</p>
              </div>
            ))}
          </div>

          {/* Security Features */}
          <div className="mt-24 rounded-2xl bg-gradient-to-br from-sky-100 via-white to-emerald-100 border border-sky-200/60 p-10 shadow-lg">
            <h2 className="text-2xl font-bold text-sky-800 text-center mb-10">
              Security Measures
            </h2>
            <div className="grid gap-8 sm:grid-cols-3">
              {[
                {
                  title: "End-to-End Encryption",
                  description: "All data is encrypted in transit and at rest.",
                  icon: (
                    <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <rect width="100%" height="100%" rx="12" fill="url(#feature1)" />
                      <defs>
                        <linearGradient id="feature1" x1="0" y1="0" x2="1" y2="1">
                          <stop stopColor="#38bdf8" />
                          <stop offset="1" stopColor="#34d399" />
                        </linearGradient>
                      </defs>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                    </svg>
                  ),
                },
                {
                  title: "No Logs Policy",
                  description: "We never store IP addresses or user metadata.",
                  icon: (
                    <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <rect width="100%" height="100%" rx="12" fill="url(#feature2)" />
                      <defs>
                        <linearGradient id="feature2" x1="0" y1="0" x2="1" y2="1">
                          <stop stopColor="#38bdf8" />
                          <stop offset="1" stopColor="#34d399" />
                        </linearGradient>
                      </defs>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                },
                {
                  title: "Regular Audits",
                  description: "Independent security firms verify our systems.",
                  icon: (
                    <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <rect width="100%" height="100%" rx="12" fill="url(#feature3)" />
                      <defs>
                        <linearGradient id="feature3" x1="0" y1="0" x2="1" y2="1">
                          <stop stopColor="#38bdf8" />
                          <stop offset="1" stopColor="#34d399" />
                        </linearGradient>
                      </defs>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  ),
                },
              ].map((feature, i) => (
                <div key={i} className="text-center p-6 rounded-xl bg-gradient-to-br from-sky-50 via-white to-emerald-50 border border-sky-100/60 shadow">
                  <div className="flex justify-center mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-emerald-400 shadow">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-sky-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-sky-700/80">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-24 mb-20 text-center">
            <h2 className="text-2xl font-bold text-sky-800 mb-6">
              Ready to Make a Report?
            </h2>
            <button
              className="group relative inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-emerald-400 px-8 text-base font-semibold text-white transition-all hover:from-sky-600 hover:to-emerald-500 shadow-lg"
              onClick={() => window.location.href = "/submit-report"}
            >
              Start Anonymous Report
              <svg
                className="h-5 w-5 transition-transform group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 12h14M12 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
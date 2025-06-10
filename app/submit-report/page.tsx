"use client";
import { ReportWizard } from "@/app/components/report/ReportWizard";

export default function SubmitReport() {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-white via-blue-50 to-emerald-50 text-gray-900 px-4 pt-28">
      <div className="mx-auto max-w-2xl">
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center mb-10">
           <div className="relative shadow-md rounded-2xl px-6 py-8 flex flex-col items-center w-full bg-white/90 border border-gray-200 overflow-hidden">
            {/* Subtle gradient accent bar */}
            <div className="absolute top-0 left-0 w-full h-2 rounded-t-2xl bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-400 opacity-30" />
            
            {/* Logo moved below the gradient bar */}
            <div className="absolute left-6 top-6 z-10">
              <svg
                className="h-9 w-10 text-emerald-500 drop-shadow-lg bg-white rounded-full p-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 17v-2a4 4 0 018 0v2m-4-6a4 4 0 100-8 4 4 0 000 8zm-6 8v-2a4 4 0 014-4h4a4 4 0 014 4v2"
                />
              </svg>
            </div>

            <div className="inline-flex h-9 items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 text-sm text-blue-600 mb-4 shadow-sm mt-2">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              Secure & Anonymous
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mb-2">
              Submit <span className="text-blue-700">Anonymous Report</span>
            </h1>
            <p className="max-w-md mx-auto text-base text-gray-600 mb-2">
              Your safety is our priority.<br className="hidden sm:block" />
              All submissions are <span className="text-blue-600 font-semibold">encrypted</span> and <span className="text-emerald-600 font-semibold">anonymized</span>.
            </p>
          </div>
        </section>

        {/* Report Wizard */}
        <div className="mt-6 rounded-2xl border border-gray-100 p-5 shadow-lg bg-gradient-to-br from-white via-blue-50 to-emerald-50">
          <ReportWizard />
        </div>
      </div>
    </main>
  );
}
"use client";

interface ReportSubmittedProps {
  data: any;
  onComplete: (data: any) => void;
}

export function ReportSubmitted({ data }: ReportSubmittedProps) {
  const reportId = data.reportId || "ERROR-ID-NOT-FOUND";

  return (
    <div className="text-center space-y-6">
      <div className="flex flex-col items-center">
        <div className="bg-gradient-to-br from-emerald-400/20 via-blue-400/10 to-blue-500/10 rounded-full p-3">
          <svg
            className="w-16 h-16 text-emerald-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="mt-4 text-xl font-medium text-gray-900">
          Report Successfully Submitted
        </h3>
        <p className="mt-2 text-sm text-gray-600">
          Your report has been securely transmitted to law enforcement
        </p>
      </div>

      <div className="bg-gradient-to-br from-white via-blue-50 to-emerald-50 rounded-lg p-6 max-w-md mx-auto border border-blue-100 shadow">
        <h4 className="text-blue-700 font-medium mb-2">Your Report ID</h4>
        <div className="bg-white rounded p-3 border border-blue-100">
          <code className="text-emerald-600 font-semibold">{reportId}</code>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          Save this ID to check your report status or communicate securely with law enforcement
        </p>
      </div>

      <div className="pt-4">
        <button
          onClick={() => (window.location.href = "/")}
          className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-sky-500 to-emerald-400 px-4 py-2 text-sm font-medium text-white hover:from-sky-600 hover:to-emerald-500 transition-all"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}
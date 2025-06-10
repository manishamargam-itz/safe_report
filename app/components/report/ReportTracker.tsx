"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader } from "lucide-react";

interface ReportDetails {
  id: string;
  reportId: string;
  status: string;
  createdAt: string;
  title: string;
  description: string;
  location: string;
  type: string;
}

export function ReportTracker() {
  const [reportId, setReportId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [reportDetails, setReportDetails] = useState<ReportDetails | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setReportDetails(null);
    setLoading(true);

    if (!reportId.trim()) {
      setError("Please enter a report ID");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/reports/${reportId}/details`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Report not found");
      }

      setReportDetails(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to find report. Please check the ID and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="inline-flex h-9 items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-4 text-sm text-sky-400">
          <Search className="w-4 h-4" />
          Track Your Report Status
        </div>
        <h1 className="mt-6 bg-gradient-to-b from-white to-white/80 bg-clip-text text-4xl font-bold tracking-tight text-transparent">
          Track Your Report
          <span className="block bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
            Stay Informed
          </span>
        </h1>
        <p className="mt-4 text-zinc-400 max-w-xl mx-auto">
          Enter your report ID to check the current status and updates
        </p>
      </div>

     
      {/* Dynamic Layout Container */}
      <div className="flex justify-center">
        <div
          className={`transition-all duration-300 ease-in-out 
          ${
            reportDetails
              ? "w-full grid md:grid-cols-2 gap-8"
              : "max-w-lg w-full"
          }`}
        >
          {/* Form Section */}
          <div
            className={`bg-gradient-to-br from-white via-blue-50 to-emerald-50 rounded-2xl border 
            border-blue-100 p-6 w-full transition-all duration-300
            ${reportDetails ? "" : "mx-auto"}`}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <label
                  htmlFor="reportId"
                  className="block text-sm font-medium mb-2 text-blue-700"
                >
                  Report ID
                </label>
                <input
                  type="text"
                  id="reportId"
                  value={reportId}
                  onChange={(e) => setReportId(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-blue-100 rounded-xl
                           text-gray-900 placeholder-blue-300 focus:outline-none focus:ring-2 
                           focus:ring-sky-400 focus:border-transparent transition-all"
                  placeholder="Enter your report ID"
                  disabled={loading}
                />
              </div>
              {error && (
                <div className="flex items-center gap-2 text-red-500 text-sm bg-red-100 p-4 rounded-xl border border-red-200">
                  <svg
                    className="h-5 w-5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-sky-500 to-emerald-400 
                         text-white py-3 px-4 rounded-xl hover:from-sky-400 
                         hover:to-emerald-500 transition-all duration-200 
                         disabled:opacity-50 disabled:cursor-not-allowed
                         flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <Loader className="w-5 h-5 animate-spin" />
                ) : (
                  <Search className="w-5 h-5" />
                )}
                <span>{loading ? "Searching..." : "Track Report"}</span>
              </button>
            </form>
          </div>

          {/* Results Section */}
          <div
            className={`transition-all duration-300 
            ${
              reportDetails
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8 absolute"
            }`}
          >
            {reportDetails && (
              <div className="rounded-xl border border-blue-100 bg-gradient-to-br from-white via-blue-50 to-emerald-50 p-6 h-full">
                <h2 className="text-xl font-semibold text-blue-700 flex items-center gap-2 mb-6">
                  <div className="h-2 w-2 rounded-full bg-sky-400" />
                  Report Details
                </h2>

                <div className="grid gap-4">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-blue-50">
                    <span className="text-blue-700">Status</span>
                    <span
                      className={`font-medium ${getStatusColor(
                        reportDetails.status
                      )} 
                        px-3 py-1 rounded-full bg-white/60`}
                    >
                      {reportDetails.status}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-lg bg-blue-50">
                    <span className="text-blue-700">Type</span>
                    <span
                      className={`font-medium ${
                        reportDetails.type === "EMERGENCY"
                          ? "text-red-500"
                          : "text-blue-500"
                      } px-3 py-1 rounded-full bg-white/60`}
                    >
                      {reportDetails.type}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-lg bg-blue-50">
                    <span className="text-blue-700">Report ID</span>
                    <span className="text-gray-900 font-mono">
                      {reportDetails.reportId || reportDetails.id}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-lg bg-blue-50">
                    <span className="text-blue-700">Submitted On</span>
                    <span className="text-gray-900">
                      {new Date(reportDetails.createdAt).toLocaleDateString(
                        undefined,
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-blue-50 space-y-1.5">
                    <span className="text-blue-700 text-sm">Title</span>
                    <span className="text-gray-900 block font-medium">
                      {reportDetails.title}
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-blue-50 space-y-1.5">
                    <span className="text-blue-700 text-sm">Location</span>
                    <span className="text-gray-900 block font-medium">
                      {reportDetails.location}
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-blue-50 space-y-1.5">
                    <span className="text-blue-700 text-sm">Description</span>
                    <p className="text-gray-900 text-sm leading-relaxed">
                      {reportDetails.description}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

}

function getStatusColor(status: string): string {
  const statusColors: Record<string, string> = {
    PENDING: "text-yellow-400",
    IN_PROGRESS: "text-sky-400",
    RESOLVED: "text-emerald-400",
    DISMISSED: "text-red-400",
  };
  return statusColors[status] || "text-white";
}
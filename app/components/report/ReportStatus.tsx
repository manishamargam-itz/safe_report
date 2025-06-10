interface ReportStatusProps {
  report: any;
}

export function ReportStatus({ report }: ReportStatusProps) {
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "in progress":
        return "bg-sky-100 text-sky-700";
      case "resolved":
        return "bg-emerald-100 text-emerald-700";
      default:
        return "bg-gray-100 text-gray-500";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type?.toLowerCase()) {
      case "emergency":
        return "bg-red-100 text-red-600";
      case "non_emergency":
        return "bg-blue-100 text-blue-600";
      default:
        return "bg-gray-100 text-gray-500";
    }
  };

  return (
    <div className="rounded-xl bg-gradient-to-br from-white via-blue-50 to-emerald-50 border border-blue-100 p-0 shadow w-full max-w-md mx-auto">
      {/* Card Header */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-blue-100 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-t-xl">
        <span className="h-3 w-3 rounded-full bg-sky-400 inline-block" />
        <h2 className="text-blue-700 font-bold text-xl">Report Details</h2>
      </div>
      {/* Card Content */}
      <div className="grid grid-cols-2 gap-0 divide-x divide-blue-50">
        {/* Left Column */}
        <div className="flex flex-col gap-6 px-6 py-6">
          {/* Status */}
          <div>
            <div className="text-xs text-gray-500 mb-1">Status</div>
            <div className={`block mt-1 px-4 py-1 rounded-full font-semibold text-sm ${getStatusColor(report.status)}`}>
              {report.status || "Pending Review"}
            </div>
          </div>
          {/* Type */}
          <div>
            <div className="text-xs text-gray-500 mb-1">Type</div>
            <div className={`block mt-1 px-4 py-1 rounded-full font-semibold text-sm ${getTypeColor(report.incidentType)}`}>
              {report.incidentType || "N/A"}
            </div>
          </div>
          {/* Submitted On */}
          <div>
            <div className="text-xs text-gray-500 mb-1">Submitted On</div>
            <div className="block mt-1 text-sm text-gray-900 font-medium">
              {report.timestamp
                ? new Date(report.timestamp).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "N/A"}
            </div>
          </div>
        </div>
        {/* Right Column */}
        <div className="flex flex-col gap-6 px-6 py-6">
          {/* Report ID */}
          <div>
            <div className="text-xs text-gray-500 mb-1">Report ID</div>
            <div className="block mt-1 text-sm font-mono text-blue-700 bg-blue-50 rounded px-2 py-1 break-all w-fit">
              {report.reportId}
            </div>
          </div>
          {/* Timeline */}
          {report.timeline?.length > 0 && (
            <div>
              <div className="text-xs text-gray-500 mb-1">Timeline</div>
              <div className="space-y-2 max-h-32 overflow-y-auto pr-2">
                {report.timeline.map((event: any, index: number) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="h-2 w-2 rounded-full bg-sky-400 mt-2" />
                    <div>
                      <div className="text-xs text-gray-900">{event.description}</div>
                      <div className="text-[11px] text-gray-500">
                        {new Date(event.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      </div>
       
  );
}
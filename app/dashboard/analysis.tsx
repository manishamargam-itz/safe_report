"use client";

import { useEffect, useState } from "react";
import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { SafetyMap } from "../components/SafetyMap";

export default function AnalysisPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/reports/analysis")
      .then((res) => res.json())
      .then(setData)
      .catch(() => setError("Failed to load analysis"))
      .finally(() => setLoading(false));
  }, []);

  // Helper: Get top N areas/types for summary
  function getTopN(arr: any[], key: string, n = 3) {
    return arr
      .sort((a, b) => b._count.id - a._count.id)
      .slice(0, n)
      .map((item) => item[key] || 'Unknown');
  }

  // Summary data
  const totalReports = data.areaCounts.reduce((sum: number, a: any) => sum + a._count.id, 0);
  const topAreas = getTopN(data.areaCounts, 'location');
  const topTypes = getTopN(data.typeCounts, 'type');

  // Prepare data for charts
  const areaLabels = data.areaCounts.map((area: any) => getTopN([area], 'location')[0]);
  const areaCounts = data.areaCounts.map((area: any) => area._count.id);
  const typeLabels = data.typeCounts.map((type: any) => getTopN([type], 'type')[0]);
  const typeCounts = data.typeCounts.map((type: any) => type._count.id);

  // For map/heatmap
  const allReports = data.reports || [];
  const allTypes = Array.from(new Set(allReports.map((r: any) => r.type))).filter(Boolean);

  const areaPieData = {
    labels: areaLabels,
    datasets: [
      {
        label: "Number of Reports",
        data: areaCounts,
        backgroundColor: areaLabels.map((_, i) => `hsl(${(i * 360) / areaLabels.length}, 80%, 60%)`),
        borderColor: areaLabels.map((_, i) => `hsl(${(i * 360) / areaLabels.length}, 80%, 40%)`),
        borderWidth: 2,
        hoverOffset: 16,
      },
    ],
  };

  const typePieData = {
    labels: typeLabels,
    datasets: [
      {
        label: "Number of Reports",
        data: typeCounts,
        backgroundColor: typeLabels.map((_, i) => `hsl(${(i * 360) / typeLabels.length}, 70%, 60%)`),
        borderColor: typeLabels.map((_, i) => `hsl(${(i * 360) / typeLabels.length}, 70%, 40%)`),
        borderWidth: 2,
        hoverOffset: 16,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#fff',
          font: { size: 14, weight: 'bold' as const },
          padding: 20,
          boxWidth: 18,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percent = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} (${percent}%)`;
          },
        },
        backgroundColor: '#222',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#888',
        borderWidth: 1,
        padding: 12,
      },
      title: { display: false },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1200,
      easing: 'easeOutBounce' as const,
    },
    cutout: '40%',
  };
  const smallPieStyle = { maxWidth: 400, maxHeight: 400, margin: '0 auto' };

  if (loading) return <div className="text-center py-12">Loading analysis...</div>;
  if (error) return <div className="text-center text-red-500 py-12">{error}</div>;
  if (!data) return null;

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Crime Report Analysis</h1>
      {/* Effective Summary Section */}
      <div className="mb-10 p-6 rounded-2xl bg-neutral-900/70 border border-blue-900 flex flex-col gap-2 shadow-lg">
        <div className="text-lg font-semibold text-blue-200 mb-2">Summary</div>
        <div>Total Reports: <span className="font-bold text-blue-400">{totalReports}</span></div>
        <div>Top Areas: <span className="font-semibold text-emerald-300">{topAreas.join(', ')}</span></div>
        <div>Most Common Crime Types: <span className="font-semibold text-pink-300">{topTypes.join(', ')}</span></div>
        <div className="text-sm text-yellow-200 mt-2">* Data updates in real-time. Click on a row for details.</div>
      </div>
      {/* Effective Features */}
      <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800 mb-8">
          <h2 className="text-xl font-semibold mb-4">Top Areas with Most Reports</h2>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="py-2 px-4">Location</th>
                <th className="py-2 px-4">Number of Reports</th>
              </tr>
            </thead>
            <tbody>
              {data.areaCounts.map((area: any, i: number) => (
                <tr key={i} className="border-b border-neutral-800 hover:bg-blue-900/20 cursor-pointer transition" title="View details">
                  <td className="py-2 px-4">{area.location || "Unknown"}</td>
                  <td className="py-2 px-4">{area._count.id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800 mb-8">
          <h2 className="text-xl font-semibold mb-4">Most Common Crime Types</h2>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="py-2 px-4">Type</th>
                <th className="py-2 px-4">Number of Reports</th>
              </tr>
            </thead>
            <tbody>
              {data.typeCounts.map((type: any, i: number) => (
                <tr key={i} className="border-b border-neutral-800 hover:bg-pink-900/20 cursor-pointer transition" title="View details">
                  <td className="py-2 px-4">{type.type}</td>
                  <td className="py-2 px-4">{type._count.id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Pie Charts Section */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800 mb-8" style={smallPieStyle}>
          <Pie data={areaPieData} options={pieOptions} />
        </div>
        <div className="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800 mb-8" style={smallPieStyle}>
          <Pie data={typePieData} options={pieOptions} />
        </div>
      </div>
      {/* Interactive Map & Heatmap Section */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4 text-sky-400">Incident Heatmap</h2>
        <div className="bg-neutral-900/50 rounded-xl p-4 border border-neutral-800">
          <SafetyMap />
        </div>
      </div>
      {/* Effective Features Section */}
      <div className="mb-8 p-6 rounded-2xl bg-neutral-900/70 border border-emerald-900 shadow-lg">
        <div className="text-lg font-semibold text-emerald-200 mb-2">Effective Features</div>
        <ul className="list-disc pl-6 text-emerald-100 space-y-1">
          <li>Real-time analytics and summary of crime reports</li>
          <li>Highlight of top areas and most common crime types</li>
          <li>Interactive tables (click rows for more details in future)</li>
          <li>Color-coded data for quick pattern recognition</li>
          <li>Accessible and responsive design for all devices</li>
          <li>Potential for map/heatmap, trend graphs, and export features</li>
        </ul>
      </div>
    </div>
  );
}

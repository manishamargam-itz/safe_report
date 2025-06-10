"use client";

import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js elements for Pie/Bar charts
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

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

  // AI-powered NLP summary, sentiment, and keywords
  const [aiSummary, setAiSummary] = useState<string>("");
  const [aiKeywords, setAiKeywords] = useState<string[]>([]);
  const [aiEntities, setAiEntities] = useState<any>({ locations: [], people: [], organizations: [], dates: [] });
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");

  useEffect(() => {
    setAiLoading(true);
    fetch("/api/reports/ai-summary")
      .then((res) => res.json())
      .then((d) => {
        setAiSummary(d.summary);
        setAiKeywords(d.keywords);
        setAiEntities(d.entities || { locations: [], people: [], organizations: [], dates: [] });
      })
      .catch(() => setAiError("Failed to load AI summary."))
      .finally(() => setAiLoading(false));
  }, []);

  if (loading) return <div className="text-center py-12">Loading analysis...</div>;
  if (error) return <div className="text-center text-red-500 py-12">{error}</div>;
  if (!data) return null;

  // Helper to convert lat/lng to area name (show only rounded coordinates)
  function getAreaName(location: string) {
    if (!location || !location.includes(',')) return location || "Unknown";
    const [lat, lng] = location.split(',').map(Number);
    if (isNaN(lat) || isNaN(lng)) return location;
    // Show as '17.52, 78.37' only
    return `${lat.toFixed(2)}, ${lng.toFixed(2)}`;
  }

  // Prepare data for charts
  const areaLabels = data.areaCounts.map((area: any) => getAreaName(area.location));
  const areaCounts = data.areaCounts.map((area: any) => area._count.id);
  const typeLabels = data.typeCounts.map((type: any) => type.type);
  const typeCounts = data.typeCounts.map((type: any) => type._count.id);

  const areaPieData = {
    labels: areaLabels,
    datasets: [
      {
        label: "Number of Reports",
        data: areaCounts,
        backgroundColor: areaLabels.map((_: string, i: number) => `hsl(${(i * 360) / areaLabels.length}, 70%, 60%)`),
      },
    ],
  };

  const typePieData = {
    labels: typeLabels,
    datasets: [
      {
        label: "Number of Reports",
        data: typeCounts,
        backgroundColor: typeLabels.map((_: string, i: number) => `hsl(${(i * 360) / typeLabels.length}, 80%, 60%)`),
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: { labels: { color: '#fff' } },
      title: { display: false },
    },
  };
  const smallPieStyle = { maxWidth: 350, maxHeight: 350, margin: '0 auto' };

  // Alerts for spikes (exclude 'Unknown' from areaSpikes)
  const areaSpikes = (data.alerts?.areaSpikes || []).filter((a: string) => a !== "Unknown");
  const typeSpikes = data.alerts?.typeSpikes || [];

  return (
    <div className="min-h-screen bg-white text-gray-900 py-12 px-4 w-full">
      <div className="max-w-7xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-10 text-center bg-gradient-to-r from-sky-700 via-sky-400 to-emerald-400 bg-clip-text text-transparent drop-shadow-lg">
          Crime Report Analysis
        </h1>
        {(areaSpikes.length > 0 || typeSpikes.length > 0) && (
          <div className="mb-10 p-5 rounded-2xl bg-red-50 border border-red-200 text-red-700 flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <svg className="w-5 h-5 text-red-400 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              Crime Pattern Alert
            </h2>
            {areaSpikes.length > 0 && (
              <div className="mb-1">Unusual spike in reports for area(s): <b>{areaSpikes.join(", ")}</b></div>
            )}
            {typeSpikes.length > 0 && (
              <div>Unusual spike in crime type(s): <b>{typeSpikes.join(", ")}</b></div>
            )}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12 w-full">
          <div>
            <h2 className="text-xl font-semibold mb-4 text-sky-800">Top Areas with Most Reports</h2>
            <div className="bg-white rounded-2xl shadow border border-sky-100 p-6 overflow-x-auto">
              <Pie data={areaPieData} options={{...pieOptions, plugins: { ...pieOptions.plugins, legend: { labels: { color: '#0369a1' }}}}} style={{maxWidth: 400, margin: '0 auto'}} />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4 text-emerald-800">Most Common Crime Types</h2>
            <div className="bg-white rounded-2xl shadow border border-emerald-100 p-6 overflow-x-auto">
              <Pie data={typePieData} options={{...pieOptions, plugins: { ...pieOptions.plugins, legend: { labels: { color: '#047857' }}}}} style={{maxWidth: 400, margin: '0 auto'}} />
            </div>
          </div>
        </div>
        <div className="mb-8 w-full">
          <h2 className="text-xl font-semibold mb-4 text-sky-800">AI-Powered Crime Report Summary</h2>
          <div className="bg-sky-50 rounded-2xl shadow border border-sky-100 p-6">
            {aiLoading ? (
              <span className="text-sky-400">Loading summary...</span>
            ) : aiError ? (
              <span className="text-red-400">{aiError}</span>
            ) : (
              <>
                <div className="mb-2 text-gray-800 whitespace-pre-line">{aiSummary}</div>
                {/* ML Integration Section */}
                {/*
                  ML Feature Ideas:
                  1. Anomaly Detection: Highlight weeks/areas/types with unusual spikes using statistical or ML models.
                  2. Trend Prediction: Use time series forecasting (ARIMA, Prophet, LSTM) to predict future crime rates or hotspots.
                  3. NLP Summarization: Use advanced NLP (BERT, GPT, spaCy) to generate summaries or extract key topics/entities from reports.
                  4. Clustering: Group similar reports (by type, location, time) to find patterns or emerging crime clusters.
                  5. Named Entity Recognition: Extract and highlight people, places, organizations, and dates from report texts.
                  6. Sentiment Analysis: Analyze the tone of reports to detect urgency, fear, or community sentiment.
                  7. Geospatial Heatmaps: Use ML to generate dynamic heatmaps of crime density and predict future hotspots.
                  8. Risk Scoring: Assign a risk score to areas or report types based on historical and real-time data.
                  9. Recommendation System: Suggest safety tips or police actions based on report content and trends.
                  10. Real-time Alerting: Use ML to trigger alerts for authorities when certain thresholds or patterns are detected.
                */}
                <div className="text-sm text-sky-700">
                  {aiEntities.locations.length > 0 && (
                    <div>Locations: <b>{aiEntities.locations.join(", ")}</b></div>
                  )}
                  {aiEntities.people.length > 0 && (
                    <div>People: <b>{aiEntities.people.join(", ")}</b></div>
                  )}
                  {aiEntities.organizations.length > 0 && (
                    <div>Organizations: <b>{aiEntities.organizations.join(", ")}</b></div>
                  )}
                  {aiEntities.dates.length > 0 && (
                    <div>Dates: <b>{aiEntities.dates.join(", ")}</b></div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

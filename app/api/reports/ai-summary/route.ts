import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Simple keyword extraction (top N words, ignoring stopwords)
function extractKeywords(text: string, n = 5) {
  const stopwords = new Set(["the", "is", "at", "which", "on", "a", "an", "and", "or", "in", "to", "of", "for", "with", "by", "as", "from", "that", "this", "it", "was", "were", "are", "be", "has", "have", "had", "but", "not", "no", "yes", "if", "so", "do", "did", "does", "can", "will", "just", "i", "you", "he", "she", "they", "we", "my", "your", "their", "our"]);
  const words = text.toLowerCase().replace(/[^a-z0-9 ]/g, "").split(/\s+/);
  const freq: Record<string, number> = {};
  for (const word of words) {
    if (!stopwords.has(word) && word.length > 2) {
      freq[word] = (freq[word] || 0) + 1;
    }
  }
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([word]) => word);
}

// Simple rule-based Named Entity Recognition (NER)
function extractEntities(text: string) {
  // Simple regex-based extraction for demo purposes
  const locations = Array.from(text.matchAll(/\b(?:at|in|near|on) ([A-Z][a-zA-Z0-9\s]+)/g)).map(m => m[1]);
  const people = Array.from(text.matchAll(/\b([A-Z][a-z]+ [A-Z][a-z]+)/g)).map(m => m[1]);
  const organizations = Array.from(text.matchAll(/\b([A-Z][a-zA-Z]+ (?:Police|Department|School|Hospital|Bank|Store|Center|Station))/g)).map(m => m[1]);
  const dates = Array.from(text.matchAll(/\b(?:on |at )?(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}|\b(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\b)/gi)).map(m => m[1]);
  return {
    locations: Array.from(new Set(locations)),
    people: Array.from(new Set(people)),
    organizations: Array.from(new Set(organizations)),
    dates: Array.from(new Set(dates)),
  };
}

function getMostCommon(arr: string[]): { value: string, count: number } {
  const freq: Record<string, number> = {};
  for (const v of arr) freq[v] = (freq[v] || 0) + 1;
  let max = 0, val = "";
  for (const k in freq) {
    if (freq[k] > max) {
      max = freq[k];
      val = k;
    }
  }
  return { value: val, count: max };
}

export async function GET() {
  // Get recent reports
  const reports = await prisma.report.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  const descriptions = reports.map(r => r.description).filter(Boolean);
  const allText = descriptions.join(" ");
  const keywords = extractKeywords(allText, 5);
  const entities = extractEntities(allText);

  // Aggregate by type and location
  const typeCounts: Record<string, number> = {};
  const locationCounts: Record<string, number> = {};
  for (const r of reports) {
    if (r.type) typeCounts[r.type] = (typeCounts[r.type] || 0) + 1;
    if (r.location) locationCounts[r.location] = (locationCounts[r.location] || 0) + 1;
  }
  const mostCommonType = getMostCommon(reports.map(r => r.type || "Unknown"));
  const mostCommonLocation = getMostCommon(reports.map(r => r.location || "Unknown"));

  // Detect spikes (simple: if most common is much higher than average)
  const typeAvg = Object.values(typeCounts).reduce((a, b) => a + b, 0) / (Object.keys(typeCounts).length || 1);
  const locationAvg = Object.values(locationCounts).reduce((a, b) => a + b, 0) / (Object.keys(locationCounts).length || 1);
  const typeSpike = mostCommonType.count >= 2 * typeAvg;
  const locationSpike = mostCommonLocation.count >= 2 * locationAvg;

  // Build actionable summary (improved, more admin-friendly, no sentiment)
  let summary = "";
  if (!reports.length) {
    summary = "No recent reports to summarize.";
  } else {
    summary = `Weekly Crime Report:\n- Total reports: ${reports.length}\n- Most common type: '${mostCommonType.value}' (${mostCommonType.count} reports)`;
    if (typeSpike) summary += `\n- Alert: '${mostCommonType.value}' reports are significantly higher than average.`;
    if (mostCommonLocation.value && mostCommonLocation.value !== "Unknown") {
      summary += `\n- Area with highest activity: '${mostCommonLocation.value}' (${mostCommonLocation.count} reports)`;
      if (locationSpike) summary += ` (Unusual spike detected!)`;
      summary += ".";
    } else {
      summary += `\n- Most affected area: Not determined due to missing/incomplete location data. Recommend improving report location details for better hotspot analysis.`;
    }
    summary += keywords.length
      ? `\n- Key topics: ${keywords.join(", ")}.`
      : "";
    // Add NER summary
    const entitySummary = [];
    if (entities.locations.length) entitySummary.push(`Locations mentioned: ${entities.locations.slice(0,3).join(", ")}`);
    if (entities.people.length) entitySummary.push(`People referenced: ${entities.people.slice(0,3).join(", ")}`);
    if (entities.organizations.length) entitySummary.push(`Organizations: ${entities.organizations.slice(0,3).join(", ")}`);
    if (entities.dates.length) entitySummary.push(`Dates: ${entities.dates.slice(0,3).join(", ")}`);
    if (entitySummary.length) summary += `\n- Entities: ${entitySummary.join("; ")}.`;
    // Safety recommendations
    summary += "\n\nSafety Recommendations:";
    if (mostCommonType.value.toLowerCase().includes("emergency")) {
      summary += "\n- Ensure emergency response teams are on high alert.";
      summary += "\n- Encourage the public to report emergencies with precise locations.";
    }
    summary += "\n- Increase community awareness and encourage detailed reporting.";
    if (mostCommonLocation.value && mostCommonLocation.value !== "Unknown") {
      summary += `\n- Consider targeted patrols or interventions in '${mostCommonLocation.value}'.`;
    } else {
      summary += "\n- Monitor general hotspots and improve location data collection.";
    }
  }

  return NextResponse.json({ summary, keywords, entities });
}

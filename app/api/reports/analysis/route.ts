import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Helper: Detect spikes in crime type or area
function detectSpikes(counts: { label: string; count: number }[], threshold = 2) {
  // Simple: flag if any count is >= threshold * average
  if (counts.length === 0) return [];
  const avg = counts.reduce((sum, c) => sum + c.count, 0) / counts.length;
  return counts.filter(c => c.count >= threshold * avg).map(c => c.label);
}

// GET /api/reports/analysis
export async function GET() {
  // Group by location
  const areaCounts = await prisma.report.groupBy({
    by: ["location"],
    _count: { id: true },
  });
  // Group by type
  const typeCounts = await prisma.report.groupBy({
    by: ["type"],
    _count: { id: true },
  });

  // Detect spikes
  const areaSpikes = detectSpikes(areaCounts.map(a => ({ label: a.location || "Unknown", count: a._count.id })));
  const typeSpikes = detectSpikes(typeCounts.map(t => ({ label: t.type, count: t._count.id })));

  return NextResponse.json({
    areaCounts,
    typeCounts,
    alerts: {
      areaSpikes,
      typeSpikes,
    },
  });
}

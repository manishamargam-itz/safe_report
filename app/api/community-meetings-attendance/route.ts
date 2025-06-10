import { NextRequest, NextResponse } from "next/server";

let attendanceCounts: Record<string, number> = {
  "1": 0,
  "2": 0,
  "3": 0
};

export async function GET() {
  return NextResponse.json(attendanceCounts);
}

export async function POST(req: NextRequest) {
  const { meetingId } = await req.json();
  if (meetingId) {
    attendanceCounts[meetingId] = (attendanceCounts[meetingId] || 0) + 1;
    return NextResponse.json({ success: true, count: attendanceCounts[meetingId] });
  }
  return NextResponse.json({ success: false }, { status: 400 });
}

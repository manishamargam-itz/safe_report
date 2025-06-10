import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const data = await req.json();
    if (!data.title || !data.time || !data.location) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    const meeting = await prisma.communityMeeting.update({
      where: { id: params.id },
      data: {
        title: data.title,
        time: new Date(data.time),
        location: data.location,
      },
    });
    return NextResponse.json(meeting);
  } catch (err) {
    return NextResponse.json({ error: "Failed to update meeting" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.communityMeeting.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete meeting" }, { status: 500 });
  }
}

// Add feedback POST endpoint for a meeting
export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const data = await req.json();
    // Expect: { rating: number, comment?: string }
    if (typeof data.rating !== 'number' || data.rating < 1 || data.rating > 5) {
      return NextResponse.json({ error: "Rating must be 1-5" }, { status: 400 });
    }
    // Optional: comment
    const feedback = await prisma.feedback.create({
      data: {
        meetingId: params.id,
        rating: data.rating,
        comment: data.comment || null,
      },
    });
    return NextResponse.json(feedback);
  } catch (err) {
    return NextResponse.json({ error: "Failed to submit feedback" }, { status: 500 });
  }
}

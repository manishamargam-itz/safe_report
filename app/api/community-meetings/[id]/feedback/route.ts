import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET all feedback for a meeting
export async function GET(req: Request) {
  try {
    // Extract meeting id from the URL
    const url = new URL(req.url);
    const segments = url.pathname.split("/");
    const id = segments[segments.length - 2]; // [id] is the second last segment

    const feedbacks = await prisma.feedback.findMany({
      where: { meetingId: id },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(feedbacks);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch feedback" }, { status: 500 });
  }
}
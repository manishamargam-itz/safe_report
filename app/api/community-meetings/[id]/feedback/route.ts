import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET all feedback for a meeting
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const feedbacks = await prisma.feedback.findMany({
      where: { meetingId: params.id },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(feedbacks);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch feedback" }, { status: 500 });
  }
}

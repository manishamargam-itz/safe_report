import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const meetings = await prisma.communityMeeting.findMany({
      orderBy: { time: "asc" },
    });
    return NextResponse.json(meetings);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch meetings" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    if (!data.title || !data.time || !data.location) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    const meeting = await prisma.communityMeeting.create({
      data: {
        title: data.title,
        time: new Date(data.time),
        location: data.location,
      },
    });
    return NextResponse.json(meeting, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to create meeting" }, { status: 500 });
  }
}

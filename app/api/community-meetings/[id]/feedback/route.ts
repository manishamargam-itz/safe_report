import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET all feedback for a meeting
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const feedbacks = await prisma.feedback.findMany({
      where: { meetingId: id },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(feedbacks);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch feedback' }, { status: 500 });
  }
}

// POST new feedback for a meeting
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();

    const feedback = await prisma.feedback.create({
      data: {
        ...body,
        meetingId: id,
      },
    });

    return NextResponse.json(feedback, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create feedback' }, { status: 500 });
  }
}

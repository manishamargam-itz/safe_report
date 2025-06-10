import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const url = new URL(req.url);
    const segments = url.pathname.split("/");
    const id = segments[segments.length - 1]; // or -2 if needed

    // your logic using id
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
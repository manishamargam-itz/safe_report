import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Create contact message in database
    const contactMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        subject,
        message,
        // For unauthenticated users, we'll use a default user ID
        // You might want to create a system user for this purpose
        userId: 1, // This should be the ID of a system user
      },
    });

    // In a real application, you would send an email here
    // For now, we'll just log it
    console.log("New contact message:", {
      id: contactMessage.id,
      name,
      email,
      subject,
      message,
    });

    return NextResponse.json(
      { message: "Contact message received successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing contact message:", error);
    return NextResponse.json(
      { error: "Failed to process contact message" },
      { status: 500 }
    );
  }
} 
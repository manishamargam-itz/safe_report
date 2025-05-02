// src/app/api/reports/create/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Ensure authOptions are correctly defined in lib/auth
import prisma from "@/lib/prisma";

// Define the enums locally since they're not exported from @prisma/client
enum ReportStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  RESOLVED = "RESOLVED",
  DISMISSED = "DISMISSED"
}

enum ReportType {
  EMERGENCY = "EMERGENCY",
  NON_EMERGENCY = "NON_EMERGENCY"
}

export async function POST(request: Request) {
  try {
    // 1. Authentication Check
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Parse and Validate Input
    const requestData = await request.json();
    
    // Required fields from your schema
    const requiredFields = ['reportId', 'type', 'title', 'description'];
    const missingFields = requiredFields.filter(field => !requestData[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          error: `Missing required fields: ${missingFields.join(', ')}`,
          requiredFields: requiredFields
        },
        { status: 400 }
      );
    }

    // Validate ReportType enum values
    if (!Object.values(ReportType).includes(requestData.type)) {
      return NextResponse.json(
        { 
          error: "Invalid report type",
          validTypes: Object.values(ReportType), // Will show ["EMERGENCY", "NON_EMERGENCY"]
          received: requestData.type
        },
        { status: 400 }
      );
    }

    // 3. Create Report
    const report = await prisma.report.create({
      data: {
        reportId: requestData.reportId,
        type: requestData.type,
        title: requestData.title,
        description: requestData.description, // Required in schema
        location: requestData.location || null,
        latitude: requestData.latitude ? Number(requestData.latitude) : null,
        longitude: requestData.longitude ? Number(requestData.longitude) : null,
        image: requestData.image || null,
        status: ReportStatus.PENDING // Use the enum value from Prisma
      }
    });

    // 4. Return Success Response
    return NextResponse.json(report, { status: 201 });

  } catch (error: any) {
    // 5. Enhanced Error Handling
    console.error("Report creation failed:", {
      message: error.message,
      code: error.code,
      meta: error.meta,
      stack: error.stack
    });

    // Handle specific Prisma errors
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: "Report ID must be unique" },
        { status: 409 }
      );
    }

    // Handle database connection errors
    if (error.code === 'P1001') {
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 503 }
      );
    }

    // Generic error response
    return NextResponse.json(
      { 
        error: "Failed to create report",
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // 1. Authentication Check
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Fetch all reports
    const reports = await prisma.report.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(reports);
  } catch (error: any) {
    console.error("Error fetching reports:", error);
    return NextResponse.json(
      { error: "Failed to fetch reports" },
      { status: 500 }
    );
  }
}

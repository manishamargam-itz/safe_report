import { NextResponse } from "next/server";
import { ReportStatus, ReportType } from "@prisma/client";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function GET(
  request: Request,
  { params }: { params: { reportId: string } }
) {
  try {
    if (!params.reportId) {
      return NextResponse.json({ error: "Report ID is required" }, { status: 400 });
    }

    const report = await prisma.report.findUnique({
      where: {
        reportId: params.reportId,
      },
      select: {
        id: true,
        reportId: true,
        status: true,
        createdAt: true,
        title: true,
        description: true,
        location: true,
        type: true,
      },
    });

    if (!report) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    // Validate report type
    if (!Object.values(ReportType).includes(report.type)) {
      return NextResponse.json(
        { error: "Invalid report type" },
        { status: 400 }
      );
    }

    // Convert enum values to strings
    const response = {
      ...report,
      status: report.status.toString(),
      type: report.type.toString(),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching report details:", error);
    return NextResponse.json(
      { error: "Failed to fetch report details" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { status } = await request.json();
    const report = await prisma.report.update({
      where: { id: params.id },
      data: { status },
    });

    return NextResponse.json(report);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update report status" },
      { status: 500 }
    );
  }
}
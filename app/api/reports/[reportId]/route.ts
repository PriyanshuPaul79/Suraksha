
// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma"; // Adjust the import based on your setup
// import { ReportStatus } from "@prisma/client";

// export async function PATCH(
//   request: Request,
//   { params }: { params: { reportId: string } } // Extract reportId from params
// ) {
//   const { reportId } = params;

//   if (!reportId) {
//     return NextResponse.json(
//       { error: "Report ID is required" },
//       { status: 400 }
//     );
//   }

//   const { status } = await request.json();

//   if (!status || !Object.values(ReportStatus).includes(status)) {
//     return NextResponse.json(
//       { error: "Invalid status" },
//       { status: 400 }
//     );
//   }

//   try {
//     const updatedReport = await prisma.report.update({
//       where: { id: reportId }, // Use the correct field name (id or reportId)
//       data: { status },
//     });

//     return NextResponse.json(updatedReport, { status: 200 });
//   } catch (error) {
//     console.error("Error updating report:", error);
//     return NextResponse.json(
//       { error: "Failed to update report" },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { ReportStatus } from "@prisma/client";
import { NextRequest } from "next/server";

export async function PATCH(request: NextRequest) {
  try {
    // Extract reportId from the URL
    const url = new URL(request.nextUrl);
    const pathParts = url.pathname.split("/");
    const reportId = pathParts[pathParts.length - 1]; // Last part of the path

    if (!reportId) {
      return NextResponse.json({ error: "Report ID is required" }, { status: 400 });
    }

    const { status } = await request.json();

    if (!status || !Object.values(ReportStatus).includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const updatedReport = await prisma.report.update({
      where: { id: reportId },
      data: { status },
    });

    return NextResponse.json(updatedReport, { status: 200 });
  } catch (error) {
    console.error("Error updating report:", error);
    return NextResponse.json({ error: "Failed to update report" }, { status: 500 });
  }
}

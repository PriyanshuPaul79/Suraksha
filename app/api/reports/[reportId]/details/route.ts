// // this will help the admin to change the status of the report 

// import { NextResponse } from "next/server";
// import {PrismaClient} from "@prisma/client";
// import {getServerSession } from "next-auth";


// const prisma = new PrismaClient();

// export async function GET(
//     request: Request,
//     { params }: { params: { reportId: string } }
//   ) {
//     try {
//       const report = await prisma.report.findUnique({
//         where: {
//           reportId: params.reportId,
//         },
//       });
  
//       if (!report) {
//         return NextResponse.json({ error: "Report not found" }, { status: 404 });
//       }
  
//       return NextResponse.json(report);
//     } catch (error) {
//       console.error("Error fetching report details:", error);
//       return NextResponse.json(
//         { error: "Failed to fetch report details" },
//         { status: 500 }
//       );
//     }
//   }
  
//   //update using admin access
// import { NextResponse } from "next/server";
// import { NextRequest } from "next/server";

// export async function GET(
//   request: NextRequest,
//   { params }: { params: { reportId: string } }
// ) {
//   const { reportId } = params;

//   // Validate reportId
//   if (!reportId) {
//     return NextResponse.json(
//       { error: "Report ID is required" },
//       { status: 400 }
//     );
//   }

//   // Fetch report details from the database or an external API
//   try {
//     const reportDetails = await fetchReportDetails(reportId); // Replace with your logic
//     return NextResponse.json(reportDetails, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching report details:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch report details" },
//       { status: 500 }
//     );
//   }
// }

// // Example function to fetch report details
// async function fetchReportDetails(reportId: string) {
//   // Replace this with your actual logic (e.g., database query or API call)
//   return { id: reportId, title: "Sample Report", status: "PENDING" };
// }


import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Extract reportId from the request URL
    const url = new URL(request.nextUrl);
    const reportId = url.pathname.split("/").pop(); // Extracts the last segment as the ID

    if (!reportId) {
      return NextResponse.json(
        { error: "Report ID is required" },
        { status: 400 }
      );
    }

    // Fetch report details from the database or an external API
    const reportDetails = await fetchReportDetails(reportId); // Replace with your actual logic

    return NextResponse.json(reportDetails, { status: 200 });
  } catch (error) {
    console.error("Error fetching report details:", error);
    return NextResponse.json(
      { error: "Failed to fetch report details" },
      { status: 500 }
    );
  }
}

// Example function to fetch report details (Replace with actual DB query)
async function fetchReportDetails(reportId: string) {
  return { id: reportId, title: "Sample Report", status: "PENDING" };
}

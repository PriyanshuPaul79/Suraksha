// // // this will help the admin to change the status of the report 

// import { NextResponse,NextRequest } from "next/server";
// import {PrismaClient} from "@prisma/client";
// import {getServerSession } from "next-auth";


// const prisma = new PrismaClient();

// export async function GET(
//     req: NextRequest,
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

  import { NextResponse, NextRequest } from "next/server";
  import { PrismaClient } from "@prisma/client";
  
  const prisma = new PrismaClient();
  
  export async function GET(
    req: NextRequest,
    { params }: { params: { reportId: string } }
  ) {
    try {
      if (!params?.reportId) {
        return NextResponse.json({ error: "Missing report ID" }, { status: 400 });
      }
  
      // Fetch report with correct ID field (ensure your schema has "reportId")
      const report = await prisma.report.findUnique({
        where: { reportId: params.reportId }, 
      });
  
      if (!report) {
        return NextResponse.json({ error: "Report not found" }, { status: 404 });
      }
  
      return NextResponse.json(report);
    } catch (error) {
      console.error("Error fetching report details:", error);
      return NextResponse.json(
        { error: "Failed to fetch report details" },
        { status: 500 }
      );
    } finally {
      await prisma.$disconnect();
    }
  }
  
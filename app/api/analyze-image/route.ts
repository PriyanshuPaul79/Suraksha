import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAi = new GoogleGenerativeAI(process.env.GEMINI_KEY || "");

export async function POST(request: Request) {
    try {
        const { image } = await request.json();
        const base64 = image.split(",")[1];
        const model = genAi.getGenerativeModel({ model: "gemini-1.5-pro" });


        const prompt = `Analyze this emergency situation image and respond in this exact format without any asterisks or bullet points:
        TITLE: Write a clear, brief title
        TYPE: Choose one (Theft, Fire Outbreak, Medical Emergency, Natural Disaster, Violence, or Other)
        DESCRIPTION: Write a clear, concise description`;

        const result = await model.generateContent([
            prompt,
            {
                inlineData: {
                    data: base64,
                    mimeType: "image/jpeg",
                },
            },
        ]);

        const text = await result.response.text();

        //   regeular expression to pass the result 

        const titleMatch = text.match(/TITLE:\s*(.+)/);
        const typeMatch = text.match(/TYPE:\s*(.+)/);
        const descMatch = text.match(/DESCRIPTION:\s*(.+)/);

        return NextResponse.json({
            title: titleMatch?.[1]?.trim() || "",
            reportType: typeMatch?.[1]?.trim() || "",
            description: descMatch?.[1]?.trim() || "",
        });

    } catch (error) {
        console.error("Image analysis error:", error);
        return NextResponse.json(
            { error: "Failed to analyze image" },
            { status: 500 }
        );
    }
}

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log("Received Data:", body); // Log incoming request data

        const { email, password, name, role } = body;

        if (!email || !password || !name || !role) {
            console.error("Missing required fields:", { email, password, name, role });
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        if (!["ADMIN", "MODERATOR", "USER"].includes(role)) {
            console.error("Invalid role:", role);
            return NextResponse.json({ error: "Invalid role" }, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            console.error("User already exists:", email);
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
                role,
            },
        });

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;

        return NextResponse.json(userWithoutPassword, { status: 201 });

    } catch (error: any) {
        console.error("Error creating user:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

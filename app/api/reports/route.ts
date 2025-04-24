import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
    try {
        const { userId, courseId } = await req.json();

        if (!userId || !courseId) {
            return NextResponse.json({ error: "User ID and Course ID are required" }, { status: 400 });
        }

        // Create a new report entry in the database
        await db.report.create({
            data: {
                userId,
                courseId,
            },
        });

        return NextResponse.json({ message: "Course reported successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error reporting course:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
"use server";
import { db } from "@/lib/db";

export const getPublished = async (courseId: string): Promise<boolean> => {
    try {
        const course = await db.course.findUnique({
            where: { id: courseId },
            select: { isPublished: true },
        });

        return course?.isPublished ?? false; // Returns `false` if course is not found
    } catch (error) {
        console.error("Error fetching published status:", error);
        return false;
    }
};
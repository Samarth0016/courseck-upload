import { db } from "@/lib/db";
import { Category, Chapter, Course } from "@prisma/client";
import { redirect } from "next/navigation";

type CourseWithCategory = Course & {
    category: Category | null;
    chapters: Chapter[];
};

export const getAdminReported = async (userId: string): Promise<CourseWithCategory[]> => {
    try {
        if (!userId) {
            throw new Error("Invalid userId: " + userId);
        }

        const coursesWithFiveOrMoreReports = await db.course.findMany({
            where: {
              reports: {
                some: {}, // Ensures it has at least one report
              },
            },
            include: {
                category: true, // Ensure it includes category
                chapters: true, // Include chapters
                reports: true, // Include reports to count them in JS
            },
          });
          
          const filteredCourses = coursesWithFiveOrMoreReports.filter(course => course.reports.length >= 5);
          
          return filteredCourses;
    } catch (error) {
        console.log("[GET_ADMIN_COURSES]", error);
        return [];
    }
};
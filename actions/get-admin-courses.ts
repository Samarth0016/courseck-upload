import { db } from "@/lib/db";
import { Category, Chapter, Course } from "@prisma/client";
import { redirect } from "next/navigation";

type CourseWithCategory = Course & {
    category: Category | null;
    chapters: Chapter[];
};

export const getAdminCourses = async (userId: string): Promise<CourseWithCategory[]> => {
    try {
        if (!userId) {
            throw new Error("Invalid userId: " + userId);
        }

        const courses = await db.course.findMany({
            where: {
                // userId: userId,
                reqToPublished: true, // Assuming you want only published courses
            },
            include: {
                category: true,
                chapters: {
                    where: {
                        isPublic: true,
                    }
                }
            }
        });

        // console.log(courses);

        return courses;
    } catch (error) {
        console.log("[GET_ADMIN_COURSES]", error);
        return [];
    }
};
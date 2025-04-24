import { db } from "@/lib/db";
import { Category, Chapter, Course } from "@prisma/client";

type CourseWithCategory = Course & {
    category: Category;
    chapters: Chapter[];
}

type DashboardCourses = {
    courses: CourseWithCategory[];
}


export const getDashboardCourses = async (userId: string) : Promise<DashboardCourses> => {
    try{
        if (!userId) {
            throw new Error("Invalid userId: " + userId);
        }
        const purchasedCourses = await db.purchase.findMany({
            where: {
                userId: userId
            },
            select: {
                course: {
                    include: {
                        category: true,
                        chapters: true,
                    }
                }
            }
        });


        const courses = purchasedCourses.map((purchase) => purchase.course) as CourseWithCategory[];

        return {courses};
    } catch(error) {
        console.log("[GET_DASHBOARD_COURSES]", error);
        return {
            courses: [],
        }
    }
}
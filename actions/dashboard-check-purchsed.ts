"use server";
import { db } from "@/lib/db";

export const checkPurchased = async (userId: string, courseId: string): Promise<boolean> => {
    try {
        const purchase = await db.purchase.findUnique({
            where: {
                userId_courseId: {
                    userId,
                    courseId,
                },
            },
        });

        return !!purchase; // Returns `true` if purchased, `false` otherwise
    } catch (error) {
        console.error("Error checking purchase status:", error);
        return false;
    }
};

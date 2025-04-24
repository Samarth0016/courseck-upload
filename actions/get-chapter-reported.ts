import { db } from "@/lib/db";
import { Attachment, Chapter } from "@prisma/client";

interface GetChapterReportedProps {
    userId: string;
    courseId: string;
    chapterId: string;
}

export const getChapterReported = async ({
    userId,
    courseId,
    chapterId,
}: GetChapterReportedProps) => {
    try {
        // Fetch course that has 5 or more reports
        const course = await db.course.findUnique({
            where: { id: courseId },
            include: { reports: true }, // Fetch reports to count them
        });

        if (!course || course.reports.length < 5) {
            throw new Error("Course does not have enough reports.");
        }

        // Fetch chapter
        const chapter = await db.chapter.findUnique({
            where: { id: chapterId, isPublic: true },
        });

        if (!chapter) {
            throw new Error("Chapter not found");
        }

        let muxData = null;
        let attachments: Attachment[] = [];
        let nextChapter: Chapter | null = null;
        let userProgress = null;

        // Fetch purchase data
        const purchase = await db.purchase.findUnique({
            where: { userId_courseId: { userId, courseId } },
        });

        if (purchase) {
            attachments = await db.attachment.findMany({ where: { courseId } });
        }

        if (chapter.isFree || purchase) {
            muxData = await db.muxData.findUnique({ where: { chapterId } });

            nextChapter = await db.chapter.findFirst({
                where: {
                    courseId,
                    isPublic: true,
                    position: { gt: chapter.position },
                },
                orderBy: { position: "asc" },
            });

            userProgress = await db.userProgress.findUnique({
                where: { userId_chapterId: { userId, chapterId } },
            });
        }

        return {
            chapter,
            course, 
            muxData,
            attachments,
            nextChapter,
            userProgress,
            purchase,
        };
    } catch (error) {
        console.log("[GET-CHAPTER]", error);
        return {
            chapter: null,
            course: null, 
            muxData: null,
            attachments: [],
            nextChapter: null,
            userProgress: null,
            purchase: null,
        };
    }
};

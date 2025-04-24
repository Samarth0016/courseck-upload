import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    {params}: { params: {courseId: string; chapterId: string} }
) {

    try{
        const {userId} = await auth();
        if(!userId) {
            return new NextResponse("Unauthorized", {status:401});
        }
        
        const admin = await db.admin.findUnique({
            where:{
                userId,
            }
        })

        if(!admin){
            return new NextResponse("Unauthorized", {status:401});
        }

        const course = await db.course.findUnique({
            where: {
                id: params.courseId,
            },
            include: {
                chapters: true, // TODO: muxdata
            },
        });
        if(!course){
            return new NextResponse("Not Founded", { status:404 });
        }
        
        const hasPublishedChapter = course.chapters.some((chapter) => {
            chapter.isPublic
        });

        // if(!course.title || !course.description || !course.imageUrl || !course.categoryId || !hasPublishedChapter ){
        //     return new NextResponse("Missing required fields", {status : 401});
        // }

        const publishedCourse = await db.course.update({
            where: {
                id: params.courseId,
            },
            data: {
                isPublished: true,
                reqToPublished: false,
            }
        });
       

        return NextResponse.json(publishedCourse);

    } catch(error){
        console.log("[COURSE_ID_PUBLISH]", error);
        return new NextResponse("Internal Error", { status: 500}); 
    }
    
}
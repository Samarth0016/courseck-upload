// import { Mux } from "@mux/mux-node";

import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";


// const { Video } = new Mux(
//   process.env.MUX_TOKEN_ID!,
//   process.env.MUX_TOKEN_SECRET!,
// )

export async function DELETE(
  req: Request,
  { params }: {params: { courseId: string}}
){
  try{
    const { userId } = await auth();

    if(!userId){
      return new NextResponse("Unauthorized", {status:401});
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
      include: {
        chapters: {
          include: {
            muxData: true,
          }
        }
      }
    })
    if(!course){
      return new NextResponse("unauthorized", {status:404});
    }
    //todo: delete mux data
    const deleteCourse = await db.course.delete({
      where:{
        id: params.courseId,
      }
    })

    return NextResponse.json(deleteCourse);
  } catch(error){
    console.log("[COURSE_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    
    // Extract user authentication
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Validate courseId parameter
    const courseId = params.courseId;
    if (!courseId) {
      console.error("Course ID is missing");
      return new NextResponse("Bad Request: Course ID is required", { status: 400 });
    }

    // Parse JSON body from request
    const values = await req.json();
    if (!values) {
      return new NextResponse("Bad Request: Invalid data", { status: 400 });
    }

    // Update the course in the database
    const course = await db.course.update({
      where: {
        id: courseId,
        userId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.error("[PATCH /course]:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

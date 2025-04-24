import { NextResponse } from "next/server";
import { auth } from '@clerk/nextjs/server';
import { db } from "@/lib/db"
//import { auth } from "@clerk/nextjs"; 

export async function POST(
    req: Request,
) {
    try{
        const { userId } = await auth();
        //userId will Give error if docker is not running 
        const {title} = await req.json();
        if(!userId) { 
            return new NextResponse("Unauthorized", {status:401});
        }
        const course = await db.course.create({
            data: {
                userId,
                title
            }
        });
        return NextResponse.json(course);

    } catch(error){
        console.log("[COURSES]", error);
        return new NextResponse("Internal Error ", {status:500});
    }
}
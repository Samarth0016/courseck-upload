import { getChapter } from "@/actions/get-chapter";
import { Banner } from "@/components/banner";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import VideoEmbedComponent from "../../_components/VideoEmbedComponent";
import { CourseEnrollButton } from "./_components/course-enroll-button";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";
import { File } from "lucide-react";
import { db } from "@/lib/db";
import { getChapterAdmin } from "@/actions/get-chapter-admin";
import { Button } from "@/components/ui/button";
import { AdminActions } from "../../_components/admin-action-publish";
import { getChapterReported } from "@/actions/get-chapter-reported";


const ChapterIdPage = async ({ params }: { params: { courseId: string; chapterId: string } }) => {
  const { courseId, chapterId } = params; // Ensure params are destructured first
  const { userId } = await auth();

  if (!userId) {
      return redirect("/");
  }

  const chapterData = await getChapterReported({
      userId,
      chapterId,
      courseId,
  });

  const admin = await db.admin.findUnique({
    where:{
      userId,
    }
  });

  // const isRequested = await db.course.findUnique({
  //   where:{
      
  //   }
  // })

  if(!admin){
    return redirect("/");
  }

  if (!chapterData ) {
      console.log("not chapterData");
      return redirect("/");
  }
  if(!chapterData.chapter ){
    console.log("not chapterData.chapter");
      return redirect("/");
  }
  if(!chapterData.course){
    console.log("not chapterData.course");
      return redirect("/");
  }

  const { chapter, course, muxData, attachments, nextChapter, userProgress, purchase } = chapterData;

  const isLocked = false;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;

  

  return (
      <div>
        <div className="w-full flex justify-end py-6 bg-slate-50 pr-6">
          <AdminActions
            disabled= {false}
            courseId= {params.courseId}
            // isPublic={false}
          />
        </div>
          {userProgress?.isCompleted && (
              <Banner variant="success" label="You already completed this chapter." />
          )}
          {/* {isLocked && (
              <Banner variant="warning" label="You need to purchase this course to watch this chapter." />
          )} */}
          <div className="flex flex-col max-w-4xl mx-auto pb-20">
              <div className="p-4">
                  <VideoEmbedComponent url={chapter.videoUrl ?? ""} title={chapter.title} isLocked />
              </div>
              <div>
                <div className="p-4 flex flex-col md:flex-row items-center justify-between">
                  <h2 className="text-2xl font-semibold mb-2">
                    {chapter.title}
                  </h2>
                  {1 ? (
                    <div>
                      {/* Todo: progress */}
                    </div>
                  ) : (
                    <CourseEnrollButton
                      courseId={params.courseId}
                      price={course.price!}
                    />
                  )}
                </div>
                <Separator>
                </Separator>
                <div className="m-2">
                    {chapter.description!}
                </div>
                {!!attachments.length && (
                  <>
                  <Separator/>
                  <div className="p-4">
                    {attachments.map((attachment) => (
                      <a 
                      href={attachment.url}
                      target= "_blank"
                      key={attachment.id}
                      className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                      >
                        <File/>
                        <p className="line-clamp-1">
                          {attachment.name}
                        </p>
                      </a>
                    ))}
                  </div>
                  </>
                )}
              </div>
          </div>
      </div>
  );
};

export default ChapterIdPage;

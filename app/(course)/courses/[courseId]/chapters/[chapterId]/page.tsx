import { getChapter } from "@/actions/get-chapter";
import { Banner } from "@/components/banner";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import VideoEmbedComponent from "../../_components/VideoEmbedComponent";
import { CourseEnrollButton } from "./_components/course-enroll-button";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";
import { File } from "lucide-react";
import { DashboardActions } from "./_components/dashboard-action";


const ChapterIdPage = async ({ params }: { params: { courseId: string; chapterId: string } }) => {
  const { courseId, chapterId } = params; // Ensure params are destructured first
  const { userId } = await auth();

  if (!userId) {
      return redirect("/");
  }

  const chapterData = await getChapter({
      userId,
      chapterId,
      courseId,
  });

  if (!chapterData || !chapterData.chapter || !chapterData.course) {
      return redirect("/");
  }

  const { chapter, course, muxData, attachments, nextChapter, userProgress, purchase } = chapterData;

  const isLocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;

  return (
      <div>
          {userProgress?.isCompleted && (
              <Banner variant="success" label="You already completed this chapter." />
          )}
          {isLocked && (
              <Banner variant="warning" label="You need to purchase this course to watch this chapter." />
          )}
          {/* {purchase ? (
                    <div>
                      
                    </div>
                  ) : (
                    <CourseEnrollButton
                      courseId={params.courseId}
                      price={course.price!}
                    />
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
                  {purchase ? (
                    <div>
                      <DashboardActions
                        userId={userId}
                        courseId= {courseId}
                      />
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

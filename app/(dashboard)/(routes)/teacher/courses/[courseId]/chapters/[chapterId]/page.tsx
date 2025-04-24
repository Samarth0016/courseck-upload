import IconBadge from '@/components/icon-badge';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { ArrowLeft, Eye, Icon, LayoutDashboard, Video } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { NextResponse } from 'next/server';
import React from 'react'
import ChapterTitleForm from './_components/chapter-title-form';
import ChapterDescriptionForm from './_components/chapter-description-form';
import ChapterAccessForm from './_components/chapter-access-form';
import ChapterVideo from './_components/chapter-video-form';
import { Banner } from '@/components/banner';
import { ChapterActions } from './_components/chapter-action';
import YtVideoForm from './_components/yt-video-url';

const ChapterIdPage = async ({
  params
}:{
  params: {courseId: string; chapterId: string;}
})  => {
  const { userId } = await auth();
  const { courseId, chapterId } = await params;

  if(!userId) {
    return redirect('/');
  }
  
  //const params:{courseId: string; chapterId: string;} = await param;

  const chapter = await db.chapter.findUnique({
    where: {
      id: chapterId,
      courseId: courseId
    },
    include: {
      muxData: true,
    }
  });

  if(!chapter){
    return redirect("/");
  }

  //add videoUrl
  const requiredField = [
    chapter.title,
    chapter.description,
  ];

  const totalFields = requiredField.length;
  const completedFields = requiredField.filter(Boolean).length;
  
  const complettionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredField.every(Boolean);

  return (
    <>
    {!chapter.isPublic && (
      <Banner 
        variant="warning"
        label='This chapter is unpublished. And it will not be visible in the course'
      ></Banner>
    )}
    <div className='p-6'>
      <div className='flex items-center justify-between'>
        <div className='w-full'>
          <Link 
            href={`/teacher/courses/${courseId}`}
            className = "flex items-center text-sm hover:opacity-75 transition mb-6"
          >
            <ArrowLeft className='h-4 w-4 mr-2'></ArrowLeft>
            Back To Course Setup
          </Link>
          <div className='flex items-center justify-between w-full'>
            <div className='flex flex-col gap-y-2'>
              <h1 className='text-2xl font-medium'>
                Chapter Creation
              </h1>
              <span className='text-sm text-slate-700'>
                Complete all fields {complettionText}
              </span>
            </div>
            <ChapterActions
              disabled = {!isComplete}
              courseId = {params.courseId}
              chapterId = {params.chapterId}
              isPublic = {chapter.isPublic}
            />
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-16'>
        <div className='space-y-4'>
          <div>
            <div className='flex items-center gap-x-2'>
              <IconBadge icon={LayoutDashboard}></IconBadge>
              <h2 className='text-xl'>Customise Your Chapter</h2>
            </div>
            <ChapterTitleForm
              initialData={chapter}
              courseId={courseId}
              chapterId={chapterId}
            ></ChapterTitleForm>
            <ChapterDescriptionForm
              initialData={chapter}
              courseId= {courseId}
              chapterId= {chapterId}
            />
          </div>
          <div>
          <div className='flex items-center gap-x-2'>
            <IconBadge 
              icon={Eye}
            ></IconBadge>
            <h2 className='text-xl'>Access Setting</h2> 
          </div>
          <ChapterAccessForm
            initialData={chapter}
            courseId={courseId}
            chapterId={chapterId}
          ></ChapterAccessForm>
        </div>
        </div>
        <div>
        
        <div className='flex items-center gap-x-2'>
          <IconBadge
            icon={Video}
          ></IconBadge>
          <h2 className='text-xl'>
            Add a video
          </h2>
        </div>
        {/* <ChapterVideo
          initialData={chapter}
          chapterId= { chapterId }
          courseId= { courseId }
        ></ChapterVideo> */}
        <YtVideoForm
          initialData={{
            ...chapter,
            videoUrl: chapter.videoUrl ?? "Youtube video url", 
          }}
          chapterId= { chapterId }
          courseId= { courseId }
        />
        </div>
      </div>
    </div>
    </>
  )
}

export default ChapterIdPage

import { auth } from '@clerk/nextjs/server'
import React from 'react'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import IconBadge from '@/components/icon-badge'
import { Banner } from '@/components/banner'
import { CircleDollarSign, File, LayoutDashboard, ListCheck, ListChecks } from 'lucide-react'
import TitleForm from './_components/title-form'
import DescriptionForm from './_components/description'
//import { Description } from '@radix-ui/react-dialog'
import ImageForm from './_components/image-form'
import CategoryForm from './_components/catagory-form'
import PriceForm from './_components/price-form'
import AttachmentForm from './_components/attachment-form'
import ChapterForm from './_components/chapter-form'
import { Actions } from './_components/action'

const CourceIdPage = async ({
    params
}:{
    params: {courseId:string}
}) => {
    const { userId } = await auth();
    if(!userId){
        return redirect("/");
    }

    const paramsTemp = await params;

    if(!paramsTemp){
        return redirect("/");
    }

    const course = await db.course.findUnique({
        where:{
            id: paramsTemp.courseId,
            userId
        },
        include:{
            chapters: {
                orderBy: {
                    position: "asc",
                },
            },
            attachments: true,
        }
    });

    const categories = await db.category.findMany({
        orderBy: {
            name: "asc"
        }
    });
    
    //console.log(catagories);

    if(!course){
        return redirect("/");
    }

    const requireFields = [
        course.title,
        course.description,
        //course.imageUrl,
        course.price,
        course.categoryId,
        //course.chapters.some(chapter => chapter.isPublic),
    ];

    const totalFields = requireFields.length;
    const completedFields = requireFields.filter(Boolean).length;

    const completionText = '('+completedFields+'/'+totalFields+')'
    
    const isComplete = requireFields.every(Boolean);

  return (
    <>
    {!course.isPublished && (
        <Banner
            label='This course is unpublished it will be not visible to students.'
        ></Banner>
    )}
    <div className='p-6'>
      <div className='flex items-center justify-between'>
        <div>
            <h1 className='text-2xl font-medium'>
                Course setup
            </h1>
            <span className='text-sm text-slate-700'>
                complete all fields
            </span>
        </div>
        <Actions
            disabled= {!isComplete}
            courseId= {params.courseId}
            isPublic= {course.isPublished}
        />
      </div>
      <div className='text-sm text-slate-700 flex items-center justify-between'>
            <span>
                completed fields {completionText}
            </span>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-16'>
            <div>
            <div className='flex items-center gap-x-2'>
                <IconBadge icon={LayoutDashboard}></IconBadge>
                <h2 className='text-xl'>
                    Customize your course
                </h2>
            </div>
            <TitleForm 
                initialData={course}
                courseId={course.id}
            ></TitleForm>
            <DescriptionForm 
                initialData={{
                        description: course.description ?? '',
                    }
                }
                courseId={course.id}
            ></DescriptionForm>
            <ImageForm
                initialData={course}
                courseId={course.id}
            />
            <CategoryForm 
                initialData={course}
                courseId={course.id}
                options={categories.map((category)=>({
                    label : category.name,
                    value : category.id
                }))}
            ></CategoryForm>
            </div>   
            <div className='space-y-6'>
                <div>
                    <div className='flex items-center gap-x-2'>
                        <IconBadge icon={ListChecks}/>
                        <h2 className='text-xl'>
                            Course chapter 
                        </h2>
                    </div> 
                    <ChapterForm
                        initialData= {course}
                        courseId={course.id}
                    ></ChapterForm>
                </div>
                <div>
                    <div className='flex items-center gap-x-2'>
                        <IconBadge
                            icon={CircleDollarSign}
                        />
                        <h2 className='text-xl'>
                            Sell Your Course
                        </h2>
                    </div>
                    <PriceForm
                        initialData={course}
                        courseId= {course.id}
                    />
                </div>
                <div>
                    <div className='flex items-center gap-x-2'>
                        <IconBadge icon={File} ></IconBadge>
                        <h2 className='text-xl'>Resources & Attachment</h2>
                    </div>
                    <AttachmentForm 
                        initialData={course}
                        courseId={course.id}
                    />
                </div>
            </div>
            
        </div>
    </div>
    </>
  )
}

export default CourceIdPage

import { db } from '@/lib/db';
import React from 'react'
import { Categories } from '../../_components/catagories';
import { SearchInput } from '@/components/ui/search-input';
import { GetCourses } from '@/actions/get-courses';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { CourseList } from '../_components/courses-list';
import { getAdminCourses } from '@/actions/get-admin-courses';
import { getAdminReported } from '@/actions/get-admin-reported';
import { CourseListReported } from '../_components/course-list-reported';


interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  }
}

const SearchPage = async({
  searchParams
}: SearchPageProps) => {

  const { userId } = await auth();

  if(!userId){
    return redirect("/");
  }

  const admin  = await db.admin.findUnique({
    where: {
      userId
    }
  })

  if(!admin){
    return redirect("/");
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc"
    }
  });

  const courses = await getAdminReported(
    userId
    )

  return (
    <>
      <div className='p-6 space-y-4'>
        <CourseListReported items = {courses}/>
      </div>
    </>
  )
}


export default SearchPage

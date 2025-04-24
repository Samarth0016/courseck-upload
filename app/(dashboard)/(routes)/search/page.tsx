import { db } from '@/lib/db';
import React from 'react'
import { Categories } from '../_components/catagories';
import { SearchInput } from '@/components/ui/search-input';
import { GetCourses } from '@/actions/get-courses';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { CourseList } from '@/components/courses-list';


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

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc"
    }
  });

  const courses = await GetCourses({
    userId,
    ...searchParams
  })

  return (
    <>
      <div className='px-6 pt-6 md:hidden md:mb-0 block'>
        <SearchInput></SearchInput>
      </div>
      <div className='p-6 space-y-4'>
        <Categories
          items={categories}
        ></Categories>
        <CourseList items = {courses}/>
      </div>
    </>
  )
}


export default SearchPage

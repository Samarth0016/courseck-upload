"use client"
import React from 'react'
import { UserButton } from '@clerk/nextjs'
import { usePathname, useRouter } from 'next/navigation'
import {Button} from "@/components/ui/button"
import { Shield, LogOut } from 'lucide-react'
import Link from "next/link"
import { SearchInput } from './search-input'
const NavbarRoutes = () => {
    const pathname = usePathname();
    const router = useRouter();

    const isTeacherPage = pathname?.startsWith("/teacher");
    const isPlayerPage = pathname?.includes("/courses");
    const isSearchPage = pathname === "/search"
    
    const isDashboardPage =  pathname === "/"

  return (
    <>
    {isSearchPage && (
      <div className='hidden md:block'>
        <SearchInput/>
      </div>
    )}



    <div className='flex gap-x-2 ml-auto'>

      {isDashboardPage ? (
        <Link href="/admin/courses">
        <Button size="sm" variant="ghost">
            <Shield className='h-4 w-4 mr-1'/>
            Admin
        </Button>
      </Link>
      ):(<></>)}

      {isTeacherPage || isPlayerPage ?(
        <Link href="/">
          <Button size="sm" variant="ghost">
              <LogOut className='h-4 w-4 mr-2'/>
              Exit
          </Button>
        </Link>
      ):(
        <Link href="/teacher/courses">
            <Button size="sm" variant="ghost">
                Teacher mode
            </Button>
        </Link>
      )}
      <UserButton></UserButton>
    </div>
    </>
  )
}

export default NavbarRoutes
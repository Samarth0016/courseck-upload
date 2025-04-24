import React from 'react'
import { Menu } from 'lucide-react' 
import SideBar from './SideBar'
import { Sheet, SheetContent, SheetTrigger,SheetTitle } from "@/components/ui/sheet"
const MobileSidebar = () => {
  return (
    <Sheet>
        <SheetTrigger className='md:hidden p-4 hover:opacity-75 transition'>
            <Menu></Menu>
        </SheetTrigger >
        <SheetContent side="left" className='p-0 bg-white'>
            <SheetTitle></SheetTitle>
            <SideBar></SideBar>
        </SheetContent>
    </Sheet>
  )
}

export default MobileSidebar

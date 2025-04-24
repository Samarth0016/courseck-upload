"use client";
import React from 'react'
import { BarChart, BookCheck, Compass, Layout, List, TriangleAlert } from 'lucide-react';
import SideBarItems from './sidebar-items';
import { usePathname } from 'next/navigation';
const guestRoutes = [
    {
        icon: Layout,
        label: "Dashboard",
        href: "/"
    },
    {
        icon: Compass,
        label: "Browse",
        href: "/search"
    }
];

const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses"
  },
  {
      icon: BarChart,
      label: "Analytics",
      href: "/teacher/analytics"
  }
];
const adminRoutes = [
  {
    icon: BookCheck,
    label: "Requested",
    href: "/admin/courses"
  },
  {
      icon: TriangleAlert,
      label: "Reported",
      href: "/admin/reported"
  }
];



const SidebarRoutes = () => {
  const pathname = usePathname();
  const isTeacherPage = pathname?.includes("/teacher");
  const isadmin = pathname?.includes("/admin");

  const routes = isTeacherPage ? teacherRoutes : (isadmin ? adminRoutes : guestRoutes);
    return (
    <div className='flex flex-col w-full'>
      {routes.map((route)=>(
        <SideBarItems
            key = {route.href}
            icon = {route.icon}
            label = {route.label}
            href = {route.href}
        />
      ))}
    </div>
  )
}

export default SidebarRoutes

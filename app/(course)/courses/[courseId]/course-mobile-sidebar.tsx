import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { Menu } from "lucide-react";
import { CourseSidebar } from "./_components/course-sidebar";

interface CourseMobileSidebarProps {
    course: Course & {
        chapters: (Chapter & {
            userProgress: UserProgress[] | null;
        })[];
    };
    progressCount: number;
};

export const CourseMobileSidebar = ({
    course,
    progressCount
}: CourseMobileSidebarProps) => {
    return (
        <Sheet>
        <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
            <Menu></Menu>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 bg-white w-72">
        <SheetHeader>
            <SheetTitle></SheetTitle>
            <SheetDescription>
            </SheetDescription>
        </SheetHeader>
            <CourseSidebar
                course = {course}
                progressCount={progressCount}
            ></CourseSidebar>
        </SheetContent>
    </Sheet>
    )
}

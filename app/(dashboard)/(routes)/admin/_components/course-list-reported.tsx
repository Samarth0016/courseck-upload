import { Category, Course } from "@prisma/client" 
import { CourseCard } from "./course-card";
import { CourseCardReported } from "./course-card-reported";

type CourseWithProgressWithCategory = Course & {
    category: Category | null;
    chapters: { id: string}[];
    // progress: number | null;
};

interface CourseListReportedProps {
    items: CourseWithProgressWithCategory[];
}

export const CourseListReported = ({
    items
}: CourseListReportedProps) => {
    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 ">
            {items.map((item) => (
                <CourseCardReported
                    key = {item.id}
                    id = {item.id}
                    title = {item.title}
                    imageUrl = {item.imageUrl!}
                    chaptersLength = {item.chapters.length!}
                    price = {item.price!}
                    // progress = {item.progress}
                    category = {item?.category?.name!}
                />
            ))}
            {items.length === 0 && (
                <div className="text-center text-sm text-muted-foreground mt-10">
                    No Courses found 
                </div>
            ) }
        </div>
    )
}
import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { CourseList } from "@/components/courses-list";
import { UserButton } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";
import { InfoCard } from "../_components/info-card";
import { Clock } from "lucide-react";



export default async function Dashboard() {
  const { userId } = await auth();

  if(!userId) {
    return redirect("/");
  }

  const {
    courses
  } = await getDashboardCourses(userId);
  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* <InfoCard 
          icon= {Clock}
          label= "Courses"
        >
        </InfoCard> */}
        <CourseList
          items = {[...courses]}
        ></CourseList>
      </div>
    </div>
  )
} 
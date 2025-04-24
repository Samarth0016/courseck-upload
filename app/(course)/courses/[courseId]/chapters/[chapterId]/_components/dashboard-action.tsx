"use client";

import { Button } from "@/components/ui/button";
import { Flag } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { checkPurchased } from "@/actions/dashboard-check-purchsed";

interface DashboardActionsProps {
    userId: string;
    courseId: string;
}

export const DashboardActions = ({ userId, courseId }: DashboardActionsProps) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isPurchased, setIsPurchased] = useState<boolean>(false);

    useEffect(() => {
        const checkPurchaseStatus = async () => {
            try {
                const purchased = await checkPurchased(userId, courseId);
                setIsPurchased(purchased);
            } catch (error) {
                console.error("Error checking purchase status:", error);
            }
        };

        checkPurchaseStatus();
    }, [userId, courseId]);

    const onReport = async () => {
        try {
            setIsLoading(true);
            await axios.post(`/api/reports`, { userId, courseId });
            toast.success("Course reported successfully");
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong");
            console.error("Error reporting course:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center gap-x-2">
            {isPurchased && (
                <Button onClick={onReport} disabled={isLoading} variant="outline" size="sm">
                    <Flag className="h-4 w-4 mr-1" /> Report
                </Button>
            )}
        </div>
    );
};

"use client";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";


interface ChapterActionsProps {
    disabled: boolean;
    courseId: string;
    chapterId: string;
    isPublic: boolean;
};

export const ChapterActions = ({
    disabled,
    courseId,
    chapterId,
    isPublic,
}: ChapterActionsProps) => {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    const onDelete = async () => {
        try{
            setIsLoading(true);

            await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`);
            
            toast.success("chapter deleted");
            router.refresh();
            router.push(`/teacher/courses/${courseId}`);
            toast.success("Chapter deleted");
        } catch {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    const onClick = async () => {
        try {
            setIsLoading(true);
            if(isPublic){
                await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/unpublish`);
                toast.success("Chapter unpublished");
            }
            else{
                await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/publish`);
                toast.success("Chapter published");
            }
        } catch {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex items-center gap-x-2">
            <Button
                onClick={onClick}
                disabled={disabled || isLoading}
                variant="outline"
                size="sm"
            >
                {isPublic ? "Unpublish": "Publish"}
            </Button>
            <ConfirmModal onConfirm={onDelete}>
                <Button size="sm" disabled={isLoading}>
                    <Trash className="h-4 w-4"></Trash>
                </Button>
            </ConfirmModal>
        </div>  
    )
}
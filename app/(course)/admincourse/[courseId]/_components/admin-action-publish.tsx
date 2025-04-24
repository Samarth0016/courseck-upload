"use client";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { getPublished } from "@/actions/check-chapter-published"; 

interface AdminActionsProps {
    disabled: boolean;
    courseId: string;
};

export const AdminActions = ({ disabled, courseId }: AdminActionsProps) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isPublic, setIsPublic] = useState<boolean>(false); // Store the publish status

    // Fetch the published status when the component mounts
    useEffect(() => {
        const fetchPublishedStatus = async () => {
            const published = await getPublished(courseId);
            setIsPublic(published);
        };

        fetchPublishedStatus();
    }, [courseId]);

    const onDelete = async () => {
        try {
            setIsLoading(true);
            await axios.delete(`/api/courses/${courseId}`);
            toast.success("Course deleted");
            router.refresh();
            router.push(`/teacher/courses/`);
        } catch {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const onClick = async () => {
        try {
            setIsLoading(true);

            if (isPublic) {
                await axios.patch(`/api/admincourse/courses/${courseId}/unpublish`);
                toast.success("Course unpublished");
                setIsPublic(false);
            } else {
                await axios.patch(`/api/admincourse/courses/${courseId}/publish`);
                toast.success("Course published");
                setIsPublic(true);
            }
        } catch {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="flex items-center gap-x-2">
            <Button onClick={onClick} disabled={disabled || isLoading} variant="outline" size="sm">
                {isPublic ? "Unpublish" : "Publish"}
            </Button>
            <ConfirmModal onConfirm={onDelete} >
                <Button size="sm" disabled={isLoading || true}>
                    <Trash className="h-4 w-4" />
                </Button>
            </ConfirmModal>
        </div>
    );
};

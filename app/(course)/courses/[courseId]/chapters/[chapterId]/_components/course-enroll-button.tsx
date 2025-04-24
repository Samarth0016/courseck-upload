"use client";

import { formatePrice } from "@/app/lib/formate";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

interface CourseEnrollButtonProps {
    price: number;
    courseId: string;
}

export const CourseEnrollButton = ({
    price,
    courseId
}: CourseEnrollButtonProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try{
            setIsLoading(true);

            const response = await axios.post(`/api/courses/${courseId}/checkout`);

            window.location.assign(response.data.url);
        } catch {
            toast.error("something went wrong");
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <Button
            onClick={onClick}
            disabled={isLoading}
            size="sm"
            className="w-full md:w-auto"
        >
            Enroll for {formatePrice(price)}
        </Button>
    )
}
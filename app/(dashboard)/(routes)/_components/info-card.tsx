import IconBadge from "@/components/icon-badge"
import { LucideIcon } from "lucide-react";

interface InfoCardProps {
    variant?: "default" | "success";
    label: string;
    icon: LucideIcon;
}

export const InfoCard = ({
    variant,
    icon: Icon,
    label,

}: InfoCardProps) => {
    return (
        <div className="border rounded-md flex items-center gap-x-2 p-3">
            <IconBadge
                variant={variant}
                icon={Icon}
            ></IconBadge>
        </div>
    )
}
"use client";

import { Category } from "@prisma/client";
import {
    FcEngineering,
    FcFilmReel,
    FcMusic,
    FcMultipleDevices,
    FcOldTimeCamera,
    FcSalesPerformance,
    FcSportsMode,
} from "react-icons/fc";

import { IconType } from "react-icons";

import { CatagoryItem } from "./catagory-item";

interface CatagoriesProps {
    items: Category[];
}

// Ensure Category["name"] is explicitly defined as a key
const iconMap: Record<string, IconType> = {
    "Music": FcMusic,
    "Photography": FcOldTimeCamera,
    "Fitness": FcSportsMode,
    "Accounting": FcSalesPerformance,
    "Computer Science": FcMultipleDevices,
    "Filming": FcFilmReel,
    "Engineering": FcEngineering,
};

export const Categories = ({ items }: CatagoriesProps) => {
    return (
        <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
            {items.map((item) => (
                <CatagoryItem
                    key={item.id}
                    label={item.name}
                    icon={iconMap[item.name]} // Ensure item.name exists in iconMap
                    value={item.id}
                />
            ))}
        </div>
    );
};

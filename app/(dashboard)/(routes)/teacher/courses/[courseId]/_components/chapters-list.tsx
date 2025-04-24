"use client"

import { Chapter } from "@prisma/client"
import { useEffect, useState } from "react";
import { 
    DragDropContext,
    Droppable,
    Draggable,
    DropResult
 } from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";
import { Grip, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
interface ChapterListProps {
    items: Chapter[];
    onReorder: (updateData: { id:string; position:number }[]) => void;
    onEdit: (id:string) => void;
};

export const ChapterList = ({
    items,
    onReorder,
    onEdit,
 }: ChapterListProps ) => {
    const [isMounted, setIsMounted] = useState(false);
    const [chapters, setChapters] = useState(items);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const onDragEdit = (result: DropResult) => {
        if(!result.destination) return;

        const items = Array.from(chapters);
        const [reorderedItems] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItems);

        const startIndex = Math.min(result.source.index, result.destination.index);
        const endIndex = Math.max(result.source.index, result.destination.index);
    
        const updatedChapters = items.slice(startIndex, endIndex+1);
    
        setChapters(items);

        const bulkUpdate = updatedChapters.map((chapters) =>({
            id: chapters.id,
            position: items.findIndex((items) => items.id === chapters.id)
        }));

        onReorder(bulkUpdate);
    }   

    

    useEffect(() => {
        setChapters(items);
    }, [items]);

    if(!isMounted){
        return null;
    }

    return (
        <DragDropContext onDragEnd={onDragEdit}>
            <Droppable droppableId="chapters">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {chapters.map((chapter, index) =>(
                            <Draggable key={chapter.id} draggableId={chapter.id} index={index}>
                                {(provided) =>  (
                                    <div
                                        className = {cn(
                                            "flex items-center gap-x-2 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm",
                                            chapter.isPublic && "bg-sky-100 border-sky-200 text-sky-700"
                                        )}
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                    >
                                        <div
                                            className={cn(
                                                "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md trasition",
                                                 chapter.isPublic && "border-r-sky-200 hover:bg-sky-200"
                                            )}
                                            {...provided.dragHandleProps}
                                        >
                                            <Grip
                                                className="h-5 w-5"
                                            ></Grip>
                                        </div>
                                        {chapter.title}
                                        <div className="ml-auto flex items-center gap-x-2">
                                            {chapter.isFree && (
                                                <Badge>
                                                    Free
                                                </Badge>
                                            )}
                                            <Badge className={cn(
                                                "bg-slate-500", "rounded-full",  
                                                chapter.isPublic && "bg-sky-700"
                                            )}>
                                                {chapter.isPublic ? "Published" : "Draft"}
                                            </Badge>
                                        
                                            <Pencil 
                                                onClick={() => onEdit(chapter.id)}
                                                className="h-4 w-4 mr-2 cursor-pointer hover:opacity-75 transition"
                                            ></Pencil>
                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}
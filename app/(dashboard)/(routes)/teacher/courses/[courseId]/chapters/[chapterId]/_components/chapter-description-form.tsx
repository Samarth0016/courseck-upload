"use client";
import * as z from "zod";
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

import { Chapter } from "@prisma/client";
import MyEditor from "@/components/editor";



interface ChapterDescriptionFormProps{
    initialData: Chapter;
    courseId: string;
    chapterId: string;
}

const formSchema = z.object({
    description: z.string().min(1),
})

const ChapterDescriptionForm =  ({
    initialData,
    courseId,
    chapterId,
}: ChapterDescriptionFormProps) => {

    const [isEditing, setIsEditing] = useState(false);
    const toggleEdit = () => setIsEditing((current) =>!current);

    const router = useRouter();

    const [savedContent, setSavedContent] = useState("");

  const handleSave = (content: string) => {
    console.log("Saved Content:", content);
    setSavedContent(content);
  };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            description: "",
        },
    });
    
    const { isSubmitting, isValid } = form.formState;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
          //console.log("Submitting values:", values);
          await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
          toast.success("Chapter description");
          toggleEdit();
          router.refresh();
        } catch (error) {
          console.error("Error submitting form:", error);
          toast.error("Something went wrong");
        }
      };
      

    return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter Description
        <Button onClick={toggleEdit} variant="ghost">
            {isEditing ?(
                <>Cancel</>
            ) : (
                <>
                <Pencil className="h-4 w-4 mr-2"/>
                Edit title
                </>
            )}
            
        </Button>
      </div>
      {!isEditing && (
        <p className={cn(
            "text-sm mt-2",
            !initialData.description && "text-slate-500 italic"

        )}>
            {initialData.description || "No description"}
        </p>
      ) }
      {isEditing && (
        <Form {...form}>
            <form 
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 mt-4"
            >
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                            <MyEditor
                                {...field}   
                            />
                            </FormControl>
                            <FormMessage></FormMessage>
                        </FormItem>
                    )}
                ></FormField>
                <div className="flex items-center gap-x-2">
                    <Button
                        disabled={!isValid || isSubmitting}
                        type="submit"
                    >
                        Save
                    </Button>
                </div>
            </form>
        </Form>
      ) }
    </div>
  )
}

export default ChapterDescriptionForm

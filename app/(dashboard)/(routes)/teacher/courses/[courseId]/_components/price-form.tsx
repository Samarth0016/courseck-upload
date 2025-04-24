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
//import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Course } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { formatePrice } from "@/app/lib/formate";


interface PriceFormProps{
    initialData: Course;
    courseId: string;
}

const formSchema = z.object({
    price: z.coerce.number(),
})

const PriceForm =  ({
    initialData,
    courseId
}: PriceFormProps) => {

    const [isEditing, setIsEditing] = useState(false);
    const toggleEdit = () => setIsEditing((current) =>!current);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            price: initialData?.price || undefined,
        }
    });
    
    const { isSubmitting, isValid } = form.formState;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
          //console.log("Submitting values:", values);
          await axios.patch('/api/courses/' + courseId, values);
          toast.success("Course updated");
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
        course price
        <Button onClick={toggleEdit} variant="ghost">
            {isEditing ?(
                <>Cancel</>
            ) : (
                <>
                <Pencil className="h-4 w-4 mr-2"/>
                change price
                </>
            )}
            
        </Button>
      </div>
      {!isEditing && (
        <p className={cn(
            "text-sm mt-2",
            !initialData.price && "text-slate-500 italic"

        )}>
            {initialData.price
                ? formatePrice(initialData.price)
                : "No price"
            }
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
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                            <Input
                                    type="number"
                                    step="0.01"
                                    disabled = {isSubmitting}
                                    placeholder="e.g 'set price for this course'"
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

export default PriceForm

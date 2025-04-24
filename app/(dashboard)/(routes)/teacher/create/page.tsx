"use client";
import * as z from "zod"
import axios from "axios"
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {Input} from "@/components/ui/input"
//import { title } from "process";
import Link from "next/link"
import toast from "react-hot-toast";

const formScema = z.object(
    {
        title: z.string().min(1,{
            message:"title is required"
        })
    }
)

const CreatePage = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof formScema>>({
        resolver:zodResolver(formScema),
        defaultValues:{
            title:""
        }
    })
    const onSubmit = async (values: z.infer<typeof formScema>) => {
       //console.log(values);
        try{
            const response = await axios.post("/api/courses", values);
            router.push("/teacher/courses/"+response.data.id);
            toast.success("course created");
        } catch{
            toast.error("something went wrong");
        }
    }

    const { isSubmitting, isValid } = form.formState;

    return (
        <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
            <div>
            <div>
                <h1>
                    Name your course!
                </h1>
                <p>
                    what would you like to name your course.
                </p>
            </div>
            <Form {...form}>
                <form action="" onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 mt-8">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field  }) =>(
                            <FormItem>
                                <FormLabel>
                                    Cource title
                                </FormLabel>
                                <FormControl>
                                    <Input 
                                        disabled={isSubmitting}
                                        placeholder="e.g. 'Advanced web developement'"
                                        {...field}
                                    ></Input>
                                </FormControl>
                                <FormDescription>
                                    What will you teach in this cource? 
                                </FormDescription>
                                <FormMessage>
                                </FormMessage>
                            </FormItem>
                        )}
                    ></FormField>
                    <div className="flex items-center gap-x-2">
                        <Link href="/">
                            <Button 
                                type="button"
                                variant = "ghost"
                            >
                                Cancel
                            </Button>
                        </Link>
        
                            <Button 
                                type="submit"
                                disabled = {!isValid || isSubmitting}
                            >
                                Continue
                            </Button>
                    </div>
                </form>
            </Form>
            </div>
        </div>
    )
}

export default CreatePage

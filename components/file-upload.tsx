"use client"
import { UploadDropzone } from "@/lib/uploadthing"
import { ourFileRouter} from "@/app/api/uploadthing/core"
// import { File } from "node:buffer";
// import { Upload } from "lucide-react";
import { error } from "node:console";
import toast from "react-hot-toast";

interface FileUploadProps {
    onChange: (url?: string) => void;
    endpoint: keyof typeof ourFileRouter;
};

export const FileUpload = ({
    onChange,
    endpoint
}: FileUploadProps) => {
    return(
        <UploadDropzone 
            endpoint={endpoint}
            onClientUploadComplete={(res) =>{
                onChange(res?.[0].url);
            }}   
            onUploadError={(error: Error) =>{
                console.error("Upload error:", error);
                toast.error(`${error?.message}`);
            }}
        >
        </UploadDropzone>
    )
}
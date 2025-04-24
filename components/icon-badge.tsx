import React from 'react'
import { LucideIcon } from 'lucide-react'
import {cva, type VariantProps} from 'class-variance-authority'
import { cn } from '@/lib/utils'

const backgroundVarients = cva(
    "rounded-full flex items-center justify-center",
    {
        variants: {
            variant: {
                default: "bg-sky-100",
                success: "bg-emrald-100"
            },
            iconVarient: {
                default: "text-sky-700",
                success: "text-emerald-700"
            },
            size: {
                default: "p-2",
                sm: "p-1"
            }
        },
        defaultVariants: {
            variant: "default",
            size: "default"
        }
    }
)

const iconVarients = cva(
    "",
    { 
        variants: {
            variant: {
                default: "text-sky-700",
                success: "text-emerald-700"
            },
            size: {
                default: "h-8 w-8",
                sm: "h-4 w-4"
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        }
        
    }
)

type backgroundVarientsProps = VariantProps<typeof backgroundVarients>
type iconVarientsProps = VariantProps<typeof iconVarients>

interface iconBadgeProps extends backgroundVarientsProps, iconVarientsProps
{
    icon: LucideIcon;
}

const IconBadge = ({
    icon: Icon,
    variant,
    size
    }: iconBadgeProps
) => {
    
    return (
    <div className={cn(backgroundVarients({variant,size}))}>
        <Icon className={cn(iconVarients({variant, size}))}/>
    </div>
  )
}

export default IconBadge

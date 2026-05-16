import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

function Accordion({ ...props }) {
    return <AccordionPrimitive.Root {...props} />
}

function AccordionItem({ className = "", ...props }) {
    return <AccordionPrimitive.Item className={className} {...props} />
}

function AccordionTrigger({ className = "", children, ...props }) {
    return (
        <AccordionPrimitive.Header className="flex">
            <AccordionPrimitive.Trigger
                className={`flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all [&[data-state=open]>svg]:rotate-180 ${className}`}
                {...props}
            >
                {children}
                <ChevronDown className="h-4 w-4 shrink-0 text-[#3D3D3D]/50 transition-transform duration-200" />
            </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
    )
}

function AccordionContent({ className = "", children, ...props }) {
    return (
        <AccordionPrimitive.Content
            className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
            {...props}
        >
            <div className={`pb-4 pt-0 ${className}`}>{children}</div>
        </AccordionPrimitive.Content>
    )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
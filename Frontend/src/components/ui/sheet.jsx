import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const Sheet = DialogPrimitive.Root
const SheetTrigger = DialogPrimitive.Trigger
const SheetClose = DialogPrimitive.Close
const SheetTitle = DialogPrimitive.Title
const SheetDescription = DialogPrimitive.Description

function SheetContent({ className, children, side = "right", ...props }) {
  const sideClasses = side === "left" ? "left-0 data-[state=closed]:-translate-x-full" : "right-0 data-[state=closed]:translate-x-full"
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-ink/35 backdrop-blur-sm data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in" />
      <DialogPrimitive.Content
        className={cn("fixed inset-y-0 z-50 w-[min(88vw,24rem)] bg-ivory/96 p-6 shadow-2xl backdrop-blur-2xl transition-transform duration-300 ease-out data-[state=open]:translate-x-0", sideClasses, className)}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="absolute right-5 top-5 grid size-10 place-items-center rounded-full bg-ink/6 transition-colors hover:bg-ink/10 focus-visible:ring-2 focus-visible:ring-gold">
          <X className="size-5" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}

export { Sheet, SheetTrigger, SheetClose, SheetContent, SheetTitle, SheetDescription }

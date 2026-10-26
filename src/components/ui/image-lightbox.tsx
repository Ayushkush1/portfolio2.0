"use client";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import Image from "next/image";
import { X } from "lucide-react";
import { ReactNode } from "react";

// Tap a screenshot to see it full size. A dashboard squeezed to a phone's width can't be read,
// so phones get it at twice the screen width to pan across; larger screens fit it to the window.
const ImageLightbox = ({ src, alt, children }: { src: string; alt: string; children: ReactNode }) => (
  <DialogPrimitive.Root>
    <DialogPrimitive.Trigger asChild>{children}</DialogPrimitive.Trigger>
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-[110] bg-black/90 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      <DialogPrimitive.Content
        data-lenis-prevent
        aria-describedby={undefined}
        className="fixed inset-0 z-[110] flex flex-col outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
      >
        <DialogPrimitive.Title className="sr-only">{alt}</DialogPrimitive.Title>
        <div className="flex items-center justify-between gap-4 px-5 pt-5 pb-3 md:px-8">
          <p className="text-xs text-white/60 md:hidden">Swipe sideways to see the whole screen</p>
          <DialogPrimitive.Close
            aria-label="Close"
            className="ml-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors duration-300 hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </DialogPrimitive.Close>
        </div>
        <div className="flex flex-1 flex-col items-start overflow-auto overscroll-contain px-5 pb-8 md:items-center md:px-8">
          <Image
            src={src}
            alt={alt}
            width={2400}
            height={1500}
            sizes="(max-width: 768px) 200vw, 90vw"
            className="my-auto h-auto w-[200%] max-w-none shrink-0 rounded-2xl md:w-auto md:max-w-full md:max-h-[85vh]"
          />
        </div>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  </DialogPrimitive.Root>
);

export default ImageLightbox;

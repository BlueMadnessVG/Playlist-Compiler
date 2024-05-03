import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import cn from "clsx";

export const MusicSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex touch-none select-none items-center group cursor-pointer",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden bg-zinc-700 ">
      <SliderPrimitive.Range className="absolute h-full bg-violet-800 group-hover:bg-violet-500" />
    </SliderPrimitive.Track>

    <SliderPrimitive.Thumb className="hidden group-hover:block h-3 w-3 bg-violet-800 rounded-full border-2 border-violet-800 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
));

MusicSlider.displayName = SliderPrimitive.Root.displayName;

import { cn } from "@/lib/utils"

/**
 * GridWorld renders a hardware-accelerated CSS grid pattern with radial fading mask.
 * @param {object} props
 * @param {string} [props.className] - Additional classes.
 */
export function GridWorld({ className }) {
  return (
    <div
      className={cn(
        "absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none",
        className
      )}
    />
  )
}

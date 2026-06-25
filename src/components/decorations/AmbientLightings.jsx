import { cn } from "@/lib/utils"

/**
 * AmbientLightings renders soft, glowing background spheres.
 * @param {object} props
 * @param {string} [props.className] - Extra Tailwind styling.
 */
export function AmbientLightings({ className }) {
  return (
    <div className={cn("absolute inset-0 -z-10 overflow-hidden pointer-events-none", className)}>
      <div className="absolute -top-[10%] left-[5%] h-[40vw] w-[40vw] rounded-full bg-amber-500/10 blur-[130px]" />
      <div className="absolute top-[50%] right-[5%] h-[50vw] w-[50vw] rounded-full bg-yellow-600/5 blur-[160px]" />
    </div>
  )
}

import * as React from "react"
import { cn } from "../../lib/utils"
import { Circle } from "lucide-react"

interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("grid gap-2", className)}
      {...props}
    />
  )
)
RadioGroup.displayName = "RadioGroup"

interface RadioGroupItemProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string;
}

const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ className, ...props }, ref) => (
    <div className="relative">
      <input
        type="radio"
        ref={ref}
        className={cn(
          "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 peer",
          className
        )}
        {...props}
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Circle className="h-2.5 w-2.5 fill-current text-current opacity-0 peer-checked:opacity-100 transition-opacity" />
      </div>
    </div>
  )
)
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }
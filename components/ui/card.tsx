import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const cardVariants = cva('rounded-lg transition-all duration-300', {
  variants: {
    variant: {
      default: 'bg-bg-surface border border-line',
      glass: 'glass',
      bordered: 'bg-transparent border border-line hover:border-line-highlight',
      glow: 'bg-bg-surface border border-line hover:border-accent/40 card-hover-glow',
    },
    padding: {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    },
  },
  defaultVariants: {
    variant: 'default',
    padding: 'md',
  },
})

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  hoverable?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, hoverable, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          cardVariants({ variant, padding }),
          hoverable && 'hover:-translate-y-1 hover:border-accent/40 card-hover-glow cursor-default',
          className
        )}
        {...props}
      />
    )
  }
)
Card.displayName = 'Card'

export { Card, cardVariants }

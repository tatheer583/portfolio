import { cn } from '@/lib/utils'

interface SectionProps {
  id?: string
  className?: string
  children: React.ReactNode
  containerClassName?: string
}

export function Section({ id, className, children, containerClassName }: SectionProps) {
  return (
    <section id={id} className={cn('relative scroll-mt-20 py-16 md:py-24', className)}>
      <div className={cn('mx-auto w-full max-w-container px-6', containerClassName)}>{children}</div>
    </section>
  )
}

import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-12 max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            'mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent-light',
            align === 'center' && 'justify-center'
          )}
        >
          {align === 'left' && <span className="h-px w-6 bg-accent/60" aria-hidden />}
          {eyebrow}
          {align === 'center' && <span className="h-px w-6 bg-accent/60" aria-hidden />}
        </p>
      )}
      <h2 className="font-display text-3xl font-bold tracking-tight text-content-primary md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-content-secondary">{subtitle}</p>
      )}
    </div>
  )
}

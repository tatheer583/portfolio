import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-7xl font-extrabold text-gradient">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold text-content-primary">
        This page doesn’t exist.
      </h1>
      <p className="mt-3 max-w-sm text-content-secondary">
        The page you’re looking for may have moved. Head back home, or ask the AI
        assistant what you were after.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-11 items-center rounded-md bg-accent px-5 text-sm font-medium text-white accent-glow transition-opacity hover:opacity-90"
      >
        Back to home
      </Link>
    </main>
  )
}

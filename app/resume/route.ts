import { type NextRequest } from 'next/server'

export function GET(_req: NextRequest) {
  return new Response(null, {
    status: 302,
    headers: {
      Location: '/resume/Muhammad_Tatheer_CV.pdf',
      'Cache-Control': 'no-store',
    },
  })
}

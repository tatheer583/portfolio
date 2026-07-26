import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { rateLimit } from '@/lib/github'
import { sendContactEmail } from '@/lib/resend'

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.enum(['job', 'freelance', 'security', 'open-source', 'collab', 'other']),
  message: z.string().min(10).max(5000),
  company: z.string().max(200).optional(),
})

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'

  const limit = rateLimit(ip)
  if (!limit.success) {
    return NextResponse.json(
      { success: false, message: 'Too many requests. Please try again later.' },
      { status: 429 }
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid request body.' }, { status: 400 })
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, message: 'Please check the form fields and try again.' },
      { status: 400 }
    )
  }

  const data = parsed.data
  if (data.company) {
    return NextResponse.json({ success: true, message: 'Message received.' })
  }

  const sent = await sendContactEmail(data)
  if (!sent.success) {
    return NextResponse.json(
      { success: false, message: 'Could not send message. Please email me directly.' },
      { status: 502 }
    )
  }

  return NextResponse.json({ success: true, message: 'Message sent.' })
}

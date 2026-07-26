export async function sendContactEmail(data: {
  name: string
  email: string
  subject: string
  message: string
}): Promise<{ success: boolean }> {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_EMAIL

  if (!apiKey || !to) {
    // No email provider configured — fail gracefully so the UI can inform the user.
    return { success: false }
  }

  try {
    const { Resend } = await import('resend')
    const resend = new Resend(apiKey)
    await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to,
      replyTo: data.email,
      subject: `Portfolio Contact: ${data.subject}`,
      text: `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`,
    })
    return { success: true }
  } catch {
    return { success: false }
  }
}

'use server'

import { Resend } from 'resend';
import { EmailTemplate } from '@/components/EmailTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const subject = formData.get('subject') as string;
  const message = formData.get('message') as string;

  try {
    const data = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: ['huzaifa3108hassan@gmail.com'],
      subject: `New Contact Form Submission: ${subject}`,
      react: EmailTemplate({ name, email, subject, message }) as React.ReactElement,
    });

    return { success: true, message: 'Email sent successfully!' };
  } catch (error) {
    return { success: false, message: `Failed to send email. Please try again later${error}` };
  }
}
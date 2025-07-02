import { Resend } from 'resend';
import { marked } from 'marked';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({userEmail, subject, htmlContent}) {
  console.log("Email sending...");
  
  const { data, error } = await resend.emails.send({
    from: 'BlogDrop <onboarding@resend.dev>',
    to: userEmail,
    subject: subject,
    html: marked(htmlContent || ""),
  });
  return `Email send ✅`
}
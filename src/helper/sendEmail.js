import { Resend } from 'resend';
import { marked } from 'marked';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(subject,htmlContent) {
    console.log("+++++++++ Email Sending ++++++++++++");
      const { data, error } = await resend.emails.send({
    from: 'BlogDrop <onboarding@resend.dev>',
    to: 'draj22779@gmail.com',
    subject: subject,
    html: marked(htmlContent),
  });

  if (error) {
    return console.error({ error });
  }

  console.log({ data });
}
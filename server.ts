import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = 3001;

const RECIPIENTS = [
  'info@ultimatevetserve.com',
];

app.use(cors());
app.use(express.json());

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: { rejectUnauthorized: false },
  });
}

// Test SMTP connection on startup
(async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('SMTP connection verified successfully');
  } catch (err) {
    console.error('SMTP verification failed:', err.message);
  }
})();

app.get('/api/test-email', async (_req, res) => {
  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"Ultimate Vetserve" <${process.env.SMTP_FROM}>`,
      to: 'info@ultimatevetserve.com',
      subject: 'SMTP Test - Ultimate Vetserve',
      html: '<h2 style="color:#166534;">SMTP is working</h2><p>This is a test email from your server.</p>',
    });
    res.json({ message: 'Test email sent to andrewmandieka@gmail.com' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const transporter = createTransporter();

    const htmlBody = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #166534;">New Website Inquiry</h2>
        <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
          <tr><td style="padding: 8px 12px; background: #f0fdf4; font-weight: 600; color: #166534; border: 1px solid #dcfce7;">Name</td><td style="padding: 8px 12px; border: 1px solid #dcfce7;">${name}</td></tr>
          <tr><td style="padding: 8px 12px; background: #f0fdf4; font-weight: 600; color: #166534; border: 1px solid #dcfce7;">Email</td><td style="padding: 8px 12px; border: 1px solid #dcfce7;"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding: 8px 12px; background: #f0fdf4; font-weight: 600; color: #166534; border: 1px solid #dcfce7;">Phone</td><td style="padding: 8px 12px; border: 1px solid #dcfce7;">${phone ?? '—'}</td></tr>
          <tr><td style="padding: 8px 12px; background: #f0fdf4; font-weight: 600; color: #166534; border: 1px solid #dcfce7;">Subject</td><td style="padding: 8px 12px; border: 1px solid #dcfce7;">${subject ?? '—'}</td></tr>
        </table>
        <div style="background: #f8fafc; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <h3 style="margin: 0 0 8px; font-size: 14px; color: #475569;">Message</h3>
          <p style="margin: 0; color: #1e293b; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
        </div>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
        <p style="color: #94a3b8; font-size: 12px;">Sent from Ultimate Vetserve website contact form</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_FROM}>`,
      to: RECIPIENTS.join(', '),
      replyTo: email,
      subject: `New Website Inquiry: ${subject ?? 'Contact Form'}`,
      html: htmlBody,
    });

    console.log(`Inquiry from ${email} forwarded to ${RECIPIENTS.length} recipients`);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`API Server running at http://localhost:${port}`);
});

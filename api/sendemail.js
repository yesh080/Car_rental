import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  // 1️⃣ Configure transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER, // set in Vercel
      pass: process.env.SMTP_PASS, // set in Vercel
    },
  });

  // 2️⃣ Send mail
  try {
    await transporter.sendMail({
      from: `"Eightyeight Bot" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Welcome to Eightyeight 🎉",
      html: `<h2>Welcome!</h2><p>Thank you for signing up to our website 🚀</p>`,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to send email" });
  }
}

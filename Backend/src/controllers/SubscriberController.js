import nodemailer from "nodemailer";

const subscribers = new Set(); // In-memory storage (will reset on server restart)

// Nodemailer transporter (Use your email credentials)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

// Subscribe & Send Welcome Email
export const subscribeUser = async (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes("@")) {
    return res.status(400).json({ success: false, message: "Invalid email address" });
  }

  if (subscribers.has(email)) {
    return res.status(400).json({ success: false, message: "Already subscribed!" });
  }

  // Save to in-memory storage
  subscribers.add(email);

  // Send Welcome Email
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "🎉 Welcome to Our Newsletter!",
    html: `<h2>Welcome to Parmarth E-Com!</h2>
           <p>Thank you for subscribing to our newsletter. You'll now receive updates on the latest deals and trends.</p>
           <p>Best Regards,<br/>Parmarth E-Com Team</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Subscription successful! Welcome email sent." });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ success: false, message: "Failed to send welcome email" });
  }
};

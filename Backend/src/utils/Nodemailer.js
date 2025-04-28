import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL, // Your email
    pass: process.env.EMAIL_PASSWORD, // App password
  },
});

export const sendOTP = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Your OTP for Login",
    text: `Dear User, 

Your OTP for resetting your password is: ${otp}.
This OTP is valid for 5 minutes from the time of request. Please ensure to enter it within this time frame.

For security reasons, do not share this OTP with anyone.

If you did not request a password reset, please disregard this message.

Thank you, 
The RESOURCE_RECLAIMERS Team.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP email sent to ${email}`);
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw error;
  }
};
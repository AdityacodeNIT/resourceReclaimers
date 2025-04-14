import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';
import 'dotenv/config'; // Load environment variables

// Supabase Initialization
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);


// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Change if using another SMTP provider
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});


// Function to Send Emails
const sendEmail = async (name, email) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Welcome to Resource Reclaimers!',
    text: `Hi ${name},\n\nThank you for subscribing! We're excited to have you onboard.`,
  };

  try {
    await transporter.sendMail(mailOptions);
   
  } catch (error) {
    console.error('❌ Error sending email:', error);
  }
};

// Supabase Real-Time Listener
const listenForChanges = async () => {


  try {
    const channel = supabase
      .channel('resource_reclaimers_changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'resource_reclaimers' },
        async (payload) => {
      
          const { name, email } = payload.new;
          await sendEmail(name, email);
        }
      )
      .subscribe();

   
  } catch (error) {
    console.error('❌ Error setting up real-time listener:', error);
  }
};

// Start Listening for Changes
listenForChanges();

export { supabase, sendEmail, listenForChanges };

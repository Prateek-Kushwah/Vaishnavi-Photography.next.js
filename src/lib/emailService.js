import nodemailer from 'nodemailer';

// Configure the Nodemailer transporter using environment variables
const transporter = nodemailer.createTransport({
  service: 'gmail', // Or your preferred email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Sends an email using the pre-configured transporter.
 * @param {object} mailOptions - The mail options object (to, subject, html).
 * @returns {Promise<void>}
 */
export const sendEmail = async (mailOptions) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER, // Sender address from environment variables
      ...mailOptions,
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    // Re-throw the error to be handled by the API route
    throw new Error('Failed to send email.');
  }
};
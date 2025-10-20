import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/emailService';

export async function POST(request) {
  try {
    const body = await request.json();
    const { from_name, from_phone, from_email, service_type, appointment_date, appointment_time, message, subject, to_email } = body;

    // Construct the email content dynamically based on provided data
    const emailHtml = `
      <h3>${subject || 'New Contact Form Submission'}</h3>
      <p><strong>Name:</strong> ${from_name}</p>
      <p><strong>Phone:</strong> ${from_phone || 'Not provided'}</p>
      <p><strong>Email:</strong> ${from_email || 'Not provided'}</p>
      ${service_type ? `<p><strong>Service:</strong> ${service_type}</p>` : ''}
      ${appointment_date ? `<p><strong>Date:</strong> ${appointment_date}</p>` : ''}
      ${appointment_time ? `<p><strong>Time:</strong> ${appointment_time}</p>` : ''}
      <p><strong>Message:</strong></p>
      <p>${message || 'No additional message.'}</p>
    `;

    // Use the email service to send the email
    await sendEmail({
      to: to_email,
      subject: subject || `New message from ${from_name}`,
      html: emailHtml,
    });

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'Failed to send email' }, { status: 500 });
  }
}
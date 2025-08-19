import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json();
    
    console.log('Contact form submission:', { name, email, subject, message });

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Here you can add your own email service logic
    // For now, we'll just log the contact form and return success
    console.log('Contact form data:', {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString()
    });

    // You can integrate with your preferred email service here
    // Examples: SendGrid, Mailgun, AWS SES, etc.

    return NextResponse.json(
      { message: 'Contact form submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Here you can add your own email service logic
    // For now, we'll just log the subscription and return success
    console.log('Newsletter subscription:', { 
      email, 
      timestamp: new Date().toISOString() 
    });

    // You can integrate with your preferred email service here
    // Examples: SendGrid, Mailgun, AWS SES, etc.
    
    return NextResponse.json(
      { message: 'Successfully subscribed to newsletter' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe to newsletter' },
      { status: 500 }
    );
  }
}

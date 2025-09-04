import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";

export async function POST(request) {
  try {
    const { recipient, subject, body } = await request.json();
    
    if (!recipient || !subject || !body) {
      return NextResponse.json(
        { success: false, error: 'Recipient, subject, and body are required' },
        { status: 400 }
      );
    }

    const response = await fetch(`${BACKEND_URL}/send-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipient, subject, body }),
    });

    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: data.error || 'Backend error' },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
    
  } catch (error) {
    console.error('Email API error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to send email' },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";

export async function GET() {
  try {
    const response = await fetch(`${BACKEND_URL}/resume`, { cache: "no-store" });
    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: data.error || 'Backend error' },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
    
  } catch (error) {
    console.error('Resume API error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch resume data' },
      { status: 500 }
    );
  }
}


// import { NextResponse } from 'next/server';

// const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

// export async function GET() {
//   try {
//     const response = await fetch(`${BACKEND_URL}/resume`);
    
//     if (!response.ok) {
//       throw new Error(`Backend responded with ${response.status}`);
//     }

//     const data = await response.json();
//     return NextResponse.json(data);
    
//   } catch (error) {
//     console.error('Resume API error:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch resume data' },
//       { status: 500 }
//     );
//   }
// }
import { NextRequest, NextResponse } from 'next/server'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()
    
    // Forward the request to our backend API
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    if (!response.ok) {
      throw new Error('Failed to submit contact form')
    }

    const result = await response.json()
    
    return NextResponse.json(result, { status: 200 })
  } catch (error) {
    console.error('Contact form submission error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to submit contact form. Please try again.' 
      },
      { status: 500 }
    )
  }
}
import { NextResponse } from 'next/server'

// Health check endpoint for deployment monitoring
export async function GET() {
  try {
    // Check various service health indicators
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      uptime: process.uptime(),
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100,
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024 * 100) / 100,
      },
      services: {
        database: await checkDatabaseHealth(),
        api: await checkApiHealth(),
      }
    }

    return NextResponse.json(health, { 
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
  } catch (error) {
    console.error('Health check failed:', error)
    
    return NextResponse.json(
      { 
        status: 'unhealthy', 
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 503 }
    )
  }
}

async function checkDatabaseHealth(): Promise<{ status: string; latency?: number }> {
  try {
    const startTime = Date.now()
    
    // Try to fetch a simple piece of data from the database
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'}/health`, {
      method: 'GET',
      cache: 'no-store'
    })
    
    const latency = Date.now() - startTime
    
    if (response.ok) {
      return { status: 'healthy', latency }
    } else {
      return { status: 'unhealthy' }
    }
  } catch (error) {
    console.error('Database health check failed:', error)
    return { status: 'unhealthy' }
  }
}

async function checkApiHealth(): Promise<{ status: string; latency?: number }> {
  try {
    const startTime = Date.now()
    
    // Check if the API is responding
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'}/health`, {
      method: 'GET',
      cache: 'no-store',
      signal: AbortSignal.timeout(5000) // 5 second timeout
    })
    
    const latency = Date.now() - startTime
    
    if (response.ok) {
      return { status: 'healthy', latency }
    } else {
      return { status: 'unhealthy' }
    }
  } catch (error) {
    console.error('API health check failed:', error)
    return { status: 'unhealthy' }
  }
}

// Also handle HEAD requests for load balancer health checks
export async function HEAD() {
  try {
    return new NextResponse(null, { status: 200 })
  } catch (error) {
    return new NextResponse(null, { status: 503 })
  }
}
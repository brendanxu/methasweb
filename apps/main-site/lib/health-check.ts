/**
 * Health check utilities for Umbraco CMS
 */

import { umbracoClient } from './umbraco-client'

export interface HealthCheckResult {
  umbracoService: boolean
  deliveryApi: boolean
  database: boolean
  apiKey: boolean
  message: string
  timestamp: string
}

/**
 * Comprehensive health check for Umbraco CMS
 */
export async function checkUmbracoHealth(): Promise<HealthCheckResult> {
  const timestamp = new Date().toISOString()
  let result: HealthCheckResult = {
    umbracoService: false,
    deliveryApi: false,
    database: false,
    apiKey: false,
    message: 'Starting health check...',
    timestamp
  }

  try {
    // Check Delivery API (this also indicates Umbraco service is running)
    try {
      const testContent = await umbracoClient.getServices()
      result.deliveryApi = true
      result.database = true
      result.apiKey = true
      result.umbracoService = true  // If API works, service is running
      result.message = `Delivery API working. Found ${testContent.length} services`
    } catch (deliveryError) {
      result.message = `Delivery API error: ${deliveryError instanceof Error ? deliveryError.message : 'Unknown error'}`
      
      // Try to determine what failed
      if (deliveryError instanceof Error) {
        if (deliveryError.message.includes('401') || deliveryError.message.includes('403')) {
          result.message = 'API key authentication failed'
        } else if (deliveryError.message.includes('404')) {
          result.message = 'Delivery API endpoint not found'
        } else if (deliveryError.message.includes('500')) {
          result.message = 'Database connection issue'
        }
      }
    }

  } catch (serviceError) {
    result.message = `Service check failed: ${serviceError instanceof Error ? serviceError.message : 'Unknown error'}`
  }

  return result
}

/**
 * Simple ping test for Umbraco
 */
export async function pingUmbraco(): Promise<boolean> {
  try {
    const umbracoBaseUrl = process.env.NEXT_PUBLIC_UMBRACO_BASE_URL || 'http://localhost:5001'
    const response = await fetch(`${umbracoBaseUrl}/umbraco/api/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    return response.ok
  } catch (error) {
    return false
  }
}

/**
 * Get current Umbraco configuration
 */
export function getUmbracoConfig() {
  return {
    baseUrl: process.env.NEXT_PUBLIC_UMBRACO_BASE_URL || 'http://localhost:5001',
    hasApiKey: !!(process.env.NEXT_PUBLIC_UMBRACO_API_KEY || 'methas-railway-api-key-2024'),
    isProduction: process.env.NODE_ENV === 'production',
    timestamp: new Date().toISOString()
  }
}
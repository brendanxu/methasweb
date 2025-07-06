const axios = require('axios');
require('dotenv').config();

const API_BASE = process.env.API_BASE_URL || 'http://localhost:3001/api';

// Test configuration
const testUser = {
  email: 'admin@test.com',
  password: 'admin123',
  name: 'Test Admin'
};

let authToken = '';

// API test class
class APITester {
  constructor() {
    this.baseURL = API_BASE;
    this.token = '';
  }

  async request(method, endpoint, data = null, headers = {}) {
    try {
      const config = {
        method,
        url: `${this.baseURL}${endpoint}`,
        headers: {
          'Content-Type': 'application/json',
          ...headers
        }
      };

      if (this.token) {
        config.headers.Authorization = `Bearer ${this.token}`;
      }

      if (data) {
        config.data = data;
      }

      const response = await axios(config);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data || error.message,
        status: error.response?.status
      };
    }
  }

  async testAuth() {
    console.log('\n🔐 Testing Authentication...');
    
    // Test login with invalid credentials
    const invalidLogin = await this.request('POST', '/auth/login', {
      email: 'invalid@test.com',
      password: 'wrong'
    });
    
    if (invalidLogin.success) {
      console.log('❌ Invalid login should fail');
      return false;
    } else {
      console.log('✅ Invalid login correctly rejected');
    }

    // Test protected route without token
    const protectedWithoutToken = await this.request('GET', '/auth/me');
    if (protectedWithoutToken.success) {
      console.log('❌ Protected route should require token');
      return false;
    } else {
      console.log('✅ Protected route correctly requires authentication');
    }

    return true;
  }

  async testCaseStudies() {
    console.log('\n📖 Testing Case Studies...');
    
    // Test get all case studies (public)
    const allCaseStudies = await this.request('GET', '/case-studies');
    if (allCaseStudies.success) {
      console.log('✅ Get all case studies works');
      console.log(`   Found ${allCaseStudies.data.data.length} case studies`);
    } else {
      console.log('❌ Failed to get case studies:', allCaseStudies.error);
      return false;
    }

    // Test pagination
    const paginatedCaseStudies = await this.request('GET', '/case-studies?page=1&limit=2');
    if (paginatedCaseStudies.success) {
      console.log('✅ Case studies pagination works');
      console.log(`   Page 1, limit 2: ${paginatedCaseStudies.data.data.length} items`);
    } else {
      console.log('❌ Case studies pagination failed');
    }

    return true;
  }

  async testNews() {
    console.log('\n📰 Testing News Articles...');
    
    const allNews = await this.request('GET', '/news');
    if (allNews.success) {
      console.log('✅ Get all news articles works');
      console.log(`   Found ${allNews.data.data.length} articles`);
    } else {
      console.log('❌ Failed to get news articles:', allNews.error);
      return false;
    }

    return true;
  }

  async testServices() {
    console.log('\n🛠️ Testing Services...');
    
    const allServices = await this.request('GET', '/services');
    if (allServices.success) {
      console.log('✅ Get all services works');
      console.log(`   Found ${allServices.data.data.length} services`);
    } else {
      console.log('❌ Failed to get services:', allServices.error);
      return false;
    }

    return true;
  }

  async testIndustries() {
    console.log('\n🏭 Testing Industries...');
    
    const allIndustries = await this.request('GET', '/industries');
    if (allIndustries.success) {
      console.log('✅ Get all industries works');
      console.log(`   Found ${allIndustries.data.data.length} industries`);
    } else {
      console.log('❌ Failed to get industries:', allIndustries.error);
      return false;
    }

    return true;
  }

  async testCategories() {
    console.log('\n📂 Testing Categories...');
    
    const allCategories = await this.request('GET', '/categories');
    if (allCategories.success) {
      console.log('✅ Get all categories works');
      console.log(`   Found ${allCategories.data.data.length} categories`);
    } else {
      console.log('❌ Failed to get categories:', allCategories.error);
      return false;
    }

    return true;
  }

  async runAllTests() {
    console.log('🚀 Starting API Tests...');
    console.log(`Testing API at: ${this.baseURL}`);

    const tests = [
      this.testAuth,
      this.testCaseStudies,
      this.testNews,
      this.testServices,
      this.testIndustries,
      this.testCategories
    ];

    let passed = 0;
    let failed = 0;

    for (const test of tests) {
      try {
        const result = await test.call(this);
        if (result) {
          passed++;
        } else {
          failed++;
        }
      } catch (error) {
        console.log(`❌ Test failed with error: ${error.message}`);
        failed++;
      }
    }

    console.log('\n📊 Test Results:');
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`📈 Success Rate: ${((passed / (passed + failed)) * 100).toFixed(1)}%`);

    return { passed, failed };
  }
}

// Health check function
async function healthCheck() {
  console.log('🏥 Performing Health Check...');
  
  try {
    const response = await axios.get(`${API_BASE.replace('/api', '')}/health`);
    console.log('✅ Server is healthy');
    console.log('   Database status:', response.data.database ? '✅ Connected' : '❌ Disconnected');
    console.log('   Server uptime:', response.data.uptime);
    return true;
  } catch (error) {
    console.log('❌ Server health check failed');
    console.log('   Make sure the server is running on port 3001');
    return false;
  }
}

// Run tests
async function main() {
  console.log('🧪 CMS Backend API Test Suite');
  console.log('================================');

  // First check if server is running
  const isHealthy = await healthCheck();
  if (!isHealthy) {
    console.log('\n💡 To start the server, run:');
    console.log('   cd apps/cms-backend');
    console.log('   npm run dev');
    process.exit(1);
  }

  // Run API tests
  const tester = new APITester();
  await tester.runAllTests();
}

// Export for programmatic use
module.exports = { APITester, healthCheck };

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}
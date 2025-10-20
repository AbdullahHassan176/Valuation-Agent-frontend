/**
 * Simple test script to verify ChatGPT functionality
 * Run this in your browser console on your frontend site
 */

const BACKEND_URL = 'https://valuation-backend-ephph9gkdjcca0c0.canadacentral-01.azurewebsites.net';

console.log('🧪 Testing Backend Connection...');
console.log('Backend URL:', BACKEND_URL);

// Test 1: Basic health check
async function testHealth() {
    try {
        console.log('🔍 Testing health endpoint...');
        const response = await fetch(`${BACKEND_URL}/healthz`);
        const data = await response.json();
        console.log('✅ Health check result:', data);
        return true;
    } catch (error) {
        console.error('❌ Health check failed:', error);
        return false;
    }
}

// Test 2: ChatGPT endpoint
async function testChatGPT() {
    try {
        console.log('🤖 Testing ChatGPT endpoint...');
        const response = await fetch(`${BACKEND_URL}/poc/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                message: 'Hello! Can you help me with valuation analysis?' 
            })
        });
        
        const data = await response.json();
        console.log('✅ ChatGPT response:', data);
        return true;
    } catch (error) {
        console.error('❌ ChatGPT test failed:', error);
        return false;
    }
}

// Test 3: Valuation data endpoints
async function testValuationData() {
    try {
        console.log('📊 Testing valuation data endpoints...');
        
        // Test runs endpoint
        const runsResponse = await fetch(`${BACKEND_URL}/api/valuation/runs`);
        const runs = await runsResponse.json();
        console.log('✅ Valuation runs:', runs);
        
        // Test curves endpoint
        const curvesResponse = await fetch(`${BACKEND_URL}/api/valuation/curves`);
        const curves = await curvesResponse.json();
        console.log('✅ Curves data:', curves);
        
        return true;
    } catch (error) {
        console.error('❌ Valuation data test failed:', error);
        return false;
    }
}

// Run all tests
async function runAllTests() {
    console.log('🚀 Starting comprehensive backend tests...');
    console.log('='.repeat(50));
    
    const healthOk = await testHealth();
    const chatOk = await testChatGPT();
    const dataOk = await testValuationData();
    
    console.log('='.repeat(50));
    console.log('📋 Test Results:');
    console.log(`Health Check: ${healthOk ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`ChatGPT: ${chatOk ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`Valuation Data: ${dataOk ? '✅ PASS' : '❌ FAIL'}`);
    
    if (healthOk && chatOk && dataOk) {
        console.log('🎉 All tests passed! Your AI agent should be working perfectly.');
    } else {
        console.log('⚠️ Some tests failed. Check the errors above.');
    }
}

// Export for manual testing
window.testBackend = {
    health: testHealth,
    chat: testChatGPT,
    data: testValuationData,
    all: runAllTests
};

console.log('🔧 Test functions available:');
console.log('- testBackend.health() - Test health endpoint');
console.log('- testBackend.chat() - Test ChatGPT endpoint');
console.log('- testBackend.data() - Test valuation data');
console.log('- testBackend.all() - Run all tests');
console.log('');
console.log('💡 Run testBackend.all() to test everything!');

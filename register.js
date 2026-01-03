const axios = require('axios');

async function register() {
  try {
    // YOUR VALUES - UPDATE THESE
    const store = 'api-testinggg.myshopify.com/'; // REPLACE WITH YOUR STORE
    const clientId = 'ad896a08789803fc87387c981e236baa'; // REPLACE WITH YOUR CLIENT ID
    const clientSecret = 'ad896a08789803fc87387c981e236baa'; // REPLACE WITH YOUR SECRET
    const callbackUrl = 'http://localhost:3000'; // REPLACE WITH RENDER URL

    // Create API token using Client ID and Secret
    const tokenResponse = await axios.post(
      `https://${store}/admin/oauth/access_tokens`,
      {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'client_credentials'
      }
    );

    const accessToken = tokenResponse.data.access_token;

    // Register carrier service
    const response = await axios.post(
      `https://${store}/admin/api/2025-10/carrier_services.json`,
      {
        carrier_service: {
          name: 'Custom Shipping',
          callback_url: callbackUrl,
          service_discovery: true
        }
      },
      {
        headers: {
          'X-Shopify-Access-Token': accessToken,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('✅ Registered!', response.data);
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

register();
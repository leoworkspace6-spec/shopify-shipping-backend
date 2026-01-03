const axios = require('axios');

async function calculateShippingFromStrapi(data) {
  try {
    const strapiUrl = process.env.STRAPI_URL;
    const strapiToken = process.env.STRAPI_TOKEN;

    console.log('Sending to Strapi:', data);

    const response = await axios.post(
      `${strapiUrl}/api/shipping-calculator`,
      {
        totalWeight: data.totalWeight,
        origin: data.origin,
        destination: data.destination,
        currency: data.currency
      },
      {
        headers: {
          Authorization: `Bearer ${strapiToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('Strapi response:', response.data);
    return response.data;

  } catch (error) {
    console.error('Error calling Strapi:', error.message);
    return {
      basePrice: 10,
      estimatedDays: 5
    };
  }
}

module.exports = { calculateShippingFromStrapi };
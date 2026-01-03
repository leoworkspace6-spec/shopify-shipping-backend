const axios = require('axios');

async function handleShopifyRequest(shopifyData) {
  try {
    // Extract data from Shopify
    const { origin, destination, items, currency } = shopifyData.rate;

    // Calculate total weight
    const totalWeight = items.reduce((sum, item) => {
      return sum + (item.grams * item.quantity);
    }, 0);

    console.log('Handling Shopify request:');
    console.log('- Origin:', origin.city);
    console.log('- Destination:', destination.city);
    console.log('- Total Weight:', totalWeight, 'grams');

    // For now, return a simple response
    const shippingRates = [
      {
        service_name: 'standard-shipping',
        service_code: 'STD',
        total_price: Math.round(10 * 100).toString(), // $10 in cents
        description: 'Standard Delivery (5-7 business days)',
        currency: currency
      },
      {
        service_name: 'express-shipping',
        service_code: 'EXP',
        total_price: Math.round(20 * 100).toString(), // $20 in cents
        description: 'Express Delivery (2-3 business days)',
        currency: currency
      }
    ];

    return shippingRates;

  } catch (error) {
    console.error('Error handling Shopify request:', error);
    return [];
  }
}

module.exports = { handleShopifyRequest };
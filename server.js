const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { handleShopifyRequest } = require('./shopify-handler');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});

app.post('/api/shipping-rates', async (req, res) => {
  try {
    const rates = await handleShopifyRequest(req.body);
    res.json({ rates });
  } catch (error) {
    console.error('Error:', error);
    res.json({ rates: [] });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
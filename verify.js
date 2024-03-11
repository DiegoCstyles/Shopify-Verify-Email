const express = require('express');
const cors = require('cors');

import fetch from 'node-fetch';

const app = express();

app.use(express.json());

app.post('/Shopify-Verify-Email', async (req, res) => {
  const emailField = req.body.email;
  
  try {
    const response = await fetch(`https://${shopifyStore}/admin/api/${apiVersion}/customers.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
    });

    if (response.ok) {
      const data = await response.json();
      
      // Assuming customFieldValues.Email contains the email to filter
      const filteredCustomer = data.customers.find(customer => customer.email === emailField);

      // filteredCustomer will now contain the customer object with the specified email
      console.log(filteredCustomer);

      return res.status(200).json(filteredCustomer); // Adjust the response as needed
    } else {
      console.error('Error fetching customers:', response.statusText);
      return res.status(response.status).send(response.statusText); // Handle error response
    }
  } catch (error) {
    console.error('Error fetching customers:', error);
    return res.status(500).send('Internal Server Error'); // Return an appropriate error response
  }
});

// Set the server to listen on port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

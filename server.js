// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const generateQuery = require('./generateQuery');

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Sample route to generate query and fetch data from JSON
app.post('/generate-query', async (req, res) => {
  try {
    const { cohortDescription } = req.body;

    // Step 1: Generate GraphQL query using Gemini
    const graphqlQuery = await generateQuery(cohortDescription);

    // Step 2: Log the generated query (for debugging purposes)
    console.log('Generated GraphQL Query:', graphqlQuery);

    // Step 3: Load items data from items.json
    const itemsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'items.json')));

    // Step 4: Simulate filtering based on GraphQL query
    // (In a real scenario, you'd use the query to filter your DB results)
    // For simplicity, let's just filter the items by category
    const filteredItems = itemsData.filter(item => item.category.toLowerCase() === 'health');

    // Step 5: Send the filtered data as a response
    res.json({ query: graphqlQuery, filteredItems });
  } catch (error) {
    console.error('Error generating query:', error);
    res.status(500).json({ error: 'Error generating query or fetching data' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

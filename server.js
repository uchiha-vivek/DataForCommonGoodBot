 
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

 
app.post('/generate-query', async (req, res) => {
  try {
    const { cohortDescription } = req.body;

    
    const graphqlQuery = await generateQuery(cohortDescription);

     
    console.log('Generated GraphQL Query:', graphqlQuery);

    
    const itemsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'items.json')));

   
    const filteredItems = itemsData.filter(item => item.category.toLowerCase() === 'health');

    
    res.json({ query: graphqlQuery, filteredItems });
  } catch (error) {
    console.error('Error generating query:', error);
    res.status(500).json({ error: 'Error generating query or fetching data' });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

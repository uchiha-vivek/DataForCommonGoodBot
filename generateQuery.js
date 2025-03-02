// generateQuery.js
const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv')
dotenv.config()

console.log(credential)
// Set up Google Generative AI client with your API key
const genAI = new GoogleGenerativeAI(credential); // Replace with your actual API key
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

async function generateQuery(cohortDescription) {
  try {
    const prompt = `Generate a GraphQL query based on this cohort description: "${cohortDescription}"`;
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Error generating query: ', error);
    throw new Error('Failed to generate query');
  }
}

module.exports = generateQuery;

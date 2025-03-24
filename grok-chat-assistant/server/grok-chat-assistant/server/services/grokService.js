const axios = require('axios');
require('dotenv').config();

class GrokService {
  constructor() {
    this.apiKey = process.env.GROK_API_KEY;
    this.apiUrl = process.env.GROK_API_URL || 'https://api.grok.x/v1';
    this.client = axios.create({
      baseURL: this.apiUrl,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      }
    });
  }

  async generateResponse(messages) {
    try {
      const response = await this.client.post('/chat/completions', {
        model: 'grok-1',
        messages: messages,
        max_tokens: 1000
      });
      
      return response.data.choices[0].message;
    } catch (error) {
      console.error('Error calling Grok API:', error.response?.data || error.message);
      throw error;
    }
  }
}

module.exports = new GrokService();
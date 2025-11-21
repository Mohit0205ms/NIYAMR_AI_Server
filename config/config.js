require('dotenv').config();

module.exports = {
  port: process.env.PORT || 4000,
  geminiApiKey: process.env.GEMINI_API_KEY,
  geminiUrl: 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions'
};

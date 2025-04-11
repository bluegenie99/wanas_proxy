const express = require('express');
const app = express();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Render + Gemini!');
});

app.post('/chat', async (req, res) => {
  const prompt = req.body.message;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gemini API error' });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Gemini server running on port ${PORT}`);
});

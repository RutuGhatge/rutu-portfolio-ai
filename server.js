import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Initialize dotenv environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS so client frontend (e.g. running on port 5173) can talk to server
app.use(cors());
app.use(express.json());

// Main Chat Proxy Endpoint
app.post('/api/chat', async (req, res) => {
  const { message, history } = req.body;
  const geminiKey = process.env.GEMINI_API_KEY;

  if (!message) {
    return res.status(400).json({ error: "Message parameter is required" });
  }

  if (!geminiKey) {
    return res.status(500).json({ 
      error: "API key is not configured on the server. Please add GEMINI_API_KEY to your .env file." 
    });
  }

  try {
    const sysInstruction = `You are Rutu Ghatge's highly professional and friendly portfolio AI assistant. 
    Analyze questions and answer clearly, utilizing the following details about Rutu:
    
    Name: Rutu Mahesh Ghatge
    Email: ghatgerutu@gmail.com
    Phone: +91-9822750477
    Location: Pune, India
    Resume Data: Final-year B.E. (AI & DS) with 8.62 SGPA. Currently AI Engineer @ Techs & Tomes Pune since June 2025. Previously AI Intern @ ARDE DRDO Pune (Nov 24 - May 25). 5x hackathon winner. Published 2 research papers.
    Core Stack: Python, C++, PyTorch, LangChain, LangGraph, OpenCV, FastAPI, React, YOLO, Kalman Filters, NLP, RAG.
    
    Answer concisely. Be conversational and humble. Always guide users to email her at ghatgerutu@gmail.com or check her LinkedIn.`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`;

    // Map message history from client format to Gemini API format
    const contents = history ? history.map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content || msg.text }]
    })) : [];

    // Add current user query
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const geminiResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: contents,
        systemInstruction: {
          parts: [{ text: sysInstruction }]
        },
        generationConfig: {
          maxOutputTokens: 500,
          temperature: 0.7
        }
      })
    });

    if (!geminiResponse.ok) {
      const errText = await geminiResponse.text();
      console.error(errText);
      return res.status(502).json({ error: "Error from Google Gemini API endpoint" });
    }

    const data = await geminiResponse.json();
    const replyText = data.candidates[0].content.parts[0].text;

    return res.json({ reply: replyText });

  } catch (error) {
    console.error("Proxy server error:", error);
    return res.status(500).json({ error: "Failed to fetch response from proxy endpoint" });
  }
});

// Start listening
app.listen(PORT, () => {
  console.log(`🚀 Secure Portfolio Proxy running on http://localhost:${PORT}`);
});

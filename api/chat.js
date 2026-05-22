export default async function handler(req, res) {
  // ── CORS Headers ──
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle Preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch (e) {
      console.error("Failed to parse body string:", e);
    }
  }
  const { message, history } = body || {};
  const geminiKey = process.env.GEMINI_API_KEY;

  if (!message) {
    return res.status(400).json({ error: 'Message parameter is required' });
  }

  if (!geminiKey) {
    return res.status(500).json({
      error: 'API key is not configured on Vercel. Please add GEMINI_API_KEY to your project Environment Variables in the Vercel Dashboard.'
    });
  }

  try {
    const sysInstruction = `You are RuBot, Rutu Ghatge's highly professional and friendly portfolio AI assistant.
    Analyze questions and answer clearly, utilizing the following details about Rutu:

    Name: Rutu Mahesh Ghatge
    Role: BE (AI&DS with Data Science Honours) — Final Year at ISBM College of Engineering, Savitribai Phule Pune University (SPPU), CGPA 8.88
    Date of Birth: March 10, 2004 (10/03/2004)
    Email: ghatgerutu@gmail.com
    Phone: +91-9822750477
    Location: Pune, India

    Education:
    - B.E. AI & Data Science with DS Hons (SPPU, 2022–2026, CGPA 8.88)
    - HSC (PCM & Bifocal Computer Science, MSBSHSE, Top Performer in Bifocal CS, short films/drama)
    - SSC (Modern High School NCL Campus, MSBSHSE, Board Topper 93.40%, Head Girl & Captain, Right Guard RSP, A Grade Drawing Examinations)

    Current Role: AI & Full-Stack Developer @ Techs & Tomes, Pune (Jun 2025 – Present)
    Previous: Research & Development Intern @ ARDE DRDO, Pune (Nov 2024 – May 2025) — received a prestigious Letter of Recommendation (LOR) from DRDO guide. Worked in a zero-connectivity secure lab (no internet, phones, or storage devices).

    Core Stack: Python, PyTorch, LangChain, LangGraph, OpenCV, FastAPI, React.js, YOLO, Kalman Filters, NLP, RAG, MongoDB.

    Key Projects (16 total):
    1. FINCEPT (Mar 2026–Present): Multi-agent AI investment intelligence platform. Gemini + stateful RAG sub-agents. Fintech AI hackathon.
    2. ArchiTech AI (Sep 2025–Present): Agentic software architecture generator. Presented at SPPU Avishkar Stage-1.
    3. RahiAI (Jul 2025–Present): Voice-first multilingual heritage tour guide (6 Indian languages). Whisper + Groq LLaMA 3.2 70B. Gen AI Hackathon (IIT Bhubaneswar / OdiaGenAI / KIIT).
    4. Pustakalay Chatbot (DRDO, Nov 2024–May 2025): Fully local offline on-device RAG chatbot (LLaMA + DeepSeek) for 500+ classified defense documents. Zero internet/connectivity environment.
    5. DeFake (Mar–Apr 2025): Multiformat deepfake detector. 1st Place (Team FakeNoMore) at Hackgineers'25.
    6–11. Techs & Tomes Confidential Projects (Jun 2025–Present): Formulynx.ai, SkinSage (RAG chatbot), SkinBB Vision, SkinBB Platform, Label Looker, Clinic Management System — all under NDA, details undisclosed.
    12. 4 Live Defense Projects at DRDO (Nov 2024–May 2025): Confidential. CNN aerial object detection, Kalman Filter + LSTM drone tracking, Edge AI optimization.
    13. SafeSurf AI: Browser extension for real-time phishing detection.
    14. Heart Disease Risk Assessment (Jul–Aug 2024): GUI-based ML risk assessor. CodeClause.
    15. Human Emulated Robotic Hand (Jan–Jun 2024): IoT neuro-prosthetic. Published in IJARSCT. Presented at ICMETET.
    16. ClapSync Home Control (Jan–Mar 2023): Clap-activated smart home automation.

    IMPORTANT: NEVER reveal internal implementation details, tech stacks, or specifics of any Techs & Tomes project. They are confidential under NDA. If asked, politely acknowledge them by name only and direct the user to contact Rutu directly.

    Achievements: 5x Hackathon winner, NPTEL Top 5% Elite + Silver, Intercollegiate Debate Champion, Infosys Pragati Mentee.
    Research: 2 published papers (IJARSCT, Scopus-indexed ICETT-2026). 3 ongoing research projects.
    Hobbies: Passionate bibliophile, loves reading books, and writing fiction and poetry. She has 1 completed fiction novel draft ready and has written 30+ poems.

    Answer concisely. Be conversational and warm. Always guide users to email ghatgerutu@gmail.com or check her LinkedIn.`;

    // Map history to Gemini content parts
    const contents = history ? history.map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content || msg.text }]
    })) : [];

    // Add current query
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    // Define fallback models to try in case of 503 "High Demand" or rate limits
    const modelsToTry = [
      'gemini-3.5-flash',
      'gemini-2.5-flash',
      'gemini-3.1-flash-lite'
    ];

    let replyText = null;
    let lastError = null;

    for (const model of modelsToTry) {
      try {
        console.log(`[RuBot] Attempting chat with model: ${model}`);
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`;
        
        const response = await fetch(url, {
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

        if (response.ok) {
          const data = await response.json();
          replyText = data.candidates[0].content.parts[0].text;
          console.log(`[RuBot] Chat successful using model: ${model}`);
          break; // Exit loop on success
        } else {
          const errText = await response.text();
          console.warn(`[RuBot] Model ${model} failed with status ${response.status}:`, errText);
          lastError = new Error(`Model ${model} returned ${response.status}: ${errText}`);
        }
      } catch (err) {
        console.warn(`[RuBot] Model ${model} threw an exception:`, err);
        lastError = err;
      }
    }

    if (!replyText) {
      console.error("[RuBot] All failover models failed. Last error:", lastError);
      return res.status(502).json({ error: "Failed to communicate with Gemini API across all active models." });
    }

    return res.status(200).json({ reply: replyText });

  } catch (error) {
    console.error("Serverless proxy function error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

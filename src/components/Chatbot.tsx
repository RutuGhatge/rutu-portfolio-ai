import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Settings, 
  Server,
  KeyRound
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

interface Message {
  role: 'bot' | 'user';
  text: string;
}

const PRESET_SUGGESTIONS = [
  'What projects has she built?',
  'Tell me about her DRDO experience',
  'What is her core tech stack?',
  'How can I contact Rutu?',
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      text: "Hey there! 👋 I'm **RuBot**, Rutu's AI Assistant. Ask me anything about her skills, projects, research, or experience!"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);

  // Settings Panel State
  const [apiMode, setApiMode] = useState<'local' | 'gemini' | 'proxy'>('local');
  const [apiKey, setApiKey] = useState('');
  const [proxyUrl, setProxyUrl] = useState('http://localhost:5000/api/chat');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load API settings from localStorage on mount
  useEffect(() => {
    const savedMode = localStorage.getItem('rutu_chat_mode');
    const savedKey = localStorage.getItem('rutu_chat_key');
    const savedProxy = localStorage.getItem('rutu_chat_proxy');

    if (savedMode) setApiMode(savedMode as any);
    if (savedKey) setApiKey(savedKey);
    if (savedProxy) setProxyUrl(savedProxy);
  }, []);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Save Settings
  const handleSaveSettings = () => {
    localStorage.setItem('rutu_chat_mode', apiMode);
    localStorage.setItem('rutu_chat_key', apiKey);
    localStorage.setItem('rutu_chat_proxy', proxyUrl);
    setShowSettings(false);
    
    // Add success notification in chat
    setMessages(prev => [
      ...prev,
      {
        role: 'bot',
        text: `🔧 Chatbot updated to **${
          apiMode === 'local' ? 'Local RAG Mode' : 
          apiMode === 'gemini' ? 'Gemini AI Mode (Direct)' : 'Local Proxy Server Mode'
        }** successfully!`
      }
    ]);
  };

  // Standard Local Response Matcher (Zero-Setup RAG fallback)
  const getLocalResponse = (query: string): string => {
    const q = query.toLowerCase();
    
    if (q.includes('project') || q.includes('build') || q.includes('portfolio')) {
      const projs = portfolioData.projects.map(p => `• **${p.name}** (${p.category}): ${p.desc}`).join('\n');
      return `Here are some of the key projects Rutu has engineered:\n\n${projs}\n\nWhich of these would you like to know more about?`;
    }

    if (q.includes('drdo') || q.includes('defense') || q.includes('military') || q.includes('intern')) {
      const drdo = portfolioData.experience.find(e => e.company.includes('DRDO'));
      if (drdo) {
        return `Rutu worked as an **AI Intern at ARDE DRDO** in Pune from ${drdo.period}. Her key contributions included:\n\n` + 
          drdo.bullets.map(b => `• ${b}`).join('\n') + 
          `\n\n**Technologies used:** ${drdo.tech.join(', ')}.`;
      }
    }

    if (q.includes('tech') || q.includes('skills') || q.includes('stack') || q.includes('languages') || q.includes('framework')) {
      const skillsText = portfolioData.skills.map(s => `• **${s.category}**: ${s.concepts.join(', ')}`).join('\n');
      return `Rutu possesses a comprehensive tech stack across AI/ML and software engineering:\n\n${skillsText}`;
    }

    if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('hire') || q.includes('reach')) {
      return `You can reach Rutu directly via:\n\n` +
        `• ✉️ **Email:** [${portfolioData.email}](mailto:${portfolioData.email})\n` +
        `• 📱 **Phone:** ${portfolioData.phone}\n` +
        `• 🔗 **LinkedIn:** [rutu-ghatge](${portfolioData.linkedin})\n` +
        `• ⌨️ **GitHub:** [rutu-ghatge](${portfolioData.github})\n\n` +
        `She is based in Pune and open to remote and on-site roles!`;
    }

    if (q.includes('research') || q.includes('paper') || q.includes('publish') || q.includes('academic')) {
      const papers = portfolioData.research.map(p => `• **${p.title}** (${p.status})${p.venue ? ` - *${p.venue}*` : ''}`).join('\n');
      return `Rutu is an active researcher. Here is a summary of her publications and current academic work:\n\n${papers}`;
    }

    if (q.includes('achievement') || q.includes('win') || q.includes('hackathon') || q.includes('award')) {
      const wins = portfolioData.achievements.slice(0, 5).map(a => `${a.icon} **${a.title}** - ${a.subtitle}`).join('\n');
      return `Rutu is a 5× Hackathon winner and debater. Here are some of her top honors:\n\n${wins}\n\n...and multiple other intercollegiate wins!`;
    }

    if (q.includes('pcod') || q.includes('pcos') || q.includes('medical')) {
      const pcos = portfolioData.research.find(r => r.title.includes('PCOD'));
      return `Rutu is working on an ongoing research project: **"${pcos?.title}"**.\n\nIt combines clinical parameters, ultrasound features, and patient history using multimodal fusion and bias-aware ML pipelines for early diagnosis.`;
    }

    if (q.includes('robotic') || q.includes('hand') || q.includes('prosthetic') || q.includes('iot')) {
      return `Rutu built and published research on a **Human Emulated Robotic Hand**. It uses a custom IoT flex-sensor glove to replicate human finger movements on a micro-actuated robotic replica. It was published in **IJARSCT** and presented at **ICMETET**!`;
    }

    if (q.includes('skincare') || q.includes('skin') || q.includes('formulynx') || q.includes('skinbb') || q.includes('skinsage') || q.includes('label') || q.includes('clinic') || q.includes('aqi') || q.includes('weather') || q.includes('techs')) {
      return `Rutu has worked on **multiple confidential AI and full-stack products** at **Techs & Tomes** across skincare tech and healthcare verticals.\n\nThese include projects under the **SkinBB suite**, **Formulynx.ai**, **SkinSage**, **Label Looker**, and a **Clinic Management System**.\n\n⚠️ *Details are confidential per NDA. For more information, please reach out to Rutu directly at ghatgerutu@gmail.com.*`;
    }

    if (q.includes('pustakalay') || q.includes('offline') || q.includes('local rag') || q.includes('on-device')) {
      return `At ARDE DRDO, Rutu built the **Pustakalay Chatbot** — a completely local, offline on-device RAG system using LLaMA + DeepSeek.\n\nIt operates within a zero-connectivity secure lab environment (no internet, no phones, no storage devices allowed) and can query 500+ classified defense documents securely!`;
    }

    if (q.includes('lor') || q.includes('letter of recommendation') || q.includes('drdo recognition')) {
      return `One of Rutu's most meaningful recognitions was receiving a **Letter of Recommendation** from her guide at ARDE, DRDO — an honour rarely extended to interns. This reflects the exceptional trust and high-impact contributions she made during her 6-month R&D tenure. 💫`;
    }

    return `Thanks for asking! Rutu is a **BE (AI&DS with DS Hons)** student and developer currently working @ Techs & Tomes, Pune. \n\nI can tell you all about her **DRDO experience**, **Pustakalay Chatbot**, **research papers**, **hackathon wins**, or how to **contact her**! What interests you?`;
  };

  // Google Gemini API direct browser integration
  const fetchGeminiResponse = async (userQuery: string, history: Message[]): Promise<string> => {
    if (!apiKey) {
      return "⚠️ **Gemini API Key missing!** Please click the settings icon (⚙️) in the chat header, insert your Google Gemini API key, and hit save to activate the live AI mode. \n\n*(Falling back to local simulation for this question)*\n\n" + getLocalResponse(userQuery);
    }

    const sysInstruction = `You are RuBot, Rutu Ghatge's highly professional and friendly portfolio AI assistant.
    Analyze questions and answer clearly, utilizing the following details about Rutu:

    Name: Rutu Mahesh Ghatge
    Role: BE (AI&DS with Data Science Honours) — Final Year at ISBM College of Engineering, Savitribai Phule Pune University (SPPU), CGPA 8.88
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

    Answer concisely. Be conversational and warm. Always guide users to email ghatgerutu@gmail.com or check her LinkedIn.`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    // Format history for Gemini
    const contents = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));
    
    // Add current query
    contents.push({
      role: 'user',
      parts: [{ text: userQuery }]
    });

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

    if (!response.ok) {
      const errorText = await response.text();
      console.error(errorText);
      throw new Error(`Gemini API returned status ${response.status}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  };

  // Secure Proxy Server request
  const fetchProxyResponse = async (userQuery: string, history: Message[]): Promise<string> => {
    const formattedHistory = history.map(m => ({
      role: m.role === 'bot' ? 'assistant' : 'user',
      content: m.text
    }));

    const response = await fetch(proxyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: userQuery,
        history: formattedHistory
      })
    });

    if (!response.ok) {
      throw new Error("Proxy connection failed.");
    }

    const data = await response.json();
    return data.reply;
  };

  // Send message handler
  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query) return;

    if (!textToSend) setInputValue('');
    setShowSuggestions(false);

    // Append user message
    const updatedMessages = [...messages, { role: 'user' as const, text: query }];
    setMessages(updatedMessages);
    setIsTyping(true);

    try {
      let reply = '';
      if (apiMode === 'local') {
        // Simulate thinking latency for realistic AI effect
        await new Promise(r => setTimeout(r, 800));
        reply = getLocalResponse(query);
      } else if (apiMode === 'gemini') {
        reply = await fetchGeminiResponse(query, messages);
      } else if (apiMode === 'proxy') {
        reply = await fetchProxyResponse(query, messages);
      }
      
      setMessages(prev => [...prev, { role: 'bot', text: reply }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [
        ...prev, 
        { 
          role: 'bot', 
          text: "⚠️ **Connection Error!** Could not fetch live response. Please check your settings/keys, or fall back to **Local RAG Mode**.\n\n*Local Answer:* " + getLocalResponse(query)
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // Key trigger
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <button 
        className="chat-btn" 
        onClick={() => setIsOpen(!isOpen)}
        title="Chat with RuBot"
        aria-label="Toggle RuBot Chat"
      >
        {isOpen ? <X size={24} color="#000" /> : <MessageSquare size={24} color="#000" />}
      </button>

      {/* Chat Window Drawer */}
      <div className={`chat-window glass-panel ${isOpen ? '' : 'hidden'}`}>
        
        {/* Header */}
        <div className="chat-header">
          <div className="chat-avatar">R</div>
          <div className="chat-header-info">
            <h4>RuBot</h4>
            <p>● online · {apiMode === 'local' ? 'Local RAG' : apiMode === 'gemini' ? 'Live Gemini AI' : 'Proxy Mode'}</p>
          </div>
          
          <div className="chat-actions">
            <button 
              className={`chat-action-btn ${showSettings ? 'active' : ''}`}
              onClick={() => setShowSettings(!showSettings)}
              title="RuBot Settings"
            >
              <Settings size={18} />
            </button>
            <button 
              className="chat-action-btn"
              onClick={() => setIsOpen(false)}
              title="Close RuBot"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* API / Key Settings Overlay */}
        <div className={`chat-settings-panel ${showSettings ? 'active' : ''}`}>
          <div>
            <h3 className="settings-title">RuBot Settings</h3>
            <p className="settings-desc">Configure the chatbot backend. Direct Gemini mode uses client-side localStorage to securely run live queries.</p>
          </div>

          {/* Mode Selector */}
          <div className="settings-group">
            <label className="settings-label">Backend Connection</label>
            <select 
              className="settings-select"
              value={apiMode}
              onChange={(e) => setApiMode(e.target.value as any)}
            >
              <option value="local">Local RAG matching (Offline/Fast)</option>
              <option value="gemini">Google Gemini API (Direct &amp; Live)</option>
              <option value="proxy">Local Node Proxy Server (CORS Safe)</option>
            </select>
          </div>

          {/* Key Input */}
          {apiMode === 'gemini' && (
            <div className="settings-group">
              <label className="settings-label">
                <KeyRound size={12} style={{ marginRight: 4 }} /> 
                Gemini API Key
              </label>
              <input 
                type="password" 
                className="settings-input" 
                placeholder="AIzaSy..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <p className="settings-desc" style={{ marginTop: 2, fontSize: '0.72rem' }}>
                Stored locally in your browser. Bypasses CORS restrictions safely.
              </p>
            </div>
          )}

          {/* Proxy URL Input */}
          {apiMode === 'proxy' && (
            <div className="settings-group">
              <label className="settings-label">
                <Server size={12} style={{ marginRight: 4 }} />
                Proxy Endpoint URL
              </label>
              <input 
                type="text" 
                className="settings-input" 
                value={proxyUrl}
                onChange={(e) => setProxyUrl(e.target.value)}
              />
            </div>
          )}

          <button 
            className="settings-btn-save"
            onClick={handleSaveSettings}
          >
            Apply &amp; Save Configuration
          </button>
        </div>

        {/* Messages Body */}
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-msg ${msg.role}`}>
              <div className={`chat-msg-avatar ${msg.role === 'bot' ? 'bot-avatar' : 'user-avatar'}`}>
                {msg.role === 'bot' ? 'R' : 'U'}
              </div>
              <div 
                className="chat-bubble"
                dangerouslySetInnerHTML={{ 
                  __html: msg.text
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em>$1</em>')
                    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noreferrer" style="color:#00d4a8;text-decoration:underline;">$1</a>')
                    .replace(/\n/g, '<br />')
                }}
              />
            </div>
          ))}

          {isTyping && (
            <div className="chat-msg bot">
              <div className="chat-msg-avatar bot-avatar">R</div>
              <div className="chat-bubble">
                <div className="typing-indicator">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Chips */}
        {showSuggestions && (
          <div className="chat-suggestions">
            {PRESET_SUGGESTIONS.map((sug, index) => (
              <button
                key={index}
                className="chat-suggestion"
                onClick={() => handleSendMessage(sug)}
              >
                {sug}
              </button>
            ))}
          </div>
        )}

        {/* Text Input Area */}
        <div className="chat-input-area">
          <textarea
            className="chat-input"
            rows={1}
            placeholder="Ask about Rutu's experience..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button 
            className="chat-send"
            disabled={!inputValue.trim() || isTyping}
            onClick={() => handleSendMessage()}
            title="Send Message"
          >
            <Send size={16} color="#000" />
          </button>
        </div>

      </div>
    </>
  );
}

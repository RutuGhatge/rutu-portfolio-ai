export interface Project {
  id: string;
  num: string;
  name: string;
  desc: string;
  stack: string[];
  category: 'LLMs & Agents' | 'Computer Vision' | 'Full-Stack AI' | 'IoT & Robotics';
  link?: string;
}

export interface Experience {
  role: string;
  period: string;
  company: string;
  location: string;
  bullets: string[];
  tech: string[];
}

export interface ResearchPaper {
  title: string;
  desc: string;
  status: 'Published' | 'Ongoing';
  authors?: string;
  venue?: string;
  indexInfo?: string;
}

export interface Achievement {
  icon: string;
  title: string;
  subtitle: string;
}

export interface AdvancedSkill {
  category: string;
  description: string;
  concepts: string[];
  rating: string; // e.g. 'Advanced Expert', 'Specialized'
}

export interface CertificationData {
  title: string;
  provider: 'Google' | 'IBM' | 'Infosys' | 'Standard' | 'DRDO' | 'Udemy' | 'NPTEL' | 'Finlatics' | 'Indeed Inspiring Infotech' | 'UC San Diego';
  year: string;
  badgeUrl?: string;
  certImageUrl?: string;
}

export interface Education {
  degree: string;
  college: string;
  university: string;
  period: string;
  grade: string;
  details: string[];
}

export interface PortfolioData {
  name: string;
  role: string;
  tagline: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  avatarUrl: string;
  stats: {
    experience: string;
    projects: string;
    hackathons: string;
    publications: string;
    certificates: string;
  };
  about: {
    p1: string;
    p2: string;
    p3: string;
    p4: string;
    highlights: { icon: string; title: string; desc: string }[];
  };
  skills: AdvancedSkill[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  research: ResearchPaper[];
  achievements: Achievement[];
  certifications: CertificationData[];
}

export const portfolioData: PortfolioData = {
  name: 'Rutu Ghatge',
  role: 'BE (AI&DS with DS Hons)',
  tagline: 'Building intelligent systems that bridge research and production — from LLM-powered agents and computer vision pipelines to full-stack AI applications. Currently @ Techs & Tomes, previously @ DRDO.',
  location: 'Pune, India',
  email: 'ghatgerutu@gmail.com',
  phone: '+91-9822750477',
  linkedin: 'https://linkedin.com/in/rutu-ghatge',
  github: 'https://github.com/rutu-ghatge',
  avatarUrl: '/rutu_portrait.png',
  stats: {
    experience: '2+',
    projects: '20+',
    hackathons: '5',
    publications: '2',
    certificates: '40+'
  },
  about: {
    p1: "I'm Rutu — a BE (AI&DS with DS Hons) student and developer who builds things that actually work. Currently in my final year of B.E. in Artificial Intelligence & Data Science with Data Science Honors at ISBM College of Engineering, SPPU (CGPA 8.88).",
    p2: "My work spans LLM-powered backend systems, real-time computer vision, RAG architectures, and multi-agent AI — with production deployments at an AI startup and defense-grade systems at ARDE DRDO.",
    p3: "I'm deeply curious about the intersection of applied AI and real-world impact, whether that's personalizing skincare recommendations, detecting aerial drones, or building agentic fintech tools.",
    p4: "Outside code, I serve as the IoT Club Coordinator, TnP Cell member, intercollegiate debate champion, and an Infosys Pragati mentee.",
    highlights: [
      { icon: '🧠', title: 'LLM & Agentic AI', desc: 'LangChain, LangGraph, RAG, multi-agent orchestration, Gemini Pro' },
      { icon: '👁', title: 'Computer Vision', desc: 'YOLO, DeepSORT, Kalman Filters, CNN, OpenCV, aerial detection' },
      { icon: '⚙️', title: 'Full-Stack AI Systems', desc: 'FastAPI, React, MongoDB, Docker, real-time deployment pipelines' },
      { icon: '📄', title: 'Published Researcher', desc: 'IJARSCT · ICMETET · ICETT-2026 (Scopus-indexed)' },
      { icon: '🏆', title: 'Competitive Track Record', desc: '5× hackathon winner, Top 5% NPTEL, multiple debate championships' }
    ]
  },
  skills: [
    {
      category: 'Generative AI & Agentic Systems',
      description: 'Orchestrating autonomous workflows using multi-agent frameworks, custom prompt routing, stateful graph memory, and semantic context engines.',
      concepts: ['LangGraph Systems', 'LangChain Frameworks', 'Retrieval-Augmented Generation (RAG)', 'Context Routing Agents', 'Dialogflow CX Orchestration', 'Vertex AI Prompt Engineering'],
      rating: 'Advanced / Expert'
    },
    {
      category: 'Computer Vision & Deep Tracking',
      description: 'Developing high-speed, real-time deep learning pipelines for object classification, aerial surveillance tracking, and secure media classification.',
      concepts: ['YOLO (v8/v9/v10) Object Detection', 'DeepSORT Multi-Object Tracking', 'Convolutional Neural Networks (CNNs)', 'Image & Audio Deepfake Classifiers', 'ANPR & ATCC Traffic Automation', 'OpenCV Pipeline Architectures'],
      rating: 'Specialized / Defense-Grade'
    },
    {
      category: 'Mathematical & Decision Models',
      description: 'Implementing advanced analytical algorithms for predictive state estimating, opponent behavioral modeling, and mechanical decision analysis.',
      concepts: ['Hybrid Kalman Filters', 'LSTM Sequence Forecasting', 'Theory of Mind MARL Opponent Models', 'Fuzzy-DEMATEL Criteria Analysis', 'VIKOR & TOPSIS Decision Solvers', 'SLAM Navigation Planning'],
      rating: 'Advanced Algorithmic'
    },
    {
      category: 'Production AI Backend & Cloud',
      description: 'Architecting containerized APIs and robust cloud datastores designed to run real-world production ML inference pipelines cleanly.',
      concepts: ['FastAPI High-Speed Pipelines', 'Docker Container Orchestration', 'MongoDB Document Databases', 'AWS Cloud Architectures', 'Vertex AI Deployment Tools', 'Git / Agile Workflow Platforms'],
      rating: 'Production Ready'
    }
  ],
  experience: [
    {
      role: 'AI & Full-Stack Developer',
      period: 'Jun 2025 – Present',
      company: 'Techs & Tomes',
      location: 'Pune',
      bullets: [
        'Contributed to multiple confidential AI and full-stack products across skincare tech and healthcare verticals — details undisclosed per NDA.',
        'Built scalable backend systems, AI-powered features, and frontend interfaces across production-grade platforms.',
        'Worked with generative AI, computer vision, and API-driven product development in a fast-paced startup environment.'
      ],
      tech: ['React.js', 'FastAPI', 'MongoDB', 'Python', 'Computer Vision', 'Generative AI', 'Tailwind CSS']
    },
    {
      role: 'Research & Development Intern',
      period: 'Nov 2024 – May 2025',
      company: 'ARDE DRDO',
      location: 'Pune',
      bullets: [
        'Awarded a prestigious Letter of Recommendation (LOR) from the ARDE DRDO guide for exceptional work in secure defense systems.',
        'Successfully innovated under strict security constraints: an isolated, zero-connectivity lab with no internet, phones, or storage devices.',
        'Pustakalay Chatbot: Engineered a fully local, offline on-device RAG chatbot (LLaMA + DeepSeek) to secure-query defense files.',
        'Contributed to 4 live secure projects including high-accuracy CNN aerial object detection models and hybrid Kalman Filter tracking pipelines.',
        'Collaborated directly with senior scientists and represented the R&D team in coordination meetings with top academic institutions.'
      ],
      tech: ['YOLO', 'Kalman Filter', 'Deep Learning', 'Edge AI', 'Local RAG', 'Python Automation']
    },
    {
      role: 'Smart Traffic Management Intern',
      period: 'Feb 2025 – Mar 2025',
      company: 'Infosys Springboard',
      location: 'Remote',
      bullets: [
        'Developed ANPR and ATCC systems using YOLO, OCR — helmet detection, heatmaps, signal violation detection.',
        'Delivered all milestones within a 6-week Agile sprint cycle.'
      ],
      tech: ['YOLO', 'OCR', 'Flask', 'React']
    },
    {
      role: 'Development Intern',
      period: 'Jun 2024 – Nov 2024',
      company: 'Standard Learner',
      location: 'Remote',
      bullets: [
        'Maintained mock test platform, resolved production issues, collaborated on chatbot + AI model integration.'
      ],
      tech: ['Python', 'AI Integration']
    },
    {
      role: 'Data Science Intern',
      period: 'May 2024 – Jul 2024',
      company: 'CodeClause',
      location: 'Remote',
      bullets: [
        'Built end-to-end data science pipelines — EDA, feature engineering, predictive models.'
      ],
      tech: ['Python', 'Scikit-learn', 'Pandas']
    }
  ],
  projects: [
    {
      id: '01',
      num: '01',
      name: 'FINCEPT',
      desc: 'Multi-agent AI-powered investment intelligence platform that helps users analyze portfolios, understand market trends, and make informed financial decisions. Built during a fintech AI hackathon using Gemini and stateful RAG sub-agents.',
      stack: ['FastAPI', 'Python', 'MongoDB', 'React.js', 'Artificial Intelligence (AI)', 'Gemini', 'RAG', 'Data Analytics'],
      category: 'LLMs & Agents'
    },
    {
      id: '02',
      num: '02',
      name: 'ArchiTech AI',
      desc: 'Generative and agentic platform converting natural language prompts into complete software architecture blueprints. Engineered as a multi-agent system with RAG, feedback loops, and human-in-the-loop validation. Presented at SPPU Avishkar Competition Stage-1.',
      stack: ['Python', 'Generative AI', 'Agentic AI', 'Multi-Agent Systems', 'RAG', 'Software Architecture'],
      category: 'LLMs & Agents'
    },
    {
      id: '03',
      num: '03',
      name: 'RahiAI',
      desc: 'Voice-first, multilingual virtual tour guide supporting six languages: English, Hindi, Marathi, Bengali, Tamil, and Odia. Integrates Whisper for transcription and Groq LLaMA 3.2 70B, developed at Gen AI Hackathon organized by OdiaGenAI, IIT Bhubaneswar, and KIIT.',
      stack: ['Whisper', 'Groq LLaMA 3.2', 'FastAPI', 'React.js', 'LangGraph', 'LLM', 'Voice AI'],
      category: 'LLMs & Agents'
    },
    {
      id: '04',
      num: '04',
      name: 'Pustakalay Chatbot (Local On-Device RAG)',
      desc: 'Offline RAG chatbot engineered for a highly secure research environment at ARDE, DRDO. Operates completely on-device without internet access, indexing and resolving secure queries across 500+ defense files.',
      stack: ['Local RAG', 'DeepSeek', 'LLaMA', 'On-Device Inference', 'Python', 'Defense AI'],
      category: 'LLMs & Agents'
    },
    {
      id: '05',
      num: '05',
      name: 'DeFake (Multiformat Deepfake Detection)',
      desc: 'AI-powered detection system and Chrome extension designed to identify manipulated image, video, and voice files on social platforms (especially Instagram). Won 1st Place (Team FakeNoMore) at Hackgineers\'25.',
      stack: ['Machine Learning', 'Large Language Models (LLM)', 'NLP', 'Ethical AI', 'Computer Vision', 'React.js', 'Flask'],
      category: 'Computer Vision'
    },
    {
      id: '06',
      num: '06',
      name: 'Formulynx.ai',
      desc: 'Confidential AI skincare platform at Techs & Tomes. Details undisclosed.',
      stack: ['FastAPI', 'MongoDB', 'Python', 'Generative AI', 'RAG'],
      category: 'Full-Stack AI'
    },
    {
      id: '07',
      num: '07',
      name: 'SkinSage',
      desc: 'Confidential RAG-based AI chatbot built under the SkinBB suite at Techs & Tomes. Details undisclosed.',
      stack: ['LangChain', 'RAG', 'Python', 'FastAPI', 'Generative AI'],
      category: 'LLMs & Agents'
    },
    {
      id: '08',
      num: '08',
      name: 'SkinBB Vision',
      desc: 'Confidential computer vision product under SkinBB at Techs & Tomes. Details undisclosed.',
      stack: ['Computer Vision', 'Python', 'FastAPI'],
      category: 'Full-Stack AI'
    },
    {
      id: '09',
      num: '09',
      name: 'SkinBB Platform',
      desc: 'Confidential digital platform under SkinBB at Techs & Tomes. Details undisclosed.',
      stack: ['React.js', 'FastAPI', 'MongoDB', 'Tailwind CSS'],
      category: 'Full-Stack AI'
    },
    {
      id: '10',
      num: '10',
      name: 'Label Looker',
      desc: 'Confidential AI tool at Techs & Tomes. Details undisclosed.',
      stack: ['Computer Vision', 'OCR', 'Python', 'FastAPI'],
      category: 'Full-Stack AI'
    },
    {
      id: '11',
      num: '11',
      name: 'Clinic Management System',
      desc: 'Confidential enterprise software at Techs & Tomes. Details undisclosed.',
      stack: ['FastAPI', 'MongoDB', 'Python'],
      category: 'Full-Stack AI'
    },
    {
      id: '11',
      num: '11',
      name: '4 Live Defense Projects at ARDE DRDO',
      desc: 'Four live secure R&D systems developed in a zero-connectivity lab at ARDE DRDO. Included CNN aerial object detection with GELAN activation, hybrid Kalman Filter + LSTM drone tracking (99%+ accuracy), and Edge AI model optimization for offline deployment.',
      stack: ['YOLO', 'Kalman Filter', 'LSTM', 'CNN', 'Edge AI', 'Python Automation', 'DeepSORT'],
      category: 'Computer Vision'
    },
    {
      id: '12',
      num: '12',
      name: 'SafeSurf AI',
      desc: 'Smart browser extension utilizing content-based AI threat detection to shield users from phishing attacks. Features suspicion score badges, context-aware alerts for disguised pages, and automated email alerts.',
      stack: ['Chrome Extensions', 'Cybersecurity', 'NLP', 'Django REST Framework', 'Docker', 'Web Scraping'],
      category: 'Full-Stack AI'
    },
    {
      id: '13',
      num: '13',
      name: 'Heart Disease Risk Assessment',
      desc: 'GUI-based medical analysis tool using machine learning models to evaluate patient health metrics and predict risk factors, accompanied by interactive Seaborn data visualizations. Developed under CodeClause.',
      stack: ['Python', 'Tkinter', 'Seaborn', 'Machine Learning', 'Data Visualization'],
      category: 'Full-Stack AI'
    },
    {
      id: '14',
      num: '14',
      name: 'Human Emulated Robotic Hand',
      desc: 'Affordable IoT neuro-prosthetic robotic hand replicating human finger movements using flex-sensor glove inputs. Research published in IJARSCT, presented at ICMETET, and featured as a SPPU engineering showcase.',
      stack: ['Arduino', 'IoT', 'Flex Sensors', 'Electronics', 'Project Management'],
      category: 'IoT & Robotics'
    },
    {
      id: '15',
      num: '15',
      name: 'ClapSync Home Control',
      desc: 'A clap-activated acoustic smart home control system utilizing analog sound sensors and relay circuits to regulate household electrical appliances safely and cost-effectively.',
      stack: ['Electronics', 'Home Automation', 'Arduino', 'Acoustic Sensors'],
      category: 'IoT & Robotics'
    }
  ],
  research: [
    {
      title: 'Leveraging LLMs for Explainable and Personalized Facial Skin Analysis',
      desc: 'Research paper on utilizing fine-tuned LLMs and vision models to analyze skin features, producing dermatological guidelines under resource boundaries.',
      status: 'Published',
      authors: 'Rutu Ghatge, Dr. Dikshendra Sarpate, Mrs. Swati Jakkan',
      venue: 'Presented at ICETT-2026',
      indexInfo: 'Scopus-indexed publication'
    },
    {
      title: 'Human Emulated Robotic Hand — Affordable Neuro-Prosthetics',
      desc: 'Research on building low-cost neuro-prosthetics using flex-sensor glove inputs and micro-actuated robotic replicas.',
      status: 'Published',
      venue: 'Published in IJARSCT · Presented at ICMETET'
    },
    {
      title: 'Early Prediction of PCOD/PCOS using Multimodal AI',
      desc: 'Combining clinical parameters, ultrasound features, and patient history via multimodal fusion and bias-aware medical ML pipelines.',
      status: 'Ongoing'
    },
    {
      title: 'Theory of Mind in Multi-Agent Reinforcement Learning',
      desc: 'ToM-based cognitive agents modeling opponent beliefs and intentions — ToM-net, opponent modeling, cooperative behavior emergence in MARL.',
      status: 'Ongoing'
    },
    {
      title: 'Multi-Criteria Decision Making in Mechanical Systems',
      desc: 'Applying Fuzzy-DEMATEL, VIKOR, and TOPSIS for performance evaluation and supplier optimization.',
      status: 'Ongoing'
    }
  ],
  achievements: [
    { icon: '🥇', title: '1st Place — DATAthon', subtitle: 'ISBM College of Engineering' },
    { icon: '🥇', title: '1st Place — State Hackathon', subtitle: 'Ajeenkya DY Patil University, Pune' },
    { icon: '🥇', title: '1st — Project Competition', subtitle: 'ISB&M Bangalore' },
    { icon: '🥇', title: '1st — Idea Hackathon', subtitle: 'ISBM Kolkata' },
    { icon: '🥈', title: '1st Runner-Up — War of Words', subtitle: 'Crescendo\'26 Debate' },
    { icon: '🎖', title: 'Top 5% · Elite + Silver Medal', subtitle: 'NPTEL Mobile VR & AI' },
    { icon: '🥉', title: 'Second Runner-Up — EDAthon', subtitle: 'Ajinkya DY Patil' },
    { icon: '🎯', title: 'Top 8 — Inceptia National Hackathon', subtitle: 'PCCOER Pune' },
    { icon: '🎤', title: 'Debate Winner', subtitle: 'Multiple intercollegiate championships' },
    { icon: '🌱', title: 'Infosys Pragati Mentee', subtitle: 'Infosys Springboard Program' }
  ],
  education: [
    {
      degree: 'B.E. in Artificial Intelligence & Data Science (DS Honours)',
      college: 'ISBM College of Engineering, Pune',
      university: 'Savitribai Phule Pune University (SPPU)',
      period: '2022 – 2026',
      grade: '8.88 CGPA',
      details: [
        'Coordinator of the IoT Club, leading hands-on workshops and technical projects.',
        'Active member of the Training & Placement (TnP) Cell, coordinating corporate recruitment drives.',
        'Intercollegiate Debate Champion and winner of multiple public speaking awards.',
        'Selected as an Infosys Pragati Mentee under the Infosys Springboard Program.'
      ]
    },
    {
      degree: 'Higher Secondary Certificate (HSC) / Class XII (Science)',
      college: 'Junior College (PCM & Bifocal Computer Science)',
      university: 'Maharashtra State Board of Secondary and Higher Secondary Education (MSBSHSE)',
      period: '2020 – 2022',
      grade: 'Distinction / Grade A',
      details: [
        'Specialized in Physics, Chemistry, and Mathematics (PCM) with Bifocal Computer Science.',
        'Recognized as a Top Performer in Bifocal Computer Science.',
        'Actively engaged in creative extracurriculars, coordinating and performing in short films and drama productions.'
      ]
    },
    {
      degree: 'Secondary School Certificate (SSC) / Class X',
      college: 'Modern High School, NCL Campus',
      university: 'Maharashtra State Board of Secondary and Higher Secondary Education (MSBSHSE)',
      period: '2010 – 2020',
      grade: 'Board Topper · 93.40%',
      details: [
        'Graduated as Board Topper with a stellar score of 93.40% in SSC examinations.',
        'Appointed as Head Girl of the school after serving as School Captain, leading the student council.',
        'Served as Right Guard in the Road Safety Patrol (RSP), coordinating student discipline and parades.',
        'Achieved "A" Grade in both Intermediate and Elementary Drawing Grade Examinations.'
      ]
    }
  ],
  certifications: [
    { title: 'Research & Development AI Intern Certificate', provider: 'DRDO', year: '2025', certImageUrl: '/certs/drdo_cert.jpg', badgeUrl: '/certs/drdo_lor.pdf' },
    { title: 'Advanced AI & Deep Learning Specialization', provider: 'Udemy', year: '2024', certImageUrl: '/certs/udemy_cert.jpg', badgeUrl: '/certs/udemy_cert.pdf' },
    { title: 'Google AI Essentials', provider: 'Google', year: '2024', certImageUrl: '/certs/google ai essentials.pdf' },
    { title: 'Introduction to Generative AI Studio', provider: 'Google', year: '2024', certImageUrl: '/certs/google cloud intro to generative ai studio.pdf' },
    { title: 'SQL and Relational Databases', provider: 'IBM', year: '2024', certImageUrl: '/certs/sql and relational databases 101.jpg' },
    { title: 'Foundations of Cybersecurity', provider: 'Google', year: '2024', certImageUrl: '/certs/Google cybebrsecurity foundation.jpg' },
    { title: 'Mobile Virtual Reality and Artificial Intelligence (Elite + Silver)', provider: 'NPTEL', year: '2024', certImageUrl: '/certs/Mobile Virtual Reality and Artificial Intelligence.jpg' },
    { title: 'Finlatics Business Analyst Experience Program', provider: 'Finlatics', year: '2024', certImageUrl: '/certs/finlatics business analyst.jpg' },
    { title: 'Python for Machine Learning', provider: 'Indeed Inspiring Infotech', year: '2024', certImageUrl: '/certs/python for ml.jpg' },
    { title: 'Generative AI Add-on Specialization', provider: 'Indeed Inspiring Infotech', year: '2024', certImageUrl: '/certs/Gen AI Add on cousre Indeed Inspiring Infotech.jpg' },
    { title: 'Internet of Things Specialization', provider: 'UC San Diego', year: '2024', certImageUrl: '/certs/uc san diego iot.jpg' }
  ]
};

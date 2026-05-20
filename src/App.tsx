import { useState, useEffect } from 'react';
import { portfolioData } from './data/portfolioData';
import Chatbot from './components/Chatbot';
import infosysCerts from './data/infosys_certs.json';
import { 
  ArrowRight, 
  Mail, 
  Phone, 
  Linkedin, 
  Github, 
  ExternalLink,
  Award,
  ChevronDown,
  ChevronUp,
  FileText
} from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [navScrolled, setNavScrolled] = useState(false);
  const [projectFilter, setProjectFilter] = useState<string>('All');
  const [selectedCert, setSelectedCert] = useState<any | null>(null);
  const [showAllInfosys, setShowAllInfosys] = useState(false);

  // Sort Infosys certs according to Category rules:
  // 1. Internship, Pragati, Hackathon, Certification (highest value)
  // 2. Technical specialization courses
  // 3. Non-technical / Soft skills
  const getCertCategory = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (
      lowerTitle.includes('internship') || 
      lowerTitle.includes('pragati') || 
      lowerTitle.includes('hackathon') || 
      lowerTitle.includes('certification')
    ) {
      return 0; // Top tier
    }
    
    const techKeywords = [
      'deep learning', 'generative', 'ai', 'artificial intelligence', 'python', 
      'gpt', 'openai', 'robotic process', 'rpa', 'data science', 'scrum', 
      'agile', 'iot', 'arduino', 'computer vision', 'nlp', 'natural language', 
      'traffic management', 'prodigy', 'developer'
    ];
    
    if (techKeywords.some(keyword => lowerTitle.includes(keyword))) {
      return 1; // Technical
    }
    
    return 2; // Non-tech
  };

  const sortedInfosysCerts = [...infosysCerts].sort((a, b) => {
    const catA = getCertCategory(a.title);
    const catB = getCertCategory(b.title);
    if (catA !== catB) {
      return catA - catB;
    }
    // secondary sort: year desc, then title asc
    if (b.year !== a.year) {
      return b.year.localeCompare(a.year);
    }
    return a.title.localeCompare(b.title);
  });
  
  // Track scroll state for navbar appearance and active section tracking
  useEffect(() => {
    const handleScroll = () => {
      // Background shift on scroll
      setNavScrolled(window.scrollY > 50);

      // Section tracking
      const sections = ['home', 'about', 'skills', 'experience', 'education', 'projects', 'research', 'certifications', 'achievements', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter projects by selected category
  const filteredProjects = projectFilter === 'All'
    ? portfolioData.projects
    : portfolioData.projects.filter(p => p.category === projectFilter);

  const categories = ['All', 'LLMs & Agents', 'Computer Vision', 'Full-Stack AI', 'IoT & Robotics'];

  // Generate a set of background magic stars with distributed horizontal positions
  const magicStars = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    left: `${(i * 6) + Math.random() * 4}%`,
    delay: `${Math.random() * 15}s`,
    duration: `${20 + Math.random() * 15}s`,
    isPurple: i % 2 === 0
  }));

  return (
    <div className="portfolio-app">
      {/* Dynamic Background Magic Stars */}
      <div className="magic-stars-container">
        {magicStars.map(star => (
          <div 
            key={star.id} 
            className={`magic-star ${star.isPurple ? 'purple' : ''}`}
            style={{
              left: star.left,
              animationDelay: star.delay,
              animationDuration: star.duration
            }}
          />
        ))}
      </div>

      {/* Decorative Grids and Blobs */}
      <div className="grid-overlay"></div>
      <div className="ambient-blob blob-teal"></div>
      <div className="ambient-blob blob-indigo"></div>

      {/* Navigation */}
      <nav className={navScrolled ? 'scrolled' : ''}>
        <a href="#home" className="nav-logo">
          RG <span>AI Engineer</span>
        </a>
        <ul className="nav-links">
          {['About', 'Skills', 'Experience', 'Education', 'Projects', 'Research', 'Certifications', 'Contact'].map((sec) => {
            const id = sec.toLowerCase();
            return (
              <li key={id}>
                <a 
                  href={`#${id}`} 
                  className={activeSection === id ? 'active' : ''}
                >
                  {sec}
                </a>
              </li>
            );
          })}
        </ul>
        <div className="nav-cta-group">
          <a 
            href={portfolioData.linkedin} 
            target="_blank" 
            rel="noreferrer" 
            className="nav-cta-linkedin"
            title="LinkedIn Profile"
          >
            <Linkedin size={14} />
            <span>LinkedIn</span>
          </a>
          <a href={`mailto:${portfolioData.email}`} className="nav-cta">
            <Mail size={13} style={{ marginRight: '6px', verticalAlign: 'middle', display: 'inline-block' }} />
            <span>{portfolioData.email}</span>
          </a>
        </div>

      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="section-inner">
          <div className="hero-grid-split">
            <div className="hero-content">
              <h1 className="hero-name">
                Rutu<br/><span>Ghatge</span>
              </h1>
              
              
              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-num">{portfolioData.stats.experience}</span>
                  <span className="stat-label">Years Experience</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num">{portfolioData.stats.projects}</span>
                  <span className="stat-label">Projects Built</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num">{portfolioData.stats.certificates}</span>
                  <span className="stat-label">Certifications</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num">{portfolioData.stats.hackathons}</span>
                  <span className="stat-label">Hackathon Wins</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num">{portfolioData.stats.publications}</span>
                  <span className="stat-label">Publications</span>
                </div>
              </div>
            </div>

            <div className="hero-portrait-container">
              <div className="hero-portrait-frame">
                <div className="portrait-glow-back"></div>
                <img src={portfolioData.avatarUrl} alt={`${portfolioData.name} Portrait`} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about">
        <div className="section-inner">
          <div className="section-header">
            <div className="section-eyebrow">// 01 — about</div>
            <h2 className="section-title">Who I am</h2>
          </div>
          <div className="about-grid">
            <div className="about-text">
              <p>{portfolioData.about.p1}</p>
              <p>{portfolioData.about.p2}</p>
              <p>{portfolioData.about.p3}</p>
              <p>{portfolioData.about.p4}</p>
            </div>
            <div className="about-highlights">
              {portfolioData.about.highlights.map((hl, index) => (
                <div key={index} className="highlight-card glass-panel">
                  <div className="highlight-icon">{hl.icon}</div>
                  <div>
                    <h4>{hl.title}</h4>
                    <p>{hl.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills">
        <div className="section-inner">
          <div className="section-header">
            <div className="section-eyebrow">// 02 — skills</div>
            <h2 className="section-title">Advanced Tech Stack</h2>
          </div>
          <div className="skills-grid-advanced">
            {portfolioData.skills.map((group, index) => (
              <div key={index} className="skill-matrix-card">
                <div className="skill-matrix-info">
                  <span className="skill-matrix-rating">{group.rating}</span>
                  <h3 className="skill-matrix-title">{group.category}</h3>
                  <p className="skill-matrix-desc">{group.description}</p>
                </div>
                <div className="skill-matrix-tags">
                  {group.concepts.map((concept, cIdx) => (
                    <span key={cIdx} className="skill-matrix-tag">
                      {concept}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience">
        <div className="section-inner">
          <div className="section-header">
            <div className="section-eyebrow">// 03 — experience</div>
            <h2 className="section-title">Where I've worked</h2>
          </div>
          <div className="timeline">
            {portfolioData.experience.map((exp, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-card glass-panel">
                  <div className="timeline-meta">
                    <span className="timeline-role">{exp.role}</span>
                    <span className="timeline-period">{exp.period}</span>
                  </div>
                  <div className="timeline-company">
                    📍 {exp.company} · <span>{exp.location}</span>
                  </div>
                  <ul className="timeline-bullets">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx}>{bullet}</li>
                    ))}
                  </ul>
                  <div className="timeline-tech">
                    {exp.tech.map((t, tIdx) => (
                      <span key={tIdx} className="tech-badge">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education">
        <div className="section-inner">
          <div className="section-header">
            <div className="section-eyebrow">// 04 — education</div>
            <h2 className="section-title">My Education</h2>
          </div>
          <div className="education-grid">
            {portfolioData.education.map((edu, index) => (
              <div key={index} className="education-card glass-panel">
                <div className="education-header-split">
                  <div className="education-header-main">
                    <h3 className="education-degree">
                      <span className="edu-icon-badge">🎓</span> {edu.degree}
                    </h3>
                    <p className="education-college">
                      🏢 <strong>{edu.college}</strong>
                    </p>
                    <p className="education-university">
                      🏫 {edu.university}
                    </p>
                  </div>
                  <div className="education-meta">
                    <span className="education-period">{edu.period}</span>
                    <span className="education-grade">{edu.grade}</span>
                  </div>
                </div>
                <div className="education-divider"></div>
                <div className="education-details-list">
                  {edu.details.map((detail, dIdx) => (
                    <div key={dIdx} className="education-detail-item">
                      <span className="education-bullet-star">✦</span>
                      <p className="education-detail-text">{detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects">
        <div className="section-inner">
          <div className="projects-header">
            <div>
              <div className="section-eyebrow">// 05 — projects</div>
              <h2 className="section-title">Things I've built</h2>
            </div>
            <div className="skills-filter">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setProjectFilter(cat)}
                  className={`filter-btn ${projectFilter === cat ? 'active' : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          
          <div className="projects-grid">
            {filteredProjects.map((proj) => (
              <div key={proj.id} className="project-card glass-panel">
                <div className="project-top">
                  <div className="project-header-meta">
                    <span className="project-num">{proj.num}</span>
                    <span className="project-category">{proj.category}</span>
                  </div>
                  <h3 className="project-name">{proj.name}</h3>
                  <p className="project-desc">{proj.desc}</p>
                </div>
                <div className="project-bottom">
                  <div className="project-stack">
                    {proj.stack.map((stk, sIdx) => (
                      <span key={sIdx} className="stack-pill">{stk}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section id="research">
        <div className="section-inner">
          <div className="section-header">
            <div className="section-eyebrow">// 06 — research</div>
            <h2 className="section-title">Academic Work</h2>
          </div>
          
          <div className="research-grid">
            {portfolioData.research.map((paper, index) => (
              <div key={index} className="research-card glass-panel">
                <span className={`research-badge ${paper.status === 'Published' ? 'badge-published' : 'badge-ongoing'}`}>
                  {paper.status}
                </span>
                <div className="research-info">
                  <h3 className="research-title">{paper.title}</h3>
                  <p className="research-desc">{paper.desc}</p>
                  <div className="research-meta-tags">
                    {paper.authors && <span><strong>Authors:</strong> {paper.authors}</span>}
                    {paper.venue && <span><strong>Venue:</strong> {paper.venue}</span>}
                    {paper.indexInfo && <span><strong>Indexing:</strong> {paper.indexInfo}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications">
        <div className="section-inner">
          <div className="section-header">
            <div className="section-eyebrow">// 07 — credentials</div>
            <h2 className="section-title">Professional Certifications</h2>
          </div>
          
          {/* Featured Credentials at Top */}
          <div className="certifications-matrix-grid">
            {portfolioData.certifications.map((cert, index) => {
              const providerClass = `provider-${cert.provider.toLowerCase().replace(/\s+/g, '-')}`;
              return (
                <div 
                  key={index} 
                  className={`cert-visual-card ${providerClass} ${cert.certImageUrl ? 'has-preview' : ''}`}
                  onClick={() => cert.certImageUrl && setSelectedCert(cert)}
                  style={cert.certImageUrl ? { cursor: 'pointer' } : undefined}
                >
                  {cert.certImageUrl && (
                    <div className="cert-image-container">
                      {cert.certImageUrl.toLowerCase().endsWith('.pdf') ? (
                        <div className="cert-pdf-placeholder">
                          <FileText className="pdf-placeholder-icon" size={32} />
                          <span className="pdf-placeholder-text">PDF Credential Document</span>
                          <span className="pdf-placeholder-sub">Click to view & verify</span>
                        </div>
                      ) : (
                        <img src={cert.certImageUrl} alt={cert.title} loading="lazy" />
                      )}
                      <div className="cert-image-overlay"></div>
                      <div className="cert-preview-hover-indicator">
                        <span>Click to view certificate</span>
                      </div>
                    </div>
                  )}
                  <div className="cert-card-content">
                    <div>
                      <span className="cert-badge-type">{cert.provider}</span>
                      <h3 className="cert-title">{cert.title}</h3>
                    </div>
                    <div className="cert-bottom-info">
                      <span className="cert-year">{cert.year}</span>
                      {cert.badgeUrl ? (
                        <a 
                          href={cert.badgeUrl} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="cert-action-link"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Verify Credential <ExternalLink size={10} />
                        </a>
                      ) : (
                        <span className="cert-action-link" style={{ cursor: 'default', textDecoration: 'none' }}>
                          Verified
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Secondary Expandable Infosys Springboard Course Certificates */}
          <div className="infosys-certs-container" style={{ marginTop: '5rem' }}>
            <div className="section-header" style={{ marginBottom: '2.5rem' }}>
              <div className="section-eyebrow">// skills & course certificates</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 600 }}>
                Infosys Springboard Credentials <span style={{ color: 'var(--purple)', fontSize: '1.2rem', fontFamily: 'var(--font-mono)' }}>({infosysCerts.length} items)</span>
              </h3>
              <p style={{ color: 'var(--text2)', fontSize: '0.9rem', marginTop: '0.5rem', maxWidth: '750px' }}>
                A comprehensive track of specialization courses completed under the Infosys Springboard & Pragati programs, spanning Generative AI, deep learning pipelines, IoT architectures, and professional soft skills.
              </p>
            </div>

            <div className={`infosys-certs-grid ${showAllInfosys ? 'expanded' : 'collapsed'}`}>
              {(showAllInfosys ? sortedInfosysCerts : sortedInfosysCerts.slice(0, 6)).map((cert, index) => (
                <div 
                  key={index} 
                  className="infosys-cert-mini-card glass-panel"
                  onClick={() => setSelectedCert(cert)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="infosys-cert-icon-wrapper">
                    <Award className="infosys-cert-icon" size={18} />
                  </div>
                  <div className="infosys-cert-details">
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '6px' }}>
                      <span className={`infosys-cat-badge cat-${getCertCategory(cert.title)}`}>
                        {getCertCategory(cert.title) === 0 ? 'Featured' : getCertCategory(cert.title) === 1 ? 'Technical' : 'Professional'}
                      </span>
                    </div>
                    <h4 className="infosys-cert-title" title={cert.title}>{cert.title}</h4>
                    <div className="infosys-cert-meta">
                      <span className="infosys-cert-provider">{cert.provider}</span>
                      <span className="infosys-cert-divider">·</span>
                      <span className="infosys-cert-year">{cert.year}</span>
                    </div>
                  </div>
                  <div className="infosys-cert-action">
                    <span className="infosys-cert-view-btn">
                      View PDF
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2.5rem' }}>
              <button 
                onClick={() => setShowAllInfosys(!showAllInfosys)}
                className="btn-secondary"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '0.75rem 1.75rem',
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                {showAllInfosys ? (
                  <>
                    Show Less <ChevronUp size={14} />
                  </>
                ) : (
                  <>
                    Show All {infosysCerts.length} Certificates <ChevronDown size={14} />
                  </>
                )}
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements">
        <div className="section-inner">
          <div className="section-header">
            <div className="section-eyebrow">// 08 — wins</div>
            <h2 className="section-title">Achievements</h2>
          </div>
          <div className="achievements-grid">
            {portfolioData.achievements.map((ach, index) => (
              <div key={index} className="achievement-card glass-panel">
                <div className="achievement-icon">{ach.icon}</div>
                <div className="achievement-details">
                  <strong>{ach.title}</strong>
                  <span>{ach.subtitle}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact">
        <div className="section-inner">
          <div className="section-header">
            <div className="section-eyebrow">// 09 — contact</div>
            <h2 className="section-title">Let's connect</h2>
          </div>
          
          <div className="contact-grid">
            <div>
              <p className="contact-info">
                Open to full-time AI/ML engineering roles, research collaborations, and interesting project conversations. Based in Pune — available on-site or remote.
              </p>
              <div className="contact-links">
                <a href={`mailto:${portfolioData.email}`} className="contact-link glass-panel">
                  <div className="contact-link-icon">
                    <Mail size={18} />
                  </div>
                  <div className="contact-link-info">
                    <span>Email Me</span>
                    <strong>{portfolioData.email}</strong>
                  </div>
                </a>
                <a href={`tel:${portfolioData.phone.replace(/[-]/g, '')}`} className="contact-link glass-panel">
                  <div className="contact-link-icon">
                    <Phone size={18} />
                  </div>
                  <div className="contact-link-info">
                    <span>Call Me</span>
                    <strong>{portfolioData.phone}</strong>
                  </div>
                </a>
                <a href={portfolioData.linkedin} target="_blank" rel="noreferrer" className="contact-link glass-panel">
                  <div className="contact-link-icon">
                    <Linkedin size={18} />
                  </div>
                  <div className="contact-link-info">
                    <span>LinkedIn</span>
                    <strong>linkedin.com/in/rutu-ghatge</strong>
                  </div>
                </a>
                <a href={portfolioData.github} target="_blank" rel="noreferrer" className="contact-link glass-panel">
                  <div className="contact-link-icon">
                    <Github size={18} />
                  </div>
                  <div className="contact-link-info">
                    <span>GitHub</span>
                    <strong>github.com/rutu-ghatge</strong>
                  </div>
                </a>
              </div>
            </div>
            
            <div className="glass-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div className="section-eyebrow" style={{ marginBottom: '0.2rem', display: 'flex', border: 'none', padding: 0 }}>
                // Quick Message
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 600 }}>Send an Instant Ping</h3>
              
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Thanks for reaching out! Since this is a static site, please use email (ghatgerutu@gmail.com) or click one of the social links. You can also chat with the AI assistant below!");
                }}
                style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--purple)', textTransform: 'uppercase' }}>
                    Your Name
                  </label>
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    required
                    style={{
                      background: 'var(--bg4)',
                      border: '1px solid var(--border)',
                      color: 'var(--text)',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      outline: 'none',
                      fontSize: '0.85rem',
                      fontFamily: 'var(--font-body)',
                      transition: 'var(--transition)'
                    }} 
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--purple)', textTransform: 'uppercase' }}>
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    placeholder="john@example.com" 
                    required
                    style={{
                      background: 'var(--bg4)',
                      border: '1px solid var(--border)',
                      color: 'var(--text)',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      outline: 'none',
                      fontSize: '0.85rem',
                      fontFamily: 'var(--font-body)',
                      transition: 'var(--transition)'
                    }} 
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--purple)', textTransform: 'uppercase' }}>
                    Message
                  </label>
                  <textarea 
                    placeholder="Let's build something amazing together..." 
                    rows={4}
                    required
                    style={{
                      background: 'var(--bg4)',
                      border: '1px solid var(--border)',
                      color: 'var(--text)',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      outline: 'none',
                      fontSize: '0.85rem',
                      fontFamily: 'var(--font-body)',
                      transition: 'var(--transition)',
                      resize: 'none'
                    }} 
                  />
                </div>

                <button 
                  type="submit" 
                  style={{
                    background: 'var(--teal)',
                    color: '#000',
                    border: 'none',
                    padding: '0.85rem',
                    borderRadius: '8px',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'var(--transition)',
                    marginTop: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(var(--teal-rgb), 0.15)'
                  }}
                >
                  Send Message <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <span className="footer-copy">© 2025 {portfolioData.name} · Pune, India</span>
        <span className="footer-made">
          Built with <span>🤍</span> &amp; AI
        </span>
      </footer>

      {/* Premium Lightbox Modal for Certificate Previews */}
      {selectedCert && (
        <div className="cert-lightbox" onClick={() => setSelectedCert(null)}>
          <div className="cert-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="cert-lightbox-close" onClick={() => setSelectedCert(null)} aria-label="Close modal">
              &times;
            </button>
            <div className="cert-lightbox-image-wrapper">
              {selectedCert.certImageUrl && selectedCert.certImageUrl.toLowerCase().endsWith('.pdf') ? (
                <iframe 
                  src={selectedCert.certImageUrl} 
                  title={selectedCert.title} 
                  className="cert-pdf-preview-iframe"
                />
              ) : (
                <img src={selectedCert.certImageUrl} alt={selectedCert.title} />
              )}
            </div>
            <div className="cert-lightbox-details">
              <span className={`cert-badge-type provider-${selectedCert.provider.toLowerCase().replace(/\s+/g, '-')}`}>
                {selectedCert.provider}
              </span>
              <h3>{selectedCert.title}</h3>
              <p>Issued in {selectedCert.year} · Verified Professional Credential</p>
              <div className="cert-lightbox-actions">
                {selectedCert.badgeUrl && (
                  <a 
                    href={selectedCert.badgeUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="btn-primary"
                  >
                    View Full Document <ExternalLink size={14} />
                  </a>
                )}
                <button className="btn-secondary" onClick={() => setSelectedCert(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chatbot Interface Component */}
      <Chatbot />
    </div>
  );
}

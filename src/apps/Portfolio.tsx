import React, { useState } from 'react';
import './Portfolio.css';

const Portfolio: React.FC = () => {
    const [activeSection, setActiveSection] = useState('home');

    const renderSidebar = () => (
        <aside className="portfolio-sidebar">
            <div className="sidebar-header">
                <h1>Uday Bhoi</h1>
                <p>Portfolio '25</p>
            </div>
            <nav className="sidebar-nav">
                <button
                    className={activeSection === 'home' ? 'active' : ''}
                    onClick={() => setActiveSection('home')}
                >
                    HOME
                </button>
                <button
                    className={activeSection === 'about' ? 'active' : ''}
                    onClick={() => setActiveSection('about')}
                >
                    {activeSection === 'about' && <span className="active-dot">○ </span>}
                    ABOUT
                </button>
                <button
                    className={activeSection === 'experience' ? 'active' : ''}
                    onClick={() => setActiveSection('experience')}
                >
                    {activeSection === 'experience' && <span className="active-dot">○ </span>}
                    STORY
                </button>
                <button
                    className={activeSection === 'projects' ? 'active' : ''}
                    onClick={() => setActiveSection('projects')}
                >
                    {activeSection === 'projects' && <span className="active-dot">○ </span>}
                    ARSENAL
                </button>
                <button
                    className={activeSection === 'skills' ? 'active' : ''}
                    onClick={() => setActiveSection('skills')}
                >
                    {activeSection === 'skills' && <span className="active-dot">○ </span>}
                    CORE
                </button>
                <button
                    className={activeSection === 'contact' ? 'active' : ''}
                    onClick={() => setActiveSection('contact')}
                >
                    {activeSection === 'contact' && <span className="active-dot">○ </span>}
                    MISSION
                </button>
            </nav>
            <div className="sidebar-footer">
                <p>© 2025 Uday Ravindra Bhoi</p>
            </div>
        </aside>
    );

    const renderHome = () => (
        <div className="home-screen animate-fade">
            <div className="center-content">
                <h1 className="hero-name">Uday Bhoi</h1>
                <p className="hero-role">Full Stack & Data Associate</p>
                <nav className="hero-nav">
                    <button onClick={() => setActiveSection('about')}>ABOUT</button>
                    <button onClick={() => setActiveSection('experience')}>STORY</button>
                    <button onClick={() => setActiveSection('projects')}>ARSENAL</button>
                    <button onClick={() => setActiveSection('contact')}>MISSION</button>
                </nav>
            </div>
        </div>
    );

    const renderAbout = () => (
        <div className="internal-content-wrapper animate-fade">
            <section className="about-page">
                <h1 className="page-main-heading">Namaste</h1>
                <h2 className="sub-greeting">I'm Uday Bhoi</h2>

                <p className="intro-text">
                    I am a passionate Bachelor of Science student in Information Technology at Pillai College (Mumbai University), graduating in 2025.
                </p>
                <p className="intro-text">
                    I specialize in building scalable software solutions and extracting meaningful insights from data. My expertise spans Full-stack Web Development, Data Analysis, and emerging technologies like Generative AI.
                </p>

                <div className="resume-notice">
                    <span className="material-icons">save</span>
                    <div className="notice-text">
                        <strong>Actively seeking opportunities</strong>
                        <p style={{ fontSize: '13px', opacity: 0.7 }}>Data Analyst | Full Stack Engineer | Database Admin</p>
                    </div>
                </div>

                <div className="content-divider"></div>

                <div className="about-me-section">
                    <h3 className="section-sub-title">Interests & Hobbies</h3>
                    <p>
                        Beyond the screen, I am a football enthusiast and a technophile. I love exploring new places, singing, and I am deeply involved in Generative AI research.
                    </p>
                    <div className="photo-placeholder">
                        <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Workplace" />
                    </div>
                </div>
            </section>
        </div>
    );

    const renderExperience = () => (
        <div className="internal-content-wrapper animate-fade">
            <section className="experience-page">
                <h1 className="page-main-heading">Story</h1>
                <p className="section-intro-desc">& Education</p>

                <div className="story-timeline">
                    <div className="timeline-item">
                        <div className="timeline-header">
                            <h3>B.Sc in Information Technology</h3>
                            <span>2022 — 2025</span>
                        </div>
                        <p className="timeline-sub">Pillai College of Arts, Commerce and Science (Mumbai University)</p>
                        <ul className="timeline-meta">
                            <li>Programming & Data Structures</li>
                            <li>Database Systems & Information Security</li>
                            <li>Web Technologies & Operating Systems</li>
                        </ul>
                    </div>

                    <div className="timeline-item">
                        <div className="timeline-header">
                            <h3>Higher Secondary Education (Science)</h3>
                            <span>2020 — 2022</span>
                        </div>
                        <p className="timeline-sub">DY Patil University</p>
                        <p className="timeline-grade">Grade: 70%</p>
                    </div>

                    <div className="content-divider"></div>

                    <div className="timeline-item highlight-box">
                        <div className="timeline-header">
                            <h3>Volunteer Educator</h3>
                            <span>Dec 2022 — Apr 2023</span>
                        </div>
                        <p className="timeline-sub">Nirmal Jeevan Charitable Trust (Kal ki Chhaya)</p>
                        <p className="intro-text" style={{ marginTop: '10px' }}>
                            Conducted daily literacy sessions, organized engagement activities, and mentored underprivileged children. Developed strong leadership and social responsibility during this tenure.
                        </p>
                    </div>
                </div>

                <div className="certifications-section" style={{ marginTop: '40px' }}>
                    <h3 className="section-sub-title">Certifications</h3>
                    <ul className="cert-list">
                        <li>
                            <strong>Career Essentials in Generative AI</strong>
                            <span className="cert-meta">Microsoft & LinkedIn (2025)</span>
                        </li>
                        <li>
                            <strong>Python Programming Certification</strong>
                            <span className="cert-meta">Pillai College (2023)</span>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    );

    const renderProjects = () => (
        <div className="internal-content-wrapper animate-fade">
            <section className="projects-page">
                <h1 className="page-main-heading">Arsenal</h1>
                <p className="section-intro-desc">& Projects</p>

                <div className="project-blocks">
                    <div className="project-block-v2">
                        <div className="block-header">
                            <span className="material-icons">sports_soccer</span>
                            <div className="block-title">
                                <h3>FIFA 2026 Qualification Analysis</h3>
                                <p>Data Analytics • Python • Matplotlib</p>
                            </div>
                        </div>
                        <p className="block-summary">
                            A comprehensive study evaluating India's World Cup chances. Involved extensive data cleaning, EDA, and tactical efficiency visualization using ISL and FIFA rankings.
                        </p>
                    </div>

                    <div className="project-block-v2">
                        <div className="block-header">
                            <span className="material-icons">security</span>
                            <div className="block-title">
                                <h3>Virtual Art Gallery</h3>
                                <p>Full-Stack • JSP • Cryptography</p>
                            </div>
                        </div>
                        <p className="block-summary">
                            Secure web platform featuring SHA-256 hashing, AES encryption, and RSA for transactions. Built with JSP, Bootstrap, and JDBC.
                        </p>
                    </div>

                    <div className="project-block-v2">
                        <div className="block-header">
                            <span className="material-icons">settings_remote</span>
                            <div className="block-title">
                                <h3>NFS Automation System</h3>
                                <p>Linux Admin • Shell Scripting • RHEL</p>
                            </div>
                        </div>
                        <p className="block-summary">
                            Automated Network File Sharing configuration on Linux. Reduced configuration errors and enhanced network productivity through shell-based logic.
                        </p>
                    </div>

                    <div className="project-block-v2">
                        <div className="block-header">
                            <span className="material-icons">receipt_long</span>
                            <div className="block-title">
                                <h3>Supermarket Invoice System</h3>
                                <p>Structured Programming • C</p>
                            </div>
                        </div>
                        <p className="block-summary">
                            CLI-based billing system with user authentication, product handling, and dynamic discount logic.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );

    const renderSkills = () => (
        <div className="internal-content-wrapper animate-fade">
            <section className="skills-page">
                <h1 className="page-main-heading">Core</h1>
                <p className="section-intro-desc">& Competencies</p>

                <div className="skills-grid-v2">
                    <div className="skill-category">
                        <h3>Programming</h3>
                        <div className="skill-tags">
                            <span>Python</span><span>C / C++</span><span>Java</span><span>JavaScript</span>
                        </div>
                    </div>
                    <div className="skill-category">
                        <h3>Web & Database</h3>
                        <div className="skill-tags">
                            <span>HTML/CSS</span><span>JSP</span><span>SQL Plus</span><span>Apache Derby</span><span>MongoDB (Learning)</span>
                        </div>
                    </div>
                    <div className="skill-category">
                        <h3>Analysis & Systems</h3>
                        <div className="skill-tags">
                            <span>Pandas</span><span>Seaborn</span><span>Shell Scripting</span><span>RHEL</span><span>NFS Config</span>
                        </div>
                    </div>
                    <div className="skill-category">
                        <h3>Languages</h3>
                        <div className="skill-tags">
                            <span>English (Professional)</span><span>Hindi (Native)</span><span>Marathi (Fluent)</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );

    const renderContact = () => (
        <div className="internal-content-wrapper animate-fade">
            <section className="contact-page">
                <div className="contact-header-wrap">
                    <h1 className="page-main-heading">Mission</h1>
                    <div className="social-icons">
                        <a href="https://github.com/Uday-Bhoi" target="_blank" rel="noreferrer"><span className="material-icons-outlined">code</span></a>
                        <a href="https://www.linkedin.com/in/uday-bhoi/" target="_blank" rel="noreferrer"><span className="material-icons-outlined">work</span></a>
                    </div>
                </div>

                <p className="contact-status">
                    I am actively seeking impactul roles in Data Analytics and Full-Stack Engineering. If you have an opportunity or just want to chat, feel free to reach out!
                </p>

                <div className="contact-info-grid">
                    <div className="info-item">
                        <span className="label">EMAIL</span>
                        <a href="mailto:udayb512004@gmail.com">udayb512004@gmail.com</a>
                    </div>
                    <div className="info-item">
                        <span className="label">PHONE</span>
                        <p>+91 9137947762</p>
                    </div>
                    <div className="info-item">
                        <span className="label">LOCATION</span>
                        <p>Mumbai Metropolitan Region, India</p>
                    </div>
                </div>

                <form className="contact-form" onSubmit={(e) => e.preventDefault()} style={{ marginTop: '30px' }}>
                    <div className="form-group">
                        <label>* Your name:</label>
                        <input type="text" placeholder="Name" />
                    </div>
                    <div className="form-group">
                        <label>* Email:</label>
                        <input type="email" placeholder="Email" />
                    </div>
                    <div className="form-group">
                        <label>* Message:</label>
                        <textarea placeholder="Message"></textarea>
                    </div>

                    <div className="form-footer">
                        <button className="send-btn">Send Message</button>
                    </div>
                </form>
            </section>
        </div>
    );

    return (
        <div className="portfolio-v2-container">
            {activeSection === 'home' ? renderHome() : (
                <div className="app-layout">
                    {renderSidebar()}
                    <main className="app-main-content">
                        {activeSection === 'about' && renderAbout()}
                        {activeSection === 'experience' && renderExperience()}
                        {activeSection === 'projects' && renderProjects()}
                        {activeSection === 'skills' && renderSkills()}
                        {activeSection === 'contact' && renderContact()}
                    </main>
                </div>
            )}
        </div>
    );
};

export default Portfolio;

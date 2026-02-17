import React, { useState } from 'react';
import './Portfolio.css';

const Portfolio: React.FC = () => {
    const [activeSection, setActiveSection] = useState('home');

    const renderSidebar = () => (
        <aside className="portfolio-sidebar">
            <div className="sidebar-header">
                <h1>Uday Bhoi</h1>
                <p>Portfolio '26</p>
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
                    QUALIFICATIONS
                </button>
                <button
                    className={activeSection === 'projects' ? 'active' : ''}
                    onClick={() => setActiveSection('projects')}
                >
                    {activeSection === 'projects' && <span className="active-dot">○ </span>}
                    PROJECTS
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
                    CONTACT
                </button>
            </nav>
            <div className="sidebar-footer">
                <p>© 2026 Uday Ravindra Bhoi</p>
            </div>
        </aside>
    );

    const renderHome = () => (
        <div className="home-screen animate-fade">
            <div className="center-content">
                <h1 className="hero-name">Uday Bhoi</h1>
                <p className="hero-role">Java & Data Associate</p>
                <nav className="hero-nav">
                    <button onClick={() => setActiveSection('about')}>ABOUT</button>
                    <button onClick={() => setActiveSection('experience')}>QUALIFICATION</button>
                    <button onClick={() => setActiveSection('projects')}>PROJECTS</button>
                    <button onClick={() => setActiveSection('contact')}>CONTACT</button>
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
                    Currently, I am pursuing my Master of Computer Applications (MCA) from the University of Mumbai at Bharati Vidyapeeth College of Information Technology, where I continue to strengthen my expertise in software development and system design.

                </p>
                <p className="intro-text">
                    I completed my Bachelor of Science in Information Technology from Pillai College, consistently maintaining a 9+ CGPA throughout every semester, reflecting my strong academic foundation and commitment to excellence. Prior to that, I pursued my higher secondary education (11th & 12th) in the PCM stream at D.Y. Patil College.
                    Thank you for taking the time to explore my portfolio. I invite you to browse through my work and projects. If you would like to connect or collaborate, feel free to reach out at: uday512004@gmail.com
                </p>

                <div className="resume-notice">
                    <span className="material-icons">description</span>
                    <div className="notice-text">
                        <strong>Looking for my Resume ?</strong>
                        <p style={{ fontSize: '13px', opacity: 0.7 }}>
                            <a href="/Uday_Bhoi_Resume.pdf" download="Uday_Bhoi_Resume.pdf" style={{ color: 'inherit', textDecoration: 'underline', cursor: 'pointer' }}>
                                Click here to download it !
                            </a>
                        </p>
                    </div>
                </div>

                <div className="content-divider"></div>

                <div className="about-me-section">
                    <h3 className="section-sub-title">About Me</h3>
                    <p className="intro-text">
                        From a young age, I have always been curious about how things work. This natural curiosity gradually evolved into a deep interest in technology and problem-solving. During my school years, I became increasingly fascinated with computers and logical thinking, which eventually led me toward programming and software development.
                    </p>
                    <p className="intro-text">
                        I completed my higher secondary education (11th and 12th) in the PCM stream from D.Y. Patil College, where my analytical foundation became stronger. Later, I pursued my Bachelor of Science in Information Technology from Pillai College, consistently maintaining a 9+ CGPA throughout every semester, reflecting my academic dedication and discipline.
                    </p>

                    <div className="photo-placeholder" style={{ marginBottom: '32px' }}>
                        <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Technology and Workscape" />
                    </div>

                    <p className="intro-text">
                        I began programming more seriously during my academic journey, exploring how websites function and how backend systems operate behind the scenes. Over time, I worked on numerous academic and personal projects, focusing on Java-based development, database systems, and application logic. Many of these projects helped me strengthen my understanding of scalable system design and backend architecture, and some of them are showcased in the Projects section of this portfolio.
                    </p>
                    <p className="intro-text">
                        Currently, I am pursuing my Master of Computer Applications (MCA) from the University of Mumbai at Bharati Vidyapeeth College of Information Technology. My focus now is on building robust backend systems, improving performance optimization skills, and deepening my knowledge of database-driven applications.
                    </p>
                </div>

                <div className="hobbies-section" style={{ marginTop: '50px' }}>
                    <h3 className="section-sub-title">My Hobbies</h3>
                    <p className="intro-text">
                        Beyond software development, I have several hobbies that I genuinely enjoy in my free time. As a technophile, I often explore emerging technologies, experiment with new tools, and continuously upgrade my technical skill set. I enjoy working on personal coding experiments, learning advanced backend concepts, and refining my logical problem-solving abilities.
                    </p>
                    <p className="intro-text">
                        Apart from technology, I value maintaining balance in life. I enjoy working out, listening to music, and occasionally gaming to unwind. I strongly believe that growth happens both inside and outside the professional sphere, and I constantly strive to improve myself personally and professionally.
                    </p>

                    <div className="content-divider" style={{ marginTop: '40px' }}></div>

                    <p className="intro-text" style={{ marginTop: '30px' }}>
                        Thank you for taking the time to read about me. I hope you enjoy exploring the rest of my portfolio and everything it has to offer. If you have any questions or would like to connect, feel free to reach out through the contact page or email me at:
                    </p>
                    <p className="intro-text">
                        <a href="mailto:udayb512004@gmail.com" style={{ color: '#6366f1', textDecoration: 'underline' }}>udayb512004@gmail.com</a>
                    </p>
                </div>
            </section>
        </div>
    );

    const renderExperience = () => (
        <div className="internal-content-wrapper animate-fade">
            <section className="experience-page">
                <h1 className="page-main-heading">Educational</h1>
                <p className="section-intro-desc">& Timeline</p>

                <div className="story-timeline">
                    <div className="timeline-item">
                        <div className="timeline-header">
                            <h3>Master of Computer Applications (MCA)</h3>
                            <span>2025 — 2027</span>
                        </div>
                        <p className="timeline-sub">Bharati Vidyapeeth Institute of Management and Information Technology (BVIMIT)</p>
                        <p className="intro-text" style={{ fontSize: '14px', marginTop: '10px' }}>
                            Currently pursuing under the University of Mumbai. Strengthening expertise in software development, backend systems, and database-driven application design.
                        </p>
                    </div>

                    <div className="timeline-item">
                        <div className="timeline-header">
                            <h3>B.Sc in Information Technology</h3>
                            <span>2022 — 2025</span>
                        </div>
                        <p className="timeline-sub">Pillai College of Arts, Commerce and Science (Mumbai University)</p>
                        <p className="intro-text" style={{ fontSize: '14px', marginTop: '10px' }}>
                            Built a strong technical foundation in programming and core computer science concepts, with hands-on experience in C programming and fundamental technologies. Consistently maintained high academic standards.
                        </p>
                    </div>

                    <div className="timeline-item">
                        <div className="timeline-header">
                            <h3>Higher Secondary Education (Science)</h3>
                            <span>2020 — 2022</span>
                        </div>
                        <p className="timeline-sub">D.Y. Patil Junior College (D.Y. Patil University)</p>
                        <p className="intro-text" style={{ fontSize: '14px', marginTop: '10px' }}>
                            Secured 70% in the Science stream. This phase strengthened my analytical and mathematical foundations.
                        </p>
                    </div>

                    <div className="timeline-item">
                        <div className="timeline-header">
                            <h3>Secondary School Education</h3>
                            <span>Class of 2020</span>
                        </div>
                        <p className="timeline-sub">Bharati Vidyapeeth English Medium School</p>
                        <p className="intro-text" style={{ fontSize: '14px', marginTop: '10px' }}>
                            Graduated with an 8.74 CGPA. Actively represented the school at the DSO level in Under-17 Football and Kabaddi, participated in inter-school Cricket, and earned multiple medals in athletics.
                        </p>
                    </div>

                    <div className="content-divider"></div>

                    <div className="timeline-item highlight-box">
                        <div className="timeline-header">
                            <h3>Volunteer Educator</h3>
                            <span>Dec 2022 — Apr 2023</span>
                        </div>
                        <p className="timeline-sub">Nirmal Jeevan Charitable Trust (Kal ki Chhaya)</p>
                        <p className="intro-text" style={{ fontSize: '14px', marginTop: '10px' }}>
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
                    <h1 className="page-main-heading">Contact</h1>
                    <div className="social-icons">
                        <a href="https://github.com/Uday-Bhoi" target="_blank" rel="noreferrer"><span className="material-icons-outlined">code</span></a>
                        <a href="https://www.linkedin.com/in/uday-bhoi/" target="_blank" rel="noreferrer"><span className="material-icons-outlined">work</span></a>
                    </div>
                </div>

                <p className="contact-status">
                    I am always open to exploring new opportunities and meaningful collaborations. If you would like to connect, discuss ideas, or simply have a conversation, feel free to reach out.
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
                        <p>Navi Mumbai, Maharashtra, India</p>
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

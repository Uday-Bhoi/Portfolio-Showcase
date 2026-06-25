import React, { useState, useEffect, useRef } from 'react';
import './Portfolio.css';
import udayPhoto from '../assets/documents/testfinal1.png';
import udayResume from '../assets/documents/Uday ATS CV.pdf';


const Portfolio: React.FC = () => {
    const [activeSection, setActiveSection] = useState('home');
    const scrollContainerRef = useRef<HTMLElement>(null);

    // Fix: Scroll to top whenever tab changes
    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = 0;
        }
    }, [activeSection]);

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
                            <a href={udayResume} target="_blank" rel="noopener noreferrer" download="Uday ATS CV.pdf" style={{ color: 'inherit', textDecoration: 'underline', cursor: 'pointer' }}>
                                Click here to download it !
                            </a>
                        </p>
                    </div>
                </div>

                <div className="content-divider"></div>

                <div className="about-me-section">
                    <h3 className="section-sub-title">About Me</h3>
                    <div className="photo-placeholder uday-portrait">
                        <img src={udayPhoto} alt="Uday Bhoi" />
                    </div>
                    <p className="intro-text">
                        From a young age, I have always been curious about how things work. This natural curiosity gradually evolved into a deep interest in technology and problem-solving. During my school years, I became increasingly fascinated with computers and logical thinking, which eventually led me toward programming and software development.
                    </p>
                    <p className="intro-text">
                        I completed my higher secondary education (11th and 12th) in the PCM stream from D.Y. Patil College, where my analytical foundation became stronger. Later, I pursued my Bachelor of Science in Information Technology from Pillai College, consistently maintaining a 9+ CGPA throughout every semester, reflecting my academic dedication and discipline.
                    </p>

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

    const renderProjects = () => {
        const projectCategories = [
            {
                categoryName: 'Java Development',
                projects: [
                    {
                        title: 'Student Management System',
                        description: 'A Java-based desktop application designed to manage student records, attendance, and academic performance using JDBC and MySQL.',
                        technologies: ['Java', 'JDBC', 'MySQL'],
                        githubUrl: 'https://github.com/Uday-Bhoi/Student-Management-System'
                    },
                    {
                        title: 'Banking Application',
                        description: 'A secure console-based banking application supporting account creation, transaction logs, interest calculations, and secure authentication.',
                        technologies: ['Java', 'OOP', 'File Handling'],
                        githubUrl: 'https://github.com/Uday-Bhoi/Banking-Application'
                    },
                    {
                        title: 'Library Management System',
                        description: 'A comprehensive GUI system for book allocation, membership tracking, inventory auditing, and automatic fine calculation.',
                        technologies: ['Java Swing', 'JDBC', 'PostgreSQL'],
                        githubUrl: 'https://github.com/Uday-Bhoi/Library-Management-System'
                    },
                    {
                        title: 'Inventory Management System',
                        description: 'Real-time stock monitoring application with automated low-stock warnings, vendor management, and transaction logging.',
                        technologies: ['JavaFX', 'SQLite', 'OOP'],
                        githubUrl: 'https://github.com/Uday-Bhoi/Inventory-Management-System'
                    }
                ]
            },
            {
                categoryName: 'Python Development',
                projects: [
                    {
                        title: 'FIFA 2026 Qualification Analysis',
                        description: "A study evaluating India's World Cup qualification chances using exploratory data analysis (EDA), data cleaning, and tactical efficiency visualizations.",
                        technologies: ['Python', 'Pandas', 'Matplotlib', 'Seaborn'],
                        githubUrl: 'https://github.com/Uday-Bhoi/FIFA-2026-Analysis'
                    },
                    {
                        title: 'NFS Automation Script',
                        description: 'Automated shell and Python scripting to quickly configure Network File System mounts and permissions across RedHat Enterprise Linux networks.',
                        technologies: ['Python', 'Shell', 'Linux', 'RHEL'],
                        githubUrl: 'https://github.com/Uday-Bhoi/NFS-Automation'
                    },
                    {
                        title: 'AI Utilities & Web Scrapers',
                        description: 'A suite of automation scripts for content scraping, API data extraction, and machine learning based sentiment parsing.',
                        technologies: ['Python', 'BeautifulSoup', 'Scikit-Learn'],
                        githubUrl: 'https://github.com/Uday-Bhoi/Python-Utilities'
                    }
                ]
            },
            {
                categoryName: 'Web Development',
                projects: [
                    {
                        title: 'Virtual Art Gallery',
                        description: 'Secure online art showcase platform implementing SHA-256 password hashing, AES encryption, and RSA-signed transactions.',
                        technologies: ['JSP', 'JDBC', 'Bootstrap', 'Security'],
                        githubUrl: 'https://github.com/Uday-Bhoi/Virtual-Art-Gallery'
                    },
                    {
                        title: 'macOS Web OS Portfolio',
                        description: 'A highly interactive macOS-inspired desktop portfolio showcase featuring custom app windows, drag-and-drop management, settings configurations, and an Apple Music widget.',
                        technologies: ['React', 'TypeScript', 'Zustand', 'Vite', 'Vanilla CSS'],
                        githubUrl: 'https://github.com/Uday-Bhoi/macos-portfolio',
                        demoUrl: '#'
                    }
                ]
            },
            {
                categoryName: 'Database Projects',
                projects: [
                    {
                        title: 'Relational Database Design',
                        description: 'Designed optimized schema structures up to 3NF/BCNF with complete relational modeling, triggers, stored procedures, and index optimizations.',
                        technologies: ['MySQL', 'PostgreSQL', 'Database Design'],
                        githubUrl: 'https://github.com/Uday-Bhoi/Database-Projects'
                    }
                ]
            },
            {
                categoryName: 'Academic Projects',
                projects: [
                    {
                        title: 'Supermarket Invoice CLI System',
                        description: 'CLI-based transactional billing system with integrated employee accounts, item inventory scanning, and dynamic discount calculations.',
                        technologies: ['C Language', 'Systems', 'CLI'],
                        githubUrl: 'https://github.com/Uday-Bhoi/Supermarket-Billing'
                    },
                    {
                        title: 'Advanced Web Technologies Portal',
                        description: 'Academic full-stack learning management web application built to simulate student registration, courses allocation, and test grading portals.',
                        technologies: ['ASP.NET', 'AWT', 'Java GUI', 'C#'],
                        githubUrl: 'https://github.com/Uday-Bhoi/Academic-Portal'
                    }
                ]
            }
        ];

        return (
            <div className="internal-content-wrapper animate-fade">
                <section className="projects-page">
                    <h1 className="page-main-heading">Project Showcase</h1>
                    <p className="section-intro-desc" style={{ fontSize: '15px', color: '#555', lineHeight: '1.6', marginBottom: '32px' }}>
                        This section showcases projects developed across multiple technologies and domains, including Java, Python, Web Development, Databases, and Software Engineering.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                        {projectCategories.map((category, idx) => (
                            <div key={idx} className="project-category-section">
                                <h2 className="category-title">{category.categoryName}</h2>
                                <div className="project-grid-premium">
                                    {category.projects.map((project, pIdx) => (
                                        <div key={pIdx} className="project-card-premium">
                                            <div className="project-card-header">
                                                <h3 className="project-card-title">{project.title}</h3>
                                                <p className="project-card-desc">{project.description}</p>
                                            </div>
                                            <div className="project-card-footer">
                                                <div className="project-tags-premium">
                                                    {project.technologies.map((tech, tIdx) => (
                                                        <span key={tIdx} className="project-tag-item">{tech}</span>
                                                    ))}
                                                </div>
                                                <div className="project-actions-premium">
                                                    {project.githubUrl && (
                                                        <a 
                                                            href={project.githubUrl} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer" 
                                                            className="project-btn-premium github"
                                                        >
                                                            View Source
                                                        </a>
                                                    )}
                                                    {project.demoUrl && (
                                                        <a 
                                                            href={project.demoUrl} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer" 
                                                            className="project-btn-premium demo"
                                                        >
                                                            Live Demo
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        );
    };

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
                        <a href="https://github.com/Uday-Bhoi" target="_blank" rel="noopener noreferrer" className="social-icon-link">
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                        </a>
                        <a href="https://www.linkedin.com/in/uday-bhoi/" target="_blank" rel="noopener noreferrer" className="social-icon-link">
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                            </svg>
                        </a>
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
                        <label>Company (optional):</label>
                        <input type="text" placeholder="Company" />
                    </div>
                    <div className="form-group">
                        <label>* Message:</label>
                        <textarea placeholder="Message"></textarea>
                    </div>

                    <div className="form-footer">
                        <button className="send-btn">Send Message</button>
                    </div>
                </form>

                <div className="resume-download-section" onClick={() => window.open(udayResume, '_blank')}>
                    <div className="resume-icon-wrapper">
                        <span className="material-icons-outlined pdf-icon">picture_as_pdf</span>
                    </div>
                    <div className="resume-content-wrapper">
                        <h3 className="resume-download-title">Need a copy of my Resume?</h3>
                        <p className="resume-download-cta">Click here to view or download it!</p>
                    </div>
                </div>
            </section>
        </div>
    );

    return (
        <div className="portfolio-v2-container">
            {activeSection === 'home' ? renderHome() : (
                <div className="app-layout">
                    {renderSidebar()}
                    <main className="app-main-content" ref={scrollContainerRef}>
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

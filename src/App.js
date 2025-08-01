import React, { useState, useEffect, useRef } from 'react';
import { images, resumeFile } from './assets';

// ICONS (using SVG for simplicity and performance)
const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

const LinkedInIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
);

const GitHubIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
);

const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
);

const EducationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
        <path d="M6 12v5c0 1.66 4 3 6 3s6-1.34 6-3v-5"></path>
    </svg>
);

const CertificationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
        <path d="M12 21a9 9 0 000-18 9 9 0 000 18z"></path>
        <path d="M9 12l2 2 4-4"></path>
    </svg>
);

const CodeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
);

const WrenchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
);

const DatabaseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
);

const CubeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
);

const GitHubLinkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
);

const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
);

const PhoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
);

const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
);

const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);

const ArrowUpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
);

// Futuristic 3D Starfield Background
const FuturisticBackground = ({ isDarkMode }) => {
    const canvasRef = useRef(null);
    const mouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let stars = [];
        const numStars = window.innerWidth < 768 ? 400 : 800;
        let speed = 3;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = document.documentElement.scrollHeight;
            init();
        };

        const handleMouseMove = (event) => {
            mouse.current.x = event.clientX - canvas.width / 2;
            mouse.current.y = event.clientY - canvas.height / 2;
        };
        
        const handleClick = () => {
            speed = speed === 3 ? 15 : 3;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('click', handleClick);

        class Star {
            constructor() {
                this.x = Math.random() * canvas.width - canvas.width / 2;
                this.y = Math.random() * canvas.height - canvas.height / 2;
                this.z = Math.random() * canvas.width;
                this.pz = this.z;
            }

            update() {
                this.z -= speed;
                if (this.z < 1) {
                    this.z = canvas.width;
                    this.x = Math.random() * canvas.width - canvas.width / 2;
                    this.y = Math.random() * canvas.height - canvas.height / 2;
                    this.pz = this.z;
                }
            }

            draw() {
                const sx = (this.x / this.z) * canvas.width / 2;
                const sy = (this.y / this.z) * canvas.height / 2;
                const r = Math.max(0.1, (1 - this.z / canvas.width) * 5);
                const psx = (this.x / this.pz) * canvas.width / 2;
                const psy = (this.y / this.pz) * canvas.height / 2;

                ctx.beginPath();
                ctx.moveTo(psx, psy);
                ctx.lineTo(sx, sy);
                ctx.lineWidth = r;
                ctx.strokeStyle = isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(55, 65, 81, 0.7)';
                ctx.stroke();
                this.pz = this.z;
            }
        }

        const init = () => {
            stars = [];
            for (let i = 0; i < numStars; i++) {
                stars.push(new Star());
            }
        };

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            ctx.fillStyle = isDarkMode ? 'rgba(10, 10, 25, 0.9)' : 'rgba(229, 231, 235, 0.9)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.save();
            ctx.translate(canvas.width / 2 - mouse.current.x * 0.1, canvas.height / 2 - mouse.current.y * 0.1);
            stars.forEach(star => {
                star.update();
                star.draw();
            });
            ctx.restore();
        };
        
        resizeCanvas();
        animate();

        window.addEventListener('resize', resizeCanvas);
        
        return () => {
            window.cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('click', handleClick);
        };

    }, [isDarkMode]);

    return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0" />;
};


// Resume Modal Component
const ResumeModal = ({ onClose, resumePdfUrl }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50" onClick={onClose}>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl w-11/12 md:w-3/4 lg:w-1/2 max-w-4xl h-5/6 flex flex-col p-4" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center pb-3 border-b dark:border-gray-700">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">My Resume</h3>
                    <div className="flex items-center gap-2">
                        <a href={resumePdfUrl} download="VIVEK_MD_Resume.pdf" className="flex items-center gap-1.5 bg-blue-600 text-white font-bold py-1.5 px-3 rounded-md hover:bg-blue-700 transition-colors duration-300 text-sm"><DownloadIcon />Download</a>
                        <button onClick={onClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </button>
                    </div>
                </div>
                <div className="flex-grow mt-4">
                    <iframe src={resumePdfUrl} className="w-full h-full border-0 rounded-md" title="VIVEK M D Resume">Your browser does not support PDFs. Please download the PDF to view it.</iframe>
                </div>
            </div>
        </div>
    );
};

// Typing Animation Component
const TypingAnimation = ({ roles }) => {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);

    useEffect(() => {
        const handleTyping = () => {
            const i = loopNum % roles.length;
            const fullText = roles[i];
            setText(isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1));
            setTypingSpeed(isDeleting ? 30 : 150);
            if (!isDeleting && text === fullText) {
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && text === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
            }
        };
        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [text, isDeleting, typingSpeed, loopNum, roles]);

    return <span className="border-r-2 border-blue-500 pr-1">{text}</span>;
};


// Main App Component
function App() {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window !== 'undefined') return localStorage.getItem('theme') === 'dark';
        return false;
    });
    const [isResumeOpen, setIsResumeOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const contactSectionRef = useRef(null);
    const [isContactVisible, setIsContactVisible] = useState(false);

    const resumePdfUrl = resumeFile;

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDarkMode);
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const navLinks = [
        { title: 'Home', id: 'home' }, { title: 'About', id: 'about' },
        { title: 'Skills', id: 'skills' }, { title: 'Projects', id: 'projects' },
        { title: 'Contact', id: 'contact' },
    ];
    
    useEffect(() => {
        const handleScroll = () => {
            const sections = navLinks.map(link => document.getElementById(link.id));
            const scrollPosition = window.scrollY + window.innerHeight / 2;
            for (const section of sections) {
                if (section && scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
                    setActiveSection(section.id);
                    break;
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) setIsContactVisible(true);
        }, { threshold: 0.3 });
        if (contactSectionRef.current) observer.observe(contactSectionRef.current);
        return () => { if (contactSectionRef.current) observer.unobserve(contactSectionRef.current); };
    }, []);

    const toggleTheme = () => setIsDarkMode(!isDarkMode);
    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
    };

    const personalInfo = {
        name: "VIVEK M D",
        roles: ["Full-Stack Developer", "AI Enthusiast", "Creative Problem Solver"],
        intro: "Creative and detail-oriented Computer Science student with hands-on experience in building full-scale applications. Proficient in modern frameworks with a strong focus on intuitive UI/UX design. A collaborative team player eager to contribute to innovative organizations.",
        linkedin: "https://www.linkedin.com/in/vivek-md-0b655a24b/",
        github: "https://github.com/vivekmd9551",
        email: "vivekmd9551@gmail.com",
        phone: "7619576597",
        profilePic: images.profile
    };

    const educationData = [
        { degree: "Bachelor of Engineering in Computer Science", school: "Ghousia College of Engineering", score: "CGPA: 8.76/10", year: "2025" },
        { degree: "Pre-University Course (PUC)", school: "Shanthiniketan PU College", score: "Percentage: 77.83%", year: "2021" },
        { degree: "CBSE - Secondary School (Class 10)", school: "Shanthiniketan Public School", score: "Percentage: 74.2%", year: "2019" },
    ];

    const certificationStrings = [
        "Full Stack Application Design and Development Internship - Varcons Technologies, 2025",
        "The Complete 2024 Web Development Bootcamp - Udemy, 2024",
        "Career Essentials in Generative Al - Microsoft & LinkedIn Learning, 2024",
        "Machine Learning Training - Take It Smart Pvt. Ltd, 2023",
        "Full Stack Development Program - Innovaskill Technologies Pvt. Ltd, 2023",
    ];
    
    const parsedCertifications = certificationStrings.map(certString => {
        const parts = certString.split(' - ');
        const title = parts[0];
        const rest = parts[1];
        const lastCommaIndex = rest.lastIndexOf(',');
        const from = rest.substring(0, lastCommaIndex);
        const year = rest.substring(lastCommaIndex + 2);
        return { title, from, year, type: 'certification' };
    });

    const journeyItems = [...educationData.map(item => ({...item, type: 'education'})), ...parsedCertifications].sort((a, b) => b.year - a.year);

    const skillsData = [
        { category: "Programming & Web", icon: <CodeIcon />, skills: ["JavaScript", "React", "Node.js", "Python", "Java", "C", "HTML", "CSS"] },
        { category: "Automation & Tools", icon: <WrenchIcon />, skills: ["n8n", "REST APIs", "Web Scraping", "Git", "MS Office"] },
        { category: "Databases & Frameworks", icon: <DatabaseIcon />, skills: ["PostgreSQL", "Django", "PHP"] },
        { category: "3D & Game Dev", icon: <CubeIcon />, skills: ["Blender", "Maya", "Unreal Engine"] }
    ];

const projects = [
    { 
        title: "Smart Surveillance System", 
        tech: "YOLOv5, Python, OpenCV", 
        desc: "Real-time object detection with alarm triggers for restricted zones.",
        image: images.surveillance, // Changed from placeholder
        githubLink: "https://github.com/vivekmd9551" 
    },
    { 
        title: "Leave & Absence Management", 
        tech: "React, Node.js, PostgreSQL", 
        desc: "Full-stack app with role-based login and automated leave tracking.",
        image: images.leave, // Changed from placeholder
        githubLink: "https://github.com/vivekmd9551"
    },
    { 
        title: "Traffic Sign Detection", 
        tech: "CNN, Python, OpenCV", 
        desc: "Classified traffic signs from images using deep learning.",
        image: images.traffic, // Changed from placeholder
        githubLink: "https://github.com/vivekmd9551"
    },
    { 
        title: "Disaster Awareness Portal", 
        tech: "Django, SQLite", 
        desc: "Web platform for alerts and safety event info.",
        image: images.disaster, // Changed from placeholder
        githubLink: "https://github.com/vivekmd9551"
    },
    { 
        title: "Zoo Management System", 
        tech: "PHP, MySQL", 
        desc: "Website for zoo data and ticket operations.",
        image: images.zoo, // Changed from placeholder
        githubLink: "https://github.com/vivekmd9551"
    },
];
    return (
        <div className="relative">
            <FuturisticBackground isDarkMode={isDarkMode} />
            <div className="relative z-10">
                <nav className="fixed top-0 left-0 right-0 z-40 bg-white/10 dark:bg-gray-900/10 backdrop-blur-xl shadow-lg shadow-blue-500/10 dark:shadow-blue-400/5">
                    <div className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
                        <div className="text-2xl font-bold text-gray-800 dark:text-white tracking-widest" style={{textShadow: '0 0 10px rgba(59, 130, 246, 0.5)'}}>{personalInfo.name}</div>
                        <div className="hidden md:flex space-x-6 items-center">
                            {navLinks.map(link => (
                                <button key={link.id} onClick={() => scrollToSection(link.id)} className={`relative transform -skew-x-12 text-sm font-semibold transition-all duration-300 border-2 border-transparent ${activeSection === link.id ? 'bg-blue-500 dark:bg-blue-600 shadow-lg shadow-blue-500/50' : 'bg-gray-200/30 dark:bg-gray-700/30 hover:bg-blue-500/10 dark:hover:bg-blue-600/20 hover:border-blue-400/50'}`}>
                                    <span className={`block transform skew-x-12 px-5 py-2 ${activeSection === link.id ? 'text-white' : 'text-gray-800 dark:text-gray-200'}`}>{link.title}</span>
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center">
                            <div className="hidden md:block">
                                <button onClick={toggleTheme} className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-black/20 focus:outline-none transition-all duration-300">
                                    <div className="relative w-6 h-6">
                                        <span className={`absolute inset-0 flex items-center justify-center transition-all duration-500 transform ${isDarkMode ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`}><SunIcon /></span>
                                        <span className={`absolute inset-0 flex items-center justify-center transition-all duration-500 transform ${isDarkMode ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`}><MoonIcon /></span>
                                    </div>
                                </button>
                            </div>
                            <div className="md:hidden">
                                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md text-gray-800 dark:text-gray-200"><MenuIcon /></button>
                            </div>
                        </div>
                    </div>
                    {isMenuOpen && (
                        <div className="md:hidden bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg">
                            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                {navLinks.map(link => (<button key={link.id} onClick={() => scrollToSection(link.id)} className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${activeSection === link.id ? 'bg-blue-500 text-white' : 'text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>{link.title}</button>))}
                                <div className="border-t border-gray-300 dark:border-gray-700 pt-4 mt-4 flex justify-center">
                                    <button onClick={toggleTheme} className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-black/20 focus:outline-none transition-all duration-300">
                                        <div className="relative w-6 h-6 flex items-center gap-2"><SunIcon /> / <MoonIcon /></div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </nav>

                <main className="container mx-auto px-6">
                    <section id="home" className="min-h-screen flex items-center py-16">
                        <div className="grid md:grid-cols-2 gap-12 items-center w-full">
                            <div className="md:order-2 flex justify-center items-center">
                                <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-2xl opacity-50 animate-pulse"></div>
                                    <img src={personalInfo.profilePic} alt="Vivek M D" className="relative w-full h-full object-cover rounded-full shadow-2xl border-4 border-white dark:border-gray-800" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/400x400/1f2937/ffffff?text=VM'; }}/>
                                </div>
                            </div>
                            <div className="md:order-1 space-y-4 text-center md:text-left">
                                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-gray-900 dark:text-gray-100">Hi, I'm <span className="text-blue-600 dark:text-blue-400">{personalInfo.name}</span></h1>
                                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700 dark:text-gray-300 h-10"><TypingAnimation roles={personalInfo.roles} /></h2>
                                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto md:mx-0">{personalInfo.intro}</p>
                                <div className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start">
                                    <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transform hover:-translate-y-1 transition-all duration-300 shadow-lg"><LinkedInIcon className="text-white"/> LinkedIn</a>
                                    <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-gray-800 text-white font-bold py-3 px-6 rounded-lg hover:bg-black transform hover:-translate-y-1 transition-all duration-300 shadow-lg"><GitHubIcon className="text-white"/> GitHub</a>
                                    <button onClick={() => setIsResumeOpen(true)} className="bg-transparent border-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 font-bold py-3 px-6 rounded-lg hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 dark:hover:text-gray-900 transform hover:-translate-y-1 transition-all duration-300 shadow-lg">View Resume</button>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="about" className="py-20">
                        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-gray-100">My Journey</h2>
                        <div className="relative container mx-auto px-6">
                            <div className="absolute left-4 md:left-1/2 h-full w-1 bg-blue-200 dark:bg-gray-700 transform md:-translate-x-1/2"></div>
                            {journeyItems.map((item, index) => (
                                <div key={index} className="relative mb-12 pl-12 md:pl-0">
                                    <div className={`md:flex ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} items-center w-full`}>
                                        <div className="md:w-5/12">
                                            <div className={`p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg border-l-4 md:border-l-0 ${index % 2 === 0 ? 'md:border-r-4' : 'md:border-l-4'} ${item.type === 'education' ? 'border-blue-500' : 'border-green-500'} transform hover:scale-105 transition-transform duration-300`}>
                                                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">{item.year}</p>
                                                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">{item.title || item.degree}</h3>
                                                <p className="text-md text-gray-700 dark:text-gray-300 font-medium">{item.from || item.school}</p>
                                                {item.score && <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{item.score}</p>}
                                            </div>
                                        </div>
                                        <div className="hidden md:block md:w-2/12"></div>
                                    </div>
                                    <div className={`absolute top-1/2 -translate-y-1/2 left-4 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center ${item.type === 'education' ? 'bg-blue-500' : 'bg-green-500'} shadow-md`}>
                                        {item.type === 'education' ? <EducationIcon /> : <CertificationIcon />}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section id="skills" className="py-20 bg-gray-200/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl">
                        <h2 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-gray-100">My Toolbox</h2>
                        <p className="text-center text-lg text-gray-600 dark:text-gray-400 mb-16">The technologies and tools I use to bring ideas to life.</p>
                        <div className="max-w-4xl mx-auto space-y-12">
                            {skillsData.map((skillGroup, index) => (
                                <div key={index}>
                                    <div className="flex items-center gap-4 mb-6">
                                        <span className="text-blue-600 dark:text-blue-400">{skillGroup.icon}</span>
                                        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{skillGroup.category}</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        {skillGroup.skills.map((skill, skillIndex) => (
                                            <span key={skillIndex} className="bg-blue-100 text-blue-800 dark:bg-gray-700 dark:text-blue-300 text-base font-medium px-4 py-2 rounded-full shadow-sm hover:bg-blue-200 dark:hover:bg-gray-600 transform hover:scale-105 transition-all duration-300 cursor-default">{skill}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section id="projects" className="py-20">
                        <h2 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-gray-100">Featured Projects</h2>
                         <p className="text-center text-lg text-gray-600 dark:text-gray-400 mb-16">A selection of projects I'm proud of.</p>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {projects.map((project, index) => (
                                <div key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 group flex flex-col">
                                    <div className="overflow-hidden">
                                        <img src={project.image} alt={project.title} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/1f2937/ffffff?text=Project'; }}/>
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">{project.title}</h3>
                                        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-3">{project.tech}</p>
                                        <p className="text-gray-600 dark:text-gray-400 flex-grow">{project.desc}</p>
                                         <div className="mt-6">
                                            <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 w-full justify-center bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"><GitHubLinkIcon /> View Source</a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section id="contact" ref={contactSectionRef} className={`py-20 transition-opacity duration-1000 ${isContactVisible ? 'opacity-100' : 'opacity-0'}`}>
                        <h2 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-gray-100">Let's Connect</h2>
                        <p className="text-center text-lg text-gray-600 dark:text-gray-400 mb-16">Have a project in mind or just want to say hi? Feel free to reach out.</p>
                        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl">
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Send me a message</h3>
                                <form action="#" method="POST" onSubmit={(e) => e.preventDefault()}>
                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Your Name</label>
                                            <input type="text" name="name" id="name" required className="mt-1 block w-full px-3 py-2 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Your Email</label>
                                            <input type="email" name="email" id="email" required className="mt-1 block w-full px-3 py-2 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                                        </div>
                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                                            <textarea id="message" name="message" rows="4" required className="mt-1 block w-full px-3 py-2 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
                                        </div>
                                        <div>
                                            <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Send Message</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Contact Information</h3>
                                 <div className="space-y-4">
                                    <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors">
                                        <span className="text-blue-500"><MailIcon/></span>
                                        <div>
                                            <p className="font-semibold text-lg text-gray-900 dark:text-gray-100">{personalInfo.email}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Email me anytime</p>
                                        </div>
                                    </a>
                                    <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors">
                                        <span className="text-blue-500"><PhoneIcon/></span>
                                        <div>
                                            <p className="font-semibold text-lg text-gray-900 dark:text-gray-100">{personalInfo.phone}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Call me during business hours</p>
                                        </div>
                                    </div>
                                 </div>
                                 <div className="pt-4 border-t dark:border-gray-700">
                                    <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Find me on Social Media</h4>
                                    <div className="flex gap-4">
                                        <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-200 dark:bg-gray-600 rounded-full text-gray-800 dark:text-gray-200 hover:bg-blue-600 hover:text-white transition-all duration-300"><LinkedInIcon /></a>
                                        <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-200 dark:bg-gray-600 rounded-full text-gray-800 dark:text-gray-200 hover:bg-gray-800 hover:text-white transition-all duration-300"><GitHubIcon /></a>
                                    </div>
                                 </div>
                            </div>
                        </div>
                    </section>
                </main>

                <footer className="bg-white/10 dark:bg-gray-900/10 backdrop-blur-sm mt-12 text-gray-800 dark:text-gray-200">
                    <div className="container mx-auto py-8 px-6">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                             <div className="text-center md:text-left">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{personalInfo.name}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Creative Full-Stack Developer</p>
                            </div>
                            <div className="flex gap-6">
                                {navLinks.map(link => (
                                    <button key={link.id} onClick={() => scrollToSection(link.id)} className="font-semibold hover:text-blue-500 transition-colors text-gray-800 dark:text-gray-200">{link.title}</button>
                                ))}
                            </div>
                             <div className="flex gap-4">
                                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"><LinkedInIcon /></a>
                                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"><GitHubIcon /></a>
                            </div>
                        </div>
                        <div className="mt-8 border-t border-gray-300/50 dark:border-gray-700/50 pt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                            <p>&copy; {new Date().getFullYear()} {personalInfo.name}. All Rights Reserved.</p>
                            <button onClick={() => scrollToSection('home')} className="inline-flex items-center gap-2 hover:text-blue-500 transition-colors">Back to Top <ArrowUpIcon/></button>
                        </div>
                    </div>
                </footer>

            </div>
            {isResumeOpen && <ResumeModal onClose={() => setIsResumeOpen(false)} resumePdfUrl={resumePdfUrl} />}
        </div>
    );
}

export default App;

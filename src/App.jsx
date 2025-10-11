import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './App.css';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import CursorGlow from "./components/CursorGlow";
import InteractiveFish from './components/InteractiveFish';

// --- Animated Bubble Component ---
const Star = ({ size, x, y, delay }) => (
  <motion.div
    className="bubble" /* Changed class name */
    initial={{ opacity: 0, scale: 0, y: 0 }}
    // Bubbles typically rise, so we animate 'y' from bottom to top, then loop
    animate={{
      opacity: [0, 0.8, 0.8, 0], // Fades in, stays, then fades out
      scale: [0.5, 1, 1, 0.8],   // Grows then shrinks slightly
      y: [window.innerHeight, -50], // Starts at bottom, rises above screen
    }}
    transition={{
      duration: size * 0.8 + 10, // Duration based on size for varied speeds
      repeat: Infinity,
      delay: delay,
      ease: "linear", // Consistent rising speed
    }}
    style={{
      width: size,
      height: size,
      left: x,
      position: 'fixed',
      background: 'rgba(255, 255, 255, 0.3)', // Semi-transparent white
      borderRadius: '50%',
      boxShadow: 'inset 0 0 5px rgba(255, 255, 255, 0.6), 0 0 8px rgba(0, 234, 255, 0.3)', // Inner and outer glow
      zIndex: -1, // Keep it in the background
    }}
  />
);

// --- Reusable Animated Section Component ---
const AnimatedSection = ({ children, id, className = "" }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.section
      id={id}
      ref={ref}
      className={`section ${className}`}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
        hidden: { opacity: 0, y: 50 },
      }}
    >
      {children}
    </motion.section>
  );
};


// --- Main App Component ---
function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const navLinks = [
    { id: 'home', title: 'Home' },
    { id: 'about', title: 'About' },
    { id: 'skills', title: 'Skills' },
    { id: 'projects', title: 'Projects' },
    { id: 'contact', title: 'Contact' },
  ];
  
  // --- Your Portfolio Data ---
  const skillsData = {
    "Technical Skills": { 
      list: [
        { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
        { name: "Express", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
        { name: "React Native", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { name: "Kotlin", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
        { name: "Firebase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
        { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
        { name: "DSA", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
      ]
    },
    "Tools & Platforms": { 
      list: [
        { name: "Git & GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
        { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
        { name: "VS Code", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
        { name: "Postman", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
        { name: "Tailwind CSS", logo: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" },
        { name: "Chart.js", logo: "https://www.chartjs.org/media/logo-title.svg" },
      ]
    },
    "Creative Skills": { 
      list: [
        { name: "Digital Art", logo: "https://cdn-icons-png.flaticon.com/512/2921/2921222.png" },
        { name: "UI/UX Design", logo: "https://cdn-icons-png.flaticon.com/512/1829/1829586.png" },
        { name: "Concept Art", logo: "https://cdn-icons-png.flaticon.com/512/1087/1087840.png" },
        { name: "Interaction Design", logo: "https://cdn-icons-png.flaticon.com/512/3214/3214746.png" },
      ]
    },
};


const projectsData = [
  {
    title: "HerShield",
    tagline: "One-click SOS alerts to verified users nearby.",
    description:
      "A women safety app that instantly alerts all verified users nearby during emergencies. With real-time location tracking, SOS broadcasting, and volunteer coordination, HerShield ensures quick help when it matters most.",
    image: "public/hershield.png",
    tech: ["React Native", "Socket.io", "Leaflet", "Node.js"],
    links: { github: "https://github.com/niteshcipher/HerShield", live: "#" },
  },
  {
    title: "Questify",
    tagline: "Track goals with gamified progress and AI suggestions.",
    description:
      "Questify transforms personal growth into an adventure. It generates smart roadmaps, tracks your progress, and gamifies your journey with points, badges, and AI-based learning suggestions.",
    image: "/public/questify.png",
    tech: ["React", "Node.js", "Express", "MongoDB", "AI"],
    links: { github: "https://github.com/niteshcipher/techberg", live: "https://frostpro-1.onrender.com/" },
  },
  {
    title: "AerisAI",
    tagline: "Your personal voice-controlled AI assistant.",
    description:
      "AerisAI automates your digital life. It opens apps, writes emails, answers questions, and performs system tasks—all through natural voice commands and smart context understanding.",
    image: "/public/aerisai.png",
    tech: ["Python", "Electron","Hugging Face ","Speech Recognition", "OpenAI API"],
    links: { github: "https://github.com/niteshcipher/Aeris-Ai" },
  },
  {
    title: "Iztend",
    tagline: "Full-stack eCommerce website with secure payments.",
    description:
      "Iztend is a MERN-based full-stack eCommerce platform offering product browsing, cart management, and Stripe-powered payment gateway for a smooth shopping experience.",
    image: "/public/iztend.png",
    tech: ["React", "Node.js", "MongoDB", "Stripe API"],
    links: { github: "https://github.com/RajanPatel0/E-Comm", live: "#" },
  },
  {
    title: "Pixel Prism",
    tagline: "A minimal 3D cube runner built with Three.js.",
    description:
      "Pixel Prism is a fun and minimalistic cube runner game using Three.js and WebGL, showcasing creative 3D rendering and web animation techniques.",
    image: "/public/pixelprism.png",
    tech: ["Three.js", "JavaScript", "WebGL"],
    links: { github: "https://github.com/niteshcipher/pixel-prism", live: "https://pixel-prism.onrender.com" },
  },
];



  // --- Utility Functions & Hooks ---
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
    }, { rootMargin: "-50% 0px -50% 0px" });
    navLinks.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el) sectionObserver.observe(el);
    });
    return () => sectionObserver.disconnect();
  }, []);

  const stars = Array.from({ length: 40 }).map((_, i) => ({ // Fewer bubbles than stars for a clearer effect
    id: i,
    size: Math.random() * 10 + 5, // Size from 5px to 15px
    x: `${Math.random() * 100}%`, // Random horizontal position
    delay: Math.random() * 15, // Longer delay range for staggered start
  }));

  const allFish = [
    { id: 1, size: 200, duration: 45, delay: 0 },    // The main, large fish
    { id: 2, size: 150,  duration: 50, delay: 5.5 },  // A smaller, slower fish
    { id: 3, size: 110, duration: 38, delay: 8.2 },  // A medium, faster fish
    { id: 4, size: 70,  duration: 60, delay: 12.1 },// A very small, slow fish
  ];

  // --- Render ---
  return (
    <div className="app-container">
      <CursorGlow />
      {allFish.map(fish => (
        <InteractiveFish
          key={fish.id}
          size={fish.size}
          duration={fish.duration}
          delay={fish.delay}
        />
       ))}
      <div className="star-background">
        {stars.map(star => <Star key={star.id} {...star} />)}
      </div>

      <motion.nav 
        className={`navigation ${activeSection !== 'home' ? 'scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        
        <motion.div 
          className="nav-logo"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          whileHover={{ textShadow: "0 0 10px var(--primary-color)" }}
          
        >
         Nitesh Kumar
        </motion.div>

        <button 
          className={`hamburger ${isMenuOpen ? 'open' : ''}`} 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          aria-controls="nav-links-list"
        >
          <span></span><span></span><span></span>
        </button>

        <ul id="nav-links-list" className={isMenuOpen ? 'open' : ''}>
          {navLinks.map(link => (
            <motion.li key={link.id} whileHover={{ scale: 1.1 }}>
              <a 
                href={`#${link.id}`} 
                onClick={e => { 
                  e.preventDefault(); 
                  scrollToSection(link.id); 
                  setIsMenuOpen(false); // ✨ Close menu on link click
               }}
                className={activeSection === link.id ? 'active' : ''}
              >
                {link.title}
              </a>
            </motion.li>
         ))}
         <motion.div layoutId="activeLink" className="nav-active-glow" />
        </ul>
     </motion.nav>



{/* --- NEW HERO SECTION --- */}
      <section id="home" className="section hero">
        <div className="hero-content">
            <motion.p
                className="hero-greeting"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                Namaste(); I'm
            </motion.p>
            <motion.h1
                className="hero-name"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                <span>Nitesh kumar.</span>
            </motion.h1>
            <motion.h2
                className="hero-headline"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
            >
                Your Go-To MERN Stack Enthusiast
            </motion.h2>
            <motion.p
                className="hero-description"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
            >
                I'm a passionate MERN Stack Developer and 2nd-year CSE student, dedicated to building user-friendly web applications and solving real-world problems through technology. I thrive on innovation, continuous learning, and creating meaningful digital experiences.
            </motion.p>
            <motion.div
                className="hero-cta-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
            >
                <button
                  className="hero-button"
                  onClick={() => {
                    document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
                   }}
                >
                 View Projects
                </button>
                {/* For icons, I recommend using a library like react-icons */}

            </motion.div>
        </div>
        
        
      </section>

      <AnimatedSection id="about">
         <div className="about-container">
           <motion.div
             className="about-image"
             initial={{ opacity: 0, scale: 0.8 }}
             whileInView={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1, ease: "easeOut" }}
             viewport={{ once: true }}
           >
             <img src="vjh.png" alt="About Me" />
           </motion.div>

           <motion.div
             className="about-text"
             initial={{ opacity: 0, x: 80 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8, ease: "easeOut" }}
             viewport={{ once: true }}
           >
             <h2 className="section-title">A Brief Intro</h2>
             <p>
               I’m a developer obsessed with innovation someone who sees technology not just as a tool,
               but as a medium for creativity. My work revolves around building intelligent, adaptive, and
               aesthetically designed digital systems. Whether it’s integrating AI into real world
               applications or engineering complex front-end ecosystems, I’m constantly exploring how to
               make technology feel more human. Every project I build is a step toward redefining how people
               interact with the digital world.
             </p>
           </motion.div>
         </div>
      </AnimatedSection>


      
      <AnimatedSection id="skills">
        <h2 className="section-title">My Toolkit</h2>
        <div className="skills-container">
          {Object.entries(skillsData).map(([category, data]) => (
            <motion.div 
              key={category} 
              className="skill-category" 
              whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(147,51,234,0.3)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="skill-header">
                <h3>{category}</h3>
              </div>
              <div className="skill-logos">
                {data.list.map(({ name, logo }) => (
                  <motion.div 
                    key={name} 
                    className="skill-item"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <img src={logo} alt={name} title={name} />
                    <p>{name}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>


   <section id="projects" className="projects-section">
      <h2 className="section-title">Featured Projects</h2>

      <div className="projects-container">
        {projectsData.map((project, index) => (
          <motion.div
            key={index}
            className={`project-item ${index % 2 === 0 ? "normal" : "reverse"}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="project-text">
              <h4 className="project-number">PROJECT {index + 1}</h4>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.description}</p>

              <div className="tech-list">
                {project.tech.map((tech) => (
                  <span key={tech} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="project-links">
                {project.links.github && (
                  <a href={project.links.github} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                )}
                {project.links.live && (
                  <a href={project.links.live} target="_blank" rel="noreferrer">
                    Live Demo
                  </a>
                )}
              </div>
            </div>

            <motion.div
              className="project-image-container"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="project-image-border"></div>
              <img
                src={project.image}
                alt={project.title}
                className="project-image"
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>


      <AnimatedSection id="contact">
        <h2 className="section-title">Let's Connect</h2>
        <p>I'm always open to discussing new projects, creative ideas, or opportunities to be part of an ambitious vision. </p>
        <div className="contact-buttons">
            <motion.a href="mailto:nitesh13122004@gmail.com" className="contact-main-button" whileHover={{ scale: 1.05 }}>Collaborate</motion.a>
        </div>
         <div className="social-links">
          <motion.a
            href="https://www.linkedin.com/in/nitesh-kumar-203a85274/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
            aria-label="LinkedIn Profile"
          >
            <FaLinkedin />
          </motion.a>
          <motion.a
            href="https://github.com/niteshcipher"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
            aria-label="GitHub Profile"
          >
            <FaGithub />
          </motion.a>
          <motion.a
            href="https://www.instagram.com/verseofnitesh?igsh=bjRneDlyYTQ5ZXNt"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
            aria-label="Instagram Profile"
          >
            <FaInstagram />
          </motion.a>
        </div>
      </AnimatedSection>

      <footer className="footer">
        <p>&copy; 2025 Nitesh Kumar | Designed & Built with passion.</p>
      </footer>
    </div>
  );
}

export default App;

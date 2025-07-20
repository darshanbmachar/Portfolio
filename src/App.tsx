import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Download, 
  ExternalLink, 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  Sun, 
  Moon, 
  ArrowUp,
  Code,
  Database,
  Cloud,
  Briefcase,
  Award,
  User,
  FolderOpen,
  Send,
  CheckCircle,
  Palette,
  Server,
  Layers,
  Globe,
  Zap
} from 'lucide-react';

function App() {
  const [currentTheme, setCurrentTheme] = useState('blue');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const themes = {
    blue: {
      name: 'Ocean Blue',
      primary: 'from-blue-400 to-purple-600',
      secondary: 'from-cyan-400 to-blue-600',
      accent: 'from-purple-400 to-pink-600',
      hero: 'from-blue-50 via-purple-50 to-pink-50',
      about: 'from-cyan-50 via-blue-50 to-indigo-50',
      skills: 'from-indigo-50 via-purple-50 to-pink-50',
      projects: 'from-purple-50 via-pink-50 to-rose-50',
      experience: 'from-blue-50 via-cyan-50 to-teal-50',
      contact: 'from-indigo-50 via-purple-50 to-pink-50'
    },
    green: {
      name: 'Nature Green',
      primary: 'from-green-400 to-emerald-600',
      secondary: 'from-emerald-400 to-teal-600',
      accent: 'from-teal-400 to-cyan-600',
      hero: 'from-green-50 via-emerald-50 to-teal-50',
      about: 'from-emerald-50 via-green-50 to-lime-50',
      skills: 'from-lime-50 via-green-50 to-emerald-50',
      projects: 'from-emerald-50 via-teal-50 to-cyan-50',
      experience: 'from-teal-50 via-emerald-50 to-green-50',
      contact: 'from-green-50 via-emerald-50 to-teal-50'
    },
    orange: {
      name: 'Sunset Orange',
      primary: 'from-orange-400 to-red-600',
      secondary: 'from-yellow-400 to-orange-600',
      accent: 'from-red-400 to-pink-600',
      hero: 'from-yellow-50 via-orange-50 to-red-50',
      about: 'from-orange-50 via-amber-50 to-yellow-50',
      skills: 'from-amber-50 via-orange-50 to-red-50',
      projects: 'from-red-50 via-pink-50 to-rose-50',
      experience: 'from-orange-50 via-yellow-50 to-amber-50',
      contact: 'from-yellow-50 via-orange-50 to-red-50'
    },
    purple: {
      name: 'Royal Purple',
      primary: 'from-purple-400 to-indigo-600',
      secondary: 'from-violet-400 to-purple-600',
      accent: 'from-indigo-400 to-blue-600',
      hero: 'from-purple-50 via-violet-50 to-indigo-50',
      about: 'from-violet-50 via-purple-50 to-fuchsia-50',
      skills: 'from-fuchsia-50 via-purple-50 to-violet-50',
      projects: 'from-indigo-50 via-purple-50 to-violet-50',
      experience: 'from-purple-50 via-indigo-50 to-blue-50',
      contact: 'from-purple-50 via-violet-50 to-indigo-50'
    },
    pink: {
      name: 'Cherry Blossom',
      primary: 'from-pink-400 to-rose-600',
      secondary: 'from-rose-400 to-pink-600',
      accent: 'from-fuchsia-400 to-purple-600',
      hero: 'from-pink-50 via-rose-50 to-red-50',
      about: 'from-rose-50 via-pink-50 to-fuchsia-50',
      skills: 'from-fuchsia-50 via-pink-50 to-rose-50',
      projects: 'from-pink-50 via-fuchsia-50 to-purple-50',
      experience: 'from-rose-50 via-pink-50 to-red-50',
      contact: 'from-pink-50 via-rose-50 to-red-50'
    }
  };

  const theme = themes[currentTheme];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Show back to top button
      setShowBackToTop(scrollPosition > windowHeight);
      
      // Update active section
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }

      // Animate elements on scroll
      const animateElements = document.querySelectorAll('.animate-on-scroll');
      animateElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
          element.classList.add('animate-visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message } = formData;
    
    // Create mailto link
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    const mailtoLink = `mailto:darshan23bm@gmail.com?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show confirmation notification
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 4000);
    
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: User },
    { id: 'about', label: 'About', icon: User },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  const skills = {
    'Programming Languages': {
      skills: ['Java', 'Python', 'JavaScript', 'SQL'],
      icon: Code
    },
    'Frameworks': {
      skills: ['JDBC','Hibernate','Spring Boot', 'React', 'Node.js'],
      icon: Layers
    },
    'Cloud & DevOps': {
      skills: ['AWS', 'Terraform', 'Git', 'Docker','Maven'],
      icon: Cloud
    },
    'Concepts': {
      skills: ['OOP', 'DSA', 'REST APIs', 'Microservices','Cloud Deployment on AWS'],
      icon: Server
    }
  };

  const projects = [
    {
      title: 'Java Steganography Tool',
      description: 'A secure data hiding application using steganography techniques implemented in Java.',
      tech: ['Java', 'Swing', 'AWT', 'Image Processing'],
      link: '#'
    },
    {
      title: 'AWS WordPress Deployment',
      description: 'Automated WordPress deployment on AWS using Terraform and best practices.',
      tech: ['AWS', 'Terraform', 'WordPress', 'EC2', 'RDS'],
      link: '#'
    },
    {
      title: 'Student Record Management',
      description: 'Full-stack application for managing student records with CRUD operations.',
      tech: ['Java', 'Spring Boot', 'React', 'MySQL', 'REST API'],
      link: '#'
    }
  ];

  const experience = [
    {
      title: 'Full Stack Intern',
      company: 'KodNest',
      duration: '2024',
      description: 'Developed full-stack applications using Java, Spring Boot, and React. Gained hands-on experience with REST APIs and database management.'
    },
    {
      title: 'Frontend Developer',
      company: 'Sole Connekt',
      duration: '2023',
      description: 'Built responsive web interfaces using React and modern CSS frameworks. Collaborated with design teams to implement user-friendly solutions.'
    }
  ];

  const certifications = [
    'AWS Cloud Practitioner',
    'Terraform Associate',
    'Android Development (Kotlin)',
    'AI Tools and Technologies',
    'Java Full Stack Developer'
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 transition-all duration-500">
      
      {/* Success Notification */}
      {showNotification && (
        <div className="fixed top-20 right-4 z-50 bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center space-x-3 animate-slide-in">
          <CheckCircle className="w-6 h-6" />
          <span className="font-medium">Message sent successfully! Your email client should open shortly.</span>
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-lg border-b border-gray-200/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className={`text-2xl font-bold bg-gradient-to-r ${theme.primary} bg-clip-text text-transparent`}>
                Darshan BM
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                    activeSection === item.id 
                      ? `text-white bg-gradient-to-r ${theme.primary} shadow-lg` 
                      : `text-gray-700 hover:text-white hover:bg-gradient-to-r hover:${theme.secondary}`
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              ))}
              
              {/* Theme Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowThemeSelector(!showThemeSelector)}
                  className={`p-2 rounded-full text-gray-700 hover:bg-gradient-to-r hover:${theme.secondary} hover:text-white transition-all duration-300 transform hover:scale-110`}
                >
                  <Palette className="w-5 h-5" />
                </button>
                
                {showThemeSelector && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200/50 p-2 z-50">
                    {Object.entries(themes).map(([key, themeOption]) => (
                      <button
                        key={key}
                        onClick={() => {
                          setCurrentTheme(key);
                          setShowThemeSelector(false);
                        }}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                          currentTheme === key 
                            ? `text-white bg-gradient-to-r ${themeOption.primary}` 
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${themeOption.primary}`}></div>
                        <span>{themeOption.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={() => setShowThemeSelector(!showThemeSelector)}
                className={`p-2 rounded-full text-gray-700 hover:bg-gradient-to-r hover:${theme.secondary} hover:text-white transition-all duration-300`}
              >
                <Palette className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-full text-gray-700 hover:bg-gradient-to-r hover:${theme.secondary} hover:text-white transition-all duration-300`}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200/50">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center space-x-2 w-full px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeSection === item.id 
                      ? `text-white bg-gradient-to-r ${theme.primary}` 
                      : `text-gray-700 hover:text-white hover:bg-gradient-to-r hover:${theme.secondary}`
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Mobile Theme Selector */}
        {showThemeSelector && (
          <div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200/50 p-4">
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(themes).map(([key, themeOption]) => (
                <button
                  key={key}
                  onClick={() => {
                    setCurrentTheme(key);
                    setShowThemeSelector(false);
                  }}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    currentTheme === key 
                      ? `text-white bg-gradient-to-r ${themeOption.primary}` 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${themeOption.primary}`}></div>
                  <span>{themeOption.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className={`min-h-screen flex items-center pt-16 bg-gradient-to-br ${theme.hero} relative overflow-hidden`}>
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br ${theme.primary} opacity-20 rounded-full blur-3xl animate-float`}></div>
          <div className={`absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br ${theme.accent} opacity-20 rounded-full blur-3xl animate-float-delayed`}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-on-scroll">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  Hi, I'm{' '}
                  <span className={`bg-gradient-to-r ${theme.primary} bg-clip-text text-transparent animate-gradient`}>
                    Darshan BM
                  </span>
                </h1>
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-700">
                  Java Full Stack Developer
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
                  A passionate and detail-oriented developer with expertise in Java, Spring Boot, React, and AWS. Based in Bangalore, India, I specialize in building scalable and secure web applications. Committed to continuous learning and innovation, I strive to deliver impactful solutions that solve real-world problems.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => scrollToSection('projects')}
                  className={`group flex items-center justify-center space-x-2 bg-gradient-to-r ${theme.primary} hover:opacity-90 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl`}
                >
                  <FolderOpen className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  <span>View Projects</span>
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className={`group flex items-center justify-center space-x-2 border-2 bg-gradient-to-r ${theme.primary} text-transparent bg-clip-text hover:text-white hover:bg-gradient-to-r hover:${theme.primary} px-8 py-4 rounded-full font-medium transition-all duration-300 transform hover:scale-105`}
                  style={{
                    borderImage: `linear-gradient(to right, var(--tw-gradient-stops)) 1`,
                  }}
                >
                  <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Get In Touch</span>
                </button>
              </div>
            </div>
            
            <div className="flex justify-center animate-on-scroll">
              <div className="relative">
                <div className={`w-80 h-80 bg-gradient-to-br ${theme.primary} rounded-full flex items-center justify-center shadow-2xl`}>
                  <div className="w-72 h-72 bg-white rounded-full overflow-hidden shadow-inner">
                    <img 
                      src="/darshan.png" 
                      alt="Darshan BM - Java Full Stack Developer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className={`absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r ${theme.secondary} rounded-full`}></div>
                <div className={`absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r ${theme.accent} rounded-full`}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-20 bg-gradient-to-br ${theme.about} relative overflow-hidden`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className={`absolute top-20 left-20 w-32 h-32 bg-gradient-to-br ${theme.secondary} rounded-full blur-2xl animate-float`}></div>
          <div className={`absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br ${theme.accent} rounded-full blur-2xl animate-float-delayed`}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r ${theme.primary} bg-clip-text text-transparent`}>
              About Me
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A Computer Science graduate with a passion for full-stack development and cloud technologies
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-on-scroll">
              <h3 className={`text-2xl font-semibold bg-gradient-to-r ${theme.primary} bg-clip-text text-transparent`}>
                My Journey
              </h3>
              <p className="text-gray-600 leading-relaxed">
                I'm a Computer Science graduate from CMR University with a strong foundation in software development. 
                My journey began with a curiosity about how software works, which led me to explore various programming 
                languages and frameworks.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Through internships and personal projects, I've gained hands-on experience in full-stack development, 
                cloud computing. I'm passionate about creating efficient, scalable solutions 
                that solve real-world problems.
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Award className={`w-4 h-4 text-transparent bg-clip-text bg-gradient-to-r ${theme.secondary}`} />
                  <span>CMR University Graduate</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-200/50 animate-on-scroll">
              <h3 className={`text-xl font-semibold mb-6 bg-gradient-to-r ${theme.primary} bg-clip-text text-transparent`}>
                Quick Facts
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 group">
                  <div className={`w-3 h-3 bg-gradient-to-r ${theme.primary} rounded-full group-hover:scale-125 transition-transform duration-300`}></div>
                  <span>Computer Science Graduate</span>
                </div>
                <div className="flex items-center space-x-3 group">
                  <div className={`w-3 h-3 bg-gradient-to-r ${theme.secondary} rounded-full group-hover:scale-125 transition-transform duration-300`}></div>
                  <span>Full Stack Development Experience</span>
                </div>
                <div className="flex items-center space-x-3 group">
                  <div className={`w-3 h-3 bg-gradient-to-r ${theme.accent} rounded-full group-hover:scale-125 transition-transform duration-300`}></div>
                  <span>AWS & Cloud Technologies</span>
                </div>
                <div className="flex items-center space-x-3 group">
                  <div className={`w-3 h-3 bg-gradient-to-r ${theme.primary} rounded-full group-hover:scale-125 transition-transform duration-300`}></div>
                  <span>Multiple Industry Certifications</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`py-20 bg-gradient-to-br ${theme.skills} relative overflow-hidden`}>
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className={`absolute top-10 right-10 w-24 h-24 bg-gradient-to-br ${theme.primary} rounded-full blur-xl animate-float`}></div>
          <div className={`absolute bottom-10 left-10 w-32 h-32 bg-gradient-to-br ${theme.accent} rounded-full blur-xl animate-float-delayed`}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-on-scroll">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Zap className={`w-8 h-8 text-transparent bg-clip-text bg-gradient-to-r ${theme.primary}`} />
              <h2 className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${theme.primary} bg-clip-text text-transparent`}>
                Technical Skills
              </h2>
              <Zap className={`w-8 h-8 text-transparent bg-clip-text bg-gradient-to-r ${theme.primary}`} />
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A comprehensive toolkit for modern web development and cloud solutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(skills).map(([category, skillData], index) => {
              const IconComponent = skillData.icon;
              return (
                <div key={category} className="group bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200/50 animate-on-scroll">
                  <div className="flex items-center space-x-3 mb-4">
                    <IconComponent className={`w-6 h-6 text-gray-700 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:${theme.primary} group-hover:rotate-12 transition-all duration-300`} />
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-gray-900">{category}</h3>
                  </div>
                  <ul className="space-y-2">
                    {skillData.skills.map((skill) => (
                      <li key={skill} className="flex items-center space-x-2 group/item">
                        <div className={`w-2 h-2 bg-gradient-to-r ${theme.primary} rounded-full group-hover/item:scale-150 transition-transform duration-300`}></div>
                        <span className="text-gray-600 group-hover/item:text-gray-800 transition-colors duration-300">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`py-20 bg-gradient-to-br ${theme.projects} relative overflow-hidden`}>
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className={`absolute top-16 left-16 w-28 h-28 bg-gradient-to-br ${theme.secondary} rounded-full blur-2xl animate-float`}></div>
          <div className={`absolute bottom-16 right-16 w-36 h-36 bg-gradient-to-br ${theme.accent} rounded-full blur-2xl animate-float-delayed`}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r ${theme.primary} bg-clip-text text-transparent`}>
              Featured Projects
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A showcase of my technical abilities and problem-solving approach
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200/50 animate-on-scroll">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 group-hover:text-gray-900 transition-colors duration-300">{project.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span key={tech} className={`bg-gradient-to-r ${theme.primary} bg-opacity-10 text-gray-800 px-3 py-1 rounded-full text-sm font-medium`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center space-x-4">
                    <a href={project.link} className="group/link flex items-center space-x-2 text-gray-700 hover:text-gray-900 font-medium transition-colors duration-300">
                      <ExternalLink className="w-4 h-4 group-hover/link:rotate-45 transition-transform duration-300" />
                      <span>View Project</span>
                    </a>
                    <a href={project.link} className="group/link flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-300">
                      <Github className="w-4 h-4 group-hover/link:rotate-12 transition-transform duration-300" />
                      <span>Code</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className={`py-20 bg-gradient-to-br ${theme.experience} relative overflow-hidden`}>
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className={`absolute top-12 right-12 w-30 h-30 bg-gradient-to-br ${theme.primary} rounded-full blur-2xl animate-float`}></div>
          <div className={`absolute bottom-12 left-12 w-38 h-38 bg-gradient-to-br ${theme.accent} rounded-full blur-2xl animate-float-delayed`}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r ${theme.primary} bg-clip-text text-transparent`}>
              Professional Experience
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Building expertise through hands-on experience and industry exposure
            </p>
          </div>
          
          <div className="space-y-8 mb-16">
            {experience.map((exp, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-200/50 hover:shadow-xl transition-all duration-500 animate-on-scroll">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{exp.title}</h3>
                    <p className="text-gray-700 font-medium">{exp.company}</p>
                  </div>
                  <span className={`text-gray-500 text-sm bg-gradient-to-r ${theme.secondary} bg-opacity-10 px-3 py-1 rounded-full`}>{exp.duration}</span>
                </div>
                <p className="text-gray-600 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>

          <div className="animate-on-scroll">
            <h3 className={`text-2xl font-semibold mb-8 text-center bg-gradient-to-r ${theme.primary} bg-clip-text text-transparent`}>
              Certifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {certifications.map((cert, index) => (
                <div key={index} className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 text-center border border-gray-200/50 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 animate-on-scroll">
                  <Award className={`w-8 h-8 text-gray-700 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:${theme.primary} mx-auto mb-3 group-hover:rotate-12 transition-all duration-300`} />
                  <p className="font-medium text-sm text-gray-800">{cert}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-20 bg-gradient-to-br ${theme.contact} relative overflow-hidden`}>
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className={`absolute top-14 left-14 w-26 h-26 bg-gradient-to-br ${theme.secondary} rounded-full blur-2xl animate-float`}></div>
          <div className={`absolute bottom-14 right-14 w-34 h-34 bg-gradient-to-br ${theme.accent} rounded-full blur-2xl animate-float-delayed`}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r ${theme.primary} bg-clip-text text-transparent`}>
              Get In Touch
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Ready to collaborate on your next project? Let's connect and build something amazing together.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8 animate-on-scroll">
              <div className="flex justify-center space-x-8">
                <a 
                  href="mailto:darshan23bm@gmail.com"
                  className="group flex flex-col items-center space-y-3 p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200/50"
                >
                  <Mail className={`w-12 h-12 text-gray-700 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:${theme.primary} group-hover:rotate-12 transition-all duration-300`} />
                  <span className="text-sm font-medium text-gray-600 group-hover:text-gray-800">Email</span>
                </a>
                <a 
                  href="https://www.linkedin.com/in/darshan-b-m-achar/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center space-y-3 p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200/50"
                >
                  <Linkedin className={`w-12 h-12 text-gray-700 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:${theme.secondary} group-hover:rotate-12 transition-all duration-300`} />
                  <span className="text-sm font-medium text-gray-600 group-hover:text-gray-800">LinkedIn</span>
                </a>
                <a 
                  href="https://github.com/darshanbmachar" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center space-y-3 p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200/50"
                >
                  <Github className={`w-12 h-12 text-gray-700 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:${theme.accent} group-hover:rotate-12 transition-all duration-300`} />
                  <span className="text-sm font-medium text-gray-600 group-hover:text-gray-800">GitHub</span>
                </a>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200/50 animate-on-scroll">
              <h3 className={`text-xl font-semibold mb-6 bg-gradient-to-r ${theme.primary} bg-clip-text text-transparent`}>
                Send a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 transition-all duration-300 backdrop-blur-sm text-gray-800"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 transition-all duration-300 backdrop-blur-sm text-gray-800"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Message</label>
                  <textarea 
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 transition-all duration-300 backdrop-blur-sm text-gray-800"
                    placeholder="Your message..."
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className={`group w-full flex items-center justify-center space-x-2 bg-gradient-to-r ${theme.primary} hover:opacity-90 text-white px-6 py-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl`}
                >
                  <Send className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400">
              © 2024 Darshan BM. All rights reserved. Built with React & Tailwind CSS.
            </p>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 bg-gradient-to-r ${theme.primary} hover:opacity-90 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 z-50`}
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-180deg); }
        }

        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .animate-slide-in {
          animation: slide-in 0.3s ease-out forwards;
        }

        .animate-on-scroll {
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .animate-on-scroll.animate-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #2563eb, #7c3aed);
        }
      `}</style>
    </div>
  );
}

export default App;
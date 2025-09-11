import React from 'react';
import { Button } from './ui/button';
import { Mail, Phone, MapPin, Github, Linkedin, Heart, ArrowUp } from 'lucide-react';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Work', href: '#portfolio' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' }
  ];

  const projects = [
    { name: 'Voice-Based Medical History Taker', href: '#portfolio' },
    { name: 'Booking Website Optimization', href: '#portfolio' },
    { name: 'SEO Performance Enhancement', href: '#portfolio' }
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              GR
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Full-stack developer passionate about creating elegant solutions to complex problems. 
              Let's build something amazing together.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/garuka-ranasinghe"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-300 hover:scale-110"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com/in/garuka-ranasinghe"
                target="_blank"
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="mailto:garukar9895@gmail.com"
                className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-300 hover:scale-110"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 transform"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Featured Projects */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Featured Projects</h3>
            <ul className="space-y-3">
              {projects.map((project) => (
                <li key={project.name}>
                  <button
                    onClick={() => scrollToSection(project.href)}
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-left hover:translate-x-1 transform"
                  >
                    {project.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <a 
                    href="mailto:garukar9895@gmail.com"
                    className="text-white hover:text-blue-400 transition-colors duration-300"
                  >
                    garukar9895@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">Phone</p>
                  <a 
                    href="tel:+61451698959"
                    className="text-white hover:text-green-400 transition-colors duration-300"
                  >
                    +61 451 698 959
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">Location</p>
                  <p className="text-white">Melbourne, VIC</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="text-center">
            <h3 className="text-2xl font-light text-white mb-4">
              Ready to start your next project?
            </h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              I'm always excited to work on new challenges. Whether you need a full-stack developer 
              or someone to optimize your existing systems, let's discuss how I can help.
            </p>
            <Button
              onClick={() => scrollToSection('#contact')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Mail className="w-4 h-4 mr-2" />
              Let's Work Together
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center text-gray-400 text-sm mb-4 md:mb-0">
              <span>© {currentYear} Garuka Ranasinghe. Made with</span>
              <Heart className="w-4 h-4 text-red-400 mx-1 animate-pulse" />
              <span>and lots of coffee ☕</span>
            </div>
            
            <div className="flex items-center space-x-6">
              <span className="text-gray-400 text-sm">
                Currently available for new opportunities
              </span>
              <Button
                onClick={scrollToTop}
                size="sm"
                variant="ghost"
                className="text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-300"
              >
                <ArrowUp className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
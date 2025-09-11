import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Mail, Phone, MapPin, Send, Github, Linkedin, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { AnimatedSection } from './AnimatedSection';
import { publicApi } from '../services/api';

export const Contact = () => {
  const themeContext = useTheme();
  const { isDark, mounted } = themeContext || { isDark: false, mounted: false };
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const response = await publicApi.submitContact(formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state until theme is mounted
  const showLoadingState = !mounted;

  if (showLoadingState) {
    return (
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-2xl font-light text-gray-900">Loading contact form...</div>
        </div>
      </section>
    );
  }

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "garukar9895@gmail.com",
      href: "mailto:garukar9895@gmail.com",
      color: "text-blue-600 dark:text-blue-400"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+61 451 698 959",
      href: "tel:+61451698959",
      color: "text-green-600 dark:text-green-400"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Melbourne, VIC, Australia",
      href: "#",
      color: "text-red-600 dark:text-red-400"
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/garuka-ranasinghe",
      color: "hover:text-gray-900 dark:hover:text-gray-100"
    },
    {
      icon: Linkedin,
      label: "LinkedIn", 
      href: "https://linkedin.com/in/garuka-ranasinghe",
      color: "hover:text-blue-600 dark:hover:text-blue-400"
    },
    {
      icon: ExternalLink,
      label: "Portfolio",
      href: "#",
      color: "hover:text-purple-600 dark:hover:text-purple-400"
    }
  ];

  return (
    <section className={`py-24 px-6 transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
        : 'bg-gradient-to-br from-slate-50 to-blue-50/30'
    }`}>
      <div className="max-w-6xl mx-auto">
        <AnimatedSection animation="fade-up" className="text-center mb-16">
          <h2 className={`text-5xl font-light tracking-tight mb-4 transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Let's Work Together
          </h2>
          <p className={`text-lg max-w-2xl mx-auto transition-colors duration-300 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Have a project in mind? Need someone who won't disappear when the database breaks? 
            Let's chat about how I can help bring your ideas to life.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <AnimatedSection animation="fade-right">
            <Card className={`p-8 border-0 shadow-lg transition-colors duration-300 ${
              isDark ? 'bg-gray-800' : 'bg-white'
            }`}>
              <h3 className={`text-2xl font-semibold mb-6 transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Send Me a Message
              </h3>
              
              {/* Success/Error Messages */}
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-3" />
                  <span className="text-green-800 dark:text-green-200">
                    Thanks for reaching out! I'll get back to you soon.
                  </span>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-3" />
                  <span className="text-red-800 dark:text-red-200">
                    Sorry, there was an error. Please try again or contact me directly.
                  </span>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Full Name
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      required
                      className="transition-all duration-300 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Email Address
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      required
                      className="transition-all duration-300 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Subject
                  </label>
                  <Input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Project Collaboration"
                    required
                    className="transition-all duration-300 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Message
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project, timeline, and how I can help..."
                    rows={5}
                    required
                    className="transition-all duration-300 focus:ring-2 focus:ring-blue-500 resize-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg shadow-lg hover:shadow-xl btn-animated gpu-accelerated disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Sending...
                    </div>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </AnimatedSection>

          {/* Contact Info */}
          <div className="space-y-8">
            <AnimatedSection animation="fade-left">
              <Card className={`p-8 border-0 shadow-lg transition-colors duration-300 ${
                isDark ? 'bg-gray-800' : 'bg-white'
              }`}>
                <h3 className={`text-2xl font-semibold mb-6 transition-colors duration-300 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Contact Information
                </h3>
                
                <div className="space-y-4">
                  {contactInfo.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        className={`flex items-center p-4 rounded-lg transition-colors duration-300 group ${
                          isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 transition-colors duration-300 ${
                          isDark ? 'bg-gray-700 group-hover:bg-gray-600' : 'bg-gray-100 group-hover:bg-gray-200'
                        }`}>
                          <IconComponent className={`w-5 h-5 ${item.color}`} />
                        </div>
                        <div>
                          <div className={`text-sm transition-colors duration-300 ${
                            isDark ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            {item.label}
                          </div>
                          <div className={`font-medium transition-colors duration-300 ${
                            isDark ? 'text-white' : 'text-gray-900'
                          }`}>
                            {item.value}
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </Card>
            </AnimatedSection>

            <AnimatedSection animation="fade-left" delay={200}>
              <Card className={`p-8 border-0 shadow-lg transition-colors duration-300 ${
                isDark ? 'bg-gray-800' : 'bg-white'
              }`}>
                <h3 className={`text-2xl font-semibold mb-6 transition-colors duration-300 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Follow Me
                </h3>
                
                <div className="flex space-x-4">
                  {socialLinks.map((social) => {
                    const IconComponent = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg ${
                          isDark 
                            ? 'bg-gray-700 text-gray-400' 
                            : 'bg-gray-100 text-gray-600'
                        } ${social.color}`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>

                <div className={`mt-6 p-4 rounded-lg transition-colors duration-300 ${
                  isDark 
                    ? 'bg-gradient-to-r from-blue-900/20 to-purple-900/20' 
                    : 'bg-gradient-to-r from-blue-50 to-purple-50'
                }`}>
                  <p className={`text-sm transition-colors duration-300 ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    <strong>Response Time:</strong> Usually within 24 hours<br />
                    <strong>Availability:</strong> Open to new opportunities and collaborations
                  </p>
                </div>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};
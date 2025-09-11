import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { ArrowDown, Download, Mail, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useMousePosition } from '../hooks/useScrollAnimation';
import { AnimatedSection } from './AnimatedSection';
import { publicApi } from '../services/api';

export const Hero = () => {
  const mousePosition = useMousePosition();
  const [isLoaded, setIsLoaded] = useState(false);
  const [profile, setProfile] = useState(null);
  const themeContext = useTheme();
  const { isDark, mounted } = themeContext || { isDark: false, mounted: false };

  useEffect(() => {
    setIsLoaded(true);
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await publicApi.getProfile();
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const scrollToPortfolio = () => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownloadCV = () => {
    if (profile?.resume) {
      // Open the CV URL in a new tab
      window.open(profile.resume, '_blank');
    } else {
      alert('CV not available. Please contact for more information.');
    }
  };

  // Show loading state until theme is mounted
  const showLoadingState = !mounted;

  if (showLoadingState) {
    return (
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-white">
        <div className="text-center">
          <div className="text-4xl font-light text-gray-900 mb-4">Loading...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:to-gray-900 transition-colors duration-300">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient orbs with enhanced dark mode */}
        <div 
          className={`absolute w-96 h-96 rounded-full blur-3xl animate-pulse transition-colors duration-1000 ${
            isDark 
              ? 'bg-gradient-to-r from-blue-500/15 to-purple-600/15' 
              : 'bg-gradient-to-r from-blue-400/5 to-purple-600/5'
          }`}
          style={{
            top: '10%',
            left: `${20 + mousePosition.x * 0.01}%`,
            animationDuration: '6s',
            animationDelay: '0s'
          }}
        />
        <div 
          className={`absolute w-80 h-80 rounded-full blur-3xl animate-pulse transition-colors duration-1000 ${
            isDark 
              ? 'bg-gradient-to-r from-purple-500/12 to-pink-500/12' 
              : 'bg-gradient-to-r from-purple-400/3 to-pink-500/3'
          }`}
          style={{
            bottom: '15%',
            right: `${15 + mousePosition.y * 0.01}%`,
            animationDuration: '8s',
            animationDelay: '2s'
          }}
        />
        
        {/* Enhanced floating particles for dark mode */}
        {isDark && [1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-bounce"
            style={{
              top: `${20 + (i * 15)}%`,
              left: `${10 + (i * 20)}%`,
              animationDuration: `${3 + i}s`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className={`transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          
          {/* Modern Split-Screen Layout */}
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
            
            {/* Left Side - Content */}
            <div className="order-2 lg:order-1">
              {/* Greeting */}
              <AnimatedSection animation="fade-right" delay={300}>
                <div className="mb-8">
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full shadow-sm border transition-colors duration-300 ${
                    isDark 
                      ? 'bg-slate-800/80 border-slate-700 backdrop-blur-sm' 
                      : 'bg-gray-50 border-gray-100'
                  }`}>
                    <Sparkles className="w-4 h-4 text-blue-500 animate-pulse" />
                    <span className={`text-sm font-medium transition-colors duration-300 ${
                      isDark ? 'text-slate-200' : 'text-gray-700'
                    }`}>
                      Melbourne, VIC • {profile?.availability?.message || "Available for hire"}
                    </span>
                  </div>
                </div>
              </AnimatedSection>

              {/* Main Headline */}
              <AnimatedSection animation="fade-right" delay={500}>
                <h1 className={`text-5xl md:text-6xl lg:text-7xl font-light mb-8 tracking-tight leading-none transition-colors duration-300 ${
                  isDark ? 'text-slate-100' : 'text-gray-900'
                }`}>
                  Full-stack developer
                  <br />
                  <span className="block">
                    with experience in the{' '}
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent font-normal">
                      digital era
                    </span>
                    <span className="text-blue-600">.</span>
                  </span>
                </h1>
              </AnimatedSection>
              
              {/* Subtitle */}
              <AnimatedSection animation="fade-right" delay={700} className="mb-12 max-w-3xl">
                <p className={`text-xl md:text-2xl font-light leading-relaxed mb-6 transition-colors duration-300 ${
                  isDark ? 'text-slate-300' : 'text-gray-600'
                }`}>
                  I'm Garuka, a passionate developer with <strong className={isDark ? 'text-slate-100' : 'text-gray-800'}>7+ years of coding experience</strong>. 
                  From AI-powered healthcare systems to performance optimization, I help businesses turn ideas into reality.
                </p>
                <p className={`text-lg italic transition-colors duration-300 ${
                  isDark ? 'text-slate-400' : 'text-gray-500'
                }`}>
                  Currently mastering the art of turning coffee into code while pursuing my Bachelor's in IT ☕→💻
                </p>
              </AnimatedSection>

              {/* CTA Buttons */}
              <AnimatedSection animation="fade-right" delay={900}>
                <div className="flex flex-col sm:flex-row gap-6 justify-start items-start">
                  <Button 
                    size="lg" 
                    className={`group text-white px-10 py-4 rounded-none text-lg font-medium card-animated ${
                      isDark 
                        ? 'bg-slate-100 text-slate-900 hover:bg-white' 
                        : 'bg-black hover:bg-gray-800'
                    }`}
                    onClick={handleDownloadCV}
                    disabled={!profile?.resume}
                  >
                    <Download className="mr-2 w-5 h-5 group-hover:translate-y-1 smooth-transition" />
                    Download CV
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="lg"
                    className={`group border-2 px-10 py-4 rounded-none text-lg font-medium card-animated ${
                      isDark 
                        ? 'border-slate-300 text-slate-300 hover:bg-slate-300 hover:text-slate-900' 
                        : 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'
                    }`}
                    onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    View Work
                    <ArrowDown className="ml-2 w-5 h-5 group-hover:translate-y-1 smooth-transition" />
                  </Button>
                </div>
              </AnimatedSection>
            </div>

            {/* Right Side - Professional Portrait */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <AnimatedSection animation="fade-left" delay={600}>
                <div className="relative group">
                  {/* Dynamic Gradient Border */}
                  <div 
                    className={`absolute inset-0 rounded-full p-1 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 animate-pulse transition-all duration-300 group-hover:scale-105 ${
                      isDark ? 'opacity-70' : 'opacity-50'
                    }`}
                    style={{
                      filter: 'blur(0.5px)',
                      background: `conic-gradient(from ${mousePosition.x * 3.6}deg, #3b82f6, #8b5cf6, #10b981, #3b82f6)`
                    }}
                  />
                  
                  {/* Portrait Container */}
                  <div className={`relative overflow-hidden rounded-full w-80 h-80 md:w-96 md:h-96 bg-gradient-to-br shadow-2xl group-hover:shadow-3xl transition-all duration-300 gpu-accelerated ${
                    isDark 
                      ? 'from-slate-800 to-slate-900' 
                      : 'from-gray-50 to-white'
                  }`}>
                    
                    {/* Portrait Image */}
                    <img 
                      src="https://customer-assets.emergentagent.com/job_dev-folio-37/artifacts/73c0ksk8_Gemini_Generated_Image_yf9qajyf9qajyf9q.png"
                      alt="Garuka Ranasinghe - Full Stack Developer"
                      className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500 gpu-accelerated"
                      loading="eager"
                      onError={(e) => {
                        console.error('Portrait image failed to load');
                        e.target.style.display = 'none';
                      }}
                    />
                    
                    {/* Floating Animation */}
                    <div 
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        transform: `translateY(${Math.sin(Date.now() * 0.001) * 2}px)`,
                        animation: 'float 6s ease-in-out infinite'
                      }}
                    />
                    
                    {/* Glass Morphism Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${
                      isDark 
                        ? 'from-transparent to-slate-800/50' 
                        : 'from-transparent to-gray-900/20'
                    }`} />
                  </div>
                  
                  {/* Floating Geometric Accents */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg rotate-12 animate-bounce opacity-80" 
                       style={{ animationDelay: '0s', animationDuration: '3s' }} />
                  <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-gradient-to-r from-green-500 to-blue-500 rounded-full animate-bounce opacity-70" 
                       style={{ animationDelay: '1s', animationDuration: '4s' }} />
                  <div className="absolute top-1/2 -right-8 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-sm rotate-45 animate-pulse opacity-60" />
                  
                  {/* Professional Badge */}
                  <div className={`absolute -bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full shadow-lg backdrop-blur-sm border transition-all duration-300 ${
                    isDark 
                      ? 'bg-slate-800/90 border-slate-600 text-slate-200' 
                      : 'bg-white/90 border-gray-200 text-gray-700'
                  }`}>
                    <span className="text-sm font-medium">7+ Years Experience</span>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>

          {/* Updated Bio Section */}
          <AnimatedSection animation="fade-up" delay={1100} className="text-center mt-20">
            <div className="max-w-4xl mx-auto">
              <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                isDark ? 'text-slate-400' : 'text-gray-500'
              }`}>
                I'm a passionate developer with <strong className={isDark ? 'text-slate-300' : 'text-gray-700'}>7+ years of coding journey</strong> starting from 2018, 
                currently gaining real-world experience through internships while pursuing my Bachelor's in IT. 
                I specialize in creating functional and user-centered digital products with clean, modern designs. 
                My approach combines technical excellence with user experience, ensuring solutions that not only work 
                but feel effortless to use.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce transition-colors duration-300 ${
        isDark ? 'opacity-50' : 'opacity-40'
      }`}>
        <div className={`w-6 h-10 border rounded-full flex justify-center transition-colors duration-300 ${
          isDark ? 'border-slate-500 bg-slate-800/20 backdrop-blur-sm' : 'border-gray-400'
        }`}>
          <div className={`w-1 h-3 rounded-full mt-2 animate-pulse transition-colors duration-300 ${
            isDark ? 'bg-slate-400' : 'bg-gray-400'
          }`} />
        </div>
      </div>
    </section>
  );
};
import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ExternalLink, Github } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Portfolio = () => {
  const { isDark } = useTheme();

  const projects = [
    {
      id: 1,
      title: "Voice-Based Medical History Taker",
      description: "AI-powered secure data workflow using Gemini AI, Python, and MongoDB on AWS. Privacy-focused with scalable architecture.",
      technologies: ["Python", "AI", "MongoDB", "AWS", "Privacy"],
      duration: "Jul 2024 – Jun 2025",
      type: "AI + Cloud",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop&crop=center",
      achievements: ["5 client presentations", "Audit-ready documentation", "HIPAA-compliant design"]
    },
    {
      id: 2,
      title: "Booking Website Optimization",
      description: "UX analysis and optimization for Mildura Grand Hotel's booking system. Delivered 13 actionable improvements using AI tools.",
      technologies: ["UX/UI", "ChatGPT", "Claude", "Analytics"],
      duration: "Feb 2024 – Apr 2024",
      type: "Web Optimization",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop&crop=center",
      achievements: ["13 UX improvements", "SummerTech Live recognition", "Conversion optimization"]
    },
    {
      id: 3,
      title: "SEO Performance Enhancement",
      description: "Conducted comprehensive SEO audits resolving 148+ issues, improving performance by ~20% for Australian market.",
      technologies: ["SEO", "Google Console", "Performance", "Analytics"],
      duration: "Apr 2025 – Present",
      type: "Web Development",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&crop=center",
      achievements: ["148+ issues resolved", "20% performance boost", "Australian localization"]
    }
  ];

  return (
    <section className={`py-24 px-6 transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-slate-800 to-slate-900' 
        : 'bg-gradient-to-br from-slate-50 to-blue-50/30'
    }`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-5xl font-light tracking-tight mb-4 transition-colors duration-300 ${
            isDark ? 'text-slate-100' : 'text-gray-900'
          }`}>
            Selected Works
          </h2>
          <p className={`text-lg max-w-2xl mx-auto transition-colors duration-300 ${
            isDark ? 'text-slate-300' : 'text-gray-600'
          }`}>
            From AI-powered healthcare solutions to performance optimizations, 
            each project tells a story of turning complex problems into elegant solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={project.id} 
              className={`group overflow-hidden border-0 shadow-lg transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm ${
                isDark 
                  ? 'bg-slate-800/80 hover:bg-white hover:shadow-xl' 
                  : 'bg-white/80 hover:shadow-xl'
              }`}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors cursor-pointer">
                    <ExternalLink className="w-4 h-4 text-gray-700" />
                  </div>
                  <div className="p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors cursor-pointer">
                    <Github className="w-4 h-4 text-gray-700" />
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className={`transition-colors duration-300 ${
                    isDark 
                      ? 'bg-blue-900/50 text-blue-200 group-hover:bg-blue-600 group-hover:text-white' 
                      : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                  }`}>
                    {project.type}
                  </Badge>
                  <span className={`text-sm transition-colors duration-300 ${
                    isDark 
                      ? 'text-slate-400 group-hover:text-gray-600' 
                      : 'text-gray-500'
                  }`}>
                    {project.duration}
                  </span>
                </div>

                <h3 className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
                  isDark 
                    ? 'text-slate-100 group-hover:text-gray-900 group-hover:text-blue-600' 
                    : 'text-gray-900 group-hover:text-blue-600'
                }`}>
                  {project.title}
                </h3>

                <p className={`mb-4 leading-relaxed transition-colors duration-300 ${
                  isDark 
                    ? 'text-slate-300 group-hover:text-gray-700' 
                    : 'text-gray-600'
                }`}>
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <Badge 
                      key={tech} 
                      variant="outline" 
                      className={`text-xs transition-colors duration-300 ${
                        isDark 
                          ? 'border-slate-600 text-slate-400 group-hover:border-gray-400 group-hover:text-gray-600' 
                          : 'border-gray-300 text-gray-600 hover:border-blue-300 hover:text-blue-600'
                      }`}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="space-y-1">
                  {project.achievements.map((achievement, idx) => (
                    <div key={idx} className={`flex items-center gap-2 text-sm transition-colors duration-300 ${
                      isDark 
                        ? 'text-slate-400 group-hover:text-gray-600' 
                        : 'text-gray-500'
                    }`}>
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                      {achievement}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
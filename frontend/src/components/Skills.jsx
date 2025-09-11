import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Code, Database, Cloud, Zap, Brain, Globe, Layers } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { publicApi } from '../services/api';

export const Skills = () => {
  const { isDark } = useTheme();
  const [skillCategories, setSkillCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Icon mapping for skill categories
  const iconMap = {
    'code': Code,
    'database': Database,
    'cloud': Cloud,
    'zap': Zap,
    'brain': Brain,
    'globe': Globe,
    'layers': Layers
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const response = await publicApi.getSkills();
      
      // Transform backend data to frontend format
      const transformedSkills = response.data
        .filter(category => category.visible !== false) // Only show visible categories
        .sort((a, b) => (a.order || 0) - (b.order || 0)) // Sort by order
        .map(category => ({
          icon: iconMap[category.icon] || Code,
          title: category.title || category.category,
          skills: category.skills || [],
          color: category.color || '#3B82F6',
          description: category.description || `${category.category} technologies and tools`,
          gradientFrom: category.color || '#3B82F6',
          gradientTo: adjustColor(category.color || '#3B82F6', -20) // Slightly darker shade
        }));
      
      setSkillCategories(transformedSkills);
    } catch (error) {
      console.error('Error fetching skills:', error);
      // Fallback to default skills if API fails
      setSkillCategories([
        {
          icon: Code,
          title: "Frontend Development",
          skills: ["React", "JavaScript", "HTML/CSS", "TypeScript"],
          color: "#3B82F6",
          gradientFrom: "#3B82F6",
          gradientTo: "#2563EB",
          description: "Creating responsive, user-friendly interfaces"
        },
        {
          icon: Database,
          title: "Backend Development", 
          skills: ["Node.js", "Python", "MongoDB", "APIs"],
          color: "#10B981",
          gradientFrom: "#10B981",
          gradientTo: "#059669",
          description: "Building scalable server-side solutions"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to adjust color brightness
  const adjustColor = (color, amount) => {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * amount);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
  };

  const certifications = [
    "AWS Solutions Architect Associate",
    "Certified Kubernetes Application Developer", 
    "MongoDB Certified Developer"
  ];

  return (
    <section id="skills" className={`py-24 px-6 transition-colors duration-300 ${
      isDark ? 'bg-slate-800' : 'bg-white'
    }`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-5xl font-light tracking-tight mb-4 transition-colors duration-300 ${
            isDark ? 'text-slate-100' : 'text-gray-900'
          }`}>
            Skills & Expertise
          </h2>
          <p className={`text-lg max-w-2xl mx-auto transition-colors duration-300 ${
            isDark ? 'text-slate-300' : 'text-gray-600'
          }`}>
            From frontend magic to backend wizardry, here's my toolkit for turning 
            ideas into reality (and fixing things when they inevitably break).
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-80 bg-gray-200 animate-pulse rounded-xl"></div>
            ))}
          </div>
        ) : skillCategories.length === 0 ? (
          <div className="text-center py-16">
            <Code className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-slate-400' : 'text-gray-400'}`} />
            <p className={`text-lg ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
              No skills categories found. Add some through the admin console!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {skillCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Card 
                  key={index}
                  className={`group relative p-8 border-0 shadow-xl transition-all duration-700 hover:-translate-y-3 hover:scale-105 overflow-hidden ${
                    isDark 
                      ? 'bg-slate-700 hover:bg-white hover:shadow-2xl' 
                      : 'bg-white hover:shadow-2xl'
                  }`}
                  style={{
                    animationDelay: `${index * 0.15}s`
                  }}
                >
                  {/* Background gradient overlay */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700"
                    style={{
                      background: `linear-gradient(135deg, ${category.gradientFrom}, ${category.gradientTo})`
                    }}
                  />
                  
                  <div className="relative z-10">
                    {/* Icon with animated background */}
                    <div className="relative mb-6">
                      <div 
                        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-500 shadow-lg"
                        style={{
                          background: `linear-gradient(135deg, ${category.gradientFrom}, ${category.gradientTo})`
                        }}
                      >
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      
                      {/* Floating particles effect */}
                      <div className="absolute -top-2 -right-2 w-3 h-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                           style={{ backgroundColor: category.gradientFrom }}></div>
                      <div className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200"
                           style={{ backgroundColor: category.gradientTo }}></div>
                    </div>

                    <h3 className={`text-2xl font-bold mb-3 transition-colors duration-300 ${
                      isDark 
                        ? 'text-slate-100 group-hover:text-gray-900' 
                        : 'text-gray-900'
                    }`}>
                      {category.title}
                    </h3>

                    <p className={`text-sm mb-6 leading-relaxed transition-colors duration-300 ${
                      isDark 
                        ? 'text-slate-300 group-hover:text-gray-600' 
                        : 'text-gray-600'
                    }`}>
                      {category.description}
                    </p>

                    {/* Skills with animated tags */}
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill, skillIndex) => (
                          <Badge 
                            key={skillIndex}
                            className={`px-3 py-1 text-xs font-medium transition-all duration-300 transform hover:scale-105 ${
                              isDark 
                                ? 'bg-slate-600 text-slate-200 group-hover:text-white group-hover:shadow-md' 
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 group-hover:shadow-md'
                            }`}
                            style={{
                              animationDelay: `${(index * 0.1) + (skillIndex * 0.05)}s`
                            }}
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      
                      {/* Skill count indicator */}
                      <div className={`text-xs font-medium transition-colors duration-300 ${
                        isDark 
                          ? 'text-slate-400 group-hover:text-gray-500' 
                          : 'text-gray-500'
                      }`}>
                        {category.skills.length} skills
                      </div>
                    </div>
                  </div>

                  {/* Animated border on hover */}
                  <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                       style={{
                         background: `linear-gradient(45deg, ${category.gradientFrom}20, ${category.gradientTo}20)`,
                         border: `2px solid ${category.gradientFrom}40`
                       }}
                  />
                </Card>
              );
            })}
          </div>
        )}

        {/* Professional Certifications */}
        <div className="text-center">
          <h3 className={`text-3xl font-light mb-8 transition-colors duration-300 ${
            isDark ? 'text-slate-100' : 'text-gray-900'
          }`}>
            Professional Certifications
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {certifications.map((cert, index) => (
              <Badge 
                key={cert}
                variant="outline"
                className={`px-6 py-3 text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                  isDark 
                    ? 'border-slate-600 text-slate-300 hover:border-blue-400 hover:text-blue-300 hover:bg-blue-50' 
                    : 'border-gray-300 text-gray-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50'
                }`}
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>{cert}</span>
                </div>
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
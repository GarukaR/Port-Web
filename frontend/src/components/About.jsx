import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Coffee, Code, Users, Award } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { publicApi } from '../services/api';

export const About = () => {
  const { isDark } = useTheme();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await publicApi.getProfile();
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      // Use fallback profile data
      setProfile({
        detailedBio: "I'm Garuka, a full-stack developer who genuinely cares about building solutions that work—and keep working. Currently pursuing my Bachelor's in IT while gaining real-world experience.",
        images: {
          professional: "https://customer-assets.emergentagent.com/job_sleek-webfolio-1/artifacts/y15wcysh_2.jpeg",
          casual: "https://customer-assets.emergentagent.com/job_sleek-webfolio-1/artifacts/ttz1vdxk_Gemini_Generated_Image_yf9qajyf9qajyf9q.png"
        },
        location: "Melbourne, VIC, Australia",
        availability: { status: "available", message: "Available for hire" },
        stats: {
          yearsOfCoding: 7,
          projectsCompleted: 25,
          cupsOfCoffee: 3247,
          academicAverage: 85
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const personalStats = [
    {
      icon: Code,
      value: profile?.stats?.yearsOfCoding ? `${profile.stats.yearsOfCoding}+` : "7+",
      label: "Years Coding",
      description: "Late nights turning caffeine into functional software"
    },
    {
      icon: Coffee,
      value: profile?.stats?.cupsOfCoffee ? profile.stats.cupsOfCoffee.toLocaleString() : "3,247",
      label: "Cups of Coffee",
      description: "The secret ingredient behind every successful deployment"
    },
    {
      icon: Users,
      value: profile?.stats?.projectsCompleted ? `${profile.stats.projectsCompleted}+` : "25+",
      label: "Projects Completed",
      description: "From startups to enterprises, all with working databases"
    },
    {
      icon: Award,
      value: profile?.stats?.academicAverage ? `${profile.stats.academicAverage}%` : "85%",
      label: "Academic Average",
      description: "High Distinction across IT and Software Development"
    }
  ];

  const personalityTraits = [
    {
      trait: "Problem Solver",
      description: "I see bugs as puzzles waiting to be solved, not disasters waiting to happen."
    },
    {
      trait: "Team Player",
      description: "Collaboration is key. I believe the best code comes from great conversations."
    },
    {
      trait: "Continuous Learner",
      description: "Technology evolves fast, and so do I. Always curious, always improving."
    },
    {
      trait: "User-Focused", 
      description: "Beautiful code means nothing if users can't navigate it. UX is everything."
    }
  ];

  return (
    <section className={`py-24 px-6 transition-colors duration-300 ${
      isDark ? 'bg-slate-900' : 'bg-white'
    }`}>
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Photo and intro */}
          <div className="relative">
            <div className="relative group">
              {/* Professional photo */}
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img 
                  src={profile?.images?.professional || "https://customer-assets.emergentagent.com/job_sleek-webfolio-1/artifacts/y15wcysh_2.jpeg"}
                  alt="Garuka Ranasinghe - Professional headshot"
                  className="w-full h-[500px] object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              {/* Casual photo - floating element */}
              <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full overflow-hidden shadow-xl border-4 border-white group-hover:scale-105 transition-transform duration-300">
                <img 
                  src={profile?.images?.casual || "https://customer-assets.emergentagent.com/job_sleek-webfolio-1/artifacts/ttz1vdxk_Gemini_Generated_Image_yf9qajyf9qajyf9q.png"}
                  alt="Garuka Ranasinghe - Casual photo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Floating stats cards */}
            <div className={`absolute top-4 -left-4 rounded-lg p-3 shadow-lg transition-colors duration-300 ${
              isDark ? 'bg-slate-800/90 backdrop-blur-sm' : 'bg-white/90 backdrop-blur-sm'
            }`}>
              <div className={`text-sm font-medium transition-colors duration-300 ${
                isDark ? 'text-slate-200' : 'text-gray-900'
              }`}>Based in</div>
              <div className={`text-xs transition-colors duration-300 ${
                isDark ? 'text-slate-400' : 'text-gray-600'
              }`}>{profile?.location || "Melbourne, VIC 🇦🇺"}</div>
            </div>

            <div className={`absolute top-20 -right-4 rounded-lg p-3 shadow-lg transition-colors duration-300 ${
              isDark ? 'bg-slate-800/90 backdrop-blur-sm' : 'bg-white/90 backdrop-blur-sm'
            }`}>
              <div className={`text-sm font-medium ${
                profile?.availability?.status === 'available' ? 'text-green-600' : 'text-orange-600'
              }`}>
                {profile?.availability?.status === 'available' ? 'Available' : 'Busy'}
              </div>
              <div className={`text-xs transition-colors duration-300 ${
                isDark ? 'text-slate-400' : 'text-gray-600'
              }`}>
                {profile?.availability?.message || "Open to opportunities"}
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div>
            <div className="mb-8">
              <h2 className={`text-5xl font-light tracking-tight leading-tight mb-6 transition-colors duration-300 ${
                isDark ? 'text-slate-100' : 'text-gray-900'
              }`}>
                More than just
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-medium">
                  another developer
                </span>
              </h2>
              
              <p className={`text-lg leading-relaxed mb-6 transition-colors duration-300 ${
                isDark ? 'text-slate-300' : 'text-gray-700'
              }`}>
                {profile?.detailedBio || profile?.bio || "I'm Garuka, a full-stack developer who genuinely cares about building solutions that work—and keep working. Currently pursuing my Bachelor's in IT while gaining real-world experience."}
              </p>

              <p className={`leading-relaxed mb-8 transition-colors duration-300 ${
                isDark ? 'text-slate-400' : 'text-gray-600'
              }`}>
                When I'm not debugging code or optimizing databases, you'll find me exploring the latest AI integrations, 
                tweaking SEO strategies, or helping teams bridge the gap between complex technical requirements and 
                user-friendly experiences. I believe great software should feel effortless to use, even when it's 
                solving complex problems behind the scenes.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                {['Python Enthusiast', 'AI Integration', 'Cloud Architecture', 'UX Advocate', 'Team Collaborator'].map((tag) => (
                  <Badge 
                    key={tag}
                    variant="secondary"
                    className={`px-3 py-1 transition-colors duration-300 ${
                      isDark 
                        ? 'bg-blue-900/30 text-blue-200 hover:bg-blue-700 hover:text-white' 
                        : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                    }`}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {personalStats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <Card 
                    key={stat.label}
                    className={`group p-4 border-0 shadow-md transition-all duration-200 hover:-translate-y-0.5 ${
                      isDark 
                        ? 'bg-slate-800 hover:bg-white hover:shadow-lg' 
                        : 'bg-gradient-to-br from-white to-gray-50 hover:shadow-lg'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`text-xl font-bold transition-colors duration-300 ${
                          isDark 
                            ? 'text-slate-100 group-hover:text-gray-900' 
                            : 'text-gray-900'
                        }`}>
                          {stat.value}
                        </div>
                        <div className={`text-sm font-medium mb-1 transition-colors duration-300 ${
                          isDark 
                            ? 'text-slate-300 group-hover:text-gray-700' 
                            : 'text-gray-700'
                        }`}>
                          {stat.label}
                        </div>
                        <div className={`text-xs leading-tight transition-colors duration-300 ${
                          isDark 
                            ? 'text-slate-400 group-hover:text-gray-500' 
                            : 'text-gray-500'
                        }`}>
                          {stat.description}
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Personality traits */}
            <div>
              <h3 className={`text-2xl font-light mb-6 transition-colors duration-300 ${
                isDark ? 'text-slate-100' : 'text-gray-900'
              }`}>What drives me</h3>
              <div className="space-y-4">
                {personalityTraits.map((item, index) => (
                  <div 
                    key={item.trait}
                    className={`group flex items-start space-x-4 p-4 rounded-lg transition-all duration-300 ${
                      isDark 
                        ? 'hover:bg-slate-800' 
                        : 'hover:bg-gray-50'
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <div className={`font-medium mb-1 transition-colors duration-300 ${
                        isDark ? 'text-slate-200' : 'text-gray-900'
                      }`}>
                        {item.trait}
                      </div>
                      <div className={`text-sm leading-relaxed transition-colors duration-300 ${
                        isDark ? 'text-slate-400' : 'text-gray-600'
                      }`}>
                        {item.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
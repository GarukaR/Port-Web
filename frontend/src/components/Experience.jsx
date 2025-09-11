import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Calendar, MapPin, Trophy, Building } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { publicApi } from '../services/api';

export const Experience = () => {
  const { isDark } = useTheme();
  const [experiences, setExperiences] = useState([]);
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);

  const gradients = [
    "from-blue-500 to-purple-500",
    "from-green-500 to-blue-500",
    "from-purple-500 to-pink-500",
    "from-orange-500 to-red-500"
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [expResponse, eduResponse] = await Promise.all([
        publicApi.getExperience(),
        publicApi.getEducation()
      ]);
      
      // Transform experience data
      const transformedExperiences = expResponse.data.map((exp, index) => ({
        id: exp._id,
        title: exp.title,
        company: exp.company,
        location: exp.location,
        duration: formatDateRange(exp.startDate, exp.endDate, exp.current),
        type: exp.current ? "Current Role" : "Previous Role",
        description: exp.description,
        achievements: exp.achievements || [],
        technologies: exp.technologies || [],
        gradient: gradients[index % gradients.length]
      }));

      // Transform education data
      const transformedEducation = eduResponse.data.map(edu => ({
        id: edu._id,
        degree: edu.degree,
        specialization: edu.specialization,
        institution: edu.institution,
        duration: formatDateRange(edu.startDate, edu.endDate, edu.current),
        grade: edu.grade || "N/A",
        subjects: edu.subjects || [],
        status: edu.current ? "Current" : "Completed"
      }));

      setExperiences(transformedExperiences);
      setEducation(transformedEducation);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Fallback to empty arrays if API fails
      setExperiences([]);
      setEducation([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDateRange = (startDate, endDate, current) => {
    const formatDate = (dateString) => {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short' 
      });
    };

    const start = formatDate(startDate);
    const end = current ? 'Present' : formatDate(endDate);
    
    return `${start} – ${end}`;
  };

  return (
    <section className={`py-24 px-6 transition-colors duration-300 ${
      isDark ? 'bg-gradient-to-br from-slate-900 to-slate-800' : 'bg-gradient-to-br from-white to-slate-50'
    }`}>
      <div className="max-w-6xl mx-auto">
        {/* Experience Section */}
        <div className="mb-20">
          <h2 className={`text-5xl font-light tracking-tight text-center mb-4 transition-colors duration-300 ${
            isDark ? 'text-slate-100' : 'text-gray-900'
          }`}>
            Professional Journey
          </h2>
          <p className={`text-lg text-center mb-16 max-w-2xl mx-auto transition-colors duration-300 ${
            isDark ? 'text-slate-300' : 'text-gray-600'
          }`}>
            From debugging code to debugging life, here's where I've been making things work 
            (and occasionally breaking them first).
          </p>

          {loading ? (
            <div className="space-y-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-lg"></div>
              ))}
            </div>
          ) : experiences.length === 0 ? (
            <div className="text-center py-12">
              <Building className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-slate-400' : 'text-gray-400'}`} />
              <p className={`text-lg ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
                No experience records found. Add some through the admin console!
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <Card 
                  key={exp.id}
                  className={`group overflow-hidden border-0 shadow-lg transition-all duration-500 hover:-translate-y-1 ${
                    isDark 
                      ? 'bg-slate-800 hover:bg-white hover:shadow-2xl' 
                      : 'bg-white hover:shadow-2xl'
                  }`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="p-8">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                      {/* Left side - Company info */}
                      <div className="lg:w-1/3">
                        <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${exp.gradient} text-white text-sm font-medium mb-4`}>
                          {exp.type}
                        </div>
                        
                        <h3 className={`text-2xl font-semibold mb-2 transition-colors duration-300 ${
                          isDark 
                            ? 'text-slate-100 group-hover:text-gray-900' 
                            : 'text-gray-900'
                        }`}>
                          {exp.title}
                        </h3>
                        
                        <div className={`text-xl font-medium mb-4 transition-colors duration-300 ${
                          isDark 
                            ? 'text-slate-300 group-hover:text-gray-700' 
                            : 'text-gray-700'
                        }`}>
                          {exp.company}
                        </div>

                        <div className={`space-y-2 transition-colors duration-300 ${
                          isDark 
                            ? 'text-slate-400 group-hover:text-gray-600' 
                            : 'text-gray-600'
                        }`}>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{exp.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{exp.duration}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right side - Details */}
                      <div className="lg:w-2/3">
                        <p className={`mb-6 leading-relaxed transition-colors duration-300 ${
                          isDark 
                            ? 'text-slate-300 group-hover:text-gray-700' 
                            : 'text-gray-700'
                        }`}>
                          {exp.description}
                        </p>

                        {exp.achievements && exp.achievements.length > 0 && (
                          <div className="mb-6">
                            <h4 className={`flex items-center gap-2 text-lg font-medium mb-3 transition-colors duration-300 ${
                              isDark 
                                ? 'text-slate-200 group-hover:text-gray-900' 
                                : 'text-gray-900'
                            }`}>
                              <Trophy className="w-5 h-5 text-yellow-500" />
                              Key Achievements
                            </h4>
                            <ul className="space-y-2">
                              {exp.achievements.map((achievement, idx) => (
                                <li key={idx} className={`flex items-start gap-2 transition-colors duration-300 ${
                                  isDark 
                                    ? 'text-slate-400 group-hover:text-gray-600' 
                                    : 'text-gray-600'
                                }`}>
                                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                                  <span>{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {exp.technologies && exp.technologies.length > 0 && (
                          <div>
                            <h4 className={`text-lg font-medium mb-3 transition-colors duration-300 ${
                              isDark 
                                ? 'text-slate-200 group-hover:text-gray-900' 
                                : 'text-gray-900'
                            }`}>Technologies Used</h4>
                            <div className="flex flex-wrap gap-2">
                              {exp.technologies.map((tech) => (
                                <Badge 
                                  key={tech} 
                                  variant="secondary" 
                                  className={`transition-colors duration-300 ${
                                    isDark 
                                      ? 'bg-blue-900/30 text-blue-200 group-hover:bg-blue-600 group-hover:text-white' 
                                      : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                                  }`}
                                >
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Education Section */}
        <div>
          <h2 className={`text-5xl font-light tracking-tight text-center mb-4 transition-colors duration-300 ${
            isDark ? 'text-slate-100' : 'text-gray-900'
          }`}>
            Education
          </h2>
          <p className={`text-lg text-center mb-16 max-w-2xl mx-auto transition-colors duration-300 ${
            isDark ? 'text-slate-300' : 'text-gray-600'
          }`}>
            Where I learned that "it works on my machine" isn't a valid deployment strategy.
          </p>

          {loading ? (
            <div className="grid md:grid-cols-2 gap-8">
              {[1, 2].map((i) => (
                <div key={i} className="h-48 bg-gray-200 animate-pulse rounded-lg"></div>
              ))}
            </div>
          ) : education.length === 0 ? (
            <div className="text-center py-12">
              <div className={`text-lg ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
                No education records found. Add some through the admin console!
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {education.map((edu, index) => (
                <Card 
                  key={edu.id}
                  className={`group border-0 shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                    isDark 
                      ? 'bg-slate-800 hover:bg-white hover:shadow-xl' 
                      : 'bg-white hover:shadow-xl'
                  }`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="p-6">
                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                      edu.status === 'Current' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {edu.status}
                    </div>

                    <h3 className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
                      isDark 
                        ? 'text-slate-100 group-hover:text-gray-900' 
                        : 'text-gray-900'
                    }`}>
                      {edu.degree}
                    </h3>
                    
                    <div className={`text-lg mb-1 transition-colors duration-300 ${
                      isDark 
                        ? 'text-slate-300 group-hover:text-gray-700' 
                        : 'text-gray-700'
                    }`}>
                      {edu.specialization}
                    </div>
                    
                    <div className={`mb-2 transition-colors duration-300 ${
                      isDark 
                        ? 'text-slate-400 group-hover:text-gray-600' 
                        : 'text-gray-600'
                    }`}>
                      {edu.institution}
                    </div>

                    <div className={`flex items-center gap-4 text-sm mb-4 transition-colors duration-300 ${
                      isDark 
                        ? 'text-slate-400 group-hover:text-gray-500' 
                        : 'text-gray-500'
                    }`}>
                      <span>{edu.duration}</span>
                      {edu.grade !== "N/A" && (
                        <span className="font-medium text-green-600">{edu.grade}</span>
                      )}
                    </div>

                    {edu.subjects && edu.subjects.length > 0 && (
                      <div>
                        <h4 className={`font-medium mb-2 transition-colors duration-300 ${
                          isDark 
                            ? 'text-slate-200 group-hover:text-gray-900' 
                            : 'text-gray-900'
                        }`}>Key Subjects</h4>
                        <div className="flex flex-wrap gap-2">
                          {edu.subjects.map((subject) => (
                            <Badge 
                              key={subject} 
                              variant="outline" 
                              className={`text-xs transition-colors duration-300 ${
                                isDark 
                                  ? 'border-slate-600 text-slate-400 group-hover:border-gray-400 group-hover:text-gray-600' 
                                  : 'border-gray-300 text-gray-600'
                              }`}
                            >
                              {subject}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
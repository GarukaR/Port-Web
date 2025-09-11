import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  FolderOpen, 
  Briefcase, 
  GraduationCap, 
  Settings, 
  Eye,
  Star,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { adminApi } from '../../services/api';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await adminApi.getDashboard();
      setStats(response.data);
    } catch (error) {
      setError('Failed to load dashboard data');
      console.error('Dashboard error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">{error}</div>
        <button
          onClick={fetchDashboardData}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  const statCards = [
    {
      name: 'Total Projects',
      value: stats?.projects || 0,
      icon: FolderOpen,
      color: 'bg-blue-500',
      lightColor: 'bg-blue-50 text-blue-700'
    },
    {
      name: 'Experience Entries',
      value: stats?.experience || 0,
      icon: Briefcase,
      color: 'bg-green-500',
      lightColor: 'bg-green-50 text-green-700'
    },
    {
      name: 'Skill Categories',
      value: stats?.skills || 0,
      icon: Settings,
      color: 'bg-purple-500',
      lightColor: 'bg-purple-50 text-purple-700'
    },
    {
      name: 'Education Records',
      value: stats?.education || 0,
      icon: GraduationCap,
      color: 'bg-orange-500',
      lightColor: 'bg-orange-50 text-orange-700'
    },
  ];

  const quickStats = [
    {
      label: 'Visible Projects',
      value: stats?.visibleProjects || 0,
      icon: Eye,
      color: 'text-blue-600'
    },
    {
      label: 'Featured Projects',
      value: stats?.featuredProjects || 0,
      icon: Star,
      color: 'text-yellow-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Overview of your portfolio content</p>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-500">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <Card key={stat.name} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quickStats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <Card key={stat.label} className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <IconComponent className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => navigate('/admin/projects')}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
          >
            <FolderOpen className="w-6 h-6 text-blue-600 mb-2" />
            <h4 className="font-medium text-gray-900">Add New Project</h4>
            <p className="text-sm text-gray-600">Create a new portfolio project</p>
          </button>
          <button 
            onClick={() => navigate('/admin/experience')}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
          >
            <Briefcase className="w-6 h-6 text-green-600 mb-2" />
            <h4 className="font-medium text-gray-900">Update Experience</h4>
            <p className="text-sm text-gray-600">Add or edit work experience</p>
          </button>
          <button 
            onClick={() => navigate('/admin/skills')}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
          >
            <TrendingUp className="w-6 h-6 text-purple-600 mb-2" />
            <h4 className="font-medium text-gray-900">Manage Skills</h4>
            <p className="text-sm text-gray-600">Update your skill categories</p>
          </button>
        </div>
      </Card>

      {/* Welcome Message */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <div className="flex items-start space-x-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <TrendingUp className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Welcome to your Portfolio Admin</h3>
            <p className="text-gray-700 mt-1">
              Manage your portfolio content, update your projects, experience, and skills. 
              All changes will be reflected on your live portfolio immediately.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Live Updates
              </Badge>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Secure Access
              </Badge>
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                Easy Management
              </Badge>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
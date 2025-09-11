import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { LogIn, Shield, Users } from 'lucide-react';

export const AdminLogin = () => {
  const { login, devLogin, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 px-4">
      <Card className="w-full max-w-md p-8 shadow-xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Panel</h1>
          <p className="text-gray-600">Portfolio Content Management System</p>
        </div>

        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Users className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-blue-900">Admin Access</h3>
                <p className="text-sm text-blue-700 mt-1">
                  This panel is restricted to authorized administrators only. 
                  You must sign in with your approved Google account.
                </p>
              </div>
            </div>
          </div>

          <Button
            onClick={login}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            size="lg"
          >
            <LogIn className="w-5 h-5 mr-2" />
            Sign in with Google
          </Button>

          {/* Development login option */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">For Development</span>
            </div>
          </div>

          <Button
            onClick={devLogin}
            variant="outline"
            className="w-full border-2 border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 py-3 rounded-lg transition-all duration-300"
            size="lg"
          >
            <LogIn className="w-5 h-5 mr-2" />
            Quick Admin Access (Dev)
          </Button>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              Only authorized email addresses can access this admin panel
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Admin Panel Features:</p>
            <div className="flex flex-wrap justify-center gap-2 text-xs">
              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">Projects</span>
              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">Experience</span>
              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">Skills</span>
              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">Education</span>
              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">Profile</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
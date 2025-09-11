import React, { createContext, useContext, useEffect, useState } from 'react';
import { authApi } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('admin-token'));

  useEffect(() => {
    // Check URL for token (from OAuth redirect)
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('token');
    
    if (tokenFromUrl) {
      localStorage.setItem('admin-token', tokenFromUrl);
      setToken(tokenFromUrl);
      // Clean URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    // Check authentication status
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      if (token) {
        // Verify token is valid by making an API call
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/dashboard`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          // Decode JWT to get user info
          const payload = JSON.parse(atob(token.split('.')[1]));
          setUser({
            id: payload.id,
            email: payload.email,
            name: payload.name,
            isAdmin: payload.isAdmin
          });
        } else {
          // Token is invalid
          localStorage.removeItem('admin-token');
          setToken(null);
          setUser(null);
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('admin-token');
      setToken(null);
      setUser(null);
    }
    setLoading(false);
  };

  const login = () => {
    // Redirect to Google OAuth
    window.location.href = `${process.env.REACT_APP_BACKEND_URL}/api/auth/google`;
  };

  const devLogin = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/mock-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: 'garukar9895@gmail.com' })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('admin-token', data.token);
        setToken(data.token);
        setUser(data.user);
        window.location.href = '/admin/dashboard';
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Dev login error:', error);
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
    
    localStorage.removeItem('admin-token');
    setToken(null);
    setUser(null);
    window.location.href = '/admin/login';
  };

  const value = {
    user,
    token,
    loading,
    login,
    devLogin,
    logout,
    isAuthenticated: !!user && !!token
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
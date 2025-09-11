import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

// Create axios instance
const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('admin-token');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// Public API calls
export const publicApi = {
  // Get profile data
  getProfile: () => api.get('/profile'),
  
  // Get projects
  getProjects: () => api.get('/projects'),
  
  // Get experience
  getExperience: () => api.get('/experience'),
  
  // Get skills
  getSkills: () => api.get('/skills'),
  
  // Get education
  getEducation: () => api.get('/education'),
  
  // Submit contact form
  submitContact: (data) => api.post('/contact', data),
};

// Admin API calls
export const adminApi = {
  // Dashboard
  getDashboard: () => api.get('/admin/dashboard'),
  
  // Profile management
  getProfile: () => api.get('/admin/profile'),
  updateProfile: (data) => api.put('/admin/profile', data),
  
  // Projects CRUD
  getProjects: () => api.get('/admin/projects'),
  createProject: (data) => api.post('/admin/projects', data),
  updateProject: (id, data) => api.put(`/admin/projects/${id}`, data),
  deleteProject: (id) => api.delete(`/admin/projects/${id}`),
  
  // Experience CRUD
  getExperience: () => api.get('/admin/experience'),
  createExperience: (data) => api.post('/admin/experience', data),
  updateExperience: (id, data) => api.put(`/admin/experience/${id}`, data),
  deleteExperience: (id) => api.delete(`/admin/experience/${id}`),
  
  // Skills CRUD
  getSkills: () => api.get('/admin/skills'),
  createSkill: (data) => api.post('/admin/skills', data),
  updateSkill: (id, data) => api.put(`/admin/skills/${id}`, data),
  deleteSkill: (id) => api.delete(`/admin/skills/${id}`),
  
  // Education CRUD
  getEducation: () => api.get('/admin/education'),
  createEducation: (data) => api.post('/admin/education', data),
  updateEducation: (id, data) => api.put(`/admin/education/${id}`, data),
  deleteEducation: (id) => api.delete(`/admin/education/${id}`),
};

// Auth API calls
export const authApi = {
  googleLogin: () => window.location.href = `${API_BASE_URL}/api/auth/google`,
  logout: () => api.post('/auth/logout'),
  getStatus: () => api.get('/auth/status'),
};

export default api;
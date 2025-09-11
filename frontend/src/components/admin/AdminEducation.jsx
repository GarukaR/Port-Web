import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Plus, 
  Edit, 
  Trash2, 
  GraduationCap,
  Calendar,
  MapPin,
  Award
} from 'lucide-react';
import { adminApi } from '../../services/api';

export const AdminEducation = () => {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingEducation, setEditingEducation] = useState(null);
  const [formData, setFormData] = useState({
    institution: '',
    degree: '',
    specialization: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    grade: '',
    description: '',
    achievements: '',
    subjects: '',
    order: 0
  });

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    try {
      setLoading(true);
      const response = await adminApi.getEducation();
      setEducation(response.data);
    } catch (error) {
      setError('Failed to load education');
      console.error('Education error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        achievements: formData.achievements ? formData.achievements.split('\n').filter(a => a.trim()) : [],
        subjects: formData.subjects ? formData.subjects.split('\n').filter(s => s.trim()) : [],
        order: parseInt(formData.order) || 0,
        startDate: formData.startDate ? new Date(formData.startDate) : null,
        endDate: formData.current || !formData.endDate ? null : new Date(formData.endDate)
      };

      if (editingEducation) {
        await adminApi.updateEducation(editingEducation._id, data);
      } else {
        await adminApi.createEducation(data);
      }

      fetchEducation();
      resetForm();
    } catch (error) {
      console.error('Save error:', error);
      setError('Failed to save education');
    }
  };

  const handleEdit = (educationItem) => {
    setEditingEducation(educationItem);
    setFormData({
      institution: educationItem.institution || '',
      degree: educationItem.degree || '',
      specialization: educationItem.specialization || '',
      location: educationItem.location || '',
      startDate: educationItem.startDate ? new Date(educationItem.startDate).toISOString().split('T')[0] : '',
      endDate: educationItem.endDate ? new Date(educationItem.endDate).toISOString().split('T')[0] : '',
      current: educationItem.current || false,
      grade: educationItem.grade || '',
      description: educationItem.description || '',
      achievements: educationItem.achievements ? educationItem.achievements.join('\n') : '',
      subjects: educationItem.subjects ? educationItem.subjects.join('\n') : '',
      order: educationItem.order || 0
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this education entry?')) {
      try {
        await adminApi.deleteEducation(id);
        fetchEducation();
      } catch (error) {
        console.error('Delete error:', error);
        setError('Failed to delete education');
      }
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingEducation(null);
    setFormData({
      institution: '',
      degree: '',
      specialization: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      grade: '',
      description: '',
      achievements: '',
      subjects: '',
      order: 0
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Education</h1>
          <p className="text-gray-600">Manage your educational background</p>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Education
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <Card className="p-6 border-blue-200 bg-blue-50">
          <h3 className="text-lg font-semibold mb-4">
            {editingEducation ? 'Edit Education' : 'Add New Education'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Institution *
                </label>
                <input
                  type="text"
                  name="institution"
                  value={formData.institution}
                  onChange={handleInputChange}
                  required
                  placeholder="University of XYZ"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Degree *
                </label>
                <input
                  type="text"
                  name="degree"
                  value={formData.degree}
                  onChange={handleInputChange}
                  required
                  placeholder="Bachelor's, Master's, PhD"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Field of Study / Specialization
                </label>
                <input
                  type="text"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
                  placeholder="Computer Science, Engineering, etc."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="City, Country"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date *
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  disabled={formData.current}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Grade / GPA (optional)
                </label>
                <input
                  type="text"
                  name="grade"
                  value={formData.grade}
                  onChange={handleInputChange}
                  placeholder="3.8/4.0, Distinction, HD"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="current"
                  checked={formData.current}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Currently studying here
              </label>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Order
                </label>
                <input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleInputChange}
                  className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                placeholder="Brief description of your studies, thesis, specialization..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Key Subjects (one per line)
              </label>
              <textarea
                name="subjects"
                value={formData.subjects}
                onChange={handleInputChange}
                rows={4}
                placeholder="Data Structures and Algorithms&#10;Database Systems&#10;Web Development&#10;Software Engineering"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Achievements & Awards (one per line)
              </label>
              <textarea
                name="achievements"
                value={formData.achievements}
                onChange={handleInputChange}
                rows={4}
                placeholder="Dean's List&#10;Magna Cum Laude&#10;Outstanding Student Award&#10;Relevant coursework completed"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                {editingEducation ? 'Update' : 'Create'} Education
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Education List */}
      <div className="space-y-4">
        {education.length === 0 ? (
          <Card className="p-8 text-center text-gray-500">
            <GraduationCap className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No education records yet. Add your first education entry!</p>
          </Card>
        ) : (
          education.map((educationItem) => (
            <Card key={educationItem._id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <GraduationCap className="w-5 h-5 text-gray-400" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      {educationItem.degree}
                      {educationItem.specialization && ` in ${educationItem.specialization}`}
                    </h3>
                    {educationItem.current && (
                      <Badge className="bg-green-100 text-green-800 text-xs">
                        Current
                      </Badge>
                    )}
                    {educationItem.order > 0 && (
                      <Badge className="bg-blue-100 text-blue-800 text-xs">
                        Order: {educationItem.order}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center font-medium text-gray-700">
                      {educationItem.institution}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(educationItem.startDate)} - {educationItem.current ? 'Present' : formatDate(educationItem.endDate)}
                    </div>
                    {educationItem.location && (
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {educationItem.location}
                      </div>
                    )}
                    {educationItem.grade && (
                      <div className="flex items-center">
                        <Award className="w-4 h-4 mr-1" />
                        Grade: {educationItem.grade}
                      </div>
                    )}
                  </div>
                  
                  {educationItem.description && (
                    <p className="text-gray-600 mb-3">{educationItem.description}</p>
                  )}
                  
                  {educationItem.subjects && educationItem.subjects.length > 0 && (
                    <div className="mb-3">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Key Subjects:</h4>
                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        {educationItem.subjects.map((subject, index) => (
                          <li key={index}>{subject}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {educationItem.achievements && educationItem.achievements.length > 0 && (
                    <div className="mb-3">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Achievements & Awards:</h4>
                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        {educationItem.achievements.map((achievement, index) => (
                          <li key={index}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 mt-4 pt-4 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(educationItem)}
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(educationItem._id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Settings,
  Star,
  Code,
  Layers,
  X,
  Database,
  Cloud,
  Zap,
  Brain,
  Globe
} from 'lucide-react';
import { adminApi } from '../../services/api';

export const AdminSkills = () => {
  const [skillCategories, setSkillCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    skills: [],
    icon: 'code',
    color: '#3B82F6',
    order: 0,
    visible: true
  });
  const [newSkill, setNewSkill] = useState('');

  const iconOptions = [
    { name: 'Code', value: 'code', icon: Code },
    { name: 'Database', value: 'database', icon: Database },
    { name: 'Cloud', value: 'cloud', icon: Cloud },
    { name: 'Zap', value: 'zap', icon: Zap },
    { name: 'Brain', value: 'brain', icon: Brain },
    { name: 'Globe', value: 'globe', icon: Globe },
    { name: 'Layers', value: 'layers', icon: Layers }
  ];

  const colorOptions = [
    { name: 'Blue', value: '#3B82F6' },
    { name: 'Green', value: '#10B981' },
    { name: 'Purple', value: '#8B5CF6' },
    { name: 'Red', value: '#EF4444' },
    { name: 'Orange', value: '#F59E0B' },
    { name: 'Pink', value: '#EC4899' },
    { name: 'Indigo', value: '#6366F1' },
    { name: 'Teal', value: '#14B8A6' }
  ];

  useEffect(() => {
    fetchSkillCategories();
  }, []);

  const fetchSkillCategories = async () => {
    try {
      setLoading(true);
      const response = await adminApi.getSkills();
      setSkillCategories(response.data);
    } catch (error) {
      setError('Failed to load skill categories');
      console.error('Skills error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseInt(value) || 0 : value
    }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        order: parseInt(formData.order) || 0
      };

      if (editingCategory) {
        await adminApi.updateSkill(editingCategory._id, data);
      } else {
        await adminApi.createSkill(data);
      }

      fetchSkillCategories();
      resetForm();
    } catch (error) {
      console.error('Save error:', error);
      setError('Failed to save skill category');
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      category: category.category || '',
      title: category.title || '',
      description: category.description || '',
      skills: category.skills || [],
      icon: category.icon || 'code',
      color: category.color || '#3B82F6',
      order: category.order || 0,
      visible: category.visible !== false
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this skill category?')) {
      try {
        await adminApi.deleteSkill(id);
        fetchSkillCategories();
      } catch (error) {
        console.error('Delete error:', error);
        setError('Failed to delete skill category');
      }
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingCategory(null);
    setFormData({
      category: '',
      title: '',
      description: '',
      skills: [],
      icon: 'code',
      color: '#3B82F6',
      order: 0,
      visible: true
    });
    setNewSkill('');
  };

  const getIconComponent = (iconName) => {
    const iconOption = iconOptions.find(opt => opt.value === iconName);
    return iconOption ? iconOption.icon : Code;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid gap-6">
            {[1, 2, 3].map((i) => (
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
          <h1 className="text-2xl font-bold text-gray-900">Skills & Expertise</h1>
          <p className="text-gray-600">Manage your skill categories and individual technologies</p>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Skill Category
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
            {editingCategory ? 'Edit Skill Category' : 'Add New Skill Category'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  placeholder="Frontend Technologies"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Display Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="Frontend Development"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={2}
                placeholder="Modern frontend frameworks and libraries for building responsive user interfaces"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Icon
                </label>
                <select
                  name="icon"
                  value={formData.icon}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {iconOptions.map(icon => (
                    <option key={icon.value} value={icon.value}>
                      {icon.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Color
                </label>
                <select
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {colorOptions.map(color => (
                    <option key={color.value} value={color.value}>
                      {color.name}
                    </option>
                  ))}
                </select>
                <div 
                  className="w-full h-6 mt-2 rounded border"
                  style={{ backgroundColor: formData.color }}
                ></div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Order
                </label>
                <input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Skills Management */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Individual Skills & Technologies
              </label>
              
              {/* Add new skill */}
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="e.g., JavaScript, React, TypeScript"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSkill();
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={addSkill}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {/* Current skills */}
              <div className="flex flex-wrap gap-2 min-h-[3rem] p-3 border border-gray-200 rounded-md bg-gray-50">
                {formData.skills.length === 0 ? (
                  <p className="text-gray-500 text-sm">No skills added yet. Add some above!</p>
                ) : (
                  formData.skills.map((skill, index) => (
                    <Badge
                      key={index}
                      className="bg-blue-100 text-blue-800 flex items-center gap-1 px-2 py-1"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="ml-1 hover:text-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))
                )}
              </div>
            </div>

            <div className="flex items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="visible"
                  checked={formData.visible}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Visible on portfolio
              </label>
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
                {editingCategory ? 'Update' : 'Create'} Category
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Skills Categories List */}
      <div className="space-y-6">
        {skillCategories.length === 0 ? (
          <Card className="p-8 text-center text-gray-500">
            <Code className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No skill categories yet. Create your first one!</p>
          </Card>
        ) : (
          skillCategories.map((category) => {
            const IconComponent = getIconComponent(category.icon);
            return (
              <Card key={category._id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: category.color }}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{category.title}</h3>
                      <p className="text-gray-600 text-sm">{category.description}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className="bg-gray-100 text-gray-700 text-xs">
                          {category.skills?.length || 0} skills
                        </Badge>
                        {category.order > 0 && (
                          <Badge className="bg-blue-100 text-blue-800 text-xs">
                            Order: {category.order}
                          </Badge>
                        )}
                        {!category.visible && (
                          <Badge className="bg-red-100 text-red-800 text-xs">
                            Hidden
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(category)}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(category._id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Technologies & Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {category.skills && category.skills.length > 0 ? (
                      category.skills.map((skill, index) => (
                        <Badge
                          key={index}
                          className="text-xs"
                          style={{ 
                            backgroundColor: `${category.color}20`,
                            color: category.color,
                            borderColor: `${category.color}40`
                          }}
                        >
                          {skill}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">No skills added to this category yet.</p>
                    )}
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};
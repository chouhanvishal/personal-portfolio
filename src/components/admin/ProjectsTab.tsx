import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  ExternalLink, 
  Github, 
  Briefcase,
  Code,
  Calendar,
  CheckCircle,
  AlertCircle,
  Search,
  Filter
} from "lucide-react";

interface ProjectsTabProps {
  data: any;
  onDataUpdate: () => void;
}

const ProjectsTab = ({ data, onDataUpdate }: ProjectsTabProps) => {
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [fetching, setFetching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterActive, setFilterActive] = useState<boolean | null>(null);
  const [errors, setErrors] = useState<any>({});
  const [successMessage, setSuccessMessage] = useState("");

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

  const fetchProjects = async () => {
    setFetching(true);
    try {
      const token = localStorage.getItem('admin_token');
      const userId = 1;
      
      const response = await fetch(`${API_BASE_URL}/api/users/${userId}/projects/`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        
        if (data.results && Array.isArray(data.results)) {
          setProjects(data.results);
        } else if (Array.isArray(data)) {
          setProjects(data);
        } else {
          setProjects([]);
        }
      } else {
        console.error('Error fetching projects:', response.statusText);
        setProjects([]);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjects([]);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const validateForm = () => {
    const newErrors: any = {};
    
    if (!formData.title?.trim()) {
      newErrors.title = "Project title is required";
    }
    
    if (!formData.description?.trim()) {
      newErrors.description = "Project description is required";
    }
    
    if (!formData.role?.trim()) {
      newErrors.role = "Your role is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAdd = () => {
    setIsEditing('new');
    setFormData({
      title: '',
      description: '',
      role: '',
      technologies: '',
      github_url: '',
      project_url: '',
      is_active: true
    });
    setErrors({});
    setSuccessMessage("");
  };

  const handleEdit = (project: any) => {
    setIsEditing(`edit-${project.id}`);
    setFormData({
      id: project.id,
      title: project.title,
      description: project.description,
      role: project.role,
      technologies: Array.isArray(project.technologies) ? project.technologies.join(', ') : project.technologies,
      github_url: project.github_url,
      project_url: project.project_url,
      is_active: project.is_active
    });
    setErrors({});
    setSuccessMessage("");
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const userId = 1;
      const isEditing = formData.id;
      const endpoint = isEditing 
        ? `/api/users/${userId}/projects/${formData.id}/`
        : `/api/users/${userId}/projects/`;
      
      const method = isEditing ? 'PUT' : 'POST';
      
      const submitData = {
        ...formData,
        technologies: formData.technologies ? formData.technologies.split(',').map((tech: string) => tech.trim()) : [],
        is_active: formData.is_active
      };

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${localStorage.getItem('admin_token')}`
        },
        body: JSON.stringify(submitData)
      });

      if (response.ok) {
        await fetchProjects();
        setIsEditing(null);
        setFormData({});
        setSuccessMessage(isEditing ? "Project updated successfully!" : "Project added successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        const errorData = await response.json();
        setErrors({ submit: errorData.message || 'Failed to save project' });
      }
    } catch (error) {
      setErrors({ submit: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (projectId: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    setLoading(true);
    try {
      const userId = 1;
      const response = await fetch(`${API_BASE_URL}/api/users/${userId}/projects/${projectId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Token ${localStorage.getItem('admin_token')}`
        }
      });

      if (response.ok) {
        await fetchProjects();
        setSuccessMessage("Project deleted successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setErrors({ submit: 'Failed to delete project' });
      }
    } catch (error) {
      setErrors({ submit: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(null);
    setFormData({});
    setErrors({});
    setSuccessMessage("");
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.role?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterActive === null || project.is_active === filterActive;
    
    return matchesSearch && matchesFilter;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div 
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        variants={itemVariants}
      >
        <div>
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">Projects</h3>
          <p className="text-gray-600 mt-1">Manage your portfolio projects</p>
        </div>
        <Button
          onClick={handleAdd}
          disabled={isEditing !== null}
          className="w-full sm:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </motion.div>

      {/* Success/Error Messages */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3"
          >
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-800 font-medium">{successMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {errors.submit && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span className="text-red-800 font-medium">{errors.submit}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search and Filter */}
      <motion.div 
        className="flex flex-col sm:flex-row gap-4"
        variants={itemVariants}
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            value={filterActive === null ? 'all' : filterActive.toString()}
            onChange={(e) => setFilterActive(e.target.value === 'all' ? null : e.target.value === 'true')}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Projects</option>
            <option value="true">Active Only</option>
            <option value="false">Inactive Only</option>
          </select>
        </div>
      </motion.div>

      {/* Projects Grid */}
      {fetching ? (
        <motion.div 
          className="flex items-center justify-center h-64"
          variants={itemVariants}
        >
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading projects...</p>
          </div>
        </motion.div>
      ) : filteredProjects.length === 0 ? (
        <motion.div 
          className="text-center py-12"
          variants={itemVariants}
        >
          <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">No projects found</h4>
          <p className="text-gray-500 mb-4">
            {searchTerm || filterActive !== null 
              ? "Try adjusting your search or filter criteria"
              : "Get started by adding your first project"
            }
          </p>
          {!searchTerm && filterActive === null && (
            <Button onClick={handleAdd}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Project
            </Button>
          )}
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="group"
            >
              <Card className="p-6 h-full border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {project.title}
                    </h4>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <Code className="w-4 h-4" />
                      <span>{project.role}</span>
                    </div>
                  </div>
                  <Badge 
                    variant={project.is_active ? "default" : "secondary"}
                    className={`${project.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}
                  >
                    {project.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>
                
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech: string, techIndex: number) => (
                      <Badge key={techIndex} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.technologies.length - 3} more
                      </Badge>
                    )}
                  </div>
                )}
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                  <div className="flex gap-2">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.project_url && (
                      <a
                        href={project.project_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(project)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(project.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Edit/Add Form Modal */}
      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={handleCancel}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900">
                  {isEditing === 'new' ? 'Add New Project' : 'Edit Project'}
                </h3>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Project Title <span className="text-red-500">*</span>
                    </label>
                    <Input
                      value={formData.title || ''}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className={errors.title ? 'border-red-500' : ''}
                      placeholder="Enter project title"
                    />
                    {errors.title && (
                      <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Your Role <span className="text-red-500">*</span>
                    </label>
                    <Input
                      value={formData.role || ''}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                      className={errors.role ? 'border-red-500' : ''}
                      placeholder="e.g., Full Stack Developer"
                    />
                    {errors.role && (
                      <p className="text-red-500 text-sm mt-1">{errors.role}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    value={formData.description || ''}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className={errors.description ? 'border-red-500' : ''}
                    placeholder="Describe your project..."
                    rows={4}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Technologies
                  </label>
                  <Input
                    value={formData.technologies || ''}
                    onChange={(e) => setFormData({...formData, technologies: e.target.value})}
                    placeholder="React, Node.js, Python (comma separated)"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      GitHub URL
                    </label>
                    <Input
                      value={formData.github_url || ''}
                      onChange={(e) => setFormData({...formData, github_url: e.target.value})}
                      placeholder="https://github.com/..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Live URL
                    </label>
                    <Input
                      value={formData.project_url || ''}
                      onChange={(e) => setFormData({...formData, project_url: e.target.value})}
                      placeholder="https://..."
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={formData.is_active}
                      onCheckedChange={(checked) => setFormData({...formData, is_active: checked})}
                    />
                    <label className="text-sm font-medium text-gray-700">
                      Active Project
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t border-gray-200 flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={handleSubmit} 
                  disabled={loading}
                  className="flex-1 sm:flex-none"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? 'Saving...' : 'Save Project'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleCancel}
                  className="flex-1 sm:flex-none"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProjectsTab; 
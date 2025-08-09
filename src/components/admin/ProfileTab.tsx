import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Edit, Save, X, User, Mail, MapPin, Calendar, CheckCircle, AlertCircle, Upload, Camera } from "lucide-react";

interface ProfileTabProps {
  data: any;
  onDataUpdate: () => void;
}

const ProfileTab = ({ data, onDataUpdate }: ProfileTabProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

  const validateForm = () => {
    const newErrors: any = {};
    
    if (!formData.first_name?.trim()) {
      newErrors.first_name = "First name is required";
    }
    
    if (!formData.last_name?.trim()) {
      newErrors.last_name = "Last name is required";
    }
    
    if (!formData.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEdit = () => {
    setIsEditing(true);
    setErrors({});
    setSuccessMessage("");
    setFormData({
      first_name: data.user?.first_name || '',
      last_name: data.user?.last_name || '',
      email: data.user?.email || '',
      bio: data.user?.bio || ''
    });
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/profile/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${localStorage.getItem('admin_token')}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        await onDataUpdate();
        setIsEditing(false);
        setFormData({});
        setSuccessMessage("Profile updated successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        const errorData = await response.json();
        setErrors({ submit: errorData.message || 'Failed to update profile' });
      }
    } catch (error) {
      setErrors({ submit: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({});
    setErrors({});
    setSuccessMessage("");
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ photo: 'File size must be less than 5MB' });
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        setErrors({ photo: 'Please select an image file' });
        return;
      }
      
      setSelectedFile(file);
      setErrors({ photo: '' });
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoUpload = async () => {
    if (!selectedFile) return;

    setUploadingPhoto(true);
    try {
      const formData = new FormData();
      formData.append('profile_photo', selectedFile);

      const response = await fetch(`${API_BASE_URL}/api/users/1/profile/photo/`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Token ${localStorage.getItem('admin_token')}`
        },
        body: formData
      });

      if (response.ok) {
        await onDataUpdate();
        setSelectedFile(null);
        setPreviewUrl(null);
        setSuccessMessage("Profile photo updated successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        const errorData = await response.json();
        setErrors({ photo: errorData.error || 'Failed to upload photo' });
      }
    } catch (error) {
      setErrors({ photo: 'Network error. Please try again.' });
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleCancelPhoto = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setErrors({ photo: '' });
  };

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
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">Profile Information</h3>
          <p className="text-gray-600 mt-1">Manage your personal information and bio</p>
        </div>
        <Button
          onClick={handleEdit}
          disabled={isEditing}
          className="w-full sm:w-auto"
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>
      </motion.div>

      {/* Success Message */}
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

      {/* Error Message */}
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

      {/* Profile Photo Section */}
      <motion.div variants={itemVariants}>
        <Card className="p-6 lg:p-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900">Profile Photo</h4>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* Current Photo */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-4 border-gray-200">
                {data.user?.profile_photo ? (
                  <img 
                    src={`${API_BASE_URL}${data.user.profile_photo}`} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-400">
                    <User className="w-12 h-12 text-gray-600" />
                  </div>
                )}
              </div>
            </div>
            
            {/* Upload Section */}
            <div className="flex-1 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Upload New Photo
                </label>
                <div className="flex items-center gap-3">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="flex-1"
                  />
                  {selectedFile && (
                    <Button
                      onClick={handlePhotoUpload}
                      disabled={uploadingPhoto}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {uploadingPhoto ? 'Uploading...' : 'Upload'}
                    </Button>
                  )}
                </div>
                {errors.photo && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.photo}
                  </p>
                )}
              </div>
              
              {/* Preview */}
              {previewUrl && (
                <div className="space-y-3">
                  <p className="text-sm font-medium text-gray-700">Preview:</p>
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300">
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleCancelPhoto}
                    size="sm"
                  >
                    <X className="w-3 h-3 mr-1" />
                    Cancel
                  </Button>
                </div>
              )}
              
              <div className="text-sm text-gray-500">
                <p>• Supported formats: JPG, PNG, GIF</p>
                <p>• Maximum file size: 5MB</p>
                <p>• Recommended size: 400x400 pixels</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {isEditing ? (
        <motion.div variants={itemVariants}>
          <Card className="p-6 lg:p-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={formData.first_name || ''}
                    onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                    className={`${errors.first_name ? 'border-red-500 focus:border-red-500' : ''}`}
                    placeholder="Enter your first name"
                  />
                  {errors.first_name && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.first_name}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={formData.last_name || ''}
                    onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                    className={`${errors.last_name ? 'border-red-500 focus:border-red-500' : ''}`}
                    placeholder="Enter your last name"
                  />
                  {errors.last_name && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.last_name}
                    </p>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Email <span className="text-red-500">*</span>
                </label>
                <Input
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className={`${errors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.email}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Bio
                </label>
                <Textarea
                  value={formData.bio || ''}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  placeholder="Tell us about yourself..."
                  rows={4}
                  className="resize-none"
                />
                <p className="text-gray-500 text-sm mt-1">
                  {formData.bio?.length || 0}/500 characters
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button 
                  onClick={handleSubmit} 
                  disabled={loading}
                  className="flex-1 sm:flex-none"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? 'Saving...' : 'Save Changes'}
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
            </div>
          </Card>
        </motion.div>
      ) : (
        <motion.div variants={itemVariants}>
          <Card className="p-6 lg:p-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900">Personal Information</h4>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <User className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-medium text-gray-900">
                        {data.user?.first_name && data.user?.last_name 
                          ? `${data.user.first_name} ${data.user.last_name}`
                          : 'Not set'
                        }
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-gray-900">{data.user?.email || 'Not set'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900">About Me</h4>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700 leading-relaxed">
                    {data.user?.bio || 'No bio available. Click "Edit Profile" to add your bio.'}
                  </p>
                </div>
                
                {data.user?.bio && (
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Bio Updated
                    </Badge>
                    <span className="text-sm text-gray-500">
                      {data.user.bio.length} characters
                    </span>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProfileTab; 
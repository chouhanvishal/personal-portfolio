import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";
import { ButtonLoadingAnimation, AdminLoadingAnimation } from "@/components/ui/loading";

interface SkillsTabProps {
  data: any;
  onDataUpdate: () => void;
}

const SkillsTab = ({ data, onDataUpdate }: SkillsTabProps) => {
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState<any[]>([]);
  const [fetching, setFetching] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

  const fetchSkills = async () => {
    setFetching(true);
    try {
      const token = localStorage.getItem('admin_token');
      const userId = 1;
      
      const response = await fetch(`${API_BASE_URL}/api/users/${userId}/skills/`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Skills API response:', data);
        
        // Handle paginated response structure
        if (data.results && Array.isArray(data.results)) {
          // Transform the data structure to match our UI expectations
          const transformedSkills = data.results.flatMap((skillGroup: any) => 
            skillGroup.skills_list.map((skillName: string) => ({
              id: `${skillGroup.id}-${skillName}`,
              name: skillName,
              category: skillGroup.category.name,
              proficiency_level: 85, // Default value, you can adjust
              skill_group_id: skillGroup.id
            }))
          );
          setSkills(transformedSkills);
        } else if (Array.isArray(data)) {
          setSkills(data);
        } else {
          setSkills([]);
        }
      } else {
        console.error('Error fetching skills:', response.statusText);
        setSkills([]);
      }
    } catch (error) {
      console.error('Error fetching skills:', error);
      setSkills([]);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleAdd = () => {
    setIsEditing('new');
    setFormData({});
  };

  const handleEdit = (skill: any) => {
    setIsEditing(`edit-${skill.id}`);
    setFormData({
      id: skill.id,
      name: skill.name,
      category: skill.category,
      proficiency_level: skill.proficiency_level
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const userId = 1;
      const isEditing = formData.id;
      
      // For the current API structure, we need to handle skill groups
      // This is a simplified approach - you might need to adjust based on your backend
      const endpoint = isEditing 
        ? `/api/users/${userId}/skills/${formData.skill_group_id}/`
        : `/api/users/${userId}/skills/`;
      
      const method = isEditing ? 'PUT' : 'POST';

      // Transform form data to match API expectations
      const submitData = {
        category: formData.category,
        skills_list: [formData.name] // For now, adding one skill at a time
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
        await fetchSkills();
        setIsEditing(null);
        setFormData({});
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (skillId: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;
    
    setLoading(true);
    try {
      const userId = 1;
      // Extract skill group ID from the composite ID
      const skillGroupId = skillId.split('-')[0];
      
      const response = await fetch(`${API_BASE_URL}/api/users/${userId}/skills/${skillGroupId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Token ${localStorage.getItem('admin_token')}`
        }
      });

      if (response.ok) {
        await fetchSkills();
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(null);
    setFormData({});
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold">Skills</h3>
          <p className="text-sm text-gray-500 mt-1">Skills are organized by categories</p>
        </div>
        <Button onClick={handleAdd} disabled={isEditing !== null}>
          <Plus className="w-4 h-4 mr-2" />
          Add Skill Group
        </Button>
      </div>

      {isEditing && (
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Category Name</label>
              <Input
                value={formData.category || ''}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                placeholder="e.g., Frontend Development"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Skill Name</label>
              <Input
                value={formData.name || ''}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="e.g., React"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Proficiency Level (1-100)</label>
              <Input
                type="number"
                min="1"
                max="100"
                value={formData.proficiency_level || 85}
                onChange={(e) => setFormData({...formData, proficiency_level: parseInt(e.target.value)})}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSubmit} disabled={loading}>
                {loading ? (
                  <ButtonLoadingAnimation message="Saving..." />
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {fetching ? (
        <div className="flex items-center justify-center h-32">
          <AdminLoadingAnimation />
          <p className="text-gray-600 ml-4">Loading skills...</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {skills.length > 0 ? (
            skills.map((skill: any) => (
            <Card key={skill.id} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{skill.name}</h4>
                  <p className="text-sm text-gray-600">{skill.category}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${skill.proficiency_level}%` }}
                      ></div>
                    </div>
                    <span className="text-sm">{skill.proficiency_level}%</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(skill)}
                    disabled={isEditing !== null}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(skill.id)}
                    disabled={loading}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
                      ))
          ) : (
            <Card className="p-6 text-center">
              <p className="text-gray-500">No skills found. Add your first skill!</p>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default SkillsTab; 
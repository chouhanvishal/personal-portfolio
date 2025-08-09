import { apiService } from '@/services/api';

export const testApiConnection = async () => {
  try {
    console.log('Testing API connection...');
    
    const profile = await apiService.getProfile();
    console.log('✅ Profile data loaded:', profile);
    
    console.log('✅ User:', profile.user.username);
    console.log('✅ Social links:', profile.social_links.length, 'links');
    console.log('✅ Projects:', profile.projects.length, 'projects');
    console.log('✅ Skills:', profile.skills.length, 'skill categories');
    console.log('✅ Work experience:', profile.work_experience.length, 'positions');
    
    return true;
  } catch (error) {
    console.error('❌ API connection failed:', error);
    return false;
  }
}; 
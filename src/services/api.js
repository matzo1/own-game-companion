const API_BASE_URL = 'http://localhost:5173/api';

export const fetchContent = async (contentId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/contenido/${contentId}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Content not found');
      }
      throw new Error('Failed to fetch content');
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || 'Network error');
  }
};
// services/api.js
import { CONTENT_CONFIG } from '../config/storage';

export const fetchContent = async (qrId) => {
  try {
    // Si usas archivos locales
    const response = await fetch(`${CONTENT_CONFIG.BASE_URL}/contenido/${qrId}`);
    
    // O si tienes un backend
    // const response = await fetch(`/api/contenido/${qrId}`);
    
    if (!response.ok) {
      throw new Error('Contenido no encontrado');
    }
    
    return response;
  } catch (error) {
    console.error('Error fetching content:', error);
    throw error;
  }
};

// Función helper para determinar el tipo de contenido
export const getContentType = (filename) => {
  const extension = filename.split('.').pop().toLowerCase();
  
  if (CONTENT_CONFIG.TYPES.IMAGE.includes(extension)) return 'image';
  if (CONTENT_CONFIG.TYPES.VIDEO.includes(extension)) return 'video';
  return 'unknown';
};
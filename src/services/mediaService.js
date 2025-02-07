
import { CONTENT_CONFIG, MEDIA_DB } from '../config/storage';


export const fetchMediaById = async (id) => {
    return new Promise((resolve, reject) => {
      // Simula un pequeño delay para emular una petición real
      setTimeout(() => {
        const mediaItem = MEDIA_DB[id];
        
        if (!mediaItem) {
          reject(new Error(`No se encontró contenido para el ID: ${id}`));
          return;
        }
  
        // Construye la URL completa del archivo
        const mediaPath = `${CONTENT_CONFIG.BASE_URL}${CONTENT_CONFIG.PATHS[mediaItem.type]}/${mediaItem.filename}`;
        
        resolve({
          ...mediaItem,
          url: mediaPath,
          id: id
        });
      }, 100);
    });
  };

  /**
 * Verifica si un archivo es del tipo especificado
 * @param {string} filename - Nombre del archivo
 * @param {string} type - Tipo de archivo ('image' o 'video')
 * @returns {boolean}
 */
export const isValidFileType = (filename, type) => {
    const extension = filename.toLowerCase().match(/\.[^.]*$/)?.[0];
    return CONTENT_CONFIG.TYPES[type].includes(extension);
  };
  
  /**
   * Obtiene la extensión de un archivo
   * @param {string} filename - Nombre del archivo
   * @returns {string} Extensión del archivo
   */
  export const getFileExtension = (filename) => {
    return filename.toLowerCase().match(/\.[^.]*$/)?.[0] || '';
  };
  
  /**
   * Maneja errores comunes
   * @param {Error} error - Error a manejar
   * @returns {Object} Objeto con mensaje de error formateado
   */
  export const handleMediaError = (error) => {
    let message = 'Error desconocido al cargar el contenido';
    let status = 500;
  
    if (error.message.includes('No se encontró')) {
      status = 404;
      message = error.message;
    } else if (error.message.includes('tipo no válido')) {
      status = 400;
      message = 'Formato de archivo no soportado';
    }
  
    return {
      error: true,
      message,
      status
    };
  };
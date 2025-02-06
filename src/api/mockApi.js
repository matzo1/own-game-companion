// src/api/mockApi.js
const contenido = {
    '7392521': { type: 'image', content: '/public/contenido/images/7392521.jpg' },
    '7686082': { type: 'image', content: '/public/contenido/images/7686082.jpg' },
    '9285000': { type: 'image', content: '/public/contenido/images/9285000.jpg' },
    '2': { type: 'video', content: '/contenido/videos/video1.mp4' },
    '3': { type: 'audio', content: '/contenido/audio/audio1.mp3' },
  };
  
  export const fetchContenido = async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (contenido[id]) {
          resolve(contenido[id]);
        } else {
          reject(new Error('Contenido no encontrado'));
        }
      }, 500); // Simula un retardo de red
    });
  };
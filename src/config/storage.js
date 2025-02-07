// config/storage.js
export const CONTENT_CONFIG = {
    BASE_URL: '/contenido',
    //BASE_URL: '/src/assets/contenido',
    PATHS: {
      image: '/images',
      video: '/videos'
    },
    TYPES: {
      IMAGE: ['jpg', 'jpeg', 'png', 'webp'],
      VIDEO: ['mp4', 'webm']
    }
  };


  
export const MEDIA_DB = {
    '7392521': {
      type: 'image',
      filename: '7392521.jpg',
      title: 'Imagen 1',
      descripcion: 'Esta es la descripción de la imagen 1'
    },
    '7686082': {
      type: 'image',
      filename: '7686082.jpg',
      title: 'Imagen 2',
      descripcion: 'Esta es la descripción de la imagen 2'
    },
    '9285000': {
      type: 'image',
      filename: '9285000.jpg',
      title: 'Imagen 3',
      descripcion: 'Esta es la descripción de la imagen 3'
    },
    '164386': {
      type: 'video',
      filename: '164386.mp4',
      title: 'Video 1',
      descripcion: 'Esta es la descripción del video 1'
    }
    // Puedes agregar más elementos según necesites
  };
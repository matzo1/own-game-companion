import { useEffect, useState } from 'react';
import { getContentType } from '../services/api';

const ContentViewer = ({ contentUrl }) => {
  const [content, setContent] = useState(null);
  const contentType = getContentType(contentUrl);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch(contentUrl);
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        setContent(objectUrl);
      } catch (error) {
        console.error('Error loading content:', error);
      }
    };

    loadContent();
  }, [contentUrl]);

  if (!content) return <div>Cargando...</div>;

  return (
    <div className="w-full h-full flex justify-center items-center">
      {contentType === 'video' ? (
        <video
          controls
          src={content}
          className="max-w-full max-h-full" // Ajustar altura máxima al contenedor
          playsInline
        />
      ) : (
        <img
          src={content}
          alt="QR Content"
          className="max-w-full max-h-full object-contain" // Ajustar altura máxima al contenedor y mantener aspect ratio
          loading="lazy"
        />
      )}
    </div>
  );
};

export default ContentViewer;
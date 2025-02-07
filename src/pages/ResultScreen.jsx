import { useLocation } from 'react-router-dom';
import ContentViewer from '../components/ContentViewer';
import { Link } from 'react-router-dom';

const ResultScreen = () => {
  const location = useLocation();
  const { content } = location.state;

  return (
    <div className="min-h-screen flex flex-col bg-gray-200 p-4 md:p-6 lg:p-8 overflow-hidden"> {/* overflow-hidden añadido */}
      {/* Título */}
      <div className="text-center mb-6 md:mb-8 lg:mb-10">
        <h1 className="text-3xl font-bold text-gray-800 break-words">{content.title}</h1> {/* break-words añadido */}
      </div>

      {/* Contenido */}
      <div className="mb-6 md:mb-8 lg:mb-10">
        <ContentViewer
          contentUrl={content.url}
          contentType={content.type}
        />
      </div>

      {/* Descripción */}
      <div className="mb-8 md:mb-10 lg:mb-12">
        <p className="text-lg text-gray-700 break-words">{content.descripcion}</p> {/* break-words añadido */}
      </div>

      {/* Botón de regreso */}
      <div className="text-center">
        <Link to="/qr-scanner" className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
          Volver
        </Link>
      </div>
    </div>
  );
};

export default ResultScreen;
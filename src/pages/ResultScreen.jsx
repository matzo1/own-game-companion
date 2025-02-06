import { useLocation } from 'react-router-dom';

const ResultScreen = () => {
  const location = useLocation();
  const result = location.state?.result;

  const renderContent = () => {
    if (!result) return null;

    switch (result.type) {
      case 'image':
        return <img src={result.content} alt="Contenido QR" className="max-w-full h-auto" />;
      case 'video':
        return (
          <video controls className="max-w-full">
            <source src={result.content} type="video/mp4" />
            Tu navegador no soporta videos HTML5
          </video>
        );
      case 'audio':
        return (
          <audio controls className="w-full">
            <source src={result.content} type="audio/mpeg" />
            Tu navegador no soporta audio HTML5
          </audio>
        );
      default:
        return <p className="text-gray-800">{result.content}</p>;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Resultado del escaneo</h1>
        <div className="mt-4 flex justify-center">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;
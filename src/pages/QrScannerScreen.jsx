import QrScanner from "react-qr-scanner";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchContent } from '../services/api';

const QrScannerScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const navigate = useNavigate();

  const handleScan = async (data) => {
    if (data && !isLoading) {
        console.log(data);
      setIsLoading(true);
      setFetchError(null);

      try {
        const qrId = data.text; // Asume que el QR contiene un ID
        const response = await fetchContent(qrId);
        console.log('response', response);
        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }

        const result = await response.json();
        navigate('/resultado', { state: { result } });
      } catch (error) {
        setFetchError(error.message || 'Error al procesar el código QR');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-gray-800">Escáner QR</h1>
      <p className="text-gray-600 mt-2">Escanea un código QR para obtener la información.</p>

      <div className="mt-6 bg-white shadow-lg p-4 rounded-lg">
        <QrScanner
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: 300, height: 300 }}
        />
      </div>

      {isLoading && (
        <div className="mt-4 text-blue-600">
          Procesando código QR...
        </div>
      )}

      {fetchError && (
        <div className="mt-4 bg-red-100 text-red-700 p-2 rounded">
          Error: {fetchError}
        </div>
      )}
    </div>
  );
};

export default QrScannerScreen;
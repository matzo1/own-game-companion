import { Link } from "react-router-dom";

const Home = () => {
    return(
    <div className="flex flex-col items-center justify-center h-screen bg-gray-300 p-4">

        <span className="text-2xl font-bold">Bienvenido</span>

        <Link to="/qr-scanner" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Ir al Escáner QR</Link>
    </div>
    
    );


  };
  
  export default Home;
  
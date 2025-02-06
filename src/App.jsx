import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import QrScannerScreen from "./pages/QrScannerScreen";
import ResultScreen from "./pages/ResultScreen";

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/qr-scanner" element={<QrScannerScreen />} />
          <Route path="/resultado" element={<ResultScreen />} />
        </Routes>
    </Router>
  );
};

export default App;

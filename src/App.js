import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import Report from "./pages/Report";
import UploadPDF from "./pages/UploadPDF";
import Chatbot from "./pages/Chatbot";
import { ReportProvider } from "./contexts/ReportContext";

function App() {
  return (
    <ReportProvider>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/upload" replace />} />
            <Route path="/upload" element={<UploadPDF />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/report" element={<Report />} />
            <Route path="/chatbot" element={<Chatbot />} />
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/upload" replace />} />
          </Routes>
        </MainLayout>
      </Router>
    </ReportProvider>
  );
}

export default App;

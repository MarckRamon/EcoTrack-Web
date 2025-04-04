import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import ForgotPassword from './ForgotPassword';
import SetNewPassword from './SetNewPassword';
import EditProfile from './EditProfile';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin/set-new-password" element={<SetNewPassword />} />
        <Route path="/admin/profile" element={<EditProfile />} />
      </Routes>
    </Router>
  );
}

export default App;

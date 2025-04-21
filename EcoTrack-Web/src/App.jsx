import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import ForgotPassword from './ForgotPassword';
import SetNewPassword from './SetNewPassword';
import EditProfile from './EditProfile';
import Users from './Users';
import JobOrderRequest from './JobOrderRequest';
import CollectionPoints from './CollectionPoints';
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
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/job-orders" element={<JobOrderRequest />} />
        <Route path="/admin/collection-points" element={<CollectionPoints />} />
      </Routes>
    </Router>
  );
}

export default App;

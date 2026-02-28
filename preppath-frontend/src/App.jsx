import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/useAuth';
import { HelmetProvider } from 'react-helmet-async';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import GitHubCallback from './pages/GitHubCallback';
import Dashboard from './pages/Dashboard';
import Applications from './pages/Applications';
import ApplicationDetail from './pages/ApplicationDetail';
import Companies from './pages/Companies';
import Questions from './pages/Questions';
import Landing from './pages/Landing';
import Pricing from './pages/Pricing';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentCancel from './pages/PaymentCancel';
import SubscriptionDashboard from './pages/SubscriptionDashboard';
import AppLayout from './components/AppLayout';
import ToastContainer from './components/ToastContainer';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Public Route Component (redirect to dashboard if already logged in)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return !isAuthenticated ? children : <Navigate to="/dashboard" />;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<Landing />} />

      {/* Public Routes */}
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
      <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/auth/github/callback" element={<GitHubCallback />} />

      {/* Protected Routes */}
      <Route path="/dashboard" element={<ProtectedRoute><AppLayout><Dashboard /></AppLayout></ProtectedRoute>} />
      <Route path="/applications" element={<ProtectedRoute><AppLayout><Applications /></AppLayout></ProtectedRoute>} />
      <Route path="/applications/:id" element={<ProtectedRoute><AppLayout><ApplicationDetail /></AppLayout></ProtectedRoute>} />
      <Route path="/companies" element={<ProtectedRoute><AppLayout><Companies /></AppLayout></ProtectedRoute>} />
      <Route path="/questions" element={<ProtectedRoute><AppLayout><Questions /></AppLayout></ProtectedRoute>} />
      <Route path="/pricing" element={<ProtectedRoute><AppLayout><Pricing /></AppLayout></ProtectedRoute>} />
      <Route path="/subscription" element={<ProtectedRoute><AppLayout><SubscriptionDashboard /></AppLayout></ProtectedRoute>} />

      <Route path="/payment/success" element={<PaymentSuccess />} />
      <Route path="/payment/cancel" element={<PaymentCancel />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsOfService />} />

      {/* 404 - Not Found */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const content = (
    <HelmetProvider>
      <Router>
        <AuthProvider>
          <AppRoutes />
          <ToastContainer />
        </AuthProvider>
      </Router>
    </HelmetProvider>
  );

  return googleClientId
    ? <GoogleOAuthProvider clientId={googleClientId}>{content}</GoogleOAuthProvider>
    : content;
}

export default App;

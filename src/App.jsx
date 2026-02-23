import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import FrozenItems from './pages/FrozenItems';
import AboutUs from './pages/AboutUs';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import { useAuth } from './context/AuthContext';
import SplashScreen from './components/SplashScreen';

const ProtectedRoute = ({ children, isAdminRequired = false }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="pt-40 text-center font-black">Loading...</div>;

  if (!user) {
    return <Login />;
  }

  if (isAdminRequired && user.role !== 'admin') {
    return <div className="pt-40 text-center font-black">Access Denied</div>;
  }

  return children;
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/frozen-items" element={<FrozenItems />} />
          <Route path="/frozen-items/:category" element={<FrozenItems />} />
          <Route path="/fresh-meals" element={<div className="pt-40 pb-20 text-center text-4xl font-black">Fresh Meals Coming Soon!</div>} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order-success"
            element={
              <ProtectedRoute>
                <OrderSuccess />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute isAdminRequired={true}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <AnimatePresence>
            {showSplash && (
              <SplashScreen finishLoading={() => setShowSplash(false)} />
            )}
          </AnimatePresence>

          <div className={`min-h-screen bg-black text-white selection:bg-white/20 flex flex-col transition-opacity duration-1000 ${showSplash ? 'opacity-0' : 'opacity-100'}`}>
            {!showSplash && (
              <>
                <Navbar />
                <main className="flex-grow">
                  <AnimatedRoutes />
                </main>
                <Footer />
              </>
            )}
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

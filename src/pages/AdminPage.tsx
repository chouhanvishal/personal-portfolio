import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdminPanel from "@/components/admin/AdminPanel";
import AdminLogin from "@/components/AdminLogin";

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('admin_token');
      if (token) {
        setIsAuthenticated(true);
      } else {
        setShowLogin(true);
      }
    };

    checkAuth();
  }, []);

  const handleLogin = (token: string) => {
    setIsAuthenticated(true);
    setShowLogin(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setIsAuthenticated(false);
    setShowLogin(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AnimatePresence mode="wait">
        {showLogin ? (
          <div>
            <AdminLogin onLogin={handleLogin} />
          </div>
        ) : (
          <div>
            <AdminPanel 
              isOpen={true} 
              onClose={handleLogout} 
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPage; 
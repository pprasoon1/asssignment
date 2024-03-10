import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './Auth/Register';
import Dashboard from './pages/Dashboard';
import { useAuth } from './contexts/AuthContext';

const App = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Route for Register */}
        <Route
          path="/"
          element={isAuthenticated ? <Dashboard /> : <Register />}
        />

        {/* Route for Dashboard */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
          }
        />

        {/* Route for Logout */}
        <Route
          path="/logout"
          element={<Logout />}
        />
      </Routes>
    </Router>
  );
};

const Logout = () => {
  const { logout } = useAuth();

  // Call the logout function when this component mounts
  // You may also redirect the user to another page after logout
  useEffect(() => {
    logout();
  }, [logout]);

  return <Navigate to="/" />;
};

export default App;

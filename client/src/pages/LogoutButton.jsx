// LogoutButton.jsx

import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/logout', { // Update the URL to the correct backend endpoint
        method: 'POST',
        credentials: 'include', // Include cookies in the request
      });

      if (response.ok) {
        // Logout successful, redirect to the login page or do other necessary actions
        navigate('/login'); // Redirect to the login page
      } else {
        console.error('Failed to logout:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to logout:', error.message);
    }
  };

  return (
    <Button type="primary" danger onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;

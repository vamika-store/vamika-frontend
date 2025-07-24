import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { saveToken } from '../utils/jwt-helper';

const OAuth2LoginCallback = () => {

    const navigate = useNavigate();
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');

        if (token) {
            saveToken(token); // Save the token using your utility function
            navigate('/'); // Redirect to home or any other page after successful login
        }
        else {
            // Handle error case, e.g., show an error message or redirect to login
            console.error('Login failed, token not found');
            navigate('/api/auth/login'); // Redirect to login page
        }
    }, [navigate]);
  return (
    <div>
    </div>
  )
}

export default OAuth2LoginCallback

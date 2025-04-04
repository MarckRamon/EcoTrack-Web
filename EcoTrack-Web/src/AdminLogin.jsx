import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Link,
} from '@mui/material';
import api from './api/axios';
import './AdminLogin.css';

// Function to decode JWT token
const decodeToken = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

const AdminLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    emailOrPhone: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/users/login', {
        email: credentials.emailOrPhone,
        password: credentials.password
      });

      console.log('Login response:', response.data);

      const { token } = response.data;
      
      if (!token) {
        throw new Error('No token received from server');
      }

      // Decode the token to get user information
      const decodedToken = decodeToken(token);
      console.log('Decoded token:', decodedToken);

      if (!decodedToken) {
        throw new Error('Invalid token received');
      }

      // Extract role from decoded token
      const userRole = decodedToken.role;
      console.log('User role from token:', userRole);
      
      // Case-insensitive role check
      if (userRole && typeof userRole === 'string' && userRole.toLowerCase() === 'admin') {
        // Store the authentication token and user info
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify({
          email: credentials.emailOrPhone,
          role: userRole
        }));
        
        navigate('/admin/dashboard');
      } else {
        console.log('Role check failed. Received role:', userRole);
        setError('Access denied. Only administrators are allowed to login.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box 
      className="login-container"
      sx={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url("/loginbg.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(70%)',
          zIndex: 0,
        }}
      />
      <Container 
        maxWidth="xs" 
        sx={{ 
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            bgcolor: 'white',
            borderRadius: '24px',
            p: '24px',
            width: '100%',
            maxWidth: '360px',
            textAlign: 'center',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          }}
        >
          <Box sx={{ mb: 2.5 }}>
            <img 
              src="/loginlogo.jpg" 
              alt="GrabTrash Logo" 
              style={{ 
                height: '80px',
                objectFit: 'contain',
                marginBottom: '12px'
              }} 
            />
            <Typography variant="h4" sx={{ 
              fontWeight: 600, 
              color: '#333',
              mb: 0.5,
              fontSize: '26px',
            }}>
              Welcome back
            </Typography>
            <Typography sx={{ 
              color: '#6B7280',
              fontSize: '14px',
            }}>
              We're so excited to see you again!
            </Typography>
          </Box>

          {error && (
            <Typography 
              sx={{ 
                color: '#DC2626',
                fontSize: '14px',
                mb: 2,
                textAlign: 'left'
              }}
            >
              {error}
            </Typography>
          )}

          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 2 }}>
              <Typography 
                sx={{ 
                  textAlign: 'left', 
                  mb: 0.5,
                  fontSize: '13px',
                  color: '#374151',
                }}
              >
                Email or phone number
              </Typography>
              <TextField
                fullWidth
                name="emailOrPhone"
                value={credentials.emailOrPhone}
                onChange={handleChange}
                variant="outlined"
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    bgcolor: 'white',
                  }
                }}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography 
                sx={{ 
                  textAlign: 'left', 
                  mb: 0.5,
                  fontSize: '13px',
                  color: '#374151',
                }}
              >
                Password
              </Typography>
              <TextField
                fullWidth
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                variant="outlined"
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    bgcolor: 'white',
                  }
                }}
              />
            </Box>

            <Link
              component={RouterLink}
              to="/admin/forgot-password"
              sx={{
                display: 'block',
                textAlign: 'left',
                mb: 2,
                color: '#111827',
                textDecoration: 'none',
                fontSize: '13px',
                '&:hover': {
                  textDecoration: 'underline',
                }
              }}
            >
              Forget your password
            </Link>

            <Button
              type="submit"
              fullWidth
              disabled={loading}
              sx={{
                bgcolor: '#4CAF50',
                color: 'white',
                py: 1.25,
                textTransform: 'none',
                fontSize: '15px',
                fontWeight: 500,
                borderRadius: '8px',
                mb: 1.5,
                '&:hover': {
                  bgcolor: '#43A047',
                }
              }}
            >
              {loading ? 'Logging in...' : 'Log in'}
            </Button>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default AdminLogin; 
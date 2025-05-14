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
        email: credentials.emailOrPhone.trim(),
        password: credentials.password
      });

      const { token } = response.data;
      
      if (!token) {
        throw new Error('No token received from server');
      }

      // Store the token immediately
      localStorage.setItem('token', token);

      // Decode the token to get user information
      const decodedToken = decodeToken(token);

      if (!decodedToken) {
        throw new Error('Invalid token received');
      }

      // Extract role from decoded token
      const userRole = decodedToken.role;
      
      if (userRole) {
        const normalizedRole = userRole.toLowerCase().trim();
        
        if (normalizedRole === 'admin' || 
            normalizedRole === 'administrator' || 
            normalizedRole === 'superadmin') {
          // Store user info
          localStorage.setItem('user', JSON.stringify({
            email: credentials.emailOrPhone.trim(),
            role: normalizedRole
          }));
          
          // Also store token for Firestore access
          localStorage.setItem('firestoreAuthToken', token);
          
          navigate('/dashboard');
        } else {
          setError('Access denied. Only administrators are allowed to login.');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          localStorage.removeItem('firestoreAuthToken');
        }
      } else {
        setError('Access denied. No role found in token.');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('firestoreAuthToken');
      }
    } catch (error) {
      if (error.response?.status === 403) {
        setError('Access denied. Please check your credentials and permissions.');
      } else if (error.response?.status === 401) {
        setError('Invalid email or password. Please check your credentials.');
      } else {
        setError('Unable to connect to the server. Please try again.');
      }
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('firestoreAuthToken');
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
              to="/forgot-password"
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
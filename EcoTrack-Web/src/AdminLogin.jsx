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
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import './AdminLogin.css';

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
      await signInWithEmailAndPassword(auth, credentials.emailOrPhone, credentials.password);
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error:', error);
      setError(
        error.code === 'auth/invalid-credential'
          ? 'Invalid email or password'
          : 'Failed to log in'
      );
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

            <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid #E5E7EB' }}>
              <Typography sx={{ 
                color: '#6B7280',
                fontSize: '14px',
                mb: 2,
              }}>
                Or login with
              </Typography>
              <Button
                fullWidth
                variant="outlined"
                startIcon={
                  <img 
                    src="https://www.google.com/favicon.ico" 
                    alt="Google" 
                    style={{ width: 18, height: 18 }} 
                  />
                }
                sx={{
                  color: '#374151',
                  borderColor: '#E5E7EB',
                  textTransform: 'none',
                  fontSize: '14px',
                  py: 1,
                  '&:hover': {
                    borderColor: '#D1D5DB',
                    bgcolor: '#F9FAFB',
                  }
                }}
              >
                Continue with Google
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default AdminLogin; 
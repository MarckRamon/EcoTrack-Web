import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';
import api from './api/axios';

const EditProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/admin/login');
          return;
        }

        // Get user data from localStorage as fallback
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        setFormData({
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          email: userData.email || '',
        });

      } catch (error) {
        console.error('Error fetching user data:', error);
        setSnackbar({
          open: true,
          message: 'Error loading profile data',
          severity: 'error',
        });
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/admin/login');
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/admin/login');
        return;
      }

      // Store updated user data in localStorage
      const userData = {
        ...JSON.parse(localStorage.getItem('user') || '{}'),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
      };
      localStorage.setItem('user', JSON.stringify(userData));

      // Update the profile display in AdminLayout
      const event = new CustomEvent('profileUpdated', {
        detail: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
        }
      });
      window.dispatchEvent(event);

      setSnackbar({
        open: true,
        message: 'Profile updated successfully',
        severity: 'success',
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      setSnackbar({
        open: true,
        message: error.message || 'Error updating profile',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <AdminLayout>
      <Box sx={{ 
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        bgcolor: 'white',
        borderRadius: 2,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        p: 3,
      }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 3 
        }}>
          <Typography variant="h5" sx={{ color: '#333', fontWeight: 600 }}>
            Edit Profile
          </Typography>
          <Button
            variant="outlined"
            color="error"
            onClick={handleLogout}
            sx={{
              textTransform: 'none',
              borderColor: '#DC2626',
              color: '#DC2626',
              '&:hover': {
                bgcolor: '#FEE2E2',
                borderColor: '#DC2626',
              },
            }}
          >
            Logout
          </Button>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography sx={{ mb: 1, color: '#374151', fontSize: '14px' }}>
              First Name
            </Typography>
            <TextField
              fullWidth
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              variant="outlined"
              size="small"
              sx={{ bgcolor: 'white' }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography sx={{ mb: 1, color: '#374151', fontSize: '14px' }}>
              Last Name
            </Typography>
            <TextField
              fullWidth
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              variant="outlined"
              size="small"
              sx={{ bgcolor: 'white' }}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography sx={{ mb: 1, color: '#374151', fontSize: '14px' }}>
              Email
            </Typography>
            <TextField
              fullWidth
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
              size="small"
              sx={{ bgcolor: 'white' }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={loading}
              sx={{
                bgcolor: '#4CAF50',
                '&:hover': {
                  bgcolor: '#45a049',
                },
                textTransform: 'none',
                px: 4,
                py: 1,
              }}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </AdminLayout>
  );
};

export default EditProfile;
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
// import AdminLayout from './components/AdminLayout'; // Remove AdminLayout import
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
          navigate('/');
          return;
        }

        // Get user data from localStorage as fallback
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        
        // Attempt to fetch the latest profile data from the backend
        try {
          const profileResponse = await api.get(`/users/profile/${userData.userId}`);
          const latestProfile = profileResponse.data;
          setFormData({
            firstName: latestProfile.firstName || userData.firstName || '',
            lastName: latestProfile.lastName || userData.lastName || '',
            email: latestProfile.email || userData.email || '',
          });
        } catch (fetchError) {
          console.error('Error fetching latest profile data:', fetchError);
          // If fetching fails, use data from localStorage
           setFormData({
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            email: userData.email || '',
          });
          setSnackbar({
            open: true,
            message: 'Could not fetch latest profile data. Using local data.',
            severity: 'warning',
          });
        }

      } catch (error) {
        console.error('Error fetching user data:', error);
        setSnackbar({
          open: true,
          message: 'Error loading profile data',
          severity: 'error',
        });
         // If token is invalid or missing, redirect to login
         if (error.response?.status === 401 || error.response?.status === 403) {
             navigate('/');
         }
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
    localStorage.removeItem('firestoreAuthToken'); // Assuming this is used
    navigate('/', { replace: true });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
        return;
      }

      // Get the current user data
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      const userId = userData.userId;

      if (!userId) {
        throw new Error('User ID not found');
      }

      // Update user profile in the backend
      const response = await api.put(`/users/profile/${userId}`, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        // Do not send email if it's not allowed to be updated via this endpoint
        // email: formData.email 
      });

      if (response.data) {
        // Update local storage with new data
        const updatedUserData = {
          ...userData,
          firstName: formData.firstName,
          lastName: formData.lastName,
          // Keep original email from localStorage if not updated by backend
          email: userData.email,
        };
        localStorage.setItem('user', JSON.stringify(updatedUserData));

        // Optional: Dispatch a custom event if other components need to react to profile updates
        // const event = new CustomEvent('profileUpdated', {
        //   detail: {
        //     firstName: formData.firstName,
        //     lastName: formData.lastName,
        //     email: userData.email,
        //   }
        // });
        // window.dispatchEvent(event);

        setSnackbar({
          open: true,
          message: 'Profile updated successfully',
          severity: 'success',
        });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Error updating profile',
        severity: 'error',
      });
       // If token is invalid or missing, redirect to login
         if (error.response?.status === 401 || error.response?.status === 403) {
             navigate('/');
         }
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ 
      width: '100%',
      maxWidth: '800px', // Reduced max width for a more focused form
      margin: '40px auto', // Center the box and add top/bottom margin
      bgcolor: 'white',
      borderRadius: 2,
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      p: 4, // Increased padding
      minHeight: 'calc(100vh - 80px)', // Ensure it takes up reasonable height
    }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 4 // Increased bottom margin
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

        {/* Email field - assuming not editable via this form */}
        <Grid item xs={12}>
          <Typography sx={{ mb: 1, color: '#374151', fontSize: '14px' }}>
            Email
          </Typography>
          <TextField
            fullWidth
            name="email"
            type="email"
            value={formData.email}
            // onChange={handleChange} // Email is likely not editable here
            variant="outlined"
            size="small"
            InputProps={{ readOnly: true }} // Make email read-only
            sx={{ bgcolor: '#f1f5f9' }} // Style read-only field differently
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
              mt: 2, // Added top margin
            }}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </Grid>
      </Grid>

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
    </Box>
  );
};

export default EditProfile;
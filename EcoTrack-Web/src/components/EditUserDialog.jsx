import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Alert,
} from '@mui/material';
import api from '../api/axios';

const EditUserDialog = ({ open, onClose, user, onSave }) => {
  const [formData, setFormData] = useState({
    role: user?.role || ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Update form data when user prop changes
  useEffect(() => {
    if (user) {
      setFormData({
        role: user.role || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear any previous messages
    setError('');
    setSuccess('');
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');

      // Validate user ID
      if (!user || !user.userId) {
        setError('Invalid user data');
        return;
      }

      // Validate role is not empty
      if (!formData.role) {
        setError('Please select a role');
        return;
      }

      // Call the backend API to update the user's role
      const response = await api.put(`/users/${user.userId}/role`, {
        role: formData.role.toLowerCase()  // Ensure role is lowercase
      });

      if (response.data?.message) {
        setSuccess(response.data.message || 'Role updated successfully');
        // Update the local state after successful API call
        onSave({ ...user, role: formData.role.toLowerCase() });
        
        // Close the dialog after a short delay to show the success message
        setTimeout(() => {
          onClose();
        }, 1500);
      }
    } catch (error) {
      console.error('Error updating user role:', error);
      if (error.response?.status === 403) {
        setError('Access denied. Only admin users can update roles.');
      } else if (error.response?.status === 404) {
        setError('User not found. Please refresh the page and try again.');
      } else if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError('Failed to update user role. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle 
        sx={{ 
          borderBottom: '1px solid #e5e7eb',
          px: 3,
          py: 2,
          fontWeight: 600,
          color: '#333',
          fontSize: '1.25rem',
          lineHeight: 1.6,
        }}
      >
        Edit User Role
      </DialogTitle>
      <DialogContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          {/* Display user info (non-editable) */}
          <Box sx={{ mb: 2 }}>
            <Typography sx={{ 
              color: '#374151',
              fontSize: '14px',
              fontWeight: 500,
              mb: 0.5
            }}>
              User ID
            </Typography>
            <Typography sx={{ color: '#6B7280', fontSize: '14px' }}>
              {user?.userId || 'N/A'}
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography sx={{ 
              color: '#374151',
              fontSize: '14px',
              fontWeight: 500,
              mb: 0.5
            }}>
              Name
            </Typography>
            <Typography sx={{ color: '#6B7280', fontSize: '14px' }}>
              {user ? `${user.firstName} ${user.lastName}` : 'N/A'}
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography sx={{ 
              color: '#374151',
              fontSize: '14px',
              fontWeight: 500,
              mb: 0.5
            }}>
              Email
            </Typography>
            <Typography sx={{ color: '#6B7280', fontSize: '14px' }}>
              {user?.email || 'N/A'}
            </Typography>
          </Box>

          <FormControl 
            fullWidth 
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#e5e7eb',
                },
                '&:hover fieldset': {
                  borderColor: '#d1d5db',
                },
              },
            }}
          >
            <InputLabel>Role</InputLabel>
            <Select
              name="role"
              value={formData.role}
              onChange={handleChange}
              label="Role"
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="customer">Customer</MenuItem>
              <MenuItem value="collector">Collector</MenuItem>
            </Select>
          </FormControl>

          {error && (
            <Alert severity="error" sx={{ mt: 1 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mt: 1 }}>
              {success}
            </Alert>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ 
        borderTop: '1px solid #e5e7eb',
        px: 3,
        py: 2,
      }}>
        <Button
          onClick={onClose}
          variant="outlined"
          disabled={loading}
          sx={{
            color: '#6b7280',
            borderColor: '#d1d5db',
            '&:hover': {
              borderColor: '#9ca3af',
              bgcolor: '#f9fafb',
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
          sx={{
            bgcolor: '#4CAF50',
            '&:hover': {
              bgcolor: '#45a049',
            },
          }}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserDialog; 
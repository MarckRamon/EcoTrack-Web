import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  Grid,
  Avatar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  LocationOn,
  CalendarToday,
  Person,
  Assignment,
} from '@mui/icons-material';

const EditProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    nickName: '',
    gender: '',
    country: '',
    language: '',
    timeZone: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    // Handle save logic here
    console.log('Form data:', formData);
  };

  const menuItems = [
    { icon: <TrendingUp />, text: 'Dashboard', path: '/admin/dashboard' },
    { icon: <LocationOn />, text: 'Collection Points', path: '/admin/collection-points' },
    { icon: <CalendarToday />, text: 'Collection Schedule', path: '/admin/schedule' },
    { icon: <Person />, text: 'Users', path: '/admin/users' },
    { icon: <Assignment />, text: 'Job Order Request', path: '/admin/job-orders' },
  ];

  return (
    <Box sx={{ 
        display: 'flex',
        width: '100vw', 
        minHeight: '100vh',
        bgcolor: '#f8f9fa',
      }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: 240,
          bgcolor: 'white',
          borderRight: '1px solid #e5e7eb',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          p: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ mb: 4, px: 1.5 }}>
          <img 
            src="/logo.png" 
            alt="GrabTrash Logo"
            style={{ height: 40, objectFit: 'contain' }}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 1.5,
            borderRadius: 1,
            mb: 1,
            cursor: 'pointer',
            '&:hover': { bgcolor: '#f1f5f9' },
          }}
          onClick={() => navigate('/admin/dashboard')}
        >
          <TrendingUp sx={{ color: '#475569', mr: 2 }} />
          <Typography sx={{ 
            color: '#475569', 
            fontSize: '16px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
          }}>
            Dashboard
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 1.5,
            borderRadius: 1,
            mb: 1,
            cursor: 'pointer',
            '&:hover': { bgcolor: '#f1f5f9' },
          }}
        >
          <LocationOn sx={{ color: '#475569', mr: 2 }} />
          <Typography sx={{ 
            color: '#475569',
            fontSize: '16px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
          }}>
            Collection Points
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 1.5,
            borderRadius: 1,
            mb: 1,
            cursor: 'pointer',
            '&:hover': { bgcolor: '#f1f5f9' },
          }}
        >
          <CalendarToday sx={{ color: '#475569', mr: 2 }} />
          <Typography sx={{ 
            color: '#475569',
            fontSize: '16px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
          }}>
            Collection Schedule
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 1.5,
            borderRadius: 1,
            mb: 1,
            cursor: 'pointer',
            '&:hover': { bgcolor: '#f1f5f9' },
          }}
        >
          <Person sx={{ color: '#475569', mr: 2 }} />
          <Typography sx={{ 
            color: '#475569',
            fontSize: '16px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
          }}>
            Users
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 1.5,
            borderRadius: 1,
            cursor: 'pointer',
            '&:hover': { bgcolor: '#f1f5f9' },
          }}
        >
          <Assignment sx={{ color: '#475569', mr: 2 }} />
          <Typography sx={{ 
            color: '#475569',
            fontSize: '16px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
          }}>
            Job Order Request
          </Typography>
        </Box>

        {/* User Profile */}
        <Box sx={{ mt: 'auto', pt: 3, borderTop: '1px solid #e5e7eb' }}>
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              px: 1.5,
              cursor: 'pointer',
              '&:hover': {
                bgcolor: '#f3f4f6',
                borderRadius: 1,
              },
            }}
            onClick={() => navigate('/admin/profile')}
          >
            <Avatar 
              src="/migz.jpg"
              sx={{ 
                width: 40, 
                height: 40,
                mr: 2
              }}
            />
            <Box>
              <Typography 
                sx={{ 
                  color: '#333',
                  fontSize: '14px',
                  fontWeight: 500,
                  lineHeight: 1.2
                }}
              >
                Miguel
              </Typography>
              <Typography 
                sx={{ 
                  color: '#64748B',
                  fontSize: '12px',
                  lineHeight: 1.2
                }}
              >
                miggyjaca@gmail.com
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ 
        flex: 1,
        ml: '100px', // Changed from 150px to match sidebar width
        p: 3,
        minHeight: '100vh',
      }}>
        <Box sx={{ 
          width: '100%',
          bgcolor: 'white',
          borderRadius: 2,
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}>
          {/* Header */}
          <Box sx={{ 
            p: 3,
            borderBottom: '1px solid #e5e7eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap', // Allow wrapping on small screens
            gap: 2, // Add gap between items when wrapped
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                component="img"
                src="/migz.jpg"
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
              />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
                  Miguel Jaca
                </Typography>
                <Typography sx={{ color: '#6B7280', fontSize: '14px' }}>
                  miggyjaca@gmail.com
                </Typography>
              </Box>
            </Box>
            <Box sx={{ 
              display: 'flex',
              gap: 1,
              flexWrap: 'wrap', // Allow buttons to wrap on small screens
              justifyContent: 'flex-end',
            }}>
              <Button
                variant="contained"
                sx={{
                  bgcolor: '#4CAF50',
                  '&:hover': { bgcolor: '#43A047' },
                }}
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                sx={{
                  color: '#DC2626',
                  borderColor: '#DC2626',
                  '&:hover': {
                    bgcolor: '#FEE2E2',
                    borderColor: '#DC2626',
                  },
                }}
                onClick={() => navigate('/admin/login')}
              >
                Logout
              </Button>
            </Box>
          </Box>

          {/* Form */}
          <Box sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Typography sx={{ mb: 1, color: '#374151', fontSize: '14px' }}>
                  Full Name
                </Typography>
                <TextField
                  fullWidth
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Your Full Name"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography sx={{ mb: 1, color: '#374151', fontSize: '14px' }}>
                  Nick Name
                </Typography>
                <TextField
                  fullWidth
                  name="nickName"
                  value={formData.nickName}
                  onChange={handleChange}
                  placeholder="Your Nick Name"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography sx={{ mb: 1, color: '#374151', fontSize: '14px' }}>
                  Gender
                </Typography>
                <FormControl fullWidth size="small">
                  <Select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    displayEmpty
                  >
                    <MenuItem value="">Select Gender</MenuItem>
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography sx={{ mb: 1, color: '#374151', fontSize: '14px' }}>
                  Country
                </Typography>
                <FormControl fullWidth size="small">
                  <Select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    displayEmpty
                  >
                    <MenuItem value="">Select Country</MenuItem>
                    <MenuItem value="philippines">Philippines</MenuItem>
                    <MenuItem value="usa">United States</MenuItem>
                    <MenuItem value="uk">United Kingdom</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography sx={{ mb: 1, color: '#374151', fontSize: '14px' }}>
                  Language
                </Typography>
                <FormControl fullWidth size="small">
                  <Select
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    displayEmpty
                  >
                    <MenuItem value="">Select Language</MenuItem>
                    <MenuItem value="english">English</MenuItem>
                    <MenuItem value="filipino">Filipino</MenuItem>
                    <MenuItem value="spanish">Spanish</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography sx={{ mb: 1, color: '#374151', fontSize: '14px' }}>
                  Time Zone
                </Typography>
                <FormControl fullWidth size="small">
                  <Select
                    name="timeZone"
                    value={formData.timeZone}
                    onChange={handleChange}
                    displayEmpty
                  >
                    <MenuItem value="">Select Time Zone</MenuItem>
                    <MenuItem value="asia/manila">(GMT+8:00) Manila</MenuItem>
                    <MenuItem value="america/new_york">(GMT-5:00) New York</MenuItem>
                    <MenuItem value="europe/london">(GMT+0:00) London</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default EditProfile;
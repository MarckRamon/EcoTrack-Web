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
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';

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
    console.log('Form data:', formData);
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
      }}>
        {/* Header */}
        <Box sx={{ 
          p: { xs: 2, sm: 3 },
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: { xs: 'wrap', sm: 'nowrap' },
          gap: 2,
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2,
            width: { xs: '100%', sm: 'auto' },
          }}>
            <Box
              component="img"
              src="/migz.jpg"
              sx={{
                width: { xs: 48, sm: 64 },
                height: { xs: 48, sm: 64 },
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
            gap: 2,
            width: { xs: '100%', sm: 'auto' },
          }}>
            <Button
              variant="contained"
              fullWidth={false}
              sx={{
                flex: { xs: 1, sm: 'none' },
                bgcolor: '#4CAF50',
                '&:hover': { bgcolor: '#43A047' },
                px: 3,
                height: 40,
              }}
              onClick={handleSave}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              fullWidth={false}
              sx={{
                flex: { xs: 1, sm: 'none' },
                color: '#DC2626',
                borderColor: '#DC2626',
                '&:hover': {
                  bgcolor: '#FEE2E2',
                  borderColor: '#DC2626',
                },
                px: 3,
                height: 40,
              }}
              onClick={() => navigate('/admin/login')}
            >
              Logout
            </Button>
          </Box>
        </Box>

        {/* Form */}
        <Box sx={{ p: { xs: 2, sm: 3 } }}>
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
                sx={{ bgcolor: 'white' }}
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
                sx={{ bgcolor: 'white' }}
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
                  sx={{ bgcolor: 'white' }}
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
                  sx={{ bgcolor: 'white' }}
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
                  sx={{ bgcolor: 'white' }}
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
                  sx={{ bgcolor: 'white' }}
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
    </AdminLayout>
  );
};

export default EditProfile;
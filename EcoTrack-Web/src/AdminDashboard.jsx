import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Select,
  MenuItem,
  Paper,
} from '@mui/material';
import { BarChart } from '@mui/x-charts';
import AdminLayout from './components/AdminLayout';

// Mock data for the chart
const monthlyData = [
  { month: 'JAN', value: 100 },
  { month: 'FEB', value: 150 },
  { month: 'MAR', value: 140 },
  { month: 'APR', value: 250 },
  { month: 'MAY', value: 280 },
  { month: 'JUN', value: 200 },
  { month: 'JUL', value: 220 },
  { month: 'AUG', value: 100 },
  { month: 'SEP', value: 180 },
  { month: 'OCT', value: 260 },
  { month: 'NOV', value: 300 },
  { month: 'DEC', value: 350 },
];

const locationData = [
  { name: 'Barangay Lagtang', value: 6239 },
  { name: 'Tabunok', value: 4975 },
  { name: 'Lawaan-III', value: 2395 },
];

const AdminDashboard = () => {
  return (
    <AdminLayout>
      {/* Reports Header */}
      <Typography variant="h5" sx={{ fontWeight: 600, color: '#333', mb: 3 }}>
        Reports
      </Typography>

      {/* Timeframe Selector */}
      <Box sx={{ mb: 4 }}>
        <Select
          value="all-time"
          fullWidth
          sx={{
            bgcolor: 'white',
            '& .MuiSelect-select': { py: 1.5 },
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
          }}
        >
          <MenuItem value="all-time">Timeframe: All-time</MenuItem>
        </Select>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2.5, borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', bgcolor: 'white' }}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, fontSize: '14px' }}>
              Active Users
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 600, color: '#333' }}>
              121
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2.5, borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', bgcolor: 'white' }}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, fontSize: '14px' }}>
              Total Pickup Trash Ordered
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 600, color: '#333' }}>
              3,298
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2.5, borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', bgcolor: 'white' }}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, fontSize: '14px' }}>
              Total Collection Points
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 600, color: '#333' }}>
              10,659
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Two Column Layout */}
      <Grid container spacing={3}>
        {/* Left Column - Location Stats */}
        <Grid item xs={12} md={5}>
          <Paper 
            sx={{ 
              p: 3, 
              borderRadius: 2, 
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              height: 'fit-content',
              bgcolor: 'white',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#333', mb: 3 }}>
              Top Most Ordered Location Pickup
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {locationData.map((location, index) => (
                <Box key={index}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box
                      component="span"
                      sx={{
                        width: 48,
                        height: 48,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: '#f1f5f9',
                        borderRadius: 1,
                        mr: 2,
                        fontSize: '24px'
                      }}
                    >
                      🚛
                    </Box>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: '#333', 
                        fontWeight: 500,
                        fontSize: '16px',
                      }}
                    >
                      {location.name}
                    </Typography>
                  </Box>
                  <Box sx={{ position: 'relative', height: 8, width: '100%', mb: 1 }}>
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '100%',
                        borderRadius: 4,
                        bgcolor: '#E8F5E9',
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: `${(location.value / 8000) * 100}%`,
                        height: '100%',
                        borderRadius: 4,
                        background: 'linear-gradient(90deg, #4CAF50 0%, #43A047 100%)',
                      }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: '#333', 
                        fontWeight: 500,
                        fontSize: '16px',
                      }}
                    >
                      {location.value.toLocaleString()}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Right Column - Activity and Calendar */}
        <Grid item xs={12} md={7}>
          {/* Activity Chart */}
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', mb: 3, bgcolor: 'white' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
                Activity
              </Typography>
              <Select
                value="month"
                size="small"
                sx={{ 
                  minWidth: 100,
                  '.MuiOutlinedInput-notchedOutline': {
                    borderColor: '#4CAF50',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#43A047',
                  },
                  color: '#4CAF50',
                  fontSize: '14px',
                }}
              >
                <MenuItem value="month">Month</MenuItem>
              </Select>
            </Box>
            <Box sx={{ height: 250, mt: 2 }}>
              <BarChart
                series={[
                  {
                    data: monthlyData.map(item => item.value),
                    color: '#4CAF50',
                    highlightScope: {
                      highlighted: 'item',
                    },
                    barRoundness: 0.5,
                  },
                ]}
                xAxis={[{
                  data: monthlyData.map(item => item.month),
                  scaleType: 'band',
                  tickLabelStyle: {
                    color: '#64748B',
                    fontSize: 12,
                  },
                }]}
                yAxis={[{
                  tickLabelStyle: {
                    color: '#64748B',
                    fontSize: 12,
                  },
                }]}
                height={250}
                margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                sx={{
                  '.MuiChartsAxis-line': { stroke: '#e2e8f0' },
                  '.MuiChartsAxis-tick': { stroke: '#e2e8f0' },
                  '.MuiBarElement-root:hover': {
                    filter: 'brightness(0.9)',
                  },
                }}
              />
            </Box>
          </Paper>

          {/* Calendar */}
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', bgcolor: 'white' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
                March
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 400, color: '#333', ml: 1 }}>
                2021
              </Typography>
            </Box>
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: 1,
              textAlign: 'center',
            }}>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <Typography key={day} sx={{ color: '#64748B', fontSize: '0.875rem', fontWeight: 500, mb: 1 }}>
                  {day}
                </Typography>
              ))}
              {Array.from({ length: 35 }, (_, i) => {
                const dayNum = i - 1; // Adjust for February ending
                const isValid = dayNum >= 0 && dayNum < 31;
                const isToday = dayNum + 1 === 15;
                const hasPickup = [2, 5, 8, 13, 16, 20, 23, 29, 31].includes(dayNum + 1);
                
                return (
                  <Box 
                    key={i}
                    sx={{ 
                      p: 1.5,
                      position: 'relative',
                      cursor: 'pointer',
                      borderRadius: 1,
                      bgcolor: isToday ? '#EEF2FF' : 'transparent',
                      border: isToday ? '1px solid #4CAF50' : 'none',
                      '&:hover': {
                        bgcolor: isToday ? '#EEF2FF' : '#f1f5f9',
                      },
                    }}
                  >
                    {isValid && (
                      <>
                        <Typography 
                          sx={{ 
                            fontSize: '0.875rem', 
                            color: isToday ? '#4CAF50' : '#333',
                            fontWeight: isToday ? 600 : 400,
                          }}
                        >
                          {dayNum + 1}
                        </Typography>
                        {hasPickup && (
                          <Typography 
                            sx={{ 
                              fontSize: '0.65rem',
                              color: '#4CAF50',
                              mt: 0.5,
                              bgcolor: '#E8F5E9',
                              borderRadius: '4px',
                              py: 0.25,
                              px: 0.5,
                            }}
                          >
                            Pickup Garbage
                          </Typography>
                        )}
                      </>
                    )}
                  </Box>
                );
              })}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default AdminDashboard; 
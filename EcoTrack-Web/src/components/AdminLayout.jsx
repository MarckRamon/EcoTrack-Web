import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  LocationOn,
  CalendarToday,
  Person,
  Assignment,
} from '@mui/icons-material';

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <Box 
      sx={{ 
        display: 'flex',
        minHeight: '100vh',
        width: '100vw',
        margin: 0,
        padding: 0,
        bgcolor: '#f8f9fa',
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          width: '240px',
          minWidth: '240px',
          bgcolor: 'white',
          borderRight: '1px solid #e5e7eb',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          zIndex: 1,
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
          onClick={() => navigate('/admin/collection-points')}
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
          onClick={() => navigate('/admin/schedule')}
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
          onClick={() => navigate('/admin/users')}
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
          onClick={() => navigate('/admin/job-orders')}
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
      <Box 
        component="main"
        sx={{ 
          flexGrow: 1,
          p: 3,
          bgcolor: '#f8f9fa',
          minHeight: '100vh',
          marginLeft: '240px',
          width: 'calc(100vw - 240px)',
          overflow: 'auto',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout; 
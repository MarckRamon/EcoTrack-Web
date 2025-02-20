import React from "react";
import { Box, Typography, Grid, Container, AppBar, Toolbar, Button, Card, CardContent } from "@mui/material";
import { Phone, Email, LocationOn, Dashboard, Schedule, Place, Notifications, DirectionsBus } from "@mui/icons-material";
import { motion } from "framer-motion";

const features = [
  { title: "Dashboard", description: "Track and manage waste collection effortlessly with our interactive dashboard.", icon: <Dashboard fontSize="large" /> },
  { title: "Waste Pickup Schedule Viewer", description: "Stay updated with the latest waste pickup schedules in your area.", icon: <Schedule fontSize="large" /> },
  { title: "Waste Collection Points Location Map", description: "Find the nearest waste collection points with our interactive map.", icon: <Place fontSize="large" /> },
  { title: "Notifications", description: "Receive important updates and reminders about waste management in your community.", icon: <Notifications fontSize="large" /> },
  { title: "Live Tracking of Garbage Truck", description: "Track the real-time location of garbage trucks for efficient waste disposal.", icon: <DirectionsBus fontSize="large" /> },
];

const LandingPage = () => {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Top Bar */}
      <Box sx={{ bgcolor: '#1a1a1a', color: 'white', py: 1 }}>
        <Container maxWidth="lg">
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={4}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Email sx={{ mr: 1, fontSize: '1rem' }} />
                <Typography variant="body2">eco@track.com</Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Phone sx={{ mr: 1, fontSize: '1rem' }} />
                <Typography variant="body2">+63 995 072 9923</Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <LocationOn sx={{ mr: 1, fontSize: '1rem' }} />
                <Typography variant="body2">Talisay, Cebu, PH</Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Navigation Bar */}
      <AppBar position="static" sx={{ bgcolor: 'white', boxShadow: 'none' }}>
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ color: '#000', fontWeight: 'bold' }}>
              Eco<span style={{ color: '#77be1d' }}>Track</span>
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button color="inherit" sx={{ color: '#000' }}>Home</Button>
              <Button color="inherit" sx={{ color: '#000' }}>About</Button>
              <Button color="inherit" sx={{ color: '#000' }}>Features</Button>
              <Button color="inherit" sx={{ color: '#000' }}>Projects</Button>
              <Button color="inherit" sx={{ color: '#000' }}>Blog</Button>
              <Button color="inherit" sx={{ color: '#000' }}>Contact</Button>
              <Button variant="contained" sx={{ bgcolor: '#77be1d', '&:hover': { bgcolor: '#689f1a' } }}>
                DONATE NOW!
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          height: '80vh',
          position: 'relative',
          backgroundImage: 'url("truck.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: 'rgba(0, 0, 0, 0.5)',
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="subtitle1" sx={{ color: 'white', textAlign: 'center', mb: 2 }}>
            Welcome to
          </Typography>
          <Typography variant="h2" sx={{ color: 'white', textAlign: 'center', mb: 2, fontWeight: 'bold' }}>
            EcoTrack
          </Typography>
          <Typography variant="body1" sx={{ color: 'white', textAlign: 'center', mb: 4, maxWidth: 600, mx: 'auto' }}>
            EcoTrack is your smart Garbage Management System designed to promote a cleaner and greener environment! Explore our core features below.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" sx={{ bgcolor: '#77be1d', '&:hover': { bgcolor: '#689f1a' }, px: 4, py: 1 }}>
              DOWNLOAD NOW!
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 8, bgcolor: '#f8f9fa' }}>
        <Container maxWidth="lg">
          <Typography variant="subtitle1" sx={{ color: '#77be1d', textAlign: 'center', mb: 2 }}>
            FEATURES
          </Typography>
          <Typography variant="h4" sx={{ textAlign: 'center', mb: 6 }}>
            <span style={{ color: '#000000' }}>Over</span> <span style={{ color: '#77be1d' }}>40K+</span> <span style={{ color: '#000000' }}>People Using Our Services</span>
          </Typography>

          <Grid container spacing={3} justifyContent="center">
            {/* First row - 3 cards */}
            <Grid item xs={12} container spacing={3} justifyContent="center" sx={{ mb: 2 }}>
              {features.slice(0, 3).map((feature, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Card sx={{ borderRadius: 4, height: "160px" }}>
                      <CardContent>
                        <Box sx={{ color: "#56ab2f", mb: 1 }}>
                          {feature.icon}
                        </Box>
                        <Typography variant="h6" sx={{ mb: 1 }}>
                          {feature.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.875rem" }}>
                          {feature.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>

            {/* Second row - 2 cards */}
            <Grid item xs={12} container spacing={3} justifyContent="center">
              {features.slice(3).map((feature, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Card sx={{ borderRadius: 4, height: "160px" }}>
                      <CardContent>
                        <Box sx={{ color: "#56ab2f", mb: 1 }}>
                          {feature.icon}
                        </Box>
                        <Typography variant="h6" sx={{ mb: 1 }}>
                          {feature.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.875rem" }}>
                          {feature.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;

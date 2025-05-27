import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  Alert,
} from '@mui/material';
import { Search, Edit, Delete, Add } from '@mui/icons-material';
import AdminLayout from './components/AdminLayout';
import api from './api/axios';

const Trucks = () => {
  const [trucks, setTrucks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTruck, setSelectedTruck] = useState(null);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    size: '',
    wasteType: '',
    status: 'AVAILABLE',
    make: '',
    model: '',
    plateNumber: '',
  });

  useEffect(() => {
    // Check authentication status
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No authentication token found. Please log in.');
      return;
    }

    // Check if token is expired
    const decoded = api.getCurrentUser();
    if (!decoded) {
      setError('Authentication token is invalid or expired. Please log in again.');
      return;
    }

    // Check user role
    const role = api.getUserRole();
    if (!role || !role.toLowerCase().includes('admin')) {
      setError('Access denied. Admin privileges required.');
      return;
    }

    fetchTrucks();
  }, []);

  const fetchTrucks = async () => {
    try {
      const data = await api.fetchAllTrucks();
      setTrucks(data);
    } catch (error) {
      console.error('Error fetching trucks:', error);
      if (error.response?.status === 403) {
        setError('Access denied. Please check your permissions.');
      } else {
        setError('Failed to fetch trucks. Please try again later.');
      }
      setTrucks([]);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleOpenDialog = (truck = null) => {
    if (truck) {
      setSelectedTruck(truck);
      setFormData({
        size: truck.size,
        wasteType: truck.wasteType,
        status: truck.status,
        make: truck.make,
        model: truck.model,
        plateNumber: truck.plateNumber,
      });
    } else {
      setSelectedTruck(null);
      setFormData({
        size: '',
        wasteType: '',
        status: 'AVAILABLE',
        make: '',
        model: '',
        plateNumber: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTruck(null);
    setFormData({
      size: '',
      wasteType: '',
      status: 'AVAILABLE',
      make: '',
      model: '',
      plateNumber: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedTruck) {
        await api.updateTruck(selectedTruck.truckId, formData);
      } else {
        await api.createTruck(formData);
      }
      handleCloseDialog();
      fetchTrucks();
    } catch (error) {
      console.error('Error saving truck:', error);
      setError('Failed to save truck. Please try again.');
    }
  };

  const handleDelete = async (truckId) => {
    if (window.confirm('Are you sure you want to delete this truck?')) {
      try {
        await api.deleteTruck(truckId);
        fetchTrucks();
      } catch (error) {
        console.error('Error deleting truck:', error);
        setError('Failed to delete truck. Please try again.');
      }
    }
  };

  return (
    <AdminLayout>
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Trucks Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpenDialog()}
          >
            Add New Truck
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ mb: 3 }}>
          <TextField
            placeholder="Search trucks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Plate Number</TableCell>
                <TableCell>Make</TableCell>
                <TableCell>Model</TableCell>
                <TableCell>Size</TableCell>
                <TableCell>Waste Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {trucks
                .filter(truck =>
                  truck.plateNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  truck.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  truck.model.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map(truck => (
                  <TableRow key={truck.truckId}>
                    <TableCell>{truck.plateNumber}</TableCell>
                    <TableCell>{truck.make}</TableCell>
                    <TableCell>{truck.model}</TableCell>
                    <TableCell>{truck.size}</TableCell>
                    <TableCell>{truck.wasteType}</TableCell>
                    <TableCell>{truck.status}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleOpenDialog(truck)}><Edit /></IconButton>
                      <IconButton onClick={() => handleDelete(truck.truckId)}><Delete /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </AdminLayout>
  );
};

export default Trucks; 
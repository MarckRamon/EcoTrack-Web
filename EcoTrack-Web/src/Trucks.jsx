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
    truckPrice: '',
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
        truckPrice: truck.truckPrice || '',
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
        truckPrice: '',
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
      truckPrice: '',
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
      <Box sx={{ p: { xs: 1, md: 4 }, maxWidth: '100%', bgcolor: '#f8fafc', minHeight: '100vh' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, alignItems: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#1e293b', letterSpacing: 1 }}>
            Trucks Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpenDialog()}
            sx={{ fontWeight: 600, bgcolor: '#2563eb', '&:hover': { bgcolor: '#1d4ed8' } }}
          >
            Add New Truck
          </Button>
        </Box>
        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>
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
            sx={{ bgcolor: 'white', borderRadius: 2, boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}
          />
        </Box>
        <TableContainer component={Paper} sx={{ boxShadow: '0 4px 24px rgba(30,41,59,0.08)', borderRadius: 3, overflow: 'hidden' }}>
          <Table>
            <TableHead sx={{ bgcolor: '#f1f5f9' }}>
              <TableRow>
                <TableCell>Plate Number</TableCell>
                <TableCell>Make</TableCell>
                <TableCell>Model</TableCell>
                <TableCell>Size</TableCell>
                <TableCell>Price</TableCell>
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
                  <TableRow key={truck.truckId} hover sx={{ transition: 'background 0.2s', '&:hover': { bgcolor: '#e0f2fe' } }}>
                    <TableCell>{truck.plateNumber}</TableCell>
                    <TableCell>{truck.make}</TableCell>
                    <TableCell>{truck.model}</TableCell>
                    <TableCell>{truck.size}</TableCell>
                    <TableCell>{truck.truckPrice !== undefined && truck.truckPrice !== null ? `₱${Number(truck.truckPrice).toLocaleString()}` : '-'}</TableCell>
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
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3, p: 2 } }}>
          <DialogTitle>{selectedTruck ? 'Edit Truck' : 'Add New Truck'}</DialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <TextField
                label="Plate Number"
                value={formData.plateNumber}
                onChange={e => setFormData({ ...formData, plateNumber: e.target.value })}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Make"
                value={formData.make}
                onChange={e => setFormData({ ...formData, make: e.target.value })}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Model"
                value={formData.model}
                onChange={e => setFormData({ ...formData, model: e.target.value })}
                fullWidth
                margin="normal"
                required
              />
              <FormControl fullWidth margin="normal" required>
                <InputLabel>Size</InputLabel>
                <Select
                  value={formData.size}
                  onChange={e => setFormData({ ...formData, size: e.target.value })}
                  label="Size"
                >
                  <MenuItem value="SMALL">Small</MenuItem>
                  <MenuItem value="MEDIUM">Medium</MenuItem>
                  <MenuItem value="LARGE">Large</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal" required>
                <InputLabel>Waste Type</InputLabel>
                <Select
                  value={formData.wasteType}
                  onChange={e => setFormData({ ...formData, wasteType: e.target.value })}
                  label="Waste Type"
                >
                  <MenuItem value="PLASTIC">Plastic</MenuItem>
                  <MenuItem value="PAPER">Paper</MenuItem>
                  <MenuItem value="METAL">Metal</MenuItem>
                  <MenuItem value="GLASS">Glass</MenuItem>
                  <MenuItem value="ELECTRONIC">Electronic</MenuItem>
                  <MenuItem value="ORGANIC">Organic</MenuItem>
                  <MenuItem value="MIXED">Mixed</MenuItem>
                  <MenuItem value="HAZARDOUS">Hazardous</MenuItem>
                  <MenuItem value="RECYCLABLE">Recyclable</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal" required>
                <InputLabel>Status</InputLabel>
                <Select
                  value={formData.status}
                  onChange={e => setFormData({ ...formData, status: e.target.value })}
                  label="Status"
                >
                  <MenuItem value="AVAILABLE">Available</MenuItem>
                  <MenuItem value="CURRENTLY_IN_USE">Currently In Use</MenuItem>
                  <MenuItem value="MAINTENANCE">Maintenance</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Price"
                type="number"
                value={formData.truckPrice}
                onChange={e => setFormData({ ...formData, truckPrice: e.target.value })}
                fullWidth
                margin="normal"
                required
                InputProps={{
                  startAdornment: <InputAdornment position="start">₱</InputAdornment>,
                  inputProps: { min: 0 }
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button type="submit" variant="contained">{selectedTruck ? 'Save Changes' : 'Add Truck'}</Button>
            </DialogActions>
          </form>
        </Dialog>
      </Box>
    </AdminLayout>
  );
};

export default Trucks; 
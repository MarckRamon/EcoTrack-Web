import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Select,
  MenuItem,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import AdminLayout from './components/AdminLayout';

// Static data matching the image
const staticOrders = [
  {
    id: 1,
    name: 'Gorge Kell',
    receiptNo: '0237-7746-8981-9028-562',
    phoneNo: '09224780579',
    location: 'Lagtang',
    paymentMethod: 'GCash'
  },
  {
    id: 2,
    name: 'Steven Reeves',
    receiptNo: '0237-7746-8981-9028-562',
    phoneNo: '09224780579',
    location: 'Tabunok',
    paymentMethod: 'Cash on Hand'
  },
  {
    id: 3,
    name: 'Ronald Richards',
    receiptNo: '0237-7746-8981-9028-562',
    phoneNo: '09224780579',
    location: 'Bulacao',
    paymentMethod: 'Cash on Hand'
  },
  {
    id: 4,
    name: 'Marvin McKinney',
    receiptNo: '0237-7746-8981-9028-562',
    phoneNo: '09224780579',
    location: 'Pardo',
    paymentMethod: 'Cash on Hand'
  },
  {
    id: 5,
    name: 'Jerome Bell',
    receiptNo: '0237-7746-8981-9028-562',
    phoneNo: '09224780579',
    location: 'Lagtang',
    paymentMethod: 'GCash'
  },
  {
    id: 6,
    name: 'Kathryn Murphy',
    receiptNo: '0237-7746-8981-9028-562',
    phoneNo: '09224780579',
    location: 'Pardo',
    paymentMethod: 'Cash on Hand'
  },
  {
    id: 7,
    name: 'Jacob Jones',
    receiptNo: '0237-7746-8981-9028-562',
    phoneNo: '09224780579',
    location: 'Lawaan-II',
    paymentMethod: 'GCash'
  },
  {
    id: 8,
    name: 'Kristin Watson',
    receiptNo: '0237-7746-8981-9028-562',
    phoneNo: '09224780579',
    location: 'Lawaan-I',
    paymentMethod: 'GCash'
  }
];

const JobOrderRequest = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredOrders = staticOrders.filter(order => {
    const searchLower = searchQuery.toLowerCase();
    return (
      order.name.toLowerCase().includes(searchLower) ||
      order.receiptNo.toLowerCase().includes(searchLower) ||
      order.phoneNo.toLowerCase().includes(searchLower) ||
      order.location.toLowerCase().includes(searchLower) ||
      order.paymentMethod.toLowerCase().includes(searchLower)
    );
  });

  return (
    <AdminLayout>
      <Box sx={{ p: 3, maxWidth: '100%' }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#333' }}>
          Job Order Request
        </Typography>

        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
            Job Orders Request
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField
              placeholder="Search"
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                width: '240px',
                bgcolor: 'white',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#e5e7eb',
                  },
                  '&:hover fieldset': {
                    borderColor: '#d1d5db',
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: '#9ca3af' }} />
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography sx={{ color: '#6b7280', fontSize: '14px' }}>
                Sort by:
              </Typography>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                size="small"
                sx={{
                  minWidth: 120,
                  bgcolor: 'white',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#e5e7eb',
                  },
                }}
              >
                <MenuItem value="newest">Newest</MenuItem>
                <MenuItem value="oldest">Oldest</MenuItem>
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="location">Location</MenuItem>
              </Select>
            </Box>
          </Box>
        </Box>

        <TableContainer component={Paper} sx={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Receipt No</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Phone No</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Location</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Payment Method</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.name}</TableCell>
                    <TableCell>{order.receiptNo}</TableCell>
                    <TableCell>{order.phoneNo}</TableCell>
                    <TableCell>{order.location}</TableCell>
                    <TableCell>{order.paymentMethod}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[8, 16, 24]}
            component="div"
            count={filteredOrders.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Box>
    </AdminLayout>
  );
};

export default JobOrderRequest; 
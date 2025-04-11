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
  Button,
  Select,
  MenuItem,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import AdminLayout from './components/AdminLayout';
import EditUserDialog from './components/EditUserDialog';

// Static data matching the image
const staticUsers = [
  {
    id: 1,
    name: 'Gorge Kell',
    role: 'Customer',
    email: 'gorge@yahoo.com',
  },
  {
    id: 2,
    name: 'Steven Reeves',
    role: 'Customer',
    email: 'steven@yahoo.com',
  },
  {
    id: 3,
    name: 'Ronald Richards',
    role: 'Collector',
    email: 'ronald@adobe.com',
  },
  {
    id: 4,
    name: 'Marvin McKinney',
    role: 'Collector',
    email: 'marvin@tesla.com',
  },
  {
    id: 5,
    name: 'Jerome Bell',
    role: 'Customer',
    email: 'jerome@google.com',
  },
  {
    id: 6,
    name: 'Kathryn Murphy',
    role: 'Customer',
    email: 'kathryn@microsoft.com',
  },
  {
    id: 7,
    name: 'Jacob Jones',
    role: 'Customer',
    email: 'jacob@yahoo.com',
  },
  {
    id: 8,
    name: 'Kristin Watson',
    role: 'Customer',
    email: 'kristin@facebook.com',
  }
];

const Users = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState(staticUsers);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditDialogOpen(true);
  };

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const handleSaveUser = (updatedUser) => {
    setUsers(users.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    ));
  };

  const filteredUsers = users.filter(user => {
    const searchLower = searchQuery.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchLower) ||
      user.role.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower)
    );
  });

  // Sort users based on selected option
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'role':
        return a.role.localeCompare(b.role);
      case 'oldest':
        return a.id - b.id;
      case 'newest':
      default:
        return b.id - a.id;
    }
  });

  return (
    <AdminLayout>
      <Box sx={{ p: 3, maxWidth: '100%' }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#333' }}>
          Users
        </Typography>

        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
            All Users
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
                <MenuItem value="role">Role</MenuItem>
              </Select>
            </Box>
          </Box>
        </Box>

        <TableContainer component={Paper} sx={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Role</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell sx={{ textTransform: 'capitalize' }}>{user.role}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleEdit(user)}
                          sx={{
                            color: '#059669',
                            borderColor: '#059669',
                            '&:hover': {
                              borderColor: '#047857',
                              bgcolor: '#f0fdf4',
                            },
                          }}
                        >
                          EDIT
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleDelete(user.id)}
                          sx={{
                            color: '#dc2626',
                            borderColor: '#dc2626',
                            '&:hover': {
                              borderColor: '#b91c1c',
                              bgcolor: '#fef2f2',
                            },
                          }}
                        >
                          DELETE
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[8, 16, 24]}
            component="div"
            count={filteredUsers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Box>

      <EditUserDialog
        open={editDialogOpen}
        onClose={() => {
          setEditDialogOpen(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
        onSave={handleSaveUser}
      />
    </AdminLayout>
  );
};

export default Users; 
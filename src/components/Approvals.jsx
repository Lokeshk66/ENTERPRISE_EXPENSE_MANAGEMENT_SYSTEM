import React, { useState } from 'react';
import { 
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Button, Chip, Snackbar, Alert 
} from '@mui/material';
import './../styles/Approvals.css';

const Approvals = () => {
  const AUTO_APPROVAL_THRESHOLD = 5000;
  const [requests, setRequests] = useState([
    { id: 1, employeeId: 'E001', name: 'John Doe', requestType: 'Travel', amount: 4000, status: 'Auto-Approved', level: 'Final' },
    { id: 2, employeeId: 'E002', name: 'Jane Smith', requestType: 'Office Supplies', amount: 7000, status: 'Pending', level: 'Manager' },
    { id: 3, employeeId: 'E003', name: 'Alice Johnson', requestType: 'Food', amount: 2000, status: 'Auto-Approved', level: 'Final' },
    { id: 4, employeeId: 'E004', name: 'Mark Lee', requestType: 'Equipment', amount: 15000, status: 'Pending', level: 'Manager' },
  ]);

  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });

  const nextApprovalLevel = {
    Manager: 'Finance',
    Finance: 'Admin',
    Admin: 'Approved'
  };

  const handleApproval = (id, action) => {
    setRequests(requests.map(request => {
      if (request.id === id) {
        if (action === 'Approve') {
          const newLevel = request.level === 'Admin' ? 'Approved' : nextApprovalLevel[request.level];
          const newStatus = request.level === 'Admin' ? 'Approved' : 'Pending';

          showNotification(`Request ID ${id} approved at ${request.level} level`, 'success');
          return { ...request, status: newStatus, level: newLevel };
        } else {
          showNotification(`Request ID ${id} declined`, 'error');
          return { ...request, status: 'Declined', level: 'Final' };
        }
      }
      return request;
    }));
  };

  const showNotification = (message, severity) => {
    setNotification({ open: true, message, severity });
  };

  return (
    <Box className="approvals-container">
      <Typography variant="h4" gutterBottom>Multi-Level Expense Approvals</Typography>
      
      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow className="table-header">
              <TableCell>Request ID</TableCell>
              <TableCell>Employee ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Expense Type</TableCell>
              <TableCell>Amount (₹)</TableCell>
              <TableCell>Approval Level</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id} className="table-row">
                <TableCell>{request.id}</TableCell>
                <TableCell>{request.employeeId}</TableCell>
                <TableCell>{request.name}</TableCell>
                <TableCell>{request.requestType}</TableCell>
                <TableCell>₹{request.amount}</TableCell>
                <TableCell>
                  <Chip label={request.level} color={request.level === 'Admin' ? 'primary' : 'default'} />
                </TableCell>
                <TableCell>
                  <Chip 
                    label={request.status} 
                    color={request.status === 'Approved' || request.status === 'Auto-Approved' ? 'success' 
                    : request.status === 'Declined' ? 'error' : 'warning'}
                  />
                </TableCell>
                <TableCell>
                  {request.status === 'Pending' && (
                    <>
                      <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={() => handleApproval(request.id, 'Approve')}
                        style={{ marginRight: '10px' }}
                      >
                        Approve
                      </Button>
                      <Button 
                        variant="contained" 
                        color="secondary" 
                        onClick={() => handleApproval(request.id, 'Decline')}
                      >
                        Decline
                      </Button>
                    </>
                  )}
                  {request.status === 'Auto-Approved' && <Chip label="Auto-Approved" color="success" />}
                  {request.status === 'Approved' && <Chip label="Finalized" color="success" />}
                  {request.status === 'Declined' && <Chip label="Rejected" color="error" />}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={() => setNotification({ ...notification, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setNotification({ ...notification, open: false })} severity={notification.severity}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Approvals;

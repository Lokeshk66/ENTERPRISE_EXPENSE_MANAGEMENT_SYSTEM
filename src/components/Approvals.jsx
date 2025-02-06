import React, { useState } from 'react';
import { Box, Typography, Paper, Grid, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import './../styles/Approvals.css';

const Approvals = () => {
  const [requests, setRequests] = useState([
    { id: 1, employeeId: 'E001', name: 'John Doe', requestType: 'Leave', status: 'Pending' },
    { id: 2, employeeId: 'E002', name: 'Jane Smith', requestType: 'Leave', status: 'Pending' },
    { id: 3, employeeId: 'E003', name: 'Alice Johnson', requestType: 'Overtime', status: 'Pending' },
  ]);
  const handleApproval = (id, status) => {
    setRequests(requests.map(request =>
      request.id === id ? { ...request, status } : request
    ));
  };

  return (
    <Box className="approvals-container">
      <Typography variant="h4" gutterBottom>Employee Approval Requests</Typography>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Request ID</TableCell>
              <TableCell>Employee ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Request Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.id}</TableCell>
                <TableCell>{request.employeeId}</TableCell>
                <TableCell>{request.name}</TableCell>
                <TableCell>{request.requestType}</TableCell>
                <TableCell>{request.status}</TableCell>
                <TableCell>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => handleApproval(request.id, 'Approved')}
                    disabled={request.status === 'Approved' || request.status === 'Declined'}
                  >
                    Accept
                  </Button>
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={() => handleApproval(request.id, 'Declined')}
                    disabled={request.status === 'Approved' || request.status === 'Declined'}
                    style={{ marginLeft: '10px' }}
                  >
                    Decline
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Approvals;

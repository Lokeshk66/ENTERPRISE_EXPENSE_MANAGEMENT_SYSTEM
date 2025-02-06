import React, { useState } from 'react';
import { Box, Typography, Paper, Grid, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import './../styles/Tracking.css';

const Tracking = () => {
  // Initial state with mock data for demonstration
  const [activities, setActivities] = useState([
    { id: 1, employeeId: 'E001', name: 'John Doe', activity: 'Logged in', timestamp: '2025-02-06 09:00 AM' },
    { id: 2, employeeId: 'E001', name: 'John Doe', activity: 'Started Task 1', timestamp: '2025-02-06 09:30 AM' },
    { id: 3, employeeId: 'E002', name: 'Jane Smith', activity: 'Logged in', timestamp: '2025-02-06 09:10 AM' },
    { id: 4, employeeId: 'E002', name: 'Jane Smith', activity: 'Completed Task 1', timestamp: '2025-02-06 10:00 AM' },
    // Add more mock data here...
  ]);
  
  // State to store the search query
  const [searchQuery, setSearchQuery] = useState('');

  // Filter the activities based on the search query
  const filteredActivities = activities.filter((activity) =>
    activity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    activity.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    activity.activity.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box className="tracking-container">
      <Typography variant="h4" gutterBottom>Employee Activity Tracking</Typography>

      {/* Search Bar */}
      <TextField
        label="Search by Name, ID or Activity"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />

      <Grid container spacing={3} className="activity-grid">
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} className="tracking-card">
            <Typography variant="h6" className="card-title">Employee Information</Typography>
            <Typography variant="body1">Employee ID: E001</Typography>
            <Typography variant="body1">Name: John Doe</Typography>
            <Typography variant="body1">Role: Software Developer</Typography>
            <Button variant="contained" color="primary" fullWidth>View Profile</Button>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={8}>
          <Paper elevation={3} className="tracking-card">
            <Typography variant="h6" className="card-title">Activity Log</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Activity ID</TableCell>
                    <TableCell>Employee ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Activity</TableCell>
                    <TableCell>Timestamp</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredActivities.length > 0 ? (
                    filteredActivities.map((activity) => (
                      <TableRow key={activity.id}>
                        <TableCell>{activity.id}</TableCell>
                        <TableCell>{activity.employeeId}</TableCell>
                        <TableCell>{activity.name}</TableCell>
                        <TableCell>{activity.activity}</TableCell>
                        <TableCell>{activity.timestamp}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} align="center">No matching activities found</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Tracking;

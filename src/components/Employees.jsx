import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from "@mui/material";
import "../styles/Employees.css";

const Employees = () => {
  const employeeData = [
    { id: 1, name: "John Doe", attendance: "89%" },
    { id: 2, name: "Jane Smith", attendance: "90%" },
    { id: 3, name: "Alice Johnson", attendance: "30%" },
  ];

  return (
    <Box className="employees-container">
      <Typography variant="h4" gutterBottom>Employee List</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow className="table-header">
              <TableCell>Employee ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Attendance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employeeData.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.id}</TableCell>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.attendance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Employees;

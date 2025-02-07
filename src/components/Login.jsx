import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent, Typography, MenuItem, Select, Container } from "@mui/material";
import "../styles/Login.css";

const Login = () => {
  const [role, setRole] = useState("SELECT");
  const navigate = useNavigate();

  const renderContent = () => {
    switch (role) {
      case "Admin":
        return "You have full access to the system, including user management and settings.";
      case "Manager":
        return "You can manage employees and view reports.";
      case "Employee":
      default:
        return "You have limited access to perform your tasks.";
    }
  };

  return (
    <Container className="container">
      <Card className="card">
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Role-Based Access Control
          </Typography>
          <Select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="select"
            variant="outlined"
          >
            <MenuItem value="Employee">Employee</MenuItem>
            <MenuItem value="Manager">Manager</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
          </Select>
          <Typography variant="body1" gutterBottom>
            {renderContent()}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className="button"
            onClick={() => navigate("/employees")}
          >
            Proceed
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;

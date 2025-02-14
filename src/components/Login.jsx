import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent, Typography, MenuItem, Select, Container } from "@mui/material";
import "../styles/Login.css";

const Login = () => {
  const [role, setRole] = useState("SELECT");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (role !== "SELECT") {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/dashboard");
    }
  };

  return (
    <Container className="container">
      <Card className="card">
        <CardContent>
          <Typography variant="h5" gutterBottom style={{ color: "blue", fontWeight: "bold" }}>
            Role-Based Access Control
          </Typography>
          <Select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="select"
            variant="outlined"
          >
            <MenuItem value="SELECT" disabled>Select Role</MenuItem>
            <MenuItem value="Employee">Employee</MenuItem>
            <MenuItem value="Manager">Manager</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
          </Select>
          <Button variant="contained" className="button" onClick={handleLogin}>
            Proceed
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;

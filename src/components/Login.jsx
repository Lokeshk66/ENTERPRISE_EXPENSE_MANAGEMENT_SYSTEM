
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, TextField, Container, Box, Typography, Drawer, List, ListItem, ListItemText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === "employee@example.com" && password === "password") {
      localStorage.setItem("role", "employee");
      navigate("/dashboard");
    } else if (email === "manager@example.com" && password === "password") {
      localStorage.setItem("role", "manager");
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <Container maxWidth="sm">
      {/* <Box mt={5} p={3} boxShadow={3} borderRadius={2}>
        <Typography variant="h5">Login</Typography>
        <TextField fullWidth label="Email" margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField fullWidth label="Password" type="password" margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button fullWidth variant="contained" color="primary" onClick={handleLogin} sx={{ mt: 2 }}>Login</Button>
      </Box> */}
    </Container>
  );
};
export default Login
import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./../styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" className="navbar">
      <Toolbar>
        <Typography variant="h6" className="title">Expense Management</Typography>
        <Button color="inherit" onClick={() => navigate("/employees")}>Employees</Button>
        <Button color="inherit" onClick={() => navigate("/tracking")}>Tracking</Button>
        <Button color="inherit" onClick={() => navigate("/approvals")}>Approvals</Button>
        <Button color="inherit" onClick={() => navigate("/dashboard")}>Dashboard</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

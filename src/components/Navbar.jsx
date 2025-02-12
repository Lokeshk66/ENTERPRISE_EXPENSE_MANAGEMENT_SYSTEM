import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { IoHome } from "react-icons/io5";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" className="navbar">
      <Toolbar>
        <Typography 
          variant="h6" 
          className="title" 
          onClick={() => navigate("/")}
          style={{ cursor: "pointer", flexGrow: 1 }}
        >
        </Typography>

        <Button color="inherit" onClick={() => navigate("/")}><IoHome style={{margin:5}}/>Home</Button>
        <Button color="inherit" onClick={() => navigate("/employees")}>Employees</Button>
        <Button color="inherit" onClick={() => navigate("/tracking")}>Tracking</Button>
        <Button color="inherit" onClick={() => navigate("/approvals")}>Approvals</Button>
        <Button color="inherit" onClick={() => navigate("/dashboard")}>Dashboard</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;


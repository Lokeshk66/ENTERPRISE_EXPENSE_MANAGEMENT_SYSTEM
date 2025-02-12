import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Employees from "./components/Employees";
import Tracking from "./components/Tracking";
import Approvals from "./components/Approvals";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import "./App.css";


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/approvals" element={<Approvals />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;

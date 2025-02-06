import React, { useEffect, useRef } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
  Filler,
} from 'chart.js';

// Registering the chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement, // Required for line charts
  Filler // If you're using fill for line charts
);

const Dashboard = () => {
  // Dummy data for Employee Expense Categories (Pie Chart)
  const pieData = {
    labels: ['Travel', 'Meals', 'Supplies', 'Other'],
    datasets: [
      {
        data: [40, 30, 20, 10], // Data representing each category's share
        backgroundColor: ['#4caf50', '#ff9800', '#2196f3', '#f44336'],
        hoverBackgroundColor: ['#45a049', '#e68900', '#1976d2', '#d32f2f'],
      },
    ],
  };

  // Dummy data for Expenses by Employee (Bar Chart)
  const barData = {
    labels: ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Brown', 'Eva White'],
    datasets: [
      {
        label: 'Total Expenses',
        data: [500, 700, 450, 600, 800], // Total expenses by employee
        backgroundColor: '#1976d2',
        borderColor: '#1565c0',
        borderWidth: 1,
        hoverBackgroundColor: '#0d47a1',
        hoverBorderColor: '#01579b',
      },
    ],
  };

  // Dummy data for Total Expenses Trend over 6 Months (Line Chart)
  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Total Expenses Trend',
        data: [1200, 1400, 1500, 1300, 1700, 1600], // Monthly total expenses
        fill: false,
        borderColor: '#ff9800',
        tension: 0.1,
      },
    ],
  };

  // Chart options for better animation and customization
  const options = {
    responsive: true,
    animation: {
      duration: 1000, // Animation duration
      easing: 'easeOutElastic', // Elastic animation easing
    },
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.label}: $${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  // Use ref to store chart instance and destroy it on unmount
  const chartRef = useRef(null);

  useEffect(() => {
    return () => {
      // Destroy the chart instance to prevent the canvas conflict
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <Box padding={3}>
      <Typography variant="h4" gutterBottom>
        Employee Expenses Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Pie Chart for Expense Categories */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} padding={3}>
            <Typography variant="h6" gutterBottom>
              Expense Category Breakdown
            </Typography>
            <Doughnut data={pieData} options={options} ref={chartRef} />
          </Paper>
        </Grid>

        {/* Bar Chart for Expenses by Employee */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} padding={3}>
            <Typography variant="h6" gutterBottom>
              Total Expenses by Employee
            </Typography>
            <Bar data={barData} options={options} ref={chartRef} />
          </Paper>
        </Grid>

        {/* Line Chart for Total Expenses Trend */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} padding={3}>
            <Typography variant="h6" gutterBottom>
              Total Expenses Trend (Last 6 Months)
            </Typography>
            <Line data={lineData} options={options} ref={chartRef} />
          </Paper>
        </Grid>

        {/* Additional Chart (Doughnut Chart) for Department Expenses */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} padding={3}>
            <Typography variant="h6" gutterBottom>
              Department-wise Expenses
            </Typography>
            <Doughnut
              data={{
                labels: ['HR', 'Finance', 'IT', 'Sales'],
                datasets: [
                  {
                    data: [3000, 1500, 2000, 2500],
                    backgroundColor: ['#4caf50', '#ff9800', '#2196f3', '#f44336'],
                    hoverBackgroundColor: ['#45a049', '#e68900', '#1976d2', '#d32f2f'],
                  },
                ],
              }}
              options={options}
              ref={chartRef}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;

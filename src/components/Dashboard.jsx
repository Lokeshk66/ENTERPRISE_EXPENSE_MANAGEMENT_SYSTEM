import React, { useEffect, useRef } from 'react';
import { Box, Typography, Grid, Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, BarElement, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const Dashboard = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);


  const expenseData = [
    { category: 'Travel', amount: 5000 },
    { category: 'Meals', amount: 3500 },
    { category: 'Office Supplies', amount: 2000 },
    { category: 'Other', amount: 1500 },
  ];


  const monthlyExpenses = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Monthly Expenses (INR)',
        data: [12000, 11000, 14000, 13000, 17000, 16000, 20000, 18000, 15000, 19000, 22000, 21000],
        backgroundColor: '#2196f3',
        borderColor: '#0d47a1',
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  //Yearly Expense Data
  const yearlyExpenses = {
    labels: ['2020', '2021', '2022', '2023', '2024'],
    datasets: [
      {
        label: 'Yearly Expenses (INR)',
        data: [120000, 130000, 140000, 150000, 170000],
        borderColor: '#ff9800',
        backgroundColor: 'rgba(255, 152, 0, 0.5)',
        fill: true,
      },
    ],
  };
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(expenseData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Expenses Report');
    XLSX.writeFile(workbook, 'Expenses_Report.xlsx');
  };
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Expenses Report', 14, 10);
    autoTable(doc, {
      head: [['Category', 'Amount (INR)']],
      body: expenseData.map(item => [item.category, `₹${item.amount}`]),
    });
    doc.save('Expenses_Report.pdf');
  };

  return (
    <Box padding={3}>
      <Typography variant="h4" gutterBottom>
        📊 Employee Expenses Dashboard
      </Typography>

      <Box marginBottom={2}>
        <Button variant="contained" color="primary" onClick={exportToExcel} style={{ marginRight: '10px' }}>
          Export to Excel
        </Button>
        <Button variant="contained" color="secondary" onClick={exportToPDF}>
          Export to PDF
        </Button>
      </Box>

      <Grid container spacing={3}>
        
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h6" gutterBottom>
              Expense Category Breakdown
            </Typography>
            <Doughnut
              data={{
                labels: expenseData.map(item => item.category),
                datasets: [
                  {
                    data: expenseData.map(item => item.amount),
                    backgroundColor: ['#4caf50', '#ff9800', '#2196f3', '#f44336'],
                  },
                ],
              }}
              ref={chartRef}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h6" gutterBottom>
              Expense Breakdown by Category
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Category</strong></TableCell>
                    <TableCell><strong>Amount (INR)</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {expenseData.map((expense, index) => (
                    <TableRow key={index}>
                      <TableCell>{expense.category}</TableCell>
                      <TableCell>₹{expense.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h6" gutterBottom>
              Monthly Expense Trend
            </Typography>
            <Bar data={monthlyExpenses} />
          </Paper>
        </Grid>

      
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h6" gutterBottom>
              Yearly Expense Trend
            </Typography>
            <Line data={yearlyExpenses} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;

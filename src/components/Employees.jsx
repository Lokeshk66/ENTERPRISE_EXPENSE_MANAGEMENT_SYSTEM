import React, { useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  IconButton,
  InputLabel,
  FormControl,
  Fab,
} from "@mui/material";
import { Add, Edit, Delete, AttachFile, Visibility } from "@mui/icons-material";
import "../styles/Employees.css";

const Employees = () => {
  const categories = ["Travel", "Food", "Office Supplies", "Miscellaneous"];
  
  const [expenses, setExpenses] = useState([
    { id: 1, name: "Flight Ticket", amount: 5000, category: "Travel", invoice: null },
    { id: 2, name: "Lunch Meeting", amount: 1200, category: "Food", invoice: null },
    { id: 3, name: "Printer Ink", amount: 900, category: "Office Supplies", invoice: null },
  ]);

  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(null);
  const [filterCategory, setFilterCategory] = useState("All");
  const [currentExpense, setCurrentExpense] = useState({ id: null, name: "", amount: "", category: "", invoice: null });

  const handleOpen = (expense = { id: null, name: "", amount: "", category: "", invoice: null }) => {
    setCurrentExpense(expense);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentExpense({ id: null, name: "", amount: "", category: "", invoice: null });
  };

  const handleChange = (e) => {
    setCurrentExpense({ ...currentExpense, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setCurrentExpense({ ...currentExpense, invoice: { name: file.name, data: reader.result } });
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!currentExpense.name || !currentExpense.amount || !currentExpense.category || isNaN(currentExpense.amount)) {
      alert("Please enter valid expense details.");
      return;
    }

    if (currentExpense.id) {
      setExpenses(expenses.map((exp) => (exp.id === currentExpense.id ? currentExpense : exp)));
    } else {
      setExpenses([...expenses, { ...currentExpense, id: expenses.length + 1 }]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const handlePreview = (invoice) => {
    setPreview(invoice);
  };

  return (
    <Container className="expenses-container">
      <Card className="expense-card">
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            
            <Fab color="primary" aria-label="add" onClick={() => handleOpen()}>
              <Add />
            </Fab>

            <FormControl variant="outlined" className="filter-dropdown">
              <InputLabel>Filter by Category</InputLabel>
              <Select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} label="Filter by Category">
                <MenuItem value="All">All</MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <TableContainer component={Paper} className="table-container">
            <Table>
              <TableHead>
                <TableRow className="table-header">
                  <TableCell>ID</TableCell>
                  <TableCell>Expense Name</TableCell>
                  <TableCell>Amount (INR)</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Invoice</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {expenses
                  .filter((expense) => filterCategory === "All" || expense.category === filterCategory)
                  .map((expense) => (
                    <TableRow key={expense.id} className="table-row">
                      <TableCell>{expense.id}</TableCell>
                      <TableCell>{expense.name}</TableCell>
                      <TableCell>{formatCurrency(expense.amount)}</TableCell>
                      <TableCell>{expense.category}</TableCell>
                      <TableCell>
                        {expense.invoice ? (
                          <IconButton color="primary" onClick={() => handlePreview(expense.invoice)}>
                            <Visibility />
                          </IconButton>
                        ) : (
                          "No Invoice"
                        )}
                      </TableCell>
                      <TableCell>
                        <IconButton color="primary" onClick={() => handleOpen(expense)}>
                          <Edit />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDelete(expense.id)}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentExpense.id ? "Edit Expense" : "Add Expense"}</DialogTitle>
        <DialogContent>
          <TextField label="Expense Name" name="name" value={currentExpense.name} onChange={handleChange} fullWidth margin="dense" />
          <TextField label="Amount (INR)" name="amount" type="number" value={currentExpense.amount} onChange={handleChange} fullWidth margin="dense" />
          <FormControl fullWidth margin="dense">
            <InputLabel>Category</InputLabel>
            <Select name="category" value={currentExpense.category} onChange={handleChange}>
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <input accept="image/*,application/pdf" type="file" onChange={handleFileUpload} />
          {currentExpense.invoice && <Typography variant="body2">Attached: {currentExpense.invoice.name}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      
      {preview && (
        <Dialog open={!!preview} onClose={() => setPreview(null)}>
          <DialogTitle>Invoice Preview</DialogTitle>
          <DialogContent>
            {preview.name.endsWith(".pdf") ? (
              <embed src={preview.data} type="application/pdf" width="100%" height="400px" />
            ) : (
              <img src={preview.data} alt="Invoice" width="100%" />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setPreview(null)} color="primary">
              Close
            </Button>
            <Button component="a" href={preview.data} download={preview.name} color="secondary">
              Download
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
};

export default Employees;

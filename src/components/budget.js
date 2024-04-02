import React, { useState } from "react";
import { registerables } from "chart.js";
import { ArcElement } from "chart.js";
import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import {
  Box,
  Button,
  TextField,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Modal,
  Select,
} from "@mui/material";
import "./budget.css";

const Budget = () => {
  const [transactions, setTransactions] = useState([]);
  const [newTransaction, setNewTransaction] = useState({
    type: "expense",
    description: "",
    amount: "",
    date: "",
  });
  const [editTransactionIndex, setEditTransactionIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (e) => {
    setNewTransaction({
      ...newTransaction,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddTransaction = () => {
    setTransactions([...transactions, newTransaction]);
    setNewTransaction({
      type: "expense",
      description: "",
      amount: "",
      date: "",
    });
  };

  const handleDeleteTransaction = (index) => {
    setTransactions(transactions.filter((_, i) => i !== index));
  };

  const handleEditTransaction = (index) => {
    setEditTransactionIndex(index);
    setIsModalOpen(true);
  };

  const handleSaveEditTransaction = () => {
    setTransactions(
      transactions.map((transaction, index) =>
        index === editTransactionIndex ? { ...newTransaction } : transaction
      )
    );
    setIsModalOpen(false);
    setEditTransactionIndex(null);
    setNewTransaction({
      type: "expense",
      description: "",
      amount: "",
      date: "",
    });
  };

  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);

  const totalExpense = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);

  const totalBalance = totalIncome - totalExpense;

  const chartData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Transactions",
        data: [totalIncome, totalExpense],
        backgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  return (
    <div>
      <Box mb={3} className="heading">
        <Typography variant="h3">Budget Tracker</Typography>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        className="task_description"
      >
        <Box className="task_fields">
          <Select
            id="type"
            name="type"
            value={newTransaction.type}
            onChange={handleInputChange}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </Select>
          <TextField
            name="description"
            label="Description"
            value={newTransaction.description}
            onChange={handleInputChange}
          />
          <TextField
            name="amount"
            label="Amount"
            type="number"
            value={newTransaction.amount}
            onChange={handleInputChange}
          />
          <TextField
            name="date"
            label="Date"
            type="date"
            value={newTransaction.date}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <Button variant="contained" onClick={handleAddTransaction}>
            Add Transaction
          </Button>
        </Box>
        <Box width="50%">
          <Pie data={chartData} />
        </Box>
      </Box>
      <Box mt={3} className="table_div">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction, index) => (
                <TableRow key={index}>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEditTransaction(index)}>
                      Edit
                    </Button>
                    <Button onClick={() => handleDeleteTransaction(index)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box mt={3}>
        <Typography
          sx={{ fontWeight: "bold", fontFamily: "Arial, sans-serif" }}
        >
          Total Income: {totalIncome.toFixed(2)}
        </Typography>
        <Typography
          sx={{ fontWeight: "bold", fontFamily: "Arial, sans-serif" }}
        >
          Total Expense: {totalExpense.toFixed(2)}
        </Typography>
        <Typography
          sx={{ fontWeight: "bold", fontFamily: "Arial, sans-serif" }}
        >
          Total Balance: {totalBalance.toFixed(2)}
        </Typography>
      </Box>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            minWidth: 400,
          }}
        >
          <Typography variant="h5">Edit Transaction</Typography>
          <label htmlFor="type">Type:</label>
          <select
            id="type"
            name="type"
            value={newTransaction.type}
            onChange={handleInputChange}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <TextField
            name="description"
            label="Description"
            value={newTransaction.description}
            onChange={handleInputChange}
          />
          <TextField
            name="amount"
            label="Amount"
            type="number"
            value={newTransaction.amount}
            onChange={handleInputChange}
          />
          <TextField
            name="date"
            label="Date"
            type="date"
            value={newTransaction.date}
            onChange={handleInputChange}
          />
          <Button variant="contained" onClick={handleSaveEditTransaction}>
            Save
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Budget;

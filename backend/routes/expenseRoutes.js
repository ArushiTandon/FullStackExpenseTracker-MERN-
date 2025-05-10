const express = require('express');
const router = express.Router();
const { jwtAuthMiddleware } = require('../middlewares/jwt');
const { addExpense, getAllExpense, deleteExpense, downloadExpenseExcel } = require('../controllers/expenseController');

router.post('/add', jwtAuthMiddleware, addExpense);

router.get('/all', jwtAuthMiddleware, getAllExpense);

router.get('/downloadexcel', jwtAuthMiddleware, downloadExpenseExcel);

router.delete('/delete/:id', jwtAuthMiddleware, deleteExpense);


module.exports = router;
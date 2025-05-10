const express = require('express');
const router = express.Router();
const { jwtAuthMiddleware } = require('../middlewares/jwt');
const {addIncome, getAllIncome, deleteIncome, downloadIncomeExcel } = require('../controllers/incomeController');

router.post('/add', jwtAuthMiddleware, addIncome);

router.get('/all', jwtAuthMiddleware, getAllIncome);

router.get('/downloadexcel', jwtAuthMiddleware, downloadIncomeExcel);

router.delete('/delete/:id', jwtAuthMiddleware, deleteIncome);


module.exports = router;
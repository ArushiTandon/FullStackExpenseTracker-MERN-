const Expense = require('../models/expense');
const xlsx = require('xlsx');


exports.addExpense = async (req, res) => {
    const userId = req.user.id;
  
    try {
      const { icon, category, amount, date } = req.body;
  
      if (!category || !amount || !date) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      const newExpense = new Expense({
        userId,
        icon,
        category,
        amount,
        date: new Date(date)
      });
  
      await newExpense.save();
  
      res.status(200).json(newExpense);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  exports.getAllExpense = async (req, res) => {
    const userId = req.user.id;
  
    try {
      const allExpense = await Expense.find({ userId }).sort({ createdAt: -1 });
      res.status(200).json(allExpense);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  exports.deleteExpense = async (req, res) => {
    const expenseId = req.params.id;
  
    try {
      await Expense.findByIdAndDelete(expenseId);
      res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;
  
    try {
      const expense = await Expense.find({ userId }).sort({ createdAt: -1 });
  
      const data = expense.map(item => ({
        Category: item.category,
        Amount: item.amount,
        Date: item.date,
      }));
  
      const wb = xlsx.utils.book_new();
      const ws = xlsx.utils.json_to_sheet(data);
      xlsx.utils.book_append_sheet(wb, ws, 'Expense Data');
      const filePath = 'expense_details.xlsx';
      xlsx.writeFile(wb, filePath);
  
      res.download(filePath);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
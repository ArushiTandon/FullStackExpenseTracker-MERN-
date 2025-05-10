const Income = require('../models/income');
const xlsx = require('xlsx');


exports.addIncome = async (req, res) => {
    const userId = req.user.id;
  
    try {
      const { icon, source, amount, date } = req.body;
  
      if (!source || !amount || !date) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      const newIncome = new Income({
        userId,
        icon,
        source,
        amount,
        date: new Date(date)
      });
  
      await newIncome.save();
  
      res.status(200).json(newIncome);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  exports.getAllIncome = async (req, res) => {
    const userId = req.user.id;
  
    try {
      const allIncome = await Income.find({ userId }).sort({ createdAt: -1 });
      res.status(200).json(allIncome);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  exports.deleteIncome = async (req, res) => {
    const incomeId = req.params.id;
  
    try {
      await Income.findByIdAndDelete(incomeId);
      res.status(200).json({ message: 'Income deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;
  
    try {
      const income = await Income.find({ userId }).sort({ createdAt: -1 });
  
      const data = income.map(item => ({
        Source: item.source,
        Amount: item.amount,
        Date: item.date,
      }));
  
      const wb = xlsx.utils.book_new();
      const ws = xlsx.utils.json_to_sheet(data);
      xlsx.utils.book_append_sheet(wb, ws, 'Income Data');
      const filePath = 'income_details.xlsx';
      xlsx.writeFile(wb, filePath);
  
      res.download(filePath);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
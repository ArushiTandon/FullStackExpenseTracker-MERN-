const Income = require('../models/income');
const Expense = require('../models/expense');
const { isValidObjectId, Types } = require("mongoose");

exports.getDashboardData = async (req, res) => {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));

    try {

        const totalIncome = await Income.aggregate([
            {$match: {userId: userObjectId} },
            { $group: {_id: null, total: { $sum: "$amount"} } },
        ]);

        console.log("totalIncome", {totalIncome, userId: isValidObjectId(userId)});
        
        const totalExpense = await Expense.aggregate([
            { $match: {userId: userObjectId} },
            { $group: {_id: null, total: { $sum: "$amount" } } },
        ]);


        const last60DaysIncomeTransaction = await Income.find({
            userId,
            date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
        }).sort({ date: - 1 });


        const incomeLast60Days = last60DaysIncomeTransaction.reduce(
            (sum, transaction) => sum + transaction.amount, 0
        );


        const last30DaysExpenseTransaction = await Expense.find({
            userId,
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        }).sort({ date: - 1 });


        const expensesLast30Days = last30DaysExpenseTransaction.reduce(
            (sum, transaction) => sum + transaction.amount, 0
        );

        const LastTransaction = [
            ...(await Income.find({ userId}).sort({ date: -1 }).limit(5)).map(
                (txn) => ({
                ...txn.toObject(),
                type: "income",

            })
        ),
        ...(await Expense.find({ userId}). sort({ date: -1 }).limit(5)).map(
            (txn) => ({
               ...txn.toObject(),
               type: "expense", 
            })
        ),
    ].sort((a,b) => b.date - a.date);

    res.json({
        totalBalance: 
        (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
        totalIncome: totalIncome[0]?.total || 0,
        totalExpense: totalExpense[0]?.total || 0,
        last30DaysExpenses: {
            total: expensesLast30Days,
            Transaction: last30DaysExpenseTransaction,
        },
        last60DaysIncome: {
            total: incomeLast60Days,
            transaction: last60DaysIncomeTransaction,
        },
        recentTransaction: LastTransaction,
    });

    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error});
    }


     
}
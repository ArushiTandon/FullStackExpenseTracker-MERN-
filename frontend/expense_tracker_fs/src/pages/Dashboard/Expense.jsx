import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../../hooks/useUserAuth'
import DashboardLayout from '../../components/layouts/DashboardLayout';
import axiosInstance from '../../util/axiosInstance';
import { API_PATHS } from '../../util/apiPaths';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';

const Expense = () => {
  useUserAuth();

   const [expenseData, setExpenseData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
      show: false,
      data: null,
    });
  
    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

      const fetchExpenseDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(`${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`);

      if (response.data) {
        setExpenseData(response.data);
      }

    } catch (error) {
      console.error("Error fetching expense data:", error);
    } finally {
      setLoading(false);
    }
  };

  //Handle Add Expense
 const handleAddExpense = async (expense) => {
  const {category, amount, date, icon } = expense;

  //Valid checks
  if(!category.trim()) {
    toast.error("Category is required");
    return;
  }

  if(!amount || isNaN(amount) || Number(amount) <= 0) {
    toast.error("Amount is required and must be greater than 0");
    return;
  }

  if(!date) {
    toast.error("Date is required");
    return;
  }

  try{
    await axiosInstance.post( API_PATHS.EXPENSE.ADD_EXPENSE, {
      category,
      amount,
      date,
      icon
    });
    setOpenAddExpenseModal(false);
    toast.success("Expense added successfully");
    fetchExpenseDetails();
  } catch (error) {
    console.error("Error adding expense:", error.response?.data?.message || error.message);
  }
};

useEffect(() => {
  fetchExpenseDetails();
  return () => {}
}, [])

// //Delete Income
// const deleteExpense = async (id) => {
//   try {
//   await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_INCOME(id));

//     setOpenDeleteAlert({ show: false, data: null });
//     toast.success("Income deleted successfully");
//     fetchExpenseDetails();
    
//   } catch (error) {
//     console.error("Error deleting expense:", error.response?.data?.message || error.message);
    
//   }
// };

  return (
    <DashboardLayout activeMenu="Expense">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div className=''>
            <ExpenseOverview
            transactions={expenseData}
            onExpense={() => setOpenAddExpenseModal(true)}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Expense
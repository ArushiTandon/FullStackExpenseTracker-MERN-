import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import IncomeOverview from '../../components/income/IncomeOverview';
import { data } from 'react-router-dom';
import axiosInstance from '../../util/axiosInstance';
import { API_PATHS } from '../../util/apiPaths';
import Modal from '../../components/Modal';
import AddIncomeForm from '../../components/income/AddIncomeForm';
import toast from 'react-hot-toast';

const Income = () => {

  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);


  //Get all income details
  const fetchIncomeDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(`${API_PATHS.INCOME.GET_ALL_INCOME}`);

      if (response.data) {
        setIncomeData(response.data);
      }

    } catch (error) {
      console.error("Error fetching income data:", error);
    } finally {
      setLoading(false);
    }
  };

  //Handle Add Income
const handleAddIncome = async (income) => {
  const {source, amount, date, icon } = income;

  //Valid checks
  if(!source.trim()) {
    toast.error("Source is required");
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
    await axiosInstance.post( API_PATHS.INCOME.ADD_INCOME, {
      source,
      amount,
      date,
      icon
    });
    setOpenAddIncomeModal(false);
    toast.success("Income added successfully");
    fetchIncomeDetails();
  } catch (error) {
    console.error("Error adding income:", error.response?.data?.message || error.message);
  }
};

//Delete Income
const deleteIncome = async (id) => {};

//handle download income details
const handleDownloadIncomeDetails = async () => {};

useEffect(() => {
  fetchIncomeDetails();

  return () => {}
}, [])


  return (
     <DashboardLayout activeMenu="Income">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div className=''>
            <IncomeOverview
            transactions={incomeData}
            onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>
        </div>

        <Modal
        isOpen={openAddIncomeModal}
        onClose={() => setOpenAddIncomeModal(false)}
        title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Income
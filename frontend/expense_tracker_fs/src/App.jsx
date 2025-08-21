import React from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  } from "react-router-dom";

import Login from './pages/auth/Login'
import SignUp from './pages/auth/SignUp';
import Home from './pages/Dashboard/Home';
import Income from './pages/Dashboard/Income';
import Expense from './pages/Dashboard/Expense';
import UserProvider from './context/userContext';
import ForgotPassword from './components/Password/ForgotPassword';
import ResetPassword from './components/Password/ResetPassword';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <UserProvider>
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/income" element={<Income />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword/:id" element={<ResetPassword />} />
       </Routes> 
      </Router>
    </div>

    <Toaster
      toastOptions={{
        className: "",
        style: {
          fontSize: "13px"
        },
      }}
      />
    </UserProvider>
  );
}

export default App;

const Root = () => {

  const isAuthenticated = !!localStorage.getItem('token');

  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};

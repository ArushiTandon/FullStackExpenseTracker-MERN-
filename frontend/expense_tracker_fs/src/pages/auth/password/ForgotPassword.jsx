// ForgotPassword.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../../components/layouts/AuthLayout';
import Input from '../../../components/inputs/Input';
import { validateEmail } from '../../../util/helper';
import axiosInstance from '../../../util/axiosInstance';
import { API_PATHS } from '../../../util/apiPaths';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await axiosInstance.post(API_PATHS.PASSWORD.FORGOT_PASSWORD, {
        email
      });

      if (response.data.message) {
        setSuccess(true);
        setError(null);
      }
    } catch (error) {
      if (error.response && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError("Failed to send reset email. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Forgot Password</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Enter your email address and we'll send you a link to reset your password.
        </p>

        {!success ? (
          <form onSubmit={handleForgotPassword}>
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="Enter your registered email"
              type="email"
              required
            />

            {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

            <button 
              type="submit" 
              className="btn-primary"
              disabled={loading}
            >
              {loading ? "SENDING..." : "SEND RESET LINK"}
            </button>

            <p className='text-[13px] text-slate-800 mt-3'>
              Remember your password?{" "}
              <Link className="font-medium text-primary underline" to="/login">
                Back to Login
              </Link>
            </p>
          </form>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="text-green-800 font-medium mb-2">Check your email</h4>
            <p className="text-green-700 text-sm mb-4">
              We've sent a password reset link to {email}. 
              Please check your inbox and follow the instructions.
            </p>
            <p className="text-xs text-slate-600 mb-4">
              Didn't receive the email? Check your spam folder or try again.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => {
                  setSuccess(false);
                  setEmail("");
                }}
                className="text-sm text-primary underline"
              >
                Try another email
              </button>
              <Link to="/login" className="text-sm text-primary underline">
                Back to Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
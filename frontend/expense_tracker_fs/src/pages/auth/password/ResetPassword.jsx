// ResetPassword.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AuthLayout from '../../../components/layouts/AuthLayout';
import Input from '../../../components/inputs/Input';
import axiosInstance from '../../../util/axiosInstance';
import { API_PATHS } from '../../../util/apiPaths';

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validLink, setValidLink] = useState(true);
  
  const navigate = useNavigate();
  const { id:resetId } = useParams();

  useEffect(() => {
    if (!resetId) {
      setValidLink(false);
      setError("Invalid reset link. Please request a new password reset.");
    }
  }, [resetId]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    // Validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await axiosInstance.post(
        API_PATHS.PASSWORD.RESET_PASSWORD(resetId),
        { password }
      );

      if (response.data.message) {
        setSuccess(true);
        setError(null);
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    } catch (error) {
      if (error.response && error.response.data.error) {
        setError(error.response.data.error);
        if (error.response.data.error.includes("Invalid or expired")) {
          setValidLink(false);
        }

         if (error.response.data.error.includes("expired")) {
      setValidLink(false); 
    }
      } else {
        setError("Failed to reset password. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Reset Password</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Enter your new password below
        </p>

        {!validLink ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="text-red-800 font-medium mb-2">Invalid or Expired Link</h4>
            <p className="text-red-700 text-sm mb-4">
              This password reset link is invalid or has expired. 
              Please request a new password reset.
            </p>
            <Link 
              to="/forgotpassword" 
              className="inline-block bg-primary text-white px-4 py-2 rounded text-sm hover:bg-primary-dark transition-colors"
            >
              Request New Reset Link
            </Link>
          </div>
        ) : !success ? (
          <form onSubmit={handleResetPassword}>
            <Input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              type="password"
              placeholder="New Password"
              label="New Password"
              required
              className="mb-4"
            />
            
            <Input
              value={confirmPassword}
              onChange={({ target }) => setConfirmPassword(target.value)}
              type="password"
              placeholder="Confirm New Password"
              label="Confirm New Password"
              required
              className="mb-4"
            />

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !password || !confirmPassword}
              className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Resetting Password..." : "Reset Password"}
            </button>

            <div className="text-center mt-6">
              <Link 
                to="/login" 
                className="text-primary text-sm hover:text-primary-dark transition-colors"
              >
                Back to Login
              </Link>
            </div>
          </form>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="text-green-800 font-medium mb-2">Password Reset Successful!</h4>
            <p className="text-green-700 text-sm mb-4">
              Your password has been successfully reset. You will be redirected to the login page in a few seconds.
            </p>
            <Link 
              to="/login" 
              className="inline-block bg-primary text-white px-4 py-2 rounded text-sm hover:bg-primary-dark transition-colors"
            >
              Go to Login Now
            </Link>
          </div>
        )}
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
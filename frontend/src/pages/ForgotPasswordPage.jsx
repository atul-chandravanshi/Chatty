import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleClick = async (e) => {
    if (!email.trim()) {
      e.preventDefault(); // Stop navigation
      toast.error("Please enter your email address!");
      return;
    }
    // Check if email matches the pattern (i.e., Gmail address)
    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    
    if (!emailPattern.test(email)) {
      e.preventDefault(); // Stop navigation
      toast.error("Please enter a valid Gmail address!");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/sendforgototp`,
        {
          email: email,
        },
        { withCredentials: true }
      );
      toast.success("OTP sent successfully!"); // Placeholder success message
    } catch (error) {
      toast.error("Failed to send OTP");
      navigate("/forgot-password"); // Redirect to home page on error
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <div className="mb-6 text-center">
          <h2 className="text-xl md:text-2xl font-semibold text-purple-700">
            Forgot Password
          </h2>
        </div>

        <div className="mb-6 text-center">
          <h3 className="text-lg font-semibold text-gray-700">
            Recover Your Account
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            Enter your Gmail address and we will send you a password reset link.
          </p>
        </div>

        <form className="text-center">
          <div className="flex justify-center mb-4">
            <input
              type="email"
              name="email"
              placeholder="Enter your Gmail address"
              className="w-full h-12 text-base text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
              pattern=".+@gmail\.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <Link
            to="/otp"
            onClick={handleClick}
            className="w-full bg-purple-700 text-white font-semibold px-36 py-2 mt-6 rounded-lg hover:bg-purple-800 transition"
          >
            Send OTP
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;

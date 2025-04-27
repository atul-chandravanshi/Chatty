import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const OtpPage = () => {
    const [otp, setOtp] = useState("");
    var newOtp;;
    const navigate = useNavigate();

    const handleOtp = async () => {
        try {
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/auth/checkotp`,);
            newOtp = response.data.otp;
            
            if (otp === newOtp) {
                toast.success("OTP verified successfully!");
                navigate("/set-password"); // Redirect to the next page after successful verification
            }
            else {
                toast.error("Invalid OTP. Please try again.");
                setOtp("");
            }
        }
        catch (error) {
            console.error("Error sending OTP:", error);
            toast.error("Failed to send OTP. Please try again.");
        }
      };

    const handleSubmit = (e) => {
      e.preventDefault();
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <div className="mb-6 text-center">
          <h2 className="text-xl md:text-2xl font-semibold text-purple-700">
            Email Verification
          </h2>
        </div>

        <div className="mb-6 text-center">
          <h3 className="text-lg font-semibold text-gray-700">Get Your Code</h3>
          <p className="text-sm text-gray-500 mt-2">
            Please enter the 6 digit code that was sent to your email address.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="text-center">
          <div className="flex justify-center mb-4">
            {/* Input field for the 6-digit code */}
            <input
              type="number"
              name="otp"
              placeholder="Enter the OTP"
              className="w-full h-12 text-xl text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6} // Limit to 6 digits
              minLength={6} // Minimum length of 6 digits
              regxex="[0-9]{6}" // Regex to allow only digits
              pattern="[0-9]{6}" // Pattern to allow only digits
            />
          </div>

          {/* Optional Resend Link */}
          {/* 
          <p className="text-sm text-gray-500">
            If you don't receive the code, <a href="/resendotp" className="text-purple-700 hover:underline">Resend</a>
          </p> 
          */}

          <button
            onClick={handleOtp}
            type="submit"
            className="w-full bg-purple-700 text-white font-semibold py-3 mt-6 rounded-lg hover:bg-purple-800 transition"
          >
            Verify and Proceed
          </button>
        </form>
      </div>
    </div>
  );
};

export default OtpPage;

import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import axios from "axios";


const SetPasswordPage = () => {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  useEffect(() => {
    if (!password1 || !password2) {
      setMessage("");
    } else if (password1 === password2) {
      setMessage("Passwords match ✅");
    } else {
      setMessage("Passwords do not match ❌");
    }
  }, [password1, password2]);

  const handlePasswordSave = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/setpassword`,
        {
          password: password1,
        },
        { withCredentials: true }
      );
      toast.success("Password saved successfully!");
    } catch (error) {
      toast.error("Failed to save password");
      console.error("Error saving password:", error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center w-screen h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Password Match Checker
          </h1>
          <div className="flex flex-col space-y-4">
            <div className="relative">
              <input
                type={showPassword1 ? "text" : "password"}
                placeholder="Enter password"
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
                className="p-3 border rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword1(!showPassword1)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPassword1 ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword2 ? "text" : "password"}
                placeholder="Re-enter password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                className="p-3 border rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword2(!showPassword2)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPassword2 ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {message && (
              <div className="text-center mt-4 font-medium text-lg">
                {message}
              </div>
            )}
            <Link
              onClick={handlePasswordSave}
              to={'/login'}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 text-center rounded-xl transition duration-200"
            >
              Save Passwords
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SetPasswordPage;

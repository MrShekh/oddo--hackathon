import React, { useState } from "react";

const Register = ({ onSwitch }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center mb-8">Create a new account</h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={() => setShowConfirm((prev) => !prev)}
              tabIndex={-1}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>
          <select className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="mentor">Admin</option>
          </select>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded transition duration-200"
          >
            Register
          </button>
        </form>
        <div className="text-center mt-4">
          <span className="text-gray-600">Already have an account? </span>
          <button className="text-indigo-600 hover:underline font-semibold" onClick={() => onSwitch('login')}>
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register; 
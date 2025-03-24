import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authStore } from "../store/authStore";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { signin, isSignedIn } = authStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await signin(formData);
    if (success) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a]">
      <div className="text-emerald-600 p-10 rounded-xl shadow-2xl border-1 w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-emerald-600">Welcome Back</h2>
          <p className="text-emerald-600 mt-2">Please sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-emerald-600 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-3 bg-[#333333] rounded-lg text-white placeholder-gray-500 focus:outline-none"
              placeholder="name@example.com"
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-emerald-600">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-emerald-600 hover:text-white"
              >
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full px-4 py-3 bg-[#333333] rounded-lg text-white placeholder-gray-500 focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSignedIn}
            className="w-full bg-emerald-600 text-white py-3 rounded-lg font-medium hover:bg-[#4a4a4a]"
          >
            {isSignedIn ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-gray-400 text-center mt-8">
          Don't have an account?{" "}
          <Link to="/signup" className="text-emerald-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;

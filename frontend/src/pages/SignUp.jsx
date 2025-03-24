import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authStore } from "../store/authStore";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { signup, isSignedUp } = authStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await signup(formData);
    if (success) {
      navigate("/");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a]">
      <div className="text-emerald-600 p-10 rounded-xl shadow-2xl border-1 w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-emerald-600">
            Create Account
          </h2>
          <p className="text-emerald-600 mt-2">
            Please fill in your details to register
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-emerald-600 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#333333] rounded-lg text-white placeholder-gray-500 focus:outline-none"
              placeholder="name@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-emerald-600 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#333333] rounded-lg text-white placeholder-gray-500 focus:outline-none"
              placeholder="Create a strong password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-3 rounded-lg font-medium hover:bg-[#4a4a4a]"
            disabled={isSignedUp}
          >
            {isSignedUp ? "Loading..." : "Create Account"}
          </button>
        </form>

        <p className="text-gray-400 text-center mt-8">
          Already have an account?{" "}
          <Link to="/signin" className="text-emerald-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

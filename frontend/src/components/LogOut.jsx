import React from "react";
import { authStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
  const { logout } = authStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/signin");
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 
          text-white rounded-lg font-medium shadow-md
          hover:from-emerald-600 hover:to-emerald-700 
          focus:ring-4 focus:ring-emerald-200 
          transition-all duration-300"
    >
      Log Out
    </button>
  );
};

export default LogOut;
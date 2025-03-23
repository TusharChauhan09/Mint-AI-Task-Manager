import React from "react";

const Button = ({ onClick, disabled, loading, children, className }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors ${className}`}
    >
      {loading ? "Generating..." : children}
    </button>
  );
};

export default Button;

import React from "react";

const Card = ({ name, registrationNo }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 flex flex-col items-center">
      <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mb-4">
        <span className="text-white font-bold text-xl">
          {name.charAt(0).toUpperCase()}
        </span>
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{name}</h3>
      <p className="text-sm text-gray-600">Registration No. : {registrationNo}</p>
    </div>
  );
};

export default Card;

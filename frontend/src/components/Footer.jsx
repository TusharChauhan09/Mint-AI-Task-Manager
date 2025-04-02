import React from "react";
import Card from "./Card";

const Footer = () => {
  const teamMembers = [
    { name: "John Doe", registrationNo: "123" },
    { name: "Jane Smith", registrationNo: "123" },
    { name: "Alex Johnson", registrationNo: "123" }
  ];

  return (
    <footer className="bg-gradient-to-r from-emerald-500 to-emerald-700 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-4">
            Mint AI
          </h2>
          <p className="text-emerald-100 max-w-2xl mx-auto">
            Empowering your productivity with intelligent task management
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card 
              key={index} 
              name={member.name} 
              registrationNo={member.registrationNo} 
            />
          ))}
        </div>
        
        <div className="mt-12 pt-8 border-t border-emerald-400 text-center text-sm text-white">
          <p> {new Date().getFullYear()} Mint AI Task Manager. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

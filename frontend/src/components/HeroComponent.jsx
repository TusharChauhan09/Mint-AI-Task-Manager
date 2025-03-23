import React from "react";
import { Link } from "react-router-dom";

const HeroComponent = () => {
  const trustedCompanies = [
    { name: "Homework", logo: "adobe" },
    { name: "Project", logo: "shopify" },
    { name: "Music", logo: "spotify" },
    { name: "GYM", logo: "slack" },
    { name: "Google", logo: "google" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center space-x-2 bg-emerald-50 rounded-full px-4 py-2">
            <svg
              className="w-5 h-5 text-emerald-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <span className="text-sm text-emerald-800">
              AI-Powered Task Management
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
            Manage Tasks
            <br />
            Smarter with AI
          </h1>

          <p className="text-lg text-gray-600 max-w-lg">
            Transform your productivity with our AI-powered task manager.
            Prioritize, schedule, and complete tasks effortlessly.
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <Link
              to="/signup"
              className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 
                         transition-colors duration-300 font-medium shadow-sm hover:shadow-md
                         flex items-center"
            >
              Get Started Free
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
            <button className="text-gray-600 hover:text-gray-900 font-medium">
              See how it works
            </button>
          </div>

          
        </div>

        <div className="relative">
          <div className="bg-white rounded-2xl shadow-xl p-4">
            <div className="space-y-4">
              <div className="h-3 bg-gray-100 rounded w-3/4"></div>
              <div className="h-3 bg-gray-100 rounded"></div>
              <div className="h-3 bg-gray-100 rounded w-5/6"></div>
            </div>
          </div>

          <div className="absolute -z-10 top-0 right-0 w-72 h-72 bg-emerald-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
          <div className="absolute -z-10 bottom-0 left-0 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
        </div>
      </div>

      <div className="mt-20 text-center">
        <p className="text-gray-600 mb-8">
          Trusted by innovative teams worldwide
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 opacity-75 ">
          {trustedCompanies.map((company) => (
            <span
              key={company.name}
              className="text-gray-400 text-lg font-semibold cursor-pointer " 
            >
              {company.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroComponent;

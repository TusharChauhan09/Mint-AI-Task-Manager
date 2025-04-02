import React, { useState } from "react";
import { Link } from "react-router-dom";
import LogOut from "./LogOut";
import { authStore } from "../store/authStore";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { authUser } = authStore();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <nav className="bg-white border-b border-gray-100 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center lg:ml-6">
            <Link to="/" className="flex items-center">
              <div className="w-8 h-8 bg-emerald-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <span className="ml-2 text-xl font-semibold text-gray-800">
                MintTask
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center justify-end flex-1 lg:mr-6">
            <div className="flex items-center space-x-8">
              <Link
                to="/"
                className="text-gray-600 hover:text-emerald-600 transition-colors"
              >
                Home
              </Link>

              <button
                onClick={scrollToTop}
                className="text-gray-600 hover:text-emerald-600 transition-colors bg-transparent border-none cursor-pointer"
              >
                About
              </button>

              {authUser ? (
                <LogOut />
              ) : (
                <Link
                  to="/signin"
                  className="text-gray-600 hover:text-emerald-600 transition-colors"
                >
                  Log In
                </Link>
              )}

              {!authUser && (
                <Link
                  to="/signup"
                  className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 
                           transition-colors duration-300 font-medium shadow-sm hover:shadow-md"
                >
                  Get Started
                </Link>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-emerald-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-gray-600 hover:text-emerald-600 hover:bg-gray-50"
            >
              Home
            </Link>

            <button
              onClick={() => {
                scrollToTop();
                setIsOpen(false);
              }}
              className="w-full text-left block px-3 py-2 rounded-md text-gray-600 hover:text-emerald-600 hover:bg-gray-50 bg-transparent border-none cursor-pointer"
            >
              About
            </button>

            {authUser ? (
              <div className="px-3 py-2">
                <LogOut />
              </div>
            ) : (
              <Link
                to="/signin"
                className="block px-3 py-2 rounded-md text-gray-600 hover:text-emerald-600 hover:bg-gray-50"
              >
                Log In
              </Link>
            )}

            {!authUser && (
              <Link
                to="/signup"
                className="block px-3 py-2 rounded-md text-white bg-emerald-600 hover:bg-emerald-700"
              >
                Get Started
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

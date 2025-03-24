import React from "react";
import { Toaster } from "react-hot-toast";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";
import TextGenerator from "./components/TextGenerator";
import ImageGenerator from "./components/ImageGenerator";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { authStore } from "./store/authStore";
import { useEffect } from "react";

// import About from "./pages/About";
// import Login from "./pages/Login";

const App = () => {
  const { authUser, checkAuth, isLoading } = authStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a]">
        <div className="text-emerald-600">Loading...</div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
        <Navbar />
        <div className="pt-16">
          <Routes>
            <Route
              path="/"
              element={authUser ? <LandingPage /> : <Navigate to="/signin" />}
            />
            <Route
              path="/signup"
              element={!authUser ? <SignUp /> : <Navigate to="/" />}
            />
            <Route
              path="/signin"
              element={!authUser ? <SignIn /> : <Navigate to="/" />}
            />
            {/* <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} /> */}
            <Route
              path="/TextGenerator"
              element={authUser ? <TextGenerator /> : <Navigate to="/signin" />}
            />
            <Route
              path="/ImageGenerator"
              element={
                authUser ? <ImageGenerator /> : <Navigate to="/signin" />
              }
            />
          </Routes>
          <Toaster />
        </div>
      </div>
    </Router>
  );
};

export default App;

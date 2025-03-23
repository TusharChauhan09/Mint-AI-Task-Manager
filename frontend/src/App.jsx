import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";
import TextGenerator from "./components/TextGenerator";
import ImageGenerator from "./components/ImageGenerator";
// import About from "./pages/About";
// import Login from "./pages/Login";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
        <Navbar />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            {/* <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} /> */}
            <Route path="/TextGenerator" element={<TextGenerator />} />
            <Route path="/ImageGenerator" element={<ImageGenerator />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

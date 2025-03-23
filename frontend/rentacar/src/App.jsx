import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import CarListing from "./pages/CarListing";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar /> {/* Navbar now handles Login/Register via modal */}
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cars" element={<CarListing />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

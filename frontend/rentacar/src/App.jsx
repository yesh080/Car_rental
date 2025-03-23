import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home/Home";
import CarListing from "./pages/CarListing";
import CarDetails from "./components/CarDetails";
import SearchResults from "./pages/SearchResults";
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cars" element={<CarListing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cars/:id" element={<CarDetails />} />
            <Route path="/search" element={<SearchResults />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

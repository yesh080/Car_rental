import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './pages/Navbar';
import Home from './pages/Home';
import CarListing from './pages/CarListing';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
      <Navbar />
        <div >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cars" element={<CarListing />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
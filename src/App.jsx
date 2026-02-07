import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import FrozenItems from './pages/FrozenItems';
import AboutUs from './pages/AboutUs';
import Login from './pages/Login';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/frozen-items" element={<FrozenItems />} />
          <Route path="/frozen-items/:category" element={<FrozenItems />} />
          <Route path="/fresh-meals" element={<div className="pt-40 text-center text-4xl font-black">Fresh Meals Coming Soon!</div>} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}
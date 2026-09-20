import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import BorrowerDashboard from './components/BorrowerDashboard';
import LenderDashboard from './components/LenderDashboard';
import MainLandingPage from './components/MainLandingPage';
import LoanApplicationWizard from './components/LoanApplicationWizard';

export default function App() {
  return (
    <BrowserRouter>
      {/* 
        Unified Global Navbar 
        This is a sleek, professional navbar that sits above everything.
      */}
      <nav className="sticky top-0 w-full bg-white border-b border-slate-200 shadow-sm z-[9999] px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold font-serif italic">
            L
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-800">LenderX</span>
        </div>
        
        <div className="hidden md:flex gap-6 text-sm font-semibold text-slate-600">
          <Link to="/" className="hover:text-emerald-600 transition">Home</Link>
          <Link to="/borrower" className="hover:text-emerald-600 transition">Borrower Portal</Link>
          <Link to="/lender" className="hover:text-emerald-600 transition">Lender Harvest</Link>
        </div>

        <div>
          <Link to="/wizard" className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-full text-sm font-bold shadow-sm transition">
            Run AI Demo
          </Link>
        </div>
      </nav>

      {/* Main Content Router */}
      <div className="w-full bg-slate-50 min-h-screen">
        <Routes>
          <Route path="/" element={<MainLandingPage />} />
          <Route path="/borrower" element={<BorrowerDashboard />} />
          <Route path="/lender" element={<LenderDashboard />} />
          <Route path="/wizard" element={<LoanApplicationWizard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

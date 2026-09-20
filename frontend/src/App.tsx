import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, useSearchParams } from 'react-router-dom';
import BorrowerDashboard from './components/BorrowerDashboard';
import LenderDashboard from './components/LenderDashboard';
import MainLandingPage from './components/MainLandingPage';
import LoanApplicationWizard from './components/LoanApplicationWizard';
import Manifesto from './components/Manifesto';

function GlobalNavbar() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const isBorrower = location.pathname === '/borrower';
  const activeTab = searchParams.get('tab') || 'Overview';

  const borrowerTabs = [
    {
      id: 'Overview',
      icon: (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      )
    },
    {
      id: 'Facilities',
      icon: (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect height="14" rx="2" width="20" x="2" y="5" />
          <line x1="2" x2="22" y1="10" y2="10" />
        </svg>
      )
    },
    {
      id: 'Documents',
      icon: (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      )
    },
    {
      id: 'Network',
      icon: (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      id: 'Support',
      icon: (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="12" x2="12.01" y1="17" y2="17" />
        </svg>
      )
    }
  ];

  return (
    <nav className="sticky top-0 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs z-[9999] px-4 sm:px-6 py-2.5 flex items-center justify-between transition-all">
      {/* Left: Brand Identity with official logo */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <Link to="/" className="flex items-center gap-2 group transition-transform hover:scale-[1.01]">
          <img src="/logo.png" alt="LenderX" className="h-8 w-auto object-contain" />
        </Link>
        {isBorrower && (
          <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200/80">
            Enterprise
          </span>
        )}
      </div>

      {/* Center: When on /borrower, render Borrower Portal tabs; otherwise render main nav links */}
      {isBorrower ? (
        <div className="flex items-center overflow-x-auto py-0.5 px-1 bg-slate-100/90 rounded-full border border-slate-200/80 mx-2">
          {borrowerTabs.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSearchParams({ tab: tab.id })}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white text-[#0c3b2e] shadow-xs ring-1 ring-slate-200/70 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                {tab.icon}
                <span>{tab.id}</span>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
          <Link
            to="/"
            className={`transition hover:text-emerald-700 ${location.pathname === '/' ? 'text-emerald-700 font-bold' : ''}`}
          >
            Home
          </Link>
          <Link
            to="/borrower"
            className={`transition hover:text-emerald-700 ${location.pathname === '/borrower' ? 'text-emerald-700 font-bold' : ''}`}
          >
            Borrower Portal
          </Link>
          <Link
            to="/lender"
            className={`transition hover:text-emerald-700 ${location.pathname === '/lender' ? 'text-emerald-700 font-bold' : ''}`}
          >
            Lender Harvest
          </Link>
        </div>
      )}

      {/* Right: Action and User Profile area */}
      <div className="flex items-center gap-3 flex-shrink-0">
        {isBorrower ? (
          <>
            <div className="hidden md:flex items-center gap-3 text-xs font-semibold text-slate-500 mr-1">
              <Link to="/" className="hover:text-emerald-700 transition">Home</Link>
              <span className="text-slate-300">/</span>
              <Link to="/lender" className="hover:text-emerald-700 transition">Lender</Link>
            </div>
            <Link
              to="/wizard"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-1.5 rounded-full text-xs font-bold shadow-xs transition"
            >
              Run AI Demo
            </Link>
            <div className="flex items-center space-x-2 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-[#0c3b2e] text-emerald-200 ring-2 ring-emerald-100 flex items-center justify-center font-bold text-xs tracking-wider shadow-xs">
                AM
              </div>
              <div className="hidden lg:flex flex-col text-left">
                <span className="text-xs font-bold text-slate-900 leading-tight">Amina M.</span>
                <span className="text-[10px] text-emerald-700 font-medium">Enterprise Member</span>
              </div>
            </div>
          </>
        ) : (
          <Link
            to="/wizard"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-full text-sm font-bold shadow-sm transition"
          >
            Run AI Demo
          </Link>
        )}
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      {/* Unified Global Navbar with route awareness */}
      <GlobalNavbar />

      {/* Main Content Router */}
      <div className="w-full bg-slate-50 min-h-screen">
        <Routes>
          <Route path="/" element={<MainLandingPage />} />
          <Route path="/borrower" element={<BorrowerDashboard />} />
          <Route path="/lender" element={<LenderDashboard />} />
          <Route path="/wizard" element={<LoanApplicationWizard />} />
          <Route path="/manifesto" element={<Manifesto />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

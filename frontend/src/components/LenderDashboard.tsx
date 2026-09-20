import React, { useState } from 'react';
import { fundLoan } from '../services/api';

export default function LenderDashboard() {
  const [loadingLoanId, setLoadingLoanId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('Harvest Overview');
  const [timeframe, setTimeframe] = useState('6 Months');
  const [filter, setFilter] = useState('All');
  const [isExporting, setIsExporting] = useState(false);
  const [toast, setToast] = useState('');
  
  
  
  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setToast('Impact Ledger Exported successfully.');
      setTimeout(() => setToast(''), 4000);
    }, 1500);
  };

  const handleFund = async (loanId: string) => {
    setLoadingLoanId(loanId);
    try {
      await fundLoan('LEND-123', { loanId });
      setToast('Successfully funded ' + loanId + '! Transaction verified on-chain.');
      setTimeout(() => setToast(''), 4000);
    } catch (err: any) {
      setToast('Error funding loan: ' + err.message);
      setTimeout(() => setToast(''), 4000);
    } finally {
      setLoadingLoanId(null);
    }
  };

  return (
    <div className="w-full min-h-screen font-sans bg-slate-50">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#064e3b] text-white px-6 py-4 rounded-xl shadow-2xl animate-in slide-in-from-bottom-4">
          <p className="font-bold text-sm">{toast}</p>
        </div>
      )}

      
{/*  Top Sol Banner: Announcements of the Commons  */}
<div className="bg-[#064e3b] text-[#ecfdf5] px-4 py-2 text-xs font-medium flex items-center justify-between tracking-wide border-b border-[#047857]/50 sticky top-0 z-50">
<div className="max-w-7xl mx-auto w-full flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#10b981] text-[#091712] text-[11px] font-bold">☀</span>
<span><strong>Solar Commons Equinox:</strong> 42 new regenerative community farms funded this cycle across Sub-Saharan Africa and SEA.</span>
</div>
<div className="hidden md:flex items-center gap-4 text-[11px] text-[#d1fae5]/90">
<span className="flex items-center gap-1">
<svg className="w-3.5 h-3.5 text-[#34d399]" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z"></path></svg>
          100% On-Chain Regenerative Audit Verified
        </span>
<button onClick={() => setActiveTab("My Returns")} className="underline hover:text-white">Read Impact Ledger →</button>
</div>
</div>
</div>
<div className="flex flex-1 max-w-[1600px] w-full mx-auto">
{/*  Artisanal Eco-Sidebar Navigation  */}
<aside className="w-64 bg-[#091712] text-[#f2f8f5] flex-shrink-0 flex flex-col justify-between p-6 border-r border-[#142921] hidden xl:flex my-3 ml-3 rounded-2xl shadow-xl sticky top-12 h-[calc(100vh-4rem)]">
<div>
{/*  Brand Signature  */}
<div className="flex items-center gap-3 pb-6 border-b border-[#163327]">
<div className="w-10 h-10 rounded-xl bg-[#10b981] flex items-center justify-center text-[#091712] font-bold shadow-inner">
<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
<circle cx="12" cy="12" r="5"></circle>
<path d="M12 2v3m0 14v3M2 12h3m14 0h3m-3.5-6.5l-2.1 2.1m-8.8 8.8l-2.1 2.1m0-13l2.1 2.1m8.8 8.8l2.1 2.1" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5"></path>
</svg>
</div>
<div>
<div className="flex items-center gap-1.5">
<span className="font-headline font-bold text-xl tracking-tight text-white">LenderX</span>
<span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 bg-[#059669] text-white rounded">Sol</span>
</div>
<p className="text-[11px] text-[#a7f3d0]/80 font-garamond italic">Solar-Capital Commons</p>
</div>
</div>
{/*  Navigation Links  */}

<nav className="mt-6 space-y-1.5">
  {['Harvest Overview', 'Global Projects', 'My Returns', 'Tax Documents'].map(tab => (
    <button 
      key={tab}
      onClick={() => setActiveTab(tab)}
      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-xs tracking-wide transition ${activeTab === tab ? 'bg-[#142921] text-[#34d399] border border-[#10b981]/30 shadow-inner' : 'text-[#a7f3d0]/75 hover:text-white hover:bg-[#12241d]'}`}
    >
      {tab === 'Harvest Overview' && <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>}
      {tab === 'Global Projects' && <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582"></path></svg>}
      {tab === 'My Returns' && <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>}
      {tab === 'Tax Documents' && <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>}
      {tab}
    </button>
  ))}
</nav>

{/*  Seasonal Earth Wisdom Quote  */}
<div className="mt-8 p-4 rounded-xl bg-[#0e1f18] border border-[#1b3d30] relative overflow-hidden">
<span className="text-[10px] tracking-widest text-[#34d399] font-bold uppercase block mb-1">Commons Philosophy</span>
<p className="font-garamond italic text-xs text-[#ecfdf5] leading-relaxed">
            "Capital is not a master; it is compost. Used wisely, it regenerates soil and human dignity."
          </p>
</div>
</div>
{/*  User Profile & Stewardship  */}
<div className="pt-4 border-t border-[#163327]">
<div className="p-2.5 bg-[#06120e] rounded-xl border border-[#163327] flex items-center gap-3">
<div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-[#059669] to-[#34d399] text-[#091712] flex items-center justify-center font-bold text-xs shadow">
            JD
          </div>
<div className="flex-1 min-w-0">
<p className="text-xs font-semibold text-white truncate">James D.</p>
<p className="text-[10px] text-[#34d399] font-medium flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span> Tier III Solar Steward
            </p>
</div>
<button onClick={() => { setToast("Opening Profile Settings..."); setTimeout(() => setToast(""), 3000); }} className="text-[#a7f3d0]/70 hover:text-white p-1" title="Settings">
<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
</button>
</div>
</div>
</aside>
{/*  Main Editorial Canvas  */}
{activeTab === 'Harvest Overview' && (
<main className="flex-1 px-4 sm:px-8 py-6 max-w-full overflow-hidden">
{/*  EDITORIAL TOP DOCUMENTARY BANNER  */}
<section className="mb-8 rounded-3xl overflow-hidden border border-[#d1e7dd] bg-[#ffffff] shadow-sm">
<div className="relative h-64 sm:h-80 w-full overflow-hidden">
<img alt="Regenerative artisan marketplace in thriving commerce" className="w-full h-full object-cover object-center" src="https://lh3.googleusercontent.com/aida/AEtjO1XlFSkAI0sup7CsjasrUgRTOmpGY3RN463MvSvY-48S8FFAvNrXRssK18wFYZGECA1O98Adoa5q_zg0lA2yGk32hRlERlS0YTHMTVhj0ZPe8leRPXe5ICo9lzdZ1x33YIGgB81yz1Ooz88UZNK2ZAU4v4V-cwfyrpcJX6ILMYiW_VWtcoTTXn0uiWKes4nSPju3Q5PP6vYp1zgcD_y1dMHJJW0kfXOLaZfq41NKVIRFLSWRT17bc2oxSpk"/>
<div className="absolute inset-0 bg-gradient-to-t from-[#091712] via-[#091712]/40 to-transparent"></div>
<div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
<div className="max-w-2xl">
<div className="flex items-center gap-2 mb-2">
<span className="px-2.5 py-1 rounded-full bg-[#10b981] text-[#091712] text-[10px] font-bold uppercase tracking-wider">Documentary Plate 01</span>
<span className="text-xs text-[#d1fae5]/90 font-garamond italic">Season of Plenty • October Cycle • Global Sol Grid Active</span>
</div>
<h1 className="font-headline text-3xl sm:text-5xl text-white font-bold tracking-tight">Good evening, James.</h1>
<p className="font-garamond italic text-lg text-[#ecfdf5]/90 mt-1">Your investments are flowering worldwide across 12 regenerative co-ops.</p>
</div>
<div className="flex items-center gap-3">
<button onClick={() => { setToast("Impact Ledger Exported successfully."); setTimeout(() => setToast(""), 4000); }} className="px-4 py-2.5 rounded-xl bg-[#ffffff]/90 hover:bg-white text-[#064e3b] text-xs font-semibold backdrop-blur-sm border border-white/20 flex items-center gap-2 transition shadow"><svg className="w-4 h-4 text-[#059669]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>Export Impact Ledger
              </button>
<button onClick={() => setActiveTab("Global Projects")} className="px-5 py-2.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold tracking-wide shadow-md shadow-[#059669]/30 flex items-center gap-2 transition"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path></svg>Deploy New Seeds
              </button>
</div>
</div>
</div>
</section>
{/*  SPLIT HERO LAYOUT: 65% LEFT / 35% RIGHT  */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
{/*  LEFT COLUMN (65% -> 8 of 12 cols)  */}
<div className="lg:col-span-8 space-y-8">
{/*  The Sovereign Growth Cycle (Editorial Feature)  */}
<div className="bg-[#ffffff] rounded-3xl p-6 sm:p-8 border border-[#d1e7dd] shadow-sm">
<div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#e2efe8] gap-4">
<div>
<div className="flex items-center gap-2">
<h3 className="font-headline text-2xl font-bold text-[#0f241c]">The Sovereign Growth Cycle</h3>
<span className="px-2.5 py-0.5 rounded-full bg-[#ecfdf5] text-[#059669] text-[10px] font-bold uppercase">Solar-Regenerative</span>
</div>
<p className="font-garamond italic text-sm text-[#527265] mt-1">Tracking principal velocity as capital returns to enrich local ecosystems</p>
</div>
<div className="flex items-center bg-[#f2f8f5] p-1 rounded-xl border border-[#d1e7dd] text-xs font-semibold text-[#527265]">
<button onClick={() => { setToast("Showing 6 Month timeline"); setTimeout(() => setToast(""), 3000); }} className="px-3 py-1 rounded-lg bg-[#059669] text-white">6 Months</button>
  <button onClick={() => { setToast("Showing Full Season timeline"); setTimeout(() => setToast(""), 3000); }} className="px-3 py-1 rounded-lg hover:text-[#0f241c]">Full Season</button>
  <button onClick={() => { setToast("Showing All Time timeline"); setTimeout(() => setToast(""), 3000); }} className="px-3 py-1 rounded-lg hover:text-[#0f241c]">All Time</button>
</div>
</div>
<div className="flex items-baseline justify-between mt-6 mb-2">
<div>
<span className="text-xs font-semibold text-[#527265] uppercase tracking-wider block">Cumulative Solar Capital Return</span>
<div className="text-3xl sm:text-4xl font-headline font-bold text-[#0f241c]">$6,240.00</div>
</div>
<div className="text-right">
<span className="inline-flex items-center gap-1 text-xs font-bold text-[#047857] bg-[#ecfdf5] px-3 py-1 rounded-full border border-[#10b981]/20">
                  ↑ +12.4% this cycle
                </span>
</div>
</div>
{/*  Enhanced Chart Visual  */}
<div className="relative w-full h-56 mt-4">
<svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 600 180">
<defs>
<linearGradient id="emeraldGradient" x1="0" x2="0" y1="0" y2="1">
<stop offset="0%" stopColor="#10b981" stopOpacity="0.35"></stop>
<stop offset="60%" stopColor="#059669" stopOpacity="0.12"></stop>
<stop offset="100%" stopColor="#f2f8f5" stopOpacity="0.0"></stop>
</linearGradient>
</defs>
<line stroke="#e2efe8" strokeDasharray="3 3" strokeWidth="1" x1="30" x2="590" y1="30" y2="30"></line>
<line stroke="#e2efe8" strokeDasharray="3 3" strokeWidth="1" x1="30" x2="590" y1="70" y2="70"></line>
<line stroke="#e2efe8" strokeDasharray="3 3" strokeWidth="1" x1="30" x2="590" y1="110" y2="110"></line>
<line stroke="#d1e7dd" strokeWidth="1.5" x1="30" x2="590" y1="150" y2="150"></line>
<text fill="#6f9485" fontFamily="EB Garamond" fontSize="11" x="0" y="34">$8k</text>
<text fill="#6f9485" fontFamily="EB Garamond" fontSize="11" x="0" y="74">$6k</text>
<text fill="#6f9485" fontFamily="EB Garamond" fontSize="11" x="0" y="114">$4k</text>
<text fill="#6f9485" fontFamily="EB Garamond" fontSize="11" x="0" y="154">$2k</text>
<path d="M40 145 C 130 135, 180 120, 260 95 C 340 70, 420 75, 500 45 C 540 30, 565 24, 585 18 L 585 150 L 40 150 Z" fill="url(#emeraldGradient)"></path>
<path d="M40 145 C 130 135, 180 120, 260 95 C 340 70, 420 75, 500 45 C 540 30, 565 24, 585 18" fill="none" stroke="#059669" strokeLinecap="round" strokeWidth="3.5"></path>
<path d="M40 148 C 130 140, 180 130, 260 110 C 340 95, 420 90, 500 68 C 540 55, 565 48, 585 40" fill="none" stroke="#10b981" strokeDasharray="4 4" strokeWidth="1.5"></path>
<circle cx="40" cy="145" fill="#059669" r="4"></circle>
<circle cx="160" cy="126" fill="#059669" r="4"></circle>
<circle cx="260" cy="95" fill="#10b981" r="5" stroke="#091712" strokeWidth="1.5"></circle>
<circle cx="390" cy="74" fill="#10b981" r="5" stroke="#091712" strokeWidth="1.5"></circle>
<circle cx="500" cy="45" fill="#059669" r="5"></circle>
<circle cx="585" cy="18" fill="#10b981" fill-opacity="0.25" r="8"></circle>
<circle cx="585" cy="18" fill="#ffffff" r="5" stroke="#059669" strokeWidth="3"></circle>
</svg>
</div>
<div className="flex justify-between pl-8 pr-1 pt-3 text-xs text-[#527265] font-medium border-t border-[#e2efe8]">
<span className="flex flex-col"><span>May</span><span className="text-[10px] text-[#6f9485] font-garamond italic">Planting</span></span>
<span className="flex flex-col"><span>Jun</span><span className="text-[10px] text-[#6f9485] font-garamond italic">Sprouting</span></span>
<span className="flex flex-col"><span>Jul</span><span className="text-[10px] text-[#6f9485] font-garamond italic">Solar Hookup</span></span>
<span className="flex flex-col"><span>Aug</span><span className="text-[10px] text-[#6f9485] font-garamond italic">Mid-Harvest</span></span>
<span className="flex flex-col"><span>Sep</span><span className="text-[10px] text-[#6f9485] font-garamond italic">First Return</span></span>
<span className="flex flex-col font-bold text-[#059669]"><span>Oct</span><span className="text-[10px] text-[#059669] font-garamond italic">Current Yield</span></span>
</div>
<div className="mt-5 pt-3 border-t border-[#e2efe8] flex flex-wrap items-center justify-between gap-3 text-xs">
<div className="flex items-center gap-3">
<span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#059669]"></span><span className="text-[#527265]">Realized Community Repayments</span></span>
<span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#10b981]"></span><span className="text-[#527265]">Solar Pump Yield Surplus</span></span>
</div>
<button onClick={() => { setToast("Generating full lifecycle audit..."); setTimeout(() => setToast(""), 3000); }} className="font-bold text-[#059669] hover:underline flex items-center gap-1 font-garamond italic text-sm">
                Detailed Lifecycle Audit <span>→</span>
</button>
</div>
</div>
{/*  Section 3: Meet Your Partners (Vertical Documentary Editorial Feed)  */}
<section className="space-y-6" data-purpose="human-first-borrowers">
<div className="flex items-end justify-between border-b border-[#d1e7dd] pb-3">
<div>
<div className="flex items-center gap-2">
<h2 className="font-headline text-3xl font-bold text-[#0f241c]">Meet Your Partners</h2>
<span className="px-2.5 py-0.5 rounded-full bg-[#e6f4ed] text-[#059669] text-xs font-bold">Active Co-Creators</span>
</div>
<p className="font-garamond italic text-sm text-[#527265] mt-1">
                  Direct relationships. No bureaucratic intermediaries. Cultivating sovereign livelihoods together.
                </p>
</div>
<button onClick={() => setActiveTab("Global Projects")} className="text-xs font-bold text-[#059669] hover:text-[#047857] flex items-center gap-1">
                View All 12 Co-op Partners <span>→</span>
</button>
</div>
{/*  Partner 1: Amara K.  */}
<article className="bg-[#ffffff] rounded-3xl border border-[#d1e7dd] overflow-hidden shadow-sm flex flex-col md:flex-row group hover:border-[#059669] transition">
<div className="md:w-5/12 relative min-h-[220px]">
<img alt="Amara K. at her artisan co-op bakery" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" src="https://lh3.googleusercontent.com/aida/AEtjO1WgzDVj5SM8zyhRVNe9m5z9CMbGAtXun_FpMAA2p6GFYAzoa3GXCyZWQPCAa4uqkTZJGHZyfQimXoux26n3e6ZjgAsbKL3JBh0SllN2PDlUmNoi1HTAS_iqWg-GD_Td1ufoSSACFLiEBgfCFvgjyKXHHYjDVOLfzP2WthJeuT5mT2swDZQFYwsjUHuxYGKHj_hMbDX41mzHfGNYJyQ-ucz428G88YQtK5JDjvtW35Whxj1Ft7XsSprpOMsC"/>
<div className="absolute top-3 left-3 flex gap-2">
<span className="px-2.5 py-1 rounded-full bg-[#091712]/80 backdrop-blur-sm text-[#f2f8f5] text-[10px] font-semibold">📍 Kumasi, Ghana</span>
<span className="px-2.5 py-1 rounded-full bg-[#059669] text-white text-[10px] font-bold">Organic Bakery</span>
</div>
</div>
<div className="p-6 md:w-7/12 flex flex-col justify-between">
<div>
<h3 className="font-headline text-2xl font-bold text-[#0f241c]">Amara K.</h3>
<p className="text-xs text-[#527265] font-garamond italic">Founder, Local Harvest Café &amp; Flour Mill</p>
<blockquote className="mt-3 font-garamond italic text-base text-[#0f241c]/90 border-l-2 border-[#10b981] pl-3 leading-relaxed">
                    "Your seed loan allowed us to switch our grain ovens entirely to solar-thermal baking, tripling daily bread capacity and hiring 4 apprentice youth."
                  </blockquote>
<div className="mt-4 grid grid-cols-2 gap-3 py-2.5 px-3.5 rounded-xl bg-[#f7fbf9] border border-[#d1e7dd]">
<div>
<span className="text-[10px] uppercase font-bold text-[#527265] block">Seed Loan</span>
<span className="font-headline text-lg font-bold text-[#0f241c]">$500.00</span>
</div>
<div>
<span className="text-[10px] uppercase font-bold text-[#527265] block">Repaid So Far</span>
<span className="font-headline text-lg font-bold text-[#059669]">65% • $325.00</span>
</div>
</div>
<div className="mt-3">
<div className="flex justify-between text-[11px] font-semibold mb-1">
<span className="text-[#527265]">Repayment Punctuality</span>
<span className="text-[#059669]">On Track (Month 4 of 6)</span>
</div>
<div className="w-full bg-[#e2efe8] rounded-full h-1.5 overflow-hidden">
<div className="bg-[#059669] h-1.5 rounded-full" ></div>
</div>
</div>
</div>
<div className="mt-4 pt-3 border-t border-[#e8f3ee] flex gap-2">
<button onClick={() => { setToast("Wishes and solidarity boost sent successfully!"); setTimeout(() => setToast(""), 3000); }} className="flex-1 py-2 rounded-xl bg-[#e6f4ed] hover:bg-[#d6ecdf] text-[#059669] text-xs font-bold border border-[#059669]/30 flex items-center justify-center gap-1.5 transition">
<span>💌</span> Send Wishes &amp; Boost
                  </button>
<button onClick={() => { setToast("Opening live field IoT telemetry streams..."); setTimeout(() => setToast(""), 3000); }} className="px-3 py-2 rounded-xl bg-[#f2f8f5] hover:bg-[#e2efe8] text-[#0f241c] text-xs font-semibold border border-[#d1e7dd]" title="View Field Reports">📖</button>
</div>
</div>
</article>
{/*  Partner 2: Dukore Neza Collective  */}
<article className="bg-[#ffffff] rounded-3xl border border-[#d1e7dd] overflow-hidden shadow-sm flex flex-col md:flex-row group hover:border-[#059669] transition">
<div className="md:w-5/12 relative min-h-[220px]">
<img alt="Dukore Neza craft collective" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" src="https://lh3.googleusercontent.com/aida/AEtjO1XlFSkAI0sup7CsjasrUgRTOmpGY3RN463MvSvY-48S8FFAvNrXRssK18wFYZGECA1O98Adoa5q_zg0lA2yGk32hRlERlS0YTHMTVhj0ZPe8leRPXe5ICo9lzdZ1x33YIGgB81yz1Ooz88UZNK2ZAU4v4V-cwfyrpcJX6ILMYiW_VWtcoTTXn0uiWKes4nSPju3Q5PP6vYp1zgcD_y1dMHJJW0kfXOLaZfq41NKVIRFLSWRT17bc2oxSpk"/>
<div className="absolute top-3 left-3 flex gap-2">
<span className="px-2.5 py-1 rounded-full bg-[#091712]/80 backdrop-blur-sm text-[#f2f8f5] text-[10px] font-semibold">📍 Kigali, Rwanda</span>
<span className="px-2.5 py-1 rounded-full bg-[#064e3b] text-[#ecfdf5] text-[10px] font-bold">Artisan Co-op</span>
</div>
</div>
<div className="p-6 md:w-7/12 flex flex-col justify-between">
<div>
<h3 className="font-headline text-2xl font-bold text-[#0f241c]">Dukore Neza Artisans</h3>
<p className="text-xs text-[#527265] font-garamond italic">18 Weavers • Sovereign Community Guild</p>
<blockquote className="mt-3 font-garamond italic text-base text-[#0f241c]/90 border-l-2 border-[#10b981] pl-3 leading-relaxed">
                    "Mobile digital POS terminals funded by LenderX allow our weavers to sell directly to fair-trade buyers worldwide without predatory middle-agents."
                  </blockquote>
<div className="mt-4 grid grid-cols-2 gap-3 py-2.5 px-3.5 rounded-xl bg-[#f7fbf9] border border-[#d1e7dd]">
<div>
<span className="text-[10px] uppercase font-bold text-[#527265] block">Seed Loan</span>
<span className="font-headline text-lg font-bold text-[#0f241c]">$350.00</span>
</div>
<div>
<span className="text-[10px] uppercase font-bold text-[#527265] block">Repaid So Far</span>
<span className="font-headline text-lg font-bold text-[#059669]">40% • $140.00</span>
</div>
</div>
<div className="mt-3">
<div className="flex justify-between text-[11px] font-semibold mb-1">
<span className="text-[#527265]">Repayment Punctuality</span>
<span className="text-[#059669]">Ahead of Schedule (Month 2 of 5)</span>
</div>
<div className="w-full bg-[#e2efe8] rounded-full h-1.5 overflow-hidden">
<div className="bg-[#059669] h-1.5 rounded-full" ></div>
</div>
</div>
</div>
<div className="mt-4 pt-3 border-t border-[#e8f3ee] flex gap-2">
<button onClick={() => { setToast("Wishes and solidarity boost sent successfully!"); setTimeout(() => setToast(""), 3000); }} className="flex-1 py-2 rounded-xl bg-[#e6f4ed] hover:bg-[#d6ecdf] text-[#059669] text-xs font-bold border border-[#059669]/30 flex items-center justify-center gap-1.5 transition">
<span>💌</span> Send Wishes &amp; Boost
                  </button>
<button onClick={() => { setToast("Opening live field IoT telemetry streams..."); setTimeout(() => setToast(""), 3000); }} className="px-3 py-2 rounded-xl bg-[#f2f8f5] hover:bg-[#e2efe8] text-[#0f241c] text-xs font-semibold border border-[#d1e7dd]" title="View Field Reports">📖</button>
</div>
</div>
</article>
{/*  Partner 3: Sun-Agri Smart Irrigation Co-op  */}
<article className="bg-[#ffffff] rounded-3xl border border-[#d1e7dd] overflow-hidden shadow-sm flex flex-col md:flex-row group hover:border-[#059669] transition">
<div className="md:w-5/12 relative min-h-[220px]">
<img alt="Sun-Agri farmer at solar pump" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" src="https://lh3.googleusercontent.com/aida/AEtjO1XOxXAcec0h-D_dYSZbcmae7KJWSQf2iJXtYYgpUI01cPow1pGmV9avQYvQihvvNg963FeBMrlLna6K7R-5xgvbkLZmlQxS4C3ghM8T2_FpEkcFrGUjLOmcqF4i9dz7pvfwPZ0ZEQ-6AiCX1rAgcEGVo-pNuCnjPPbvbx-QeHPZA3Dro1d9yqM2kBgnXCB6eavNF6av7XRIS4A6AZUVMmwZZ3i3HvCrfsTpKXxQXqrvizRZ5L2o3QV_G2T0"/>
<div className="absolute top-3 left-3 flex gap-2">
<span className="px-2.5 py-1 rounded-full bg-[#091712]/80 backdrop-blur-sm text-[#f2f8f5] text-[10px] font-semibold">📍 Eldoret, Kenya</span>
<span className="px-2.5 py-1 rounded-full bg-[#10b981] text-[#091712] text-[10px] font-bold">Solar Agri-Tech</span>
</div>
</div>
<div className="p-6 md:w-7/12 flex flex-col justify-between">
<div>
<h3 className="font-headline text-2xl font-bold text-[#0f241c]">Miriam O. &amp; Sun-Agri</h3>
<p className="text-xs text-[#527265] font-garamond italic">Solar Water Pumping &amp; Soil Renewal</p>
<blockquote className="mt-3 font-garamond italic text-base text-[#0f241c]/90 border-l-2 border-[#10b981] pl-3 leading-relaxed">
                    "Replacing expensive diesel generators with our community solar irrigation pump boosted crop yields 3x while cutting emissions to zero."
                  </blockquote>
<div className="mt-4 grid grid-cols-2 gap-3 py-2.5 px-3.5 rounded-xl bg-[#f7fbf9] border border-[#d1e7dd]">
<div>
<span className="text-[10px] uppercase font-bold text-[#527265] block">Seed Loan</span>
<span className="font-headline text-lg font-bold text-[#0f241c]">$500.00</span>
</div>
<div>
<span className="text-[10px] uppercase font-bold text-[#527265] block">Repaid So Far</span>
<span className="font-headline text-lg font-bold text-[#047857]">80% • $400.00</span>
</div>
</div>
<div className="mt-3">
<div className="flex justify-between text-[11px] font-semibold mb-1">
<span className="text-[#527265]">Repayment Punctuality</span>
<span className="text-[#047857]">Final Harvest Cycle (Month 5 of 6)</span>
</div>
<div className="w-full bg-[#e2efe8] rounded-full h-1.5 overflow-hidden">
<div className="bg-[#059669] h-1.5 rounded-full" ></div>
</div>
</div>
</div>
<div className="mt-4 pt-3 border-t border-[#e8f3ee] flex gap-2">
<button onClick={() => { setToast("Wishes and solidarity boost sent successfully!"); setTimeout(() => setToast(""), 3000); }} className="flex-1 py-2 rounded-xl bg-[#e6f4ed] hover:bg-[#d6ecdf] text-[#059669] text-xs font-bold border border-[#059669]/30 flex items-center justify-center gap-1.5 transition">
<span>💌</span> Send Wishes &amp; Boost
                  </button>
<button onClick={() => { setToast("Opening live field IoT telemetry streams..."); setTimeout(() => setToast(""), 3000); }} className="px-3 py-2 rounded-xl bg-[#f2f8f5] hover:bg-[#e2efe8] text-[#0f241c] text-xs font-semibold border border-[#d1e7dd]" title="View Field Reports">📖</button>
</div>
</div>
</article>
</section>
</div>
{/*  RIGHT STICKY ACTION RAIL (35% -> 4 of 12 cols)  */}
<div className="lg:col-span-4 space-y-6">
{/*  Action Panel: The Soil-to-Sun Loop with Featured Documentary Image 25  */}
<div className="bg-[#091712] text-[#f2f8f5] rounded-3xl p-6 border border-[#16382b] shadow-xl relative overflow-hidden">
<div className="relative h-40 -mx-6 -mt-6 mb-5 overflow-hidden">
<img alt="Solar water irrigation in lush green valley" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1XOxXAcec0h-D_dYSZbcmae7KJWSQf2iJXtYYgpUI01cPow1pGmV9avQYvQihvvNg963FeBMrlLna6K7R-5xgvbkLZmlQxS4C3ghM8T2_FpEkcFrGUjLOmcqF4i9dz7pvfwPZ0ZEQ-6AiCX1rAgcEGVo-pNuCnjPPbvbx-QeHPZA3Dro1d9yqM2kBgnXCB6eavNF6av7XRIS4A6AZUVMmwZZ3i3HvCrfsTpKXxQXqrvizRZ5L2o3QV_G2T0"/>
<div className="absolute inset-0 bg-gradient-to-t from-[#091712] via-[#091712]/30 to-transparent"></div>
<div className="absolute top-3 left-3 right-3 flex items-center justify-between">
<span className="px-2.5 py-1 rounded-full bg-[#059669] text-white text-[10px] font-bold tracking-wider uppercase">
                  The Soil-To-Sun Loop
                </span>
<span className="text-xs text-[#34d399] font-mono bg-[#091712]/70 px-2 py-0.5 rounded">0% Loss Rate</span>
</div>
</div>
<h3 className="font-headline text-2xl font-bold leading-tight text-white">
              Money as seed capital for human flourishing.
            </h3>
<p className="font-garamond italic text-sm text-[#a7f3d0]/90 mt-2.5 leading-relaxed">
              When a loan is repaid, 100% of your principal automatically flows back into local sovereign cooperatives, regenerating families and soil in perpetual harmony.
            </p>
<div className="my-5 p-4 rounded-2xl bg-[#0f241c] border border-[#1a4032] space-y-3">
<div className="flex items-center justify-between text-xs">
<span className="text-[#a7f3d0]/90 flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-[#10b981]"></span> 1. Seed Investment
                </span>
<span className="font-bold text-white font-headline text-sm">$5,800.00</span>
</div>
<div className="flex items-center justify-between text-xs">
<span className="text-[#a7f3d0]/90 flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-[#34d399]"></span> 2. Local Equipment &amp; Solar
                </span>
<span className="font-bold text-white">100% On-Ground</span>
</div>
<div className="flex items-center justify-between text-xs">
<span className="text-[#a7f3d0]/90 flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-[#059669]"></span> 3. Harvest Yield Replanted
                </span>
<span className="font-bold text-[#34d399] font-headline text-sm">+$951.20</span>
</div>
</div>
<button onClick={() => setActiveTab("Global Projects")} className="w-full py-3 px-4 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold tracking-wide transition flex items-center justify-center gap-2 shadow-lg shadow-[#059669]/25">
<span>🌾</span> Explore The Circular Map
            </button>
</div>
{/*  Quick Summary Vitals Cards Stacked Vertically  */}
<div className="space-y-4">
<div className="flex items-center justify-between">
<h4 className="font-headline text-xl font-bold text-[#0f241c]">The Harvest Summary</h4>
<span className="text-xs text-[#527265] font-garamond italic">(Live portfolio vitals)</span>
</div>
<div className="text-[11px] text-[#064e3b] font-semibold bg-[#e6f4ed] p-2 rounded-xl border border-[#059669]/20 text-center">
              🌱 100% Repayment Punctuality this Month
            </div>
{/*  Card 1: Seed Capital Deployed  */}
<div className="bg-[#ffffff] rounded-2xl p-4 border border-[#d1e7dd] shadow-sm hover:border-[#059669] transition">
<div className="flex items-start justify-between">
<span className="text-[11px] font-semibold text-[#527265] uppercase tracking-wider">Seed Capital Deployed</span>
<span className="w-7 h-7 rounded-full bg-[#ecfdf5] text-[#059669] flex items-center justify-center text-xs font-bold">🏺</span>
</div>
<div className="mt-2">
<span className="font-headline text-2xl font-bold text-[#0f241c] tracking-tight">$5,800.00</span>
<div className="mt-1 flex items-center gap-1.5 text-xs text-[#059669] font-medium">
<svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 10l7-7m0 0l7 7m-7-7v18" strokeWidth="2"></path></svg>
<span>+$650 expanded this quarter</span>
</div>
</div>
<div className="mt-2 pt-2 border-t border-[#e8f3ee] text-[11px] text-[#527265]">
                Circulating through 5 micro-regions
              </div>
</div>
{/*  Card 2: Ready to Plant  */}
<div className="bg-[#ffffff] rounded-2xl p-4 border border-[#d1e7dd] shadow-sm hover:border-[#10b981] transition">
<div className="flex items-start justify-between">
<span className="text-[11px] font-semibold text-[#527265] uppercase tracking-wider">Ready to Plant</span>
<span className="w-7 h-7 rounded-full bg-[#f0fdf4] text-[#10b981] flex items-center justify-center text-xs font-bold">🌾</span>
</div>
<div className="mt-2">
<span className="font-headline text-2xl font-bold text-[#0f241c] tracking-tight">$2,450.00</span>
<div className="mt-1 text-xs text-[#527265]">
<span>Available immediate liquidity</span>
</div>
</div>
<div className="mt-2 pt-2 border-t border-[#e8f3ee] flex items-center justify-between text-[11px]">
<span className="text-[#527265]">Earning 4.2% in green treasury</span>
<button onClick={() => setActiveTab("Global Projects")} className="text-[#059669] font-semibold hover:underline">Deploy →</button>
</div>
</div>
{/*  Card 3: Active Cooperatives  */}
<div className="bg-[#ffffff] rounded-2xl p-4 border border-[#d1e7dd] shadow-sm hover:border-[#047857] transition">
<div className="flex items-start justify-between">
<span className="text-[11px] font-semibold text-[#527265] uppercase tracking-wider">Active Cooperatives</span>
<span className="w-7 h-7 rounded-full bg-[#ecfdf5] text-[#047857] flex items-center justify-center text-xs font-bold">👥</span>
</div>
<div className="mt-2">
<div className="flex items-baseline gap-2">
<span className="font-headline text-2xl font-bold text-[#0f241c] tracking-tight">12</span>
<span className="text-xs font-medium text-[#047857]">Communities</span>
</div>
<div className="mt-1 text-xs text-[#527265]">
<span>3 women-led artisan collectives</span>
</div>
</div>
<div className="mt-2 pt-2 border-t border-[#e8f3ee] text-[11px] text-[#527265]">
                48 direct household beneficiaries
              </div>
</div>
{/*  Card 4: Annualized Harvest Yield  */}
<div className="bg-[#064e3b] text-[#ecfdf5] rounded-2xl p-4 border border-[#047857] shadow-md">
<div className="flex items-start justify-between">
<span className="text-[11px] font-semibold text-[#a7f3d0] uppercase tracking-wider">Harvest Yield (APY)</span>
<span className="w-7 h-7 rounded-full bg-[#0e3b2e] text-[#34d399] flex items-center justify-center text-xs font-bold">☀</span>
</div>
<div className="mt-2">
<div className="flex items-baseline gap-1">
<span className="font-headline text-2xl font-bold text-white tracking-tight">16.4%</span>
<span className="text-xs text-[#34d399] font-semibold">Net Annual</span>
</div>
<div className="mt-1 text-xs text-[#a7f3d0]/90">
<span>+1.8% vs conventional microfinance</span>
</div>
</div>
<div className="mt-2 pt-2 border-t border-[#0d694e] text-[11px] text-[#ecfdf5]/80 flex justify-between">
<span>Next harvest: Nov 01</span>
<span className="font-bold text-[#34d399]">+$84.60</span>
</div>
</div>
</div>
</div>
</div>
{/*  FULL WIDTH BOTTOM SECTION: COMMUNITY HARVEST OPPORTUNITIES (Comparative Ledger Format)  */}
<section className="mb-10 pt-4" data-purpose="curated-opportunities">
<div className="flex flex-col md:flex-row md:items-end justify-between mb-6 pb-3 border-b border-[#d1e7dd] gap-4">
<div>
<div className="flex items-center gap-2">
<h2 className="font-headline text-3xl font-bold text-[#0f241c]">Community Harvest Opportunities</h2>
<span className="px-2.5 py-0.5 rounded-full bg-[#ecfdf5] text-[#064e3b] text-xs font-bold">Vetted Sovereign Loans</span>
</div>
<p className="font-garamond italic text-sm text-[#527265] mt-1">
              Carefully audited by local community councils. High social dividend, guaranteed climate restorative.
            </p>
</div>
<div className="flex items-center gap-2">
<span className="text-xs text-[#527265]">Filter:</span>
<button onClick={() => { setToast("Filtered to All Earth Projects"); setTimeout(() => setToast(""), 3000); }} className="px-3 py-1 rounded-full bg-[#e6f4ed] border border-[#059669] text-[#064e3b] text-xs font-bold">All Earth Projects</button>
  <button onClick={() => { setToast("Filtered to Off-Grid Solar"); setTimeout(() => setToast(""), 3000); }} className="px-3 py-1 rounded-full bg-[#ffffff] border border-[#d1e7dd] hover:border-[#059669] text-[#527265] text-xs font-medium">Off-Grid Solar</button>
  <button onClick={() => { setToast("Filtered to Organic Seed Farms"); setTimeout(() => setToast(""), 3000); }} className="px-3 py-1 rounded-full bg-[#ffffff] border border-[#d1e7dd] hover:border-[#059669] text-[#527265] text-xs font-medium">Organic Seed Farms</button>
</div>
</div>
{/*  Comparative Ledger / Table Grid Presentation  */}
<div id="opportunities" className="bg-white rounded-3xl border border-[#d1e7dd] shadow-sm overflow-hidden">
<div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-3.5 bg-[#f7fbf9] border-b border-[#d1e7dd] text-[11px] font-bold uppercase tracking-wider text-[#527265]">
<div className="col-span-5">Project &amp; Mission Narrative</div>
<div className="col-span-2 text-center">Verified Yield</div>
<div className="col-span-3">Funding Velocity &amp; Community Pledges</div>
<div className="col-span-2 text-right">Action</div>
</div>
<div className="divide-y divide-[#e8f3ee]">
{/*  Row 1: Rift Valley Solar Microgrid  */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-6 items-center hover:bg-[#fcfdfd] transition">
<div className="col-span-5">
<div className="flex items-center gap-2">
<span className="px-2 py-0.5 rounded bg-[#ecfdf5] text-[#059669] text-[10px] font-bold uppercase tracking-wider">Off-Grid Solar</span>
<span className="text-[10px] px-2 py-0.5 rounded-md bg-[#f2f8f5] text-[#527265] border border-[#d1e7dd]">100% Clean Energy</span>
<span className="text-[10px] px-2 py-0.5 rounded-md bg-[#f2f8f5] text-[#527265] border border-[#d1e7dd]">Verified Council</span>
</div>
<h3 className="font-headline text-xl font-bold text-[#0f241c] mt-2">Rift Valley Solar Microgrid Co-op</h3>
<p className="text-xs text-[#527265] mt-1 leading-relaxed">
                  Empowering 60 off-grid artisan workshop sheds with rooftop solar battery arrays. Eliminating kerosene fumes.
                </p>
</div>
<div className="col-span-2 lg:text-center">
<span className="text-xs text-[#527265] block lg:hidden uppercase font-bold">APY:</span>
<span className="font-headline text-2xl font-bold text-[#047857]">15.0% APY</span>
</div>
<div className="col-span-3">
<div className="flex justify-between text-xs mb-1">
<span className="font-headline font-bold text-[#0f241c]">$1,750 pledged</span>
<span className="text-[#527265]">of $2,000 target</span>
</div>
<div className="w-full bg-[#e2efe8] rounded-full h-2 overflow-hidden">
<div className="bg-[#10b981] h-2 rounded-full" ></div>
</div>
<div className="flex justify-between text-[10px] text-[#527265] mt-1.5 font-garamond italic">
<span>87% funded • 3 days remaining</span>
<span>14 fellow lenders</span>
</div>
</div>
<div className="col-span-2 text-right">
<button onClick={() => { setToast('Successfully funded! Transaction verified on-chain.'); setTimeout(() => setToast(''), 4000); }} className="w-full py-2.5 px-3 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-sm">Plant Seeds ($50 — $250) <span>→</span></button>
</div>
</div>
{/*  Row 2: Mekong Regenerative Bamboo Guild  */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-6 items-center hover:bg-[#fcfdfd] transition">
<div className="col-span-5">
<div className="flex items-center gap-2">
<span className="px-2 py-0.5 rounded bg-[#e6f4ed] text-[#064e3b] text-[10px] font-bold tracking-wider uppercase">Fair Trade Verified</span>
<span className="text-[10px] px-2 py-0.5 rounded-md bg-[#f2f8f5] text-[#527265] border border-[#d1e7dd]">Carbon Negative</span>
<span className="text-[10px] px-2 py-0.5 rounded-md bg-[#f2f8f5] text-[#527265] border border-[#d1e7dd]">Fair Trade</span>
</div>
<h3 className="font-headline text-xl font-bold text-[#0f241c] mt-2">Mekong Regenerative Bamboo Guild</h3>
<p className="text-xs text-[#527265] mt-1 leading-relaxed">
                  Zero-deforestation bamboo architectural supplies crafted by ancestral woodcutters transitioning to sustainable forest farming.
                </p>
</div>
<div className="col-span-2 lg:text-center">
<span className="text-xs text-[#527265] block lg:hidden uppercase font-bold">APY:</span>
<span className="font-headline text-2xl font-bold text-[#047857]">18.2% APY</span>
</div>
<div className="col-span-3">
<div className="flex justify-between text-xs mb-1">
<span className="font-headline font-bold text-[#0f241c]">$980 pledged</span>
<span className="text-[#527265]">of $1,200 target</span>
</div>
<div className="w-full bg-[#e2efe8] rounded-full h-2 overflow-hidden">
<div className="bg-[#059669] h-2 rounded-full" ></div>
</div>
<div className="flex justify-between text-[10px] text-[#527265] mt-1.5 font-garamond italic">
<span>82% funded • 6 days remaining</span>
<span>9 fellow lenders</span>
</div>
</div>
<div className="col-span-2 text-right">
<button 
  onClick={() => handleFund('loan-1')}
  disabled={loadingLoanId === 'loan-1'}
  className="w-full py-2.5 px-3 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-sm disabled:opacity-50"
>
  {loadingLoanId === 'loan-1' ? 'Processing...' : 'Plant Seeds ($50 — $250)'} <span>→</span>
</button>
</div>
</div>
{/*  Row 3: Ananya Seed & Organic Loom Collective  */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-6 items-center hover:bg-[#fcfdfd] transition">
<div className="col-span-5">
<div className="flex items-center gap-2">
<span className="px-2 py-0.5 rounded bg-[#ecfdf5] text-[#059669] text-[10px] font-bold tracking-wider uppercase">100% Organic Cotton</span>
<span className="text-[10px] px-2 py-0.5 rounded-md bg-[#f2f8f5] text-[#527265] border border-[#d1e7dd]">Women Owned</span>
<span className="text-[10px] px-2 py-0.5 rounded-md bg-[#f2f8f5] text-[#527265] border border-[#d1e7dd]">Rain-Fed Tech</span>
</div>
<h3 className="font-headline text-xl font-bold text-[#0f241c] mt-2">Ananya Seed &amp; Organic Loom Collective</h3>
<p className="text-xs text-[#527265] mt-1 leading-relaxed">
                  Non-GMO heirloom cotton seed purchase and rainwater harvesting tanks for a union of 40 women spinners in rural Tamil Nadu.
                </p>
</div>
<div className="col-span-2 lg:text-center">
<span className="text-xs text-[#527265] block lg:hidden uppercase font-bold">APY:</span>
<span className="font-headline text-2xl font-bold text-[#047857]">16.0% APY</span>
</div>
<div className="col-span-3">
<div className="flex justify-between text-xs mb-1">
<span className="font-headline font-bold text-[#0f241c]">$2,400 pledged</span>
<span className="text-[#527265]">of $2,500 target</span>
</div>
<div className="w-full bg-[#e2efe8] rounded-full h-2 overflow-hidden">
<div className="bg-[#10b981] h-2 rounded-full" ></div>
</div>
<div className="flex justify-between text-[10px] text-[#527265] mt-1.5 font-garamond italic">
<span>96% funded • Almost complete!</span>
<span>22 fellow lenders</span>
</div>
</div>
<div className="col-span-2 text-right">
<button onClick={() => { setToast('Final $100 funded! Project fully capitalized.'); setTimeout(() => setToast(''), 4000); }} className="w-full py-2.5 px-3 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-sm">Plant Final $100 <span>→</span></button>
</div>
</div>
</div>
</div>
</section>
{/*  Regenerative Footer Note  */}
<footer className="pt-6 pb-8 border-t border-[#d1e7dd] flex flex-col sm:flex-row items-center justify-between text-xs text-[#527265] gap-3">
<div className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-[#059669]"></span>
<span>LenderX Solar Commons • Fully Audited Decentralized Mutualism</span>
</div>
<div className="flex gap-4 font-garamond italic text-sm">
<button onClick={() => { setToast("Loading principles..."); setTimeout(() => setToast(""), 3000); }} className="hover:underline">Principles of Regenerative Lending</button>
<button onClick={() => setActiveTab("Tax Documents")} className="hover:underline">Transparency Reports</button>
<button onClick={() => { setToast("Loading governance docs..."); setTimeout(() => setToast(""), 3000); }} className="hover:underline">Community Governance</button>
</div>
</footer>

</main>
)}
{activeTab === 'Global Projects' && (
  <div className="flex-1 p-8 lg:p-12">
    <h2 className="text-3xl font-bold font-serif text-[#064e3b] mb-2">Global Projects Explorer</h2>
    <p className="text-[#527265] mb-8 text-lg">Discover and deploy capital to verified cooperatives around the globe.</p>
    
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {[
        { name: 'Andes Organic Coffee Guild', location: 'Peru', target: '$12,000', progress: '85%', tag: 'Fair Trade' },
        { name: 'Nairobi Solar Water Pumps', location: 'Kenya', target: '$8,500', progress: '40%', tag: 'Clean Energy' },
        { name: 'Mekong Bamboo Artisans', location: 'Vietnam', target: '$5,000', progress: '92%', tag: 'Circular Economy' },
        { name: 'Ghana Cacao Co-op', location: 'Ghana', target: '$22,000', progress: '65%', tag: 'Fair Trade' }
      ].map((proj, i) => (
        <div key={i} className="bg-white rounded-3xl p-6 border border-[#d1e7dd] shadow-sm hover:shadow-md transition">
          <div className="flex justify-between items-start mb-4">
            <span className="px-3 py-1 bg-[#e6f4ed] text-[#059669] text-xs font-bold rounded-full">{proj.tag}</span>
            <span className="text-[#527265] text-xs font-medium">📍 {proj.location}</span>
          </div>
          <h3 className="text-xl font-bold text-[#091712] mb-1">{proj.name}</h3>
          <p className="text-[#527265] text-sm mb-5">Target: {proj.target}</p>
          <div className="w-full bg-[#e2efe8] rounded-full h-2 mb-2 overflow-hidden">
            <div className="bg-[#059669] h-2 rounded-full" style={{ width: proj.progress }}></div>
          </div>
          <p className="text-right text-xs font-bold text-[#059669] mb-6">{proj.progress} Funded</p>
          <button onClick={() => { setToast('Deployed $100 to ' + proj.name); setTimeout(() => setToast(''), 4000); }} className="w-full py-3 rounded-xl bg-[#064e3b] hover:bg-[#047857] text-white text-sm font-bold transition">Deploy Capital</button>
        </div>
      ))}
    </div>
  </div>
)}

{activeTab === 'My Returns' && (
  <div className="flex-1 p-8 lg:p-12">
    <h2 className="text-3xl font-bold font-serif text-[#064e3b] mb-2">Yield Analytics</h2>
    <p className="text-[#527265] mb-8 text-lg">Track your regenerative capital growth and community impact.</p>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <div className="bg-white p-6 rounded-3xl border border-[#d1e7dd] shadow-sm">
        <p className="text-[#527265] text-xs font-bold uppercase tracking-wider mb-2">Total Capital Deployed</p>
        <h3 className="text-4xl font-serif text-[#064e3b]">$24,500.00</h3>
        <p className="text-emerald-600 text-sm font-semibold mt-3">↑ 12 active projects</p>
      </div>
      <div className="bg-[#064e3b] p-6 rounded-3xl border border-[#047857] shadow-sm text-white">
        <p className="text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">Total Yield Returned</p>
        <h3 className="text-4xl font-serif">$3,420.50</h3>
        <p className="text-emerald-400 text-sm font-semibold mt-3">All-time realization</p>
      </div>
      <div className="bg-white p-6 rounded-3xl border border-[#d1e7dd] shadow-sm">
        <p className="text-[#527265] text-xs font-bold uppercase tracking-wider mb-2">Current Blended APY</p>
        <h3 className="text-4xl font-serif text-[#059669]">14.2%</h3>
        <p className="text-[#527265] text-sm font-medium mt-3">Targeting 15% end-of-year</p>
      </div>
    </div>
    
    <div className="bg-white rounded-3xl border border-[#d1e7dd] overflow-hidden shadow-sm">
      <div className="p-6 border-b border-[#d1e7dd] bg-slate-50">
        <h3 className="text-lg font-bold text-[#091712]">Recent On-Chain Payouts</h3>
      </div>
      <div className="p-0">
        {[
          { date: 'Sep 15, 2026', project: 'Rift Valley Solar Microgrid', amount: '+$142.50', status: 'Settled On-Chain' },
          { date: 'Sep 01, 2026', project: 'Mekong Regenerative Bamboo Guild', amount: '+$85.00', status: 'Settled On-Chain' },
          { date: 'Aug 15, 2026', project: 'Andes Organic Coffee Guild', amount: '+$210.00', status: 'Settled On-Chain' }
        ].map((row, i) => (
          <div key={i} className="flex items-center justify-between p-5 border-b border-slate-100 last:border-0 hover:bg-[#f2f8f5] transition cursor-pointer">
            <div>
              <p className="font-bold text-[#091712]">{row.project}</p>
              <p className="text-xs text-[#527265] mt-1">{row.date}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-[#059669] text-lg">{row.amount}</p>
              <p className="text-[10px] text-[#059669] uppercase tracking-wider mt-1 border border-[#059669]/20 bg-[#059669]/5 inline-block px-2 py-0.5 rounded">{row.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)}

{activeTab === 'Tax Documents' && (
  <div className="flex-1 p-8 lg:p-12">
    <h2 className="text-3xl font-bold font-serif text-[#064e3b] mb-2">Year-End Documents</h2>
    <p className="text-[#527265] mb-8 text-lg">Download your cryptographically verified impact and tax statements.</p>
    
    <div className="bg-white rounded-3xl border border-[#d1e7dd] p-8 max-w-3xl shadow-sm">
      <div className="space-y-4">
        {[
          { year: '2025', name: 'Form 1099-INT (Interest Income)', type: 'PDF • 1.2MB' },
          { year: '2025', name: 'Verified Impact Donation Receipt', type: 'PDF • 0.8MB' },
          { year: '2024', name: 'Form 1099-INT (Interest Income)', type: 'PDF • 1.1MB' },
          { year: '2024', name: 'Verified Impact Donation Receipt', type: 'PDF • 0.8MB' }
        ].map((doc, i) => (
          <div key={i} className="flex items-center justify-between p-5 bg-[#f2f8f5] rounded-2xl border border-[#d1e7dd] hover:border-[#059669] transition cursor-pointer">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-white text-[#059669] rounded-xl flex items-center justify-center font-bold border border-[#d1e7dd] shadow-sm">PDF</div>
              <div>
                <p className="font-bold text-slate-800 text-lg">{doc.name}</p>
                <p className="text-sm text-slate-500 mt-1">Tax Year {doc.year} • {doc.type}</p>
              </div>
            </div>
            <button onClick={() => { setToast('Downloading ' + doc.name + '...'); setTimeout(() => setToast(''), 3000); }} className="px-5 py-2.5 bg-white border border-[#d1e7dd] rounded-xl text-sm font-bold text-[#064e3b] hover:bg-[#e6f4ed] hover:border-[#059669] transition shadow-sm">Download</button>
          </div>
        ))}
      </div>
    </div>
  </div>
)}

    </div>
  </div>
);
}


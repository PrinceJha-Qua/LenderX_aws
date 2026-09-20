import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { createLoan, repayLoan } from '../services/api';

export default function BorrowerDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'Overview';
  const setActiveTab = (tab: string) => setSearchParams({ tab });
  const [amount, setAmount] = useState('250');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [activeBalance, setActiveBalance] = useState(120);
  const [isRepaying, setIsRepaying] = useState(false);

  
  const handleRepay = async () => {
    setIsRepaying(true);
    try {
      await repayLoan('B-123', { loanId: 'LOAN-123', amountCents: activeBalance * 100 });
      setActiveBalance(0);
      alert('Repayment successful! Your credit limit has been increased to $750.');
    } catch (e) {
      alert('Repayment failed.');
    } finally {
      setIsRepaying(false);
    }
  };

  const handleApply = async () => {
    setIsLoading(true);
    setError('');
    setSuccessMsg('');
    try {
      const amountCents = Math.round(parseFloat(amount) * 100);
      if (isNaN(amountCents) || amountCents <= 0) throw new Error("Invalid amount");
      await createLoan("B-123", { amountCents, termDays: 60, purpose: "Business Expansion" });
      setSuccessMsg("Loan request submitted successfully!");
      setAmount('');
    } catch (err: any) {
      setError(err.message || "Failed to request loan");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full min-h-screen font-sans bg-slate-50">
      {/*  BEGIN: MainContentArea  */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-topo-hills">
{activeTab === 'Overview' && (
<div className="space-y-8">
{/*  BEGIN: Editorial Header & Borrower Banner  */}
<section className="relative overflow-hidden rounded-3xl bg-[#0c3b2e] text-white shadow-xl" data-purpose="primary-borrower-banner">
<div className="grid grid-cols-1 lg:grid-cols-12">
{/*  Left Copy Column  */}
<div className="lg:col-span-7 p-8 sm:p-10 md:p-12 flex flex-col justify-between z-10">
<div>
<div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-400/30 text-emerald-200 text-xs font-bold uppercase tracking-[0.14em] mb-4">
<span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Tier 3 Verified Enterprise
          </div>
<h1 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-bold tracking-[0.035em] text-white leading-[1.18] mb-4">
            Scaling with Purpose, Amina
          </h1>
<p className="text-emerald-100/90 text-base sm:text-lg leading-relaxed max-w-xl font-light tracking-[0.015em]">
            Enterprise Tier 3 unlocked — Expand your working capital with transparent fixed-rate micro-facilities designed for growing merchants and regional leaders.
          </p>
</div>
<div className="mt-8 pt-6 border-t border-emerald-800/60 flex flex-wrap items-center gap-6 text-xs text-emerald-200/90 tracking-[0.02em]">
<div className="flex items-center gap-2">
<svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round"></path></svg>
<span className="tracking-[0.02em]">Institutional Credit Underwriting</span>
</div>
<div className="flex items-center gap-2">
<svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
<span className="tracking-[0.02em]">Instant Disbursement</span>
</div>
<div className="flex items-center gap-2">
<span className="font-editorial-italic text-sm text-emerald-300 tracking-[0.035em]">“Small businesses build brighter tomorrows.”</span>
</div>
</div>
</div>
{/*  Right Borrower Image Column using IMAGE_4  */}
<div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full overflow-hidden bg-emerald-950">
<img alt="Amina M. - Confident enterprise entrepreneur in her boutique store" className="object-cover object-center w-full h-full min-h-[320px] max-h-[420px] lg:max-h-none filter brightness-95 contrast-105" src="https://lh3.googleusercontent.com/aida/AEtjO1WgzDVj5SM8zyhRVNe9m5z9CMbGAtXun_FpMAA2p6GFYAzoa3GXCyZWQPCAa4uqkTZJGHZyfQimXoux26n3e6ZjgAsbKL3JBh0SllN2PDlUmNoi1HTAS_iqWg-GD_Td1ufoSSACFLiEBgfCFvgjyKXHHYjDVOLfzP2WthJeuT5mT2swDZQFYwsjUHuxYGKHj_hMbDX41mzHfGNYJyQ-ucz428G88YQtK5JDjvtW35Whxj1Ft7XsSprpOMsC"/>
<div className="absolute inset-0 bg-gradient-to-t from-[#0c3b2e] via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#0c3b2e] lg:via-transparent lg:to-transparent"></div>
<div className="absolute bottom-6 right-6 text-right select-none pointer-events-none">
<span className="block text-2xl sm:text-3xl font-editorial font-bold text-amber-200/90 tracking-[0.04em] drop-shadow leading-tight">
            Bigger<br/>Businesses<br/><span className="text-white/95">Brighter</span><br/>Communities
          </span>
</div>
</div>
</div>
</section>
{/*  END: Editorial Header & Borrower Banner  */}
{/*  BEGIN: Expansive Horizontal Stats Banner  */}
<section className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-6 sm:p-8" data-purpose="horizontal-metrics-banner">
<div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:divide-x md:divide-slate-100">
{/*  Metric 1: Credit Level  */}
<div className="flex items-start space-x-4">
<div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24">
<polyline points="20 6 9 17 4 12"></polyline>
</svg>
</div>
<div>
<p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">Credit Level</p>
<div className="text-3xl font-extrabold text-slate-900 mt-1 font-editorial tracking-[0.04em]">Tier 3</div>
<div className="mt-1 flex items-center text-xs font-semibold text-emerald-700 tracking-[0.015em]">
<svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
<path d="M5 10l7-7m0 0l7 7m-7-7v18" strokeLinecap="round" strokeLinejoin="round"></path>
</svg>
<span>Good track record!</span>
</div>
</div>
</div>
{/*  Metric 2: Credit Limit  */}
<div className="md:pl-6 flex items-start space-x-4">
<div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" viewBox="0 0 24 24">
<rect height="14" rx="2" width="20" x="2" y="7"></rect>
<path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
</svg>
</div>
<div>
<p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">Available Limit</p>
<div className="text-3xl font-extrabold text-slate-900 mt-1 font-editorial tracking-[0.04em]">$350.00</div>
<div className="mt-1 flex items-center text-xs font-semibold text-emerald-700 tracking-[0.015em]">
<svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
<path d="M5 10l7-7m0 0l7 7m-7-7v18" strokeLinecap="round" strokeLinejoin="round"></path>
</svg>
<span>+$200 from last level</span>
</div>
</div>
</div>
{/*  Metric 3: Active Loan Balance  */}
<div className="md:pl-6 flex items-start space-x-4">
<div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0">
<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" viewBox="0 0 24 24">
<rect height="14" rx="2" width="20" x="2" y="5"></rect>
<circle cx="12" cy="12" r="3"></circle>
</svg>
</div>
<div>
<p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">Active Balance</p>
<div className="text-3xl font-extrabold text-slate-900 mt-1 font-editorial tracking-[0.04em]">$120.00</div>
<div className="mt-1 flex items-center text-xs font-semibold text-rose-600 tracking-[0.015em]">
<svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<circle cx="12" cy="12" r="10"></circle>
<polyline points="12 6 12 12 16 14"></polyline>
</svg>
<span>Due in 12 days</span>
</div>
</div>
</div>
{/*  Metric 4: Lifetime Repaid  */}
<div className="md:pl-6 flex items-start space-x-4">
<div className="w-12 h-12 rounded-xl bg-[#e8f3ee] text-[#0c3b2e] flex items-center justify-center flex-shrink-0">
<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"></path>
</svg>
</div>
<div>
<p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">Lifetime Facilitated</p>
<div className="text-3xl font-extrabold text-slate-900 mt-1 font-editorial tracking-[0.04em]">$325.00</div>
<div className="mt-1 flex items-center text-xs font-semibold text-emerald-700 tracking-[0.015em]">
<span>100% on-time repayment</span>
</div>
</div>
</div>
</div>
</section>
{/*  END: Expansive Horizontal Stats Banner  */}
{/*  BEGIN: Asymmetrical Editorial Dashboard Layout (Main content + Right sidebar rail)  */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
{/*  LEFT 8 COLUMNS: Main Operations (Loan History & Community Impact Stories)  */}
<div className="lg:col-span-8 space-y-8">
{/*  SECTION: Loan History (Maintained verbatim records)  */}
<section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)]" data-purpose="loan-history-table">
<div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
<div>
<h3 className="text-2xl font-bold font-editorial tracking-[0.035em] text-slate-900">Your Loan History</h3>
<p className="text-xs text-slate-500 mt-0.5 tracking-[0.015em]">Transparent record of all micro-credit disbursements and completed terms</p>
</div>
<button onClick={() => setActiveTab("Facilities")} className="inline-flex items-center text-sm font-semibold text-[#0c3b2e] hover:text-emerald-700 transition-colors tracking-[0.02em]">
<span>View All</span>
<svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"></path>
</svg>
</button>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-[0.14em]">
<th className="pb-3.5 pl-2" scope="col">Date</th>
<th className="pb-3.5 px-4" scope="col">Amount</th>
<th className="pb-3.5 px-4" scope="col">Purpose</th>
<th className="pb-3.5 pr-2 text-right" scope="col">Status</th>
</tr>
</thead>
<tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
{/*  Row 1  */}
<tr className="hover:bg-slate-50/70 transition-colors">
<td className="py-4 pl-2 font-medium text-slate-900 tracking-[0.015em]">Apr 12, 2024</td>
<td className="py-4 px-4 font-semibold text-slate-900 font-editorial text-base tracking-[0.04em]">$150.00</td>
<td className="py-4 px-4 text-slate-600 tracking-[0.015em]">Stock inventory</td>
<td className="py-4 pr-2 text-right">
<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60 tracking-[0.02em]">
<svg className="w-3 h-3 mr-1 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
<polyline points="20 6 9 17 4 12"></polyline>
</svg>
                  Completed
                </span>
</td>
</tr>
{/*  Row 2  */}
<tr className="hover:bg-slate-50/70 transition-colors">
<td className="py-4 pl-2 font-medium text-slate-900 tracking-[0.015em]">Mar 3, 2024</td>
<td className="py-4 px-4 font-semibold text-slate-900 font-editorial text-base tracking-[0.04em]">$50.00</td>
<td className="py-4 px-4 text-slate-600 tracking-[0.015em]">Raw materials</td>
<td className="py-4 pr-2 text-right">
<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60 tracking-[0.02em]">
<svg className="w-3 h-3 mr-1 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
<polyline points="20 6 9 17 4 12"></polyline>
</svg>
                  Completed
                </span>
</td>
</tr>
{/*  Row 3  */}
<tr className="hover:bg-slate-50/70 transition-colors">
<td className="py-4 pl-2 font-medium text-slate-900 tracking-[0.015em]">Jan 18, 2024</td>
<td className="py-4 px-4 font-semibold text-slate-900 font-editorial text-base tracking-[0.04em]">$75.00</td>
<td className="py-4 px-4 text-slate-600 tracking-[0.015em]">Equipment repair</td>
<td className="py-4 pr-2 text-right">
<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60 tracking-[0.02em]">
<svg className="w-3 h-3 mr-1 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
<polyline points="20 6 9 17 4 12"></polyline>
</svg>
                  Completed
                </span>
</td>
</tr>
{/*  Row 4  */}
<tr className="hover:bg-slate-50/70 transition-colors">
<td className="py-4 pl-2 font-medium text-slate-900 tracking-[0.015em]">Dec 2, 2023</td>
<td className="py-4 px-4 font-semibold text-slate-900 font-editorial text-base tracking-[0.04em]">$50.00</td>
<td className="py-4 px-4 text-slate-600 tracking-[0.015em]">Initial stock</td>
<td className="py-4 pr-2 text-right">
<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60 tracking-[0.02em]">
<svg className="w-3 h-3 mr-1 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
<polyline points="20 6 9 17 4 12"></polyline>
</svg>
                  Completed
                </span>
</td>
</tr>
</tbody>
</table>
</div>
</section>
{/*  SECTION: Community & Enterprise Growth Stories (Featuring IMAGE_2)  */}
<section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)]" data-purpose="enterprise-growth-spotlight">
<div className="flex items-center justify-between mb-6">
<div>
<span className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">Spotlight &amp; Impact</span>
<h3 className="text-2xl font-bold font-editorial tracking-[0.035em] text-slate-900 mt-1">Enterprise Growth &amp; Marketplace Stories</h3>
</div>
<button onClick={() => { alert("Loading Impact Report..."); }} className="text-xs font-bold text-[#0c3b2e] hover:underline tracking-[0.02em]">Quarterly Impact Report →</button>
</div>
{/*  Main Featured Story Card with IMAGE_2  */}
<div className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 transition-all hover:shadow-md mb-6">
<div className="grid grid-cols-1 md:grid-cols-12">
<div className="md:col-span-7 relative h-56 md:h-auto min-h-[220px] overflow-hidden">
<img alt="Modernized artisan marketplace with digital payment kiosks" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida/AEtjO1XlFSkAI0sup7CsjasrUgRTOmpGY3RN463MvSvY-48S8FFAvNrXRssK18wFYZGECA1O98Adoa5q_zg0lA2yGk32hRlERlS0YTHMTVhj0ZPe8leRPXe5ICo9lzdZ1x33YIGgB81yz1Ooz88UZNK2ZAU4v4V-cwfyrpcJX6ILMYiW_VWtcoTTXn0uiWKes4nSPju3Q5PP6vYp1zgcD_y1dMHJJW0kfXOLaZfq41NKVIRFLSWRT17bc2oxSpk"/>
<div className="absolute top-3 left-3 bg-[#0c3b2e]/90 backdrop-blur-sm text-white px-2.5 py-1 rounded text-xs font-semibold tracking-[0.03em]">
              Kigali Commerce Hub
            </div>
</div>
<div className="md:col-span-5 p-6 flex flex-col justify-between">
<div>
<p className="text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-800">Digital Transformation</p>
<h4 className="text-lg font-bold font-editorial tracking-[0.03em] text-slate-900 mt-1 leading-snug">
                How Dukore Neza Artisans Scaled Revenue by 240%
              </h4>
<p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed tracking-[0.015em]">
                By integrating POS micro-terminals and revolving inventory credit through LenderX, 34 cooperative vendors established steady export supply lines.
              </p>
</div>
<div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between">
<span className="text-xs font-medium text-slate-500 tracking-[0.015em]">Read 4 min case study</span>
<span className="text-xs font-bold text-[#0c3b2e] flex items-center gap-1 group-hover:translate-x-1 transition-transform tracking-[0.02em]">
                Read story <span>→</span>
</span>
</div>
</div>
</div>
</div>
{/*  Secondary Resource Cards Grid  */}
<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
{/*  Resource 1  */}
<div className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-white hover:border-emerald-200 hover:shadow-sm transition-all flex flex-col justify-between">
<div>
<div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center mb-3">
<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" strokeLinecap="round" strokeLinejoin="round"></path></svg>
</div>
<h5 className="text-sm font-bold text-slate-900 tracking-[0.02em]">Tips for Growth</h5>
<p className="text-xs text-slate-500 mt-1 leading-relaxed tracking-[0.015em]">Learn how to manage seasonal cash flow and grow sustainably.</p>
</div>
<button onClick={() => setActiveTab("Support")} className="mt-4 inline-flex items-center text-xs font-bold text-[#0c3b2e] hover:text-emerald-800 tracking-[0.02em]">
<span>View Resources</span>
<svg className="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round"></path></svg>
</button>
</div>
{/*  Resource 2  */}
<div className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-white hover:border-emerald-200 hover:shadow-sm transition-all flex flex-col justify-between">
<div>
<div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center mb-3">
<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round"></path></svg>
</div>
<h5 className="text-sm font-bold text-slate-900 tracking-[0.02em]">Document Templates</h5>
<p className="text-xs text-slate-500 mt-1 leading-relaxed tracking-[0.015em]">Download invoices &amp; ledger forms to accelerate approvals.</p>
</div>
<button onClick={() => setActiveTab("Documents")} className="mt-4 inline-flex items-center text-xs font-bold text-[#0c3b2e] hover:text-emerald-800 tracking-[0.02em]">
<span>Download Templates</span>
<svg className="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round"></path></svg>
</button>
</div>
{/*  Resource 3  */}
<div className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-white hover:border-emerald-200 hover:shadow-sm transition-all flex flex-col justify-between">
<div>
<div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round"></path></svg>
</div>
<h5 className="text-sm font-bold text-slate-900 tracking-[0.02em]">Merchant Network</h5>
<p className="text-xs text-slate-500 mt-1 leading-relaxed tracking-[0.015em]">Connect with 1,200+ fellow entrepreneurs in your region.</p>
</div>
<button onClick={() => setActiveTab("Network")} className="mt-4 inline-flex items-center text-xs font-bold text-[#0c3b2e] hover:text-emerald-800 tracking-[0.02em]">
<span>Join Network</span>
<svg className="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round"></path></svg>
</button>
</div>
</div>
</section>
</div>
{/*  RIGHT 4 COLUMNS: Action Rail (Quick Application, Progress Ladder, Calculator)  */}
<aside className="lg:col-span-4 space-y-6" data-purpose="loan-application-action-rail">
{/*  Card 1: Loan Application Action & Instant Calculator  */}
<div className="bg-[#0c3b2e] text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-emerald-900 relative overflow-hidden">
<div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-emerald-700/20 blur-2xl pointer-events-none"></div>
<div className="flex items-center justify-between mb-4">
<span className="text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-300">Action Rail</span>
<span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-[0.08em] bg-emerald-400 text-[#0c3b2e]">Fast-Track</span>
</div>
<h3 className="text-2xl font-bold font-editorial tracking-[0.035em] text-white mb-2">
          Request New Facility
        </h3>
<p className="text-emerald-100/80 text-xs sm:text-sm leading-relaxed mb-5 tracking-[0.015em]">
          Request funds to purchase bulk inventory, acquire equipment, or expand operations.
        </p>
{/*  Quick Loan Calculator Widget  */}
<div className="bg-emerald-950/60 rounded-2xl p-4 border border-emerald-800/80 mb-5 space-y-3.5">
<div className="flex items-center justify-between text-xs">
<span className="text-emerald-200 tracking-[0.02em]">Desired Amount</span>
<span className="font-bold text-white text-base font-editorial tracking-[0.04em]">$250.00</span>
</div>
<div className="w-full bg-emerald-900 rounded-full h-2">
<div className="bg-emerald-400 h-2 rounded-full w-[70%]"></div>
</div>
<div className="flex justify-between text-[10px] text-emerald-300/70">
<button onClick={() => setAmount("50")} type="button" className="hover:text-emerald-300 tracking-[0.02em]">Min: $50</button>
<button onClick={() => setAmount("350")} type="button" className="hover:text-emerald-300 tracking-[0.02em]">Max: $350 (Tier 3)</button>
</div>
<div className="pt-3 border-t border-emerald-900/80 grid grid-cols-2 gap-2 text-xs">
<div>
<span className="text-[10px] font-bold uppercase tracking-[0.08em] text-emerald-300 block">Term Length</span>
<span className="font-semibold text-white tracking-[0.02em]">60 Days</span>
</div>
<div>
<span className="text-[10px] font-bold uppercase tracking-[0.08em] text-emerald-300 block">Est. Bi-Weekly</span>
<span className="font-semibold text-white tracking-[0.02em]">$65.00</span>
</div>
</div>
</div>
<div className="mt-4 mb-2">
  <label className="text-[10px] font-bold uppercase tracking-[0.08em] text-emerald-300 block mb-1">Requested Amount (USD)</label>
  <input 
    type="number" 
    value={amount} 
    onChange={(e) => setAmount(e.target.value)} 
    placeholder="250.00"
    className="w-full bg-white/10 border border-emerald-700 rounded-lg px-3 py-2 text-white placeholder-emerald-400/50 outline-none focus:border-emerald-400 tracking-[0.03em]"
  />
</div>
{error && <p className="text-red-400 text-xs mb-2 tracking-[0.015em]">{error}</p>}
{successMsg && <p className="text-emerald-300 text-xs mb-2 tracking-[0.015em]">{successMsg}</p>}
<button 
  onClick={handleApply}
  disabled={isLoading}
  className="w-full inline-flex items-center justify-center space-x-2 bg-white text-[#0c3b2e] hover:bg-emerald-50 px-5 py-3.5 rounded-xl font-bold text-sm transition-all shadow-md active:scale-95 disabled:opacity-50" 
  type="button"
>
<span className="tracking-[0.02em]">{isLoading ? 'Processing...' : `Apply for $${amount || '0'} Now`}</span>
<svg className="w-4 h-4 font-bold" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
<path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round"></path>
</svg>
</button>
<p className="text-center text-[11px] text-emerald-200/70 mt-3 mb-2 tracking-[0.02em]">Fixed rate. No hidden fees. Instant decision.</p>
<Link to="/wizard" className="w-full inline-flex items-center justify-center space-x-2 bg-emerald-900 text-emerald-300 hover:bg-emerald-800 px-5 py-3.5 rounded-xl font-bold text-sm transition-all shadow-md mt-2">
  <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect width="16" height="16" x="4" y="4" rx="2"></rect>
    <rect width="6" height="6" x="9" y="9" rx="1"></rect>
    <path d="M15 2v2m0 16v2M2 15h2m0-6h2M20 15h2m0-6h2M9 2v2m0 16v2"></path>
  </svg>
  <span className="tracking-[0.03em]">Instant AI Underwriting</span>
</Link>

</div>
{/*  Card 2: Vertical Credit Progress Ladder  */}
<div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
<div className="flex items-center justify-between mb-4">
<h4 className="text-base font-bold font-editorial tracking-[0.035em] text-slate-900">Credit Progress Ladder</h4>
<span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full tracking-[0.02em]">Level 3 of 5</span>
</div>
<p className="text-xs text-slate-500 mb-5 tracking-[0.015em] leading-relaxed">Each prompt loan repayment automatically unlocks increased capital thresholds.</p>
<div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
{/*  Ladder Step 1: Completed  */}
<div className="relative flex items-start space-x-3">
<div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center ring-4 ring-white">
<svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
</div>
<div>
<div className="flex items-center gap-2">
<span className="text-xs font-bold text-slate-900 tracking-[0.02em]">Level 1: Seed Micro</span>
<span className="text-[11px] text-emerald-700 font-semibold tracking-[0.02em]">$50 Limit</span>
</div>
<p className="text-[11px] text-slate-500 font-medium tracking-[0.015em]">Completed December 2023</p>
</div>
</div>
{/*  Ladder Step 2: Completed  */}
<div className="relative flex items-start space-x-3">
<div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center ring-4 ring-white">
<svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
</div>
<div>
<div className="flex items-center gap-2">
<span className="text-xs font-bold text-slate-900 tracking-[0.02em]">Level 2: Artisan Growth</span>
<span className="text-[11px] text-emerald-700 font-semibold tracking-[0.02em]">$150 Limit</span>
</div>
<p className="text-[11px] text-slate-500 font-medium tracking-[0.015em]">Completed April 2024</p>
</div>
</div>
{/*  Ladder Step 3: Current Active Tier  */}
<div className="relative flex items-start space-x-3">
<div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-[#0c3b2e] text-emerald-300 flex items-center justify-center ring-4 ring-emerald-100">
<span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping"></span>
</div>
<div>
<div className="flex items-center gap-2">
<span className="text-xs font-bold text-[#0c3b2e] tracking-[0.02em]">Level 3: Enterprise Merchant</span>
<span className="text-[11px] font-bold text-[#0c3b2e] bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 tracking-[0.02em]">$350 Limit</span>
</div>
<p className="text-[11px] text-emerald-700 font-medium mt-0.5 tracking-[0.015em]">Current Active Tier (Good Standing)</p>
</div>
</div>
{/*  Ladder Step 4: Next Level  */}
<div className="relative flex items-start space-x-3 opacity-60">
<div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center ring-4 ring-white text-[10px] font-bold">
            4
          </div>
<div>
<div className="flex items-center gap-2">
<span className="text-xs font-bold text-slate-700 tracking-[0.02em]">Level 4: Commercial Expansion</span>
<span className="text-[11px] text-slate-500 font-semibold tracking-[0.02em]">$750 Limit</span>
</div>
<p className="text-[11px] text-slate-500 font-medium tracking-[0.015em]">Repay current $120 balance to unlock</p>
</div>
</div>
{/*  Ladder Step 5: Master Tier  */}
<div className="relative flex items-start space-x-3 opacity-40">
<div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center ring-4 ring-white text-[10px] font-bold">
            5
          </div>
<div>
<div className="flex items-center gap-2">
<span className="text-xs font-bold text-slate-700 tracking-[0.02em]">Level 5: Sovereign Merchant</span>
<span className="text-[11px] text-slate-500 font-semibold tracking-[0.02em]">$1,500+</span>
</div>
<p className="text-[11px] text-slate-500 font-medium tracking-[0.015em]">Priority syndicate banking lines</p>
</div>
</div>
</div>
</div>
{/*  Card 3: Dedicated Relationship Officer  */}
<div className="bg-emerald-50/70 rounded-2xl p-5 border border-emerald-200/70 flex items-center space-x-4">
<div className="w-11 h-11 rounded-full bg-[#0c3b2e] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
          KM
        </div>
<div className="flex-grow">
<span className="text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-800 block">Dedicated Officer</span>
<p className="text-sm font-bold text-slate-900 tracking-[0.02em]">Kofi Mensah</p>
<p className="text-xs text-slate-500 tracking-[0.015em]">Available Mon-Fri 08:00-18:00</p>
</div>
<button onClick={() => setActiveTab("Support")} className="p-2 rounded-lg bg-white text-[#0c3b2e] shadow-sm border border-emerald-200 hover:bg-emerald-50 transition-colors">
<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeLinecap="round" strokeLinejoin="round"></path></svg>
</button>
</div>
</aside>
</div>
{/*  END: Asymmetrical Editorial Dashboard Layout  */}
{/*  BEGIN: BottomCommunityLandscapeBanner  */}
<section className="relative overflow-hidden rounded-2xl bg-slate-900 text-white min-h-[140px] flex items-center shadow-lg" data-purpose="footer-community-banner">
<div className="absolute inset-0 z-0">
<img alt="Rural green landscape horizon" className="w-full h-full object-cover object-center opacity-45" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGs4KVimujIszHXov48PSOE6P9YUveQGLXPfqUNLuSfpB4Eig5k77ITdrDZgzcSv8cSmMCWHQt_xWzF3n9n4jvP0iVuOmWtaj8qNr4r5L0arm9r_ebOxRiOaqxEyRWhnPMwGSuTbCbQrXAOD_ZvD9CxXTubgETsAT7cJWpXbirOYRR6BCYkUKkw7k1edX19ukrxIvZRwoS2Qz5NpTxDbl7ClC3OXKr2vKU-Vo7caUqsEEmkBLQ4L7eUA"/>
<div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/75"></div>
</div>
<div className="relative z-10 w-full px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
<div>
<h4 className="text-lg sm:text-xl font-bold font-editorial tracking-[0.035em] text-white">
          Global capital. Local dreams.
        </h4>
<p className="text-sm text-slate-300 mt-0.5 tracking-[0.015em]">
          Together, we build stronger communities across 28 developing commercial markets.
        </p>
</div>
<div className="flex items-center space-x-3">
<div className="w-10 h-10 rounded-full border-2 border-emerald-400/40 overflow-hidden shadow-inner flex-shrink-0">
<img alt="Community member portrait" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBi1SbMEfqFAmSy-ukurwr4EU0dbAvupy3vA6dpDsUdlOxScHaoSw-Rec-jLBJsKDMrOTeQIzyEAuJD0_EmqJUp4jA6WsxfNyqiLmu71lwPiGJRCd4tMKxiUJ3G7JQa9BW5NR2NGckNDq1hD651jP1Y0-nN8jvJ_sSqbrt2e0Goo6nguM9MsquDl4x8P_S-Zo-k4GC3yotsc-b5oLE6zFO5XfsPqFY5iBB6Z8epFxsg4hjoF2toh5ecQ"/>
</div>
</div>
</div>
</section>
{/*  END: BottomCommunityLandscapeBanner  */}

  </div>
)}
{activeTab === 'Facilities' && (
  <div className="bg-white rounded-3xl p-8 lg:p-12 border border-slate-200 shadow-sm min-h-[500px] flex flex-col items-center justify-center text-center">
    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-inner">
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
    </div>
    <h3 className="text-3xl font-editorial font-bold tracking-[0.035em] text-slate-900 mb-3">Credit Facilities Ledger</h3>
    <p className="text-slate-500 text-lg max-w-lg mb-8 tracking-[0.015em] leading-relaxed">You currently have no active external credit facilities. Apply for a loan to start building your on-chain credit ledger.</p>
    <button onClick={() => setActiveTab('Overview')} className="bg-[#0c3b2e] text-white px-8 py-3 rounded-full font-bold shadow-md hover:bg-emerald-800 transition tracking-[0.02em]">Return to Overview</button>
  </div>
)}
{activeTab === 'Documents' && (
  <div className="bg-white rounded-3xl p-8 lg:p-12 border border-slate-200 shadow-sm min-h-[500px]">
    <h3 className="text-3xl font-editorial font-bold tracking-[0.035em] text-slate-900 mb-2">Verified Documents</h3>
    <p className="text-slate-500 mb-8 tracking-[0.015em]">Cryptographically signed business logic and ledgers.</p>
    <div className="grid gap-4 max-w-3xl">
      {[
        { name: 'Kigali Enterprise License', date: 'Oct 2023', type: 'PDF' },
        { name: 'Q3 Verified Financial Ledger', date: 'Jan 2024', type: 'CSV' },
        { name: 'LenderX Terms of Service', date: 'Jan 2024', type: 'PDF' }
      ].map((doc, idx) => (
        <div key={idx} className="flex items-center justify-between p-5 border border-slate-200 rounded-2xl hover:border-emerald-500 hover:bg-emerald-50/50 transition cursor-pointer group">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center font-bold tracking-[0.04em]">{doc.type}</div>
            <div>
              <span className="block font-bold text-slate-900 text-lg tracking-[0.015em]">{doc.name}</span>
              <span className="text-sm text-slate-500 tracking-[0.015em]">Uploaded {doc.date}</span>
            </div>
          </div>
          <button onClick={() => alert("Downloading " + doc.name)} className="text-sm font-bold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-lg group-hover:bg-emerald-100 transition tracking-[0.02em]">View File</button>
        </div>
      ))}
    </div>
  </div>
)}
{activeTab === 'Network' && (
  <div className="bg-white rounded-3xl p-8 lg:p-12 border border-slate-200 shadow-sm min-h-[500px] flex flex-col items-center justify-center text-center">
    <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6 shadow-inner">
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
    </div>
    <h3 className="text-3xl font-editorial font-bold tracking-[0.035em] text-slate-900 mb-3">Impact Network</h3>
    <p className="text-slate-500 text-lg max-w-lg tracking-[0.015em] leading-relaxed">Connect with other funded cooperatives, share supplier logistics, and grow your regional presence across the LenderX ecosystem.</p>
  </div>
)}
{activeTab === 'Support' && (
  <div className="bg-white rounded-3xl p-8 lg:p-12 border border-slate-200 shadow-sm min-h-[500px] flex flex-col items-center justify-center text-center relative overflow-hidden">
    <div className="absolute top-0 w-full h-32 bg-emerald-900/5"></div>
    <div className="relative z-10 w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-xl mb-4">
      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBi1SbMEfqFAmSy-ukurwr4EU0dbAvupy3vA6dpDsUdlOxScHaoSw-Rec-jLBJsKDMrOTeQIzyEAuJD0_EmqJUp4jA6WsxfNyqiLmu71lwPiGJRCd4tMKxiUJ3G7JQa9BW5NR2NGckNDq1hD651jP1Y0-nN8jvJ_sSqbrt2e0Goo6nguM9MsquDl4x8P_S-Zo-k4GC3yotsc-b5oLE6zFO5XfsPqFY5iBB6Z8epFxsg4hjoF2toh5ecQ" className="w-full h-full object-cover" />
    </div>
    <h3 className="text-3xl font-editorial font-bold tracking-[0.035em] text-slate-900 mb-1">Kofi Mensah</h3>
    <p className="text-emerald-600 font-bold tracking-[0.14em] text-xs uppercase mb-4">Your Dedicated Support Officer</p>
    <p className="text-slate-500 text-lg max-w-md mb-8 tracking-[0.015em] leading-relaxed">Kofi is your regional liaison in East Africa. He is available to assist with ledger queries, Tier upgrades, and repayment restructuring.</p>
    <button onClick={() => alert("Opening WhatsApp chat with Kofi...")} className="bg-[#0c3b2e] text-white font-bold py-3 px-8 rounded-full shadow-md hover:bg-emerald-800 transition tracking-[0.02em]">Message Kofi</button>
  </div>
)}

</main>
{/*  END: MainContentArea  */}
{/*  BEGIN: PageFooter  */}
<footer className="mt-8 border-t border-slate-200/70 bg-white/70 py-6" data-purpose="site-footer">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-3">
<p>© 2024 LenderX Inc. Enterprise Borrower Services. All rights reserved.</p>
<div className="flex space-x-6">
<button onClick={() => { alert("Loading Privacy Policy..."); }} className="hover:text-slate-800 transition-colors">Privacy Policy</button>
<button onClick={() => { alert("Loading Terms..."); }} className="hover:text-slate-800 transition-colors">Terms of Service</button>
<button onClick={() => { alert("Loading Security..."); }} className="hover:text-slate-800 transition-colors">Security &amp; Encryption</button>
</div>
</div>
</footer>
{/*  END: PageFooter  */}

    </div>
  );
}

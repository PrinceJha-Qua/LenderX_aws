const fs = require('fs');
let file = fs.readFileSync('src/components/BorrowerDashboard.tsx', 'utf8');

// Find the main start
const mainStart = '<main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-topo-hills">';
const sectionStart = '{/*  BEGIN: Editorial Header & Borrower Banner  */}';

if (file.includes(mainStart) && !file.includes("{activeTab === 'Overview' && (")) {
  file = file.replace(
    sectionStart,
    `{activeTab === 'Overview' && (\n<div className="space-y-8">\n${sectionStart}`
  );

  // Find the end of main
  const endBanner = '{/*  END: BottomCommunityLandscapeBanner  */}';
  const endMain = '</main>';
  
  const additionalViews = `
  </div>
)}
{activeTab === 'Facilities' && (
  <div className="bg-white rounded-3xl p-8 lg:p-12 border border-slate-200 shadow-sm min-h-[500px] flex flex-col items-center justify-center text-center">
    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-inner">
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
    </div>
    <h3 className="text-3xl font-editorial font-bold text-slate-900 mb-3">Credit Facilities Ledger</h3>
    <p className="text-slate-500 text-lg max-w-lg mb-8">You currently have no active external credit facilities. Apply for a loan to start building your on-chain credit ledger.</p>
    <button onClick={() => setActiveTab('Overview')} className="bg-[#0c3b2e] text-white px-8 py-3 rounded-full font-bold shadow-md hover:bg-emerald-800 transition">Return to Overview</button>
  </div>
)}
{activeTab === 'Documents' && (
  <div className="bg-white rounded-3xl p-8 lg:p-12 border border-slate-200 shadow-sm min-h-[500px]">
    <h3 className="text-3xl font-editorial font-bold text-slate-900 mb-2">Verified Documents</h3>
    <p className="text-slate-500 mb-8">Cryptographically signed business logic and ledgers.</p>
    <div className="grid gap-4 max-w-3xl">
      {[
        { name: 'Kigali Enterprise License', date: 'Oct 2023', type: 'PDF' },
        { name: 'Q3 Verified Financial Ledger', date: 'Jan 2024', type: 'CSV' },
        { name: 'LenderX Terms of Service', date: 'Jan 2024', type: 'PDF' }
      ].map((doc, idx) => (
        <div key={idx} className="flex items-center justify-between p-5 border border-slate-200 rounded-2xl hover:border-emerald-500 hover:bg-emerald-50/50 transition cursor-pointer group">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center font-bold">{doc.type}</div>
            <div>
              <span className="block font-bold text-slate-900 text-lg">{doc.name}</span>
              <span className="text-sm text-slate-500">Uploaded {doc.date}</span>
            </div>
          </div>
          <button onClick={() => alert("Downloading " + doc.name)} className="text-sm font-bold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-lg group-hover:bg-emerald-100 transition">View File</button>
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
    <h3 className="text-3xl font-editorial font-bold text-slate-900 mb-3">Impact Network</h3>
    <p className="text-slate-500 text-lg max-w-lg">Connect with other funded cooperatives, share supplier logistics, and grow your regional presence across the LenderX ecosystem.</p>
  </div>
)}
{activeTab === 'Support' && (
  <div className="bg-white rounded-3xl p-8 lg:p-12 border border-slate-200 shadow-sm min-h-[500px] flex flex-col items-center justify-center text-center relative overflow-hidden">
    <div className="absolute top-0 w-full h-32 bg-emerald-900/5"></div>
    <div className="relative z-10 w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-xl mb-4">
      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBi1SbMEfqFAmSy-ukurwr4EU0dbAvupy3vA6dpDsUdlOxScHaoSw-Rec-jLBJsKDMrOTeQIzyEAuJD0_EmqJUp4jA6WsxfNyqiLmu71lwPiGJRCd4tMKxiUJ3G7JQa9BW5NR2NGckNDq1hD651jP1Y0-nN8jvJ_sSqbrt2e0Goo6nguM9MsquDl4x8P_S-Zo-k4GC3yotsc-b5oLE6zFO5XfsPqFY5iBB6Z8epFxsg4hjoF2toh5ecQ" className="w-full h-full object-cover" />
    </div>
    <h3 className="text-3xl font-editorial font-bold text-slate-900 mb-1">Kofi Mensah</h3>
    <p className="text-emerald-600 font-bold tracking-wide text-xs uppercase mb-4">Your Dedicated Support Officer</p>
    <p className="text-slate-500 text-lg max-w-md mb-8">Kofi is your regional liaison in East Africa. He is available to assist with ledger queries, Tier upgrades, and repayment restructuring.</p>
    <button onClick={() => alert("Opening WhatsApp chat with Kofi...")} className="bg-[#0c3b2e] text-white font-bold py-3 px-8 rounded-full shadow-md hover:bg-emerald-800 transition">Message Kofi</button>
  </div>
)}
`;
  
  file = file.replace(
    endBanner,
    `${endBanner}\n${additionalViews}`
  );
  
  fs.writeFileSync('src/components/BorrowerDashboard.tsx', file);
}

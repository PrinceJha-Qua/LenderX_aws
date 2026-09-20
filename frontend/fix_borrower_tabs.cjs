const fs = require('fs');
let content = fs.readFileSync('src/components/BorrowerDashboard.tsx', 'utf8');

// The main grid starts at: <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
const gridStart = '<div className="grid grid-cols-1 md:grid-cols-12 gap-8">';
if (content.includes(gridStart) && !content.includes("activeTab === 'Overview'")) {
  content = content.replace(gridStart, `{activeTab === 'Overview' && (\n` + gridStart);
  
  // Replace the closing tags with the new views
  // Lender dashboard had </main>, but Borrower has </div></div></div>
  const badEnd = /<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*\);\s*}/;
  
  const views = `
  </div>
)}
{activeTab === 'Facilities' && (
  <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm min-h-[400px] flex flex-col items-center justify-center text-center">
    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-2">Credit Facilities</h3>
    <p className="text-slate-500 max-w-md">You currently have no active external credit facilities. Apply for a loan to start building your credit ledger.</p>
  </div>
)}
{activeTab === 'Documents' && (
  <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm min-h-[400px]">
    <h3 className="text-xl font-bold text-slate-900 mb-6">Verified Documents</h3>
    <div className="grid gap-4">
      {['Business License', 'Q3 Ledger', 'Impact Survey 2026'].map((doc) => (
        <div key={doc} className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg></div>
            <span className="font-semibold text-slate-800">{doc}</span>
          </div>
          <button className="text-sm font-bold text-emerald-600 hover:text-emerald-700">View</button>
        </div>
      ))}
    </div>
  </div>
)}
{activeTab === 'Network' && (
  <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm min-h-[400px] flex flex-col items-center justify-center text-center">
    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-2">Impact Network</h3>
    <p className="text-slate-500 max-w-md">Connect with other funded cooperatives and share resources across the LenderX ecosystem.</p>
  </div>
)}
{activeTab === 'Support' && (
  <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm min-h-[400px] flex flex-col items-center justify-center text-center">
    <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-4">
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-2">Dedicated Support</h3>
    <p className="text-slate-500 max-w-md mb-6">Your personal impact manager is Sarah M. She is available 24/7 to assist with your ledger.</p>
    <button className="bg-slate-900 text-white font-bold py-3 px-6 rounded-xl hover:bg-slate-800 transition">Contact Sarah</button>
  </div>
)}
</div>
</div>
</div>
</div>
  );
}
`;
  content = content.replace(badEnd, views);
  fs.writeFileSync('src/components/BorrowerDashboard.tsx', content);
}

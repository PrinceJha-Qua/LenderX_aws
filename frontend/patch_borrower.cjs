const fs = require('fs');
let content = fs.readFileSync('src/components/BorrowerDashboard.tsx', 'utf8');

// 1. Add activeTab state
content = content.replace(
  "const [successMsg, setSuccessMsg] = useState('');",
  "const [successMsg, setSuccessMsg] = useState('');\n  const [activeTab, setActiveTab] = useState('Overview');"
);

// 2. Replace the static nav with an interactive one
// Find the nav block starting around <nav className="flex items-center space-x-1">
// We will replace it programmatically.
const navRegex = /<nav className="flex items-center space-x-1 mb-8 overflow-x-auto pb-2 scrollbar-hide">([\s\S]*?)<\/nav>/;
const dynamicNav = `
<nav className="flex items-center space-x-1 mb-8 overflow-x-auto pb-2 scrollbar-hide">
  {['Overview', 'Facilities', 'Documents', 'Network', 'Support'].map(tab => (
    <button 
      key={tab}
      onClick={() => setActiveTab(tab)}
      className={\`flex items-center space-x-2 px-4 py-2 text-sm font-semibold rounded-full transition-colors \${activeTab === tab ? 'text-[#0c3b2e] bg-[#e8f3ee]' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}\`}
    >
      <span>{tab}</span>
    </button>
  ))}
</nav>
`;
content = content.replace(navRegex, dynamicNav);

// 3. Conditionally render the main content
// The main content starts at <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
// Let's wrap that grid in `{activeTab === 'Overview' && (` and `)}`
const gridStart = '<div className="grid grid-cols-1 md:grid-cols-12 gap-8">';
const gridEnd = `</div>\n</div>\n</div>\n    </div>\n  );\n}`; // Approximate end
const newGridStart = `{activeTab === 'Overview' && (\n  <div className="grid grid-cols-1 md:grid-cols-12 gap-8">`;
content = content.replace(gridStart, newGridStart);

// At the end of the file, we add the closing parenthesis and the other tab views
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
  );
}
`;

content = content.replace(/<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*\);\s*}/g, views);

fs.writeFileSync('src/components/BorrowerDashboard.tsx', content);


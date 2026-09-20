const fs = require('fs');
let content = fs.readFileSync('src/components/LenderDashboard.tsx', 'utf8');

// Add activeTab state
content = content.replace(
  "const [loadingLoanId, setLoadingLoanId] = useState<string | null>(null);",
  "const [loadingLoanId, setLoadingLoanId] = useState<string | null>(null);\n  const [activeTab, setActiveTab] = useState('Harvest Overview');"
);

// Replace static nav
const navRegex = /<nav className="mt-6 space-y-1\.5">([\s\S]*?)<\/nav>/;
const dynamicNav = `
<nav className="mt-6 space-y-1.5">
  {['Harvest Overview', 'Global Projects', 'My Returns', 'Tax Documents'].map(tab => (
    <button 
      key={tab}
      onClick={() => setActiveTab(tab)}
      className={\`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-xs tracking-wide transition \${activeTab === tab ? 'bg-[#142921] text-[#34d399] border border-[#10b981]/30 shadow-inner' : 'text-[#a7f3d0]/75 hover:text-white hover:bg-[#12241d]'}\`}
    >
      {tab === 'Harvest Overview' && <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>}
      {tab === 'Global Projects' && <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582"></path></svg>}
      {tab === 'My Returns' && <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>}
      {tab === 'Tax Documents' && <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>}
      {tab}
    </button>
  ))}
</nav>
`;
content = content.replace(navRegex, dynamicNav);

// Find main content block
// The main content in LenderDashboard is typically right after the aside, inside a main tag or a div that takes the rest of the flex.
const mainStart = '<div className="flex-1 lg:pl-[240px] flex flex-col min-h-screen">';
const newMainStart = mainStart + `\n  {activeTab === 'Harvest Overview' && (\n    <div className="w-full flex-1">`;
content = content.replace(mainStart, newMainStart);

// At the end
const endViews = `
    </div>
  )}
  {activeTab === 'Global Projects' && (
    <div className="flex-1 p-8 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold font-serif text-[#064e3b]">Global Projects Explorer</h2>
      <p className="text-[#527265] mt-4">Browse and fund international cooperatives.</p>
    </div>
  )}
  {activeTab === 'My Returns' && (
    <div className="flex-1 p-8 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold font-serif text-[#064e3b]">Yield Analytics</h2>
      <p className="text-[#527265] mt-4">Your detailed portfolio performance will appear here.</p>
    </div>
  )}
  {activeTab === 'Tax Documents' && (
    <div className="flex-1 p-8 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold font-serif text-[#064e3b]">Year-End Forms</h2>
      <p className="text-[#527265] mt-4">Generate 1099-INT and impact donation receipts.</p>
    </div>
  )}
</div>
    </div>
  );
}`;
content = content.replace(/<\/div>\s*<\/div>\s*\);\s*}/g, endViews);

fs.writeFileSync('src/components/LenderDashboard.tsx', content);


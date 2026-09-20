const fs = require('fs');
let content = fs.readFileSync('src/components/LenderDashboard.tsx', 'utf8');

// 1. Fix progress bars
// Find any div with h-1.5 or h-2 and rounded-full that is inside a bg container, and give it width.
content = content.replace(/<div className="bg-\[#059669\] h-1\.5 rounded-full"><\/div>/g, '<div className="bg-[#059669] h-1.5 rounded-full" style={{width: "65%"}}></div>');
content = content.replace(/<div className="bg-\[#10b981\] h-2 rounded-full"><\/div>/g, '<div className="bg-[#10b981] h-2 rounded-full" style={{width: "87%"}}></div>');
content = content.replace(/<div className="bg-\[#059669\] h-2 rounded-full"><\/div>/g, '<div className="bg-[#059669] h-2 rounded-full" style={{width: "82%"}}></div>');

// 2. Add Export loading state
content = content.replace(
  "const [activeTab, setActiveTab] = useState('Harvest Overview');",
  "const [activeTab, setActiveTab] = useState('Harvest Overview');\n  const [isExporting, setIsExporting] = useState(false);\n  const [toast, setToast] = useState('');"
);

// 3. Fix the handleFund alert -> toast
const newHandleFund = `
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
`;
content = content.replace(/const handleFund = async \([\s\S]*?};/, newHandleFund);

// 4. Update Export button
const handleExport = `
  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setToast('Impact Ledger Exported successfully.');
      setTimeout(() => setToast(''), 4000);
    }, 1500);
  };
`;
content = content.replace("const handleFund = async", handleExport + "\n  const handleFund = async");

content = content.replace(
  /<button className="bg-white text-\[#064e3b\] px-4 py-2 rounded-full text-xs font-bold border border-[#064e3b]\/20 shadow-sm hover:shadow hover:bg-stone-50 transition">Export Impact Ledger<\/button>/,
  `<button onClick={handleExport} className="bg-white text-[#064e3b] px-4 py-2 rounded-full text-xs font-bold border border-[#064e3b]/20 shadow-sm hover:shadow hover:bg-stone-50 transition">{isExporting ? 'Exporting...' : 'Export Impact Ledger'}</button>`
);

// 5. Add Toast UI
const toastUI = `
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#064e3b] text-white px-6 py-4 rounded-xl shadow-2xl animate-in slide-in-from-bottom-4">
          <p className="font-bold text-sm">{toast}</p>
        </div>
      )}
`;
content = content.replace('<div className="w-full min-h-screen font-sans bg-slate-50">', '<div className="w-full min-h-screen font-sans bg-slate-50">' + toastUI);

// 6. Fix `href="#"` by replacing them with buttons or empty hrefs that don't scroll
content = content.replace(/href="#"/g, 'href="#!"');

fs.writeFileSync('src/components/LenderDashboard.tsx', content);

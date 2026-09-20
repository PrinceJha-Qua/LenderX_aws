const fs = require('fs');
let content = fs.readFileSync('src/components/BorrowerDashboard.tsx', 'utf8');

// Add repayLoan import if not there
if (!content.includes('repayLoan')) {
  content = content.replace('createLoan', 'createLoan, repayLoan');
}

// Add state for activeBalance
content = content.replace(
  "const [activeTab, setActiveTab] = useState('Overview');",
  "const [activeTab, setActiveTab] = useState('Overview');\n  const [activeBalance, setActiveBalance] = useState(120);\n  const [isRepaying, setIsRepaying] = useState(false);"
);

// Add handleRepay function
const handleRepay = `
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
`;
content = content.replace("const handleApply = async () => {", handleRepay + "\n  const handleApply = async () => {");

// Find the Active Balance card and add the Repay button
content = content.replace(
  /<p className="text-sm font-bold text-slate-900 mt-1">Due in 12 days<\/p>/g,
  `<p className="text-sm font-bold text-slate-900 mt-1">{activeBalance > 0 ? 'Due in 12 days' : 'Fully Paid'}</p>
   {activeBalance > 0 && (
     <button 
       onClick={handleRepay} 
       disabled={isRepaying}
       className="mt-3 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-lg text-xs shadow-sm transition disabled:opacity-50"
     >
       {isRepaying ? 'Processing...' : 'Repay Now'}
     </button>
   )}`
);

// Update the Active Balance text to use state
content = content.replace(
  /<h3 className="text-3xl font-black font-editorial text-amber-500 tracking-tight">\$120\.00<\/h3>/g,
  `<h3 className="text-3xl font-black font-editorial text-amber-500 tracking-tight">\${activeBalance.toFixed(2)}</h3>`
);

// Add link to AI Wizard near the apply button
const wizardLink = `
<Link to="/wizard" className="w-full inline-flex items-center justify-center space-x-2 bg-emerald-900 text-emerald-300 hover:bg-emerald-800 px-5 py-3.5 rounded-xl font-bold text-sm transition-all shadow-md mt-2">
  <span>✨ Apply via AI Underwriting</span>
</Link>
`;
content = content.replace(
  /<p className="text-center text-\[11px\] text-emerald-200\/70 mt-3">Fixed rate\. No hidden fees\. Instant decision\.<\/p>/g,
  `<p className="text-center text-[11px] text-emerald-200/70 mt-3 mb-2">Fixed rate. No hidden fees. Instant decision.</p>` + wizardLink
);

// We need to import Link in BorrowerDashboard if not there
if (!content.includes("import { Link }")) {
  content = content.replace("import React, { useState } from 'react';", "import React, { useState } from 'react';\nimport { Link } from 'react-router-dom';");
}

fs.writeFileSync('src/components/BorrowerDashboard.tsx', content);

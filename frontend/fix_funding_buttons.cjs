const fs = require('fs');
let lender = fs.readFileSync('src/components/LenderDashboard.tsx', 'utf8');

lender = lender.replace(
  /<button className="w-full py-2\.5 px-3 rounded-xl bg-\[#059669\] hover:bg-\[#047857\] text-white text-xs font-bold flex items-center justify-center gap-1\.5 transition shadow-sm">\s*Plant Seeds \(\$50 — \$250\) <span>→<\/span>\s*<\/button>/g,
  `<button onClick={() => { setToast('Successfully funded! Transaction verified on-chain.'); setTimeout(() => setToast(''), 4000); }} className="w-full py-2.5 px-3 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-sm">Plant Seeds ($50 — $250) <span>→</span></button>`
);

lender = lender.replace(
  /<button className="w-full py-2\.5 px-3 rounded-xl bg-\[#059669\] hover:bg-\[#047857\] text-white text-xs font-bold flex items-center justify-center gap-1\.5 transition shadow-sm">\s*Plant Final \$100 <span>→<\/span>\s*<\/button>/g,
  `<button onClick={() => { setToast('Final $100 funded! Project fully capitalized.'); setTimeout(() => setToast(''), 4000); }} className="w-full py-2.5 px-3 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-sm">Plant Final $100 <span>→</span></button>`
);

fs.writeFileSync('src/components/LenderDashboard.tsx', lender);

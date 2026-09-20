const fs = require('fs');
let file = fs.readFileSync('src/components/LenderDashboard.tsx', 'utf8');

file = file.replace(
  /<button className="flex-1 py-2 rounded-xl bg-\[#e6f4ed\] hover:bg-\[#d6ecdf\] text-\[#059669\] text-xs font-bold border border-\[#059669\]\/30 flex items-center justify-center gap-1\.5 transition">/g,
  '<button onClick={() => { setToast("Wishes and solidarity boost sent successfully!"); setTimeout(() => setToast(""), 3000); }} className="flex-1 py-2 rounded-xl bg-[#e6f4ed] hover:bg-[#d6ecdf] text-[#059669] text-xs font-bold border border-[#059669]/30 flex items-center justify-center gap-1.5 transition">'
);

file = file.replace(
  /<button className="w-full py-3 px-4 rounded-xl bg-\[#059669\] hover:bg-\[#047857\] text-white text-xs font-bold tracking-wide transition flex items-center justify-center gap-2 shadow-lg shadow-\[#059669\]\/25">/g,
  '<button onClick={() => setActiveTab("Global Projects")} className="w-full py-3 px-4 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold tracking-wide transition flex items-center justify-center gap-2 shadow-lg shadow-[#059669]/25">'
);

fs.writeFileSync('src/components/LenderDashboard.tsx', file);

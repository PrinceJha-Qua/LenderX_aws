const fs = require('fs');
let file = fs.readFileSync('src/components/LenderDashboard.tsx', 'utf8');

// Export Impact Ledger
file = file.replace(
  /<button className="px-4 py-2\.5 rounded-xl bg-\[#ffffff\]\/90 [\s\S]*?Export Impact Ledger/g,
  '<button onClick={() => { setToast("Impact Ledger Exported successfully."); setTimeout(() => setToast(""), 4000); }} className="px-4 py-2.5 rounded-xl bg-[#ffffff]/90 hover:bg-white text-[#064e3b] text-xs font-semibold backdrop-blur-sm border border-white/20 flex items-center gap-2 transition shadow"><svg className="w-4 h-4 text-[#059669]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>Export Impact Ledger'
);

// Deploy New Seeds
file = file.replace(
  /<button className="px-5 py-2\.5 rounded-xl bg-\[#059669\][\s\S]*?Deploy New Seeds/g,
  '<button onClick={() => setActiveTab("Global Projects")} className="px-5 py-2.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold tracking-wide shadow-md shadow-[#059669]/30 flex items-center gap-2 transition"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path></svg>Deploy New Seeds'
);

// Timeline chart buttons
file = file.replace(
  /<button className="px-3 py-1 rounded-lg bg-\[#059669\] text-white">6 Months<\/button>\s*<button className="px-3 py-1 rounded-lg hover:text-\[#0f241c\]">Full Season<\/button>\s*<button className="px-3 py-1 rounded-lg hover:text-\[#0f241c\]">All Time<\/button>/g,
  `<button onClick={() => { setToast("Showing 6 Month timeline"); setTimeout(() => setToast(""), 3000); }} className="px-3 py-1 rounded-lg bg-[#059669] text-white">6 Months</button>
  <button onClick={() => { setToast("Showing Full Season timeline"); setTimeout(() => setToast(""), 3000); }} className="px-3 py-1 rounded-lg hover:text-[#0f241c]">Full Season</button>
  <button onClick={() => { setToast("Showing All Time timeline"); setTimeout(() => setToast(""), 3000); }} className="px-3 py-1 rounded-lg hover:text-[#0f241c]">All Time</button>`
);

// View All 12 Co-op Partners ->
file = file.replace(
  /<a className="text-xs font-bold text-\[#059669\] hover:text-\[#047857\] flex items-center gap-1" href="#!">/g,
  '<button onClick={() => setActiveTab("Global Projects")} className="text-xs font-bold text-[#059669] hover:text-[#047857] flex items-center gap-1">'
);
file = file.replace(/View All 12 Co-op Partners <span>→<\/span><\/a>/g, 'View All 12 Co-op Partners <span>→</span></button>');

// Send Wishes & Boost
file = file.replace(
  /<button className="flex-1 py-2 rounded-xl bg-\[#e6f4ed\] hover:bg-\[#d6ecdf\] text-\[#059669\] text-xs font-bold border border-\[#059669\]\/30 flex items-center justify-center gap-1\.5 transition">\s*<span>💌<\/span> Send Wishes & Boost\s*<\/button>/g,
  `<button onClick={() => { setToast("Wishes and solidarity boost sent successfully!"); setTimeout(() => setToast(""), 3000); }} className="flex-1 py-2 rounded-xl bg-[#e6f4ed] hover:bg-[#d6ecdf] text-[#059669] text-xs font-bold border border-[#059669]/30 flex items-center justify-center gap-1.5 transition">
    <span>💌</span> Send Wishes & Boost
  </button>`
);

// Explore The Circular Map
file = file.replace(
  /<button className="w-full py-3 px-4 rounded-xl bg-\[#059669\] hover:bg-\[#047857\] text-white text-xs font-bold tracking-wide transition flex items-center justify-center gap-2 shadow-lg shadow-\[#059669\]\/25">\s*<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><\/path><\/svg>\s*Explore The Circular Map\s*<\/button>/g,
  `<button onClick={() => setActiveTab("Global Projects")} className="w-full py-3 px-4 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold tracking-wide transition flex items-center justify-center gap-2 shadow-lg shadow-[#059669]/25">
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
    Explore The Circular Map
  </button>`
);

// Deploy -> 
file = file.replace(
  /<a className="text-\[#059669\] font-semibold hover:underline" href="#!">Deploy →<\/a>/g,
  '<button onClick={() => setActiveTab("Global Projects")} className="text-[#059669] font-semibold hover:underline">Deploy →</button>'
);

// Filters
file = file.replace(
  /<button className="px-3 py-1 rounded-full bg-\[#e6f4ed\] border border-\[#059669\] text-\[#064e3b\] text-xs font-bold">All Earth Projects<\/button>\s*<button className="px-3 py-1 rounded-full bg-\[#ffffff\] border border-\[#d1e7dd\] hover:border-\[#059669\] text-\[#527265\] text-xs font-medium">Off-Grid Solar<\/button>\s*<button className="px-3 py-1 rounded-full bg-\[#ffffff\] border border-\[#d1e7dd\] hover:border-\[#059669\] text-\[#527265\] text-xs font-medium">Organic Seed Farms<\/button>/g,
  `<button onClick={() => { setToast("Filtered to All Earth Projects"); setTimeout(() => setToast(""), 3000); }} className="px-3 py-1 rounded-full bg-[#e6f4ed] border border-[#059669] text-[#064e3b] text-xs font-bold">All Earth Projects</button>
  <button onClick={() => { setToast("Filtered to Off-Grid Solar"); setTimeout(() => setToast(""), 3000); }} className="px-3 py-1 rounded-full bg-[#ffffff] border border-[#d1e7dd] hover:border-[#059669] text-[#527265] text-xs font-medium">Off-Grid Solar</button>
  <button onClick={() => { setToast("Filtered to Organic Seed Farms"); setTimeout(() => setToast(""), 3000); }} className="px-3 py-1 rounded-full bg-[#ffffff] border border-[#d1e7dd] hover:border-[#059669] text-[#527265] text-xs font-medium">Organic Seed Farms</button>`
);

// Footer links
file = file.replace(
  /<a className="hover:underline" href="#!">Principles of Regenerative Lending<\/a>/g,
  '<button onClick={() => { setToast("Loading principles..."); setTimeout(() => setToast(""), 3000); }} className="hover:underline">Principles of Regenerative Lending</button>'
);
file = file.replace(
  /<a className="hover:underline" href="#!">Transparency Reports<\/a>/g,
  '<button onClick={() => setActiveTab("Tax Documents")} className="hover:underline">Transparency Reports</button>'
);
file = file.replace(
  /<a className="hover:underline" href="#!">Community Governance<\/a>/g,
  '<button onClick={() => { setToast("Loading governance docs..."); setTimeout(() => setToast(""), 3000); }} className="hover:underline">Community Governance</button>'
);

fs.writeFileSync('src/components/LenderDashboard.tsx', file);

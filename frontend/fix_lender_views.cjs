const fs = require('fs');
let file = fs.readFileSync('src/components/LenderDashboard.tsx', 'utf8');

// The main block starts with: <main className="flex-1 lg:pl-[240px] flex flex-col min-h-screen">
// Note: It might just be <main className="flex-1...
// Let's find exactly how <main starts.
const mainStartRegex = /<main className="flex-1 p-6 lg:p-10 max-w-5xl mx-auto w-full">/
const actualMainStart = file.match(/<main[^>]*>/)[0];

if (!file.includes("{activeTab === 'Harvest Overview' && (")) {
  file = file.replace(actualMainStart, `{activeTab === 'Harvest Overview' && (\n` + actualMainStart);
  
  // Find the end of main
  const mainEndRegex = /<\/main>\n\s*<\/div>\n\s*<\/div>\n\s*\);\n}/;
  
  const allViews = `
</main>
)}
{activeTab === 'Global Projects' && (
  <div className="flex-1 p-8 lg:p-12">
    <h2 className="text-3xl font-bold font-serif text-[#064e3b] mb-2">Global Projects Explorer</h2>
    <p className="text-[#527265] mb-8 text-lg">Discover and deploy capital to verified cooperatives around the globe.</p>
    
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {[
        { name: 'Andes Organic Coffee Guild', location: 'Peru', target: '$12,000', progress: '85%', tag: 'Fair Trade' },
        { name: 'Nairobi Solar Water Pumps', location: 'Kenya', target: '$8,500', progress: '40%', tag: 'Clean Energy' },
        { name: 'Mekong Bamboo Artisans', location: 'Vietnam', target: '$5,000', progress: '92%', tag: 'Circular Economy' },
        { name: 'Ghana Cacao Co-op', location: 'Ghana', target: '$22,000', progress: '65%', tag: 'Fair Trade' }
      ].map((proj, i) => (
        <div key={i} className="bg-white rounded-3xl p-6 border border-[#d1e7dd] shadow-sm hover:shadow-md transition">
          <div className="flex justify-between items-start mb-4">
            <span className="px-3 py-1 bg-[#e6f4ed] text-[#059669] text-xs font-bold rounded-full">{proj.tag}</span>
            <span className="text-[#527265] text-xs font-medium">📍 {proj.location}</span>
          </div>
          <h3 className="text-xl font-bold text-[#091712] mb-1">{proj.name}</h3>
          <p className="text-[#527265] text-sm mb-5">Target: {proj.target}</p>
          <div className="w-full bg-[#e2efe8] rounded-full h-2 mb-2 overflow-hidden">
            <div className="bg-[#059669] h-2 rounded-full" style={{ width: proj.progress }}></div>
          </div>
          <p className="text-right text-xs font-bold text-[#059669] mb-6">{proj.progress} Funded</p>
          <button onClick={() => { setToast('Deployed $100 to ' + proj.name); setTimeout(() => setToast(''), 4000); }} className="w-full py-3 rounded-xl bg-[#064e3b] hover:bg-[#047857] text-white text-sm font-bold transition">Deploy Capital</button>
        </div>
      ))}
    </div>
  </div>
)}

{activeTab === 'My Returns' && (
  <div className="flex-1 p-8 lg:p-12">
    <h2 className="text-3xl font-bold font-serif text-[#064e3b] mb-2">Yield Analytics</h2>
    <p className="text-[#527265] mb-8 text-lg">Track your regenerative capital growth and community impact.</p>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <div className="bg-white p-6 rounded-3xl border border-[#d1e7dd] shadow-sm">
        <p className="text-[#527265] text-xs font-bold uppercase tracking-wider mb-2">Total Capital Deployed</p>
        <h3 className="text-4xl font-serif text-[#064e3b]">$24,500.00</h3>
        <p className="text-emerald-600 text-sm font-semibold mt-3">↑ 12 active projects</p>
      </div>
      <div className="bg-[#064e3b] p-6 rounded-3xl border border-[#047857] shadow-sm text-white">
        <p className="text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">Total Yield Returned</p>
        <h3 className="text-4xl font-serif">$3,420.50</h3>
        <p className="text-emerald-400 text-sm font-semibold mt-3">All-time realization</p>
      </div>
      <div className="bg-white p-6 rounded-3xl border border-[#d1e7dd] shadow-sm">
        <p className="text-[#527265] text-xs font-bold uppercase tracking-wider mb-2">Current Blended APY</p>
        <h3 className="text-4xl font-serif text-[#059669]">14.2%</h3>
        <p className="text-[#527265] text-sm font-medium mt-3">Targeting 15% end-of-year</p>
      </div>
    </div>
    
    <div className="bg-white rounded-3xl border border-[#d1e7dd] overflow-hidden shadow-sm">
      <div className="p-6 border-b border-[#d1e7dd] bg-slate-50">
        <h3 className="text-lg font-bold text-[#091712]">Recent On-Chain Payouts</h3>
      </div>
      <div className="p-0">
        {[
          { date: 'Sep 15, 2026', project: 'Rift Valley Solar Microgrid', amount: '+$142.50', status: 'Settled On-Chain' },
          { date: 'Sep 01, 2026', project: 'Mekong Regenerative Bamboo Guild', amount: '+$85.00', status: 'Settled On-Chain' },
          { date: 'Aug 15, 2026', project: 'Andes Organic Coffee Guild', amount: '+$210.00', status: 'Settled On-Chain' }
        ].map((row, i) => (
          <div key={i} className="flex items-center justify-between p-5 border-b border-slate-100 last:border-0 hover:bg-[#f2f8f5] transition cursor-pointer">
            <div>
              <p className="font-bold text-[#091712]">{row.project}</p>
              <p className="text-xs text-[#527265] mt-1">{row.date}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-[#059669] text-lg">{row.amount}</p>
              <p className="text-[10px] text-[#059669] uppercase tracking-wider mt-1 border border-[#059669]/20 bg-[#059669]/5 inline-block px-2 py-0.5 rounded">{row.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)}

{activeTab === 'Tax Documents' && (
  <div className="flex-1 p-8 lg:p-12">
    <h2 className="text-3xl font-bold font-serif text-[#064e3b] mb-2">Year-End Documents</h2>
    <p className="text-[#527265] mb-8 text-lg">Download your cryptographically verified impact and tax statements.</p>
    
    <div className="bg-white rounded-3xl border border-[#d1e7dd] p-8 max-w-3xl shadow-sm">
      <div className="space-y-4">
        {[
          { year: '2025', name: 'Form 1099-INT (Interest Income)', type: 'PDF • 1.2MB' },
          { year: '2025', name: 'Verified Impact Donation Receipt', type: 'PDF • 0.8MB' },
          { year: '2024', name: 'Form 1099-INT (Interest Income)', type: 'PDF • 1.1MB' },
          { year: '2024', name: 'Verified Impact Donation Receipt', type: 'PDF • 0.8MB' }
        ].map((doc, i) => (
          <div key={i} className="flex items-center justify-between p-5 bg-[#f2f8f5] rounded-2xl border border-[#d1e7dd] hover:border-[#059669] transition cursor-pointer">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-white text-[#059669] rounded-xl flex items-center justify-center font-bold border border-[#d1e7dd] shadow-sm">PDF</div>
              <div>
                <p className="font-bold text-slate-800 text-lg">{doc.name}</p>
                <p className="text-sm text-slate-500 mt-1">Tax Year {doc.year} • {doc.type}</p>
              </div>
            </div>
            <button onClick={() => { setToast('Downloading ' + doc.name + '...'); setTimeout(() => setToast(''), 3000); }} className="px-5 py-2.5 bg-white border border-[#d1e7dd] rounded-xl text-sm font-bold text-[#064e3b] hover:bg-[#e6f4ed] hover:border-[#059669] transition shadow-sm">Download</button>
          </div>
        ))}
      </div>
    </div>
  </div>
)}

    </div>
  </div>
);
}
`;
  file = file.replace(mainEndRegex, allViews);
  fs.writeFileSync('src/components/LenderDashboard.tsx', file);
}


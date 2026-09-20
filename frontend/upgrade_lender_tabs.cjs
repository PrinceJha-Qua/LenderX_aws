const fs = require('fs');
let file = fs.readFileSync('src/components/LenderDashboard.tsx', 'utf8');

// Replace the empty Global Projects placeholder
const globalProjectsView = `
  {activeTab === 'Global Projects' && (
    <div className="flex-1 p-8">
      <h2 className="text-3xl font-bold font-serif text-[#064e3b] mb-2">Global Projects Explorer</h2>
      <p className="text-[#527265] mb-8">Discover and deploy capital to verified cooperatives around the globe.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: 'Andes Organic Coffee Guild', location: 'Peru', target: '$12,000', progress: '85%', tag: 'Fair Trade' },
          { name: 'Nairobi Solar Water Pumps', location: 'Kenya', target: '$8,500', progress: '40%', tag: 'Clean Energy' },
          { name: 'Mekong Bamboo Artisans', location: 'Vietnam', target: '$5,000', progress: '92%', tag: 'Circular Economy' }
        ].map((proj, i) => (
          <div key={i} className="bg-white rounded-3xl p-6 border border-[#d1e7dd] shadow-sm hover:shadow-md transition">
            <div className="flex justify-between items-start mb-4">
              <span className="px-3 py-1 bg-[#e6f4ed] text-[#059669] text-xs font-bold rounded-full">{proj.tag}</span>
              <span className="text-[#527265] text-xs font-medium">📍 {proj.location}</span>
            </div>
            <h3 className="text-lg font-bold text-[#091712] mb-1">{proj.name}</h3>
            <p className="text-[#527265] text-sm mb-4">Target: {proj.target}</p>
            <div className="w-full bg-[#e2efe8] rounded-full h-1.5 mb-2 overflow-hidden">
              <div className="bg-[#059669] h-1.5 rounded-full" style={{ width: proj.progress }}></div>
            </div>
            <p className="text-right text-xs font-bold text-[#059669] mb-4">{proj.progress} Funded</p>
            <button onClick={() => { setToast('Deployed $100 to ' + proj.name); setTimeout(() => setToast(''), 4000); }} className="w-full py-2.5 rounded-xl bg-[#064e3b] hover:bg-[#047857] text-white text-xs font-bold transition">Deploy Capital</button>
          </div>
        ))}
      </div>
    </div>
  )}
`;
file = file.replace(/\{activeTab === 'Global Projects' && \([\s\S]*?\}\)/, globalProjectsView);

// Replace the empty My Returns placeholder
const returnsView = `
  {activeTab === 'My Returns' && (
    <div className="flex-1 p-8">
      <h2 className="text-3xl font-bold font-serif text-[#064e3b] mb-2">Yield Analytics</h2>
      <p className="text-[#527265] mb-8">Track your regenerative capital growth and community impact.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-3xl border border-[#d1e7dd] shadow-sm">
          <p className="text-[#527265] text-xs font-bold uppercase tracking-wider mb-2">Total Capital Deployed</p>
          <h3 className="text-3xl font-serif text-[#064e3b]">$24,500.00</h3>
          <p className="text-emerald-600 text-sm font-semibold mt-2">↑ 12 active projects</p>
        </div>
        <div className="bg-[#064e3b] p-6 rounded-3xl border border-[#047857] shadow-sm text-white">
          <p className="text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">Total Yield Returned</p>
          <h3 className="text-3xl font-serif">$3,420.50</h3>
          <p className="text-emerald-400 text-sm font-semibold mt-2">All-time realization</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-[#d1e7dd] shadow-sm">
          <p className="text-[#527265] text-xs font-bold uppercase tracking-wider mb-2">Current Blended APY</p>
          <h3 className="text-3xl font-serif text-[#059669]">14.2%</h3>
          <p className="text-[#527265] text-sm font-medium mt-2">Targeting 15% end-of-year</p>
        </div>
      </div>
      
      <div className="bg-white rounded-3xl border border-[#d1e7dd] overflow-hidden">
        <div className="p-6 border-b border-[#d1e7dd]">
          <h3 className="text-lg font-bold text-[#091712]">Recent Payouts</h3>
        </div>
        <div className="p-0">
          {[
            { date: 'Sep 15, 2026', project: 'Rift Valley Solar', amount: '+$142.50', status: 'Settled On-Chain' },
            { date: 'Sep 01, 2026', project: 'Mekong Bamboo', amount: '+$85.00', status: 'Settled On-Chain' },
            { date: 'Aug 15, 2026', project: 'Andes Coffee', amount: '+$210.00', status: 'Settled On-Chain' }
          ].map((row, i) => (
            <div key={i} className="flex items-center justify-between p-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition">
              <div>
                <p className="font-bold text-sm text-[#091712]">{row.project}</p>
                <p className="text-xs text-[#527265]">{row.date}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-sm text-[#059669]">{row.amount}</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wide">{row.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )}
`;
file = file.replace(/\{activeTab === 'My Returns' && \([\s\S]*?\}\)/, returnsView);

// Replace Tax Documents placeholder
const taxView = `
  {activeTab === 'Tax Documents' && (
    <div className="flex-1 p-8">
      <h2 className="text-3xl font-bold font-serif text-[#064e3b] mb-2">Year-End Documents</h2>
      <p className="text-[#527265] mb-8">Download your cryptographically verified impact and tax statements.</p>
      
      <div className="bg-white rounded-3xl border border-[#d1e7dd] p-6 max-w-2xl">
        <div className="space-y-4">
          {[
            { year: '2025', name: 'Form 1099-INT (Interest Income)', type: 'PDF • 1.2MB' },
            { year: '2025', name: 'Verified Impact Donation Receipt', type: 'PDF • 0.8MB' },
            { year: '2024', name: 'Form 1099-INT (Interest Income)', type: 'PDF • 1.1MB' }
          ].map((doc, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center font-bold">PDF</div>
                <div>
                  <p className="font-bold text-sm text-slate-800">{doc.name}</p>
                  <p className="text-xs text-slate-500">Tax Year {doc.year} • {doc.type}</p>
                </div>
              </div>
              <button onClick={() => { setToast('Downloading ' + doc.name + '...'); setTimeout(() => setToast(''), 3000); }} className="px-4 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition shadow-sm">Download</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )}
`;
file = file.replace(/\{activeTab === 'Tax Documents' && \([\s\S]*?\}\)/, taxView);

// Wire up peripheral buttons in LenderDashboard
// "Explore The Circular Map" -> Switches to Global Projects
file = file.replace(
  /<button className="w-full mt-4 py-3 rounded-xl bg-\[#064e3b\] hover:bg-\[#047857\] text-white text-xs font-bold tracking-wide transition shadow-md shadow-\[#064e3b\]\/20">/g,
  '<button onClick={() => setActiveTab("Global Projects")} className="w-full mt-4 py-3 rounded-xl bg-[#064e3b] hover:bg-[#047857] text-white text-xs font-bold tracking-wide transition shadow-md shadow-[#064e3b]/20">'
);
// "Detailed Lifecycle Audit ->" -> Toast
file = file.replace(
  /<a className="font-bold text-\[#059669\] hover:underline flex items-center gap-1 font-garamond italic text-sm" href="#!">/g,
  '<button onClick={() => { setToast("Generating full lifecycle audit..."); setTimeout(() => setToast(""), 3000); }} className="font-bold text-[#059669] hover:underline flex items-center gap-1 font-garamond italic text-sm">'
);
file = file.replace(/Detailed Lifecycle Audit →<\/a>/g, 'Detailed Lifecycle Audit →</button>');

// "Read Impact Ledger ->" in banner
file = file.replace(
  /<a className="underline hover:text-white" href="#!">Read Impact Ledger →<\/a>/g,
  '<button onClick={() => setActiveTab("My Returns")} className="underline hover:text-white">Read Impact Ledger →</button>'
);

// "View Field Reports" -> Toast
file = file.replace(
  /<button className="px-3 py-2 rounded-xl bg-\[#f2f8f5\] hover:bg-\[#e2efe8\] text-\[#0f241c\] text-xs font-semibold border border-\[#d1e7dd\]" title="View Field Reports">📖<\/button>/g,
  '<button onClick={() => { setToast("Opening live field IoT telemetry streams..."); setTimeout(() => setToast(""), 3000); }} className="px-3 py-2 rounded-xl bg-[#f2f8f5] hover:bg-[#e2efe8] text-[#0f241c] text-xs font-semibold border border-[#d1e7dd]" title="View Field Reports">📖</button>'
);

fs.writeFileSync('src/components/LenderDashboard.tsx', file);

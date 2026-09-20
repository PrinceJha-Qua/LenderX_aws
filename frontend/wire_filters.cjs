const fs = require('fs');
let file = fs.readFileSync('src/components/LenderDashboard.tsx', 'utf8');

if (!file.includes('const [filter, setFilter] = useState')) {
  file = file.replace(
    "const [timeframe, setTimeframe] = useState('6 Months');",
    "const [timeframe, setTimeframe] = useState('6 Months');\n  const [filter, setFilter] = useState('All');"
  );
  
  // Replace the filter buttons
  const oldFilters = /<div className="flex flex-wrap items-center gap-2 mb-6">[\s\S]*?<\/div>/;
  const newFilters = `<div className="flex flex-wrap items-center gap-2 mb-6">
    {['All Earth Projects', 'Off-Grid Solar', 'Organic Seed Farms'].map(f => (
      <button 
        key={f}
        onClick={() => { setFilter(f); setToast('Filtered by: ' + f); setTimeout(() => setToast(''), 3000); }}
        className={\`px-3 py-1 rounded-full text-xs transition \${filter === f || (filter === 'All' && f === 'All Earth Projects') ? 'bg-[#e6f4ed] border border-[#059669] text-[#064e3b] font-bold' : 'bg-[#ffffff] border border-[#d1e7dd] hover:border-[#059669] text-[#527265] font-medium'}\`}
      >
        {f}
      </button>
    ))}
  </div>`;
  
  file = file.replace(oldFilters, newFilters);
  fs.writeFileSync('src/components/LenderDashboard.tsx', file);
}

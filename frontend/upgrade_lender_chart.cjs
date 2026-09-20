const fs = require('fs');
let file = fs.readFileSync('src/components/LenderDashboard.tsx', 'utf8');

if (!file.includes('const [timeframe, setTimeframe] = useState')) {
  file = file.replace(
    "const [activeTab, setActiveTab] = useState('Harvest Overview');",
    "const [activeTab, setActiveTab] = useState('Harvest Overview');\n  const [timeframe, setTimeframe] = useState('6 Months');"
  );
  
  // Replace the buttons
  file = file.replace(
    /<div className="flex gap-1 text-xs font-bold text-\[#527265\] bg-\[#f2f8f5\] p-1 rounded-xl">[\s\S]*?<\/div>/,
    `<div className="flex gap-1 text-xs font-bold text-[#527265] bg-[#f2f8f5] p-1 rounded-xl">
        {['6 Months', 'Full Season', 'All Time'].map(t => (
          <button key={t} onClick={() => setTimeframe(t)} className={\`px-3 py-1 rounded-lg transition \${timeframe === t ? 'bg-[#059669] text-white' : 'hover:text-[#0f241c]'}\`}>{t}</button>
        ))}
      </div>`
  );
  
  // Replace the static total ($18,400.00) based on timeframe
  file = file.replace(
    /<h3 className="text-4xl font-serif font-bold text-\[#091712\] mt-1">\$18,400\.00<\/h3>/,
    `<h3 className="text-4xl font-serif font-bold text-[#091712] mt-1">{timeframe === '6 Months' ? '$18,400.00' : timeframe === 'Full Season' ? '$32,150.00' : '$84,900.00'}</h3>`
  );
  
  // Replace the percentage
  file = file.replace(
    /<div className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-\[#e6f4ed\] text-\[#059669\] text-xs font-bold">\s*<svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 10l7-7m0 0l7 7m-7-7v18" strokeWidth="2"><\/path><\/svg>\s*22\.4%\s*<\/div>/,
    `<div className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-[#e6f4ed] text-[#059669] text-xs font-bold">
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 10l7-7m0 0l7 7m-7-7v18" strokeWidth="2"></path></svg>
        {timeframe === '6 Months' ? '22.4%' : timeframe === 'Full Season' ? '31.8%' : '45.2%'}
      </div>`
  );
  
  fs.writeFileSync('src/components/LenderDashboard.tsx', file);
}

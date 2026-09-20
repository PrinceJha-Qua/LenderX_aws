const fs = require('fs');
let file = fs.readFileSync('src/components/LenderDashboard.tsx', 'utf8');

file = file.replace(
  /<button className="text-\[#a7f3d0\]\/70 hover:text-white p-1" title="Settings">/g,
  '<button onClick={() => { setToast("Opening Profile Settings..."); setTimeout(() => setToast(""), 3000); }} className="text-[#a7f3d0]/70 hover:text-white p-1" title="Settings">'
);

fs.writeFileSync('src/components/LenderDashboard.tsx', file);

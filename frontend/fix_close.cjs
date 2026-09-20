const fs = require('fs');
let file = fs.readFileSync('src/components/LenderDashboard.tsx', 'utf8');
file = file.replace(/Detailed Lifecycle Audit <span>→<\/span>\s*<\/a>/g, 'Detailed Lifecycle Audit <span>→</span>\n</button>');
fs.writeFileSync('src/components/LenderDashboard.tsx', file);

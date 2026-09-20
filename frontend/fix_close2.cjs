const fs = require('fs');
let file = fs.readFileSync('src/components/LenderDashboard.tsx', 'utf8');
file = file.replace(/View All 12 Co-op Partners <span>→<\/span>\s*<\/a>/g, 'View All 12 Co-op Partners <span>→</span>\n</button>');
fs.writeFileSync('src/components/LenderDashboard.tsx', file);

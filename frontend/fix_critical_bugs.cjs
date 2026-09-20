const fs = require('fs');

// Fix MainLandingPage runtime crash
let mlp = fs.readFileSync('src/components/MainLandingPage.tsx', 'utf8');
mlp = mlp.replace(/style="display:none;"/g, "style={{ display: 'none' }}");
mlp = mlp.replace(/<header className="[\s\S]*?<\/header>/, ""); // Remove duplicate header to fix collision
fs.writeFileSync('src/components/MainLandingPage.tsx', mlp);

// Fix LenderDashboard SVG syntax errors
let lender = fs.readFileSync('src/components/LenderDashboard.tsx', 'utf8');
lender = lender.replace(/lineargradient/g, 'linearGradient');
lender = lender.replace(/preserveaspectratio/g, 'preserveAspectRatio');
lender = lender.replace(/stop-color/g, 'stopColor');
lender = lender.replace(/stop-opacity/g, 'stopOpacity');
lender = lender.replace(/font-family/g, 'fontFamily');
lender = lender.replace(/font-size/g, 'fontSize');
fs.writeFileSync('src/components/LenderDashboard.tsx', lender);


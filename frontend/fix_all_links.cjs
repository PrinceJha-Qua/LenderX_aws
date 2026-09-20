const fs = require('fs');

// 1. Fix MainLandingPage.tsx
let mlp = fs.readFileSync('src/components/MainLandingPage.tsx', 'utf8');

// Replace standard dead links with real routes
mlp = mlp.replace(/href="#for-borrowers"/g, 'href="/borrower"');
mlp = mlp.replace(/href="#for-lenders"/g, 'href="/lender"');
mlp = mlp.replace(/href="#signin"/g, 'href="/borrower"');
mlp = mlp.replace(/href="#get-started"/g, 'href="/wizard"');
mlp = mlp.replace(/href="#borrower-application"/g, 'href="/wizard"');
mlp = mlp.replace(/href="#lender-portal"/g, 'href="/lender"');

// Fix in-page anchors so they don't break the page
mlp = mlp.replace(/href="#why-lenderx"/g, 'href="#our-impact"'); // point to a real ID
mlp = mlp.replace(/href="#impact-report"/g, 'href="#our-impact"');

// Add the ID to the impact section if it's missing so scrolling works
if (!mlp.includes('id="our-impact"')) {
    mlp = mlp.replace(/<section className="relative text-white py-24 impact-bg overflow-hidden"/g, '<section id="our-impact" className="relative text-white py-24 impact-bg overflow-hidden"');
}

fs.writeFileSync('src/components/MainLandingPage.tsx', mlp);

// 2. Fix LenderDashboard.tsx
let lender = fs.readFileSync('src/components/LenderDashboard.tsx', 'utf8');
// Wire up Deploy New Seeds
lender = lender.replace(
  /<button className="bg-white text-\[#064e3b\] px-4 py-2 rounded-full text-xs font-bold border border-\[#064e3b\]\/20 shadow-sm hover:shadow hover:bg-stone-50 transition">Deploy New Seeds<\/button>/g,
  '<a href="#opportunities" className="bg-white text-[#064e3b] px-4 py-2 rounded-full text-xs font-bold border border-[#064e3b]/20 shadow-sm hover:shadow hover:bg-stone-50 transition inline-block">Deploy New Seeds</a>'
);
// Make sure opportunities table has id="opportunities"
if (!lender.includes('id="opportunities"')) {
    lender = lender.replace(/<div className="bg-white rounded-3xl border border-\[#d1e7dd\] shadow-sm overflow-hidden">/g, '<div id="opportunities" className="bg-white rounded-3xl border border-[#d1e7dd] shadow-sm overflow-hidden">');
}

// Make all Send Wishes buttons trigger the toast!
lender = lender.replace(
  /<button className="bg-white border border-\[#d1e7dd\] text-\[#527265\] px-3 py-1.5 rounded-lg text-xs font-bold hover:border-\[#059669\] hover:text-\[#064e3b\] transition shadow-sm">💌 Send Wishes & Boost<\/button>/g,
  '<button onClick={() => { setToast("Wishes and solidarity boost sent successfully!"); setTimeout(() => setToast(""), 3000); }} className="bg-white border border-[#d1e7dd] text-[#527265] px-3 py-1.5 rounded-lg text-xs font-bold hover:border-[#059669] hover:text-[#064e3b] transition shadow-sm">💌 Send Wishes & Boost</button>'
);

fs.writeFileSync('src/components/LenderDashboard.tsx', lender);

// 3. Fix BorrowerDashboard.tsx
let borrower = fs.readFileSync('src/components/BorrowerDashboard.tsx', 'utf8');
// Fix the non-functional preset amounts ($50, $350)
borrower = borrower.replace(
  /<span>Min: \$50<\/span>/g,
  '<button onClick={() => setAmount("50")} type="button" className="hover:text-emerald-300">Min: $50</button>'
);
borrower = borrower.replace(
  /<span>Max: \$350 \(Tier 3\)<\/span>/g,
  '<button onClick={() => setAmount("350")} type="button" className="hover:text-emerald-300">Max: $350 (Tier 3)</button>'
);

// Fix "Quarterly Impact Report ->"
borrower = borrower.replace(
  /<a className="text-emerald-600 hover:text-emerald-700 font-bold text-xs inline-flex items-center gap-1 group" href="#impact-reports">/g,
  '<button onClick={() => alert("Downloading Impact Report...")} className="text-emerald-600 hover:text-emerald-700 font-bold text-xs inline-flex items-center gap-1 group">'
);
borrower = borrower.replace(/<\/a>\s*<\/div>\s*<\/div>\s*<div className="bg-emerald-50 rounded-2xl p-6/g, '</button>\n</div>\n</div>\n<div className="bg-emerald-50 rounded-2xl p-6');

// Replace "View All" with something that works
borrower = borrower.replace(
  /<a className="text-sm font-bold text-emerald-600 hover:text-emerald-700" href="#all-loans">View All →<\/a>/g,
  '<button onClick={() => setActiveTab("Documents")} className="text-sm font-bold text-emerald-600 hover:text-emerald-700">View All →</button>'
);

fs.writeFileSync('src/components/BorrowerDashboard.tsx', borrower);

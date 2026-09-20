const fs = require('fs');
let file = fs.readFileSync('src/components/MainLandingPage.tsx', 'utf8');

// Replace <a> tags pointing to dashboard flows with <Link>
file = file.replace(/<a ([^>]*)href="#(for-borrowers|signin|get-started|borrower-application)"/g, '<Link $1to="/borrower"');
file = file.replace(/<a ([^>]*)href="#(for-lenders|lender-portal)"/g, '<Link $1to="/lender"');
// Change closing tags for the ones we changed
// It's safer to just change the hrefs themselves and keep them as <a> for now, but to use the router properly we should use <Link>
// Actually, let's just make it simple: change href="#..." to href="/borrower" etc. React router's BrowserRouter intercepts normal anchors if we aren't careful, but standard <a href="/borrower"> forces a full reload which is perfectly fine for a demo. Or better, I'll use Link.

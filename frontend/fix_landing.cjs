const fs = require('fs');
let file = fs.readFileSync('src/components/MainLandingPage.tsx', 'utf8');

file = file.replace(/<a([^>]*)href="#(for-borrowers|signin|get-started|borrower-application)"/g, '<Link$1to="/borrower"');
file = file.replace(/<a([^>]*)href="#(for-lenders|lender-portal)"/g, '<Link$1to="/lender"');
file = file.replace(/<\/a>/g, '</Link>');

// We also need to change the static <a> tags that didn't get converted to <Link> back to <a> or just leave them.
// Wait, if I blindly replace </a> with </Link>, all a tags become Links. So I should replace `<a ` with `<Link ` everywhere in the file!
file = file.replace(/<a /g, '<Link ');

fs.writeFileSync('src/components/MainLandingPage.tsx', file);

const fs = require('fs');

// Fix LenderDashboard & BorrowerDashboard
['src/components/BorrowerDashboard.tsx', 'src/components/LenderDashboard.tsx'].forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/lineargradient/g, 'linearGradient');
  content = content.replace(/viewbox/g, 'viewBox');
  fs.writeFileSync(file, content);
});

// Fix MainLandingPage
let lPage = fs.readFileSync('src/components/MainLandingPage.tsx', 'utf8');
lPage = lPage.replace(/viewbox/g, 'viewBox');
// Revert `<Link href=` back to `<a href=` since Link doesn't take href
lPage = lPage.replace(/<Link ([^>]*)href=/g, '<a $1href=');
lPage = lPage.replace(/<\/Link>/g, '</a>'); // this might revert all Links but the earlier script just did global replace
// The previous script replaced all `<a ` with `<Link `, so reverting `</Link>` back to `</a>` for everything, then only applying `<Link to=` where appropriate
lPage = lPage.replace(/<Link/g, '<a');
lPage = lPage.replace(/<a ([^>]*)to=/g, '<Link $1to=');
// Fix the closing tags - regex is tricky, but we know if it has `to=` it should be a Link.
// Instead of complex regex, I will just use `<a href=` for everything since React Router <Link> isn't strictly necessary for a hackathon demo if we are fine with page reloads. Or I can just leave `<Link to=` as self-closing or something.
// Actually, let's replace `<a href="#` with `<a href="#` (standard HTML anchor), and `<Link to="/` with standard `<a href="/`.
lPage = lPage.replace(/<a([^>]*)to="/g, '<a$1href="'); // Convert all Links back to A tags for simplicity to avoid mismatched tags
fs.writeFileSync('src/components/MainLandingPage.tsx', lPage);


const fs = require('fs');
let file = fs.readFileSync('src/components/LenderDashboard.tsx', 'utf8');

// The faulty block starts right after </main>
// We want to replace from `</main>\n\n    </div>\n  )}` down to the end with a clean closing.
const badEndingRegex = /<\/main>[\s\S]*?\);\s*}/;
const cleanEnding = `</main>\n    </div>\n    </div>\n  );\n}`;
file = file.replace(badEndingRegex, cleanEnding);

fs.writeFileSync('src/components/LenderDashboard.tsx', file);

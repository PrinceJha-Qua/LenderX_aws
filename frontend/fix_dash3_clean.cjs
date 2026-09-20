const fs = require('fs');
const html = fs.readFileSync('/Users/sama/Desktop/dashboards_extracted/dash3/code.html', 'utf8');

const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
let body = bodyMatch ? bodyMatch[1] : html;
body = body.replace(/<script[\s\S]*?<\/script>/gi, '');
body = body.replace(/<(img|input|br|hr|meta|link)([^>]*?)(?<!\/)>/gi, '<$1$2 />');
body = body.replace(/class=/g, 'className=').replace(/for=/g, 'htmlFor=').replace(/stroke-width/g, 'strokeWidth').replace(/stroke-linecap/g, 'strokeLinecap').replace(/stroke-linejoin/g, 'strokeLinejoin').replace(/fill-rule/g, 'fillRule').replace(/clip-rule/g, 'clipRule').replace(/viewbox/g, 'viewBox');
body = body.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}').replace(/style="[^"]*"/g, '');
// Change the hero buttons to point to /borrower and /lender
body = body.replace(/href="#for-borrowers"/g, 'href="/borrower"');
body = body.replace(/href="#for-lenders"/g, 'href="/lender"');
body = body.replace(/href="#signin"/g, 'href="/borrower"');
body = body.replace(/href="#get-started"/g, 'href="/borrower"');

const content = `import React from 'react';\nexport default function MainLandingPage() {\n  return (\n    <div className="w-full min-h-screen font-sans bg-slate-50">\n      ${body}\n    </div>\n  );\n}\n`;
fs.writeFileSync('src/components/MainLandingPage.tsx', content);

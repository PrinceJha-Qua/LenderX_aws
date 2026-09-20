const fs = require('fs');
const path = require('path');

function convertHtmlToJsx(html, componentName) {
  // Extract body content
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  let body = bodyMatch ? bodyMatch[1] : html;

  // Remove generic tailwind script tags if any got caught
  body = body.replace(/<script[\s\S]*?<\/script>/gi, '');

  // Fix self-closing tags
  body = body.replace(/<(img|input|br|hr|meta|link)([^>]*?)(?<!\/)>/gi, '<$1$2 />');
  
  // React JSX property mappings
  body = body.replace(/class=/g, 'className=');
  body = body.replace(/for=/g, 'htmlFor=');
  body = body.replace(/stroke-width/g, 'strokeWidth');
  body = body.replace(/stroke-linecap/g, 'strokeLinecap');
  body = body.replace(/stroke-linejoin/g, 'strokeLinejoin');
  body = body.replace(/fill-rule/g, 'fillRule');
  body = body.replace(/clip-rule/g, 'clipRule');
  body = body.replace(/stroke-dasharray/g, 'strokeDasharray');
  body = body.replace(/stroke-dashoffset/g, 'strokeDashoffset');
  body = body.replace(/xmlns:xlink/g, 'xmlnsXlink');
  body = body.replace(/xlink:href/g, 'xlinkHref');
  body = body.replace(/tabindex/g, 'tabIndex');
  body = body.replace(/datetime/g, 'dateTime');
  
  // Replace HTML comments with JSX comments
  body = body.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');
  
  // Nuke inline styles to avoid React object conversion errors (these are tailwind files so inline style is rare/unnecessary)
  body = body.replace(/style="[^"]*"/g, '');

  const output = `import React from 'react';\n\nexport default function ${componentName}() {\n  return (\n    <div className="w-full min-h-screen font-sans bg-slate-50">\n      ${body}\n    </div>\n  );\n}\n`;
  
  return output;
}

const outDir = path.join(__dirname, 'src', 'components');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// 1. Borrower Dashboard
const bHtml = fs.readFileSync('/Users/sama/Desktop/dashboards_extracted/dash1/code.html', 'utf8');
fs.writeFileSync(path.join(outDir, 'BorrowerDashboard.tsx'), convertHtmlToJsx(bHtml, 'BorrowerDashboard'));

// 2. Lender Dashboard
const lHtml = fs.readFileSync('/Users/sama/Desktop/dashboards_extracted/dash2/code.html', 'utf8');
fs.writeFileSync(path.join(outDir, 'LenderDashboard.tsx'), convertHtmlToJsx(lHtml, 'LenderDashboard'));

console.log("Dashboards converted successfully!");

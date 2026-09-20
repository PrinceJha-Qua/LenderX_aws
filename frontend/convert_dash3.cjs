const fs = require('fs');
const path = require('path');
function convert(html, name) {
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  let body = bodyMatch ? bodyMatch[1] : html;
  body = body.replace(/<script[\s\S]*?<\/script>/gi, '');
  body = body.replace(/<(img|input|br|hr|meta|link)([^>]*?)(?<!\/)>/gi, '<$1$2 />');
  body = body.replace(/class=/g, 'className=').replace(/for=/g, 'htmlFor=').replace(/stroke-width/g, 'strokeWidth').replace(/stroke-linecap/g, 'strokeLinecap').replace(/stroke-linejoin/g, 'strokeLinejoin').replace(/fill-rule/g, 'fillRule').replace(/clip-rule/g, 'clipRule');
  body = body.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}').replace(/style="[^"]*"/g, '');
  return `import React from 'react';\nimport { Link } from 'react-router-dom';\nexport default function ${name}() {\n  return (\n    <div className="w-full min-h-screen font-sans bg-slate-50">\n      ${body}\n    </div>\n  );\n}\n`;
}
const html = fs.readFileSync('/Users/sama/Desktop/dashboards_extracted/dash3/code.html', 'utf8');
fs.writeFileSync('/Users/sama/Developer/lenderX_aws/frontend/src/components/MainLandingPage.tsx', convert(html, 'MainLandingPage'));

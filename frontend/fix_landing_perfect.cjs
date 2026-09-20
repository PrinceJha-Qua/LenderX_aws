const fs = require('fs');

const rawHtml = fs.readFileSync('/Users/sama/Desktop/dashboards_extracted/dash3/code.html', 'utf8');
const bodyMatch = rawHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
let body = bodyMatch ? bodyMatch[1] : rawHtml;

// Strip scripts
body = body.replace(/<script[\s\S]*?<\/script>/gi, '');

// Fix self-closing tags
body = body.replace(/<(img|input|br|hr|meta|link)([^>]*?)(?<!\/)>/gi, '<$1$2 />');

// React mappings
body = body.replace(/class=/g, 'className=')
           .replace(/for=/g, 'htmlFor=')
           .replace(/stroke-width/g, 'strokeWidth')
           .replace(/stroke-linecap/g, 'strokeLinecap')
           .replace(/stroke-linejoin/g, 'strokeLinejoin')
           .replace(/fill-rule/g, 'fillRule')
           .replace(/clip-rule/g, 'clipRule')
           .replace(/viewbox/g, 'viewBox')
           .replace(/xmlns:xlink/g, 'xmlnsXlink')
           .replace(/xlink:href/g, 'xlinkHref');

// Strip HTML comments (safe way)
body = body.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');

// Build React Component
const content = `import React from 'react';
import { Link } from 'react-router-dom';

export default function MainLandingPage() {
  return (
    <div className="w-full min-h-screen font-sans bg-slate-50">
      ${body}
    </div>
  );
}
`;

fs.writeFileSync('src/components/MainLandingPage.tsx', content);

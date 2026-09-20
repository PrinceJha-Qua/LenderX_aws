const fs = require('fs');
let b = fs.readFileSync('src/components/BorrowerDashboard.tsx', 'utf8');

// The main nav logic
b = b.replace(
  /<a className="([^"]*)" href="#home">([\s\S]*?)<\/a>/,
  '<button onClick={() => setActiveTab("Overview")} className="$1">$2</button>'
);
b = b.replace(
  /<a className="([^"]*)" href="#my-loans">([\s\S]*?)<\/a>/,
  '<button onClick={() => setActiveTab("Facilities")} className="$1">$2</button>'
);
b = b.replace(
  /<a className="([^"]*)" href="#documents">([\s\S]*?)<\/a>/,
  '<button onClick={() => setActiveTab("Documents")} className="$1">$2</button>'
);
b = b.replace(
  /<a className="([^"]*)" href="#community">([\s\S]*?)<\/a>/,
  '<button onClick={() => setActiveTab("Network")} className="$1">$2</button>'
);
b = b.replace(
  /<a className="([^"]*)" href="#support">([\s\S]*?)<\/a>/,
  '<button onClick={() => setActiveTab("Support")} className="$1">$2</button>'
);

// Other anchors
b = b.replace(
  /<a className="([^"]*)" href="#all-loans">([\s\S]*?)<\/a>/g,
  '<button onClick={() => setActiveTab("Facilities")} className="$1">$2</button>'
);
b = b.replace(
  /<a className="([^"]*)" href="#impact-reports">([\s\S]*?)<\/a>/g,
  '<button onClick={() => { alert("Loading Impact Report..."); }} className="$1">$2</button>'
);
b = b.replace(
  /<a className="([^"]*)" href="#resources">([\s\S]*?)<\/a>/g,
  '<button onClick={() => setActiveTab("Support")} className="$1">$2</button>'
);
b = b.replace(
  /<a className="([^"]*)" href="#templates">([\s\S]*?)<\/a>/g,
  '<button onClick={() => setActiveTab("Documents")} className="$1">$2</button>'
);
b = b.replace(
  /<a className="([^"]*)" href="#community">([\s\S]*?)<\/a>/g,
  '<button onClick={() => setActiveTab("Network")} className="$1">$2</button>'
);
b = b.replace(
  /<a className="([^"]*)" href="#contact-officer">([\s\S]*?)<\/a>/g,
  '<button onClick={() => setActiveTab("Support")} className="$1">$2</button>'
);

// Footer
b = b.replace(
  /<a className="([^"]*)" href="#privacy">([\s\S]*?)<\/a>/g,
  '<button onClick={() => { alert("Loading Privacy Policy..."); }} className="$1">$2</button>'
);
b = b.replace(
  /<a className="([^"]*)" href="#terms">([\s\S]*?)<\/a>/g,
  '<button onClick={() => { alert("Loading Terms..."); }} className="$1">$2</button>'
);
b = b.replace(
  /<a className="([^"]*)" href="#security">([\s\S]*?)<\/a>/g,
  '<button onClick={() => { alert("Loading Security..."); }} className="$1">$2</button>'
);

// Read story ->
b = b.replace(
  /<span className="font-bold text-slate-900 group-hover:text-emerald-700 group-hover:translate-x-1 transition-all flex items-center space-x-1">\s*Read story/g,
  '<button onClick={() => alert("Loading Case Study...")} className="font-bold text-slate-900 group-hover:text-emerald-700 group-hover:translate-x-1 transition-all flex items-center space-x-1">Read story</button>'
);

fs.writeFileSync('src/components/BorrowerDashboard.tsx', b);

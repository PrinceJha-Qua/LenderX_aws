const fs = require('fs');
const glob = require('glob'); // Assuming glob is installed, if not we just use readdir

const dir = 'src/components/';
const files = fs.readdirSync(dir).map(f => dir + f).filter(f => f.endsWith('.tsx'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/viewbox=/g, 'viewBox=');
  content = content.replace(/<lineargradient/g, '<linearGradient');
  content = content.replace(/<\/lineargradient>/g, '</linearGradient>');
  fs.writeFileSync(file, content);
});


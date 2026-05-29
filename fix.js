const fs = require('fs');
let content = fs.readFileSync('src/App.jsx', 'utf8');

// Fix style objects with invalid keys
content = content.replace(/style=\{\{([^}]+)\}\}/g, (match, inner) => {
  const fixedInner = inner.replace(/([a-zA-Z0-9-_]+)\s*:/g, (m, key) => {
    return `'${key}':`;
  });
  return `style={{${fixedInner}}}`;
});

fs.writeFileSync('src/App.jsx', content);

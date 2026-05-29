const fs = require('fs');

function runFix() {
  let content = fs.readFileSync('src/App.jsx.bak', 'utf8');

  // Fix style objects with invalid keys
  content = content.replace(/style=\{\{([^}]+)\}\}/g, (match, inner) => {
    // Only match keys that come after a comma or the start of the object
    const fixedInner = inner.replace(/(^|,)\s*([a-zA-Z0-9-_]+)\s*:/g, (m, prefix, key) => {
      return `${prefix} '${key}':`;
    });
    return `style={{${fixedInner}}}`;
  });

  fs.writeFileSync('src/App.jsx', content);
}

runFix();

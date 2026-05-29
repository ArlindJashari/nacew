const fs = require('fs');
let content = fs.readFileSync('src/App.jsx', 'utf8');

// Safely remove properties that are setting opacity to 0 or 0.001
content = content.replace(/'opacity'\s*:\s*0\.001\s*,?/g, '');
content = content.replace(/'opacity'\s*:\s*'0\.001'\s*,?/g, '');
content = content.replace(/'opacity'\s*:\s*0\s*,?/g, '');
content = content.replace(/'opacity'\s*:\s*'0'\s*,?/g, '');

content = content.replace(/opacity\s*:\s*0\.001\s*,?/g, '');
content = content.replace(/opacity\s*:\s*'0\.001'\s*,?/g, '');
content = content.replace(/opacity\s*:\s*0\s*,?/g, '');
content = content.replace(/opacity\s*:\s*'0'\s*,?/g, '');

// Also safely remove transform if it just contains translateY or scale
content = content.replace(/'transform'\s*:\s*'[^']*translateY[^']*'\s*,?/g, '');
content = content.replace(/transform\s*:\s*'[^']*translateY[^']*'\s*,?/g, '');
content = content.replace(/'transform'\s*:\s*'[^']*scale[^']*'\s*,?/g, '');
content = content.replace(/transform\s*:\s*'[^']*scale[^']*'\s*,?/g, '');

fs.writeFileSync('src/App.jsx', content);

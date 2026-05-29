const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

async function run() {
  try {
    console.log("Fetching fora.so...");
    const response = await axios.get('https://fora.so/');
    const html = response.data;
    
    console.log("Parsing HTML...");
    const $ = cheerio.load(html);
    
    // Extract CSS
    let cssContent = '';
    $('style').each((i, el) => {
      cssContent += $(el).html() + '\n';
    });
    
    fs.writeFileSync('src/index.css', cssContent);
    console.log("Saved src/index.css");
    
    // Extract Body
    $('script').remove();
    let bodyHtml = $('body').html();
    
    // We don't need to strip opacity:0 here anymore because our React parser handles it intelligently!
    // But we should remove `style="display:none"` from FAQ answers if any, or just let the React parser handle it.

    // Escape backticks and $ for template literal
    const escapedHtml = bodyHtml.replace(/`/g, '\\`').replace(/\$/g, '\\$');
    
    const componentCode = `
import React from 'react';
import { parseHTMLWithAnimations } from './components/FramerMotionHTMLParser';
import './index.css';

const htmlContent = \`
${escapedHtml}
\`;

export default function App() {
  return (
    <>
      {parseHTMLWithAnimations(htmlContent)}
    </>
  );
}
`;
    
    fs.writeFileSync('src/App.jsx', componentCode);
    console.log("Saved src/App.jsx");
    
  } catch (err) {
    console.error("Error during conversion:", err);
  }
}

run();

const axios = require('axios');
const cheerio = require('cheerio');
const HTMLtoJSX = require('htmltojsx');
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
    
    // Save CSS
    fs.writeFileSync('src/index.css', cssContent);
    console.log("Saved src/index.css");
    
    // Extract Body
    // We want to extract the main content. The body might contain scripts.
    // Framer usually puts everything in #main or body.
    let bodyHtml = '';
    
    // Remove scripts to avoid JSX issues
    $('script').remove();
    
    // We need to wrap the body content in a single div or fragment.
    // Using children of body
    bodyHtml = $('body').html();
    
    // Convert to JSX
    console.log("Converting to JSX...");
    const converter = new HTMLtoJSX({
      createClass: false,
      outputClassName: 'App'
    });
    
    let jsx = converter.convert(bodyHtml);
    
    // Output valid React component
    const componentCode = `
import React from 'react';
import './index.css';

export default function App() {
  return (
    <>
      ${jsx}
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

// Attribute / DOM-text helpers shared across the parser (extracted verbatim
// from the original FramerMotionHTMLParser.jsx — logic unchanged).
import { attributesToProps } from 'html-react-parser';

function cleanProps(attribs) {
  const props = attributesToProps(attribs || {});

  if (props.fetchpriority) {
    props.fetchPriority = props.fetchpriority;
    delete props.fetchpriority;
  }

  if (props.style) {
    const fixedStyle = {};
    Object.keys(props.style).forEach(key => {
      let cleanKey = key;
      if (key.startsWith('-') && !key.startsWith('--')) {
        if (key === '-9q2k08') {
          cleanKey = '--9q2k08';
        } else {
          const kebab = key.substring(1).replace(/([A-Z])/g, '-$1').toLowerCase();
          cleanKey = '--' + kebab;
        }
      }
      fixedStyle[cleanKey] = props.style[key];
    });
    props.style = fixedStyle;
  }
  return props;
}

function getNodeText(domNode) {
  if (!domNode) return '';
  if (domNode.type === 'text') return domNode.data || '';
  if (!domNode.children) return '';
  return domNode.children.map(getNodeText).join('');
}

export { cleanProps, getNodeText };

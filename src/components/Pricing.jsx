// Pricing - rendered as a standalone React component while preserving the
// Framer-exported subtree and existing parser replacements for child nodes.
import { domToReact } from 'html-react-parser';
import { cleanProps } from '../parser/props';

export default function Pricing({ domNode, replaceNode }) {
  const props = cleanProps(domNode.attribs);
  const options = {
    replace: (childNode) => replaceNode(childNode, false),
  };

  return (
    <section {...props}>
      {domNode.children && domNode.children.length > 0 ? domToReact(domNode.children, options) : null}
    </section>
  );
}

// Intro - rendered as a standalone React component while preserving the
// Framer-exported subtree, spotlight replacements, and falling text layer.
import { domToReact } from 'html-react-parser';
import { cleanProps } from '../parser/props';
import { FallingTextServices } from '../parser/nodeReplacers';

export default function Intro({ domNode, replaceNode }) {
  const props = cleanProps(domNode.attribs);
  props.style = props.style || {};
  props.style.position = 'relative';

  const options = {
    replace: (childNode) => replaceNode(childNode, false),
  };

  return (
    <section {...props}>
      {domNode.children && domNode.children.length > 0 ? domToReact(domNode.children, options) : null}
      <FallingTextServices />
    </section>
  );
}

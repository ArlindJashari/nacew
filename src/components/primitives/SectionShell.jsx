// SectionShell — minimal wrapper for a top-level page region. Keeps the
// Framer section/id/class contract (e.g. <section id="about" class="...">) so
// existing CSS and the in-page anchor links keep working when a section is
// rendered declaratively.

export default function SectionShell({ as: Tag = 'section', id, className, style, children, ...props }) {
  return (
    <Tag id={id} className={className} style={style} {...props}>
      {children}
    </Tag>
  );
}

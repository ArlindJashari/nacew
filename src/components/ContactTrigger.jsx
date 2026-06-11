import { openContactModal } from '../../shared/contact-modal.js';

export function openContact(event) {
  event?.preventDefault();
  openContactModal();
}

export default function ContactTrigger({
  as: Tag = 'button',
  children,
  className,
  style,
  type = 'button',
  ...props
}) {
  if (Tag === 'button') {
    return (
      <button type={type} className={className} style={style} onClick={openContact} {...props}>
        {children}
      </button>
    );
  }

  return (
    <Tag href="#" className={className} style={style} onClick={openContact} {...props}>
      {children}
    </Tag>
  );
}

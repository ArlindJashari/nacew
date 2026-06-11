export const CONTACT_MODAL_EVENT = 'nacew:open-contact';

export function openContactModal() {
  window.dispatchEvent(new CustomEvent(CONTACT_MODAL_EVENT));
}

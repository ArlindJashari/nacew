/**
 * Standalone contact modal for the frozen Netlify homepage.
 * Loaded dynamically — never bundled into index-C58hJQyr.js.
 */
const CONTACT_MODAL_EVENT = 'nacew:open-contact';

const BUILD_OPTIONS = ['Website', 'Mobile App', 'Branding', 'Corporate', 'Other'];
const BUDGET_OPTIONS = ['3-5k', '5-10k', '10k+', 'Other'];

let rootEl = null;
let formState = {
  name: '',
  email: '',
  build: '',
  budget: '',
  details: '',
};

function ensureStyles() {
  if (document.getElementById('nacew-contact-modal-css')) return;
  const link = document.createElement('link');
  link.id = 'nacew-contact-modal-css';
  link.rel = 'stylesheet';
  link.href = '/assets/nacew-contact-modal.css';
  document.head.appendChild(link);
}

function pillGroup(label, options, field) {
  const section = document.createElement('div');
  section.className = 'cm-section';

  const labelEl = document.createElement('p');
  labelEl.className = 'cm-label';
  labelEl.textContent = label;
  section.appendChild(labelEl);

  const pills = document.createElement('div');
  pills.className = 'cm-pills';
  pills.setAttribute('role', 'group');
  pills.setAttribute('aria-label', label);

  options.forEach((option) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `cm-pill${formState[field] === option ? ' is-selected' : ''}`;
    btn.textContent = option;
    btn.setAttribute('aria-pressed', String(formState[field] === option));
    btn.addEventListener('click', () => {
      formState[field] = option;
      renderPanel();
    });
    pills.appendChild(btn);
  });

  section.appendChild(pills);
  return section;
}

function closeModal() {
  if (!rootEl) return;
  rootEl.remove();
  rootEl = null;
  document.body.style.overflow = '';
  document.body.classList.remove('nacew-contact-open');
}

async function submitForm(event) {
  event.preventDefault();
  const submitBtn = rootEl?.querySelector('.cm-submit');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
  }

  try {
    const response = await fetch('https://formsubmit.co/ajax/contact@nacew.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name: formState.name,
        email: formState.email,
        build: formState.build,
        budget: formState.budget,
        message: formState.details,
        _subject: `Project inquiry from ${formState.name || formState.email}`,
        _template: 'table',
      }),
    });
    if (!response.ok) throw new Error('submit failed');
    renderSuccess();
  } catch {
    const subject = encodeURIComponent(`Project inquiry from ${formState.name || 'Nacew visitor'}`);
    const body = encodeURIComponent(
      [
        `Name: ${formState.name}`,
        `Email: ${formState.email}`,
        `What we build: ${formState.build || 'Not specified'}`,
        `Budget: ${formState.budget || 'Not specified'}`,
        '',
        formState.details,
      ].join('\n'),
    );
    window.location.href = `mailto:contact@nacew.com?subject=${subject}&body=${body}`;
    closeModal();
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit';
    }
  }
}

function renderSuccess() {
  const scroll = rootEl?.querySelector('.cm-scroll');
  const footer = rootEl?.querySelector('.cm-footer');
  if (!scroll || !footer) return;
  scroll.innerHTML = `
    <div class="cm-success">
      <h2 class="cm-success-title">Thanks for reaching out.</h2>
      <p class="cm-success-copy">We'll send you an email with next steps shortly so you can move forward without delay.</p>
    </div>`;
  footer.innerHTML = '';
}

function renderPanel() {
  if (!rootEl) return;
  const scroll = rootEl.querySelector('.cm-scroll');
  const footer = rootEl.querySelector('.cm-footer');
  if (!scroll || !footer) return;

  scroll.innerHTML = '';
  footer.innerHTML = '';

  const form = document.createElement('form');
  form.className = 'cm-form';
  form.id = 'nacew-contact-form';
  form.addEventListener('submit', submitForm);

  const personal = document.createElement('div');
  personal.className = 'cm-section';
  personal.innerHTML = '<p class="cm-label">Personal info</p>';
  const row = document.createElement('div');
  row.className = 'cm-row';

  const nameInput = document.createElement('input');
  nameInput.className = 'cm-input';
  nameInput.type = 'text';
  nameInput.name = 'name';
  nameInput.placeholder = 'Your name';
  nameInput.required = true;
  nameInput.autocomplete = 'name';
  nameInput.value = formState.name;
  nameInput.addEventListener('input', (e) => {
    formState.name = e.target.value;
  });

  const emailInput = document.createElement('input');
  emailInput.className = 'cm-input';
  emailInput.type = 'email';
  emailInput.name = 'email';
  emailInput.placeholder = 'Email';
  emailInput.required = true;
  emailInput.autocomplete = 'email';
  emailInput.value = formState.email;
  emailInput.addEventListener('input', (e) => {
    formState.email = e.target.value;
  });

  row.append(nameInput, emailInput);
  personal.appendChild(row);
  form.appendChild(personal);
  form.appendChild(pillGroup('What we build?', BUILD_OPTIONS, 'build'));
  form.appendChild(pillGroup('Project budget range', BUDGET_OPTIONS, 'budget'));

  const detailsSection = document.createElement('div');
  detailsSection.className = 'cm-section';
  detailsSection.innerHTML = '<p class="cm-label">Project details</p>';
  const textarea = document.createElement('textarea');
  textarea.className = 'cm-textarea';
  textarea.name = 'details';
  textarea.placeholder =
    'Feel free to share your goals, expectations, concerns and any you have. The more you give us on the challenge, the better we can understand how to assist you.';
  textarea.value = formState.details;
  textarea.addEventListener('input', (e) => {
    formState.details = e.target.value;
  });
  detailsSection.appendChild(textarea);
  form.appendChild(detailsSection);

  scroll.appendChild(form);

  footer.innerHTML = `
    <button type="submit" form="nacew-contact-form" class="cm-submit">Submit</button>`;
}

function openModal() {
  if (rootEl) return;
  ensureStyles();
  document.body.style.overflow = 'hidden';
  document.body.classList.add('nacew-contact-open');

  rootEl = document.createElement('div');
  rootEl.className = 'cm-root';
  rootEl.setAttribute('role', 'dialog');
  rootEl.setAttribute('aria-modal', 'true');
  rootEl.setAttribute('aria-label', 'Contact Nacew');
  rootEl.innerHTML = `
    <div class="cm-backdrop" aria-hidden></div>
    <div class="cm-panel">
      <div class="cm-header">
        <button type="button" class="cm-close" aria-label="Close">
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
          </svg>
        </button>
      </div>
      <div class="cm-scroll"></div>
      <div class="cm-footer"></div>
    </div>`;

  rootEl.querySelector('.cm-close')?.addEventListener('click', (event) => {
    event.stopPropagation();
    closeModal();
  });

  rootEl.addEventListener('click', (event) => {
    if (event.target === rootEl || event.target.classList.contains('cm-backdrop')) closeModal();
  });

  document.addEventListener(
    'keydown',
    function onKey(event) {
      if (event.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', onKey);
      }
    },
    { once: false },
  );

  document.body.appendChild(rootEl);
  renderPanel();
}

function initContactModal() {
  if (window.__NACEW_CONTACT_MODAL_INIT__) return;
  window.__NACEW_CONTACT_MODAL_INIT__ = true;
  window.addEventListener(CONTACT_MODAL_EVENT, openModal);
}

export function openContactModalView() {
  openModal();
}

initContactModal();

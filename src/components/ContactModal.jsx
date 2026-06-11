import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CONTACT_MODAL_EVENT } from '../../shared/contact-modal.js';
import '../../shared/contact-modal.css';

const BUILD_OPTIONS = ['Website', 'Mobile App', 'Branding', 'Corporate', 'Other'];
const BUDGET_OPTIONS = ['3-5k', '5-10k', '10k+', 'Other'];

const initialForm = { name: '', email: '', build: '', budget: '', details: '' };

const CloseIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden>
    <path
      d="M4 4L12 12M12 4L4 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const ContactModalContext = createContext(null);

function PillGroup({ label, options, value, onChange }) {
  return (
    <div className="cm-section">
      <p className="cm-label">{label}</p>
      <div className="cm-pills" role="group" aria-label={label}>
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className={`cm-pill${value === option ? ' is-selected' : ''}`}
            aria-pressed={value === option}
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

function ContactModal({ onClose }) {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.body.classList.add('nacew-contact-open');
    return () => {
      document.body.style.overflow = prev;
      document.body.classList.remove('nacew-contact-open');
    };
  }, []);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    try {
      const response = await fetch('https://formsubmit.co/ajax/contact@nacew.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          build: form.build,
          budget: form.budget,
          message: form.details,
          _subject: `Project inquiry from ${form.name || form.email}`,
          _template: 'table',
        }),
      });
      if (!response.ok) throw new Error('Submit failed');
      setSubmitted(true);
      setForm(initialForm);
    } catch {
      const subject = encodeURIComponent(`Project inquiry from ${form.name || 'Nacew visitor'}`);
      const body = encodeURIComponent(
        [
          `Name: ${form.name}`,
          `Email: ${form.email}`,
          `What we build: ${form.build || 'Not specified'}`,
          `Budget: ${form.budget || 'Not specified'}`,
          '',
          form.details,
        ].join('\n'),
      );
      window.location.href = `mailto:contact@nacew.com?subject=${subject}&body=${body}`;
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return createPortal(
    <div
      className="cm-root"
      role="dialog"
      aria-modal="true"
      aria-label="Contact Nacew"
      onClick={onClose}
    >
      <div className="cm-backdrop" aria-hidden onClick={onClose} />
      <motion.div
        className="cm-panel"
        initial={{ x: 40 }}
        animate={{ x: 0 }}
        exit={{ x: 24 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="cm-header">
          <button type="button" className="cm-close" aria-label="Close" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <div className="cm-scroll">
          {submitted ? (
            <div className="cm-success">
              <h2 className="cm-success-title">Thanks for reaching out.</h2>
              <p className="cm-success-copy">
                We&apos;ll send you an email with next steps shortly so you can move forward without delay.
              </p>
            </div>
          ) : (
            <form className="cm-form" id="nacew-contact-form" onSubmit={handleSubmit}>
              <div className="cm-section">
                <p className="cm-label">Personal info</p>
                <div className="cm-row">
                  <input
                    className="cm-input"
                    type="text"
                    name="name"
                    placeholder="Your name"
                    autoComplete="name"
                    required
                    value={form.name}
                    onChange={updateField('name')}
                  />
                  <input
                    className="cm-input"
                    type="email"
                    name="email"
                    placeholder="Email"
                    autoComplete="email"
                    required
                    value={form.email}
                    onChange={updateField('email')}
                  />
                </div>
              </div>
              <PillGroup
                label="What we build?"
                options={BUILD_OPTIONS}
                value={form.build}
                onChange={(build) => setForm((current) => ({ ...current, build }))}
              />
              <PillGroup
                label="Project budget range"
                options={BUDGET_OPTIONS}
                value={form.budget}
                onChange={(budget) => setForm((current) => ({ ...current, budget }))}
              />
              <div className="cm-section">
                <p className="cm-label">Project details</p>
                <textarea
                  className="cm-textarea"
                  name="details"
                  placeholder="Feel free to share your goals, expectations, concerns and any you have. The more you give us on the challenge, the better we can understand how to assist you."
                  value={form.details}
                  onChange={updateField('details')}
                />
              </div>
            </form>
          )}
        </div>
        {!submitted ? (
          <div className="cm-footer">
            <button type="submit" form="nacew-contact-form" className="cm-submit" disabled={submitting}>
              {submitting ? 'Sending…' : 'Submit'}
            </button>
          </div>
        ) : null}
      </motion.div>
    </div>,
    document.body,
  );
}

export function ContactModalProvider({ children }) {
  const [open, setOpen] = useState(false);
  const openContactModal = useCallback(() => setOpen(true), []);
  const closeContactModal = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onRequest = () => openContactModal();
    window.addEventListener(CONTACT_MODAL_EVENT, onRequest);
    return () => window.removeEventListener(CONTACT_MODAL_EVENT, onRequest);
  }, [openContactModal]);

  const value = useMemo(
    () => ({ openContactModal, closeContactModal, isOpen: open }),
    [openContactModal, closeContactModal, open],
  );

  return (
    <ContactModalContext.Provider value={value}>
      {children}
      <AnimatePresence>{open ? <ContactModal onClose={closeContactModal} /> : null}</AnimatePresence>
    </ContactModalContext.Provider>
  );
}

export function useContactModal() {
  const ctx = useContext(ContactModalContext);
  if (!ctx) throw new Error('useContactModal must be used within ContactModalProvider');
  return ctx;
}

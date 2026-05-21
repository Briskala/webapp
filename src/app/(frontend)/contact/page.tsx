'use client';

import React, { useState } from 'react';
import { submitContactRequest } from '../actions/submitForms';

const testimonials = [
  {
    stars: 5,
    text: 'Briskala heeft ons geholpen bij het vinden van het perfecte bedrijfspand. Professioneel, snel en betrouwbaar — wij zijn zeer tevreden met de samenwerking.',
    name: 'Marc de Vries',
    role: 'CEO, Innovate Solutions BV',
  },
  {
    stars: 5,
    text: 'De autofinanciering via Briskala was soepel en transparant. Binnen een week reden wij in onze nieuwe bedrijfsauto. Aanrader voor elk bedrijf.',
    name: 'Samira El Amrani',
    role: 'Directeur, Urban Mobility Group',
  },
  {
    stars: 5,
    text: 'Uitstekende service en een team dat écht luistert. Briskala heeft onze woningbouwvraag perfect begeleid van A tot Z. Top samenwerking!',
    name: 'Kevin Janssen',
    role: 'Projectontwikkelaar, KB Bouw',
  },
];

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [privacy, setPrivacy] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    const formData = new FormData(e.currentTarget);
    // Combine first + last name for the backend field
    formData.set('name', `${firstName} ${lastName}`);
    const result = await submitContactRequest(formData);
    if (result.success) {
      setStatus('success');
      setFirstName(''); setLastName(''); setEmail('');
      setPhone(''); setSubject(''); setMessage(''); setPrivacy(false);
    } else {
      setStatus('error');
    }
  };

  const prev = () => setActiveTestimonial((a) => (a === 0 ? testimonials.length - 1 : a - 1));
  const next = () => setActiveTestimonial((a) => (a === testimonials.length - 1 ? 0 : a + 1));

  return (
    <>
      <style>{`
        /* ── Contact Page UI 1.1 ── */
        .contact-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: calc(100vh - 120px);
        }

        /* ── LEFT PANEL ── */
        .contact-form-panel {
          background: #fff;
          padding: 64px 56px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .contact-form-inner {
          width: 100%;
          max-width: 480px;
        }

        .contact-brand {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 40px;
        }
        .contact-brand-icon {
          width: 28px; height: 28px;
          background: #1a5276;
          border-radius: 6px;
          display: flex; align-items: center; justify-content: center;
        }
        .contact-brand-icon svg { color: #fff; }
        .contact-brand-name {
          font-size: 15px; font-weight: 700; color: #1a5276;
          letter-spacing: -0.2px;
        }

        .contact-heading {
          font-size: 34px !important;
          font-weight: 700 !important;
          color: #111 !important;
          line-height: 1.15 !important;
          margin: 0 0 10px !important;
          font-family: 'Open Sans', sans-serif;
        }
        .contact-sub {
          font-size: 14px !important;
          color: #666 !important;
          margin: 0 0 32px !important;
          line-height: 1.6 !important;
        }

        /* Alert banners */
        .contact-alert-success {
          background: #ecfdf5; color: #065f46;
          border: 1px solid #6ee7b7;
          border-radius: 8px; padding: 14px 16px;
          font-size: 14px; font-weight: 500;
          margin-bottom: 24px;
          display: flex; align-items: center; gap: 10px;
        }
        .contact-alert-error {
          background: #fff1f2; color: #9f1239;
          border: 1px solid #fda4af;
          border-radius: 8px; padding: 14px 16px;
          font-size: 14px; font-weight: 500;
          margin-bottom: 24px;
          display: flex; align-items: center; gap: 10px;
        }

        /* Form layout */
        .contact-form { display: flex; flex-direction: column; gap: 18px; }
        .contact-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .contact-field { display: flex; flex-direction: column; gap: 6px; }
        .contact-label {
          font-size: 13px !important; font-weight: 600 !important;
          color: #333 !important;
        }
        .contact-input, .contact-textarea, .contact-select {
          padding: 11px 14px;
          border: 1.5px solid #d1d5db;
          border-radius: 8px;
          font-size: 14px;
          color: #333;
          background: #fff;
          transition: border-color 0.2s, box-shadow 0.2s;
          font-family: 'Open Sans', sans-serif;
          outline: none;
          width: 100%;
          box-sizing: border-box;
        }
        .contact-input:focus, .contact-textarea:focus, .contact-select:focus {
          border-color: #1a5276;
          box-shadow: 0 0 0 3px rgba(26,82,118,0.1);
        }
        .contact-input::placeholder, .contact-textarea::placeholder { color: #aaa; }
        .contact-textarea { resize: vertical; min-height: 110px; }

        /* Privacy row */
        .contact-privacy {
          display: flex; align-items: flex-start; gap: 10px;
          font-size: 13px; color: #555;
        }
        .contact-privacy input[type="checkbox"] {
          width: 16px; height: 16px; margin-top: 2px;
          accent-color: #1a5276; flex-shrink: 0; cursor: pointer;
        }
        .contact-privacy a { color: #1a5276; text-decoration: underline; }

        /* Submit button */
        .contact-submit {
          background: #1a5276;
          color: #fff;
          border: none;
          padding: 14px 24px;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          font-family: 'Open Sans', sans-serif;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .contact-submit:hover:not(:disabled) {
          background: #154360;
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(26,82,118,0.25);
        }
        .contact-submit:disabled { opacity: 0.65; cursor: not-allowed; }

        /* ── RIGHT PANEL ── */
        .contact-visual-panel {
          background: #0d1b2a;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 56px 52px;
        }

        /* Abstract animated background */
        .contact-bg-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }
        .contact-bg-orb-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(26,82,118,0.7) 0%, rgba(36,113,163,0.3) 60%, transparent 100%);
          top: -120px; right: -120px;
        }
        .contact-bg-orb-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(108,40,140,0.5) 0%, rgba(36,113,163,0.2) 60%, transparent 100%);
          bottom: 60px; left: -100px;
        }
        .contact-bg-orb-3 {
          width: 280px; height: 280px;
          background: radial-gradient(circle, rgba(255,204,0,0.15) 0%, transparent 70%);
          top: 50%; left: 40%;
          transform: translate(-50%, -50%);
        }

        /* Grid overlay */
        .contact-grid-overlay {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 52px 52px;
          pointer-events: none;
        }

        /* Info cards on top */
        .contact-info-cards {
          position: absolute;
          top: 48px; left: 52px; right: 52px;
          display: flex; flex-direction: column; gap: 16px;
        }
        .contact-info-card {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 12px;
          padding: 16px 20px;
          display: flex; align-items: center; gap: 14px;
        }
        .contact-info-icon {
          width: 40px; height: 40px;
          background: rgba(36,113,163,0.35);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px; flex-shrink: 0;
        }
        .contact-info-text strong {
          display: block; font-size: 13px; color: #fff; font-weight: 700;
        }
        .contact-info-text span {
          font-size: 12px; color: #8da8c0;
        }

        /* Testimonial block */
        .contact-testimonial { position: relative; z-index: 2; }
        .contact-stars { display: flex; gap: 3px; margin-bottom: 16px; }
        .contact-star { color: #f59e0b; font-size: 20px; }
        .contact-testimonial-text {
          font-size: 16px !important;
          color: #e2ecf5 !important;
          line-height: 1.65 !important;
          margin: 0 0 20px !important;
          font-style: italic;
        }
        .contact-testimonial-author strong {
          display: block; font-size: 14px; color: #fff; font-weight: 700;
        }
        .contact-testimonial-author span {
          font-size: 12px; color: #8da8c0;
        }

        /* Nav arrows */
        .contact-testimonial-nav {
          display: flex; gap: 12px; margin-top: 24px;
        }
        .contact-nav-btn {
          width: 44px; height: 44px;
          border: 1.5px solid rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.07);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #fff; font-size: 18px;
          transition: background 0.2s, border-color 0.2s;
        }
        .contact-nav-btn:hover {
          background: rgba(255,255,255,0.15);
          border-color: rgba(255,255,255,0.4);
        }

        /* Dot indicators */
        .contact-dots {
          display: flex; gap: 6px; align-items: center; margin-top: 16px;
        }
        .contact-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: rgba(255,255,255,0.25);
          transition: background 0.2s, transform 0.2s;
        }
        .contact-dot.active {
          background: #ffcc00;
          transform: scale(1.4);
        }

        /* Loading spinner */
        .contact-spinner {
          display: inline-block;
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.4);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .contact-split { grid-template-columns: 1fr; }
          .contact-visual-panel {
            min-height: 340px;
            padding: 40px 28px 36px;
          }
          .contact-info-cards { display: none; }
          .contact-form-panel { padding: 40px 24px; }
          .contact-form-inner { max-width: 100%; }
          .contact-row { grid-template-columns: 1fr; gap: 18px; }
          .contact-heading { font-size: 28px !important; }
        }
        @media (max-width: 480px) {
          .contact-form-panel { padding: 28px 16px; }
          .contact-visual-panel { padding: 32px 20px 28px; }
          .contact-testimonial-text { font-size: 14px !important; }
        }
      `}</style>

      <div className="contact-split">

        {/* ── LEFT: Form Panel ── */}
        <div className="contact-form-panel">
          <div className="contact-form-inner">
          <h1 className="contact-heading">Neem contact op</h1>
          <p className="contact-sub">
            Wij staan voor u klaar. Vul het formulier in en wij reageren binnen 24 uur op uw bericht.
          </p>

          {/* Status alerts */}
          {status === 'success' && (
            <div className="contact-alert-success">
              <span style={{ fontSize: '18px' }}>✓</span>
              Bedankt! Uw bericht is verzonden. Wij nemen spoedig contact met u op.
            </div>
          )}
          {status === 'error' && (
            <div className="contact-alert-error">
              <span style={{ fontSize: '18px' }}>✕</span>
              Er is een fout opgetreden. Probeer het later opnieuw.
            </div>
          )}

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            {/* Row: first + last name */}
            <div className="contact-row">
              <div className="contact-field">
                <label className="contact-label" htmlFor="contact-first-name">Voornaam</label>
                <input
                  id="contact-first-name"
                  className="contact-input"
                  type="text"
                  name="firstName"
                  placeholder="Voornaam"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="contact-field">
                <label className="contact-label" htmlFor="contact-last-name">Achternaam</label>
                <input
                  id="contact-last-name"
                  className="contact-input"
                  type="text"
                  name="lastName"
                  placeholder="Achternaam"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="contact-field">
              <label className="contact-label" htmlFor="contact-email">E-mailadres</label>
              <input
                id="contact-email"
                className="contact-input"
                type="email"
                name="email"
                placeholder="u@bedrijf.nl"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Phone */}
            <div className="contact-field">
              <label className="contact-label" htmlFor="contact-phone">Telefoonnummer</label>
              <input
                id="contact-phone"
                className="contact-input"
                type="tel"
                name="phone"
                placeholder="+31 (0) 6 00 00 00 00"
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
            </div>

            {/* Subject */}
            <div className="contact-field">
              <label className="contact-label" htmlFor="contact-subject">Onderwerp</label>
              <select
                id="contact-subject"
                className="contact-input contact-select"
                name="subject"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                required
              >
                <option value="" disabled>Kies een onderwerp</option>
                <option value="vastgoed">Vastgoed advies</option>
                <option value="autofinanciering">Autofinanciering</option>
                <option value="woningbouw">Woningbouw bemiddeling</option>
                <option value="olietanken">Olietanken</option>
                <option value="algemeen">Algemene vraag</option>
                <option value="overig">Overig</option>
              </select>
            </div>

            {/* Message */}
            <div className="contact-field">
              <label className="contact-label" htmlFor="contact-message">Bericht</label>
              <textarea
                id="contact-message"
                className="contact-input contact-textarea"
                name="message"
                placeholder="Schrijf hier uw bericht..."
                value={message}
                onChange={e => setMessage(e.target.value)}
                required
              />
            </div>

            {/* Privacy */}
            <label className="contact-privacy">
              <input
                type="checkbox"
                checked={privacy}
                onChange={e => setPrivacy(e.target.checked)}
                required
              />
              <span>
                U gaat akkoord met ons{' '}
                <a href="/privacy" target="_blank" rel="noopener noreferrer">privacybeleid</a>
                {' '}en de verwerking van uw gegevens.
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              className="contact-submit"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? (
                <><span className="contact-spinner" /> Verzenden...</>
              ) : (
                <>
                  Verstuur bericht
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
                  </svg>
                </>
              )}
            </button>
          </form>
          </div>
        </div>

        {/* ── RIGHT: Visual Panel ── */}
        <div className="contact-visual-panel">
          {/* Background orbs */}
          <div className="contact-bg-orb contact-bg-orb-1" />
          <div className="contact-bg-orb contact-bg-orb-2" />
          <div className="contact-bg-orb contact-bg-orb-3" />
          <div className="contact-grid-overlay" />

          {/* Info cards */}
          <div className="contact-info-cards">
            <div className="contact-info-card">
              <div className="contact-info-icon">📍</div>
              <div className="contact-info-text">
                <strong>Vestiging</strong>
                <span>Amsterdam · Rotterdam · Utrecht</span>
              </div>
            </div>
            <div className="contact-info-card">
              <div className="contact-info-icon">📞</div>
              <div className="contact-info-text">
                <strong>Telefoon</strong>
                <span>+31 (0)20 000 00 00</span>
              </div>
            </div>
            <div className="contact-info-card">
              <div className="contact-info-icon">⏱️</div>
              <div className="contact-info-text">
                <strong>Reactietijd</strong>
                <span>Wij reageren binnen 24 uur</span>
              </div>
            </div>
          </div>

          {/* Testimonial carousel */}
          <div className="contact-testimonial">
            {/* Stars */}
            <div className="contact-stars">
              {Array.from({ length: testimonials[activeTestimonial].stars }).map((_, i) => (
                <span key={i} className="contact-star">★</span>
              ))}
            </div>

            {/* Quote */}
            <p className="contact-testimonial-text">
              &ldquo;{testimonials[activeTestimonial].text}&rdquo;
            </p>

            {/* Author */}
            <div className="contact-testimonial-author">
              <strong>— {testimonials[activeTestimonial].name}</strong>
              <span>{testimonials[activeTestimonial].role}</span>
            </div>

            {/* Nav */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '24px' }}>
              <div className="contact-dots">
                {testimonials.map((_, i) => (
                  <div
                    key={i}
                    className={`contact-dot ${i === activeTestimonial ? 'active' : ''}`}
                    onClick={() => setActiveTestimonial(i)}
                    style={{ cursor: 'pointer' }}
                  />
                ))}
              </div>
              <div className="contact-testimonial-nav">
                <button className="contact-nav-btn" onClick={prev} aria-label="Vorige">←</button>
                <button className="contact-nav-btn" onClick={next} aria-label="Volgende">→</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

'use client';

import React, { useState, useRef } from 'react';
import {
  Wrench, Mail, Phone, MapPin, Clock, BookOpen,
  CheckCircle, XCircle, Send, ChevronDown, ArrowRight,
  Star
} from 'lucide-react';
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

const NAV_ITEMS = [
  { id: 'intro', label: 'Introductie', Icon: BookOpen },
  { id: 'contact-form', label: 'Contact Opnemen', Icon: Mail },
  { id: 'verwachting', label: 'Wat kunt u verwachten?', Icon: Clock },
  { id: 'kantoor', label: 'Kantoorgegevens', Icon: MapPin },
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
  const [activeSection, setActiveSection] = useState('intro');

  const formRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!privacy) {
      alert('U dient akkoord te gaan met de privacyverklaring.');
      return;
    }
    setStatus('loading');
    const formData = new FormData(e.currentTarget);
    formData.set('name', `${firstName} ${lastName}`);
    const result = await submitContactRequest(formData);
    if (result.success) {
      setStatus('success');
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
      setPrivacy(false);
    } else {
      setStatus('error');
    }
  };

  const scrollTo = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const prevTestimonial = () => {
    setActiveTestimonial(prev => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setActiveTestimonial(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="pm-page">
      <style>{`
        /* ── Probleem Melden & Contact Unified Layout ── */
        .pm-page { background: #f7f9fb; min-height: 100vh; padding-bottom: 80px; }

        /* ── Banner ── */
        .pm-banner {
          position: relative;
          overflow: hidden;
          padding: 72px 24px 52px;
          text-align: center;
          color: #fff;
        }
        .pm-banner-bg {
          position: absolute;
          inset: 0;
          background: url('/assets/img/briskala_handshake.jpg') center/cover no-repeat;
          filter: brightness(0.28) saturate(0.8);
        }
        .pm-banner-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(13,27,42,0.82) 0%,
            rgba(26,82,118,0.70) 60%,
            rgba(36,113,163,0.55) 100%
          );
        }
        .pm-banner-content { position: relative; z-index: 2; }
        .pm-banner-tag {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.22);
          border-radius: 20px;
          padding: 5px 16px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #add8f7;
          margin-bottom: 18px;
        }
        .pm-banner h1 {
          font-size: 38px !important;
          font-weight: 800 !important;
          color: #fff !important;
          margin: 0 0 14px !important;
          line-height: 1.15 !important;
          font-family: 'Open Sans', sans-serif;
        }
        .pm-banner p {
          font-size: 15px !important;
          color: rgba(255,255,255,0.75) !important;
          max-width: 560px;
          margin: 0 auto !important;
          line-height: 1.65 !important;
        }

        /* ── Layout ── */
        .pm-layout {
          max-width: 920px;
          margin: 0 auto;
          padding: 0 20px;
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 32px;
          margin-top: -28px;
          position: relative;
          z-index: 2;
        }

        /* ── Sticky sidebar ── */
        .pm-sidebar { position: sticky; top: 80px; height: fit-content; }
        .pm-nav-card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0,0,0,0.07);
        }
        .pm-nav-title {
          padding: 12px 16px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.9px;
          text-transform: uppercase;
          color: #94a3b8;
          border-bottom: 1px solid #f1f5f9;
          background: #f8fafc;
        }
        .pm-nav-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          font-size: 13px;
          font-weight: 500;
          color: #555;
          cursor: pointer;
          border-bottom: 1px solid #f5f7fa;
          transition: background 0.15s, color 0.15s, border-left 0.15s;
          user-select: none;
          border-left: 3px solid transparent;
        }
        .pm-nav-item:last-child { border-bottom: none; }
        .pm-nav-item:hover { background: #f0f7fc; color: #1a5276; }
        .pm-nav-item.active {
          background: #eaf4fb;
          color: #1a5276;
          font-weight: 700;
          border-left-color: #1a5276;
        }
        .pm-nav-icon { flex-shrink: 0; opacity: 0.55; }
        .pm-nav-item.active .pm-nav-icon { opacity: 1; }

        /* ── Content ── */
        .pm-content { padding-top: 8px; }
        .pm-section {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 32px 36px;
          margin-bottom: 24px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
          scroll-margin-top: 90px;
        }
        .pm-section-header {
          display: flex; align-items: center; gap: 14px;
          margin-bottom: 20px; padding-bottom: 16px;
          border-bottom: 2px solid #f1f5f9;
        }
        .pm-section-icon {
          width: 44px; height: 44px; border-radius: 11px;
          background: #eaf4fb;
          display: flex; align-items: center; justify-content: center;
          color: #1a5276; flex-shrink: 0;
        }
        .pm-section-header h2 {
          font-size: 20px !important; font-weight: 700 !important;
          color: #1a3a5c !important; margin: 0 !important;
        }
        .pm-section-tag {
          font-size: 10px; font-weight: 600; letter-spacing: 0.6px;
          text-transform: uppercase; color: #94a3b8; display: block; margin-bottom: 2px;
        }

        .pm-text {
          font-size: 14px !important; color: #475569 !important;
          line-height: 1.75 !important; margin: 0 0 14px !important;
        }
        .pm-text:last-child { margin-bottom: 0 !important; }

        .pm-info-box {
          background: #f0f9ff; border: 1px solid #bae6fd;
          border-left: 4px solid #0ea5e9; border-radius: 8px;
          padding: 14px 18px; font-size: 13px; color: #0c4a6e;
          margin: 16px 0; display: flex; gap: 10px; align-items: flex-start;
        }
        .pm-info-icon { flex-shrink: 0; margin-top: 1px; color: #0ea5e9; }

        /* Form styling */
        .pm-form { display: flex; flex-direction: column; gap: 18px; }
        .pm-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .pm-field { display: flex; flex-direction: column; gap: 6px; }
        .pm-label {
          font-size: 13px !important; font-weight: 700 !important; color: #1a3a5c !important;
        }
        .pm-input, .pm-textarea, .pm-select {
          padding: 11px 14px; border: 1.5px solid #d1d5db; border-radius: 8px;
          font-size: 14px; color: #333; background: #fafafa;
          font-family: 'Open Sans', sans-serif; outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          width: 100%; box-sizing: border-box;
        }
        .pm-input:focus, .pm-textarea:focus, .pm-select:focus {
          border-color: #1a5276; background: #fff;
          box-shadow: 0 0 0 3px rgba(26,82,118,0.1);
        }
        .pm-input::placeholder, .pm-textarea::placeholder { color: #bbb; }
        .pm-textarea { resize: vertical; min-height: 130px; }

        .pm-select-inner { position: relative; }
        .pm-select-chevron {
          position: absolute; right: 14px; top: 50%;
          transform: translateY(-50%); pointer-events: none; color: #1a5276;
        }

        .pm-checkbox-wrap {
          display: flex; align-items: flex-start; gap: 10px;
          font-size: 13px; color: #475569; margin-top: 4px;
        }
        .pm-checkbox {
          width: 16px; height: 16px; margin-top: 2px;
          accent-color: #1a5276; flex-shrink: 0; cursor: pointer;
        }
        .pm-checkbox-wrap a { color: #1a5276; text-decoration: underline; font-weight: 600; }

        /* Alerts */
        .pm-alert-success {
          background: #ecfdf5; border: 1px solid #6ee7b7; border-left: 4px solid #10b981;
          border-radius: 8px; padding: 16px 20px; font-size: 14px; font-weight: 600;
          color: #065f46; display: flex; gap: 12px; align-items: center; margin-bottom: 20px;
        }
        .pm-alert-error {
          background: #fff1f2; border: 1px solid #fca5a5; border-left: 4px solid #ef4444;
          border-radius: 8px; padding: 16px 20px; font-size: 14px; font-weight: 600;
          color: #991b1b; display: flex; gap: 12px; align-items: center; margin-bottom: 20px;
        }

        /* Submit */
        .pm-submit {
          background: #1a5276; color: #fff; border: none; padding: 14px 28px;
          border-radius: 8px; font-size: 15px; font-weight: 700; cursor: pointer;
          font-family: 'Open Sans', sans-serif;
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s; width: 100%;
        }
        .pm-submit:hover:not(:disabled) {
          background: #154360; transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(26,82,118,0.25);
        }
        .pm-submit:disabled { opacity: 0.65; cursor: not-allowed; }
        .pm-spinner {
          display: inline-block; width: 15px; height: 15px;
          border: 2px solid rgba(255,255,255,0.4);
          border-top-color: #fff; border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Steps */
        .pm-steps { list-style: none; padding: 0; margin: 16px 0 0; display: flex; flex-direction: column; gap: 12px; }
        .pm-step {
          display: flex; gap: 14px; align-items: flex-start;
          padding: 14px 16px; background: #f8fafc; border-radius: 10px;
          border: 1px solid #e9eef4;
        }
        .pm-step-num {
          width: 30px; height: 30px; border-radius: 50%;
          background: #1a5276; color: #fff;
          font-size: 13px; font-weight: 700;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .pm-step-body strong { display: block; font-size: 13px; font-weight: 700; color: #1a3a5c; }
        .pm-step-body span { font-size: 12px; color: #64748b; }

        /* Office info grid */
        .pm-alt-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 16px;
        }
        .pm-alt-card {
          background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px;
          padding: 18px 20px; text-decoration: none;
          transition: box-shadow 0.2s, transform 0.15s, border-color 0.2s;
          display: flex; flex-direction: column; gap: 8px;
        }
        .pm-alt-card:hover {
          box-shadow: 0 4px 14px rgba(0,0,0,0.08);
          transform: translateY(-2px); border-color: #7fb3d3;
        }
        .pm-alt-card-icon {
          width: 38px; height: 38px; border-radius: 9px;
          background: #eaf4fb; display: flex; align-items: center; justify-content: center;
          color: #1a5276;
        }
        .pm-alt-card strong { font-size: 13px; font-weight: 700; color: #1a3a5c; }
        .pm-alt-card span { font-size: 12px; color: #64748b; }
        .pm-alt-card-arrow { margin-top: 4px; color: #94a3b8; }

        /* Testimonials slider inside Section 1 */
        .contact-ts-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 24px;
          margin-top: 24px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.02);
          position: relative;
        }
        .contact-ts-stars { display: flex; gap: 4px; margin-bottom: 12px; }
        .contact-ts-star { color: #f59e0b; font-size: 16px; }
        .contact-ts-text {
          font-size: 14px !important;
          color: #475569 !important;
          line-height: 1.6 !important;
          margin: 0 0 16px 0 !important;
          font-style: italic;
        }
        .contact-ts-author strong {
          display: block; font-size: 13px; color: #1a3a5c; font-weight: 700;
        }
        .contact-ts-author span {
          font-size: 11px; color: #64748b;
        }
        .contact-ts-nav-wrap {
          display: flex; align-items: center; justify-content: space-between; margin-top: 16px;
        }
        .contact-ts-dots { display: flex; gap: 6px; }
        .contact-ts-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #cbd5e1; cursor: pointer; transition: all 0.2s;
        }
        .contact-ts-dot.active {
          background: #1a5276;
          transform: scale(1.3);
        }
        .contact-ts-btns { display: flex; gap: 8px; }
        .contact-ts-btn {
          width: 32px; height: 32px; border-radius: 50%;
          border: 1px solid #cbd5e1; background: #fff;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #475569; font-size: 13px; font-weight: 700;
          transition: all 0.15s;
        }
        .contact-ts-btn:hover { background: #f1f5f9; color: #1a5276; border-color: #94a3b8; }

        /* ── RESPONSIVE ── */
        @media (max-width: 768px) {
          .pm-layout { grid-template-columns: 1fr; gap: 16px; margin-top: -16px; }
          .pm-sidebar { position: static; }
          .pm-nav-card { display: grid; grid-template-columns: repeat(2, 1fr); }
          .pm-nav-title { grid-column: span 2; }
          .pm-nav-item { border-right: 1px solid #f5f7fa; font-size: 12px; padding: 10px 12px; }
          .pm-section { padding: 24px 20px; }
          .pm-banner h1 { font-size: 28px !important; }
          .pm-alt-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 480px) {
          .pm-banner { padding: 48px 16px 36px; }
          .pm-layout { padding: 0 12px; }
        }
      `}</style>

      {/* ── Banner with background handshake overlay ── */}
      <div className="pm-banner">
        <div className="pm-banner-bg" />
        <div className="pm-banner-overlay" />
        <div className="pm-banner-content">
          <div className="pm-banner-tag">
            <Mail size={11} />
            Contact center
          </div>
          <h1>Neem contact op</h1>
          <p>Heeft u een vraag of wilt u een adviesgesprek inplannen? Ons team staat voor u klaar — 24/7 bereikbaar.</p>
        </div>
      </div>

      <div className="pm-layout">
        
        {/* ── Sticky sidebar nav ── */}
        <aside className="pm-sidebar">
          <div className="pm-nav-card">
            <div className="pm-nav-title">Op deze pagina</div>
            {NAV_ITEMS.map(({ id, label, Icon }) => (
              <div
                key={id}
                className={`pm-nav-item${activeSection === id ? ' active' : ''}`}
                onClick={() => scrollTo(id)}
              >
                <Icon size={14} className="pm-nav-icon" />
                {label}
              </div>
            ))}
          </div>
        </aside>

        {/* ── Main content ── */}
        <main className="pm-content">

          {/* 1. Introductie */}
          <section id="intro" className="pm-section">
            <div className="pm-section-header">
              <div className="pm-section-icon"><BookOpen size={20} /></div>
              <div>
                <span className="pm-section-tag">Sectie 1</span>
                <h2>Introductie</h2>
              </div>
            </div>
            <p className="pm-text">
              Welkom bij de contactpagina van <strong>Briskala Property &amp; Asset Group</strong>. Wij begeleiden particulieren, zakelijke investeerders en ondernemingen bij al hun vraagstukken omtrent vastgoed, financial lease, stookolietanks en woningbouw.
            </p>
            <p className="pm-text">
              Onze experts streven ernaar om u binnen <strong>24 uur</strong> (op werkdagen) te voorzien van een gedegen antwoord of een concreet voorstel. Vul ons formulier hieronder in voor een gerichte afhandeling.
            </p>

            {/* Testimonials soft slider inside Section 1 */}
            <div className="contact-ts-card">
              <div className="contact-ts-stars">
                {Array.from({ length: testimonials[activeTestimonial].stars }).map((_, i) => (
                  <span key={i} className="contact-ts-star">★</span>
                ))}
              </div>
              <p className="contact-ts-text">
                &ldquo;{testimonials[activeTestimonial].text}&rdquo;
              </p>
              <div className="contact-ts-author">
                <strong>— {testimonials[activeTestimonial].name}</strong>
                <span>{testimonials[activeTestimonial].role}</span>
              </div>
              <div className="contact-ts-nav-wrap">
                <div className="contact-ts-dots">
                  {testimonials.map((_, i) => (
                    <div
                      key={i}
                      className={`contact-ts-dot ${i === activeTestimonial ? 'active' : ''}`}
                      onClick={() => setActiveTestimonial(i)}
                    />
                  ))}
                </div>
                <div className="contact-ts-btns">
                  <button className="contact-ts-btn" onClick={prevTestimonial}>←</button>
                  <button className="contact-ts-btn" onClick={nextTestimonial}>→</button>
                </div>
              </div>
            </div>
          </section>

          {/* 2. Contact Opnemen Formulier */}
          <section id="contact-form" className="pm-section" ref={formRef}>
            <div className="pm-section-header">
              <div className="pm-section-icon"><Mail size={20} /></div>
              <div>
                <span className="pm-section-tag">Sectie 2</span>
                <h2>Contact Opnemen</h2>
              </div>
            </div>

            <p className="pm-text">
              Laat uw gegevens achter via onderstaand formulier. Wij nemen zo snel mogelijk contact met u op.
            </p>

            {/* Form alerts */}
            {status === 'success' && (
              <div className="pm-alert-success">
                <CheckCircle size={22} style={{ flexShrink: 0 }} />
                <div>
                  <strong style={{ display: 'block' }}>Bericht succesvol verzonden!</strong>
                  Bedankt! Wij hebben uw contactverzoek ontvangen en nemen binnen 24 uur contact met u op.
                </div>
              </div>
            )}
            {status === 'error' && (
              <div className="pm-alert-error">
                <XCircle size={22} style={{ flexShrink: 0 }} />
                <div>
                  <strong style={{ display: 'block' }}>Verzenden mislukt.</strong>
                  Er is een fout opgetreden bij het verzenden van het formulier. Probeer het later opnieuw.
                </div>
              </div>
            )}

            <form className="pm-form" onSubmit={handleSubmit} noValidate>
              <div className="pm-form-row">
                <div className="pm-field">
                  <label className="pm-label" htmlFor="first-name">Voornaam <span style={{ color: '#e74c3c' }}>*</span></label>
                  <input
                    id="first-name"
                    className="pm-input"
                    type="text"
                    name="firstName"
                    placeholder="Voornaam"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="pm-field">
                  <label className="pm-label" htmlFor="last-name">Achternaam <span style={{ color: '#e74c3c' }}>*</span></label>
                  <input
                    id="last-name"
                    className="pm-input"
                    type="text"
                    name="lastName"
                    placeholder="Achternaam"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="pm-field">
                <label className="pm-label" htmlFor="contact-email">E-mailadres <span style={{ color: '#e74c3c' }}>*</span></label>
                <input
                  id="contact-email"
                  className="pm-input"
                  type="email"
                  name="email"
                  placeholder="uw@emailadres.nl"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="pm-field">
                <label className="pm-label" htmlFor="contact-phone">Telefoonnummer</label>
                <input
                  id="contact-phone"
                  className="pm-input"
                  type="tel"
                  name="phone"
                  placeholder="+31 (0) 6 00 00 00 00"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                />
              </div>

              <div className="pm-field">
                <label className="pm-label" htmlFor="contact-subject">Onderwerp <span style={{ color: '#e74c3c' }}>*</span></label>
                <div className="pm-select-inner">
                  <select
                    id="contact-subject"
                    className="pm-select"
                    name="subject"
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    required
                  >
                    <option value="" disabled>Kies een onderwerp</option>
                    <option value="vastgoed">Vastgoed advies</option>
                    <option value="autofinanciering">Autofinanciering</option>
                    <option value="woningbouw">Woningbouw bemiddeling</option>
                    <option value="olietanken">Olietanken advies</option>
                    <option value="algemeen">Algemene vraag</option>
                    <option value="overig">Overig</option>
                  </select>
                  <ChevronDown size={16} className="pm-select-chevron" />
                </div>
              </div>

              <div className="pm-field">
                <label className="pm-label" htmlFor="contact-message">Uw bericht <span style={{ color: '#e74c3c' }}>*</span></label>
                <textarea
                  id="contact-message"
                  className="pm-textarea"
                  name="message"
                  placeholder="Schrijf hier uw vraag of opmerking..."
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  required
                  maxLength={1000}
                />
              </div>

              <label className="pm-checkbox-wrap">
                <input
                  className="pm-checkbox"
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

              <button type="submit" className="pm-submit" disabled={status === 'loading'}>
                {status === 'loading' ? (
                  <><span className="pm-spinner" /> Verzenden...</>
                ) : (
                  <>Verstuur bericht <Send size={15} /></>
                )}
              </button>
            </form>
          </section>

          {/* 3. Wat kunt u verwachten */}
          <section id="verwachting" className="pm-section">
            <div className="pm-section-header">
              <div className="pm-section-icon"><Clock size={20} /></div>
              <div>
                <span className="pm-section-tag">Sectie 3</span>
                <h2>Wat kunt u verwachten?</h2>
              </div>
            </div>
            <p className="pm-text">
              Zodra uw contactaanvraag bij ons binnenkomt, zorgen wij voor een snelle, efficiënte en professionele opvolging:
            </p>
            <ol className="pm-steps">
              {[
                { title: 'Bevestiging per e-mail', desc: 'Direct na uw verzending ontvangt u een automatische ontvangstbevestiging met een kopie van uw aanvraag.' },
                { title: 'Toewijzing aan specialist', desc: 'Uw bericht wordt doorgestuurd naar de juiste afdeling (Vastgoed, Autofinanciering of Woningbouw) voor de beste expertise.' },
                { title: 'Inhoudelijke reactie', desc: 'Binnen 24 uur (op werkdagen) neemt een specialist telefonisch of per e-mail contact met u op.' },
                { title: 'Adviesgesprek of voorstel', desc: 'Indien gewenst plannen we een vrijblijvend adviesgesprek in of ontvangt u een gepersonaliseerd voorstel.' },
              ].map((step, i) => (
                <li key={i} className="pm-step">
                  <div className="pm-step-num">{i + 1}</div>
                  <div className="pm-step-body">
                    <strong>{step.title}</strong>
                    <span>{step.desc}</span>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* 4. Kantoorgegevens */}
          <section id="kantoor" className="pm-section">
            <div className="pm-section-header">
              <div className="pm-section-icon"><MapPin size={20} /></div>
              <div>
                <span className="pm-section-tag">Sectie 4</span>
                <h2>Kantoorgegevens</h2>
              </div>
            </div>
            <p className="pm-text">
              Heeft u liever direct contact of wilt u een storing of technisch probleem melden? Gebruik de onderstaande kanalen:
            </p>
            <div className="pm-alt-grid">
              {[
                { href: 'tel:+31200000000', Icon: Phone, title: 'Bellen', desc: '+31 (0)20 000 00 00 — ma t/m vr 09:00–17:30' },
                { href: 'mailto:info@briskala.nl', Icon: Mail, title: 'E-mail algemeen', desc: 'info@info@briskala.nl — reactie binnen 24 uur' },
                { href: '/probleem-melden', Icon: Wrench, title: 'Support Center', desc: 'Een storing of technisch probleem melden' },
                { href: '/', Icon: BookOpen, title: 'Hoofdkantoor', desc: 'Keizersgracht, Amsterdam · Bezoek op afspraak' },
              ].map(({ href, Icon, title, desc }) => (
                <a key={href} href={href} className="pm-alt-card">
                  <div className="pm-alt-card-icon"><Icon size={18} /></div>
                  <strong>{title}</strong>
                  <span>{desc}</span>
                  <div className="pm-alt-card-arrow"><ArrowRight size={14} /></div>
                </a>
              ))}
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}

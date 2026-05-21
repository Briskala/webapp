'use client';

import React, { useState, useRef } from 'react';
import {
  Wrench, Monitor, Lock, CreditCard, ClipboardList, FileText,
  Mail, Home, Car, HelpCircle, Clock, BookOpen, AlertTriangle,
  CheckCircle, XCircle, Send, ChevronDown, Phone, Newspaper,
  MessageSquare, ArrowRight, MapPin
} from 'lucide-react';
import { submitProblemReport } from '../actions/submitForms';

// ─── Problem categories ───────────────────────────────────────────────────────
const PROBLEM_CATEGORIES = [
  { value: '', label: '— Kies het type probleem —', Icon: null },
  { value: 'website-technisch', label: 'Website werkt niet correct', Icon: Monitor },
  { value: 'inloggen', label: 'Kan niet inloggen / account probleem', Icon: Lock },
  { value: 'betaling', label: 'Betalingsprobleem', Icon: CreditCard },
  { value: 'formulier', label: 'Formulier verstuurt niet', Icon: ClipboardList },
  { value: 'document', label: 'Document of bestand opent niet', Icon: FileText },
  { value: 'contact', label: 'Geen reactie ontvangen', Icon: Mail },
  { value: 'vastgoed', label: 'Probleem met vastgoed aanvraag', Icon: Home },
  { value: 'autofinanciering', label: 'Probleem met autofinanciering', Icon: Car },
  { value: 'overig', label: 'Anders / overig probleem', Icon: HelpCircle },
];

const NAV_ITEMS = [
  { id: 'intro', label: 'Introductie', Icon: BookOpen },
  { id: 'melden', label: 'Probleem Melden', Icon: AlertTriangle },
  { id: 'verwachting', label: 'Wat kunt u verwachten?', Icon: Clock },
  { id: 'contact-alt', label: 'Alternatief contact', Icon: MessageSquare },
];

export default function ProbleemMeldenPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [category, setCategory] = useState('');
  const [formVisible, setFormVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('intro');
  const formRef = useRef<HTMLDivElement>(null);

  const handleCategoryChange = (val: string) => {
    setCategory(val);
    if (val) {
      setFormVisible(true);
      setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
    } else {
      setFormVisible(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    const fd = new FormData(e.currentTarget);
    fd.set('category', category);
    const result = await submitProblemReport(fd);
    if (result.success) {
      setStatus('success');
      setCategory('');
      setFormVisible(false);
      (e.target as HTMLFormElement).reset();
    } else {
      setStatus('error');
    }
  };

  const scrollTo = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const selectedCategory = PROBLEM_CATEGORIES.find(c => c.value === category);

  return (
    <>
      <style>{`
        /* ── Probleem Melden – Document Style ── */
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

        /* ── Dropdown ── */
        .pm-dropdown-wrap { margin: 20px 0; position: relative; }
        .pm-dropdown-label {
          font-size: 13px; font-weight: 700; color: #1a3a5c; margin-bottom: 8px; display: block;
        }
        .pm-dropdown-inner { position: relative; }
        .pm-dropdown {
          width: 100%; padding: 13px 44px 13px 16px;
          border: 2px solid #d1d5db; border-radius: 10px;
          font-size: 14px; color: #333; background: #fff;
          font-family: 'Open Sans', sans-serif; cursor: pointer; outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          appearance: none;
        }
        .pm-dropdown:focus {
          border-color: #1a5276;
          box-shadow: 0 0 0 3px rgba(26,82,118,0.1);
        }
        .pm-dropdown-chevron {
          position: absolute; right: 14px; top: 50%;
          transform: translateY(-50%); pointer-events: none; color: #1a5276;
        }

        /* Category badge */
        .pm-category-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: #eaf4fb; border: 1.5px solid #7fb3d3;
          border-radius: 20px; padding: 6px 16px;
          font-size: 13px; font-weight: 600; color: #1a5276;
          margin-bottom: 20px;
          animation: fadeSlideIn 0.3s ease;
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ── Form ── */
        .pm-form-section { animation: fadeSlideIn 0.35s ease; }
        .pm-form { display: flex; flex-direction: column; gap: 18px; }
        .pm-field { display: flex; flex-direction: column; gap: 6px; }
        .pm-label {
          font-size: 13px !important; font-weight: 700 !important; color: #1a3a5c !important;
        }
        .pm-input, .pm-textarea {
          padding: 11px 14px; border: 1.5px solid #d1d5db; border-radius: 8px;
          font-size: 14px; color: #333; background: #fafafa;
          font-family: 'Open Sans', sans-serif; outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          width: 100%; box-sizing: border-box;
        }
        .pm-input:focus, .pm-textarea:focus {
          border-color: #1a5276; background: #fff;
          box-shadow: 0 0 0 3px rgba(26,82,118,0.1);
        }
        .pm-input::placeholder, .pm-textarea::placeholder { color: #bbb; }
        .pm-textarea { resize: vertical; min-height: 130px; }
        .pm-char-hint { font-size: 11px; color: #94a3b8; text-align: right; margin-top: 2px; }

        /* Alerts */
        .pm-alert-success {
          background: #ecfdf5; border: 1px solid #6ee7b7; border-left: 4px solid #10b981;
          border-radius: 8px; padding: 16px 20px; font-size: 14px; font-weight: 600;
          color: #065f46; display: flex; gap: 12px; align-items: center; margin-bottom: 20px;
          animation: fadeSlideIn 0.3s ease;
        }
        .pm-alert-error {
          background: #fff1f2; border: 1px solid #fca5a5; border-left: 4px solid #ef4444;
          border-radius: 8px; padding: 16px 20px; font-size: 14px; font-weight: 600;
          color: #991b1b; display: flex; gap: 12px; align-items: center; margin-bottom: 20px;
          animation: fadeSlideIn 0.3s ease;
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

        /* Alt contact grid */
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

      {/* ── Banner with background image ── */}
      <div className="pm-banner">
        <div className="pm-banner-bg" />
        <div className="pm-banner-overlay" />
        <div className="pm-banner-content">
          <div className="pm-banner-tag">
            <Wrench size={11} />
            Support Center
          </div>
          <h1>Probleem Melden</h1>
          <p>Heeft u een technisch probleem of loopt u ergens tegenaan? Wij lossen het op — snel en persoonlijk.</p>
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

          {/* 1. Intro */}
          <section id="intro" className="pm-section">
            <div className="pm-section-header">
              <div className="pm-section-icon"><BookOpen size={20} /></div>
              <div>
                <span className="pm-section-tag">Sectie 1</span>
                <h2>Introductie</h2>
              </div>
            </div>
            <p className="pm-text">
              Welkom op de ondersteuningspagina van <strong>Briskala Property &amp; Asset Group</strong>. Wij streven ernaar onze diensten altijd vlekkeloos te laten werken, maar begrijpen dat er soms iets mis kan gaan.
            </p>
            <p className="pm-text">
              Via dit formulier kunt u snel en eenvoudig een probleem doorgeven. Ons supportteam neemt uw melding serieus en reageert binnen <strong>1 werkdag</strong> op uw verzoek.
            </p>
            <div className="pm-info-box">
              <HelpCircle size={16} className="pm-info-icon" />
              <div>
                <strong style={{ display: 'block', marginBottom: 2 }}>Tip</strong>
                Hoe specifieker u het probleem omschrijft, hoe sneller wij u kunnen helpen. Vermeld indien mogelijk het tijdstip en de pagina waarop het probleem optrad.
              </div>
            </div>
          </section>

          {/* 2. Probleem Melden */}
          <section id="melden" className="pm-section">
            <div className="pm-section-header">
              <div className="pm-section-icon"><AlertTriangle size={20} /></div>
              <div>
                <span className="pm-section-tag">Sectie 2</span>
                <h2>Probleem Melden</h2>
              </div>
            </div>

            <p className="pm-text">
              Selecteer hieronder het type probleem dat u ervaart. Op basis van uw keuze verschijnt een gericht meldingsformulier.
            </p>

            {/* Alerts */}
            {status === 'success' && (
              <div className="pm-alert-success">
                <CheckCircle size={22} />
                <div>
                  <strong style={{ display: 'block' }}>Melding ontvangen!</strong>
                  Uw melding is succesvol ingediend. Ons team neemt binnen 1 werkdag contact met u op.
                </div>
              </div>
            )}
            {status === 'error' && (
              <div className="pm-alert-error">
                <XCircle size={22} />
                <div>
                  <strong style={{ display: 'block' }}>Er ging iets mis.</strong>
                  Probeer het later opnieuw of neem direct contact met ons op.
                </div>
              </div>
            )}

            {/* Dropdown */}
            <div className="pm-dropdown-wrap">
              <label className="pm-dropdown-label" htmlFor="pm-category">
                Wat is het probleem? <span style={{ color: '#e74c3c' }}>*</span>
              </label>
              <div className="pm-dropdown-inner">
                <select
                  id="pm-category"
                  className="pm-dropdown"
                  value={category}
                  onChange={e => handleCategoryChange(e.target.value)}
                >
                  {PROBLEM_CATEGORIES.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="pm-dropdown-chevron" />
              </div>
            </div>

            {/* Conditional form */}
            {formVisible && selectedCategory && (
              <div className="pm-form-section" ref={formRef}>
                <div className="pm-category-badge">
                  {selectedCategory.Icon && <selectedCategory.Icon size={14} />}
                  {selectedCategory.label}
                </div>

                <form className="pm-form" onSubmit={handleSubmit} noValidate>
                  <div className="pm-field">
                    <label className="pm-label" htmlFor="pm-name">
                      Uw Naam <span style={{ color: '#e74c3c' }}>*</span>
                    </label>
                    <input
                      id="pm-name"
                      className="pm-input"
                      type="text"
                      name="name"
                      placeholder="Voor- en achternaam"
                      required
                    />
                  </div>

                  <div className="pm-field">
                    <label className="pm-label" htmlFor="pm-email">
                      E-mailadres <span style={{ color: '#e74c3c' }}>*</span>
                    </label>
                    <input
                      id="pm-email"
                      className="pm-input"
                      type="email"
                      name="email"
                      placeholder="uw@emailadres.nl"
                      required
                    />
                  </div>

                  <div className="pm-field">
                    <label className="pm-label" htmlFor="pm-problem">
                      Beschrijf het probleem <span style={{ color: '#e74c3c' }}>*</span>
                    </label>
                    <textarea
                      id="pm-problem"
                      className="pm-input pm-textarea"
                      name="problem"
                      placeholder={`Beschrijf zo duidelijk mogelijk wat er mis ging bij "${selectedCategory.label}". Vermeld stappen, foutmeldingen of het tijdstip.`}
                      required
                      maxLength={1000}
                    />
                    <span className="pm-char-hint">Max. 1000 tekens</span>
                  </div>

                  <button type="submit" className="pm-submit" disabled={status === 'loading'}>
                    {status === 'loading' ? (
                      <><span className="pm-spinner" /> Verzenden...</>
                    ) : (
                      <>Meld probleem <Send size={15} /></>
                    )}
                  </button>
                </form>
              </div>
            )}
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
              Zodra wij uw melding ontvangen, gaan wij direct aan de slag. Hieronder ziet u hoe ons proces eruitziet:
            </p>
            <ol className="pm-steps">
              {[
                { title: 'Bevestiging per e-mail', desc: 'U ontvangt een automatische bevestiging op uw e-mailadres zodra uw melding is ingediend.' },
                { title: 'Analyse door ons team', desc: 'Ons supportteam beoordeelt uw melding en onderzoekt het probleem — doorgaans binnen 1 werkdag.' },
                { title: 'Persoonlijk antwoord', desc: 'U ontvangt een persoonlijk antwoord met de oplossing of een vervolgvraag van één van onze medewerkers.' },
                { title: 'Afsluiting van de melding', desc: 'Na uw akkoord sluiten wij de melding af. U ontvangt een eindbevestiging per e-mail.' },
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
            <div className="pm-info-box" style={{ marginTop: 20 }}>
              <Clock size={16} className="pm-info-icon" />
              <div>Onze supporttijden zijn <strong>maandag t/m vrijdag van 09:00 – 17:30 uur</strong>. Meldingen buiten kantoortijden worden de eerstvolgende werkdag opgepakt.</div>
            </div>
          </section>

          {/* 4. Alternatief contact */}
          <section id="contact-alt" className="pm-section">
            <div className="pm-section-header">
              <div className="pm-section-icon"><MessageSquare size={20} /></div>
              <div>
                <span className="pm-section-tag">Sectie 4</span>
                <h2>Alternatief contact</h2>
              </div>
            </div>
            <p className="pm-text">
              Heeft u liever direct contact of is uw probleem spoedeisend? Gebruik dan één van de onderstaande opties:
            </p>
            <div className="pm-alt-grid">
              {[
                { href: '/contact', Icon: MessageSquare, title: 'Contactformulier', desc: 'Stuur ons een algemeen bericht via het contactformulier.' },
                { href: 'mailto:support@briskala.nl', Icon: Mail, title: 'E-mail support', desc: 'support@briskala.nl — wij reageren binnen 24 uur.' },
                { href: 'tel:+31200000000', Icon: Phone, title: 'Telefonisch', desc: '+31 (0)20 000 00 00 — ma t/m vr 09:00–17:30' },
                { href: '/nieuws', Icon: Newspaper, title: 'Nieuws & Updates', desc: 'Bekijk bekende storingen en onderhoudsupdates.' },
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
    </>
  );
}

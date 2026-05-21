'use client';

import React, { useState, useRef } from 'react';
import { submitProblemReport } from '../actions/submitForms';

// ─── Problem categories ───────────────────────────────────────────────────────
const PROBLEM_CATEGORIES = [
  { value: '', label: '— Kies het type probleem —', emoji: '' },
  { value: 'website-technisch', label: 'Website werkt niet correct', emoji: '🖥️' },
  { value: 'inloggen', label: 'Kan niet inloggen / account probleem', emoji: '🔐' },
  { value: 'betaling', label: 'Betalingsprobleem', emoji: '💳' },
  { value: 'formulier', label: 'Formulier verstuurt niet', emoji: '📋' },
  { value: 'document', label: 'Document of bestand opent niet', emoji: '📄' },
  { value: 'contact', label: 'Geen reactie ontvangen', emoji: '📬' },
  { value: 'vastgoed', label: 'Probleem met vastgoed aanvraag', emoji: '🏠' },
  { value: 'autofinanciering', label: 'Probleem met autofinanciering', emoji: '🚗' },
  { value: 'overig', label: 'Anders / overig probleem', emoji: '❓' },
];

const NAV_ITEMS = [
  { id: 'intro', label: 'Introductie' },
  { id: 'melden', label: 'Probleem Melden' },
  { id: 'verwachting', label: 'Wat kunt u verwachten?' },
  { id: 'contact-alt', label: 'Alternatief contact' },
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
      setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
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
        .pm-page {
          background: #f7f9fb;
          min-height: 100vh;
          padding-bottom: 80px;
        }

        /* ── Page header banner ── */
        .pm-banner {
          background: linear-gradient(135deg, #1a3a5c 0%, #1a5276 60%, #2471a3 100%);
          padding: 52px 24px 40px;
          text-align: center;
          color: #fff;
        }
        .pm-banner-tag {
          display: inline-block;
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.25);
          border-radius: 20px;
          padding: 4px 14px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #add8f7;
          margin-bottom: 16px;
        }
        .pm-banner h1 {
          font-size: 36px !important;
          font-weight: 800 !important;
          color: #fff !important;
          margin: 0 0 12px !important;
          line-height: 1.15 !important;
          font-family: 'Open Sans', sans-serif;
        }
        .pm-banner p {
          font-size: 15px !important;
          color: rgba(255,255,255,0.78) !important;
          max-width: 560px;
          margin: 0 auto !important;
          line-height: 1.6 !important;
        }
        .pm-banner-emoji {
          font-size: 48px;
          display: block;
          margin-bottom: 16px;
          line-height: 1;
        }

        /* ── Layout ── */
        .pm-layout {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 20px;
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 32px;
          margin-top: -24px;
        }

        /* ── Sticky sidebar nav ── */
        .pm-sidebar {
          position: sticky;
          top: 80px;
          height: fit-content;
        }
        .pm-nav-card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }
        .pm-nav-title {
          padding: 14px 18px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          color: #94a3b8;
          border-bottom: 1px solid #f1f5f9;
          background: #f8fafc;
        }
        .pm-nav-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 18px;
          font-size: 13px;
          font-weight: 500;
          color: #555;
          cursor: pointer;
          border-bottom: 1px solid #f5f7fa;
          transition: background 0.15s, color 0.15s;
          user-select: none;
        }
        .pm-nav-item:last-child { border-bottom: none; }
        .pm-nav-item:hover { background: #f0f7fc; color: #1a5276; }
        .pm-nav-item.active {
          background: #eaf4fb;
          color: #1a5276;
          font-weight: 700;
          border-left: 3px solid #1a5276;
        }
        .pm-nav-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #cbd5e1;
          flex-shrink: 0;
          transition: background 0.15s;
        }
        .pm-nav-item.active .pm-nav-dot { background: #1a5276; }

        /* ── Main content column ── */
        .pm-content { padding-top: 8px; }

        /* ── Section blocks ── */
        .pm-section {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 32px 36px;
          margin-bottom: 24px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
          scroll-margin-top: 90px;
        }
        .pm-section-header {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 2px solid #f1f5f9;
        }
        .pm-section-icon {
          width: 42px; height: 42px;
          border-radius: 10px;
          background: #eaf4fb;
          display: flex; align-items: center; justify-content: center;
          font-size: 20px; flex-shrink: 0;
        }
        .pm-section-header h2 {
          font-size: 20px !important;
          font-weight: 700 !important;
          color: #1a3a5c !important;
          margin: 0 !important;
        }
        .pm-section-header .pm-section-tag {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          color: #94a3b8;
          display: block;
          margin-top: 2px;
        }

        /* Body text */
        .pm-text {
          font-size: 14px !important;
          color: #475569 !important;
          line-height: 1.75 !important;
          margin: 0 0 14px !important;
        }
        .pm-text:last-child { margin-bottom: 0 !important; }

        /* Info boxes */
        .pm-info-box {
          background: #f0f9ff;
          border: 1px solid #bae6fd;
          border-left: 4px solid #0ea5e9;
          border-radius: 8px;
          padding: 14px 18px;
          font-size: 13px;
          color: #0c4a6e;
          margin: 16px 0;
          display: flex;
          gap: 10px;
          align-items: flex-start;
        }
        .pm-info-box-icon { font-size: 16px; flex-shrink: 0; margin-top: 1px; }

        /* ── Category dropdown ── */
        .pm-dropdown-wrap { margin: 20px 0; }
        .pm-dropdown-label {
          font-size: 13px;
          font-weight: 700;
          color: #1a3a5c;
          margin-bottom: 8px;
          display: block;
        }
        .pm-dropdown {
          width: 100%;
          padding: 13px 16px;
          border: 2px solid #d1d5db;
          border-radius: 10px;
          font-size: 14px;
          color: #333;
          background: #fff;
          font-family: 'Open Sans', sans-serif;
          cursor: pointer;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%231a5276' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          padding-right: 40px;
        }
        .pm-dropdown:focus {
          border-color: #1a5276;
          box-shadow: 0 0 0 3px rgba(26,82,118,0.1);
        }

        /* ── Selected category badge ── */
        .pm-category-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #eaf4fb;
          border: 1.5px solid #7fb3d3;
          border-radius: 20px;
          padding: 6px 16px;
          font-size: 13px;
          font-weight: 600;
          color: #1a5276;
          margin-bottom: 20px;
          animation: fadeSlideIn 0.3s ease;
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ── Form ── */
        .pm-form-section {
          margin-top: 0;
          animation: fadeSlideIn 0.35s ease;
        }
        .pm-form { display: flex; flex-direction: column; gap: 18px; }
        .pm-field { display: flex; flex-direction: column; gap: 6px; }
        .pm-label {
          font-size: 13px !important;
          font-weight: 700 !important;
          color: #1a3a5c !important;
        }
        .pm-input, .pm-textarea {
          padding: 11px 14px;
          border: 1.5px solid #d1d5db;
          border-radius: 8px;
          font-size: 14px;
          color: #333;
          background: #fafafa;
          font-family: 'Open Sans', sans-serif;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          width: 100%;
          box-sizing: border-box;
        }
        .pm-input:focus, .pm-textarea:focus {
          border-color: #1a5276;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(26,82,118,0.1);
        }
        .pm-input::placeholder, .pm-textarea::placeholder { color: #bbb; }
        .pm-textarea { resize: vertical; min-height: 130px; }

        .pm-char-hint {
          font-size: 11px;
          color: #94a3b8;
          text-align: right;
          margin-top: 2px;
        }

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

        /* Submit button */
        .pm-submit {
          background: #1a5276;
          color: #fff;
          border: none;
          padding: 14px 28px;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          font-family: 'Open Sans', sans-serif;
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          width: 100%;
        }
        .pm-submit:hover:not(:disabled) {
          background: #154360;
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(26,82,118,0.25);
        }
        .pm-submit:disabled { opacity: 0.65; cursor: not-allowed; }

        /* Spinner */
        .pm-spinner {
          display: inline-block; width: 15px; height: 15px;
          border: 2px solid rgba(255,255,255,0.4);
          border-top-color: #fff; border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Steps list */
        .pm-steps { list-style: none; padding: 0; margin: 16px 0 0; display: flex; flex-direction: column; gap: 12px; }
        .pm-step {
          display: flex; gap: 14px; align-items: flex-start;
          padding: 14px 16px;
          background: #f8fafc; border-radius: 8px;
          border: 1px solid #e9eef4;
        }
        .pm-step-num {
          width: 28px; height: 28px; border-radius: 50%;
          background: #1a5276; color: #fff;
          font-size: 13px; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .pm-step-body strong { display: block; font-size: 13px; font-weight: 700; color: #1a3a5c; }
        .pm-step-body span { font-size: 12px; color: #64748b; }

        /* Alternatives grid */
        .pm-alt-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-top: 16px;
        }
        .pm-alt-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 18px 20px;
          text-decoration: none;
          transition: box-shadow 0.2s, transform 0.15s, border-color 0.2s;
          display: flex; flex-direction: column; gap: 6px;
        }
        .pm-alt-card:hover {
          box-shadow: 0 4px 14px rgba(0,0,0,0.08);
          transform: translateY(-2px);
          border-color: #7fb3d3;
        }
        .pm-alt-card-icon { font-size: 26px; }
        .pm-alt-card strong { font-size: 13px; font-weight: 700; color: #1a3a5c; }
        .pm-alt-card span { font-size: 12px; color: #64748b; }

        /* Fun footer note */
        .pm-fun-note {
          background: linear-gradient(135deg, #fff9e6 0%, #fffbf0 100%);
          border: 1px solid #fde68a;
          border-radius: 10px;
          padding: 18px 22px;
          font-size: 13px;
          color: #78350f;
          display: flex;
          gap: 12px;
          align-items: center;
          margin-top: 0;
        }
        .pm-fun-note-icon { font-size: 24px; flex-shrink: 0; }

        /* ── RESPONSIVE ── */
        @media (max-width: 768px) {
          .pm-layout { grid-template-columns: 1fr; gap: 20px; margin-top: -16px; }
          .pm-sidebar { position: static; }
          .pm-nav-card { display: flex; flex-wrap: wrap; }
          .pm-nav-title { width: 100%; }
          .pm-nav-item { flex: 1 1 auto; border-bottom: none; border-right: 1px solid #f5f7fa; font-size: 12px; padding: 10px 12px; }
          .pm-section { padding: 24px 20px; }
          .pm-banner h1 { font-size: 28px !important; }
          .pm-alt-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 480px) {
          .pm-banner { padding: 36px 16px 28px; }
          .pm-layout { padding: 0 12px; }
        }
      `}</style>

      {/* ── Banner ── */}
      <div className="pm-banner">
        <span className="pm-banner-emoji">🛠️</span>
        <div className="pm-banner-tag">Support Center</div>
        <h1>Probleem Melden</h1>
        <p>Heeft u een technisch probleem of loopt u ergens tegenaan? Wij lossen het op — snel en persoonlijk.</p>
      </div>

      <div className="pm-layout">

        {/* ── Sidebar nav ── */}
        <aside className="pm-sidebar">
          <div className="pm-nav-card">
            <div className="pm-nav-title">Op deze pagina</div>
            {NAV_ITEMS.map(item => (
              <div
                key={item.id}
                className={`pm-nav-item${activeSection === item.id ? ' active' : ''}`}
                onClick={() => scrollTo(item.id)}
              >
                <div className="pm-nav-dot" />
                {item.label}
              </div>
            ))}
          </div>
        </aside>

        {/* ── Main content ── */}
        <main className="pm-content">

          {/* ── 1. Intro ── */}
          <section id="intro" className="pm-section">
            <div className="pm-section-header">
              <div className="pm-section-icon">📖</div>
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
              <span className="pm-info-box-icon">💡</span>
              <div>
                <strong style={{ display: 'block', marginBottom: 2 }}>Tip</strong>
                Hoe specifieker u het probleem omschrijft, hoe sneller wij u kunnen helpen. Vermeld indien mogelijk het tijdstip en de pagina waarop het probleem optrad.
              </div>
            </div>
          </section>

          {/* ── 2. Probleem Melden ── */}
          <section id="melden" className="pm-section">
            <div className="pm-section-header">
              <div className="pm-section-icon">🚨</div>
              <div>
                <span className="pm-section-tag">Sectie 2</span>
                <h2>Probleem Melden</h2>
              </div>
            </div>

            <p className="pm-text">
              Selecteer hieronder het type probleem dat u ervaart. Op basis van uw keuze verschijnt een gerict meldingsformulier.
            </p>

            {/* Success / Error alerts */}
            {status === 'success' && (
              <div className="pm-alert-success">
                <span style={{ fontSize: '22px' }}>✅</span>
                <div>
                  <strong style={{ display: 'block' }}>Melding ontvangen!</strong>
                  Uw melding is succesvol ingediend. Ons team neemt binnen 1 werkdag contact met u op.
                </div>
              </div>
            )}
            {status === 'error' && (
              <div className="pm-alert-error">
                <span style={{ fontSize: '22px' }}>❌</span>
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
              <select
                id="pm-category"
                className="pm-dropdown"
                value={category}
                onChange={e => handleCategoryChange(e.target.value)}
              >
                {PROBLEM_CATEGORIES.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.emoji ? `${cat.emoji}  ${cat.label}` : cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Form — appears after category selected */}
            {formVisible && selectedCategory && (
              <div className="pm-form-section" ref={formRef}>
                <div className="pm-category-badge">
                  {selectedCategory.emoji} {selectedCategory.label}
                </div>

                <form className="pm-form" onSubmit={handleSubmit} noValidate>
                  {/* Naam */}
                  <div className="pm-field">
                    <label className="pm-label" htmlFor="pm-name">Uw Naam <span style={{ color: '#e74c3c' }}>*</span></label>
                    <input
                      id="pm-name"
                      className="pm-input"
                      type="text"
                      name="name"
                      placeholder="Voor- en achternaam"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="pm-field">
                    <label className="pm-label" htmlFor="pm-email">E-mailadres <span style={{ color: '#e74c3c' }}>*</span></label>
                    <input
                      id="pm-email"
                      className="pm-input"
                      type="email"
                      name="email"
                      placeholder="uw@emailadres.nl"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div className="pm-field">
                    <label className="pm-label" htmlFor="pm-problem">
                      Beschrijf het probleem <span style={{ color: '#e74c3c' }}>*</span>
                    </label>
                    <textarea
                      id="pm-problem"
                      className="pm-input pm-textarea"
                      name="problem"
                      placeholder={`Beschrijf zo duidelijk mogelijk wat er mis ging bij "${selectedCategory.label}". Vermeld stappen, foutmeldingen of het tijdstip indien van toepassing.`}
                      required
                      maxLength={1000}
                    />
                    <span className="pm-char-hint">Max. 1000 tekens</span>
                  </div>

                  {/* Submit */}
                  <button type="submit" className="pm-submit" disabled={status === 'loading'}>
                    {status === 'loading' ? (
                      <><span className="pm-spinner" /> Verzenden...</>
                    ) : (
                      <>Meld probleem <span style={{ fontSize: '16px' }}>🚀</span></>
                    )}
                  </button>
                </form>
              </div>
            )}
          </section>

          {/* ── 3. Wat kunt u verwachten ── */}
          <section id="verwachting" className="pm-section">
            <div className="pm-section-header">
              <div className="pm-section-icon">⏱️</div>
              <div>
                <span className="pm-section-tag">Sectie 3</span>
                <h2>Wat kunt u verwachten?</h2>
              </div>
            </div>
            <p className="pm-text">
              Zodra wij uw melding ontvangen, gaan wij direct aan de slag. Hieronder ziet u hoe ons proces eruitziet:
            </p>
            <ol className="pm-steps">
              <li className="pm-step">
                <div className="pm-step-num">1</div>
                <div className="pm-step-body">
                  <strong>Bevestiging per e-mail</strong>
                  <span>U ontvangt een automatische bevestiging op uw e-mailadres zodra uw melding is ingediend.</span>
                </div>
              </li>
              <li className="pm-step">
                <div className="pm-step-num">2</div>
                <div className="pm-step-body">
                  <strong>Analyse door ons team</strong>
                  <span>Ons supportteam beoordeelt uw melding en onderzoekt het probleem — doorgaans binnen 1 werkdag.</span>
                </div>
              </li>
              <li className="pm-step">
                <div className="pm-step-num">3</div>
                <div className="pm-step-body">
                  <strong>Persoonlijk antwoord</strong>
                  <span>U ontvangt een persoonlijk antwoord met de oplossing of een vervolgvraag van één van onze medewerkers.</span>
                </div>
              </li>
              <li className="pm-step">
                <div className="pm-step-num">4</div>
                <div className="pm-step-body">
                  <strong>Afsluiting van de melding</strong>
                  <span>Na uw akkoord sluiten wij de melding af. U ontvangt een eindbevestiging per e-mail.</span>
                </div>
              </li>
            </ol>
            <div className="pm-info-box" style={{ marginTop: 20 }}>
              <span className="pm-info-box-icon">📅</span>
              <div>Onze supporttijden zijn <strong>maandag t/m vrijdag van 09:00 – 17:30 uur</strong>. Meldingen buiten kantoortijden worden de eerstvolgende werkdag opgepakt.</div>
            </div>
          </section>

          {/* ── 4. Alternatief contact ── */}
          <section id="contact-alt" className="pm-section">
            <div className="pm-section-header">
              <div className="pm-section-icon">📬</div>
              <div>
                <span className="pm-section-tag">Sectie 4</span>
                <h2>Alternatief contact</h2>
              </div>
            </div>
            <p className="pm-text">
              Heeft u liever direct contact of is uw probleem spoedeisend? Gebruik dan één van de onderstaande opties:
            </p>
            <div className="pm-alt-grid">
              <a href="/contact" className="pm-alt-card">
                <span className="pm-alt-card-icon">💬</span>
                <strong>Contactformulier</strong>
                <span>Stuur ons een algemeen bericht via het contactformulier.</span>
              </a>
              <a href="mailto:support@briskala.nl" className="pm-alt-card">
                <span className="pm-alt-card-icon">✉️</span>
                <strong>E-mail support</strong>
                <span>support@briskala.nl — wij reageren binnen 24 uur.</span>
              </a>
              <a href="tel:+31200000000" className="pm-alt-card">
                <span className="pm-alt-card-icon">📞</span>
                <strong>Telefonisch</strong>
                <span>+31 (0)20 000 00 00 — ma t/m vr 09:00–17:30</span>
              </a>
              <a href="/nieuws" className="pm-alt-card">
                <span className="pm-alt-card-icon">📰</span>
                <strong>Statuspagina / Nieuws</strong>
                <span>Bekijk bekende storingen en onderhoudsupdates.</span>
              </a>
            </div>
          </section>

          {/* ── Fun footer note ── */}
          <div className="pm-fun-note">
            <span className="pm-fun-note-icon">☀️</span>
            <div>
              <strong style={{ display: 'block', color: '#92400e', marginBottom: 4 }}>Wist u dat?</strong>
              <span style={{ color: '#78350f', fontSize: '13px', lineHeight: 1.6 }}>
                Meer dan <strong>98%</strong> van onze meldingen wordt opgelost binnen één werkdag. Ons team werkt hard om uw ervaring zo soepel mogelijk te houden. Bedankt voor uw vertrouwen in Briskala! 🙏
              </span>
            </div>
          </div>

        </main>
      </div>
    </>
  );
}

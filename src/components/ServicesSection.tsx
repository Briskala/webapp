import React from 'react';
import Link from 'next/link';

const services = [
  {
    num: '[001]',
    title: 'Facturen & inkomsten',
    description:
      'Maak professionele facturen, verstuur ze naar klanten en volg openstaande bedragen tot betaling — inclusief herinneringen en statusoverzicht.',
    href: '/facturen',
    icon: (
      <svg viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg" width="120" height="90">
        <rect x="28" y="12" width="64" height="68" rx="4" fill="#f0f0f0" />
        <rect x="38" y="24" width="44" height="6" rx="2" fill="#d0d0d0" />
        <rect x="38" y="36" width="36" height="4" rx="2" fill="#e0e0e0" />
        <rect x="38" y="46" width="40" height="4" rx="2" fill="#e0e0e0" />
        <rect x="38" y="56" width="28" height="4" rx="2" fill="#e0e0e0" />
        <rect x="38" y="66" width="20" height="6" rx="2" fill="#c8c8c8" />
      </svg>
    ),
  },
  {
    num: '[002]',
    title: 'Uitgaven & boekhouding',
    description:
      'Registreer kosten, upload bonnen en automatiseer boekingen. Briskala houdt uw administratie overzichtelijk voor particulieren én bedrijven.',
    href: '/boekhouding',
    icon: (
      <svg viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg" width="120" height="90">
        <rect x="16" y="20" width="88" height="54" rx="6" fill="#f0f0f0" />
        <rect x="28" y="34" width="28" height="28" rx="4" fill="#e0e0e0" />
        <rect x="64" y="34" width="28" height="8" rx="2" fill="#d0d0d0" />
        <rect x="64" y="48" width="28" height="8" rx="2" fill="#d8d8d8" />
        <rect x="64" y="62" width="20" height="6" rx="2" fill="#c8c8c8" />
      </svg>
    ),
  },
  {
    num: '[003]',
    title: 'Btw & rapporten',
    description:
      'Bereid btw-aangiften voor en krijg direct inzicht in winst, cashflow en financiële KPI’s — klaar voor uzelf of uw accountant.',
    href: '/rapporten',
    icon: (
      <svg viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg" width="120" height="90">
        <rect x="14" y="18" width="92" height="56" rx="6" fill="#f0f0f0" />
        <rect x="28" y="52" width="12" height="14" rx="2" fill="#d0d0d0" />
        <rect x="46" y="40" width="12" height="26" rx="2" fill="#c8c8c8" />
        <rect x="64" y="30" width="12" height="36" rx="2" fill="#d0d0d0" />
        <rect x="82" y="36" width="12" height="30" rx="2" fill="#e0e0e0" />
      </svg>
    ),
  },
];

export function ServicesSection() {
  return (
    <section className="services-section">
      <div className="services-header">
        <h2 className="services-title">
          Alles voor uw<br />financiële administratie
        </h2>
        <p className="services-subtitle">
          Briskala is het complete platform voor boekhouding en financieel beheer. Van factuur tot btw-aangifte — zelf regelen, voor particulieren, zzp’ers, mkb, grote bedrijven en accountants.
        </p>
      </div>

      <div className="services-cards">
        {services.map((s) => (
          <Link href={s.href} className="service-card" key={s.num} style={{ textDecoration: 'none', color: 'inherit' }}>
            <span className="service-num">{s.num}</span>
            <div className="service-illustration">{s.icon}</div>
            <h3 className="service-card-title">{s.title}</h3>
            <p className="service-card-desc">{s.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

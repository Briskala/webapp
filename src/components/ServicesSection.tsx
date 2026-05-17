import React from 'react';

const services = [
  {
    num: '[001]',
    title: 'Vastgoed Advies',
    description:
      'Wij luisteren naar uw wensen, analyseren de markt en introduceren u bij de juiste makelaar of investeerder. Geen verborgen kosten, helder advies.',
    icon: (
      <svg viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg" width="120" height="90">
        <rect x="10" y="40" width="100" height="46" rx="4" fill="#f0f0f0" />
        <polygon points="60,10 10,42 110,42" fill="#e0e0e0" />
        <rect x="45" y="56" width="30" height="30" rx="2" fill="#d0d0d0" />
        <rect x="20" y="52" width="18" height="14" rx="2" fill="#c8c8c8" />
        <rect x="82" y="52" width="18" height="14" rx="2" fill="#c8c8c8" />
      </svg>
    ),
  },
  {
    num: '[002]',
    title: 'Autofinanciering',
    description:
      'Wij vergelijken financieringsopties voor uw voertuig en brengen u direct in contact met betrouwbare leasemaatschappijen en banken.',
    icon: (
      <svg viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg" width="120" height="90">
        <rect x="10" y="30" width="100" height="46" rx="8" fill="#f0f0f0" />
        <rect x="20" y="22" width="80" height="22" rx="6" fill="#e0e0e0" />
        <circle cx="32" cy="76" r="10" fill="#d0d0d0" />
        <circle cx="88" cy="76" r="10" fill="#d0d0d0" />
        <rect x="30" y="42" width="28" height="6" rx="3" fill="#c8c8c8" />
        <rect x="62" y="42" width="20" height="6" rx="3" fill="#c8c8c8" />
        <rect x="30" y="52" width="16" height="4" rx="2" fill="#d8d8d8" />
      </svg>
    ),
  },
  {
    num: '[003]',
    title: 'Woningbouw & Consult',
    description:
      'Van de eerste plannen tot de keuze van een aannemer: boek een persoonlijk consult en krijg toegang tot ons partnernetwerk.',
    icon: (
      <svg viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg" width="120" height="90">
        <rect x="30" y="20" width="60" height="56" rx="6" fill="#f0f0f0" />
        <circle cx="60" cy="30" r="12" fill="#e0e0e0" />
        <rect x="40" y="50" width="40" height="6" rx="3" fill="#d0d0d0" />
        <rect x="40" y="60" width="28" height="4" rx="2" fill="#d8d8d8" />
        <rect x="40" y="68" width="34" height="4" rx="2" fill="#d8d8d8" />
        <circle cx="60" cy="30" r="6" fill="#d0d0d0" />
        <polyline points="56,30 59,33 65,27" stroke="#b0b0b0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
];

export function ServicesSection() {
  return (
    <section className="services-section">
      {/* Header row */}
      <div className="services-header">
        <h2 className="services-title">
          Ons Netwerk Aan<br />Het Werk Voor U
        </h2>
        <p className="services-subtitle">
          Briskala levert onafhankelijk advies en introduceert u bij de beste notarissen, makelaars, bankiers en aannemers. Geen eigen voorraad, 100% focus op uw belangen.
        </p>
      </div>

      {/* Cards row */}
      <div className="services-cards">
        {services.map((s) => (
          <div className="service-card" key={s.num}>
            <span className="service-num">{s.num}</span>
            <div className="service-illustration">{s.icon}</div>
            <h3 className="service-card-title">{s.title}</h3>
            <p className="service-card-desc">{s.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

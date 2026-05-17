import React from 'react';
import Link from 'next/link';

export function CustomHero() {
  return (
    <section className="custom-hero">
      <div className="ch-left">
        <div className="ch-header-container">
          <div className="ch-top-text">
            Onafhankelijk Advies & Bemiddeling
          </div>
          <div className="ch-bottom-text">
            <h1 className="ch-heading">
              De juiste<br />
              connectie<br />
              voor elke<br />
              ambitie
            </h1>
            <div className="ch-cta-wrapper" style={{ marginTop: '40px' }}>
              <Link href="/contact" className="ch-cta-btn">
                Plan een adviesgesprek ↗
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="ch-right">
        <div className="ch-col ch-col-1">
          <div className="ch-col-content">
            <div className="ch-photo-container">
              <p className="ch-col-text">
                Wij bieden persoonlijk advies en brengen u direct in contact met de juiste partners voor vastgoed, financiering en woningbouw.
              </p>
            </div>
          </div>
        </div>
        <div className="ch-col ch-col-2"></div>
      </div>
    </section>
  );
}

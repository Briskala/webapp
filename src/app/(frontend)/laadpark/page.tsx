import React from 'react';
import { ApplicationForm } from '@/components/ApplicationForm';

export const metadata = {
  title: 'Laadpark Aanvragen — BPAG',
  description: 'Vraag een laadpark aan bij BPAG. Volledige ontzorging, maatwerk en financieringsmogelijkheden.',
};

const FEATURES = [
  { icon: '⚡', title: 'Volledige ontzorging', desc: 'Van vergunning tot installatie en beheer regelen wij alles.' },
  { icon: '🔧', title: 'Maatwerk', desc: 'Oplossingen afgestemd op uw locatie, netwerk en capaciteitsbehoefte.' },
  { icon: '💰', title: 'Financiering mogelijk', desc: 'Combineer uw aanvraag direct met een passende financiering via BPAG.' },
  { icon: '📊', title: 'Slim laadbeheer', desc: 'Altijd inzicht in verbruik, bezetting en inkomsten via uw dashboard.' },
];

export default function LaadparkPage() {
  return (
    <div style={{ background: '#f7f9fb', minHeight: '100vh', paddingBottom: '80px' }}>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #1a5276 0%, #2471a3 100%)', color: '#fff', padding: '70px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚡</div>
          <h1 style={{ fontSize: '38px', fontWeight: 800, margin: '0 0 16px', lineHeight: 1.2 }}>Laadpark Aanvragen</h1>
          <p style={{ fontSize: '18px', color: '#aad4ef', lineHeight: 1.7, margin: 0 }}>
            De toekomst is elektrisch. Met een laadpark van BPAG bent u klaar voor de groeiende vraag. Vraag vandaag nog een voorstel op maat aan.
          </p>
        </div>
      </section>

      {/* Features */}
      <section style={{ maxWidth: '1100px', margin: '-40px auto 0', padding: '0 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '48px' }}>
          {FEATURES.map((f) => (
            <div key={f.title} style={{ background: '#fff', borderRadius: '10px', padding: '24px', border: '1px solid #e0e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>{f.icon}</div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1a5276', margin: '0 0 8px' }}>{f.title}</h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Form + Info */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'flex-start' }}>
          {/* Info */}
          <div style={{ background: '#fff', borderRadius: '10px', padding: '32px', border: '1px solid #e0e8f0' }}>
            <h2 style={{ color: '#1a5276', fontSize: '22px', fontWeight: 700, margin: '0 0 20px' }}>Hoe werkt het?</h2>
            {[
              { step: '1', title: 'Aanvraag indienen', desc: 'Vul het formulier in met uw locatie- en projectinformatie.' },
              { step: '2', title: 'Onze specialist neemt contact op', desc: 'We bespreken wensen, technische haalbaarheid en mogelijkheden.' },
              { step: '3', title: 'Voorstel op maat', desc: 'U ontvangt een offerte inclusief financieringsopties.' },
              { step: '4', title: 'Installatie & beheer', desc: 'Na goedkeuring verzorgen wij de volledige uitvoering.' },
            ].map((item) => (
              <div key={item.step} style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#1a5276', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px', flexShrink: 0 }}>
                  {item.step}
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: '#333', marginBottom: '4px' }}>{item.title}</div>
                  <div style={{ fontSize: '13px', color: '#666', lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <ApplicationForm title="Laadpark" type="Laadpark Aanvraag" />
        </div>
      </section>
    </div>
  );
}

import React from 'react'
import Link from 'next/link'
import { Breadcrumb } from '@/components/Breadcrumb'
import { PRICING_PLANS } from '@/content/briskala'

export const metadata = {
  title: 'Prijzen',
  description:
    'Transparante prijzen voor Briskala boekhouding: Persoonlijk, Zakelijk en Professioneel — voor particulieren, zzp’ers en bedrijven.',
}

export default function PrijzenPage() {
  return (
    <>
      <Breadcrumb pageTitle="Prijzen" />
      <div style={{ background: '#f7f9fb', minHeight: '60vh', padding: '40px 16px 80px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#1e3a8a', marginBottom: '12px' }}>
              Eenvoudige, transparante prijzen
            </h1>
            <p style={{ fontSize: '16px', color: '#475569', lineHeight: 1.7, maxWidth: '640px', margin: '0 auto' }}>
              Kies het abonnement dat past bij uw administratie. Schaal op wanneer uw bedrijf groeit — zonder verborgen kosten.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px',
              marginBottom: '48px',
            }}
          >
            {PRICING_PLANS.map((plan) => (
              <div
                key={plan.name}
                style={{
                  background: '#fff',
                  border: plan.highlighted ? '2px solid #1a5276' : '1px solid #e2e8f0',
                  borderRadius: '14px',
                  padding: '28px 24px',
                  boxShadow: plan.highlighted ? '0 10px 30px rgba(26,82,118,0.12)' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {plan.highlighted && (
                  <span
                    style={{
                      alignSelf: 'flex-start',
                      background: '#eff6ff',
                      color: '#1a5276',
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      padding: '4px 10px',
                      borderRadius: '999px',
                      marginBottom: '12px',
                    }}
                  >
                    Meest gekozen
                  </span>
                )}
                <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', margin: '0 0 8px' }}>
                  {plan.name}
                </h2>
                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.55, margin: '0 0 18px', minHeight: '44px' }}>
                  {plan.description}
                </p>
                <div style={{ marginBottom: '20px' }}>
                  <span style={{ fontSize: '36px', fontWeight: 800, color: '#1a5276' }}>{plan.price}</span>
                  <span style={{ fontSize: '14px', color: '#64748b' }}>{plan.period}</span>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', flexGrow: 1 }}>
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      style={{
                        fontSize: '14px',
                        color: '#334155',
                        padding: '8px 0',
                        borderBottom: '1px solid #f1f5f9',
                      }}
                    >
                      ✓ {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.name === 'Professioneel' ? '/contact' : '/login'}
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    background: plan.highlighted ? '#1a5276' : '#f8fafc',
                    color: plan.highlighted ? '#fff' : '#1a5276',
                    fontWeight: 700,
                    padding: '12px 16px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    border: plan.highlighted ? 'none' : '1px solid #dbe3ea',
                  }}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          <div
            style={{
              background: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '28px',
              textAlign: 'center',
            }}
          >
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1e3a8a', margin: '0 0 10px' }}>
              Vragen over welk plan bij u past?
            </h2>
            <p style={{ fontSize: '15px', color: '#64748b', margin: '0 0 18px' }}>
              Ons team helpt particulieren, bedrijven en accountants graag bij de juiste keuze.
            </p>
            <Link
              href="/contact"
              style={{
                display: 'inline-block',
                background: '#1a5276',
                color: '#fff',
                fontWeight: 700,
                padding: '12px 20px',
                borderRadius: '8px',
                textDecoration: 'none',
              }}
            >
              Neem contact op
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

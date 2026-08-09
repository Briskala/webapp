import React from 'react'
import Link from 'next/link'
import { Breadcrumb } from '@/components/Breadcrumb'
import { FAQ_ITEMS } from '@/content/briskala'

export const metadata = {
  title: 'Veelgestelde vragen',
  description:
    'Antwoorden over Briskala boekhouding: facturen, btw, security, migratie en voor wie het platform bedoeld is.',
}

export default function FaqPage() {
  return (
    <>
      <Breadcrumb pageTitle="FAQ" />
      <div style={{ background: '#f7f9fb', minHeight: '60vh', padding: '40px 16px 80px' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#1e3a8a', marginBottom: '12px' }}>
            Veelgestelde vragen
          </h1>
          <p style={{ fontSize: '16px', color: '#475569', lineHeight: 1.7, marginBottom: '32px' }}>
            Alles over Briskala als boekhoud- en financieel beheerplatform. Staat uw vraag er niet bij? Neem contact op.
          </p>

          <div style={{ display: 'grid', gap: '14px', marginBottom: '40px' }}>
            {FAQ_ITEMS.map((item) => (
              <details
                key={item.q}
                style={{
                  background: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '18px 20px',
                }}
              >
                <summary
                  style={{
                    cursor: 'pointer',
                    fontWeight: 700,
                    color: '#0f172a',
                    fontSize: '15px',
                    listStyle: 'none',
                  }}
                >
                  {item.q}
                </summary>
                <p style={{ margin: '12px 0 0', fontSize: '14px', color: '#64748b', lineHeight: 1.65 }}>
                  {item.a}
                </p>
              </details>
            ))}
          </div>

          <div
            style={{
              background: '#eff6ff',
              borderRadius: '12px',
              padding: '24px',
              border: '1px solid #dbeafe',
            }}
          >
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1e3a8a', margin: '0 0 8px' }}>
              Meer hulp nodig?
            </h2>
            <p style={{ fontSize: '14px', color: '#475569', margin: '0 0 14px' }}>
              Ons supportteam helpt u graag verder met onboarding, migratie of accountvragen.
            </p>
            <Link href="/contact" style={{ color: '#1a5276', fontWeight: 700, textDecoration: 'none' }}>
              Ga naar contact →
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

import React from 'react'
import Link from 'next/link'
import { Breadcrumb } from '@/components/Breadcrumb'
import { AUDIENCES } from '@/content/briskala'

export const metadata = {
  title: 'Over Ons',
  description:
    'Briskala is een accountingplatform waarmee particulieren, bedrijven en accountants hun financiële administratie zelf beheren.',
}

export default function OverOnsPage() {
  return (
    <>
      <Breadcrumb pageTitle="Over Ons" />
      <div style={{ background: '#f7f9fb', minHeight: '60vh', padding: '40px 16px 80px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#1e3a8a', marginBottom: '16px' }}>
            Over Briskala
          </h1>
          <p style={{ fontSize: '16px', color: '#475569', lineHeight: 1.75, marginBottom: '18px' }}>
            Briskala is een compleet platform voor boekhouding en financieel beheer. Wij geloven dat iedereen — van particulier tot groot bedrijf — grip moet kunnen hebben op facturen, uitgaven, btw en rapporten, zonder onnodige complexiteit.
          </p>
          <p style={{ fontSize: '16px', color: '#475569', lineHeight: 1.75, marginBottom: '32px' }}>
            Ons doel is eenvoudige, betrouwbare financiële administratie: zelf te beheren, met ruimte voor samenwerking met accountants en financiële professionals.
          </p>

          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#1e3a8a', marginBottom: '16px' }}>
            Voor wie we bouwen
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '14px',
              marginBottom: '40px',
            }}
          >
            {AUDIENCES.map((a) => (
              <div
                key={a.title}
                style={{
                  background: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '18px',
                }}
              >
                <h3 style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 8px', color: '#0f172a' }}>
                  {a.title}
                </h3>
                <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: 1.55 }}>{a.description}</p>
              </div>
            ))}
          </div>

          <div
            style={{
              background: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '28px',
            }}
          >
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1e3a8a', margin: '0 0 10px' }}>
              Klaar om kennis te maken?
            </h2>
            <p style={{ fontSize: '15px', color: '#64748b', margin: '0 0 16px' }}>
              Ontdek de functies of plan een gesprek met ons team.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link
                href="/functies"
                style={{
                  background: '#1a5276',
                  color: '#fff',
                  fontWeight: 700,
                  padding: '11px 18px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                }}
              >
                Bekijk functies
              </Link>
              <Link
                href="/contact"
                style={{
                  background: '#f8fafc',
                  color: '#1a5276',
                  fontWeight: 700,
                  padding: '11px 18px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  border: '1px solid #dbe3ea',
                }}
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

import React from 'react'
import Link from 'next/link'
import { Breadcrumb } from '@/components/Breadcrumb'
import { AUDIENCES, FEATURES, BRAND } from '@/content/briskala'

export const metadata = {
  title: 'Functies',
  description: BRAND.metaDescription,
}

export default function FunctiesPage() {
  return (
    <>
      <Breadcrumb pageTitle="Functies" />
      <div style={{ background: '#f7f9fb', minHeight: '60vh', padding: '40px 16px 80px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#1e3a8a', marginBottom: '12px' }}>
            Alles wat u nodig heeft voor boekhouding & financieel beheer
          </h1>
          <p style={{ fontSize: '16px', color: '#475569', lineHeight: 1.7, maxWidth: '760px', marginBottom: '40px' }}>
            Briskala is een compleet accountingplatform. Beheer facturen, uitgaven, inkomsten, documenten, btw en rapporten zelf — afgestemd op particulieren, zzp’ers, mkb, grote organisaties en accountants.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '20px',
              marginBottom: '56px',
            }}
          >
            {FEATURES.map((feature) => (
              <Link
                key={feature.slug}
                href={`/${feature.slug === 'documenten' ? 'uitgaven' : feature.slug}`}
                style={{
                  background: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '24px',
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'block',
                }}
              >
                <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1a5276', margin: '0 0 10px' }}>
                  {feature.title}
                </h2>
                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>{feature.short}</p>
              </Link>
            ))}
          </div>

          <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#1e3a8a', marginBottom: '16px' }}>
            Voor iedere gebruiker
          </h2>
          <p style={{ fontSize: '15px', color: '#64748b', marginBottom: '24px', maxWidth: '700px' }}>
            Eén platform, meerdere rollen — iedereen beheert financiële administratie op de manier die past.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '16px',
              marginBottom: '48px',
            }}
          >
            {AUDIENCES.map((audience) => (
              <div
                key={audience.title}
                style={{
                  background: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '20px',
                }}
              >
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', margin: '0 0 8px' }}>
                  {audience.title}
                </h3>
                <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.55, margin: 0 }}>
                  {audience.description}
                </p>
              </div>
            ))}
          </div>

          <div
            style={{
              background: 'linear-gradient(135deg, #1a5276 0%, #2471a3 100%)',
              borderRadius: '14px',
              padding: '32px 28px',
              color: '#fff',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: 700, margin: '0 0 8px' }}>Klaar om te starten?</h2>
              <p style={{ margin: 0, opacity: 0.92, fontSize: '15px' }}>
                Bekijk de prijzen of maak direct een account aan.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link
                href="/prijzen"
                style={{
                  background: '#fff',
                  color: '#1a5276',
                  fontWeight: 700,
                  padding: '12px 18px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                }}
              >
                Bekijk prijzen
              </Link>
              <Link
                href="/login"
                style={{
                  background: 'transparent',
                  color: '#fff',
                  fontWeight: 700,
                  padding: '12px 18px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  border: '1px solid rgba(255,255,255,0.55)',
                }}
              >
                Account aanmaken
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

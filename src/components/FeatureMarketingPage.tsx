import React from 'react'
import Link from 'next/link'
import { Breadcrumb } from '@/components/Breadcrumb'
import { Sidebar } from '@/components/Sidebar'

type FeatureBlock = {
  title: string
  description: string
}

type Step = {
  title: string
  description: string
}

type FeatureMarketingPageProps = {
  breadcrumb: string
  title: string
  intro: string[]
  blocks: FeatureBlock[]
  stepsTitle?: string
  steps?: Step[]
  ctaTitle?: string
  ctaText?: string
  ctaHref?: string
  ctaLabel?: string
}

export function FeatureMarketingPage({
  breadcrumb,
  title,
  intro,
  blocks,
  stepsTitle = 'Hoe het werkt',
  steps = [],
  ctaTitle = 'Klaar om te starten?',
  ctaText = 'Open Briskala en beheer uw boekhouding en financiën zelf — overzichtelijk en professioneel.',
  ctaHref = '/login',
  ctaLabel = 'Start gratis',
}: FeatureMarketingPageProps) {
  return (
    <>
      <Breadcrumb pageTitle={breadcrumb} />
      <div className="main">
        <div className="content-col">
          <h1
            style={{
              fontSize: '32px',
              fontWeight: 800,
              color: '#1e3a8a',
              marginBottom: '24px',
              letterSpacing: '-0.5px',
            }}
          >
            {title}
          </h1>
          <hr style={{ border: 'none', borderBottom: '1px solid #e2e8f0', margin: '0 0 24px 0' }} />

          <div style={{ marginBottom: '32px' }}>
            {intro.map((paragraph, i) => (
              <p
                key={i}
                style={{
                  fontSize: '15px',
                  color: '#475569',
                  lineHeight: '1.7',
                  marginBottom: i === intro.length - 1 ? 0 : '20px',
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '20px',
              marginBottom: '40px',
            }}
          >
            {blocks.map((block) => (
              <div
                key={block.title}
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '24px',
                }}
              >
                <h3
                  style={{
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#1e3a8a',
                    marginBottom: '10px',
                  }}
                >
                  {block.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                  {block.description}
                </p>
              </div>
            ))}
          </div>

          {steps.length > 0 && (
            <div style={{ marginBottom: '40px' }}>
              <h2
                style={{
                  fontSize: '22px',
                  fontWeight: 700,
                  color: '#1e3a8a',
                  marginBottom: '20px',
                }}
              >
                {stepsTitle}
              </h2>
              <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '16px' }}>
                {steps.map((step, index) => (
                  <li
                    key={step.title}
                    style={{
                      display: 'flex',
                      gap: '16px',
                      alignItems: 'flex-start',
                      background: '#fff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      padding: '18px 20px',
                    }}
                  >
                    <span
                      style={{
                        flexShrink: 0,
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: '#eff6ff',
                        color: '#1e3a8a',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                      }}
                    >
                      {index + 1}
                    </span>
                    <div>
                      <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', margin: '0 0 6px' }}>
                        {step.title}
                      </h3>
                      <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}

          <div
            style={{
              background: 'linear-gradient(135deg, #1a5276 0%, #2471a3 100%)',
              borderRadius: '14px',
              padding: '32px 28px',
              color: '#fff',
              marginBottom: '24px',
            }}
          >
            <h2 style={{ fontSize: '22px', fontWeight: 700, margin: '0 0 10px' }}>{ctaTitle}</h2>
            <p style={{ fontSize: '15px', lineHeight: 1.6, opacity: 0.92, margin: '0 0 20px' }}>{ctaText}</p>
            <Link
              href={ctaHref}
              style={{
                display: 'inline-block',
                background: '#fff',
                color: '#1a5276',
                fontWeight: 700,
                padding: '12px 20px',
                borderRadius: '8px',
                textDecoration: 'none',
              }}
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
        <Sidebar />
      </div>
    </>
  )
}

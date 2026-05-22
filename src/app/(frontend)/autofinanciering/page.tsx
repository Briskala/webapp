import React from 'react'
import { Breadcrumb } from '@/components/Breadcrumb'
import { Sidebar } from '@/components/Sidebar'
import Link from 'next/link'

export const metadata = {
  title: 'Autofinanciering | Briskala Property & Asset Group',
  description: 'Bereken direct uw gepersonaliseerde autofinanciering, financial lease en operational lease. Flexibele, op maat gemaakte financieringsoplossingen.',
}

export const dynamic = 'force-dynamic'

export default async function AutofinancieringPage() {
  return (
    <>
      <Breadcrumb pageTitle="Autofinanciering" />
      <div className="main">
        <div className="content-col">
          {/* Main Title */}
          <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#1e3a8a', marginBottom: '24px', letterSpacing: '-0.5px' }}>
            Autofinanciering
          </h1>
          <hr style={{ border: 'none', borderBottom: '1px solid #e2e8f0', margin: '0 0 24px 0' }} />

          {/* Intro Section styled like woningbouw */}
          <div style={{ marginBottom: '32px' }}>
            <p
              style={{
                fontSize: '15px',
                color: '#475569',
                lineHeight: '1.7',
                marginBottom: '20px',
              }}
            >
              Bij <strong>Briskala Property &amp; Asset Group (BPAG)</strong> begrijpen we dat mobiliteit essentieel is voor uw onderneming of persoonlijk comfort. Of u nu op zoek bent naar een betrouwbare bedrijfswagen voor uw wagenpark of een comfortabele gezinsauto; wij bieden flexibele, op maat gemaakte financieringsoplossingen.
            </p>
            <p
              style={{
                fontSize: '15px',
                color: '#475569',
                lineHeight: '1.7',
              }}
            >
              Onze financieringsexperts begeleiden u bij het maken van de juiste keuze tussen financial lease en consumptieve kredieten. Bekijk hieronder onze belangrijkste financieringsvormen en ontdek onze flexibele opties.
            </p>
          </div>

          {/* 3-Column Card Grid (Financieringsvormen) matching Woningbouw layout */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '20px',
              marginBottom: '40px',
            }}
          >
            {/* Card 1: Financial Lease */}
            <div
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '24px',
                transition: 'all 0.2s ease',
              }}
              className="autofinanciering-premium-card"
            >
              <div
                style={{
                  background: '#eff6ff',
                  width: '44px',
                  height: '44px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#1e3a8a',
                  marginBottom: '16px',
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.875H4.5V21m3.75-9.75h7.5" />
                </svg>
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1e3a8a', marginBottom: '8px' }}>
                Financial Lease (Zakelijk)
              </h3>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6', margin: 0 }}>
                De perfecte oplossing voor ZZP'ers en MKB-ondernemers. U bent direct economisch eigenaar, behoudt uw wendbaarheid en profiteert van fiscale voordelen zoals rente- en investeringsaftrek.
              </p>
            </div>

            {/* Card 2: Operational Lease */}
            <div
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '24px',
                transition: 'all 0.2s ease',
              }}
              className="autofinanciering-premium-card"
            >
              <div
                style={{
                  background: '#eff6ff',
                  width: '44px',
                  height: '44px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#1e3a8a',
                  marginBottom: '16px',
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-.999.43-1.563A6 6 0 1 1 21.75 8.25Z" />
                </svg>
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1e3a8a', marginBottom: '8px' }}>
                Operational Lease (Zorgeloos)
              </h3>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6', margin: 0 }}>
                Volledig ontzorgd zakelijk of privé rijden. Geen omkijken naar onderhoud, reparaties, verzekeringen en wegenbelasting. U betaalt een all-in maandbedrag.
              </p>
            </div>

            {/* Card 3: Particuliere Financiering */}
            <div
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '24px',
                transition: 'all 0.2s ease',
              }}
              className="autofinanciering-premium-card"
            >
              <div
                style={{
                  background: '#f0fdf4',
                  width: '44px',
                  height: '44px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#16a34a',
                  marginBottom: '16px',
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5h16.5m-18 0A1.5 1.5 0 0 1 3.75 3h16.5a1.5 1.5 0 0 1 1.5 1.5m-18 0v11.25A1.5 1.5 0 0 0 3.75 17.25h16.5a1.5 1.5 0 0 0 1.5-1.5V4.5m-15.75 7.5h15m-12.75 3h10.5" />
                </svg>
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1e3a8a', marginBottom: '8px' }}>
                Particuliere Financiering
              </h3>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6', margin: 0 }}>
                Financier uw auto met absolute rust. Met een vaste looptijd, een vast maandbedrag en een helder rentepercentage weet u exact waar u aan toe bent.
              </p>
            </div>
          </div>

          {/* Special Finance Benefit block */}
          <div
            style={{
              background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
              border: '1px solid #bfdbfe',
              borderRadius: '16px',
              padding: '28px',
              marginBottom: '44px',
              boxShadow: '0 4px 12px rgba(30, 58, 138, 0.03)',
            }}
          >
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div
                style={{
                  background: '#1e3a8a',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  flexShrink: 0,
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </div>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#1e3a8a', marginBottom: '8px' }}>
                  Onafhankelijk advies en snelle afhandeling
                </h4>
                <p style={{ fontSize: '13.5px', color: '#1e40af', lineHeight: '1.6', margin: 0 }}>
                  Als onafhankelijke tussenpersoon vergelijken wij de tarieven en voorwaarden van alle toonaangevende financieringsmaatschappijen in Nederland. Hierdoor bent u altijd verzekerd van de laagste rente en gunstigste voorwaarden die perfect aansluiten op uw onderneming of persoonlijke gezinssituatie.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive timeline roadmap */}
          <div style={{ marginBottom: '44px' }}>
            <h2
              style={{
                fontSize: '22px',
                fontWeight: 700,
                color: '#1e3a8a',
                marginBottom: '28px',
                fontFamily: "'Open Sans', sans-serif",
                borderBottom: '2px solid #eff6ff',
                paddingBottom: '8px',
              }}
            >
              Uw autofinanciering in 4 stappen
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative', paddingLeft: '24px' }}>
              {/* Vertical line helper */}
              <div
                style={{
                  position: 'absolute',
                  left: '7px',
                  top: '12px',
                  bottom: '12px',
                  width: '2px',
                  background: '#e2e8f0',
                  zIndex: 1,
                }}
              />

              {/* Step 1 */}
              <div style={{ position: 'relative', zIndex: 2 }} className="timeline-item">
                <div
                  style={{
                    position: 'absolute',
                    left: '-24px',
                    top: '2px',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    backgroundColor: '#1e3a8a',
                    border: '3px solid #ffffff',
                    boxShadow: '0 0 0 1px #e2e8f0',
                  }}
                  className="timeline-dot"
                />
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#1e3a8a', marginBottom: '4px' }}>
                  Stap 1: Voertuig &amp; Budget bepalen
                </h4>
                <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6', margin: 0 }}>
                  U selecteert uw gewenste personenauto of bedrijfswagen bij een dealer of online. Bepaal uw gewenste looptijd, eventuele aanbetaling of slottermijn om het maandbedrag af te stemmen.
                </p>
              </div>

              {/* Step 2 */}
              <div style={{ position: 'relative', zIndex: 2 }} className="timeline-item">
                <div
                  style={{
                    position: 'absolute',
                    left: '-24px',
                    top: '2px',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    backgroundColor: '#1e3a8a',
                    border: '3px solid #ffffff',
                    boxShadow: '0 0 0 1px #e2e8f0',
                  }}
                  className="timeline-dot"
                />
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#1e3a8a', marginBottom: '4px' }}>
                  Stap 2: Vrijblijvende Aanvraag
                </h4>
                <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6', margin: 0 }}>
                  U levert uw gegevens eenvoudig bij ons aan. Voor zakelijke aanvragen ontvangen wij graag uw KvK-nummer en recente jaarcijfers indien beschikbaar.
                </p>
              </div>

              {/* Step 3 */}
              <div style={{ position: 'relative', zIndex: 2 }} className="timeline-item">
                <div
                  style={{
                    position: 'absolute',
                    left: '-24px',
                    top: '2px',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    backgroundColor: '#1e3a8a',
                    border: '3px solid #ffffff',
                    boxShadow: '0 0 0 1px #e2e8f0',
                  }}
                  className="timeline-dot"
                />
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#1e3a8a', marginBottom: '4px' }}>
                  Stap 3: Tarievenvergelijking &amp; Akkoord
                </h4>
                <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6', margin: 0 }}>
                  Onze adviseurs vergelijken direct meerdere kredietaanbieders. Binnen 24 uur ontvangt u een passend voorstel en bij akkoord leggen we dit direct vast.
                </p>
              </div>

              {/* Step 4 */}
              <div style={{ position: 'relative', zIndex: 2 }} className="timeline-item">
                <div
                  style={{
                    position: 'absolute',
                    left: '-24px',
                    top: '2px',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    backgroundColor: '#22c55e',
                    border: '3px solid #ffffff',
                    boxShadow: '0 0 0 1px #e2e8f0',
                  }}
                  className="timeline-dot-active"
                />
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#22c55e', marginBottom: '4px' }}>
                  Stap 4: Direct Wegrijden
                </h4>
                <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6', margin: 0 }}>
                  Na ondertekening en overboeking van de gelden aan de leverancier is de financiering afgerond. U kunt de sleutels in ontvangst nemen en direct op weg!
                </p>
              </div>
            </div>
          </div>

          {/* Premium Call to Action */}
          <div
            style={{
              background: 'linear-gradient(135deg, #1e3a8a 0%, #1e1b4b 100%)',
              borderRadius: '16px',
              padding: '36px',
              textAlign: 'center',
              color: '#ffffff',
              boxShadow: '0 8px 24px rgba(30, 58, 138, 0.15)',
            }}
          >
            <h3
              style={{
                fontSize: '22px',
                fontWeight: 700,
                marginBottom: '12px',
                fontFamily: "'Open Sans', sans-serif",
              }}
            >
              Direct een financieringsvoorstel aanvragen?
            </h3>
            <p
              style={{
                fontSize: '14px',
                color: '#cbd5e1',
                lineHeight: '1.6',
                maxWidth: '540px',
                margin: '0 auto 24px',
              }}
            >
              Heeft u al een specifiek voertuig op het oog of wilt u vooraf weten wat uw maximale leasewaarde is? Neem vandaag nog contact met ons op voor een onafhankelijk advies.
            </p>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                href="/contact"
                style={{
                  backgroundColor: '#ffffff',
                  color: '#1e3a8a',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: 700,
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
                className="woningbouw-btn-primary"
              >
                Plan adviesgesprek &rarr;
              </Link>
              <a
                href="tel:+310000000"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: 600,
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  transition: 'all 0.2s ease',
                }}
                className="woningbouw-btn-secondary"
              >
                Bellen met expert
              </a>
            </div>
          </div>
        </div>
        <Sidebar />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .autofinanciering-premium-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(0,0,0,0.04);
          background-color: #ffffff !important;
          border-color: #cbd5e1 !important;
        }
        .woningbouw-btn-primary:hover {
          background-color: #f8fafc !important;
          transform: translateY(-1px);
        }
        .woningbouw-btn-secondary:hover {
          background-color: rgba(255, 255, 255, 0.15) !important;
        }
        .timeline-item:hover .timeline-dot {
          background-color: #3b82f6 !important;
          transform: scale(1.1);
        }
      `}} />
    </>
  )
}

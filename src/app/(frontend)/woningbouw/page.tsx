import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { Breadcrumb } from '@/components/Breadcrumb'
import { Sidebar } from '@/components/Sidebar'
import Link from 'next/link'

export const metadata = {
  title: 'Woningbouw Advies & Realisatie — Briskala',
  description: 'Duurzaam bouwen, renovatie en projectontwikkeling van A tot Z. Vrijblijvend advies en gecertificeerd BENG-bouwprocesbegeleiding.',
}

export const dynamic = 'force-dynamic'

export default async function WoningbouwPage() {
  const payload = await getPayload({ config: await configPromise })

  // Try to load dynamic info from CMS page if defined
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'woningbouw' } },
  })

  const page = docs[0]

  return (
    <>
      <Breadcrumb pageTitle="Woningbouw" />
      <div className="main">
        <div className="content-col">
          {/* Main Title matching olietanken */}
          <h1
            style={{
              fontSize: '32px',
              fontWeight: 800,
              color: '#1e3a8a',
              marginBottom: '24px',
              letterSpacing: '-0.5px',
            }}
          >
            {page?.title || 'Woningbouw Advies & Realisatie'}
          </h1>
          <hr style={{ border: 'none', borderBottom: '1px solid #e2e8f0', margin: '0 0 24px 0' }} />

          {/* Intro Section */}
          <div style={{ marginBottom: '32px' }}>
            <p
              style={{
                fontSize: '15px',
                color: '#475569',
                lineHeight: '1.7',
                marginBottom: '20px',
              }}
            >
              Bij <strong>Briskala Property & Asset Group (BPAG)</strong> geloven we dat een huis meer is dan stenen alone. Het is een veilige thuishaven, een slimme investering en een bijdrage aan een duurzamere toekomst. Wij begeleiden particulieren, projectontwikkelaars en corporaties van de eerste schets tot de definitieve sleuteloverdracht.
            </p>
            <p
              style={{
                fontSize: '15px',
                color: '#475569',
                lineHeight: '1.7',
              }}
            >
              Onze gecertificeerde experts combineren architectonische esthetiek met hoogwaardige bouwkwaliteit en de nieuwste energienormen (BENG). Bekijk hieronder onze expertises en ons gestructureerde stappenplan.
            </p>
          </div>

          {/* 3-Column Card Grid (Expertises) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '20px',
              marginBottom: '40px',
            }}
          >
            {/* Card 1 */}
            <div
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '24px',
                transition: 'all 0.2s ease',
              }}
              className="woningbouw-card"
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
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1e3a8a', marginBottom: '8px' }}>
                Nieuwbouw &amp; Renovatie
              </h3>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6', margin: 0 }}>
                Van luxe villabouw tot grootschalige renovatieprojecten. Wij garanderen een perfecte balans tussen moderne architectuur en ambachtelijke bouwkwaliteit.
              </p>
            </div>

            {/* Card 2 */}
            <div
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '24px',
                transition: 'all 0.2s ease',
              }}
              className="woningbouw-card"
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
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                </svg>
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1e3a8a', marginBottom: '8px' }}>
                Projectontwikkeling
              </h3>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6', margin: 0 }}>
                Strategische locatie- en haalbaarheidsanalyses, omgevingsplannen en het coördineren van alle disciplines voor een rendabel verloop van uw project.
              </p>
            </div>

            {/* Card 3 */}
            <div
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '24px',
                transition: 'all 0.2s ease',
              }}
              className="woningbouw-card"
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
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m0-18 4 4m-4-4L8 7m4 14H4.125C3.504 21 3 20.496 3 19.875V15a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 15v4.875c0 .621-.504 1.125-1.125 1.125H12Z" />
                </svg>
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1e3a8a', marginBottom: '8px' }}>
                Duurzaam Bouwen (BENG)
              </h3>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6', margin: 0 }}>
                Wij bouwen volledig conform de nieuwste regelgeving voor Bijna Energieneutrale Gebouwen. Optimaal geïsoleerd, gasloos en voorzien van smart energy systemen.
              </p>
            </div>
          </div>

          {/* Special BENG block */}
          <div
            style={{
              background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
              border: '1px solid #bbf7d0',
              borderRadius: '16px',
              padding: '28px',
              marginBottom: '44px',
              boxShadow: '0 4px 12px rgba(22, 163, 74, 0.03)',
            }}
          >
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div
                style={{
                  background: '#16a34a',
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
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#14532d', marginBottom: '8px' }}>
                  Toekomstbestendig bouwen volgens de BENG-normen
                </h4>
                <p style={{ fontSize: '13.5px', color: '#166534', lineHeight: '1.6', margin: 0 }}>
                  Vanaf 2021 moeten alle nieuwe woningen in Nederland voldoen aan de eisen voor Bijna Energieneutrale Gebouwen (BENG). Wij integreren geavanceerde warmtepompen, PVT-zonnecollectoren, uitgekiende WTW-ventilatie en drievoudige beglazing (HR+++) direct in het basisontwerp. Dit garandeert een lage energierekening en een uitstekend binnenklimaat.
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
              Uw bouwtraject in 4 stappen
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
                  Stap 1: Concept &amp; Ontwerp
                </h4>
                <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6', margin: 0 }}>
                  We vertalen uw ideeën en wensen naar de eerste architectonische schetsen. Hierbij voeren we direct een haalbaarheidstoets uit en bekijken we de bestemmingsplanmogelijkheden.
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
                  Stap 2: Omgevingsvergunning
                </h4>
                <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6', margin: 0 }}>
                  Wij bereiden de volledige aanvraag voor de omgevingsvergunning (bouwvergunning) voor. Dit omvat alle constructieberekeningen, ventilatieberekeningen en de officiële BENG-berekening.
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
                  Stap 3: Calculatie &amp; Bouwvoorbereiding
                </h4>
                <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6', margin: 0 }}>
                  Na goedkeuring stellen we een sluitende, transparante begroting op. Materialen worden geselecteerd en we maken een strakke planning voor de realisatiefase. Geen verrassingen achteraf.
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
                  Stap 4: Sleutelklare Oplevering
                </h4>
                <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6', margin: 0 }}>
                  De bouw start onder toezicht van onze ervaren projectleiders. Na de eindinspectie en de officiële certificering overhandigen we u de sleutels van uw droomwoning.
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
              Vrijblijvend adviesgesprek inplannen?
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
              Heeft u bouwplannen of bezit u een kavel? Onze experts staan u graag te woord om de mogelijkheden te bespreken en een eerste haalbaarheidstoets te doen.
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

        {/* Global Sidebar component */}
        <Sidebar />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .woningbouw-card:hover {
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

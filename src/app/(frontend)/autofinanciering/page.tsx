import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { Breadcrumb } from '@/components/Breadcrumb'
import ShowroomClient from './ShowroomClient'
import { Sidebar } from '@/components/Sidebar'

export const metadata = {
  title: 'Digitale Showroom & Autofinanciering | Briskala Property & Asset Group',
  description: 'Ontdek ons ruime aanbod van voertuigen en bereken direct uw gepersonaliseerde autofinanciering en financial lease.',
}

export const dynamic = 'force-dynamic'

export default async function AutofinancieringPage() {
  const payload = await getPayload({ config: await configPromise })
  const { docs } = await payload.find({
    collection: 'vehicles',
    limit: 50,
  })

  // Convert payload docs to serializable array
  const initialVehicles = docs ? JSON.parse(JSON.stringify(docs)) : []

  return (
    <>
      <Breadcrumb pageTitle="Autofinanciering" />
      <div className="main">
        <div className="content-col">
          {/* Main Title */}
          <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#1e3a8a', marginBottom: '24px', letterSpacing: '-0.5px' }}>
            Autofinanciering &amp; Digitale Showroom
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
              Onze financieringsexperts begeleiden u bij het maken van de juiste keuze tussen financial lease en consumptieve kredieten. Bekijk hieronder onze belangrijkste financieringsvormen en ontdek aansluitend onze actuele digitale showroom.
            </p>
          </div>

          {/* 2-Column Card Grid (Expertises) styled like woningbouw */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
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
                De perfecte oplossing voor ZZP'ers en MKB-ondernemers. U bent direct economisch eigenaar van het voertuig, behoudt uw liquiditeit en profiteert van aantrekkelijke fiscale voordelen zoals rente- en investeringsaftrek.
              </p>
            </div>

            {/* Card 2: Particuliere Financiering */}
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
                Financier uw nieuwe of gebruikte auto als particulier met volledige transparantie. Met een vaste looptijd, een vast maandbedrag en een helder rentepercentage weet u exact waar u aan toe bent gedurende de gehele rit.
              </p>
            </div>
          </div>

          {/* Showroom Header */}
          <h2
            style={{
              fontSize: '22px',
              fontWeight: 700,
              color: '#1e3a8a',
              marginBottom: '20px',
              fontFamily: "'Open Sans', sans-serif",
              borderBottom: '2px solid #eff6ff',
              paddingBottom: '8px',
            }}
          >
            Onze Actuele Digitale Showroom
          </h2>

          <ShowroomClient initialVehicles={initialVehicles} />
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
      `}} />
    </>
  )
}

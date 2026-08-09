import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Breadcrumb } from '@/components/Breadcrumb'
import { Sidebar } from '@/components/Sidebar'
import { RichText } from '@/components/RichText'

export const metadata = {
  title: 'Algemene Voorwaarden — Briskala',
  description: 'Algemene Voorwaarden van Briskala, het platform voor boekhouding en financieel beheer.',
}

export const dynamic = 'force-dynamic'

export default async function TermsAndConditionsPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const legalGlobal = await payload.findGlobal({ slug: 'legal-texts' })

  const termsContent = legalGlobal?.termsAndConditions

  return (
    <>
      <Breadcrumb pageTitle="Algemene Voorwaarden" />
      <div className="main">
        <div className="content-col">
          {/* Page Title */}
          <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#1e3a8a', marginBottom: '24px', letterSpacing: '-0.5px' }}>
            Algemene Voorwaarden
          </h1>
          <hr style={{ border: 'none', borderBottom: '1px solid #e2e8f0', margin: '0 0 24px 0' }} />

          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
            {termsContent ? (
              <RichText content={termsContent} />
            ) : (
              <div style={{ color: '#475569', fontSize: '14px', lineHeight: '1.75' }}>
                <p><strong>Laatst bijgewerkt: 21 mei 2026</strong></p>
                <p>
                  Welkom bij Briskala, het platform voor boekhouding en financieel beheer. Deze Algemene Voorwaarden zijn van toepassing op alle diensten, abonnementen en functionaliteiten van Briskala. Door onze website of het platform te gebruiken, gaat u akkoord met deze voorwaarden.
                </p>

                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1a3a5c', margin: '24px 0 12px 0' }}>1. Definities</h3>
                <p>
                  In deze voorwaarden wordt verstaan onder:
                </p>
                <ul style={{ paddingLeft: '20px', margin: '12px 0' }}>
                  <li><strong>Platform:</strong> De Briskala-software voor boekhouding, facturen, uitgaven, btw en financiële rapportages.</li>
                  <li><strong>Gebruiker:</strong> De natuurlijke of rechtspersoon die de website bezoekt of het platform gebruikt.</li>
                  <li><strong>Overeenkomst:</strong> Elke afspraak tussen Briskala en gebruiker tot het leveren van diensten of abonnementen.</li>
                </ul>

                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1a3a5c', margin: '24px 0 12px 0' }}>2. Gebruik van het platform</h3>
                <p>
                  U bent zelf verantwoordelijk voor de juistheid van de financiële gegevens die u in Briskala vastlegt. Rapportages, btw-overzichten en berekeningen zijn hulpmiddelen en vormen geen bindend fiscaal advies, tenzij schriftelijk anders overeengekomen.
                </p>

                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1a3a5c', margin: '24px 0 12px 0' }}>3. Aansprakelijkheid</h3>
                <p>
                  Briskala spant zich in om de website en het platform zo actueel, veilig en accuraat mogelijk te houden. Wij zijn echter niet aansprakelijk voor eventuele directe of indirecte schade die ontstaat door het gebruik van (of het vertrouwen op) onvolledige of onjuiste informatie, behoudens dwingendrechtelijke bepalingen.
                </p>

                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1a3a5c', margin: '24px 0 12px 0' }}>4. Intellectueel Eigendom</h3>
                <p>
                  Alle inhoud op deze website en in het platform, inclusief teksten, logo&apos;s, illustraties en software, zijn intellectueel eigendom van Briskala of haar licentiegevers en mogen niet zonder voorafgaande toestemming worden gekopieerd of verspreid.
                </p>
              </div>
            )}
          </div>
        </div>
        <Sidebar />
      </div>
    </>
  )
}

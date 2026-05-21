import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Breadcrumb } from '@/components/Breadcrumb'
import { Sidebar } from '@/components/Sidebar'
import { RichText } from '@/components/RichText'

export const metadata = {
  title: 'Privacy Policy — Briskala',
  description: 'Privacy Policy en gegevensbescherming van Briskala Property & Asset Group.',
}

export const dynamic = 'force-dynamic'

export default async function PrivacyPolicyPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const legalGlobal = await payload.findGlobal({ slug: 'legal-texts' })

  const privacyContent = legalGlobal?.privacyPolicy

  return (
    <>
      <Breadcrumb pageTitle="Privacy Policy" />
      <div className="main">
        <div className="content-col">
          {/* Page Title */}
          <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#1e3a8a', marginBottom: '24px', letterSpacing: '-0.5px' }}>
            Privacy Policy
          </h1>
          <hr style={{ border: 'none', borderBottom: '1px solid #e2e8f0', margin: '0 0 24px 0' }} />

          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
            {privacyContent ? (
              <RichText content={privacyContent} />
            ) : (
              <div style={{ color: '#475569', fontSize: '14px', lineHeight: '1.75' }}>
                <p><strong>Laatst bijgewerkt: 21 mei 2026</strong></p>
                <p>
                  Briskala Property &amp; Asset Group ("Briskala", "wij", "ons" of "onze") hecht grote waarde aan de bescherming van uw persoonsgegevens. In deze Privacy Policy leggen wij uit welke gegevens wij verzamelen, hoe wij deze gebruiken en wat uw rechten zijn.
                </p>
                
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1a3a5c', margin: '24px 0 12px 0' }}>1. Welke gegevens verzamelen wij?</h3>
                <p>
                  Wanneer u gebruik maakt van onze website of diensten (zoals het aanvragen van een stookolietank-advies of een autofinanciering), kunnen wij de volgende persoonsgegevens verzamelen:
                </p>
                <ul style={{ paddingLeft: '20px', margin: '12px 0' }}>
                  <li>Naam, voornaam en contactgegevens (e-mailadres, telefoonnummer).</li>
                  <li>Informatie met betrekking tot uw aanvraag (voertuigkeuze, financieringsvoorkeuren, tankcapaciteit).</li>
                  <li>IP-adres en browsergegevens via cookies.</li>
                </ul>

                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1a3a5c', margin: '24px 0 12px 0' }}>2. Hoe gebruiken wij uw gegevens?</h3>
                <p>
                  Wij gebruiken de verzamelde persoonsgegevens voor de volgende doeleinden:
                </p>
                <ul style={{ paddingLeft: '20px', margin: '12px 0' }}>
                  <li>Het verwerken en beantwoorden van uw advies- of financieringsaanvragen.</li>
                  <li>Het onderhouden van contact en het verlenen van support.</li>
                  <li>Het verbeteren van onze website en dienstverlening.</li>
                  <li>Voldoen aan wettelijke verplichtingen.</li>
                </ul>

                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1a3a5c', margin: '24px 0 12px 0' }}>3. Gegevensdeling met derden</h3>
                <p>
                  Wij verkopen uw persoonsgegevens niet aan derden. Wij delen uw gegevens uitsluitend met vertrouwde partners indien dit noodzakelijk is voor de uitvoering van onze dienstverlening (bijvoorbeeld financieringspartners voor lease-aanvragen) of om te voldoen aan wettelijke verplichtingen.
                </p>

                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1a3a5c', margin: '24px 0 12px 0' }}>4. Uw rechten</h3>
                <p>
                  U heeft het recht om uw persoonsgegevens in te zien, te corrigeren, te laten verwijderen of de verwerking ervan te beperken. Neem hiervoor eenvoudig contact met ons op via onze <a href="/contact" style={{ color: '#2471a3', textDecoration: 'underline', fontWeight: 600 }}>contactpagina</a>.
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

import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Breadcrumb } from '@/components/Breadcrumb'
import { Sidebar } from '@/components/Sidebar'
import { RichText } from '@/components/RichText'

export const metadata = {
  title: 'Cookiebeleid — Briskala',
  description: 'Cookiebeleid en cookie-instellingen van Briskala.',
}

export const dynamic = 'force-dynamic'

export default async function CookiebeleidPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const legalGlobal = await payload.findGlobal({ slug: 'legal-texts' })

  const cookieContent = legalGlobal?.cookiePolicy

  return (
    <>
      <Breadcrumb pageTitle="Cookiebeleid" />
      <div className="main">
        <div className="content-col">
          {/* Page Title */}
          <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#1e3a8a', marginBottom: '24px', letterSpacing: '-0.5px' }}>
            Cookiebeleid
          </h1>
          <hr style={{ border: 'none', borderBottom: '1px solid #e2e8f0', margin: '0 0 24px 0' }} />

          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
            {cookieContent ? (
              <RichText content={cookieContent} />
            ) : (
              <div style={{ color: '#475569', fontSize: '14px', lineHeight: '1.75' }}>
                <p><strong>Laatst bijgewerkt: 21 mei 2026</strong></p>
                <p>
                  Briskala maakt gebruik van cookies en vergelijkbare technologieën op haar website en platform. In dit Cookiebeleid leggen wij uit wat cookies zijn, welke cookies wij gebruiken en hoe u uw cookie-instellingen kunt beheren.
                </p>

                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1a3a5c', margin: '24px 0 12px 0' }}>1. Wat zijn cookies?</h3>
                <p>
                  Cookies zijn kleine tekstbestanden die op uw computer, tablet of smartphone worden opgeslagen wanneer u een website bezoekt. Ze helpen ons om de website correct te laten functioneren, uw gebruikservaring te verbeteren en analyses uit te voeren over het verkeer op onze website.
                </p>

                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1a3a5c', margin: '24px 0 12px 0' }}>2. Soorten cookies die wij gebruiken</h3>
                <p>
                  Wij gebruiken verschillende categorieën cookies voor uiteenlopende doeleinden:
                </p>
                <ul style={{ paddingLeft: '20px', margin: '12px 0' }}>
                  <li><strong>Functionele cookies:</strong> Deze zijn essentieel voor de werking van onze website. Ze onthouden bijvoorbeeld uw inloggegevens of de status van uw lopende berekeningen.</li>
                  <li><strong>Analytische cookies:</strong> Wij gebruiken deze cookies (bijvoorbeeld Google Analytics) om geanonimiseerde statistieken over websitebezoeken te verzamelen. Dit helpt ons te begrijpen welke pagina's populair zijn en waar we de website kunnen verbeteren.</li>
                  <li><strong>Marketing cookies:</strong> Deze cookies kunnen worden gebruikt om relevante advertenties te tonen op basis van uw interesses.</li>
                </ul>

                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1a3a5c', margin: '24px 0 12px 0' }}>3. Hoe kunt u cookies beheren of verwijderen?</h3>
                <p>
                  U kunt uw browser zo instellen dat cookies worden geweigerd of dat u een waarschuwing krijgt wanneer er cookies worden verzonden. Daarnaast kunt u reeds geplaatste cookies te allen tijde handmatig verwijderen via de instellingen van uw browser. Let op: als u cookies weigert of verwijdert, kan het zijn dat sommige delen van onze website niet optimaal functioneren.
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

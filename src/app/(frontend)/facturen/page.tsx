import React from 'react'
import { FeatureMarketingPage } from '@/components/FeatureMarketingPage'

export const metadata = {
  title: 'Facturen',
  description:
    'Maak, verstuur en volg facturen met Briskala. Professionele facturatie voor zzp’ers, mkb en grotere organisaties.',
}

export default function FacturenPage() {
  return (
    <FeatureMarketingPage
      breadcrumb="Facturen"
      title="Facturen & inkomstenbeheer"
      intro={[
        'Met Briskala maakt u professionele facturen in enkele minuten, verstuurt u ze digitaal naar klanten en volgt u openstaande bedragen tot betaling. Ideaal voor zzp’ers, freelancers, mkb én finance-teams die hun inkomsten zelf willen beheren.',
        'Van offertes tot herinneringen: alles zit in één duidelijk facturatieproces, gekoppeld aan uw boekhouding en btw-administratie.',
      ]}
      blocks={[
        {
          title: 'Professionele facturen',
          description: 'Maak nette facturen met uw huisstijl, btw-regels en betalingsvoorwaarden.',
        },
        {
          title: 'Betalingen volgen',
          description: 'Zie direct welke facturen openstaan, deels betaald of volledig voldaan zijn.',
        },
        {
          title: 'Automatische herinneringen',
          description: 'Stuur vriendelijke herinneringen bij late betalingen zonder handmatig werk.',
        },
        {
          title: 'Koppeling met boekhouding',
          description: 'Facturen landen automatisch in uw administratie en rapportages.',
        },
      ]}
      steps={[
        {
          title: 'Maak een factuur',
          description: 'Voeg klant, regels, btw en vervaldatum toe — of start vanuit een offerte.',
        },
        {
          title: 'Verstuur digitaal',
          description: 'Stuur de factuur per e-mail of deel een beveiligde betaallink.',
        },
        {
          title: 'Volg tot betaling',
          description: 'Houd status bij, stuur herinneringen en boekt inkomsten automatisch.',
        },
      ]}
      ctaTitle="Start met factureren"
      ctaText="Maak uw eerste factuur in Briskala en houd inkomsten overzichtelijk bij."
      ctaHref="/login"
      ctaLabel="Account aanmaken"
    />
  )
}

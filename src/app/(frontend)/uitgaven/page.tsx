import React from 'react'
import { FeatureMarketingPage } from '@/components/FeatureMarketingPage'

export const metadata = {
  title: 'Uitgaven',
  description:
    'Registreer uitgaven, upload bonnen en categoriseer kosten met Briskala — overzichtelijk voor particulieren en bedrijven.',
}

export default function UitgavenPage() {
  return (
    <FeatureMarketingPage
      breadcrumb="Uitgaven"
      title="Uitgaven, bonnen & kostenbeheer"
      intro={[
        'Briskala helpt u alle uitgaven centraal te registreren: van dagelijkse bonnetjes tot leveranciersfacturen. Upload documenten, categoriseer kosten en houd cashflow onder controle.',
        'Of u nu particulier, zzp’er of finance-team bent — u beheert uw uitgaven zelf, zonder losse spreadsheets.',
      ]}
      blocks={[
        {
          title: 'Bonnen uploaden',
          description: 'Fotografeer of upload bonnen en bewaar ze veilig bij de juiste uitgave.',
        },
        {
          title: 'Categorieën & projecten',
          description: 'Verdeel kosten over categorieën, kostenplaatsen of projecten.',
        },
        {
          title: 'Goedkeuringsworkflows',
          description: 'Voor teams: laat uitgaven controleren en goedkeuren voordat ze geboekt worden.',
        },
        {
          title: 'Inzicht in cashflow',
          description: 'Zie direct waar geld naartoe gaat en welke kosten oplopen.',
        },
      ]}
      steps={[
        {
          title: 'Registreer een uitgave',
          description: 'Vul bedrag, leverancier, datum en btw in — of importeer vanuit bank.',
        },
        {
          title: 'Voeg bewijs toe',
          description: 'Upload de bon of factuur zodat uw administratie audit-proof blijft.',
        },
        {
          title: 'Boek & rapporteer',
          description: 'Kosten landen in de boekhouding en verschijnen in financiële overzichten.',
        },
      ]}
      ctaTitle="Houd uitgaven onder controle"
      ctaText="Begin vandaag met het digitaal beheren van bonnen, kosten en cashflow."
    />
  )
}

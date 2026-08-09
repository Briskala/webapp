import React from 'react'
import { FeatureMarketingPage } from '@/components/FeatureMarketingPage'

export const metadata = {
  title: 'Boekhouding',
  description:
    'Beheer uw boekhouding zelf met Briskala: automatische boekingen, overzichtelijke administratie en samenwerking met accountants.',
}

export default function BoekhoudingPage() {
  return (
    <FeatureMarketingPage
      breadcrumb="Boekhouding"
      title="Boekhouding die u zelf beheert"
      intro={[
        'Briskala is gebouwd om boekhouding begrijpelijk te maken — zonder de controle uit handen te geven. Particularen, zzp’ers en bedrijven voeren hun administratie zelf, terwijl accountants desgewenst meekijken.',
        'Facturen, uitgaven en bankbewegingen komen samen in één heldere boekhoudworkflow, klaar voor rapportage en fiscale aangiften.',
      ]}
      blocks={[
        {
          title: 'Automatische boekingen',
          description: 'Koppel inkomsten en uitgaven aan de juiste grootboekrekeningen.',
        },
        {
          title: 'Dagelijkse administratie',
          description: 'Werk bij wanneer het u uitkomt — geen achterstand meer aan het kwartaal.',
        },
        {
          title: 'Samenwerken met accountants',
          description: 'Deel dossiers veilig met uw boekhouder of financieel adviseur.',
        },
        {
          title: 'Controle & audit trail',
          description: 'Houd wijzigingen bij en blijf compliant bij controles.',
        },
      ]}
      steps={[
        {
          title: 'Koppel uw gegevens',
          description: 'Start met facturen, uitgaven of een import vanuit een ander pakket.',
        },
        {
          title: 'Boek automatisch',
          description: 'Briskala stelt boekingen voor die u eenvoudig bevestigt of aanpast.',
        },
        {
          title: 'Sluit periodes af',
          description: 'Rond maanden of kwartalen af met overzichtelijke checklists.',
        },
      ]}
      ctaTitle="Neem uw boekhouding in eigen hand"
      ctaText="Ontdek hoe Briskala financiële administratie eenvoudiger maakt voor elk type gebruiker."
      ctaHref="/prijzen"
      ctaLabel="Bekijk abonnementen"
    />
  )
}

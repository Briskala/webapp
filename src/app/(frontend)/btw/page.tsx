import React from 'react'
import { FeatureMarketingPage } from '@/components/FeatureMarketingPage'

export const metadata = {
  title: 'Btw & belastingen',
  description:
    'Bereid btw-aangiften voor en beheer fiscale administratie met Briskala — helder voor zzp’ers en bedrijven.',
}

export default function BtwPage() {
  return (
    <FeatureMarketingPage
      breadcrumb="Btw & belastingen"
      title="Btw- en belastingadministratie"
      intro={[
        'Met Briskala houdt u btw en fiscale verplichtingen onder controle. Het platform berekent btw op facturen en uitgaven, maakt overzichten klaar voor aangifte en helpt deadlines te bewaken.',
        'Zo blijft uw belastingadministratie actueel — of u nu zelfstandige bent of een finance-afdeling aanstuurt.',
      ]}
      blocks={[
        {
          title: 'Btw-berekening',
          description: 'Automatische btw op inkomsten en kosten volgens uw instellingen.',
        },
        {
          title: 'Aangiftevoorbereiding',
          description: 'Genereer overzichten die u of uw accountant direct kunt gebruiken.',
        },
        {
          title: 'Termijnen & reminders',
          description: 'Mis geen aangiftedatum dankzij duidelijke herinneringen.',
        },
        {
          title: 'Fiscale documentatie',
          description: 'Bewaar bewijsstukken en rapporten bij de juiste periode.',
        },
      ]}
      steps={[
        {
          title: 'Stel btw-regels in',
          description: 'Configureer tarieven en landinstellingen voor uw administratie.',
        },
        {
          title: 'Boek doorlopend',
          description: 'Facturen en uitgaven vullen automatisch uw btw-overzicht.',
        },
        {
          title: 'Bereid aangifte voor',
          description: 'Exporteer of deel het overzicht met uw accountant.',
        },
      ]}
      ctaTitle="Houd btw onder controle"
      ctaText="Laat Briskala uw fiscale administratie structureren — zonder stress rondom aangiften."
    />
  )
}

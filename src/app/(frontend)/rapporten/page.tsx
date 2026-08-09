import React from 'react'
import { FeatureMarketingPage } from '@/components/FeatureMarketingPage'

export const metadata = {
  title: 'Rapporten',
  description:
    'Financiële rapporten en inzichten met Briskala: winst & verlies, cashflow, KPI’s en export voor stakeholders.',
}

export default function RapportenPage() {
  return (
    <FeatureMarketingPage
      breadcrumb="Rapporten"
      title="Financiële rapporten & inzichten"
      intro={[
        'Briskala vertaalt uw boekhouding naar heldere rapporten: winst en verlies, balansen, cashflow en operationele KPI’s. Zo neemt u betere beslissingen — als particulier, ondernemer of financieel professional.',
        'Exporteer overzichten voor banken, investeerders of accountants, of bekijk trends direct in het dashboard.',
      ]}
      blocks={[
        {
          title: 'Winst & verlies',
          description: 'Zie inkomsten, kosten en resultaat per periode in één oogopslag.',
        },
        {
          title: 'Cashflow-inzicht',
          description: 'Volg liquiditeit en voorkom verrassingen in uw werkkapitaal.',
        },
        {
          title: 'KPI-dashboards',
          description: 'Volg omzet, openstaande posten, marges en meer.',
        },
        {
          title: 'Export & delen',
          description: 'Deel rapporten veilig met collega’s, accountants of stakeholders.',
        },
      ]}
      steps={[
        {
          title: 'Kies een periode',
          description: 'Selecteer maand, kwartaal of custom bereik.',
        },
        {
          title: 'Analyseer trends',
          description: 'Vergelijk periodes en spot afwijkingen vroegtijdig.',
        },
        {
          title: 'Exporteer of deel',
          description: 'Download PDF/Excel of geef toegang aan uw adviseur.',
        },
      ]}
      ctaTitle="Krijg grip op uw cijfers"
      ctaText="Ontdek financiële inzichten die u helpen beter te sturen — elke dag."
      ctaHref="/login"
      ctaLabel="Open dashboard"
    />
  )
}

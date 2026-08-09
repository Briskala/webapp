import React from 'react';
import { getPayload } from 'payload';
import config from '@/payload.config';
import { AccordionClient } from './AccordionClient';

export async function Accordion() {
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });

  const section = await payload.findGlobal({
    slug: 'diensten-section',
  });

  const items = section?.items || [];

  const fallbackItems = [
    {
      id: '1',
      title: 'Facturen & inkomsten',
      enabled: true,
      defaultOpen: true,
      links: [
        { id: '1a', label: 'Facturen maken en versturen', url: '/facturen' },
        { id: '1b', label: 'Openstaande betalingen volgen', url: '/facturen#betalingen' },
        { id: '1c', label: 'Herinneringen automatiseren', url: '/facturen#herinneringen' },
      ],
    },
    {
      id: '2',
      title: 'Uitgaven & documenten',
      enabled: true,
      defaultOpen: false,
      links: [
        { id: '2a', label: 'Uitgaven registreren', url: '/uitgaven' },
        { id: '2b', label: 'Bonnen en documenten uploaden', url: '/uitgaven#bonnen' },
        { id: '2c', label: 'Documentenarchief', url: '/functies#documenten' },
      ],
    },
    {
      id: '3',
      title: 'Boekhouding, btw & rapporten',
      enabled: true,
      defaultOpen: false,
      links: [
        { id: '3a', label: 'Boekhouding beheren', url: '/boekhouding' },
        { id: '3b', label: 'Btw-administratie', url: '/btw' },
        { id: '3c', label: 'Financiële rapporten', url: '/rapporten' },
      ],
    },
  ];

  const resolvedItems = items.length > 0 ? items : fallbackItems;

  return <AccordionClient items={resolvedItems} />;
}

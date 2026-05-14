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

  // Fallback hardcoded data when CMS is empty
  const fallbackItems = [
    {
      id: '1',
      title: 'Nota Fiscal Paulista (NFP)',
      enabled: true,
      defaultOpen: true,
      links: [
        { id: '1a', label: 'Sobre a Nota Fiscal Paulista', url: '#' },
        { id: '1b', label: 'Acesso a consultas on-line', url: '#' },
        { id: '1c', label: 'A quem ele se destina', url: '#' },
      ],
    },
    {
      id: '2',
      title: 'Nota Fiscal Electrónica (NFE)',
      enabled: true,
      defaultOpen: false,
      links: [
        { id: '2a', label: 'Sobre a Nota Fiscal Eletrônica', url: '#' },
        { id: '2b', label: 'Acesso ao sistema', url: '#' },
      ],
    },
    {
      id: '3',
      title: 'Vehiculos (IPVA)',
      enabled: true,
      defaultOpen: false,
      links: [{ id: '3a', label: 'Consulta IPVA', url: '#' }],
    },
  ];

  const resolvedItems = items.length > 0 ? items : fallbackItems;

  return <AccordionClient items={resolvedItems} />;
}


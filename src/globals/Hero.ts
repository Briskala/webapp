import type { GlobalConfig } from 'payload'

export const Hero: GlobalConfig = {
  slug: 'hero-section',
  label: 'Hero Sectie (Homepage)',
  admin: {
    group: 'Website Instellingen',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Hoofdtitel',
      defaultValue: 'Ontdek, Beleef en Geniet.',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Ondertitel',
      defaultValue:
        'Van essentiële lokale diensten en buurtnieuws tot must-see bezienswaardigheden, levendige evenementen en onvergetelijke ervaringen.',
    },
    {
      name: 'primaryButtonText',
      type: 'text',
      label: 'Primaire Knop Tekst',
      defaultValue: '↗ Ontdek Diensten',
    },
    {
      name: 'primaryButtonUrl',
      type: 'text',
      label: 'Primaire Knop URL',
      defaultValue: '/diensten',
    },
    {
      name: 'secondaryButtonText',
      type: 'text',
      label: 'Secundaire Knop Tekst',
      defaultValue: 'Neem Contact Op',
    },
    {
      name: 'secondaryButtonUrl',
      type: 'text',
      label: 'Secundaire Knop URL',
      defaultValue: '/contact',
    },
    {
      name: 'tagline',
      type: 'text',
      label: 'Strook Tekst (Onder Hero)',
      defaultValue: 'Wij leveren met trots deze kerndiensten en nog veel meer als uw partner.',
    },
    {
      name: 'stripServices',
      type: 'array',
      label: 'Strook Items',
      fields: [
        {
          name: 'icon',
          type: 'text',
          label: 'Icoon (emoji)',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Titel Item',
          required: true,
        },
        {
          name: 'linkText',
          type: 'text',
          label: 'Link Tekst',
          defaultValue: 'Lees meer',
        },
        {
          name: 'url',
          type: 'text',
          label: 'Link URL',
          required: true,
        },
      ],
    },
  ],
}

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
      name: 'heading',
      type: 'text',
      label: 'Hoofdtitel',
      defaultValue: 'Uw complete boekhoudplatform',
      required: true,
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Achtergrond Afbeelding',
    },
    {
      name: 'actionCards',
      type: 'array',
      label: 'Actie Kaarten',
      minRows: 1,
      maxRows: 3,
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Kaart Titel',
          required: true,
        },
        {
          name: 'linkText',
          type: 'text',
          label: 'Link Tekst',
          required: true,
        },
        {
          name: 'linkUrl',
          type: 'text',
          label: 'Link URL',
          required: true,
        },
      ],
    },
  ],
}

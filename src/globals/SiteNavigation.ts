import type { GlobalConfig } from 'payload'

export const SiteNavigation: GlobalConfig = {
  slug: 'site-navigation',
  label: 'Site Navigatie & Menu',
  admin: {
    group: 'Website Instellingen',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'mainNav',
      type: 'array',
      label: 'Hoofdmenu Items (Desktop & Mobiel)',
      labels: {
        singular: 'Menu Item',
        plural: 'Menu Items',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Label',
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          label: 'URL',
        },
        {
          name: 'icon',
          type: 'textarea',
          label: 'SVG Icoon Code (Voor Mobiel Menu)',
          admin: {
            description: 'Plak hier de raw <svg> code voor het icoontje in het mobiele menu.',
          },
        },
      ],
    },
    {
      name: 'topBarLinks',
      type: 'array',
      label: 'Top Bar Links (Boven header)',
      labels: {
        singular: 'Top Bar Link',
        plural: 'Top Bar Links',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Label',
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          label: 'URL',
        },
        {
          name: 'icon',
          type: 'text',
          label: 'Icoon (emoji of tekst zoals ♿ of BE)',
        },
      ],
    },
  ],
}

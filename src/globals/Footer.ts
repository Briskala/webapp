import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'columns',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'links',
          type: 'array',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'url',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'copyrightText',
      type: 'text',
      required: true,
      defaultValue: '© 2026 Briskala · Boekhouding & financieel beheer',
    },
    {
      name: 'siteRegister',
      type: 'text',
      label: 'Site Register',
      admin: {
        description: 'Example: SP · 01017-911 · PBX (11) 3243 a 3400',
      },
    },
  ],
}

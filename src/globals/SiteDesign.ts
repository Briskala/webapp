import type { GlobalConfig } from 'payload'

export const SiteDesign: GlobalConfig = {
  slug: 'site-design',
  label: 'Site Design (GELOCKT)',
  admin: {
    description: 'De standaard ontwerpelementen van de website. Deze instellingen zijn gelockt en kunnen niet worden gewijzigd.',
  },
  access: {
    read: () => true,
    update: () => false, // SITE LOCK: Design cannot be changed via CMS
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      label: 'Website Naam',
      defaultValue: 'BPAG',
    },
    {
      name: 'backgroundColor',
      type: 'text',
      label: 'Achtergrondkleur (Background)',
      defaultValue: '#ffffff',
    },
    {
      name: 'primaryColor',
      type: 'text',
      label: 'Primaire Kleur (Primary)',
      defaultValue: '#1a5276', // BPAG blue
    },
    {
      name: 'secondaryColor',
      type: 'text',
      label: 'Secundaire Kleur (Secondary)',
      defaultValue: '#aad4ef', // Light blue
    },
    {
      name: 'textColor',
      type: 'text',
      label: 'Tekstkleur',
      defaultValue: '#333333',
    },
  ],
}

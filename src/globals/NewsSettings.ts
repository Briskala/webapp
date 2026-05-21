import type { GlobalConfig } from 'payload'

export const NewsSettings: GlobalConfig = {
  slug: 'news-settings',
  label: 'Nieuws Instellingen (RSS)',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'rssFeedUrl',
      type: 'text',
      label: 'RSS Feed URL (Nieuwsbron)',
      admin: {
        description: 'Voer de URL in van een RSS-feed (bijv. https://nu.nl/rss/Algemeen of een andere nieuwsbron) om automatisch nieuws te synchroniseren.',
      },
    },
    {
      name: 'rssFeedSource',
      type: 'text',
      label: 'Bron Naam',
      defaultValue: 'Externe Nieuwsbron',
    },
    {
      name: 'autoSync',
      type: 'checkbox',
      label: 'Automatisch synchroniseren bij bezoek aan nieuws-pagina',
      defaultValue: true,
    },
  ],
}

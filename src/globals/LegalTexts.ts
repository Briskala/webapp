import type { GlobalConfig } from 'payload'

export const LegalTexts: GlobalConfig = {
  slug: 'legal-texts',
  label: 'Juridische Teksten (Legal)',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'privacyPolicy',
      type: 'richText',
      label: 'Privacy Policy',
    },
    {
      name: 'termsAndConditions',
      type: 'richText',
      label: 'Algemene Voorwaarden',
    },
    {
      name: 'cookiePolicy',
      type: 'richText',
      label: 'Cookiebeleid',
    },
  ],
}

import { getPayload } from 'payload'
import config from './payload.config'
import { HERO_DEFAULT, MAIN_NAV } from './content/briskala'

async function seedGlobals() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  console.log('Seeding globals...')

  try {
    await payload.updateGlobal({
      slug: 'footer',
      data: {
        siteRegister: 'Briskala · Boekhouding & financieel beheer',
        copyrightText: '© 2026 Briskala · Boekhouding & financieel beheer',
        columns: [
          {
            title: 'Platform',
            links: [
              { label: 'Functies', url: '/functies' },
              { label: 'Facturen', url: '/facturen' },
              { label: 'Boekhouding', url: '/boekhouding' },
              { label: 'Rapporten', url: '/rapporten' },
            ],
          },
          {
            title: 'Informatie',
            links: [
              { label: 'Over Ons', url: '/over-ons' },
              { label: 'Prijzen', url: '/prijzen' },
              { label: 'FAQ', url: '/faq' },
              { label: 'Contact', url: '/contact' },
            ],
          },
          {
            title: 'Juridisch',
            links: [
              { label: 'Privacy Policy', url: '/privacy-policy' },
              { label: 'Algemene Voorwaarden', url: '/terms-and-conditions' },
              { label: 'Cookiebeleid', url: '/cookiebeleid' },
            ],
          },
        ],
      },
    })
    console.log('Footer global seeded')
  } catch (e) {
    console.error('Footer seed error:', e)
  }

  try {
    await payload.updateGlobal({
      slug: 'diensten-section',
      data: {
        sectionTitle: 'Platform & Functies',
        items: [
          {
            title: 'Facturen & inkomsten',
            enabled: true,
            defaultOpen: true,
            links: [
              { label: 'Facturen maken en versturen', url: '/facturen' },
              { label: 'Openstaande betalingen volgen', url: '/facturen#betalingen' },
              { label: 'Herinneringen automatiseren', url: '/facturen#herinneringen' },
            ],
          },
          {
            title: 'Uitgaven & documenten',
            enabled: true,
            defaultOpen: false,
            links: [
              { label: 'Uitgaven registreren', url: '/uitgaven' },
              { label: 'Bonnen uploaden', url: '/uitgaven#bonnen' },
              { label: 'Documentenarchief', url: '/functies#documenten' },
            ],
          },
          {
            title: 'Boekhouding, btw & rapporten',
            enabled: true,
            defaultOpen: false,
            links: [
              { label: 'Boekhouding beheren', url: '/boekhouding' },
              { label: 'Btw-administratie', url: '/btw' },
              { label: 'Financiële rapporten', url: '/rapporten' },
            ],
          },
        ],
      },
    })
    console.log('DienstenSection global seeded')
  } catch (e) {
    console.error('DienstenSection seed error:', e)
  }

  try {
    await payload.updateGlobal({
      slug: 'sidebar-cards',
      data: {
        cards: [
          {
            title: 'START\\nGRATIS',
            icon: '📘',
            colorVariant: 'blue',
            link: '/login',
            description: 'Open uw Briskala-account',
          },
          {
            title: 'BEKIJK\\nPRIJZEN',
            icon: '💶',
            colorVariant: 'red',
            link: '/prijzen',
            description: 'Kies het juiste abonnement',
          },
        ],
      },
    })
    console.log('SidebarCards global seeded')
  } catch (e) {
    console.error('SidebarCards seed error:', e)
  }

  try {
    await payload.updateGlobal({
      slug: 'hero-section',
      data: {
        heading: HERO_DEFAULT.heading,
        actionCards: HERO_DEFAULT.cards,
      },
    })
    console.log('Hero global seeded')
  } catch (e) {
    console.error('Hero seed error:', e)
  }

  try {
    await payload.updateGlobal({
      slug: 'site-navigation',
      data: {
        mainNav: MAIN_NAV,
        topBarLinks: [
          { label: 'FAQ', url: '/faq', icon: '?' },
          { label: 'Prijzen', url: '/prijzen', icon: '€' },
          { label: 'Support', url: '/probleem-melden', icon: '💬' },
        ],
      },
    })
    console.log('Site navigation seeded')
  } catch (e) {
    console.error('Site navigation seed error:', e)
  }

  try {
    await payload.updateGlobal({
      slug: 'account-settings',
      data: {
        title: 'Mijn Briskala',
        welcomeText: 'Welkom bij uw financiële dashboard',
        customerNumberLabel: 'Accountnr',
        profileLabel: 'Profiel',
        menuGegevens: 'Mijn gegevens',
        menuAanvragen: 'Facturen & aanvragen',
        menuDiensten: 'Mijn abonnement',
        menuBerichten: 'Berichten',
        menuUitloggen: 'Uitloggen',
      },
    })
    console.log('Account settings seeded')
  } catch (e) {
    console.error('Account settings seed error:', e)
  }

  console.log('All globals seeded successfully!')
  process.exit(0)
}

seedGlobals().catch((e) => {
  console.error(e)
  process.exit(1)
})

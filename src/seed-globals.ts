import { getPayload } from 'payload'
import config from './payload.config'

async function seedGlobals() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  console.log('Seeding globals...')

  // Seed siteRegister in Footer
  try {
    await payload.updateGlobal({
      slug: 'footer',
      data: {
        siteRegister: 'Briskala Property & Asset Group · Onafhankelijk Advies',
        copyrightText: '© 2026 Briskala Property & Asset Group · Uw Partner in Wonen, Rijden & Investeren',
        columns: [
          {
            title: 'Briskala Advies',
            links: [
              { label: 'Vastgoed Advies', url: '/vastgoed' },
              { label: 'Woningbouw Advies', url: '/woningbouw' },
              { label: 'Autofinanciering', url: '/autofinanciering' },
              { label: 'Olietanken Advies', url: '/olietanken' },
            ],
          },
          {
            title: 'Informatie',
            links: [
              { label: 'Over Ons', url: '/over-ons' },
              { label: 'Nieuws & Netwerk', url: '/nieuws' },
              { label: 'FAQ', url: '/faq' },
              { label: 'Contact', url: '/contact' },
            ],
          },
          {
            title: 'Juridisch',
            links: [
              { label: 'Privacy Policy', url: '/privacy-policy' },
              { label: 'Algemene Voorwaarden', url: '/terms-and-conditions' },
              { label: 'Cookiebeleid', url: '/cookie-policy' },
            ],
          },
        ],
      },
    })
    console.log('Footer global seeded (columns + siteRegister)')
  } catch (e) {
    console.error('Footer seed error:', e)
  }

  // Seed DienstenSection
  try {
    await payload.updateGlobal({
      slug: 'diensten-section',
      data: {
        sectionTitle: 'Diensten & Informatie',
        items: [
          {
            title: 'Vastgoed Advies',
            enabled: true,
            defaultOpen: true,
            links: [
              { label: 'Aankoopbegeleiding', url: '/vastgoed#aankoop' },
              { label: 'Verkoopadvies', url: '/vastgoed#verkoop' },
              { label: 'Investeringsanalyse', url: '/vastgoed#investeren' },
            ],
          },
          {
            title: 'Autofinanciering',
            enabled: true,
            defaultOpen: false,
            links: [
              { label: 'Lening berekenen', url: '/autofinanciering#berekenen' },
              { label: 'Lease opties vergelijken', url: '/autofinanciering#lease' },
            ],
          },
          {
            title: 'Woningbouw',
            enabled: true,
            defaultOpen: false,
            links: [
              { label: 'Projectontwikkeling', url: '/woningbouw#projecten' },
              { label: 'Aannemer selectie', url: '/woningbouw#aannemer' },
            ],
          },
        ],
      },
    })
    console.log('DienstenSection global seeded')
  } catch (e) {
    console.error('DienstenSection seed error:', e)
  }

  // Seed SidebarCards
  try {
    await payload.updateGlobal({
      slug: 'sidebar-cards',
      data: {
        cards: [
          {
            title: 'GUIA do USUARIO',
            icon: '🧭',
            colorVariant: 'blue',
            link: '#',
            description: 'User guide',
          },
          {
            title: 'IPVA 2014',
            icon: '🚗',
            colorVariant: 'red',
            link: '#',
            description: 'IPVA 2014',
          },
        ],
      },
    })
    console.log('SidebarCards global seeded')
  } catch (e) {
    console.error('SidebarCards seed error:', e)
  }

  console.log('All globals seeded successfully!')
  process.exit(0)
}

seedGlobals().catch((e) => {
  console.error(e)
  process.exit(1)
})

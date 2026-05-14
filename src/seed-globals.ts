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
        siteRegister: 'SP · 01017-911 · PBX (11) 3243 a 3400',
        copyrightText: '© 2026 Belgian Property & Asset Group · Uw Partner in Wonen, Rijden & Investeren',
        columns: [
          {
            title: 'Belgian Property & Asset Group',
            links: [
              { label: 'Over Ons', url: '/about-us' },
              { label: 'Onze Diensten', url: '/our-services' },
              { label: 'Woningbouw', url: '/housing-development' },
              { label: 'Vastgoed', url: '/real-estate' },
              { label: 'Autofinanciering', url: '/car-financing' },
            ],
          },
          {
            title: 'Diensten',
            links: [
              { label: 'Olietanken', url: '/oil-refueling' },
              { label: 'Holiday & Resort Services', url: '/holiday-resort-services' },
              { label: 'Customer Support', url: '/customer-support' },
            ],
          },
          {
            title: 'Informatie',
            links: [
              { label: 'Nieuws', url: '/news' },
              { label: 'FAQ', url: '/faq' },
              { label: 'Contact', url: '/contact' },
              { label: 'Sitemap', url: '/sitemap' },
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
            title: 'Nota Fiscal Paulista (NFP)',
            enabled: true,
            defaultOpen: true,
            links: [
              { label: 'Sobre a Nota Fiscal Paulista', url: '#' },
              { label: 'Acesso a consultas on-line', url: '#' },
              { label: 'A quem ele se destina', url: '#' },
            ],
          },
          {
            title: 'Nota Fiscal Electrónica (NFE)',
            enabled: true,
            defaultOpen: false,
            links: [
              { label: 'Sobre a Nota Fiscal Eletrônica', url: '#' },
              { label: 'Acesso ao sistema', url: '#' },
            ],
          },
          {
            title: 'Vehiculos (IPVA)',
            enabled: true,
            defaultOpen: false,
            links: [{ label: 'Consulta IPVA', url: '#' }],
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

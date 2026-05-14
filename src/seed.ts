import { getPayload } from 'payload'
import config from './payload.config'

async function seed() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  console.log('Seeding database...')

  // Create admin users
  const admins = [
    { email: 'admin@bpaGroup.com', password: 'SecurePassword123!' },
    { email: 'computer@id.ericksonholding.com', password: 'SecurePassword123!' },
  ]

  for (const admin of admins) {
    const existing = await payload.find({
      collection: 'users',
      where: {
        email: { equals: admin.email },
      },
    })

    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'users',
        data: {
          email: admin.email,
          password: admin.password,
        },
      })
      console.log(`Created admin: ${admin.email} / ${admin.password}`)
    } else {
      console.log(`Admin ${admin.email} already exists.`)
    }
  }

  // Create Pages
  const pages = [
    // Main Pages
    { title: 'About Us', slug: 'about-us' },
    { title: 'Our Services', slug: 'our-services' },
    { title: 'Housing Development', slug: 'housing-development' },
    { title: 'Real Estate', slug: 'real-estate' },
    { title: 'Car Financing', slug: 'car-financing' },
    { title: 'Oil Refueling', slug: 'oil-refueling' },
    { title: 'Holiday & Resort Services', slug: 'holiday-resort-services' },
    { title: 'Customer Support', slug: 'customer-support' },
    // Information Pages
    { title: 'News', slug: 'news' },
    { title: 'Frequently Asked Questions', slug: 'faq' },
    { title: 'Contact', slug: 'contact' },
    { title: 'Sitemap', slug: 'sitemap' },
    // Legal Pages
    { title: 'Privacy Policy', slug: 'privacy-policy' },
    { title: 'Terms and Conditions', slug: 'terms-and-conditions' },
    { title: 'Cookie Policy', slug: 'cookie-policy' },
  ]

  for (const page of pages) {
    const existing = await payload.find({
      collection: 'pages',
      where: {
        slug: { equals: page.slug },
      },
    })

    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'pages',
        data: {
          title: page.title,
          slug: page.slug,
          content: {
            root: {
              type: 'root',
              format: '',
              indent: 0,
              version: 1,
              direction: 'ltr',
              children: [
                {
                  type: 'paragraph',
                  format: '',
                  indent: 0,
                  version: 1,
                  children: [
                    {
                      mode: 'normal',
                      text: `Welcome to the ${page.title} page.`,
                      type: 'text',
                      style: '',
                      detail: 0,
                      format: 0,
                      version: 1,
                    },
                  ],
                },
              ],
            },
          },
        },
      })
      console.log(`Created page: ${page.title}`)
    } else {
      console.log(`Page ${page.title} already exists.`)
    }
  }

  console.log('Seeding complete.')
  process.exit(0)
}

seed().catch(console.error)

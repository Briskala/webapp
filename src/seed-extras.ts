import { getPayload } from 'payload'
import config from './payload.config'

async function seedData() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  console.log('Seeding branches and languages...')

  const france = [
    'Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Montpellier', 'Strasbourg',
    'Bordeaux', 'Lille', 'Rennes', 'Reims', 'Le Havre', 'Saint-Étienne', 'Toulon', 'Grenoble',
    'Dijon', 'Angers', 'Nîmes', 'Aix-en-Provence', 'Brest', 'Limoges', 'Tours', 'Clermont-Ferrand', 'Metz'
  ]

  const belgium = [
    'Brussel', 'Antwerpen', 'Gent', 'Brugge', 'Leuven', 'Mechelen', 'Hasselt', 'Kortrijk',
    'Oostende', 'Aalst', 'Sint-Niklaas', 'Charleroi', 'Luik', 'Namen', 'Bergen', 'Doornik',
    'Waver', 'Arlon'
  ]

  const netherlands = [
    'Amsterdam', 'Rotterdam', 'Den Haag', 'Utrecht', 'Eindhoven', 'Groningen', 'Maastricht',
    'Tilburg', 'Breda', 'Nijmegen', 'Arnhem', 'Haarlem', 'Leiden', 'Delft', 'Enschede', 'Zwolle',
    'Almere', 'Amersfoort', 'Apeldoorn', 'Leeuwarden', 'Den Bosch', 'Alkmaar', 'Gouda', 'Dordrecht', 'Venlo'
  ]

  for (const city of france) {
    await payload.create({ collection: 'branches', data: { name: `Branch ${city}`, city, country: 'FR', status: 'active' } })
  }
  for (const city of belgium) {
    await payload.create({ collection: 'branches', data: { name: `Vestiging ${city}`, city, country: 'BE', status: 'active' } })
  }
  for (const city of netherlands) {
    await payload.create({ collection: 'branches', data: { name: `Vestiging ${city}`, city, country: 'NL', status: 'active' } })
  }

  // Seed Languages
  await payload.create({ collection: 'languages', data: { name: 'Nederlands', code: 'NL', icon: '🌐', url: '/nl', sortOrder: 1, status: 'active' } })
  await payload.create({ collection: 'languages', data: { name: 'Français', code: 'FR', icon: '🌐', url: '/fr', sortOrder: 2, status: 'active' } })
  await payload.create({ collection: 'languages', data: { name: 'English', code: 'EN', icon: '🌐', url: '/en', sortOrder: 3, status: 'active' } })

  // Seed Probleem melden page
  await payload.create({
    collection: 'pages',
    data: {
      title: 'Probleem melden',
      slug: 'probleem-melden',
      content: {
        root: {
          type: 'root', format: '', indent: 0, version: 1, direction: 'ltr',
          children: [
            { type: 'paragraph', format: '', indent: 0, version: 1, children: [{ mode: 'normal', text: 'Meld hier uw probleem.', type: 'text', style: '', detail: 0, format: 0, version: 1 }] }
          ]
        }
      }
    }
  })

  // Seed Accessibility Global
  await payload.updateGlobal({
    slug: 'accessibility',
    data: {
      active: true,
      dropdownLabel: '♿ Toegankelijkheid ▾',
      increaseLabel: 'A+ Tekst vergroten',
      decreaseLabel: 'A- Tekst verkleinen',
      resetLabel: 'A Reset tekstgrootte',
    }
  })

  console.log('Seeding complete.')
  process.exit(0)
}

seedData().catch((e) => {
  console.error(e)
  process.exit(1)
})

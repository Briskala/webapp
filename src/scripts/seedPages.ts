import { getPayload } from 'payload';
import configPromise from '../payload.config';

const pagesToSeed = [
  {
    title: 'Woningbouw',
    slug: 'woningbouw',
  },
  {
    title: 'Olietanken',
    slug: 'olietanken',
  },
];

async function seed() {
  const payload = await getPayload({ config: await configPromise });
  console.log('Connected to Payload CMS. Starting seed...');

  for (const page of pagesToSeed) {
    const existing = await payload.find({
      collection: 'pages',
      where: { slug: { equals: page.slug } },
    });

    if (existing.docs.length > 0) {
      console.log(`✓ Page "${page.title}" already exists — skipping.`);
      continue;
    }

    await payload.create({
      collection: 'pages',
      data: page as any,
    });
    console.log(`✅ Created page: "${page.title}" (/${page.slug})`);
  }

  console.log('Seed complete!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});

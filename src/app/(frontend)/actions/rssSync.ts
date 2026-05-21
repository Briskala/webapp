'use server';

import { getPayload } from 'payload';
import config from '@/payload.config';

function parseRss(xmlText: string) {
  const items: any[] = [];
  // Match item blocks in RSS XML
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xmlText)) !== null) {
    const itemContent = match[1];

    const getTag = (tag: string) => {
      // Match tag content, handles standard and CDATA wrappers
      const tagRegex = new RegExp(`<${tag}>(?:<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>|([\\s\\S]*?))<\/${tag}>`, 'i');
      const tagMatch = tagRegex.exec(itemContent);
      if (tagMatch) {
        return (tagMatch[1] || tagMatch[2] || '').trim();
      }
      return '';
    };

    const title = getTag('title');
    const link = getTag('link');
    const description = getTag('description');
    const pubDateStr = getTag('pubDate');

    // Extract image from enclosure url
    const enclosureRegex = /<enclosure[^>]+url=["']([^"']+)["']/i;
    const enclosureMatch = enclosureRegex.exec(itemContent);
    let imageUrl = enclosureMatch ? enclosureMatch[1] : '';

    // Fallback: media:content url
    if (!imageUrl) {
      const mediaRegex = /<media:content[^>]+url=["']([^"']+)["']/i;
      const mediaMatch = mediaRegex.exec(itemContent);
      if (mediaMatch) imageUrl = mediaMatch[1];
    }

    // Fallback: image inside description HTML
    if (!imageUrl) {
      const imgRegex = /<img[^>]+src=["']([^"']+)["']/i;
      const imgMatch = imgRegex.exec(description);
      if (imgMatch) imageUrl = imgMatch[1];
    }

    // Strip HTML from description for excerpt
    const plainText = description ? description.replace(/<[^>]*>/g, '').trim() : '';
    const excerpt = plainText ? (plainText.length > 150 ? plainText.slice(0, 150) + '...' : plainText) : '';

    // Generate slug from title
    const cleanSlug = (title || Math.random().toString())
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    items.push({
      title: title || 'Nieuws Update',
      slug: cleanSlug || Math.random().toString(36).substring(7),
      link: link,
      excerpt: excerpt || 'Klik om het volledige nieuwsbericht te bekijken.',
      publishDate: pubDateStr ? new Date(pubDateStr).toISOString() : new Date().toISOString(),
      content: plainText || 'Geen gedetailleerde inhoud beschikbaar.'
    });
  }

  return items;
}

export async function syncRssNews() {
  try {
    const payloadConfig = await config;
    const payload = await getPayload({ config: payloadConfig });

    // Fetch News Settings Global
    const settings = await payload.findGlobal({ slug: 'news-settings' });
    const rssUrl = settings?.rssFeedUrl;

    if (!rssUrl) {
      return { success: false, error: 'Geen RSS-bron geconfigureerd in het beheerpaneel.' };
    }

    // Fetch RSS feed XML
    const response = await fetch(rssUrl, { next: { revalidate: 600 } });
    if (!response.ok) {
      return { success: false, error: `Fout bij ophalen nieuwsbron: ${response.statusText}` };
    }

    const xmlText = await response.text();
    const parsedArticles = parseRss(xmlText);

    let createdCount = 0;

    for (const article of parsedArticles) {
      // Check if this article exists in the news collection
      const existing = await payload.find({
        collection: 'news',
        where: {
          or: [
            { slug: { equals: article.slug } },
            { title: { equals: article.title } }
          ]
        }
      });

      if (existing.docs.length === 0) {
        // Build a proper Lexical structure for the database content field
        const contentJson = {
          root: {
            type: 'root',
            format: '' as const,
            indent: 0,
            version: 1,
            direction: null,
            children: [
              {
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,
                children: [
                  {
                    type: 'text',
                    text: article.content,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    detail: 0,
                    version: 1
                  }
                ]
              }
            ]
          }
        };

        await payload.create({
          collection: 'news',
          data: {
            title: article.title,
            slug: article.slug,
            publishDate: article.publishDate,
            excerpt: article.excerpt,
            content: contentJson
          }
        });
        createdCount++;
      }
    }

    return { success: true, syncedCount: parsedArticles.length, newCount: createdCount };
  } catch (error: any) {
    console.error('Error syncing RSS:', error);
    return { success: false, error: error.message || 'Onbekende fout bij synchroniseren RSS.' };
  }
}

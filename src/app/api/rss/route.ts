import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const payload = await getPayload({ config: await configPromise })
    const { docs: news } = await payload.find({
      collection: 'news',
      limit: 100,
      sort: '-publishDate',
    })

    const url = new URL(request.url)
    const origin = url.origin

    let rssItemsXml = ''
    for (const article of news) {
      const pubDate = new Date(article.publishDate).toUTCString()
      const articleUrl = `${origin}/nieuws/${article.id}`
      
      const titleEscaped = `<![CDATA[${article.title}]]>`
      const descriptionEscaped = `<![CDATA[${article.excerpt || ''}]]>`

      rssItemsXml += `
    <item>
      <title>${titleEscaped}</title>
      <link>${articleUrl}</link>
      <guid isPermaLink="true">${articleUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${descriptionEscaped}</description>
    </item>`
    }

    const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Briskala Nieuws</title>
    <link>${origin}/nieuws</link>
    <description>Laatste nieuws en updates van Briskala</description>
    <language>nl-NL</language>
    <atom:link href="${origin}/api/rss" rel="self" type="application/rss+xml" />
    ${rssItemsXml}
  </channel>
</rss>`

    return new NextResponse(rssXml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
      },
    })
  } catch (error: any) {
    console.error('Error generating local RSS feed:', error)
    return new NextResponse(
      `<error>Failed to generate RSS feed: ${error.message || 'Unknown error'}</error>`,
      {
        status: 500,
        headers: {
          'Content-Type': 'application/xml',
        },
      }
    )
  }
}

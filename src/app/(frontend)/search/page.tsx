import { cookies } from 'next/headers';
import React from 'react';
import { getPayload } from 'payload';
import config from '@/payload.config';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function SearchPage(props: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await props.searchParams;
  const query = q || '';

  const cookieStore = await cookies();
  const recentSearchesCookie = cookieStore.get('recent_searches');
  let recentSearches: string[] = [];
  if (recentSearchesCookie) {
    try {
      recentSearches = JSON.parse(decodeURIComponent(recentSearchesCookie.value));
    } catch(e) {}
  }

  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });

  let results: any = {
    pages: [],
    news: [],
    services: [],
  };

  if (query) {
    try {
      const searchOptions = {
        where: {
          title: {
            like: query,
          },
        },
        limit: 10,
      };

      // Query multiple collections in parallel
      const [pagesRes, newsRes, servicesRes] = await Promise.all([
        payload.find({ collection: 'pages', ...searchOptions }),
        payload.find({ collection: 'news', ...searchOptions }),
        payload.find({ collection: 'services', ...searchOptions }),
      ]);

      results.pages = pagesRes.docs;
      results.news = newsRes.docs;
      results.services = servicesRes.docs;
    } catch (e) {
      console.error('Search query failed', e);
    }
  }

  const totalResults = results.pages.length + results.news.length + results.services.length;

  return (
    <div style={{ minHeight: '60vh', padding: '60px 16px', background: '#f7f9fb' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '32px', color: '#1a5276', marginBottom: '8px', fontWeight: 700 }}>
          Zoekresultaten
        </h1>
        <p style={{ color: '#666', fontSize: '16px', marginBottom: '40px' }}>
          {query ? (
            <span>Je hebt gezocht naar: <strong style={{ color: '#333' }}>"{query}"</strong> ({totalResults} resultaten)</span>
          ) : (
            'Voer een zoekterm in om de site te doorzoeken.'
          )}
        </p>

        {!query && recentSearches.length > 0 && (
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '16px', color: '#666', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Recente Zoekopdrachten</h2>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {recentSearches.map((term, i) => (
                <Link key={i} href={`/search?q=${encodeURIComponent(term)}`} style={{ background: '#e8f0f8', color: '#1a5276', padding: '6px 16px', borderRadius: '20px', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>
                  {term}
                </Link>
              ))}
            </div>
          </div>
        )}

        {query && totalResults === 0 && (
          <div style={{ background: '#fff', padding: '40px', textAlign: 'center', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
            <h2 style={{ fontSize: '20px', color: '#1a5276', marginBottom: '12px' }}>Geen resultaten gevonden</h2>
            <p style={{ color: '#666' }}>Probeer een andere zoekterm of controleer op spelfouten.</p>
          </div>
        )}

        {totalResults > 0 && (
          <div style={{ display: 'grid', gap: '32px' }}>
            
            {/* Pages Results */}
            {results.pages.length > 0 && (
              <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e0e0e0', overflow: 'hidden' }}>
                <div style={{ background: '#f0f4f8', padding: '16px 24px', borderBottom: '1px solid #e0e0e0', fontWeight: 600, color: '#1a5276' }}>
                  Pagina's ({results.pages.length})
                </div>
                <div style={{ padding: '0 24px' }}>
                  {results.pages.map((doc: any, i: number) => (
                    <div key={doc.id} style={{ padding: '20px 0', borderBottom: i < results.pages.length - 1 ? '1px solid #f0f4f8' : 'none' }}>
                      <Link href={`/`} style={{ fontSize: '18px', fontWeight: 600, color: '#2471a3', textDecoration: 'none', marginBottom: '8px', display: 'block' }}>
                        {doc.title}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* News Results */}
            {results.news.length > 0 && (
              <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e0e0e0', overflow: 'hidden' }}>
                <div style={{ background: '#f0f4f8', padding: '16px 24px', borderBottom: '1px solid #e0e0e0', fontWeight: 600, color: '#1a5276' }}>
                  Nieuws ({results.news.length})
                </div>
                <div style={{ padding: '0 24px' }}>
                  {results.news.map((doc: any, i: number) => (
                    <div key={doc.id} style={{ padding: '20px 0', borderBottom: i < results.news.length - 1 ? '1px solid #f0f4f8' : 'none' }}>
                      <Link href={`/nieuws/${doc.id}`} style={{ fontSize: '18px', fontWeight: 600, color: '#2471a3', textDecoration: 'none', marginBottom: '8px', display: 'block' }}>
                        {doc.title}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Services Results */}
            {results.services.length > 0 && (
              <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e0e0e0', overflow: 'hidden' }}>
                <div style={{ background: '#f0f4f8', padding: '16px 24px', borderBottom: '1px solid #e0e0e0', fontWeight: 600, color: '#1a5276' }}>
                  Functies & diensten ({results.services.length})
                </div>
                <div style={{ padding: '0 24px' }}>
                  {results.services.map((doc: any, i: number) => (
                    <div key={doc.id} style={{ padding: '20px 0', borderBottom: i < results.services.length - 1 ? '1px solid #f0f4f8' : 'none' }}>
                      <Link href="/functies" style={{ fontSize: '18px', fontWeight: 600, color: '#2471a3', textDecoration: 'none', marginBottom: '8px', display: 'block' }}>
                        {doc.title}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}

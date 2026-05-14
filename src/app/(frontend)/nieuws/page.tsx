import React from 'react';
import { getPayload } from 'payload';
import configPromise from '@/payload.config';
import Link from 'next/link';

export const metadata = {
  title: 'Nieuws',
};

export const dynamic = 'force-dynamic';

export default async function NieuwsPage() {
  const payload = await getPayload({ config: await configPromise });
  const { docs } = await payload.find({
    collection: 'news',
    limit: 50,
    sort: '-publishedAt',
  });

  return (
    <div style={{ minHeight: '60vh', padding: '60px 16px', background: '#f7f9fb' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '32px', color: '#1a5276', marginBottom: '8px', fontWeight: 700 }}>
          Nieuws & Updates
        </h1>
        <p style={{ color: '#666', fontSize: '16px', marginBottom: '40px' }}>
          Blijf op de hoogte van het laatste nieuws van BPAG.
        </p>

        {docs.length === 0 ? (
          <div style={{ background: '#fff', padding: '40px', textAlign: 'center', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
            <p style={{ color: '#666' }}>Er zijn momenteel geen nieuwsberichten beschikbaar.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {docs.map((article: any) => (
              <div key={article.id} style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e0e0e0', overflow: 'hidden', display: 'flex', gap: '0' }}>
                {article.featuredImage?.url && (
                  <div style={{ width: '240px', flexShrink: 0 }}>
                    <img src={article.featuredImage.url} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <div style={{ fontSize: '12px', color: '#888', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('nl-NL', { dateStyle: 'long' }) : 'Datum onbekend'}
                    {article.category && ` · ${article.category}`}
                  </div>
                  <h2 style={{ fontSize: '20px', color: '#1a5276', marginBottom: '12px', fontWeight: 700 }}>{article.title}</h2>
                  <p style={{ color: '#555', fontSize: '14px', lineHeight: 1.6, marginBottom: '20px', flexGrow: 1 }}>
                    {article.excerpt || 'Klik om het volledige artikel te lezen.'}
                  </p>
                  <Link href={`/nieuws/${article.id}`} style={{ alignSelf: 'flex-start', display: 'inline-block', color: '#2471a3', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}>
                    Lees meer →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

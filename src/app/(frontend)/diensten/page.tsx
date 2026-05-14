import React from 'react';
import { getPayload } from 'payload';
import configPromise from '@/payload.config';
import Link from 'next/link';

export const metadata = {
  title: 'Diensten',
};

export const dynamic = 'force-dynamic';

export default async function DienstenPage() {
  const payload = await getPayload({ config: await configPromise });
  const { docs } = await payload.find({
    collection: 'services',
    limit: 50,
  });

  return (
    <div style={{ minHeight: '60vh', padding: '60px 16px', background: '#f7f9fb' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '32px', color: '#1a5276', marginBottom: '8px', fontWeight: 700 }}>
          Onze Diensten
        </h1>
        <p style={{ color: '#666', fontSize: '16px', marginBottom: '40px' }}>
          Ontdek wat we voor u kunnen betekenen.
        </p>

        {docs.length === 0 ? (
          <div style={{ background: '#fff', padding: '40px', textAlign: 'center', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
            <p style={{ color: '#666' }}>Er zijn momenteel geen diensten beschikbaar.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
            {docs.map((service: any) => (
              <div key={service.id} style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e0e0e0', overflow: 'hidden', padding: '24px', display: 'flex', flexDirection: 'column' }}>
                <h2 style={{ fontSize: '20px', color: '#1a5276', marginBottom: '12px', fontWeight: 600 }}>{service.title}</h2>
                <div style={{ color: '#555', fontSize: '14px', lineHeight: 1.5, marginBottom: '20px', flexGrow: 1 }}>
                  {typeof service.description === 'string' ? service.description : 'Lees meer over deze dienst op de detailpagina.'}
                </div>
                <Link href={`/diensten/${service.id}`} style={{ display: 'inline-block', background: '#1a5276', color: '#fff', padding: '10px 16px', borderRadius: '4px', textDecoration: 'none', fontSize: '14px', fontWeight: 600, textAlign: 'center' }}>
                  Bekijk Dienst
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

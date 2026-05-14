import React from 'react';
import { getPayload } from 'payload';
import configPromise from '@/payload.config';
import Link from 'next/link';

export const metadata = {
  title: 'Vastgoed',
};

export const dynamic = 'force-dynamic';

export default async function VastgoedPage() {
  const payload = await getPayload({ config: await configPromise });
  const { docs } = await payload.find({
    collection: 'properties',
    limit: 50,
  });

  return (
    <div style={{ minHeight: '60vh', padding: '60px 16px', background: '#f7f9fb' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '32px', color: '#1a5276', marginBottom: '8px', fontWeight: 700 }}>
          Vastgoed
        </h1>
        <p style={{ color: '#666', fontSize: '16px', marginBottom: '40px' }}>
          Ontdek ons actuele aanbod in vastgoed.
        </p>

        {docs.length === 0 ? (
          <div style={{ background: '#fff', padding: '40px', textAlign: 'center', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
            <p style={{ color: '#666' }}>Er is momenteel geen vastgoed beschikbaar.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
            {docs.map((property: any) => (
              <div key={property.id} style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e0e0e0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '200px', background: '#e8f0f8', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
                  {property.images && property.images.length > 0 && property.images[0].image?.url ? (
                    <img src={property.images[0].image.url} alt={property.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    'Geen Afbeelding'
                  )}
                </div>
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <h2 style={{ fontSize: '20px', color: '#1a5276', marginBottom: '8px', fontWeight: 600 }}>{property.title}</h2>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: '#c0392b', marginBottom: '16px' }}>
                    {property.price ? `€ ${property.price.toLocaleString('nl-NL')}` : 'Prijs op aanvraag'}
                  </div>
                  <div style={{ color: '#555', fontSize: '14px', lineHeight: 1.5, marginBottom: '20px', flexGrow: 1 }}>
                    {property.location || 'Locatie onbekend'}
                  </div>
                  <Link href={`/vastgoed/${property.id}`} style={{ display: 'inline-block', background: '#1a5276', color: '#fff', padding: '10px 16px', borderRadius: '4px', textDecoration: 'none', fontSize: '14px', fontWeight: 600, textAlign: 'center' }}>
                    Bekijk Details
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

import React from 'react';
import { getPayload } from 'payload';
import configPromise from '@/payload.config';
import Link from 'next/link';

export const metadata = {
  title: 'Autofinanciering',
};

export const dynamic = 'force-dynamic';

export default async function AutofinancieringPage() {
  const payload = await getPayload({ config: await configPromise });
  const { docs } = await payload.find({
    collection: 'vehicles',
    limit: 50,
  });

  return (
    <div style={{ minHeight: '60vh', padding: '60px 16px', background: '#f7f9fb' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '32px', color: '#1a5276', marginBottom: '8px', fontWeight: 700 }}>
          Autofinanciering
        </h1>
        <p style={{ color: '#666', fontSize: '16px', marginBottom: '40px' }}>
          Bekijk ons actuele voertuigenaanbod en ontdek uw financieringsmogelijkheden.
        </p>

        {docs.length === 0 ? (
          <div style={{ background: '#fff', padding: '40px', textAlign: 'center', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
            <p style={{ color: '#666' }}>Er zijn momenteel geen voertuigen beschikbaar.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
            {docs.map((vehicle: any) => (
              <div key={vehicle.id} style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e0e0e0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '200px', background: '#e8f0f8', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', fontSize: '14px' }}>
                  {vehicle.images && vehicle.images.length > 0 && vehicle.images[0].image?.url ? (
                    <img src={vehicle.images[0].image.url} alt={`${vehicle.make} ${vehicle.model}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    '🚗 Geen Afbeelding'
                  )}
                </div>
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <h2 style={{ fontSize: '18px', color: '#1a5276', marginBottom: '4px', fontWeight: 700 }}>
                    {vehicle.make} {vehicle.model}
                  </h2>
                  <div style={{ fontSize: '13px', color: '#888', marginBottom: '12px' }}>
                    Bouwjaar: {vehicle.year || '—'}
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: '#c0392b', marginBottom: '16px' }}>
                    {vehicle.price ? `€ ${vehicle.price.toLocaleString('nl-NL')}` : 'Prijs op aanvraag'}
                  </div>
                  <Link href={`/autofinanciering/${vehicle.id}`} style={{ marginTop: 'auto', display: 'inline-block', background: '#1a5276', color: '#fff', padding: '10px 16px', borderRadius: '4px', textDecoration: 'none', fontSize: '14px', fontWeight: 600, textAlign: 'center' }}>
                    Meer Informatie
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

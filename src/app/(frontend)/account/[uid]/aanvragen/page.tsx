import React from 'react';
import { getPayload } from 'payload';
import config from '@/payload.config';

export const dynamic = 'force-dynamic';

export default async function AanvragenPage(props: { params: Promise<{ uid: string }> }) {
  const { uid } = await props.params;

  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });

  let aanvragen: any[] = [];
  try {
    // We need the user's Payload ID first
    const userResult = await payload.find({
      collection: 'users',
      where: { firebaseUid: { equals: uid } },
    });
    
    if (userResult.docs.length > 0) {
      const payloadUserId = userResult.docs[0].id;
      const result = await payload.find({
        collection: 'aanvragen',
        where: { user: { equals: payloadUserId } },
        sort: '-requestDate',
      });
      aanvragen = result.docs;
    }
  } catch (e) {
    // Ignore
  }

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'in_behandeling': return <span style={{ background: '#fef3c7', color: '#92400e', padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 600 }}>In behandeling</span>;
      case 'goedgekeurd': return <span style={{ background: '#d1fae5', color: '#065f46', padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 600 }}>Goedgekeurd</span>;
      case 'afgerond': return <span style={{ background: '#e0e7ff', color: '#3730a3', padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 600 }}>Afgerond</span>;
      case 'geannuleerd': return <span style={{ background: '#fee2e2', color: '#991b1b', padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 600 }}>Geannuleerd</span>;
      default: return <span>{status}</span>;
    }
  };

  return (
    <div>
      <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1a5276', marginBottom: '20px' }}>
        Mijn aanvragen
      </h2>
      
      {aanvragen.length === 0 ? (
        <div style={{ padding: '32px', textAlign: 'center', background: '#f7f9fb', borderRadius: '8px', border: '1px dashed #ccc' }}>
          <p style={{ color: '#666', margin: 0 }}>U heeft nog geen aanvragen ingediend.</p>
        </div>
      ) : (
        <div style={{ border: '1px solid #e0e0e0', borderRadius: '6px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead style={{ background: '#f0f4f8' }}>
              <tr>
                <th style={{ padding: '12px 16px', borderBottom: '1px solid #e0e0e0', color: '#1a5276' }}>Titel</th>
                <th style={{ padding: '12px 16px', borderBottom: '1px solid #e0e0e0', color: '#1a5276' }}>Datum</th>
                <th style={{ padding: '12px 16px', borderBottom: '1px solid #e0e0e0', color: '#1a5276' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {aanvragen.map((item: any) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #f0f4f8' }}>
                  <td style={{ padding: '12px 16px', color: '#333', fontWeight: 500 }}>{item.title}</td>
                  <td style={{ padding: '12px 16px', color: '#666' }}>{new Date(item.requestDate).toLocaleDateString('nl-NL')}</td>
                  <td style={{ padding: '12px 16px' }}>{getStatusBadge(item.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

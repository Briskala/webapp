import React from 'react';
import { getPayload } from 'payload';
import config from '@/payload.config';
import { RichText } from '@/components/RichText';

export const dynamic = 'force-dynamic';

export default async function BerichtenPage(props: { params: Promise<{ uid: string }> }) {
  const { uid } = await props.params;

  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });

  let berichten: any[] = [];
  try {
    const userResult = await payload.find({
      collection: 'users',
      where: { firebaseUid: { equals: uid } },
    });
    
    if (userResult.docs.length > 0) {
      const payloadUserId = userResult.docs[0].id;
      const result = await payload.find({
        collection: 'messages',
        where: { user: { equals: payloadUserId } },
        sort: '-sentDate',
      });
      berichten = result.docs;
    }
  } catch (e) {}

  return (
    <div>
      <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1a5276', marginBottom: '20px' }}>
        Berichten
      </h2>
      
      {berichten.length === 0 ? (
        <div style={{ padding: '32px', textAlign: 'center', background: '#f7f9fb', borderRadius: '8px', border: '1px dashed #ccc' }}>
          <p style={{ color: '#666', margin: 0 }}>U heeft geen berichten in uw inbox.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {berichten.map((item: any) => (
            <div key={item.id} style={{ border: '1px solid #e0e0e0', borderRadius: '6px', padding: '20px', background: item.isRead ? '#fff' : '#f0f8ff' }}>
              <div className="bericht-header">
                <h3 style={{ fontSize: '16px', fontWeight: item.isRead ? 600 : 700, margin: 0, color: '#1a5276' }}>
                  {!item.isRead && <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#c0392b', marginRight: '8px', transform: 'translateY(-1px)' }}></span>}
                  {item.subject}
                </h3>
                <span style={{ fontSize: '12px', color: '#888' }}>
                  {new Date(item.sentDate).toLocaleString('nl-NL', { dateStyle: 'medium', timeStyle: 'short' })}
                </span>
              </div>
              <div style={{ fontSize: '14px', color: '#444', lineHeight: 1.6, wordBreak: 'break-word' }}>
                <RichText content={item.content} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

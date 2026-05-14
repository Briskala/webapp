import React from 'react';
import { getPayload } from 'payload';
import config from '@/payload.config';

export const dynamic = 'force-dynamic';

export default async function AccountOverviewPage(props: { params: Promise<{ uid: string }> }) {
  const { uid } = await props.params;

  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });

  let dbUser = null;
  try {
    const userResult = await payload.find({
      collection: 'users',
      where: { firebaseUid: { equals: uid } },
    });
    if (userResult.docs.length > 0) {
      dbUser = userResult.docs[0] as any;
    }
  } catch (e) {
    // Ignore
  }

  // Fetch dynamic labels again for the overview, or just use hardcoded fallbacks
  let accountSettings = null;
  try {
    accountSettings = await payload.findGlobal({ slug: 'account-settings' as any }) as any;
  } catch (e) {}

  return (
    <div>
      <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1a5276', marginBottom: '20px' }}>
        Overzicht
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
        {[
          { label: 'E-mail', value: dbUser?.email || '—' },
          { label: accountSettings?.customerNumberLabel || 'Klantnr', value: dbUser?.customerNumber || '—' },
          { label: accountSettings?.profileLabel || 'Profiel', value: dbUser?.profileType || 'Particulier' },
          { label: 'Saldo', value: `€ ${(dbUser?.balance ?? 0).toFixed(2)}` },
        ].map((item, i) => (
          <div key={i} style={{ padding: '16px', background: '#f7f9fb', borderRadius: '4px', border: '1px solid #e8edf2' }}>
            <div style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>{item.label}</div>
            <div style={{ fontSize: '15px', fontWeight: 600, color: '#333' }}>{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

import React from 'react';
import { getPayload } from 'payload';
import config from '@/payload.config';
import { DocumentenClient } from './DocumentenClient';

export const dynamic = 'force-dynamic';

export default async function AccountDocumentenPage(props: { params: Promise<{ uid: string }> }) {
  const { uid } = await props.params;

  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });

  let dbUser: any = null;
  let uploadedDocs: any[] = [];
  let requestedDocs: any[] = [];

  try {
    const userResult = await payload.find({
      collection: 'users',
      where: { firebaseUid: { equals: uid } },
    });

    if (userResult.docs.length > 0) {
      dbUser = userResult.docs[0];

      // Query documents matching this specific user profile
      const result = await payload.find({
        collection: 'documents',
        where: { user: { equals: dbUser.id } },
        sort: '-uploadedAt',
        limit: 100,
      });

      const docs = result.docs || [];
      uploadedDocs = docs.filter((d: any) => d.status !== 'requested');
      requestedDocs = docs.filter((d: any) => d.status === 'requested');
    }
  } catch (e) {
    console.error('Error loading documents page:', e);
  }

  if (!dbUser) {
    return (
      <div style={{ padding: '24px', background: '#fee2e2', border: '1px solid #fecaca', borderRadius: '8px', color: '#991b1b' }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 700 }}>Account fout</h3>
        <p style={{ margin: 0, fontSize: '14px' }}>Er kon geen geldig klantprofiel worden geladen voor deze accountpagina.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1a5276', marginBottom: '20px' }}>
        Mijn documenten
      </h2>
      <DocumentenClient
        uid={uid}
        uploadedDocs={uploadedDocs}
        requestedDocs={requestedDocs}
      />
    </div>
  );
}

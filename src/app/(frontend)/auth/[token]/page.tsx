import React from 'react';
import { getPayload } from 'payload';
import config from '@/payload.config';
import { notFound } from 'next/navigation';
import { QRLoginSDK } from '@/components/auth/QRLoginSDK';

export const dynamic = 'force-dynamic';

export default async function AuthPage(props: { params: Promise<{ token: string }> }) {
  const { token } = await props.params;

  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });

  // Validate token exists in DB
  const logs = await payload.find({
    collection: 'auth-logs',
    where: {
      token: {
        equals: token,
      },
    },
  });

  if (logs.docs.length === 0) {
    notFound();
  }

  return (
    <div style={{ paddingTop: '80px', paddingBottom: '80px' }}>
      <QRLoginSDK sessionToken={token} />
    </div>
  );
}

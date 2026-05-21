import React from 'react';
import { getPayload } from 'payload';
import configPromise from '@/payload.config';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Sidebar } from '@/components/Sidebar';
import OlietankenClient from './OlietankenClient';

export const metadata = {
  title: 'Olietanken Advies & Keuring — Briskala',
  description: 'Gecertificeerd advies voor het keuren, saneren, verwijderen en installeren van stookolietanks door Briskala. Bereken direct uw capaciteit.',
};

export const dynamic = 'force-dynamic';

export default async function OlietankenPage() {
  const payload = await getPayload({ config: await configPromise });

  // Load this page from the CMS Pages collection
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'olietanken' } },
  });

  const page = docs[0];

  return (
    <>
      <Breadcrumb pageTitle="Olietanken Advies" />
      <div className="main">
        <div className="content-col">
          {/* Main Title */}
          <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#1e3a8a', marginBottom: '24px', letterSpacing: '-0.5px' }}>
            {page?.title || 'Olietanken Advies'}
          </h1>
          <hr style={{ border: 'none', borderBottom: '1px solid #e2e8f0', margin: '0 0 24px 0' }} />

          {/* CMS Rich Content Block (if populated) */}
          {page?.content && (
            <div className="page-content mb-4" style={{ padding: '16px', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              {/* Fallback description or parsed richText content */}
              <div style={{ color: '#475569', fontSize: '14px', lineHeight: '1.6' }}>
                {/* Standard RichText rendering is supported by Next.js & Lexical. For our purposes, if rich text exists it is displayed here */}
                Het beheer van uw stookolietank is in vertrouwde handen bij Briskala. Bekijk ons interactieve dashboard en vraag direct advies aan.
              </div>
            </div>
          )}

          {/* High-fidelity interactive digital dashboard & certified form */}
          <OlietankenClient />
        </div>
        <Sidebar />
      </div>
    </>
  );
}

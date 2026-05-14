import React from 'react';
import { getPayload } from 'payload';
import configPromise from '@/payload.config';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Sidebar } from '@/components/Sidebar';

export const metadata = {
  title: 'Olietanken',
};

export const dynamic = 'force-dynamic';

export default async function OlietankenPage() {
  const payload = await getPayload({ config: await configPromise });

  // Try to load this page from the CMS Pages collection
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'olietanken' } },
  });

  const page = docs[0];

  return (
    <>
      <Breadcrumb pageTitle="Olietanken" />
      <div className="main">
        <div className="content-col">
          <h2>{page?.title || 'Olietanken'}</h2>
          <div className="page-content">
            {page ? (
              <p>Deze pagina is beschikbaar via het CMS. Voeg inhoud toe via het beheerpaneel.</p>
            ) : (
              <>
                <p>
                  BPAG biedt betrouwbare en kostenefficiënte oplossingen op het gebied van olietankopslag, -beheer en -onderhoud.
                  Wij werken samen met gecertificeerde partners voor een veilige en verantwoorde dienstverlening.
                </p>
                <h3>Onze Diensten</h3>
                <ul>
                  <li>Inspectie en onderhoud van stookolietanks</li>
                  <li>Verwijdering en sanering van tanks</li>
                  <li>Plaatsing van nieuwe tanks en installaties</li>
                  <li>Certificering en administratieve begeleiding</li>
                </ul>
                <h3>Vragen?</h3>
                <p>
                  Heeft u vragen over uw olietank? <a href="/contact">Neem contact op</a> met onze specialisten.
                </p>
              </>
            )}
          </div>
        </div>
        <Sidebar />
      </div>
    </>
  );
}

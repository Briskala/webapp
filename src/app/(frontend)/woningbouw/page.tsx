import React from 'react';
import { getPayload } from 'payload';
import configPromise from '@/payload.config';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Sidebar } from '@/components/Sidebar';

export const metadata = {
  title: 'Woningbouw',
};

export const dynamic = 'force-dynamic';

export default async function WoningbouwPage() {
  const payload = await getPayload({ config: await configPromise });

  // Try to load this page from the CMS Pages collection
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'woningbouw' } },
  });

  const page = docs[0];

  return (
    <>
      <Breadcrumb pageTitle="Woningbouw" />
      <div className="main">
        <div className="content-col">
          <h2>{page?.title || 'Woningbouw'}</h2>
          <div className="page-content">
            {page ? (
              <p>Deze pagina is beschikbaar via het CMS. Voeg inhoud toe via het beheerpaneel.</p>
            ) : (
              <>
                <p>
                  Bij BPAG zijn we gespecialiseerd in woningbouwprojecten die voldoen aan de hoogste kwaliteitsnormen.
                  Of het nu gaat om nieuwbouw, renovatie of transformatieprojecten — wij staan voor u klaar.
                </p>
                <h3>Onze Aanpak</h3>
                <ul>
                  <li>Grondige locatieanalyse en haalbaarheidsonderzoek</li>
                  <li>Ontwerp en vergunningbegeleiding</li>
                  <li>Duurzame bouwmaterialen en -methoden</li>
                  <li>Begeleiding van A tot Z</li>
                </ul>
                <h3>Interesse?</h3>
                <p>
                  Neem contact met ons op via de <a href="/contact">contactpagina</a> voor een vrijblijvend gesprek over uw bouwwensen.
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

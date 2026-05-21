import React from 'react';
import { getPayload } from 'payload';
import configPromise from '@/payload.config';
import ShowroomClient from './ShowroomClient';

export const metadata = {
  title: 'Digitale Showroom & Autofinanciering | Briskala Property & Asset Group',
  description: 'Ontdek ons ruime aanbod van voertuigen en bereken direct uw gepersonaliseerde autofinanciering en financial lease.',
};

export const dynamic = 'force-dynamic';

export default async function AutofinancieringPage() {
  const payload = await getPayload({ config: await configPromise });
  const { docs } = await payload.find({
    collection: 'vehicles',
    limit: 50,
  });

  // Convert payload docs to serializable array
  const initialVehicles = docs ? JSON.parse(JSON.stringify(docs)) : [];

  return (
    <ShowroomClient initialVehicles={initialVehicles} />
  );
}


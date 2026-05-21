import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { Breadcrumb } from '@/components/Breadcrumb'
import ShowroomClient from './ShowroomClient'

export const metadata = {
  title: 'Digitale Showroom & Autofinanciering | Briskala Property & Asset Group',
  description: 'Ontdek ons ruime aanbod van voertuigen en bereken direct uw gepersonaliseerde autofinanciering en financial lease.',
}

export const dynamic = 'force-dynamic'

export default async function AutofinancieringPage() {
  const payload = await getPayload({ config: await configPromise })
  const { docs } = await payload.find({
    collection: 'vehicles',
    limit: 50,
  })

  // Convert payload docs to serializable array
  const initialVehicles = docs ? JSON.parse(JSON.stringify(docs)) : []

  return (
    <>
      <Breadcrumb pageTitle="Autofinanciering" />
      {/* 
        Override .main grid-template to be full-width (1fr) rather than 1fr 300px,
        allowing the digital showroom's advanced filter dashboard and vehicle grids
        to scale beautifully to 1440px with ample padding.
      */}
      <div className="main" style={{ gridTemplateColumns: '1fr', maxWidth: '1440px', padding: '28px 24px 48px' }}>
        <div className="content-col" style={{ width: '100%' }}>
          {/* Main Title */}
          <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#1e3a8a', marginBottom: '24px', letterSpacing: '-0.5px' }}>
            Autofinanciering & Digitale Showroom
          </h1>
          <hr style={{ border: 'none', borderBottom: '1px solid #e2e8f0', margin: '0 0 24px 0' }} />
          <ShowroomClient initialVehicles={initialVehicles} />
        </div>
      </div>
    </>
  )
}

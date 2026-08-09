import React from 'react'
import { CustomHero } from '@/components/CustomHero'
import { Breadcrumb } from '@/components/Breadcrumb'
import { Accordion } from '@/components/Accordion'
import { Sidebar } from '@/components/Sidebar'
import { ServicesSection } from '@/components/ServicesSection'

import { getPayload } from 'payload'
import configPromise from '@payload-config'

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })
  
  // Fetch the hero-section global data
  const heroData = await payload.findGlobal({
    slug: 'hero-section',
  })

  return (
    <>
      <CustomHero 
        heading={heroData?.heading}
        backgroundImage={heroData?.backgroundImage}
        actionCards={heroData?.actionCards}
      />
      <Breadcrumb />
      <div className="main">
        <div className="content-col">
          <h2>Platform &amp; Functies</h2>
          <Accordion />
        </div>
        <Sidebar />
      </div>
      <ServicesSection />
    </>
  )
}

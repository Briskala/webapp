import React from 'react'
import { CustomHero } from '@/components/CustomHero'
import { Breadcrumb } from '@/components/Breadcrumb'
import { Accordion } from '@/components/Accordion'
import { Sidebar } from '@/components/Sidebar'
import { ServicesSection } from '@/components/ServicesSection'

export default async function HomePage() {
  return (
    <>
      <CustomHero />
      <Breadcrumb />
      <div className="main">
        <div className="content-col">
          <h2>Diensten &amp; Informatie</h2>
          <Accordion />
        </div>
        <Sidebar />
      </div>
      <ServicesSection />
    </>
  )
}

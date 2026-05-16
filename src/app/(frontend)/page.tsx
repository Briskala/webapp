import React from 'react'
import { CustomHero } from '@/components/CustomHero'
import { Breadcrumb } from '@/components/Breadcrumb'
import { Accordion } from '@/components/Accordion'
import { Sidebar } from '@/components/Sidebar'

export default async function HomePage() {
  return (
    <>
      <CustomHero />
      <Breadcrumb />
      <div className="main">
        <div className="content-col">
          <h2>Diensten & Informatie</h2>
          <Accordion />
        </div>
        <Sidebar />
      </div>
    </>
  )
}

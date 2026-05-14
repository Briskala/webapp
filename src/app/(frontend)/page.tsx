import React from 'react'
import { Hero } from '@/components/Hero'
import { Breadcrumb } from '@/components/Breadcrumb'
import { Accordion } from '@/components/Accordion'
import { Sidebar } from '@/components/Sidebar'

export default async function HomePage() {
  return (
    <>
      <Hero />
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

import React from 'react'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Breadcrumb } from '@/components/Breadcrumb'
import { Sidebar } from '@/components/Sidebar'

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  
  const { docs } = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const page = docs[0]

  if (!page) {
    return notFound()
  }

  return (
    <>
      <Breadcrumb pageTitle={page.title} />
      <div className="main">
        <div className="content-col">
          <h2>{page.title}</h2>
          <div className="page-content">
            <p>Welcome to the {page.title} page!</p>
          </div>
        </div>
        <Sidebar />
      </div>
    </>
  )
}

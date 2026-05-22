import React from 'react'
import './styles.css'
import { TopBar } from '@/components/TopBar'
import { Header } from '@/components/Header'
import { UserBar } from '@/components/UserBar'
import { SecondNav } from '@/components/SecondNav'
import { Footer } from '@/components/Footer'
import { AuthProvider } from '@/contexts/AuthContext'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  description: 'Briskala Property & Asset Group - Uw Partner in Wonen, Rijden & Investeren',
  title: {
    template: 'Briskala Property & Asset Group | %s',
    default: 'Briskala Property & Asset Group',
  },
  icons: {
    icon: '/favicon.ico',
  },
}

import { getPayload } from 'payload'
import configPromise from '@/payload.config'

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  
  const payload = await getPayload({ config: await configPromise })
  const [siteDesign, siteNav]: [any, any] = await Promise.all([
    payload.findGlobal({ slug: 'site-design' as any }),
    payload.findGlobal({ slug: 'site-navigation' as any }),
  ])

  const mainNav = siteNav?.mainNav || []
  const topBarLinks = siteNav?.topBarLinks || []

  const customStyles = {
    '--site-bg-color': siteDesign?.backgroundColor || '#ffffff',
    '--site-primary-color': siteDesign?.primaryColor || '#1a5276',
    '--site-secondary-color': siteDesign?.secondaryColor || '#aad4ef',
    '--site-text-color': siteDesign?.textColor || '#333333',
    backgroundColor: 'var(--site-bg-color)',
    color: 'var(--site-text-color)'
  } as React.CSSProperties

  return (
    <html lang="nl" data-bs-theme="light">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/assets/bootstrap/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" />
        {/* Core branding and mobile responsive styles statically linked for perfect cross-origin loading */}
        <link rel="stylesheet" href="/assets/css/brand.css?v=4.2" />
      </head>
      <body style={customStyles}>
        <AuthProvider>
          <TopBar topBarLinks={topBarLinks} />
          <Header mainNav={mainNav} />
          <UserBar />
          <SecondNav />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
        <script src="/assets/bootstrap/js/bootstrap.min.js" async />
      </body>
    </html>
  )
}


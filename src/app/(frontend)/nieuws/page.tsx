import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import Link from 'next/link'
import { Breadcrumb } from '@/components/Breadcrumb'
import { Sidebar } from '@/components/Sidebar'
import { syncRssNews } from '../actions/rssSync'

export const metadata = {
  title: 'Nieuws & Updates — Briskala',
  description: 'Blijf op de hoogte van updates over boekhouding, btw, facturatie en financieel beheer van Briskala.',
}

export const dynamic = 'force-dynamic'

export default async function NieuwsPage() {
  // Sync the RSS feed in the background on load
  try {
    await syncRssNews()
  } catch (err) {
    console.error('Error in background RSS sync:', err)
  }

  const payload = await getPayload({ config: await configPromise })
  
  // Retrieve the latest news documents
  const { docs: articles } = await payload.find({
    collection: 'news',
    limit: 30,
    sort: '-publishDate',
  })

  // Destructure the first as a featured article, and the rest as secondary news
  const featuredArticle = articles && articles.length > 0 ? articles[0] : null
  const secondaryArticles = articles && articles.length > 1 ? articles.slice(1) : []

  // Helper to format Date
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('nl-NL', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    } catch {
      return 'Onlangs'
    }
  }

  // Fallback SVG graphic for articles without custom uploaded media
  const renderFallbackImage = (title: string, index: number) => {
    const gradients = [
      { from: '#1e3a8a', to: '#3b82f6' }, // Premium Corporate Blue
      { from: '#0f766e', to: '#14b8a6' }, // Teal
      { from: '#1e1b4b', to: '#4f46e5' }, // Indigo
    ]
    const grad = gradients[index % gradients.length]
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          minHeight: '200px',
          background: `linear-gradient(135deg, ${grad.from} 0%, ${grad.to} 100%)`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '24px',
          color: '#ffffff',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle grid pattern overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.1,
            backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
            backgroundSize: '16px 16px',
          }}
        />
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          style={{ marginBottom: '12px', opacity: 0.85 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
        </svg>
        <span
          style={{
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            fontWeight: 600,
            opacity: 0.8,
            marginBottom: '4px',
          }}
        >
          Briskala Update
        </span>
      </div>
    )
  }

  return (
    <>
      <Breadcrumb pageTitle="Nieuws" />
      <div className="main">
        <div className="content-col">
          {/* Header section */}
          <h1
            style={{
              fontSize: '32px',
              fontWeight: 800,
              color: '#1e3a8a',
              marginBottom: '24px',
              letterSpacing: '-0.5px',
            }}
          >
            Nieuws & Updates
          </h1>
          <hr style={{ border: 'none', borderBottom: '1px solid #e2e8f0', margin: '0 0 24px 0' }} />

          {/* Featured Article Card */}
          {featuredArticle && (
            <div
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
                marginBottom: '32px',
                transition: 'all 0.3s ease',
              }}
              className="featured-article-card"
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0' }}>
                <div style={{ width: '100%', maxHeight: '320px', overflow: 'hidden' }}>
                  {typeof featuredArticle.image === 'object' && featuredArticle.image?.url ? (
                    <img
                      src={featuredArticle.image.url}
                      alt={featuredArticle.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '260px' }}
                    />
                  ) : (
                    renderFallbackImage(featuredArticle.title, 0)
                  )}
                </div>
                <div style={{ padding: '32px' }}>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      background: '#eff6ff',
                      color: '#1e3a8a',
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '4px 12px',
                      borderRadius: '9999px',
                      marginBottom: '16px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Laatste Nieuws
                  </div>
                  <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '8px' }}>
                    {formatDate(featuredArticle.publishDate)}
                  </div>
                  <h2
                    style={{
                      fontSize: '24px',
                      fontWeight: 700,
                      color: '#1e3a8a',
                      lineHeight: 1.3,
                      marginBottom: '12px',
                      fontFamily: "'Open Sans', sans-serif",
                    }}
                  >
                    {featuredArticle.title}
                  </h2>
                  <p
                    style={{
                      fontSize: '14px',
                      color: '#475569',
                      lineHeight: 1.6,
                      marginBottom: '24px',
                    }}
                  >
                    {featuredArticle.excerpt || 'Klik op de link hieronder om het volledige nieuwsbericht te openen.'}
                  </p>
                  <Link
                    href={`/nieuws/${featuredArticle.id}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      color: '#ffffff',
                      backgroundColor: '#1e3a8a',
                      padding: '10px 20px',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontSize: '14px',
                      fontWeight: 600,
                      boxShadow: '0 2px 4px rgba(30, 58, 138, 0.2)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    Lees volledige bericht &rarr;
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Secondary Articles Section */}
          {secondaryArticles.length > 0 && (
            <div>
              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#1e3a8a',
                  marginBottom: '20px',
                  fontFamily: "'Open Sans', sans-serif",
                  borderBottom: '2px solid #eff6ff',
                  paddingBottom: '8px',
                }}
              >
                Meer Updates & Artikelen
              </h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: '20px',
                }}
              >
                {secondaryArticles.map((article: any, index: number) => (
                  <div
                    key={article.id}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
                      transition: 'all 0.2s ease',
                      borderLeft: '4px solid #1e3a8a',
                    }}
                    className="secondary-article-card"
                  >
                    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}>
                      {/* Left Image column on larger viewports */}
                      <div style={{ flex: '1 1 200px', maxWidth: '240px', minHeight: '160px', overflow: 'hidden' }}>
                        {typeof article.image === 'object' && article.image?.url ? (
                          <img
                            src={article.image.url}
                            alt={article.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        ) : (
                          renderFallbackImage(article.title, index + 1)
                        )}
                      </div>

                      {/* Right Details column */}
                      <div style={{ flex: '2 1 300px', padding: '20px', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '6px' }}>
                          {formatDate(article.publishDate)}
                        </div>
                        <h4
                          style={{
                            fontSize: '16px',
                            fontWeight: 700,
                            color: '#1e3a8a',
                            marginBottom: '8px',
                            lineHeight: 1.4,
                            fontFamily: "'Open Sans', sans-serif",
                          }}
                        >
                          {article.title}
                        </h4>
                        <p
                          style={{
                            fontSize: '13px',
                            color: '#475569',
                            lineHeight: 1.5,
                            marginBottom: '16px',
                            flexGrow: 1,
                          }}
                        >
                          {article.excerpt || 'Klik om de details van deze update te lezen.'}
                        </p>
                        <Link
                          href={`/nieuws/${article.id}`}
                          style={{
                            alignSelf: 'flex-start',
                            color: '#1e3a8a',
                            textDecoration: 'none',
                            fontSize: '13px',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          Lees verder <span style={{ transition: 'transform 0.2s' }}>&rarr;</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {articles.length === 0 && (
            <div
              style={{
                background: '#ffffff',
                padding: '48px 24px',
                textAlign: 'center',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
              }}
            >
              <div
                style={{
                  background: '#f8fafc',
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  color: '#64748b',
                }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                </svg>
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1e3a8a', marginBottom: '8px' }}>
                Geen nieuwsberichten gevonden
              </h3>
              <p style={{ color: '#64748b', fontSize: '14px', maxWidth: '380px', margin: '0 auto' }}>
                Er zijn momenteel geen nieuwsberichten gesynchroniseerd. Voeg een geldige RSS feed URL toe aan de Nieuws Instellingen in het beheerpaneel.
              </p>
            </div>
          )}
        </div>
        
        {/* Global Sidebar component */}
        <Sidebar />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .featured-article-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.06) !important;
        }
        .secondary-article-card:hover {
          transform: translateX(4px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04) !important;
        }
        .secondary-article-card a:hover span {
          transform: translateX(4px);
        }
      `}} />
    </>
  )
}

import React from 'react'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import Link from 'next/link'
import { Breadcrumb } from '@/components/Breadcrumb'
import { Sidebar } from '@/components/Sidebar'
import { RichText } from '@/components/RichText'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await props.params
  try {
    const payload = await getPayload({ config: await configPromise })
    const article = await payload.findByID({
      collection: 'news',
      id: id,
    })
    return {
      title: `${article.title} — Briskala Nieuws`,
      description: article.excerpt || 'Lees het volledige nieuwsbericht op Briskala.',
    }
  } catch {
    return {
      title: 'Nieuwsbericht — Briskala',
    }
  }
}

export default async function NewsDetailPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params

  const payload = await getPayload({ config: await configPromise })
  
  let article: any = null
  try {
    article = await payload.findByID({
      collection: 'news',
      id: id,
    })
  } catch (err) {
    console.error('Error fetching news article:', err)
  }

  if (!article) {
    return notFound()
  }

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

  return (
    <>
      <Breadcrumb pageTitle={article.title} />
      <div className="main">
        <div className="content-col">
          {/* Back button */}
          <Link
            href="/nieuws"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              color: '#64748b',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: 600,
              marginBottom: '16px',
              gap: '6px',
              transition: 'color 0.2s',
            }}
            className="back-to-news-link"
          >
            &larr; Terug naar overzicht
          </Link>

          {/* Article Header */}
          <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Nieuwsbericht · {formatDate(article.publishDate)}
          </div>
          <h1
            style={{
              fontSize: '32px',
              fontWeight: 800,
              color: '#1e3a8a',
              marginBottom: '20px',
              lineHeight: 1.25,
              letterSpacing: '-0.5px',
              fontFamily: "'Open Sans', sans-serif",
            }}
          >
            {article.title}
          </h1>
          <hr style={{ border: 'none', borderBottom: '1px solid #e2e8f0', margin: '0 0 24px 0' }} />

          {/* Featured Image banner */}
          {typeof article.image === 'object' && article.image?.url ? (
            <div
              style={{
                width: '100%',
                maxHeight: '400px',
                overflow: 'hidden',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                marginBottom: '24px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
              }}
            >
              <img
                src={article.image.url}
                alt={article.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '260px' }}
              />
            </div>
          ) : (
            // Custom premium banner for text-only RSS items
            <div
              style={{
                width: '100%',
                padding: '40px 24px',
                background: 'linear-gradient(135deg, #1e3a8a 0%, #1e1b4b 100%)',
                borderRadius: '12px',
                color: '#ffffff',
                marginBottom: '24px',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: 0.08,
                  backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
                  backgroundSize: '16px 16px',
                }}
              />
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ opacity: 0.7 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
              </svg>
            </div>
          )}

          {/* Article Excerpt */}
          {article.excerpt && (
            <p
              style={{
                fontSize: '16px',
                fontWeight: 500,
                color: '#475569',
                lineHeight: 1.6,
                marginBottom: '24px',
                borderLeft: '4px solid #3b82f6',
                paddingLeft: '16px',
                fontStyle: 'italic',
              }}
            >
              {article.excerpt}
            </p>
          )}

          {/* Main rich text content */}
          <div
            style={{
              backgroundColor: '#ffffff',
              padding: '32px',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.01)',
              marginBottom: '32px',
            }}
          >
            <RichText content={article.content} />
          </div>

          {/* Back button at the bottom */}
          <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #eff6ff' }}>
            <Link
              href="/nieuws"
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
              className="bottom-back-button"
            >
              &larr; Terug naar nieuws & updates
            </Link>
          </div>
        </div>

        {/* Global Sidebar component */}
        <Sidebar />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .back-to-news-link:hover {
          color: #1e3a8a !important;
        }
        .bottom-back-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(30, 58, 138, 0.3) !important;
        }
      `}} />
    </>
  )
}

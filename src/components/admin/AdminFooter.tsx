'use client'
import React from 'react'

export function AdminFooter() {
  return (
    <div
      style={{
        marginTop: 'auto',
        padding: '24px 16px 16px 16px',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        fontFamily: "'Outfit', 'Inter', sans-serif",
      }}
    >
      {/* Brand & Info */}
      <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '8px', lineHeight: 1.5 }}>
        © {new Date().getFullYear()} Briskala. Alle rechten voorbehouden.
        <br />
        Beveiligde SSL-verbinding actief.
      </div>
      
      {/* Short Links */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          style={{
            fontSize: '11px',
            color: '#38bdf8',
            textDecoration: 'none',
            fontWeight: 500,
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#7dd3fc')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#38bdf8')}
        >
          Website
        </a>
        <span style={{ color: '#334155', fontSize: '11px' }}>|</span>
        <a
          href="/support"
          style={{
            fontSize: '11px',
            color: '#64748b',
            textDecoration: 'none',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#94a3b8')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#64748b')}
        >
          Support
        </a>
        <span style={{ color: '#334155', fontSize: '11px' }}>|</span>
        <a
          href="/admin/logout"
          style={{
            fontSize: '11px',
            color: '#ef4444',
            textDecoration: 'none',
            fontWeight: 500,
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#f87171')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#ef4444')}
        >
          Uitloggen
        </a>
      </div>
    </div>
  )
}

export default AdminFooter

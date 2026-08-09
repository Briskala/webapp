'use client'
import React, { useState } from 'react'

export function AdminHeader() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)

  const navLinks = [
    { label: 'Bekijk Website', href: '/' },
    { label: 'Klantendashboard', href: '/account' },
    { label: 'Documenten', href: '/admin/collections/documents' },
    { label: 'Berichten', href: '/admin/collections/messages' },
  ]

  return (
    <div
      style={{
        width: '100%',
        background: '#ffffff',
        borderBottom: '1px solid #eaeaea',
        padding: '10px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
        zIndex: 99,
        position: 'relative',
      }}
    >
      {/* Logo */}
      <a href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
        <img
          src="/assets/img/bpark.svg"
          alt="Briskala"
          width={72}
          height={52}
          style={{ display: 'block' }}
        />
      </a>

      {/* Navigation Quick Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onMouseEnter={() => setHoveredLink(link.label)}
            onMouseLeave={() => setHoveredLink(null)}
            style={{
              color: hoveredLink === link.label ? '#1a5276' : '#555',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: 500,
              transition: 'color 0.2s ease',
              borderBottom: hoveredLink === link.label ? '2px solid #1a5276' : '2px solid transparent',
              paddingBottom: '2px',
            }}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 6px #10b981' }} />
        <span style={{ fontSize: '12px', color: '#555', fontWeight: 500 }}>Operationeel</span>
      </div>
    </div>
  )
}

export default AdminHeader

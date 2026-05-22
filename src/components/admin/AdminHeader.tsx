'use client'
import React, { useState } from 'react'

export function AdminHeader() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)

  const navLinks = [
    { label: 'Bekijk Website', href: '/' },
    { label: 'Klantendashboard', href: '/account' },
    { label: 'Documenten Archief', href: '/admin/collections/documents' },
    { label: 'Berichten Center', href: '/admin/collections/messages' },
  ]

  return (
    <div
      style={{
        width: '100%',
        background: 'rgba(15, 23, 42, 0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: '#f8fafc',
        fontFamily: "'Outfit', 'Inter', sans-serif",
        boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.3)',
        zIndex: 99,
        position: 'relative',
      }}
    >
      {/* Title & Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div
          style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: '#10b981',
            boxShadow: '0 0 10px #10b981',
          }}
        />
        <span style={{ fontWeight: 700, fontSize: '15px', letterSpacing: '0.5px' }}>
          BRISKALA <span style={{ color: '#38bdf8', fontWeight: 400 }}>BEHEER</span>
        </span>
        <span
          style={{
            fontSize: '11px',
            background: 'rgba(56, 189, 248, 0.15)',
            color: '#38bdf8',
            padding: '2px 8px',
            borderRadius: '12px',
            fontWeight: 600,
            border: '1px solid rgba(56, 189, 248, 0.3)',
          }}
        >
          v1.1
        </span>
      </div>

      {/* Navigation Quick Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onMouseEnter={() => setHoveredLink(link.label)}
            onMouseLeave={() => setHoveredLink(null)}
            style={{
              color: hoveredLink === link.label ? '#38bdf8' : '#94a3b8',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: 500,
              transition: 'all 0.2s ease',
              transform: hoveredLink === link.label ? 'translateY(-1px)' : 'none',
            }}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Portal Status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '12px', color: '#94a3b8' }}>Status:</span>
        <span style={{ fontSize: '12px', fontWeight: 600, color: '#10b981' }}>Operationeel</span>
      </div>
    </div>
  )
}

export default AdminHeader

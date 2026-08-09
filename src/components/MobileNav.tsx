'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface NavItem {
  id?: string;
  label: string;
  url: string;
  icon?: string; // SVG string from CMS or ReactNode for defaults
}

const DEFAULT_NAV_LINKS = [
  { href: '/', label: 'Home', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
  { href: '/functies', label: 'Functies', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg> },
  { href: '/facturen', label: 'Facturen', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/></svg> },
  { href: '/boekhouding', label: 'Boekhouding', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg> },
  { href: '/rapporten', label: 'Rapporten', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg> },
  { href: '/prijzen', label: 'Prijzen', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
  { href: '/faq', label: 'FAQ', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> },
  { href: '/contact', label: 'Contact', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg> },
  { href: '/probleem-melden', label: 'Probleem Melden', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg> },
];

interface MobileNavProps {
  mainNav?: NavItem[];
}

export function MobileNav({ mainNav }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { user, loading, signOut } = useAuth();

  // If CMS has nav items, use them. Otherwise use the full default with icons.
  const links = mainNav && mainNav.length > 0
    ? mainNav.map(item => ({ href: item.url, label: item.label, icon: null as React.ReactNode }))
    : DEFAULT_NAV_LINKS;

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      {/* Hamburger button */}
      <button
        className="mobile-menu-toggle"
        onClick={() => setOpen(true)}
        aria-label="Menu openen"
        aria-expanded={open}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="3" y1="6" x2="21" y2="6"/>
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      </button>

      {/* Overlay */}
      <div
        className={`mobile-nav-overlay${open ? ' open' : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer */}
      <nav className={`mobile-nav-drawer${open ? ' open' : ''}`} aria-label="Mobiel menu">
        <div className="mobile-nav-header">
          <span className="logo-text">Briskala</span>
          <button className="mobile-nav-close" onClick={() => setOpen(false)} aria-label="Menu sluiten">
            ×
          </button>
        </div>

        <div className="mobile-nav-links">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={pathname === link.href ? { background: '#f0f4f8', color: '#1a5276', fontWeight: 700 } : {}}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </div>

        <div className="mobile-nav-footer">
          {loading ? (
            <span style={{ color: '#666', fontSize: '14px', textAlign: 'center', width: '100%', display: 'block' }}>Laden...</span>
          ) : user ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
              <Link href={`/account/${user.uid}`} className="mobile-nav-user-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                {user.displayName || user.email?.split('@')[0] || 'Mijn Account'}
              </Link>
              <button onClick={() => { signOut(); setOpen(false); }} className="mobile-nav-logout-btn">
                Uitloggen
              </button>
            </div>
          ) : (
            <Link href="/login">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              Inloggen / Registreren
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}

'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';

type Branch = {
  id: string;
  name: string;
  city: string;
  country: 'BE' | 'FR' | 'NL';
  status?: string;
};

type Language = {
  id: string;
  name: string;
  code: string;
  icon: string;
  url: string;
  status?: string;
};

type AccessibilityConfig = {
  active?: boolean | null;
  dropdownLabel?: string | null;
  increaseLabel?: string | null;
  decreaseLabel?: string | null;
  resetLabel?: string | null;
};

type TopBarLink = {
  id?: string;
  label: string;
  url: string;
  icon?: string;
};

type Props = {
  branches: Branch[];
  languages: Language[];
  accessibility: AccessibilityConfig;
  topBarLinks?: TopBarLink[];
};

const countryLabels: Record<string, string> = {
  BE: 'België',
  FR: 'France',
  NL: 'Nederland',
};

const BASE_FONT_SIZE = 14;
const FONT_STEP = 2;
const MIN_FONT = 10;
const MAX_FONT = 24;

export function TopBarClient({ branches, languages, accessibility, topBarLinks = [] }: Props) {
  const [fontSize, setFontSize] = useState(BASE_FONT_SIZE);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

  // Load saved font size
  useEffect(() => {
    const saved = localStorage.getItem('bpag-font-size');
    if (saved) {
      const size = parseInt(saved, 10);
      setFontSize(size);
      document.documentElement.style.setProperty('--user-font-size', `${size}px`);
    }
  }, []);

  // IP-based branch auto-detection + cookie
  useEffect(() => {
    const COOKIE_KEY = 'bpag-branch';
    const getCookie = (name: string) => {
      const m = document.cookie.match(`(^|;)\\s*${name}=([^;]+)`);
      return m ? decodeURIComponent(m[2]) : null;
    };
    const setCookie = (name: string, value: string, days = 365) => {
      const exp = new Date(Date.now() + days * 864e5).toUTCString();
      document.cookie = `${name}=${encodeURIComponent(value)};expires=${exp};path=/;SameSite=Lax`;
    };

    // Check cookie first
    const saved = getCookie(COOKIE_KEY);
    if (saved && branches.length > 0) {
      const found = branches.find(b => b.id === saved);
      if (found) { setSelectedBranch(found); return; }
    }

    // No cookie — detect via IP
    if (branches.length > 0) {
      fetch('https://ipapi.co/json/', { cache: 'no-store' })
        .then(r => r.json())
        .then(data => {
          const countryCode = (data?.country_code || '').toUpperCase();
          // Map country code to our branch country field
          const countryMap: Record<string, 'BE' | 'NL' | 'FR'> = { BE: 'BE', NL: 'NL', FR: 'FR' };
          const mapped = countryMap[countryCode];
          const match = mapped ? branches.find(b => b.country === mapped && b.status === 'active') : null;
          const branch = match || branches[0]; // fallback to first
          if (branch) {
            setSelectedBranch(branch);
            setCookie(COOKIE_KEY, branch.id);
          }
        })
        .catch(() => {
          // Fallback silently to first branch
          if (branches[0]) setSelectedBranch(branches[0]);
        });
    }
  }, [branches]);

  const handleSelectBranch = (branch: Branch) => {
    setSelectedBranch(branch);
    const exp = new Date(Date.now() + 365 * 864e5).toUTCString();
    document.cookie = `bpag-branch=${encodeURIComponent(branch.id)};expires=${exp};path=/;SameSite=Lax`;
  };

  const changeFontSize = (newSize: number) => {
    const clamped = Math.max(MIN_FONT, Math.min(MAX_FONT, newSize));
    setFontSize(clamped);
    localStorage.setItem('bpag-font-size', String(clamped));
    document.documentElement.style.setProperty('--user-font-size', `${clamped}px`);
    document.body.style.fontSize = `${clamped}px`;
  };

  const resetFontSize = () => changeFontSize(BASE_FONT_SIZE);

  // Group branches by country
  const grouped = branches.reduce<Record<string, Branch[]>>((acc, b) => {
    if (!acc[b.country]) acc[b.country] = [];
    acc[b.country].push(b);
    return acc;
  }, {});

  const activeLangs = languages.filter((l) => l.status === 'active');
  const currentLang = activeLangs[0];

  return (
    <div className="top-bar">
      <div className="inner">
        {/* Left side */}
        <div className="left">
          <span>Briskala Property & Asset Group</span>
          <span className="sep">|</span>

          {/* Vestiging dropdown */}
          <Menu as="div" style={{ position: 'relative', display: 'inline-block' }}>
            <MenuButton style={{ background: 'none', border: 'none', color: '#cce', cursor: 'pointer', fontSize: '11px', padding: '0', fontFamily: 'inherit' }}>
              {selectedBranch ? `📍 ${selectedBranch.name}` : 'Vestiging ▾'}
            </MenuButton>
            <MenuItems
              transition
              style={{ position: 'absolute', top: '20px', left: '0', background: '#fff', color: '#333', border: '1px solid #ddd', borderRadius: '4px', boxShadow: '0 4px 16px rgba(0,0,0,0.15)', zIndex: 9999, minWidth: '280px', maxHeight: '400px', overflowY: 'auto' }}
            >
              <div style={{ padding: '10px 14px', background: '#1a5276', color: '#fff', fontWeight: 700, fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon>
                  <line x1="9" y1="3" x2="9" y2="21"></line>
                  <line x1="15" y1="3" x2="15" y2="21"></line>
                </svg>
                Onze Vestigingen
              </div>
              {['BE', 'FR', 'NL'].map((country) => (
                (grouped[country] || []).length > 0 && (
                  <div key={country}>
                    <div style={{ padding: '8px 14px', background: '#f0f4f8', fontWeight: 700, fontSize: '11px', color: '#1a5276', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {countryLabels[country]}
                    </div>
                    {(grouped[country] || []).map((branch) => (
                      <MenuItem key={branch.id} as="div">
                        {({ focus }: { focus: boolean }) => (
                          <div
                            onClick={() => handleSelectBranch(branch)}
                            style={{ padding: '7px 14px 7px 20px', borderBottom: '1px solid #f0f0f0', fontSize: '12px', cursor: 'pointer', background: focus ? '#f7f9fb' : selectedBranch?.id === branch.id ? '#eaf4fb' : '', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: selectedBranch?.id === branch.id ? 700 : 400 }}
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                              <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            {branch.name}
                            {selectedBranch?.id === branch.id && <span style={{ marginLeft: 'auto', color: '#1a5276' }}>✓</span>}
                          </div>
                        )}
                      </MenuItem>
                    ))}
                  </div>
                )
              ))}
            </MenuItems>
          </Menu>
        </div>

        {/* Right side */}
        <div className="right">

          {/* Language selector */}
          <Menu as="div" style={{ position: 'relative', display: 'inline-block' }}>
            <MenuButton style={{ background: 'none', border: 'none', color: '#cce', cursor: 'pointer', fontSize: '11px', padding: '0', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
              {currentLang?.code || 'NL'} ▾
            </MenuButton>
            <MenuItems
              transition
              style={{ position: 'absolute', top: '20px', right: '0', background: '#fff', color: '#333', border: '1px solid #ddd', borderRadius: '4px', boxShadow: '0 4px 16px rgba(0,0,0,0.15)', zIndex: 9999, minWidth: '150px' }}
            >
              <div style={{ padding: '8px 12px', background: '#1a5276', color: '#fff', fontWeight: 700, fontSize: '11px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
                Taal / Language
              </div>
              {activeLangs.map((lang) => (
                <MenuItem key={lang.id} as={Link} href={lang.url}>
                  {({ focus }) => (
                    <div style={{ padding: '9px 14px', fontSize: '12px', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', gap: '8px', background: focus ? '#f7f9fb' : '' }}>
                      {lang.icon} <strong>{lang.code}</strong> — {lang.name}
                    </div>
                  )}
                </MenuItem>
              ))}
            </MenuItems>
          </Menu>

          <span className="sep">|</span>

          {/* Dynamic top bar links (from CMS) or defaults */}
          {topBarLinks.length > 0 ? (
            topBarLinks.map((link, i) => (
              <React.Fragment key={link.id || i}>
                <span className="sep">|</span>
                <Link href={link.url} style={{ color: '#cce', fontSize: '11px' }}>
                  {link.icon && <span style={{ marginRight: '4px' }}>{link.icon}</span>}
                  {link.label}
                </Link>
              </React.Fragment>
            ))
          ) : (
            <>
              <span className="sep">|</span>
              <Link href="/probleem-melden" style={{ color: '#cce', fontSize: '11px' }}>Probleem melden</Link>
            </>
          )}

          <span className="sep">|</span>

          {/* Accessibility */}
          {accessibility.active !== false && (
            <Menu as="div" style={{ position: 'relative', display: 'inline-block' }}>
              <MenuButton style={{ background: 'none', border: 'none', color: '#cce', cursor: 'pointer', fontSize: '11px', padding: '0', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 16v-5"></path>
                  <path d="M16 12H8"></path>
                  <circle cx="12" cy="7" r="1"></circle>
                </svg>
                {accessibility.dropdownLabel || 'Toegankelijkheid ▾'}
              </MenuButton>
              <MenuItems
                transition
                style={{ position: 'absolute', top: '20px', right: '0', background: '#fff', color: '#333', border: '1px solid #ddd', borderRadius: '4px', boxShadow: '0 4px 16px rgba(0,0,0,0.15)', zIndex: 9999, minWidth: '200px' }}
              >
                <div style={{ padding: '8px 12px', background: '#1a5276', color: '#fff', fontWeight: 700, fontSize: '11px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 16v-5"></path>
                    <path d="M16 12H8"></path>
                    <circle cx="12" cy="7" r="1"></circle>
                  </svg>
                  Tekstgrootte
                </div>
                <MenuItem as="div">
                  {({ focus }) => (
                    <div
                      onClick={() => changeFontSize(fontSize + FONT_STEP)}
                      style={{ padding: '10px 14px', fontSize: '13px', cursor: 'pointer', borderBottom: '1px solid #f0f0f0', fontWeight: 700, background: focus ? '#f7f9fb' : '' }}
                    >
                      {accessibility.increaseLabel || 'A+ Tekst vergroten'}
                    </div>
                  )}
                </MenuItem>
                <MenuItem as="div">
                  {({ focus }) => (
                    <div
                      onClick={() => changeFontSize(fontSize - FONT_STEP)}
                      style={{ padding: '10px 14px', fontSize: '13px', cursor: 'pointer', borderBottom: '1px solid #f0f0f0', fontWeight: 700, background: focus ? '#f7f9fb' : '' }}
                    >
                      {accessibility.decreaseLabel || 'A- Tekst verkleinen'}
                    </div>
                  )}
                </MenuItem>
                <MenuItem as="div">
                  {({ focus }) => (
                    <div
                      onClick={resetFontSize}
                      style={{ padding: '10px 14px', fontSize: '13px', cursor: 'pointer', fontWeight: 700, background: focus ? '#f7f9fb' : '' }}
                    >
                      {accessibility.resetLabel || 'A Reset tekstgrootte'}
                    </div>
                  )}
                </MenuItem>
              </MenuItems>
            </Menu>
          )}
        </div>
      </div>
    </div>
  );
}

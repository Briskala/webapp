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

type Props = {
  branches: Branch[];
  languages: Language[];
  accessibility: AccessibilityConfig;
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

export function TopBarClient({ branches, languages, accessibility }: Props) {
  const [fontSize, setFontSize] = useState(BASE_FONT_SIZE);

  // Load saved font size
  useEffect(() => {
    const saved = localStorage.getItem('bpag-font-size');
    if (saved) {
      const size = parseInt(saved, 10);
      setFontSize(size);
      document.documentElement.style.setProperty('--user-font-size', `${size}px`);
    }
  }, []);

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
              Vestiging ▾
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
                        {({ focus }) => (
                          <div style={{ padding: '7px 14px 7px 20px', borderBottom: '1px solid #f0f0f0', fontSize: '12px', cursor: 'pointer', background: focus ? '#f7f9fb' : '', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                              <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            {branch.name}
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

          {/* Probleem melden */}
          <Link href="/probleem-melden" style={{ color: '#cce', fontSize: '11px' }}>Probleem melden</Link>

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

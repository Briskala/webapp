import React from 'react';
import Link from 'next/link';

import { HeaderSearch } from './HeaderSearch';
import { HeaderAuthButton } from './HeaderAuthButton';
import { MobileNav } from './MobileNav';
import { MAIN_NAV } from '@/content/briskala';

interface NavItem {
  id?: string;
  label: string;
  url: string;
}

const DEFAULT_NAV: NavItem[] = [
  ...MAIN_NAV.filter((item) => item.url !== '/contact'),
  { label: 'Accounting', url: '/accounting' },
  { label: 'Contact', url: '/contact' },
];

interface HeaderProps {
  mainNav?: NavItem[];
}

export function Header({ mainNav }: HeaderProps) {
  const navItems = mainNav && mainNav.length > 0 ? mainNav : DEFAULT_NAV;

  return (
    <header className="site-header">
      <div className="inner">
        <div className="logo">
          <Link href="/">
            <img className="img-fluid" width="101" height="74" src="/assets/img/bpark.svg" alt="Briskala" />
          </Link>
        </div>
        <nav className="main-nav">
          {navItems.map((item, index) => (
            <Link key={item.id || index} href={item.url}>{item.label}</Link>
          ))}
        </nav>
        <div className="header-actions">
          <div className="desktop-search">
            <HeaderSearch />
          </div>
          <HeaderAuthButton />
          <MobileNav mainNav={navItems} />
        </div>
      </div>
      <div className="mobile-search-bar">
        <HeaderSearch />
      </div>
    </header>
  );
}

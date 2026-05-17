import React from 'react';
import Link from 'next/link';

import { HeaderSearch } from './HeaderSearch';

import { HeaderAuthButton } from './HeaderAuthButton';
import { MobileNav } from './MobileNav';

export function Header() {
  return (
    <header className="site-header">
      <div className="inner">
        <div className="logo">
          <span>
            <img className="img-fluid" width="101" height="74" src="/assets/img/bpark.svg" alt="BPAG Logo" />
          </span>
        </div>
        <nav className="main-nav">
          <Link href="/woningbouw">Woningbouw Advies</Link>
          <Link href="/autofinanciering">Autofinanciering</Link>
          <Link href="/vastgoed">Vastgoed Advies</Link>
          <Link href="/olietanken">Olietanken Advies</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <div className="header-actions">
          <div className="desktop-search">
            <HeaderSearch />
          </div>
          <HeaderAuthButton />
          <MobileNav />
        </div>
      </div>
      <div className="mobile-search-bar">
        <HeaderSearch />
      </div>
    </header>
  );
}

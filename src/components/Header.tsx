import React from 'react';
import Link from 'next/link';

import { HeaderSearch } from './HeaderSearch';

import { HeaderAuthButton } from './HeaderAuthButton';

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
          <Link href="/woningbouw">Woningbouw</Link>
          <Link href="/autofinanciering">Autofinanciering</Link>
          <Link href="/vastgoed">Vastgoed</Link>
          <Link href="/olietanken">Olietanken</Link>
          <Link href="/diensten">Diensten</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <div className="header-actions">
          <HeaderSearch />
          <HeaderAuthButton />
        </div>
      </div>
    </header>
  );
}

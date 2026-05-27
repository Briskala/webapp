import React from 'react';
import Link from 'next/link';

export function AdminNavbar() {
  return (
    <header style={{
      width: '100%',
      padding: '16px 40px',
      background: '#ffffff',
      borderBottom: '1px solid #eaeaea',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
    }}>
      <Link href="/">
        <img width="101" height="74" src="/assets/img/bpark.svg" alt="BPAG Logo" style={{ cursor: 'pointer' }} />
      </Link>
      <Link href="/" style={{
        color: '#1a5276',
        textDecoration: 'none',
        fontSize: '14px',
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        Terug naar website
      </Link>
    </header>
  );
}

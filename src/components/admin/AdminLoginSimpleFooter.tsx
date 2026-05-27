import React from 'react';
import Link from 'next/link';

export function AdminLoginSimpleFooter() {
  return (
    <footer style={{
      width: '100%',
      padding: '24px 40px',
      background: '#ffffff',
      borderTop: '1px solid #eaeaea',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '13px',
      color: '#666',
      marginTop: 'auto'
    }}>
      <div>
        © {new Date().getFullYear()} Briskala Property & Asset Group. Alle rechten voorbehouden.
      </div>
      <div style={{ display: 'flex', gap: '16px' }}>
        <Link href="/privacy-policy" style={{ color: '#1a5276', textDecoration: 'none' }}>Privacy Policy</Link>
        <Link href="/terms-and-conditions" style={{ color: '#1a5276', textDecoration: 'none' }}>Algemene Voorwaarden</Link>
        <Link href="/cookiebeleid" style={{ color: '#1a5276', textDecoration: 'none' }}>Cookiebeleid</Link>
      </div>
    </footer>
  );
}

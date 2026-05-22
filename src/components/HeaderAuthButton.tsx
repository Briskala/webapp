'use client';
import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export function HeaderAuthButton() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <span className="btn-signin" style={{ display: 'flex', alignItems: 'center', opacity: 0.7 }}>
        Laden...
      </span>
    );
  }

  if (user) {
    const displayName = user.displayName || user.email?.split('@')[0] || 'Mijn Account';
    return (
      <Link href={`/account/${user.uid}`} className="btn-signin" style={{ display: 'flex', alignItems: 'center' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
        {displayName}
      </Link>
    );
  }

  return (
    <Link href="/login" className="btn-signin" style={{ display: 'flex', alignItems: 'center' }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
      <span>Inloggen / Registreren</span>
    </Link>
  );
}

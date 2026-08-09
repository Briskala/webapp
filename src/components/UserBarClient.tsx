'use client';
import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export function UserBarClient() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [status, setStatus] = React.useState({ messageCount: 0, customerNumber: 'Niet ingelogd' });

  React.useEffect(() => {
    if (user?.uid) {
      fetch(`/api/user/status?uid=${user.uid}`)
        .then(res => res.json())
        .then(data => {
          if (!data.error) setStatus(data);
        })
        .catch(console.error);
    }
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="user-bar">
        <div className="inner">
          <div className="user-info">
            <span style={{ color: '#aaa', fontSize: '12px' }}>Laden…</span>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    // Guest state
    return (
      <div className="user-bar">
        <div className="inner">
          <div className="user-info">
            <span>Welkom, Gast &nbsp;|&nbsp; Accountnr: <em>Niet ingelogd</em> &nbsp;|&nbsp; </span>
            <Link href="/login">Mijn account</Link>
          </div>
        </div>
      </div>
    );
  }

  // Logged-in state
  const displayName = user.displayName || user.email?.split('@')[0] || 'Gebruiker';

  return (
    <div className="user-bar">
      <div className="inner">
        <div className="user-info" style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', minWidth: 0 }}>
          {user.photoURL && (
            <img src={user.photoURL} alt="Avatar" style={{ width: '20px', height: '20px', borderRadius: '50%', border: '1px solid #ccc', flexShrink: 0 }} />
          )}
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '160px' }}>
            Welkom, <strong>{displayName}</strong>
          </span>
          <span style={{ color: '#aaa', flexShrink: 0 }}>|</span>
          <Link href={`/account/${user.uid}`} style={{ whiteSpace: 'nowrap' }}>Mijn account</Link>
          <span style={{ color: '#aaa', flexShrink: 0 }}>|</span>
          <button onClick={handleSignOut} style={{ background: 'none', border: 'none', color: '#c0392b', cursor: 'pointer', fontSize: '12px', padding: 0, whiteSpace: 'nowrap' }}>
            Uitloggen
          </button>
        </div>
        <div className="balance">
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px', flexShrink: 0 }}>
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            Saldo: <strong style={{ marginLeft: '4px' }}>€ 0,00</strong>
          </span>
        </div>
        <div className="mail">
          <span style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '4px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            Berichten: <strong>{status.messageCount > 0 ? status.messageCount : '0'}</strong>
            {status.messageCount > 0 && (
              <Link href={`/account/${user.uid}/berichten`} style={{ fontSize: '11px', background: '#e74c3c', color: '#fff', padding: '2px 6px', borderRadius: '4px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
                Lees alles
              </Link>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

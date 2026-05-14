'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, User, FileText, Settings, MessageSquare, Briefcase } from 'lucide-react';

type Props = {
  params: { uid: string };
  labels: {
    title: string;
    welcomeText: string;
    customerNumberLabel: string;
    profileLabel: string;
    menuGegevens: string;
    menuAanvragen: string;
    menuDiensten: string;
    menuBerichten: string;
    menuUitloggen: string;
  };
  dbUser: {
    customerNumber?: string;
    balance?: number;
    messageCount?: number;
    profileType?: string;
  } | null;
};

export function AccountPageClient({ params, labels, dbUser }: Props) {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#1a5276', fontSize: '16px' }}>Laden…</div>
      </div>
    );
  }

  if (!user) return null;

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  const menuItems = [
    { icon: <User size={18} />, label: labels.menuGegevens, href: `/account/${user.uid}/gegevens` },
    { icon: <FileText size={18} />, label: labels.menuAanvragen, href: `/account/${user.uid}/aanvragen` },
    { icon: <Briefcase size={18} />, label: labels.menuDiensten, href: `/account/${user.uid}/diensten` },
    { icon: <MessageSquare size={18} />, label: labels.menuBerichten, href: `/account/${user.uid}/berichten`, badge: dbUser?.messageCount },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f7f9fb' }}>
      {/* Account Header */}
      <div style={{ background: '#1a5276', padding: '0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
          {/* Breadcrumb bar */}
          <div style={{ padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href="/" style={{ color: '#aad4ef', fontSize: '12px', textDecoration: 'none' }}>
              ← Terug naar home
            </Link>
            <span style={{ color: '#aad4ef', fontSize: '12px' }}>
              {labels.customerNumberLabel}: <strong style={{ color: '#fff' }}>{dbUser?.customerNumber || '—'}</strong>
            </span>
          </div>

          {/* User info */}
          <div style={{ padding: '28px 0', display: 'flex', alignItems: 'center', gap: '20px' }}>
            {user.photoURL ? (
              <img src={user.photoURL} alt="Profiel" style={{ width: '64px', height: '64px', borderRadius: '50%', border: '3px solid rgba(255,255,255,0.3)' }} />
            ) : (
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', color: '#fff', fontWeight: 700 }}>
                {user.displayName?.[0] || user.email?.[0] || '?'}
              </div>
            )}
            <div>
              <h1 style={{ color: '#fff', fontSize: '24px', fontWeight: 700, margin: '0 0 4px' }}>
                {labels.welcomeText}, {user.displayName || user.email?.split('@')[0]}
              </h1>
              <p style={{ color: '#aad4ef', fontSize: '13px', margin: 0 }}>
                {user.email} · {labels.profileLabel}: <strong style={{ color: '#fff', textTransform: 'capitalize' }}>{dbUser?.profileType || 'Particulier'}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ background: '#2471a3', padding: '0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px', display: 'flex', gap: '32px' }}>
          <div style={{ padding: '14px 0', color: '#fff', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            Saldo: <strong>€ {(dbUser?.balance ?? 0).toFixed(2)}</strong>
          </div>
          <div style={{ padding: '14px 0', color: '#fff', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            Berichten: <strong>{dbUser?.messageCount ?? 0}</strong>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: '1200px', margin: '32px auto', padding: '0 16px', display: 'grid', gridTemplateColumns: '260px 1fr', gap: '32px' }}>
        {/* Sidebar menu */}
        <div style={{ background: '#fff', borderRadius: '6px', border: '1px solid #e0e0e0', overflow: 'hidden' }}>
          <div style={{ padding: '12px 16px', background: '#f0f4f8', borderBottom: '1px solid #e0e0e0', fontWeight: 700, color: '#1a5276', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {labels.title}
          </div>
          {menuItems.map((item, i) => (
            <Link key={i} href={item.href} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderBottom: '1px solid #f0f4f8', color: '#333', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: '#2471a3' }}>{item.icon}</span>
                {item.label}
              </span>
              {item.badge ? (
                <span style={{ background: '#2471a3', color: '#fff', borderRadius: '12px', padding: '2px 8px', fontSize: '11px', fontWeight: 700 }}>{item.badge}</span>
              ) : null}
            </Link>
          ))}
          <button
            onClick={handleSignOut}
            style={{ width: '100%', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '10px', background: 'none', border: 'none', color: '#c0392b', fontSize: '14px', fontWeight: 500, cursor: 'pointer', textAlign: 'left' }}
          >
            <LogOut size={18} />
            {labels.menuUitloggen}
          </button>
        </div>

        {/* Main panel */}
        <div style={{ background: '#fff', borderRadius: '6px', border: '1px solid #e0e0e0', padding: '28px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1a5276', marginBottom: '20px' }}>
            Overzicht
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            {[
              { label: 'E-mail', value: user.email },
              { label: labels.customerNumberLabel, value: dbUser?.customerNumber || '—' },
              { label: labels.profileLabel, value: dbUser?.profileType || 'Particulier' },
              { label: 'Saldo', value: `€ ${(dbUser?.balance ?? 0).toFixed(2)}` },
            ].map((item, i) => (
              <div key={i} style={{ padding: '16px', background: '#f7f9fb', borderRadius: '4px', border: '1px solid #e8edf2' }}>
                <div style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>{item.label}</div>
                <div style={{ fontSize: '15px', fontWeight: 600, color: '#333' }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

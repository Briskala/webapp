'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function HeaderSearch() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Save to recent searches in cookie
    try {
      const existingCookie = document.cookie.split('; ').find(row => row.startsWith('recent_searches='));
      let recent = [];
      if (existingCookie) {
        recent = JSON.parse(decodeURIComponent(existingCookie.split('=')[1]));
      }
      // Add new query to front, remove duplicates, keep max 5
      recent = [query.trim(), ...recent.filter((q: string) => q.toLowerCase() !== query.trim().toLowerCase())].slice(0, 5);
      document.cookie = `recent_searches=${encodeURIComponent(JSON.stringify(recent))}; path=/; max-age=2592000`; // 30 days
    } catch (e) {
      console.error('Failed to save search cookie', e);
    }

    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <form className="search-box" onSubmit={handleSearch} style={{ display: 'flex', margin: 0 }}>
      <input 
        type="text" 
        placeholder="Zoeken…" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ border: 'none', background: 'transparent', outline: 'none', flex: 1 }}
      />
      <button type="submit" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 12px', display: 'flex', alignItems: 'center', width: 'auto', minHeight: 'auto' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>
    </form>
  );
}

'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import '@/components/accounting/accounting.css'

type CompanyCard = {
  name: string
  slug: string
  publicHash: string
  currency?: string
  role?: string
  href: string
}

export default function AccountingPickerPage() {
  const { user, loading } = useAuth()
  const [companies, setCompanies] = useState<CompanyCard[]>([])
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  const loadCompanies = async () => {
    const res = await fetch('/api/accounting/companies')
    if (res.status === 401) {
      setCompanies([])
      return
    }
    const data = await res.json()
    setCompanies(data.companies || [])
  }

  useEffect(() => {
    if (loading) return
    ;(async () => {
      try {
        if (user) {
          await fetch('/api/accounting/session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
            }),
          })
        }
        await loadCompanies()
      } catch (e) {
        setError('Kon bedrijven niet laden.')
      }
    })()
  }, [user, loading])

  const startDemo = async () => {
    setBusy(true)
    setError('')
    try {
      const res = await fetch('/api/accounting/demo-session', { method: 'POST' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Demo mislukt')
      setCompanies(data.companies || [])
      setMessage('Demo-sessie gestart. Kies een bedrijf om verder te gaan.')
    } catch (e: any) {
      setError(e.message || 'Demo mislukt')
    } finally {
      setBusy(false)
    }
  }

  const createCompany = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      if (user) {
        await fetch('/api/accounting/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
          }),
        })
      }
      const res = await fetch('/api/accounting/companies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Aanmaken mislukt')
      setName('')
      await loadCompanies()
      setMessage(`Bedrijf “${data.company.name}” aangemaakt.`)
    } catch (e: any) {
      setError(e.message || 'Aanmaken mislukt')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="acc-shell">
      <div className="acc-topbar">
        <div className="acc-topbar-inner acc-topbar-row">
          <div>
            <h1 className="acc-company-title">Accounting</h1>
            <p className="acc-company-meta">
              Kies een bedrijf of maak een nieuwe administratie aan — onderdeel van Briskala.
            </p>
          </div>
          <Link href={user ? `/account/${user.uid}` : '/login'} className="acc-role-pill" style={{ textDecoration: 'none', color: '#fff' }}>
            ← Terug naar Briskala
          </Link>
        </div>
      </div>

      <div className="acc-picker-inner" style={{ paddingTop: 28, paddingBottom: 48 }}>
        {error && (
          <div className="acc-panel" style={{ borderColor: '#fecaca', background: '#fef2f2', color: '#991b1b' }}>
            {error}
          </div>
        )}
        {message && (
          <div className="acc-panel" style={{ borderColor: '#a7f3d0', background: '#ecfdf5', color: '#065f46' }}>
            {message}
          </div>
        )}

        <div className="acc-panel">
          <h2>Uw bedrijven</h2>
          <p className="lead">
            Elke administratie heeft een eigen omgeving onder{' '}
            <code>/accounting/&#123;bedrijf&#125;/&#123;hash&#125;</code>.
          </p>

          {companies.length === 0 ? (
            <div className="acc-empty">
              Nog geen bedrijven gekoppeld aan dit account.
              <div className="acc-actions" style={{ justifyContent: 'center', marginTop: 16, marginBottom: 0 }}>
                <button className="acc-btn" onClick={startDemo} disabled={busy}>
                  Start demo-administratie
                </button>
                {!user && (
                  <Link className="acc-btn secondary" href="/login">
                    Inloggen bij Briskala
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <div className="acc-picker-grid">
              {companies.map((c) => (
                <Link key={c.href} href={c.href} className="acc-company-card">
                  <h3>{c.name}</h3>
                  <p>
                    Rol: {c.role || 'member'} · Valuta: {c.currency || 'EUR'}
                  </p>
                  <p style={{ marginTop: 8, color: '#1a5276', fontWeight: 700 }}>Open accounting →</p>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="acc-panel">
          <h2>Nieuw bedrijf</h2>
          <p className="lead">Maak een gescheiden administratie aan met eigen grootboek, facturen en btw.</p>
          <form onSubmit={createCompany}>
            <div className="acc-form-grid">
              <div className="acc-field">
                <label>Bedrijfsnaam</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Bijv. Briskala BV"
                  required
                />
              </div>
            </div>
            <div className="acc-actions">
              <button className="acc-btn" type="submit" disabled={busy || !name.trim()}>
                Bedrijf aanmaken
              </button>
              <button className="acc-btn secondary" type="button" onClick={startDemo} disabled={busy}>
                Of laad demo-data
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

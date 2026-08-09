'use client'

import React, { useEffect, useState } from 'react'
import { Money } from './Money'

type Props = {
  companySlug: string
  publicHash: string
  type: 'invoices' | 'bills' | 'expenses' | 'payments' | 'contacts' | 'accounts' | 'journals' | 'ledger' | 'taxes'
  title: string
  lead: string
  canWrite: boolean
  currency?: string
  createType?: 'invoice' | 'bill' | 'expense' | 'payment' | 'contact' | 'journal'
}

export function ResourceClient({
  companySlug,
  publicHash,
  type,
  title,
  lead,
  canWrite,
  currency = 'EUR',
  createType,
}: Props) {
  const [docs, setDocs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const base = `/api/accounting/${companySlug}/${publicHash}/resources`

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${base}?type=${type}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Laden mislukt')
      setDocs(data.docs || [])
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companySlug, publicHash, type])

  const quickCreate = async () => {
    if (!createType) return
    setBusy(true)
    setError('')
    try {
      let data: any = {}
      if (createType === 'invoice') {
        data = {
          customerName: 'Nieuwe klant',
          lines: [{ description: 'Dienstverlening', quantity: 1, unitPrice: 250, vatRate: 21 }],
        }
      } else if (createType === 'bill') {
        data = {
          supplierName: 'Nieuwe leverancier',
          lines: [{ description: 'Inkoop', quantity: 1, unitPrice: 120, vatRate: 21 }],
        }
      } else if (createType === 'expense') {
        data = { description: 'Kleine uitgave', subtotal: 45, vatRate: 21, vendor: 'Leverancier' }
      } else if (createType === 'payment') {
        data = { direction: 'incoming', amount: 100, reference: `PAY-${Date.now()}` }
      } else if (createType === 'contact') {
        data = { name: 'Nieuwe relatie', type: 'customer', email: 'info@example.com' }
      } else if (createType === 'journal') {
        data = {
          memo: 'Memoriaalboeking',
          lines: [
            { accountCode: '4600', debit: 50, credit: 0 },
            { accountCode: '1000', debit: 0, credit: 50 },
          ],
        }
      }

      const res = await fetch(base, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: createType, data }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Opslaan mislukt')
      await load()
    } catch (e: any) {
      setError(e.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="acc-panel">
      <h2>{title}</h2>
      <p className="lead">{lead}</p>

      {canWrite && createType && (
        <div className="acc-actions">
          <button className="acc-btn" onClick={quickCreate} disabled={busy}>
            {busy ? 'Bezig…' : 'Snel toevoegen'}
          </button>
          <button className="acc-btn secondary" onClick={load} disabled={loading}>
            Vernieuwen
          </button>
        </div>
      )}

      {error && (
        <div style={{ marginBottom: 12, color: '#991b1b', fontSize: 14 }}>{error}</div>
      )}

      {loading ? (
        <div className="acc-empty">Laden…</div>
      ) : docs.length === 0 ? (
        <div className="acc-empty">Geen gegevens gevonden.</div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="acc-table">
            <thead>
              <tr>
                {type === 'invoices' && (<><th>Nummer</th><th>Klant</th><th>Status</th><th className="num">Totaal</th><th className="num">Open</th></>)}
                {type === 'bills' && (<><th>Nummer</th><th>Leverancier</th><th>Status</th><th className="num">Totaal</th><th className="num">Open</th></>)}
                {type === 'expenses' && (<><th>Datum</th><th>Omschrijving</th><th>Status</th><th className="num">Totaal</th></>)}
                {type === 'payments' && (<><th>Datum</th><th>Referentie</th><th>Richting</th><th className="num">Bedrag</th></>)}
                {type === 'contacts' && (<><th>Naam</th><th>Type</th><th>E-mail</th></>)}
                {type === 'accounts' && (<><th>Code</th><th>Naam</th><th>Type</th></>)}
                {type === 'ledger' && (<><th>Datum</th><th>Omschrijving</th><th>Bron</th><th className="num">Debet</th></>)}
                {type === 'taxes' && (<><th>Naam</th><th className="num">Tarief</th><th>Type</th></>)}
                {type === 'journals' && (<><th>Referentie</th><th>Datum</th><th>Status</th></>)}
              </tr>
            </thead>
            <tbody>
              {docs.map((doc) => (
                <tr key={doc.id}>
                  {type === 'invoices' && (
                    <>
                      <td>{doc.number}</td>
                      <td>{doc.customerName || '—'}</td>
                      <td><span className={`acc-badge ${doc.status}`}>{doc.status}</span></td>
                      <td className="num"><Money amount={doc.total} currency={currency} /></td>
                      <td className="num"><Money amount={doc.balanceDue} currency={currency} /></td>
                    </>
                  )}
                  {type === 'bills' && (
                    <>
                      <td>{doc.number}</td>
                      <td>{doc.supplierName || '—'}</td>
                      <td><span className={`acc-badge ${doc.status}`}>{doc.status}</span></td>
                      <td className="num"><Money amount={doc.total} currency={currency} /></td>
                      <td className="num"><Money amount={doc.balanceDue} currency={currency} /></td>
                    </>
                  )}
                  {type === 'expenses' && (
                    <>
                      <td>{String(doc.expenseDate).slice(0, 10)}</td>
                      <td>{doc.description}</td>
                      <td><span className={`acc-badge ${doc.status}`}>{doc.status}</span></td>
                      <td className="num"><Money amount={doc.total} currency={currency} /></td>
                    </>
                  )}
                  {type === 'payments' && (
                    <>
                      <td>{String(doc.paymentDate).slice(0, 10)}</td>
                      <td>{doc.reference}</td>
                      <td>{doc.direction}</td>
                      <td className="num"><Money amount={doc.amount} currency={currency} /></td>
                    </>
                  )}
                  {type === 'contacts' && (
                    <>
                      <td>{doc.name}</td>
                      <td>{doc.type}</td>
                      <td>{doc.email || '—'}</td>
                    </>
                  )}
                  {type === 'accounts' && (
                    <>
                      <td>{doc.code}</td>
                      <td>{doc.name}</td>
                      <td>{doc.type}</td>
                    </>
                  )}
                  {type === 'ledger' && (
                    <>
                      <td>{String(doc.entryDate).slice(0, 10)}</td>
                      <td>{doc.description}</td>
                      <td><span className="acc-badge">{doc.sourceType}</span></td>
                      <td className="num"><Money amount={doc.debitTotal} currency={currency} /></td>
                    </>
                  )}
                  {type === 'taxes' && (
                    <>
                      <td>{doc.name}</td>
                      <td className="num">{doc.rate}%</td>
                      <td>{doc.type}</td>
                    </>
                  )}
                  {type === 'journals' && (
                    <>
                      <td>{doc.reference}</td>
                      <td>{String(doc.entryDate).slice(0, 10)}</td>
                      <td><span className={`acc-badge ${doc.status}`}>{doc.status}</span></td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

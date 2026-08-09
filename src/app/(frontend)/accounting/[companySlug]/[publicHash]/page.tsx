import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { requireCompanyAccess } from '@/lib/accounting/pageHelpers'
import { getDashboardStats, getRecentLedger } from '@/lib/accounting/reports'
import { Money } from '@/components/accounting/Money'

export const dynamic = 'force-dynamic'

export default async function AccountingDashboardPage({
  params,
}: {
  params: Promise<{ companySlug: string; publicHash: string }>
}) {
  const { companySlug, publicHash } = await params
  const access = await requireCompanyAccess(companySlug, publicHash)
  const payload = await getPayload({ config: await config })

  const [stats, recent] = await Promise.all([
    getDashboardStats(payload, access.company.id),
    getRecentLedger(payload, access.company.id, 10),
  ])

  const currency = access.company.currency || 'EUR'
  const base = `/accounting/${companySlug}/${publicHash}`

  const kpis = [
    { label: 'Omzet', value: stats.revenue },
    { label: 'Kosten', value: stats.expenses },
    { label: 'Winst', value: stats.profit },
    { label: 'Banksaldo', value: stats.cashBalance },
    { label: 'Openstaande facturen', value: stats.outstandingInvoices },
    { label: 'Openstaande inkoop', value: stats.unpaidBills },
    { label: 'Debiteuren', value: stats.accountsReceivable },
    { label: 'BTW positie', value: stats.vatPayable },
  ]

  return (
    <>
      <div className="acc-panel">
        <h2>Accounting dashboard</h2>
        <p className="lead">
          Overzicht van omzet, kosten, liquiditeit en openstaande posten voor {access.company.name}.
        </p>
        <div className="acc-actions">
          <Link className="acc-btn" href={`${base}/invoices`}>Nieuwe factuur</Link>
          <Link className="acc-btn secondary" href={`${base}/expenses`}>Uitgave boeken</Link>
          <Link className="acc-btn secondary" href={`${base}/reports`}>Rapporten</Link>
        </div>
        <div className="acc-kpi-grid">
          {kpis.map((kpi) => (
            <div className="acc-kpi" key={kpi.label}>
              <div className="label">{kpi.label}</div>
              <div className="value"><Money amount={kpi.value} currency={currency} /></div>
            </div>
          ))}
        </div>
      </div>

      <div className="acc-panel">
        <h2>Recente boekingen</h2>
        <p className="lead">Laatste grootboekmutaties uit facturen, uitgaven, inkoop en betalingen.</p>
        {recent.length === 0 ? (
          <div className="acc-empty">Nog geen boekingen. Maak een factuur of uitgave aan.</div>
        ) : (
          <table className="acc-table">
            <thead>
              <tr>
                <th>Datum</th>
                <th>Omschrijving</th>
                <th>Bron</th>
                <th className="num">Bedrag</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((entry: any) => (
                <tr key={entry.id}>
                  <td>{String(entry.entryDate).slice(0, 10)}</td>
                  <td>{entry.description}</td>
                  <td><span className="acc-badge">{entry.sourceType}</span></td>
                  <td className="num"><Money amount={entry.debitTotal} currency={currency} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="acc-panel">
        <h2>Snel naar</h2>
        <div className="acc-actions" style={{ marginBottom: 0 }}>
          <Link className="acc-btn secondary" href={`${base}/contacts`}>Relaties</Link>
          <Link className="acc-btn secondary" href={`${base}/vat`}>BTW-overzicht</Link>
          <Link className="acc-btn secondary" href={`${base}/banking`}>Bankieren</Link>
          <Link className="acc-btn secondary" href={`${base}/accounts`}>Grootboekrekeningen</Link>
        </div>
      </div>
    </>
  )
}

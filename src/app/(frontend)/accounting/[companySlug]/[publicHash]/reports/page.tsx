import { requireCompanyAccess } from '@/lib/accounting/pageHelpers'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { getProfitAndLoss, getDashboardStats } from '@/lib/accounting/reports'
import { Money } from '@/components/accounting/Money'

export const dynamic = 'force-dynamic'

export default async function ReportsPage({
  params,
}: {
  params: Promise<{ companySlug: string; publicHash: string }>
}) {
  const { companySlug, publicHash } = await params
  const access = await requireCompanyAccess(companySlug, publicHash)
  const payload = await getPayload({ config: await config })
  const [pnl, stats] = await Promise.all([
    getProfitAndLoss(payload, access.company.id),
    getDashboardStats(payload, access.company.id),
  ])
  const currency = access.company.currency || 'EUR'

  return (
    <>
      <div className="acc-panel">
        <h2>Financiële rapporten</h2>
        <p className="lead">Winst & verlies en kerncijfers — gebaseerd op het grootboek.</p>
        <div className="acc-kpi-grid">
          <div className="acc-kpi"><div className="label">Omzet</div><div className="value"><Money amount={pnl.income} currency={currency} /></div></div>
          <div className="acc-kpi"><div className="label">Kosten</div><div className="value"><Money amount={pnl.expense} currency={currency} /></div></div>
          <div className="acc-kpi"><div className="label">Netto resultaat</div><div className="value"><Money amount={pnl.net} currency={currency} /></div></div>
          <div className="acc-kpi"><div className="label">Cash</div><div className="value"><Money amount={stats.cashBalance} currency={currency} /></div></div>
        </div>
      </div>

      <div className="acc-panel">
        <h2>Winst & verlies</h2>
        <table className="acc-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Rekening</th>
              <th>Type</th>
              <th className="num">Bedrag</th>
            </tr>
          </thead>
          <tbody>
            {pnl.rows.filter((r) => r.amount !== 0).map((row) => (
              <tr key={row.code}>
                <td>{row.code}</td>
                <td>{row.name}</td>
                <td>{row.type}</td>
                <td className="num"><Money amount={row.amount} currency={currency} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        {pnl.rows.every((r) => r.amount === 0) && (
          <div className="acc-empty" style={{ marginTop: 12 }}>Nog geen resultaten om te tonen.</div>
        )}
      </div>
    </>
  )
}

import { ResourceClient } from '@/components/accounting/ResourceClient'
import { requireCompanyAccess } from '@/lib/accounting/pageHelpers'
import { getDashboardStats } from '@/lib/accounting/reports'
import { Money } from '@/components/accounting/Money'
import { getPayload } from 'payload'
import config from '@/payload.config'

export const dynamic = 'force-dynamic'

export default async function BankingPage({
  params,
}: {
  params: Promise<{ companySlug: string; publicHash: string }>
}) {
  const { companySlug, publicHash } = await params
  const access = await requireCompanyAccess(companySlug, publicHash)
  const payload = await getPayload({ config: await config })
  const stats = await getDashboardStats(payload, access.company.id)

  return (
    <>
      <div className="acc-panel">
        <h2>Bankieren</h2>
        <p className="lead">Liquiditeitsoverzicht en recente bankgerelateerde betalingen.</p>
        <div className="acc-kpi-grid">
          <div className="acc-kpi">
            <div className="label">Banksaldo</div>
            <div className="value">
              <Money amount={stats.cashBalance} currency={access.company.currency} />
            </div>
          </div>
          <div className="acc-kpi">
            <div className="label">Debiteuren</div>
            <div className="value">
              <Money amount={stats.accountsReceivable} currency={access.company.currency} />
            </div>
          </div>
          <div className="acc-kpi">
            <div className="label">Crediteuren</div>
            <div className="value">
              <Money amount={stats.accountsPayable} currency={access.company.currency} />
            </div>
          </div>
        </div>
      </div>
      <ResourceClient
        companySlug={companySlug}
        publicHash={publicHash}
        type="payments"
        createType="payment"
        title="Banktransacties / betalingen"
        lead="Boek inkomende en uitgaande bankmutaties."
        canWrite={access.canWrite}
        currency={access.company.currency}
      />
    </>
  )
}

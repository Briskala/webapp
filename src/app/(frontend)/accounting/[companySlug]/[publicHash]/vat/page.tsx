import { requireCompanyAccess } from '@/lib/accounting/pageHelpers'
import { getDashboardStats } from '@/lib/accounting/reports'
import { Money } from '@/components/accounting/Money'
import { ResourceClient } from '@/components/accounting/ResourceClient'
import { getPayload } from 'payload'
import config from '@/payload.config'

export const dynamic = 'force-dynamic'

export default async function VatPage({
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
        <h2>BTW-administratie</h2>
        <p className="lead">
          Overzicht van btw-positie op basis van geboekte facturen, inkopen en uitgaven.
        </p>
        <div className="acc-kpi-grid">
          <div className="acc-kpi">
            <div className="label">Netto btw-positie</div>
            <div className="value">
              <Money amount={stats.vatPayable} currency={access.company.currency} />
            </div>
          </div>
          <div className="acc-kpi">
            <div className="label">Omzet (periode)</div>
            <div className="value">
              <Money amount={stats.revenue} currency={access.company.currency} />
            </div>
          </div>
        </div>
      </div>
      <ResourceClient
        companySlug={companySlug}
        publicHash={publicHash}
        type="taxes"
        title="BTW-tarieven"
        lead="Configured tarieven voor deze administratie."
        canWrite={false}
        currency={access.company.currency}
      />
    </>
  )
}

import { ResourceClient } from '@/components/accounting/ResourceClient'
import { requireCompanyAccess } from '@/lib/accounting/pageHelpers'

export const dynamic = 'force-dynamic'

export default async function InvoicesPage({
  params,
}: {
  params: Promise<{ companySlug: string; publicHash: string }>
}) {
  const { companySlug, publicHash } = await params
  const access = await requireCompanyAccess(companySlug, publicHash)
  return (
    <ResourceClient
      companySlug={companySlug}
      publicHash={publicHash}
      type="invoices"
      createType="invoice"
      title="Facturen"
      lead="Maak en volg verkoopfacturen. Geboekte facturen landen automatisch in het grootboek."
      canWrite={access.canWrite}
      currency={access.company.currency}
    />
  )
}

import { ResourceClient } from '@/components/accounting/ResourceClient'
import { requireCompanyAccess } from '@/lib/accounting/pageHelpers'

export const dynamic = 'force-dynamic'

export default async function BillsPage({
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
      type="bills"
      createType="bill"
      title="Inkoopfacturen"
      lead="Beheer leveranciersfacturen en openstaande schulden (accounts payable)."
      canWrite={access.canWrite}
      currency={access.company.currency}
    />
  )
}

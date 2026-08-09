import { ResourceClient } from '@/components/accounting/ResourceClient'
import { requireCompanyAccess } from '@/lib/accounting/pageHelpers'

export const dynamic = 'force-dynamic'

export default async function AccountsPage({
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
      type="accounts"
      title="Grootboekrekeningen"
      lead="Chart of Accounts voor deze administratie — basis voor dubbel boekhouden."
      canWrite={false}
      currency={access.company.currency}
    />
  )
}

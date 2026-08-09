import { ResourceClient } from '@/components/accounting/ResourceClient'
import { requireCompanyAccess } from '@/lib/accounting/pageHelpers'

export const dynamic = 'force-dynamic'

export default async function ExpensesPage({
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
      type="expenses"
      createType="expense"
      title="Uitgaven"
      lead="Registreer kosten en bonnen. Goedgekeurde uitgaven worden geboekt op kostenrekeningen."
      canWrite={access.canWrite}
      currency={access.company.currency}
    />
  )
}

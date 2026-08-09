import { ResourceClient } from '@/components/accounting/ResourceClient'
import { requireCompanyAccess } from '@/lib/accounting/pageHelpers'

export const dynamic = 'force-dynamic'

export default async function JournalsPage({
  params,
}: {
  params: Promise<{ companySlug: string; publicHash: string }>
}) {
  const { companySlug, publicHash } = await params
  const access = await requireCompanyAccess(companySlug, publicHash)
  return (
    <>
      <ResourceClient
        companySlug={companySlug}
        publicHash={publicHash}
        type="ledger"
        createType="journal"
        title="Memoriaal & grootboek"
        lead="Handmatige journaalposten en alle geboekte mutaties (append-only ledger)."
        canWrite={access.canWrite}
        currency={access.company.currency}
      />
    </>
  )
}

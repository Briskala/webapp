import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { resolveCompanyAccess } from '@/lib/accounting/access'
import { getDashboardStats, getRecentLedger } from '@/lib/accounting/reports'

type Ctx = { params: Promise<{ companySlug: string; publicHash: string }> }

export async function GET(_req: NextRequest, ctx: Ctx) {
  const { companySlug, publicHash } = await ctx.params
  const payload = await getPayload({ config: await config })
  const access = await resolveCompanyAccess(payload, companySlug, publicHash)
  if (!access) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const [stats, recent] = await Promise.all([
    getDashboardStats(payload, access.company.id),
    getRecentLedger(payload, access.company.id, 8),
  ])

  return NextResponse.json({
    company: {
      name: access.company.name,
      slug: access.company.slug,
      publicHash: access.company.publicHash,
      currency: access.company.currency,
      country: access.company.country,
      vatNumber: access.company.vatNumber,
    },
    role: access.role,
    canWrite: access.canWrite,
    canAdmin: access.canAdmin,
    stats,
    recentTransactions: recent.map((e: any) => ({
      id: e.id,
      date: e.entryDate,
      description: e.description,
      amount: e.debitTotal,
      sourceType: e.sourceType,
    })),
  })
}

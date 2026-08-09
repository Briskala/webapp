import type { Payload } from 'payload'
import { DEFAULT_CHART_OF_ACCOUNTS } from './coa'
import { generatePublicHash, slugifyCompanyName } from './hash'
import type { AccountingRole } from './types'

async function uniqueSlug(payload: Payload, base: string) {
  let slug = slugifyCompanyName(base)
  let i = 0
  while (true) {
    const candidate = i === 0 ? slug : `${slug}-${i}`
    const existing = await payload.find({
      collection: 'accounting-companies',
      where: { slug: { equals: candidate } },
      limit: 1,
      overrideAccess: true,
    })
    if (existing.docs.length === 0) return candidate
    i += 1
  }
}

export async function seedChartOfAccounts(payload: Payload, companyId: string | number) {
  const company = Number(companyId)
  for (const account of DEFAULT_CHART_OF_ACCOUNTS) {
    await payload.create({
      collection: 'accounting-accounts',
      data: {
        company,
        code: account.code,
        name: account.name,
        type: account.type,
        isSystem: Boolean(account.system),
        isActive: true,
      } as any,
      overrideAccess: true,
    })
  }

  await payload.create({
    collection: 'accounting-tax-rates',
    data: {
      company,
      name: 'BTW hoog 21%',
      rate: 21,
      type: 'vat',
      isDefault: true,
    } as any,
    overrideAccess: true,
  })

  await payload.create({
    collection: 'accounting-tax-rates',
    data: {
      company,
      name: 'BTW laag 9%',
      rate: 9,
      type: 'vat',
      isDefault: false,
    } as any,
    overrideAccess: true,
  })

  await payload.create({
    collection: 'accounting-tax-rates',
    data: {
      company,
      name: 'BTW 0%',
      rate: 0,
      type: 'vat',
      isDefault: false,
    } as any,
    overrideAccess: true,
  })
}

export async function createCompanyWithDefaults(
  payload: Payload,
  opts: {
    name: string
    ownerUserId: string | number
    currency?: string
    country?: string
    vatNumber?: string
    role?: AccountingRole
  },
) {
  const slug = await uniqueSlug(payload, opts.name)
  const publicHash = generatePublicHash(8)

  const company = await payload.create({
    collection: 'accounting-companies',
    data: {
      name: opts.name,
      slug,
      publicHash,
      currency: opts.currency || 'EUR',
      country: opts.country || 'NL',
      vatNumber: opts.vatNumber || '',
      status: 'active',
      owner: Number(opts.ownerUserId),
    } as any,
    overrideAccess: true,
  })

  await payload.create({
    collection: 'accounting-memberships',
    data: {
      company: company.id,
      user: Number(opts.ownerUserId),
      role: opts.role || 'owner',
      status: 'active',
    } as any,
    overrideAccess: true,
  })

  await seedChartOfAccounts(payload, company.id)

  await payload.create({
    collection: 'accounting-audit-logs',
    data: {
      company: company.id,
      action: 'company.created',
      entityType: 'accounting-companies',
      entityId: String(company.id),
      details: `Company ${opts.name} created`,
      actor: Number(opts.ownerUserId),
    } as any,
    overrideAccess: true,
  })

  return company
}

export function calcLineTotals(
  lines: Array<{
    description?: string
    quantity?: number
    unitPrice?: number
    vatRate?: number
  }>,
) {
  let subtotal = 0
  let vatAmount = 0
  const normalized = lines.map((line) => {
    const quantity = Number(line.quantity || 0)
    const unitPrice = Number(line.unitPrice || 0)
    const vatRate = Number(line.vatRate ?? 21)
    const net = quantity * unitPrice
    const vat = (net * vatRate) / 100
    subtotal += net
    vatAmount += vat
    return {
      description: String(line.description || 'Regel'),
      quantity,
      unitPrice,
      vatRate,
      lineTotal: Math.round((net + vat) * 100) / 100,
    }
  })
  const total = Math.round((subtotal + vatAmount) * 100) / 100
  return {
    lines: normalized,
    subtotal: Math.round(subtotal * 100) / 100,
    vatAmount: Math.round(vatAmount * 100) / 100,
    total,
    balanceDue: total,
  }
}

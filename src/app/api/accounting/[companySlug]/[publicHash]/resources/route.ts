import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { resolveCompanyAccess } from '@/lib/accounting/access'
import { calcLineTotals } from '@/lib/accounting/companyService'
import {
  postBill,
  postExpense,
  postInvoice,
  postPaymentMade,
  postPaymentReceived,
  postLedgerEntry,
} from '@/lib/accounting/posting'
import { getProfitAndLoss } from '@/lib/accounting/reports'

type Ctx = { params: Promise<{ companySlug: string; publicHash: string }> }

const COLLECTIONS: Record<string, string> = {
  invoices: 'accounting-invoices',
  bills: 'accounting-bills',
  expenses: 'accounting-expenses',
  payments: 'accounting-payments',
  contacts: 'accounting-contacts',
  accounts: 'accounting-accounts',
  journals: 'accounting-journals',
  ledger: 'accounting-ledger-entries',
  taxes: 'accounting-tax-rates',
}

export async function GET(req: NextRequest, ctx: Ctx) {
  const { companySlug, publicHash } = await ctx.params
  const type = req.nextUrl.searchParams.get('type') || ''
  const payload = await getPayload({ config: await config })
  const access = await resolveCompanyAccess(payload, companySlug, publicHash)
  if (!access) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  if (type === 'report-pnl') {
    const report = await getProfitAndLoss(payload, access.company.id)
    return NextResponse.json({ report })
  }

  const collection = COLLECTIONS[type]
  if (!collection) return NextResponse.json({ error: 'Unknown resource type' }, { status: 400 })

  const result = await payload.find({
    collection: collection as any,
    where: { company: { equals: access.company.id } },
    sort: '-createdAt',
    limit: 100,
    depth: 1,
    overrideAccess: true,
  })

  return NextResponse.json({ docs: result.docs })
}

export async function POST(req: NextRequest, ctx: Ctx) {
  const { companySlug, publicHash } = await ctx.params
  const payload = await getPayload({ config: await config })
  const access = await resolveCompanyAccess(payload, companySlug, publicHash)
  if (!access) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  if (!access.canWrite) return NextResponse.json({ error: 'Read-only role' }, { status: 403 })

  const body = await req.json()
  const type = String(body?.type || '')
  const data = body?.data || {}

  try {
    if (type === 'invoice') {
      const totals = calcLineTotals(data.lines || [])
      const count = await payload.count({
        collection: 'accounting-invoices',
        where: { company: { equals: access.company.id } },
        overrideAccess: true,
      })
      const doc = await payload.create({
        collection: 'accounting-invoices',
        data: {
          company: access.company.id,
          number: data.number || `INV-${new Date().getFullYear()}-${String(count.totalDocs + 1).padStart(3, '0')}`,
          customerName: data.customerName || 'Klant',
          issueDate: data.issueDate || new Date().toISOString().slice(0, 10),
          dueDate: data.dueDate || new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10),
          status: data.status || 'sent',
          lines: totals.lines,
          subtotal: totals.subtotal,
          vatAmount: totals.vatAmount,
          total: totals.total,
          amountPaid: 0,
          balanceDue: totals.total,
          notes: data.notes || '',
          posted: true,
        },
        overrideAccess: true,
      })
      await postInvoice(payload, doc, access.user.id)
      return NextResponse.json({ doc })
    }

    if (type === 'bill') {
      const totals = calcLineTotals(data.lines || [])
      const count = await payload.count({
        collection: 'accounting-bills',
        where: { company: { equals: access.company.id } },
        overrideAccess: true,
      })
      const doc = await payload.create({
        collection: 'accounting-bills',
        data: {
          company: access.company.id,
          number: data.number || `BILL-${new Date().getFullYear()}-${String(count.totalDocs + 1).padStart(3, '0')}`,
          supplierName: data.supplierName || 'Leverancier',
          issueDate: data.issueDate || new Date().toISOString().slice(0, 10),
          dueDate: data.dueDate || new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10),
          status: data.status || 'received',
          lines: totals.lines,
          subtotal: totals.subtotal,
          vatAmount: totals.vatAmount,
          total: totals.total,
          amountPaid: 0,
          balanceDue: totals.total,
          notes: data.notes || '',
          posted: true,
        },
        overrideAccess: true,
      })
      await postBill(payload, doc, access.user.id)
      return NextResponse.json({ doc })
    }

    if (type === 'expense') {
      const subtotal = Number(data.subtotal || data.amount || 0)
      const vatRate = Number(data.vatRate ?? 21)
      const vatAmount = Math.round(((subtotal * vatRate) / 100) * 100) / 100
      const total = Math.round((subtotal + vatAmount) * 100) / 100
      const doc = await payload.create({
        collection: 'accounting-expenses',
        data: {
          company: access.company.id,
          description: data.description || 'Uitgave',
          expenseDate: data.expenseDate || new Date().toISOString().slice(0, 10),
          vendor: data.vendor || '',
          category: data.category || 'Algemene kosten',
          status: 'posted',
          subtotal,
          vatRate,
          vatAmount,
          total,
          notes: data.notes || '',
          posted: true,
        },
        overrideAccess: true,
      })
      await postExpense(payload, doc, access.user.id)
      return NextResponse.json({ doc })
    }

    if (type === 'payment') {
      const doc = await payload.create({
        collection: 'accounting-payments',
        data: {
          company: access.company.id,
          reference: data.reference || `PAY-${Date.now()}`,
          paymentDate: data.paymentDate || new Date().toISOString().slice(0, 10),
          direction: data.direction || 'incoming',
          amount: Number(data.amount || 0),
          method: data.method || 'bank',
          status: 'completed',
          notes: data.notes || '',
          posted: true,
        },
        overrideAccess: true,
      })
      if (doc.direction === 'incoming') await postPaymentReceived(payload, doc, access.user.id)
      else await postPaymentMade(payload, doc, access.user.id)
      return NextResponse.json({ doc })
    }

    if (type === 'contact') {
      const doc = await payload.create({
        collection: 'accounting-contacts',
        data: {
          company: access.company.id,
          name: data.name,
          type: data.type || 'customer',
          email: data.email || '',
          phone: data.phone || '',
          vatNumber: data.vatNumber || '',
          address: data.address || '',
          notes: data.notes || '',
        },
        overrideAccess: true,
      })
      return NextResponse.json({ doc })
    }

    if (type === 'journal') {
      const lines = (data.lines || []).map((l: any) => ({
        accountCode: l.accountCode,
        debit: Number(l.debit || 0),
        credit: Number(l.credit || 0),
        memo: l.memo || '',
      }))
      const entry = await postLedgerEntry(payload, {
        companyId: access.company.id,
        sourceType: 'journal',
        sourceId: `manual-${Date.now()}`,
        entryDate: data.entryDate || new Date().toISOString().slice(0, 10),
        description: data.memo || data.reference || 'Memoriaalboeking',
        lines,
        createdBy: access.user.id,
      })
      return NextResponse.json({ doc: entry })
    }

    return NextResponse.json({ error: 'Unknown type' }, { status: 400 })
  } catch (err) {
    console.error('resource create error', err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

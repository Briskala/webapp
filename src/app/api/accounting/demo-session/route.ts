import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { attachSessionCookie } from '@/lib/accounting/session'
import { findUserByFirebaseUid } from '@/lib/accounting/access'
import { createCompanyWithDefaults } from '@/lib/accounting/companyService'
import { postInvoice, postExpense, postBill } from '@/lib/accounting/posting'
import { calcLineTotals } from '@/lib/accounting/companyService'

const DEMO_UID = 'briskala-demo-accountant'
const DEMO_EMAIL = 'demo@briskala.com'

/**
 * Development / demo helper: creates a demo Briskala user, sample companies,
 * and an accounting session cookie so the platform can be tested end-to-end
 * without Firebase credentials.
 */
export async function POST() {
  if (process.env.ACCOUNTING_DEMO === '0') {
    return NextResponse.json({ error: 'Demo session disabled' }, { status: 403 })
  }

  try {
    const payload = await getPayload({ config: await config })

    let user = await findUserByFirebaseUid(payload, DEMO_UID)
    if (!user) {
      user = await payload.create({
        collection: 'users',
        data: {
          email: DEMO_EMAIL,
          password: `demo_${Date.now()}`,
          displayName: 'Demo Accountant',
          firebaseUid: DEMO_UID,
          customerNumber: 'BRISK-100001',
          balance: 0,
          messageCount: 0,
          profileType: 'zakelijk',
        },
        overrideAccess: true,
      })
    }

    const existingMemberships = await payload.find({
      collection: 'accounting-memberships',
      where: { user: { equals: user.id } },
      limit: 5,
      depth: 1,
      overrideAccess: true,
    })

    let companies = existingMemberships.docs
      .map((m: any) => (typeof m.company === 'object' ? m.company : null))
      .filter(Boolean)

    if (companies.length === 0) {
      const created = []
      for (const name of ['Erickson Holding', 'Briskala BV', 'Example Company']) {
        created.push(
          await createCompanyWithDefaults(payload, {
            name,
            ownerUserId: user.id,
          }),
        )
      }
      companies = created

      // Seed sample data for first company
      const company = companies[0]
      const customer = await payload.create({
        collection: 'accounting-contacts',
        data: {
          company: company.id,
          name: 'Acme Klant BV',
          type: 'customer',
          email: 'finance@acme.example',
        },
        overrideAccess: true,
      })
      const supplier = await payload.create({
        collection: 'accounting-contacts',
        data: {
          company: company.id,
          name: 'Office Supplies NL',
          type: 'supplier',
          email: 'orders@supplies.example',
        },
        overrideAccess: true,
      })

      const invTotals = calcLineTotals([
        { description: 'Consultancy augustus', quantity: 20, unitPrice: 95, vatRate: 21 },
        { description: 'Licentie Briskala', quantity: 1, unitPrice: 79, vatRate: 21 },
      ])
      const invoice = await payload.create({
        collection: 'accounting-invoices',
        data: {
          company: company.id,
          number: 'INV-2026-001',
          contact: customer.id,
          customerName: customer.name,
          issueDate: new Date().toISOString().slice(0, 10),
          dueDate: new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10),
          status: 'sent',
          lines: invTotals.lines,
          subtotal: invTotals.subtotal,
          vatAmount: invTotals.vatAmount,
          total: invTotals.total,
          amountPaid: 0,
          balanceDue: invTotals.total,
          posted: true,
        },
        overrideAccess: true,
      })
      await postInvoice(payload, invoice, user.id)

      const billTotals = calcLineTotals([
        { description: 'Kantoorartikelen', quantity: 1, unitPrice: 240, vatRate: 21 },
      ])
      const bill = await payload.create({
        collection: 'accounting-bills',
        data: {
          company: company.id,
          number: 'BILL-2026-001',
          contact: supplier.id,
          supplierName: supplier.name,
          issueDate: new Date().toISOString().slice(0, 10),
          dueDate: new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10),
          status: 'received',
          lines: billTotals.lines,
          subtotal: billTotals.subtotal,
          vatAmount: billTotals.vatAmount,
          total: billTotals.total,
          amountPaid: 0,
          balanceDue: billTotals.total,
          posted: true,
        },
        overrideAccess: true,
      })
      await postBill(payload, bill, user.id)

      const expense = await payload.create({
        collection: 'accounting-expenses',
        data: {
          company: company.id,
          description: 'Treinreizen klantbezoek',
          expenseDate: new Date().toISOString().slice(0, 10),
          vendor: 'NS Business',
          category: 'Reis- en verblijfkosten',
          status: 'posted',
          subtotal: 86.78,
          vatRate: 9,
          vatAmount: 7.81,
          total: 94.59,
          posted: true,
        },
        overrideAccess: true,
      })
      await postExpense(payload, expense, user.id)
    }

    const list = companies.map((c: any) => ({
      name: c.name,
      slug: c.slug,
      publicHash: c.publicHash,
      href: `/accounting/${c.slug}/${c.publicHash}`,
    }))

    const res = NextResponse.json({
      success: true,
      demo: true,
      email: DEMO_EMAIL,
      companies: list,
      redirectTo: list[0]?.href || '/accounting',
    })
    return attachSessionCookie(res, DEMO_UID, DEMO_EMAIL)
  } catch (err) {
    console.error('demo-session error', err)
    return NextResponse.json({ error: 'Failed to create demo session', detail: String(err) }, { status: 500 })
  }
}

import type { Payload } from 'payload'
import { SYSTEM_ACCOUNT_CODES } from './coa'

type LedgerLine = {
  accountCode: string
  debit: number
  credit: number
  memo?: string
}

async function getAccountId(payload: Payload, companyId: string | number, code: string) {
  const result = await payload.find({
    collection: 'accounting-accounts',
    where: {
      and: [{ company: { equals: companyId } }, { code: { equals: code } }],
    },
    limit: 1,
    overrideAccess: true,
  })
  return result.docs[0]?.id
}

export async function postLedgerEntry(
  payload: Payload,
  opts: {
    companyId: string | number
    sourceType: string
    sourceId: string
    entryDate: string
    description: string
    lines: LedgerLine[]
    createdBy?: string | number
  },
) {
  const debitTotal = opts.lines.reduce((s, l) => s + (l.debit || 0), 0)
  const creditTotal = opts.lines.reduce((s, l) => s + (l.credit || 0), 0)
  if (Math.abs(debitTotal - creditTotal) > 0.001) {
    throw new Error(`Unbalanced journal: debit ${debitTotal} != credit ${creditTotal}`)
  }

  const resolvedLines = []
  for (const line of opts.lines) {
    const accountId = await getAccountId(payload, opts.companyId, line.accountCode)
    if (!accountId) throw new Error(`Account ${line.accountCode} not found for company`)
    resolvedLines.push({
      account: accountId,
      accountCode: line.accountCode,
      debit: Number(line.debit.toFixed(2)),
      credit: Number(line.credit.toFixed(2)),
      memo: line.memo || '',
    })
  }

  return payload.create({
    collection: 'accounting-ledger-entries',
    data: {
      company: Number(opts.companyId),
      sourceType: opts.sourceType,
      sourceId: opts.sourceId,
      entryDate: opts.entryDate,
      description: opts.description,
      lines: resolvedLines,
      debitTotal: Number(debitTotal.toFixed(2)),
      creditTotal: Number(creditTotal.toFixed(2)),
      createdByUser: opts.createdBy ? Number(opts.createdBy) : undefined,
    } as any,
    overrideAccess: true,
  })
}

export async function postInvoice(payload: Payload, invoice: any, createdBy?: string | number) {
  const companyId = typeof invoice.company === 'object' ? invoice.company.id : invoice.company
  const amount = Number(invoice.total || 0)
  const vat = Number(invoice.vatAmount || 0)
  const net = Number(invoice.subtotal || amount - vat)

  return postLedgerEntry(payload, {
    companyId,
    sourceType: 'invoice',
    sourceId: String(invoice.id),
    entryDate: invoice.issueDate || new Date().toISOString().slice(0, 10),
    description: `Factuur ${invoice.number}`,
    createdBy,
    lines: [
      { accountCode: SYSTEM_ACCOUNT_CODES.receivables, debit: amount, credit: 0, memo: 'Debiteuren' },
      { accountCode: SYSTEM_ACCOUNT_CODES.revenue, debit: 0, credit: net, memo: 'Omzet' },
      ...(vat > 0
        ? [{ accountCode: SYSTEM_ACCOUNT_CODES.vatPayable, debit: 0, credit: vat, memo: 'Btw' }]
        : []),
    ],
  })
}

export async function postExpense(payload: Payload, expense: any, createdBy?: string | number) {
  const companyId = typeof expense.company === 'object' ? expense.company.id : expense.company
  const amount = Number(expense.total || 0)
  const vat = Number(expense.vatAmount || 0)
  const net = Number(expense.subtotal || amount - vat)

  return postLedgerEntry(payload, {
    companyId,
    sourceType: 'expense',
    sourceId: String(expense.id),
    entryDate: expense.expenseDate || new Date().toISOString().slice(0, 10),
    description: `Uitgave ${expense.description || expense.id}`,
    createdBy,
    lines: [
      { accountCode: SYSTEM_ACCOUNT_CODES.expenses, debit: net, credit: 0, memo: 'Kosten' },
      ...(vat > 0
        ? [{ accountCode: SYSTEM_ACCOUNT_CODES.vatReceivable, debit: vat, credit: 0, memo: 'Btw' }]
        : []),
      { accountCode: SYSTEM_ACCOUNT_CODES.bank, debit: 0, credit: amount, memo: 'Bank' },
    ],
  })
}

export async function postBill(payload: Payload, bill: any, createdBy?: string | number) {
  const companyId = typeof bill.company === 'object' ? bill.company.id : bill.company
  const amount = Number(bill.total || 0)
  const vat = Number(bill.vatAmount || 0)
  const net = Number(bill.subtotal || amount - vat)

  return postLedgerEntry(payload, {
    companyId,
    sourceType: 'bill',
    sourceId: String(bill.id),
    entryDate: bill.issueDate || new Date().toISOString().slice(0, 10),
    description: `Inkoopfactuur ${bill.number}`,
    createdBy,
    lines: [
      { accountCode: SYSTEM_ACCOUNT_CODES.cogs, debit: net, credit: 0, memo: 'Inkoop' },
      ...(vat > 0
        ? [{ accountCode: SYSTEM_ACCOUNT_CODES.vatReceivable, debit: vat, credit: 0, memo: 'Btw' }]
        : []),
      { accountCode: SYSTEM_ACCOUNT_CODES.payables, debit: 0, credit: amount, memo: 'Crediteuren' },
    ],
  })
}

export async function postPaymentReceived(payload: Payload, payment: any, createdBy?: string | number) {
  const companyId = typeof payment.company === 'object' ? payment.company.id : payment.company
  const amount = Number(payment.amount || 0)

  return postLedgerEntry(payload, {
    companyId,
    sourceType: 'payment',
    sourceId: String(payment.id),
    entryDate: payment.paymentDate || new Date().toISOString().slice(0, 10),
    description: `Betaling ontvangen ${payment.reference || payment.id}`,
    createdBy,
    lines: [
      { accountCode: SYSTEM_ACCOUNT_CODES.bank, debit: amount, credit: 0, memo: 'Bank' },
      { accountCode: SYSTEM_ACCOUNT_CODES.receivables, debit: 0, credit: amount, memo: 'Debiteuren' },
    ],
  })
}

export async function postPaymentMade(payload: Payload, payment: any, createdBy?: string | number) {
  const companyId = typeof payment.company === 'object' ? payment.company.id : payment.company
  const amount = Number(payment.amount || 0)

  return postLedgerEntry(payload, {
    companyId,
    sourceType: 'payment',
    sourceId: String(payment.id),
    entryDate: payment.paymentDate || new Date().toISOString().slice(0, 10),
    description: `Betaling gedaan ${payment.reference || payment.id}`,
    createdBy,
    lines: [
      { accountCode: SYSTEM_ACCOUNT_CODES.payables, debit: amount, credit: 0, memo: 'Crediteuren' },
      { accountCode: SYSTEM_ACCOUNT_CODES.bank, debit: 0, credit: amount, memo: 'Bank' },
    ],
  })
}

import type { Payload } from 'payload'
import type { DashboardStats } from './types'
import { SYSTEM_ACCOUNT_CODES } from './coa'

function money(n: number) {
  return Math.round(n * 100) / 100
}

async function accountBalance(
  payload: Payload,
  companyId: string | number,
  accountCode: string,
): Promise<number> {
  const entries = await payload.find({
    collection: 'accounting-ledger-entries',
    where: { company: { equals: companyId } },
    limit: 500,
    depth: 0,
    overrideAccess: true,
  })

  let balance = 0
  for (const entry of entries.docs as any[]) {
    for (const line of entry.lines || []) {
      if (line.accountCode === accountCode) {
        balance += Number(line.debit || 0) - Number(line.credit || 0)
      }
    }
  }
  return money(balance)
}

async function sumByType(
  payload: Payload,
  companyId: string | number,
  type: 'income' | 'expense',
): Promise<number> {
  const accounts = await payload.find({
    collection: 'accounting-accounts',
    where: {
      and: [{ company: { equals: companyId } }, { type: { equals: type } }],
    },
    limit: 200,
    overrideAccess: true,
  })
  const codes = new Set(accounts.docs.map((a: any) => a.code))

  const entries = await payload.find({
    collection: 'accounting-ledger-entries',
    where: { company: { equals: companyId } },
    limit: 500,
    overrideAccess: true,
  })

  let total = 0
  for (const entry of entries.docs as any[]) {
    for (const line of entry.lines || []) {
      if (!codes.has(line.accountCode)) continue
      if (type === 'income') total += Number(line.credit || 0) - Number(line.debit || 0)
      else total += Number(line.debit || 0) - Number(line.credit || 0)
    }
  }
  return money(total)
}

export async function getDashboardStats(
  payload: Payload,
  companyId: string | number,
): Promise<DashboardStats> {
  const [revenue, expenses, cashBalance, receivables, payables, vatPayableBal, vatRecvBal] =
    await Promise.all([
      sumByType(payload, companyId, 'income'),
      sumByType(payload, companyId, 'expense'),
      accountBalance(payload, companyId, SYSTEM_ACCOUNT_CODES.bank),
      accountBalance(payload, companyId, SYSTEM_ACCOUNT_CODES.receivables),
      // payables natural credit balance → invert for display
      accountBalance(payload, companyId, SYSTEM_ACCOUNT_CODES.payables).then((v) => money(-v)),
      accountBalance(payload, companyId, SYSTEM_ACCOUNT_CODES.vatPayable).then((v) => money(-v)),
      accountBalance(payload, companyId, SYSTEM_ACCOUNT_CODES.vatReceivable),
    ])

  const invoices = await payload.find({
    collection: 'accounting-invoices',
    where: {
      and: [
        { company: { equals: companyId } },
        { status: { in: ['sent', 'partial', 'overdue'] } },
      ],
    },
    limit: 200,
    overrideAccess: true,
  })

  const bills = await payload.find({
    collection: 'accounting-bills',
    where: {
      and: [
        { company: { equals: companyId } },
        { status: { in: ['received', 'partial', 'overdue'] } },
      ],
    },
    limit: 200,
    overrideAccess: true,
  })

  const outstandingInvoices = money(
    invoices.docs.reduce((s: number, i: any) => s + Number(i.balanceDue || i.total || 0), 0),
  )
  const unpaidBills = money(
    bills.docs.reduce((s: number, i: any) => s + Number(i.balanceDue || i.total || 0), 0),
  )

  return {
    revenue,
    expenses,
    profit: money(revenue - expenses),
    cashBalance,
    outstandingInvoices,
    outstandingInvoicesCount: invoices.docs.length,
    unpaidBills,
    unpaidBillsCount: bills.docs.length,
    vatPayable: money(vatPayableBal - vatRecvBal),
    accountsReceivable: receivables,
    accountsPayable: unpaidBills || payables,
  }
}

export async function getRecentLedger(
  payload: Payload,
  companyId: string | number,
  limit = 10,
) {
  const result = await payload.find({
    collection: 'accounting-ledger-entries',
    where: { company: { equals: companyId } },
    sort: '-entryDate',
    limit,
    overrideAccess: true,
  })
  return result.docs
}

export async function getProfitAndLoss(payload: Payload, companyId: string | number) {
  const accounts = await payload.find({
    collection: 'accounting-accounts',
    where: {
      and: [
        { company: { equals: companyId } },
        { type: { in: ['income', 'expense'] } },
      ],
    },
    limit: 200,
    overrideAccess: true,
  })

  const entries = await payload.find({
    collection: 'accounting-ledger-entries',
    where: { company: { equals: companyId } },
    limit: 1000,
    overrideAccess: true,
  })

  const rows = accounts.docs.map((account: any) => {
    let amount = 0
    for (const entry of entries.docs as any[]) {
      for (const line of entry.lines || []) {
        if (line.accountCode !== account.code) continue
        if (account.type === 'income') amount += Number(line.credit || 0) - Number(line.debit || 0)
        else amount += Number(line.debit || 0) - Number(line.credit || 0)
      }
    }
    return {
      code: account.code,
      name: account.name,
      type: account.type as 'income' | 'expense',
      amount: money(amount),
    }
  })

  const income = money(rows.filter((r) => r.type === 'income').reduce((s, r) => s + r.amount, 0))
  const expense = money(rows.filter((r) => r.type === 'expense').reduce((s, r) => s + r.amount, 0))

  return {
    rows,
    income,
    expense,
    net: money(income - expense),
  }
}

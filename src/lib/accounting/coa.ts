import type { AccountType } from './types'

export type CoaSeed = {
  code: string
  name: string
  type: AccountType
  system?: boolean
}

/** Compact Dutch SMB chart of accounts (inspired by common mkb layouts). */
export const DEFAULT_CHART_OF_ACCOUNTS: CoaSeed[] = [
  { code: '1000', name: 'Bank', type: 'asset', system: true },
  { code: '1100', name: 'Kas', type: 'asset', system: true },
  { code: '1300', name: 'Debiteuren', type: 'asset', system: true },
  { code: '1400', name: 'Btw te vorderen', type: 'asset', system: true },
  { code: '1500', name: 'Inventaris', type: 'asset' },
  { code: '2000', name: 'Crediteuren', type: 'liability', system: true },
  { code: '2100', name: 'Btw af te dragen', type: 'liability', system: true },
  { code: '2200', name: 'Loonheffing', type: 'liability' },
  { code: '3000', name: 'Eigen vermogen', type: 'equity', system: true },
  { code: '3100', name: 'Privéopnamen', type: 'equity' },
  { code: '8000', name: 'Omzet', type: 'income', system: true },
  { code: '8100', name: 'Overige opbrengsten', type: 'income' },
  { code: '4000', name: 'Inkoopkosten', type: 'expense', system: true },
  { code: '4100', name: 'Kantoorkosten', type: 'expense' },
  { code: '4200', name: 'Reis- en verblijfkosten', type: 'expense' },
  { code: '4300', name: 'Marketing', type: 'expense' },
  { code: '4400', name: 'Huisvesting', type: 'expense' },
  { code: '4500', name: 'Software & abonnementen', type: 'expense' },
  { code: '4600', name: 'Algemene kosten', type: 'expense', system: true },
]

export const SYSTEM_ACCOUNT_CODES = {
  bank: '1000',
  cash: '1100',
  receivables: '1300',
  vatReceivable: '1400',
  payables: '2000',
  vatPayable: '2100',
  equity: '3000',
  revenue: '8000',
  cogs: '4000',
  expenses: '4600',
} as const

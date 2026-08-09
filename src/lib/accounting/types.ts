export const ACCOUNTING_ROLES = [
  'owner',
  'administrator',
  'accountant',
  'manager',
  'employee',
  'viewer',
] as const

export type AccountingRole = (typeof ACCOUNTING_ROLES)[number]

export const ROLE_LABELS: Record<AccountingRole, string> = {
  owner: 'Owner',
  administrator: 'Administrator',
  accountant: 'Accountant',
  manager: 'Manager',
  employee: 'Employee',
  viewer: 'Viewer',
}

/** Roles that can mutate financial documents */
export const WRITE_ROLES: AccountingRole[] = [
  'owner',
  'administrator',
  'accountant',
  'manager',
]

/** Roles that can manage company settings / members */
export const ADMIN_ROLES: AccountingRole[] = ['owner', 'administrator']

export type AccountType = 'asset' | 'liability' | 'equity' | 'income' | 'expense'

export type InvoiceStatus = 'draft' | 'sent' | 'partial' | 'paid' | 'overdue' | 'void'
export type BillStatus = 'draft' | 'received' | 'partial' | 'paid' | 'overdue' | 'void'
export type ExpenseStatus = 'draft' | 'submitted' | 'approved' | 'posted' | 'rejected'
export type PaymentStatus = 'draft' | 'completed' | 'void'

export type DashboardStats = {
  revenue: number
  expenses: number
  profit: number
  cashBalance: number
  outstandingInvoices: number
  outstandingInvoicesCount: number
  unpaidBills: number
  unpaidBillsCount: number
  vatPayable: number
  accountsReceivable: number
  accountsPayable: number
}

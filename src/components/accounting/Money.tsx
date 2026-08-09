export function formatMoney(amount: number, currency = 'EUR') {
  try {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency,
      maximumFractionDigits: 2,
    }).format(Number(amount || 0))
  } catch {
    return `€ ${Number(amount || 0).toFixed(2)}`
  }
}

export function Money({ amount, currency = 'EUR' }: { amount: number; currency?: string }) {
  return <span>{formatMoney(amount, currency)}</span>
}

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LINKS = [
  { href: '', label: 'Dashboard' },
  { href: '/invoices', label: 'Facturen' },
  { href: '/expenses', label: 'Uitgaven' },
  { href: '/bills', label: 'Inkoop' },
  { href: '/contacts', label: 'Relaties' },
  { href: '/payments', label: 'Betalingen' },
  { href: '/banking', label: 'Bankieren' },
  { href: '/accounts', label: 'Grootboek' },
  { href: '/journals', label: 'Memoriaal' },
  { href: '/vat', label: 'BTW' },
  { href: '/reports', label: 'Rapporten' },
  { href: '/settings', label: 'Instellingen' },
]

export function AccountingNav({ basePath }: { basePath: string }) {
  const pathname = usePathname()

  return (
    <aside className="acc-sidebar">
      {LINKS.map((link) => {
        const href = `${basePath}${link.href}`
        const active =
          link.href === ''
            ? pathname === basePath || pathname === `${basePath}/`
            : pathname.startsWith(href)
        return (
          <Link key={href} href={href} className={`acc-nav-link${active ? ' active' : ''}`}>
            {link.label}
          </Link>
        )
      })}
      <Link href="/accounting" className="acc-nav-link" style={{ marginTop: 10 }}>
        ← Bedrijven
      </Link>
    </aside>
  )
}

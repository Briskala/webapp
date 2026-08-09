/**
 * Canonical Briskala product messaging — accounting & financial management platform.
 * Use these strings across marketing pages, nav, seeds, and fallbacks for consistency.
 */

export const BRAND = {
  name: 'Briskala',
  fullName: 'Briskala',
  tagline: 'Boekhouding & financieel beheer, helder geregeld',
  description:
    'Briskala is het complete platform voor boekhouding en financieel beheer. Beheer facturen, uitgaven, inkomsten, btw en rapporten — zelf, voor particulieren, zzp’ers, mkb en grotere organisaties.',
  metaTitle: 'Briskala — Boekhouding & Financieel Beheer',
  metaDescription:
    'Beheer facturen, uitgaven, boekhouding, btw en financiële rapporten met Briskala. Voor particulieren, zzp’ers, mkb, grote bedrijven en accountants.',
}

export const AUDIENCES = [
  { title: 'Particulieren', description: 'Houd privé-inkomsten, uitgaven en administratie overzichtelijk bij.' },
  { title: 'Zzp’ers & freelancers', description: 'Factureer klanten, boekt uitgaven en bereid uw btw-aangifte voor.' },
  { title: 'Kleine bedrijven', description: 'Centraliseer facturen, bonnetjes en cashflow zonder complexiteit.' },
  { title: 'Middelgrote bedrijven', description: 'Stroomlijn workflows, goedkeuringen en financiële rapportages.' },
  { title: 'Grote organisaties', description: 'Schaal boekhoudprocessen met rollen, inzichten en controle.' },
  { title: 'Accountants & adviseurs', description: 'Werk efficiënt samen met klanten via gedeelde administratie.' },
]

export const FEATURES = [
  {
    slug: 'facturen',
    title: 'Facturen',
    short: 'Maak, verstuur en volg facturen tot betaling.',
    navLabel: 'Facturen',
  },
  {
    slug: 'uitgaven',
    title: 'Uitgaven & bonnen',
    short: 'Registreer kosten, upload bonnen en categoriseer uitgaven.',
    navLabel: 'Uitgaven',
  },
  {
    slug: 'boekhouding',
    title: 'Boekhouding',
    short: 'Automatiseer boekingen en houd uw administratie up-to-date.',
    navLabel: 'Boekhouding',
  },
  {
    slug: 'btw',
    title: 'Btw & belastingen',
    short: 'Bereid btw-aangiften voor en houd fiscale termijnen bij.',
    navLabel: 'Btw',
  },
  {
    slug: 'rapporten',
    title: 'Rapporten & inzichten',
    short: 'Winst, verlies, cashflow en KPI’s in één overzicht.',
    navLabel: 'Rapporten',
  },
  {
    slug: 'documenten',
    title: 'Documenten',
    short: 'Bewaar bonnen, contracten en financiële documenten veilig.',
    navLabel: 'Documenten',
  },
]

export const MAIN_NAV = [
  { label: 'Functies', url: '/functies' },
  { label: 'Facturen', url: '/facturen' },
  { label: 'Boekhouding', url: '/boekhouding' },
  { label: 'Rapporten', url: '/rapporten' },
  { label: 'Prijzen', url: '/prijzen' },
  { label: 'Contact', url: '/contact' },
]

export const SECOND_NAV = [
  { label: 'HOME', url: '/', icon: 'home' },
  { label: 'FACTUREN', url: '/facturen', icon: 'invoice' },
  { label: 'UITGAVEN', url: '/uitgaven', icon: 'expense' },
  { label: 'BOEKHOUDING', url: '/boekhouding', icon: 'ledger' },
  { label: 'BTW & BELASTING', url: '/btw', icon: 'tax' },
  { label: 'RAPPORTEN', url: '/rapporten', icon: 'report' },
  { label: 'CONTACT', url: '/contact', icon: 'contact' },
]

export const HERO_DEFAULT = {
  heading: 'Uw complete boekhoudplatform',
  cards: [
    {
      id: '1',
      title: 'Ik wil facturen versturen en betalingen volgen',
      linkText: 'Ontdek facturatie',
      linkUrl: '/facturen',
    },
    {
      id: '2',
      title: 'Ik wil uitgaven, bonnen en btw zelf beheren',
      linkText: 'Bekijk uitgaven & btw',
      linkUrl: '/uitgaven',
    },
    {
      id: '3',
      title: 'Ik zoek heldere financiële rapporten voor mijn bedrijf',
      linkText: 'Bekijk rapporten',
      linkUrl: '/rapporten',
    },
  ],
}

export const PRICING_PLANS = [
  {
    name: 'Persoonlijk',
    price: '€0',
    period: '/maand',
    description: 'Voor particulieren die hun privéfinanciën willen organiseren.',
    features: ['Inkomsten & uitgaven bijhouden', 'Bonnen uploaden', 'Basisrapporten', '1 gebruiker'],
    cta: 'Gratis starten',
    highlighted: false,
  },
  {
    name: 'Zakelijk',
    price: '€29',
    period: '/maand',
    description: 'Voor zzp’ers en kleine bedrijven die hun administratie zelf doen.',
    features: [
      'Onbeperkt facturen',
      'Uitgaven & categorieën',
      'Btw-overzicht',
      'Bankkoppeling (basis)',
      'Tot 3 gebruikers',
    ],
    cta: 'Probeer 14 dagen',
    highlighted: true,
  },
  {
    name: 'Professioneel',
    price: '€79',
    period: '/maand',
    description: 'Voor groeiende bedrijven en accountants met meerdere dossiers.',
    features: [
      'Alles in Zakelijk',
      'Geavanceerde rapportages',
      'Goedkeuringsworkflows',
      'Meerdere administraties',
      'Prioritaire support',
    ],
    cta: 'Neem contact op',
    highlighted: false,
  },
]

export const FAQ_ITEMS = [
  {
    q: 'Voor wie is Briskala bedoeld?',
    a: 'Briskala is ontworpen voor particulieren, zzp’ers, freelancers, kleine en middelgrote bedrijven, grote organisaties én accountants die boekhouding en financiële administratie zelf willen beheren.',
  },
  {
    q: 'Kan ik facturen versturen vanuit Briskala?',
    a: 'Ja. U maakt professionele facturen, verstuurt ze naar klanten en volgt openstaande bedragen tot betaling — inclusief herinneringen en statusoverzichten.',
  },
  {
    q: 'Ondersteunt Briskala btw-administratie?',
    a: 'Ja. Het platform helpt u btw te berekenen, overzichten te maken en aangiften voor te bereiden, zodat u fiscale termijnen beter beheerst.',
  },
  {
    q: 'Werkt Briskala ook voor accountants?',
    a: 'Absoluut. Accountants en financiële professionals kunnen met klanten samenwerken, documenten delen en boekhoudworkflows stroomlijnen.',
  },
  {
    q: 'Zijn mijn financiële gegevens veilig?',
    a: 'Beveiliging staat centraal: versleutelde verbindingen, toegangscontrole per gebruiker en veilige opslag van documenten en boekhoudgegevens.',
  },
  {
    q: 'Kan ik overstappen vanuit een ander boekhoudpakket?',
    a: 'Ja. Importeer bestaande gegevens en documenten en zet uw administratie stap voor stap over naar Briskala. Ons team helpt u graag bij de migratie.',
  },
]

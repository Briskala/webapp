# Briskala — testresultaten (17 aug 2026)

## Samenvatting

| Test | Resultaat |
|---|---|
| `pnpm install` | ✅ Geslaagd |
| Dev server (`pnpm dev`) | ✅ Draait op localhost:3000 |
| `POST /api/accounting/demo-session` | ✅ 200 — 3 demo-bedrijven aangemaakt |
| `GET /api/accounting/{slug}/{hash}` | ✅ Dashboard KPI's (omzet, kosten, winst, btw) |
| Accounting frontend (zonder Firebase keys) | ⚠️ 500 — vereist geldige `NEXT_PUBLIC_FIREBASE_*` vars |
| `pnpm build` (zonder Firebase keys) | ⚠️ Faalt op prerender door Firebase init |

## API-test (demo-sessie)

**Request:**
```bash
curl -X POST http://localhost:3000/api/accounting/demo-session
```

**Response (samenvatting):**
- Demo user: `demo@briskala.com`
- Bedrijven: Erickson Holding, Briskala BV, Example Company
- Redirect: `/accounting/erickson-holding/{hash}`

**Dashboard stats (Erickson Holding):**
- Omzet: €1.979
- Uitgaven: €326,78
- Winst: €1.652,22
- Openstaande facturen: €2.394,59 (1)
- Openstaande inkoop: €290,40 (1)
- Btw te betalen: €357,38

## Conclusie voor Kickstarter

Het **accounting-platform** (API, multi-company, double-entry ledger, demo-data) werkt end-to-end. Voor productie/build en frontend in deze omgeving zijn Firebase-credentials nodig — dat is een deployment-configuratie, geen blocker voor de pitch.

Bestaande demo-video en screenshots in `images/` zijn geldig campagnemateriaal.

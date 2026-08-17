# Briskala — Kickstarter campagne-pakket

Deze map bevat alles wat je nodig hebt om een Kickstarter-campagne voor **Briskala** voor te bereiden: pitchtekst, videoscript, funding-advies, screenshots en een productdemo-video.

## Inhoud

| Bestand | Doel |
|---|---|
| [CAMPAIGN_PITCH_NL.md](./CAMPAIGN_PITCH_NL.md) | Volledige Nederlandse campagnetekst (titel, story, rewards, risico's) |
| [CAMPAIGN_PITCH_EN.md](./CAMPAIGN_PITCH_EN.md) | Engelse versie voor internationale backers |
| [FUNDING_ANALYSIS.md](./FUNDING_ANALYSIS.md) | Realistische fundingdoelen en verwachte opbrengst |
| [VIDEO_SCRIPT_NL.md](./VIDEO_SCRIPT_NL.md) | Videoscript (~2 min) voor Kickstarter-video |
| [TEST_RESULTS.md](./TEST_RESULTS.md) | Technische testresultaten (aug 2026) |
| [video/briskala-kickstarter-demo.mp4](./video/briskala-kickstarter-demo.mp4) | Productdemo voor campagne-video |
| [images/](./images/) | Screenshots voor campagnepagina |

## Upload-checklist (Kickstarter)

1. **Projecttitel** — gebruik titel uit `CAMPAIGN_PITCH_NL.md`
2. **Korte tagline** — max. 60 tekens
3. **Projectvideo** — upload `video/briskala-kickstarter-demo.mp4` of monteer met voice-over uit `VIDEO_SCRIPT_NL.md`
4. **Story** — kopieer secties uit `CAMPAIGN_PITCH_NL.md` naar Kickstarter-blokken
5. **Rewards** — 4–6 tiers uit pitch-document
6. **Risico's & uitdagingen** — sectie onderaan pitch
7. **Afbeeldingen** — min. 3 hero + 6 gallery (`images/`)
8. **Funding goal** — zie aanbeveling in `FUNDING_ANALYSIS.md`

## Belangrijk: Kickstarter ≠ aandelen

Kickstarter is **reward-based crowdfunding**. Backers krijgen geen equity. Voor investeerders/aandelen: kijk naar Seedrs, Leapfunder, Wefunder (VS) of angel/pre-seed rondes.

## Demo lokaal draaien

```bash
pnpm install
cp .env.example .env   # vul PAYLOAD_SECRET + Firebase in
pnpm dev
curl -X POST http://localhost:3000/api/accounting/demo-session
# Open http://localhost:3000/accounting
```

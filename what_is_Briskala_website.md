# 📋 Wat is Briskala Property & Asset Group?

## Een Complete Uitleg & Businessplan

---

## 1. Wat is dit Bedrijf?

**Briskala Property & Asset Group** is een Belgisch bedrijf dat meerdere diensten aanbiedt op het gebied van vastgoed, financiering en aanverwante sectoren. De naam "BPAG" (de code-naam van het project) staat voor de originele naam **Belgian Property & Asset Group**, nu hernoemd naar **Briskala Property & Asset Group**.

Het bedrijf positioneert zichzelf als een **one-stop-shop** voor klanten die willen:
- 🏠 **Kopen, huren of investeren** in vastgoed
- 🚗 **Een voertuig financieren** via gunstige leningen
- 🏗️ **Nieuwbouw projecten** volgen of aankopen
- 🛢️ **Olietanken** beheren of afnemen
- 📋 **Diverse zakelijke en particuliere diensten** gebruiken

De tagline op de website: **"We're helped 95+ business — Building the future with founders who move the world"** suggereert dat het bedrijf zich richt op ondernemers en bedrijven die willen groeien.

---

## 2. Hoe Werkt de Website?

De website is gebouwd met moderne technologie:

| Technologie | Gebruik |
|---|---|
| **Next.js 15** | Frontend framework (React) |
| **Payload CMS** | Content Management Systeem (beheerpaneel) |
| **Turso (libSQL)** | Database — opgeslagen in de cloud |
| **Firebase Auth** | Inlogsysteem voor klanten |
| **Vanilla CSS** | Styling |

### Wat kan een klant doen op de website?

1. **Homepage bekijken** — hero sectie met foto's, diensten overzicht
2. **Diensten & Informatie lezen** — via uitklapbare accordeon
3. **Voertuigen bekijken** — via /autofinanciering (uit de database)
4. **Vastgoed bekijken** — via /vastgoed
5. **Woningbouw projecten** — via /woningbouw
6. **Olietanken info** — via /olietanken
7. **Contact opnemen** — via het contactformulier
8. **Inloggen / Registreren** — via Google of QR-code login
9. **Persoonlijk account** — klanten zien hun saldo, klantnummer, aanvragen, berichten, wallet
10. **Zoeken** — via de zoekbalk in de header
11. **Nieuws lezen** — via /nieuws
12. **Problemen melden** — via /probleem-melden

### Wat kan het bedrijf beheren via het admin-paneel?

Via het Payload CMS admin panel kan het bedrijf:
- Voertuigen toevoegen / bewerken / verwijderen
- Vastgoed objecten beheren
- Klanten registreren en beheren
- Aanvragen van klanten opvolgen
- Berichten sturen naar klanten
- Nieuwsartikelen publiceren
- Documenten (downloads) toevoegen
- Filialen (branches) aanmaken
- Footer, hero, sidebar en andere pagina-inhoud aanpassen

---

## 3. De Huidige Diensten

```
Briskala Property & Asset Group
│
├── 🏠 Vastgoed (koop & huur van panden)
├── 🏗️ Woningbouw (nieuwbouwprojecten)
├── 🚗 Autofinanciering (voertuigen financieren)
├── 🛢️ Olietanken (olieopslagtanks)
├── 📋 Diensten (overige zakelijke diensten)
└── 📰 Nieuws (communicatie)
```

---

## 4. Businessplan

### 4.1 Missie
> *"Briskala helpt particulieren en ondernemers met het realiseren van hun woon-, rij- en investeringsambities door transparante, persoonlijke begeleiding op maat."*

### 4.2 Doelgroepen

| Segment | Omschrijving |
|---|---|
| **Particulieren** | Mensen die een woning willen kopen/huren of een auto willen financieren |
| **Ondernemers (KMO's)** | Bedrijven die vastgoed of voertuigen nodig hebben voor hun activiteiten |
| **Investeerders** | Mensen die willen investeren in vastgoed of beleggingspanden |
| **Bouwpromotoren** | Partijen die woningbouwprojecten willen promoten via het platform |

### 4.3 Inkomstenstromen

| Stroom | Beschrijving |
|---|---|
| 💰 **Commissie vastgoed** | Percentage op elke verkoop/verhuur van een pand |
| 💰 **Financieringsprovisie** | Vergoeding van banken/leasemaatschappijen bij autofinanciering |
| 💰 **Abonnementen** | Klanten betalen voor toegang tot premium diensten |
| 💰 **Beheervergoeding** | Beheerfee voor olietanken of vastgoedportefeuille |
| 💰 **Advertenties** | Bouwpromotoren betalen om projecten te adverteren |

---

## 5. Wat Kan Er Beter?

### 🔴 Kritieke Verbeterpunten (Nu Aanpakken)

#### 5.1 Database Betrouwbaarheid
- **Probleem:** Turso gratis abonnement "slaapt" en veroorzaakt timeouts voor bezoekers
- **Oplossing:** Upgraden naar betaald Turso-plan, of overstappen naar Supabase of PlanetScale

#### 5.2 Geen Echt Betaalsysteem
- **Probleem:** Er is wel een saldo-veld (€ 0,00) maar geen echte betaalintegratie
- **Oplossing:** **Mollie** integreren (ideaal voor België) — ondersteunt Bancontact, iDEAL, creditcard

#### 5.3 Inloggen Is Complex
- **Probleem:** Firebase + custom token-redirect is technisch maar verwarrend voor klanten
- **Oplossing:** Eenvoudigere Google Sign-In of e-mail + wachtwoord direct op de site

#### 5.4 Lege Database — Geen Echte Content
- **Probleem:** Voertuigen, panden en diensten staan niet in de database
- **Oplossing:** Admin-paneel gebruiken om echte listings toe te voegen

#### 5.5 Geen SEO Content
- **Probleem:** Pagina's hebben nauwelijks tekst — Google kan de site niet indexeren
- **Oplossing:** Minimaal 300 woorden per dienstenpagina schrijven via het CMS

---

### 🟡 Verbeterpunten op Middellange Termijn

#### 5.6 Bewijs van Vertrouwen Ontbreekt
- De site zegt "95+ businesses geholpen" maar toont geen reviews of cases
- **Beter:** Google Reviews widget, klant-logo's en succesverhalen toevoegen

#### 5.7 Specifieke Aanvraagformulieren
- Nu is er alleen een algemeen contactformulier
- **Beter:** Per dienst een specifiek formulier (bijv. autofinanciering met merk/model/bedrag)

#### 5.8 Vastgoed Listings Met Foto's & Filters
- **Beter:** Panden tonen met foto's, prijs, oppervlakte, locatie en filteropties (koop/huur/regio)

#### 5.9 Meertaligheid
- De topbar heeft NL/FR/EN knoppen maar pagina's zijn alleen Nederlands
- **Beter:** Kernpagina's vertalen naar Frans en Engels voor heel België

#### 5.10 WhatsApp Business Knop
- **Beter:** WhatsApp-widget onderaan voor directe communicatie

#### 5.11 Google Maps Integratie
- Voor elk filiaal een kaart tonen op de contactpagina

---

### 🟢 Lange Termijn Visie

#### 5.12 Klantportaal Uitbreiden
Het portaal bestaat al (aanvragen, berichten, wallet). Uitbreiden met:
- Contracten & documenten digitaal ondertekenen
- Dashboard met portefeuille-overzicht
- Afspraken inplannen online

#### 5.13 Mobiele App
- Website is al mobile-responsive
- Native app (React Native) voor push-notificaties bij status-updates van aanvragen

#### 5.14 Automatisering
- Automatische e-mails bij statuswijziging aanvraag
- Rapporten voor beheerders

---

## 6. Samenvatting

| | Nu | Potentieel |
|---|---|---|
| **Diensten** | Vastgoed, auto, bouw, olie | + Hypotheken, verzekeringen, leasing |
| **Klanten** | Particulieren & KMO's | + Institutionele investeerders |
| **Kanalen** | Website | + App, WhatsApp, e-mail marketing |
| **Technologie** | Next.js + Payload + Turso | + Betalingen, e-signing, CRM |
| **Bereik** | Belgisch (NL) | + FR, EN, internationaal |

---

> **Conclusie:** Briskala Property & Asset Group heeft een sterke technische basis en een duidelijke multi-sector aanpak. De grootste kansen liggen in het vullen van de database met echte content, het toevoegen van een betrouwbaar betaalsysteem, en het opbouwen van vertrouwen via reviews en succesverhalen.

---

*Document gegenereerd op 17 mei 2026 — Briskala Property & Asset Group*

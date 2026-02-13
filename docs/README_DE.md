# EsprowStream

[Homepage][homepage] • [GitHub][github]

[English (Default)](../README.md) • [Bahasa Indonesia](README_ID.md) • [Deutsch](README_DE.md) • [Español](README_ES.md) • [فارسی](README_FA.md) • [Français](README_FR.md) • [日本語](README_JA.md) • [Português](README_PT.md) • [Русский](README_RU.md) • [中文](README_ZH.md)

[homepage]: http://localhost:3000
[github]: https://github.com/yourusername/esprowstream

EsprowStream ist eine innovative Web3-Video-Streaming-Anwendung, mit der Nutzer kostenpflichtige Videos mit USDC über einen sicheren Escrow-Mechanismus ansehen können. Entwickelt mit Next.js, wagmi und Smart Contracts im Sepolia-Netzwerk.

- [Funktionen](#features)
- [So funktioniert’s](#how-it-works)
- [Erste Schritte](#getting-started)
- [Video-Upload](#video-upload)
- [Sicherheit](#security)
- [Tech-Stack](#tech-stack)
- [Beitragen](#contributing)
- [Lizenz](#license)

<a id="features"></a>

## Funktionen

- 🎥 **Multi-Video-Support**: Wähle aus verschiedenen verfügbaren filmischen Videos
- 💰 **USDC-Zahlungen**: Bezahle mit USDC (Test-Token) transparent
- 🔐 **Escrow-System**: Gelder werden sicher in Smart Contracts gehalten; du zahlst nur für die Watch-Time
- ⏱️ **Flexible Dauer**: Lege die Sitzungsdauer nach Bedarf fest
- 🏦 **Sicher auszahlen**: Hebe dein Escrow-Guthaben jederzeit ab

<a id="how-it-works"></a>

## So funktioniert’s

Zum Ansehen von Videos nutzt das System einen USDC-basierten Escrow-Mechanismus.

1. **Verbinden**: Klicke auf **Connect Wallet** (Sepolia-Netzwerk).
2. **USDC holen**: Nutze Faucet oder frage beim Admin nach.
3. **Approve**: Erlaube dem Contract, deine USDC zu verwenden.
4. **Einzahlen**: Lade dein Escrow-Guthaben auf.
5. **Session starten**: Video/Dauer auswählen und starten.
6. **Ansehen**: Kosten werden pro Minute abgezogen.
7. **Beenden/Auszahlen**: Stoppe jederzeit und zahle Restguthaben aus.

<a id="getting-started"></a>

## Erste Schritte

<a id="prerequisites"></a>

### Voraussetzungen

- Node.js 18+
- npm oder yarn
- Browser-Wallet (MetaMask)
- Sepolia-Testnet-Zugang

<a id="installation"></a>

### Installation

1. **Repository klonen**

   ```bash
   git clone <repository-url>
   cd esprowstream
   ```

2. **Abhängigkeiten installieren**

   ```bash
   npm install
   ```

3. **Umgebung einrichten**

   Kopiere `.env.example` nach `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

   Konfiguriere deine Variablen (`NEXT_PUBLIC_ESCROW_ADDRESS`, `NEXT_PUBLIC_USDC_ADDRESS`, usw.) in `.env.local`.

4. **Starten**

   ```bash
   npm run dev
   ```

Besuche [http://localhost:3000](http://localhost:3000).

<a id="video-upload"></a>

## Video-Upload

Wir empfehlen **IPFS (Pinata)** für dezentrale Speicherung.

1. **Upload**: Lade das Video bei [Pinata](https://pinata.cloud) hoch und hole dir die CID.
2. **Config**: Füge die Videodetails in `.env.local` unter `NEXT_PUBLIC_VIDEO_LIBRARY` hinzu:
   ```json
   {
     "id": 3,
     "title": "New Video",
     "description": "Description",
     "cid": "your_ipfs_cid"
   }
   ```
3. **Neustart**: Starte den Dev-Server neu.

<a id="security"></a>

## Sicherheit

- ✅ **Keine versteckten Gebühren**
- ✅ **Keine automatische Abbuchung ohne Session-Start**
- ✅ **Zahle nur für tatsächliche Watch-Time**
- ✅ **Transparente Blockchain-Transaktionen**
- ✅ **Gelder bleiben sicher im Escrow**

<a id="tech-stack"></a>

## Tech-Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Web3**: wagmi, viem, Sepolia testnet
- **Styling**: Tailwind CSS
- **Storage**: Pinata IPFS

<a id="contributing"></a>

## Beitragen

1. Forke das Repository
2. Erstelle einen Feature-Branch
3. Committe Änderungen
4. Push in deinen Branch
5. Erstelle einen Pull Request

<a id="license"></a>

## Lizenz

Veröffentlicht unter der MIT-Lizenz. Siehe `LICENSE` für weitere Informationen.

---

**Hinweis**: Dies ist eine Testnet-Anwendung. Bitte mit Vorsicht verwenden und kein echtes USDC nutzen.

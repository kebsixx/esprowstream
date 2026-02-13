# EsprowStream

[Homepage][homepage] • [GitHub][github]

[English (Default)](../README.md) • [Bahasa Indonesia](README_ID.md) • [Deutsch](README_DE.md) • [Español](README_ES.md) • [فارسی](README_FA.md) • [Français](README_FR.md) • [日本語](README_JA.md) • [Português](README_PT.md) • [Русский](README_RU.md) • [中文](README_ZH.md)

[homepage]: http://localhost:3000
[github]: https://github.com/yourusername/esprowstream

EsprowStream est une application innovante de streaming vidéo Web3 qui permet aux utilisateurs de regarder des vidéos payantes en USDC via un mécanisme d’escrow sécurisé. Construite avec Next.js, wagmi et des smart contracts sur le réseau Sepolia.

- [Fonctionnalités](#features)
- [Fonctionnement](#how-it-works)
- [Démarrage](#getting-started)
- [Upload vidéo](#video-upload)
- [Sécurité](#security)
- [Tech Stack](#tech-stack)
- [Contribuer](#contributing)
- [Licence](#license)

<a id="features"></a>

## Fonctionnalités

- 🎥 **Support multi-vidéos** : choisissez parmi plusieurs vidéos cinématiques disponibles
- 💰 **Paiements en USDC** : utilisez l’USDC (token de test) pour des paiements transparents
- 🔐 **Système d’escrow** : les fonds sont conservés dans des smart contracts ; vous ne payez que le temps de visionnage
- ⏱️ **Durée flexible** : définissez la durée de session selon vos besoins
- 🏦 **Retrait sécurisé** : retirez votre solde d’escrow à tout moment

<a id="how-it-works"></a>

## Fonctionnement

Pour regarder des vidéos, le système utilise un mécanisme d’escrow basé sur l’USDC.

1. **Connexion** : cliquez sur **Connect Wallet** (réseau Sepolia).
2. **Obtenir de l’USDC** : utilisez un faucet ou demandez à l’admin.
3. **Approve** : autorisez le contrat à utiliser vos USDC.
4. **Dépôt** : alimentez votre solde escrow.
5. **Démarrer une session** : sélectionnez vidéo/durée puis lancez.
6. **Visionner** : le coût est déduit par minute.
7. **Fin/Retrait** : stoppez quand vous voulez et retirez le reste.

<a id="getting-started"></a>

## Démarrage

### Prérequis

- Node.js 18+
- npm ou yarn
- Wallet navigateur (MetaMask)
- Accès au testnet Sepolia

### Installation

1. **Cloner le dépôt**

   ```bash
   git clone <repository-url>
   cd esprowstream
   ```

2. **Installer les dépendances**

   ```bash
   npm install
   ```

3. **Configurer l’environnement**

   Copiez `.env.example` vers `.env.local` :

   ```bash
   cp .env.example .env.local
   ```

   Configurez vos variables (`NEXT_PUBLIC_ESCROW_ADDRESS`, `NEXT_PUBLIC_USDC_ADDRESS`, etc.) dans `.env.local`.

4. **Lancer**

   ```bash
   npm run dev
   ```

Rendez-vous sur [http://localhost:3000](http://localhost:3000).

<a id="video-upload"></a>

## Upload vidéo

Nous recommandons **IPFS (Pinata)** pour un stockage décentralisé.

1. **Upload** : envoyez la vidéo sur [Pinata](https://pinata.cloud) et récupérez la CID.
2. **Config** : ajoutez les détails de la vidéo dans `NEXT_PUBLIC_VIDEO_LIBRARY` de `.env.local` :
   ```json
   {
     "id": 3,
     "title": "New Video",
     "description": "Description",
     "cid": "your_ipfs_cid"
   }
   ```
3. **Redémarrer** : redémarrez le serveur de dev.

<a id="security"></a>

## Sécurité

- ✅ **Pas de frais cachés**
- ✅ **Pas de débit automatique sans session**
- ✅ **Vous payez uniquement le temps réellement regardé**
- ✅ **Transactions on-chain transparentes**
- ✅ **Fonds sécurisés en escrow**

<a id="tech-stack"></a>

## Tech Stack

- **Frontend** : Next.js 15, React 18, TypeScript
- **Web3** : wagmi, viem, Sepolia testnet
- **Styling** : Tailwind CSS
- **Stockage** : Pinata IPFS

<a id="contributing"></a>

## Contribuer

1. Forkez le dépôt
2. Créez une branche feature
3. Faites vos commits
4. Poussez la branche
5. Ouvrez une Pull Request

<a id="license"></a>

## Licence

Distribué sous licence MIT. Voir `LICENSE` pour plus d’informations.

---

**Note** : ceci est une application testnet. À utiliser avec prudence et ne pas utiliser de vrai USDC.

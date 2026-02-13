# EsprowStream

[Homepage][homepage] • [GitHub][github]

[English (Default)](README.md) • [Bahasa Indonesia](docs/README_ID.md) • [Español](docs/README_ES.md) • [فارسی](docs/README_FA.md) • [中文](docs/README_ZH.md)

[homepage]: http://localhost:3000
[github]: https://github.com/yourusername/esprowstream

<p align="center">
  <img src="public/logo.png" alt="EsprowStream Logo" width="150" height="150"/>
</p>

EsprowStream is an innovative Web3 video streaming application that allows users to watch paid videos using USDC with a secure escrow mechanism. Built with Next.js, wagmi, and smart contracts on the Sepolia network.

- [Features](#features)
- [How It Works](#how-it-works)
- [Getting Started](#getting-started)
- [Video Upload](#video-upload)
- [Security](#security)
- [Contributing](#contributing)

## Features

- 🎥 **Multi-Video Support**: Choose from various available cinematic videos
- 💰 **USDC Payments**: Use USDC (test token) for transparent payments
- 🔐 **Escrow System**: Funds are securely stored in smart contracts, pay only for watching time
- ⏱️ **Flexible Duration**: Set session duration according to your needs
- 🏦 **Safe Withdraw**: Withdraw escrow balance anytime

## How It Works

To watch videos, the system uses a USDC-based escrow mechanism.

1. **Connect**: Click **Connect Wallet** (Sepolia network).
2. **Get USDC**: Use faucet or request from admin.
3. **Approve**: Allow contract to use your USDC.
4. **Deposit**: Fund your escrow balance.
5. **Start Session**: Select video/duration and start watching.
6. **Watch**: Cost is deducted per minute.
7. **End/Withdraw**: Stop anytime and withdraw remaining funds.

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Browser wallet (MetaMask)
- Sepolia testnet access

### Installation

1. **Clone repository**

   ```bash
   git clone <repository-url>
   cd esprowstream
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup environment**

   Copy `.env.example` to `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

   Configure your variables (`NEXT_PUBLIC_ESCROW_ADDRESS`, `NEXT_PUBLIC_USDC_ADDRESS`, etc) in `.env.local`.

4. **Run**

   ```bash
   npm run dev
   ```

Visit [http://localhost:3000](http://localhost:3000).

## Video Upload

We recommend **IPFS (Pinata)** for decentralized storage.

1. **Upload**: Upload video to [Pinata](https://pinata.cloud) and get the CID.
2. **Config**: Add the video details to `NEXT_PUBLIC_VIDEO_LIBRARY` in `.env.local`:
   ```json
   {
     "id": 3,
     "title": "New Video",
     "description": "Description",
     "cid": "your_ipfs_cid"
   }
   ```
3. **Restart**: Restart the dev server.

## Security

- ✅ **No hidden fees**
- ✅ **No auto-charge without starting session**
- ✅ **Pay only for actual watching time**
- ✅ **Transparent blockchain transactions**
- ✅ **Funds secure in escrow**

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Web3**: wagmi, viem, Sepolia testnet
- **Styling**: Tailwind CSS
- **Storage**: Pinata IPFS

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

**Note**: This is a testnet application. Use with caution and do not use real USDC.

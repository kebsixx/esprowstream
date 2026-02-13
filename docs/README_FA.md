# 🎬 EsprowStream - Decentralized Video Streaming with USDC Escrow

<p align="center">
  <img src="public/logo.png" alt="EsprowStream Logo" width="200"/>
</p>

**Note**: This is a placeholder for the Persian (فارسی) version. The content below is in English and needs to be translated to Persian.

EsprowStream is an innovative Web3 video streaming application that allows users to watch paid videos using USDC with a secure escrow mechanism. Built with Next.js, wagmi, and smart contracts on the Sepolia network.

## Table of Contents

- [Quick Features](#quick-features)
- [How It Works](#how-it-works)
- [Security](#security)
- [Tech Stack](#tech-stack)
- [Video Upload & Storage](#video-upload--storage)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## 🌍 Language / Bahasa

[English (Default)](../README.md) • [Bahasa Indonesia](README_ID.md) • [Español](README_ES.md) • [فارسی](README_FA.md) • [中文](README_ZH.md)

## ✨ Quick Features

- 🎥 **Multi-Video Support**: Choose from various available cinematic videos
- 💰 **USDC Payments**: Use USDC (test token) for transparent payments
- 🔐 **Escrow System**: Funds are securely stored in smart contracts, pay only for watching time
- ⏱️ **Flexible Duration**: Set session duration according to your needs
- 🏦 **Safe Withdraw**: Withdraw escrow balance anytime

## 🚀 How It Works

### 🎬 How to Watch Paid Videos (Using USDC)

To watch videos, the system uses a USDC-based escrow mechanism. Follow these steps:

#### 1️⃣ Connect Wallet

Click **Connect Wallet** and make sure you are on the **Sepolia** network.

The wallet will be used for:

- Storing USDC
- Performing approve
- Paying for watching sessions

#### 2️⃣ Get USDC (If You Don't Have Any)

Since this uses MockUSDC (test token), you need to have USDC balance first.

- If a **Mint / Faucet** button is available, click to get USDC
- If not, request transfer from admin

#### 3️⃣ Approve USDC

Before it can be used, you must give permission to the smart contract.

Click the **Approve USDC** button.

**What is approve?**
Approve is permission for the contract to take a certain amount of USDC from your wallet for deposit purposes.

Without approve, subsequent transactions will fail.

#### 4️⃣ Deposit to Escrow

After approve succeeds, click **Deposit**.

Deposit will:

- Move USDC from wallet to contract
- Store it as your internal balance in escrow

#### 5️⃣ Start Session

Select video and duration, then click **Start Session**.

The system will:

- Calculate cost based on duration
- Deduct from escrow balance
- Start video playback

#### 6️⃣ During Watching

- Video plays normally
- Time counts down
- Cost deducted proportionally

#### 7️⃣ End Session

When time runs out or you stop:

- Session ends automatically
- Remaining balance stays in escrow

#### 8️⃣ Withdraw (Optional)

Click **Withdraw** to get remaining escrow balance back to wallet.

### 🧠 Simple Summary

1. **Connect** → **Get USDC** → **Approve** → **Deposit** → **Start Session** → **Watch** → **Withdraw**

## 🔒 Security

- ✅ **No hidden fees**
- ✅ **No auto-charge without starting session**
- ✅ **You only pay for actual watching time**
- ✅ **All transactions transparent on blockchain**
- ✅ **Funds secure in escrow until session ends**

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Web3**: wagmi, viem, Sepolia testnet
- **Styling**: Tailwind CSS, Custom CSS
- **Video Hosting**: Pinata IPFS
- **Smart Contracts**: Solidity, Foundry (assumed)

## 📤 Video Upload & Storage

### Recommended Video Storage Places

For decentralized and durable video storage, we recommend:

- **IPFS (InterPlanetary File System)**: Decentralized storage, immutable, and fast. Suitable for video streaming.
- **Arweave**: Permanent storage with once-pay-forever model. Good for content that needs to be stored forever.
- **Filecoin**: Decentralized storage with mining incentives. Combination of IPFS + storage incentives.

**Primary Choice**: Pinata (IPFS gateway) because it's easy to use and well integrated with Web3 apps.

### How to Upload Videos

1. **Prepare Pinata Account**
   - Register at [pinata.cloud](https://pinata.cloud)
   - Get API keys (for automation later)

2. **Upload Video**
   - Login to Pinata dashboard
   - Upload video file (.mp4, .webm, etc.)
   - Pin file to keep it stored
   - Get **CID** (Content Identifier) from uploaded file

3. **Add to Library**
   - Edit `.env.local`
   - Add new object to `NEXT_PUBLIC_VIDEO_LIBRARY` array:
     ```json
     {
       "id": 3,
       "title": "New Video Title",
       "description": "Video description",
       "cid": "bafybeigunakan_cid_dari_pinata"
     }
     ```
   - Restart development server to load changes

4. **Set Video Price (Optional)**
   - If using smart contract with video pricing, call `setVideoPrice(videoId, pricePerInterval)`
   - Price in USDC smallest unit (6 decimals)

### Video Upload Tips

- **Format**: Use MP4 or WebM for browser compatibility
- **Size**: Compress videos for fast loading (use tools like HandBrake)
- **Fallback URLs**: System already supports multiple IPFS gateways for reliability
- **Metadata**: Add thumbnail and metadata in Pinata for better user experience

## 📦 Installation & Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Browser wallet extension (MetaMask, etc.)
- Access to Sepolia testnet

### Installation Steps

1. **Clone repository**

   ```bash
   git clone <repository-url>
   cd esprowstream
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup environment variables**

   Copy `.env.example` to `.env.local` and fill with appropriate values:

   ```bash
   cp .env.example .env.local
   ```

   **Variables that need to be filled:**
   - `NEXT_PUBLIC_ESCROW_ADDRESS`: Smart contract escrow address (get from deployment on Sepolia)
   - `NEXT_PUBLIC_USDC_ADDRESS`: USDC token address (usually 0x... for testnet)
   - `NEXT_PUBLIC_SESSION_MINUTES_MIN`: Minimum session duration in minutes (default: 0)
   - `NEXT_PUBLIC_SESSION_MINUTES_MAX`: Maximum session duration in minutes (default: 180)
   - `NEXT_PUBLIC_SESSION_MINUTES_STEP`: Duration increment step (default: 1)
   - `NEXT_PUBLIC_DEPOSIT_AMOUNT`: Deposit amount in smallest USDC unit (6 decimals, default: 1000000 = 1 USDC)
   - `NEXT_PUBLIC_VIDEO_LIBRARY`: JSON array of available videos (see example in `.env.example`)

   **How to get contract addresses:**
   - Deploy escrow smart contract to Sepolia testnet
   - Use the generated address for `ESCROW_ADDRESS`
   - For USDC, use the address of MockUSDC already deployed on testnet

   Example `.env.local` content:

   ```env
   NEXT_PUBLIC_ESCROW_ADDRESS=0xYOUR_ESCROW_CONTRACT_ADDRESS
   NEXT_PUBLIC_USDC_ADDRESS=0xYOUR_USDC_CONTRACT_ADDRESS
   NEXT_PUBLIC_SESSION_MINUTES_MIN=0
   NEXT_PUBLIC_SESSION_MINUTES_MAX=180
   NEXT_PUBLIC_SESSION_MINUTES_STEP=1
   NEXT_PUBLIC_DEPOSIT_AMOUNT=1000000
   NEXT_PUBLIC_VIDEO_LIBRARY=[{"id":1,"title":"Video Title","description":"Description","cid":"bafy..."}]
   ```

4. **Run development server**

   ```bash
   npm run dev
   ```

5. **Open browser**

   Visit [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

1. **Connect Wallet**: Click Connect Wallet button in header
2. **Get USDC**: Use faucet or request from admin
3. **Approve & Deposit**: Follow steps in UI
4. **Select Video**: Choose video from dropdown
5. **Set Duration**: Adjust session minutes using slider
6. **Start Session**: Click to start watching
7. **Enjoy**: Watch video with real-time cost
8. **End Session**: End session anytime
9. **Withdraw**: Withdraw remaining balance if needed

## 🤝 Contributing

Contributions are very welcome! Please:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Create Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

**Note**: This is a testnet application. Use with caution and do not use real USDC.

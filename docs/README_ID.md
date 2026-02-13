# EsprowStream

[Homepage][homepage] • [GitHub][github]

[English (Default)](../README.md) • [Bahasa Indonesia](README_ID.md) • [Deutsch](README_DE.md) • [Español](README_ES.md) • [فارسی](README_FA.md) • [Français](README_FR.md) • [日本語](README_JA.md) • [Português](README_PT.md) • [Русский](README_RU.md) • [中文](README_ZH.md)

[homepage]: http://localhost:3000
[github]: https://github.com/yourusername/esprowstream

EsprowStream adalah aplikasi streaming video Web3 yang inovatif yang memungkinkan pengguna menonton video berbayar menggunakan USDC dengan mekanisme escrow yang aman. Dibangun dengan Next.js, wagmi, dan smart contract di jaringan Sepolia.

- [Fitur](#features)
- [Cara Kerja](#how-it-works)
- [Memulai](#getting-started)
- [Upload Video](#video-upload)
- [Keamanan](#security)
- [Tech Stack](#tech-stack)
- [Kontribusi](#contributing)
- [Lisensi](#license)

<a id="features"></a>

## Fitur

- 🎥 **Multi-Video Support**: Pilih dari berbagai video cinematic yang tersedia
- 💰 **Pembayaran USDC**: Gunakan USDC (test token) untuk pembayaran yang transparan
- 🔐 **Sistem Escrow**: Dana disimpan aman di smart contract; kamu hanya bayar sesuai waktu menonton
- ⏱️ **Durasi Fleksibel**: Atur durasi sesi sesuai kebutuhan
- 🏦 **Withdraw Aman**: Tarik saldo escrow kapan saja

<a id="how-it-works"></a>

## Cara Kerja

Untuk menonton video, sistem menggunakan mekanisme escrow berbasis USDC.

1. **Connect**: Klik **Connect Wallet** (jaringan Sepolia).
2. **Dapatkan USDC**: Gunakan faucet atau minta ke admin.
3. **Approve**: Izinkan kontrak menggunakan USDC kamu.
4. **Deposit**: Isi saldo escrow.
5. **Start Session**: Pilih video/durasi lalu mulai menonton.
6. **Watch**: Biaya dipotong per menit.
7. **End/Withdraw**: Berhenti kapan saja dan withdraw sisa saldo.

<a id="getting-started"></a>

## Memulai

### Prasyarat

- Node.js 18+
- npm atau yarn
- Wallet browser (MetaMask)
- Akses testnet Sepolia

### Instalasi

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

   Salin `.env.example` ke `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

   Atur variabel (`NEXT_PUBLIC_ESCROW_ADDRESS`, `NEXT_PUBLIC_USDC_ADDRESS`, dll.) di `.env.local`.

4. **Run**

   ```bash
   npm run dev
   ```

Buka [http://localhost:3000](http://localhost:3000).

<a id="video-upload"></a>

## Upload Video

Kami merekomendasikan **IPFS (Pinata)** untuk storage terdesentralisasi.

1. **Upload**: Upload video ke [Pinata](https://pinata.cloud) dan ambil CID.
2. **Config**: Tambahkan detail video ke `NEXT_PUBLIC_VIDEO_LIBRARY` di `.env.local`:
   ```json
   {
     "id": 3,
     "title": "New Video",
     "description": "Description",
     "cid": "your_ipfs_cid"
   }
   ```
3. **Restart**: Restart dev server.

<a id="security"></a>

## Keamanan

- ✅ **Tanpa biaya tersembunyi**
- ✅ **Tidak ada auto-charge tanpa memulai sesi**
- ✅ **Bayar hanya untuk waktu menonton yang benar-benar dipakai**
- ✅ **Transaksi transparan di blockchain**
- ✅ **Dana aman di escrow**

<a id="tech-stack"></a>

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Web3**: wagmi, viem, Sepolia testnet
- **Styling**: Tailwind CSS
- **Storage**: Pinata IPFS

<a id="contributing"></a>

## Kontribusi

1. Fork repository
2. Buat feature branch
3. Commit perubahan
4. Push ke branch
5. Buat Pull Request

<a id="license"></a>

## Lisensi

Didistribusikan di bawah lisensi MIT. Lihat `LICENSE` untuk informasi lebih lanjut.

---

**Catatan**: Ini adalah aplikasi testnet. Gunakan dengan hati-hati dan jangan gunakan USDC asli.

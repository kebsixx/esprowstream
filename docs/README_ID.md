# 🎬 EsprowStream - Streaming Video Terdesentralisasi dengan Escrow USDC

<p align="center">
  <img src="public/logo.png" alt="EsprowStream Logo" width="200"/>
</p>

EsprowStream adalah aplikasi streaming video Web3 yang inovatif yang memungkinkan pengguna menonton video berbayar menggunakan USDC dengan mekanisme escrow yang aman. Dibangun dengan Next.js, wagmi, dan smart contracts di jaringan Sepolia.

## 🌍 Language / Bahasa

[English (Default)](../README.md) • [Bahasa Indonesia](README_ID.md) • [Español](README_ES.md) • [فارسی](README_FA.md) • [中文](README_ZH.md)

## Daftar Isi

- [Fitur Utama](#fitur-utama)
- [Cara Kerja](#cara-kerja)
- [Keamanan](#keamanan)
- [Tech Stack](#tech-stack)
- [Video Upload & Storage](#video-upload--storage)
- [Instalasi & Setup](#instalasi--setup)
- [Penggunaan](#penggunaan)
- [Kontribusi](#kontribusi)
- [Lisensi](#lisensi)

## ✨ Fitur Utama

- 🎥 **Multi-Video Support**: Pilih dari berbagai video cinematic yang tersedia
- 💰 **Pembayaran USDC**: Gunakan USDC (test token) untuk pembayaran yang transparan
- 🔐 **Escrow System**: Dana disimpan aman di smart contract, bayar sesuai waktu menonton
- ⏱️ **Durasi Fleksibel**: Atur durasi sesi menonton sesuai kebutuhan
- 🏦 **Withdraw Aman**: Tarik saldo escrow kapan saja
- 📱 **Responsive UI**: Interface modern dengan glassmorphism design
- 🔄 **Real-time Updates**: Monitoring saldo dan status sesi secara real-time

## 🚀 Cara Kerja

### 🎬 Cara Menonton Video Berbayar (Menggunakan USDC)

Untuk menonton video, sistem menggunakan mekanisme escrow berbasis USDC. Ikuti langkah berikut:

#### 1️⃣ Connect Wallet

Klik **Connect Wallet** dan pastikan kamu berada di jaringan **Sepolia**.

Wallet akan digunakan untuk:

- Menyimpan USDC
- Melakukan approve
- Membayar sesi menonton

#### 2️⃣ Dapatkan USDC (Jika Belum Punya)

Karena ini menggunakan MockUSDC (test token), kamu perlu memiliki saldo USDC terlebih dahulu.

- Jika tersedia tombol **Mint / Faucet**, klik untuk mendapatkan USDC
- Jika tidak, minta transfer dari admin

#### 3️⃣ Approve USDC

Sebelum bisa digunakan, kamu harus memberikan izin kepada smart contract.

Klik tombol **Approve USDC**.

**Apa itu approve?**
Approve adalah izin agar contract boleh mengambil sejumlah USDC dari wallet kamu untuk keperluan deposit.

Tanpa approve, transaksi berikutnya akan gagal.

#### 4️⃣ Deposit ke Escrow

Setelah approve berhasil, klik **Deposit**.

Deposit akan:

- Memindahkan USDC dari wallet ke contract
- Menyimpannya sebagai saldo internal kamu di escrow

Saldo ini tidak langsung dibayar, tetapi disimpan untuk membayar sesi menonton nanti.

#### 5️⃣ Start Session

Klik **Start Session** untuk mulai menonton.

Saat sesi dimulai:

- Sistem mengunci sejumlah USDC sesuai durasi maksimal
- Timer mulai berjalan
- Video dapat diputar
- Biaya dihitung per interval waktu (misalnya setiap 5 menit)

#### 6️⃣ Selama Menonton

Biaya dihitung berdasarkan:

- Lama waktu menonton
- Harga per interval

Jika kamu berhenti sebelum durasi maksimal:

- Sisa dana akan otomatis dikembalikan ke saldo escrow kamu

#### 7️⃣ End Session

Kamu bisa klik **End Session** kapan saja.

Setelah sesi berakhir:

- Biaya aktual akan dihitung
- Platform menerima pembayaran
- Sisa dana dikembalikan
- Video akan otomatis terkunci kembali

#### 8️⃣ Withdraw (Opsional)

Jika masih ada saldo di escrow, kamu bisa klik **Withdraw** untuk mengirim USDC kembali ke wallet kamu.

### 🧠 Ringkasan Sederhana

```
Connect Wallet → Approve USDC → Deposit → Start Session → Tonton Video → End Session → Withdraw
```

## 🔒 Keamanan

- ✅ **Tidak ada biaya tersembunyi**
- ✅ **Tidak ada auto-charge tanpa start session**
- ✅ **Kamu hanya membayar sesuai waktu menonton**
- ✅ **Semua transaksi transparan di blockchain**
- ✅ **Dana aman di escrow hingga sesi berakhir**

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Web3**: wagmi, viem, Sepolia testnet
- **Styling**: Tailwind CSS, Custom CSS
- **Video Hosting**: Pinata IPFS
- **Smart Contracts**: Solidity, Foundry (diasumsikan)

## 📤 Video Upload & Storage

### Saran Tempat Storage Video

Untuk storage video yang decentralized dan tahan lama, kami rekomendasikan:

- **IPFS (InterPlanetary File System)**: Storage terdesentralisasi, immutable, dan cepat. Cocok untuk video streaming.
- **Arweave**: Permanent storage dengan once-pay-forever model. Bagus untuk konten yang perlu disimpan selamanya.
- **Filecoin**: Decentralized storage dengan insentif mining. Kombinasi IPFS + storage incentives.

**Pilihan Utama**: Pinata (IPFS gateway) karena mudah digunakan dan terintegrasi baik dengan Web3 apps.

### Cara Upload Video

1. **Siapkan Akun Pinata**
   - Daftar di [pinata.cloud](https://pinata.cloud)
   - Dapatkan API keys (untuk automation nanti)

2. **Upload Video**
   - Login ke dashboard Pinata
   - Upload file video (.mp4, .webm, dll.)
   - Pin file agar tetap tersimpan
   - Dapatkan **CID** (Content Identifier) dari file yang diupload

3. **Tambah ke Library**
   - Edit `.env.local`
   - Tambah objek baru ke `NEXT_PUBLIC_VIDEO_LIBRARY` array:
     ```json
     {
       "id": 3,
       "title": "Judul Video Baru",
       "description": "Deskripsi video",
       "cid": "bafybeigunakan_cid_dari_pinata"
     }
     ```
   - Restart development server untuk load perubahan

4. **Set Harga Video (Opsional)**
   - Jika menggunakan smart contract dengan video pricing, panggil `setVideoPrice(videoId, pricePerInterval)`
   - Price dalam USDC smallest unit (6 decimals)

### Tips untuk Video Upload

- **Format**: Gunakan MP4 atau WebM untuk kompatibilitas browser
- **Ukuran**: Kompresi video untuk loading cepat (gunakan tools seperti HandBrake)
- **Fallback URLs**: Sistem sudah support multiple IPFS gateways untuk reliability
- **Metadata**: Tambah thumbnail dan metadata di Pinata untuk pengalaman user yang lebih baik

## 📦 Instalasi & Setup

### Prerequisites

- Node.js 18+
- npm atau yarn
- Wallet browser extension (MetaMask, dll.)
- Akses ke Sepolia testnet

### Langkah Instalasi

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

   Copy `.env.example` ke `.env.local` dan isi dengan nilai yang sesuai:

   ```bash
   cp .env.example .env.local
   ```

   **Variabel yang perlu diisi:**
   - `NEXT_PUBLIC_ESCROW_ADDRESS`: Alamat smart contract escrow (dapatkan dari deployment di Sepolia)
   - `NEXT_PUBLIC_USDC_ADDRESS`: Alamat token USDC (biasanya 0x... untuk testnet)
   - `NEXT_PUBLIC_SESSION_MINUTES_MIN`: Durasi minimum sesi dalam menit (default: 0)
   - `NEXT_PUBLIC_SESSION_MINUTES_MAX`: Durasi maksimum sesi dalam menit (default: 180)
   - `NEXT_PUBLIC_SESSION_MINUTES_STEP`: Step increment durasi (default: 1)
   - `NEXT_PUBLIC_DEPOSIT_AMOUNT`: Jumlah deposit dalam unit terkecil USDC (6 decimals, default: 1000000 = 1 USDC)
   - `NEXT_PUBLIC_VIDEO_LIBRARY`: Array JSON video yang tersedia (lihat contoh di `.env.example`)

   **Cara mendapatkan alamat contract:**
   - Deploy smart contract escrow ke Sepolia testnet
   - Gunakan alamat yang dihasilkan untuk `ESCROW_ADDRESS`
   - Untuk USDC, gunakan alamat MockUSDC yang sudah dideploy di testnet

   Contoh isi `.env.local`:

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

5. **Buka browser**

   Kunjungi [http://localhost:3000](http://localhost:3000)

## 🎯 Penggunaan

1. **Connect Wallet**: Klik tombol Connect Wallet di header
2. **Dapatkan USDC**: Gunakan faucet atau minta dari admin
3. **Approve & Deposit**: Ikuti langkah-langkah di UI
4. **Pilih Video**: Pilih video dari dropdown
5. **Set Durasi**: Atur menit sesi menggunakan slider
6. **Start Session**: Klik untuk mulai menonton
7. **Enjoy**: Tonton video dengan biaya real-time
8. **End Session**: Akhiri sesi kapan saja
9. **Withdraw**: Tarik saldo tersisa jika diperlukan

## 🤝 Kontribusi

Kontribusi sangat diterima! Silakan:

1. Fork repository
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 Lisensi

Distributed under the MIT License. See `LICENSE` for more information.

---

**Catatan**: Ini adalah aplikasi testnet. Gunakan dengan hati-hati dan jangan gunakan USDC real.

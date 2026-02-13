# EsprowStream

[Homepage][homepage] • [GitHub][github]

[English (Default)](../README.md) • [Bahasa Indonesia](README_ID.md) • [Deutsch](README_DE.md) • [Español](README_ES.md) • [فارسی](README_FA.md) • [Français](README_FR.md) • [日本語](README_JA.md) • [Português](README_PT.md) • [Русский](README_RU.md) • [中文](README_ZH.md)

[homepage]: http://localhost:3000
[github]: https://github.com/yourusername/esprowstream

EsprowStream は、USDC を用いた安全なエスクロー機構により、有料動画を視聴できる革新的な Web3 動画ストリーミングアプリです。Next.js、wagmi、Sepolia ネットワーク上のスマートコントラクトで構築されています。

- [機能](#features)
- [仕組み](#how-it-works)
- [はじめ方](#getting-started)
- [動画アップロード](#video-upload)
- [セキュリティ](#security)
- [技術スタック](#tech-stack)
- [コントリビュート](#contributing)
- [ライセンス](#license)

<a id="features"></a>

## 機能

- 🎥 **複数動画対応**：複数のシネマティック動画から選択可能
- 💰 **USDC 決済**：USDC（テストトークン）で透明性のある支払い
- 🔐 **エスクロー**：資金はスマートコントラクトに安全に保管され、視聴時間分だけ支払い
- ⏱️ **柔軟な時間設定**：必要に応じてセッション時間を設定
- 🏦 **安全な出金**：エスクロー残高はいつでも出金可能

<a id="how-it-works"></a>

## 仕組み

動画視聴には USDC ベースのエスクロー方式を使用します。

1. **接続**：**Connect Wallet** をクリック（Sepolia ネットワーク）。
2. **USDC 入手**：ファウセットを使うか管理者に依頼。
3. **Approve**：コントラクトが USDC を使用できるよう許可。
4. **Deposit**：エスクロー残高へ入金。
5. **Start Session**：動画と時間を選んで開始。
6. **視聴**：コストは1分ごとに差し引かれます。
7. **終了/出金**：いつでも停止して残高を出金。

<a id="getting-started"></a>

## はじめ方

### 前提条件

- Node.js 18+
- npm または yarn
- ブラウザウォレット（MetaMask）
- Sepolia テストネットへのアクセス

### インストール

1. **リポジトリをクローン**

   ```bash
   git clone <repository-url>
   cd esprowstream
   ```

2. **依存関係をインストール**

   ```bash
   npm install
   ```

3. **環境設定**

   `.env.example` を `.env.local` にコピー：

   ```bash
   cp .env.example .env.local
   ```

   `.env.local` に (`NEXT_PUBLIC_ESCROW_ADDRESS`, `NEXT_PUBLIC_USDC_ADDRESS` など) を設定します。

4. **起動**

   ```bash
   npm run dev
   ```

[http://localhost:3000](http://localhost:3000) を開きます。

<a id="video-upload"></a>

## 動画アップロード

分散型ストレージとして **IPFS（Pinata）** を推奨します。

1. **アップロード**：動画を [Pinata](https://pinata.cloud) にアップロードして CID を取得。
2. **設定**：`.env.local` の `NEXT_PUBLIC_VIDEO_LIBRARY` に追加：
   ```json
   {
     "id": 3,
     "title": "New Video",
     "description": "Description",
     "cid": "your_ipfs_cid"
   }
   ```
3. **再起動**：開発サーバーを再起動。

<a id="security"></a>

## セキュリティ

- ✅ **隠れた手数料なし**
- ✅ **セッション開始なしで自動課金なし**
- ✅ **実際の視聴時間分のみ支払い**
- ✅ **オンチェーンで透明な取引**
- ✅ **資金はエスクローで安全に保管**

<a id="tech-stack"></a>

## 技術スタック

- **Frontend**：Next.js 15, React 18, TypeScript
- **Web3**：wagmi, viem, Sepolia testnet
- **Styling**：Tailwind CSS
- **Storage**：Pinata IPFS

<a id="contributing"></a>

## コントリビュート

1. リポジトリを Fork
2. 機能ブランチを作成
3. 変更をコミット
4. ブランチを Push
5. Pull Request を作成

<a id="license"></a>

## ライセンス

MIT ライセンスで配布されています。詳細は `LICENSE` を参照してください。

---

**注意**：これはテストネット用アプリです。注意して使用し、実際の USDC は使用しないでください。

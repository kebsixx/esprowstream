# EsprowStream

[Homepage][homepage] • [GitHub][github]

[English (Default)](../README.md) • [Bahasa Indonesia](README_ID.md) • [Deutsch](README_DE.md) • [Español](README_ES.md) • [فارسی](README_FA.md) • [Français](README_FR.md) • [日本語](README_JA.md) • [Português](README_PT.md) • [Русский](README_RU.md) • [中文](README_ZH.md)

[homepage]: http://localhost:3000
[github]: https://github.com/yourusername/esprowstream

EsprowStream 是一款创新的 Web3 视频流媒体应用，支持用户通过安全的 USDC 托管（Escrow）机制观看付费视频。基于 Next.js、wagmi，并结合 Sepolia 网络上的智能合约构建。

- [功能](#features)
- [工作原理](#how-it-works)
- [快速开始](#getting-started)
- [视频上传](#video-upload)
- [安全](#security)
- [技术栈](#tech-stack)
- [贡献](#contributing)
- [许可证](#license)

<a id="features"></a>

## 功能

- 🎥 **多视频支持**：可从多部电影级视频中选择
- 💰 **USDC 支付**：使用 USDC（测试代币）进行透明支付
- 🔐 **托管（Escrow）机制**：资金安全存放在智能合约中，只按实际观看时间计费
- ⏱️ **灵活时长**：按需设置观看会话时长
- 🏦 **安全提现**：可随时提取托管余额

<a id="how-it-works"></a>

## 工作原理

观看视频时，系统使用基于 USDC 的托管（Escrow）机制。

1. **连接**：点击 **Connect Wallet**（Sepolia 网络）。
2. **获取 USDC**：通过水龙头（faucet）或向管理员索取。
3. **Approve**：授权合约使用你的 USDC。
4. **Deposit**：充值到你的托管余额。
5. **Start Session**：选择视频/时长并开始观看。
6. **观看**：费用按分钟扣除。
7. **结束/提现**：随时停止并提取剩余余额。

<a id="getting-started"></a>

## 快速开始

### 前置条件

- Node.js 18+
- npm 或 yarn
- 浏览器钱包（MetaMask）
- 可访问 Sepolia 测试网

### 安装

1. **克隆仓库**

   ```bash
   git clone <repository-url>
   cd esprowstream
   ```

2. **安装依赖**

   ```bash
   npm install
   ```

3. **配置环境**

   将 `.env.example` 复制为 `.env.local`：

   ```bash
   cp .env.example .env.local
   ```

   在 `.env.local` 中配置变量（`NEXT_PUBLIC_ESCROW_ADDRESS`、`NEXT_PUBLIC_USDC_ADDRESS` 等）。

4. **运行**

   ```bash
   npm run dev
   ```

访问 [http://localhost:3000](http://localhost:3000)。

<a id="video-upload"></a>

## 视频上传

我们推荐使用 **IPFS（Pinata）** 作为去中心化存储。

1. **上传**：将视频上传到 [Pinata](https://pinata.cloud) 并获取 CID。
2. **配置**：在 `.env.local` 的 `NEXT_PUBLIC_VIDEO_LIBRARY` 中添加视频信息：
   ```json
   {
     "id": 3,
     "title": "New Video",
     "description": "Description",
     "cid": "your_ipfs_cid"
   }
   ```
3. **重启**：重启开发服务器。

<a id="security"></a>

## 安全

- ✅ **无隐藏费用**
- ✅ **未开启会话不会自动扣费**
- ✅ **仅按实际观看时间付费**
- ✅ **链上交易透明可查**
- ✅ **资金安全存放在托管中**

<a id="tech-stack"></a>

## 技术栈

- **Frontend**：Next.js 15, React 18, TypeScript
- **Web3**：wagmi, viem, Sepolia testnet
- **Styling**：Tailwind CSS
- **Storage**：Pinata IPFS

<a id="contributing"></a>

## 贡献

1. Fork 本仓库
2. 新建功能分支
3. 提交更改
4. 推送分支
5. 提交 Pull Request

<a id="license"></a>

## 许可证

本项目采用 MIT 许可证发布。详见 `LICENSE`。

---

**提示**：这是一个测试网应用。请谨慎使用，不要使用真实 USDC。

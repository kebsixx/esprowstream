# 🎬 EsprowStream - 使用 USDC Escrow 的去中心化视频流媒体

<p align="center">
  <img src="public/logo.png" alt="EsprowStream Logo" width="200"/>
</p>

EsprowStream 是一个创新的 Web3 视频流媒体应用程序，允许用户使用 USDC 通过安全的 escrow 机制观看付费视频。使用 Next.js、wagmi 和 Sepolia 网络上的智能合约构建。

## 🌍 Language / Bahasa

[English (Default)](../README.md) • [Bahasa Indonesia](README_ID.md) • [Español](README_ES.md) • [فارسی](README_FA.md) • [中文](README_ZH.md)

## 目录

- [主要功能](#主要功能)
- [工作原理](#工作原理)
- [安全](#安全)
- [技术栈](#技术栈)
- [视频上传和存储](#视频上传和存储)
- [安装和设置](#安装和设置)
- [使用](#使用)
- [贡献](#贡献)
- [许可证](#许可证)

## ✨ 主要功能

- 🎥 **多视频支持**：从各种可用的电影视频中选择
- 💰 **USDC 支付**：使用 USDC（测试代币）进行透明支付
- 🔐 **Escrow 系统**：资金安全存储在智能合约中，仅按观看时间付费
- ⏱️ **灵活时长**：根据需要设置会话时长
- 🏦 **安全提现**：随时提取 escrow 余额
- 📱 **响应式 UI**：具有 glassmorphism 设计的现代界面
- 🔄 **实时更新**：实时监控余额和会话状态

## 🚀 工作原理

### 🎬 如何观看付费视频（使用 USDC）

要观看视频，系统使用基于 USDC 的 escrow 机制。请按照以下步骤操作：

#### 1️⃣ 连接钱包

点击 **Connect Wallet** 并确保您在 **Sepolia** 网络上。

钱包将用于：

- 存储 USDC
- 执行批准
- 支付观看会话

#### 2️⃣ 获取 USDC（如果还没有）

由于这使用 MockUSDC（测试代币），您需要先有 USDC 余额。

- 如果有 **Mint / Faucet** 按钮可用，点击获取 USDC
- 如果没有，向管理员请求转账

#### 3️⃣ 批准 USDC

在使用之前，您必须给予智能合约权限。

点击 **Approve USDC** 按钮。

**什么是批准？**
批准是允许合约从您的钱包中获取一定数量的 USDC 用于存款的权限。

没有批准，后续交易将失败。

#### 4️⃣ 存入 Escrow

批准成功后，点击 **Deposit**。

存款将：

- 将 USDC 从钱包移动到合约
- 将其存储为您的 escrow 中的内部余额

此余额不会直接支付，而是存储用于稍后支付观看会话。

#### 5️⃣ 开始会话

点击 **Start Session** 开始观看。

会话开始时：

- 系统根据最大时长锁定一定数量的 USDC
- 计时器开始运行
- 可以播放视频
- 按时间间隔计算成本（例如每 5 分钟）

#### 6️⃣ 观看期间

成本基于以下计算：

- 观看时间
- 间隔价格

如果您在最大时长之前停止：

- 剩余资金将自动退回到您的 escrow 余额

#### 7️⃣ 结束会话

您可以随时点击 **End Session**。

会话结束后：

- 计算实际成本
- 平台接收付款
- 剩余资金退回
- 视频自动锁定

#### 8️⃣ 提现（可选）

如果 escrow 中仍有余额，您可以点击 **Withdraw** 将 USDC 发送回您的钱包。

### 🧠 简单总结

```
连接钱包 → 批准 USDC → 存款 → 开始会话 → 观看视频 → 结束会话 → 提现
```

## 🔒 安全

- ✅ **无隐藏费用**
- ✅ **无开始会话自动收费**
- ✅ **您仅按实际观看时间付费**
- ✅ **所有交易在区块链上透明**
- ✅ **资金在 escrow 中安全直到会话结束**

## 🛠️ 技术栈

- **前端**：Next.js 15, React 18, TypeScript
- **Web3**：wagmi, viem, Sepolia testnet
- **样式**：Tailwind CSS, Custom CSS
- **视频托管**：Pinata IPFS
- **智能合约**：Solidity, Foundry（假设）

## 📤 视频上传和存储

### 推荐视频存储地点

对于去中心化且持久的视频存储，我们推荐：

- **IPFS（星际文件系统）**：去中心化存储，不可变且快速。适合视频流媒体。
- **Arweave**：永久存储，具有一次性付费永久模型。适合需要永久存储的内容。
- **Filecoin**：去中心化存储，具有挖矿激励。IPFS + 存储激励的组合。

**主要选择**：Pinata（IPFS 网关），因为易于使用且与 Web3 应用良好集成。

### 如何上传视频

1. **准备 Pinata 账户**
   - 在 [pinata.cloud](https://pinata.cloud) 注册
   - 获取 API 密钥（用于未来自动化）

2. **上传视频**
   - 登录 Pinata 仪表板
   - 上传视频文件（.mp4、.webm 等）
   - 固定文件以保持存储
   - 从上传的文件获取 **CID**（内容标识符）

3. **添加到库**
   - 编辑 `.env.local`
   - 向 `NEXT_PUBLIC_VIDEO_LIBRARY` 数组添加新对象：
     ```json
     {
       "id": 3,
       "title": "新视频标题",
       "description": "视频描述",
       "cid": "bafybeipinatas_cid"
     }
     ```
   - 重新启动开发服务器以加载更改

4. **设置视频价格（可选）**
   - 如果使用具有视频定价的智能合约，调用 `setVideoPrice(videoId, pricePerInterval)`
   - 价格以 USDC 最小单位（6 位小数）

### 视频上传提示

- **格式**：使用 MP4 或 WebM 以实现浏览器兼容性
- **大小**：压缩视频以实现快速加载（使用 HandBrake 等工具）
- **备用 URL**：系统已支持多个 IPFS 网关以实现可靠性
- **元数据**：在 Pinata 中添加缩略图和元数据以获得更好的用户体验

## 📦 安装和设置

### 先决条件

- Node.js 18+
- npm 或 yarn
- 钱包浏览器扩展（MetaMask 等）
- 访问 Sepolia testnet

### 安装步骤

1. **克隆仓库**

   ```bash
   git clone <repository-url>
   cd esprowstream
   ```

2. **安装依赖**

   ```bash
   npm install
   ```

3. **设置环境变量**

   将 `.env.example` 复制到 `.env.local` 并填写适当的值：

   ```bash
   cp .env.example .env.local
   ```

   **需要填写的变量：**
   - `NEXT_PUBLIC_ESCROW_ADDRESS`：Escrow 智能合约地址（从 Sepolia 部署获取）
   - `NEXT_PUBLIC_USDC_ADDRESS`：USDC 代币地址（testnet 通常为 0x...）
   - `NEXT_PUBLIC_SESSION_MINUTES_MIN`：会话最小时长（分钟，默认：0）
   - `NEXT_PUBLIC_SESSION_MINUTES_MAX`：会话最大时长（分钟，默认：180）
   - `NEXT_PUBLIC_SESSION_MINUTES_STEP`：时长增量步长（默认：1）
   - `NEXT_PUBLIC_DEPOSIT_AMOUNT`：存款金额（USDC 最小单位，6 位小数，默认：1000000 = 1 USDC）
   - `NEXT_PUBLIC_VIDEO_LIBRARY`：可用视频的 JSON 数组（参见 `.env.example` 中的示例）

   **如何获取合约地址：**
   - 在 Sepolia testnet 上部署 escrow 智能合约
   - 使用生成的地址作为 `ESCROW_ADDRESS`
   - 对于 USDC，使用 testnet 上已部署的 MockUSDC 地址

   `.env.local` 内容示例：

   ```env
   NEXT_PUBLIC_ESCROW_ADDRESS=0xYOUR_ESCROW_CONTRACT_ADDRESS
   NEXT_PUBLIC_USDC_ADDRESS=0xYOUR_USDC_CONTRACT_ADDRESS
   NEXT_PUBLIC_SESSION_MINUTES_MIN=0
   NEXT_PUBLIC_SESSION_MINUTES_MAX=180
   NEXT_PUBLIC_SESSION_MINUTES_STEP=1
   NEXT_PUBLIC_DEPOSIT_AMOUNT=1000000
   NEXT_PUBLIC_VIDEO_LIBRARY=[{"id":1,"title":"视频标题","description":"描述","cid":"bafy..."}]
   ```

4. **运行开发服务器**

   ```bash
   npm run dev
   ```

5. **打开浏览器**

   访问 [http://localhost:3000](http://localhost:3000)

## 🎯 使用

1. **连接钱包**：点击标题中的 Connect Wallet 按钮
2. **获取 USDC**：使用 faucet 或向管理员请求
3. **批准和存款**：按照 UI 步骤操作
4. **选择视频**：从下拉菜单中选择视频
5. **设置时长**：使用滑块调整会话分钟数
6. **开始会话**：点击开始观看
7. **享受**：观看带有实时成本跟踪的视频
8. **结束会话**：随时结束会话
9. **提现**：如有必要提取剩余余额

## 🤝 贡献

欢迎贡献！请：

1. Fork 仓库
2. 创建功能分支（`git checkout -b feature/AmazingFeature`）
3. 提交更改（`git commit -m 'Add some AmazingFeature'`）
4. 推送到分支（`git push origin feature/AmazingFeature`）
5. 创建 Pull Request

## 📄 许可证

根据 MIT 许可证分发。有关更多信息，请参见 `LICENSE`。

---

**注意**：这是一个 testnet 应用程序。请谨慎使用，不要使用真实的 USDC。

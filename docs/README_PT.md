# EsprowStream

[Homepage][homepage] • [GitHub][github]

[English (Default)](../README.md) • [Bahasa Indonesia](README_ID.md) • [Deutsch](README_DE.md) • [Español](README_ES.md) • [فارسی](README_FA.md) • [Français](README_FR.md) • [日本語](README_JA.md) • [Português](README_PT.md) • [Русский](README_RU.md) • [中文](README_ZH.md)

[homepage]: http://localhost:3000
[github]: https://github.com/yourusername/esprowstream

EsprowStream é uma aplicação inovadora de streaming de vídeo Web3 que permite aos usuários assistir a vídeos pagos usando USDC com um mecanismo de escrow seguro. Construída com Next.js, wagmi e smart contracts na rede Sepolia.

- [Recursos](#features)
- [Como funciona](#how-it-works)
- [Primeiros passos](#getting-started)
- [Upload de vídeo](#video-upload)
- [Segurança](#security)
- [Tech Stack](#tech-stack)
- [Contribuir](#contributing)
- [Licença](#license)

<a id="features"></a>

## Recursos

- 🎥 **Suporte a múltiplos vídeos**: escolha entre vários vídeos cinematográficos disponíveis
- 💰 **Pagamentos em USDC**: use USDC (token de teste) para pagamentos transparentes
- 🔐 **Sistema de escrow**: fundos ficam seguros em smart contracts; você paga apenas pelo tempo assistido
- ⏱️ **Duração flexível**: defina a duração da sessão conforme sua necessidade
- 🏦 **Saque seguro**: saque o saldo do escrow a qualquer momento

<a id="how-it-works"></a>

## Como funciona

Para assistir aos vídeos, o sistema usa um mecanismo de escrow baseado em USDC.

1. **Conectar**: clique em **Connect Wallet** (rede Sepolia).
2. **Obter USDC**: use um faucet ou solicite ao admin.
3. **Approve**: autorize o contrato a usar seu USDC.
4. **Deposit**: deposite para formar seu saldo em escrow.
5. **Start Session**: selecione vídeo/duração e inicie.
6. **Assistir**: o custo é descontado por minuto.
7. **Encerrar/Sacar**: pare quando quiser e saque o saldo restante.

<a id="getting-started"></a>

## Primeiros passos

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- Carteira no navegador (MetaMask)
- Acesso ao testnet Sepolia

### Instalação

1. **Clonar o repositório**

   ```bash
   git clone <repository-url>
   cd esprowstream
   ```

2. **Instalar dependências**

   ```bash
   npm install
   ```

3. **Configurar ambiente**

   Copie `.env.example` para `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

   Configure suas variáveis (`NEXT_PUBLIC_ESCROW_ADDRESS`, `NEXT_PUBLIC_USDC_ADDRESS`, etc.) no `.env.local`.

4. **Executar**

   ```bash
   npm run dev
   ```

Visite [http://localhost:3000](http://localhost:3000).

<a id="video-upload"></a>

## Upload de vídeo

Recomendamos **IPFS (Pinata)** para armazenamento descentralizado.

1. **Upload**: envie o vídeo para a [Pinata](https://pinata.cloud) e obtenha o CID.
2. **Config**: adicione os detalhes do vídeo em `NEXT_PUBLIC_VIDEO_LIBRARY` no `.env.local`:
   ```json
   {
     "id": 3,
     "title": "New Video",
     "description": "Description",
     "cid": "your_ipfs_cid"
   }
   ```
3. **Reiniciar**: reinicie o servidor de desenvolvimento.

<a id="security"></a>

## Segurança

- ✅ **Sem taxas ocultas**
- ✅ **Sem cobrança automática sem iniciar uma sessão**
- ✅ **Pague apenas pelo tempo realmente assistido**
- ✅ **Transações transparentes na blockchain**
- ✅ **Fundos seguros em escrow**

<a id="tech-stack"></a>

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Web3**: wagmi, viem, Sepolia testnet
- **Styling**: Tailwind CSS
- **Storage**: Pinata IPFS

<a id="contributing"></a>

## Contribuir

1. Faça um fork do repositório
2. Crie uma branch de feature
3. Faça commit das alterações
4. Faça push para a branch
5. Abra um Pull Request

<a id="license"></a>

## Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

---

**Nota**: esta é uma aplicação em testnet. Use com cautela e não use USDC real.

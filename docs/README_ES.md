# EsprowStream

[Homepage][homepage] • [GitHub][github]

[English (Default)](../README.md) • [Bahasa Indonesia](README_ID.md) • [Deutsch](README_DE.md) • [Español](README_ES.md) • [فارسی](README_FA.md) • [Français](README_FR.md) • [日本語](README_JA.md) • [Português](README_PT.md) • [Русский](README_RU.md) • [中文](README_ZH.md)

[homepage]: http://localhost:3000
[github]: https://github.com/yourusername/esprowstream

EsprowStream es una aplicación innovadora de streaming de vídeo Web3 que permite a los usuarios ver vídeos de pago usando USDC mediante un mecanismo de escrow seguro. Construida con Next.js, wagmi y smart contracts en la red Sepolia.

- [Características](#features)
- [Cómo funciona](#how-it-works)
- [Primeros pasos](#getting-started)
- [Subida de vídeo](#video-upload)
- [Seguridad](#security)
- [Tech Stack](#tech-stack)
- [Contribuir](#contributing)
- [Licencia](#license)

<a id="features"></a>

## Características

- 🎥 **Soporte multi-vídeo**: elige entre varios vídeos cinematográficos disponibles
- 💰 **Pagos con USDC**: usa USDC (token de prueba) para pagos transparentes
- 🔐 **Sistema de escrow**: los fondos se guardan en smart contracts; pagas solo por el tiempo de visualización
- ⏱️ **Duración flexible**: define la duración de la sesión según tus necesidades
- 🏦 **Retiro seguro**: retira tu saldo de escrow cuando quieras

<a id="how-it-works"></a>

## Cómo funciona

Para ver vídeos, el sistema usa un mecanismo de escrow basado en USDC.

1. **Conectar**: haz clic en **Connect Wallet** (red Sepolia).
2. **Conseguir USDC**: usa un faucet o solicita al admin.
3. **Approve**: autoriza al contrato a usar tu USDC.
4. **Deposit**: añade fondos a tu saldo escrow.
5. **Start Session**: selecciona vídeo/duración y empieza.
6. **Ver**: el coste se descuenta por minuto.
7. **Terminar/Retirar**: detente cuando quieras y retira el saldo restante.

<a id="getting-started"></a>

## Primeros pasos

### Requisitos

- Node.js 18+
- npm o yarn
- Wallet en el navegador (MetaMask)
- Acceso al testnet de Sepolia

### Instalación

1. **Clonar el repositorio**

   ```bash
   git clone <repository-url>
   cd esprowstream
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Configurar el entorno**

   Copia `.env.example` a `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

   Configura tus variables (`NEXT_PUBLIC_ESCROW_ADDRESS`, `NEXT_PUBLIC_USDC_ADDRESS`, etc.) en `.env.local`.

4. **Ejecutar**

   ```bash
   npm run dev
   ```

Visita [http://localhost:3000](http://localhost:3000).

<a id="video-upload"></a>

## Subida de vídeo

Recomendamos **IPFS (Pinata)** para almacenamiento descentralizado.

1. **Subir**: sube el vídeo a [Pinata](https://pinata.cloud) y obtén el CID.
2. **Config**: añade los detalles del vídeo a `NEXT_PUBLIC_VIDEO_LIBRARY` en `.env.local`:
   ```json
   {
     "id": 3,
     "title": "New Video",
     "description": "Description",
     "cid": "your_ipfs_cid"
   }
   ```
3. **Reiniciar**: reinicia el servidor de desarrollo.

<a id="security"></a>

## Seguridad

- ✅ **Sin comisiones ocultas**
- ✅ **Sin cargos automáticos sin iniciar sesión**
- ✅ **Paga solo por el tiempo real de visualización**
- ✅ **Transacciones transparentes en blockchain**
- ✅ **Fondos seguros en escrow**

<a id="tech-stack"></a>

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Web3**: wagmi, viem, Sepolia testnet
- **Styling**: Tailwind CSS
- **Storage**: Pinata IPFS

<a id="contributing"></a>

## Contribuir

1. Haz un fork del repositorio
2. Crea una rama feature
3. Haz commit de los cambios
4. Haz push de la rama
5. Abre un Pull Request

<a id="license"></a>

## Licencia

Distribuido bajo la licencia MIT. Consulta `LICENSE` para más información.

---

**Nota**: esta es una aplicación de testnet. Úsala con cuidado y no uses USDC real.

# 🎬 EsprowStream - Streaming de Video Descentralizado con Escrow USDC

<p align="center">
  <img src="public/logo.png" alt="EsprowStream Logo" width="200"/>
</p>

EsprowStream es una aplicación innovadora de streaming de video Web3 que permite a los usuarios ver videos pagados usando USDC con un mecanismo de escrow seguro. Construida con Next.js, wagmi y contratos inteligentes en la red Sepolia.

## 🌍 Language / Bahasa

[English (Default)](../README.md) • [Bahasa Indonesia](README_ID.md) • [Español](README_ES.md) • [فارسی](README_FA.md) • [中文](README_ZH.md)

## Tabla de Contenidos

- [Características Principales](#características-principales)
- [Cómo Funciona](#cómo-funciona)
- [Seguridad](#seguridad)
- [Stack Tecnológico](#stack-tecnológico)
- [Subida y Almacenamiento de Videos](#subida-y-almacenamiento-de-videos)
- [Instalación y Configuración](#instalación-y-configuración)
- [Uso](#uso)
- [Contribución](#contribución)
- [Licencia](#licencia)

## ✨ Características Principales

- 🎥 **Soporte Multi-Video**: Elige entre varios videos cinematográficos disponibles
- 💰 **Pagos USDC**: Usa USDC (token de prueba) para pagos transparentes
- 🔐 **Sistema de Escrow**: Los fondos se almacenan de forma segura en contratos inteligentes, paga solo por tiempo de visualización
- ⏱️ **Duración Flexible**: Establece la duración de la sesión según tus necesidades
- 🏦 **Retiro Seguro**: Retira el saldo de escrow en cualquier momento
- 📱 **UI Responsiva**: Interfaz moderna con diseño glassmorphism
- 🔄 **Actualizaciones en Tiempo Real**: Monitorea saldo y estado de sesión en tiempo real

## 🚀 Cómo Funciona

### 🎬 Cómo Ver Videos Pagados (Usando USDC)

Para ver videos, el sistema utiliza un mecanismo de escrow basado en USDC. Sigue estos pasos:

#### 1️⃣ Conectar Wallet

Haz clic en **Connect Wallet** y asegúrate de estar en la red **Sepolia**.

La wallet se utilizará para:

- Almacenar USDC
- Realizar aprobaciones
- Pagar sesiones de visualización

#### 2️⃣ Obtener USDC (Si No Tienes)

Dado que esto usa MockUSDC (token de prueba), necesitas tener saldo USDC primero.

- Si hay un botón **Mint / Faucet** disponible, haz clic para obtener USDC
- Si no, solicita una transferencia del administrador

#### 3️⃣ Aprobar USDC

Antes de poder usarse, debes dar permiso al contrato inteligente.

Haz clic en el botón **Approve USDC**.

**¿Qué es approve?**
Approve es permiso para que el contrato tome una cantidad determinada de USDC de tu wallet para depósito.

Sin aprobación, las transacciones posteriores fallarán.

#### 4️⃣ Depositar en Escrow

Después de que la aprobación sea exitosa, haz clic en **Deposit**.

El depósito:

- Mueve USDC de la wallet al contrato
- Lo almacena como tu saldo interno en escrow

Este saldo no se paga directamente, pero se guarda para pagar sesiones de visualización más tarde.

#### 5️⃣ Iniciar Sesión

Haz clic en **Start Session** para comenzar a ver.

Cuando la sesión comienza:

- El sistema bloquea una cantidad de USDC según la duración máxima
- El temporizador comienza a correr
- El video se puede reproducir
- El costo se calcula por intervalo de tiempo (por ejemplo, cada 5 minutos)

#### 6️⃣ Durante la Visualización

El costo se calcula basado en:

- Tiempo de visualización
- Precio por intervalo

Si te detienes antes de la duración máxima:

- Los fondos restantes se devolverán automáticamente a tu saldo de escrow

#### 7️⃣ Finalizar Sesión

Puedes hacer clic en **End Session** en cualquier momento.

Después de que la sesión termine:

- Se calcula el costo real
- La plataforma recibe el pago
- Los fondos restantes se devuelven
- El video se bloquea automáticamente de nuevo

#### 8️⃣ Retirar (Opcional)

Si aún hay saldo en escrow, puedes hacer clic en **Withdraw** para enviar USDC de vuelta a tu wallet.

### 🧠 Resumen Simple

```
Conectar Wallet → Aprobar USDC → Depositar → Iniciar Sesión → Ver Video → Finalizar Sesión → Retirar
```

## 🔒 Seguridad

- ✅ **Sin costos ocultos**
- ✅ **Sin cargo automático sin iniciar sesión**
- ✅ **Pagas solo por tiempo de visualización real**
- ✅ **Todas las transacciones son transparentes en blockchain**
- ✅ **Los fondos están seguros en escrow hasta que termine la sesión**

## 🛠️ Stack Tecnológico

- **Frontend**: Next.js 15, React 18, TypeScript
- **Web3**: wagmi, viem, Sepolia testnet
- **Styling**: Tailwind CSS, Custom CSS
- **Video Hosting**: Pinata IPFS
- **Smart Contracts**: Solidity, Foundry (asumido)

## 📤 Subida y Almacenamiento de Videos

### Lugares Recomendados para Almacenamiento de Videos

Para almacenamiento de video descentralizado y duradero, recomendamos:

- **IPFS (InterPlanetary File System)**: Almacenamiento descentralizado, inmutable y rápido. Adecuado para streaming de video.
- **Arweave**: Almacenamiento permanente con modelo de pago único. Bueno para contenido que debe almacenarse para siempre.
- **Filecoin**: Almacenamiento descentralizado con incentivos de minería. Combinación de IPFS + incentivos de almacenamiento.

**Elección Principal**: Pinata (puerta de enlace IPFS) porque es fácil de usar y bien integrado con aplicaciones Web3.

### Cómo Subir Videos

1. **Preparar Cuenta Pinata**
   - Regístrate en [pinata.cloud](https://pinata.cloud)
   - Obtén claves API (para automatización futura)

2. **Subir Video**
   - Inicia sesión en el dashboard de Pinata
   - Sube archivo de video (.mp4, .webm, etc.)
   - Fija el archivo para mantenerlo almacenado
   - Obtén el **CID** (Identificador de Contenido) del archivo subido

3. **Agregar a la Biblioteca**
   - Edita `.env.local`
   - Agrega nuevo objeto al array `NEXT_PUBLIC_VIDEO_LIBRARY`:
     ```json
     {
       "id": 3,
       "title": "Nuevo Título de Video",
       "description": "Descripción del video",
       "cid": "bafybeituc_cid_de_pinata"
     }
     ```
   - Reinicia el servidor de desarrollo para cargar cambios

4. **Establecer Precio de Video (Opcional)**
   - Si usas contrato inteligente con precios de video, llama a `setVideoPrice(videoId, pricePerInterval)`
   - Precio en unidades más pequeñas de USDC (6 decimales)

### Consejos para Subida de Videos

- **Formato**: Usa MP4 o WebM para compatibilidad con navegador
- **Tamaño**: Comprime videos para carga rápida (usa herramientas como HandBrake)
- **URLs de Respaldo**: El sistema ya soporta múltiples puertas de enlace IPFS para confiabilidad
- **Metadatos**: Agrega miniaturas y metadatos en Pinata para mejor experiencia de usuario

## 📦 Instalación y Configuración

### Prerrequisitos

- Node.js 18+
- npm o yarn
- Extensión de navegador wallet (MetaMask, etc.)
- Acceso a testnet Sepolia

### Pasos de Instalación

1. **Clonar repositorio**

   ```bash
   git clone <repository-url>
   cd esprowstream
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Configurar variables de entorno**

   Copia `.env.example` a `.env.local` y rellena con valores apropiados:

   ```bash
   cp .env.example .env.local
   ```

   **Variables a rellenar:**
   - `NEXT_PUBLIC_ESCROW_ADDRESS`: Dirección del contrato inteligente escrow (obtén de despliegue en Sepolia)
   - `NEXT_PUBLIC_USDC_ADDRESS`: Dirección del token USDC (generalmente 0x... para testnet)
   - `NEXT_PUBLIC_SESSION_MINUTES_MIN`: Duración mínima de sesión en minutos (default: 0)
   - `NEXT_PUBLIC_SESSION_MINUTES_MAX`: Duración máxima de sesión en minutos (default: 180)
   - `NEXT_PUBLIC_SESSION_MINUTES_STEP`: Paso de incremento de duración (default: 1)
   - `NEXT_PUBLIC_DEPOSIT_AMOUNT`: Cantidad de depósito en unidades más pequeñas de USDC (6 decimales, default: 1000000 = 1 USDC)
   - `NEXT_PUBLIC_VIDEO_LIBRARY`: Array JSON de videos disponibles (ve ejemplo en `.env.example`)

   **Cómo obtener direcciones de contrato:**
   - Despliega contrato inteligente escrow en testnet Sepolia
   - Usa la dirección generada para `ESCROW_ADDRESS`
   - Para USDC, usa la dirección de MockUSDC ya desplegado en testnet

   Ejemplo de contenido `.env.local`:

   ```env
   NEXT_PUBLIC_ESCROW_ADDRESS=0xTU_DIRECCION_CONTRATO_ESCROW
   NEXT_PUBLIC_USDC_ADDRESS=0xTU_DIRECCION_CONTRATO_USDC
   NEXT_PUBLIC_SESSION_MINUTES_MIN=0
   NEXT_PUBLIC_SESSION_MINUTES_MAX=180
   NEXT_PUBLIC_SESSION_MINUTES_STEP=1
   NEXT_PUBLIC_DEPOSIT_AMOUNT=1000000
   NEXT_PUBLIC_VIDEO_LIBRARY=[{"id":1,"title":"Título Video","description":"Descripción","cid":"bafy..."}]
   ```

4. **Ejecutar servidor de desarrollo**

   ```bash
   npm run dev
   ```

5. **Abrir navegador**

   Visita [http://localhost:3000](http://localhost:3000)

## 🎯 Uso

1. **Conectar Wallet**: Haz clic en el botón Connect Wallet en el header
2. **Obtener USDC**: Usa faucet o solicita del administrador
3. **Aprobar & Depositar**: Sigue los pasos en la UI
4. **Elegir Video**: Selecciona video del dropdown
5. **Establecer Duración**: Ajusta minutos de sesión usando slider
6. **Iniciar Sesión**: Haz clic para comenzar a ver
7. **Disfrutar**: Ve video con seguimiento de costo en tiempo real
8. **Finalizar Sesión**: Termina sesión en cualquier momento
9. **Retirar**: Retira saldo restante si es necesario

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Por favor:

1. Fork el repositorio
2. Crea una rama de función (`git checkout -b feature/AmazingFeature`)
3. Confirma cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Crea un Pull Request

## 📄 Licencia

Distribuido bajo la Licencia MIT. Ver `LICENSE` para más información.

---

**Nota**: Esta es una aplicación de testnet. Úsala con precaución y no uses USDC real.

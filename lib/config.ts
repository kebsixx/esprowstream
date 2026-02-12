import { sepolia } from "viem/chains";
import { createConfig, http } from "wagmi";

export const config = createConfig({
  chains: [sepolia],
  // No explicit connectors — wagmi v3 auto-discovers wallet
  // extensions via EIP-6963 (multiInjectedProviderDiscovery: true by default)
  transports: {
    [sepolia.id]: http(),
  },
});

import { useAccount, useReadContract } from "wagmi";
import {
  ESCROW_ABI,
  ESCROW_ADDRESS,
  USDC_ABI,
  USDC_ADDRESS,
} from "../lib/contracts";

// 1 USDC = 1_000_000 (6 decimals)
export const DEPOSIT_AMOUNT = BigInt(process.env.NEXT_PUBLIC_DEPOSIT_AMOUNT!);

// Poll interval for realtime updates (in ms)
const POLL_INTERVAL = 4_000;

/**
 * Format raw USDC amount (6 decimals) to human-readable string.
 * Example: 1_000_000n → "1.0"
 */
export function formatUSDC(raw: bigint): string {
  const whole = raw / BigInt(1_000_000);
  const fraction = raw % BigInt(1_000_000);
  const fractionStr = fraction.toString().padStart(6, "0").replace(/0+$/, "");
  return fractionStr ? `${whole}.${fractionStr}` : `${whole}.0`;
}

// ── Session data types ──────────────────────────────────────────────

export interface SessionData {
  videoId: bigint;
  startTime: bigint;
  pricePerInterval: bigint;
  lockedAmount: bigint;
  active: boolean;
}

/**
 * Parse the tuple returned by `sessions(address)` into a typed object.
 */
export function parseSessionData(data: unknown): SessionData | null {
  if (!data || !Array.isArray(data)) return null;
  return {
    videoId: data[0] as bigint,
    startTime: data[1] as bigint,
    pricePerInterval: data[2] as bigint,
    lockedAmount: data[3] as bigint,
    active: data[4] as boolean,
  };
}

// ── Read hooks ──────────────────────────────────────────────────────

/** Read USDC allowance for the connected user → ESCROW_ADDRESS */
export function useAllowance() {
  const { address } = useAccount();
  return useReadContract({
    address: USDC_ADDRESS as `0x${string}`,
    abi: USDC_ABI,
    functionName: "allowance",
    args: [address!, ESCROW_ADDRESS as `0x${string}`],
    query: {
      enabled: !!address,
      refetchInterval: POLL_INTERVAL,
    },
  });
}

/** Read the user's internal escrow balance */
export function useEscrowBalance() {
  const { address } = useAccount();
  return useReadContract({
    address: ESCROW_ADDRESS as `0x${string}`,
    abi: ESCROW_ABI,
    functionName: "balances",
    args: [address!],
    query: {
      enabled: !!address,
      refetchInterval: POLL_INTERVAL,
    },
  });
}

/** Read the user's active session from the escrow contract */
export function useSession() {
  const { address } = useAccount();
  return useReadContract({
    address: ESCROW_ADDRESS as `0x${string}`,
    abi: ESCROW_ABI,
    functionName: "sessions",
    args: [address!],
    query: {
      enabled: !!address,
      refetchInterval: POLL_INTERVAL,
    },
  });
}

/** Read the INTERVAL constant (seconds per interval) from the contract */
export function useContractInterval() {
  return useReadContract({
    address: ESCROW_ADDRESS as `0x${string}`,
    abi: ESCROW_ABI,
    functionName: "INTERVAL",
  });
}

/** Read the user's USDC wallet balance (not escrow internal balance) */
export function useUsdcWalletBalance() {
  const { address } = useAccount();
  return useReadContract({
    address: USDC_ADDRESS as `0x${string}`,
    abi: USDC_ABI,
    functionName: "balanceOf",
    args: [address!],
    query: {
      enabled: !!address,
      refetchInterval: POLL_INTERVAL,
    },
  });
}

/** Read the escrow contract owner address */
export function useEscrowOwner() {
  return useReadContract({
    address: ESCROW_ADDRESS as `0x${string}`,
    abi: ESCROW_ABI,
    functionName: "owner",
  });
}

/** Read the video price per interval for a given videoId */
export function useVideoPrice(videoId: bigint) {
  return useReadContract({
    address: ESCROW_ADDRESS as `0x${string}`,
    abi: ESCROW_ABI,
    functionName: "videoPricePerInterval",
    args: [videoId],
    query: {
      refetchInterval: POLL_INTERVAL,
    },
  });
}

"use client";

import { waitForTransactionReceipt } from "@wagmi/core";
import { useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import {
  formatUSDC,
  useEscrowOwner,
  useUsdcWalletBalance,
  useVideoPrice,
} from "../hooks/useStreamingSession";
import { config } from "../lib/config";
import {
  ESCROW_ABI,
  ESCROW_ADDRESS,
  USDC_ABI,
  USDC_ADDRESS,
} from "../lib/contracts";

type OwnerTxType = "setPrice" | "transfer" | null;

export function OwnerPanel() {
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const { data: ownerData } = useEscrowOwner();
  const { data: usdcWalletData, refetch: refetchUsdcBalance } =
    useUsdcWalletBalance();
  const { data: videoPriceData, refetch: refetchVideoPrice } = useVideoPrice(
    BigInt(1),
  );

  // ── State ───────────────────────────────────────────────────────
  const [txLoading, setTxLoading] = useState<OwnerTxType>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Set Video Price inputs
  const [videoId, setVideoId] = useState("1");
  const [priceInput, setPriceInput] = useState("0.1"); // in USDC

  // Transfer USDC inputs
  const [recipient, setRecipient] = useState("");
  const [transferAmount, setTransferAmount] = useState("10"); // in USDC

  // ── Derived ─────────────────────────────────────────────────────
  const owner = ownerData as `0x${string}` | undefined;
  const EXPECTED_OWNER = "0xe44300d79AecD3eFe13eC6E7857c55077dA7aB51";
  const isOwner =
    !!address && address.toLowerCase() === EXPECTED_OWNER.toLowerCase();
  const usdcBalance = usdcWalletData as bigint | undefined;
  const videoPrice = videoPriceData as bigint | undefined;

  // Don't render if not the designated owner
  if (!isOwner) return null;

  // ── Handlers ────────────────────────────────────────────────────

  const handleSetVideoPrice = async () => {
    try {
      setError(null);
      setSuccess(null);
      setTxLoading("setPrice");

      const priceInUnits = BigInt(
        Math.round(parseFloat(priceInput) * 1_000_000),
      );
      const vid = BigInt(parseInt(videoId));

      const hash = await writeContractAsync({
        address: ESCROW_ADDRESS as `0x${string}`,
        abi: ESCROW_ABI,
        functionName: "setVideoPrice",
        args: [vid, priceInUnits],
        gas: BigInt(100_000),
      });
      await waitForTransactionReceipt(config, { hash });
      await refetchVideoPrice();
      setSuccess(`Video #${videoId} price set to ${priceInput} USDC/interval`);
    } catch (err: unknown) {
      const msg =
        (err as { shortMessage?: string }).shortMessage ||
        (err as Error).message ||
        "Set price failed";
      setError(msg);
    } finally {
      setTxLoading(null);
    }
  };

  const handleTransferUSDC = async () => {
    try {
      setError(null);
      setSuccess(null);
      setTxLoading("transfer");

      if (!recipient || !recipient.startsWith("0x")) {
        setError("Invalid recipient address");
        setTxLoading(null);
        return;
      }

      const amountInUnits = BigInt(
        Math.round(parseFloat(transferAmount) * 1_000_000),
      );

      const hash = await writeContractAsync({
        address: USDC_ADDRESS as `0x${string}`,
        abi: USDC_ABI,
        functionName: "transfer",
        args: [recipient as `0x${string}`, amountInUnits],
        gas: BigInt(100_000),
      });
      await waitForTransactionReceipt(config, { hash });
      await refetchUsdcBalance();
      setSuccess(
        `Transferred ${transferAmount} USDC to ${recipient.slice(0, 6)}...${recipient.slice(-4)}`,
      );
    } catch (err: unknown) {
      const msg =
        (err as { shortMessage?: string }).shortMessage ||
        (err as Error).message ||
        "Transfer failed";
      setError(msg);
    } finally {
      setTxLoading(null);
    }
  };

  return (
    <div className="glass-card glow-amber rounded-2xl p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10">
          <svg
            className="h-4 w-4 text-amber-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-amber-400">Admin Panel</h2>
          <p className="text-[10px] text-zinc-500">
            {owner?.slice(0, 6)}…{owner?.slice(-4)}
          </p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="mb-5 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-white/3 p-3">
          <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
            USDC Balance
          </p>
          <p className="mt-1 font-mono text-lg text-zinc-200">
            {usdcBalance !== undefined ? formatUSDC(usdcBalance) : "—"}
          </p>
        </div>
        <div className="rounded-xl bg-white/3 p-3">
          <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
            Video #1 Rate
          </p>
          <p className="mt-1 font-mono text-lg text-zinc-200">
            {videoPrice !== undefined ? formatUSDC(videoPrice) : "—"}
            <span className="ml-1 text-xs text-zinc-500">/ int</span>
            {videoPrice !== undefined && videoPrice === BigInt(0) && (
              <span className="ml-2 text-xs text-red-400">NOT SET</span>
            )}
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {/* ── Set Video Price ──────────────────────────────────── */}
        <div>
          <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-zinc-400">
            Set Video Price
          </h3>
          <div className="flex gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-zinc-500">ID</label>
              <input
                type="number"
                value={videoId}
                onChange={(e) => setVideoId(e.target.value)}
                className="w-16 rounded-lg border border-white/5 bg-white/3 px-3 py-2 font-mono text-sm text-white focus:border-amber-500/50 focus:outline-none"
                min="1"
              />
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <label className="text-[10px] text-zinc-500">Price (USDC)</label>
              <input
                type="number"
                value={priceInput}
                onChange={(e) => setPriceInput(e.target.value)}
                className="w-full rounded-lg border border-white/5 bg-white/3 px-3 py-2 font-mono text-sm text-white focus:border-amber-500/50 focus:outline-none"
                step="0.01"
                min="0"
              />
            </div>
            <div className="flex flex-col justify-end">
              <button
                onClick={handleSetVideoPrice}
                disabled={txLoading !== null}
                className="btn-warning rounded-lg px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:transform-none disabled:shadow-none">
                {txLoading === "setPrice" ? (
                  <span className="animate-pulse-slow">…</span>
                ) : (
                  "Set"
                )}
              </button>
            </div>
          </div>
          <p className="mt-1.5 text-[10px] text-zinc-600">
            12 intervals x {priceInput} ={" "}
            {(parseFloat(priceInput || "0") * 12).toFixed(2)} USDC / session
          </p>
        </div>

        {/* ── Transfer USDC ───────────────────────────────────── */}
        <div>
          <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-zinc-400">
            Transfer MockUSDC
          </h3>
          <div className="space-y-2">
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="0x recipient…"
              className="w-full rounded-lg border border-white/5 bg-white/3 px-3 py-2 font-mono text-sm text-white placeholder-zinc-600 focus:border-amber-500/50 focus:outline-none"
            />
            <div className="flex gap-2">
              <input
                type="number"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                className="w-28 rounded-lg border border-white/5 bg-white/3 px-3 py-2 font-mono text-sm text-white focus:border-amber-500/50 focus:outline-none"
                step="0.1"
                min="0"
              />
              <button
                onClick={handleTransferUSDC}
                disabled={txLoading !== null || !recipient}
                className="btn-warning flex-1 rounded-lg px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:transform-none disabled:shadow-none">
                {txLoading === "transfer" ? (
                  <span className="animate-pulse-slow">Sending…</span>
                ) : (
                  "Transfer"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Feedback ──────────────────────────────────────────── */}
      {success && (
        <div className="mt-4 rounded-lg bg-green-500/10 p-3 text-xs text-green-400 ring-1 ring-green-500/20">
          <div className="flex items-start justify-between gap-3">
            <p>{success}</p>
            <button
              onClick={() => setSuccess(null)}
              className="shrink-0 opacity-60 hover:opacity-100">
              ✕
            </button>
          </div>
        </div>
      )}
      {error && (
        <div className="mt-4 rounded-lg bg-red-500/10 p-3 text-xs text-red-400 ring-1 ring-red-500/20">
          <div className="flex items-start justify-between gap-3">
            <p className="break-all">{error}</p>
            <button
              onClick={() => setError(null)}
              className="shrink-0 opacity-60 hover:opacity-100">
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

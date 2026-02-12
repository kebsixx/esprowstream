"use client";

import { waitForTransactionReceipt } from "@wagmi/core";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { OwnerPanel } from "../components/OwnerPanel";
import { VideoPlayer } from "../components/VideoPlayer";
import { WalletButton } from "../components/WalletButton";
import {
  DEPOSIT_AMOUNT,
  formatUSDC,
  parseSessionData,
  useAllowance,
  useContractInterval,
  useEscrowBalance,
  useEscrowOwner,
  useSession,
  useUsdcWalletBalance,
} from "../hooks/useStreamingSession";
import { config } from "../lib/config";
import {
  ESCROW_ABI,
  ESCROW_ADDRESS,
  USDC_ABI,
  USDC_ADDRESS,
} from "../lib/contracts";

type TxType = "approve" | "deposit" | "start" | "end" | null;

export default function Home() {
  const { isConnected, address } = useAccount();
  const { writeContractAsync } = useWriteContract();

  // ── Read hooks ──────────────────────────────────────────────────
  const { data: allowanceData, refetch: refetchAllowance } = useAllowance();
  const { data: balanceData, refetch: refetchBalance } = useEscrowBalance();
  const { data: sessionRaw, refetch: refetchSession } = useSession();
  const { data: intervalData } = useContractInterval();
  const { data: usdcWalletData } = useUsdcWalletBalance();
  const { data: ownerData } = useEscrowOwner();

  // ── Local state ─────────────────────────────────────────────────
  const [txLoading, setTxLoading] = useState<TxType>(null);
  const [error, setError] = useState<string | null>(null);
  const [remaining, setRemaining] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [devClicks, setDevClicks] = useState(0);
  const [showDebug, setShowDebug] = useState(false);

  useEffect(() => setMounted(true), []);

  // ── Derived data ────────────────────────────────────────────────
  const session = parseSessionData(sessionRaw);
  const isActive = session?.active === true;
  const interval = intervalData ? Number(intervalData as bigint) : 300;
  const allowance = allowanceData as bigint | undefined;
  const escrowBalance = balanceData as bigint | undefined;
  const needsApproval =
    allowance !== undefined ? allowance < DEPOSIT_AMOUNT : true;
  const formattedBalance =
    escrowBalance !== undefined ? formatUSDC(escrowBalance) : "0.0";
  const usdcWallet = usdcWalletData as bigint | undefined;
  const formattedWallet =
    usdcWallet !== undefined ? formatUSDC(usdcWallet) : "—";
  const onChainOwner = ownerData as `0x${string}` | undefined;
  const isOwner =
    !!address &&
    !!onChainOwner &&
    address.toLowerCase() === onChainOwner.toLowerCase();

  const endSessionRef = useRef<() => void>(() => {});
  const autoEndTriggered = useRef(false);

  // ── Transaction handlers ────────────────────────────────────────
  const handleApprove = useCallback(async () => {
    try {
      setError(null);
      setTxLoading("approve");
      const hash = await writeContractAsync({
        address: USDC_ADDRESS as `0x${string}`,
        abi: USDC_ABI,
        functionName: "approve",
        args: [ESCROW_ADDRESS as `0x${string}`, DEPOSIT_AMOUNT],
        gas: BigInt(100_000),
      });
      await waitForTransactionReceipt(config, { hash });
      await refetchAllowance();
    } catch (err: unknown) {
      const msg =
        (err as { shortMessage?: string }).shortMessage ||
        (err as Error).message ||
        "Approve failed";
      setError(msg);
    } finally {
      setTxLoading(null);
    }
  }, [writeContractAsync, refetchAllowance]);

  const handleDeposit = useCallback(async () => {
    try {
      setError(null);
      setTxLoading("deposit");
      const hash = await writeContractAsync({
        address: ESCROW_ADDRESS as `0x${string}`,
        abi: ESCROW_ABI,
        functionName: "deposit",
        args: [DEPOSIT_AMOUNT],
        gas: BigInt(200_000),
      });
      await waitForTransactionReceipt(config, { hash });
      await Promise.all([refetchBalance(), refetchAllowance()]);
    } catch (err: unknown) {
      const msg =
        (err as { shortMessage?: string }).shortMessage ||
        (err as Error).message ||
        "Deposit failed";
      setError(msg);
    } finally {
      setTxLoading(null);
    }
  }, [writeContractAsync, refetchBalance, refetchAllowance]);

  const handleStartSession = useCallback(async () => {
    try {
      setError(null);
      setTxLoading("start");
      const hash = await writeContractAsync({
        address: ESCROW_ADDRESS as `0x${string}`,
        abi: ESCROW_ABI,
        functionName: "startSession",
        args: [BigInt(1), BigInt(12)],
        gas: BigInt(300_000),
      });
      await waitForTransactionReceipt(config, { hash });
      await refetchSession();
    } catch (err: unknown) {
      const msg =
        (err as { shortMessage?: string }).shortMessage ||
        (err as Error).message ||
        "Start session failed";
      setError(msg);
    } finally {
      setTxLoading(null);
    }
  }, [writeContractAsync, refetchSession]);

  const handleEndSession = useCallback(async () => {
    try {
      setError(null);
      setTxLoading("end");
      const hash = await writeContractAsync({
        address: ESCROW_ADDRESS as `0x${string}`,
        abi: ESCROW_ABI,
        functionName: "endSession",
        gas: BigInt(300_000),
      });
      await waitForTransactionReceipt(config, { hash });
      await Promise.all([refetchSession(), refetchBalance()]);
    } catch (err: unknown) {
      const msg =
        (err as { shortMessage?: string }).shortMessage ||
        (err as Error).message ||
        "End session failed";
      setError(msg);
    } finally {
      setTxLoading(null);
    }
  }, [writeContractAsync, refetchSession, refetchBalance]);

  endSessionRef.current = handleEndSession;

  // ── Timer logic ─────────────────────────────────────────────────
  useEffect(() => {
    if (!isActive || !session) {
      setRemaining(0);
      setElapsed(0);
      autoEndTriggered.current = false;
      return;
    }

    const maxIntervals =
      session.pricePerInterval > 0n
        ? Number(session.lockedAmount / session.pricePerInterval)
        : 0;
    const totalDuration = maxIntervals * interval;

    const tick = () => {
      const now = Math.floor(Date.now() / 1000);
      const el = now - Number(session.startTime);
      const rem = totalDuration - el;
      setElapsed(Math.max(0, el));
      setRemaining(Math.max(0, rem));

      if (rem <= 0 && !autoEndTriggered.current) {
        autoEndTriggered.current = true;
        endSessionRef.current();
      }
    };

    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [isActive, session, interval]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Hidden dev mode: click version text 5 times
  const handleDevClick = () => {
    const next = devClicks + 1;
    setDevClicks(next);
    if (next >= 5) {
      setShowDebug(!showDebug);
      setDevClicks(0);
    }
  };

  // ── Loading state ───────────────────────────────────────────────
  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050507] bg-mesh">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
      </div>
    );
  }

  // ── Not connected ───────────────────────────────────────────────
  if (!isConnected) {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#050507] text-white">
        {/* Animated background orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-32 -top-32 h-96 w-96 animate-[pulse_8s_ease-in-out_infinite] rounded-full bg-indigo-600/[0.07] blur-3xl" />
          <div className="absolute -right-32 top-1/3 h-80 w-80 animate-[pulse_10s_ease-in-out_infinite_2s] rounded-full bg-purple-600/6 blur-3xl" />
          <div className="absolute -bottom-24 left-1/3 h-72 w-72 animate-[pulse_12s_ease-in-out_infinite_4s] rounded-full bg-pink-600/5 blur-3xl" />
        </div>

        {/* Grid lines overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
          {/* Logo mark */}
          <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/25">
            <svg
              className="h-8 w-8 text-white"
              fill="currentColor"
              viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>

          {/* Title */}
          <h1 className="gradient-text text-5xl font-bold tracking-tight sm:text-7xl">
            EsprowStream
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-zinc-400 sm:text-lg">
            Decentralized pay-per-minute video streaming powered by smart
            contract escrow
          </p>

          {/* CTA */}
          <div className="mt-10">
            <WalletButton centered />
          </div>

          {/* Feature pills */}
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {[
              { icon: "🔒", label: "Non-custodial" },
              { icon: "⚡", label: "Pay-per-minute" },
              { icon: "💎", label: "USDC Escrow" },
            ].map((f) => (
              <div
                key={f.label}
                className="glass-card flex items-center gap-2 rounded-full px-4 py-2 text-sm text-zinc-400">
                <span>{f.icon}</span>
                <span>{f.label}</span>
              </div>
            ))}
          </div>

          {/* How it works */}
          <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                step: "01",
                title: "Deposit",
                desc: "Fund your escrow with USDC",
              },
              {
                step: "02",
                title: "Stream",
                desc: "Watch content in real-time",
              },
              {
                step: "03",
                title: "Settle",
                desc: "Pay only for what you watched",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="glass-card glass-card-hover rounded-2xl p-5 text-left transition-all">
                <span className="font-mono text-xs text-indigo-400">
                  {s.step}
                </span>
                <h3 className="mt-2 text-sm font-semibold text-zinc-200">
                  {s.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-6 flex items-center gap-2 text-[11px] text-zinc-600">
          <div className="h-1.5 w-1.5 rounded-full bg-green-500/60" />
          Sepolia Testnet
        </div>
      </div>
    );
  }

  // ── Compute progress ───────────────────────────────────────────
  const maxIntervals =
    isActive && session && session.pricePerInterval > 0n
      ? Number(session.lockedAmount / session.pricePerInterval)
      : 0;
  const totalDuration = maxIntervals * interval;
  const progress = totalDuration > 0 ? (elapsed / totalDuration) * 100 : 0;

  // ── Connected — Two Column Layout ──────────────────────────────
  return (
    <div className="min-h-screen bg-[#050507] bg-mesh text-white">
      {/* ── Header ─────────────────────────────────────────────── */}
      <header className="glass-card sticky top-0 z-50 flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-3">
          <h1 className="gradient-text text-lg font-bold tracking-tight">
            EsprowStream
          </h1>
          <span className="rounded-full bg-indigo-500/10 px-2 py-0.5 text-[10px] font-medium text-indigo-400 ring-1 ring-indigo-500/20">
            Sepolia
          </span>
        </div>
        <WalletButton />
      </header>

      {/* ── Main Two-Column Grid ───────────────────────────────── */}
      <main className="mx-auto grid max-w-7xl gap-6 px-6 py-6 lg:grid-cols-[1fr_380px]">
        {/* ── LEFT: Video + Session Info ────────────────────────── */}
        <div className="space-y-5">
          {/* Video Player */}
          <VideoPlayer isActive={isActive} />

          {/* Progress bar (only when active) */}
          {isActive && (
            <div className="glass-card overflow-hidden rounded-xl p-4">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-zinc-400">Session Progress</span>
                <span className="font-mono text-indigo-400">
                  {formatTime(elapsed)} / {formatTime(totalDuration)}
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-zinc-800">
                <div
                  className="h-full rounded-full bg-linear-to-r from-indigo-500 to-purple-500 transition-all duration-1000"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
            </div>
          )}

          {/* Active Session Details */}
          {isActive && session && (
            <div className="glass-card rounded-2xl p-5">
              <div className="mb-3 flex items-center gap-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                <h3 className="text-sm font-semibold text-zinc-300">
                  Live Session
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
                <div>
                  <p className="text-xs text-zinc-500">Video</p>
                  <p className="font-mono text-zinc-200">
                    #{session.videoId.toString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500">Locked</p>
                  <p className="font-mono text-zinc-200">
                    {formatUSDC(session.lockedAmount)} USDC
                  </p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500">Rate</p>
                  <p className="font-mono text-zinc-200">
                    {formatUSDC(session.pricePerInterval)}/int
                  </p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500">Started</p>
                  <p className="font-mono text-zinc-200">
                    {new Date(
                      Number(session.startTime) * 1000,
                    ).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Owner Panel */}
          <OwnerPanel />
        </div>

        {/* ── RIGHT: Controls Sidebar ──────────────────────────── */}
        <div className="space-y-5">
          {/* Timer Card */}
          <div className="glass-card glow-indigo rounded-2xl p-6 text-center">
            <p className="mb-2 text-xs font-medium uppercase tracking-widest text-zinc-500">
              {isActive ? "Time Remaining" : "Session Timer"}
            </p>
            <p
              className={`font-mono text-5xl font-bold tracking-tight ${
                isActive
                  ? remaining <= 60
                    ? "text-red-400"
                    : "text-green-400"
                  : "text-zinc-700"
              }`}>
              {isActive ? formatTime(remaining) : "--:--"}
            </p>
            {isActive && (
              <p className="mt-2 text-xs text-zinc-500">
                Elapsed {formatTime(elapsed)}
              </p>
            )}
          </div>

          {/* Balance Card */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
                  Escrow Balance
                </p>
                <p className="mt-1 text-3xl font-bold tabular-nums">
                  {formattedBalance}
                  <span className="ml-1.5 text-sm font-normal text-zinc-500">
                    USDC
                  </span>
                </p>
              </div>
              <div className="rounded-xl bg-indigo-500/10 p-2.5">
                <svg
                  className="h-5 w-5 text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs text-zinc-500">
              <span>Wallet: {formattedWallet} USDC</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="glass-card rounded-2xl p-5">
            <h3 className="mb-4 text-xs font-medium uppercase tracking-widest text-zinc-500">
              Actions
            </h3>
            <div className="flex flex-col gap-3">
              {/* Step indicators */}
              {needsApproval && (
                <button
                  onClick={handleApprove}
                  disabled={txLoading !== null}
                  className="btn-warning flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:transform-none disabled:shadow-none">
                  {txLoading === "approve" ? (
                    <span className="animate-pulse-slow">Approving USDC…</span>
                  ) : (
                    <>
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-[10px] font-bold">
                        1
                      </span>
                      Approve USDC
                    </>
                  )}
                </button>
              )}

              <button
                onClick={handleDeposit}
                disabled={txLoading !== null || needsApproval}
                className="btn-primary flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:transform-none disabled:shadow-none">
                {txLoading === "deposit" ? (
                  <span className="animate-pulse-slow">Depositing…</span>
                ) : (
                  <>
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-[10px] font-bold">
                      {needsApproval ? "2" : "1"}
                    </span>
                    Deposit 1 USDC
                  </>
                )}
              </button>

              {!isActive ? (
                <button
                  onClick={handleStartSession}
                  disabled={txLoading !== null}
                  className="btn-success flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:transform-none disabled:shadow-none">
                  {txLoading === "start" ? (
                    <span className="animate-pulse-slow">Starting…</span>
                  ) : (
                    <>
                      <svg
                        className="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      Start Session
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={handleEndSession}
                  disabled={txLoading !== null}
                  className="btn-danger flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:transform-none disabled:shadow-none">
                  {txLoading === "end" ? (
                    <span className="animate-pulse-slow">Ending…</span>
                  ) : (
                    <>
                      <svg
                        className="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 24 24">
                        <path d="M6 6h12v12H6z" />
                      </svg>
                      End Session
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Network Info (minimal) */}
          <div className="flex items-center justify-between rounded-xl px-3 py-2 text-[11px] text-zinc-600">
            <div className="flex items-center gap-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
              Connected
            </div>
            <span
              className="cursor-default select-none"
              onClick={handleDevClick}>
              v1.0.0
            </span>
          </div>
        </div>
      </main>

      {/* ── Hidden Debug Panel (click v1.0.0 five times) ──────── */}
      {showDebug && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="glass-card mx-4 max-h-[70vh] w-full max-w-lg overflow-auto rounded-2xl p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-zinc-300">
                Developer Debug
              </h3>
              <button
                onClick={() => setShowDebug(false)}
                className="text-zinc-500 hover:text-zinc-300">
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 gap-3 text-xs font-mono">
              <DebugRow label="Your Address" value={address ?? "—"} />
              <DebugRow
                label="On-Chain Owner"
                value={onChainOwner ?? "loading..."}
                status={
                  onChainOwner ? (isOwner ? "success" : "error") : undefined
                }
                extra={onChainOwner ? (isOwner ? "YOU" : "NOT YOU") : undefined}
              />
              <DebugRow
                label="USDC Wallet"
                value={`${formattedWallet} USDC`}
                status={
                  usdcWallet !== undefined && usdcWallet < DEPOSIT_AMOUNT
                    ? "error"
                    : "success"
                }
              />
              <DebugRow
                label="Allowance → Escrow"
                value={`${allowance !== undefined ? formatUSDC(allowance) : "—"} USDC`}
                status={needsApproval ? "warning" : "success"}
                extra={needsApproval ? "NEEDS APPROVE" : "OK"}
              />
              <DebugRow
                label="Escrow Balance"
                value={`${formattedBalance} USDC`}
              />
              <DebugRow
                label="Deposit Amount"
                value={`${formatUSDC(DEPOSIT_AMOUNT)} USDC`}
              />
              <DebugRow label="USDC Contract" value={USDC_ADDRESS} />
              <DebugRow label="Escrow Contract" value={ESCROW_ADDRESS} />
            </div>
          </div>
        </div>
      )}

      {/* ── Error Toast ────────────────────────────────────────── */}
      {error && (
        <div className="fixed bottom-6 left-1/2 z-90 w-full max-w-md -translate-x-1/2 px-4">
          <div className="glass-card rounded-xl border-red-500/20 p-4 text-sm text-red-300 shadow-lg shadow-red-500/10">
            <div className="flex items-start justify-between gap-3">
              <p className="break-all">{error}</p>
              <button
                onClick={() => setError(null)}
                className="shrink-0 text-red-400 hover:text-red-300">
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Debug Row Component ───────────────────────────────────────── */
function DebugRow({
  label,
  value,
  status,
  extra,
}: {
  label: string;
  value: string;
  status?: "success" | "warning" | "error";
  extra?: string;
}) {
  const statusColor = {
    success: "text-green-400",
    warning: "text-yellow-400",
    error: "text-red-400",
  };

  return (
    <div className="rounded-lg bg-white/2 p-2.5">
      <p className="text-[10px] text-zinc-500">{label}</p>
      <p
        className={`mt-0.5 break-all ${status ? statusColor[status] : "text-zinc-300"}`}>
        {value}
        {extra && (
          <span className="ml-2 text-[10px] opacity-70">({extra})</span>
        )}
      </p>
    </div>
  );
}

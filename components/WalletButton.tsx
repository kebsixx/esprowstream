"use client";

import { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export function WalletButton({ centered }: { centered?: boolean }) {
  const { address, isConnected } = useAccount();
  const { connect, connectors, error: connectError } = useConnect();
  const { disconnect } = useDisconnect();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button
        disabled
        className="rounded-xl bg-white/5 px-4 py-2.5 text-sm font-medium text-zinc-500">
        Loading…
      </button>
    );
  }

  if (!isConnected) {
    const metaMask = connectors.find(
      (c) =>
        c.id === "io.metamask" || c.name.toLowerCase().includes("metamask"),
    );

    const containerClass = centered
      ? "flex flex-col items-center gap-3"
      : "flex flex-col items-end gap-1";

    return (
      <div className={containerClass}>
        <button
          onClick={() => {
            if (metaMask) {
              connect({ connector: metaMask });
            }
          }}
          disabled={!metaMask}
          className="btn-primary rounded-xl px-5 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:transform-none disabled:shadow-none">
          {metaMask ? "Connect Wallet" : "Install MetaMask"}
        </button>
        {connectError && (
          <p className="text-xs text-red-400">
            {connectError.message.slice(0, 80)}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className="glass-card flex items-center gap-2 rounded-xl px-3 py-2">
        <div className="h-2 w-2 rounded-full bg-green-500" />
        <span className="font-mono text-xs text-zinc-300">
          {address?.slice(0, 6)}…{address?.slice(-4)}
        </span>
      </div>
      <button
        onClick={() => disconnect()}
        className="rounded-xl bg-white/5 px-3 py-2 text-xs font-medium text-zinc-400 transition-all hover:bg-white/10 hover:text-zinc-200">
        Disconnect
      </button>
    </div>
  );
}

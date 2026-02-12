"use client";

import { useEffect, useRef } from "react";
import { getVideoUrl } from "../lib/video";

interface VideoPlayerProps {
  isActive: boolean;
}

export function VideoPlayer({ isActive }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!isActive && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isActive]);

  return (
    <div className="gradient-border relative aspect-video w-full overflow-hidden rounded-2xl bg-black">
      <video
        ref={videoRef}
        src={getVideoUrl()}
        controls={isActive}
        className="h-full w-full object-contain"
      />
      {!isActive && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md">
          <div className="text-center">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
              <svg
                className="ml-1 h-10 w-10 text-white"
                fill="currentColor"
                viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <p className="text-xl font-semibold text-white">Ready to Stream</p>
            <p className="mt-2 text-sm text-zinc-400">
              Deposit USDC and start a session to begin watching
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// Video configuration — update the CID after uploading to Pinata
// Example: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco"
export const VIDEO_CID =
  "bafybeiee7yyo5wgunjxk4lzil67byig62uvvi62egjkctt2jxb56aeggie";

/**
 * Get the IPFS gateway URL for the video.
 * Uses Pinata gateway as primary, with public fallbacks.
 */
export function getVideoUrl(): string {
  if (!VIDEO_CID) {
    // Fallback to local file during development
    return "/sample.mp4";
  }

  // Pinata gateway (fastest for Pinata-pinned files)
  return `https://gateway.pinata.cloud/ipfs/${VIDEO_CID}`;
}

/**
 * Alternative IPFS gateways if Pinata gateway is slow.
 */
export function getVideoFallbackUrls(): string[] {
  if (!VIDEO_CID) return ["/sample.mp4"];

  return [
    `https://gateway.pinata.cloud/ipfs/${VIDEO_CID}`,
    `https://ipfs.io/ipfs/${VIDEO_CID}`,
    `https://cloudflare-ipfs.com/ipfs/${VIDEO_CID}`,
    `https://dweb.link/ipfs/${VIDEO_CID}`,
  ];
}

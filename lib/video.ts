export interface VideoConfig {
  id: number;
  title: string;
  description: string;
  cid: string;
}

export const VIDEO_LIBRARY: VideoConfig[] = JSON.parse(
  process.env.NEXT_PUBLIC_VIDEO_LIBRARY!,
);

const DEFAULT_VIDEO = VIDEO_LIBRARY[0];

export function getVideoById(videoId?: number): VideoConfig {
  return VIDEO_LIBRARY.find((video) => video.id === videoId) ?? DEFAULT_VIDEO;
}

export function getVideoUrl(videoId?: number): string {
  const { cid } = getVideoById(videoId);
  if (!cid) return "/sample.mp4";
  return `https://gateway.pinata.cloud/ipfs/${cid}`;
}

export function getVideoFallbackUrls(videoId?: number): string[] {
  const { cid } = getVideoById(videoId);
  if (!cid) return ["/sample.mp4"];

  return [
    `https://gateway.pinata.cloud/ipfs/${cid}`,
    `https://ipfs.io/ipfs/${cid}`,
    `https://cloudflare-ipfs.com/ipfs/${cid}`,
    `https://dweb.link/ipfs/${cid}`,
  ];
}

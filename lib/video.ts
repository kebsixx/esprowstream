export interface VideoConfig {
  id: number;
  title: string;
  description: string;
  cid: string;
}

export const VIDEO_LIBRARY: VideoConfig[] = [
  {
    id: 1,
    title: "Cinematic Bergema Sampai Selamanya",
    description: "Cinematic visual spotify song Bergema Sampai Selamanya.",
    cid: "bafybeiee7yyo5wgunjxk4lzil67byig62uvvi62egjkctt2jxb56aeggie",
  },
  {
    id: 2,
    title: "Cinematic Video on Ramadhan",
    description: "Cinematic video capturing the essence of Ramadhan.",
    cid: "bafybeihime6btoqf6dpmhzbtsu4hq3axpiuh3xibiw4tzegj5lhmqf24qm",
  },
];

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

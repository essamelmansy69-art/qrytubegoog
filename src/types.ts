export interface SmartLinkResult {
  smartUrl: string;
  explanation: string;
  icon: string;
  brandColor: string;
}

export type PlatformType = 'auto' | 'youtube' | 'instagram' | 'facebook' | 'tiktok' | 'whatsapp' | 'telegram' | 'x' | 'snapchat' | 'other';

export interface PlatformConfig {
  id: PlatformType;
  name: string;
  placeholder: string;
  brandColor: string;
  brandBg: string;
  icon: string;
  logoSvg: string;
}

export const MintThemeBaseSpacing = 4;
const formatSize = (size: number) => `${size}px`;
export type SpacingType = {
  x3s: string;
  xxs: string;
  xs: string;
  s: string;
  m: string;
  l: string;
  xl: string;
  xxl: string;
  x3l: string;
  x4l: string;
};

export const Spacing: SpacingType = {
  x3s: formatSize(MintThemeBaseSpacing),
  xxs: formatSize(MintThemeBaseSpacing * 2),
  xs: formatSize(MintThemeBaseSpacing * 3),
  s: formatSize(MintThemeBaseSpacing * 4),
  m: formatSize(MintThemeBaseSpacing * 6),
  l: formatSize(MintThemeBaseSpacing * 8),
  xl: formatSize(MintThemeBaseSpacing * 10),
  xxl: formatSize(MintThemeBaseSpacing * 12),
  x3l: formatSize(MintThemeBaseSpacing * 16),
  x4l: formatSize(MintThemeBaseSpacing * 20),
};

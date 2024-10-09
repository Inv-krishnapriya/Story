import { MintTheme, MintThemeDefault } from "@/design-system";

export const ClientTheme: MintTheme = JSON.parse(
  JSON.stringify(MintThemeDefault)
);
ClientTheme.color.border.accent = ClientTheme.color.pallet.ultramarine600;
ClientTheme.color.text.accent = ClientTheme.color.pallet.ultramarine600;
ClientTheme.color.background.uiBackground = ClientTheme.color.pallet.gray50;
ClientTheme.color.surfaceAccent.primary.dark =
  ClientTheme.color.pallet.ultramarine700;
ClientTheme.color.object.accent = ClientTheme.color.pallet.ultramarine600;
ClientTheme.color.border.lowOpacity = ClientTheme.color.pallet.gray100;
ClientTheme.color.surfaceAccent.primary.bright =
  ClientTheme.color.pallet.ultramarine100;
ClientTheme.color.surfaceAccent.primary.brightHover =
  ClientTheme.color.pallet.ultramarine200;

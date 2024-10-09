import { createTheme } from "@mui/material";
import { ClientTheme } from "./client-theme";

const { palette: MuiPalette } = createTheme();
const { augmentColor } = MuiPalette;
const createColor = (mainColor: string) =>
  augmentColor({ color: { main: mainColor } });

const palette = {
  uiColor: {
    objectLow: "#0A182678",
    objectMedium: "#0A1826B5",
    borderLow: "#0A182614",
    borderMedium: "#0A182642",
    borderDisabled: "#0A182626",
    borderAccent: "#055CB2",
    textAccent: "#055CB2",
    textHigh: "#0A1826",
    textMedium: "#0A1826B5",
    textLow: "#0A182696",
    textDisabled: "#0A18265E",
    textLink: "#006891",
    surfaceAccentPrimary: "#0067CF",
    surfaceAccentPrimaryHover: "#0054A8",
    surfaceAccentPrimaryBright: "#D4E8FA",
    surFaceDisabled: "#0A182614",
    exRed: "#B82F25",
    systemInfo: "#2D45BA",
    systemError: "#E01C0D",
    systemSuccess: "#00947F",
    systemFocus: "#A2EBE1",
    systemErrorLight: "#FFF1F0",
    uiBackGround: "#EDF5FF",
    containerLayer: "#F5F6F6",
  },
  exRed: createColor("#B82F25"),
  accentPrimary: createColor("#0067CF"),
  borderAccent: createColor("#055CB2"),
  textAccent: createColor("#055CB2"),
  textMedium: createColor("#0A1826B5"),
  gray: {
    main: ClientTheme.color.border.high,
  },

  // Define other colors as needed
};
export default palette;

import { ColorPallet } from "./color/color-pallet";
import { SpacingType } from "./spacing/spacing";
import { CornerRadiusType } from "./corner-radius/corner-radius";
import { TypographyType } from "./typography/typography";

export type MintTheme = {
  appBarHeight: number;
  drawerWidth: number;
  // alphabet
  color: {
    pallet: typeof ColorPallet;
    background: {
      uiBackground: string;
      containerBg: {
        layer1: string;
        layer2: string;
        layer3: string;
        layer4: string;
        modal: string;
        scrim: string;
      };
    };
    border: {
      high: string;
      medium: string;
      mediumHover: string;
      low: string;
      lowOpacity: string;
      disabled: string;
      highInverse: string;
      link: string;
      linkHover: string;
      accent: string;
    };
    text: {
      high: string;
      medium: string;
      low: string;
      disabled: string;
      highInverse: string;
      fixedWhite: string;
      fixedGray: string;
      link: string;
      accent: string;
    };
    surfaceAccent: {
      primary: {
        dark: string;
        primary: string;
        hover: string;
        pressed: string;
        bright: string;
        brightHover: string;
        brightPressed: string;
        areaHover: string;
        areaPressed: string;
        areaSelected: string;
        disabled: string;
      };
      primaryNavigation: {
        primary: string;
        hover: string;
        pressed: string;
        bright: string;
      };
      secondary: {
        secondary: string;
        hover: string;
        pressed: string;
        bright: string;
        brightHover: string;
        brightPressed: string;
      };
    };
    surfaceGray: {
      high: {
        high: string;
        hover: string;
        pressed: string;
      };
      medium: {
        medium: string;
        hover: string;
        pressed: string;
      };
      low: {
        low: string;
        hover: string;
        pressed: string;
      };
      componentBg: {
        bg: string;
        hover: string;
        pressed: string;
        selected: string;
      };
      area: {
        hover: string;
        pressed: string;
      };
      disabled: {
        disabled: string;
        alpha: string;
        white: string;
      };
      table: {
        tableHead: string;
        tableHeadHover: string;
        tableHeadSelected: string;
        questionnaireTableLow: string;
        questionnaireTableHigh: string;
        questionnaireTableHover: string;
      };
      white: {
        fixed: string;
      };
    };
    system: {
      error: {
        error: string;
        hover: string;
        pressed: string;
        bright: string;
        brightHover: string;
        brightPressed: string;
      };
      success: {
        success: string;
        bright: string;
      };
      warning: {
        warning: string;
        bright: string;
      };
      info: {
        info: string;
        bright: string;
      };
      focus: {
        focus: string;
        bright: string;
      };
    };
    object: {
      high: string;
      medium: string;
      low: string;
      disabled: string;
      highInverse: string;
      fixedWhite: string;
      fixedGray: string;
      link: string;
      accent: string;
      accentInverse: string;
    };
    extendedColors: {
      red: {
        ex1: string;
        ex2: string;
        ex3: string;
        ex4: string;
      };
      pink: {
        ex1: string;
        ex2: string;
        ex3: string;
        ex4: string;
      };
      purple: {
        ex1: string;
        ex2: string;
        ex3: string;
        ex4: string;
      };
      ultramarine: {
        ex1: string;
        ex2: string;
        ex3: string;
        ex4: string;
      };
      blue: {
        ex1: string;
        ex2: string;
        ex3: string;
        ex4: string;
      };
      aqua: {
        ex1: string;
        ex2: string;
        ex3: string;
        ex4: string;
      };
      turquoise: {
        ex1: string;
        ex2: string;
        ex3: string;
        ex4: string;
      };
      teal: {
        ex1: string;
        ex2: string;
        ex3: string;
        ex4: string;
      };
      green: {
        ex1: string;
        ex2: string;
        ex3: string;
        ex4: string;
      };
      lime: {
        ex1: string;
        ex2: string;
        ex3: string;
        ex4: string;
      };
      yellow: {
        ex1: string;
        ex2: string;
        ex3: string;
        ex4: string;
      };
      orange: {
        ex1: string;
        ex2: string;
        ex3: string;
        ex4: string;
      };
      gray: {
        ex1: string;
        ex2: string;
        ex3: string;
        ex4: string;
      };
    };
  };
  cornerRadius: CornerRadiusType;
  spacing: SpacingType;
  typography: TypographyType;
};
interface UiColor {
  objectLow: string;
  objectMedium: string;
  borderLow: string;
  borderMedium: string;
  borderDisabled: string;
  borderAccent: string;
  textAccent: string;
  textHigh: string;
  textMedium: string;
  textLow: string;
  textLink: string;
  surfaceAccentPrimary: string;
  surfaceAccentPrimaryBright: string;
  exRed: string;
  systemInfo: string;
  systemError: string;
  systemErrorLight: string;
  uiBackGround: string;
  surFaceDisabled: string;
  textDisabled: string;
  systemSuccess: string;
  containerLayer: string;
  surfaceAccentPrimaryHover: string;
  systemFocus: string;
}

declare module "@mui/material/styles" {
  interface Palette {
    uiColor: UiColor;
  }
}
declare module "@mui/material/styles" {
  interface Theme {
    mint: MintTheme;
  }

  // allow configuration using `createTheme`
  interface ThemeOptions {
    mint: MintTheme;
  }
}

declare module "@mui/material/styles" {
  interface Palette {
    tonal: {
      main: string;
    };
    gray: {
      main: string;
    };
  }
  interface PaletteOptions {
    tonal: {
      main: string;
    };
    gray: {
      main: string;
    };
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    tonal: true;
    exRed: true;
    accentPrimary: true;
    textAccent: true;
    textMedium: true;
    borderAccent: true;
    gray: true;
  }
}
declare module "@mui/material/Chip" {
  interface ChipPropsColorOverrides {
    gray: true;
  }
}

declare module "@mui/material/Checkbox" {
  interface CheckboxPropsColorOverrides {
    exRed: true;
    accentPrimary: true;
    textAccent: true;
    textMedium: true;
  }
}

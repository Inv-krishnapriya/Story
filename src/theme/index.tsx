import React, { useMemo } from "react";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
  StyledEngineProvider,
} from "@mui/material";
import palette from "./palette";
import ComponentsOverrides from "./overrides";
import { CacheProvider } from "@emotion/react";

import createCache from "@emotion/cache";
import { ClientTheme } from "./client-theme";
import GlobalStyle from "./GlobalStyle";

function AppTheme({ children }: Readonly<{ children: React.ReactNode }>) {
  const options = { key: "mui" };
  const themeOptions: any = useMemo(
    () => ({
      mint: ClientTheme,
      palette: palette,
    }),
    []
  );

  let theme = createTheme(themeOptions);
  theme.components = ComponentsOverrides(theme);
  // const [{ cache, flush }] = React.useState(() => {
  //   const cache = createCache(options);
  //   cache.compat = true;
  //   const prevInsert = cache.insert;
  //   let inserted: string[] = [];
  //   cache.insert = (...args) => {
  //     const serialized = args[1];
  //     if (cache.inserted[serialized.name] === undefined) {
  //       inserted.push(serialized.name);
  //     }
  //     return prevInsert(...args);
  //   };
  //   const flush = () => {
  //     const prevInserted = inserted;
  //     inserted = [];
  //     return prevInserted;
  //   };
  //   return { cache, flush };
  // });

  return (
    // <CacheProvider value={cache}>
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
    // </CacheProvider>
  );
}

export default AppTheme;

import { Theme } from "@mui/material/styles";

import MenuItem from "./menu-item";

export default function ComponentsOverrides(theme: Theme) {
  return Object.assign(MenuItem(theme));
}

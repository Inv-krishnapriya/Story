import { Box } from "@mui/material";

import { TabPanelProps } from "./interface";
import { H6 } from "../../typography/Typography";

function TabPanel(props: TabPanelProps) {
  const { children, value, index, sx, sxChild, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      sx={sx}
      {...other}
    >
      {value === index && <Box sx={sxChild}>{children}</Box>}
    </Box>
  );
}

export default TabPanel;

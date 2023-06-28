import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import * as Common from "./CommonComponentsIndex";
import translate from "../assets/translationFiles/commonTranslation";
import { openInNewTab } from "../utils/GeneralUtils";

const CellmaFooter = () => {
  const newYear = new Date().getFullYear();
  const { language } = useSelector((state: any) => state.language);

  return (
    <Box sx={styles.footer}>
      <Typography variant="h5">
        {translate("copyright", language)} Ⓒ {newYear} RIOMED LTD.
        <Common.CellmaLink
          label={translate("accessibility", language)}
          href="/cellmaUser/accessibility"
          onClick={() =>
            openInNewTab("/cellmaUser/accessibility", "Accessibility", 700, 500)
          }
          target="_blank"
          sx={{ textDecoration: "none", color: "primary.dark" }}
        >
          {translate("accessibility", language)}
        </Common.CellmaLink>
      </Typography>
    </Box>
  );
};

const styles = {
  footer: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    position: "relative",
    left: 0,
    right: 0,
    zIndex: 1000,
    mt: "auto",
  },
};

export default CellmaFooter;

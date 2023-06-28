import { Box, Typography } from "@mui/material";
// import { useSelector } from "react-redux";

import CellmaLink from "./CellmaLink";
// import translate from "../assets/translationFiles/commonTranslation";
import { openInNewTab } from "../Utils/GeneralUtils";

interface Props {
  translate: any;
}

export const CellmaFooter: React.FC<Props> = (props) => {
  const newYear = new Date().getFullYear();
  return (
    <Box sx={styles.footer}>
      <Typography variant="h5">
        {props.translate("copyright")} Ⓒ {newYear} RIOMED LTD.
        <CellmaLink
          label={props.translate("accessibility")}
          href="/cellmaUser/accessibility"
          onClick={() =>
            openInNewTab("/cellmaUser/accessibility", "Accessibility", 700, 500)
          }
          target="_blank"
          sx={{ textDecoration: "none", color: "primary.dark" }}
        >
          {props.translate("accessibility")}
        </CellmaLink>
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

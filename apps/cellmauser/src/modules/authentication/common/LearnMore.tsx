import * as Mui from "@mui/material";
import { useSelector } from "react-redux";

import t from "../assets/translationFiles/learnMoreTranslation";

const LearnMore = () => {
  return (
    <Mui.Box sx={{ m: "20px" }}>
      <Mui.Typography variant="subtitle1" sx={styles.title}>
        {t("learnMoreTitle")}
      </Mui.Typography>
      <Mui.Typography variant="subtitle2" sx={styles.text}>
        {t("youCanChoose")}
      </Mui.Typography>
      <Mui.Typography variant="subtitle2" sx={styles.text}>
        {t("toChangeLanguage")}
      </Mui.Typography>
      <Mui.Typography variant="subtitle2" sx={styles.text}>
        {t("goToLanguage")}
        {t("preferredLanguage")}
      </Mui.Typography>
      <Mui.Typography variant="subtitle2" sx={styles.text}>
        {t("selectedLanguage")}
      </Mui.Typography>
      <Mui.Typography variant="subtitle1" sx={styles.title}>
        {" "}
        {t("note")}
      </Mui.Typography>
      <Mui.Typography variant="subtitle2" sx={styles.text}>
        <Mui.ListItem sx={styles.listitem}>
          {t("someWebsiteFeature")}
        </Mui.ListItem>
        <Mui.ListItem sx={styles.listitem}> {t("ifYouChange")}</Mui.ListItem>
      </Mui.Typography>
    </Mui.Box>
  );
};

export default LearnMore;

const styles = {
  text: {
    paddingY: "10px",
    mt: "-10px",
    fontSize: { xs: "16px", sm: "18px" },
  },
  title: {
    color: "primary.main",
    paddingY: "10px",
    fontSize: { xs: "16px", sm: "18px" },
  },
  listitem: {
    display: "list-item",
    paddingY: "10px",
    mt: "-10px",
  },
};

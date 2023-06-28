import { Box, ListItem, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import t from "../assets/translationFiles/accessibilityTranslation";

const Accessibility = () => {
  return (
    <Box sx={{ margin: "20px" }}>
      <Typography variant="subtitle1" sx={styles.title}>
        {t("cellmaAccessibility")}
      </Typography>
      <Typography variant="h2" sx={styles.text}>
        {t("tg1")}
      </Typography>

      <Typography variant="h2" sx={styles.text}>
        {t("tg2")}
        <ListItem sx={styles.listitem}>{t("tg3")}</ListItem>
        <ListItem sx={styles.listitem}>{t("tg4")}</ListItem>
      </Typography>
      <Typography variant="h2" sx={styles.text}>
        {t("tg5")}
      </Typography>
      <Typography variant="subtitle1" sx={styles.title}>
        {t("tg6")}
      </Typography>
      <Typography variant="h2" sx={styles.text}>
        {t("tg7")}
        <ListItem sx={styles.listitem}>{t("tg8")}</ListItem>
        <ListItem sx={styles.listitem}>{t("tg9")}</ListItem>
        <ListItem sx={styles.listitem}>{t("tg10")}</ListItem>
        <ListItem sx={styles.listitem}>{t("tg11")}</ListItem>
        <ListItem sx={styles.listitem}>{t("tg12")}</ListItem>
        <ListItem sx={styles.listitem}>{t("tg13")}</ListItem>
        <ListItem sx={styles.listitem}>{t("tg14")}</ListItem>
        <ListItem sx={styles.listitem}>{t("tg15")}</ListItem>
      </Typography>
      <Typography variant="subtitle1" sx={styles.title}>
        {t("tg16")}
      </Typography>
      <Typography variant="h2" sx={styles.text}>
        {t("tg17")}
      </Typography>
      <Typography variant="h2" sx={styles.text}>
        {t("tg18")}
      </Typography>
      <Typography variant="h2" sx={styles.text}>
        {t("tg19")}
        <ListItem sx={styles.listitem}>{t("tg20")}</ListItem>
        <ListItem sx={styles.listitem}>{t("tg21")}</ListItem>
      </Typography>
      <Typography variant="subtitle1" sx={styles.title}>
        {t("tg22")}
      </Typography>
      <Typography variant="h2" sx={styles.text}>
        {t("tg23")}
        <ListItem sx={styles.listitem}>{t("tg24")}</ListItem>
        <ListItem sx={styles.listitem}>{t("tg25")}</ListItem>
      </Typography>
      <Typography variant="h2" sx={styles.text}>
        {t("tg26")}
      </Typography>
      <Typography variant="h2" sx={styles.text}>
        {t("tg27")}
      </Typography>
      <Typography variant="h2" sx={styles.text}>
        {t("tg28")}{" "}
      </Typography>
    </Box>
  );
};

export default Accessibility;

const styles = {
  text: {
    color: "grey.500",
    padding: "10px",
    mt: "-10px",
  },
  listitem: {
    display: "list-item",
    padding: "10px",
    mt: "-5px",
  },
  title: {
    color: "primary.main",
    padding: "10px",
  },
};

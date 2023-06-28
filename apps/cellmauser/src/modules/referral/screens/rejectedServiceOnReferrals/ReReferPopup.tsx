import * as Mui from "@mui/material";

import * as Common from "../../../../common/CommonComponentsIndex";
import t from "../../assets/translationFiles/rejectedServiceOnReferral";

interface Props {
  handleCancel: any;
  handleSearch: any;
  handleAdd: any;
}
const ReReferPopup: React.FC<Props> = (props) => {
  return (
    <Common.CellmaPopup
      title={t("reRefer")}
      handleCancel={props?.handleCancel}
      fullScreen
    >
      <Mui.Grid container spacing={2} sx={{ px: "20px" }}>
        <Mui.Grid container item>
          <Mui.Grid item xs={12} sx={styles.referralHeader}>
            <Mui.Typography variant="h2">{t("patientDetails")}</Mui.Typography>
          </Mui.Grid>
          <Mui.Grid item xs={3} sx={styles.subtext}>
            <Mui.Typography variant="h2">{t("name")}:</Mui.Typography>
          </Mui.Grid>
          <Mui.Grid item xs={9} sx={styles.subtext}>
            <Mui.Typography variant="h2">ABC Riomed</Mui.Typography>
          </Mui.Grid>
          <Mui.Grid item xs={3} sx={styles.subtext}>
            <Mui.Typography variant="h2">{t("dob")}:</Mui.Typography>
          </Mui.Grid>
          <Mui.Grid item xs={9} sx={styles.subtext}>
            <Mui.Typography variant="h2">20-06-2023</Mui.Typography>
          </Mui.Grid>
        </Mui.Grid>
        <Mui.Grid container item>
          <Mui.Grid item xs={12} sx={styles.referralHeader}>
            <Mui.Typography variant="h2">{t("referralDetails")}</Mui.Typography>
          </Mui.Grid>
          <Mui.Grid item xs={3} sx={styles.subtext}>
            <Mui.Typography variant="h2">{t("referredBy")}:</Mui.Typography>
          </Mui.Grid>
          <Mui.Grid item xs={9} sx={styles.subtext}>
            <Mui.Typography variant="h2">External Clinic</Mui.Typography>
          </Mui.Grid>
          <Mui.Grid item xs={3} sx={styles.subtext}>
            <Mui.Typography variant="h2">
              {t("referredByClinic")}:
            </Mui.Typography>
          </Mui.Grid>
          <Mui.Grid item xs={9} sx={styles.subtext}>
            <Mui.Typography variant="h2">GUM/SRH Service</Mui.Typography>
          </Mui.Grid>
          <Mui.Grid item xs={3} sx={styles.subtext}>
            <Mui.Typography variant="h2">{t("notes")}:</Mui.Typography>
          </Mui.Grid>
          <Mui.Grid item xs={5} sx={styles.subtext}>
            <Common.CellmaInputField multiline label={t("notes")} rows={3} />
          </Mui.Grid>
        </Mui.Grid>
        <Mui.Grid container item>
          <Mui.Grid item xs={12} sx={styles.referralHeader}>
            <Mui.Typography variant="h2">{t("reReferDetails")}</Mui.Typography>
          </Mui.Grid>

          <Mui.Grid item xs={3} sx={styles.subtext}>
            <Mui.Typography variant="h2">
              {t("reason")}
              <Mui.Typography sx={{ color: "warning.dark" }}>*</Mui.Typography>:
            </Mui.Typography>
          </Mui.Grid>
          <Mui.Grid item xs={5} sx={styles.subtext}>
            <Common.CellmaInputField
              multiline
              label={t("reason")}
              required
              rows={3}
            />
          </Mui.Grid>
        </Mui.Grid>
        <Mui.Grid
          container
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "flex-end" }}
          spacing={2}
        >
          <Mui.Grid item>
            <Common.CellmaButton
              label={t("save")}
              onClick={props.handleSearch}
            />
          </Mui.Grid>
          <Mui.Grid item>
            <Common.CellmaButton
              label={t("addNewReferral")}
              onClick={props.handleAdd}
            />
          </Mui.Grid>
        </Mui.Grid>
      </Mui.Grid>
    </Common.CellmaPopup>
  );
};

export default ReReferPopup;

export const styles = {
  referralHeader: {
    backgroundColor: "primary.light",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    p: "5px",
  },
  subtext: {
    p: "5px",
  },
};

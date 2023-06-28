import * as Mui from "@mui/material";
import { useDispatch } from "react-redux";

import * as Common from "../../../../common/CommonComponentsIndex";
import { setSnackbar } from "../../../../store/SnackbarAction";
import t from "../../assets/translationFiles/addReferralTranslation";

export const GridItem1 = (props: any) => {
  return (
    <Mui.Grid item xs={3}>
      <Mui.Typography variant="h4">{props.children}</Mui.Typography>
    </Mui.Grid>
  );
};

export const GridItem2 = (props: any) => {
  return (
    <Mui.Grid item xs={8}>
      <Mui.Typography variant="h5">{props.children}</Mui.Typography>
    </Mui.Grid>
  );
};
const RejectReferralPopup = (props: any) => {
  const dispatch = useDispatch();

  return (
    <Common.CellmaPopup
      title={t("rejectReferral")}
      handleCancel={props.handleCancel}
      fullScreen
    >
      <Mui.Grid container sx={{ p: "10px" }} gap={1}>
        <Mui.Grid container item>
          <Mui.Grid item xs={12} sx={styles.referralHeader}>
            <Mui.Typography variant="h2">{t("patient")}</Mui.Typography>
          </Mui.Grid>
          <Mui.Grid item container xs={12} sx={{ p: "5px" }} spacing={1}>
            <GridItem1>{t("name")}:</GridItem1>
            <GridItem2>M N Kale</GridItem2>
            <GridItem1>{t("dob")}:</GridItem1>
            <GridItem2>17/04/1997</GridItem2>
          </Mui.Grid>
        </Mui.Grid>
        <Mui.Grid container item>
          <Mui.Grid item xs={12} sx={styles.referralHeader}>
            <Mui.Typography variant="h2">{t("referral")}</Mui.Typography>
          </Mui.Grid>
          <Mui.Grid item container xs={12} sx={{ p: "5px" }} spacing={1}>
            <GridItem1>{t("referredBy")}:</GridItem1>
            <GridItem2> Nik</GridItem2>
            <GridItem1>{t("referredByClinic")}:</GridItem1>
            <GridItem2>General Med</GridItem2>
            <GridItem1>{t("appointmentNotes")}:</GridItem1>
            <GridItem2>
              <Common.CellmaInputField
                label={t("appointmentNotes")}
                multiline
                rows={3}
              />
            </GridItem2>
          </Mui.Grid>
        </Mui.Grid>
        <Mui.Grid container item>
          <Mui.Grid item xs={12} sx={styles.referralHeader}>
            <Mui.Typography variant="h2">
              {t("referredToDetails")}
            </Mui.Typography>
          </Mui.Grid>
          <Mui.Grid item container xs={12} sx={{ p: "5px" }} spacing={1}>
            <GridItem1>
              {t("reason")}
              <Mui.Typography sx={{ color: "warning.dark" }}>*</Mui.Typography>:
            </GridItem1>
            <GridItem2>
              <Common.CellmaInputField
                label={t("reason")}
                required
                multiline
                rows={3}
              />
            </GridItem2>
          </Mui.Grid>
        </Mui.Grid>
        <Mui.Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Common.CellmaButton
            label={t("reject")}
            onClick={() => {
              dispatch(
                setSnackbar(
                  true,
                  "success",
                  t("referralRejectedSuccessfully"),
                  4
                )
              );
              props?.handleCancel();
            }}
          />
        </Mui.Grid>
      </Mui.Grid>
    </Common.CellmaPopup>
  );
};

export default RejectReferralPopup;

export const styles = {
  referralHeader: {
    backgroundColor: "primary.light",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "5px",
  },
};

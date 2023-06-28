import * as Mui from "@mui/material";

import * as Common from "../../../../common/CommonComponentsIndex";
import * as dummyData from "../../assets/dummyData/addReferralDummyData";
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
const ViewDetailsPopup = (props: any) => {
  return (
    <Common.CellmaPopup
      title={t("viewDetails")}
      handleCancel={props.handleCancel}
      fullScreen
    >
      <Mui.Grid container sx={{ p: "10px" }} gap={1}>
        <Mui.Grid container item>
          <Mui.Grid item xs={12} sx={styles.referralHeader}>
            <Mui.Typography variant="h2">{t("patientDetails")}</Mui.Typography>
          </Mui.Grid>
          <Mui.Grid item container xs={12} sx={{ p: "5px" }}>
            <GridItem1>{t("name")}:</GridItem1>
            <GridItem2>M N Kale</GridItem2>
            <GridItem1>{t("dob")}:</GridItem1>
            <GridItem2>17/04/1997</GridItem2>
            <GridItem1>{t("gender")}:</GridItem1>
            <GridItem2>Female</GridItem2>
            <GridItem1>{t("nhsRef")}:</GridItem1>
            <GridItem2>14521452</GridItem2>
            <GridItem1>{t("hospitalRef")}:</GridItem1>
            <GridItem2>KOP </GridItem2>
            <GridItem1>{t("payrollNo")}:</GridItem1>
            <GridItem2>166</GridItem2>
            <GridItem1>{t("patientCare")}:</GridItem1>
            <GridItem2>Outpatient</GridItem2>
            <GridItem1>{t("notes")}:</GridItem1>
            <GridItem2>Testing</GridItem2>
          </Mui.Grid>
        </Mui.Grid>
        <Mui.Grid container item>
          <Mui.Grid item xs={12} sx={styles.referralHeader}>
            <Mui.Typography variant="h2">{t("referrerDetails")}</Mui.Typography>
          </Mui.Grid>
          <Mui.Grid item container xs={12} sx={{ p: "5px" }}>
            <GridItem1>{t("serviceReferredBy")}:</GridItem1>
            <GridItem2>General Med</GridItem2>
            <GridItem1>{t("referredBy")}:</GridItem1>
            <GridItem2>Nikhil K</GridItem2>
            <GridItem1>{t("referredByProfession")}:</GridItem1>
            <GridItem2>Doctor</GridItem2>
            <GridItem1>{t("referredBySpeciality")}:</GridItem1>
            <GridItem2>Oncologist</GridItem2>
            <GridItem1>{t("referredByEmailAddress")}:</GridItem1>
            <GridItem2>Nsk@gm.com </GridItem2>
            <GridItem1>{t("referredByPhoneOrMobile")}:</GridItem1>
            <GridItem2>2018135098</GridItem2>
          </Mui.Grid>
        </Mui.Grid>
        <Mui.Grid container item>
          <Mui.Grid item xs={12} sx={styles.referralHeader}>
            <Mui.Typography variant="h2">
              {t("referredToDetails")}
            </Mui.Typography>
          </Mui.Grid>
          <Mui.Grid item container xs={12} sx={{ p: "5px" }}>
            <GridItem1>{t("referredToHP")}:</GridItem1>
            <GridItem2>Dr.Emma Hopper</GridItem2>
            <GridItem1>{t("consultant")}:</GridItem1>
            <GridItem2>-</GridItem2>
            <GridItem1>{t("referralReasons")}:</GridItem1>
            <GridItem2>Any class</GridItem2>
            <GridItem1>{t("rejectedReasons")}:</GridItem1>
            <GridItem2>Not Available</GridItem2>
          </Mui.Grid>
        </Mui.Grid>
      </Mui.Grid>
    </Common.CellmaPopup>
  );
};

export default ViewDetailsPopup;

export const styles = {
  referralHeader: {
    backgroundColor: "primary.light",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "5px",
  },
};

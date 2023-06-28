import * as Mui from "@mui/material";

import * as Common from "../../../../common/CommonComponentsIndex";
import t from "../../assets/translationFiles/addReferralTranslation";

const ViewAssessmentPopup = (props: any) => {
  return (
    <Common.CellmaPopup
      title={t("viewAssessment")}
      handleCancel={props.handleCancel}
    >
      <Mui.Grid container sx={styles.popupGridContainer}>
        <Mui.Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          {t("triageAssessment")}
        </Mui.Grid>
        <Mui.Grid item container xs={12} rowGap={2} padding={1} sx={styles.box}>
          <Mui.Grid item xs={9} sx={styles.questions}>
            1.How often do you exercise?
          </Mui.Grid>
          <Mui.Grid item xs={3} sx={styles.answer}>
            Daily
          </Mui.Grid>
          <Mui.Grid item xs={9} sx={styles.questions}>
            2.Have you had any heart surgeries in past?
          </Mui.Grid>
          <Mui.Grid item xs={3} sx={styles.answer}>
            No
          </Mui.Grid>
          <Mui.Grid item xs={9} sx={styles.questions}>
            3.Are you currently in any pain?
          </Mui.Grid>
          <Mui.Grid item xs={3} sx={styles.answer}>
            No
          </Mui.Grid>
        </Mui.Grid>
      </Mui.Grid>
    </Common.CellmaPopup>
  );
};

export default ViewAssessmentPopup;

export const styles = {
  popupGridContainer: {
    justifyContent: "center",
    justifyItems: "center",
    paddingY: "10px",
    paddingX: "35px",
  },

  box: {
    display: "flex",
    border: 1,
    borderColor: "grey.200",
    boxShadow: 2,
    m: "15px",
  },
  questions: { color: "grey.600" },
  answer: { color: "primary.main" },
};

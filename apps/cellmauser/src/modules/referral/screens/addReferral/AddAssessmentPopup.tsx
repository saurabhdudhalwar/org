import * as Mui from "@mui/material";

import * as Common from "../../../../common/CommonComponentsIndex";
import * as dummyData from "../../assets/dummyData/addReferralDummyData";
import t from "../../assets/translationFiles/addReferralTranslation";

const AddAssessmentPopup = (props: any) => {
  return (
    <Common.CellmaPopup
      title={t("selectAssessment")}
      handleCancel={props.handleCancel}
    >
      <Mui.Grid container spacing={1} sx={styles.popupGridContainer}>
        <Mui.Grid item xs={12} sx={{ justifyContent: "center" }}>
          <Common.CellmaAutoSelectField
            label={t("assessment")}
            dummyData
            options={dummyData.ASSESSMENT}
            getOptionLabel={(assessment: any) => assessment.label}
            renderOption={(assessmentProps: any, assessment: any) => (
              <li {...assessmentProps}>{assessment.label}</li>
            )}
          />
        </Mui.Grid>
        <Mui.Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Common.CellmaButton label={t("show")} onClick={props.handleCancel} />
        </Mui.Grid>
      </Mui.Grid>
    </Common.CellmaPopup>
  );
};

export default AddAssessmentPopup;

export const styles = {
  popupGridContainer: {
    justifyContent: "center",
    justifyItems: "center",
    paddingY: "15px",
    paddingX: "35px",
  },
};

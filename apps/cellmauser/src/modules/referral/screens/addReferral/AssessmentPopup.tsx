import { useState } from "react";

import * as Mui from "@mui/material";

import * as Common from "../../../../common/CommonComponentsIndex";
import * as dummyData from "../../assets/dummyData/addReferralDummyData";
import t from "../../assets/translationFiles/addReferralTranslation";

const AssessmentPopup = (props: any) => {
  const [showAssessment, setShowAssessment] = useState(null);

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
            renderOption={(props: any, assessment: any) => (
              <li {...props}>{assessment.label}</li>
            )}
            onChange={(event: any) => {
              setShowAssessment(event.target.value);
            }}
          />
        </Mui.Grid>
        <Mui.Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Common.CellmaButton
            tooltipTitle="Next Page is under Construction"
            label={t("show")}
            disabled={showAssessment === null}
          />
        </Mui.Grid>
      </Mui.Grid>
    </Common.CellmaPopup>
  );
};

export default AssessmentPopup;

export const styles = {
  popupGridContainer: {
    justifyContent: "center",
    justifyItems: "center",
    paddingY: "15px",
    paddingX: "35px",
  },
  popupButton: {
    display: "flex",
    justifyContent: "flex-end",
    marginX: "20px",
  },
  divider: {
    borderRightWidth: 2,
    minHeight: "15px",
  },
};

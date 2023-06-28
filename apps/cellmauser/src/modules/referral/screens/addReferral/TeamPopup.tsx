import * as Mui from "@mui/material";

import * as Common from "../../../../common/CommonComponentsIndex";
import * as dummyData from "../../assets/dummyData/addReferralDummyData";
import t from "../../assets/translationFiles/addReferralTranslation";

const TeamPopup = (props: any) => {
  return (
    <Common.CellmaPopup title={t("team")} handleCancel={props.handleCancel}>
      <Mui.Grid container spacing={1} sx={styles.popupGridContainer}>
        <Mui.Grid item xs={12} sx={{ justifyContent: "center" }}>
          <Common.CellmaAutoSelectField
            label={t("team")}
            ariaLabel="teamPopupInput"
            dummyData
            options={dummyData.TEAM}
            getOptionLabel={(team: any) => team.label}
            renderOption={(teamProps: any, team: any) => (
              <li {...teamProps}>{team.label}</li>
            )}
          />
        </Mui.Grid>
        <Mui.Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Common.CellmaButton label={t("save")} onClick={props.handleCancel} />
        </Mui.Grid>
      </Mui.Grid>
    </Common.CellmaPopup>
  );
};

export default TeamPopup;

export const styles = {
  popupGridContainer: {
    justifyContent: "center",
    justifyItems: "center",
    paddingY: "15px",
    paddingX: "35px",
  },
};

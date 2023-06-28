import * as Mui from "@mui/material";

import * as Common from "../../../../common/CommonComponentsIndex";
import ContactTypeScreen from "../../../patient/screens/patientDemographics/ContactTypeScreen";
import t from "../../assets/translationFiles/addReferralTranslation";

const SelectContactTypePopup = (props: any) => {
  return (
    <Common.CellmaPopup
      title={t("patientSummary")}
      handleCancel={props.handleCancel}
      fullScreen
    >
      <Mui.Grid sx={{ p: "10px" }}>
        <ContactTypeScreen onContactTypeSelect={props.handleCancel} />
      </Mui.Grid>
    </Common.CellmaPopup>
  );
};

export default SelectContactTypePopup;

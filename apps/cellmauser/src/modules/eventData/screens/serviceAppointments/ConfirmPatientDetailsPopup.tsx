import React from "react";

import * as Mui from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import * as Common from "../../../../common/CommonComponentsIndex";
import { setSnackbar } from "../../../../store/SnackbarAction";
import ExistingPatientDetails from "../../../patient/screens/existingPatientDetails/ExistingPatientDetails";
import t from "../../assets/translationFiles/serviceAppointmentTranslation";

interface Props {
  handleCancel: any;
}
const ConfirmPatientDetailsPopup: React.FC<Props> = (props: any) => {
  const dispatch = useDispatch();
  return (
    <Mui.Backdrop open>
      <Common.CellmaPopup
        title={t("confirmPatientDetails")}
        fullScreen
        handleCancel={() => props.handleCancel()}
      >
        <Mui.Grid container padding={2}>
          <Mui.Grid item>
            <ExistingPatientDetails
              onConfirm={() => {
                dispatch(
                  setSnackbar(true, "success", t("patientDetailsConfirmed"), 4)
                );
                props.handleCancel();
              }}
            />
          </Mui.Grid>
        </Mui.Grid>
      </Common.CellmaPopup>
    </Mui.Backdrop>
  );
};

export default ConfirmPatientDetailsPopup;

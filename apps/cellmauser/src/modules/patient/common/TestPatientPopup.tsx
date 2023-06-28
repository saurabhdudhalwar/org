import React, { useState } from "react";

import * as Mui from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import * as Common from "../../../common/CommonComponentsIndex";
import useUpdateTestPatient from "../api/useTestPatient";
import * as dummyData from "../assets/dummyData/deathPatientDummyData";
import translate from "../assets/translationFiles/commonPatientTranslation";
import { setIsContactTypeSelected } from "../store/PatientAction";

interface Props {
  handleClose: any;
}

const TestPatientPopup: React.FC<Props> = (props: any) => {
  const { patientId } = useSelector((state: any) => state.patient);

  const [patientTestValue, setPatientTestValue] = useState("");
  const { language } = useSelector((state: any) => state.language);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mutate: updateTestPatient } = useUpdateTestPatient();

  // handler for set the patient test value
  const handlePatientTest = (event: any) => {
    event.target.value === "yes"
      ? setPatientTestValue("yes")
      : setPatientTestValue("no");
  };

  return (
    <Mui.Box>
      <Mui.Backdrop open>
        <Common.CellmaPopup
          title={translate("testPatient", language)}
          handleCancel={props?.handleClose}
        >
          <Mui.Box>
            <Mui.Grid container spacing={3} sx={styles.popupGridContainer}>
              <Mui.Grid item xs={12}>
                <Mui.Typography
                  variant="h2"
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  {translate("markTest", language)}
                </Mui.Typography>
              </Mui.Grid>
              <Mui.Grid item xs={12} sm={7}>
                <Common.CellmaSelectField
                  label={translate("testPatient", language)}
                  value={patientTestValue}
                  changeevent={(event: any) => handlePatientTest(event)}
                  list={dummyData.PATIENT_MARK.map((patientWeb: any) => (
                    <Mui.MenuItem
                      key={patientWeb.id}
                      value={patientWeb.name}
                      sx={{ whiteSpace: "unset" }}
                    >
                      {translate(`${patientWeb.name}`, language)}
                    </Mui.MenuItem>
                  ))}
                />
              </Mui.Grid>
              <Mui.Grid item xs={12} sm={11}>
                {patientTestValue === "yes" && (
                  <Mui.Typography
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      color: "primary.main",
                    }}
                  >
                    {translate("note", language)}
                  </Mui.Typography>
                )}
              </Mui.Grid>
            </Mui.Grid>
            <Mui.Grid container item xs={12}>
              <Mui.Grid item xs={12} sx={styles.popupButton}>
                <Common.CellmaButton
                  label={translate("set", language)}
                  type="submit"
                  onClick={() => {
                    patientTestValue === "yes" && updateTestPatient(patientId);
                    props?.handleClose();
                    dispatch(setIsContactTypeSelected(true));
                    navigate("/cellmaUser/patient/contactTypeScreen");
                  }}
                />
              </Mui.Grid>
            </Mui.Grid>
          </Mui.Box>
        </Common.CellmaPopup>
      </Mui.Backdrop>
    </Mui.Box>
  );
};

export default TestPatientPopup;

export const styles = {
  popupGridContainer: {
    height: { xs: "300px", sm: "200px" },
    width: { xs: "100px", sm: "550px" },
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
};

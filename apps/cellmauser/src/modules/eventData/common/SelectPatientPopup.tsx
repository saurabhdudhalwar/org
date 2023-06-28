import React, { useEffect, useState } from "react";

import * as Mui from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import * as Common from "../../../common/CommonComponentsIndex";
import PatientLinks from "../../patient/common/PatientLinks";
import ExistingPatientDetails from "../../patient/screens/existingPatientDetails/ExistingPatientDetails";
import PatientInputFieldGroup from "../../patient/screens/patientSearch/PatientInputFieldGroup";
import PatientListTable from "../../patient/screens/patientSearch/PatientListTable";
import { DUMMY_PATIENT_LIST } from "../assets/dummyData/ServiceBookAppointmentDummyData";
import t from "../assets/translationFiles/ServiceBookAppointmentTranslation";
import { setActiveScreenName } from "../../patient/store/PatientAction";

export const SelectPatientPopup = (props: any) => {
  const [listCount, setListCount] = useState(20);
  const [isPatientSearched, setIsPatientSearched] = useState(false);
  const [isPatientSelected, setIsPatientSelected] = useState(false);
  const [informationMessages, setInformationMessages] = useState<any>([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActiveScreenName("patientSearchScreen"));
  }, []);

  const navigate = useNavigate();

  // Function for find patient list
  const searchPatientHandler = (
    patientsList: any,
    // listCount: any,
    showCellmaTable: boolean
  ) => {
    setListCount(listCount);
    if (patientsList !== undefined) {
      showCellmaTable && setIsPatientSearched(true);
    }
  };
  return (
    <Mui.Backdrop open>
      <Common.CellmaPopup
        fullScreen
        title={!isPatientSelected ? t("findPatient") : t("patientDetails")}
        handleCancel={() => {
          props.handleClose();
        }}
      >
        <Mui.Grid container sx={styles.popupGridContainer}>
          <Mui.Grid
            item
            container
            xs={12}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Mui.Grid item sx={{ minWidth: "100px" }}>
              {!isPatientSelected && (
                <Mui.Typography variant="subtitle1">
                  {t("findPatient")}
                </Mui.Typography>
              )}
              {isPatientSelected && (
                <Mui.Typography variant="subtitle1">
                  {t("patientDetails")}
                </Mui.Typography>
              )}
            </Mui.Grid>

            <Mui.Grid item sx={{ ml: "10px" }}>
              <PatientLinks />
            </Mui.Grid>
          </Mui.Grid>
          {!isPatientSelected && (
            <>
              <Mui.Grid item xs={12}>
                <PatientInputFieldGroup
                  onAddPatient={() => {}}
                  handleSearch={searchPatientHandler}
                  setBtnVisible={() => {}}
                />
              </Mui.Grid>
              {!isPatientSelected && isPatientSearched && (
                <Mui.Grid item xs={12} sx={{ padding: "10px" }}>
                  <PatientListTable
                    patientsList={[]}
                    listCount={listCount}
                    onClick={() => {
                      setIsPatientSelected(true);
                    }}
                  />
                </Mui.Grid>
              )}
            </>
          )}
          {isPatientSelected && (
            <Mui.Grid item xs={12}>
              <ExistingPatientDetails
                informationMessages={informationMessages}
                onConfirm={() => {}}
              />
            </Mui.Grid>
          )}
        </Mui.Grid>
      </Common.CellmaPopup>
    </Mui.Backdrop>
  );
};

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
};

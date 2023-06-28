// Page Name : "patientSearch"
// Page Id : "c4eve1"

import { useEffect, useState } from "react";

import * as Mui from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";

import translate from "../../../patient/assets/translationFiles/patientSearchTranslation";
import ExistingPatientDetails from "../../../patient/screens/existingPatientDetails/ExistingPatientDetails";
import PatientInputFieldGroup from "../../../patient/screens/patientSearch/PatientInputFieldGroup";
import PatientListTable from "../../../patient/screens/patientSearch/PatientListTable";
import { DUMMY_PATIENT_LIST } from "../../assets/dummyData/ServiceBookAppointmentDummyData";
import {
  setActiveScreenName,
  setIsUseSpecialtyAndRegionSetting,
} from "../../store/EventDataAction";

const PatientList = () => {
  const [isPatient, setIsPatient] = useState(false);
  const [listCount, setListCount] = useState(20);
  const [isPatientSearched, setIsPatientSearched] = useState(false);
  const [informationMessages, setInformationMessages] = useState<any>([]);
  const [isSearched, setIsSearched] = useState(false);
  const { isPatientSelected } = useSelector((state: any) => state.patient); // This variable call from patient domain
  const { language } = useSelector((state: any) => state.language);
  const { setTitle, setIsLink, setIsLeftOutlinedIcon, setScreenName,setSelectDateAndHp } =
    useOutletContext() as any; // <-- access context value

  const { isUseSpecialtyAndRegionSetting } = useSelector(
    (state: any) => state.eventDataReducer
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setTitle(translate("findPatient", language));
    setIsLink(true);
    setIsLeftOutlinedIcon(true);
    setScreenName("");
    setSelectDateAndHp(true)
    dispatch(setActiveScreenName("scheduledPatientAppointmentScreen"));
    // eslint-disable-next-line
  }, [language, isPatientSelected]);

  // Function for find patient list
  const searchPatientHandler = (
    patientsList: any,
    listCount: any,
    showCellmaTable: boolean
  ) => {
    setListCount(listCount);
    if (patientsList !== undefined && showCellmaTable) setIsSearched(true);
    showCellmaTable && setIsPatientSearched(true);
  };
  return (
    <Mui.Grid container>
      {!isPatient && (
        <Mui.Grid item xs={12}>
          <PatientInputFieldGroup
            onAddPatient={() => {}}
            handleSearch={searchPatientHandler}
            setBtnVisible={() => {}}
          />
        </Mui.Grid>
      )}
      {!isPatient && isPatientSearched && (
        <Mui.Grid item xs={12}>
          <PatientListTable
            patientsList={DUMMY_PATIENT_LIST}
            listCount={listCount}
            onClick={() => {
              setIsPatient(true);
            }}
          />
        </Mui.Grid>
      )}
      {isPatient && (
        <ExistingPatientDetails
          informationMessages={informationMessages}
          onConfirm={() =>
            navigate("/cellmaUser/eventData/serviceBookAppointment")
          }
        />
      )}
    </Mui.Grid>
  );
};

export default PatientList;

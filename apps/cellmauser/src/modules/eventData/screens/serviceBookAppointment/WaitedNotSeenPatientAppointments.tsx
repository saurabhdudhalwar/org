// Page Name : "waitedNotSeenPatientAppointments"
// Page Id : "c4eve8"

import { useEffect } from "react";

import * as Mui from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";

import PatientAppointmentTable from "./PatientAppointmentTable";
import * as dummyData from "../../assets/dummyData/ServiceBookAppointmentDummyData";
import t from "../../assets/translationFiles/ServiceBookAppointmentTranslation";
import { setActiveScreenName } from "../../store/EventDataAction";

const WaitedNotSeenPatientAppointments = () => {
  const { language } = useSelector((state: any) => state.language);
  const { setTitle, setIsLink, setSelectDateAndHp, setScreenName } =
    useOutletContext() as any; // <-- access context value
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
    setTitle(t("wns"));
    setIsLink(true);
    setScreenName("");
    setSelectDateAndHp(false);
    dispatch(setActiveScreenName("wnsPatientAppointmentScreen"));
    // eslint-disable-next-line
  }, [language]);
  return (
    <Mui.Grid container>
      <Mui.Grid item xs={12}>
        <PatientAppointmentTable
          rows={dummyData.ROWS}
          noRecordsMessage={t("noWNSAppointment")}
          screenName="wns"
        />
      </Mui.Grid>
    </Mui.Grid>
  );
};

export default WaitedNotSeenPatientAppointments;

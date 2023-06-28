// Page Name : "scheduledPatientAppointments"
// Page Id : "c4eve3"

import { useEffect } from "react";

import * as Mui from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";

import PatientAppointmentTable from "./PatientAppointmentTable";
import * as Common from "../../../../common/CommonComponentsIndex";
import { setIsUnderConstruction } from "../../../../store/CommonAction";
import * as dummyData from "../../assets/dummyData/ServiceBookAppointmentDummyData";
import t from "../../assets/translationFiles/ServiceBookAppointmentTranslation";
import { setActiveScreenName } from "../../store/EventDataAction";

export const ScheduledPatientAppointments = () => {
  const { language } = useSelector((state: any) => state.language);
  const { setTitle, setIsLink, setSelectDateAndHp, setScreenName } =
    useOutletContext() as any; // <-- access context value
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    setTitle(t("scheduledPatientAppointment"));
    setIsLink(true);
    setScreenName("");
    setSelectDateAndHp(false);
    dispatch(setActiveScreenName("scheduledPatientAppointmentScreen"));
    // eslint-disable-next-line
  }, [language]);

  return (
    <Mui.Grid container>
      <Mui.Grid item xs={12}>
        <PatientAppointmentTable
          rows={dummyData.ROWS}
          noRecordsMessage={t("noRecordsFound")}
          screenName="scheduledPatientAppointment"
        />
      </Mui.Grid>
      <Mui.Grid
        item
        xs={12}
        sx={{ display: "flex", justifyContent: "flex-end" }}
      >
        <Mui.FormControlLabel
          control={<Mui.Checkbox name="checkbox" />}
          label={t("selectAll")}
        />
      </Mui.Grid>
      <Mui.Grid
        item
        xs={12}
        sx={{ display: "flex", justifyContent: "flex-end" }}
      >
        <Common.CellmaButton
          label={t("generateMultipleLetter")}
          onClick={() => {
            dispatch(setIsUnderConstruction(true));
          }}
        />
      </Mui.Grid>
    </Mui.Grid>
  );
};

export const styles = {
  avatar: { height: "24px", width: "24px" },
  icon: { display: "flex", justifyContent: "center", width: "100%" },
  linkStyle: {
    display: "flex",
    justifyContent: "flex-start",
    width: "100%",
  },
  iconStyle: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
};

// Page Name : "serviceHPAppointments"
// Page Id : "c4eve5"

import { useEffect, useState } from "react";

import * as Mui from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";

import DeleteServiceHPRecord from "./DeleteServiceHPRecord";
import DurationModifierPopup from "./DurationModifierPopup";
import SelectHPPopup from "./SelectHPPopup";
import ServiceHPAppointmentsInputFieldGroup from "./ServiceHPAppointmentsInputFieldGroup";
import ServiceHPAppointmentsTable from "./ServiceHPAppointmentTable";
import t from "../../assets/translationFiles/serviceHPAppointmentTranslation";

const ServiceHPAppointments = () => {
  const [isShowTable, setIsShowTable] = useState(false);
  const [isDurationPopup, setIsDurationPopup] = useState(false);
  const [isSelectHPPopup, setIsSelectHPPopup] = useState(false);
  const [hpClinicScheduledMode, setHPClinicScheduledMode] = useState("add");
  const [deleteHPClinicSchedulePopup, setDeleteHPClinicSchedulePopup] =
    useState(false);
  const language = useSelector((state: any) => state.language)

  const dispatch = useDispatch();

  const {
    setTitle,
    setIsLink,
    setSelectDateAndHp,
    setScreenName,
    setDrawerName,
  } = useOutletContext() as any;

  useEffect(() => {
    window.scrollTo(0, 0);
    setTitle(t("serviceHPAppointments"));
    setDrawerName("serviceAppointments");
    setIsLink(true);
    setScreenName("");
    setSelectDateAndHp(false);
  },[language]);

  return (
    <Mui.Grid container spacing={2}>
      <Mui.Grid item xs={12}>
        <ServiceHPAppointmentsInputFieldGroup
          handleAdd={() => setIsShowTable(true)}
          openDurationPopup={() => setIsDurationPopup(true)}
          hpClinicScheduledMode={hpClinicScheduledMode}
          handleSave={() => setHPClinicScheduledMode("add")}
        />
      </Mui.Grid>
      <Mui.Grid item xs={12}>
        {isShowTable && (
          <ServiceHPAppointmentsTable
            openDurationPopup={() => setIsDurationPopup(true)}
            openSelectHPPopup={() => setIsSelectHPPopup(true)}
            handleEdit={() => setHPClinicScheduledMode("edit")}
            handleDelete={() => setDeleteHPClinicSchedulePopup(true)}
          />
        )}
      </Mui.Grid>
      <Mui.Grid item xs={12}>
        {isDurationPopup && (
          <DurationModifierPopup
            handleCancel={() => setIsDurationPopup(false)}
          />
        )}
      </Mui.Grid>
      <Mui.Grid item xs={12}>
        {isSelectHPPopup && (
          <SelectHPPopup
            handleCancel={() => setIsSelectHPPopup(false)}
            handleSave={() => setIsSelectHPPopup(false)}
          />
        )}
      </Mui.Grid>
      {deleteHPClinicSchedulePopup && (
        <DeleteServiceHPRecord
          handleCancel={() => setDeleteHPClinicSchedulePopup(false)}
        />
      )}
    </Mui.Grid>
  );
};

export default ServiceHPAppointments;

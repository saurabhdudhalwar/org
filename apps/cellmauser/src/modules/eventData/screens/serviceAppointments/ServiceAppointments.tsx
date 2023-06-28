// Page Name : "serviceAppointments"
// Page Id : "c4eve4"

import { useEffect, useState } from "react";

import * as Mui from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";

import AppointmentsInputFieldGroup from "./AppointmentsInputFieldGroup";
import { ServiceAppointmentExportList } from "./ServiceAppointmentExportList";
import ServiceAppointmentsTable from "./ServiceAppointmentsTable";
import * as Common from "../../../../common/CommonComponentsIndex";
import {
  setIsDrawerOpen,
  setIsUnderConstruction,
} from "../../../../store/CommonAction";
import { openInNewTab } from "../../../../utils/GeneralUtils";
import t from "../../assets/translationFiles/serviceAppointmentTranslation";
import { setActiveScreenName } from "../../store/EventDataAction";

const ServiceAppointments = () => {
  const [isServiceAppointmentsSearched, setIsServiceAppointmentsSearched] =
    useState(false);

  const [isExport, setIsExport] = useState(false);
  const language = useSelector((state: any) => state.language);
  const dispatch = useDispatch();

  const {
    setTitle,
    setIsLink,
    setSelectDateAndHp,
    setScreenName,
    setDrawerName,
  } = useOutletContext() as any;

  useEffect(() => {
    dispatch(setIsDrawerOpen(true));
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setTitle(t("serviceAppointments"));
    setDrawerName("serviceAppointments");
    setIsLink(true);
    setScreenName("");
    setSelectDateAndHp(false);
    dispatch(setActiveScreenName("serviceAppointmentsScreen"));
  }, [language]);

  useEffect(() => {
    dispatch(setIsDrawerOpen(true));
  }, []);

  return (
    <Mui.Grid item container spacing={3}>
      <Mui.Grid item xs={12}>
        <AppointmentsInputFieldGroup
          handleTable={() => setIsServiceAppointmentsSearched(true)}
        />
      </Mui.Grid>
      {isServiceAppointmentsSearched && (
        <Mui.Grid item container xs={12}>
          <Mui.Grid item xs={12}>
            <ServiceAppointmentsTable />
          </Mui.Grid>
          <Mui.Grid item xs={4} sx={styles.alignButton}>
            <Common.CellmaButton
              label={t("print")}
              onClick={() =>
                openInNewTab(
                  "/cellmaUser/printServiceAppointmentsTable",
                  "PrintServiceAppointmentsTable",
                  1200,
                  445
                )
              }
            />
            <Common.CellmaButton
              label={t("exportList")}
              onClick={() => {
                setIsExport(true);
              }}
            />
          </Mui.Grid>
          <Mui.Grid
            item
            xs={8}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Common.CellmaButton
              label={t("addToWorklist")}
              onClick={() => dispatch(setIsUnderConstruction(true))}
            />
          </Mui.Grid>
        </Mui.Grid>
      )}
      {isExport && (
        <Mui.Grid item xs={12}>
          <ServiceAppointmentExportList appointmentTypePopUp="serviceAppointments"
            handleCancel={() => {
              setIsExport(false);
            }}
          />
        </Mui.Grid>
      )}
    </Mui.Grid>
  );
};

export default ServiceAppointments;

const styles = {
  alignButton: { display: "flex", alignItems: "center", gap: 2 },
};

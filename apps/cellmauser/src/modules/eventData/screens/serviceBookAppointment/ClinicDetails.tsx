import React, { useEffect, useState } from "react";

import * as Mui from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import ClinicLocation from "./ClinicLocation";
import ClinicType from "./ClinicType";
import HealthProfessional from "./HealthProfessional";
import * as Common from "../../../../common/CommonComponentsIndex";
import t from "../../assets/translationFiles/ServiceBookAppointmentTranslation";
import { setIsNextAvailableAppointment } from "../../store/EventDataAction";

interface Props {
  handleStep: any;
  handlerClinicLocation: any;
  handlerClinicType: any;
  handleHealthProfessional: any;
  handlerShowClinicType: any;
  handlerShowClinicLocation: any;
  handlerNextButton: any;
}

const ClinicDetails: React.FC<Props> = (props: any) => {
  const [isClinicType, setIsClinicType] = useState(true);
  const [isClinicLocation, setIsClinicLocation] = useState(false);
  const [isHealthProfessional, setIsHealthProfessional] = useState(false);

  const [isShowClinicType, setIsShowClinicType] = useState(false);
  const [isShowClinicLocation, setIsShowClinicLocation] = useState(false);

  const [isNextButtonEnabled, setIsNextButtonEnabled] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <Mui.Grid container spacing={2}>
      <Mui.Grid item xs={12}>
        <Mui.Typography variant="h2">
          {t("service")}: GUM/SRH Service
        </Mui.Typography>
      </Mui.Grid>
      {isShowClinicType && (
        <Mui.Grid item xs={4}>
          <Mui.Typography variant="h2">{t("clinicType")}: F2F</Mui.Typography>
        </Mui.Grid>
      )}
      {isShowClinicLocation && (
        <Mui.Grid item xs={4}>
          <Mui.Typography variant="h2">
            {t("clinicLocation")}: Archway Center
          </Mui.Typography>
        </Mui.Grid>
      )}
      {isClinicType && (
        <Mui.Grid item container>
          <ClinicType
            handlerClinicType={() => setIsClinicType(false)}
            handlerClinicLocation={() => setIsClinicLocation(true)}
            handlerShowClinicType={() => setIsShowClinicType(true)}
          />
        </Mui.Grid>
      )}
      {isClinicLocation && (
        <Mui.Grid item container>
          <ClinicLocation
            handlerClinicLocation={() => setIsClinicLocation(false)}
            handleHealthProfessional={() => setIsHealthProfessional(true)}
            handlerShowClinicLocation={() => setIsShowClinicLocation(true)}
          />
        </Mui.Grid>
      )}
      {isHealthProfessional && (
        <Mui.Grid item container>
          <HealthProfessional
            handlerNextButton={() => setIsNextButtonEnabled(false)}
          />
        </Mui.Grid>
      )}
      <Mui.Grid
        item
        xs={12}
        sx={{ display: "flex", justifyContent: "flex-end" }}
        gap={2}
      >
        <Common.CellmaButton
          label={t("back")}
          onClick={() => {
            if (isClinicLocation) {
              setIsNextButtonEnabled(true);
              setIsClinicLocation(false);
              setIsClinicType(true);
              setIsShowClinicType(false);
            } else if (isHealthProfessional) {
              setIsNextButtonEnabled(true);
              setIsHealthProfessional(false);
              setIsClinicLocation(true);
              setIsShowClinicLocation(false);
            } else if (isClinicType) {
              navigate("/cellmaUser/eventData/serviceBookAppointment");
              dispatch(setIsNextAvailableAppointment(false));
            }
          }}
        />
        <Common.CellmaButton
          label={t("next")}
          onClick={() => {
            props.handleStep(1);
          }}
          disabled={isNextButtonEnabled}
        />
      </Mui.Grid>
    </Mui.Grid>
  );
};

export default ClinicDetails;

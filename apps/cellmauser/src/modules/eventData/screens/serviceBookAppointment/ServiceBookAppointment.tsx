// Page Name : "serviceBookAppointment"
// Page Id : "c4eve2"

import * as React from "react";
import { useEffect } from "react";

import * as Mui from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useOutletContext } from "react-router-dom";

import AppointmentDetails from "./AppointmentDetails";
import { AppointmentSlots } from "./AppointmentSlots";
import ClinicDetails from "./ClinicDetails";
import CommunicationConsent from "./CommunicationConsent";
import { CellmaStepper } from "../../../../common/CommonComponentsIndex";
import t from "../../assets/translationFiles/ServiceBookAppointmentTranslation";
import { setActiveScreenName } from "../../store/EventDataAction";

const ServiceBookAppointment = (props: any) => {
  const { language } = useSelector((state: any) => state.language);
  const { state } = useLocation() as any;
  const dispatch = useDispatch();
  const hpDetails = state?.hpDetails;
  const { isUseSpecialtyAndRegionSetting, isNextAvailableAppointment } =
    useSelector((state: any) => state.eventDataReducer);
  const [activeStep, setActiveStep] = React.useState(
    isNextAvailableAppointment ? 0 : 1
  );
  const {
    setTitle,
    setIsLink,
    setIsArrowCircleButton,
    setIsLeftOutlinedIcon,
    setSelectDateAndHp,
  } = useOutletContext() as any; // <-- access context value

  useEffect(() => {
    setTitle(
      isNextAvailableAppointment
        ? t("nextAvailableAppointment")
        : t("serviceBookAppointment")
    );
    setIsLink(true);
    setIsArrowCircleButton(true);
    setIsLeftOutlinedIcon(true);
    setSelectDateAndHp(true);
    // eslint-disable-next-line
  }, [][language]);

  useEffect(() => {
    dispatch(setActiveScreenName("serviceAppointmentsScreen"));
  }, []);

  const steps = !isUseSpecialtyAndRegionSetting
    ? isNextAvailableAppointment
      ? [
          t("clinicDetails"),
          t("appointmentSlots"),
          t("appointmentDetails"),
          t("communicationConsent"),
        ]
      : [
          t("appointmentSlots"),
          t("appointmentDetails"),
          t("communicationConsent"),
        ]
    : [t("appointmentSlots"), t("appointmentDetails")];
  return (
    <Mui.Box>
      <Mui.Grid item xs={12} sx={styles.stepperGrid}>
        <CellmaStepper steps={steps} activeStep={activeStep} />
      </Mui.Grid>
      {(hpDetails?.espName !== undefined || hpDetails?.espName !== "") &&
        hpDetails?.clinicLocationEliText !== "" && (
          <Mui.Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            {activeStep === 0 && (
              <ClinicDetails
                handleStep={(steps: any) => setActiveStep(steps)}
                handlerClinicLocation={undefined}
                handlerClinicType={undefined}
                handleHealthProfessional={undefined}
                handlerShowClinicType={undefined}
                handlerShowClinicLocation={undefined}
                handlerNextButton={undefined}
              />
            )}
            {activeStep === 1 && (
              <AppointmentSlots
                hpDetails={hpDetails}
                handleStep={(steps: any) => setActiveStep(steps)}
              />
            )}
            {activeStep === 2 && (
              <AppointmentDetails
                handleStep={(steps: any) => setActiveStep(steps)}
              />
            )}
            {activeStep === 3 && (
              <CommunicationConsent
                handleStep={(steps: any) => setActiveStep(steps)}
              />
            )}
          </Mui.Grid>
        )}
      {hpDetails?.clinicLocationEliText === undefined && (
        <Mui.Grid item xs={12} sx={styles.selectedGrid}>
          <Mui.Typography variant="h2">
            {t("noLocationSelected")}
          </Mui.Typography>
        </Mui.Grid>
      )}

      {hpDetails?.espName === "" && hpDetails?.clinicLocationEliText === "" && (
        <Mui.Grid item xs={12} sx={styles.selectedGrid}>
          <Mui.Typography variant="h2">{t("noHpSelected")}</Mui.Typography>
        </Mui.Grid>
      )}
    </Mui.Box>
  );
};

const styles = {
  stepperGrid: {
    padding: { xs: "10px", sm: "20px" },
    justifyContent: "center",
    display: "block",
    justifyItems: "center",
  },
  selectedGrid: {
    display: "flex",
    justifyContent: "center",
    margin: "100px",
  },
};

export default ServiceBookAppointment;

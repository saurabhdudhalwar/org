import { useEffect, useState } from "react";

import { ExpandCircleDownOutlined } from "@mui/icons-material";
import * as Mui from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useSelector } from "react-redux";

import AppointmentDetailsTabel from "./AppointmentDetailsTabel";
import AwaitingAcceptanceDetailsTabel from "./AwaitingAcceptanceDetailsTabel";
import ContactTypeDetailsTabel from "./ContactTypeDetailsTabel";
import CurrentServiceDetailsTabel from "./CurrentServiceDetailsTabel";
import DischargedFromServiceDetailsTable from "./DischargedFromServiceDetailsTabel";
import PatientDevicesDetailsTable from "./PatientDevicesDetailsTable";
import PatientProceduresDetailsTable from "./PatientProceduresDetailsTable";
import {
  useGetSinglePatientDetails,
  useSinglePatientAppointmentDetails,
  useSinglePatientAwaitingAcceptanceDetails,
  useSinglePatientContactType,
  useSinglePatientCurrentServiceDetails,
  useSinglePatientDevicesDetails,
  useSinglePatientDischargeServiceDetails,
  useSinglePatientProcedures,
} from "../../api/useSinglePatientDetails";
import translate from "../../assets/translationFiles/commonPatientTranslation";

const PatientDetailsAccordion = () => {
  const [isCurrentServiceOpen, setIsCurrentServiceOpen] = useState(false);
  const [isAwaitingAcceptanceOpen, setIsAwaitingAcceptanceOpen] =
    useState(false);
  const [isAppointmentDetailsOpen, setIsAppointmentDetailsOpen] =
    useState(false);
  const [isDischargedFromServiceOpen, setIsDischargedFromServiceOpen] =
    useState(false);
  const [isContactTypeDetailsOpen, setIsContactTypeDetailsOpen] =
    useState(false);
  const [isPatientProceduresDetailsOpen, setIsPatientProceduresDetailsOpen] =
    useState(false);
  const [isPatientDevicesDetailsOpen, setIsPatientDevicesDetailsOpen] =
    useState(false);
  const { language } = useSelector((state: any) => state.language);
  const { patientId } = useSelector((state: any) => state.patient);

  // this function set state
  const currentServiceOpen = () => {
    setIsCurrentServiceOpen((current) => !current);
  };

  // this function set current state
  const awaitingAcceptanceOpen = () => {
    setIsAwaitingAcceptanceOpen((current) => !current);
  };

  // this function set current state
  const appointmentDetailsOpen = () => {
    setIsAppointmentDetailsOpen((current) => !current);
  };

  // this function set current state
  const dischargedFromServiceOpen = () => {
    setIsDischargedFromServiceOpen((current) => !current);
  };

  // this function set current state
  const contactTypeDetailsOpen = () => {
    setIsContactTypeDetailsOpen((current) => !current);
  };

  // this function set current state
  const patientProceduresDetailsOpen = () => {
    setIsPatientProceduresDetailsOpen((current) => !current);
  };
  // this function set current state
  const patientDevicesDetailsOpen = () => {
    setIsPatientDevicesDetailsOpen((current) => !current);
  };

  const {
    refetch: getGetSinglePatientDetails,
    data: getSinglePatientDetailsResponse,
  } = useGetSinglePatientDetails(patientId);

  const settings = getSinglePatientDetailsResponse?.settings ?? {};

  useEffect(() => {
    getGetSinglePatientDetails();
  }, [language]);

  const { data: getSinglePatientCurrentServiceDetails } =
    useSinglePatientCurrentServiceDetails(patientId);
  const currentServiceDetails =
    getSinglePatientCurrentServiceDetails?.CurrentServicedeatils ?? [];

  const { data: getSinglePatientAwaitingAcceptanceDetails } =
    useSinglePatientAwaitingAcceptanceDetails(patientId);
  const awaitingAcceptanceDetails =
    getSinglePatientAwaitingAcceptanceDetails?.AwaitingAcceptanceDetails ?? [];

  const { data: getSinglePatientAppointmentDetails } =
    useSinglePatientAppointmentDetails(patientId);
  const appointmentDetails =
    getSinglePatientAppointmentDetails?.patientAppointments ?? [];

  const { data: getSinglePatientDischargeService } =
    useSinglePatientDischargeServiceDetails(patientId);
  const dischargeServiceDetails =
    getSinglePatientDischargeService?.DischargedFromServiceDetails ?? [];

  const { data: getSinglePatientContactType } =
    useSinglePatientContactType(patientId);
  const contactTypeDetails =
    getSinglePatientContactType?.summaryGroupList ?? [];

  const { data: getSinglePatientProcedures } =
    useSinglePatientProcedures(patientId);
  const proceduresDetails = getSinglePatientProcedures?.procedureDetail ?? [];

  const { data: getSinglePatientDeviceDetails } =
    useSinglePatientDevicesDetails(patientId);
  const deviceDetails = getSinglePatientDeviceDetails?.patientDeviceList ?? [];

  return (
    <Mui.Box sx={{ mt: "25px" }}>
      {currentServiceDetails?.length !== 0 && (
        <Mui.Accordion sx={styles.accordion}>
          <Mui.AccordionSummary
            data-testid="Current Service Details"
            expandIcon={
              <ExpandCircleDownOutlined
                sx={{
                  color: isCurrentServiceOpen ? "" : "success.dark",
                  p: "10px",
                  fontSize: "45px",
                }}
              />
            }
            onClick={currentServiceOpen}
            sx={styles.accordionHeader}
          >
            <Mui.Typography variant="h3">
              {translate("currentServiceDetails", language)}
            </Mui.Typography>
          </Mui.AccordionSummary>
          <AccordionDetails>
            <CurrentServiceDetailsTabel rows={currentServiceDetails} />
          </AccordionDetails>
        </Mui.Accordion>
      )}
      {awaitingAcceptanceDetails?.length !== 0 && (
        <Mui.Accordion sx={styles.accordion}>
          <Mui.AccordionSummary
            data-testid="Awaiting Acceptance Details"
            expandIcon={
              <ExpandCircleDownOutlined
                sx={{
                  color: isAwaitingAcceptanceOpen ? "" : "success.dark",
                  p: "10px",
                  fontSize: "45px",
                }}
              />
            }
            onClick={awaitingAcceptanceOpen}
            sx={styles.accordionHeader}
          >
            <Mui.Typography variant="h3">
              {translate("awaitingAcceptanceDetails", language)}
            </Mui.Typography>
          </Mui.AccordionSummary>
          <Mui.AccordionDetails>
            <AwaitingAcceptanceDetailsTabel rows={awaitingAcceptanceDetails} />
          </Mui.AccordionDetails>
        </Mui.Accordion>
      )}
      {appointmentDetails?.length !== 0 && (
        <Mui.Accordion sx={styles.accordion}>
          <Mui.AccordionSummary
            data-testid="Appointment Details"
            expandIcon={
              <ExpandCircleDownOutlined
                sx={{
                  color: isAppointmentDetailsOpen ? "" : "success.dark",
                  p: "10px",
                  fontSize: "45px",
                }}
              />
            }
            onClick={appointmentDetailsOpen}
            sx={styles.accordionHeader}
          >
            <Mui.Typography variant="h3">
              {translate("appointmentDetails", language)}
            </Mui.Typography>
          </Mui.AccordionSummary>
          <Mui.AccordionDetails>
            <AppointmentDetailsTabel rows={appointmentDetails} />
          </Mui.AccordionDetails>
        </Mui.Accordion>
      )}
      {dischargeServiceDetails?.length !== 0 && (
        <Mui.Accordion sx={styles.accordion}>
          <Mui.AccordionSummary
            data-testid="Discharged From Service Details"
            expandIcon={
              <ExpandCircleDownOutlined
                sx={{
                  color: isDischargedFromServiceOpen ? "" : "success.dark",
                  p: "10px",
                  fontSize: "45px",
                }}
              />
            }
            onClick={dischargedFromServiceOpen}
            sx={styles.accordionHeader}
          >
            <Mui.Typography variant="h3">
              {translate("dischargedFromServiceDetails", language)}
            </Mui.Typography>
          </Mui.AccordionSummary>
          <Mui.AccordionDetails>
            <DischargedFromServiceDetailsTable rows={dischargeServiceDetails} />
          </Mui.AccordionDetails>
        </Mui.Accordion>
      )}
      {contactTypeDetails?.length !== 0 && (
        <Mui.Accordion sx={styles.accordion}>
          <Mui.AccordionSummary
            data-testid="Contact Type Details"
            expandIcon={
              <ExpandCircleDownOutlined
                sx={{
                  color: isContactTypeDetailsOpen ? "" : "success.dark",
                  p: "10px",
                  fontSize: "45px",
                }}
              />
            }
            onClick={contactTypeDetailsOpen}
            sx={styles.accordionHeader}
          >
            <Mui.Typography variant="h3">
              {translate("contactTypeDetails", language)}
            </Mui.Typography>
          </Mui.AccordionSummary>
          <Mui.AccordionDetails>
            <ContactTypeDetailsTabel rows={contactTypeDetails} />
          </Mui.AccordionDetails>
        </Mui.Accordion>
      )}
      {settings?.displayProcedureDeviceList === 1 &&
        proceduresDetails?.length !== 0 && (
          <Mui.Accordion sx={styles.accordion}>
            <Mui.AccordionSummary
              data-testid="Patient Procedures"
              expandIcon={
                <ExpandCircleDownOutlined
                  sx={{
                    color: isPatientProceduresDetailsOpen ? "" : "success.dark",
                    p: "10px",
                    fontSize: "45px",
                  }}
                />
              }
              onClick={patientProceduresDetailsOpen}
              sx={styles.accordionHeader}
            >
              <Mui.Typography variant="h3">
                {translate("patientProcedures", language)}
              </Mui.Typography>
            </Mui.AccordionSummary>
            <Mui.AccordionDetails>
              <PatientProceduresDetailsTable rows={proceduresDetails} />
            </Mui.AccordionDetails>
          </Mui.Accordion>
        )}
      {settings?.displayProcedureDeviceList === 1 &&
        deviceDetails?.length !== 0 && (
          <Mui.Accordion sx={styles.accordion}>
            <Mui.AccordionSummary
              data-testid="Patient Devices"
              expandIcon={
                <ExpandCircleDownOutlined
                  sx={{
                    color: isPatientDevicesDetailsOpen ? "" : "success.dark",
                    p: "10px",
                    fontSize: "45px",
                  }}
                />
              }
              onClick={patientDevicesDetailsOpen}
              sx={styles.accordionHeader}
            >
              <Mui.Typography variant="h3">
                {translate("patientDevices", language)}
              </Mui.Typography>
            </Mui.AccordionSummary>
            <Mui.AccordionDetails>
              <PatientDevicesDetailsTable rows={deviceDetails} />
            </Mui.AccordionDetails>
          </Mui.Accordion>
        )}
    </Mui.Box>
  );
};

export default PatientDetailsAccordion;

export const styles = {
  accordionHeader: {
    backgroundColor: "secondary.dark",
    flexDirection: "row-reverse",
  },
  accordion: { mb: "10px", boxShadow: "none" },
};

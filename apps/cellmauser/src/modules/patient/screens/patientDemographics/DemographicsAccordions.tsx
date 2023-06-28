import { useState } from "react";

import { ExpandCircleDownOutlined } from "@mui/icons-material";
import * as Mui from "@mui/material";
import { useSelector } from "react-redux";

import PatientAddress from "./PatientAddress";
import PatientGp from "./PatientGp";
import PatientIdentifier from "./PatientIdentifier";
import PatientInfo from "./PatientInformation";
import PatientInterestedParties from "./PatientInterestedParties";
import translate from "../../assets/translationFiles/patientDemographicsTranslation";

export const GridItem = (props: any) => {
  return (
    <Mui.Grid item xs={5.5} sx={styles.accordionData}>
      {props.children}
    </Mui.Grid>
  );
};
const DemographicsAccordions = () => {
  const { language } = useSelector((state: any) => state.language);
  const [isPatientInfoOpen, setIsPatientInfoOpen] = useState(true);
  const [isPatientIdentifierOpen, setIsPatientIdentifierOpen] = useState(false);
  const [isPatientAddressOpen, setIsPatientAddressOpen] = useState(false);
  const [isInterestedPartiesOpen, setIsInterestedPartiesOpen] = useState(false);
  const [isPatientGpOpen, setIsPatientGpOpen] = useState(false);

  const PatientInfoOpen = () => {
    setIsPatientInfoOpen(!isPatientInfoOpen);
  };

  const PatientIdentifierOpen = () => {
    setIsPatientIdentifierOpen((current) => !current);
  };

  const PatientAddressOpen = () => {
    setIsPatientAddressOpen((current) => !current);
  };

  const InterestedPartiesOpen = () => {
    setIsInterestedPartiesOpen((current) => !current);
  };

  const PatientGpOpen = () => {
    setIsPatientGpOpen((current) => !current);
  };

  return (
    <>
      <Mui.Accordion sx={styles.accordion} expanded={isPatientInfoOpen}>
        <Mui.AccordionSummary
          data-testid="Patient Information"
          expandIcon={
            <ExpandCircleDownOutlined
              sx={{
                color: isPatientInfoOpen ? "" : "success.dark",
                p: "10px",
                fontSize: "45px",
              }}
            />
          }
          onClick={PatientInfoOpen}
          sx={styles.accordionHeader}
        >
          <Mui.Typography variant="h3">
            {translate("patientInformation", language)}
          </Mui.Typography>
        </Mui.AccordionSummary>
        <Mui.AccordionDetails>
          <PatientInfo />
        </Mui.AccordionDetails>
      </Mui.Accordion>
      <Mui.Accordion sx={styles.accordion}>
        <Mui.AccordionSummary
          data-testid="Patient Identifier"
          expandIcon={
            <ExpandCircleDownOutlined
              sx={{
                color: isPatientIdentifierOpen ? "" : "success.dark",
                p: "10px",
                fontSize: "45px",
              }}
            />
          }
          onClick={PatientIdentifierOpen}
          sx={styles.accordionHeader}
        >
          <Mui.Typography variant="h3">
            {translate("patientIdentifier", language)}
          </Mui.Typography>
        </Mui.AccordionSummary>
        <Mui.AccordionDetails>
          <PatientIdentifier />
        </Mui.AccordionDetails>
      </Mui.Accordion>
      <Mui.Accordion sx={styles.accordion}>
        <Mui.AccordionSummary
          data-testid="Patient Address"
          expandIcon={
            <ExpandCircleDownOutlined
              sx={{
                color: isPatientAddressOpen ? "" : "success.dark",
                p: "10px",
                fontSize: "45px",
              }}
            />
          }
          onClick={PatientAddressOpen}
          sx={styles.accordionHeader}
        >
          <Mui.Typography variant="h3">
            {translate("patientAddress", language)}
          </Mui.Typography>
        </Mui.AccordionSummary>
        <Mui.AccordionDetails>
          <PatientAddress />
        </Mui.AccordionDetails>
      </Mui.Accordion>
      <Mui.Accordion sx={styles.accordion}>
        <Mui.AccordionSummary
          data-testid="Patient Interested Parties"
          expandIcon={
            <ExpandCircleDownOutlined
              sx={{
                color: isInterestedPartiesOpen ? "" : "success.dark",
                p: "10px",
                fontSize: "45px",
              }}
            />
          }
          onClick={InterestedPartiesOpen}
          sx={styles.accordionHeader}
        >
          <Mui.Typography variant="h3">
            {translate("patientInterestedParties", language)}
          </Mui.Typography>
        </Mui.AccordionSummary>
        <Mui.AccordionDetails>
          <PatientInterestedParties />
        </Mui.AccordionDetails>
      </Mui.Accordion>
      <Mui.Accordion sx={styles.accordion}>
        <Mui.AccordionSummary
          data-testid="Patient Gp"
          expandIcon={
            <ExpandCircleDownOutlined
              sx={{
                color: isPatientGpOpen ? "" : "success.dark",
                p: "10px",
                fontSize: "45px",
              }}
            />
          }
          onClick={PatientGpOpen}
          sx={styles.accordionHeader}
        >
          <Mui.Typography variant="h3">
            {translate("patientGp", language)}
          </Mui.Typography>
        </Mui.AccordionSummary>
        <Mui.AccordionDetails>
          <PatientGp />
        </Mui.AccordionDetails>
      </Mui.Accordion>
    </>
  );
};

export default DemographicsAccordions;

export const styles = {
  accordionHeader: {
    backgroundColor: "secondary.dark",
    flexDirection: "row-reverse",
  },
  accordion: { mb: "10px", boxShadow: 2 },
  accordionData: {
    padding: "5px",
  },
};

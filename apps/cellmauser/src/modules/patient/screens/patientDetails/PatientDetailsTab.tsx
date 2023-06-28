// Page Name : "editPatient"
// Page Id : "c4pat9"

import * as React from "react";
import { useEffect } from "react";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";

import PatientGP from "./PatientGP";
import translate from "../../assets/translationFiles/patientDetailsTranslation";
import {
  setActiveScreenName,
  setCreatePatientActiveStep,
} from "../../store/PatientAction";
import AddAddress from "../createPatient/AddAddress";
import AddDetails from "../createPatient/AddDetails";
import AddPip from "../createPatient/AddPip";
import PrintIdCard from "../createPatient/PrintIdCard";

const TabPanel = (props: any) => {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`patient_details_tab_${index}`}
      aria-labelledby={`patient_details_tab_${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  );
};

const PatientDetailsTab = () => {
  const [value, setValue] = React.useState(0);

  const { language } = useSelector((state: any) => state.language);
  const { setTitle, setIsLink } = useOutletContext() as any; // <-- access context value
  const dispatch = useDispatch();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(setCreatePatientActiveStep(0));
    setTitle(translate("patientDetails", language));
    setIsLink(true);
    dispatch(setActiveScreenName("editDemographicScreen"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab
            label={translate("patientDetails", language)}
            data-testid="Patient Details"
          />
          <Tab
            label={translate("patientAddress", language)}
            data-testid="Patient Address"
          />
          <Tab
            label={translate("patientPIP", language)}
            data-testid="Patient PIP"
          />
          <Tab
            label={translate("patientGP", language)}
            data-testid="Patient GP"
          />
          <Tab
            label={translate("printIdCard", language)}
            data-testid="Print Id Card"
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <AddDetails mode="editPatient" />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AddAddress mode="editPatient" />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <AddPip mode="editPatient" />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <PatientGP mode="editPatient" />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <PrintIdCard />
      </TabPanel>
    </Box>
  );
};

export default PatientDetailsTab;

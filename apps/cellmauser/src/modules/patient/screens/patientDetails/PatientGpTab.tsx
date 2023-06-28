import * as React from "react";
import { useCallback, useEffect, useState } from "react";

import CancelIcon from "@mui/icons-material/Cancel";
import * as Mui from "@mui/material";
import { useSelector } from "react-redux";

//import LocalGpList from "./LocalGpList";
//import NationalGpList from "./NationalGpList";
import translate from "../../assets/translationFiles/createPatientTranslation";
import { ITabPanelProps } from "../../types";

const TabPanel = (props: ITabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <Mui.Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Mui.Box sx={{ p: 3 }}>
          <Mui.Typography>{children}</Mui.Typography>
        </Mui.Box>
      )}
    </Mui.Box>
  );
};

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

interface Props {
  handleCancel(): void;
  // insert props here
}

const PatientGpTab: React.FC<Props> = (props) => {
  const { language } = useSelector((state: any) => state.language);
  const [value, setValue] = useState(0);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Mui.Grid container sx={{ justifyContent: "center" }}>
      <Mui.Dialog
        open
        maxWidth="lg"
        PaperProps={{
          sx: { borderRadius: "20px", padding: "10px" },
        }}
      >
        <Mui.Grid sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Mui.IconButton
            sx={{ m: "5px", mb: "-10px" }}
            onClick={() => props.handleCancel()}
          >
            <CancelIcon />
          </Mui.IconButton>
        </Mui.Grid>

        <Mui.Tabs value={value} onChange={handleChange} aria-label="Tabs">
          <Mui.Tab
            label={translate("localGPList", language)}
            {...a11yProps(0)}
          />
          <Mui.Tab
            label={translate("nationalGPList", language)}
            {...a11yProps(1)}
          />
        </Mui.Tabs>
        <Mui.Divider />

        <TabPanel value={value} index={0}>
          {/**<LocalGpList {...props} />*/}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {/**<NationalGpList {...props} />*/}
        </TabPanel>
      </Mui.Dialog>
    </Mui.Grid>
  );
};
export default PatientGpTab;

// This page is combine with GP List and this page is for reference for react-team. delete this page after integrating functionality
import { useEffect, useState } from "react";

import * as Mui from "@mui/material";
import { useSelector } from "react-redux";

import LocalGpList from "./GpList";
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

const LocalGpListTab = (props: any) => {
  const { language } = useSelector((state: any) => state.language);
  const [value, setValue] = useState(0);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Mui.Box sx={{ width: "100%" }}>
      {/* <Mui.Box sx={{ borderBottom: 1, borderColor: "divider" }}>
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
      </Mui.Box>
      <TabPanel value={value} index={0}>
        <LocalGpList {...props} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <NationalGpList {...props} />
      </TabPanel> */}
    </Mui.Box>
  );
};
export default LocalGpListTab;

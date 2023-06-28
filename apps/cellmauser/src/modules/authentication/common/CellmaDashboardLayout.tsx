import React from "react";

import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import * as Common from "../../../common/CommonComponentsIndex";

interface Props {
  // eslint-disable-next-line react/require-default-props
  type?: any;
}

const CellmaDashboardLayout: React.FC<Props> = (props) => {
  const [open, setOpen] = React.useState(false);
  const { isUnderConstruction } = useSelector((state: any) => state.common);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Common.CellmaHeaderFooterLayout
      handleDrawerOpen={handleDrawerOpen}
      open={open}
      handleDrawerClose={handleDrawerClose}
      type={props.type}
    >
      {/* {pathname === "/cellmaUser/patients/patientSearch" &&
        isPatientSelected === "" && <MultiplePatientDrawer open={open} />}
      {pathname === "/dashboard/patientList/patientListData" &&
        isPatientSelected && <SinglePatientDrawer open={open} />}
      {pathname ===
        "/cellmaUser/patients/confirmPatientDetails" &&
        isPatientSelected && <SinglePatientDrawer open={open} />} */}

      {isUnderConstruction && <Common.CellmaUnderConstruction />}

      <Box sx={styles.children}>
        <Outlet context={open} />
      </Box>
    </Common.CellmaHeaderFooterLayout>
  );
};

const styles = {
  children: {
    mx: "20px",
    my: "80px",
    flexGrow: 1,
  },
};

export default CellmaDashboardLayout;

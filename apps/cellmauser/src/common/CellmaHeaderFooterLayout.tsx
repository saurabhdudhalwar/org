import { ReactNode } from "react";

import Box from "@mui/material/Box";

import CellmaFooter from "./CellmaFooter";
import CellmaHeader from "./CellmaHeader";

interface Props {
  handleDrawerOpen?: any;
  open?: any;
  handleDrawerClose?: any;
  type?: any;
  children?: ReactNode;
}

const CellmaHeaderFooterLayout: React.FC<Props> = (props) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100%" }}>
      <CellmaHeader
        handleDrawerOpen={props.handleDrawerOpen}
        open={props.open}
        handleDrawerClose={props.handleDrawerClose}
        type={props.type}
      />
      <Box
        sx={{
          display: "flex",
          width: "100%",
          minHeight: "100vh",
          justifyContent: "center",
          mb: "-20px",
        }}
      >
        {props.children}
      </Box>
      <CellmaFooter />
    </Box>
  );
};

export default CellmaHeaderFooterLayout;

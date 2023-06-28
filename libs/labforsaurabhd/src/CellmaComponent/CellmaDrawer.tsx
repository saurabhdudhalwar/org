import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";

const drawerWidth = 240;

interface Props {
  open: any;
  type: any;
  variant: any;
  children: any;
}

export const CellmaDrawer: React.FC<Props> = (props) => {
  return (
    <Box
      sx={{
        display: props.open || props.type === "fixedDrawer" ? "flex" : "none",
      }}
    >
      <CssBaseline />
      <Drawer
        sx={{
          display: {
            xs: props.type === "fixedDrawer" ? "none" : "block",
            sm: "block",
          },
          width:
            props.type === "fixedDrawer" && !props.open ? "65px" : drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width:
              props.type === "fixedDrawer" && !props.open
                ? "65px"
                : drawerWidth,
            boxSizing: "border-box",
            overflowY: "auto",
            overflowX: "hidden",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          },
        }}
        variant={props.variant ? props.variant : "permanent"}
        anchor="left"
        open={props.open}
      >
        {props.children}
      </Drawer>
    </Box>
  );
};

export default CellmaDrawer;

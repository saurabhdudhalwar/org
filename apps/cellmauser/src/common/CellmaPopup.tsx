import { MouseEventHandler, ReactNode } from "react";

import CancelIcon from "@mui/icons-material/Cancel";
import * as Mui from "@mui/material";

interface Props {
  fullScreen?: any;
  title?: string;
  handleCancel?: MouseEventHandler<SVGSVGElement> | undefined;
  variant?: any;
  children?: ReactNode;
}

const CellmaPopup: React.FC<Props> = (props) => {
  return (
    <Mui.Box>
      <Mui.Dialog
        sx={{
          padding: props.fullScreen ? "50px" : "0px",
          marginTop: "20px",
        }}
        fullScreen={props.fullScreen}
        open
        PaperProps={{
          sx: {
            borderRadius: "20px",
            minWidth: { xs: "300px", sm: "350px" },
          },
        }}
        data-testid="CommonCellmaPopup"
      >
        <Mui.Grid container sx={{ p: "10px" }}>
          {props.fullScreen ? (
            <>
              <Mui.Grid item xs={0.5} />
              <Mui.Grid item xs={9.7} sm={11} sx={styles.headerGrid}>
                <Mui.DialogTitle variant="subtitle1" sx={styles.dialogTitle}>
                  {props.title}
                </Mui.DialogTitle>
              </Mui.Grid>
              <Mui.Grid item xs={1.3} sm={0.5} sx={styles.cancelGrid}>
                <CancelIcon
                  sx={{ color: "grey.400" }}
                  onClick={props.handleCancel}
                />
              </Mui.Grid>
            </>
          ) : (
            <>
              <Mui.Grid item xs={1} />
              <Mui.Grid item xs={10} sx={styles.headerGrid}>
                <Mui.DialogTitle variant="h2" sx={styles.dialogTitle}>
                  {props.title}
                </Mui.DialogTitle>
              </Mui.Grid>
              <Mui.Grid item xs={1} sx={styles.cancelGrid}>
                <CancelIcon
                  sx={{ color: "grey.400" }}
                  onClick={props.handleCancel}
                />
              </Mui.Grid>
            </>
          )}
        </Mui.Grid>
        <Mui.Divider variant={props.variant ? props.variant : "middle"} />
        <Mui.Grid
          sx={{
            overflowY: "auto",
            overflowX: "hidden",
            "&::-webkit-scrollbar": {
              display: "Auto",
            },
          }}
        >
          {props.children}
        </Mui.Grid>
      </Mui.Dialog>
    </Mui.Box>
  );
};

const styles = {
  headerGrid: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cancelGrid: {
    display: "flex",
    alignItems: "center",
  },
  dialogTitle: {
    color: "primary.main",
    fontSize: {
      xs: "14px",
      sm: "18px",
    },
    display: "flex",
    justifyContent: "space-between",
  },
};

export default CellmaPopup;

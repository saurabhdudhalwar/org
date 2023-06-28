import { useEffect, useState } from "react";

import { Alert } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
// import { useDispatch, useSelector } from "react-redux";

// import { setSnackbar } from "../store/SnackbarAction";
interface Props {
  dispatch: any;
  useSelector: any;
  setSnackbar: any;
}

export const CellmaSnackbar: React.FC<Props> = (props) => {
  const [backgroundColor, setBackgroundColor] = useState("success.dark");
  // const dispatch = useDispatch();

  const {
    snackbarOpen,
    snackbarType,
    snackbarMessage,
    snackbarAutoHideDuration,
    snackbarVertical,
    snackbarHorizontal,
  } = props.useSelector((state: any) => state.snackbar);

  const handleClose = (reason: any) => {
    if (reason === "clickaway") {
      return;
    }

    props.dispatch(
      props.setSnackbar(
        false,
        snackbarType,
        snackbarMessage,
        snackbarAutoHideDuration,
        snackbarVertical,
        snackbarHorizontal
      )
    );
  };

  useEffect(() => {
    if (snackbarType === "success") {
      setBackgroundColor("success.dark");
    } else if (snackbarType === "warning") {
      setBackgroundColor("warning.main");
    } else if (snackbarType === "info") {
      setBackgroundColor("info.main");
    } else if (snackbarType === "error") {
      setBackgroundColor("error.main");
    }
  }, [snackbarType]);

  const snackbarAutoHideDurationTime = snackbarAutoHideDuration * 1000;
  return (
    <div className="width:100%">
      <Snackbar
        style={{
          height: "auto",
          lineHeight: "28px",
          padding: 50,
          whiteSpace: "pre-line",
        }}
        open={snackbarOpen}
        autoHideDuration={
          snackbarAutoHideDuration !== null
            ? snackbarAutoHideDurationTime
            : 600000
        }
        onClose={handleClose}
        anchorOrigin={{
          vertical: snackbarVertical,
          horizontal: snackbarHorizontal,
        }}
        sx={{
          position: "fixed",
        }}
      >
        <Alert
          elevation={6}
          variant="filled"
          severity={snackbarType}
          onClose={handleClose}
          sx={{
            maxWidth: { xs: "400px", sm: "600px" },
            minWidth: { xs: "250px", sm: "350px" },
            backgroundColor,
            color: "common.white",
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CellmaSnackbar;

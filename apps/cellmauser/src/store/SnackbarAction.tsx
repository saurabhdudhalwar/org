export const SET_SNACKBAR = "SET_SNACKBAR";

export const setSnackbar = (
  snackbarOpen: any,
  snackbarType = "success",
  snackbarMessage = "",
  snackbarAutoHideDuration: any,
  snackbarVertical = "top",
  snackbarHorizontal = "center"
) => ({
  type: SET_SNACKBAR,
  snackbarOpen,
  snackbarType,
  snackbarMessage,
  snackbarAutoHideDuration,
  snackbarVertical,
  snackbarHorizontal,
});

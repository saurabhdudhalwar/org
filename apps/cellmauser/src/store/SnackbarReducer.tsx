import { SET_SNACKBAR } from "./SnackbarAction";

const initialState = {
  snackbarOpen: false,
  snackbarType: "success",
  snackbarMessage: "",
  snackbarAutoHideDuration: 4000,
  snackbarVertical: "top",
  snackbarHorizontal: "center",
};

const SnackbarReducer = (state = initialState, action: any) => {
  const {
    snackbarOpen,
    snackbarMessage,
    snackbarType,
    snackbarAutoHideDuration,
    snackbarVertical,
    snackbarHorizontal,
  } = action;

  switch (action.type) {
    case SET_SNACKBAR:
      return {
        ...state,
        snackbarOpen,
        snackbarType,
        snackbarMessage,
        snackbarAutoHideDuration,
        snackbarVertical,
        snackbarHorizontal,
      };
    default:
      return state;
  }
};

export default SnackbarReducer;

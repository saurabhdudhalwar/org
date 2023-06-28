import translate from "../assets/translationFiles/commonTranslation";
import responseCodeMessages from "../config/ResponseCodeMessages";
import { setSnackbar } from "../store/SnackbarAction";

// This function helps to handle response codes , displays response messages on snackbar.

const dispatchSnackbar = (response: any, dispatch: any, language: any) => {
  const responseCode = response?.data?.validationCode;
  if (responseCode in responseCodeMessages) {
    dispatch(
      setSnackbar(
        true,
        responseCodeMessages[responseCode].type,
        translate(
          responseCodeMessages[responseCode].messageTranslationKey,
          language
        ),
        4
      )
    );
  }
};

export default dispatchSnackbar;

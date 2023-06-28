import informationCodeMessages from "../config/InformationCodeMessages";
import translate from "../modules/patient/assets/translationFiles/commonPatientTranslation";
import { setSnackbar } from "../store/SnackbarAction";

// This function helps to handle information messages codes , displays information messages on snackbar.

const dispatchSnackbar = (messageCode: any, dispatch: any, language: any) => {
  let finalMessage = "";
  messageCode.map((message: any) => {
    finalMessage = finalMessage.concat(
      `\n${translate(
        informationCodeMessages[message.messageKey].messageTranslationKey,
        language
      )}`
    );
  });

  dispatch(setSnackbar(true, "info", finalMessage, null));
};

export default dispatchSnackbar;

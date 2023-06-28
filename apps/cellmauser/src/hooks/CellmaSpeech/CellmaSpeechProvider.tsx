/* eslint-disable new-cap */
import {
  createContext,
  ReactElement,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useDispatch } from "react-redux";

import { cellmaCommand, getTranscriptFromEvent } from "./CellmaSpeech.utils";
import { setSnackbar } from "../../store/SnackbarAction";

interface Props {
  children: ReactElement;
}

type SpeechRecognitionState = {
  text: string;
  isListening: boolean;
  isRecording: boolean;
  startListening: () => void;
  stopListening: () => void;
  getFormik: (formik: any) => void;
};

const initialState: SpeechRecognitionState = {
  text: "",
  isListening: false,
  isRecording: false,
  startListening: () => {},
  stopListening: () => {},
  getFormik: (formik: any) => {},
};

export const SpeechContext = createContext(initialState);

const SpeechRecognitionProvider: React.FC<Props> = ({ children }) => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [timeout, updateTimeout] = useState<number>();
  const [formik, setFormik] = useState();
  const dispatch = useDispatch();

  const dispatchSnackbar = (message: any) => {
    dispatch(setSnackbar(true, "success", message, 4));
  };

  /**
   * Check for hey Cellma
   */
  ((script: string) => {
    if (text === "" || isListening) return;
    if (script.toLowerCase().includes("hey, selma")) {
      setIsListening(true);
      dispatchSnackbar("Cellma is Listening");
    }
  })(text);

  /**
   * Create instance of Speech recognition object
   */
  //@ts-ignore
  const recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.lang = "en-US";
  //@ts-ignore
  recognition.onresult = (event: SpeechRecognitionEvent) => {
    const transcript = getTranscriptFromEvent(event);
    setText(transcript);
  };

  recognition.onspeechend = () => {
    updateTimeout(
      setTimeout(() => {
        setIsListening(false);
        dispatchSnackbar("Cellma is not listening");
      }, 8000)
    );
  };
  recognition.onspeechstart = () => {
    if (timeout) clearTimeout(timeout);
  };

  recognition.onend = () => {
    recognition.start();
  };

  /**
   * Start listening to user
   */
  const startListening = () => {
    recognition.start();
    setIsRecording(true);
  };

  /**
   * Stop listening to user
   */
  const stopListening = () => {
    setIsListening(false);
    setIsRecording(false);
    recognition.stop();
  };

  /**
   * Update state with formik object which user would like to update
   * @param formikForm
   */
  const getFormik = (formikForm: any) => {
    setFormik(formikForm);
  };

  const state: SpeechRecognitionState = useMemo(() => {
    return {
      text,
      isListening,
      isRecording,
      startListening,
      stopListening,
      getFormik,
    };
  }, []);

  /**
   * Execute a cellma command if Cellma is Listening
   */
  useEffect(() => {
    ((isCellmaListening: boolean) => {
      if (isCellmaListening) {
        cellmaCommand(text, recognition, formik);
      }
    })(isListening);
  }, [isListening, text]);

  return (
    <SpeechContext.Provider value={state}>{children}</SpeechContext.Provider>
  );
};

export default SpeechRecognitionProvider;

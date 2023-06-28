import { useContext } from "react";

import { SpeechContext } from "./CellmaSpeechProvider";

/**
 * Hook which gives access to methods and values provided by the Cellma
 * Speech module
 * @returns Speech Recognition Context
 */
const useSpeechRecognition = () => {
  const context = useContext(SpeechContext);
  if (context === undefined)
    throw new Error(
      "Can not use Speech recognition outside of context provider"
    );
  return context;
};

export default useSpeechRecognition;

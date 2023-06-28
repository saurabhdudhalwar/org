# Cellma Speech

Cellma Speech is a library for creating controlling cellma using speech
It uses [Web Speech API] (https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) for converting Speech to text. For more info on webSpeech API visit

## Usage

In order to use CellmaSpeech you must wrap all components that make use of the functionality in the <SpeechRecognition> component.

```javascript

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import SpeechRecognition from "./hooks/CellmaSpeech/CellmaSpeechProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
  <SpeechRecognition>
    <App />
   </SpeechRecognition>
  </React.StrictMode>
);

```

The Cellma Speech module has a hook which gives access to functions which help with making use of Cellma Speech

```javscript

const { startListening, getFormik } = useSpeechRecognition();

```

For situations where a user would like to input fields Cellma Speech will need access to the Formik object which was used to handle the form. This can be done using the [getFormik] function

Use the [startListening] function to get the Web Speech Api to start listening

# Commands

To start listening for commands say "Hey Cellma"

In order to click a particular link or button simply say "click 'button name'"

In order to input values in to fields say "input 'field name' 'field value'"

To shut down the Api's access to the microphone just say "stop listening"

# Limitations

Has only been written with english in mind

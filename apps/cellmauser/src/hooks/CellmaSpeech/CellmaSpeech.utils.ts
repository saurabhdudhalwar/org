type CellmaCommand = {
  ActionType: string;
  ElementName?: string;
  text?: string;
};

export const getTranscriptFromEvent = (
  //@ts-ignore
  event: SpeechRecognitionEvent
): string => {
  const lastIndex = event.results.length - 1;
  return event.results[lastIndex][0].transcript;
};

const parseTranscript = (transcript: string): CellmaCommand | null => {
  const modiefiedTranscript = transcript.toLowerCase().replaceAll(".", "");
  if (modiefiedTranscript.includes("stop listening")) {
    return {
      ActionType: "STOP_RECORDING",
    };
  }

  const params: string[] = modiefiedTranscript.split(" ");

  if (params[0] === "click" && params.length >= 2) {
    return {
      ActionType: "CLICK",
      ElementName: params[1],
    };
  }
  if (params[0] === "input" && params.length >= 3) {
    return {
      ActionType: "INPUT",
      ElementName: parseInputFieldName(params[1]),
      text: params.slice(2).join(" "),
    };
  }

  return null;
};

const formikFieldTranslation: { [key: string]: any } = {
  name: { messageTranslationKey: "givenName" },
};

const parseInputFieldName = (inputFieldName: string): string => {
  try {
    if (formikFieldTranslation[inputFieldName].messageTranslationKey)
      return formikFieldTranslation[inputFieldName].messageTranslationKey;
  } catch (error) {}
  return inputFieldName;
};

const clickButton = (descritpion: string) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const button of document.querySelectorAll("button")) {
    if (button.textContent?.toLowerCase().includes(descritpion.toLowerCase())) {
      return button.click();
    }
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const element of document.getElementsByTagName("div")) {
    const component = element.getAttribute("data-testid");
    if (component?.toLowerCase().includes(descritpion.toLowerCase())) {
      return element.click();
    }
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const element of document.getElementsByTagName("div")) {
    const component = element.getAttribute("data-id");
    if (component?.toLowerCase().includes(descritpion.toLowerCase())) {
      return element.click();
    }
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const link of document.getElementsByTagName("a")) {
    if (link.textContent?.toLowerCase().includes(descritpion.toLowerCase())) {
      return link.click();
    }
  }
};

const inputField = (description: string, text: string, form: any) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const field of document.querySelectorAll("input")) {
    if (field.name.toLowerCase().includes(description.toLowerCase())) {
      field.focus();
      form.setFieldValue(description, text);
    }
  }
};

export const cellmaCommand = (
  transcript: string,
  SpeechRecogntion: any,
  form: any
) => {
  const cellmaCommandObject = parseTranscript(transcript);
  if (!cellmaCommandObject) {
    return null;
  }
  const { ActionType, ElementName, text } = cellmaCommandObject;
  switch (ActionType) {
    case "STOP_RECORDING":
      SpeechRecogntion.stop();
      break;
    case "CLICK":
      clickButton(ElementName as string);
      break;
    case "INPUT":
      if (form !== undefined) {
        inputField(ElementName as string, text as string, form);
      } else {
        // eslint-disable-next-line no-alert
        alert("Cellma speech commands is not available on this form");
      }
      break;
    default:
      break;
  }
};

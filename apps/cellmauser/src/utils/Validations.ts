import { FormikProps } from "formik";

/* This function will restrict to enter . or e */
export const restrictExponentAndDot = (event: any) => {
  const key = event.which;
  if (key === 109 || key === 69 || key === 110 || key === 189 || key === 190) {
    event.preventDefault();
  }
};

/* This function will restrict to perform copy/cut/paste */
export const restrictCutCopyPaste = (event: any) => {
  event.preventDefault();
};

/* This function is used to restrict numbers on paste */
export const restrictPasteEventForNumbers = (
  event: React.ClipboardEvent<HTMLDivElement>
) => {
  const regex = /\d/;
  const data = event.clipboardData.getData("text");
  if (data.match(regex)) event.preventDefault();
};

/* This function is used to restrict characters on paste */
export const restrictPasteEventForLetters = (
  event: React.ClipboardEvent<HTMLDivElement>
) => {
  const regex = /[A-Za-z]/;
  const data = event.clipboardData.getData("text");
  if (data.match(regex)) event.preventDefault();
};

/* This function is used to restrict special characters on paste */
export const restrictPasteEventForSpecialCharacters = (
  event: React.ClipboardEvent<HTMLDivElement>
) => {
  const regex = /[~`!@#$%^&()_={}[\]:;,.<>+/?-]/;
  const data = event.clipboardData.getData("text");
  if (data.match(regex)) event.preventDefault();
};

/* This function is used to restrict special characters and numbers on paste */
export const restrictPasteEventForSpecialCharactersAndNumbers = (
  event: React.ClipboardEvent<HTMLDivElement>
) => {
  const regex = /[~`!@*#$%^&()_={}[\]:;,.<>+/?-\d]/;
  const data = event.clipboardData.getData("text");
  if (data.match(regex)) event.preventDefault();
};

/* This function is used to restrict special characters and alphabets on paste */
export const restrictPasteEventForSpecialCharactersAndAlphabets = (
  event: React.ClipboardEvent<HTMLDivElement>
) => {
  const regex = /[~`!@#$%^&*()_={}[\]:;,.<>+/?-A-Za-z]/;
  const data = event.clipboardData.getData("text");
  if (data.match(regex)) event.preventDefault();
};

/* This function is used to restrict special characters and numbers, space on paste */
export const restrictPasteEventForSpecialCharactersAndNumbersAndSpaces = (
  event: React.ClipboardEvent<HTMLDivElement>
) => {
  const regex = /[~`!@#$%^&()_={}[\]:;,.<>+/?-\d/\s]/;
  const data = event.clipboardData.getData("text");
  if (data.match(regex)) event.preventDefault();
};

/* This function is used to restrict space on paste */
export const restrictPasteEventForSpaces = (
  event: React.ClipboardEvent<HTMLDivElement>
) => {
  const regex = /\s/;
  const data = event.clipboardData.getData("text");
  if (data.match(regex)) event.preventDefault();
};

/* This function will not allow to enter a-z or A-Z and special characters */
export const restrictAlphabetsAndSpecialCharacters = (event: any) => {
  const charCode = event.which ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    event.preventDefault();
  }
};

/* This function will allow to enter a-z A-Z ' & space  */
export const allowOnlyCharactersSingleQuoteAndSpace = (event: any) => {
  const key = event.keyCode || event.which || event.charCode;
  if (
    !(
      key === 8 ||
      key === 32 ||
      (key > 64 && key < 91) ||
      (key > 96 && key < 123) ||
      key === 39
    )
  ) {
    event.preventDefault();
  }
};

/* This function will allow to enter a-z A-Z 0-9 -'/ & space  */
export const allowOnlyCharDigitHyphenApostropheSpaceForwardSlash = (
  event: any
) => {
  const key = event.keyCode || event.which || event.charCode;
  if (
    !(
      (key > 64 && key < 91) ||
      (key > 96 && key < 123) ||
      key === 39 ||
      key === 45 ||
      key === 32 ||
      key === 146 ||
      key === 47 ||
      (key >= 48 && key <= 57) ||
      key === 8
    )
  ) {
    event.preventDefault();
  }
};

/* This function will allow to enter a-z A-Z ' */
export const allowOnlyCharApostropheSpace = (event: any) => {
  const key = event.keyCode || event.which || event.charCode;
  if (
    !(
      (key > 64 && key < 91) ||
      (key > 96 && key < 123) ||
      key === 39 ||
      key === 32 ||
      key === 146 ||
      key === 8
    )
  ) {
    event.preventDefault();
  }
};

/* This function will allow to enter a-z A-Z / space */
export const allowOnlyCharForwardSlashSpace = (event: any) => {
  const key = event.keyCode || event.which || event.charCode;
  if (
    !(
      (key > 64 && key < 91) ||
      (key > 96 && key < 123) ||
      key === 47 ||
      key === 32 ||
      key === 146 ||
      key === 8
    )
  ) {
    event.preventDefault();
  }
};

/* This function will allow a-z A-Z 0-9 ' */
export const restrictSpecialCharacterExceptSingleQuote = (event: any) => {
  const key = event.keyCode || event.which || event.charCode;
  if (
    !(
      (key >= 48 && key <= 57) ||
      (key > 64 && key < 91) ||
      (key > 96 && key < 123) ||
      key === 39 ||
      key === 146
    )
  ) {
    event.preventDefault();
  }
};

/* This function will allow to enter a-z A-Z -'/ & space  */
export const allowOnlyCharHyphenApostropheSpaceForwardSlash = (event: any) => {
  const key = event.keyCode || event.which || event.charCode;
  if (
    !(
      (key > 64 && key < 91) ||
      (key > 96 && key < 123) ||
      key === 39 ||
      key === 45 ||
      key === 32 ||
      key === 146 ||
      key === 47 ||
      key === 8
    )
  ) {
    event.preventDefault();
  }
};

/* This function will allow to enter a-z A-Z 0-9 and space */
export const allowDigitCharacterSpace = (event: any) => {
  const key = event.keyCode || event.which || event.charCode;
  if (
    !(
      (key >= 48 && key <= 57) ||
      key === 32 ||
      (key > 64 && key < 91) ||
      (key > 96 && key < 123) ||
      key === 146
    )
  ) {
    event.preventDefault();
  }
};

/* This function will allow to enter 0-9 and + symbol */
export const mobileNumberValidation = (event: any) => {
  const key = event.keyCode || event.which || event.charCode;
  if (!((key >= 48 && key <= 57) || key === 43)) {
    event.preventDefault();
  }
};

/* This function will allow to enter 0-9 aA-zZ and ._'@ symbols */
export const allowCharactersDigitDotUnderscoreSingleQuoteAtTheRate = (
  event: any
) => {
  const key = event.keyCode || event.which || event.charCode;
  if (
    !(
      (key >= 48 && key <= 57) ||
      (key > 64 && key < 91) ||
      (key > 96 && key < 123) ||
      key === 46 ||
      key === 95 ||
      key === 39 ||
      key === 64
    )
  ) {
    event.preventDefault();
  }
};

/* This function will allow to enter a-z A-Z - ' & space  */
export const allowCharHyphenApostropheSpace = (event: any) => {
  const key = event.keyCode || event.which || event.charCode;
  if (
    !(
      (key > 64 && key < 91) ||
      (key > 96 && key < 123) ||
      key === 39 ||
      key === 45 ||
      key === 32 ||
      key === 146
    )
  ) {
    event.preventDefault();
  }
};

/* This function will not allow to enter space at first position */
export const restrictSpaceAtStart = (event: any) => {
  if (event.which === 32 && !event.target.value.length) {
    event.preventDefault();
  }
};

/* This function will not allow to enter space  */
export const restrictSpace = (event: any) => {
  if (event.which === 32) {
    event.preventDefault();
  }
};

/* This function will allow to enter 0-9 aA-zZ - _ ^ {} [] () */
export const hospitalRefValidation = (event: any) => {
  const key = event.keyCode || event.which || event.charCode;
  if (
    !(
      (key >= 48 && key <= 57) ||
      key === 45 ||
      (key > 64 && key < 91) ||
      (key > 96 && key < 123) ||
      key === 91 ||
      key === 146 ||
      key === 95 ||
      key === 94 ||
      key === 40 ||
      key === 41 ||
      key === 93 ||
      key === 123 ||
      key === 125
    )
  ) {
    event.preventDefault();
  }
};

/* This function will only allow to enter a-z or A-Z */
export const allowOnlyChar = (e: any) => {
  const key = e.keyCode || e.which || e.charCode;
  if (
    !(
      (key > 64 && key < 91) ||
      (key > 96 && key < 123) ||
      key === 39 ||
      key === 146 ||
      key === 45 ||
      key === 8
    )
  ) {
    e.preventDefault();
  }
};

/* This function allow to enter only 0 to 9 */
export const allowOnlyDigit = (event: any) => {
  const key = event.keyCode || event.which || event.charCode;
  if (!(key >= 48 && key <= 57)) {
    event.preventDefault();
  }
};

/* This function will not allow special characters */
export const blockSpecialChar = (ev: any) => {
  const key = ev.keyCode || ev.which || ev.charCode;
  if (
    !(
      (key > 64 && key < 91) ||
      (key > 96 && key < 123) ||
      key === 8 ||
      (key >= 48 && key <= 57) ||
      key === 32
    )
  ) {
    ev.preventDefault();
  }
};

/* This function will only allow to enter a-z or A-Z and special characters */
export const allowOnlyCharSpace = (e: any) => {
  const key = e.keyCode || e.which || e.charCode;
  if (!((key > 64 && key < 91) || (key > 96 && key < 123) || key === 32)) {
    e.preventDefault();
  }
};

/* This function will only allow to enter 0-9 and forward backward slash plus minus */
export const allowOnlyDigitsAndPhoneChars = (ev: any) => {
  const key = ev.keyCode || ev.which || ev.charCode;
  if (
    !(
      (key >= 48 && key <= 57) ||
      key === 43 ||
      key === 47 ||
      key === 92 ||
      key === 45
    )
  ) {
    ev.preventDefault();
  }
};

/* This function will allow to enter colon and digits */
export const timeValidation = (event: any) => {
  const key = event.keyCode || event.which || event.charCode;
  if (!((key >= 48 && key <= 57) || key === 58)) {
    event.preventDefault();
  }
};

/* This function will check mobile number validations depending on the setting of uk mobile validation */
export const checkMobileValidation = (event: any, type: any) => {
  const mobile = event.target.value;

  if (mobile !== "") {
    if (type === "uk") {
      if (mobile.length !== 11) {
        alert("Mobile number should be 11 digits");
      } else if (mobile.substring(0, 2) !== "07") {
        alert("Mobile number should start with 07");
      }
    } else if (mobile.length !== 10) {
      alert("Mobile number should be 10 digits");
    }
  }
};

export const formatNHSNumber = (nhsNo: string) => {
  if (nhsNo != null && nhsNo !== "" && nhsNo.length <= 12) {
    nhsNo = nhsNo.replace(/\s/g, "");
    const nhsNumber = `${nhsNo.substring(0, 3)} ${nhsNo.substring(
      3,
      6
    )} ${nhsNo.substring(6)}`;
    return nhsNumber;
  }
  return nhsNo;
};

export const allowedIdCardPhotoResolution = (width: number, height: number) => {
  if (width !== 120 && height !== 160) {
    return false;
  }
  return true;
};

/** Example: parameter (file type:string["jpg", "png"] , file size:307200 (in bytes)) */
export const validateFileTypeAndSize = (
  file: File,
  fileType: string[],
  size: number
) => {
  if (file) {
    const fileExtension = file.name.split(".").at(-1);

    if (fileType !== null && !fileType.includes(fileExtension as string)) {
      return "invalidFileTypeAlert";
    }

    if (size != null && size > 0 && file.size > size) {
      return "invalidFileSizeAlert";
    }
  }
  return "";
};

export const validateFileType = (file: File, fileType: string[]) => {
  if (file) {
    const fileExtension = file.name.split(".").at(-1);

    if (fileType !== null && !fileType.includes(fileExtension as string)) {
      return "invalidFileTypeAlert";
    }
  }
  return "";
};

export const restrictPastingCharactersAndSpecialSymbols = (ev: any) => {
  if (ev.type === "paste" || ev.type === "drop") {
    const textContent = (
      ev.type === "paste" ? ev.clipboardData : ev.dataTransfer
    ).getData("text");
    return !Number.isNaN(textContent) && textContent.indexOf(".") === -1;
  }
  if (ev.type === "keydown") {
    if (ev.ctrlKey || ev.metaKey) {
      return true;
    }
    const keysToAllow = [8, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
    return keysToAllow.indexOf(ev.keyCode) > -1;
  }
  return true;
};

/* This function is for nhs number it will allow to enter digits (0-9) and space */
export const nhsNoValidation = (event: any) => {
  const key = event.keyCode || event.which || event.charCode;
  if (!((key >= 48 && key <= 57) || key === 32)) {
    event.preventDefault();
  }
};

export const genderTitleHandler = (
  event: any,
  data: FormikProps<any>,
  caller: string
) => {
  let title = "";
  let sex = "";
  let alert = "";
  let value = "";
  const isCallerTitle = caller === "title";
  if (isCallerTitle) {
    title = event.target.value;
    sex = data.values.sex;
    alert = "titleAlert";
  } else {
    title = data.values.title;
    sex = event.target.value;
    alert = "sexAlert";
  }
  if (sex === "M" && (title === "Miss" || title === "Mrs" || title === "Ms")) {
    value = isCallerTitle ? "F" : "Mr";
    return [alert, value];
  }
  if (sex === "F" && (title === "Mr" || title === "Sir")) {
    value = isCallerTitle ? "M" : "Mrs";
    return [alert, value];
  }
  if (title === "Mr" || title === "Sir") {
    value = isCallerTitle ? "M" : "Mr";
    return ["", value];
  }
  if (title === "Miss" || title === "Mrs" || title === "Ms") {
    value = isCallerTitle ? "F" : "Mrs";
    return ["", value];
  }
  value = isCallerTitle ? sex : title;
  return ["", value];
};

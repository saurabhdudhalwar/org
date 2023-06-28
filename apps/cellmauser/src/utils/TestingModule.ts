/* eslint-disable no-plusplus */
import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

export enum ErrorType {
  INVALID_EMAIL = "INVALID EMAIL",
  INVALID_PASSWORD = "INVALID PASSWORD",
  NO_INPUT = "NO INPUT",
  MISMATCHING_INPUT = "MISMATCHING INPUT",
}

export enum ButtonType {
  SUBMIT = "SUBMIT",
  RESEND_CODE = "RESEND CODE",
  DROPDOWN = "DROP DOWN MENU",
}

export enum InputType {
  EMAIL = "EMAIL",
  PASSWORD = "PASSWORD",
  USERNAME = "USERNAME",
  KEY = "KEY",
}

interface Screen {
  screenId?: string;
}

interface CustomError {
  errorName: string;
  errorType: ErrorType;
  dependentFieldname?: string;
}

interface Input {
  label: string;
  errors: CustomError[];
  enabled: boolean;
  inputType: InputType;
  value?: string;
}

interface Button {
  name: string;
  buttonType: ButtonType;
  buttonMessage?: string;
}

interface FormScreen extends Screen {
  id: string;
  inputs: Input[];
  buttons: Button[];
  lookUpString?: string;
}

/**
 * Returns an an object based off the button object
 * @param name
 * @param type
 * @returns
 */
export const createButton = (name: string, type: ButtonType) => {
  const button: Button = { name, buttonType: type };
  return button;
};

/**
 * Returns an object based off the CustomError interface
 * @param name
 * @param type
 * @returns
 */
export const createError = (
  name: string,
  type: ErrorType,
  dependentFieldname?: string
) => {
  if (type !== ErrorType.MISMATCHING_INPUT) {
    const error: CustomError = { errorName: name, errorType: type };
    return error;
  }

  if (
    type === ErrorType.MISMATCHING_INPUT &&
    dependentFieldname === undefined
  ) {
    throw new Error(`Error type ${type} must also have dependentField`);
  } else {
    const error: CustomError = {
      errorName: name,
      errorType: type,
      dependentFieldname,
    };
    return error;
  }
};

/**
 * Returns an object based off the Input Interface
 * @param name
 * @param errors
 * @param enabled
 * @param inputType
 * @returns
 */
export const createInput = (
  name: string,
  errors: CustomError[],
  enabled: boolean,
  inputType: InputType
) => {
  const input: Input = {
    label: name,
    errors,
    enabled,
    inputType,
  };
  return input;
};

/**
 * Returns an object based off the FormScreen interface
 * @param id
 * @param inputs
 * @param buttons
 * @param screenId
 * @returns
 */
export const createForm = (
  id: string,
  inputs: Input[],
  buttons: Button[],
  screenId: string
) => {
  const form: FormScreen = {
    id,
    inputs,
    buttons,
    screenId,
  };
  return form;
};

/**
 * Generates a test for a button
 * @param button
 * @param screenId
 */
const testButton = (button: Button, screenId?: string) => {
  test(`Test ${button.name} works correctly`, async () => {
    const buttonName = button.name;
    const { buttonType } = button;

    const container = screenId
      ? screen.getByTestId(screenId)
      : screen.getByRole("form");
    const buttonElement = within(container)
      .getByText(buttonName)
      .closest("button");
    expect(buttonElement).toBeTruthy();
    switch (buttonType) {
      case ButtonType.SUBMIT:
        await waitFor(() => {
          expect(buttonElement).toBeDisabled();
        });
        break;
      case ButtonType.RESEND_CODE:
        expect(buttonElement).toBeDisabled();

        await waitFor(
          () => {
            expect(buttonElement).toBeEnabled();
          },
          { timeout: 70000 }
        );
        if (buttonElement) userEvent.click(buttonElement);

        await waitFor(() => {
          expect(buttonElement).toBeDisabled();
        });
        break;

      default:
        throw new Error(`No case for type ${buttonType}`);
    }
  }, 80000);
};

/**
 * Generates a test for an input field
 * @param input
 * @param screenId
 */
const testInputField = (input: Input, screenId?: string) => {
  test(`Test ${input.label} field works correctly`, async () => {
    let inputError: CustomError;
    const container = screenId
      ? await screen.findByTestId(screenId)
      : screen.getByRole("form");
    const inputName = input.label;
    const inputErrorList = input.errors;
    const inputEnabled = input.enabled;
    // Check that input was rendered
    const inputElement = within(container)
      .getByLabelText(inputName)
      .closest("input");
    expect(inputElement).toBeTruthy();
    if (inputEnabled) {
      expect(inputElement).toBeEnabled();
    } else {
      expect(inputElement).toBeDisabled();
    }
    for (let i = 0; i < inputErrorList.length; i++) {
      inputError = inputErrorList[i];
      // eslint-disable-next-line no-await-in-loop
      await testInputFieldError(inputError, inputElement, container);
    }
  });
};

/**
 * Makes assertions for differrent kinds of error types
 * @param inputError
 * @param inputElement
 * @param container
 */
const testInputFieldError = async (
  inputError: CustomError,
  inputElement: HTMLInputElement | null,
  container: HTMLElement
) => {
  let ErrorHTML: HTMLElement | null;
  let dependentFieldElement: HTMLElement | null;
  const { errorName, errorType } = inputError;
  if (errorType === ErrorType.INVALID_EMAIL) {
    if (inputElement) {
      userEvent.click(inputElement);
      userEvent.type(inputElement, "gooble");
      userEvent.click(container);
      ErrorHTML = await within(container).findByText(errorName);
      expect(ErrorHTML).toBeTruthy();
      expect(ErrorHTML).toHaveTextContent(errorName);
      userEvent.clear(inputElement);
    }
  } else if (errorType === ErrorType.INVALID_PASSWORD) {
    if (inputElement) {
      userEvent.click(inputElement);
      userEvent.type(inputElement, "gooble");
      userEvent.click(container);
    }
    ErrorHTML = await within(container).findByText(errorName);
    expect(ErrorHTML).toHaveTextContent(errorName);
    if (inputElement) userEvent.clear(inputElement);
  } else if (errorType === ErrorType.NO_INPUT) {
    if (inputElement) {
      userEvent.click(inputElement);
      userEvent.click(container);
    }
    ErrorHTML = await within(container).findByText(errorName);
    expect(ErrorHTML).toHaveTextContent(errorName);
  } else if (errorType === ErrorType.MISMATCHING_INPUT) {
    if (inputError.dependentFieldname) {
      dependentFieldElement = within(container)
        .getByLabelText(inputError.dependentFieldname)
        .closest("input");
      if (dependentFieldElement && inputElement) {
        userEvent.type(dependentFieldElement, "Welocme@12345");
        userEvent.type(inputElement, "Welocme@123");
        userEvent.click(container);
      }
      ErrorHTML = await within(container).findByText(errorName);
      expect(ErrorHTML).toHaveTextContent(errorName);
      if (dependentFieldElement && inputElement) {
        userEvent.clear(dependentFieldElement);
        userEvent.clear(inputElement);
      }
    }
  } else {
    throw new Error(`No case for type ${errorType}`);
  }
};

/**
 * Recreates the user behaviour of filling in a form correctly and submitting that form
 * @param inputs
 * @param buttons
 * @param screenId
 */
const fillInFieldsAndTestSubmission = (
  inputs: Input[],
  buttons: Button[],
  screenId?: string
) => {
  test(`Test that form can submit`, async () => {
    let buttonElement: HTMLButtonElement | null;
    let inputElement: HTMLInputElement | null;
    let input: Input;
    const container = screenId
      ? await screen.findByTestId(screenId)
      : await screen.findByRole("form");
    for (let j = 0; j < inputs.length; j++) {
      input = inputs[j];
      if (input.enabled) {
        if (input.inputType === InputType.EMAIL) {
          inputElement = within(container)
            .getByLabelText(input.label)
            .closest("input");
          if (inputElement)
            userEvent.type(inputElement, "zachriomed@hotmail.com");
        } else if (input.inputType === InputType.PASSWORD) {
          inputElement = within(container)
            .getByLabelText(input.label)
            .closest("input");
          if (inputElement) userEvent.type(inputElement, "Welcome@12345");
        } else if (input.inputType === InputType.USERNAME) {
          inputElement = within(container)
            .getByLabelText(input.label)
            .closest("input");
          if (inputElement) userEvent.type(inputElement, "Zach30210");
        } else if (input.inputType === InputType.KEY) {
          inputElement = within(container)
            .getByLabelText(input.label)
            .closest("input");
          if (inputElement) userEvent.type(inputElement, "30210");
        } else {
          throw new Error(`No case for type ${input.inputType}`);
        }
      }
    }

    for (let m = 0; m < buttons.length; m++) {
      if (buttons[m].buttonType === ButtonType.SUBMIT) {
        buttonElement = within(container)
          .getByText(buttons[m].name)
          .closest("button");
        // eslint-disable-next-line no-await-in-loop, @typescript-eslint/no-loop-func
        await waitFor(() => {
          expect(buttonElement).toBeEnabled();
        });
        if (buttonElement) userEvent.click(buttonElement);
        break;
      }
    }
  });
};

/**
 * Generates test to see if the screen that contains the form was rendered
 * @param inputs
 * @param buttons
 * @param id
 * @param screenId
 * @param lookUpString
 */
const rendersAsExpected = (
  inputs: Input[],
  buttons: Button[],
  id: string,
  screenId?: string,
  lookUpString?: string
) => {
  let formScreenHTML: HTMLElement;
  let textElement;
  test(`expect screen ${id} to appear correctly`, async () => {
    await customSleepfunc(3000);
    formScreenHTML = screenId
      ? await screen.findByTestId(screenId)
      : await screen.findByRole("form");
    expect(formScreenHTML).toBeTruthy();
    if (lookUpString) {
      textElement = within(formScreenHTML).queryByText(lookUpString);
      expect(textElement).toBeTruthy();
    }
  });
};

const customSleepfunc = (delay: number) =>
  new Promise((resolve) => setTimeout(resolve, delay));

/**
 * This function runs standard test for forms including
 * Renders as expected
 * Form Validation
 * Correct error messages
 * @param FormScreens
 */
export const generateFormTests = (FormScreens: FormScreen[]) => {
  FormScreens.map((formScreen) => {
    if (formScreen) {
      const { inputs, buttons, id, screenId } = formScreen;
      rendersAsExpected(inputs, buttons, id, screenId);
      buttons.map((button) => {
        testButton(button, screenId);
      });
      inputs.map((input) => {
        testInputField(input, screenId);
      });
      fillInFieldsAndTestSubmission(inputs, buttons, screenId);
    }
  }, 2000);
};

// Code for dropdown Menu starts here

/**
 * Generates a test for a drop down menu
 * @param name
 * @param menu
 */
export const generateDropDownTests = (name: string, menu: string[]) => {
  test(`${name} dropdown works and renders all menu items correctly`, () => {
    let buttonElement: HTMLElement | null;
    buttonElement = screen.getByText(name).closest("button");
    expect(buttonElement).toBeTruthy();
    expect(buttonElement).toBeEnabled();
    if (buttonElement) userEvent.click(buttonElement);
    menu.map(async (listItem) => {
      buttonElement = (await screen.findByText(listItem)).closest("button");
      expect(buttonElement).toBeTruthy();
      expect(buttonElement).toBeEnabled();
    });
  });
};

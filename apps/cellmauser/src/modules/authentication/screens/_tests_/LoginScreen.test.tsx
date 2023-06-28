import { configureStore } from "@reduxjs/toolkit";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { combineReducers } from "redux";

import translationReducer from "../../../../store/TranslationReducer";
import {
  ButtonType,
  createButton,
  createError,
  createForm,
  createInput,
  ErrorType,
  generateFormTests,
  InputType,
} from "../../../../utils/TestingModule";
import PatientReducer from "../../../patient/store/PatientReducer";
import LoginScreen from "../LoginScreen";

const rootReducer = combineReducers({
  language: translationReducer,
  patient: PatientReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

describe("All inputs and buttons work and produce the correct errors as expected for the forgot password functionality", () => {
  // First Screen
  const emailRequiredError = createError("Email required", ErrorType.NO_INPUT);
  const emailInvalidError = createError(
    "Please enter valid email",
    ErrorType.INVALID_EMAIL
  );
  const emailAddressField = createInput(
    "Email Address",
    [emailRequiredError, emailInvalidError],
    true,
    InputType.EMAIL
  );
  const firstNextButton = createButton("Next", ButtonType.SUBMIT);
  const firstScreen = createForm(
    "1",
    [emailAddressField],
    [firstNextButton],
    "CommonCellmaPopup"
  );
  // Second Screen
  const usernameRequiredError = createError(
    "Username required",
    ErrorType.NO_INPUT
  );
  const usernameField = createInput(
    "Username",
    [usernameRequiredError],
    true,
    InputType.USERNAME
  );
  const uniqueKeyRequiredError = createError(
    "Unique key required",
    ErrorType.NO_INPUT
  );
  const uniqueKeyField = createInput(
    "Unique Key",
    [uniqueKeyRequiredError],
    true,
    InputType.KEY
  );
  const secondNextButton = createButton("Next", ButtonType.SUBMIT);
  const resendCodeButton = createButton("Resend Code", ButtonType.RESEND_CODE);
  const secondScreen = createForm(
    "2",
    [usernameField, uniqueKeyField],
    [secondNextButton, resendCodeButton],
    "CommonCellmaPopup"
  );
  // Third Screen
  const newPasswordRequiredError = createError(
    "Password required",
    ErrorType.NO_INPUT
  );
  const newPasswordInvalidError = createError(
    "Please enter valid password",
    ErrorType.INVALID_PASSWORD
  );
  const confirmPasswordRequiredError = createError(
    "Confirm password required",
    ErrorType.NO_INPUT
  );
  const confirmPasswordMismatchError = createError(
    "Confirm password must be same as password",
    ErrorType.MISMATCHING_INPUT,
    "New Password"
  );
  const newPasswordField = createInput(
    "New Password",
    [newPasswordRequiredError, newPasswordInvalidError],
    true,
    InputType.PASSWORD
  );
  const confirmPasswordField = createInput(
    "Confirm Password",
    [
      confirmPasswordRequiredError,
      confirmPasswordMismatchError,
      newPasswordRequiredError,
    ],
    true,
    InputType.PASSWORD
  );
  const savePasswordButton = createButton("Save", ButtonType.SUBMIT);
  const thirdScreen = createForm(
    "3",
    [newPasswordField, confirmPasswordField],
    [savePasswordButton],
    "CommonCellmaPopup"
  );
  // Form Screens
  const FormScreens = [firstScreen, secondScreen, thirdScreen];

  beforeAll(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<LoginScreen onSuccess={() => {}} />} />
          </Routes>
        </Provider>
      </BrowserRouter>
    );
    const forgetPasswordButton = screen.getByTestId("ForgotPasswordBtn");
    userEvent.click(forgetPasswordButton);
  });

  afterAll(() => {
    cleanup();
  });
  generateFormTests(FormScreens);
});

describe("login form works as expected", () => {
  const usernameFieldRequiredError = createError(
    "Username required",
    ErrorType.NO_INPUT
  );
  const usernameField = createInput(
    "Username",
    [usernameFieldRequiredError],
    true,
    InputType.USERNAME
  );
  const passwordFieldRequiredError = createError(
    "Password required",
    ErrorType.NO_INPUT
  );
  const passwordFieldInvalidError = createError(
    "Please enter valid password",
    ErrorType.INVALID_PASSWORD
  );
  const passwordField = createInput(
    "Password",
    [passwordFieldRequiredError, passwordFieldInvalidError],
    true,
    InputType.PASSWORD
  );
  const loginButton = createButton("Login", ButtonType.SUBMIT);
  const loginFormScreen = createForm(
    "1",
    [usernameField, passwordField],
    [loginButton],
    "LoginForm"
  );

  beforeAll(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<LoginScreen onSuccess={() => {}} />} />
          </Routes>
        </Provider>
      </BrowserRouter>
    );
  });

  afterAll(() => {
    cleanup();
  });

  generateFormTests([loginFormScreen]);
});

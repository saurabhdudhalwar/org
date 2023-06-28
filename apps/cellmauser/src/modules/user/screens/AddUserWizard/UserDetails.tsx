import { useEffect, useState } from "react";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import * as Mui from "@mui/material";
import { useSelector } from "react-redux";

import * as Common from "../../../../common/CommonComponentsIndex";
import { isError } from "../../../../utils/GeneralUtils";
import * as validations from "../../../../utils/Validations";
import { useGetCustomUserDetails } from "../../api/useCustomUser";
import * as dummyData from "../../assets/dummyData/addUserWizardDummyData";
import translate from "../../assets/translationFiles/addUserWizardTranslation";

const GridItem = (props: any) => {
  return (
    <Mui.Grid item xs={4}>
      {props.children}
    </Mui.Grid>
  );
};

type Props = {
  addUserForm: any;
  listItems?: any;
  userAddFieldSettings?: any;
  getUserDetails?: any;
};

const UserDetails = (props: Props) => {
  const [isShowPassword, setIsShowPassword] = useState(true);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(true);

  const { language } = useSelector((state: any) => state.language);
  const [displayFields, setDisplayFields] = useState<any[]>([
    { id: 0, name: "username", type: "text", required: 1 },
    {
      id: 1,
      name: "profession",
      type: "select",
      required: 0,
      FormHelperText: "Add List Item",
    },
    { id: 2, name: "active", type: "select", required: 0 },
    { id: 3, name: "password", type: "text", required: 1 },
    { id: 4, name: "userExpiryDate", type: "text", required: 0 },
    { id: 5, name: "subscribed", type: "select", required: 1 },
    { id: 6, name: "confirmPassword", type: "text", required: 1 },
    { id: 7, name: "email", type: "text", required: 1 },
    { id: 8, name: "userResetPassword", type: "select", required: 0 },
    {
      id: 9,
      name: "title",
      type: "select",
      required: 0,
      FormHelperText: "Add List Item",
    },
    { id: 10, name: "mobile", type: "text", required: 0 },
    { id: 11, name: "showOn", type: "text", required: 0 },
    { id: 12, name: "givenName", type: "text", required: 1 },
    { id: 13, name: "familyName", type: "text", required: 1 },
    { id: 14, name: "userService", type: "select", required: 0 },
    { id: 15, name: "mcrnNumber", type: "text", required: 0 },
    { id: 16, name: "userServiceGroup", type: "text", required: 0 },
    { id: 17, name: "upn", type: "text", required: 0 },
  ]);
  const { data: getCustomDetailsResponse, isLoading: isCustomDetailsLoading } =
    useGetCustomUserDetails({
      pageName: "add user details",
      domainName: "user",
      displayViewType: "custom",
    });
  let dropdownList = props?.userAddFieldSettings ?? "";
  if (
    props?.userAddFieldSettings !== undefined &&
    props?.userAddFieldSettings !== ""
  ) {
    dropdownList = props?.userAddFieldSettings;
  }
  useEffect(() => {
    if (getCustomDetailsResponse !== undefined) {
      const cdfDisplayFieldJson = JSON.parse(
        getCustomDetailsResponse?.cdfDisplayFieldJson
      );
      setDisplayFields(
        cdfDisplayFieldJson?.customUserViewJson?.displayUserFields
      );
    }
  }, [getCustomDetailsResponse]);

  return (
    <>
      {isCustomDetailsLoading && (
        <Mui.Backdrop sx={{ zIndex: "1500" }} open>
          <Mui.CircularProgress color="primary" disableShrink />
        </Mui.Backdrop>
      )}
      <Mui.Grid item container xs={9} spacing={3}>
        {displayFields?.map((element: any) => {
          return (
            <GridItem key={element?.id}>
              {element?.name === "username" && (
                <Common.CellmaInputField
                  label={translate("username", language)}
                  required
                  name="username"
                  value={props?.addUserForm?.values?.username ?? ""}
                  onHandleChange={props?.addUserForm?.handleChange}
                  onBlur={props?.addUserForm?.handleBlur}
                  onKeyPress={validations.restrictSpace}
                  onPaste={validations.restrictPasteEventForSpaces}
                  errorText={isError(props?.addUserForm, "username")}
                />
              )}
              {element?.name === "profession" && (
                <Common.CellmaAutoSelectField
                  label={translate("profession", language)}
                  required
                  options={props?.listItems?.Profession}
                  name="profession"
                  value={props?.addUserForm?.values?.profession ?? ""}
                  onChange={(event: any, value: any) => {
                    props?.addUserForm?.setFieldValue("profession", value);
                  }}
                  getOptionLabel={(profession: any) => profession.eliText ?? ""}
                  renderOption={(props: any, profession: any) => (
                    <li {...props}>{profession.eliText}</li>
                  )}
                  onBlur={props?.addUserForm?.handleBlur}
                  error={isError(props?.addUserForm, "profession")}
                />
              )}
              {element?.name === "active" && (
                <Common.CellmaAutoSelectField
                  label={translate("active", language)}
                  options={dummyData.ACTIVE}
                  getOptionLabel={(active: any) => active.label ?? ""}
                  name="active"
                  value={props?.addUserForm?.values?.active}
                  onChange={(event: any, value: any) => {
                    props?.addUserForm?.setFieldValue("active", value);
                  }}
                  renderOption={(props: any, active: any) => (
                    <li {...props}>{active.label}</li>
                  )}
                />
              )}
              {element?.name === "password" && (
                <Common.CellmaInputField
                  type={isShowPassword ? "password" : "text"}
                  label={translate("password", language)}
                  required
                  name="password"
                  maxLength="64"
                  value={props?.addUserForm?.values?.password ?? ""}
                  onHandleChange={props?.addUserForm?.handleChange}
                  onBlur={props?.addUserForm?.handleBlur}
                  errorText={isError(props?.addUserForm, "password")}
                  endIcon={isShowPassword ? <VisibilityOff /> : <Visibility />}
                  handleClick={() => setIsShowPassword(!isShowPassword)}
                />
              )}
              {element?.name === "userExpiryDate" && (
                <Common.CellmaDatePicker
                  label={translate("userExpiryDate", language)}
                  maxDate={new Date("12/31/2050")}
                  value={props?.addUserForm?.values?.userExpiryDate ?? ""}
                  onChange={(newDate: Date | null) => {
                    props?.addUserForm?.setFieldValue(
                      "userExpiryDate",
                      newDate
                    );
                  }}
                  name="userExpiryDate"
                  onBlur={props?.addUserForm?.handleBlur}
                  error={isError(props?.addUserForm, "userExpiryDate")}
                />
              )}
              {element?.name === "subscribed" && (
                <Common.CellmaAutoSelectField
                  label={translate("subscribed", language)}
                  options={dummyData.SUBSCRIBED}
                  name="subscribed"
                  value={props?.addUserForm?.values?.subscribed}
                  onChange={(event: any, value: any) => {
                    props?.addUserForm?.setFieldValue("subscribed", value);
                  }}
                  getOptionLabel={(subscribed: any) => subscribed.label ?? ""}
                  renderOption={(props: any, subscribed: any) => (
                    <li {...props}>{subscribed.label}</li>
                  )}
                />
              )}
              {element?.name === "confirmPassword" && (
                <Common.CellmaInputField
                  type={isShowConfirmPassword ? "password" : "text"}
                  required
                  label={translate("confirmPassword", language)}
                  name="confirmPassword"
                  maxLength="64"
                  value={props?.addUserForm?.values?.confirmPassword ?? ""}
                  onHandleChange={props?.addUserForm?.handleChange}
                  onBlur={props?.addUserForm?.handleBlur}
                  errorText={isError(props?.addUserForm, "confirmPassword")}
                  endIcon={
                    isShowConfirmPassword ? <VisibilityOff /> : <Visibility />
                  }
                  handleClick={() =>
                    setIsShowConfirmPassword(!isShowConfirmPassword)
                  }
                />
              )}
              {element?.name === "email" && (
                <Common.CellmaInputField
                  label={translate("email", language)}
                  required
                  name="email"
                  value={props?.addUserForm?.values?.email ?? ""}
                  onHandleChange={props?.addUserForm?.handleChange}
                  onBlur={props?.addUserForm?.handleBlur}
                  errorText={isError(props?.addUserForm, "email")}
                />
              )}
              {element?.name === "userResetPassword" && (
                <Common.CellmaAutoSelectField
                  label={translate("userResetPassword", language)}
                  options={dummyData.USER_TO_PASSWORD_NEXT_LOGIN}
                  name="userResetPassword"
                  value={props?.addUserForm?.values?.userResetPassword}
                  onChange={(event: any, value: any) => {
                    props?.addUserForm?.setFieldValue(
                      "userResetPassword",
                      value
                    );
                  }}
                  getOptionLabel={(UserResetPassword: any) =>
                    UserResetPassword.label ?? ""
                  }
                  renderOption={(props: any, UserResetPassword: any) => (
                    <li {...props}>{UserResetPassword.label}</li>
                  )}
                />
              )}
              {element?.name === "title" && (
                <Common.CellmaAutoSelectField
                  label={translate("title", language)}
                  options={props?.listItems?.Title ?? ""}
                  name="title"
                  value={props?.addUserForm?.values?.title ?? ""}
                  onChange={(event: any, value: any) => {
                    props?.addUserForm?.setFieldValue("title", value);
                  }}
                  getOptionLabel={(userTitle: any) => userTitle.eliText ?? ""}
                  renderOption={(props: any, userTitle: any) => (
                    <li {...props}>{userTitle.eliText}</li>
                  )}
                />
              )}
              {element?.name === "mobile" && (
                <Common.CellmaInputField
                  label={translate("mobile", language)}
                  type="tel"
                  name="mobile"
                  value={props?.addUserForm?.values.mobile ?? ""}
                  onHandleChange={props?.addUserForm?.handleChange}
                  onBlur={validations.checkMobileValidation}
                  onKeyPress={validations.restrictAlphabetsAndSpecialCharacters}
                  onPaste={
                    validations.restrictPastingCharactersAndSpecialSymbols
                  }
                  onInput={(e: any) => {
                    e.target.value = e.target.value.toString().slice(0, 10);
                  }}
                />
              )}
              {element?.name === "showOn" && (
                <Common.CellmaAutoSelectField
                  label={translate("showOn", language)}
                  options={dummyData.SHOW_ON_EXTERNAL_REFERRAL_REQUEST}
                  getOptionLabel={(userShowOn: any) => userShowOn.label ?? ""}
                  name="showOn"
                  value={props?.addUserForm?.values?.showOn}
                  onChange={(event: any, value: any) => {
                    props?.addUserForm?.setFieldValue("showOn", value);
                  }}
                  renderOption={(props: any, userShowOn: any) => (
                    <li {...props}>{userShowOn.label}</li>
                  )}
                />
              )}
              {element?.name === "givenName" && (
                <Common.CellmaInputField
                  label={translate("givenName", language)}
                  required
                  name="givenName"
                  value={props?.addUserForm?.values?.givenName ?? ""}
                  onHandleChange={props?.addUserForm?.handleChange}
                  onBlur={props?.addUserForm?.handleBlur}
                  style={{ textTransform: "capitalize" }}
                  maxLength="15"
                  onKeyPress={validations.allowCharHyphenApostropheSpace}
                  errorText={isError(props?.addUserForm, "givenName")}
                  onPaste={
                    validations.restrictPasteEventForSpecialCharactersAndNumbersAndSpaces
                  }
                />
              )}
              {element?.name === "familyName" && (
                <Common.CellmaInputField
                  label={translate("familyName", language)}
                  required
                  name="familyName"
                  value={props?.addUserForm?.values?.familyName ?? ""}
                  onHandleChange={props?.addUserForm?.handleChange}
                  onBlur={props?.addUserForm?.handleBlur}
                  style={{ textTransform: "capitalize" }}
                  maxLength="20"
                  onKeyPress={validations.allowCharHyphenApostropheSpace}
                  errorText={isError(props?.addUserForm, "familyName")}
                  onPaste={
                    validations.restrictPasteEventForSpecialCharactersAndNumbersAndSpaces
                  }
                />
              )}
              {element?.name === "userService" && (
                <Common.CellmaAutoSelectField
                  label={translate("userService", language)}
                  options={props?.userAddFieldSettings?.services ?? ""}
                  name="userService"
                  value={props?.addUserForm?.values?.userService ?? ""}
                  onChange={(event: any, value: any) => {
                    props?.addUserForm?.setFieldValue("userService", value);
                  }}
                  getOptionLabel={(userUserService: any) =>
                    userUserService.cliName ?? ""
                  }
                  renderOption={(props: any, userUserService: any) => (
                    <li {...props}>{userUserService.cliName}</li>
                  )}
                />
              )}
              {element?.name === "mcrnNumber" && (
                <Common.CellmaInputField
                  label={translate("mcrnNumber", language)}
                  name="mcrnNumber"
                  value={props?.addUserForm?.values?.mcrnNumber ?? ""}
                  onHandleChange={props?.addUserForm?.handleChange}
                  onKeyPress={validations.allowDigitCharacterSpace}
                  onPaste={validations.restrictPasteEventForSpecialCharacters}
                />
              )}
              {element?.name === "userServiceGroup" && (
                <Common.CellmaAutoSelectField
                  label={translate("userServiceGroup", language)}
                  options={
                    props?.userAddFieldSettings?.serviceGroupDetails ?? ""
                  }
                  name="userServiceGroup"
                  value={props?.addUserForm?.values?.userServiceGroup ?? ""}
                  onChange={(event: any, value: any) => {
                    props?.addUserForm?.setFieldValue(
                      "userServiceGroup",
                      value
                    );
                  }}
                  getOptionLabel={(userServiceGroup: any) =>
                    userServiceGroup?.sgdName ?? ""
                  }
                  renderOption={(props: any, userServiceGroup: any) => (
                    <li {...props}>{userServiceGroup?.sgdName}</li>
                  )}
                />
              )}
              {element?.name === "upn" && (
                <Common.CellmaInputField
                  label={translate("upn", language)}
                  disabled
                  name="upn"
                  value={props?.addUserForm?.values?.upn ?? ""}
                  onHandleChange={props?.addUserForm?.handleChange}
                />
              )}
            </GridItem>
          );
        })}
      </Mui.Grid>
    </>
  );
};

export default UserDetails;

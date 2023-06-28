import { useEffect, useState } from "react";

import * as Mui from "@mui/material";
import { useSelector } from "react-redux";

import * as Common from "../../../../common/CommonComponentsIndex";
import * as validations from "../../../../utils/Validations";
import { useGetCustomUserDetails } from "../../api/useCustomUser";
import * as dummyData from "../../assets/dummyData/addUserWizardDummyData";
import translate from "../../assets/translationFiles/addUserWizardTranslation";

type Props = {
  userAddFieldSettings?: any;
  addUserForm: any;
  listItems?: any;
};

const GridItem = (props: any) => {
  return (
    <Mui.Grid item xs={3}>
      {props.children}
    </Mui.Grid>
  );
};
const UserContactDetails = (props: Props) => {
  const { language } = useSelector((state: any) => state.language);
  const [displayFields, setDisplayFields] = useState<any[]>([
    { id: 0, name: "initials", type: "select", required: 0 },
    { id: 1, name: "local", type: "select", required: 0 },
    { id: 2, name: "promsReason", type: "select", required: 0 },
    { id: 3, name: "promsNumber", type: "text", required: 0 },
    {
      id: 4,
      name: "specialty",
      type: "select",
      required: 0,
      FormHelperText: "Add List Item",
    },
    { id: 5, name: "consultant", type: "select", required: 0 },
    { id: 6, name: "firstConsultation", type: "text", required: 0 },
    { id: 7, name: "promsDoctorSurname", required: 0 },
    { id: 8, name: "show", type: "select", required: 0 },
    { id: 9, name: "consultantCode", type: "text", required: 0 },
    { id: 10, name: "followUpConsultation", type: "text", required: 0 },
    { id: 11, name: "genericHP", type: "select", required: 0 },
    { id: 12, name: "team", type: "select", required: 0 },
    {
      id: 13,
      name: "commissionLevel",
      required: 0,
      type: "select",
      FormHelperText: "Add List Item",
    },
    { id: 14, name: "npiNumber", type: "text", required: 0 },
    { id: 15, name: "sendAppointmentText", type: "select", required: 0 },
  ]);
  const {
    data: getCustomUserGroupDetailsResponse,
    isLoading: isCustomUserGroupDetailsLoading,
  } = useGetCustomUserDetails({
    pageName: "add user group details",
    domainName: "user",
    displayViewType: "custom",
  });

  useEffect(() => {
    if (getCustomUserGroupDetailsResponse !== undefined) {
      const cdfDisplayFieldJson = JSON.parse(
        getCustomUserGroupDetailsResponse?.cdfDisplayFieldJson
      );
      setDisplayFields(
        cdfDisplayFieldJson?.customUserGroupViewJson?.displayUserGroupFields
      );
    }
  }, [getCustomUserGroupDetailsResponse]);

  return (
    <>
      {isCustomUserGroupDetailsLoading && (
        <Mui.Backdrop sx={{ zIndex: "1500" }} open>
          <Mui.CircularProgress color="primary" disableShrink />
        </Mui.Backdrop>
      )}
      <Mui.Grid item container spacing={3}>
        {displayFields?.map((element: any) => {
          return (
            <>
              {element?.name === "initials" && (
                <GridItem>
                  <Common.CellmaInputField
                    label={translate("initials", language)}
                    name="initials"
                    maxLength="6"
                    value={props?.addUserForm?.values?.initials ?? ""}
                    onHandleChange={(event: any) =>
                      props?.addUserForm?.setFieldValue(
                        "initials",
                        event?.target?.value
                      )
                    }
                  />
                </GridItem>
              )}
              {element?.name === "local" && (
                <GridItem>
                  <Common.CellmaAutoSelectField
                    label={translate("local", language)}
                    options={dummyData.LOCAL}
                    name="local"
                    value={props?.addUserForm?.values?.local}
                    onChange={(event: any, value: any) => {
                      props?.addUserForm?.setFieldValue("local", value);
                    }}
                    getOptionLabel={(userLocal: any) => userLocal.label ?? ""}
                    renderOption={(props: any, userLocal: any) => (
                      <li {...props}>{userLocal.label}</li>
                    )}
                  />
                </GridItem>
              )}
              {element?.name === "promsReason" && (
                <GridItem>
                  <Common.CellmaAutoSelectField
                    label={translate("promsReason", language)}
                    options={props?.listItems?.["Referral Reason"]}
                    name="promsReason"
                    value={props?.addUserForm?.values?.promsReason}
                    onChange={(event: any, value: any) => {
                      props?.addUserForm?.setFieldValue("promsReason", value);
                    }}
                    getOptionLabel={(userPromsReason: any) =>
                      userPromsReason?.eliText ?? ""
                    }
                    renderOption={(props: any, userPromsReason: any) => (
                      <li {...props}>{userPromsReason.eliText}</li>
                    )}
                  />
                </GridItem>
              )}

              {element?.name === "promsNumber" && (
                <GridItem>
                  <Common.CellmaInputField
                    label={translate("promsNumber", language)}
                    name="promsNumber"
                    value={props?.addUserForm?.values.promsNumber ?? ""}
                    onHandleChange={props?.addUserForm?.handleChange}
                  />
                </GridItem>
              )}

              {element?.name === "specialty" && (
                <GridItem>
                  <Common.CellmaAutoSelectField
                    label={translate("specialty", language)}
                    options={props?.listItems?.Speciality}
                    name="specialty"
                    value={props?.addUserForm?.values?.specialty}
                    onChange={(event: any, value: any) => {
                      props?.addUserForm?.setFieldValue("specialty", value);
                    }}
                    getOptionLabel={(userSpecialty: any) =>
                      userSpecialty?.eliText ?? ""
                    }
                    renderOption={(props: any, userSpecialty: any) => (
                      <li {...props}>{userSpecialty.eliText}</li>
                    )}
                  />
                </GridItem>
              )}
              {element?.name === "consultant" && (
                <GridItem>
                  <Common.CellmaAutoSelectField
                    label={translate("consultant", language)}
                    options={dummyData.CONSULTANT}
                    name="consultant"
                    value={props?.addUserForm?.values?.consultant}
                    onChange={(event: any, value: any) => {
                      props?.addUserForm?.setFieldValue("consultant", value);
                    }}
                    getOptionLabel={(userConsultant: any) =>
                      userConsultant.label ?? ""
                    }
                    renderOption={(props: any, userConsultant: any) => (
                      <li {...props}>{userConsultant.label}</li>
                    )}
                  />
                </GridItem>
              )}
              {element?.name === "firstConsultation" && (
                <GridItem>
                  <Common.CellmaInputField
                    label={translate("firstConsultation", language)}
                    name="firstConsultation"
                    value={props?.addUserForm?.values?.firstConsultation ?? ""}
                    onHandleChange={props?.addUserForm?.handleChange}
                    maxLength="3"
                    onKeyPress={validations.allowOnlyDigit}
                    onPaste={
                      validations.restrictPasteEventForSpecialCharactersAndAlphabets
                    }
                  />
                </GridItem>
              )}
              {element?.name === "promsDoctorSurname" && (
                <GridItem>
                  <Common.CellmaInputField
                    label={translate("promsDoctorSurname", language)}
                    name="promsDoctorSurname"
                    value={props?.addUserForm?.values?.promsDoctorSurname ?? ""}
                    onHandleChange={props?.addUserForm?.handleChange}
                    maxLength="20"
                    onKeyPress={validations.allowDigitCharacterSpace}
                    onPaste={validations.restrictPasteEventForSpecialCharacters}
                  />
                </GridItem>
              )}
              {element?.name === "show" && (
                <GridItem>
                  <Common.CellmaAutoSelectField
                    label={translate("show", language)}
                    options={dummyData.SHOW}
                    name="show"
                    value={props?.addUserForm?.values?.show}
                    onChange={(event: any, value: any) => {
                      props?.addUserForm?.setFieldValue("show", value);
                    }}
                    getOptionLabel={(userShow: any) => userShow.label ?? ""}
                    renderOption={(props: any, userShow: any) => (
                      <li {...props}>{userShow.label}</li>
                    )}
                  />
                </GridItem>
              )}
              {element?.name === "consultantCode" && (
                <GridItem>
                  <Common.CellmaInputField
                    label={translate("consultantCode", language)}
                    name="consultantCode"
                    value={props?.addUserForm?.values?.consultantCode ?? ""}
                    onHandleChange={props?.addUserForm?.handleChange}
                    maxLength="10"
                  />
                </GridItem>
              )}
              {element?.name === "followUpConsultation" && (
                <GridItem>
                  <Common.CellmaInputField
                    label={translate("followUpConsultation", language)}
                    name="followUpConsultation"
                    value={
                      props?.addUserForm?.values?.followUpConsultation ?? ""
                    }
                    onHandleChange={props?.addUserForm?.handleChange}
                    maxLength="3"
                    onKeyPress={validations.allowOnlyDigit}
                    onPaste={
                      validations.restrictPasteEventForSpecialCharactersAndAlphabets
                    }
                  />
                </GridItem>
              )}

              {element?.name === "genericHP" && (
                <GridItem>
                  <Common.CellmaAutoSelectField
                    label={translate("genericHP", language)}
                    name="genericHP"
                    value={props?.addUserForm?.values?.genericHP}
                    options={dummyData.GENERIC_HP}
                    getOptionLabel={(userShowOn: any) => userShowOn.label ?? ""}
                    onChange={(event: any, value: any) => {
                      props?.addUserForm?.setFieldValue("genericHP", value);
                    }}
                    renderOption={(props: any, genericHP: any) => (
                      <li {...props}>{genericHP.label}</li>
                    )}
                  />
                </GridItem>
              )}
              {element?.name === "team" &&
                props?.userAddFieldSettings?.settings
                  ?.useSpecialityAndRegion === 1 && (
                  <GridItem>
                    <Common.CellmaAutoSelectField
                      label={translate("team", language)}
                      options={props?.listItems?.["HP Region"]}
                      getOptionLabel={(userTeam: any) => userTeam.eliText ?? ""}
                      name="team"
                      value={props?.addUserForm?.values?.team}
                      onChange={(event: any, value: any) => {
                        props?.addUserForm?.setFieldValue("team", value);
                      }}
                      renderOption={(props: any, userTeam: any) => (
                        <li {...props}>{userTeam.eliText}</li>
                      )}
                    />
                  </GridItem>
                )}
              {element?.name === "commissionLevel" && (
                <GridItem>
                  <Common.CellmaAutoSelectField
                    label={translate("commissionLevel", language)}
                    options={dummyData.COMMISSION_LEVEL}
                    name="commissionLevel"
                    value={props?.addUserForm?.values?.commissionLevel}
                    onChange={(event: any, value: any) => {
                      props?.addUserForm?.setFieldValue(
                        "commissionLevel",
                        value
                      );
                    }}
                    getOptionLabel={(userCommissionLevel: any) =>
                      userCommissionLevel.label ?? ""
                    }
                    renderOption={(props: any, userCommissionLevel: any) => (
                      <li {...props}>{userCommissionLevel.label}</li>
                    )}
                  />
                </GridItem>
              )}
              {element?.name === "npiNumber" && (
                <GridItem>
                  <Common.CellmaInputField
                    label={translate("npiNumber", language)}
                    name="npiNumber"
                    value={props?.addUserForm?.values?.npiNumber ?? ""}
                    onHandleChange={props?.addUserForm?.handleChange}
                    maxLength="45"
                  />
                </GridItem>
              )}
              {element?.name === "sendAppointmentText" && (
                <GridItem>
                  <Common.CellmaAutoSelectField
                    label={translate("sendAppointmentText", language)}
                    options={dummyData.SEND_APPOINTMENT_TEXT_MAIL}
                    getOptionLabel={(userSendAppointment: any) =>
                      userSendAppointment.label ?? ""
                    }
                    name="sendAppointmentText"
                    value={props?.addUserForm?.values?.sendAppointmentText}
                    onChange={(event: any, value: any) => {
                      props?.addUserForm?.setFieldValue(
                        "sendAppointmentText",
                        value
                      );
                    }}
                    renderOption={(props: any, userSendAppointment: any) => (
                      <li {...props}>{userSendAppointment.label}</li>
                    )}
                  />
                </GridItem>
              )}
            </>
          );
        })}
      </Mui.Grid>
    </>
  );
};

export default UserContactDetails;

import { MenuItem, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";

import { GridItem } from "./ExistingPatientDetails";
import * as Common from "../../../../common/CommonComponentsIndex";
import { isError } from "../../../../utils/GeneralUtils";
import * as validations from "../../../../utils/Validations";
import { INTERPRETER_REQUIRED } from "../../assets/dummyData/CreatePatientDummyData";
import translate from "../../assets/translationFiles/existingPatientDetailsTranslation";

const AdditionalDetails = (props: any) => {
  const { language } = useSelector((state: any) => state.language);
  const { estHidePipOnEmailMobilePage } = useSelector(
    (state: any) => state.patient
  );
  return (
    <Grid container paddingY="20px">
      <Grid container item spacing={{ xs: 2, md: 3 }}>
        <GridItem>
          <Common.CellmaInputField
            label={translate("aka", language)}
            name="patNameOtherLang"
            value={props?.data?.values?.patNameOtherLang ?? ""}
            onHandleChange={(event: any) => {
              props?.data?.handleChange(event);
              props.handleSaveButton(!event.target.value && event.target.value);
            }}
          />
        </GridItem>
        <GridItem>
          <Common.CellmaSelectField
            label={translate("interpreterRequired", language)}
            name="patNeedInterpreterAtAppointments"
            value={props?.data?.values?.patNeedInterpreterAtAppointments ?? ""}
            list={INTERPRETER_REQUIRED.map((interpreter: any) => (
              <MenuItem
                sx={{ whiteSpace: "unset" }}
                key={interpreter.id}
                value={interpreter.value}
              >
                {translate(`${interpreter.label}`, language)}
              </MenuItem>
            ))}
            changeevent={(event: any) => {
              props.handleSaveButton(!event.target.value && event.target.value);
              props?.data?.setFieldValue(
                "patNeedInterpreterAtAppointments",
                event.target.value
              );
            }}
          />
        </GridItem>
      </Grid>
      <Grid container item spacing={{ xs: 2, md: 3 }} paddingY="10px">
        <Grid item xs={12}>
          <Typography variant="h4">
            {translate("contactDetails", language)}
          </Typography>
        </Grid>

        <GridItem>
          <Common.CellmaInputField
            label={translate("email", language)}
            name="addEmail"
            ariaLabel="emailContactDetails"
            value={props?.data?.values?.addEmail ?? ""}
            onHandleChange={(event: any) => {
              props?.data.handleChange(event);
              props.handleSaveButton(!event.target.value && event.target.value);
            }}
            onBlur={props?.data?.handleBlur}
            errorText={isError(props?.data, "addEmail")}
          />
        </GridItem>
        <GridItem>
          <Common.CellmaInputField
            label={translate("mobile", language)}
            name="addMobile"
            ariaLabel="mobileContactDetails"
            maxLength="10"
            value={props?.data?.values?.addMobile ?? ""}
            onHandleChange={(event: any) => {
              props?.data?.handleChange(event);
              props.handleSaveButton(!event.target.value && event.target.value);
            }}
            onBlur={validations.checkMobileValidation}
            onKeyPress={validations.restrictAlphabetsAndSpecialCharacters}
            onPaste={validations.restrictCutCopyPaste}
          />
        </GridItem>
        <GridItem>
          <Common.CellmaInputField
            label={translate("phone", language)}
            name="addPhone"
            ariaLabel="phoneContactDetails"
            value={props?.data?.values?.addPhone ?? ""}
            onHandleChange={(event: any) => {
              props?.data?.handleChange(event);
              props.handleSaveButton(!event.target.value && event.target.value);
            }}
          />
        </GridItem>
      </Grid>
      {!estHidePipOnEmailMobilePage && (
        <Grid container item spacing={{ xs: 2, md: 3 }} paddingY="10px">
          <Grid item xs={12}>
            <Typography variant="h4">
              {translate("nextOfKin", language)}
            </Typography>
          </Grid>

          <GridItem>
            <Common.CellmaSelectField
              label={translate("title", language)}
              name="kinTitle"
              ariaLabel="titleNextOfKin"
              value={props?.data?.values?.kinTitle ?? ""}
              changeevent={(event: any) => {
                props?.data?.handleChange(event);
                props?.data?.setFieldValue("kinTitle", event.target.value);
                props.handleSaveButton(
                  !event.target.value && event.target.value
                );
              }}
              list={props?.patientTitle?.map((patientTitle: any) => (
                <MenuItem
                  sx={{ whiteSpace: "unset" }}
                  key={patientTitle.eliId}
                  value={patientTitle.eliText}
                >
                  {patientTitle.eliText}
                </MenuItem>
              ))}
            />
          </GridItem>
          <GridItem>
            <Common.CellmaInputField
              label={translate("givenName", language)}
              name="kinFirstname"
              ariaLabel="firstNameNextOfKin"
              value={props?.data?.values?.kinFirstname ?? ""}
              style={{ textTransform: "capitalize" }}
              onBlur={props?.data?.handleBlur}
              onHandleChange={(event: any) => {
                props?.data?.handleChange(event);
                props.handleSaveButton(
                  !event.target.value && event.target.value
                );
              }}
              maxLength="60"
              onKeyPress={validations.allowCharHyphenApostropheSpace}
              errorText={isError(props?.data, "kinFirstname")}
              onPaste={
                validations.restrictPasteEventForSpecialCharactersAndNumbers
              }
            />
          </GridItem>
          <GridItem>
            <Common.CellmaInputField
              label={translate("familyName", language)}
              name="kinSurname"
              ariaLabel="surnameNextOfKin"
              value={props?.data?.values?.kinSurname ?? ""}
              style={{ textTransform: "capitalize" }}
              onHandleChange={(event: any) => {
                props?.data?.handleChange(event);
                props.handleSaveButton(
                  !event.target.value && event.target.value
                );
              }}
              onBlur={props?.data?.handleBlur}
              maxLength="60"
              onKeyPress={validations.allowCharHyphenApostropheSpace}
              errorText={isError(props?.data, "kinSurname")}
              onPaste={
                validations.restrictPasteEventForSpecialCharactersAndNumbers
              }
            />
          </GridItem>

          <GridItem>
            <Common.CellmaSelectField
              label={translate("relationship", language)}
              name="kinRelationship"
              ariaLabel="relationshipNextOfKin"
              required
              value={props?.data?.values?.kinRelationship ?? ""}
              changeevent={(event: any) => {
                props?.data?.setFieldValue(
                  "kinRelationship",
                  event.target.value
                );
                props.handleSaveButton(
                  !event.target.value && event.target.value
                );
              }}
              error={isError(props?.data, "kinRelationship")}
              list={props?.relationship.map((relationship: any) => (
                <MenuItem
                  sx={{ whiteSpace: "unset" }}
                  key={relationship.eliId}
                  value={relationship.eliText}
                >
                  {relationship.eliText}
                </MenuItem>
              ))}
              blurevent={(event: any) => props.handleSaveButton(event)}
            />
          </GridItem>
          <GridItem>
            <Common.CellmaInputField
              label={translate("email", language)}
              name="kinEmail"
              ariaLabel="emailNextOfKin"
              value={props?.data?.values?.kinEmail ?? ""}
              onHandleChange={(event: any) => {
                props?.data?.handleChange(event);
                props.handleSaveButton(
                  !event.target.value && event.target.value
                );
              }}
              onBlur={props?.data?.handleBlur}
              errorText={isError(props?.data, "kinEmail")}
            />
          </GridItem>
          <GridItem>
            <Common.CellmaInputField
              label={translate("mobile", language)}
              name="kinMobile"
              ariaLabel="mobileNextOfKin"
              maxLength="10"
              value={props?.data?.values?.kinMobile ?? ""}
              onHandleChange={(event: any) => {
                props?.data?.handleChange(event);
                props.handleSaveButton(
                  !event.target.value && event.target.value
                );
              }}
              onBlur={validations.checkMobileValidation}
              onKeyPress={validations.restrictAlphabetsAndSpecialCharacters}
              onPaste={validations.restrictCutCopyPaste}
            />
          </GridItem>
          <GridItem>
            <Common.CellmaInputField
              label={translate("phone", language)}
              name="kinPhone"
              ariaLabel="phoneNextOfKin"
              value={props?.data?.values?.kinPhone ?? ""}
              onHandleChange={(event: any) => {
                props?.data?.handleChange(event);
                props.handleSaveButton(
                  !event.target.value && event.target.value
                );
              }}
            />
          </GridItem>
        </Grid>
      )}
    </Grid>
  );
};

export default AdditionalDetails;

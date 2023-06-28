import { useRef, useState } from "react";
import * as Mui from "@mui/material";
import { FieldArray, FormikProvider } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import * as Common from "../../../../common/CommonComponentsIndex";
import { setSnackbar } from "../../../../store/SnackbarAction";
import { isError } from "../../../../utils/GeneralUtils";
import * as validations from "../../../../utils/Validations";
import { usePatientReferralDisplay } from "../../api/usePatientReferral";
import * as dummyData from "../../assets/dummyData/addReferralDummyData";
import t from "../../assets/translationFiles/addReferralTranslation";

const OtherDetails = ({
  addReferralForm,
  establishmentListItem,
  setIsAssessment,
  setAcceptReferral,
  isAddReferralMode,
}: any) => {
  const dispatch = useDispatch();

  const { patientId } = useSelector((state: any) => state.patient);
  const { data: displayPatientReferral } = usePatientReferralDisplay(patientId);
  const settings = displayPatientReferral?.settings ?? {};

  const fileHandler = (event: any, index: any) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const allowedFileTypes = [
        "docx",
        "doc",
        "txt",
        "pdf",
        "html",
        "jpg",
        "odt",
        "htm",
        "png",
        "gif",
        "jpeg",
      ];
      const size = 20971520;
      const validateFile = validations.validateFileTypeAndSize(
        file,
        allowedFileTypes,
        size
      );
      if (validateFile !== "") {
        dispatch(setSnackbar(true, "error", t(validateFile), 4));
        addReferralForm.setFieldValue(
          `referralLetter[${index}].documentMultipart`,
          ""
        );
        addReferralForm.setFieldValue(
          `referralLetter[${index}].documentName`,
          ""
        );
        event.target.value = null;
      } else {
        addReferralForm.setFieldValue(
          `referralLetter[${index}].documentMultipart`,
          event.target.files[0]
        );
        addReferralForm.setFieldValue(
          `referralLetter[${index}].documentName`,
          event.target.files[0]?.name
        );
      }
      if (event.target.files.length === 0) {
        addReferralForm.setFieldValue(
          `referralLetter[${index}].documentName`,
          ""
        );
      }
    }
  };

  return (
    <>
      <Mui.Grid container item>
        <Mui.Grid item xs={12} sx={styles.referralHeader}>
          <Mui.Typography variant="h2">{t("otherDetails")}</Mui.Typography>
        </Mui.Grid>
      </Mui.Grid>
      <Mui.Grid container item spacing={4}>
        {(settings?.cliArrivalMethod === 2 ||
          settings?.cliArrivalMethod === 1) &&
          isAddReferralMode === "addReferralMode" && (
            <Mui.Grid item xs={3}>
              <Common.CellmaAutoSelectField
                label={t("methodOfArrival")}
                name="methodOfArrival"
                required={settings?.cliArrivalMethod === 1}
                options={establishmentListItem?.["Method Of Arrival"]}
                value={addReferralForm?.values?.methodOfArrival ?? ""}
                onChange={(event: any, value: any) => {
                  addReferralForm?.setFieldValue("methodOfArrival", value);
                }}
                getOptionLabel={(methodOfArrival: any) =>
                  methodOfArrival.eliText ?? ""
                }
                renderOption={(props: any, methodOfArrival: any) => (
                  <li {...props}>{methodOfArrival.eliText}</li>
                )}
                onBlur={addReferralForm?.handleBlur}
                error={isError(addReferralForm, "methodOfArrival")}
              />
            </Mui.Grid>
          )}
        {settings?.cliDisplayTypeOfTransport === 1 &&
          isAddReferralMode === "addReferralMode" && (
            <Mui.Grid item xs={3}>
              <Common.CellmaAutoSelectField
                label={t("typeOfTransport")}
                name="typeOfTransport"
                options={establishmentListItem?.["Type Of Transport"]}
                value={addReferralForm?.values?.typeOfTransport ?? ""}
                onChange={(event: any, value: any) => {
                  addReferralForm?.setFieldValue("typeOfTransport", value);
                }}
                getOptionLabel={(typeOfTransport: any) =>
                  typeOfTransport.eliText ?? ""
                }
                renderOption={(props: any, typeOfTransport: any) => (
                  <li {...props}>{typeOfTransport.eliText}</li>
                )}
              />
            </Mui.Grid>
          )}
        {isAddReferralMode === "addReferralMode" && (
          <Mui.Grid item xs={3}>
            <Common.CellmaTimePicker
              label={t("timeOfArrival")}
              name="timeOfArrival"
              onChange={(newTime: Date | null) => {
                addReferralForm?.setFieldValue("timeOfArrival", newTime);
              }}
              value={addReferralForm?.values?.timeOfArrival}
              onKeyPress={validations?.timeValidation}
              onBlur={addReferralForm?.handleBlur}
              error={isError(addReferralForm, "timeOfArrival")}
            />
          </Mui.Grid>
        )}
        {isAddReferralMode === "createOnReferral" && (
          <>
            <Mui.Grid item xs={3}>
              <Common.CellmaAutoSelectField
                label={t("emailNotification")}
                name="emailNotification"
                options={dummyData.EMAIL_NOTIFICATION}
                getOptionLabel={(EMAIL_NOTIFICATION: any) =>
                  EMAIL_NOTIFICATION.label ?? ""
                }
                renderOption={(props: any, EMAIL_NOTIFICATION: any) => (
                  <li {...props}>{EMAIL_NOTIFICATION.label}</li>
                )}
              />
            </Mui.Grid>
            <Mui.Grid item xs={3}>
              <Mui.FormControl>
                <Mui.FormControlLabel
                  label={t("sendAppointmentInviteForCreateOnReferral")}
                  labelPlacement="start"
                  name="InviteCheckBox"
                  control={
                    <Mui.Checkbox data-testid="Accept Referral Send Appointment" />
                  }
                />
              </Mui.FormControl>
            </Mui.Grid>
          </>
        )}
      </Mui.Grid>
      <Mui.Grid container item>
        <Mui.Grid item xs={12}>
          <Common.CellmaLink
            label={t("addTriageAssessment")}
            onClick={() => {
              setIsAssessment(true);
            }}
          >
            {t("addTriageAssessment")}
          </Common.CellmaLink>
        </Mui.Grid>
      </Mui.Grid>
      <Mui.Grid container item>
        <Mui.Grid item xs={12}>
          <Mui.Typography variant="h4">{t("referralLetter")}</Mui.Typography>
        </Mui.Grid>
      </Mui.Grid>

      <FormikProvider value={addReferralForm}>
        <FieldArray
          name="referralLetter"
          render={(arrayHelpers: any) => (
            <Mui.Grid container spacing={3} item sx={{ paddingX: "10px" }}>
              {addReferralForm?.values?.referralLetter?.map(
                (referralLetter: any, index: any) => (
                  <Mui.Grid
                    container
                    item
                    xs={12}
                    spacing={1}
                    key={referralLetter}
                  >
                    <Mui.Grid item xs={2.5} sx={styles.buttonGrid}>
                      <Mui.Button variant="contained" component="label">
                        {t("chooseFile")}
                        <input
                          type="file"
                          accept=".jpeg,.pdf,.docx,.doc,.txt,.html,.jpg,.odt,.htm,.png,.gif"
                          name={`referralLetter[${index}].documentMultipart`}
                          onChange={(event: any) => {
                            fileHandler(event, index);
                          }}
                          onBlur={addReferralForm?.handleBlur}
                          hidden
                        />
                      </Mui.Button>

                      {addReferralForm?.values?.referralLetter[index]
                        .documentName !== "" ? (
                        <Mui.Tooltip
                          title={
                            addReferralForm?.values?.referralLetter[index]
                              .documentName
                          }
                        >
                          <Mui.Typography sx={styles.typographyGrid}>
                            {addReferralForm?.values?.referralLetter[
                              index
                            ].documentName?.substring(0, 15)}
                            .
                          </Mui.Typography>
                        </Mui.Tooltip>
                      ) : (
                        <Mui.Typography sx={styles.typographyGrid}>
                          {t("noFileChosen")}
                        </Mui.Typography>
                      )}
                    </Mui.Grid>

                    <Mui.Grid item xs={2.5}>
                      <Common.CellmaSelectField
                        label={t("displayName")}
                        name={`referralLetter[${index}].documentDisplayName`}
                        value={
                          addReferralForm?.values?.referralLetter[index]
                            .documentDisplayName ?? ""
                        }
                        changeevent={addReferralForm.handleChange}
                        list={establishmentListItem?.["Display Name"]?.map(
                          (displayName: any) => (
                            <Mui.MenuItem
                              key={displayName.eliId}
                              value={displayName.eliId}
                              sx={{ whiteSpace: "unset" }}
                            >
                              {displayName.eliText}
                            </Mui.MenuItem>
                          )
                        )}
                      />
                    </Mui.Grid>

                    <Mui.Grid item xs={4}>
                      <Common.CellmaInputField
                        label={t("notes")}
                        ariaLabel={`notesReferralLetter${index}`}
                        placeholder="Notes"
                        multiline
                        rows="3"
                        name={`referralLetter[${index}].documentDescription`}
                        value={
                          addReferralForm?.values?.referralLetter[index]
                            .documentDescription ?? ""
                        }
                        onHandleChange={addReferralForm.handleChange}
                        onBlur={addReferralForm.handleBlur}
                        errorText={isError(
                          addReferralForm,

                          "documentDescription"
                        )}
                      />
                    </Mui.Grid>

                    <Mui.Grid item xs={2} sx={{ ml: "30px" }}>
                      <Common.CellmaButton
                        label={t("addAdditionalDocuments")}
                        onClick={() => {
                          arrayHelpers.push({
                            documentName: "",
                            documentMultipart: "",
                            documentDescription: "",
                            documentDisplayName: "",
                          });
                        }}
                      />
                    </Mui.Grid>
                  </Mui.Grid>
                )
              )}
            </Mui.Grid>
          )}
        />
      </FormikProvider>
      <Mui.Grid container item sx={{ mt: "50px", paddingX: "13px" }}>
        {isAddReferralMode === "addReferralMode" && (
          <Mui.Grid item xs={3.5}>
            <Mui.FormControl>
              <Mui.RadioGroup
                name="controlled-radio-buttons-group"
                defaultValue="acceptReferral"
                aria-label="referral-radio-buttons-group"
                id="referral-radio-buttons-group-label"
              >
                <Mui.FormControlLabel
                  value="awaitReferralAcceptance"
                  data-testid="Await Referral Acceptance"
                  control={<Mui.Radio />}
                  label={t("awaitReferralAcceptance")}
                  name="refInvite"
                  onChange={(event: any) => {
                    addReferralForm.handleChange(event);
                    setAcceptReferral(event.target.value);
                  }}
                />
                <Mui.FormControlLabel
                  value="acceptReferral"
                  data-testid="Accept Referral"
                  control={<Mui.Radio />}
                  label={t("acceptReferral")}
                  name="refInvite"
                  onChange={addReferralForm.handleChange}
                />
                <Mui.FormControlLabel
                  value="acceptReferral&ScheduleAppointment"
                  data-testid="Accept Referral & Schedule Appointment"
                  control={<Mui.Radio />}
                  label={t("acceptReferral&ScheduleAppointment")}
                  name="refInvite"
                  onChange={(event: any) => {
                    addReferralForm.handleChange(event);
                    setAcceptReferral(event.target.value);
                  }}
                />
                <Mui.FormControlLabel
                  value="acceptReferralBookPatientBed"
                  data-testid="Accept Referral Book Patient Bed"
                  control={<Mui.Radio />}
                  label={t("bookPatientBed")}
                  name="refInvite"
                  onChange={addReferralForm.handleChange}
                />
                <Mui.FormControlLabel
                  value="acceptReferralSendAppointment"
                  control={
                    <Mui.Radio data-testid="Accept Referral Send Appointment" />
                  }
                  label={t("sendAppointmentInvite")}
                  name="refInvite"
                  onChange={addReferralForm.handleChange}
                />
                <Mui.FormControlLabel
                  value="acceptReferral&AddToTraumaList"
                  control={
                    <Mui.Radio data-testid="Accept Referral & Add To Trauma List" />
                  }
                  label={t("addToTraumaList")}
                  name="refInvite"
                  onChange={addReferralForm.handleChange}
                />
              </Mui.RadioGroup>
            </Mui.FormControl>
          </Mui.Grid>
        )}
        <Mui.Grid item xs={5.5}>
          <Common.CellmaInputField
            rows="4 "
            multiline
            label={t("notes")}
            name="notes"
            placeholder={t("notes")}
            value={addReferralForm.values.notes}
            onHandleChange={addReferralForm.handleChange}
            onBlur={addReferralForm.handleBlur}
          />
        </Mui.Grid>
      </Mui.Grid>
    </>
  );
};

export default OtherDetails;

export const styles = {
  referralHeader: {
    backgroundColor: "primary.light",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "5px",
  },
  buttonGrid: {
    display: "flex",
    alignItems: "flex-start",
    mb: "15px",
  },
  typographyGrid: {
    mt: "12px",
    color: "primary.main",
    ml: "10px",
  },
};

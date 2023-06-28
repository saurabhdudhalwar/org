import * as React from "react";
import { useEffect, useState } from "react";

import {
  Backdrop,
  Box,
  CircularProgress,
  MenuItem,
  Switch,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Formik, FormikProps } from "formik";
import moment from "moment";
import { useSelector } from "react-redux";
import * as yup from "yup";

import useEstablishmentListItems from "../../../../api/useEstablishmentListItems";
import * as Common from "../../../../common/CommonComponentsIndex";
import { isError } from "../../../../utils/GeneralUtils";
import * as validations from "../../../../utils/Validations";
import useUpdatePIPAddress from "../../api/usePIPAddress";
import { useGetPIPDetails, useUpdatePIPDetails } from "../../api/usePIPDetails";
import * as dummyData from "../../assets/dummyData/CreatePatientDummyData";
import translate from "../../assets/translationFiles/patientDetailsTranslation";
import MakeInterestedParties from "../createPatient/MakeInterestedParties";

interface Props {
  isIntrested?: boolean; // correct ?
  pipId: number;
  showEditPIP: (bool: boolean) => void;
}

const PatientPIP: React.FC<Props> = (props) => {
  const [isSameAddress, setIsSameAddress] = useState(true);
  const [isShowPopup, setIsShowPopup] = useState(true);
  const { language } = useSelector((state: any) => state.language);
  const { estID } = useSelector((state: any) => state.auth);
  const { data: pipDetails, isLoading: pipDetailsLoading } = useGetPIPDetails(
    props?.pipId
  );
  const { mutate: updatePIPDetails, data: updatePIPDetailsResponse } =
    useUpdatePIPDetails();
  const { mutate: updatePIPAddress } = useUpdatePIPAddress();
  const {
    data: establishmentListItem,
    isLoading: establishmentListItemIsLoading,
  } = useEstablishmentListItems([
    "title",
    "ethnicity",
    "occupation",
    "relationship",
    "patient identifiers",
  ]);
  const { estPatientPostcodeMandatory } = useSelector(
    (state: any) => state.auth
  );

  const { patientId, estHidePipSectionsConsentPhotographTextemail } =
    useSelector((state: any) => state.patient);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (updatePIPDetailsResponse?.status === 200) props.showEditPIP(false);
  }, [props, updatePIPDetailsResponse]);

  const initialValues = {
    pipTitle: "",
    pipSurname: "",
    pipFirstname: "",
    pipMiddlename: "",
    pipDob: "",
    pipGender: "",
    pipEthnicityId: "",
    pipOccupationId: "",
    pipNextOfKin: "0",
    pipFamilyAwareIllness: "0",
    pipRelationship: "",
    pipIdentifierType: "",
    pipIdentifierNumber: "",
    externalProfessional: "",
    pipProfessionalTitle: "",
    pipReceivePatientLetter: "",
    pipReceivePatApptLetter: "",
    pipPartnerPrint: "0",
    pipSendTxtEmail: "0",
    pipIsReferrer: "0",
    pipNotes: "",
    addAddress1: "",
    addAddress2: "",
    addAddress3: "",
    addAddress4: "",
    addAddress5: "",
    addAddress6: "",
    addLocale: "",
    addWorkPhone: "",
    addFax: "",
    addMobile: "",
    addEmail: "",
    partnerCare: "0",
    partnerCareDate: new Date(),
    helpingPatient: "0",
    helpingPatientDate: new Date(),
    photographed: "0",
    photographedDate: new Date(),
    generalPublicity: "0",
    generalPublicityDate: new Date(),
  };
  return (
    <>
      {(establishmentListItemIsLoading || pipDetailsLoading) && (
        <Backdrop sx={{ zIndex: "1500" }} open>
          <CircularProgress />
        </Backdrop>
      )}
      <Formik
        enableReinitialize
        initialValues={{
          ...initialValues,
          ...pipDetails?.address,
          ...pipDetails?.pipDetails,
        }}
        validationSchema={yup.object().shape({
          pipSurname: yup
            .string()
            .required(translate("familyNameRequired", language)),
          pipFirstname: yup
            .string()
            .required(translate("givenNameRequired", language)),
          externalProfessional: yup
            .string()
            .min(3, translate("externalProfessionalSearchMsg", language)),
          pipDob: yup
            .date()
            .nullable()
            .typeError(translate("invalidBornDate", language))
            .required(translate("bornDateRequired", language))
            .min(new Date("01/01/1900"), translate("invalidBornDate", language))
            .max(new Date(), translate("futureDateAlert", language)),
          addEmail: yup.string().email(translate("validEmailMsg", language)),
          pipRelationship: yup
            .string()
            .required(translate("relationshipRequired", language)),
          addAddress5: yup.string().when([], {
            is: () => estPatientPostcodeMandatory === 1,
            then: yup.string().required("Postcode required"),
            otherwise: yup.string().notRequired(),
          }),
        })}
        onSubmit={(values: any) => {
          const {
            addAddress1,
            addAddress2,
            addAddress3,
            addAddress4,
            addAddress5,
            addAddress6,
            addLocale,
            addWorkPhone,
            addFax,
            addId,
            addMobile,
            addEmail,
            ...result
          } = values;
          const detailsobj = {
            ...result,
            pipId: props?.pipId,
            pipPatId: patientId,
            pipAddId: pipDetails?.address.addId,
            pipDob: moment(values?.pipDob).format("YYYY-MM-DD"),
          };
          const addressObj = {
            pipId: props.pipId,
            patId: patientId,
            addAddress1,
            addAddress2,
            addAddress3,
            addAddress4,
            addAddress5,
            addAddress6,
            addLocale,
            addWorkPhone,
            addFax,
            addMobile: addMobile.toString(),
            addEmail,
            addId,
            addEstId: parseInt(estID, 10),
          };
          updatePIPDetails(detailsobj);
          updatePIPAddress(addressObj);
        }}
      >
        {(data: FormikProps<any>) => {
          return (
            <form onSubmit={data.handleSubmit} noValidate>
              <Grid container item xs={12} rowSpacing={4} columnSpacing={6}>
                <Grid item xs={3}>
                  <Common.CellmaSelectField
                    label={translate("title", language)}
                    name="pipTitle"
                    value={data.values.pipTitle}
                    changeevent={(event: any) => {
                      const result = validations.genderTitleHandler(
                        event,
                        data,
                        "title"
                      );
                      if (result[0] !== "") {
                        alert(translate(result[0], language));
                      }
                      data.setFieldValue("pipTitle", event.target.value);
                      data.setFieldValue("pipGender", result[1]);
                    }}
                    list={establishmentListItem.title.map((title: any) => (
                      <MenuItem
                        sx={{ whiteSpace: "unset" }}
                        key={title.eliId}
                        value={title.eliText}
                      >
                        {title.eliText}
                      </MenuItem>
                    ))}
                  />
                </Grid>

                <Grid item xs={3}>
                  <Common.CellmaInputField
                    required
                    label={translate("familyName", language)}
                    name="pipSurname"
                    value={data.values.pipSurname}
                    style={{ textTransform: "capitalize" }}
                    onHandleChange={data.handleChange}
                    onBlur={data.handleBlur}
                    maxLength="40"
                    onKeyPress={validations.allowCharHyphenApostropheSpace}
                    errorText={
                      data.touched.pipSurname && data.errors.pipSurname
                    }
                    onPaste={
                      validations.restrictPasteEventForSpecialCharactersAndNumbers
                    }
                  />
                </Grid>

                <Grid item xs={3}>
                  <Common.CellmaInputField
                    required
                    label={translate("givenName", language)}
                    name="pipFirstname"
                    value={data.values.pipFirstname}
                    style={{ textTransform: "capitalize" }}
                    onHandleChange={data.handleChange}
                    onBlur={data.handleBlur}
                    maxLength="60"
                    onKeyPress={validations.allowCharHyphenApostropheSpace}
                    errorText={
                      data.touched.pipFirstname && data.errors.pipFirstname
                    }
                    onPaste={
                      validations.restrictPasteEventForSpecialCharactersAndNumbers
                    }
                  />
                </Grid>

                <Grid item xs={3}>
                  <Common.CellmaInputField
                    label={translate("middleName", language)}
                    name="pipMiddlename"
                    value={data.values.pipMiddlename}
                    onHandleChange={data.handleChange}
                    onKeyPress={validations.allowCharHyphenApostropheSpace}
                    onPaste={
                      validations.restrictPasteEventForSpecialCharactersAndNumbers
                    }
                  />
                </Grid>

                <Grid item xs={3}>
                  <Common.CellmaDatePicker
                    required
                    label={translate("born", language)}
                    zIndex={1400}
                    value={data.values.pipDob}
                    maxDate={new Date()}
                    onChange={(newDate: Date | null) => {
                      data.setFieldValue("pipDob", newDate);
                    }}
                    name="pipDob"
                    onBlur={data.handleBlur}
                    error={data.touched.pipDob && data.errors.pipDob}
                  />
                </Grid>

                <Grid item xs={3}>
                  <Common.CellmaSelectField
                    label={translate("sex", language)}
                    name="pipGender"
                    value={data.values.pipGender}
                    changeevent={(event: any) => {
                      const result = validations.genderTitleHandler(
                        event,
                        data,
                        "pipGender"
                      );
                      if (result[0] !== "") {
                        alert(translate(result[0], language));
                      }
                      data.setFieldValue("pipTitle", result[1]);
                      data.setFieldValue("pipGender", event.target.value);
                    }}
                    list={dummyData.PATIENT_GENDER.map(
                      (gender: any) =>
                        gender.label !== "all" && (
                          <MenuItem
                            sx={{ whiteSpace: "unset" }}
                            key={gender.id}
                            value={gender.value}
                          >
                            {translate(`${gender.label}`, language)}
                          </MenuItem>
                        )
                    )}
                  />
                </Grid>

                <Grid item xs={3}>
                  <Common.CellmaSelectField
                    label={translate("ethnicity", language)}
                    name="pipEthnicityId"
                    value={data.values.pipEthnicityId}
                    changeevent={data.handleChange}
                    list={establishmentListItem.ethnicity.map(
                      (ethnicity: any) => (
                        <MenuItem key={ethnicity.eliId} value={ethnicity.eliId}>
                          {ethnicity.eliText}
                        </MenuItem>
                      )
                    )}
                  />
                </Grid>

                <Grid item xs={3}>
                  <Common.CellmaSelectField
                    label={translate("occupation", language)}
                    name="pipOccupationId"
                    value={data.values.pipOccupationId}
                    changeevent={data.handleChange}
                    list={establishmentListItem.occupation.map(
                      (occupation: any) => (
                        <MenuItem
                          sx={{ whiteSpace: "unset" }}
                          key={occupation.eliId}
                          value={occupation.eliId}
                        >
                          {occupation.eliText}
                        </MenuItem>
                      )
                    )}
                  />
                </Grid>

                <Grid item xs={3}>
                  <Common.CellmaInputField
                    label={translate("mobile", language)}
                    type="tel"
                    name="addMobile"
                    value={data.values.addMobile}
                    onHandleChange={data.handleChange}
                    onBlur={validations.checkMobileValidation}
                    onKeyPress={
                      validations.restrictAlphabetsAndSpecialCharacters
                    }
                    onPaste={
                      validations.restrictPastingCharactersAndSpecialSymbols
                    }
                    onInput={(e: any) => {
                      e.target.value = e.target.value.toString().slice(0, 10);
                    }}
                  />
                </Grid>

                <Grid item xs={3}>
                  <Common.CellmaInputField
                    label={translate("email", language)}
                    name="addEmail"
                    value={data.values.addEmail}
                    onHandleChange={data.handleChange}
                    onBlur={data.handleBlur}
                    errorText={data.touched.addEmail && data.errors.addEmail}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Common.CellmaSelectField
                    label={translate("relationship", language)}
                    name="pipRelationship"
                    value={data.values.pipRelationship}
                    changeevent={data.handleChange}
                    required
                    error={
                      data.touched.pipRelationship &&
                      data.errors.pipRelationship
                    }
                    list={establishmentListItem.relationship.map(
                      (relationship: any) => (
                        <MenuItem
                          sx={{ whiteSpace: "unset" }}
                          key={relationship.eliId}
                          value={relationship.eliText}
                        >
                          {relationship.eliText}
                        </MenuItem>
                      )
                    )}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Common.CellmaSelectField
                    label={translate("nextOfKin", language)}
                    name="pipNextOfKin"
                    value={data.values.pipNextOfKin}
                    changeevent={data.handleChange}
                    list={dummyData.NEXT_OF_KIN.map((kin: any) => (
                      <MenuItem key={kin.id} value={kin.value}>
                        {translate(`${kin.label}`, language)}
                      </MenuItem>
                    ))}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Common.CellmaSelectField
                    label={translate("familyAwareOfIllness", language)}
                    name="pipFamilyAwareIllness"
                    value={data.values.pipFamilyAwareIllness}
                    list={dummyData.FAMILY_AWARE_OF_ILLNESS.map(
                      (ilness: any) => (
                        <MenuItem
                          sx={{ whiteSpace: "unset" }}
                          key={ilness.id}
                          value={ilness.value}
                        >
                          {translate(`${ilness.label}`, language)}
                        </MenuItem>
                      )
                    )}
                  />
                </Grid>

                <Grid item xs={3}>
                  <Common.CellmaSelectField
                    label={translate("identifierType", language)}
                    name="pipIdentifierType"
                    value={data.values.pipIdentifierType}
                    changeevent={data.handleChange}
                    list={establishmentListItem?.["patient identifiers"].map(
                      (identifier: any) => (
                        <MenuItem
                          key={identifier.eliId}
                          value={identifier.eliText}
                        >
                          {identifier.eliText}
                        </MenuItem>
                      )
                    )}
                  />
                </Grid>

                <Grid item xs={3}>
                  <Common.CellmaInputField
                    label={translate("identifierNumber", language)}
                    name="pipIdentifierNumber"
                    value={data.values.pipIdentifierNumber}
                    onHandleChange={data.handleChange}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Common.CellmaInputField
                    label={translate("externalProfessional", language)}
                    name="externalProfessional"
                    value={data.values.externalProfessional}
                    onHandleChange={data.handleChange}
                    onBlur={data.handleBlur}
                    onKeyPress={validations.allowCharHyphenApostropheSpace}
                    errorText={
                      data.touched.externalProfessional &&
                      data.errors.externalProfessional
                    }
                    onPaste={
                      validations.restrictPasteEventForSpecialCharactersAndNumbers
                    }
                  />
                </Grid>

                <Grid item xs={3}>
                  <Common.CellmaInputField
                    label={translate("professionalTitle", language)}
                    name="pipProfessionalTitle"
                    maxLength="11"
                    value={data.values.pipProfessionalTitle}
                    onHandleChange={data.handleChange}
                    onKeyPress={validations.allowDigitCharacterSpace}
                    onPaste={validations.restrictCutCopyPaste}
                  />
                </Grid>

                {estHidePipSectionsConsentPhotographTextemail !== 1 && (
                  <Grid item xs={3}>
                    <Common.CellmaSelectField
                      label={translate("receivePatientLetter", language)}
                      name="pipReceivePatientLetter"
                      value={data.values.pipReceivePatientLetter}
                      changeevent={data.handleChange}
                      list={dummyData.RECEIVE_PATIENT_LATTER.map(
                        (letter: any) => (
                          <MenuItem
                            sx={{ whiteSpace: "unset" }}
                            key={letter.id}
                            value={letter.value}
                          >
                            {translate(`${letter.label}`, language)}
                          </MenuItem>
                        )
                      )}
                    />
                  </Grid>
                )}
                {estHidePipSectionsConsentPhotographTextemail !== 1 && (
                  <Grid item xs={3}>
                    <Common.CellmaSelectField
                      label={translate("receiveAppointmentLetters", language)}
                      name="pipReceivePatApptLetter"
                      value={data.values.pipReceivePatApptLetter}
                      changeevent={data.handleChange}
                      list={dummyData.RECEIVE_APPOINTMENT_LETTERS.map(
                        (letter: any) => (
                          <MenuItem key={letter.id} value={letter.value}>
                            {translate(`${letter.label}`, language)}
                          </MenuItem>
                        )
                      )}
                    />
                  </Grid>
                )}
                <Grid item xs={3}>
                  <Common.CellmaSelectField
                    label={translate(
                      "printPartnerDetailsOnBirthRegistrationForm",
                      language
                    )}
                    name="pipPartnerPrint"
                    value={data.values.pipPartnerPrint}
                    changeevent={data.handleChange}
                    list={dummyData.PRINT_PARTNER_DETAILS_ON_BIRTH_REGISTRATION_FORM.map(
                      (patientWeb: any) => (
                        <MenuItem
                          sx={{ whiteSpace: "unset" }}
                          key={patientWeb.id}
                          value={patientWeb.value}
                        >
                          {translate(`${patientWeb.label}`, language)}
                        </MenuItem>
                      )
                    )}
                  />
                </Grid>
                {estHidePipSectionsConsentPhotographTextemail !== 1 && (
                  <Grid item xs={3}>
                    <Common.CellmaCheckbox
                      label={translate("sendPatientText/Email", language)}
                      inputName="pipSendTxtEmail"
                      value={data.values.pipSendTxtEmail}
                      onHandleChange={data.handleChange}
                    />
                  </Grid>
                )}
                <Grid item xs={3}>
                  <Common.CellmaCheckbox
                    label={translate("isReferrer", language)}
                    inputName="pipIsReferrer"
                    value={data.values.pipIsReferrer}
                    onHandleChange={data.handleChange}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    rows="2"
                    multiline
                    label={translate("notes", language)}
                    name="pipNotes"
                    value={data.values.pipNotes}
                    onChange={data.handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h3">
                    {translate("makePipAddressSameAsPatientAddress", language)}
                    <Switch
                      checked={isSameAddress}
                      onChange={() => {
                        setIsSameAddress(!isSameAddress);
                        setIsShowPopup(true);
                      }}
                      inputProps={{
                        "aria-label": "makePipAddressSameAsPatientAddress",
                      }}
                    />
                  </Typography>
                </Grid>
                {estHidePipSectionsConsentPhotographTextemail !== 1 && (
                  <Grid item xs={12}>
                    <MakeInterestedParties data={[]} />
                  </Grid>
                )}

                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mt: "50px",
                  }}
                >
                  <Common.CellmaButton
                    label={translate("save", language)}
                    type="submit"
                    onClick={() => {
                      if (data?.errors) {
                        window.scrollTo(0, 0);
                      }
                    }}
                  />
                </Grid>
                {!isSameAddress && isShowPopup && (
                  <Common.CellmaPopup
                    title={translate("add/EditAnAddress", language)}
                    handleCancel={() => {
                      setIsSameAddress(!isSameAddress);
                    }}
                  >
                    <Box>
                      <Grid
                        container
                        spacing={3}
                        sx={styles.addressPopupContaintGrid}
                      >
                        <Grid item xs={6}>
                          <Common.CellmaInputField
                            label={translate("number&Road", language)}
                            name="addAddress1"
                            value={data.values.addAddress1}
                            onHandleChange={data.handleChange}
                          />
                        </Grid>

                        <Grid item xs={6}>
                          <Common.CellmaInputField
                            label={translate("district", language)}
                            name="addAddress2"
                            value={data.values.addAddress2}
                            onHandleChange={data.handleChange}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Common.CellmaInputField
                            label={translate("town", language)}
                            name="addAddress3"
                            value={data.values.addAddress3}
                            onHandleChange={data.handleChange}
                          />
                        </Grid>

                        <Grid item xs={6}>
                          <Common.CellmaInputField
                            label={translate("county", language)}
                            name="addAddress4"
                            value={data.values.addAddress4}
                            onHandleChange={data.handleChange}
                          />
                        </Grid>

                        <Grid item xs={6}>
                          <Common.CellmaInputField
                            label={translate("postcode", language)}
                            name="addAddress5"
                            value={data.values.addAddress5}
                            required={estPatientPostcodeMandatory === 1}
                            onHandleChange={data.handleChange}
                            style={{ textTransform: "uppercase" }}
                            onKeyPress={validations.allowDigitCharacterSpace}
                            maxLength="20"
                            onPaste={validations.restrictCutCopyPaste}
                            onBlur={data.handleBlur}
                            errorText={isError(data, "addAddress5")}
                          />
                        </Grid>

                        <Grid item xs={6}>
                          <Common.CellmaInputField
                            label={translate("country", language)}
                            name="addAddress6"
                            value={data.values.addAddress6}
                            onHandleChange={data.handleChange}
                          />
                        </Grid>

                        <Grid item xs={6}>
                          <Common.CellmaInputField
                            label={translate("locale", language)}
                            name="addLocale"
                            value={data.values.addLocale}
                            onHandleChange={data.handleChange}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Common.CellmaInputField
                            label={translate("phone", language)}
                            name="addPhone"
                            value={data.values.addPhone}
                            onHandleChange={data.handleChange}
                          />
                        </Grid>

                        <Grid item xs={6}>
                          <Common.CellmaInputField
                            label={translate("fax", language)}
                            name="addFax"
                            value={data.values.addFax}
                            onHandleChange={data.handleChange}
                          />
                        </Grid>
                      </Grid>

                      <Grid
                        container
                        item
                        xs={12}
                        sx={styles.addressPopupButton}
                      >
                        <Grid item xs={12}>
                          <Common.CellmaButton
                            label={translate("save", language)}
                            onClick={() => {
                              if (
                                data.errors.numberRoad ||
                                data.errors.district ||
                                data.errors.town ||
                                data.errors.county ||
                                data.errors.addAddress5 ||
                                data.errors.country ||
                                data.errors.phone ||
                                data.errors.addMobile ||
                                data.errors.addEmail ||
                                data.errors.fax ||
                                data.errors.locale
                              ) {
                                setIsShowPopup(true);
                              } else {
                                updatePIPAddress({
                                  pipId: props.pipId,
                                  patId: patientId,
                                  addAddress1: data.values?.addAddress1,
                                  addAddress2: data.values?.addAddress2,
                                  addAddress3: data.values?.addAddress3,
                                  addAddress4: data.values?.addAddress4,
                                  addAddress5: data.values?.addAddress5,
                                  addAddress6: data.values?.addAddress6,
                                  addLocale: data.values?.addLocale,
                                  addWorkPhone: data.values?.addWorkPhone,
                                  addFax: data.values?.addFax,
                                  addMobile: data.values?.addMobile.toString(),
                                  addEmail: data.values?.addEmail,
                                  addId: data.values?.addId,
                                  addEstId: parseInt(estID, 10),
                                });
                                setIsShowPopup(false);
                              }
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  </Common.CellmaPopup>
                )}
              </Grid>
            </form>
          );
        }}
      </Formik>
    </>
  );
};
export default PatientPIP;

const styles = {
  addressPopupContaintGrid: {
    paddingY: "15px",
    paddingX: "35px",
  },
  addressPopupButton: {
    paddingLeft: "500px",
  },

  mainGridContainer: {
    display: "flex",
    justifyContent: "center",
  },

  link: {
    color: "primary.dark",
    textDecoration: "none",
  },
};

// Page Name : "addGP"
// Page Id : "c4pat6"

import * as React from "react";
import { useEffect, useState } from "react";

import * as Mui from "@mui/material";
import { Box, MenuItem, Switch, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import moment from "moment";
import { useSelector } from "react-redux";
import * as yup from "yup";

import InterestedPartyList from "./InterestedPartyList";
import MakeIntrestedParties from "./MakeInterestedParties";
import useEstablishmentListItems from "../../../../api/useEstablishmentListItems";
import * as Common from "../../../../common/CommonComponentsIndex";
import useDispatchSnackbar from "../../../../hooks/useDispatchSnackbar";
import * as validations from "../../../../utils/Validations";
import { useGetCustomPatientDetails } from "../../api/useCustomPatient";
import { useGetPatientExistingAddress } from "../../api/usePatientAddress";
import { useAddPIPDetails } from "../../api/usePIPDetails";
import * as createPatientDummyData from "../../assets/dummyData/CreatePatientDummyData";
import translate from "../../assets/translationFiles/createPatientTranslation";
import { IPatientPipDetails } from "../../types";
import EditPatientPIP from "../patientDetails/EditPatientPIP";

const GridItem = (props: any) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      {props.children}
    </Grid>
  );
};

const addressSearch = [
  { postcode: "422009", numberRoad: "Kharadi,Pune" },
  { postcode: "422010", numberRoad: "Panvel,Mumbai" },
  { postcode: "890257", numberRoad: "Port of Spain" },
  { postcode: "987458", numberRoad: "Delhi" },
  { postcode: "472315", numberRoad: "Nashik" },
];

interface Props {
  handleStep?(arg0: number): void;
  mode?: string;
}

const AddPip: React.FC<Props> = (props) => {
  const { patientId, estHidePipSectionsConsentPhotographTextemail } =
    useSelector((state: any) => state.patient);
  const [activePage, setActivePage] = useState(
    props?.mode === "addPatient" ? "AddPip" : "interestedPartyList"
  );
  const [pipID, setPIPId] = useState<number>();
  const { language } = useSelector((state: any) => state.language);
  const dispatchSnackbar = useDispatchSnackbar();
  const label = { inputProps: { "aria-label": "Switch" } };
  const [isSameAsPatientAddress, setIsSameAsPatientAddress] = useState(true);
  const [isShowPopup, setIsShowPopup] = useState(true);
  const { data: patientAddress, isLoading: patientPipAddressIsLoading } =
    useGetPatientExistingAddress(patientId, props.mode !== "addPatient");
  const { mutate: addPIP, isLoading: addPipIsLoading } = useAddPIPDetails();
  const {
    data: establishmentListItem,
    isLoading: establishmentListItemIsLoading,
  } = useEstablishmentListItems([
    "title",
    "ethnicity",
    "relationship",
    "occupation",
    "patient identifiers",
  ]);

  const [displayFields, setDisplayFields] = useState<any[]>([
    { id: 0, name: "title", type: "select", required: 0 },
    { id: 1, name: "familyName", type: "text", required: 1 },
    { id: 2, name: "givenName", type: "text", required: 1 },
    { id: 3, name: "middleName", type: "text", required: 0 },
    { id: 4, name: "born", type: "date", required: 0 },
    { id: 5, name: "sex", type: "text", required: 0 },
    { id: 6, name: "ethnicity", type: "select", required: 0 },
    { id: 7, name: "occupation", type: "select", required: 0 },
    { id: 8, name: "mobile", type: "text", required: 0 },
    { id: 9, name: "email", type: "text", required: 0 },
    { id: 10, name: "relationship", type: "text", required: 1 },
    { id: 11, name: "nextOfKin", type: "select", required: 0 },
    { id: 12, name: "familyAwareOfIllness", type: "select", required: 0 },
    { id: 13, name: "identifierType", type: "select", required: 0 },
    { id: 14, name: "identifierNumber", type: "text", required: 0 },
    { id: 15, name: "externalProfessional", type: "text", required: 0 },
    { id: 16, name: "professionalTitle", type: "text", required: 0 },
    { id: 17, name: "receivePatientLetter", type: "select", required: 0 },
    { id: 18, name: "receiveAppointmentLetters", type: "select", required: 0 },
    {
      id: 19,
      name: "printPartnerDetailsOnBirthRegistrationForm",
      type: "select",
      required: 0,
    },
    { id: 20, name: "sendPatientText/Email", required: 0, type: "checkbox" },
    { id: 21, name: "isReferrer", required: 0, type: "checkbox" },
  ]);

  const { data: getCustomDetailsResponse, isLoading: getCustomDetailsLoading } =
    useGetCustomPatientDetails({
      pageName: "add patient interested parties details",
      domainName: "patient",
      displayViewType: "custom",
    });

  const handler = React.useCallback(() => {
    setActivePage("AddPip");
  }, [activePage]);

  const editPipHandler = React.useCallback(
    (pip: number) => {
      setActivePage("EditPip");
      setPIPId(pip);
    },
    [activePage]
  );

  useEffect(() => {
    pipDetailsForm?.validateForm(pipDetailsForm?.values);
  }, [language]);

  const pipDetailsForm = useFormik({
    initialValues: {
      title: "",
      familyName: "",
      givenName: "",
      middleName: "",
      born: null,
      sex: "",
      ethnicity: "",
      occupation: "",
      mobile: "",
      email: "",
      nextOfKin: "0",
      familyAwareOfIllness: "0",
      relationship: "",
      identifierType: "",
      identifierNumber: "",
      externalProfessional: "",
      professionalTitle: "",
      receivePatientLetter: "",
      receiveAppointmentLetters: "",
      partnerDetailsOnBirth: "0",
      sendPatientTextEmail: false,
      isReferrer: false,
      notes: "",
      numberRoad: patientAddress?.permanentAddress?.addAddress1
        ? patientAddress?.permanentAddress?.addAddress1
        : "",
      town: patientAddress?.permanentAddress?.addAddress3
        ? patientAddress?.permanentAddress?.addAddress3
        : "",
      district: patientAddress?.permanentAddress?.addAddress2
        ? patientAddress?.permanentAddress?.addAddress2
        : "",
      county: patientAddress?.permanentAddress?.addAddress4
        ? patientAddress?.permanentAddress?.addAddress4
        : "",
      postcode: patientAddress?.permanentAddress?.addAddress5
        ? patientAddress?.permanentAddress?.addAddress5
        : "",
      country: patientAddress?.permanentAddress?.addAddress6
        ? patientAddress?.permanentAddress?.addAddress6
        : "",
      locale: patientAddress?.permanentAddress?.addLocale
        ? patientAddress?.permanentAddress?.addLocale
        : "",
      phone: patientAddress?.permanentAddress?.addPhone
        ? patientAddress?.permanentAddress?.addPhone
        : "",
      addEmail: patientAddress?.permanentAddress?.addEmail
        ? patientAddress?.permanentAddress?.addEmail
        : "",
      addMobile: patientAddress?.permanentAddress?.addMobile
        ? patientAddress?.permanentAddress?.addMobile
        : "",
      fax: patientAddress?.permanentAddress?.addFax
        ? patientAddress?.permanentAddress?.addFax
        : "",
      partnerCare: false,
      partnerCareDate: new Date(),
      helpingPatient: false,
      helpingPatientDate: new Date(),
      photographed: false,
      photographedDate: new Date(),
      generalPublicity: false,
      generalPublicityDate: new Date(),
    },
    validationSchema: yup.object().shape({
      familyName: yup
        .string()
        .required(translate("familyNameRequired", language)),
      givenName: yup
        .string()
        .required(translate("givenNameRequired", language)),
      externalProfessional: yup
        .string()
        .min(3, translate("externalProfessionalSearchMsg", language)),
      born: yup
        .date()
        .nullable()
        .typeError(translate("invalidBornDate", language))
        .min(new Date("01/01/1900"), translate("invalidBornDate", language))
        .max(new Date(), translate("futureDateAlert", language)),
      email: yup.string().email(translate("validEmailMsg", language)),
      addEmail: yup.string().email(translate("validEmailMsg", language)),
      relationship: yup
        .string()
        .required(translate("relationshipRequired", language)),
    }),
    onSubmit: (values: IPatientPipDetails) => {
      addPIP(
        {
          pipPatId: patientId,
          pipTitle: values.title ? values.title : null,
          pipFirstname: values.givenName ? values.givenName : null,
          pipSurname: values.familyName ? values.familyName : null,
          pipRelationship: values.relationship ? values.relationship : null,
          pipIdentifierType: values.identifierType
            ? values.identifierType
            : null,
          pipIdentifierNumber: values.identifierNumber
            ? values.identifierNumber
            : null,
          pipMiddlename: values.middleName ? values.middleName : null,
          pipDob: values.born ? moment(values.born).format("YYYY-MM-DD") : null,
          pipGender: values.sex ? values.sex : null,

          pipFamilyAwareIllness: values.familyAwareOfIllness
            ? values.familyAwareOfIllness
            : 0,
          pipPartnerPrint: values.partnerDetailsOnBirth
            ? values.partnerDetailsOnBirth
            : 0,
          pipSendTxtEmail: values.sendPatientTextEmail === true ? "1" : "0",
          pipReceivePatApptLetter: values.receiveAppointmentLetters
            ? values.receiveAppointmentLetters
            : 0,
          pipEthnicityId: values.ethnicity ? values.ethnicity : null,
          pipOccupationId: values.occupation ? values.occupation : null,
          pipEhpId: null,
          pipNextOfKin: values.nextOfKin ? values.nextOfKin : 0,
          pipReceivePatientLetter: values.receivePatientLetter
            ? values.receivePatientLetter
            : 0,
          pipProfessionalTitle: values.professionalTitle
            ? values.professionalTitle
            : null,
          pipIsReferrer: values.isReferrer === true ? "1" : "0",
          panId: null,
          pipNotes: values.notes ? values.notes : null,
          pipType: null,
          pipTreatmentConsentGivenDate:
            values.partnerCare === true
              ? moment(values.partnerCareDate).format("YYYY-MM-DD")
              : null,
          pipImplantProcessConsentGivenDate:
            values.helpingPatient === true
              ? moment(values.helpingPatientDate).format("YYYY-MM-DD")
              : null,
          pipGeneralPublicityConsentGivenDate:
            values.generalPublicity === true
              ? moment(values.generalPublicityDate).format("YYYY-MM-DD")
              : null,
          pipTrainingConsentGivenDate:
            values.photographed === true
              ? moment(values.photographedDate).format("YYYY-MM-DD")
              : null,
          pipIsPatientAddress: isSameAsPatientAddress ? "1" : "0",
          pipAddress: {
            patId: patientId,
            addAddress1: values?.numberRoad ? values?.numberRoad : null,
            addAddress2: values?.district ? values?.district : null,
            addAddress3: values?.town ? values.town : null,
            addAddress4: values?.county ? values?.county : null,
            addAddress5: values?.postcode ? values?.postcode : null,
            addAddress6: values?.country ? values?.country : null,
            addPhone: values?.phone ? values?.phone : null,
            addFax: values?.fax ? values?.fax : null,
            addLocale: values?.locale ? values?.locale : null,
            addEmail: values?.email ? values?.email : null,
            addMobile: values?.mobile ? values?.mobile : null,
          },
        },
        {
          onSuccess: (response: any) => {
            const responseCode = response?.data?.validationCode;
            if (responseCode === "pip.add.success") {
              setActivePage("interestedPartyList");
            }
            dispatchSnackbar(response);
          },
        }
      );
    },
  });

  useEffect(() => {
    if (getCustomDetailsResponse?.status === 200) {
      if (
        getCustomDetailsResponse?.data?.validationCode ===
        "customizabledispalyfield.found"
      ) {
        const cdfDisplayFieldJson = JSON.parse(
          getCustomDetailsResponse?.data?.entity?.cdfDisplayFieldJson
        );
        setDisplayFields(cdfDisplayFieldJson?.customViewJson?.displayFields);
      }
    }
  }, [getCustomDetailsResponse]);
  return (
    <>
      {(addPipIsLoading ||
        establishmentListItemIsLoading ||
        patientPipAddressIsLoading ||
        getCustomDetailsLoading) && (
        <Mui.Backdrop sx={{ zIndex: "1500" }} open>
          <Mui.CircularProgress />
        </Mui.Backdrop>
      )}
      <form onSubmit={pipDetailsForm.handleSubmit} noValidate>
        <Grid container sx={styles.mainGridContainer}>
          {activePage === "AddPip" && (
            <Grid container item xs={11} rowSpacing={4} columnSpacing={6}>
              {displayFields?.map((element: any) => {
                return (
                  <>
                    {element?.name === "title" && (
                      <GridItem>
                        <Common.CellmaSelectField
                          label={translate("title", language)}
                          name="title"
                          value={pipDetailsForm.values.title}
                          changeevent={(event: any) => {
                            const result = validations.genderTitleHandler(
                              event,
                              pipDetailsForm,
                              "title"
                            );
                            if (result[0] !== "") {
                              alert(translate(result[0], language));
                            }
                            pipDetailsForm.setFieldValue(
                              "title",
                              event.target.value
                            );
                            pipDetailsForm.setFieldValue("sex", result[1]);
                          }}
                          list={establishmentListItem.title.map(
                            (title: any) => (
                              <MenuItem
                                sx={{ whiteSpace: "unset" }}
                                key={title.eliId}
                                value={title.eliText}
                              >
                                {title.eliText}
                              </MenuItem>
                            )
                          )}
                        />
                      </GridItem>
                    )}
                    {element?.name === "familyName" && (
                      <GridItem>
                        <Common.CellmaInputField
                          required
                          label={translate("familyName", language)}
                          name="familyName"
                          value={pipDetailsForm.values.familyName}
                          style={{ textTransform: "capitalize" }}
                          onHandleChange={pipDetailsForm.handleChange}
                          onBlur={pipDetailsForm.handleBlur}
                          onKeyPress={
                            validations.allowCharHyphenApostropheSpace
                          }
                          errorText={
                            pipDetailsForm.touched.familyName &&
                            pipDetailsForm.errors.familyName
                          }
                          onPaste={
                            validations.restrictPasteEventForSpecialCharactersAndNumbers
                          }
                        />
                      </GridItem>
                    )}
                    {element?.name === "givenName" && (
                      <GridItem>
                        <Common.CellmaInputField
                          required
                          label={translate("givenName", language)}
                          name="givenName"
                          value={pipDetailsForm.values.givenName}
                          style={{ textTransform: "capitalize" }}
                          onHandleChange={pipDetailsForm.handleChange}
                          onBlur={pipDetailsForm.handleBlur}
                          onKeyPress={
                            validations.allowCharHyphenApostropheSpace
                          }
                          errorText={
                            pipDetailsForm.touched.givenName &&
                            pipDetailsForm.errors.givenName
                          }
                          onPaste={
                            validations.restrictPasteEventForSpecialCharactersAndNumbers
                          }
                        />
                      </GridItem>
                    )}
                    {element?.name === "middleName" && (
                      <GridItem>
                        <Common.CellmaInputField
                          label={translate("middleName", language)}
                          name="middleName"
                          value={pipDetailsForm.values.middleName}
                          onHandleChange={pipDetailsForm.handleChange}
                          onKeyPress={
                            validations.allowCharHyphenApostropheSpace
                          }
                          onPaste={
                            validations.restrictPasteEventForSpecialCharactersAndNumbers
                          }
                        />
                      </GridItem>
                    )}
                    {element?.name === "born" && (
                      <GridItem>
                        <Common.CellmaDatePicker
                          label={translate("born", language)}
                          value={pipDetailsForm.values.born}
                          maxDate={new Date()}
                          onChange={(newDate: Date | null) => {
                            pipDetailsForm.setFieldValue("born", newDate);
                          }}
                          name="born"
                          onBlur={pipDetailsForm.handleBlur}
                          error={
                            pipDetailsForm.touched.born &&
                            pipDetailsForm.errors.born
                          }
                        />
                      </GridItem>
                    )}
                    {element?.name === "sex" && (
                      <GridItem>
                        <Common.CellmaSelectField
                          label={translate("sex", language)}
                          name="sex"
                          value={pipDetailsForm.values.sex}
                          changeevent={(event: any) => {
                            const result = validations.genderTitleHandler(
                              event,
                              pipDetailsForm,
                              "sex"
                            );
                            if (result[0] !== "") {
                              alert(translate(result[0], language));
                            }
                            pipDetailsForm.setFieldValue("title", result[1]);
                            pipDetailsForm.setFieldValue(
                              "sex",
                              event.target.value
                            );
                          }}
                          list={createPatientDummyData.PATIENT_GENDER.map(
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
                      </GridItem>
                    )}
                    {element?.name === "ethnicity" && (
                      <GridItem>
                        <Common.CellmaSelectField
                          label={translate("ethnicity", language)}
                          name="ethnicity"
                          value={pipDetailsForm.values.ethnicity}
                          changeevent={pipDetailsForm.handleChange}
                          list={establishmentListItem.ethnicity.map(
                            (ethnicity: any) => (
                              <MenuItem
                                sx={{ whiteSpace: "unset" }}
                                key={ethnicity.eliId}
                                value={ethnicity.eliId}
                              >
                                {ethnicity.eliText}
                              </MenuItem>
                            )
                          )}
                        />
                      </GridItem>
                    )}
                    {element?.name === "occupation" && (
                      <GridItem>
                        <Common.CellmaSelectField
                          label={translate("occupation", language)}
                          name="occupation"
                          value={pipDetailsForm.values.occupation}
                          changeevent={pipDetailsForm.handleChange}
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
                      </GridItem>
                    )}
                    {element?.name === "mobile" && (
                      <GridItem>
                        <Common.CellmaInputField
                          label={translate("mobile", language)}
                          type="tel"
                          name="mobile"
                          value={pipDetailsForm.values.mobile}
                          onHandleChange={pipDetailsForm.handleChange}
                          onBlur={validations.checkMobileValidation}
                          onKeyPress={
                            validations.restrictAlphabetsAndSpecialCharacters
                          }
                          onPaste={
                            validations.restrictPastingCharactersAndSpecialSymbols
                          }
                          onInput={(e: any) => {
                            e.target.value = e.target.value
                              .toString()
                              .slice(0, 10);
                          }}
                        />
                      </GridItem>
                    )}
                    {element?.name === "email" && (
                      <GridItem>
                        <Common.CellmaInputField
                          label={translate("email", language)}
                          name="email"
                          value={pipDetailsForm.values.email}
                          onHandleChange={pipDetailsForm.handleChange}
                          onBlur={pipDetailsForm.handleBlur}
                          errorText={
                            pipDetailsForm.touched.email &&
                            pipDetailsForm.errors.email
                          }
                        />
                      </GridItem>
                    )}
                    {element?.name === "relationship" && (
                      <GridItem>
                        <Common.CellmaSelectField
                          label={translate("relationship", language)}
                          name="relationship"
                          required
                          value={pipDetailsForm.values.relationship}
                          changeevent={pipDetailsForm.handleChange}
                          error={
                            pipDetailsForm.touched.relationship &&
                            pipDetailsForm.errors.relationship
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
                      </GridItem>
                    )}
                    {element?.name === "nextOfKin" && (
                      <GridItem>
                        <Common.CellmaSelectField
                          label={translate("nextOfKin", language)}
                          name="nextOfKin"
                          value={pipDetailsForm.values.nextOfKin}
                          changeevent={pipDetailsForm.handleChange}
                          list={createPatientDummyData.NEXT_OF_KIN.map(
                            (kin: any) => (
                              <MenuItem
                                sx={{ whiteSpace: "unset" }}
                                key={kin.id}
                                value={kin.value}
                              >
                                {translate(`${kin.label}`, language)}
                              </MenuItem>
                            )
                          )}
                        />
                      </GridItem>
                    )}
                    {element?.name === "familyAwareOfIllness" && (
                      <GridItem>
                        <Common.CellmaSelectField
                          label={translate("familyAwareOfIllness", language)}
                          name="familyAwareOfIllness"
                          value={pipDetailsForm.values.familyAwareOfIllness}
                          changeevent={pipDetailsForm.handleChange}
                          list={createPatientDummyData.FAMILY_AWARE_OF_ILLNESS.map(
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
                      </GridItem>
                    )}
                    {element?.name === "identifierType" && (
                      <GridItem>
                        <Common.CellmaSelectField
                          label={translate("identifierType", language)}
                          name="identifierType"
                          value={pipDetailsForm.values.identifierType}
                          changeevent={pipDetailsForm.handleChange}
                          list={establishmentListItem?.[
                            "patient identifiers"
                          ].map((identifier: any) => (
                            <MenuItem
                              sx={{ whiteSpace: "unset" }}
                              key={identifier.eliId}
                              value={identifier.eliText}
                            >
                              {identifier.eliText}
                            </MenuItem>
                          ))}
                        />
                      </GridItem>
                    )}
                    {element?.name === "identifierNumber" && (
                      <GridItem>
                        <Common.CellmaInputField
                          label={translate("identifierNumber", language)}
                          name="identifierNumber"
                          value={pipDetailsForm.values.identifierNumber}
                          onHandleChange={pipDetailsForm.handleChange}
                        />
                      </GridItem>
                    )}
                    {element?.name === "externalProfessional" && (
                      <GridItem>
                        <Common.CellmaInputField
                          label={translate("externalProfessional", language)}
                          name="externalProfessional"
                          value={pipDetailsForm.values.externalProfessional}
                          onHandleChange={pipDetailsForm.handleChange}
                          onBlur={pipDetailsForm.handleBlur}
                          onKeyPress={
                            validations.allowCharHyphenApostropheSpace
                          }
                          errorText={
                            pipDetailsForm.touched.externalProfessional &&
                            pipDetailsForm.errors.externalProfessional
                          }
                          onPaste={
                            validations.restrictPasteEventForSpecialCharactersAndNumbers
                          }
                        />
                      </GridItem>
                    )}
                    {element?.name === "professionalTitle" && (
                      <GridItem>
                        <Common.CellmaInputField
                          label={translate("professionalTitle", language)}
                          name="professionalTitle"
                          maxLength="11"
                          value={pipDetailsForm.values.professionalTitle}
                          onHandleChange={pipDetailsForm.handleChange}
                          onKeyPress={validations.allowDigitCharacterSpace}
                          onPaste={
                            validations.restrictPasteEventForSpecialCharacters
                          }
                        />
                      </GridItem>
                    )}
                    {estHidePipSectionsConsentPhotographTextemail !== 1 &&
                      element?.name === "receivePatientLetter" && (
                        <GridItem>
                          <Common.CellmaSelectField
                            label={translate("receivePatientLetter", language)}
                            name="receivePatientLetter"
                            value={pipDetailsForm.values.receivePatientLetter}
                            changeevent={pipDetailsForm.handleChange}
                            list={createPatientDummyData.RECEIVE_APPOINTMENT_LETTERS.map(
                              (letters: any) => (
                                <MenuItem
                                  sx={{ whiteSpace: "unset" }}
                                  key={letters.id}
                                  value={letters.value}
                                >
                                  {translate(`${letters.label}`, language)}
                                </MenuItem>
                              )
                            )}
                          />
                        </GridItem>
                      )}
                    {estHidePipSectionsConsentPhotographTextemail !== 1 &&
                      element?.name === "receiveAppointmentLetters" && (
                        <GridItem>
                          <Common.CellmaSelectField
                            label={translate(
                              "receiveAppointmentLetters",
                              language
                            )}
                            name="receiveAppointmentLetters"
                            value={
                              pipDetailsForm.values.receiveAppointmentLetters
                            }
                            changeevent={pipDetailsForm.handleChange}
                            list={createPatientDummyData.RECEIVE_APPOINTMENT_LETTERS.map(
                              (letters: any) => (
                                <MenuItem
                                  sx={{ whiteSpace: "unset" }}
                                  key={letters.id}
                                  value={letters.value}
                                >
                                  {translate(`${letters.label}`, language)}
                                </MenuItem>
                              )
                            )}
                          />
                        </GridItem>
                      )}
                    {element?.name ===
                      "printPartnerDetailsOnBirthRegistrationForm" && (
                      <GridItem>
                        <Common.CellmaSelectField
                          label={translate(
                            "printPartnerDetailsOnBirthRegistrationForm",
                            language
                          )}
                          name="partnerDetailsOnBirth"
                          value={pipDetailsForm.values.partnerDetailsOnBirth}
                          changeevent={pipDetailsForm.handleChange}
                          list={createPatientDummyData.PRINT_PARTNER_DETAILS_ON_BIRTH_REGISTRATION_FORM.map(
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
                      </GridItem>
                    )}
                    {estHidePipSectionsConsentPhotographTextemail !== 1 &&
                      element?.name === "sendPatientText/Email" && (
                        <GridItem>
                          <Common.CellmaCheckbox
                            label={translate("sendPatientText/Email", language)}
                            inputName="sendPatientTextEmail"
                            value={pipDetailsForm.values.sendPatientTextEmail}
                            onHandleChange={pipDetailsForm.handleChange}
                          />
                        </GridItem>
                      )}

                    {element?.name === "isReferrer" && (
                      <GridItem>
                        <Common.CellmaCheckbox
                          label={translate("isReferrer", language)}
                          inputName="isReferrer"
                          value={pipDetailsForm.values.isReferrer}
                          onHandleChange={pipDetailsForm.handleChange}
                        />
                      </GridItem>
                    )}
                  </>
                );
              })}
              <Grid item xs={12} md={8} lg={6}>
                <TextField
                  fullWidth
                  rows="2"
                  multiline
                  label={translate("notes", language)}
                  name="notes"
                  value={pipDetailsForm.values.notes}
                  onChange={pipDetailsForm.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h3">
                  {translate("makePipAddressSameAsPatientAddress", language)}
                  <Switch
                    data-testid="Make Pip Address Same As Patient Address"
                    {...label}
                    checked={isSameAsPatientAddress}
                    onChange={() => {
                      setIsSameAsPatientAddress(!isSameAsPatientAddress);
                      setIsShowPopup(true);
                    }}
                  />
                </Typography>
              </Grid>
              {estHidePipSectionsConsentPhotographTextemail !== 1 && (
                <Grid item xs={12}>
                  <MakeIntrestedParties data={pipDetailsForm} />
                </Grid>
              )}

              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "1rem",
                }}
              >
                <Common.CellmaButton
                  label={translate("cancel", language)}
                  onClick={() => {
                    props?.handleStep && props?.handleStep(1);
                    props?.mode === "editPatient" &&
                      setActivePage("interestedPartyList");
                  }}
                />
                <Common.CellmaButton
                  label={translate("save", language)}
                  type="submit"
                  onClick={() => {
                    if (pipDetailsForm?.errors) {
                      window.scrollTo(0, 0);
                    }
                  }}
                />
              </Grid>

              {!isSameAsPatientAddress && isShowPopup && (
                <Common.CellmaPopup
                  title={translate("add/EditAnAddress", language)}
                  handleCancel={() => {
                    setIsSameAsPatientAddress(!isSameAsPatientAddress);
                  }}
                >
                  <Box>
                    <Grid
                      container
                      spacing={3}
                      sx={styles.addressPopupContentGrid}
                    >
                      <Grid item xs={12} md={6}>
                        <Common.CellmaAutocompleteField
                          label={translate("number&Road", language)}
                          name="numberRoad"
                          value={pipDetailsForm.values.numberRoad}
                          options={addressSearch.map(
                            (option: any) => option.numberRoad
                          )}
                          onChange={(value: any) => {
                            pipDetailsForm.setFieldValue("numberRoad", value);
                            pipDetailsForm.setFieldValue("country", value);
                            pipDetailsForm.setFieldValue("district", value);
                          }}
                          onBlur={pipDetailsForm.handleBlur}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Common.CellmaInputField
                          label={translate("district", language)}
                          name="district"
                          value={pipDetailsForm.values.district}
                          onHandleChange={pipDetailsForm.handleChange}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Common.CellmaInputField
                          label={translate("town", language)}
                          name="town"
                          value={pipDetailsForm.values.town}
                          onHandleChange={pipDetailsForm.handleChange}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Common.CellmaInputField
                          label={translate("county", language)}
                          name="county"
                          value={pipDetailsForm.values.county}
                          onHandleChange={pipDetailsForm.handleChange}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Common.CellmaAutocompleteField
                          label={translate("postcode", language)}
                          name="postcode"
                          value={pipDetailsForm.values.postcode}
                          options={addressSearch.map(
                            (option: any) => option.postcode
                          )}
                          onKeyPress={validations.allowDigitCharacterSpace}
                          style={{
                            textTransform: "uppercase",
                          }}
                          maxLength="20"
                          onPaste={validations.restrictCutCopyPaste}
                          onChange={(value: any) => {
                            pipDetailsForm.setFieldValue("postcode", value);
                            pipDetailsForm.setFieldValue("country", value);
                            pipDetailsForm.setFieldValue("district", value);
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Common.CellmaInputField
                          label={translate("country", language)}
                          name="country"
                          value={pipDetailsForm.values.country}
                          onHandleChange={pipDetailsForm.handleChange}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Common.CellmaInputField
                          label={translate("locale", language)}
                          name="locale"
                          value={pipDetailsForm.values.locale}
                          onHandleChange={pipDetailsForm.handleChange}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Common.CellmaInputField
                          label={translate("phone", language)}
                          name="phone"
                          value={pipDetailsForm.values.phone}
                          onHandleChange={pipDetailsForm.handleChange}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Common.CellmaInputField
                          label={translate("fax", language)}
                          name="fax"
                          value={pipDetailsForm.values.fax}
                          onHandleChange={pipDetailsForm.handleChange}
                        />
                      </Grid>
                    </Grid>

                    <Grid container item xs={12} sx={styles.addressPopupButton}>
                      <Grid item xs={12}>
                        <Common.CellmaButton
                          label={translate("save", language)}
                          onClick={() => {
                            if (
                              pipDetailsForm.errors.addEmail ||
                              pipDetailsForm.errors.postcode
                            ) {
                              setIsShowPopup(true);
                            } else {
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
          )}

          {activePage === "EditPip" && pipID && (
            <Mui.Backdrop open>
              <Common.CellmaPopup
                title={translate("editPip", language)}
                fullScreen
                handleCancel={() => {
                  setActivePage("interestedPartyList");
                }}
              >
                <Grid container sx={{ padding: "20px" }}>
                  <EditPatientPIP
                    pipId={pipID}
                    showEditPIP={() => setActivePage("interestedPartyList")}
                  />
                </Grid>
              </Common.CellmaPopup>
            </Mui.Backdrop>
          )}
          {activePage === "interestedPartyList" && (
            <Grid item xs={12}>
              <InterestedPartyList
                handleStep={props.handleStep && props?.handleStep}
                handler={handler}
                editPipHandler={editPipHandler}
                mode={props?.mode}
              />
            </Grid>
          )}
        </Grid>
      </form>
    </>
  );
};

export default AddPip;

const styles = {
  addressPopupContentGrid: {
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

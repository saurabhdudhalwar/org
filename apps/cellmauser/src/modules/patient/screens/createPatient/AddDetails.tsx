// Page Name : "addDetails"
// Page Id : "c4pat4"

import { useEffect, useState } from "react";

import { DeleteOutline } from "@mui/icons-material";
import { Backdrop, CircularProgress, Divider, MenuItem } from "@mui/material";
import * as Mui from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useFormik } from "formik";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";
import * as yup from "yup";

import useCountriesLists from "../../../../api/useCountriesList";
import useEstablishmentListItems from "../../../../api/useEstablishmentListItems";
import CellmaTable from "../../../../common/CellmaTable";
import * as Common from "../../../../common/CommonComponentsIndex";
import { setSnackbar } from "../../../../store/SnackbarAction";
import * as validations from "../../../../utils/Validations";
import { formatNHSNumber } from "../../../../utils/Validations";
import { useGetCustomPatientDetails } from "../../api/useCustomPatient";
import {
  useAddPatientDetails,
  useGetPatientDetails,
  useUpdatePatientDetails,
} from "../../api/usePatientDetails";
import {
  useDeletePatientIdentifierDetails,
  useGetPatientIdentifierDetails,
} from "../../api/usePatientIdentifierDetails";
import {
  BABY_BORN_IN_HOSPITAL,
  CURRENTLY_PREGNANT,
  INTERPRETER_REQUIRED,
  PATIENT_GENDER,
  PATIENT_WEB_ACCESS,
  PRISONER,
  REG_DISABLED,
} from "../../assets/dummyData/CreatePatientDummyData";
import {
  BLOOD_TYPE,
  RESTRICTED_REGISTRATION,
} from "../../assets/dummyData/PatientDetailsDummyData";
import translate from "../../assets/translationFiles/createPatientTranslation";
import AddPatientUniqueIdentifier from "../../common/AddPatientUniqueIdentifier";
import {
  setCliShowGeomapLinkOnAddressPage,
  setEstAddressWizardUnknownAddDropdown,
} from "../../store/PatientAction";

const GridItem = (props: any) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={12 / 5}>
      {props.children}
    </Grid>
  );
};

interface Props {
  duplicateCheckFormValues?: any;
  handleStep?(arg0: number): unknown;
  mode?: string;
}

const AddDetails: React.FC<Props> = (props) => {
  const [isAddNewIdentifier, setIsAddNewIdentifier] = useState(false);
  const [isExistingIdentifier, setIsExistingIdentifier] = useState(false);
  const [pidId, setPidId] = useState<any>();
  const { patientId, estEthnicityReligionMandatory } = useSelector(
    (state: any) => state.patient
  );
  const dispatch = useDispatch();
  const { mutate: addPatientDetails } = useAddPatientDetails();
  const { mutate: updatePatientDetails } = useUpdatePatientDetails();
  const { data: patientDetails, isLoading: patientDetailsIsLoading } =
    useGetPatientDetails(patientId, props?.mode !== "addPatient");

  const {
    data: establishmentListItem,
    isLoading: establishmentListItemIsLoading,
  } = useEstablishmentListItems([
    "title",
    "ethnicity",
    "nationality",
    "patient religion",
    "language",
    "marital status",
    "occupation",
    "disabilities",
    "patient type",
    "sexual orientation",
    "Type of interpreter needed",
    "patient identifiers",
    "Current Gender",
  ]);

  const { data: countryList, isLoading: countryIsLoading } =
    useCountriesLists();
  const { mutate: deleteIdentifier } = useDeletePatientIdentifierDetails();

  const { refetch: patientIdentifierRefetch, data: patientIdentifierDetails } =
    useGetPatientIdentifierDetails(patientId);
  const patientIdentifier = patientIdentifierDetails?.patIdentifierList ?? [];
  const { language } = useSelector((state: any) => state.language);
  const { estID } = useSelector((state: any) => state.auth);
  const { isShowPatientIdentification } = useSelector(
    (state: any) => state.patient
  );
  const { setIsLink } = useOutletContext() as any; // <-- access context value
  const { setIsArrowCircleButton } = useOutletContext() as any; // <-- access context value
  const navigate = useNavigate();
  const [displayFields, setDisplayFields] = useState<any[]>([
    { id: 0, name: "title", type: "select", required: 0 },
    { id: 1, name: "familyName", type: "text", required: 1 },
    { id: 2, name: "givenName", type: "text", required: 1 },
    { id: 3, name: "middleName", type: "text", required: 0 },
    { id: 4, name: "maidenName", type: "text", required: 0 },
    { id: 5, name: "ptNameInOtherLanguage", type: "text", required: 0 },
    { id: 6, name: "born", type: "date", required: 1 },
    { id: 7, name: "babyBornInHospital", type: "date", required: 1 },
    { id: 8, name: "sex", type: "select", required: 0 },
    { id: 9, name: "currentGender", type: "select", required: 1 },
    { id: 10, name: "maritalStatus", type: "select", required: 0 },
    { id: 11, name: "sexualOrientation", type: "select", required: 0 },
    { id: 12, name: "currentlyPregnant", type: "select", required: 0 },
    { id: 13, name: "ethnicity", type: "select", required: 0 },
    { id: 14, name: "occupation", type: "select", required: 0 },
    { id: 15, name: "religion", type: "select", required: 0 },
    { id: 16, name: "townOfBirth", type: "text", required: 0 },
    { id: 17, name: "countyOfBirth", type: "text", required: 0 },
    { id: 18, name: "countryOfBirth", type: "select", required: 0 },
    { id: 19, name: "nationality", type: "select", required: 0 },
    { id: 20, name: "regDisabled", type: "select", required: 0 },
    { id: 21, name: "primaryDisability", type: "select", required: 0 },
    { id: 22, name: "assistanceNeeded", type: "text", required: 0 },
    { id: 23, name: "disabilityNote", type: "text", required: 0 },
    { id: 24, name: "language", type: "select", required: 0 },
    { id: 25, name: "interpreterNeeded", type: "select", required: 0 },
    { id: 26, name: "interpreterType", type: "select", required: 0 },
    { id: 27, name: "nhsNo", type: "text", required: 0 },
    { id: 28, name: "hospitalRef", type: "text", required: 0 },
    { id: 29, name: "identifier", type: "text", required: 0 },
    { id: 30, name: "pasId", type: "text", required: 0 },
    { id: 31, name: "patientType", type: "select", required: 0 },
    { id: 32, name: "prisoner", type: "select", required: 0 },
    { id: 33, name: "bloodType", type: "select", required: 0 },
    { id: 34, name: "died", type: "date", required: 0 },
    { id: 35, name: "restrictedRegistration", type: "select", required: 0 },
    { id: 36, name: "patientWebAccess", type: "select", required: 0 },
  ]);
  const {
    refetch: getCustomDetails,
    data: getCustomDetailsResponse,
    isLoading: getCustomDetailsLoading,
  } = useGetCustomPatientDetails({
    pageName: "add patient details",
    domainName: "patient",
    displayViewType: "custom",
  });

  useEffect(() => {
    setIsLink(false);
    setIsArrowCircleButton(false);
    patientDetailsForm?.validateForm(patientDetailsForm?.values);
  }, [language, setIsArrowCircleButton, setIsLink, displayFields]);

  useEffect(() => {
    getCustomDetails();
    window.scrollTo(0, 0);
  }, []);

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

  const duplicateCheckFormData = props?.duplicateCheckFormValues?.state?.data;
  const patNameInOtherLanguage =
    props?.duplicateCheckFormValues?.state?.patientName;
  const patHospitalReference =
    props?.duplicateCheckFormValues?.state?.hospitalReference;

  // Function for get age at born
  const bornDate =
    duplicateCheckFormData?.born ?? patientDetails?.patientDetails?.patDob;
  const age = moment().diff(bornDate, "days");

  const rows: GridRowsProp = [
    {
      identifierType: duplicateCheckFormData?.uniqueIdentification
        ? duplicateCheckFormData?.uniqueIdentification
        : "",
      number: duplicateCheckFormData?.uniqueIdentificationId
        ? duplicateCheckFormData?.uniqueIdentificationId
        : "",
      issuingCountry: "",
    },
    {
      identifierType: duplicateCheckFormData?.photoIdentification
        ? duplicateCheckFormData?.photoIdentification
        : "",
      number: duplicateCheckFormData?.photoIdentificationId
        ? duplicateCheckFormData?.photoIdentificationId
        : "",
      issuingCountry: duplicateCheckFormData?.issuingCountry?.couCountry
        ? duplicateCheckFormData?.issuingCountry?.couCountry
        : "",
    },
  ];

  const columns: GridColDef[] = [
    {
      field: "identifierType",
      headerName: translate("identifierType", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 200,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.identifierType ? params?.row?.identifierType : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "number",
      headerName: translate("number", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 200,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.number ? params?.row?.number : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "issuingCountry",
      headerName: translate("issuingCountry", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 200,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.issuingCountry ? params?.row?.issuingCountry : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "pidAddedBy",
      headerName: translate("addedBy", language),
      headerClassName: "tableHeader",
      flex: 1,
      hide: props?.mode === "addPatient",
      minWidth: 200,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.pidAddedBy ? params?.row?.pidAddedBy : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "pidAdded",
      headerName: translate("added", language),
      headerClassName: "tableHeader",
      flex: 1,
      hide: props?.mode === "addPatient",
      minWidth: 200,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.pidAdded !== null
            ? moment(params?.row?.pidAdded).format("DD/MM/YYYY")
            : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "pidApprovedBy",
      headerName: translate("verifiedBy", language),
      headerClassName: "tableHeader",
      flex: 1,
      hide: props?.mode === "addPatient",
      minWidth: 80,
      maxWidth: 100,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.pidApprovedBy ? params?.row?.pidApprovedBy : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "col6",
      headerName: " ",
      headerClassName: "tableHeader",
      flex: 1,
      hide: props?.mode === "addPatient",
      minWidth: 80,
      maxWidth: 100,
      renderCell: (params) => {
        return (
          <Mui.IconButton
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
            aria-label="Delete identifier"
            onClick={(e: any) => {
              if (params?.row?.pidId !== undefined) {
                setPidId(params?.row?.pidId);
              }
              e.stopPropagation(); // don't select this row after clicking
              setIsExistingIdentifier(true);
            }}
          >
            <Mui.Tooltip
              title={translate("deleteIdentifier", language)}
              placement="right"
              arrow
            >
              <DeleteOutline sx={{ color: "warning.dark" }} />
            </Mui.Tooltip>
          </Mui.IconButton>
        );
      },
    },
  ];

  const onAddDetailsSuccess = (response: any) => {
    if (
      response?.data.validationCode === "patient.add.success" &&
      props?.handleStep
    ) {
      dispatch(
        setEstAddressWizardUnknownAddDropdown(
          response?.data?.settings?.estAddressWizardUnknownAddDropdown
        )
      );
      dispatch(
        setCliShowGeomapLinkOnAddressPage(
          response?.data?.settings?.cliShowGeomapLinkOnAddressPage
        )
      );
      props.handleStep(1);
    }
  };

  const patientIdentifierJson: any = [];
  if (
    duplicateCheckFormData?.photoIdentification !== "" &&
    duplicateCheckFormData?.photoIdentificationId !== ""
  ) {
    patientIdentifierJson.push({
      pidTypeEliId: duplicateCheckFormData?.photoIdentification?.eliId
        ? duplicateCheckFormData?.photoIdentification?.eliId
        : "",
      pidPatId: patientId,
      pidValue: duplicateCheckFormData?.photoIdentificationId
        ? duplicateCheckFormData?.photoIdentificationId
        : "",
      pidIssuingCountryCode: duplicateCheckFormData?.issuingCountry?.couId
        ? duplicateCheckFormData?.issuingCountry?.couId
        : "",
    });
  }
  if (
    duplicateCheckFormData?.uniqueIdentification !== "" ||
    duplicateCheckFormData?.uniqueIdentificationId !== ""
  ) {
    patientIdentifierJson.push({
      pidTypeEliId: duplicateCheckFormData?.uniqueIdentification?.eliId
        ? duplicateCheckFormData?.uniqueIdentification?.eliId
        : "",
      pidPatId: patientId,
      pidValue: duplicateCheckFormData?.uniqueIdentificationId
        ? duplicateCheckFormData?.uniqueIdentificationId
        : "",
      pidIssuingCountryCode: duplicateCheckFormData?.issuingCountry?.couId
        ? duplicateCheckFormData?.issuingCountry?.couId
        : "",
    });
  }

  const patientDetailsForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      patTitle: duplicateCheckFormData?.title ?? "",
      patGenderAtBirth: duplicateCheckFormData?.sex ?? "",
      patPractisingReligion: "0",
      patLanguage: "",
      patSurname: duplicateCheckFormData?.familyName ?? "",
      patSex: duplicateCheckFormData?.sex ?? "",
      patTownOfBirth: "",
      patNeedInterpreterAtAppointments: "0",
      patFirstname: duplicateCheckFormData?.givenName ?? "",
      patMaritalStatus: "",
      patCountyOfBirth: "",
      patCountryOfBirth: "",
      patType: "",
      patMiddlename: duplicateCheckFormData?.middleName ?? "",
      patCurrentlyPregnant: duplicateCheckFormData?.sex === "M" ? "0" : "",
      patHospitalRef: patHospitalReference ?? "",
      patMaidenName: duplicateCheckFormData?.maidenNameOptional ?? "",
      patEthnicityText: "",
      patNationality: "",
      patNhsRef: duplicateCheckFormData?.nhsRefOptional ?? "",
      patNameOtherLang: patNameInOtherLanguage ?? "",
      patOccupation: "",
      patRegisteredDisabled: "0",
      patIdentifier: duplicateCheckFormData?.identifier ?? "",
      patDob: duplicateCheckFormData?.born ?? "",
      patReligion: "",
      patDisabilityNote: "",
      patNeededAssistanceAtAppointments: "",
      patNotes: "",
      patPasid: "",
      patPrisoner: "",
      patBloodGroup: "",
      patDod: "",
      patBanned: "",
      patInterpreterTypeEliId: "",
      patSexuality: "",
      patPatientwebAccountLocked: false,
      patRegisteredWithPatientweb: "",
      primaryDisability: [],
      patIsBabyBornInThisHospital:
        duplicateCheckFormData?.babyBornInHospital ?? "",
      ...patientDetails?.patientDetails,
    },
    validationSchema: yup.object().shape({
      currentGender: yup.string(),
      patGenderAtBirth: yup
        .string()
        .required(translate("sexRequired", language)),
      patSurname: yup
        .string()
        .required(translate("familyNameRequired", language)),
      patFirstname: yup
        .string()
        .required(translate("givenNameRequired", language)),
      patDob: yup
        .date()
        .nullable()
        .required(translate("bornDateRequired", language))
        .typeError(translate("invalidBornDate", language))
        .min(new Date("01/01/1900"), translate("invalidBornDate", language))
        .max(new Date(), translate("futureDateAlert", language)),
      patIsBabyBornInThisHospital: yup.string().when([], {
        is: () => age <= 5,
        then: yup
          .string()
          .required(translate("babyBornInHospitalRequired", language)),
        otherwise: yup.string().notRequired(),
      }),
      patEthnicityText: yup.string().when([], {
        is: () => estEthnicityReligionMandatory === 1,
        then: yup.string().required(translate("ethnicityRequired", language)),
        otherwise: yup.string().notRequired(),
      }),
      patReligion: yup.string().when([], {
        is: () => estEthnicityReligionMandatory === 1,
        then: yup.string().required(translate("religionRequired", language)),
        otherwise: yup.string().notRequired(),
      }),
    }),
    onSubmit: (values: any) => {
      const obj = {
        ...values,
        patBarcode: null,
        patMothername: null,
        patMobile: null,
        patEmail: null,
        patId: patientId,
        patEstId: estID,
        patPatientwebAccountLocked:
          values.patPatientwebAccountLocked === true ? "1" : "0",
        patDob: values.patDob
          ? moment(values.patDob).format("YYYY-MM-DD")
          : null,
        patientIdentifierJsonList: patientIdentifierJson,
      };

      if (props.mode === "addPatient")
        addPatientDetails(obj, {
          onSuccess: onAddDetailsSuccess,
        });
      if (props.mode === "editPatient") {
        updatePatientDetails(obj);
      }
    },
  });

  return (
    <>
      {(establishmentListItemIsLoading ||
        patientDetailsIsLoading ||
        getCustomDetailsLoading ||
        countryIsLoading) && (
        <Backdrop sx={{ zIndex: "1500" }} open>
          <CircularProgress />
        </Backdrop>
      )}
      <>
        {(patientDetailsIsLoading ||
          establishmentListItemIsLoading ||
          countryIsLoading) && (
          <Backdrop sx={{ zIndex: "1500" }} open>
            <CircularProgress />
          </Backdrop>
        )}
        <form onSubmit={patientDetailsForm.handleSubmit} noValidate>
          <Grid container spacing={3} sx={{ mb: "10px" }}>
            {displayFields?.map((element: any) => {
              return (
                <>
                  {element?.name === "title" && (
                    <GridItem>
                      <Common.CellmaSelectField
                        label={translate("title", language)}
                        name="patTitle"
                        value={patientDetailsForm.values.patTitle}
                        changeevent={(event: any) => {
                          patientDetailsForm.setFieldValue(
                            "patTitle",
                            event.target.value
                          );
                        }}
                        onBlur={patientDetailsForm.handleBlur}
                        error={
                          patientDetailsForm.touched.patTitle &&
                          patientDetailsForm.errors.patTitle
                        }
                        list={establishmentListItem?.title.map(
                          (patientTitle: any) => (
                            <MenuItem
                              sx={{ whiteSpace: "unset" }}
                              key={patientTitle.eliId}
                              value={patientTitle.eliText}
                            >
                              {patientTitle.eliText}
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
                        disabled={
                          duplicateCheckFormData?.familyName !== "" &&
                          props?.mode === "addPatient"
                        }
                        name="patSurname"
                        style={{ textTransform: "capitalize" }}
                        maxLength="25"
                        value={patientDetailsForm.values.patSurname}
                        onHandleChange={patientDetailsForm.handleChange}
                        onBlur={patientDetailsForm.handleBlur}
                        errorText={
                          patientDetailsForm.touched.patSurname &&
                          patientDetailsForm.errors.patSurname
                        }
                      />
                    </GridItem>
                  )}
                  {element?.name === "givenName" && (
                    <GridItem>
                      <Common.CellmaInputField
                        required
                        label={translate("givenName", language)}
                        name="patFirstname"
                        disabled={
                          duplicateCheckFormData?.givenName !== "" &&
                          props?.mode === "addPatient"
                        }
                        style={{ textTransform: "capitalize" }}
                        value={patientDetailsForm.values.patFirstname}
                        onHandleChange={patientDetailsForm.handleChange}
                        onBlur={patientDetailsForm.handleBlur}
                        errorText={
                          patientDetailsForm.touched.patFirstname &&
                          patientDetailsForm.errors.patFirstname
                        }
                      />
                    </GridItem>
                  )}
                  {element?.name === "middleName" && (
                    <GridItem>
                      <Common.CellmaInputField
                        label={translate("middleName", language)}
                        name="patMiddlename"
                        value={patientDetailsForm.values.patMiddlename}
                        disabled={
                          duplicateCheckFormData?.middleName !== "" &&
                          props?.mode === "addPatient"
                        }
                        style={{ textTransform: "capitalize" }}
                        onHandleChange={patientDetailsForm.handleChange}
                        onBlur={patientDetailsForm.handleBlur}
                        onKeyPress={validations.allowCharHyphenApostropheSpace}
                        errorText={
                          patientDetailsForm.touched.patMiddleName &&
                          patientDetailsForm.errors.patMiddleName
                        }
                        onPaste={
                          validations.restrictPasteEventForSpecialCharactersAndNumbers
                        }
                      />
                    </GridItem>
                  )}
                  {element?.name === "maidenName" && (
                    <GridItem>
                      <Common.CellmaInputField
                        label={translate("maidenName", language)}
                        name="patMaidenName"
                        value={patientDetailsForm.values.patMaidenName}
                        disabled={
                          duplicateCheckFormData?.maidenNameOptional !== "" &&
                          props?.mode === "addPatient"
                        }
                        onHandleChange={patientDetailsForm.handleChange}
                        onBlur={patientDetailsForm.handleBlur}
                        onKeyPress={validations.allowCharHyphenApostropheSpace}
                        errorText={
                          patientDetailsForm.touched.patMaidenName &&
                          patientDetailsForm.errors.patMaidenName
                        }
                        onPaste={
                          validations.restrictPasteEventForSpecialCharactersAndNumbers
                        }
                      />
                    </GridItem>
                  )}
                  {element?.name === "ptNameInOtherLanguage" && (
                    <GridItem>
                      <Common.CellmaInputField
                        label={translate("ptNameInOtherLanguage", language)}
                        name="patNameOtherLang"
                        disabled={
                          patNameInOtherLanguage !== "" &&
                          props?.mode === "addPatient"
                        }
                        value={patientDetailsForm.values.patNameOtherLang ?? ""}
                        onHandleChange={patientDetailsForm.handleChange}
                        onKeyPress={validations.allowOnlyCharApostropheSpace}
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
                        required
                        disabled={
                          duplicateCheckFormData?.born !== null &&
                          props?.mode === "addPatient"
                        }
                        value={patientDetailsForm.values.patDob}
                        maxDate={new Date()}
                        onChange={(newDate: Date | null) => {
                          patientDetailsForm.setFieldValue("patDob", newDate);
                        }}
                        name="patDob"
                        onBlur={patientDetailsForm.handleBlur}
                        error={
                          patientDetailsForm.touched.patDob &&
                          patientDetailsForm.errors.patDob
                        }
                      />
                    </GridItem>
                  )}
                  {element?.name === "babyBornInHospital" && age <= 5 && (
                    <GridItem>
                      <Common.CellmaSelectField
                        label={translate("babyBornInHospital", language)}
                        name="patIsBabyBornInThisHospital"
                        required
                        value={
                          patientDetailsForm.values.patIsBabyBornInThisHospital
                        }
                        changeevent={patientDetailsForm.handleChange}
                        onBlur={patientDetailsForm.handleBlur}
                        error={
                          patientDetailsForm.touched
                            .patIsBabyBornInThisHospital &&
                          patientDetailsForm.errors.patIsBabyBornInThisHospital
                        }
                        disabled={
                          duplicateCheckFormData?.babyBornInHospital !== "" &&
                          props?.mode === "addPatient"
                        }
                        list={BABY_BORN_IN_HOSPITAL.map(
                          (babyBornInHospital: any) => (
                            <MenuItem
                              key={babyBornInHospital.id}
                              value={babyBornInHospital.value}
                              sx={{ whiteSpace: "unset" }}
                            >
                              {translate(
                                `${babyBornInHospital.label}`,
                                language
                              )}
                            </MenuItem>
                          )
                        )}
                      />
                    </GridItem>
                  )}
                  {element?.name === "sex" && (
                    <GridItem>
                      <Common.CellmaSelectField
                        label={translate("sex", language)}
                        name="patGenderAtBirth"
                        value={patientDetailsForm.values.patGenderAtBirth}
                        required
                        disabled={
                          duplicateCheckFormData?.sex !== "" &&
                          props?.mode === "addPatient"
                        }
                        changeevent={(event: any) => {
                          patientDetailsForm.setFieldValue(
                            "patGenderAtBirth",
                            event.target.value
                          );
                        }}
                        onBlur={patientDetailsForm.handleBlur}
                        error={
                          patientDetailsForm.touched.patGenderAtBirth &&
                          patientDetailsForm.errors.patGenderAtBirth
                        }
                        list={PATIENT_GENDER.map(
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
                  {element?.name === "currentGender" && (
                    <GridItem>
                      <Common.CellmaSelectField
                        label={translate("currentGender", language)}
                        name="patSex"
                        value={patientDetailsForm.values.patSex}
                        changeevent={patientDetailsForm.handleChange}
                        onBlur={patientDetailsForm.handleBlur}
                        error={
                          patientDetailsForm.touched.patSex &&
                          patientDetailsForm.errors.patSex
                        }
                        list={establishmentListItem?.["Current Gender"]?.map(
                          (gender: any) => (
                            <MenuItem
                              sx={{ whiteSpace: "unset" }}
                              key={gender?.eliId}
                              value={
                                gender?.eliText === "Male"
                                  ? "M"
                                  : gender?.eliText === "Female"
                                  ? "F"
                                  : gender?.eliText === "Indeterminate"
                                  ? "I"
                                  : gender?.eliText === "Unknown"
                                  ? "U"
                                  : ""
                              }
                            >
                              {gender?.eliText}
                            </MenuItem>
                          )
                        )}
                      />
                    </GridItem>
                  )}
                  {element?.name === "maritalStatus" && (
                    <GridItem>
                      <Common.CellmaSelectField
                        label={translate("maritalStatus", language)}
                        name="patMaritalStatus"
                        value={patientDetailsForm.values.patMaritalStatus}
                        changeevent={patientDetailsForm.handleChange}
                        onBlur={patientDetailsForm.handleBlur}
                        error={
                          patientDetailsForm.touched.patMaritalStatus &&
                          patientDetailsForm.errors.patMaritalStatus
                        }
                        list={establishmentListItem?.["marital status"].map(
                          (maritalStatus: any) => (
                            <MenuItem
                              sx={{ whiteSpace: "unset" }}
                              key={maritalStatus.eliId}
                              value={maritalStatus.eliText}
                            >
                              {maritalStatus.eliText}
                            </MenuItem>
                          )
                        )}
                      />
                    </GridItem>
                  )}
                  {element?.name === "sexualOrientation" && (
                    <GridItem>
                      <Common.CellmaSelectField
                        label={translate("sexualOrientation", language)}
                        name="patSexuality"
                        value={patientDetailsForm.values.patSexuality}
                        list={establishmentListItem?.["sexual orientation"].map(
                          (patientWeb: any) => (
                            <MenuItem
                              key={patientWeb.eliId}
                              value={patientWeb.eliText}
                            >
                              {patientWeb.eliText}
                            </MenuItem>
                          )
                        )}
                        changeevent={patientDetailsForm.handleChange}
                      />
                    </GridItem>
                  )}
                  {element?.name === "currentlyPregnant" && (
                    <GridItem>
                      <Common.CellmaSelectField
                        label={translate("currentlyPregnant", language)}
                        name="patCurrentlyPregnant"
                        value={patientDetailsForm.values.patCurrentlyPregnant}
                        disabled={
                          duplicateCheckFormData?.sex === "M" &&
                          props?.mode === "addPatient"
                        }
                        changeevent={patientDetailsForm.handleChange}
                        onBlur={patientDetailsForm.handleBlur}
                        error={
                          patientDetailsForm.touched.patCurrentlyPregnant &&
                          patientDetailsForm.errors.patCurrentlyPregnant
                        }
                        list={CURRENTLY_PREGNANT.map((pregnant: any) => (
                          <MenuItem
                            sx={{ whiteSpace: "unset" }}
                            key={pregnant.id}
                            value={pregnant.value}
                          >
                            {translate(`${pregnant.label}`, language)}
                          </MenuItem>
                        ))}
                      />
                    </GridItem>
                  )}
                  {element?.name === "ethnicity" && (
                    <GridItem>
                      <Common.CellmaSelectField
                        label={translate("ethnicity", language)}
                        name="patEthnicityText"
                        value={patientDetailsForm.values.patEthnicityText}
                        changeevent={patientDetailsForm.handleChange}
                        onBlur={patientDetailsForm.handleBlur}
                        required={estEthnicityReligionMandatory === 1}
                        error={
                          patientDetailsForm.touched.patEthnicityText &&
                          patientDetailsForm.errors.patEthnicityText
                        }
                        list={establishmentListItem?.ethnicity.map(
                          (ethnicity: any) => (
                            <MenuItem
                              sx={{ whiteSpace: "unset" }}
                              key={ethnicity.eliId}
                              value={ethnicity.eliText}
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
                        name="patOccupation"
                        value={patientDetailsForm.values.patOccupation}
                        changeevent={patientDetailsForm.handleChange}
                        onBlur={patientDetailsForm.handleBlur}
                        error={
                          patientDetailsForm.touched.patOccupation &&
                          patientDetailsForm.errors.patOccupation
                        }
                        list={establishmentListItem?.occupation.map(
                          (occupation: any) => (
                            <MenuItem
                              sx={{ whiteSpace: "unset" }}
                              key={occupation.eliId}
                              value={occupation.eliText}
                            >
                              {occupation.eliText}
                            </MenuItem>
                          )
                        )}
                      />
                    </GridItem>
                  )}
                  {element?.name === "religion" && (
                    <GridItem>
                      <Common.CellmaSelectField
                        label={translate("religion", language)}
                        name="patReligion"
                        value={patientDetailsForm.values.patReligion}
                        changeevent={patientDetailsForm.handleChange}
                        onBlur={patientDetailsForm.handleBlur}
                        required={estEthnicityReligionMandatory === 1}
                        error={
                          patientDetailsForm.touched.patReligion &&
                          patientDetailsForm.errors.patReligion
                        }
                        list={establishmentListItem?.["patient religion"].map(
                          (religion: any) => (
                            <MenuItem
                              sx={{ whiteSpace: "unset" }}
                              key={religion.eliId}
                              value={religion.eliText}
                            >
                              {religion.eliText}
                            </MenuItem>
                          )
                        )}
                      />
                    </GridItem>
                  )}
                  {element?.name === "townOfBirth" && (
                    <GridItem>
                      <Common.CellmaInputField
                        label={translate("townOfBirth", language)}
                        name="patTownOfBirth"
                        value={patientDetailsForm.values.patTownOfBirth}
                        onKeyPress={validations.allowOnlyCharApostropheSpace}
                        onHandleChange={patientDetailsForm.handleChange}
                        onBlur={patientDetailsForm.handleBlur}
                        errorText={
                          patientDetailsForm.touched.patTownOfBirth &&
                          patientDetailsForm.errors.patTownOfBirth
                        }
                        onPaste={
                          validations.restrictPasteEventForSpecialCharactersAndNumbers
                        }
                      />
                    </GridItem>
                  )}
                  {element?.name === "countyOfBirth" && (
                    <GridItem>
                      <Common.CellmaInputField
                        label={translate("countyOfBirth", language)}
                        name="patCountyOfBirth"
                        value={patientDetailsForm.values.patCountyOfBirth}
                        onKeyPress={validations.allowOnlyCharForwardSlashSpace}
                        onHandleChange={patientDetailsForm.handleChange}
                        onBlur={patientDetailsForm.handleBlur}
                        errorText={
                          patientDetailsForm.touched.patCountyOfBirth &&
                          patientDetailsForm.errors.patCountyOfBirth
                        }
                        onPaste={
                          validations.restrictPasteEventForSpecialCharactersAndNumbers
                        }
                      />
                    </GridItem>
                  )}
                  {element?.name === "countryOfBirth" && (
                    <GridItem>
                      <Common.CellmaSelectField
                        label={translate("countryOfBirth", language)}
                        name="patCountryOfBirth"
                        value={patientDetailsForm.values.patCountryOfBirth}
                        changeevent={patientDetailsForm.handleChange}
                        onBlur={patientDetailsForm.handleBlur}
                        error={
                          patientDetailsForm.touched.patCountryOfBirth &&
                          patientDetailsForm.errors.patCountryOfBirth
                        }
                        list={countryList.map((country: any) => (
                          <MenuItem
                            sx={{ whiteSpace: "unset" }}
                            key={country.couId}
                            value={country.couCountry}
                          >
                            {country.couCountry}
                          </MenuItem>
                        ))}
                      />
                    </GridItem>
                  )}
                  {element?.name === "nationality" && (
                    <GridItem>
                      <Common.CellmaSelectField
                        label={translate("nationality", language)}
                        name="patNationality"
                        value={patientDetailsForm.values.patNationality}
                        changeevent={patientDetailsForm.handleChange}
                        onBlur={patientDetailsForm.handleBlur}
                        error={
                          patientDetailsForm.touched.patNationality &&
                          patientDetailsForm.errors.patNationality
                        }
                        list={establishmentListItem?.nationality.map(
                          (nationality: any) => (
                            <MenuItem
                              sx={{ whiteSpace: "unset" }}
                              key={nationality.eliId}
                              value={nationality.eliText}
                            >
                              {nationality.eliText}
                            </MenuItem>
                          )
                        )}
                      />
                    </GridItem>
                  )}
                  {element?.name === "regDisabled" && (
                    <GridItem>
                      <Common.CellmaSelectField
                        label={translate("regDisabled", language)}
                        name="patRegisteredDisabled"
                        value={patientDetailsForm.values.patRegisteredDisabled}
                        changeevent={patientDetailsForm.handleChange}
                        onBlur={patientDetailsForm.handleBlur}
                        error={
                          patientDetailsForm.touched.patRegisteredDisabled &&
                          patientDetailsForm.errors.patRegisteredDisableded
                        }
                        list={REG_DISABLED.map((disabled: any) => (
                          <MenuItem
                            sx={{ whiteSpace: "unset" }}
                            key={disabled.id}
                            value={disabled.value}
                          >
                            {translate(`${disabled.label}`, language)}
                          </MenuItem>
                        ))}
                      />
                    </GridItem>
                  )}
                  {element?.name === "primaryDisability" && (
                    <GridItem>
                      <Common.CellmaSelectFieldWithCheckbox
                        label={translate("primaryDisability", language)}
                        name="primaryDisability"
                        value={patientDetailsForm.values.primaryDisability}
                        onChange={(event) => {
                          const { value } = event.target;
                          patientDetailsForm.setFieldValue(
                            "primaryDisability",
                            value
                          );
                        }}
                        list={establishmentListItem?.disabilities.map(
                          (disability: any) => (
                            <Mui.MenuItem
                              key={disability?.eliId}
                              value={disability?.eliText}
                            >
                              <Mui.ListItemIcon>
                                <Mui.Checkbox
                                  checked={patientDetailsForm.values.primaryDisability?.includes(
                                    disability?.eliText
                                  )}
                                />
                              </Mui.ListItemIcon>
                              <Mui.ListItemText primary={disability?.eliText} />
                            </Mui.MenuItem>
                          )
                        )}
                      />
                    </GridItem>
                  )}
                  {element?.name === "assistanceNeeded" && (
                    <GridItem>
                      <Common.CellmaInputField
                        label={translate("assistanceNeeded", language)}
                        name="patNeededAssistanceAtAppointments"
                        value={
                          patientDetailsForm.values
                            .patNeededAssistanceAtAppointments
                        }
                        onHandleChange={patientDetailsForm.handleChange}
                      />
                    </GridItem>
                  )}
                  {element?.name === "disabilityNote" && (
                    <GridItem>
                      <Common.CellmaInputField
                        label={translate("disabilityNote", language)}
                        name="patDisabilityNote"
                        value={patientDetailsForm.values.patDisabilityNote}
                        onHandleChange={patientDetailsForm.handleChange}
                      />
                    </GridItem>
                  )}
                  {element?.name === "language" && (
                    <GridItem>
                      <Common.CellmaSelectField
                        label={translate("language", language)}
                        name="patLanguage"
                        value={patientDetailsForm.values.patLanguage}
                        changeevent={patientDetailsForm.handleChange}
                        onBlur={patientDetailsForm.handleBlur}
                        error={
                          patientDetailsForm.touched.patLanguage &&
                          patientDetailsForm.errors.patLanguage
                        }
                        list={establishmentListItem?.language.map(
                          (language: any) => (
                            <MenuItem
                              sx={{ whiteSpace: "unset" }}
                              key={language.eliId}
                              value={language.eliText}
                            >
                              {language.eliText}
                            </MenuItem>
                          )
                        )}
                      />
                    </GridItem>
                  )}
                  {element?.name === "interpreterNeeded" && (
                    <GridItem>
                      <Common.CellmaSelectField
                        // required={estDisplayInterpreterType}
                        label={translate("interpreterNeeded", language)}
                        name="patNeedInterpreterAtAppointments"
                        value={
                          patientDetailsForm.values
                            .patNeedInterpreterAtAppointments
                        }
                        list={INTERPRETER_REQUIRED.map((patientWeb: any) => (
                          <MenuItem
                            key={patientWeb.id}
                            value={patientWeb.value}
                          >
                            {translate(`${patientWeb.label}`, language)}
                          </MenuItem>
                        ))}
                        changeevent={patientDetailsForm.handleChange}
                      />
                    </GridItem>
                  )}
                  {element?.name === "interpreterType" && (
                    <GridItem>
                      <Common.CellmaSelectField
                        label={translate("interpreterType", language)}
                        name="patInterpreterTypeEliId"
                        value={
                          patientDetailsForm.values.patInterpreterTypeEliId
                        }
                        list={establishmentListItem?.[
                          "Type of interpreter needed"
                        ].map((patientWeb: any) => (
                          <MenuItem
                            sx={{ whiteSpace: "unset" }}
                            key={patientWeb.eliId}
                            value={patientWeb.eliId}
                          >
                            {patientWeb.eliText}
                          </MenuItem>
                        ))}
                        changeevent={patientDetailsForm.handleChange}
                      />
                    </GridItem>
                  )}
                  {element?.name === "nhsNo" && (
                    <GridItem>
                      <Common.CellmaInputField
                        label={translate("nhsNo", language)}
                        name="patNhsRef"
                        value={patientDetailsForm.values.patNhsRef}
                        disabled={
                          (duplicateCheckFormData?.nhsRefOptional !== "" &&
                            props?.mode === "addPatient") ||
                          patientDetails?.settings.estReadOnlyIdentifiers === 1
                        }
                        onKeyPress={validations.nhsNoValidation}
                        onHandleChange={patientDetailsForm.handleChange}
                        onBlur={(event: any) => {
                          patientDetailsForm.setFieldValue(
                            "patNhsRef",
                            formatNHSNumber(event.target.value)
                          );
                        }}
                        maxLength="20"
                        errorText={
                          patientDetailsForm.touched.patNhsRef &&
                          patientDetailsForm.errors.patNhsRef
                        }
                        onPaste={
                          validations.restrictPasteEventForSpecialCharactersAndAlphabets
                        }
                      />
                    </GridItem>
                  )}
                  {element?.name === "hospitalRef" && (
                    <GridItem>
                      <Common.CellmaInputField
                        label={translate("hospitalRef", language)}
                        name="patHospitalRef"
                        disabled={
                          patientDetails?.settings.estReadOnlyIdentifiers ===
                            1 ||
                          (props?.mode === "addPatient" &&
                            patHospitalReference !== "")
                        }
                        value={patientDetailsForm.values.patHospitalRef}
                        onKeyPress={validations.hospitalRefValidation}
                        onHandleChange={patientDetailsForm.handleChange}
                        onBlur={patientDetailsForm.handleBlur}
                        maxLength="32"
                        errorText={
                          patientDetailsForm.touched.patHospitalRef &&
                          patientDetailsForm.errors.patHospitalRef
                        }
                        onPaste={
                          validations.restrictPasteEventForSpecialCharacters
                        }
                      />
                    </GridItem>
                  )}
                  {element?.name === "identifier" && (
                    <GridItem>
                      <Common.CellmaInputField
                        label={translate("identifier", language)}
                        name="patIdentifier"
                        disabled={
                          (duplicateCheckFormData?.identifier !== "" &&
                            props?.mode === "addPatient") ||
                          patientDetails?.settings.estReadOnlyIdentifiers === 1
                        }
                        value={patientDetailsForm.values.patIdentifier}
                        onHandleChange={patientDetailsForm.handleChange}
                        onBlur={patientDetailsForm.handleBlur}
                        errorText={
                          patientDetailsForm.touched.patIdentifier &&
                          patientDetailsForm.errors.patIdentifier
                        }
                      />
                    </GridItem>
                  )}
                  {element?.name === "pasId" && (
                    <GridItem>
                      <Common.CellmaInputField
                        label={translate("pasId", language)}
                        name="patPasid"
                        disabled={
                          patientDetails?.settings.estReadOnlyIdentifiers === 1
                        }
                        value={patientDetailsForm.values.patPasid}
                        onHandleChange={patientDetailsForm.handleChange}
                      />
                    </GridItem>
                  )}
                  {element?.name === "patientType" && (
                    <GridItem>
                      <Common.CellmaSelectField
                        label={translate("patientType", language)}
                        name="patType"
                        value={patientDetailsForm.values.patType}
                        changeevent={patientDetailsForm.handleChange}
                        onBlur={patientDetailsForm.handleBlur}
                        error={
                          patientDetailsForm.touched.patType &&
                          patientDetailsForm.errors.patType
                        }
                        list={establishmentListItem?.["patient type"].map(
                          (type: any) => (
                            <MenuItem
                              sx={{ whiteSpace: "unset" }}
                              key={type.eliId}
                              value={type.eliText}
                            >
                              {type.eliText}
                            </MenuItem>
                          )
                        )}
                      />
                    </GridItem>
                  )}
                  {element?.name === "prisoner" && (
                    <GridItem>
                      <Common.CellmaSelectField
                        label={translate("prisoner", language)}
                        name="patPrisoner"
                        value={patientDetailsForm.values.patPrisoner}
                        onBlur={patientDetailsForm.handleBlur}
                        list={PRISONER.map((prisoner: any) => (
                          <MenuItem
                            sx={{ whiteSpace: "unset" }}
                            key={prisoner.id}
                            value={prisoner.value}
                          >
                            {translate(`${prisoner.label}`, language)}
                          </MenuItem>
                        ))}
                        changeevent={patientDetailsForm.handleChange}
                      />
                    </GridItem>
                  )}
                  {element?.name === "bloodType" && (
                    <GridItem>
                      <Common.CellmaSelectField
                        label={translate("bloodType", language)}
                        name="patBloodGroup"
                        value={patientDetailsForm.values.patBloodGroup}
                        onBlur={patientDetailsForm.handleBlur}
                        changeevent={patientDetailsForm.handleChange}
                        list={BLOOD_TYPE.map((bloodType: any) => (
                          <MenuItem
                            sx={{ whiteSpace: "unset" }}
                            key={bloodType.id}
                            value={bloodType.label}
                          >
                            {bloodType.label}
                          </MenuItem>
                        ))}
                      />
                    </GridItem>
                  )}
                  {element?.name === "died" && (
                    <GridItem>
                      <Common.CellmaDatePicker
                        label={translate("died", language)}
                        name="patDod"
                        maxDate={new Date()}
                        value={patientDetailsForm.values.patDod}
                        onBlur={patientDetailsForm.handleBlur}
                        onChange={(newDate: Date | null) => {
                          patientDetailsForm.setFieldValue("patDod", newDate);
                        }}
                        disabled={
                          props?.mode === "addPatient" ||
                          props?.mode === "editPatient"
                        }
                      />
                    </GridItem>
                  )}
                  {element?.name === "restrictedRegistration" && (
                    <GridItem>
                      <Common.CellmaSelectField
                        label={translate("restrictedRegistration", language)}
                        name="patBanned"
                        value={patientDetailsForm.values.patBanned}
                        list={RESTRICTED_REGISTRATION.map((patientWeb: any) => (
                          <MenuItem
                            sx={{ whiteSpace: "unset" }}
                            key={patientWeb.id}
                            value={patientWeb.value}
                          >
                            {translate(`${patientWeb.label}`, language)}
                          </MenuItem>
                        ))}
                        changeevent={patientDetailsForm.handleChange}
                      />
                    </GridItem>
                  )}
                  {element?.name === "patientWebAccess" && (
                    <GridItem>
                      <Common.CellmaSelectField
                        label={translate("patientWebAccess", language)}
                        name="patRegisteredWithPatientweb"
                        value={
                          patientDetailsForm.values.patRegisteredWithPatientweb
                        }
                        onBlur={patientDetailsForm.handleBlur}
                        list={PATIENT_WEB_ACCESS.map(
                          (patientWebAccess: any) => (
                            <MenuItem
                              sx={{ whiteSpace: "unset" }}
                              key={patientWebAccess.id}
                              value={patientWebAccess.value}
                            >
                              {translate(`${patientWebAccess.label}`, language)}
                            </MenuItem>
                          )
                        )}
                        changeevent={patientDetailsForm.handleChange}
                      />
                    </GridItem>
                  )}
                </>
              );
            })}
            {props?.mode === "editPatient" && (
              <GridItem>
                <Common.CellmaLink
                  label={translate("resetPassword", language)}
                  onClick={() =>
                    //  If email address for patient is not set then dispatch "pleaseSetPatientEmail" message
                    dispatch(
                      setSnackbar(
                        true,
                        "success",
                        translate("linkSentSuccessfully", language),
                        4
                      )
                    )
                  }
                >
                  {translate("resetPassword", language)}
                </Common.CellmaLink>
              </GridItem>
            )}
            {props?.mode === "editPatient" && (
              <GridItem>
                <Common.CellmaCheckbox
                  label={translate("lockPatientWebAccount", language)}
                  name="patPatientwebAccountLocked"
                  value={patientDetailsForm.values.patPatientwebAccountLocked}
                  onHandleChange={patientDetailsForm.handleChange}
                />
              </GridItem>
            )}
            <GridItem>
              <Common.CellmaInputField
                rows="2"
                multiline
                label={translate("notes", language)}
                name="patNotes"
                value={patientDetailsForm.values.patNotes}
                onHandleChange={patientDetailsForm.handleChange}
              />
            </GridItem>
            {isShowPatientIdentification && props?.mode === "addPatient" && (
              <>
                <Grid item xs={12}>
                  <Divider variant="fullWidth" />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h2">
                    {translate("patientUniqueIdentifier", language)}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <CellmaTable
                    rows={rows}
                    columns={columns}
                    noRecordsMessage={translate("noRecordsFound", language)}
                    getRowId={(row: any) => row?.identifierType}
                  />
                </Grid>
              </>
            )}
            {isShowPatientIdentification && props?.mode === "editPatient" && (
              <>
                <Grid item xs={12}>
                  <Typography variant="h2">
                    {translate("patientUniqueIdentifier", language)}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  {/* Integrate functionality for edit identifier table */}
                  <CellmaTable
                    rows={patientIdentifier}
                    columns={columns}
                    noRecordsMessage={translate("noRecordsFound", language)}
                    getRowId={(row: any) => row?.identifierType}
                    listCount={patientIdentifier?.length}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Common.CellmaButton
                    label={translate("addPatientUniqueIdentifier", language)}
                    onClick={() => setIsAddNewIdentifier(true)}
                  />
                </Grid>
              </>
            )}
            {isAddNewIdentifier && (
              <Grid item xs={12}>
                <AddPatientUniqueIdentifier
                  patientId={patientId}
                  getPatientDetailsRefetch={patientIdentifierRefetch}
                />
              </Grid>
            )}
            {isExistingIdentifier && (
              <Mui.Backdrop open>
                <Common.CellmaPopup
                  title={translate("deleteExistingIdentifier", language)}
                  handleCancel={() => setIsExistingIdentifier(false)}
                >
                  <Mui.Grid container padding={2}>
                    <Mui.Grid item xs={12}>
                      <Mui.Typography
                        variant="h2"
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          margin: "10px",
                        }}
                      >
                        {translate("deleteMessage", language)}
                      </Mui.Typography>
                    </Mui.Grid>
                    <Mui.Grid
                      item
                      xs={12}
                      sx={{ display: "flex", justifyContent: "flex-end" }}
                      gap={1}
                    >
                      <Common.CellmaButton
                        onClick={() => {
                          deleteIdentifier(pidId, {
                            onSuccess: (response: any) => {
                              if (response?.status === 200) {
                                patientIdentifierRefetch();
                                setIsExistingIdentifier(false);
                              }
                            },
                          });
                        }}
                        label={translate("ok", language)}
                      />
                      <Common.CellmaButton
                        onClick={() => {
                          setIsExistingIdentifier(false);
                        }}
                        label={translate("cancel", language)}
                      />
                    </Mui.Grid>
                  </Mui.Grid>
                </Common.CellmaPopup>
              </Mui.Backdrop>
            )}
            {props?.mode === "editPatient" && (
              <Grid item xs={12} sx={styles.saveButton}>
                <Common.CellmaButton
                  label={translate("save", language)}
                  type="submit"
                  onClick={() => {
                    if (patientDetailsForm?.errors) {
                      window.scrollTo(0, 0);
                    }
                  }}
                />
              </Grid>
            )}
            {props?.mode === "addPatient" && (
              <Grid item xs={12} sx={styles.nextButton}>
                <Common.CellmaButton
                  label={translate("cancel", language)}
                  onClick={() => navigate("/cellmaUser/patient/patientSearch")}
                />
                <Common.CellmaButton
                  label={translate("next", language)}
                  type="submit"
                  onClick={() => {
                    if (patientDetailsForm?.errors) {
                      window.scrollTo(0, 0);
                    }
                  }}
                />
              </Grid>
            )}
          </Grid>
        </form>
      </>
    </>
  );
};

export default AddDetails;

export const styles = {
  saveButton: {
    display: "flex",
    justifyContent: "flex-end",
    mt: "50px",
  },
  alignEnd: { display: "flex", justifyContent: "flex-end" },
  checkboxGrid: {
    display: "flex",
    alignItems: "center",
  },
  nextButton: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "1rem",
  },
};

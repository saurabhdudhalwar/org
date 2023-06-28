// This page is merged with create patient/ Add Details page and this page is for reference for react-team.
//  delete this page after integrating functionality

import { useEffect, useState } from "react";

import { DeleteOutline } from "@mui/icons-material";
import {
  Backdrop,
  CircularProgress,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import * as Mui from "@mui/material";
import Grid from "@mui/material/Grid";
import { GridColDef } from "@mui/x-data-grid";
// import { differenceInCalendarDays } from "date-fns";
import { Formik, FormikProps } from "formik";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

import useCountriesLists from "../../../../api/useCountriesList";
import useEstablishmentListItems from "../../../../api/useEstablishmentListItems";
import CellmaTable from "../../../../common/CellmaTable";
import * as Common from "../../../../common/CommonComponentsIndex";
import { setSnackbar } from "../../../../store/SnackbarAction";
import { ageCount } from "../../../../utils/GeneralUtils";
import * as validations from "../../../../utils/Validations";
import { formatNHSNumber } from "../../../../utils/Validations";
import {
  useGetPatientDetails,
  useUpdatePatientDetails,
} from "../../api/usePatientDetails";
import * as dummyData from "../../assets/dummyData/PatientDetailsDummyData";
import translate from "../../assets/translationFiles/patientDetailsTranslation";
import AddPatientUniqueIdentifier from "../../common/AddPatientUniqueIdentifier";
import { IPatientDetails } from "../../types";

interface Props {
  // insert props here
}

const PatientDetails: React.FC<Props> = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [pregnantCheckbox, setPregnantCheckbox] = useState(false);
  const { isShowPatientIdentifier, patientId } = useSelector(
    (state: any) => state.patient
  );
  const { language } = useSelector((state: any) => state.language);
  const { estID } = useSelector((state: any) => state.auth);
  const { data, refetch: getPatientDetailsRefetch } =
    useGetPatientDetails(patientId);
  const { data: countryList, isLoading: countryIsLoading } =
    useCountriesLists();
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
    "patient type",
    "Type of interpreter needed",
    "sexual orientation",
    "patient identifiers",
  ]);

  const [formData, setFormData] = useState<IPatientDetails>();
  const [selectedBornDate, setSelectedBornDate] = useState<Date>() as any;
  const [isExistingIdentifier, setIsExistingIdentifier] = useState(false);
  const [isAddNewIdentifier, setIsAddNewIdentifier] = useState(false);

  const dispatch = useDispatch();
  const { mutate: updatePatientDetails, isLoading: updatingPatientDetails } =
    useUpdatePatientDetails();

  const patientInformation = data?.entity;
  const patientDetails = data?.patientDetails;
  const identifierDetails = data?.patIdentifierList ?? [];
  const estDisplayInterpreterType = data?.estDisplayInterpreterType ?? false;
  const settings = data?.settings;

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
      // minWidth: 30,
      maxWidth: 40,
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
      minWidth: 80,
      maxWidth: 100,
      renderCell: (params) => {
        return (
          <Mui.IconButton
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
            aria-label="Delete identifier"
            onClick={(e: any) => {
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

  useEffect(() => {
    if (formData !== undefined)
      updatePatientDetails({
        patId: parseInt(patientId, 10),
        patEstId: estID,
        patEgpId: 13,
        patEthnicityCodId: 0,
        patHospitalRef: formData?.hospitalRef,
        patNhsRef: formData?.nhsNo,
        patIdentifier: formData?.identifier,
        patTitle: formData?.title,
        patFirstname: formData?.givenName,
        patSurname: formData?.familyName,
        patSex: formData?.sex,
        patDob: moment(formData?.born).format("YYYY-MM-DD"),
        patMaritalStatus: formData?.maritalStatus,
        patEthnicityText: formData?.ethnicity,
        patOccupation: formData?.occupation,
        patNotes: formData?.notes,
        patMaidenName: formData?.maidenName,
        patReligion: formData?.religion,
        patPractisingReligion: 0,
        patMiddlename: formData?.middleName,
        patCurrentlyPregnant: formData?.pregnant === true ? 1 : 0,
        patLanguage: formData?.language,
        patDisability: formData?.disability,
        patCountryOfBirth: formData?.countryOfBirth,
        patGenderAtBirth: formData?.currentGender,
        patNationality: formData?.nationality,
        patSexuality: formData?.sexualOrientation,
        patCountyOfBirth: formData?.countyOfBirth,
        patTownOfBirth: formData?.townOfBirth,
        patMothername: "",
        patType: formData?.patientType,
        patRegisteredDisabled: formData?.regDisabled === true ? 1 : 0,
        patNeedInterpreterAtAppointments: formData?.interpreterNeeded,
        patNameOtherLang: formData?.patientNameInOtherLanguage,
        patMobile: "",
        patEmail: "",
        pageNumber: 0,
      });
  }, [estID, formData, patientId, updatePatientDetails]);

  // Function for get age at born
  const age = ageCount(selectedBornDate);

  return (
    <>
      {(updatingPatientDetails ||
        establishmentListItemIsLoading ||
        countryIsLoading) && (
        <Backdrop sx={{ zIndex: "1500" }} open>
          <CircularProgress />
        </Backdrop>
      )}
      <Formik
        enableReinitialize
        initialValues={{
          title: patientDetails?.patTitle ? patientDetails?.patTitle : "",
          familyName: patientDetails?.patSurname
            ? patientDetails?.patSurname
            : "",
          givenName: patientDetails?.patFirstname
            ? patientDetails?.patFirstname
            : "",
          middleName: patientDetails?.patMiddlename
            ? patientDetails?.patMiddlename
            : "",
          maidenName: patientDetails?.patMaidenName
            ? patientDetails?.patMaidenName
            : "",
          patientNameInOtherLanguage: patientDetails?.patNameOtherLang
            ? patientDetails?.patNameOtherLang
            : "",
          born: patientDetails?.patDob ? patientDetails?.patDob : "",
          sex: patientDetails?.patSex ? patientDetails?.patSex : "",
          currentGender: patientDetails?.patGenderAtBirth
            ? patientDetails?.patGenderAtBirth
            : "",
          maritalStatus: patientDetails?.patMaritalStatus
            ? patientDetails?.patMaritalStatus
            : "",
          sexualOrientation: patientDetails?.patSexualOrientation
            ? patientDetails?.patSexualOrientation
            : "",
          pregnant: !!patientDetails?.patCurrentlyPregnant,
          ethnicity: patientDetails?.patEthnicityText
            ? patientDetails?.patEthnicityText
            : "",
          occupation: patientDetails?.patOccupation
            ? patientDetails?.patOccupation
            : "",
          religion: patientDetails?.patReligion
            ? patientDetails?.patReligion
            : "",
          townOfBirth: patientDetails?.patTownOfBirth
            ? patientDetails?.patTownOfBirth
            : "",
          countyOfBirth: patientDetails?.patCountyOfBirth
            ? patientDetails?.patCountyOfBirth
            : "",
          countryOfBirth: patientDetails?.patCountryOfBirth
            ? patientDetails?.patCountryOfBirth
            : "",
          nationality: patientDetails?.patNationality
            ? patientDetails?.patNationality
            : "",
          regDisabled: patientDetails?.patRegisteredDisabled === 1,
          disability: patientDetails?.patDisability
            ? patientDetails?.patDisability
            : "",
          assistanceNeeded:
            patientDetails?.patNeededAssistanceAtAppointments === "1"
              ? "Yes"
              : "No",
          disabilityNote: patientDetails?.patDisabilityNote
            ? patientDetails?.patDisabilityNote
            : "",
          language: patientDetails?.patLanguage
            ? patientDetails?.patLanguage
            : "",
          interpreterNeeded:
            patientDetails?.patNeedInterpreterAtAppointments === 1 ? "1" : "0",
          interpreterType: patientInformation?.interpreterType || "",
          nhsNo: patientDetails?.patNhsRef ? patientDetails?.patNhsRef : "",
          hospitalRef: patientDetails?.patHospitalRef
            ? patientDetails?.patHospitalRef
            : "",
          identifier: patientDetails?.patIdentifier
            ? patientDetails?.patIdentifier
            : "",
          pasId: patientDetails?.patPasid ? patientDetails?.patPasid : "",
          patientType: patientDetails?.patType ? patientDetails?.patType : "",
          prisoner: patientDetails?.patPrisoner === 1,
          bloodType: patientDetails?.patBloodGroup
            ? patientDetails?.patBloodGroup
            : "",
          died: patientDetails?.patDod ? patientDetails?.patDod : "",
          restrictedRegistration: "0",
          patientWebAccess: patientDetails?.patRegisteredWithPatientweb === 1,
          lockPatientWebAccount:
            patientDetails?.patPatientwebAccountLocked === 1,
          notes: patientDetails?.patNotes ? patientDetails?.patNotes : "",
          babyBornInHospital: patientDetails?.patIsBabyBornInThisHospital
            ? patientDetails?.patIsBabyBornInThisHospital
            : "",
        }}
        validationSchema={yup.object().shape({
          familyName: yup
            .string()
            .required(translate("familyNameRequired", language)),
          givenName: yup
            .string()
            .required(translate("givenNameRequired", language)),
          born: yup
            .date()
            .nullable()
            .required(translate("bornDateRequired", language))
            .typeError(translate("invalidBirthDate", language))
            .min(
              new Date("01/01/1900"),
              translate("invalidBirthDate", language)
            )
            .max(new Date(), translate("futureDateAlert", language)),
          currentGender: yup
            .string()
            .required(translate("currentGenderRequired", language)),
          died: yup.date().typeError(translate("invalidBirthDate", language)),
          babyBornInHospital: yup.string().when([], {
            is: () => age <= 5,
            then: yup
              .string()
              .required(translate("babyBornInHospitalRequired", language)),
            otherwise: yup.string().notRequired(),
          }),
          interpreterNeeded: yup.string().when([], {
            is: estDisplayInterpreterType,
            then: yup
              .string()
              .required(translate("interpreterNeeded", language)),
            otherwise: yup.string().notRequired(),
          }),
        })}
        onSubmit={(values: IPatientDetails) => {
          setFormData(values);
        }}
      >
        {(data: FormikProps<any>) => {
          return (
            <form onSubmit={data.handleSubmit} noValidate>
              <Grid container spacing={3}>
                <Grid item xs={2.4}>
                  <Common.CellmaSelectField
                    label={translate("title", language)}
                    name="title"
                    value={data.values.title}
                    list={establishmentListItem.title.map((patientWeb: any) => (
                      <MenuItem
                        sx={{ whiteSpace: "unset" }}
                        key={patientWeb.eliId}
                        value={patientWeb.eliText}
                      >
                        {patientWeb.eliText}
                      </MenuItem>
                    ))}
                    changeevent={(event: any) => {
                      const result = validations.genderTitleHandler(
                        event,
                        data,
                        "title"
                      );
                      if (result[0] !== "") {
                        alert(translate(result[0], language));
                      }
                      data.setFieldValue("title", event.target.value);
                      data.setFieldValue("sex", result[1]);
                    }}
                  />
                </Grid>
                <Grid item xs={2.4}>
                  <Common.CellmaInputField
                    label={translate("familyName", language)}
                    value={data.values.familyName}
                    style={{ textTransform: "capitalize" }}
                    name="familyName"
                    maxLength="40"
                    onKeyPress={validations.allowCharHyphenApostropheSpace}
                    onHandleChange={data.handleChange}
                    onBlur={data.handleBlur}
                    errorText={
                      data.touched.familyName && data.errors.familyName
                    }
                    required
                  />
                </Grid>
                <Grid item xs={2.4}>
                  <Common.CellmaInputField
                    label={translate("givenName", language)}
                    name="givenName"
                    maxLength="60"
                    onKeyPress={validations.allowCharHyphenApostropheSpace}
                    value={data.values.givenName}
                    style={{ textTransform: "capitalize" }}
                    defaultValue="Kasturi"
                    onHandleChange={data.handleChange}
                    onBlur={data.handleBlur}
                    errorText={data.touched.givenName && data.errors.givenName}
                    required
                  />
                </Grid>
                <Grid item xs={2.4}>
                  <Common.CellmaInputField
                    label={translate("middleName", language)}
                    name="middleName"
                    value={data.values.middleName}
                    maxLength="100"
                    onKeyPress={validations.allowCharHyphenApostropheSpace}
                    onHandleChange={data.handleChange}
                  />
                </Grid>
                <Grid item xs={2.4}>
                  <Common.CellmaInputField
                    label={translate("maidenName", language)}
                    name="maidenName"
                    value={data.values.maidenName}
                    onHandleChange={data.handleChange}
                    defaultValue="Riomed"
                    onKeyPress={validations.allowCharHyphenApostropheSpace}
                  />
                </Grid>
                <Grid item xs={2.4}>
                  <Common.CellmaInputField
                    label={translate("ptNameInOtherLanguage", language)}
                    name="patientNameInOtherLanguage"
                    value={data.values.patientNameInOtherLanguage}
                    onHandleChange={data.handleChange}
                    defaultValue="Test"
                    onKeyPress={validations.allowOnlyCharApostropheSpace}
                  />
                </Grid>
                <Grid item xs={2.4}>
                  <Common.CellmaDatePicker
                    label={translate("born", language)}
                    name="born"
                    required
                    maxDate={new Date()}
                    value={data.values.born}
                    onBlur={data.handleBlur}
                    onChange={(newDate: Date | null) => {
                      data.setFieldValue("born", newDate);
                      setSelectedBornDate(newDate);
                    }}
                    error={data.touched.born && data.errors.born}
                  />
                </Grid>
                {(age <= 5 ||
                  patientDetails?.patIsBabyBornInThisHospital === 1) && (
                  <Grid item xs={2.4}>
                    <Common.CellmaSelectField
                      label={translate("babyBornInHospital", language)}
                      name="babyBornInHospital"
                      required
                      value={data.values.babyBornInHospital}
                      changeevent={data.handleChange}
                      onBlur={data.handleBlur}
                      error={
                        data.touched.babyBornInHospital &&
                        data.errors.babyBornInHospital
                      }
                      list={dummyData.BABY_BORN_IN_HOSPITAL.map(
                        (babyBornInHospital: any) => (
                          <MenuItem
                            key={babyBornInHospital.id}
                            value={babyBornInHospital.value}
                            sx={{ whiteSpace: "unset" }}
                          >
                            {translate(`${babyBornInHospital.label}`, language)}
                          </MenuItem>
                        )
                      )}
                    />
                  </Grid>
                )}
                <Grid item xs={2.4}>
                  <Common.CellmaSelectField
                    label={
                      patientInformation?.renameLabelOfPatSex
                        ? translate("sex", language)
                        : translate("currentGender", language)
                    }
                    name="sex"
                    value={data.values.sex}
                    list={dummyData.PATIENT_GENDER.map(
                      (patientWeb: any) =>
                        patientWeb.label !== "all" && (
                          <MenuItem
                            sx={{ whiteSpace: "unset" }}
                            key={patientWeb.id}
                            value={patientWeb.value}
                          >
                            {translate(`${patientWeb.label}`, language)}
                          </MenuItem>
                        )
                    )}
                    changeevent={(event: any) => {
                      if (event.target.value === "M") {
                        setPregnantCheckbox(true);
                      } else {
                        setPregnantCheckbox(false);
                      }
                      const result = validations.genderTitleHandler(
                        event,
                        data,
                        "sex"
                      );
                      if (result[0] !== "") {
                        alert(translate(result[0], language));
                      }
                      data.setFieldValue("title", result[1]);
                      data.setFieldValue("sex", event.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={2.4}>
                  <Common.CellmaSelectField
                    label={
                      patientInformation?.renameLabelOfPatSex
                        ? translate("currentGender", language)
                        : translate("sex", language)
                    }
                    name="currentGender"
                    value={data.values.currentGender}
                    list={dummyData.PATIENT_GENDER.map(
                      (patientWeb: any) =>
                        patientWeb.label !== "all" && (
                          <MenuItem
                            sx={{ whiteSpace: "unset" }}
                            key={patientWeb.id}
                            value={patientWeb.value}
                          >
                            {translate(`${patientWeb.label}`, language)}
                          </MenuItem>
                        )
                    )}
                    changeevent={(event: any) => {
                      const currentGender = event.target.value;
                      if (currentGender === "M") {
                        setPregnantCheckbox(true);
                      } else {
                        setPregnantCheckbox(false);
                      }

                      data.setFieldValue("currentGender", currentGender);
                    }}
                    blurevent={data.handleBlur}
                    error={
                      data.touched.currentGender && data.errors.currentGender
                    }
                    required
                  />
                </Grid>
                <Grid item xs={2.4}>
                  <Common.CellmaSelectField
                    label={translate("maritalStatus", language)}
                    name="maritalStatus"
                    value={data.values.maritalStatus}
                    list={establishmentListItem?.["marital status"].map(
                      (patientWeb: any) => (
                        <MenuItem
                          sx={{ whiteSpace: "unset" }}
                          key={patientWeb.eliId}
                          value={patientWeb.eliText}
                        >
                          {patientWeb.eliText}
                        </MenuItem>
                      )
                    )}
                    changeevent={data.handleChange}
                  />
                </Grid>
                <Grid item xs={2.4}>
                  <Common.CellmaSelectField
                    label={translate("sexualOrientation", language)}
                    name="sexualOrientation"
                    value={data.values.sexualOrientation}
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
                  />
                </Grid>
                <Grid item xs={2.4} sx={styles.checkboxGrid}>
                  <Common.CellmaCheckbox
                    label={translate("pregnant", language)}
                    name="pregnant"
                    inputName="pregnant"
                    value={data.values.pregnant}
                    onHandleChange={data.handleChange}
                    onBlur={data.handleBlur}
                    disabled={pregnantCheckbox}
                  />
                </Grid>
                <Grid item xs={2.4}>
                  <Common.CellmaSelectField
                    label={translate("ethnicity", language)}
                    name="ethnicity"
                    value={data.values.ethnicity}
                    list={establishmentListItem.ethnicity.map(
                      (patientWeb: any) => (
                        <MenuItem
                          sx={{ whiteSpace: "unset" }}
                          key={patientWeb.eliId}
                          value={patientWeb.eliText}
                        >
                          {patientWeb.eliText}
                        </MenuItem>
                      )
                    )}
                    changeevent={data.handleChange}
                  />
                </Grid>
                <Grid item xs={2.4}>
                  <Common.CellmaSelectField
                    label={translate("occupation", language)}
                    name="occupation"
                    value={data.values.occupation}
                    list={establishmentListItem.occupation.map(
                      (patientWeb: any) => (
                        <MenuItem
                          key={patientWeb.eliId}
                          value={patientWeb.eliText}
                        >
                          {patientWeb.eliText}
                        </MenuItem>
                      )
                    )}
                    changeevent={data.handleChange}
                  />
                </Grid>
                <Grid item xs={2.4}>
                  <Common.CellmaSelectField
                    label={translate("religion", language)}
                    name="religion"
                    value={data.values.religion}
                    list={establishmentListItem.religion.map(
                      (patientWeb: any) => (
                        <MenuItem
                          sx={{ whiteSpace: "unset" }}
                          key={patientWeb.eliId}
                          value={patientWeb.eliText}
                        >
                          {patientWeb.eliText}
                        </MenuItem>
                      )
                    )}
                  />
                </Grid>
                <Grid item xs={2.4}>
                  <Common.CellmaInputField
                    label={translate("townOfBirth", language)}
                    name="townOfBirth"
                    value={data.values.townOfBirth}
                    onHandleChange={data.handleChange}
                    maxLength="255"
                  />
                </Grid>
                <Grid item xs={2.4}>
                  <Common.CellmaInputField
                    label={translate("countyOfBirth", language)}
                    name="countyOfBirth"
                    value={data.values.countyOfBirth}
                    maxLength="255"
                    onHandleChange={data.handleChange}
                    onKeyPress={validations.allowOnlyCharForwardSlashSpace}
                  />
                </Grid>
                <Grid item xs={2.4}>
                  <Common.CellmaSelectField
                    label={translate("countryOfBirth", language)}
                    name="countryOfBirth"
                    value={data.values.countryOfBirth}
                    list={countryList.map((country: any) => (
                      <MenuItem
                        key={country.couId}
                        value={country.couCountry}
                        sx={{ whiteSpace: "unset" }}
                      >
                        {country.couCountry}
                      </MenuItem>
                    ))}
                    changeevent={data.handleChange}
                  />
                </Grid>
                <Grid item xs={2.4}>
                  <Common.CellmaSelectField
                    label={translate("nationality", language)}
                    name="nationality"
                    value={data.values.nationality}
                    list={establishmentListItem.nationality.map(
                      (patientWeb: any) => (
                        <MenuItem
                          key={patientWeb.eliId}
                          value={patientWeb.eliText}
                        >
                          {patientWeb.eliText}
                        </MenuItem>
                      )
                    )}
                    changeevent={data.handleChange}
                  />
                </Grid>
                <Grid item xs={2.4} sx={styles.checkboxGrid}>
                  <Common.CellmaCheckbox
                    label={translate("regDisabled", language)}
                    name="regDisabled"
                    value={data.values.regDisabled}
                    checked={data.values.regDisabled}
                    onHandleChange={data.handleChange}
                  />
                </Grid>
                <Grid item xs={2.4} sx={styles.checkboxGrid}>
                  <Typography variant="h3" sx={{ color: "grey.600" }}>
                    {translate("disability:", language)}
                  </Typography>

                  <Common.CellmaLink label={translate("show/Edit", language)}>
                    {translate("show/Edit", language)}
                  </Common.CellmaLink>
                </Grid>
                <Grid item xs={2.4}>
                  <Common.CellmaInputField
                    label={translate("assistanceNeeded", language)}
                    name="assistanceNeeded"
                    value={data.values.assistanceNeeded}
                    onHandleChange={data.handleChange}
                  />
                </Grid>
                <Grid item xs={2.4}>
                  <Common.CellmaInputField
                    label={translate("disabilityNote", language)}
                    name="disabilityNote"
                    value={data.values.disabilityNote}
                    onHandleChange={data.handleChange}
                  />
                </Grid>
                <Grid item xs={2.4}>
                  <Common.CellmaSelectField
                    label={translate("language", language)}
                    name="language"
                    value={data.values.language}
                    list={establishmentListItem.language.map(
                      (patientWeb: any) => (
                        <MenuItem
                          sx={{ whiteSpace: "unset" }}
                          key={patientWeb.eliId}
                          value={patientWeb.eliText}
                        >
                          {patientWeb.eliText}
                        </MenuItem>
                      )
                    )}
                    changeevent={data.handleChange}
                    maxLength="100"
                  />
                </Grid>
                <Grid item xs={2.4}>
                  <Common.CellmaSelectField
                    required={estDisplayInterpreterType}
                    label={translate("interpreterNeeded", language)}
                    name="interpreterNeeded"
                    value={data.values.interpreterNeeded}
                    list={dummyData.INTERPRITER_REQUAIRED.map(
                      (patientWeb: any) => (
                        <MenuItem key={patientWeb.id} value={patientWeb.value}>
                          {translate(`${patientWeb.label}`, language)}
                        </MenuItem>
                      )
                    )}
                    changeevent={data.handleChange}
                  />
                </Grid>
                <Grid item xs={2.4}>
                  <Common.CellmaSelectField
                    label={translate("interpreterType", language)}
                    name="interpreterType"
                    value={data.values.interpreterType}
                    list={establishmentListItem?.[
                      "Type of interpreter needed"
                    ].map((patientWeb: any) => (
                      <MenuItem
                        sx={{ whiteSpace: "unset" }}
                        key={patientWeb.eliId}
                        value={patientWeb.eliText}
                      >
                        {patientWeb.eliText}
                      </MenuItem>
                    ))}
                    changeevent={data.handleChange}
                  />
                </Grid>
                <Grid item xs={2.4}>
                  <Common.CellmaInputField
                    label={translate("nhsNo", language)}
                    name="nhsNo"
                    value={data.values.nhsNo}
                    maxLength="20"
                    onHandleChange={data.handleChange}
                    onBlur={(event: any) => {
                      data.setFieldValue(
                        "nhsNo",
                        formatNHSNumber(event.target.value)
                      );
                    }}
                    onKeyPress={validations.nhsNoValidation}
                  />
                </Grid>
                <Grid item xs={2.4}>
                  <Common.CellmaInputField
                    label={translate("hospitalRef", language)}
                    name="hospitalRef"
                    defaultValue="454545"
                    value={data.values.hospitalRef}
                    onHandleChange={data.handleChange}
                    onKeyPress={validations.hospitalRefValidation}
                    maxLength="32"
                  />
                </Grid>
                <Grid item xs={2.4}>
                  <Common.CellmaInputField
                    label={translate("identifier", language)}
                    name="identifier"
                    value={data.values.identifier}
                    onHandleChange={data.handleChange}
                  />
                </Grid>
                <Grid item xs={2.4}>
                  <Common.CellmaInputField
                    label={translate("pasID", language)}
                    name="pasId"
                    value={data.values.pasId}
                    onHandleChange={data.handleChange}
                  />
                </Grid>
                <Grid item xs={2.4}>
                  <Common.CellmaSelectField
                    label={translate("patientType", language)}
                    name="patientType"
                    value={data.values.patientType}
                    list={establishmentListItem?.["patient type"].map(
                      (patientWeb: any) => (
                        <MenuItem
                          sx={{ whiteSpace: "unset" }}
                          key={patientWeb.eliId}
                          value={patientWeb.eliText}
                        >
                          {patientWeb.eliText}
                        </MenuItem>
                      )
                    )}
                    changeevent={data.handleChange}
                  />
                </Grid>
                <Grid item xs={2.4} sx={styles.checkboxGrid}>
                  <Common.CellmaCheckbox
                    label={translate("prisoner", language)}
                    name="prisoner"
                    value={data.values.prisoner}
                    checked={data.values.prisoner}
                    onHandleChange={data.handleChange}
                  />
                </Grid>
                <Grid item xs={2.4}>
                  <Common.CellmaSelectField
                    label={translate("bloodType", language)}
                    name="bloodType"
                    value={data.values.bloodType}
                    list={dummyData.BLOOD_TYPE.map((patientWeb: any) => (
                      <MenuItem
                        sx={{ whiteSpace: "unset" }}
                        key={patientWeb.id}
                        value={patientWeb.value}
                      >
                        {patientWeb.label}
                      </MenuItem>
                    ))}
                    changeevent={data.handleChange}
                  />
                </Grid>
                <Grid item xs={2.4}>
                  <Common.CellmaDatePicker
                    label={translate("died", language)}
                    name="died"
                    maxDate={new Date()}
                    value={data.values.died}
                    onBlur={data.handleBlur}
                    onChange={(newDate: Date | null) => {
                      data.setFieldValue("died", newDate);
                    }}
                    disabled
                  />
                </Grid>
                <Grid item xs={2.4}>
                  <Common.CellmaSelectField
                    label={translate("restrictedRegistration", language)}
                    name="restrictedRegistration"
                    value={data.values.restrictedRegistration}
                    list={dummyData.RESTRICTED_REGISTRATION.map(
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
                    changeevent={data.handleChange}
                  />
                </Grid>
                <Grid item xs={2.4}>
                  <Common.CellmaCheckbox
                    label={translate("patientWebAccess", language)}
                    name="patientWebAccess"
                    value={data.values.patientWebAccess}
                    checked={data.values.lockPatientWebAccount}
                    onHandleChange={data.handleChange}
                  />
                </Grid>
                <Grid item xs={2.4}>
                  <Common.CellmaLink
                    label={translate("resetPassword", language)}
                  >
                    {translate("resetPassword", language)}
                  </Common.CellmaLink>
                </Grid>
                <Grid item xs={2.4}>
                  <Common.CellmaCheckbox
                    label={translate("lockPatientWebAccount", language)}
                    name="lockPatientWebAccount"
                    value={data.values.lockPatientWebAccount}
                    checked={data.values.lockPatientWebAccount}
                    onHandleChange={data.handleChange}
                  />
                </Grid>

                <Grid item xs={4.8}>
                  <TextField
                    fullWidth
                    label={translate("notes", language)}
                    name="notes"
                    value={data.values.notes}
                    onChange={data.handleChange}
                    multiline
                    variant="outlined"
                    maxRows="10"
                    minRows="3"
                    inputProps={{ maxLength: 1000 }}
                  />
                </Grid>
                {settings?.estShowPatientIdentifier === 1 && (
                  <>
                    <Grid item xs={12}>
                      <Typography variant="h2">
                        {translate("patientUniqueIdentifier", language)}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <CellmaTable
                        rows={identifierDetails}
                        columns={columns}
                        getRowId={(row: any) => row.identifierType}
                        listCount={identifierDetails.length}
                        noRecordsMessage=""
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sx={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <Common.CellmaButton
                        label={translate(
                          "addPatientUniqueIdentifier",
                          language
                        )}
                        onClick={() => setIsAddNewIdentifier(true)}
                      />
                    </Grid>
                  </>
                )}
                {isAddNewIdentifier && (
                  <Grid item xs={12}>
                    <AddPatientUniqueIdentifier
                      countryList={countryList}
                      patientIdentifiersList={
                        establishmentListItem?.["patient identifiers"]
                      }
                      patientId={patientId}
                      getPatientDetailsRefetch={getPatientDetailsRefetch}
                    />
                  </Grid>
                )}

                <Grid item xs={12} sx={styles.saveButton}>
                  <Common.CellmaButton
                    label={translate("save", language)}
                    type="submit"
                  />
                </Grid>
              </Grid>
            </form>
          );
        }}
      </Formik>
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
              <Mui.Grid item xs={12} sx={{ ...styles.alignEnd }} gap={1}>
                <Common.CellmaButton
                  onClick={() => {
                    setIsExistingIdentifier(false);
                    dispatch(
                      setSnackbar(
                        true,
                        "success",
                        translate("identifierDeletedMsg", language),
                        4
                      )
                    );
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
    </>
  );
};

export default PatientDetails;
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
};

// Page Name : "patientDuplicateCheck"
// Page Id : "c4pat2"

import { useEffect, useState } from "react";

import { Backdrop, Box, CircularProgress, Grid, MenuItem } from "@mui/material";
import { useFormik } from "formik";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import * as yup from "yup";

import DuplicateCheckTable from "./DuplicateCheckTable";
import useCountriesLists from "../../../../api/useCountriesList";
import useEstablishmentListItems from "../../../../api/useEstablishmentListItems";
import * as Common from "../../../../common/CommonComponentsIndex";
import { ageCount, resetPageNumber } from "../../../../utils/GeneralUtils";
import { formatNHSNumber } from "../../../../utils/Validations";
import * as validations from "../../../../utils/Validations";
import {
  useDuplicateCheck,
  useDuplicateCheckDisplay,
} from "../../api/useDuplicateCheck";
import {
  useAddPatientDetails,
  useGetPatientDetails,
} from "../../api/usePatientDetails";
import { PATIENT_GENDER } from "../../assets/dummyData/CreatePatientDummyData";
import * as dummyData from "../../assets/dummyData/CreatePatientDummyData";
import translate from "../../assets/translationFiles/patientSearchTranslation";
import {
  setActiveScreenName,
  setCreatePatientActiveStep,
} from "../../store/PatientAction";

type IPatientSearch = {
  nhsNumber: string;
  givenName: string;
  familyName: string;
  sex: string;
  born: Date | null;
  mobile: string;
  patientNameInOtherLanguage: string;
  hospitalRef: string;
};

const DuplicateCheck: React.FC = () => {
  const location = useLocation();
  const {
    nhsNumber,
    familyName,
    givenName,
    born,
    sex,
    mobile,
    patientNameInOtherLanguage,
    hospitalRef,
  } = location?.state as IPatientSearch;

  // const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);
  const { language } = useSelector((state: any) => state.language);
  const { pageNumber } = useSelector((state: any) => state.patient);
  // const [duplicateCheckResponse, setDuplicateCheckResponse] = useState([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(born) as any;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    isShowPatientIdentification,
    cliPatientMobileMandatory,
    estPatSearchIdentifierMandatory,
  } = useSelector((state: any) => state.patient);

  const { data: setting } = useGetPatientDetails("0", true);

  const { setTitle, setIsLink, setScreenName, setDrawerName } =
    useOutletContext() as any; // <-- access context value

  const { data: country, isLoading: countryIsLoading } = useCountriesLists();
  const { data: duplicateCheckDisplaySettings } = useDuplicateCheckDisplay();

  // API call for add patient
  const { mutate: addPatientDetails, data: addPatientDetailsResponse } =
    useAddPatientDetails();
  const {
    data: establishmentListItem,
    isLoading: establishmentListItemIsLoading,
  } = useEstablishmentListItems(["patient identifiers", "title"]);

  const duplicateCheckForm = useFormik({
    initialValues: {
      nhsRefOptional: nhsNumber || "",
      title: "",
      familyName: familyName || "",
      givenName: givenName || "",
      middleName: "",
      maidenNameOptional: "",
      born: born || null,
      sex: sex !== "A" ? sex : "",
      mobile: mobile || "",
      email: "",
      identifier: "",
      uniqueIdentification: "",
      uniqueIdentificationId: "",
      photoIdentification: "",
      photoIdentificationId: "",
      issuingCountry: "",
      babyBornInHospital: "",
    },
    validationSchema: yup.object().shape({
      familyName: yup
        .string()
        .required(translate("familyNameRequired", language))
        .min(2, translate("minimumCharacters", language)),
      givenName: yup
        .string()
        .required(translate("givenNameRequired", language))
        .min(2, translate("minimumCharacters", language)),
      born: yup
        .date()
        .nullable()
        .required(translate("bornRequired", language))
        .min(new Date("01/01/1900"), "Invalid date")
        .max(new Date(), translate("futureDateAlert", language))
        .typeError(translate("invalidBirthDate", language)),
      sex: yup.string().required(translate("sexRequired", language)),
      email: yup.string().email(translate("validEmailMsg", language)),
      mobile: yup.string().when([], {
        is: () => cliPatientMobileMandatory === 1,
        then: yup.string().required(translate("mobileRequired", language)),
        otherwise: yup.string().notRequired(),
      }),
      uniqueIdentification: yup.string().when([], {
        is: () => estPatSearchIdentifierMandatory === true,
        then: yup
          .string()
          .required(translate("uniqueIdentificationRequired", language)),
        otherwise: yup.string().notRequired(),
      }),
      uniqueIdentificationId: yup.string().when([], {
        is: () => estPatSearchIdentifierMandatory === true,
        then: yup
          .string()
          .required(translate("uniqueIdentificationIdRequired", language)),
        otherwise: yup.string().notRequired(),
      }),
      photoIdentification: yup
        .string()
        .required(translate("photoIdentificationRequired", language)),
      photoIdentificationId: yup
        .string()
        .required(translate("photoIdentificationIdRequired", language)),
      babyBornInHospital: yup.string().when([], {
        is: () => age <= 5,
        then: yup
          .string()
          .required(translate("babyBornInHospitalRequired", language)),
        otherwise: yup.string().notRequired(),
      }),
      middleName: yup.string().when([], {
        is: () => duplicateCheckDisplaySettings?.setMiddleNameMandatory === 1,
        then: yup.string().required(translate("middleNameRequired", language)),
        otherwise: yup.string().notRequired(),
      }),
    }),
    onSubmit: () => {
      resetPageNumber(dispatch);
      duplicateCheckRefetch();
    },
  });

  const {
    patientList,
    settings,
    listCount,
    refetch: duplicateCheckRefetch,
    isLoading: patientDuplicateCheckIsLoading,
    isFetchedAfterMount,
  } = useDuplicateCheck(
    {
      patNhsRef: duplicateCheckForm?.values.nhsRefOptional,
      patSex: duplicateCheckForm?.values.sex,
      patDob: moment(duplicateCheckForm?.values.born).format("YYYY-MM-DD"),
      patFirstname: duplicateCheckForm?.values.givenName,
      patSurname: duplicateCheckForm?.values.familyName,
      patMiddlename: duplicateCheckForm?.values.middleName,
      patMaidenname: duplicateCheckForm?.values.maidenNameOptional,
      patTitle: duplicateCheckForm?.values.title,
      patMobile: duplicateCheckForm?.values.mobile,
      patEmail: duplicateCheckForm?.values.email,
    },
    pageNumber
  );

  useEffect(() => {
    setTitle(translate("patientDetails", language));
    setIsLink(true);
    setScreenName("");
    setDrawerName("");
    dispatch(setActiveScreenName("patientSearchScreen"));
    duplicateCheckForm?.validateForm(duplicateCheckForm?.values);
  }, [language]);

  useEffect(() => {
    if (addPatientDetailsResponse?.status === 200) {
      navigate("/cellmaUser/patient/singlePageRegistration");
    }
  }, [addPatientDetailsResponse]);

  // Function for get age at born
  const age = ageCount(selectedDate);

  return (
    <>
      {(establishmentListItemIsLoading ||
        patientDuplicateCheckIsLoading ||
        countryIsLoading) && (
        <Backdrop sx={{ zIndex: "1500" }} open>
          <CircularProgress />
        </Backdrop>
      )}

      <form onSubmit={duplicateCheckForm.handleSubmit} noValidate>
        <Box>
          <Grid container spacing={3} sx={{ mb: "10px" }}>
            {setting?.settings?.estShowPatientIdentifier === 1 && (
              <Grid item xs={12} md={3}>
                <Common.CellmaInputField
                  label={translate("nhsRefOptional", language)}
                  name="nhsRefOptional"
                  value={duplicateCheckForm.values.nhsRefOptional}
                  onHandleChange={duplicateCheckForm.handleChange}
                  onBlur={(event: any) => {
                    duplicateCheckForm.setFieldValue(
                      "nhsRefOptional",
                      formatNHSNumber(event.target.value)
                    );
                  }}
                  onKeyPress={validations.nhsNoValidation}
                  maxLength="20"
                  errorText={
                    duplicateCheckForm.touched.nhsRefOptional &&
                    duplicateCheckForm.errors.nhsRefOptional
                  }
                  onPaste={
                    validations.restrictPasteEventForSpecialCharactersAndAlphabets
                  }
                />
              </Grid>
            )}
            {isShowPatientIdentification && (
              <Grid item xs={12} md={3}>
                <Common.CellmaInputField
                  label={translate("identifier", language)}
                  name="identifier"
                  maxLength="32"
                  value={duplicateCheckForm.values.identifier}
                  onHandleChange={duplicateCheckForm.handleChange}
                />
              </Grid>
            )}
            {establishmentListItem?.["patient identifiers"]?.length !== 0 && (
              <>
                <Grid item xs={12} md={3}>
                  <Common.CellmaSelectField
                    label={translate("uniqueIdentification", language)}
                    name="uniqueIdentification"
                    value={duplicateCheckForm.values.uniqueIdentification}
                    required={estPatSearchIdentifierMandatory === true}
                    changeevent={duplicateCheckForm.handleChange}
                    list={establishmentListItem?.["patient identifiers"]?.map(
                      (identification: any) =>
                        identification.eliIdentifierType !==
                          "Photographic Identification" &&
                        identification.eliIdentifierType !== null && (
                          <MenuItem
                            key={identification.eliId}
                            value={identification.eliText}
                            sx={{ whiteSpace: "unset" }}
                          >
                            {identification.eliText}
                          </MenuItem>
                        )
                    )}
                    error={
                      duplicateCheckForm.touched.uniqueIdentification &&
                      duplicateCheckForm.errors.uniqueIdentification
                    }
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <Common.CellmaInputField
                    label={translate("uniqueIdentificationId", language)}
                    name="uniqueIdentificationId"
                    required={estPatSearchIdentifierMandatory === true}
                    value={duplicateCheckForm.values.uniqueIdentificationId}
                    onHandleChange={duplicateCheckForm.handleChange}
                    onBlur={duplicateCheckForm.handleBlur}
                    maxLength="20"
                    onPaste={validations.restrictCutCopyPaste}
                    onKeyPress={validations.blockSpecialChar}
                    errorText={
                      duplicateCheckForm.touched.uniqueIdentificationId &&
                      duplicateCheckForm.errors.uniqueIdentificationId
                    }
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <Common.CellmaSelectField
                    label={translate("photoIdentification", language)}
                    name="photoIdentification"
                    required
                    value={duplicateCheckForm.values.photoIdentification}
                    changeevent={duplicateCheckForm.handleChange}
                    onBlur={duplicateCheckForm.handleBlur}
                    error={
                      duplicateCheckForm.touched.photoIdentification &&
                      duplicateCheckForm.errors.photoIdentification
                    }
                    list={establishmentListItem?.["patient identifiers"]?.map(
                      (identification: any) =>
                        identification.eliIdentifierType !==
                          "Unique Identification" &&
                        identification.eliIdentifierType !== null && (
                          <MenuItem
                            key={identification.eliId}
                            value={identification.eliText}
                            sx={{ whiteSpace: "unset" }}
                          >
                            {identification.eliText}
                          </MenuItem>
                        )
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <Common.CellmaInputField
                    label={translate("photoIdentificationId", language)}
                    name="photoIdentificationId"
                    required
                    value={duplicateCheckForm.values.photoIdentificationId}
                    onHandleChange={duplicateCheckForm.handleChange}
                    onBlur={duplicateCheckForm.handleBlur}
                    maxLength="100"
                    onPaste={validations.restrictCutCopyPaste}
                    onKeyPress={validations.blockSpecialChar}
                    errorText={
                      duplicateCheckForm.touched.photoIdentificationId &&
                      duplicateCheckForm.errors.photoIdentificationId
                    }
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <Common.CellmaSelectField
                    label={translate("issuingCountry", language)}
                    name="issuingCountry"
                    value={duplicateCheckForm.values.issuingCountry}
                    changeevent={duplicateCheckForm.handleChange}
                    list={country.map((country: any) => (
                      <MenuItem
                        key={country.couId}
                        value={country}
                        sx={{ whiteSpace: "unset" }}
                      >
                        {country.couCountry}
                      </MenuItem>
                    ))}
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12} md={3}>
              <Common.CellmaSelectField
                label={translate("title", language)}
                name="title"
                value={duplicateCheckForm.values.title}
                changeevent={(event: any) => {
                  const result = validations.genderTitleHandler(
                    event,
                    duplicateCheckForm,
                    "title"
                  );
                  if (result[0] !== "") {
                    alert(translate(result[0], language));
                  }
                  duplicateCheckForm.setFieldValue("title", event.target.value);
                  duplicateCheckForm.setFieldValue("sex", result[1]);
                }}
                onBlur={duplicateCheckForm.handleBlur}
                error={
                  duplicateCheckForm.touched.title &&
                  duplicateCheckForm.errors.title
                }
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
            <Grid item xs={12} md={3}>
              <Common.CellmaInputField
                label={translate("givenName", language)}
                name="givenName"
                required
                value={duplicateCheckForm.values.givenName}
                onHandleChange={duplicateCheckForm.handleChange}
                onBlur={duplicateCheckForm.handleBlur}
                style={{ textTransform: "capitalize" }}
                maxLength="60"
                onKeyPress={validations.allowCharHyphenApostropheSpace}
                errorText={
                  duplicateCheckForm.touched.givenName &&
                  duplicateCheckForm.errors.givenName
                }
                onPaste={
                  validations.restrictPasteEventForSpecialCharactersAndNumbersAndSpaces
                }
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Common.CellmaInputField
                label={translate("familyName", language)}
                required
                name="familyName"
                value={duplicateCheckForm.values.familyName}
                onHandleChange={duplicateCheckForm.handleChange}
                onBlur={duplicateCheckForm.handleBlur}
                style={{ textTransform: "capitalize" }}
                maxLength="60"
                onKeyPress={validations.allowCharHyphenApostropheSpace}
                errorText={
                  duplicateCheckForm.touched.familyName &&
                  duplicateCheckForm.errors.familyName
                }
                onPaste={
                  validations.restrictPasteEventForSpecialCharactersAndNumbersAndSpaces
                }
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <Common.CellmaInputField
                label={translate("middleName", language)}
                name="middleName"
                required={
                  duplicateCheckDisplaySettings?.setMiddleNameMandatory === 1
                }
                value={duplicateCheckForm.values.middleName}
                onHandleChange={duplicateCheckForm.handleChange}
                onBlur={duplicateCheckForm.handleBlur}
                style={{ textTransform: "capitalize" }}
                maxLength="60"
                onKeyPress={validations.allowCharHyphenApostropheSpace}
                errorText={
                  duplicateCheckForm.touched.middleName &&
                  duplicateCheckForm.errors.middleName
                }
                onPaste={
                  validations.restrictPasteEventForSpecialCharactersAndNumbersAndSpaces
                }
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Common.CellmaInputField
                label={translate("maidenNameOptional", language)}
                name="maidenNameOptional"
                value={duplicateCheckForm.values.maidenNameOptional}
                onHandleChange={duplicateCheckForm.handleChange}
                onBlur={duplicateCheckForm.handleBlur}
                maxLength="60"
                onKeyPress={validations.allowCharHyphenApostropheSpace}
                errorText={
                  duplicateCheckForm.touched.maidenNameOptional &&
                  duplicateCheckForm.errors.maidenNameOptional
                }
                onPaste={
                  validations.restrictPasteEventForSpecialCharactersAndNumbersAndSpaces
                }
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Common.CellmaDatePicker
                label={translate("born", language)}
                name="born"
                required
                maxDate={new Date()}
                value={duplicateCheckForm.values.born}
                onChange={(newDate: Date | null) => {
                  if (
                    duplicateCheckDisplaySettings?.showUnderEighteenAlert === 1
                  ) {
                    if (
                      moment().diff(moment(newDate, "DD/MM/YYYY"), "years") <=
                      18
                    ) {
                      alert(translate("belowAge18", language));
                    }
                  }
                  duplicateCheckForm.setFieldValue("born", newDate);
                  setSelectedDate(newDate);
                }}
                onBlur={duplicateCheckForm.handleBlur}
                error={
                  duplicateCheckForm.touched.born &&
                  duplicateCheckForm.errors.born
                }
              />
            </Grid>
            {age <= 5 && (
              <Grid item xs={12} md={3}>
                <Common.CellmaSelectField
                  label={translate("babyBornInHospital", language)}
                  name="babyBornInHospital"
                  required
                  value={duplicateCheckForm.values.babyBornInHospital}
                  changeevent={duplicateCheckForm.handleChange}
                  onBlur={duplicateCheckForm.handleBlur}
                  error={
                    duplicateCheckForm.touched.babyBornInHospital &&
                    duplicateCheckForm.errors.babyBornInHospital
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
            <Grid item xs={12} md={3}>
              <Common.CellmaSelectField
                label={translate("sex", language)}
                name="sex"
                required
                value={duplicateCheckForm.values.sex}
                changeevent={(event: any) => {
                  const result = validations.genderTitleHandler(
                    event,
                    duplicateCheckForm,
                    "sex"
                  );
                  if (result[0] !== "") {
                    alert(translate(result[0], language));
                  }
                  duplicateCheckForm.setFieldValue("title", result[1]);
                  duplicateCheckForm.setFieldValue("sex", event.target.value);
                }}
                blurevent={duplicateCheckForm.handleBlur}
                error={
                  duplicateCheckForm.touched.sex &&
                  duplicateCheckForm.errors.sex
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
            </Grid>
            <Grid item xs={12} md={3}>
              <Common.CellmaInputField
                label={translate("mobile", language)}
                required={cliPatientMobileMandatory === 1}
                type="tel"
                name="mobile"
                value={duplicateCheckForm.values.mobile}
                onHandleChange={duplicateCheckForm.handleChange}
                onBlur={validations.checkMobileValidation}
                onKeyPress={validations.restrictAlphabetsAndSpecialCharacters}
                onPaste={validations.restrictPastingCharactersAndSpecialSymbols}
                onInput={(e: any) => {
                  e.target.value = e.target.value.toString().slice(0, 10);
                }}
                errorText={
                  duplicateCheckForm.touched.mobile &&
                  duplicateCheckForm.errors.mobile
                }
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Common.CellmaInputField
                label={translate("email", language)}
                name="email"
                value={duplicateCheckForm.values.email}
                onHandleChange={duplicateCheckForm.handleChange}
                onBlur={duplicateCheckForm.handleBlur}
                errorText={
                  duplicateCheckForm.touched.email &&
                  duplicateCheckForm.errors.email
                }
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Box sx={styles.duplicateCheckButton}>
                <Common.CellmaButton
                  label={translate("duplicateCheckButton", language)}
                  size="medium"
                  type="submit"
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
        {isFetchedAfterMount ? (
          <DuplicateCheckTable
            duplicateCheckResponse={patientList}
            listCount={listCount}
          />
        ) : null}
      </form>

      {isFetchedAfterMount && (
        <Grid
          item
          xs={12}
          sx={{ ...styles.alignCenter, justifyContent: "flex-end" }}
        >
          <Common.CellmaButton
            onClick={() => {
              if (settings?.cliAllowSinglePageRegistration === 1) {
                addPatientDetails({
                  patNhsRef: duplicateCheckForm?.values.nhsRefOptional,
                  patSex: duplicateCheckForm?.values.sex,
                  patDob: moment(duplicateCheckForm?.values.born).format(
                    "YYYY-MM-DD"
                  ),
                  patFirstname: duplicateCheckForm?.values.givenName,
                  patSurname: duplicateCheckForm?.values.familyName,
                  patMiddlename: duplicateCheckForm?.values.middleName,
                  patMaidenname: duplicateCheckForm?.values.maidenNameOptional,
                  patTitle: duplicateCheckForm?.values.title,
                  patMobile: duplicateCheckForm?.values.mobile,
                  patEmail: duplicateCheckForm?.values.email,
                  patGenderAtBirth: duplicateCheckForm?.values.sex,
                });
              } else {
                dispatch(setCreatePatientActiveStep(0));
                navigate("/cellmaUser/patient/addPatient", {
                  state: {
                    data: duplicateCheckForm.values,
                    patientName: patientNameInOtherLanguage,
                    hospitalReference: hospitalRef,
                  },
                });
              }
            }}
            label={translate("createPatientButton", language)}
            size="medium"
          />
        </Grid>
      )}
    </>
  );
};

const styles = {
  duplicateCheckButton: {
    display: "flex",
    justifyContent: "flex-start",
    marginTop: "-10px",
  },

  alignCenter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default DuplicateCheck;

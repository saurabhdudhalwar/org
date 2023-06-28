// Page Name : "SinglePageRegistration"
// Page Id : "c4pat12"

import { useEffect, useRef, useState } from "react";

import * as Mui from "@mui/material";
import { Formik, FormikProps } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";
import * as yup from "yup";

import useCountriesLists from "../../../../api/useCountriesList";
import useEstablishmentListItems from "../../../../api/useEstablishmentListItems";
import CellmaPostCodeSearch from "../../../../common/CellmaPostCodeSearch";
import * as Common from "../../../../common/CommonComponentsIndex";
import * as validations from "../../../../utils/Validations";
import {
  useAddSinglePatientDetails,
  useGetSinglePatientDetails,
} from "../../api/useSinglePatientDetails";
import * as dummyData from "../../assets/dummyData/CreatePatientDummyData";
import translate from "../../assets/translationFiles/createPatientTranslation";
import UploadProfilePicture from "../../common/UploadProfilePicture";
import { setActiveScreenName } from "../../store/PatientAction";

const SinglePageRegistration = () => {
  const { language } = useSelector((state: any) => state.language);
  const { patientId } = useSelector((state: any) => state.patient);
  const { estID } = useSelector((state: any) => state.auth);
  const [imageState, setImageState] = useState("");
  const [fileName1, setFileName1] = useState("");
  const [referralLetter, setRefrralLetter] = useState<any>();
  const [isChangeProfile, setIsChangeProfile] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const [appointment, setAppointment] = useState<any>([
    {
      id: 1,
      label: "Please Select",
      value: "Please Select",
    },
  ]);
  const [file, setFile] = useState<string | Blob>("");

  const [formArea, setFormArea] = useState("");
  const { setTitle, setIsLink, setScreenName, setDrawerName } =
    useOutletContext() as any; // <-- access context value

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const referralLetterInput = useRef<HTMLInputElement | null>(null);

  // Api call for establishment list items
  const { data: country, isLoading: countryIsLoading } = useCountriesLists();
  const { data: establishmentListItem } = useEstablishmentListItems([
    "ethnicity",
    "occupation",
    "relationship",
    "patient identifiers",
    "nationality",
    "patient religion",
    "language",
    "marital status",
    "referral reason",
    "type of service",
    "clinic location",
    "patient type",
    "method of arrival",
  ]);

  // API call for get patient details

  const {
    refetch: getGetSinglePatientDetails,
    data: getSinglePatientDetailsResponse,
  } = useGetSinglePatientDetails(patientId);

  const establishmentProfessionalList =
    getSinglePatientDetailsResponse?.establishmentProfessionalList ?? [];
  const externalClinicList =
    getSinglePatientDetailsResponse?.externalClinicList ?? [];
  const clinic = getSinglePatientDetailsResponse?.clinic ?? [];
  const settings = getSinglePatientDetailsResponse?.settings ?? {};

  // API call for add single patient details

  const { mutate: addSinglePatientDetails } = useAddSinglePatientDetails();

  useEffect(() => {
    getGetSinglePatientDetails();
    appointmentDropdown();
    setTitle(translate("patientWizard", language));
    setIsLink(true);
    setScreenName("");
    setDrawerName("");
    dispatch(setActiveScreenName("singlePageRegistration"));
  }, [language, getGetSinglePatientDetails, appointment]);

  // this function used to handel the state of selected image
  const loadPhoto = (imageState: any) => {
    setImageState(imageState);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const appointmentDropdown = () => {
    setAppointment([
      {
        id: 1,
        value: "Please Select",
      },
    ]);
    if (settings?.cliDisplayVaccinationAppointmentType === 1) {
      setAppointment(dummyData.VACCINATION_APPOINTMENT_TYPE_ONE);
    }
    if (settings?.cliDisplayVaccinationAppointmentType === 0) {
      setAppointment(dummyData.VACCINATION_APPOINTMENT_TYPE_TWO);
      if (settings?.estHideAppTypesEmergencyWalkIn === 0) {
        setAppointment(dummyData.EMERGENCY_APPOINTMENT_TYPE);
      }
      if (settings?.showTelephoneAppointmentTypes === 1) {
        setAppointment(dummyData.TELEPHONE_APPOINTMENT_TYPE);
      }
    }
  };

  // Handler for add file
  const referralLetterHandler = (event: any) => {
    if (event.target.files && event.target.files.length > 0) {
      fileToBase64(event.target.files[0]).then((res: any) => {
        setRefrralLetter(res);
      });
      if (event.target.files[0].name.length > 25) {
        setFileName1(`${event.target.files[0].name.toString()}`);
      } else {
        setFileName1(event.target.files[0].name);
      }
    }
  };

  // Convert file to base64
  function fileToBase64(file: File) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });
  }

  return (
    <Formik
      initialValues={{
        registrationDate: "",
        registrationTime: "",
        maritalStatus: "",
        religion: "",
        sourceOfReferral: "",
        gp: "",
        dateOfReferral: new Date() || null,
        service: "",
        serviceLocation: "",
        serviceType: formArea === "wards" ? "1" : "0" || "",
        consultant: "",
        patientType: "",
        appointmentType: "",
        methodOfArrival: "",
        referralReason: "",
        countryOfBirth: "",
        language: "",
        ethnicity: "",
        occupation: "",
        nationality: "",
        numberRoad: "",
        district: "",
        county: "",
        town: "",
        postcode: "",
        country: "",
      }}
      validationSchema={yup.object().shape({
        sourceOfReferral: yup
          .string()
          .required(translate("sourceOfReferralRequired", language)),
        service: yup.string().required(translate("serviceRequired", language)),
        serviceLocation: yup
          .string()
          .required(translate("serviceLocationRequired", language)),
        consultant: yup
          .string()
          .required(translate("consultantRequired", language)),
        patientType: yup
          .string()
          .required(translate("patientTypeRequired", language)),
        appointmentType: yup
          .string()
          .required(translate("appointmentTypeRequired", language)),
        numberRoad: yup
          .string()
          .required(translate("number&RoadRequired", language)),
        country: yup.string().required(translate("countryRequired", language)),
        dateOfReferral: yup
          .date()
          .nullable()
          .min(new Date("01/01/1900"), translate("invalidBornDate", language))
          .max(new Date("12/31/2050"), translate("invalidBornDate", language))
          .typeError(translate("invalidBornDate", language)),
      })}
      onSubmit={(values: any) => {
        const obj = {
          addressJson: {
            addAddress1: values?.numberRoad,
            addAddress2: values?.district,
            addAddress3: values?.town,
            addAddress4: values?.county,
            addAddress5: values?.postcode,
            addAddress6: values?.country,
          },
          patientJson: {
            patId: patientId,
            patEstId: estID,
            patMaritalStatus: values?.maritalStatus,
            patOccupation: values?.occupation,
            patReligion: values?.religion,
            patLanguage: values?.language,
            patCountryOfBirth: values?.countryOfBirth,
            patNationality: values?.nationality,
            patTownOfBirth: values?.town,
            patType: values?.patientType,
            patEthnicityText: values?.ethnicity,
          },
          fileUploadJson: {
            filesBase64: referralLetter,
          },
          referralReasons: [values?.referralReason],
          referralJson: {
            refCliId: values?.service,
            refPatientOut: values?.serviceType,
            refMethodOfArrival: values?.methodOfArrival,
            refClinicLocationEliId: values?.serviceLocation,
            refClinicianEspId: values?.consultant,
          },
        };
        if (patientId !== null && patientId !== undefined)
          addSinglePatientDetails(obj);
      }}
    >
      {(data: FormikProps<any>) => {
        return (
          <form onSubmit={data.handleSubmit} noValidate>
            <Mui.Grid container rowSpacing={3}>
              <Mui.Grid item container spacing={3}>
                <Mui.Grid item xs={3}>
                  <Common.CellmaDatePicker
                    label={translate("registrationDate", language)}
                    name="registrationDate"
                    disabled
                  />
                </Mui.Grid>
                <Mui.Grid item xs={3}>
                  <Common.CellmaTimePicker
                    label={translate("registrationTime", language)}
                    name="registrationTime"
                    disabled
                  />
                </Mui.Grid>
              </Mui.Grid>
              <Mui.Grid item container spacing={1}>
                <Mui.Grid item xs={12}>
                  <Mui.Typography variant="h2">
                    {translate("patientDetails", language)}
                  </Mui.Typography>
                </Mui.Grid>
                <Mui.Grid item xs={12}>
                  <Mui.Divider variant="fullWidth" />
                </Mui.Grid>
              </Mui.Grid>
              <Mui.Grid item container spacing={3}>
                <Mui.Grid item xs={3}>
                  <Common.CellmaSelectField
                    label={translate("maritalStatus", language)}
                    name="maritalStatus"
                    value={data.values.maritalStatus}
                    changeevent={data.handleChange}
                    onBlur={data.handleBlur}
                    error={
                      data.touched.maritalStatus && data.errors.maritalStatus
                    }
                    list={establishmentListItem?.["marital status"]?.map(
                      (maritalStatus: any) => (
                        <Mui.MenuItem
                          sx={{ whiteSpace: "unset" }}
                          key={maritalStatus?.eliId}
                          value={maritalStatus?.eliText}
                        >
                          {maritalStatus?.eliText}
                        </Mui.MenuItem>
                      )
                    )}
                  />
                </Mui.Grid>
                <Mui.Grid item xs={3}>
                  <Common.CellmaSelectField
                    label={translate("religion", language)}
                    name="religion"
                    value={data.values.religion}
                    changeevent={data.handleChange}
                    onBlur={data.handleBlur}
                    error={data.touched.religion && data.errors.religion}
                    list={establishmentListItem?.["patient religion"]?.map(
                      (religion: any) => (
                        <Mui.MenuItem
                          sx={{ whiteSpace: "unset" }}
                          key={religion?.eliId}
                          value={religion?.eliText}
                        >
                          {religion?.eliText}
                        </Mui.MenuItem>
                      )
                    )}
                  />
                </Mui.Grid>
                {settings.cliAllowSinglePageRegistration !== 0 && (
                  <Mui.Grid item xs={3}>
                    <Common.CellmaSelectField
                      label={translate("sourceOfReferral", language)}
                      name="sourceOfReferral"
                      value={data.values.sourceOfReferral}
                      required
                      changeevent={data.handleChange}
                      onBlur={data.handleBlur}
                      error={
                        data.touched.sourceOfReferral &&
                        data.errors.sourceOfReferral
                      }
                      list={externalClinicList.map((sourceOfReferral: any) => (
                        <Mui.MenuItem
                          sx={{ whiteSpace: "unset" }}
                          key={sourceOfReferral?.espId}
                          value={sourceOfReferral?.espExtClinicname}
                        >
                          {sourceOfReferral?.espExtClinicname}
                        </Mui.MenuItem>
                      ))}
                    />
                  </Mui.Grid>
                )}
                <Mui.Grid item xs={3}>
                  <Common.CellmaInputField
                    label={translate("gp", language)}
                    name="gp"
                    value={data.values.gp}
                    disabled
                  />
                </Mui.Grid>
                <Mui.Grid item xs={3}>
                  <Common.CellmaDatePicker
                    label="Date of Referral"
                    name="dateOfReferral"
                    value={data.values.dateOfReferral}
                    onChange={(newDate: any) =>
                      data.setFieldValue("dateOfReferral", newDate)
                    }
                    onBlur={data.handleBlur}
                    error={
                      data.touched.dateOfReferral && data.errors.dateOfReferral
                    }
                    maxDate={new Date("12/31/2050")}
                  />
                </Mui.Grid>
                <Mui.Grid item xs={3}>
                  <Common.CellmaSelectField
                    label={translate("service", language)}
                    required
                    name="service"
                    value={data.values.service}
                    changeevent={data.handleChange}
                    onBlur={data.handleBlur}
                    error={data.touched.service && data.errors.service}
                    list={
                      <Mui.MenuItem key={clinic?.cliId} value={clinic?.cliId}>
                        {clinic?.cliName}
                      </Mui.MenuItem>
                    }
                  />
                </Mui.Grid>
                <Mui.Grid item xs={3}>
                  <Common.CellmaSelectField
                    label={translate("serviceLocation", language)}
                    required
                    name="serviceLocation"
                    value={data.values.serviceLocation}
                    changeevent={data.handleChange}
                    list={establishmentListItem?.["clinic location"].map(
                      (location: any) => (
                        <Mui.MenuItem
                          key={location?.eliId}
                          value={location?.eliId}
                        >
                          {location?.eliText}
                        </Mui.MenuItem>
                      )
                    )}
                    onBlur={data.handleBlur}
                    error={
                      data.touched.serviceLocation &&
                      data.errors.serviceLocation
                    }
                  />
                </Mui.Grid>
                <Mui.Grid item xs={3}>
                  <Common.CellmaSelectField
                    label={translate("serviceType", language)}
                    name="serviceType"
                    value={data.values.serviceType}
                    changeevent={data.handleChange}
                    list={dummyData.SERVICE_TYPE.map((serviceType: any) => (
                      <Mui.MenuItem
                        key={serviceType.id}
                        value={serviceType.value}
                        sx={{ whiteSpace: "unset" }}
                      >
                        {serviceType.label}
                      </Mui.MenuItem>
                    ))}
                    onBlur={data.handleBlur}
                    error={data.touched.serviceType && data.errors.serviceType}
                  />
                </Mui.Grid>
                <Mui.Grid item xs={3}>
                  <Common.CellmaSelectField
                    label={translate("consultant", language)}
                    required
                    name="consultant"
                    value={data.values.consultant}
                    changeevent={data.handleChange}
                    list={establishmentProfessionalList.map(
                      (consultant: any) => (
                        <Mui.MenuItem
                          key={consultant?.espId}
                          value={consultant?.espId}
                          sx={{ whiteSpace: "unset" }}
                        >
                          {" "}
                          {consultant?.espFullName !== null &&
                          consultant?.espFullName !== undefined
                            ? consultant.espFullName
                            : `${consultant.espTitle} ${consultant.espFirstname} ${consultant.espSurname}`}
                        </Mui.MenuItem>
                      )
                    )}
                    onBlur={data.handleBlur}
                    error={data.touched.consultant && data.errors.consultant}
                  />
                </Mui.Grid>
                <Mui.Grid item xs={3}>
                  <Common.CellmaSelectField
                    label={translate("patientType", language)}
                    required
                    name="patientType"
                    value={data.values.patientType}
                    changeevent={data.handleChange}
                    list={establishmentListItem?.["patient type"].map(
                      (patientType: any) => (
                        <Mui.MenuItem
                          key={patientType.eliId}
                          value={patientType.eliText}
                          sx={{ whiteSpace: "unset" }}
                        >
                          {patientType.eliText}
                        </Mui.MenuItem>
                      )
                    )}
                    onBlur={data.handleBlur}
                    error={data.touched.patientType && data.errors.patientType}
                  />
                </Mui.Grid>
                <Mui.Grid item xs={3}>
                  <Common.CellmaSelectField
                    label={translate("appointmentType", language)}
                    required
                    name="appointmentType"
                    value={data.values.appointmentType}
                    changeevent={data.handleChange}
                    list={appointment.map((type: any) => (
                      <Mui.MenuItem
                        key={type.id}
                        value={type.value}
                        sx={{ whiteSpace: "unset" }}
                      >
                        {type.label}
                      </Mui.MenuItem>
                    ))}
                    onBlur={data.handleBlur}
                    error={
                      data.touched.appointmentType &&
                      data.errors.appointmentType
                    }
                  />
                </Mui.Grid>
                <Mui.Grid item xs={3}>
                  <Common.CellmaSelectField
                    label={translate("methodOfArrival", language)}
                    name="methodOfArrival"
                    value={data.values.methodOfArrival}
                    changeevent={data.handleChange}
                    list={establishmentListItem?.["method of arrival"].map(
                      (methodOfArrival: any) => (
                        <Mui.MenuItem
                          key={methodOfArrival.eliId}
                          value={methodOfArrival.eliText}
                          sx={{ whiteSpace: "unset" }}
                        >
                          {methodOfArrival.eliText}
                        </Mui.MenuItem>
                      )
                    )}
                    onBlur={data.handleBlur}
                    error={
                      data.touched.methodOfArrival &&
                      data.errors.methodOfArrival
                    }
                  />
                </Mui.Grid>
                <Mui.Grid item xs={3}>
                  <Common.CellmaSelectField
                    label={translate("referralReason", language)}
                    name="referralReason"
                    value={data.values.referralReason}
                    changeevent={data.handleChange}
                    list={establishmentListItem?.["referral reason"].map(
                      (referralReason: any) => (
                        <Mui.MenuItem
                          key={referralReason?.eliId}
                          value={referralReason?.eliId}
                          sx={{ whiteSpace: "unset" }}
                        >
                          {referralReason?.eliText}
                        </Mui.MenuItem>
                      )
                    )}
                    onBlur={data.handleBlur}
                    error={
                      data.touched.referralReason && data.errors.referralReason
                    }
                  />
                </Mui.Grid>
                <Mui.Grid
                  container
                  item
                  columnGap={2}
                  xs={3}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Mui.Grid item>
                    <Mui.Typography variant="h4">
                      {translate("referralLetter", language)}
                    </Mui.Typography>
                  </Mui.Grid>
                  <Mui.Grid item>
                    <Common.CellmaButton
                      label={translate("chooseFile", language)}
                      onClick={() => referralLetterInput.current?.click()}
                    />
                  </Mui.Grid>
                  <Mui.Grid
                    item
                    sx={{
                      display: "flex",
                      overflow: "hidden",
                      maxWidth: "80px",
                    }}
                  >
                    <input
                      type="file"
                      accept=".jpeg,.pdf,.docx,.doc,.txt,.pdf,.html,.jpg,.odt,.htm,.png,.gif,.jpeg"
                      ref={referralLetterInput}
                      onChange={(event: any) => {
                        referralLetterHandler(event);
                      }}
                      style={{ display: "none" }}
                    />
                    {fileName1 !== "" ? (
                      <Mui.Tooltip title={fileName1}>
                        <Mui.Typography sx={styles.typographyGrid}>
                          {fileName1.substring(0, 15)}.
                        </Mui.Typography>
                      </Mui.Tooltip>
                    ) : (
                      <Mui.Typography sx={styles.typographyGrid}>
                        {translate("noFileChosen", language)}
                      </Mui.Typography>
                    )}
                  </Mui.Grid>
                </Mui.Grid>
                <Mui.Grid item xs={3}>
                  <Mui.Grid
                    container
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Mui.Grid item xs={4}>
                      <Mui.Typography variant="h4">
                        {translate("patientPhoto", language)}
                      </Mui.Typography>
                    </Mui.Grid>
                    <Mui.Grid
                      item
                      xs={8}
                      sx={{ display: "flex", justifyContent: "flex-start" }}
                    >
                      <Common.CellmaButton
                        label={translate("uploadPhoto", language)}
                        onClick={() => {
                          setIsChangeProfile(true);
                        }}
                      />
                    </Mui.Grid>
                  </Mui.Grid>
                </Mui.Grid>
                <Mui.Grid item xs={3}>
                  <Common.CellmaSelectField
                    label={translate("countryOfBirth", language)}
                    name="countryOfBirth"
                    value={data.values.countryOfBirth}
                    changeevent={data.handleChange}
                    list={country.map((country: any) => (
                      <Mui.MenuItem
                        key={country.couId}
                        value={country.couCountry}
                        sx={{ whiteSpace: "unset" }}
                      >
                        {country.couCountry}
                      </Mui.MenuItem>
                    ))}
                    onBlur={data.handleBlur}
                    error={
                      data.touched.countryOfBirth && data.errors.countryOfBirth
                    }
                  />
                </Mui.Grid>
                <Mui.Grid item xs={3}>
                  <Common.CellmaSelectField
                    label={translate("language", language)}
                    name="language"
                    value={data.values.language}
                    changeevent={data.handleChange}
                    list={establishmentListItem.language.map(
                      (language: any) => (
                        <Mui.MenuItem
                          key={language.eliId}
                          value={language.eliText}
                          sx={{ whiteSpace: "unset" }}
                        >
                          {language.eliText}
                        </Mui.MenuItem>
                      )
                    )}
                    onBlur={data.handleBlur}
                    error={data.touched.language && data.errors.language}
                  />
                </Mui.Grid>
                <Mui.Grid item xs={3}>
                  <Common.CellmaSelectField
                    label={translate("ethnicity", language)}
                    name="ethnicity"
                    value={data.values.ethnicity}
                    changeevent={data.handleChange}
                    list={establishmentListItem.ethnicity.map(
                      (ethnicity: any) => (
                        <Mui.MenuItem
                          key={ethnicity.eliId}
                          value={ethnicity.eliText}
                          sx={{ whiteSpace: "unset" }}
                        >
                          {ethnicity.eliText}
                        </Mui.MenuItem>
                      )
                    )}
                    onBlur={data.handleBlur}
                    error={data.touched.ethnicity && data.errors.ethnicity}
                  />
                </Mui.Grid>
                <Mui.Grid item xs={3}>
                  <Common.CellmaSelectField
                    label={translate("occupation", language)}
                    name="occupation"
                    value={data.values.occupation}
                    changeevent={data.handleChange}
                    list={establishmentListItem.occupation.map(
                      (occupation: any) => (
                        <Mui.MenuItem
                          key={occupation.eliId}
                          value={occupation.eliText}
                          sx={{ whiteSpace: "unset" }}
                        >
                          {occupation.eliText}
                        </Mui.MenuItem>
                      )
                    )}
                    onBlur={data.handleBlur}
                    error={data.touched.occupation && data.errors.occupation}
                  />
                </Mui.Grid>
                <Mui.Grid item xs={3}>
                  <Common.CellmaSelectField
                    label={translate("nationality", language)}
                    name="nationality"
                    value={data.values.nationality}
                    changeevent={data.handleChange}
                    list={establishmentListItem.nationality.map(
                      (nationality: any) => (
                        <Mui.MenuItem
                          key={nationality.eliId}
                          value={nationality.eliText}
                          sx={{ whiteSpace: "unset" }}
                        >
                          {nationality.eliText}
                        </Mui.MenuItem>
                      )
                    )}
                    onBlur={data.handleBlur}
                    error={data.touched.nationality && data.errors.nationality}
                  />
                </Mui.Grid>
              </Mui.Grid>
              <Mui.Grid item container spacing={1}>
                <Mui.Grid item xs={12}>
                  <Mui.Typography variant="h2">
                    {translate("addressDetails", language)}
                  </Mui.Typography>
                </Mui.Grid>
                <Mui.Grid item xs={12}>
                  <Mui.Divider variant="fullWidth" />
                </Mui.Grid>
              </Mui.Grid>
              <Mui.Grid item container spacing={3}>
                <Mui.Grid item xs={3}>
                  <CellmaPostCodeSearch
                    data={data}
                    textTransform="uppercase"
                    type="postcodeSearch"
                    onKeyPress={validations.allowDigitCharacterSpace}
                    onPaste={validations.restrictPasteEventForSpecialCharacters}
                  />
                </Mui.Grid>
              </Mui.Grid>
              <Mui.Grid item container spacing={3}>
                <Mui.Grid item xs={3}>
                  <Common.CellmaInputField
                    label={translate("number&Road", language)}
                    required
                    name="numberRoad"
                    value={data.values.numberRoad}
                    onHandleChange={data.handleChange}
                    onBlur={data.handleBlur}
                    errorText={
                      data.touched.numberRoad && data.errors.numberRoad
                    }
                    maxLength="255"
                  />
                </Mui.Grid>
                <Mui.Grid item xs={3}>
                  <Common.CellmaInputField
                    label={translate("town", language)}
                    name="town"
                    value={data.values.town}
                    onHandleChange={data.handleChange}
                    onBlur={data.handleBlur}
                    errorText={data.touched.town && data.errors.town}
                    maxLength="255"
                  />
                </Mui.Grid>
                <Mui.Grid item xs={3}>
                  <Common.CellmaInputField
                    label={translate("district", language)}
                    name="district"
                    value={data.values.district}
                    onHandleChange={data.handleChange}
                    onBlur={data.handleBlur}
                    errorText={data.touched.district && data.errors.district}
                    maxLength="255"
                  />
                </Mui.Grid>
                <Mui.Grid item xs={3}>
                  <Common.CellmaInputField
                    label={translate("county", language)}
                    name="county"
                    value={data.values.county}
                    onHandleChange={data.handleChange}
                    onBlur={data.handleBlur}
                    errorText={data.touched.county && data.errors.county}
                    maxLength="255"
                  />
                </Mui.Grid>
                <Mui.Grid item xs={3}>
                  <Common.CellmaInputField
                    label={translate("postcode", language)}
                    name="postcode"
                    value={data.values.postcode}
                    onHandleChange={data.handleChange}
                    onBlur={data.handleBlur}
                    errorText={data.touched.postcode && data.errors.postcode}
                    maxLength="255"
                  />
                </Mui.Grid>
                <Mui.Grid item xs={3}>
                  <Common.CellmaInputField
                    label={translate("country", language)}
                    required
                    name="country"
                    value={data.values.country}
                    onHandleChange={data.handleChange}
                    onBlur={data.handleBlur}
                    errorText={data.touched.country && data.errors.country}
                    maxLength="255"
                  />
                </Mui.Grid>
              </Mui.Grid>
              <Mui.Grid item container spacing={3}>
                <Mui.Grid
                  item
                  xs={12}
                  sx={{ display: "flex", justifyContent: "flex-end" }}
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
                </Mui.Grid>
              </Mui.Grid>
              {isChangeProfile && (
                <Mui.Grid>
                  <Common.CellmaPopup
                    title={translate("profilePhoto", language)}
                    handleCancel={() => {
                      setIsChangeProfile(false);
                    }}
                  >
                    <UploadProfilePicture
                      patientId={patientId}
                      AddNewPhoto={loadPhoto}
                      handleCancel={() => {
                        setIsChangeProfile(false);
                      }}
                    />
                  </Common.CellmaPopup>
                </Mui.Grid>
              )}
            </Mui.Grid>
          </form>
        );
      }}
    </Formik>
  );
};

export const styles = {
  typographyGrid: {
    fontSize: "14px",
    color: "primary.main",
  },
};

export default SinglePageRegistration;

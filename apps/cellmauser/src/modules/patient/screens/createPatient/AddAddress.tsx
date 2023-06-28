// Page Name : "addAddress"
// Page Id : "c4pat5"

import { useEffect, useState } from "react";

import * as Mui from "@mui/material";
import {
  Backdrop,
  Divider,
  FormControl,
  FormLabel,
  MenuItem,
  Radio,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { FormikProps, useFormik } from "formik";
import moment from "moment";
import { useGeolocated } from "react-geolocated";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

import useCountriesLists from "../../../../api/useCountriesList";
import useEstablishmentListItems from "../../../../api/useEstablishmentListItems";
import CellmaPostCodeSearch from "../../../../common/CellmaPostCodeSearch";
import * as Common from "../../../../common/CommonComponentsIndex";
import {
  isError,
  setAddressByGoogleMap,
  setAddressForUnknownSelect,
} from "../../../../utils/GeneralUtils";
import dispatchSnackbar from "../../../../utils/ResponseCodeHandler";
import * as validations from "../../../../utils/Validations";
import {
  useAddPatientAddress,
  useGetPatientExistingAddress,
  useUpdatePatientAddress,
} from "../../api/usePatientAddress";
import * as dummyData from "../../assets/dummyData/CreatePatientDummyData";
import translate from "../../assets/translationFiles/createPatientTranslation";
import { setIsPatientSelected } from "../../store/PatientAction";
import { IPatientAddress } from "../../types";

const GridItem = (props: any) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={2.4}>
      {props.children}
    </Grid>
  );
};

const GridItemPostcode = (props: any) => {
  return (
    <Grid item xs={12} sm={9} md={7}>
      {props.children}
    </Grid>
  );
};

interface Props {
  handleStep?(arg0: number): unknown;
  mode?: string;
}

const AddAddress: React.FC<Props> = (props) => {
  const {
    patientId,
    estAddressWizardUnknownAddDropdown,
    cliShowGeomapLinkOnAddressPage,
  } = useSelector((state: any) => state.patient);
  const { language } = useSelector((state: any) => state.language);
  const { estID } = useSelector((state: any) => state.auth);
  const [postCodePopupPermanentAddress, setPostCodePopupPermanentAddress] =
    useState(false);
  const [postCodePopupTemporaryAddress, setPostCodePopupTemporaryAddress] =
    useState(false);
  const [popupContent, setPopupContent] = useState("enterPostcode");
  const [notesPopup, setNotesPopup] = useState("");

  const [postcodeType, setPostcodeType] = useState("");
  const [disabled, setDisabled] = useState(true);
  const { data: country } = useCountriesLists();
  const { data: establishmentListItem, isLoading: countryIsLoading } =
    useEstablishmentListItems(["health region", "location zone"]);
  // react-google-maps hook to get coordinates( lat , long)
  const { coords } = useGeolocated();

  const [permanentAddressLatitude, setPermanentAddressLatitude] = useState(
    coords?.latitude
  );
  const [permanentAddressLongitude, setPermanentAddressLongitude] = useState(
    coords?.longitude
  );
  const [temporaryAddressLatitude, setTemporaryAddressLatitude] = useState(
    coords?.latitude
  );
  const [temporaryAddressLongitude, setTemporaryAddressLongitude] = useState(
    coords?.longitude
  );

  const { data: getPatientAddress, isLoading: patientAddressIsLoading } =
    useGetPatientExistingAddress(patientId);

  const getPermanentAddress = getPatientAddress?.permanentAddress ?? "";
  const getTemporaryAddress = getPatientAddress?.temporaryAddress ?? "";

  const { mutate: updatePatientAddress } = useUpdatePatientAddress();
  const { mutate: addPatientAddress } = useAddPatientAddress();

  const dispatch = useDispatch();

  const { estPatientPostcodeMandatory } = useSelector(
    (state: any) => state.auth
  );

  useEffect(() => {
    addressForm?.validateForm(addressForm?.values);
  }, [language]);

  const addressForm = useFormik({
    initialValues: {
      numberRoad: getPermanentAddress?.addAddress1
        ? getPermanentAddress?.addAddress1
        : "",
      town: getPermanentAddress?.addAddress3
        ? getPermanentAddress?.addAddress3
        : "",
      district: getPermanentAddress?.addAddress2
        ? getPermanentAddress?.addAddress2
        : "",
      county: getPermanentAddress?.addAddress4
        ? getPermanentAddress?.addAddress4
        : "",
      postcode: getPermanentAddress?.addAddress5
        ? getPermanentAddress?.addAddress5
        : "",
      country: getPermanentAddress?.addAddress6
        ? getPermanentAddress?.addAddress6
        : "",
      iSOCountryCode: getPermanentAddress?.addIsoCountryCode
        ? getPermanentAddress?.addIsoCountryCode
        : "",
      iCAOCountryCode: getPermanentAddress?.addIcaoCountryCode
        ? getPermanentAddress?.addIcaoCountryCode
        : "",
      phone: getPermanentAddress?.addPhone ? getPermanentAddress?.addPhone : "",
      mobile: getPermanentAddress?.addMobile
        ? getPermanentAddress?.addMobile
        : "",
      email: getPermanentAddress?.addEmail ? getPermanentAddress?.addEmail : "",
      workPhone: getPermanentAddress?.addWorkPhone
        ? getPermanentAddress?.addWorkPhone
        : "",
      fax: getPermanentAddress?.addFax ? getPermanentAddress?.addFax : "",
      healthRegion: getPermanentAddress?.addHealthRegionEliId
        ? getPermanentAddress?.addHealthRegionEliId
        : "",
      locationZone: getPermanentAddress?.addLocationZoneEliId
        ? getPermanentAddress?.addLocationZoneEliId
        : "",
      lSOA: getPermanentAddress?.addLsao ? getPermanentAddress?.addLsao : "",
      postcodeSearch: "",
      billingCorrespondence:
        getTemporaryAddress?.addBillingAddress === 1
          ? "temporary"
          : "permanent",
      tempNumberRoad: getTemporaryAddress?.addAddress1
        ? getTemporaryAddress?.addAddress1
        : "",
      tempTown: getTemporaryAddress?.addAddress3
        ? getTemporaryAddress?.addAddress3
        : "",
      tempDistrict: getTemporaryAddress?.addAddress2
        ? getTemporaryAddress?.addAddress2
        : "",
      tempCounty: getTemporaryAddress?.addAddress4
        ? getTemporaryAddress?.addAddress4
        : "",
      tempPostcode: getTemporaryAddress?.addAddress5
        ? getTemporaryAddress?.addAddress5
        : "",
      tempCountry: getTemporaryAddress?.addAddress6
        ? getTemporaryAddress?.addAddress6
        : "",
      tempISOCountryCode: getTemporaryAddress?.addIsoCountryCode
        ? getTemporaryAddress?.addIsoCountryCode
        : "",
      tempICAOCountryCode: getTemporaryAddress?.addIcaoCountryCode
        ? getTemporaryAddress?.addIcaoCountryCode
        : "",
      tempMobile: getTemporaryAddress?.addMobile
        ? getTemporaryAddress?.addMobile
        : "",
      tempPhone: getTemporaryAddress?.addPhone
        ? getTemporaryAddress?.addPhone
        : "",
      tempEmail: getTemporaryAddress?.addEmail
        ? getTemporaryAddress?.addEmail
        : "",
      tempWorkPhone: getTemporaryAddress?.addWorkPhone
        ? getTemporaryAddress?.addWorkPhone
        : "",
      tempFax: getTemporaryAddress?.addFax ? getTemporaryAddress?.addFax : "",
      tempHealthRegion: getTemporaryAddress?.addHealthRegionEliId
        ? getTemporaryAddress?.addHealthRegionEliId
        : "",
      tempLocationZone: getTemporaryAddress?.addLocationZoneEliId
        ? getTemporaryAddress?.addLocationZoneEliId
        : "",
      tempLSOA: getTemporaryAddress?.addLsao
        ? getTemporaryAddress?.addLsao
        : "",
      startDate: getTemporaryAddress?.addTempPermanentStartDate
        ? getTemporaryAddress?.addTempPermanentStartDate
        : null,
      endDate: getTemporaryAddress?.addTempPermanentEndDate
        ? getTemporaryAddress?.addTempPermanentEndDate
        : null,
      notes: getPermanentAddress?.addNotes ? getPermanentAddress?.addNotes : "",
      tempNotes: getTemporaryAddress?.addNotes
        ? getTemporaryAddress?.addNotes
        : "",
      unknownNoFixedAbodeorOverseasVisitor: "pleaseSelect",
    },
    validationSchema: yup.object().shape({
      numberRoad: yup
        .string()
        .required(translate("number&RoadRequired", language)),
      country: yup.string().required(translate("countryRequired", language)),
      email: yup.string().email(translate("validEmailMsg", language)),
      tempEmail: yup.string().email(translate("validEmailMsg", language)),
      startDate: yup
        .date()
        .nullable()
        .min(new Date("01/01/1900"), translate("invalidBornDate", language))
        .max(new Date("12/31/2050"), translate("invalidBornDate", language))
        .typeError(translate("invalidBornDate", language)),
      endDate: yup
        .date()
        .nullable()
        .min(new Date("01/01/1900"), translate("invalidBornDate", language))
        .test(
          "test",
          translate("invalidEndDate", language),
          (value: any, validationContext) => {
            const { parent } = validationContext;
            if (
              parent.startDate &&
              parent.endDate &&
              parent.startDate > parent.endDate
            )
              return false;
            return true;
          }
        )
        .max(new Date("12/31/2050"), translate("invalidBornDate", language))
        .typeError(translate("invalidBornDate", language)),
      postcode: yup.string().when([], {
        is: () => estPatientPostcodeMandatory === 1,
        then: yup.string().required(translate("postcodeRequired", language)),
        otherwise: yup.string().notRequired(),
      }),
      tempPostcode: yup.string().when([], {
        is: () => estPatientPostcodeMandatory === 1,
        then: yup.string().required(translate("postcodeRequired", language)),
        otherwise: yup.string().notRequired(),
      }),
    }),
    onSubmit: (values: IPatientAddress) => {
      dispatch(setIsPatientSelected(true));
      let requestParameter;
      const permanentAddress = {
        patId: patientId,
        addEstId: 2,
        addAddress1: values?.numberRoad,
        addAddress3: values?.town ? values?.town : null,
        addAddress2: values?.district ? values?.district : null,
        addAddress4: values?.county ? values?.county : null,
        addAddress5: values?.postcode ? values?.postcode : null,
        addAddress6: values?.country,
        addPhone: values?.phone ? values?.phone : null,
        addEmail: values?.email ? values?.email : null,
        addFax: values?.fax ? values?.fax : null,
        addWorkPhone: values?.workPhone ? values?.workPhone : null,
        addBillingAddress:
          values?.billingCorrespondence === "permanent" ? 1 : 0,
        addReportingRegion: null,
        addLsao: values?.lSOA ? values?.lSOA : null,
        addPostcodeNospaces: values?.postcode ? values?.postcode : null,
        addIsoCountryCode: values?.iSOCountryCode
          ? values?.iSOCountryCode
          : null,
        addIcaoCountryCode: values?.iCAOCountryCode
          ? values?.iCAOCountryCode
          : null,
        addMobile: values?.mobile ? values?.mobile : null,
        addLocale: null,
        addReportingDistrict: null,
        addLocalityCode: null,
        addCompanyName: null,
        addHealthRegionEliId: values?.healthRegion
          ? values?.healthRegion
          : null,
        addLatitude: null,
        addLongitude: null,
        addRadius: null,
        addPatId: patientId,
        addTempPermanent: "P",
        addLocationZoneEliId: values?.locationZone
          ? values?.locationZone
          : null,
        addAddress35: null,
        addNotes: null,
      };

      const temporaryAddress = {
        patId: patientId,
        addEstId: estID,
        addAddress1: values?.tempNumberRoad ? values?.tempNumberRoad : null,
        addAddress3: values?.tempTown ? values?.tempTown : null,
        addAddress2: values?.tempDistrict ? values?.tempDistrict : null,
        addAddress4: values?.tempCounty ? values?.tempCounty : null,
        addAddress5: values?.tempPostcode ? values?.tempPostcode : null,
        addAddress6: values?.tempCountry ? values?.tempCountry : null,
        addPhone: values?.tempPhone ? values?.tempPhone : null,
        addEmail: values?.tempEmail ? values?.tempEmail : null,
        addFax: values?.tempFax ? values?.tempFax : null,
        addLocale: values?.tempLocationZone ? values?.tempLocationZone : null,
        addWorkPhone: values?.tempWorkPhone ? values?.tempWorkPhone : null,
        addBillingAddress:
          values?.billingCorrespondence === "temporary" ? 1 : 0,
        addReportingRegion: null,
        addIsoCountryCode: values?.tempISOCountryCode
          ? values?.tempISOCountryCode
          : null,
        addIcaoCountryCode: values?.tempICAOCountryCode
          ? values?.tempICAOCountryCode
          : null,
        addLsao: values?.tempLSOA ? values?.tempLSOA : null,
        addPostcodeNospaces: values?.tempPostcode ? values?.tempPostcode : null,
        addMobile: values?.tempMobile ? values.tempMobile : null,
        addReportingDistrict: null,
        addLocalityCode: null,
        addCompanyName: null,
        addHealthRegionEliId: values?.tempHealthRegion
          ? values?.tempHealthRegion
          : null,
        addLatitude: null,
        addLongitude: null,
        addRadius: null,
        addPatId: patientId,
        addTempPermanent: "T",
        addLocationZoneEliId: values?.tempLocationZone
          ? values?.tempLocationZone
          : null,
        addAddress35: null,
        addNotes: null,
        addTempPermanentStartDate: values?.startDate
          ? moment(values?.startDate).format("DD-MM-YYYY")
          : null,
        addTempPermanentEndDate: values?.endDate
          ? moment(values?.endDate).format("DD-MM-YYYY")
          : null,
      };

      if (
        values.tempNumberRoad !== "" ||
        values.tempTown !== "" ||
        values.tempDistrict !== "" ||
        values.tempCounty !== "" ||
        values.tempCountry !== "" ||
        values.tempPostcode !== "" ||
        values.tempPhone !== "" ||
        values.tempEmail !== "" ||
        values.tempFax !== "" ||
        values.tempLocationZone !== "" ||
        values.tempWorkPhone !== "" ||
        values.billingCorrespondence !== "" ||
        values.tempHealthRegion !== "" ||
        values.tempISOCountryCode !== "" ||
        values.iCAOCountryCode !== ""
      ) {
        requestParameter = { permanentAddress, temporaryAddress };
      } else {
        requestParameter = { permanentAddress };
      }

      if (props?.mode !== "addPatient") {
        updatePatientAddress(requestParameter, {
          onSuccess: (response: any) => {
            dispatchSnackbar(response, dispatch, language);
          },
        });
      } else {
        addPatientAddress(requestParameter, {
          onSuccess: (response: any) => {
            dispatchSnackbar(response, dispatch, language);
            if (props.handleStep) props?.handleStep(2);
          },
        });
      }
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    setPermanentAddressLatitude(coords?.latitude);
    setPermanentAddressLongitude(coords?.longitude);
    setTemporaryAddressLatitude(coords?.latitude);
    setTemporaryAddressLongitude(coords?.longitude);
  }, [coords?.latitude, coords?.longitude]);

  const setCountryFields = (
    countries: any,
    data: FormikProps<any>,
    type: any
  ) => {
    addressForm.setFieldValue(
      type === "permanent" ? "country" : "tempCountry",
      countries?.couCountry
    );
    addressForm.setFieldValue(
      type === "permanent" ? "iSOCountryCode" : "tempISOCountryCode",
      countries?.couCountryCode
    );
    addressForm.setFieldTouched(
      type === "permanent" ? "iSOCountryCode" : "tempISOCountryCode",
      false
    );
    addressForm.setFieldValue(
      type === "permanent" ? "iCAOCountryCode" : "tempICAOCountryCode",
      countries?.couIcaoCountryCode
    );
    addressForm.setFieldTouched(
      type === "permanent" ? "iCAOCountryCode" : "tempICAOCountryCode",
      false
    );
  };

  return (
    <>
      {(patientAddressIsLoading || countryIsLoading) && (
        <Mui.Backdrop sx={{ zIndex: "1500" }} open>
          <Mui.CircularProgress />
        </Mui.Backdrop>
      )}
      <form onSubmit={addressForm.handleSubmit}>
        <Grid container item xs={12}>
          {estAddressWizardUnknownAddDropdown === 1 && (
            <Grid item xs={12}>
              <Grid item xs={2.5}>
                <Common.CellmaSelectField
                  label={translate(
                    "unknown,NoFixedAbode,orOverseasVisitor",
                    language
                  )}
                  name="unknownNoFixedAbodeorOverseasVisitor"
                  value={
                    addressForm.values.unknownNoFixedAbodeorOverseasVisitor
                  }
                  changeevent={(event: any) => {
                    setAddressForUnknownSelect(event, addressForm, setDisabled);
                  }}
                  onBlur={addressForm.handleBlur}
                  list={dummyData.UNKNOW_NOFIXEDABODE_OR_OVERSEASVISITOR.map(
                    (patientWeb: any) => (
                      <MenuItem key={patientWeb.id} value={patientWeb.label}>
                        {translate(`${patientWeb.label}`, language)}
                      </MenuItem>
                    )
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ my: "20px" }} />
              </Grid>
            </Grid>
          )}

          <Grid item xs={12} container>
            <Grid item container xs={12}>
              <Typography
                sx={{ mt: "5px", ml: "4px", mb: "20px" }}
                variant="subtitle1"
                align="left"
                gutterBottom
              >
                {translate("permanentAddress", language)}
              </Typography>
            </Grid>
            <Grid
              item
              container
              xs={cliShowGeomapLinkOnAddressPage === 1 ? 8 : 12}
              spacing={3}
            >
              <GridItem>
                <Common.CellmaInputField
                  label={translate("number&Road", language)}
                  required
                  name="numberRoad"
                  ariaLabel="numberRoadPermanentAddress"
                  value={addressForm.values.numberRoad}
                  onHandleChange={addressForm.handleChange}
                  onBlur={addressForm.handleBlur}
                  maxLength="255"
                  onKeyPress={validations.restrictSpaceAtStart}
                  disabled={
                    addressForm.values.unknownNoFixedAbodeorOverseasVisitor !==
                      "pleaseSelect" && props?.mode === "addPatient"
                  }
                  errorText={
                    addressForm.touched.numberRoad &&
                    addressForm.errors.numberRoad
                  }
                />
              </GridItem>
              <GridItem>
                <Common.CellmaInputField
                  label={translate("town", language)}
                  name="town"
                  ariaLabel="townPermanentAddress"
                  disabled={
                    addressForm.values.unknownNoFixedAbodeorOverseasVisitor !==
                      "pleaseSelect" && props?.mode === "addPatient"
                  }
                  value={addressForm.values.town}
                  onHandleChange={addressForm.handleChange}
                  onBlur={addressForm.handleBlur}
                  maxLength="255"
                />
              </GridItem>
              <GridItem>
                <Common.CellmaInputField
                  label={translate("district", language)}
                  name="district"
                  ariaLabel="districtPermanentAddress"
                  disabled={
                    addressForm.values.unknownNoFixedAbodeorOverseasVisitor !==
                      "pleaseSelect" && props?.mode === "addPatient"
                  }
                  value={addressForm.values.district}
                  onHandleChange={addressForm.handleChange}
                  onBlur={addressForm.handleBlur}
                  maxLength="255"
                />
              </GridItem>
              <GridItem>
                <Common.CellmaInputField
                  label={translate("county", language)}
                  name="county"
                  ariaLabel="countyPermanentAddress"
                  disabled={
                    addressForm.values.unknownNoFixedAbodeorOverseasVisitor !==
                      "pleaseSelect" && props?.mode === "addPatient"
                  }
                  value={addressForm.values.county}
                  onHandleChange={addressForm.handleChange}
                  onBlur={addressForm.handleBlur}
                  maxLength="255"
                />
              </GridItem>
              <GridItem>
                <Common.CellmaInputField
                  label={translate("postcode", language)}
                  name="postcode"
                  ariaLabel="postCodePermanentAddress"
                  disabled={
                    addressForm.values.unknownNoFixedAbodeorOverseasVisitor !==
                      "pleaseSelect" && props?.mode === "addPatient"
                  }
                  required={estPatientPostcodeMandatory === 1}
                  value={addressForm.values.postcode}
                  onHandleChange={addressForm.handleChange}
                  onBlur={addressForm.handleBlur}
                  style={{ textTransform: "uppercase" }}
                  maxLength="20"
                  onKeyPress={validations.allowDigitCharacterSpace}
                  onPaste={validations.restrictCutCopyPaste}
                  errorText={isError(addressForm, "postcode")}
                />
                <Grid item xs={12} sx={styles.FindPostCodeButton}>
                  <Common.CellmaButton
                    label={translate("findPostcode", language)}
                    minWidth="40px"
                    onClick={() => {
                      setPostCodePopupPermanentAddress(true);
                      setPostcodeType("permanentAddress");
                    }}
                  />
                </Grid>
              </GridItem>
              <GridItem>
                <Common.CellmaSelectField
                  label={translate("country", language)}
                  required
                  name="country"
                  ariaLabel="countryPermanentAddress"
                  value={addressForm.values.country}
                  onBlur={addressForm.handleBlur}
                  error={
                    addressForm.touched.country && addressForm.errors.country
                  }
                  list={country.map((country: any) => (
                    <MenuItem
                      key={country.couId}
                      value={country.couCountry}
                      sx={{ whiteSpace: "unset" }}
                    >
                      {country.couCountry}
                    </MenuItem>
                  ))}
                  changeevent={(event: any) => {
                    country.map((country: any) => {
                      if (country.couCountry === event.target.value) {
                        setCountryFields(country, addressForm, "permanent");
                      }
                      return country;
                    });
                  }}
                />
              </GridItem>

              <GridItem>
                <Common.CellmaInputField
                  label={translate("iSOCountryCode", language)}
                  name="iSOCountryCode"
                  ariaLabel="iSOCountryCodePermanentAddress"
                  value={addressForm.values.iSOCountryCode}
                  onHandleChange={addressForm.handleChange}
                  onBlur={addressForm.handleBlur}
                  maxLength="10"
                />
              </GridItem>
              <GridItem>
                <Common.CellmaInputField
                  label={translate("iCAOCountryCode", language)}
                  name="iCAOCountryCode"
                  ariaLabel="iCAOCountryCodePermanentAddress"
                  value={addressForm.values.iCAOCountryCode}
                  onHandleChange={addressForm.handleChange}
                  onBlur={addressForm.handleBlur}
                  maxLength="10"
                />
              </GridItem>

              <GridItem>
                <Common.CellmaInputField
                  label={translate("phone", language)}
                  name="phone"
                  ariaLabel="phonePermanentAddress"
                  value={addressForm.values.phone}
                  onHandleChange={addressForm.handleChange}
                  onBlur={addressForm.handleBlur}
                  maxLength="255"
                  onKeyPress={validations.restrictAlphabetsAndSpecialCharacters}
                  onPaste={
                    validations.restrictPasteEventForSpecialCharactersAndAlphabets
                  }
                />
              </GridItem>
              <GridItem>
                <Common.CellmaInputField
                  label={translate("email", language)}
                  name="email"
                  ariaLabel="emailPermanentAddress"
                  value={addressForm.values.email}
                  onHandleChange={addressForm.handleChange}
                  onBlur={addressForm.handleBlur}
                  maxLength="255"
                  errorText={
                    addressForm.touched.email && addressForm.errors.email
                  }
                />
              </GridItem>
              <GridItem>
                <Common.CellmaInputField
                  label={translate("mobile", language)}
                  type="tel"
                  name="mobile"
                  value={addressForm.values.mobile}
                  onHandleChange={addressForm.handleChange}
                  onBlur={validations.checkMobileValidation}
                  onKeyPress={validations.restrictAlphabetsAndSpecialCharacters}
                  onPaste={
                    validations.restrictPastingCharactersAndSpecialSymbols
                  }
                  onInput={(e: any) => {
                    e.target.value = e.target.value.toString().slice(0, 10);
                  }}
                />
              </GridItem>
              <GridItem>
                <Common.CellmaInputField
                  label={translate("workPhone", language)}
                  name="workPhone"
                  ariaLabel="workPhonePermanentAddress"
                  value={addressForm.values.workPhone}
                  onHandleChange={addressForm.handleChange}
                  onBlur={addressForm.handleBlur}
                  maxLength="255"
                  onKeyPress={validations.restrictAlphabetsAndSpecialCharacters}
                  onPaste={
                    validations.restrictPasteEventForSpecialCharactersAndAlphabets
                  }
                />
              </GridItem>
              <GridItem sx={styles.postCodeInput}>
                <Common.CellmaInputField
                  label={translate("fax", language)}
                  name="fax"
                  ariaLabel="faxPermanentAddress"
                  value={addressForm.values.fax}
                  onHandleChange={addressForm.handleChange}
                  onBlur={addressForm.handleBlur}
                  maxLength="255"
                  onKeyPress={
                    validations.restrictSpecialCharacterExceptSingleQuote
                  }
                  onPaste={validations.restrictPasteEventForSpecialCharacters}
                />
              </GridItem>
              <GridItem>
                <Common.CellmaSelectField
                  label={translate("healthRegion", language)}
                  name="healthRegion"
                  ariaLabel="healthRegionPermanentAddress"
                  value={addressForm.values.healthRegion}
                  changeevent={addressForm.handleChange}
                  onBlur={addressForm.handleBlur}
                  list={establishmentListItem?.["health region"].map(
                    (patientWeb: any) => (
                      <MenuItem
                        key={patientWeb.eliId}
                        value={patientWeb.eliId}
                        sx={{ whiteSpace: "unset" }}
                      >
                        {patientWeb.eliText}
                      </MenuItem>
                    )
                  )}
                />
              </GridItem>
              <GridItem>
                <Common.CellmaSelectField
                  label={translate("locationZone", language)}
                  name="locationZone"
                  ariaLabel="locationZonePermanentAddress"
                  value={addressForm.values.locationZone}
                  changeevent={addressForm.handleChange}
                  onBlur={addressForm.handleBlur}
                  list={establishmentListItem?.["location zone"].map(
                    (patientWeb: any) => (
                      <MenuItem
                        key={patientWeb.eliId}
                        value={patientWeb.eliId}
                        sx={{ whiteSpace: "unset" }}
                      >
                        {patientWeb.eliText}
                      </MenuItem>
                    )
                  )}
                />
              </GridItem>
              <GridItem>
                <Common.CellmaInputField
                  label={translate("lSOA", language)}
                  name="lSOA"
                  ariaLabel="lSOAPermanentAddress"
                  value={addressForm.values.lSOA}
                  onHandleChange={addressForm.handleChange}
                  onBlur={addressForm.handleBlur}
                  maxLength="30"
                  disabled
                />
              </GridItem>
            </Grid>

            {cliShowGeomapLinkOnAddressPage === 1 && (
              <Grid item container xs={4} sx={styles.mapGrid}>
                <Grid item xs={12} sx={styles.alignCenter}>
                  {!permanentAddressLatitude && !permanentAddressLongitude && (
                    <Typography variant="h4" sx={{ color: "warning.dark" }}>
                      Location Not Available
                    </Typography>
                  )}
                </Grid>

                <Grid item xs={12}>
                  <GoogleMap
                    mapContainerStyle={styles.mapContainerStyle}
                    center={{
                      lat: permanentAddressLatitude || 51.5072,
                      lng: permanentAddressLongitude || 0.1275,
                    }}
                    zoom={12}
                    options={{
                      zoomControl: false,
                      streetViewControl: false,
                      mapTypeControl: false,
                    }}
                    onClick={(ev: any) => {
                      setPermanentAddressLatitude(ev?.latLng?.lat());
                      setPermanentAddressLongitude(ev?.latLng?.lng());
                      setAddressByGoogleMap(
                        ev?.latLng?.lat(),
                        ev?.latLng?.lng(),
                        addressForm,
                        "permanent",
                        country
                      );
                    }}
                  >
                    {permanentAddressLatitude && permanentAddressLongitude && (
                      <Marker
                        title="My Location"
                        position={{
                          lat: permanentAddressLatitude || 0,
                          lng: permanentAddressLongitude || 0,
                        }}
                      />
                    )}
                  </GoogleMap>
                </Grid>
              </Grid>
            )}

            <Grid item xs={12}>
              <Common.CellmaButton
                label={translate("add/viewNotes", language)}
                onClick={() => setNotesPopup("permanentAddress")}
              />
            </Grid>
            <Grid container item xs={12} sx={{ mt: "15px" }}>
              <Grid item xs={12}>
                <GridItem>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">
                      <Typography>
                        {translate("billing/Correspondence", language)}
                        <Radio
                          data-testid="PA Billing Correspondence"
                          checked={
                            addressForm.values.billingCorrespondence ===
                            "permanent"
                          }
                          onChange={addressForm.handleChange}
                          value="permanent"
                          name="billingCorrespondence"
                          inputProps={{ "aria-label": "A" }}
                          sx={{ ml: "15px" }}
                        />
                      </Typography>
                    </FormLabel>
                  </FormControl>
                </GridItem>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ my: "20px" }} />
          </Grid>
          <Grid item xs={12} container>
            <Grid item container xs={12}>
              <Typography
                sx={{ mt: "5px", ml: "4px", mb: "20px" }}
                variant="subtitle1"
                align="left"
                gutterBottom
              >
                {translate("temporaryAddress", language)}
              </Typography>
            </Grid>
            <Grid
              item
              container
              xs={cliShowGeomapLinkOnAddressPage === 1 ? 8 : 12}
              spacing={3}
            >
              <GridItem>
                <Common.CellmaInputField
                  label={translate("number&Road", language)}
                  name="tempNumberRoad"
                  value={addressForm.values.tempNumberRoad}
                  onHandleChange={addressForm.handleChange}
                  onBlur={addressForm.handleBlur}
                  maxLength="255"
                />
              </GridItem>
              <GridItem>
                <Common.CellmaInputField
                  label={translate("town", language)}
                  name="tempTown"
                  value={addressForm.values.tempTown}
                  onHandleChange={addressForm.handleChange}
                  onBlur={addressForm.handleBlur}
                  maxLength="255"
                />
              </GridItem>
              <GridItem>
                <Common.CellmaInputField
                  label={translate("district", language)}
                  name="tempDistrict"
                  value={addressForm.values.tempDistrict}
                  onHandleChange={addressForm.handleChange}
                  onBlur={addressForm.handleBlur}
                  maxLength="255"
                />
              </GridItem>
              <GridItem>
                <Common.CellmaInputField
                  label={translate("county", language)}
                  name="tempCounty"
                  value={addressForm.values.tempCounty}
                  onHandleChange={addressForm.handleChange}
                  onBlur={addressForm.handleBlur}
                  maxLength="255"
                />
              </GridItem>
              <GridItem>
                <Common.CellmaInputField
                  label={translate("postcode", language)}
                  name="tempPostcode"
                  value={addressForm.values.tempPostcode}
                  required={estPatientPostcodeMandatory === 1}
                  onHandleChange={addressForm.handleChange}
                  onBlur={addressForm.handleBlur}
                  style={{ textTransform: "uppercase" }}
                  maxLength="20"
                  onKeyPress={validations.allowDigitCharacterSpace}
                  onPaste={validations.restrictCutCopyPaste}
                  errorText={isError(addressForm, "tempPostcode")}
                />
                <Grid item xs={12} sx={styles.FindPostCodeButton}>
                  <Common.CellmaButton
                    label={translate("findPostcode", language)}
                    minWidth="40px"
                    onClick={() => {
                      setPostCodePopupTemporaryAddress(true);
                      setPostcodeType("temporaryAddress");
                    }}
                  />
                </Grid>
              </GridItem>
              <GridItem>
                <Common.CellmaSelectField
                  label={translate("country", language)}
                  name="tempCountry"
                  value={addressForm.values.tempCountry}
                  onBlur={addressForm.handleBlur}
                  list={country.map((country: any) => (
                    <MenuItem
                      key={country.couId}
                      value={country.couCountry}
                      sx={{ whiteSpace: "unset" }}
                    >
                      {country.couCountry}
                    </MenuItem>
                  ))}
                  changeevent={(event: any) => {
                    country.map((country: any) => {
                      if (country.couCountry === event.target.value) {
                        setCountryFields(country, addressForm, "temporary");
                      }
                      return country;
                    });
                  }}
                />
              </GridItem>
              <GridItem>
                <Common.CellmaInputField
                  label={translate("iSOCountryCode", language)}
                  name="tempISOCountryCode"
                  value={addressForm.values.tempISOCountryCode}
                  onHandleChange={addressForm.handleChange}
                  onBlur={addressForm.handleBlur}
                  maxLength="10"
                />
              </GridItem>
              <GridItem>
                <Common.CellmaInputField
                  label={translate("iCAOCountryCode", language)}
                  name="tempICAOCountryCode"
                  value={addressForm.values.tempICAOCountryCode}
                  onHandleChange={addressForm.handleChange}
                  onBlur={addressForm.handleBlur}
                  maxLength="10"
                />
              </GridItem>

              <GridItem>
                <Common.CellmaInputField
                  label={translate("phone", language)}
                  name="tempPhone"
                  value={addressForm.values.tempPhone}
                  onHandleChange={addressForm.handleChange}
                  onBlur={addressForm.handleBlur}
                  maxLength="255"
                  onKeyPress={validations.restrictAlphabetsAndSpecialCharacters}
                  onPaste={
                    validations.restrictPasteEventForSpecialCharactersAndAlphabets
                  }
                />
              </GridItem>
              <GridItem>
                <Common.CellmaInputField
                  label={translate("email", language)}
                  name="tempEmail"
                  value={addressForm.values.tempEmail}
                  onHandleChange={addressForm.handleChange}
                  onBlur={addressForm.handleBlur}
                  maxLength="255"
                  errorText={
                    addressForm.touched.tempEmail &&
                    addressForm.errors.tempEmail
                  }
                />
              </GridItem>
              <GridItem>
                <Common.CellmaInputField
                  label={translate("mobile", language)}
                  type="tel"
                  name="tempMobile"
                  value={addressForm.values.tempMobile}
                  onHandleChange={addressForm.handleChange}
                  onBlur={validations.checkMobileValidation}
                  onKeyPress={validations.restrictAlphabetsAndSpecialCharacters}
                  onPaste={
                    validations.restrictPastingCharactersAndSpecialSymbols
                  }
                  onInput={(e: any) => {
                    e.target.value = e.target.value.toString().slice(0, 10);
                  }}
                />
              </GridItem>
              <GridItem>
                <Common.CellmaInputField
                  label={translate("workPhone", language)}
                  name="tempWorkPhone"
                  value={addressForm.values.tempWorkPhone}
                  onHandleChange={addressForm.handleChange}
                  onBlur={addressForm.handleBlur}
                  maxLength="255"
                  onKeyPress={validations.restrictAlphabetsAndSpecialCharacters}
                  onPaste={
                    validations.restrictPasteEventForSpecialCharactersAndAlphabets
                  }
                />
              </GridItem>
              <GridItem sx={styles.postCodeInput}>
                <Common.CellmaInputField
                  label={translate("fax", language)}
                  name="tempFax"
                  value={addressForm.values.tempFax}
                  onHandleChange={addressForm.handleChange}
                  onBlur={addressForm.handleBlur}
                  maxLength="255"
                  onKeyPress={
                    validations.restrictSpecialCharacterExceptSingleQuote
                  }
                  onPaste={validations.restrictPasteEventForSpecialCharacters}
                />
              </GridItem>
              <GridItem>
                <Common.CellmaSelectField
                  label={translate("healthRegion", language)}
                  name="tempHealthRegion"
                  value={addressForm.values.tempHealthRegion}
                  changeevent={addressForm.handleChange}
                  onBlur={addressForm.handleBlur}
                  list={establishmentListItem?.["health region"].map(
                    (patientWeb: any) => (
                      <MenuItem
                        key={patientWeb.eliId}
                        value={patientWeb.eliId}
                        sx={{ whiteSpace: "unset" }}
                      >
                        {patientWeb.eliText}
                      </MenuItem>
                    )
                  )}
                />
              </GridItem>
              <GridItem>
                <Common.CellmaSelectField
                  label={translate("locationZone", language)}
                  name="tempLocationZone"
                  value={addressForm.values.tempLocationZone}
                  changeevent={addressForm.handleChange}
                  onBlur={addressForm.handleBlur}
                  list={establishmentListItem?.["location zone"].map(
                    (patientWeb: any) => (
                      <MenuItem
                        key={patientWeb.eliId}
                        value={patientWeb.eliId}
                        sx={{ whiteSpace: "unset" }}
                      >
                        {patientWeb.eliText}
                      </MenuItem>
                    )
                  )}
                />
              </GridItem>
              <GridItem>
                <Common.CellmaInputField
                  label={translate("lSOA", language)}
                  name="tempLSOA"
                  value={addressForm.values.tempLSOA}
                  onHandleChange={addressForm.handleChange}
                  onBlur={addressForm.handleBlur}
                  maxLength="30"
                  disabled
                />
              </GridItem>
              <Grid item xs={12}>
                <Common.CellmaButton
                  label={translate("add/viewNotes", language)}
                  onClick={() => setNotesPopup("temporaryAddress")}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  {translate("billing/Correspondence", language)}
                  <Radio
                    data-testid="TA Billing Correspondence"
                    checked={
                      addressForm.values.billingCorrespondence === "temporary"
                    }
                    onChange={addressForm.handleChange}
                    value="temporary"
                    name="billingCorrespondence"
                    inputProps={{ "aria-label": "A" }}
                  />
                </Typography>
              </Grid>
              <GridItem>
                <Common.CellmaDatePicker
                  label={translate("startDate", language)}
                  name="startDate"
                  maxDate={new Date("12/31/2050")}
                  value={addressForm.values.startDate}
                  onChange={(newDate: Date | null) => {
                    addressForm.setFieldValue("startDate", newDate);
                    addressForm.setFieldTouched("startDate", true, false);
                  }}
                  onBlur={addressForm.handleBlur}
                  error={
                    addressForm.touched.startDate &&
                    addressForm.errors.startDate
                      ? addressForm.errors.startDate
                      : ""
                  }
                />
              </GridItem>
              <GridItem>
                <Common.CellmaDatePicker
                  label={translate("endDate", language)}
                  name="endDate"
                  maxDate={new Date("12/31/2050")}
                  value={addressForm.values.endDate}
                  onChange={(newDate: Date | null) => {
                    addressForm.setFieldValue("endDate", newDate);
                    addressForm.setFieldTouched("endDate", true, false);
                  }}
                  onBlur={addressForm.handleBlur}
                  error={
                    addressForm.touched.endDate && addressForm.errors.endDate
                      ? addressForm.errors.endDate
                      : ""
                  }
                />
              </GridItem>
            </Grid>
            {cliShowGeomapLinkOnAddressPage === 1 && (
              <Grid item container xs={4} sx={styles.mapGrid}>
                <Grid item xs={12} sx={styles.alignCenter}>
                  {!temporaryAddressLatitude && !temporaryAddressLongitude && (
                    <Typography variant="h4" sx={{ color: "warning.dark" }}>
                      Location Not Available
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <GoogleMap
                    mapContainerStyle={styles.mapContainerStyle}
                    center={{
                      lat: temporaryAddressLatitude || 51.5072,
                      lng: temporaryAddressLongitude || 0.1275,
                    }}
                    zoom={12}
                    options={{
                      zoomControl: false,
                      streetViewControl: false,
                      mapTypeControl: false,
                    }}
                    onClick={(ev: any) => {
                      setTemporaryAddressLatitude(ev?.latLng?.lat());
                      setTemporaryAddressLongitude(ev?.latLng?.lng());
                      setAddressByGoogleMap(
                        ev?.latLng?.lat(),
                        ev?.latLng?.lng(),
                        addressForm,
                        "temporary",
                        country
                      );
                    }}
                  >
                    {temporaryAddressLatitude && temporaryAddressLongitude && (
                      <Marker
                        title="My Location"
                        position={{
                          lat: temporaryAddressLatitude || 0,
                          lng: temporaryAddressLongitude || 0,
                        }}
                      />
                    )}
                  </GoogleMap>
                </Grid>
              </Grid>
            )}
            {/* PostCode permanent address start */}
            {postCodePopupPermanentAddress && (
              <Backdrop open>
                {popupContent === "enterPostcode" && (
                  <Common.CellmaPopup
                    title={translate("findPostcode", language)}
                    handleCancel={() => {
                      setPostCodePopupPermanentAddress(false);
                      setPopupContent("enterPostcode");
                    }}
                  >
                    <Grid
                      container
                      spacing={3}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        padding: "10px",
                      }}
                    >
                      <GridItemPostcode>
                        <CellmaPostCodeSearch
                          data={addressForm}
                          type={postcodeType}
                          setPermanentAddressLatitude={
                            setPermanentAddressLatitude
                          }
                          setPermanentAddressLongitude={
                            setPermanentAddressLongitude
                          }
                          country={country}
                        />
                      </GridItemPostcode>
                      <GridItemPostcode>
                        <Common.CellmaInputField
                          label={translate("town", language)}
                          name="town"
                          value={addressForm.values.town}
                          onHandleChange={addressForm.handleChange}
                          onBlur={addressForm.handleBlur}
                        />
                      </GridItemPostcode>
                      <GridItemPostcode>
                        <Common.CellmaInputField
                          label={translate("district", language)}
                          name="district"
                          value={addressForm.values.district}
                          onHandleChange={addressForm.handleChange}
                          onBlur={addressForm.handleBlur}
                        />
                      </GridItemPostcode>
                      <GridItemPostcode>
                        <Common.CellmaInputField
                          label={translate("county", language)}
                          name="county"
                          value={addressForm.values.county}
                          onHandleChange={addressForm.handleChange}
                          onBlur={addressForm.handleBlur}
                        />
                      </GridItemPostcode>
                      <GridItemPostcode>
                        <Common.CellmaInputField
                          label={translate("postcode", language)}
                          name="postcode"
                          required={estPatientPostcodeMandatory === 1}
                          value={addressForm.values.postcode}
                          onHandleChange={addressForm.handleChange}
                          onBlur={addressForm.handleBlur}
                          maxLength="20"
                          style={{ textTransform: "uppercase" }}
                          onPaste={validations.restrictCutCopyPaste}
                          onKeyPress={validations.allowDigitCharacterSpace}
                          errorText={isError(addressForm, "postcode")}
                        />
                      </GridItemPostcode>
                      <GridItemPostcode>
                        <Common.CellmaInputField
                          label={translate("country", language)}
                          name="country"
                          value={addressForm.values.country}
                          onHandleChange={addressForm.handleChange}
                          onBlur={addressForm.handleBlur}
                        />
                      </GridItemPostcode>
                      <Grid item xs={10} sx={styles.popupButtonGrid}>
                        <Common.CellmaButton
                          onClick={() => {
                            if (addressForm.errors.postcode) {
                              setPostCodePopupPermanentAddress(true);
                            } else {
                              setPopupContent("enterPostcode");
                              setPostCodePopupPermanentAddress(false);
                            }
                          }}
                          label={translate("save", language)}
                        />
                      </Grid>
                    </Grid>
                  </Common.CellmaPopup>
                )}
              </Backdrop>
            )}
            {/* PostCode permanent address end */}
            {/* PostCode Temporary address start */}
            {postCodePopupTemporaryAddress && (
              <Backdrop open>
                {popupContent === "enterPostcode" && (
                  <Common.CellmaPopup
                    title={translate("findPostcode", language)}
                    handleCancel={() => {
                      setPostCodePopupTemporaryAddress(false);
                      setPopupContent("enterPostcode");
                    }}
                  >
                    <Grid
                      container
                      spacing={3}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        padding: "10px",
                      }}
                    >
                      <GridItemPostcode>
                        <CellmaPostCodeSearch
                          data={addressForm}
                          type={postcodeType}
                          setTemporaryAddressLatitude={
                            setTemporaryAddressLatitude
                          }
                          setTemporaryAddressLongitude={
                            setTemporaryAddressLongitude
                          }
                          country={country}
                        />
                      </GridItemPostcode>
                      <GridItemPostcode>
                        <Common.CellmaInputField
                          label={translate("town", language)}
                          name="tempTown"
                          value={addressForm.values.tempTown}
                          onHandleChange={addressForm.handleChange}
                          onBlur={addressForm.handleBlur}
                        />
                      </GridItemPostcode>
                      <GridItemPostcode>
                        <Common.CellmaInputField
                          label={translate("district", language)}
                          name="tempDistrict"
                          value={addressForm.values.tempDistrict}
                          onHandleChange={addressForm.handleChange}
                          onBlur={addressForm.handleBlur}
                        />
                      </GridItemPostcode>
                      <GridItemPostcode>
                        <Common.CellmaInputField
                          label={translate("county", language)}
                          name="tempCounty"
                          value={addressForm.values.tempCounty}
                          onHandleChange={addressForm.handleChange}
                          onBlur={addressForm.handleBlur}
                        />
                      </GridItemPostcode>
                      <GridItemPostcode>
                        <Common.CellmaInputField
                          label={translate("postcode", language)}
                          name="tempPostcode"
                          required={estPatientPostcodeMandatory === 1}
                          value={addressForm.values.tempPostcode}
                          onHandleChange={addressForm.handleChange}
                          onBlur={addressForm.handleBlur}
                          maxLength="20"
                          style={{ textTransform: "uppercase" }}
                          onPaste={validations.restrictCutCopyPaste}
                          onKeyPress={validations.allowDigitCharacterSpace}
                          errorText={isError(addressForm, "tempPostcode")}
                        />
                      </GridItemPostcode>
                      <GridItemPostcode>
                        <Common.CellmaInputField
                          label={translate("country", language)}
                          name="tempCountry"
                          value={addressForm.values.tempCountry}
                          onHandleChange={addressForm.handleChange}
                          onBlur={addressForm.handleBlur}
                        />
                      </GridItemPostcode>
                      <Grid item xs={10} sx={styles.popupButtonGrid}>
                        <Common.CellmaButton
                          onClick={() => {
                            if (addressForm.errors.tempPostcode) {
                              setPostCodePopupTemporaryAddress(true);
                            } else {
                              setPopupContent("enterPostcode");
                              setPostCodePopupTemporaryAddress(false);
                            }
                          }}
                          label={translate("save", language)}
                        />
                      </Grid>
                    </Grid>
                  </Common.CellmaPopup>
                )}
              </Backdrop>
            )}
            {/* PostCode Temporary address end */}

            {/* Add Notes Popup Permanent address */}
            {notesPopup === "permanentAddress" && (
              <Backdrop open>
                <Common.CellmaPopup
                  title={translate("add/viewNotes", language)}
                  handleCancel={() => {
                    setNotesPopup("");
                  }}
                >
                  <Grid
                    container
                    spacing={3}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "10px",
                      minWidth: { sm: "500px" },
                    }}
                  >
                    <Grid item xs={11}>
                      <Common.CellmaInputField
                        label={translate("notes", language)}
                        multiline
                        minRows="4"
                        name="notes"
                        value={addressForm.values.notes}
                        onHandleChange={addressForm.handleChange}
                        onBlur={addressForm.handleBlur}
                      />
                    </Grid>

                    <Grid item xs={12} sx={styles.popupButtonGrid}>
                      <Common.CellmaButton
                        onClick={() => {
                          setNotesPopup("");
                        }}
                        label={translate("save", language)}
                      />
                    </Grid>
                  </Grid>
                </Common.CellmaPopup>
              </Backdrop>
            )}
            {/* Add Notes Popup Temporary address */}
            {notesPopup === "temporaryAddress" && (
              <Backdrop open>
                <Common.CellmaPopup
                  title={translate("add/viewNotes", language)}
                  handleCancel={() => {
                    setNotesPopup("");
                  }}
                >
                  <Grid
                    container
                    spacing={3}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "10px",
                      minWidth: { sm: "500px" },
                    }}
                  >
                    <Grid item xs={11}>
                      <Common.CellmaInputField
                        label={translate("notes", language)}
                        multiline
                        minRows="4"
                        name="tempNotes"
                        value={addressForm.values.tempNotes}
                        onHandleChange={addressForm.handleChange}
                        onBlur={addressForm.handleBlur}
                      />
                    </Grid>

                    <Grid item xs={12} sx={styles.popupButtonGrid}>
                      <Common.CellmaButton
                        onClick={() => {
                          setNotesPopup("");
                        }}
                        label={translate("save", language)}
                      />
                    </Grid>
                  </Grid>
                </Common.CellmaPopup>
              </Backdrop>
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
              {props?.mode === "addPatient" && (
                <Common.CellmaButton
                  label={translate("cancel", language)}
                  onClick={() => {
                    props?.handleStep && props?.handleStep(0);
                  }}
                />
              )}
              <Common.CellmaButton
                label={translate("save", language)}
                type="submit"
                onClick={() => {
                  if (addressForm?.errors) {
                    window.scrollTo(0, 0);
                  }
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
export default AddAddress;

const styles = {
  alignCenter: {
    display: "flex",
    justifyContent: "center",
  },
  addressDetailGridContainer: {
    marginTop: "10px",
    paddingX: "45px",
  },
  popupContentGrid: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginY: "10px",
  },

  popupButtonGrid: {
    display: "flex",
    justifyContent: "flex-end",
  },
  postCodeInput: {
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "column",
  },
  FindPostCodeButton: {
    display: "flex",
    justifyContent: "flex-end",
  },

  datePickerGrid: {
    ml: "-20px",
  },

  mapContainerStyle: {
    width: "100%",
    height: "250px",
    borderRadius: "20px",
  },
  mapGrid: {
    px: "20px",
    display: "flex",
    alignContent: "flex-start",
    justifyContent: "center",
  },
};

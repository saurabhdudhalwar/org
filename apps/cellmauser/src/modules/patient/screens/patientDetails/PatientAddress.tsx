// This page is merged with create patient/ Add Address page and this page is for reference for react-team.
//  delete this page after integrating functionality

import React, { useState } from "react";

import {
  Backdrop,
  CircularProgress,
  Divider,
  FormControlLabel,
  MenuItem,
  Radio,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { Formik, FormikProps } from "formik";
import moment from "moment";
import { useSelector } from "react-redux";
import * as yup from "yup";

import useCountriesLists from "../../../../api/useCountriesList";
import useEstablishmentListItems from "../../../../api/useEstablishmentListItems";
import CellmaPostCodeSearch from "../../../../common/CellmaPostCodeSearch";
import * as Common from "../../../../common/CommonComponentsIndex";
import * as validations from "../../../../utils/Validations";
import {
  useGetPatientExistingAddress,
  useUpdatePatientAddress,
} from "../../api/usePatientAddress";
import translate from "../../assets/translationFiles/patientDetailsTranslation";
import { IPatientAddress } from "../../types";

const PatientAddress = () => {
  const [postCodePopupPermanentAddress, setPostCodePopupPermanentAddress] =
    useState(false);
  const [postCodePopupTemporaryAddress, setPostCodePopupTemporaryAddress] =
    useState(false);
  const [popupContent, setPopupContent] = useState("enterPostcode");
  const [selectedValue, setSelectedValue] = React.useState("p");
  const { patientId } = useSelector((state: any) => state.patient);
  const [postcodeType, setPostcodeType] = useState("");

  const [notesPopup, setNotesPopup] = useState("");
  const { language } = useSelector((state: any) => state.language);
  const {
    data: establishmentListItem,
    isLoading: establishmentListItemIsLoading,
  } = useEstablishmentListItems(["health region", "location zone"]);
  const { data: patientAddress, isLoading: editPatientAddressIsLoading } =
    useGetPatientExistingAddress(patientId);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };
  //  const { mutate: updatePAtientAddress } = useUpdatePatientAddress();
  const { data: country, isLoading: countryIsLoading } = useCountriesLists();
  const { mutate: updatePatientAddress, isLoading: patientAddressIsLoading } =
    useUpdatePatientAddress();
  // API call for address

  return (
    <>
      {establishmentListItemIsLoading ||
        editPatientAddressIsLoading ||
        patientAddressIsLoading ||
        (countryIsLoading && (
          <Backdrop sx={{ zIndex: "1500" }} open>
            <CircularProgress />
          </Backdrop>
        ))}
      <Formik
        enableReinitialize
        initialValues={{
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
          iSOCountryCode: patientAddress?.permanentAddress?.addIsoCountryCode
            ? patientAddress?.permanentAddress?.addIsoCountryCode
            : "",
          iCAOCountryCode: patientAddress?.permanentAddress?.addIcaoCountryCode
            ? patientAddress?.permanentAddress?.addIcaoCountryCode
            : "",
          phone: patientAddress?.permanentAddress?.addPhone
            ? patientAddress?.permanentAddress?.addPhone
            : "",
          email: patientAddress?.permanentAddress?.addEmail
            ? patientAddress?.permanentAddress?.addEmail
            : "",
          workPhone: patientAddress?.permanentAddress?.addWorkPhone
            ? patientAddress?.permanentAddress?.addWorkPhone
            : "",
          fax: patientAddress?.permanentAddress?.addFax
            ? patientAddress?.permanentAddress?.addFax
            : "",
          healthRegion: patientAddress?.permanentAddress?.addHealthRegionEliId
            ? patientAddress?.permanentAddress?.addHealthRegionEliId
            : "",
          locationZone: patientAddress?.permanentAddress?.addLocationZoneEliId
            ? patientAddress?.permanentAddress?.addLocationZoneEliId
            : "",
          lSOA: patientAddress?.permanentAddress?.addLsao
            ? patientAddress?.permanentAddress?.addLsao
            : "",
          postcodeSearch: "",
          billingCorrespondence: patientAddress?.permanentAddress
            ?.addBillingAddress
            ? patientAddress?.permanentAddress?.addBillingAddress
            : "",
          tempNumberRoad: patientAddress?.temporaryAddress?.addAddress1
            ? patientAddress?.temporaryAddress?.addAddress1
            : "",
          tempTown: patientAddress?.temporaryAddress?.addAddress3
            ? patientAddress?.temporaryAddress?.addAddress3
            : "",
          tempDistrict: patientAddress?.temporaryAddress?.addAddress2
            ? patientAddress?.temporaryAddress?.addAddress2
            : "",
          tempCounty: patientAddress?.temporaryAddress?.addAddress4
            ? patientAddress?.temporaryAddress?.addAddress4
            : "",
          tempPostcode: patientAddress?.temporaryAddress?.addAddress5
            ? patientAddress?.temporaryAddress?.addAddress5
            : "",
          tempCountry: patientAddress?.temporaryAddress?.addAddress6
            ? patientAddress?.temporaryAddress?.addAddress6
            : "",
          tempISOCountryCode: patientAddress?.temporaryAddress
            ?.addIsoCountryCode
            ? patientAddress?.temporaryAddress?.addIsoCountryCode
            : "",
          tempICAOCountryCode: patientAddress?.temporaryAddress
            ?.addIcaoCountryCode
            ? patientAddress?.temporaryAddress?.addIcaoCountryCode
            : "",
          tempPhone: patientAddress?.temporaryAddress?.addPhone
            ? patientAddress?.temporaryAddress?.addPhone
            : "",
          tempEmail: patientAddress?.temporaryAddress?.addEmail
            ? patientAddress?.temporaryAddress?.addEmail
            : "",
          tempWorkPhone: patientAddress?.temporaryAddress?.addWorkPhone
            ? patientAddress?.temporaryAddress?.addWorkPhone
            : "",
          tempFax: patientAddress?.temporaryAddress?.addFax
            ? patientAddress?.temporaryAddress?.addFax
            : "",
          tempHealthRegion: patientAddress?.temporaryAddress
            ?.addHealthRegionEliId
            ? patientAddress?.temporaryAddress?.addHealthRegionEliId
            : "",
          tempLocationZone: patientAddress?.temporaryAddress
            ?.addLocationZoneEliId
            ? patientAddress?.temporaryAddress?.addLocationZoneEliId
            : "",
          tempLSOA: patientAddress?.temporaryAddress?.addLsao
            ? patientAddress?.temporaryAddress?.addLsao
            : "",
          startDate: patientAddress?.temporaryAddress?.addTempPermanentStartDate
            ? patientAddress?.temporaryAddress?.addTempPermanentStartDate
            : null,
          endDate: patientAddress?.temporaryAddress?.addTempPermanentEndDate
            ? patientAddress?.temporaryAddress?.addTempPermanentEndDate
            : null,
          notes: patientAddress?.permanentAddress?.addNotes
            ? patientAddress?.permanentAddress?.addNotes
            : "",
          tempNotes: patientAddress?.temporaryAddress?.addNotes
            ? patientAddress?.temporaryAddress?.addNotes
            : "",
        }}
        validationSchema={yup.object().shape({
          numberRoad: yup
            .string()
            .required(translate("numberRoadRequired", language)),
          country: yup
            .string()
            .required(translate("countryRequired", language)),
          email: yup.string().email(translate("validEmail", language)),
          tempEmail: yup.string().email(translate("validEmail", language)),
          startDate: yup
            .date()
            .nullable()
            .min(new Date("01/01/1900"), translate("invalidDate", language))
            .max(new Date("12/31/2050"), translate("invalidDate", language))
            .typeError(translate("invalidDate", language)),
          endDate: yup
            .date()
            .nullable()
            .min(new Date("01/01/1900"), translate("invalidDate", language))
            .max(new Date("12/31/2050"), translate("invalidDate", language))
            .typeError(translate("invalidDate", language)),
        })}
        onSubmit={(values: any) => {
          const permanentAddress = {
            patId: patientId,
            addId: patientAddress?.permanentAddress?.addId,
            addAddress1: values?.numberRoad,
            addAddress2: values?.town ? values?.town : null,
            addAddress3: values?.district ? values?.district : null,
            addAddress4: values?.county ? values?.county : null,
            addAddress5: values?.postcode ? values?.postcode : null,
            addAddress6: values?.country,
            addPhone: values?.phone ? values?.phone : null,
            addEmail: values?.email ? values?.email : null,
            addFax: values?.fax ? values?.fax : null,
            addWorkPhone: values?.workPhone ? values?.workPhone : null,
            addBillingAddress: selectedValue === "p" ? 1 : 0,
            addReportingRegion: null,
            addLsao: values?.lSOA ? values?.lSOA : null,
            addPostcodeNospaces: values?.postcode ? values?.postcode : null,
            addIsoCountryCode: values?.iSOCountryCode
              ? values?.iSOCountryCode
              : null,
            addIcaoCountryCode: values?.iCAOCountryCode
              ? values?.iCAOCountryCode
              : null,
            addMobile: null,
            addPatId: patientId,
            addTempPermanent: "P",
            addReportingDistrict: null,
            addHealthRegionEliId: values?.healthRegion
              ? values?.healthRegion
              : null,
            addLocationZoneEliId: values?.locationZone
              ? values?.locationZone
              : null,
            addNotes: values?.notes ? values?.notes : "",
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
            updatePatientAddress({
              permanentAddress,
              temporaryAddress: {
                patId: patientId,
                addId: patientAddress?.temporaryAddress?.addId,
                addAddress1: values?.tempNumberRoad
                  ? values?.tempNumberRoad
                  : null,
                addAddress2: values?.tempTown ? values?.tempTown : null,
                addAddress3: values?.tempDistrict ? values?.tempDistrict : null,
                addAddress4: values?.tempCounty ? values?.tempCounty : null,
                addAddress5: values?.tempPostcode ? values?.tempPostcode : null,
                addAddress6: values?.tempCountry ? values?.tempCountry : null,
                addPhone: values?.tempPhone ? values?.tempPhone : null,
                addEmail: values?.tempEmail ? values?.tempEmail : null,
                addFax: values?.tempFax ? values?.tempFax : null,
                addLocale: values?.tempLocationZone
                  ? values?.tempLocationZone
                  : null,
                addWorkPhone: values?.tempWorkPhone
                  ? values?.tempWorkPhone
                  : null,
                addBillingAddress: selectedValue === "t" ? 1 : 0,
                addReportingRegion: null,
                addIsoCountryCode: values?.tempISOCountryCode
                  ? values?.tempISOCountryCode
                  : null,
                addIcaoCountryCode: values?.tempICAOCountryCode
                  ? values?.tempICAOCountryCode
                  : null,
                addLsao: values?.tempLSOA ? values?.tempLSOA : null,
                addPostcodeNospaces: values?.tempPostcode
                  ? values?.tempPostcode
                  : null,
                addMobile: null,
                addPatId: patientId,
                addTempPermanent: "T",
                addHealthRegionEliId: values?.tempHealthRegion
                  ? values?.tempHealthRegion
                  : null,
                addLocationZoneEliId: values?.tempLocationZone
                  ? values?.tempLocationZone
                  : null,
                addNotes: values?.tempNotes ? values?.tempNotes : "",
                addTempPermanentStartDate: values?.startDate
                  ? moment(values?.startDate).format("DD-MM-YYYY")
                  : null,
                addTempPermanentEndDate: values?.endDate
                  ? moment(values?.endDate).format("DD-MM-YYYY")
                  : null,
              },
            });
          } else {
            updatePatientAddress({ permanentAddress });
          }
        }}
      >
        {(data: FormikProps<any>) => {
          return (
            <form onSubmit={data.handleSubmit} noValidate>
              <Grid container>
                <Grid item xs={12}>
                  <Typography
                    sx={{ mt: "5px", ml: "4px", mb: "20px" }}
                    variant="subtitle1"
                    align="left"
                    gutterBottom
                  >
                    {translate("permanentAddress", language)}
                  </Typography>
                </Grid>
                <Grid item container spacing={3} columnSpacing={8}>
                  <Grid item xs={2.4}>
                    <Common.CellmaInputField
                      label={translate("number&Road", language)}
                      defaultValue="AGW12"
                      required
                      name="numberRoad"
                      value={data.values.numberRoad}
                      onHandleChange={data.handleChange}
                      onBlur={data.handleBlur}
                      onKeyPress={validations.restrictSpaceAtStart}
                      maxLength="255"
                      errorText={
                        data.touched.numberRoad && data.errors.numberRoad
                      }
                    />
                  </Grid>
                  <Grid item xs={2.4}>
                    <Common.CellmaInputField
                      label={translate("district", language)}
                      defaultValue="Pune"
                      name="district"
                      value={data.values.district}
                      onHandleChange={data.handleChange}
                      maxLength="255"
                    />
                  </Grid>
                  <Grid item xs={2.4}>
                    <Common.CellmaInputField
                      label={translate("town", language)}
                      defaultValue="Pune"
                      name="town"
                      value={data.values.town}
                      onHandleChange={data.handleChange}
                      maxLength="255"
                    />
                  </Grid>
                  <Grid item xs={2.4}>
                    <Common.CellmaInputField
                      label={translate("county", language)}
                      name="county"
                      value={data.values.county}
                      onHandleChange={data.handleChange}
                      maxLength="255"
                    />
                  </Grid>
                  <Grid item xs={2.4}>
                    <Common.CellmaInputField
                      label={translate("postcode", language)}
                      defaultValue="41102B"
                      name="postcode"
                      value={data.values.postcode}
                      onHandleChange={data.handleChange}
                      maxLength="20"
                      style={{ textTransform: "uppercase" }}
                      onKeyPress={validations.allowDigitCharacterSpace}
                    />
                    <Grid item xs={12} sx={styles.FindPostCodeButton}>
                      <Common.CellmaButton
                        label={translate("findPostcode", language)}
                        minWidth="40px"
                        onClick={() => {
                          setPostCodePopupPermanentAddress(true);
                          setPostcodeType("postcodeSearch");
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={2.4}>
                    <Common.CellmaSelectField
                      label={translate("country", language)}
                      name="country"
                      required
                      value={data.values.country}
                      changeevent={data.handleChange}
                      onBlur={data.handleBlur}
                      error={data.touched.country && data.errors.country}
                      list={country.map((country: any) => (
                        <MenuItem
                          key={country.couId}
                          value={country.couCountry}
                          sx={{ whiteSpace: "unset" }}
                        >
                          {country.couCountry}
                        </MenuItem>
                      ))}
                    />
                  </Grid>

                  <Grid item xs={2.4}>
                    <Common.CellmaInputField
                      label={translate("iSOCountryCode", language)}
                      defaultValue="547551"
                      name="iSOCountryCode"
                      value={data.values.iSOCountryCode}
                      onHandleChange={data.handleChange}
                      maxLength="10"
                    />
                  </Grid>
                  <Grid item xs={2.4}>
                    <Common.CellmaInputField
                      label={translate("iCAOCountryCode", language)}
                      name="iCAOCountryCode"
                      value={data.values.iCAOCountryCode}
                      onHandleChange={data.handleChange}
                      maxLength="10"
                    />
                  </Grid>
                  <Grid item xs={2.4}>
                    <Common.CellmaInputField
                      label={translate("phone", language)}
                      value={data.values.phone}
                      name="phone"
                      onHandleChange={data.handleChange}
                      maxLength="255"
                      onKeyPress={
                        validations.restrictAlphabetsAndSpecialCharacters
                      }
                    />
                  </Grid>
                  <Grid item xs={2.4}>
                    <Common.CellmaInputField
                      label={translate("email", language)}
                      name="email"
                      value={data.values.email}
                      onHandleChange={data.handleChange}
                      onBlur={data.handleBlur}
                      maxLength="255"
                      errorText={data.touched.email && data.errors.email}
                    />
                  </Grid>
                  <Grid item xs={2.4}>
                    <Common.CellmaInputField
                      label={translate("workPhone", language)}
                      name="workPhone"
                      value={data.values.workPhone}
                      onHandleChange={data.handleChange}
                      maxLength="255"
                    />
                  </Grid>
                  <Grid item xs={2.4} sx={styles.postCodeInput}>
                    <Common.CellmaInputField
                      label={translate("fax", language)}
                      name="fax"
                      value={data.values.fax}
                      onHandleChange={data.handleChange}
                      maxLength="255"
                    />
                  </Grid>
                  <Grid item xs={2.4}>
                    <Common.CellmaSelectField
                      label={translate("healthRegion", language)}
                      name="healthRegion"
                      value={data.values.healthRegion}
                      changeevent={data.handleChange}
                      list={establishmentListItem?.["health region"].map(
                        (healthRegion: any) => (
                          <MenuItem
                            sx={{ whiteSpace: "unset" }}
                            key={healthRegion.eliId}
                            value={healthRegion.eliId}
                          >
                            {healthRegion.eliText}
                          </MenuItem>
                        )
                      )}
                    />
                  </Grid>
                  <Grid item xs={2.4}>
                    <Common.CellmaSelectField
                      label={translate("locationZone", language)}
                      name="locationZone"
                      value={data.values.locationZone}
                      changeevent={data.handleChange}
                      list={establishmentListItem?.["location zone"].map(
                        (location: any) => (
                          <MenuItem key={location.eliId} value={location.eliId}>
                            {location.eliText}
                          </MenuItem>
                        )
                      )}
                    />
                  </Grid>
                  <Grid item xs={2.4}>
                    <Common.CellmaInputField
                      label={translate("lSOA", language)}
                      defaultValue="E01022705"
                      disabled
                      name="lSOA"
                      value={data.values.lSOA}
                      onHandleChange={data.handleChange}
                      onBlur={data.handleBlur}
                      maxLength="30"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Common.CellmaButton
                      label={translate("add/viewNotes", language)}
                      onClick={() => setNotesPopup("permanentAddress")}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={2.4}>
                  <FormControlLabel
                    aria-label="radio"
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      color: "grey.600",
                      alignItems: "center",
                      m: "0px",
                    }}
                    name={translate("billing/Correspondence", language)}
                    control={
                      <Radio
                        checked={selectedValue === "p"}
                        onChange={handleChange}
                        value="p"
                        name="billingCorrespondence"
                        inputProps={{ "aria-label": "A" }}
                        sx={{ ml: "15px" }}
                      />
                    }
                    label={translate("billing/Correspondence", language)}
                    labelPlacement="start"
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ mt: "10px" }} />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  sx={{ mb: "30px" }}
                  variant="subtitle1"
                  align="left"
                  gutterBottom
                >
                  {translate("temporaryAddress", language)}
                </Typography>
              </Grid>
              <Grid item container spacing={3} columnSpacing={8}>
                <Grid item xs={2.4}>
                  <Common.CellmaInputField
                    label={translate("number&Road", language)}
                    name="tempNumberRoad"
                    value={data.values.tempNumberRoad}
                    onHandleChange={data.handleChange}
                    maxLength="255"
                  />
                </Grid>
                <Grid item xs={2.4}>
                  <Common.CellmaInputField
                    label={translate("district", language)}
                    name="tempDistrict"
                    value={data.values.tempDistrict}
                    onHandleChange={data.handleChange}
                    maxLength="255"
                  />
                </Grid>
                <Grid item xs={2.4}>
                  <Common.CellmaInputField
                    label={translate("town", language)}
                    name="tempTown"
                    value={data.values.tempTown}
                    onHandleChange={data.handleChange}
                    maxLength="255"
                  />
                </Grid>
                <Grid item xs={2.4}>
                  <Common.CellmaInputField
                    label={translate("county", language)}
                    name="tempCounty"
                    value={data.values.tempCounty}
                    onHandleChange={data.handleChange}
                    maxLength="255"
                  />
                </Grid>
                <Grid item xs={2.4}>
                  <Common.CellmaInputField
                    label={translate("postcode", language)}
                    name="tempPostcode"
                    value={data.values.tempPostcode}
                    onHandleChange={data.handleChange}
                    maxLength="20"
                    style={{ textTransform: "uppercase" }}
                    onKeyPress={validations.allowDigitCharacterSpace}
                  />
                  <Grid item xs={12} sx={styles.FindPostCodeButton}>
                    <Common.CellmaButton
                      label={translate("findPostcode", language)}
                      minWidth="40px"
                      onClick={() => {
                        setPostCodePopupTemporaryAddress(true);
                        setPostcodeType("postcodeSearchTemp");
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={2.4}>
                  <Common.CellmaSelectField
                    label={translate("country", language)}
                    name="tempCountry"
                    value={data.values.tempCountry}
                    changeevent={data.handleChange}
                    list={country.map((country: any) => (
                      <MenuItem
                        key={country.couId}
                        value={country.couCountry}
                        sx={{ whiteSpace: "unset" }}
                      >
                        {country.couCountry}
                      </MenuItem>
                    ))}
                  />
                </Grid>
                <Grid item xs={2.4}>
                  <Common.CellmaInputField
                    label={translate("iSOCountryCode", language)}
                    defaultValue="547551"
                    name="tempISOCountryCode"
                    value={data.values.tempISOCountryCode}
                    onHandleChange={data.handleChange}
                    maxLength="10"
                  />
                </Grid>
                <Grid item xs={2.4}>
                  <Common.CellmaInputField
                    label={translate("iCAOCountryCode", language)}
                    name="tempICAOCountryCode"
                    value={data.values.tempICAOCountryCode}
                    onHandleChange={data.handleChange}
                    maxLength="10"
                  />
                </Grid>
                <Grid item xs={2.4}>
                  <Common.CellmaInputField
                    label={translate("phone", language)}
                    name="tempPhone"
                    value={data.values.tempPhone}
                    onHandleChange={data.handleChange}
                    onBlur={data.handleBlur}
                    maxLength="255"
                    onKeyPress={
                      validations.restrictAlphabetsAndSpecialCharacters
                    }
                  />
                </Grid>
                <Grid item xs={2.4}>
                  <Common.CellmaInputField
                    label={translate("email", language)}
                    name="tempEmail"
                    value={data.values.tempEmail}
                    onHandleChange={data.handleChange}
                    onBlur={data.handleBlur}
                    maxLength="255"
                    errorText={data.touched.tempEmail && data.errors.tempEmail}
                  />
                </Grid>
                <Grid item xs={2.4}>
                  <Common.CellmaInputField
                    label={translate("workPhone", language)}
                    name="tempWorkPhone"
                    value={data.values.tempWorkPhone}
                    onHandleChange={data.handleChange}
                    maxLength="255"
                  />
                </Grid>
                <Grid item xs={2.4} sx={styles.postCodeInput}>
                  <Common.CellmaInputField
                    label={translate("fax", language)}
                    name="tempFax"
                    value={data.values.tempFax}
                    onHandleChange={data.handleChange}
                    maxLength="255"
                  />
                </Grid>
                <Grid item xs={2.4}>
                  <Common.CellmaSelectField
                    label={translate("healthRegion", language)}
                    name="tempHealthRegion"
                    value={data.values.tempHealthRegion}
                    changeevent={data.handleChange}
                    list={establishmentListItem?.["health region"].map(
                      (healthRegion: any) => (
                        <MenuItem
                          sx={{ whiteSpace: "unset" }}
                          key={healthRegion.eliId}
                          value={healthRegion.eliId}
                        >
                          {healthRegion.eliText}
                        </MenuItem>
                      )
                    )}
                  />
                </Grid>
                <Grid item xs={2.4}>
                  <Common.CellmaSelectField
                    label={translate("locationZone", language)}
                    name="tempLocationZone"
                    value={data.values.tempLocationZone}
                    changeevent={data.handleChange}
                    list={establishmentListItem?.["location zone"].map(
                      (location: any) => (
                        <MenuItem key={location.eliId} value={location.eliId}>
                          {location.eliText}
                        </MenuItem>
                      )
                    )}
                  />
                </Grid>
                <Grid item xs={2.4}>
                  <Common.CellmaInputField
                    label={translate("lSOA", language)}
                    defaultValue="E01022705"
                    disabled
                    name="tempLSOA"
                    value={data.values.tempLSOA}
                    onHandleChange={data.handleChange}
                    maxLength="30"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Common.CellmaButton
                    label={translate("add/viewNotes", language)}
                    onClick={() => setNotesPopup("temporaryAddress")}
                  />
                </Grid>

                <Grid item xs={2.4}>
                  <FormControlLabel
                    aria-label="radio"
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      color: "grey.600",
                      alignItems: "center",
                      m: "0px",
                    }}
                    name={translate("billing/Correspondence", language)}
                    control={
                      <Radio
                        checked={selectedValue === "t"}
                        onChange={handleChange}
                        value="t"
                        name="billingCorrespondence"
                        inputProps={{ "aria-label": "A" }}
                      />
                    }
                    label={translate("billing/Correspondence", language)}
                    labelPlacement="start"
                  />
                </Grid>
                <Grid item xs={2.4}>
                  <Common.CellmaDatePicker
                    label={translate("startDate", language)}
                    name="startDate"
                    maxDate={new Date("12/31/2050")}
                    value={data.values.startDate}
                    onChange={(newDate: Date | null) => {
                      data.setFieldValue("startDate", newDate);
                    }}
                    onBlur={data.handleBlur}
                    error={data.touched.startDate && data.errors.startDate}
                  />
                </Grid>
                <Grid item xs={2.4}>
                  <Common.CellmaDatePicker
                    label={translate("endDate", language)}
                    name="endDate"
                    maxDate={new Date("12/31/2050")}
                    value={data.values.endDate}
                    onChange={(newDate: Date | null) => {
                      data.setFieldValue("endDate", newDate);
                    }}
                    onBlur={data.handleBlur}
                    error={data.touched.endDate && data.errors.endDate}
                  />
                </Grid>
              </Grid>
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
                        <Grid item xs={7}>
                          <CellmaPostCodeSearch
                            data={data}
                            type={postcodeType}
                            country={country}
                          />
                        </Grid>
                        <Grid item xs={7}>
                          <Common.CellmaInputField
                            label={translate("district", language)}
                            name="district"
                            value={data.values.district}
                            onHandleChange={data.handleChange}
                          />
                        </Grid>
                        <Grid item xs={7}>
                          <Common.CellmaInputField
                            label={translate("town", language)}
                            name="town"
                            value={data.values.town}
                            onHandleChange={data.handleChange}
                          />
                        </Grid>
                        <Grid item xs={7}>
                          <Common.CellmaInputField
                            label={translate("county", language)}
                            name="county"
                            value={data.values.county}
                            onHandleChange={data.handleChange}
                          />
                        </Grid>
                        <Grid item xs={7}>
                          <Common.CellmaInputField
                            label={translate("postcode", language)}
                            name="postcode"
                            value={data.values.postcode}
                            onHandleChange={data.handleChange}
                            maxLength="20"
                            style={{ textTransform: "uppercase" }}
                            onKeyPress={validations.allowDigitCharacterSpace}
                            onPaste={validations.restrictCutCopyPaste}
                          />
                        </Grid>
                        <Grid item xs={7}>
                          <Common.CellmaInputField
                            label={translate("country", language)}
                            name="country"
                            value={data.values.country}
                            onHandleChange={data.handleChange}
                          />
                        </Grid>
                        <Grid item xs={10} sx={styles.popupButtonGrid}>
                          <Common.CellmaButton
                            onClick={() => {
                              setPopupContent("enterPostcode");
                              setPostCodePopupPermanentAddress(false);
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
                        <Grid item xs={7}>
                          <CellmaPostCodeSearch
                            data={data}
                            type={postcodeType}
                            country={country}
                          />
                        </Grid>
                        <Grid item xs={7}>
                          <Common.CellmaInputField
                            label={translate("district", language)}
                            name="tempDistrict"
                            value={data.values.tempDistrict}
                            onHandleChange={data.handleChange}
                          />
                        </Grid>
                        <Grid item xs={7}>
                          <Common.CellmaInputField
                            label={translate("town", language)}
                            name="tempTown"
                            value={data.values.tempTown}
                            onHandleChange={data.handleChange}
                          />
                        </Grid>
                        <Grid item xs={7}>
                          <Common.CellmaInputField
                            label={translate("county", language)}
                            name="tempCounty"
                            value={data.values.tempCounty}
                            onHandleChange={data.handleChange}
                          />
                        </Grid>
                        <Grid item xs={7}>
                          <Common.CellmaInputField
                            label={translate("postcode", language)}
                            name="tempPostcode"
                            value={data.values.tempPostcode}
                            onHandleChange={data.handleChange}
                            maxLength="20"
                            style={{ textTransform: "uppercase" }}
                            onKeyPress={validations.allowDigitCharacterSpace}
                            onPaste={validations.restrictCutCopyPaste}
                          />
                        </Grid>
                        <Grid item xs={7}>
                          <Common.CellmaInputField
                            label={translate("country", language)}
                            name="tempCountry"
                            value={data.values.tempCountry}
                            onHandleChange={data.handleChange}
                          />
                        </Grid>
                        <Grid item xs={10} sx={styles.popupButtonGrid}>
                          <Common.CellmaButton
                            onClick={() => {
                              setPopupContent("enterPostcode");
                              setPostCodePopupTemporaryAddress(false);
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
                          value={data.values.notes}
                          onHandleChange={data.handleChange}
                          onBlur={data.handleBlur}
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
                          value={data.values.tempNotes}
                          onHandleChange={data.handleChange}
                          onBlur={data.handleBlur}
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
                  mt: "30px",
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
            </form>
          );
        }}
      </Formik>
    </>
  );
};

export default PatientAddress;

const styles = {
  popupContentGrid: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginY: "10px",
  },

  popupButtonGrid: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
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
};

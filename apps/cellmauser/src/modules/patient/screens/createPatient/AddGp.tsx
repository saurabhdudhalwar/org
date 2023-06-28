// Page Name : "addPIP"
// Page Id : "c4pat7"

import { useEffect, useState } from "react";

import { Backdrop, CircularProgress, Divider, MenuItem } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { FormikProps, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

import useCountriesLists from "../../../../api/useCountriesList";
import CellmaDistrictSearch from "../../../../common/CellmaDistrictSearch";
import CellmaPostCodeSearch from "../../../../common/CellmaPostCodeSearch";
import * as Common from "../../../../common/CommonComponentsIndex";
import responseCodeMessages from "../../../../config/ResponseCodeMessages";
import { setSnackbar } from "../../../../store/SnackbarAction";
import {
  isError,
  setAddressForUnknownSelect,
} from "../../../../utils/GeneralUtils";
import dispatchSnackbar from "../../../../utils/ResponseCodeHandler";
import * as validations from "../../../../utils/Validations";
import {
  useAddGP,
  useGetGpDetails,
  useUpdateGpDetails,
} from "../../api/usePatientGp";
import { UNKNOW_NOFIXEDABODE_OR_OVERSEASVISITOR } from "../../assets/dummyData/CreatePatientDummyData";
import translate from "../../assets/translationFiles/createPatientTranslation";
import { setIsShowGpFullName } from "../../store/PatientAction";

const GridItem = (props: any) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      {props.children}
    </Grid>
  );
};

interface Props {
  handleStep?: any; // correct ?
  handler?: any; // correct ?
  handleCancel?: any; // correct ?
  mode?: any;
  egpId?: any;
}

const AddGp: React.FC<Props> = (props) => {
  const { language } = useSelector((state: any) => state.language);
  const { estPatientPostcodeMandatory } = useSelector(
    (state: any) => state.auth
  );

  const [disabled, setDisabled] = useState(true);

  const { data: country, isLoading: countryIsLoading } = useCountriesLists();

  const dispatch = useDispatch();
  const { data, isLoading: gpDetailsIsLoading } = useGetGpDetails(
    { egpId: props?.egpId },
    props?.mode
  );
  const { mutate: updateGpDetails } = useUpdateGpDetails();

  const { mutate: addGp } = useAddGP();
  useEffect(() => {
    window.scrollTo(0, 0);
    gpDetailsForm?.validateForm(gpDetailsForm?.values);
  }, [language]);

  const gpDetailsForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: data?.gpInformation?.egpTitle ?? "",
      initial: data?.gpInformation?.egpInitials ?? "",
      givenName: data?.gpInformation?.egpFirstName ?? "",
      familyName: data?.gpInformation?.egpSurname ?? "",
      gpCode: data?.gpInformation?.egpGpCode ?? "",
      practiceCode: data?.gpInformation?.egpPractiseCode ?? "",
      ccg: data?.gpInformation?.egpCcg ?? "",
      gmcCode: data?.gpInformation?.egpGmcCode ?? "",
      show: true,
      postcodeSearch: "",
      unknownNoFixedAbodeorOverseasVisitor: "pleaseSelect",
      districtSearch: "",
      numberRoad: data?.gpAddress?.addAddress1 ?? "",
      town: data?.gpAddress?.addAddress2 ?? "",
      district: data?.gpAddress?.addAddress3 ?? "",
      county: data?.gpAddress?.addAddress4 ?? "",
      postcode: data?.gpAddress?.addAddress5 ?? "",
      country: data?.gpAddress?.addAddress6 ?? "",
      gpPhone: data?.gpAddress?.addPhone ?? "",
      fax: data?.gpAddress?.addFax ?? "",
      workPhone: data?.gpAddress?.addWorkPhone ?? "",
      mobile: data?.gpAddress?.addMobile ?? "",
      email: data?.gpAddress?.addEmail ?? "",
    },
    validationSchema: yup.object().shape({
      email: yup.string().email(translate("validEmailMsg", language)),
      familyName: yup
        .string()
        .required(translate("familyNameRequired", language)),
      numberRoad: yup
        .string()
        .required(translate("number&RoadRequired", language)),
      country: yup.string().required(translate("countryRequired", language)),
      gpCode: yup.string().required(translate("gpCodeRequired", language)),
      postcode: yup.string().when([], {
        is: () => estPatientPostcodeMandatory === 1,
        then: yup.string().required(translate("postcodeRequired", language)),
        otherwise: yup.string().notRequired(),
      }),
    }),
    onSubmit: (values: any) => {
      if (
        props?.mode === "editPatient" &&
        data?.gpInformation?.egpId !== undefined
      ) {
        updateGpDetails(
          {
            egpId: data?.gpInformation?.egpId,
            egpAddId: data?.gpInformation?.egpAddId,
            egpTitle: values?.title,
            egpInitials: values?.initial,
            egpFirstName: values?.givenName,
            egpSurname: values?.familyName,
            egpGpCode: values?.gpCode,
            egpShow: values?.show === true ? 1 : 0,
            egpPractiseCode: values?.practiceCode,
            egpCcg: values?.ccg,
            egpGmcCode: values?.gmcCode,
            establishmentGpAddressRequestJson: {
              addId: data?.gpInformation?.egpAddId,
              addAddress1: values?.numberRoad,
              addAddress2: values?.town,
              addAddress3: values?.district,
              addAddress4: values?.county,
              addAddress5: values?.postcode,
              addAddress6: values?.country,
              addPhone: values?.gpPhone,
              addMobile: values?.mobile,
              addEmail: values?.email,
              addFax: values?.fax,
              addWorkPhone: values?.workPhone,
            },
          },
          {
            onSuccess: (response: any) => {
              if (response?.status === 200) {
                if (
                  response?.data?.validationCode ===
                  "establishmentgp.update.success"
                ) {
                  dispatch(
                    setSnackbar(
                      true,
                      "success",
                      translate(
                        responseCodeMessages["establishmentgp.update.success"]
                          .messageTranslationKey,
                        language
                      ),
                      4
                    )
                  );
                  //   props?.handler();
                } else if (
                  response?.data?.validationCode ===
                  "establishmentgp.update.fail"
                ) {
                  dispatch(
                    setSnackbar(
                      true,
                      "warning",
                      translate(
                        responseCodeMessages["establishmentgp.update.fail"]
                          .messageTranslationKey,
                        language
                      ),
                      4
                    )
                  );
                }
                //   props?.handler();
              }
            },
          }
        );
      } else {
        addGp(
          {
            egpTitle: values?.title,
            egpInitials: values?.initial,
            egpFirstName: values?.givenName,
            egpSurname: values?.familyName,
            egpGpCode: values?.gpCode,
            egpShow: values?.show === true ? 1 : 0,
            egpPractiseCode: values?.practiceCode,
            egpCcg: values?.ccg,
            egpGmcCode: values?.gmcCode,
            establishmentGpAddressRequestJson: {
              addId: data?.gpInformation?.egpAddId,
              addAddress1: values?.numberRoad,
              addAddress2: values?.town,
              addAddress3: values?.district,
              addAddress4: values?.county,
              addAddress5: values?.postcode,
              addAddress6: values?.country,
              addPhone: values?.gpPhone,
              addMobile: values?.mobile,
              addEmail: values?.email,
              addFax: values?.fax,
              addWorkPhone: values?.workPhone,
            },
          },
          {
            onSuccess: (response: any) => {
              const responseCode = response?.data?.validationCode;

              if (response.status === 200) {
                if (responseCode === "establishmentgp.add.success") {
                  dispatch(
                    setIsShowGpFullName(
                      response?.data?.settings?.showGPFullnameList === 1
                    )
                  );
                  if (response?.data?.entity.length !== 0)
                    props?.handler(response?.data?.entity);
                }
              }
              dispatchSnackbar(response, dispatch, language);
            },
          }
        );
      }
    },
  });

  const postCodeFormatHandler = (event: any, data: FormikProps<any>) => {
    let postcodeValue = event.target.value;
    if (
      postcodeValue !== null &&
      postcodeValue !== "" &&
      postcodeValue.length > 4
    ) {
      postcodeValue = postcodeValue.replace(" ", "");
      const postcode = `${postcodeValue.substring(
        0,
        4
      )} ${postcodeValue.substring(4)}`;
      postcodeValue = postcode;
    }
    gpDetailsForm.setFieldValue("postcode", postcodeValue);
  };

  return (
    <>
      {(gpDetailsIsLoading || countryIsLoading) && (
        <Backdrop sx={{ zIndex: "1500" }} open>
          <CircularProgress />
        </Backdrop>
      )}

      <form onSubmit={gpDetailsForm.handleSubmit} noValidate>
        <Grid container sx={styles.mainGridContainer}>
          <Grid container item xs={11} rowSpacing={4} columnSpacing={6}>
            <Grid item xs={12}>
              <Typography variant="h2" gutterBottom>
                {translate("addGpDetails", language)}
              </Typography>
              <Divider />
            </Grid>
            <GridItem>
              <Common.CellmaInputField
                label={translate("title", language)}
                name="title"
                maxLength="10"
                value={gpDetailsForm.values.title}
                onHandleChange={gpDetailsForm.handleChange}
                onBlur={gpDetailsForm.handleBlur}
              />
            </GridItem>
            <GridItem>
              <Common.CellmaInputField
                label={translate("initial", language)}
                name="initial"
                maxLength="6"
                value={gpDetailsForm.values.initial}
                onHandleChange={gpDetailsForm.handleChange}
                onBlur={gpDetailsForm.handleBlur}
              />
            </GridItem>
            <GridItem>
              <Common.CellmaInputField
                label={translate("givenName", language)}
                name="givenName"
                value={gpDetailsForm.values.givenName}
                style={{ textTransform: "capitalize" }}
                onHandleChange={gpDetailsForm.handleChange}
                onBlur={gpDetailsForm.handleBlur}
                onKeyPress={validations.allowCharHyphenApostropheSpace}
                onPaste={
                  validations.restrictPasteEventForSpecialCharactersAndNumbers
                }
              />
            </GridItem>
            <GridItem>
              <Common.CellmaInputField
                required
                label={translate("familyName", language)}
                name="familyName"
                maxLength="100"
                value={gpDetailsForm.values.familyName}
                style={{ textTransform: "capitalize" }}
                onHandleChange={gpDetailsForm.handleChange}
                onBlur={gpDetailsForm.handleBlur}
                onKeyPress={validations.allowCharHyphenApostropheSpace}
                errorText={
                  gpDetailsForm.touched.familyName &&
                  gpDetailsForm.errors.familyName
                }
                onPaste={
                  validations.restrictPasteEventForSpecialCharactersAndNumbers
                }
              />
            </GridItem>
            <GridItem>
              <Common.CellmaInputField
                label={translate("gpCode", language)}
                name="gpCode"
                required
                value={gpDetailsForm.values.gpCode}
                onHandleChange={gpDetailsForm.handleChange}
                onBlur={gpDetailsForm.handleBlur}
                errorText={isError(gpDetailsForm, "gpCode")}
              />
            </GridItem>
            <GridItem>
              <Common.CellmaInputField
                label={translate("practiceCode", language)}
                name="practiceCode"
                value={gpDetailsForm.values.practiceCode}
                onHandleChange={gpDetailsForm.handleChange}
                onBlur={gpDetailsForm.handleBlur}
              />
            </GridItem>
            <GridItem>
              <Common.CellmaInputField
                label={translate("gmcCode", language)}
                name="gmcCode"
                value={gpDetailsForm.values.gmcCode}
                onHandleChange={gpDetailsForm.handleChange}
                onBlur={gpDetailsForm.handleBlur}
              />
            </GridItem>
            <GridItem>
              <Common.CellmaCheckbox
                label={translate("show", language)}
                inputName="show"
                value={gpDetailsForm.values.show}
                onHandleChange={gpDetailsForm.handleChange}
                onBlur={gpDetailsForm.handleBlur}
                defaultChecked
              />
            </GridItem>
            <Grid item xs={12}>
              <Typography variant="h2" gutterBottom>
                {translate("addLocalGp", language)}
              </Typography>
              <Divider />
            </Grid>
            <GridItem>
              <CellmaPostCodeSearch
                data={gpDetailsForm}
                textTransform="uppercase"
                type="postcodeSearch"
                onKeyPress={validations.allowDigitCharacterSpace}
                onPaste={validations.restrictPasteEventForSpecialCharacters}
              />
            </GridItem>
            <GridItem>
              <Common.CellmaSelectField
                label={translate(
                  "unknown,NoFixedAbode,orOverseasVisitor",
                  language
                )}
                name="unknownNoFixedAbodeorOverseasVisitor"
                value={
                  gpDetailsForm.values.unknownNoFixedAbodeorOverseasVisitor
                }
                changeevent={(event: any) => {
                  setAddressForUnknownSelect(event, gpDetailsForm, setDisabled);
                }}
                onBlur={gpDetailsForm.handleBlur}
                list={UNKNOW_NOFIXEDABODE_OR_OVERSEASVISITOR.map(
                  (patientWeb: any) => (
                    <MenuItem
                      key={patientWeb.id}
                      value={patientWeb.label}
                      sx={{ whiteSpace: "unset" }}
                    >
                      {translate(`${patientWeb.label}`, language)}
                    </MenuItem>
                  )
                )}
              />
            </GridItem>

            <Grid item xs={12}>
              <Typography variant="h2" gutterBottom>
                {translate("gpAddressDetails", language)}
              </Typography>
              <Grid item xs={12}>
                <Divider />
              </Grid>
            </Grid>
            <Grid container item xs={12} columnSpacing={6}>
              <GridItem>
                <CellmaDistrictSearch data={gpDetailsForm} />
              </GridItem>
            </Grid>

            <GridItem>
              <Common.CellmaInputField
                required
                label={translate("number&Road", language)}
                name="numberRoad"
                value={gpDetailsForm.values.numberRoad}
                onHandleChange={gpDetailsForm.handleChange}
                onBlur={gpDetailsForm.handleBlur}
                disabled={
                  gpDetailsForm.values.unknownNoFixedAbodeorOverseasVisitor !==
                  "pleaseSelect"
                }
                errorText={
                  gpDetailsForm.touched.numberRoad &&
                  gpDetailsForm.errors.numberRoad
                }
              />
            </GridItem>
            <GridItem>
              <Common.CellmaInputField
                label={translate("district", language)}
                disabled={disabled}
                name="district"
                value={gpDetailsForm.values.district}
                onHandleChange={gpDetailsForm.handleChange}
                onBlur={gpDetailsForm.handleBlur}
              />
            </GridItem>
            <GridItem>
              <Common.CellmaInputField
                label={translate("town", language)}
                disabled={disabled}
                name="town"
                value={gpDetailsForm.values.town}
                onHandleChange={gpDetailsForm.handleChange}
                onBlur={gpDetailsForm.handleBlur}
              />
            </GridItem>

            <GridItem>
              <Common.CellmaInputField
                label={translate("county", language)}
                disabled={disabled}
                name="county"
                value={gpDetailsForm.values.county}
                onHandleChange={gpDetailsForm.handleChange}
                onBlur={gpDetailsForm.handleBlur}
              />
            </GridItem>
            <GridItem>
              <Common.CellmaInputField
                label={translate("postcode", language)}
                name="postcode"
                style={{ textTransform: "uppercase" }}
                disabled={
                  gpDetailsForm.values.unknownNoFixedAbodeorOverseasVisitor !==
                  "pleaseSelect"
                }
                required={estPatientPostcodeMandatory === 1}
                onKeyPress={validations.allowDigitCharacterSpace}
                value={gpDetailsForm.values.postcode}
                maxLength="20"
                onPaste={validations.restrictCutCopyPaste}
                onHandleChange={gpDetailsForm.handleChange}
                onBlur={(event: any) => {
                  gpDetailsForm.handleBlur(event);
                  postCodeFormatHandler(event, gpDetailsForm);
                }}
                errorText={isError(gpDetailsForm, "postcode")}
              />
            </GridItem>
            <GridItem>
              <Common.CellmaSelectField
                label={translate("country", language)}
                required
                disabled
                name="country"
                value={gpDetailsForm.values.country}
                changeevent={gpDetailsForm.handleChange}
                onBlur={gpDetailsForm.handleBlur}
                error={
                  gpDetailsForm.touched.country && gpDetailsForm.errors.country
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
              />
            </GridItem>

            <Grid item xs={12}>
              <Typography variant="h2" gutterBottom>
                {translate("gpContactDetails", language)}
              </Typography>
              <Divider />
            </Grid>
            <GridItem>
              <Common.CellmaInputField
                label={translate("gpPhone", language)}
                name="gpPhone"
                onKeyPress={validations.allowOnlyDigit}
                value={gpDetailsForm.values.gpPhone}
                onHandleChange={gpDetailsForm.handleChange}
                onBlur={gpDetailsForm.handleBlur}
                onPaste={
                  validations.restrictPasteEventForSpecialCharactersAndAlphabets
                }
              />
            </GridItem>
            <GridItem>
              <Common.CellmaInputField
                label={translate("fax", language)}
                name="fax"
                value={gpDetailsForm.values.fax}
                onHandleChange={gpDetailsForm.handleChange}
                onBlur={gpDetailsForm.handleBlur}
                onKeyPress={
                  validations.restrictSpecialCharacterExceptSingleQuote
                }
                onPaste={validations.restrictPasteEventForSpecialCharacters}
              />
            </GridItem>
            <GridItem>
              <Common.CellmaInputField
                label={translate("workPhone", language)}
                name="workPhone"
                onKeyPress={validations.allowOnlyDigit}
                value={gpDetailsForm.values.workPhone}
                onHandleChange={gpDetailsForm.handleChange}
                onBlur={gpDetailsForm.handleBlur}
                onPaste={
                  validations.restrictPasteEventForSpecialCharactersAndAlphabets
                }
              />
            </GridItem>
            <GridItem>
              <Common.CellmaInputField
                label={translate("mobile", language)}
                type="tel"
                name="mobile"
                value={gpDetailsForm.values.mobile}
                onHandleChange={gpDetailsForm.handleChange}
                onBlur={validations.checkMobileValidation}
                onKeyPress={validations.restrictAlphabetsAndSpecialCharacters}
                onPaste={validations.restrictPastingCharactersAndSpecialSymbols}
                onInput={(e: any) => {
                  e.target.value = e.target.value.toString().slice(0, 10);
                }}
              />
            </GridItem>
            <GridItem>
              <Common.CellmaInputField
                label={translate("email", language)}
                name="email"
                value={gpDetailsForm.values.email}
                onHandleChange={gpDetailsForm.handleChange}
                onBlur={gpDetailsForm.handleBlur}
                errorText={
                  gpDetailsForm.touched.email && gpDetailsForm.errors.email
                }
              />
            </GridItem>
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
                onClick={props?.handleCancel}
              />
              <Common.CellmaButton
                label={translate("save", language)}
                onClick={() => {
                  if (gpDetailsForm?.errors) {
                    window.scrollTo(0, 0);
                    gpDetailsForm.setFieldTouched("familyName", true, true);
                    gpDetailsForm.setFieldTouched("numberRoad", true, true);
                    gpDetailsForm.setFieldTouched("country", true, true);
                    gpDetailsForm.submitForm();
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

export default AddGp;

const styles = {
  mainGridContainer: {
    display: "flex",
    justifyContent: "center",
  },
  gpAddressDetailGridContainer: {
    marginTop: "10px",
    paddingX: "45px",
  },
};

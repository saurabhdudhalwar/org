// Page Name : "confirmPatientDetails"
// Page Id : "c4pat16"

import { useEffect, useState } from "react";

import { Backdrop, CircularProgress, Divider, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import * as yup from "yup";

import AdditionalDetails from "./AdditionalDetails";
import Address from "./Address";
import { Gp } from "./Gp";
import TemporaryAddress from "./TemporaryAddress";
import TemporaryContactDetails from "./TemporaryContactDetails";
import useEstablishmentListItems from "../../../../api/useEstablishmentListItems";
import * as Common from "../../../../common/CommonComponentsIndex";
import informationSnackbar from "../../../../utils/InformationCodeHandler";
import useAdditionalDetails from "../../api/useAdditionalDetails";
import useConfirmPatientDetails from "../../api/useConfirmPatientDetails";
import { usePatientGP } from "../../api/useGP";
import { useGetPatientExistingAddress } from "../../api/usePatientAddress";
import { useGetPatientDetails } from "../../api/usePatientDetails";
import translate from "../../assets/translationFiles/existingPatientDetailsTranslation";
import {
  setActiveScreenName,
  setIsContactTypeSelected,
} from "../../store/PatientAction";

export const GridItem = (props: any) => {
  return (
    <Grid item xs={12} sm={6} md={3}>
      {props.children}
    </Grid>
  );
};

const ExistingPatientDetailsTabs = (props: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { state } = useLocation();
  const { language } = useSelector((state: any) => state.language);
  const { estUseAddressLookup } = useSelector((state: any) => state.patient);
  const { patientId, sgrId, pipPatientId } = useSelector(
    (state: any) => state.patient
  );
  const { estPatientPostcodeMandatory } = useSelector(
    (state: any) => state.auth
  );

  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);
  const {
    data: establishmentListItem,
    isLoading: establishmentListItemLoading,
  } = useEstablishmentListItems(["title", "relationship"]);
  const { data: existingAddress, isLoading: existingAddressLoading } =
    useGetPatientExistingAddress(
      pipPatientId !== null ? pipPatientId : patientId
    );
  const { data: patientGp, isLoading: patientGpLoading } = usePatientGP(
    pipPatientId !== null ? pipPatientId : patientId
  );
  const { data: details, isLoading: additionalDetailsLoading } =
    useAdditionalDetails(pipPatientId !== null ? pipPatientId : patientId);
  const { data: patientDetails } = useGetPatientDetails(
    pipPatientId !== null ? pipPatientId : patientId
  );
  const patDetails = patientDetails?.patientDetails ?? "";

  const {
    mutate: confirmPatientDetails,
    isLoading: confirmPatientDetailsIsLoading,
  } = useConfirmPatientDetails();
  const { setTitle, setIsLink, setScreenName, setDrawerName } =
    useOutletContext() as any; // <-- access context value
  useEffect(() => {
    window.scrollTo(0, 0);
    setTitle(translate("patientDetails", language));
    setIsLink(true);
    setScreenName("");
    setDrawerName("MultiplePatientDrawer");
    dispatch(setActiveScreenName("DemographicScreen"));
    confirmPatientDetailsForm?.validateForm(confirmPatientDetailsForm?.values);
  }, [dispatch, language, setDrawerName, setIsLink, setScreenName, setTitle]);

  useEffect(() => {
    // if (props?.informationMessages) {
    //   informationSnackbar(props?.informationMessages, dispatch, language);
    // } else
    if (state !== undefined && state !== null && Array.isArray(state)) {
      informationSnackbar(state, dispatch, language);
    }
  }, [dispatch, language, props?.informationMessages, state]);

  const handleSaveButton = (isDisabled: any) => {
    setIsSaveButtonDisabled(isDisabled);
  };

  const confirmPatientDetailsForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      patNameOtherLang: "",
      patNeedInterpreterAtAppointments:
        details?.additionalDetails?.patNeedInterpreterAtAppointments === 1
          ? "1"
          : "0",
      addEmail: "",
      addMobile: "",
      addPhone: "",
      kinTitle: details?.nextOfKin?.pipTitle
        ? details?.nextOfKin?.pipTitle
        : "",
      kinFirstname: details?.nextOfKin?.pipFirstname
        ? details?.nextOfKin?.pipFirstname
        : "",
      kinSurname: details?.nextOfKin?.pipSurname
        ? details?.nextOfKin?.pipSurname
        : "",
      kinRelationship: details?.nextOfKin?.pipRelationship
        ? details?.nextOfKin?.pipRelationship
        : "",
      kinPhone: details?.nextOfKin?.addPhone
        ? details?.nextOfKin?.addPhone
        : "",
      kinEmail: details?.nextOfKin?.addEmail
        ? details?.nextOfKin?.addEmail
        : "",
      kinMobile: details?.nextOfKin?.addMobile
        ? details?.nextOfKin?.addMobile
        : "",
      postCodeSearch: "",
      addCompanyName: "",
      districtSearch: "",
      addAddress1: existingAddress?.permanentAddress?.addAddress1
        ? existingAddress?.permanentAddress?.addAddress1
        : "",
      district: existingAddress?.permanentAddress?.addAddress2
        ? existingAddress?.permanentAddress?.addAddress2
        : "",
      town: existingAddress?.permanentAddress?.addAddress3
        ? existingAddress?.permanentAddress?.addAddress3
        : "",
      county: existingAddress?.permanentAddress?.addAddress4
        ? existingAddress?.permanentAddress?.addAddress4
        : "",
      postcode: existingAddress?.permanentAddress?.addAddress5
        ? existingAddress?.permanentAddress?.addAddress5
        : "",
      country: existingAddress?.permanentAddress?.addAddress6
        ? existingAddress?.permanentAddress?.addAddress6
        : "",
      addHealthRegionEliId: existingAddress?.permanentAddress
        ?.addHealthRegionEliText
        ? existingAddress?.permanentAddress?.addHealthRegionEliText
        : "",
      egpTitle: "",
      egpInitials: "",
      egpSurname: "",
      egpFirstName: "",
      egpFullname: "",
      egpGpCode: "",
      egpAddPhone: patientGp?.gpAddress?.addPhone
        ? patientGp?.gpAddress?.addPhone
        : "",
      egpPctCode: patientGp?.gpInformation?.egpPractiseCode
        ? patientGp?.gpInformation?.egpPractiseCode
        : "",
      egpPctName: "",
      egpCcg: "",
      epgAddEmail: patientGp?.gpAddress?.addEmail
        ? patientGp?.gpAddress?.addEmail
        : "",
      tempAddressEmail: existingAddress?.temporaryAddress?.addEmail
        ? existingAddress?.temporaryAddress?.addEmail
        : "",
      tempAddressMobile: existingAddress?.temporaryAddress?.addMobile
        ? existingAddress?.temporaryAddress?.addMobile
        : "",
      tempAddressPhone: existingAddress?.temporaryAddress?.addPhone
        ? existingAddress?.temporaryAddress?.addPhone
        : "",
      tempAddressStartDate: existingAddress?.temporaryAddress
        ?.addTempPermanentStartDate
        ? existingAddress?.temporaryAddress?.addTempPermanentStartDate
        : null,
      tempAddressEndDate: existingAddress?.temporaryAddress
        ?.addTempPermanentEndDate
        ? existingAddress?.temporaryAddress?.addTempPermanentEndDate
        : null,
      tempAddBillingAddress:
        existingAddress?.temporaryAddress?.addBillingAddress === 1
          ? "yes"
          : "no",
      tempAddCompanyName: "",
      tempAddAddress1: existingAddress?.temporaryAddress?.addAddress1
        ? existingAddress?.temporaryAddress?.addAddress1
        : "",
      tempAddAddress2: existingAddress?.temporaryAddress?.addAddress2
        ? existingAddress?.temporaryAddress?.addAddress2
        : "",
      tempAddAddress3: existingAddress?.temporaryAddress?.addAddress3
        ? existingAddress?.temporaryAddress?.addAddress3
        : "",
      tempAddAddress4: existingAddress?.temporaryAddress?.addAddress4
        ? existingAddress?.temporaryAddress?.addAddress4
        : "",
      tempAddAddress5: existingAddress?.temporaryAddress?.addAddress5
        ? existingAddress?.temporaryAddress?.addAddress5
        : "",
      tempAddAddress6: existingAddress?.temporaryAddress?.addAddress6
        ? existingAddress?.temporaryAddress?.addAddress6
        : "",
      tempAddHealthRegionEliId: existingAddress?.temporaryAddress
        ?.addHealthRegionEliText
        ? existingAddress?.temporaryAddress?.addHealthRegionEliText
        : "",
      ...existingAddress?.temporaryAddress,
      ...patientGp?.gpInformation,
      ...details?.nextOfKin,
      ...details?.additionalDetails,
    },
    validationSchema: yup.object().shape({
      kinSurname: yup.string().min(2, translate("minimumCharacters", language)),
      kinFirstname: yup
        .string()
        .min(2, translate("minimumCharacters", language)),
      addEmail: yup.string().email(translate("validEmailMsg", language)),
      kinEmail: yup.string().email(translate("validEmailMsg", language)),
      kinRelationship: yup
        .string()
        .required(translate("relationshipRequired", language)),
      addAddress1: yup
        .string()
        .required(translate("numberAndRoadRequired", language)),
      country: yup.string().required(translate("countryRequired", language)),
      tempAddressEmail: yup
        .string()
        .email(translate("validEmailMsg", language)),
      tempAddressStartDate: yup
        .date()
        .nullable()
        .min(new Date("01/01/1900"), translate("invalidDate", language))
        .max(new Date("12/31/2050"), translate("invalidDate", language))
        .typeError(translate("invalidDate", language)),
      tempAddressEndDate: yup
        .date()
        .nullable()
        .min(new Date("01/01/1900"), translate("invalidDate", language))
        .test(
          "test",
          translate("invalidEndDate", language),
          (value: any, validationContext) => {
            const { parent } = validationContext;
            if (
              parent.tempAddressStartDate &&
              parent.tempAddressEndDate &&
              parent.tempAddressStartDate > parent.tempAddressEndDate
            )
              return false;
            return true;
          }
        )
        .max(new Date("12/31/2050"), translate("invalidDate", language))
        .typeError(translate("invalidDate", language)),
      postcode: yup.string().when([], {
        is: () => estPatientPostcodeMandatory === 1,
        then: yup.string().required(translate("postcodeRequired", language)),
        otherwise: yup.string().notRequired(),
      }),
      tempAddAddress5: yup.string().when([], {
        is: () => estPatientPostcodeMandatory === 1,
        then: yup.string().required(translate("postcodeRequired", language)),
        otherwise: yup.string().notRequired(),
      }),
    }),
    onSubmit: (values: any) => {
      confirmPatientDetails({
        ...values,
        addId: existingAddress?.permanentAddress?.addId
          ? existingAddress?.permanentAddress?.addId
          : "",
        tempAddId: existingAddress?.temporaryAddress?.addId
          ? existingAddress?.temporaryAddress?.addId
          : "",
        tempAddressEndDate: moment(values?.tempAddressEndDate).format(
          "DD/MM/YYYY"
        ),
        tempAddressStartDate: moment(values?.tempAddressStartDate).format(
          "DD/MM/YYYY"
        ),
        tempAddBillingAddress: values?.tempAddBillingAddress === "yes" ? 1 : 0,
        addAddress1: values?.addAddress1 ? values?.addAddress1 : "",
        addAddress2: values?.district ? values?.district : "",
        addAddress3: values?.town ? values?.town : "",
        addAddress4: values?.county ? values?.county : "",
        addAddress5: values?.postcode ? values?.postcode : "",
        addAddress6: values?.country ? values?.country : "",
        addHealthRegionEliId: "Health Region",
        patId: parseInt(patientId, 10),
        sgrId,
        mode: "save",
      });
    },
  });

  return (
    <>
      {establishmentListItemLoading ||
        additionalDetailsLoading ||
        existingAddressLoading ||
        confirmPatientDetailsIsLoading ||
        (patientGpLoading && (
          <Backdrop sx={{ zIndex: "1500" }} open>
            <CircularProgress />
          </Backdrop>
        ))}
      <form onSubmit={confirmPatientDetailsForm.handleSubmit} noValidate>
        <Grid container rowSpacing={3}>
          <Grid container item xs={12} columnSpacing={1}>
            <Grid item xs={6} sm={4} md={4} lg={3}>
              <Typography variant="h4">
                {translate("patientCommunicationDetails", language)}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4} md={4} lg={3}>
              <Typography variant="h4">
                {patDetails?.patTitle} {patDetails?.patFirstname}{" "}
                {patDetails?.patSurname}{" "}
                {moment(patDetails?.patDob).format("DD/MM/YYYY")}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ color: "primary.main" }}>
              {translate("additionalDetails", language)}
            </Typography>
          </Grid>
          <AdditionalDetails
            handleSaveButton={handleSaveButton}
            data={confirmPatientDetailsForm}
            additionalDetails={details?.additionalDetails}
            nextOfKin={details?.nextOfKin}
            patientTitle={establishmentListItem.title}
            relationship={establishmentListItem.relationship}
          />
          <Grid item xs={12}>
            <Divider sx={{ my: "20px" }} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ color: "primary.main" }}>
              {translate("address", language)}
            </Typography>
          </Grid>
          <Address
            handleSaveButton={handleSaveButton}
            data={confirmPatientDetailsForm}
            estUseAddressLookup={estUseAddressLookup}
          />
          <Grid item xs={12}>
            <Divider sx={{ my: "20px" }} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ color: "primary.main" }}>
              {translate("gp", language)}
            </Typography>
          </Grid>
          <Gp data={confirmPatientDetailsForm} patientGp={patientGp} />
          <Grid item xs={12}>
            <Divider sx={{ my: "20px" }} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ color: "primary.main" }}>
              {translate("temporaryContactDetails", language)}
            </Typography>
          </Grid>
          <TemporaryContactDetails
            handleSaveButton={handleSaveButton}
            data={confirmPatientDetailsForm}
          />
          <Grid item xs={12}>
            <Divider sx={{ my: "20px" }} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ color: "primary.main" }}>
              {translate("temporaryAddress", language)}
            </Typography>
          </Grid>
          <TemporaryAddress
            handleSaveButton={handleSaveButton}
            data={confirmPatientDetailsForm}
          />
          <Grid
            container
            item
            spacing={{ xs: 1, sm: 2 }}
            sx={styles.saveButton}
          >
            <Grid item>
              <Common.CellmaButton
                type="submit"
                disabled={isSaveButtonDisabled}
                label={translate("saveChangedDetails", language)}
                onClick={() => {
                  if (confirmPatientDetailsForm?.errors) {
                    window.scrollTo(0, 0);
                  }
                }}
              />
            </Grid>

            <Grid item>
              <Common.CellmaButton
                label={translate("confirmExistingDetails", language)}
                disabled={!isSaveButtonDisabled}
                onClick={
                  // Added this onConfirm function for event data domain
                  props.onConfirm
                    ? props.onConfirm
                    : () => {
                        dispatch(setIsContactTypeSelected(true));
                        navigate("/cellmaUser/patient/contactTypeScreen");
                      }
                }
              />
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
export default ExistingPatientDetailsTabs;

export const styles = {
  saveButton: {
    display: "flex",
    justifyContent: "flex-end",
    mt: "50px",
  },
};

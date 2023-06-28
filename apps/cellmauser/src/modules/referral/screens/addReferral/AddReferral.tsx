// Page Name : "addReferral"
// Page Id : "c4ref1"

import { useEffect, useState } from "react";

import * as Mui from "@mui/material";
import { useFormik } from "formik";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";
import * as yup from "yup";

import AssessmentPopup from "./AssessmentPopup";
import OtherDetails from "./OtherDetails";
import ReferralTable from "./ReferralTable";
import Referrer from "./Referrer";
import ReferTo from "./ReferTo";
import ServiceAppointmentsPopup from "./ServiceAppointmentsPopup";
import useEstablishmentListItems from "../../../../api/useEstablishmentListItems";
import * as Common from "../../../../common/CommonComponentsIndex";
import { setIsDrawerOpen } from "../../../../store/CommonAction";
import { setSnackbar } from "../../../../store/SnackbarAction";
import {
  useAddReferral,
  useAddReferralDocuments,
  usePatientReferralDisplay,
} from "../../api/usePatientReferral";
import t from "../../assets/translationFiles/addReferralTranslation";
import { setActiveScreenName } from "../../store/ReferralAction";

const AddReferral = () => {
  const { language } = useSelector((state: any) => state.language);
  const isAddReferralMode = useSelector(
    (state: any) => state.common.isAddReferralMode
  );
  const [continueForMoreDetails, setContinueForMoreDetails] = useState(false);

  const {
    setTitle,
    setIsLink,
    setScreenName,
    setDrawerName,
  }: { setTitle: any; setIsLink: any; setScreenName: any; setDrawerName: any } =
    useOutletContext(); // <-- access context value

  useEffect(() => {
    if (isAddReferralMode === "addReferralMode") {
      setTitle(t("addReferral"));
      dispatch(setActiveScreenName("addReferral"));
      setContinueForMoreDetails(true);
    } else {
      setTitle(t("createAnOnReferral"));
      dispatch(setActiveScreenName("createAnOnReferral"));
    }
    setIsLink(true);
    setScreenName("");
    setDrawerName("ServiceAppointmentDrawer");
    dispatch(setIsDrawerOpen(true));
  }, [language]);

  const [isServiceAppointments, setIsServiceAppointments] = useState(false);
  const [isAssessment, setIsAssessment] = useState(false);
  const [acceptReferral, setAcceptReferral] = useState(" ");
  const { mutate: addReferralDocuments } = useAddReferralDocuments();
  const { data: establishmentListItem } = useEstablishmentListItems([
    "service",
    "clinic type",
    "type of service",
    "mode of referral",
    "patient type",
    "clinic location",
    "HP Region",
    "Method Of Arrival",
    "Type Of Transport",
    "Referral Type",
    "Clinical Priority",
    "Mode Of Referral",
    "Display Name",
  ]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { patientId } = useSelector((state: any) => state.patient);
  const { data: displayPatientReferral } = usePatientReferralDisplay(patientId);
  const { mutate: addReferralDetails } = useAddReferral();
  const settings = displayPatientReferral?.settings ?? {};

  useEffect(() => {
    if (Object.values(addReferralForm?.errors).length !== 0) {
      addReferralForm?.validateForm(addReferralForm?.values);
    }
  }, [language]);

  const formData = new FormData();
  const addReferralForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      receivedReferralDate: null,
      approvedReferralDate: null,
      dateOfReferral: null,
      timeOfReferral: null,
      sourceOfReferral: "",
      referralType: "",
      referralReason: "",
      referringProfessional: "",
      referrerName: "",
      modeOfReferral: "",
      service: "",
      clinicType: "",
      clinicLocation: "",
      team: "",
      patientCare: {
        id: 2,
        label: "Out Patient",
      }, // Added default patient care value
      preferredSexForAssessment: "",
      clinicalPriority: "",
      consultant: "",
      methodOfArrival: "",
      typeOfTransport: "",
      timeOfArrival: null,
      refInvite: "acceptReferral", // setting default value for refInvite
      notes: "",
      referralLetter: [
        {
          documentName: "",
          documentMultipart: "",
          documentDescription: "",
          documentDisplayName: "",
        },
      ],
    },
    validationSchema: yup.object().shape({
      receivedReferralDate: yup
        .date()
        .nullable()
        .when([], {
          is: () => settings?.cliShowReferralToTreatmentDays === 1,
          then: yup
            .date()
            .nullable()
            .required(t("receivedReferralDateRequired"))
            .min(new Date("01/01/1900"), t("invalidDate"))
            .max(new Date("12/31/2050"), t("invalidDate"))
            .typeError(t("invalidDate")),
          otherwise: yup.date().nullable().notRequired(),
        }),
      approvedReferralDate: yup
        .date()
        .nullable()
        .when([], {
          is: () => settings?.cliShowReferralToTreatmentDays === 1,
          then: yup
            .date()
            .nullable()
            .required(t("approvedReferralDateRequired"))
            .min(new Date("01/01/1900"), t("invalidDate"))
            .test(
              "test",
              t("invalidRefDate"),
              (value: any, validationContext) => {
                const { parent } = validationContext;
                if (
                  parent.receivedReferralDate &&
                  parent.approvedReferralDate &&
                  parent.receivedReferralDate > parent.approvedReferralDate
                )
                  return false;
                return true;
              }
            )
            .max(new Date("12/31/2050"), t("invalidDate"))
            .typeError(t("invalidDate")),
          otherwise: yup
            .date()
            .nullable()
            .min(new Date("01/01/1900"), t("invalidDate"))
            .test(
              "test",
              t("invalidRefDate"),
              (value: any, validationContext) => {
                const { parent } = validationContext;
                if (
                  parent.receivedReferralDate &&
                  parent.approvedReferralDate &&
                  parent.receivedReferralDate > parent.approvedReferralDate
                )
                  return false;
                return true;
              }
            )
            .max(new Date("12/31/2050"), t("invalidDate"))
            .typeError(t("invalidDate"))
            .notRequired(),
        }),
      dateOfReferral: yup
        .date()
        .nullable()
        .min(new Date("01/01/1900"), t("invalidDate"))
        .max(new Date("12/31/2050"), t("invalidDate"))
        .typeError(t("invalidDate")),
      timeOfReferral: yup.date().nullable().typeError(t("invalidTime")),
      sourceOfReferral: yup.string().required(t("sourceOfReferralRequired")),
      service: yup.string().required(t("serviceRequired")),
      clinicLocation: yup
        .object()
        .nullable()
        .when([], {
          is: () => settings?.estServiceLocation === 1,
          then: yup.object().nullable().required(t("clinicLocationRequired")),
          otherwise: yup.object().nullable().notRequired(),
        }),
      team: yup
        .object()
        .nullable()
        .when([], {
          is: () => settings?.estUseSpecialityAndRegion === 1,
          then: yup.object().nullable().required(t("teamRequired")),
          otherwise: yup.object().nullable().notRequired(),
        }),
      consultant: yup.string().when([], {
        is: () => settings?.cliConsultantMandatory === 1,
        then: yup.string().required(t("consultantRequired")),
        otherwise: yup.string().notRequired(),
      }),
      timeOfArrival: yup.date().nullable().typeError(t("invalidTime")),
      methodOfArrival: yup
        .object()
        .nullable()
        .when([], {
          is: () => settings?.cliArrivalMethod === 1,
          then: yup.object().nullable().required(t("methodOfArrivalRequired")),
          otherwise: yup.object().nullable().notRequired(),
        }),
    }),
    onSubmit: async (values: any) => {
      addReferralDetails(
        {
          rttReferralReceivedDate:
            values?.receivedReferralDate !== "" &&
            values?.receivedReferralDate !== null
              ? moment(values?.receivedReferralDate).format("DD/MM/YYYY")
              : null,
          rttReferralApprovedDate:
            values?.approvedReferralDate !== "" &&
            values?.approvedReferralDate !== null
              ? moment(values?.approvedReferralDate).format("DD/MM/YYYY")
              : null,
          refReferralDate:
            values?.dateOfReferral !== "" && values?.dateOfReferral !== null
              ? moment(values?.dateOfReferral).format("DD/MM/YYYY")
              : null,
          refTimeSet:
            values?.timeOfReferral !== "" &&
            values?.timeOfReferral?.$d !== undefined &&
            values?.timeOfReferral !== null &&
            values?.timeOfReferral?.$d !== null
              ? moment(values?.timeOfReferral?.$d).format("HH:mm")
              : values?.timeOfReferral !== undefined &&
                values?.timeOfReferral !== null
              ? moment(values?.timeOfReferral).format("HH:mm")
              : null,
          refEspId: values?.sourceOfReferral,
          refReferralTypeEliId: values?.referralType.eliId,
          refReferralTypeText: values?.referralType.eliText,
          referralReason: [values?.referralReason?.eliId],
          refPatId: patientId,
          refEhpId: values?.referringProfessional?.ehpId,
          refPipId: values?.referrerName?.toString() ?? "",
          refModeOfReferral: values?.modeOfReferral,
          refCliId: values?.service,
          refCliType: values?.clinicType,
          refClinicLocation: values?.clinicLocation?.eliText,
          refRegionEliId: values?.team?.eliId?.toString(),
          refRegionEliText: values?.team?.eliText,
          refPatientOut: values?.patientCare?.id.toString() ?? "",
          refPreferredExaminerSex: values?.preferredSexForAssessment,
          consultant: values?.consultant?.toString() ?? "",
          refMethodOfArrival: values?.methodOfArrival?.eliText,
          refTypeOfTransport: values?.typeOfTransport?.eliText,
          refTimeOfArrival:
            values?.timeOfArrival !== "" &&
            values?.timeOfArrival?.$d !== undefined &&
            values?.timeOfArrival !== null &&
            values?.timeOfArrival?.$d !== null
              ? moment(values?.timeOfArrival?.$d).format("HH:mm")
              : values?.timeOfArrival !== undefined &&
                values?.timeOfArrival !== null
              ? moment(values?.timeOfArrival).format("HH:mm")
              : null,
          refClinicalPriorityEliId: values?.clinicalPriority?.eliId,
          refClinicalPriorityText: values?.clinicalPriority?.eliText,
          refInvite: values?.refInvite,
          refNotes: values?.notes,
        },
        {
          onSuccess: (reponse: any) => {
            if (reponse?.status === 200) {
              if (
                reponse?.data?.validationCode === "patient.referral.add.success"
              ) {
                formData.append(
                  "refId",
                  reponse?.data?.entity?.refId.toString()
                );
                let emptyFileCount = 0;
                values?.referralLetter?.forEach((element: any) => {
                  if (element.documentMultipart === "") {
                    emptyFileCount += 1;
                  } else {
                    formData.append("file", element.documentMultipart);
                  }

                  if (element.documentDisplayName === "") {
                    formData.append("displayNameId", "0");
                  } else {
                    formData.append(
                      "displayNameId",
                      element.documentDisplayName
                    );
                  }
                  if (element.documentDescription === "") {
                    formData.append("description", "");
                  } else {
                    formData.append("description", element.documentDescription);
                  }
                });
                if (emptyFileCount === 0) {
                  addReferralDocuments(formData);
                }
                if (acceptReferral === "awaitReferralAcceptance") {
                  dispatch(
                    setSnackbar(
                      true,
                      "success",
                      t("awaitingReferralAddedSuccessfully"),
                      2
                    )
                  );
                  addReferralForm.resetForm();
                  setAcceptReferral("");
                  setAcceptReferral("");
                } else if (
                  acceptReferral === "acceptReferral&ScheduleAppointment"
                ) {
                  dispatch(
                    setSnackbar(
                      true,
                      "success",
                      t("recordAddedSuccessfully"),
                      4
                    )
                  );
                  navigate("/cellmaUser/eventData/serviceBookAppointment");
                  addReferralForm.resetForm();
                  setAcceptReferral("");
                  setAcceptReferral("");
                } else {
                  dispatch(
                    setSnackbar(
                      true,
                      "success",
                      t("recordAddedSuccessfully"),
                      4
                    )
                  );
                  addReferralForm.resetForm();
                  setAcceptReferral("");
                  setAcceptReferral("");
                }
              }
            }
          },
        }
      );
    },
  });

  return (
    <form onSubmit={addReferralForm.handleSubmit} noValidate>
      <Mui.Grid container spacing={4}>
        <Referrer
          addReferralForm={addReferralForm}
          establishmentListItem={establishmentListItem}
          isAddReferralMode={isAddReferralMode}
        />

        <ReferTo
          addReferralForm={addReferralForm}
          establishmentListItem={establishmentListItem}
          acceptReferral={acceptReferral}
          isAddReferralMode={isAddReferralMode}
          continueForMoreDetails={continueForMoreDetails}
          setContinueForMoreDetails={setContinueForMoreDetails}
        />

        {continueForMoreDetails && (
          <OtherDetails
            addReferralForm={addReferralForm}
            establishmentListItem={establishmentListItem}
            setIsAssessment={setIsAssessment}
            setAcceptReferral={setAcceptReferral}
            isAddReferralMode={isAddReferralMode}
            continueForMoreDetails={continueForMoreDetails}
          />
        )}

        {isAddReferralMode === "addReferralMode" ? (
          <Mui.Grid item xs={12} sx={styles.box}>
            <Common.CellmaButton
              tooltipTitle="Next Page is under Construction"
              label={t("save")}
              type="submit"
              onClick={() => {
                if (addReferralForm?.errors) {
                  window.scrollTo(0, 0);
                }
              }}
            />
          </Mui.Grid>
        ) : (
          <Mui.Grid item xs={12} sx={styles.box}>
            <Common.CellmaButton
              tooltipTitle="Next Page is under Construction"
              label={t("add")}
              type="submit"
              onClick={() => {
                navigate("/cellmaUser/referral/serviceReferrals");
              }}
            />
          </Mui.Grid>
        )}

        {isServiceAppointments && (
          <ServiceAppointmentsPopup
            handleCancel={() => {
              setIsServiceAppointments(false);
            }}
          />
        )}
        {isAssessment && (
          <AssessmentPopup
            handleCancel={() => {
              setIsAssessment(false);
            }}
          />
        )}
      </Mui.Grid>
      {isAddReferralMode === "createOnReferral" && <ReferralTable />}
    </form>
  );
};

export const styles = {
  referralHeader: {
    backgroundColor: "primary.light",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "5px",
  },
  buttonGrid: {
    display: "flex",
    alignItems: "flex-start",
    mb: "15px",
  },
  typographyGrid: {
    mt: "12px",
    color: "primary.main",
    ml: "10px",
  },
  box: {
    display: "flex",
    justifyContent: "flex-end",
  },
};

export default AddReferral;

// Page Name : "contactTypeScreen"
// Page Id : "c4pat11"

import { useEffect } from "react";

import * as Mui from "@mui/material";
import { Formik, FormikProps } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import * as yup from "yup";

import ContactTypeScreenCard from "./ContactTypeScreenCard";
import * as Common from "../../../../common/CommonComponentsIndex";
import { setIsUnderConstruction } from "../../../../store/CommonAction";
import usePatientContactTypeDisplay from "../../api/usePatientContactTypeDisplay";
import translate from "../../assets/translationFiles/patientDemographicsTranslation";

const GridItem = (props: any) => {
  return (
    <Mui.Grid item xs={6} sm={4} md={2} sx={styles.iconGrid}>
      {props.children}
    </Mui.Grid>
  );
};

const ContactTypeScreen = (props: any) => {
  const { language } = useSelector((state: any) => state.language);
  const { patientId } = useSelector((state: any) => state.patient);
  const {
    isDeathPatientSelected,
    isPatientCurrentLocation,
    isAllowToAddMultipleReferral,
  } = useSelector((state: any) => state.patient);
  const { setTitle, setIsLink, setScreenName, setDrawerName } =
    useOutletContext() as any; // <-- access context value

  const dispatch = useDispatch();
  const patientContactTypeDisplay = usePatientContactTypeDisplay(patientId);

  useEffect(() => {
    setTitle(translate("patientSummary", language));
    setIsLink(true);
    setScreenName("");
    setDrawerName("");
  }, [language, patientId]);

  const fetchIcon = (item: string): string => {
    let imageName;
    switch (item) {
      case "Patient visit":
        imageName = "Placeholder.png";

        break;

      case "Patient communication":
      case "Patient Communication":
        imageName = "PatientCommunication.png";

        break;

      case "Enquiry about patient":
      case "Enquiry About Patient":
        imageName = "PatientSearch.png";

        break;

      case "Case conference":
      case "Case Conference":
        imageName = "AudioConference.png";

        break;

      case "Inpatient assessment":
      case "Inpatient Assessment":
        imageName = "InpatientAssessment.png";

        break;

      case "Data entry":
        imageName = "DataEntry.png";

        break;

      case "Virtual Clinic":
        imageName = "VirtualClinic.png";

        break;

      case "Telephone Clinic":
        imageName = "TelephoneClinic.png";

        break;

      case "Advice Line":
        imageName = "Receptionist.png";

        break;

      case "Phlebotomy":
        imageName = "Phlebotomy.png";

        break;

      case "Patient Assessment":
        imageName = "Patient.png";

        break;

      case "Audit Only":
      case "Audit only":
        imageName = "AuditOnly.png";

        break;

      case "Bloods Only":
        imageName = "BloodsOnly.png";

        break;

      case "Consultation Email":
        imageName = "ConsultationEmail.png";

        break;

      case "Consultation Face to Face":
        imageName = "ConsultationFacetoFace.png";

        break;

      case "Consultation Telephone":
        imageName = "PatientCommunication.png";

        break;

      case "Cryotherapy Only":
      case "Cryptotherapy":
        imageName = "Cryotherapy.png";

        break;

      case "MDT Review":
        imageName = "MDTReview.png";

        break;

      case "Notes Review or Data Entry Only":
      case "Notes review or Data entry only":
        imageName = "NotesRevieworDataEntryOnly.png";

        break;

      case "Patient Correspondence":
        imageName = "PatientCorrespondence.png";

        break;

      case "Patient REPS":
        imageName = "PatientREPS.png";

        break;

      case "Prescription":
        imageName = "Prescription.png";

        break;

      case "Prescription Only":
      case "Prescription only":
        imageName = "PrescriptionOnly.png";

        break;

      case "Treatment Only":
      case "Treatment":
        imageName = "Treatment.png";

        break;

      case "Continue my last contact":
        imageName = "ContinueMyLastContact.png";

        break;

      case "Pharmacy Review":
        imageName = "PharmacyReview.png";

        break;

      case "16 Weeks":
        imageName = "16Weeks.png";

        break;

      case "20 Weeks":
        imageName = "20Weeks.png";

        break;

      case "24 Weeks":
        imageName = "24Weeks.png";

        break;

      case "26 Weeks":
        imageName = "26Weeks.png";

        break;

      case "28 Weeks":
        imageName = "28Weeks.png";

        break;

      case "31 Weeks":
        imageName = "31Weeks.png";

        break;

      case "34 Weeks":
        imageName = "34Weeks.png";

        break;

      case "36 Weeks":
        imageName = "36Weeks.png";

        break;

      case "38 Weeks":
        imageName = "38Weeks.png";

        break;

      case "40 Weeks":
        imageName = "40Weeks.png";

        break;

      case "41 Weeks":
        imageName = "41Weeks.png";

        break;

      case "Labour Ward":
        imageName = "LabourWard.png";

        break;

      case "Maternity Review":
        imageName = "MaternityReview.png";

        break;

      case "Booking Assessment":
        imageName = "BookingAssessment.png";

        break;

      case "Medical Assessor":
        imageName = "DoctorsVisit.png";

        break;

      case "Clinician Contact":
        imageName = "DoctorsVisit.png";

        break;

      case "Ame Support":
        imageName = "AmeSupport.png";

        break;

      case "Spares and Repairs":
        imageName = "SparesandRepairs.png";

        break;

      case "Audiology":
        imageName = "Audiology.png";

        break;

      case "Choosing My Implant":
        imageName = "ChoosingMyImplant.png";

        break;

      case "Balance Assessment":
        imageName = "BalanceAssessment.png";

        break;

      case "Communication":
        imageName = "Communication.png";

        break;

      case "Expectations Counselling":
        imageName = "ExpectationsCounselling.png";

        break;

      case "Intro To Speech Processor Kit":
        imageName = "IntrotoSpeechProcessorKit.png";

        break;

      case "Long-Term Questionnaire":
        imageName = "LongTermQuestionnaire.png";

        break;

      case "MDT":
        imageName = "MDT.png";

        break;

      case "Post Implant":
        imageName = "PostImplant.png";

        break;

      case "Pre Implant":
        imageName = "PreImplant.png";

        break;

      case "Upgrade":
        imageName = "Upgrade.png";

        break;

      case "Assessment Process Counselling":
        imageName = "AssessmentProcessCounselling.png";

        break;

      case "Appointments":
        imageName = "Appointments.png";

        break;

      case "Data View":
        imageName = "DataView.png";

        break;

      case "Communication Review":
        imageName = "CommunicationReview.png";

        break;

      case "Finance":
        imageName = "Finance.png";

        break;

      case "Document Upload":
        imageName = "DocumentUpload.png";

        break;

      case "Medical":
        imageName = "Medical.png";

        break;

      case "Spares And Repairs":
        imageName = "SparesandRepairs.png";

        break;

      case "Telephone Appointment":
        imageName = "TelephoneAppointment.png";

        break;

      case "Initial Tuning":
        imageName = "InitialTuning.png";

        break;

      case "Patient Journal":
        imageName = "PatientJournal.png";

        break;

      case "Operation":
        imageName = "Operation.png";

        break;

      case "Psychology":
        imageName = "Psychology.png";

        break;

      case "Scans":
        imageName = "Scans.png";

        break;

      case "Sign Language":
        imageName = "SignLanguage.png";

        break;
      case "Immunisation":
        imageName = "Immunisation.png";

        break;

      case "Psychology Support":
        imageName = "PsychologySupport.png";

        break;

      case "Referral":
        imageName = "Referral.png";

        break;

      case "Send Documents":
        imageName = "SendDocuments.png";

        break;

      case "Contact tracing":
        imageName = "ContactTracing.png";

        break;

      case "4 Weeks Routine":
        imageName = "4WeeksRoutine.png";

        break;

      case "16 Weeks Routine":
        imageName = "16WeeksRoutine.png";

        break;

      case "52 Weeks Routine":
        imageName = "52WeeksRoutine.png";

        break;

      case "Initial Consultation":
        imageName = "InitialConsultation.png";

        break;

      case "Local Coordinator":
        imageName = "LocalCoordinator.png";

        break;

      case "Peer Review":
        imageName = "PeerReview.png";

        break;

      case "Paediatric Examination":
        imageName = "PaediatricExamination.png";

        break;

      case "Forensic Examination":
        imageName = "ForensicExamination.png";

        break;

      case "Health Examination":
        imageName = "HealthExamination.png";

        break;

      case "External cardiologist":
        imageName = "ExternalCardiologist.png";

        break;

      case "Ophthalmologist/Optometrist":
        imageName = "Ophthalmologist.png";

        break;

      case "Ophthalmologist":
        imageName = "Ophthalmologist.png";

        break;

      case "Specialist":
        imageName = "Specialist.png";

        break;

      case "AOT":
        imageName = "AOT.png";

        break;

      case "ASO/ASA":
        imageName = "ASO_ASA.png";

        break;

      case "Shared Service":
        imageName = "SharedService.png";

        break;

      case "Case Management":
        imageName = "CaseManagement.png";

        break;

      case "Optometrist":
        imageName = "Optometrist.png";

        break;

      case "ePrescribe":
        imageName = "EPrescribe.png";

        break;

      case "Admin":
        imageName = "Admin.png";

        break;

      case "Patient Visit":
        imageName = "Patient.png";

        break;

      case "Data Entry":
        imageName = "DataEntryRole.png";

        break;

      case "Coordinators Psychological Support Programme":
        imageName = "CoordinatorsPsychologicalSupportProgramme.png";

        break;

      case "Force Medical Advisors Option 1":
        imageName = "Placeholder.png";

        break;

      case "Force Medical Advisors Option 2":
        imageName = "Placeholder.png";

        break;

      case "Mental Health and Welfare Advisor":
        imageName = "MentalHealthandWelfareAdvisor.png";

        break;

      case "patient":
        imageName = "Patient.png";

        break;

      case "nurse":
      case "Nurse Visit":
      case "Nurse visit":
        imageName = "NurseVisit.png";

        break;

      case "doctor":
      case "Doctors Visit":
        imageName = "DoctorsVisit.png";

        break;

      case "ame":
        imageName = "AME.png";

        break;

      default:
        // throw Error(` The case ${item} is not applicable here`);
        imageName = "Placeholder.png";
    }
    return imageName;
  };

  const getImgURL = (item: string) => {
    return new URL(
      `../../assets/icons/${fetchIcon(item)}`,
      import.meta.url
    ).toString();
  };

  return (
    <Formik
      initialValues={{
        selectContactDate: new Date(),
        patientLocation: "",
        selectReferral: "",
      }}
      validationSchema={yup.object().shape({
        selectContactDate: yup
          .date()
          .nullable()
          .min(new Date("01/01/1900"), translate("invalidDate", language))
          .max(new Date(), translate("futureDateAlert", language))
          .required(translate("contactDateRequired", language))
          .typeError(translate("invalidDate", language)),
        patientLocation: yup
          .string()
          .required(translate("patientCurrentLocationRequired", language)),
        selectReferral: yup
          .string()
          .required(translate("referralRequired", language)),
      })}
      onSubmit={(values: any) => {}}
    >
      {(data: FormikProps<any>) => {
        return (
          <form onSubmit={data.handleSubmit} noValidate>
            <Mui.Box>
              <Mui.Grid container>
                {isDeathPatientSelected && (
                  <Mui.Typography variant="subtitle1" color="warning.dark">
                    {translate("patientIsDeceased", language)}
                  </Mui.Typography>
                )}
              </Mui.Grid>
              <Mui.Grid item container sx={{ paddingY: "20px" }} spacing={3}>
                <Mui.Grid item xs={3}>
                  <Common.CellmaDatePicker
                    label={translate("selectContactDate", language)}
                    name="selectContactDate"
                    required
                    maxDate={new Date()}
                    value={data.values.selectContactDate}
                    onChange={(newDate: Date | null) => {
                      data.setFieldValue("selectContactDate", newDate);
                    }}
                    onBlur={data.handleBlur}
                    error={
                      data.touched.selectContactDate &&
                      data.errors.selectContactDate
                    }
                  />
                </Mui.Grid>
                {isPatientCurrentLocation && (
                  <Mui.Grid item xs={3}>
                    <Common.CellmaSelectField
                      label={translate("patientLocation", language)}
                      name="patientLocation"
                      required
                      value={data.values.patientLocation}
                      changeevent={data.handleChange}
                      onBlur={data.handleBlur}
                      error={
                        data.touched.patientLocation &&
                        data.errors.patientLocation
                      }
                      list={patientContactTypeDisplay.clinicLocations.map(
                        (location: any) => (
                          <Mui.MenuItem
                            key={location.eliId}
                            value={location.eliText}
                            sx={{ whiteSpace: "unset" }}
                          >
                            {location.eliText}
                          </Mui.MenuItem>
                        )
                      )}
                    />
                  </Mui.Grid>
                )}
                {isAllowToAddMultipleReferral && (
                  <Mui.Grid item xs={3}>
                    <Common.CellmaSelectField
                      label={translate("selectReferral", language)}
                      name="selectReferral"
                      required
                      onBlur={data.handleBlur}
                      changeevent={data.handleChange}
                      blurevent={data.handleBlur}
                      error={
                        data.touched.selectReferral &&
                        data.errors.selectReferral
                      }
                      value={data.values.selectReferral}
                      list={patientContactTypeDisplay.referrals.map(
                        (referral: any) => (
                          <Mui.MenuItem
                            key={referral.referralId}
                            value={referral.referralValue}
                            sx={{ whiteSpace: "unset" }}
                          >
                            {referral.referralValue}
                          </Mui.MenuItem>
                        )
                      )}
                    />
                  </Mui.Grid>
                )}
              </Mui.Grid>

              <Mui.Grid container sx={{ justifyContent: "center" }}>
                <Mui.Typography variant="subtitle1">
                  {translate("selectContactType", language)}
                </Mui.Typography>
              </Mui.Grid>

              <Mui.Grid item container>
                {patientContactTypeDisplay.contactTypeImageNames?.map(
                  (item: string, index: number) => {
                    return (
                      <GridItem key={index}>
                        <ContactTypeScreenCard
                          iconPath={getImgURL(item)}
                          alt={`${item} Image Avatar`}
                          moduleName={item}
                          onClick={() =>
                            props?.onContactTypeSelect
                              ? props?.onContactTypeSelect()
                              : dispatch(setIsUnderConstruction(true))
                          }
                          title={item}
                        />
                      </GridItem>
                    );
                  }
                )}
              </Mui.Grid>
            </Mui.Box>
          </form>
        );
      }}
    </Formik>
  );
};

const styles = {
  iconGrid: {
    display: "flex",
    justifyContent: "center",
    alignItem: "center",
  },
};

export default ContactTypeScreen;

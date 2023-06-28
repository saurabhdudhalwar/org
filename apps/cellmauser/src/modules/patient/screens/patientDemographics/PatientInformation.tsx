import * as Mui from "@mui/material";
import moment from "moment";
import { useSelector } from "react-redux";

import { GridItem } from "./DemographicsAccordions";
import { getGender } from "../../../../utils/GeneralUtils";
import { useGetPatientDetails } from "../../api/usePatientDetails";
import translate from "../../assets/translationFiles/patientDemographicsTranslation";

const PatientInfo = () => {
  const { language } = useSelector((state: any) => state.language);
  const { patientId } = useSelector((state: any) => state.patient);
  const { data } = useGetPatientDetails(patientId);

  return (
    <Mui.Grid container paddingX={{ xs: "none", sm: "40px" }}>
      <Mui.Grid item container xs={12} sm={6}>
        {data?.entity?.renameLabelOfPatSex ? (
          <GridItem>
            <Mui.Typography variant="h2">
              {translate("currentGender", language)}:
            </Mui.Typography>
          </GridItem>
        ) : (
          <GridItem>
            <Mui.Typography variant="h2">
              {translate("sex", language)}:
            </Mui.Typography>
          </GridItem>
        )}
        <GridItem>
          <Mui.Typography variant="h3">
            {data?.patientDetails?.patGenderAtBirth
              ? getGender(data?.patientDetails?.patGenderAtBirth)
              : "Same as gender"}
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h2">
            {translate("bloodType", language)}:
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h3">
            {data?.entity?.patDemographicsFieldDisableList
              ? !data?.entity?.patDemographicsFieldDisableList.includes(
                  "Blood Type"
                )
                ? data?.patientDetails?.patBloodGroup &&
                  data?.patientDetails?.patBloodGroup
                : "-"
              : "-"}
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h2">
            {translate("born", language)}:
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h3">
            {data?.patientDetails?.patDob
              ? moment(data?.patientDetails?.patDob).format("DD/MM/YYYY")
              : "-"}
          </Mui.Typography>
        </GridItem>
        {data?.patientDetails?.patIsBabyBornInThisHospital === 1 && (
          <GridItem>
            <Mui.Typography variant="h2">
              {translate("babyBornInHospital", language)}:
            </Mui.Typography>
          </GridItem>
        )}
        {data?.patientDetails?.patIsBabyBornInThisHospital === 1 && (
          <GridItem>
            <Mui.Typography variant="h3">Yes</Mui.Typography>
          </GridItem>
        )}
        <GridItem>
          <Mui.Typography variant="h2">
            {translate("died", language)}:
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h3">
            {data?.patientDetails?.patDod
              ? moment(data?.patientDetails?.patDod).format("DD/MM/YYYY")
              : "-"}
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h2">
            {translate("occupation", language)}:
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h3">
            {data?.entity?.patDemographicsFieldDisableList
              ? !data?.entity?.patDemographicsFieldDisableList.includes(
                  "Occupation"
                )
                ? data?.patientDetails?.patOccupation &&
                  data?.patientDetails?.patOccupation
                : "-"
              : "-"}
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h2">
            {translate("ethnicity", language)}:
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h3">
            {data?.patientDetails?.patEthnicityText
              ? data?.patientDetails?.patEthnicityText
              : "-"}
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h2">
            {translate("religion", language)}:
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h3">
            {data?.entity?.patDemographicsFieldDisableList
              ? !data?.entity?.patDemographicsFieldDisableList.includes(
                  "Religion"
                )
                ? data?.patientDetails?.patReligion &&
                  data?.patientDetails?.patReligion
                : "-"
              : "-"}
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h2">
            {translate("prisoner", language)}:
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h3">
            {data?.patientDetails?.patPrisoner === 1 ? "Yes" : "No"}
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h2">
            {translate("patientWebAccess", language)}:
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h3">
            {data?.patientDetails?.patRegisteredWithPatientweb ? "Yes" : "No"}
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h2">
            {translate("language", language)}:
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h3">
            {data?.patientDetails?.patLanguage
              ? data?.patientDetails?.patLanguage
              : "-"}
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h2">
            {translate("insurance", language)}:
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h3">
            {data?.entity?.insurance ? data?.entity?.insurance : "-"}
          </Mui.Typography>
        </GridItem>
      </Mui.Grid>
      <Mui.Grid item container xs={12} sm={6}>
        <GridItem>
          <Mui.Typography variant="h2">
            {translate("healthCard", language)}:
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h3">
            {data?.patientDetails?.patReceivedCardCount
              ? data?.patientDetails?.patReceivedCardCount
              : "0"}
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h2">
            {translate("interpreterAtAppointments", language)}:
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h3">
            {data?.patientDetails?.patNeedInterpreterAtAppointments === 1
              ? "Yes"
              : "No"}
          </Mui.Typography>
        </GridItem>
        {data?.entity?.estDisplayInterpreterType && (
          <GridItem>
            <Mui.Typography variant="h2">
              {translate("interpreterType", language)}:
            </Mui.Typography>
          </GridItem>
        )}
        {data?.entity?.estDisplayInterpreterType && (
          <GridItem>
            <Mui.Typography variant="h3">
              {data?.entity?.interpreterType
                ? data?.entity?.interpreterType
                : "-"}
            </Mui.Typography>
          </GridItem>
        )}
        <GridItem>
          <Mui.Typography variant="h2">
            {translate("assistanceAppointments", language)}:
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h3">
            {data?.patientDetails?.patNeededAssistanceAtAppointments
              ? data?.patientDetails?.patNeededAssistanceAtAppointments
              : "-"}
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h2">
            {translate("townOfBirth", language)}:
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h3">
            {data?.patientDetails?.patTownOfBirth
              ? data?.patientDetails?.patTownOfBirth
              : "-"}
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h2">
            {translate("countyOfBirth", language)}:
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h3">
            {data?.entity?.patDemographicsFieldDisableList
              ? !data?.entity?.patDemographicsFieldDisableList.includes(
                  "county_of_birth"
                )
                ? data?.patientDetails?.patCountyOfBirth &&
                  data?.patientDetails?.patCountyOfBirth
                : "-"
              : "-"}
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h2">
            {translate("countryOfBirth", language)}:
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h3">
            {data?.patientDetails?.patCountryOfBirth
              ? data?.patientDetails?.patCountryOfBirth
              : "-"}
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h2">
            {translate("nationality", language)}:
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h3">
            {data?.entity?.patDemographicsFieldDisableList
              ? !data?.entity?.patDemographicsFieldDisableList.includes(
                  "Nationality"
                )
                ? data?.patientDetails?.patNationality &&
                  data?.patientDetails?.patNationality
                : "-"
              : "-"}
          </Mui.Typography>
        </GridItem>
        {data?.entity?.renameLabelOfPatSex ? (
          <GridItem>
            <Mui.Typography variant="h2">
              {translate("sex", language)} :
            </Mui.Typography>
          </GridItem>
        ) : (
          <GridItem>
            <Mui.Typography variant="h2">
              {translate("currentGender", language)}:
            </Mui.Typography>
          </GridItem>
        )}
        <GridItem>
          <Mui.Typography variant="h3">
            {data?.patientDetails?.patSex
              ? getGender(data?.patientDetails?.patSex)
              : "-"}
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h2">
            {translate("restrictedRegistration", language)}:
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h3">
            {data?.patientDetails?.patBanned === 1
              ? data?.patientDetails?.patBannedOn
                ? moment(data?.patientDetails?.patBannedOn).format("DD/MM/YYYY")
                : "-"
              : "-"}
          </Mui.Typography>
        </GridItem>
      </Mui.Grid>
    </Mui.Grid>
  );
};

export default PatientInfo;

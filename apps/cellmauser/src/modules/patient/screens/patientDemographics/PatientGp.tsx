import * as Mui from "@mui/material";
import { useSelector } from "react-redux";

import { GridItem } from "./DemographicsAccordions";
import { usePatientGP } from "../../api/useGP";
import translate from "../../assets/translationFiles/patientDemographicsTranslation";

const PatientGp = () => {
  const { language } = useSelector((state: any) => state.language);
  const { patientId } = useSelector((state: any) => state.patient);
  const { data: patientGp } = usePatientGP(patientId);

  return (
    <Mui.Grid container paddingX={{ xs: "none", sm: "40px" }}>
      <Mui.Grid item container xs={12} sm={6}>
        {/* If default Preference setting is off "Show Familyname" */}
        {patientGp?.gpInformation?.egpFullname === "" && (
          <GridItem>
            <Mui.Typography variant="h2">
              {translate("gpName", language)}:
            </Mui.Typography>
          </GridItem>
        )}
        {patientGp?.gpInformation?.egpFullname === "" && (
          <GridItem>
            <Mui.Typography variant="h3">
              {patientGp?.gpInformation?.egpTitle
                ? patientGp?.gpInformation?.egpTitle
                : ""}{" "}
              {patientGp?.gpInformation?.egpSurname
                ? patientGp?.gpInformation?.egpSurname
                : "-"}
            </Mui.Typography>
          </GridItem>
        )}
        {/* If default Preference setting is on "Show Show GP full name" */}
        {patientGp?.gpInformation?.egpFullname !== "" && (
          <GridItem>
            <Mui.Typography variant="h2">
              {translate("gpFullName", language)}:
            </Mui.Typography>
          </GridItem>
        )}
        {patientGp?.gpInformation?.egpFullname !== "" && (
          <GridItem>
            <Mui.Typography variant="h3">
              {patientGp?.gpInformation?.egpFullname
                ? patientGp?.gpInformation?.egpFullname
                : "-"}
            </Mui.Typography>
          </GridItem>
        )}
        <GridItem>
          <Mui.Typography variant="h2">
            {translate("gpPracticeName", language)}:
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h3">
            {patientGp?.gpInformation?.egpPctName
              ? patientGp?.gpInformation?.egpPctName
              : "-"}
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h2">
            {translate("gpCode", language)}:
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h3">
            {patientGp?.gpInformation?.egpGpCode
              ? patientGp?.gpInformation?.egpGpCode
              : "-"}
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h2">
            {translate("ccgCode", language)}:
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h3">
            {patientGp?.gpInformation?.egpCcg
              ? patientGp?.gpInformation?.egpCcg
              : "-"}
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h2">
            {translate("email", language)}:
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h3" sx={styles.typography}>
            {patientGp?.gpAddress?.addEmail
              ? patientGp?.gpAddress?.addEmail
              : "-"}
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h2">
            {translate("gmcCod", language)}:
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h3">
            {patientGp?.gpInformation?.egpGmcCode
              ? patientGp?.gpInformation?.egpGmcCode
              : "-"}
          </Mui.Typography>
        </GridItem>
      </Mui.Grid>
      <Mui.Grid item container xs={12} sm={6}>
        <GridItem>
          <Mui.Typography variant="h2">
            {translate("gpPracticeCode", language)}:
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h3">
            {patientGp?.gpInformation?.egpPractiseCode
              ? patientGp?.gpInformation?.egpPractiseCode
              : "-"}
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h2">
            {translate("postcode", language)}:
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h3">
            {patientGp?.gpAddress?.addAddress5
              ? patientGp?.gpAddress?.addAddress5
              : "-"}
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h2">
            {translate("telephone", language)}:
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h3">
            {patientGp?.gpAddress?.addPhone
              ? patientGp?.gpAddress?.addPhone
              : "-"}
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h2">
            {translate("notes", language)}:
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h3">test</Mui.Typography>
        </GridItem>
      </Mui.Grid>
    </Mui.Grid>
  );
};

export default PatientGp;

const styles = {
  typography: {
    overflowWrap: "break-word",
  },
};

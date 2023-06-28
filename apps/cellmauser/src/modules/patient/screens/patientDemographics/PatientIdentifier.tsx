import * as Mui from "@mui/material";
import { useSelector } from "react-redux";

import { GridItem } from "./DemographicsAccordions";
import { usePatientIdentifiers } from "../../api/usePatientIdentifierDetails";
import translate from "../../assets/translationFiles/patientDemographicsTranslation";

const PatientIdentifier = () => {
  const { language } = useSelector((state: any) => state.language);
  const { patientId } = useSelector((state: any) => state.patient);
  const { data: patientIdentifier } = usePatientIdentifiers(patientId);

  return (
    <Mui.Grid container paddingX={{ xs: "none", sm: "40px" }}>
      <Mui.Grid item container xs={12} sm={6}>
        <GridItem>
          <Mui.Typography variant="h2">
            {translate("nhsNo", language)}:
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h3">
            {patientIdentifier?.patientIdentifierDetails?.patNhsRef
              ? patientIdentifier?.patientIdentifierDetails?.patNhsRef
              : "-"}
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h2">
            {translate("hospitalRef", language)}:
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h3">
            {patientIdentifier?.patientIdentifierDetails?.patHospitalRef
              ? patientIdentifier?.patientIdentifierDetails?.patHospitalRef
              : "-"}
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h2">
            {translate("identifier", language)}:
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h3">
            {patientIdentifier?.patientIdentifierDetails?.patIdentifier
              ? patientIdentifier?.patientIdentifierDetails?.patIdentifier
              : "-"}
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h2">
            {translate("pasId", language)}:
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h3">
            {patientIdentifier?.patientIdentifierDetails?.patPasid
              ? patientIdentifier?.patientIdentifierDetails?.patPasid
              : "-"}
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h2">
            {translate("socialSecurityNumber", language)}:
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h3">
            {patientIdentifier?.patientIdentifierDetails?.socialSecNumber
              ? patientIdentifier?.patientIdentifierDetails?.socialSecNumber
              : "-"}
          </Mui.Typography>
        </GridItem>
      </Mui.Grid>
      <Mui.Grid item container xs={12} sm={6}>
        <GridItem>
          <Mui.Typography variant="h2">
            {translate("mrnNumber", language)}:
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h3">
            {patientIdentifier?.patientIdentifierDetails?.patEstMrnNumber
              ? patientIdentifier?.patientIdentifierDetails?.patEstMrnNumber
              : "-"}
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h2">
            {translate("mpiNumber", language)}:
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h3">
            {patientIdentifier?.patientIdentifierDetails?.patMpiNumber
              ? patientIdentifier?.patientIdentifierDetails?.patMpiNumber
              : "-"}
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h2">
            {translate("cellmaNo", language)}:
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h3">
            {patientIdentifier?.patientIdentifierDetails?.patRiomedIdentifier
              ? patientIdentifier?.patientIdentifierDetails?.patRiomedIdentifier
              : "-"}
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h2">
            {translate("patientBarcode", language)}:
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h3">
            {patientIdentifier?.patientIdentifierDetails?.patBarcode
              ? patientIdentifier?.patientIdentifierDetails?.patBarcode
              : "-"}
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h2">
            {translate("serviceMrnNumber", language)}:
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h3">
            {patientIdentifier?.patientIdentifierDetails?.patCliMrnNumber
              ? patientIdentifier?.patientIdentifierDetails?.patCliMrnNumber
              : "-"}
          </Mui.Typography>
        </GridItem>
      </Mui.Grid>
    </Mui.Grid>
  );
};

export default PatientIdentifier;

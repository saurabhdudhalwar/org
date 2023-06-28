import * as Mui from "@mui/material";
import { useSelector } from "react-redux";

import { GridItem } from "./DemographicsAccordions";
import { fullAddressString } from "../../../../utils/GeneralUtils";
import { useGetPatientExistingAddress } from "../../api/usePatientAddress";
import translate from "../../assets/translationFiles/patientDemographicsTranslation";

const PatientAddress = () => {
  const { language } = useSelector((state: any) => state.language);
  const { patientId } = useSelector((state: any) => state.patient);
  const { data: patientAddress } = useGetPatientExistingAddress(patientId);

  return (
    <Mui.Grid container paddingX={{ xs: "none", sm: "40px" }}>
      <Mui.Grid item container xs={12} sm={6}>
        <GridItem>
          <Mui.Typography variant="h2">
            {translate("permanent", language)}:
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h3">
            {fullAddressString(patientAddress?.entity.permanentAddress)}
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h2">
            {translate("email", language)}:
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h3" sx={styles.typography}>
            {patientAddress?.entity.permanentAddress?.addEmail !== undefined
              ? patientAddress?.entity.permanentAddress?.addEmail
              : "-"}
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h2">
            {translate("phone", language)}:
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h3">
            {patientAddress?.entity.permanentAddress?.addPhone !== undefined &&
            patientAddress?.entity.permanentAddress?.addPhone !== ""
              ? patientAddress?.entity.permanentAddress?.addPhone
              : "-"}
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h2">
            {translate("mobile", language)}:
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h3">
            {patientAddress?.entity.permanentAddress?.addMobile !== undefined &&
            patientAddress?.entity.permanentAddress?.addMobile !== ""
              ? patientAddress?.entity.permanentAddress?.addMobile
              : "-"}
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h2">
            {translate("workPhone", language)}:
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h3">
            {patientAddress?.entity.permanentAddress?.addWorkPhone !==
              undefined &&
            patientAddress?.entity.permanentAddress?.addWorkPhone !== ""
              ? patientAddress?.entity.permanentAddress?.addWorkPhone
              : "-"}
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h2">
            {translate("fax", language)}:
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h3">
            {patientAddress?.entity.permanentAddress?.addFax !== undefined &&
            patientAddress?.entity.permanentAddress?.addFax !== ""
              ? patientAddress?.entity.permanentAddress?.addFax
              : "-"}
          </Mui.Typography>
        </GridItem>
      </Mui.Grid>
      <Mui.Grid item container xs={12} sm={6}>
        <GridItem>
          <Mui.Typography variant="h2" sx={styles.typography}>
            {translate("correspondence", language)}:
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h3">
            {fullAddressString(patientAddress?.entity?.temporaryAddress)}
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h2">
            {translate("email", language)}:
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h3" sx={styles.typography}>
            {patientAddress?.entity.temporaryAddress?.addEmail !== undefined &&
            patientAddress?.entity.temporaryAddress?.addEmail !== ""
              ? patientAddress?.entity.temporaryAddress?.addEmail
              : "-"}
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h2">
            {translate("phone", language)}:
          </Mui.Typography>
        </GridItem>
        <GridItem>
          {patientAddress?.entity.temporaryAddress?.addPhone !== undefined &&
          patientAddress?.entity.temporaryAddress?.addPhone !== ""
            ? patientAddress?.entity.temporaryAddress?.addPhone
            : "-"}
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h2">
            {translate("mobile", language)}:
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h3">
            {patientAddress?.entity.temporaryAddress?.addMobile !== undefined &&
            patientAddress?.entity.temporaryAddress?.addMobile !== ""
              ? patientAddress?.entity.temporaryAddress?.addMobile
              : "-"}
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h2">
            {translate("workPhone", language)}:
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h3">
            {patientAddress?.entity.temporaryAddress?.addWorkPhone !==
              undefined &&
            patientAddress?.entity.temporaryAddress?.addWorkPhone !== ""
              ? patientAddress?.entity.temporaryAddress?.addWorkPhone
              : "-"}
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h2">
            {translate("fax", language)}:
          </Mui.Typography>
        </GridItem>
        <GridItem>
          <Mui.Typography variant="h3">
            {patientAddress?.entity.temporaryAddress?.addFax !== undefined &&
            patientAddress?.entity.temporaryAddress?.addFax !== ""
              ? patientAddress?.entity.temporaryAddress?.addFax
              : "-"}
          </Mui.Typography>
        </GridItem>
      </Mui.Grid>
    </Mui.Grid>
  );
};

export default PatientAddress;

const styles = {
  typography: {
    overflowWrap: "break-word",
  },
};

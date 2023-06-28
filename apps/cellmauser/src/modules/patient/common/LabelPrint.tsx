import * as Mui from "@mui/material";

import { isUndefinedOrNullOrEmpty } from "../../../utils/GeneralUtils";

const LabelPrint = (props: any) => {
  const patientDetails = props?.patientDetails;
  const patientAddress = props?.patientAddress;
  return (
    <Mui.Box sx={{ padding: "20px" }}>
      <Mui.Typography variant="h4" sx={styles.title}>
        {!isUndefinedOrNullOrEmpty(patientDetails?.patTitle) &&
          patientDetails?.patTitle}
        &nbsp;
        {!isUndefinedOrNullOrEmpty(patientDetails?.patFirstname) &&
          patientDetails?.patFirstname}
        &nbsp;
        {!isUndefinedOrNullOrEmpty(patientDetails?.patSurname) &&
          patientDetails?.patSurname}
      </Mui.Typography>
      <Mui.Typography variant="h4" sx={styles.title}>
        {(isUndefinedOrNullOrEmpty(patientAddress?.addAddress1) ||
          patientAddress?.addAddress1 !== "Not Known") &&
          patientAddress?.addAddress1}
      </Mui.Typography>
      <Mui.Typography variant="h4" sx={styles.title}>
        {!isUndefinedOrNullOrEmpty(patientAddress?.addAddress2) &&
          patientAddress?.addAddress2}
      </Mui.Typography>
      <Mui.Typography variant="h4" sx={styles.title}>
        {!isUndefinedOrNullOrEmpty(patientAddress?.addAddress3) &&
          patientAddress?.addAddress3}
      </Mui.Typography>
      <Mui.Typography variant="h4" sx={styles.title}>
        {!isUndefinedOrNullOrEmpty(patientAddress?.addAddress4) &&
          patientAddress?.addAddress4}
      </Mui.Typography>
      <Mui.Typography variant="h4" sx={styles.title}>
        {!isUndefinedOrNullOrEmpty(patientAddress?.addAddress5) &&
          patientAddress?.addAddress5}
      </Mui.Typography>
      <Mui.Typography variant="h4" sx={styles.title}>
        {!isUndefinedOrNullOrEmpty(patientAddress?.addAddress6) &&
          patientAddress?.addAddress6}
      </Mui.Typography>
    </Mui.Box>
  );
};
export default LabelPrint;

const styles = {
  title: {
    textAlign: "left",
    fontSize: "25px",
  },

  backBoxGrid: { display: "flex", justifyContent: "flex-start" },
};

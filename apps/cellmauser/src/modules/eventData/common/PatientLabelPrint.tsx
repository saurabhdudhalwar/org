import * as Mui from "@mui/material";

import { dummyPatientLabel } from "../assets/dummyData/ServiceAppointmentsDummyData";

const PatientLabelPrint = () => {
  return (
    <Mui.Grid container padding={2} spacing={1}>
      <Mui.Grid item container>
        <Mui.Grid item xs={12} sx={styles.textGrid}>
          <Mui.Typography variant="h4">DUMMY DATA</Mui.Typography>
        </Mui.Grid>
      </Mui.Grid>
      <Mui.Grid item xs={6} sx={styles.textGrid}>
        <Mui.Typography>12/8/2022 7:41 PM</Mui.Typography>
      </Mui.Grid>
      <Mui.Grid item xs={6} sx={styles.textGrid}>
        <Mui.Typography>Untitled Document</Mui.Typography>
      </Mui.Grid>

      {dummyPatientLabel.map((dummyPatientLabels) => {
        return (
          <Mui.Grid item container xs={2} key={dummyPatientLabels.key}>
            <Mui.Grid item xs={12}>
              <Mui.Typography variant="h4">
                {dummyPatientLabels.pId}
              </Mui.Typography>
            </Mui.Grid>
            <Mui.Grid item xs={12}>
              <Mui.Typography variant="h4">
                {dummyPatientLabels.name}
              </Mui.Typography>
            </Mui.Grid>
            <Mui.Grid item xs={12}>
              <Mui.Typography variant="h4">
                {dummyPatientLabels.familyName}
              </Mui.Typography>
            </Mui.Grid>
            <Mui.Grid item xs={12}>
              <Mui.Typography variant="h4">
                {dummyPatientLabels.dob}
              </Mui.Typography>
            </Mui.Grid>
            <Mui.Grid item xs={12}>
              <Mui.Typography variant="h4">
                {dummyPatientLabels.gender}
              </Mui.Typography>
            </Mui.Grid>
            <Mui.Grid item xs={12} sx={styles.textGrid}>
              <Mui.Avatar
                variant="square"
                src={dummyPatientLabels.image}
                alt="Barcode Avatar"
                sx={styles.avatar}
              />
            </Mui.Grid>
          </Mui.Grid>
        );
      })}
    </Mui.Grid>
  );
};
export default PatientLabelPrint;

const styles = {
  title: {
    textAlign: "left",
    fontSize: "30px",
  },

  avatar: { width: "100px", height: "30px" },
  textGrid: { display: "flex", justifyContent: "flex-start" },
};

import * as Mui from "@mui/material";

import AppointmentSlipNHS from "../assets/icons/AppointmentSlipNHS.png";
import Barcode from "../assets/icons/Barcode.png";

const AppointmentSlipPrint = () => {
  return (
    <Mui.Grid container padding={5} spacing={2}>
      <Mui.Grid item container>
        <Mui.Grid item xs={12} sx={styles.textGrid}>
          <Mui.Typography variant="h4">DUMMY DATA</Mui.Typography>
        </Mui.Grid>
      </Mui.Grid>
      <Mui.Grid item container>
        <Mui.Grid item xs={12}>
          <Mui.Avatar
            variant="square"
            src={AppointmentSlipNHS}
            alt="Barcode Avatar"
            sx={styles.avatar}
          />
        </Mui.Grid>
      </Mui.Grid>
      <Mui.Grid item container>
        <Mui.Grid item xs={12} sx={styles.textGrid}>
          <Mui.Typography variant="h3">
            University Hospital of the West Indies
          </Mui.Typography>
        </Mui.Grid>
        <Mui.Grid item xs={12} sx={styles.textGrid}>
          <Mui.Typography variant="h3">GUM/SRH Service</Mui.Typography>
        </Mui.Grid>
      </Mui.Grid>
      <Mui.Grid item container>
        <Mui.Grid item xs={12} sx={styles.textGrid}>
          <Mui.Typography variant="h3">Archway Center</Mui.Typography>
        </Mui.Grid>
        <Mui.Grid item xs={12} sx={styles.textGrid}>
          <Mui.Typography variant="h4">F2FC AC three</Mui.Typography>
        </Mui.Grid>
        <Mui.Grid item xs={12} sx={styles.textGrid}>
          <Mui.Typography variant="h3">Zone 1</Mui.Typography>
        </Mui.Grid>
        <Mui.Grid item xs={12} sx={styles.textGrid}>
          <Mui.Typography variant="h3">Room A</Mui.Typography>
        </Mui.Grid>
      </Mui.Grid>
      <Mui.Grid item container>
        <Mui.Grid item xs={12} sx={styles.textGrid}>
          <Mui.Typography variant="h4">
            Patient Name : Riomed Test Tester
          </Mui.Typography>
        </Mui.Grid>
        <Mui.Grid item xs={12} sx={styles.textGrid}>
          <Mui.Typography variant="h4">
            Appointment 07/02/2023 10:15(24-hour clock format)
          </Mui.Typography>
        </Mui.Grid>
      </Mui.Grid>
      <Mui.Grid item container>
        <Mui.Grid item xs={12} sx={styles.textGrid}>
          <Mui.Avatar
            variant="square"
            src={Barcode}
            alt="Barcode Avatar"
            sx={styles.barcodeAvatar}
          />
        </Mui.Grid>
        <Mui.Grid item xs={12} justifyContent="flex-start">
          <Mui.Typography variant="h4">Barcode: 3475</Mui.Typography>
        </Mui.Grid>
      </Mui.Grid>
      <Mui.Grid item container>
        <Mui.Grid item xs={12} justifyContent="flex-start">
          <Mui.Typography variant="h4">
            Printed 12/8/2022 7:41 PM
          </Mui.Typography>
        </Mui.Grid>
      </Mui.Grid>
    </Mui.Grid>
  );
};

export default AppointmentSlipPrint;

const styles = {
  avatar: { width: "250px", height: "100px" },
  textGrid: {
    display: "flex",
    justifyContent: "flex-start",
  },
  barcodeAvatar: { width: "120px", height: "40px" },
};

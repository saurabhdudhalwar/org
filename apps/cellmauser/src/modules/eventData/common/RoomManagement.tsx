import * as Mui from "@mui/material";
import { useSelector } from "react-redux";

import CellmaLogo from "../../../assets/logos/CellmaLogo.png";
import t from "../assets/translationFiles/serviceAppointmentTranslation";

const RoomManagement = () => {
  return (
    <Mui.Grid
      container
      sx={{
        display: "flex",
        justifyContent: "center",

        height: "100vh",
      }}
    >
      <Mui.Grid
        container
        item
        spacing={3}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "flex-start",
          padding: "20px",
        }}
      >
        <Mui.Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Mui.Avatar
            variant="square"
            sx={{
              width: { xs: "90px", sm: "170px" },
              height: { xs: "30px", sm: "55.8px" },
              maxWidth: "170px",
            }}
            src={CellmaLogo}
            alt="Cellma Image Avatar"
          />
        </Mui.Grid>
        <Mui.Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Mui.Typography variant="h1" sx={{ color: "primary.main" }}>
            {t("calling")}
          </Mui.Typography>
        </Mui.Grid>
        <Mui.Grid
          item
          xs={3}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Mui.Typography variant="h2" sx={{ color: "primary.main" }}>
            12:10 PM
          </Mui.Typography>
        </Mui.Grid>
        <Mui.Grid
          item
          xs={3}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Mui.Typography variant="h2" sx={{ color: "primary.main" }}>
            Wed, Nov 23
          </Mui.Typography>
        </Mui.Grid>
        <Mui.Grid
          item
          container
          xs={9}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Mui.Grid item xs={4} sx={styles.tableHeader}>
            {t("patientName")}
          </Mui.Grid>
          <Mui.Grid item xs={4} sx={styles.tableHeader}>
            {t("room")}
          </Mui.Grid>
          <Mui.Grid item xs={4} sx={styles.tableHeader}>
            {t("hp")}
          </Mui.Grid>
          <Mui.Grid item xs={4} sx={styles.tableRow}>
            Rio Smith
          </Mui.Grid>
          <Mui.Grid item xs={4} sx={styles.tableRow}>
            Room A
          </Mui.Grid>
          <Mui.Grid item xs={4} sx={styles.tableRow}>
            VK Patil
          </Mui.Grid>
        </Mui.Grid>
      </Mui.Grid>
      <Mui.Grid
        item
        container
        xs={12}
        sx={{
          display: "flex",
          alignSelf: "flex-end",
          backgroundColor: "primary.main",
          p: "5px",
        }}
      >
        <Mui.Grid
          item
          xs={6}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            color: "common.white",
          }}
        >
          {t("thankYouForYourPatience")}
        </Mui.Grid>
        <Mui.Grid
          item
          xs={6}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Mui.Link
            href="https://www.riomed.com/"
            sx={{ color: "common.white" }}
            target="_blank"
          >
            www.riomed.com
          </Mui.Link>
        </Mui.Grid>
      </Mui.Grid>
    </Mui.Grid>
  );
};
export default RoomManagement;

const styles = {
  tableHeader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: 1,
    borderColor: "grey.400",
    height: "70px",
    backgroundColor: "secondary.dark",
    color: "primary.main",
    fontWeight: "500",
  },
  tableRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: 1,
    borderColor: "grey.400",
    height: "70px",
  },
};

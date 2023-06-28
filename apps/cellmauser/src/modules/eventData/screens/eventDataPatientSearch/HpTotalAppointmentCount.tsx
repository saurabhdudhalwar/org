import * as Mui from "@mui/material";
import { useSelector } from "react-redux";

import t from "../../assets/translationFiles/commonEventDataTranslation";

const AppointmentCountHeader = (props: any) => {
  return (
    <Mui.Grid item xs={2} sx={styles.typographyGrid}>
      <Mui.Tooltip
        title={props.tooltipTitle}
        placement="top"
        arrow
        sx={{ display: props.title ? "flex" : "none" }}
      >
        <Mui.Typography variant="h2" sx={styles.appointmentTypography}>
          {props.value}
        </Mui.Typography>
      </Mui.Tooltip>
    </Mui.Grid>
  );
};

const AppointmentCountData = (props: any) => {
  return (
    <Mui.Grid item xs={2} sx={styles.typographyGrid}>
      <Mui.Typography variant="h2" sx={styles.appointmentCountTypography}>
        {props.value}
      </Mui.Typography>
    </Mui.Grid>
  );
};

const HpTotalAppointmentCount = (props: any) => {
  return (
    <>
      <Mui.Grid item xs={12} sx={styles.gridItem}>
        <Mui.Typography variant="h2">
          {t("totalAppointmentCount")}
        </Mui.Typography>
      </Mui.Grid>
      <Mui.Grid container item>
        <Mui.Grid
          item
          container
          xs={8}
          sx={{
            bgcolor: "primary.main",
            border: 1,
            borderColor: "primary.main",
          }}
        >
          <AppointmentCountHeader tooltipTitle={t("scheduled")} value="S" />

          <AppointmentCountHeader tooltipTitle={t("attended")} value="A" />

          <AppointmentCountHeader tooltipTitle={t("waiting")} value="W" />

          <AppointmentCountHeader tooltipTitle={t("free")} value="F" />

          <AppointmentCountHeader tooltipTitle={t("cancelled")} value="C" />

          <AppointmentCountHeader tooltipTitle={t("didNotAttend")} value="D" />
        </Mui.Grid>
        <Mui.Grid
          item
          container
          xs={8}
          sx={{
            bgcolor: "common.white",
            border: 1,
            borderColor: "primary.main",
          }}
        >
          <AppointmentCountData
            value={props?.appointmentCount?.scheduled ?? "0"}
          />
          <AppointmentCountData
            value={props?.appointmentCount?.attended ?? "0"}
          />
          <AppointmentCountData
            value={props?.appointmentCount?.waiting ?? "0"}
          />
          <AppointmentCountData value={props?.appointmentCount?.free ?? "0"} />
          <AppointmentCountData
            value={props?.appointmentCount?.cancelled ?? "0"}
          />
          <AppointmentCountData value={props?.appointmentCount?.dna ?? "0"} />
        </Mui.Grid>
      </Mui.Grid>
    </>
  );
};

const styles = {
  gridItem: {
    display: "flex",
    justifyContent: "flex-start",
  },
  appointmentTypography: {
    color: "common.white",
  },
  typographyGrid: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  appointmentCountTypography: {
    color: "primary.main",
  },
};

export default HpTotalAppointmentCount;

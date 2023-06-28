import React from "react";

import * as Mui from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useSelector } from "react-redux";

import CellmaTable from "../../../common/CellmaTable";
import { showOverflowTooltip } from "../../../utils/GeneralUtils";
import { APPOINTMENT_HISTORY_ROWS } from "../assets/dummyData/ServiceBookAppointmentDummyData";
import t from "../assets/translationFiles/ServiceBookAppointmentTranslation";

const AppointmentHistoryPopup = () => {
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "id",
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 140,
      minWidth: 140,
      hide: true,
      renderCell: (params) => showOverflowTooltip(params),
    },
    {
      field: "col1",
      headerName: t("dateAndTime"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 160,
      minWidth: 160,
      renderCell: (params) => showOverflowTooltip(params),
    },
    {
      field: "col2",
      headerName: t("changedBy"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 175,
      renderCell: (params) => showOverflowTooltip(params),
    },
    {
      field: "col3",
      headerName: t("areaChanged"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 160,
      renderCell: (params) => showOverflowTooltip(params),
    },
    {
      field: "col4",
      headerName: t("previousValue"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 160,
      renderCell: (params) => showOverflowTooltip(params),
    },
    {
      field: "col5",
      headerName: t("newValue"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 170,
      renderCell: (params) => showOverflowTooltip(params),
    },
  ];
  return (
    <Mui.Grid container rowGap={2} sx={styles.containerStyle}>
      <Mui.Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
        <Mui.Typography variant="h2" sx={{ textDecoration: "underLine" }}>
          {t("appointmentHistory")}
        </Mui.Typography>
      </Mui.Grid>
      <Mui.Grid item xs={12}>
        <CellmaTable
          rows={APPOINTMENT_HISTORY_ROWS}
          columns={columns}
          noRecordsMessage=""
        />
      </Mui.Grid>
      <Mui.Grid item xs={12}>
        <Mui.Typography variant="h4">
          {t("appointmentCreated")} Trainer Himani
        </Mui.Typography>
      </Mui.Grid>
    </Mui.Grid>
  );
};

export default AppointmentHistoryPopup;

export const styles = {
  containerStyle: {
    backgroundColor: "common.white",
    height: "100vh",
    display: "flex",
    alignContent: "flex-start",
    padding: "20px",
  },
};

import React, { useState } from "react";

import {
  CloseRounded,
  DeleteOutline,
  DoneRounded,
  Edit,
} from "@mui/icons-material";
import * as Mui from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useSelector } from "react-redux";

import DurationModifierPopup from "./DurationModifierPopup";
import CellmaTable from "../../../../common/CellmaTable";
import * as Common from "../../../../common/CommonComponentsIndex";
import { ROWS } from "../../assets/dummyData/ServiceHPAppointmentsDummyData";
import t from "../../assets/translationFiles/serviceHPAppointmentTranslation";

const ServiceHPAppointmentsTable = (props: any) => {
  const columns: GridColDef[] = [
    {
      field: "col1",
      headerName: t("service"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 120,
      minWidth: 100,
      renderCell: (params) => {
        return (
          <Mui.Tooltip title={params?.value}>
            <Mui.Box>{params?.value}</Mui.Box>
          </Mui.Tooltip>
        );
      },
    },
    {
      field: "col2",
      headerName: t("hpName"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 120,
      minWidth: 100,
      renderCell: (params) => {
        return (
          <Common.CellmaLink
            label={params?.value}
            onClick={props?.openSelectHPPopup}
          >
            {params?.value}
          </Common.CellmaLink>
        );
      },
    },
    {
      field: "col3",
      headerName: t("team"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 120,
      minWidth: 90,
    },
    {
      field: "col4",
      headerName: t("specialty"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 120,
      minWidth: 90,
    },
    {
      field: "col5",
      headerName: t("clinicType"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 120,
      minWidth: 90,
      renderCell: (params) => {
        return (
          <Mui.Tooltip title={params?.value}>
            <Mui.Box>{params?.value}</Mui.Box>
          </Mui.Tooltip>
        );
      },
    },
    {
      field: "col6",
      headerName: t("clinicLocation"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 120,
      minWidth: 90,
      renderCell: (params) => {
        return (
          <Mui.Tooltip title={params?.value}>
            <Mui.Box>{params?.value}</Mui.Box>
          </Mui.Tooltip>
        );
      },
    },
    {
      field: "col7",
      headerName: t("zone"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 120,
      minWidth: 90,
    },
    {
      field: "col8",
      headerName: t("appointmentType"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 120,
      minWidth: 110,
    },
    {
      field: "col9",
      headerName: t("bookAppointmentPriorInDay"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 180,
      minWidth: 150,
    },
    {
      field: "col10",
      headerName: t("roomType"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 120,
      minWidth: 90,
      renderCell: (params) => {
        return (
          <Mui.Tooltip title={params?.value}>
            <Mui.Box>{params?.value}</Mui.Box>
          </Mui.Tooltip>
        );
      },
    },
    {
      field: "col11",
      headerName: t("duration"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 120,
      minWidth: 90,
    },
    {
      field: "col12",
      headerName: t("defaultDurationModifier"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 150,
      minWidth: 130,
      renderCell: (params) => {
        return (
          <Common.CellmaLink label="Set" onClick={props?.openDurationPopup}>
            Set
          </Common.CellmaLink>
        );
      },
    },
    {
      field: "col13",
      headerName: t("maxAppointment"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 120,
      minWidth: 110,
    },
    {
      field: "col14",
      headerName: t("startDate"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 120,
      minWidth: 100,
    },
    {
      field: "col15",
      headerName: t("endDate"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 120,
      minWidth: 100,
    },

    {
      field: "col16",
      headerName: t("occurrenceType"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 120,
      minWidth: 110,
      renderCell: (params) => {
        return (
          <Mui.Tooltip title={params?.value}>
            <Mui.Box>{params?.value}</Mui.Box>
          </Mui.Tooltip>
        );
      },
    },
    {
      field: "col17",
      headerName: t("occurrence"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 120,
      minWidth: 100,
    },
    {
      field: "col18",
      headerName: t("startTime"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 100,
      minWidth: 90,
    },
    {
      field: "col19",
      headerName: t("endTime"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 100,
      minWidth: 90,
    },
    {
      field: "col20",
      headerName: t("patientWeb"),
      headerClassName: "tableHeader",
      flex: 1,

      minWidth: 100,
    },
    {
      field: "col21",
      headerName: t("bookingInWorkingHours"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 120,
    },

    {
      field: "col22",
      headerName: "",
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 75,
      minWidth: 75,
      sortable: false,

      renderCell: (params) => {
        return (
          <Mui.IconButton
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
            aria-label="edit"
            title={t("edit")}
            onClick={props?.handleEdit}
          >
            <Edit sx={{ color: "success.main" }} />
          </Mui.IconButton>
        );
      },
    },
    {
      field: "col23",
      headerName: "",
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 65,
      minWidth: 65,
      sortable: false,

      renderCell: (params) => {
        return (
          <Mui.IconButton
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
            aria-label="Delete"
            title={t("delete")}
            onClick={props?.handleDelete}
          >
            <DeleteOutline sx={{ color: "warning.dark" }} />
          </Mui.IconButton>
        );
      },
    },
  ];

  return (
    <Mui.Grid>
      <CellmaTable
        rows={ROWS}
        columns={columns}
        searchField
        getRowId={(row: any) => row}
        noRecordsMessage=""
      />
    </Mui.Grid>
  );
};

export default ServiceHPAppointmentsTable;

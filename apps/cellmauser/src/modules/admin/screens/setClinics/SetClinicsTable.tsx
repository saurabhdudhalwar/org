import React, { useState } from "react";

import { Check, CloseRounded, DeleteOutline } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import * as Mui from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import DeleteClinicPopup from "./DeleteClinicPopup";
import SetFrequencyPopup from "./SetFrequencyPopup";
import CellmaTable from "../../../../common/CellmaTable";
import * as Common from "../../../../common/CommonComponentsIndex";
import * as dummyData from "../../assets/dummyData/setClinicsDummyData";
import t from "../../assets/translationFiles/setClinicsTranslation";

interface Props {
  handleEdit(): any;
}

const SetClinicsTable: React.FC<Props> = (props) => {
  const [isChangeFrequency, setIsChangeFrequency] = useState(false);
  const [isDeleteClinic, setIsDeleteClinic] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    {
      field: "service",
      headerName: t("service"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "clinicType",
      headerName: t("clinicType"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "location",
      headerName: t("location"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "patientWeb",
      headerName: t("patientWeb"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 60,
      maxWidth: 90,
      renderCell: (params) => {
        return (
          <Mui.Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <Check sx={{ color: "success.dark" }} />
          </Mui.Box>
        );
      },
    },
    {
      field: "protocolLocation",
      headerName: t("protocolLocation"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 60,
      maxWidth: 90,
      renderCell: (params) => {
        return (
          <Mui.Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <CloseRounded sx={{ color: "warning.dark" }} />
          </Mui.Box>
        );
      },
    },
    {
      field: "genderSpecific",
      headerName: t("genderSpecific"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 60,
      maxWidth: 90,
    },
    {
      field: "frequency",
      headerName: t("frequency"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 80,
      maxWidth: 90,
      renderCell: (params) => {
        return (
          <Mui.Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <Common.CellmaLink
              label={params?.value}
              onClick={() => setIsChangeFrequency(true)}
            >
              {params?.value}
            </Common.CellmaLink>
          </Mui.Box>
        );
      },
    },

    {
      field: "edit",
      headerName: "",
      headerClassName: "tableHeader",
      flex: 1,
      sortable: false,
      minWidth: 50,
      maxWidth: 60,
      renderCell: (params) => {
        return (
          <Mui.IconButton
            aria-label="edit"
            title={t("edit")}
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
            onClick={(e: any) => {
              e.stopPropagation(); // don't select this row after clicking
              props?.handleEdit();
            }}
          >
            <EditIcon sx={{ color: "success.dark" }} />
          </Mui.IconButton>
        );
      },
    },
    {
      field: "delete",
      headerName: "",
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 60,
      maxWidth: 70,
      sortable: false,
      renderCell: (params) => {
        return (
          <Mui.IconButton
            aria-label="delete"
            title={t("delete")}
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
            onClick={(e: any) => {
              e.stopPropagation(); // don't select this row after clicking
              setIsDeleteClinic(true);
            }}
          >
            <DeleteOutline sx={{ color: "warning.dark" }} />
          </Mui.IconButton>
        );
      },
    },
  ];
  return (
    <Mui.Grid container>
      <Mui.Grid item xs={12}>
        <CellmaTable
          searchField
          rows={dummyData?.ROWS}
          columns={columns}
          getRowId={(row: any) => row?.service}
          noRecordsMessage={t("noRecordsFound")}
        />
      </Mui.Grid>
      {isChangeFrequency && (
        <SetFrequencyPopup
          handleCancel={() => setIsChangeFrequency(false)}
          handleSave={() => setIsChangeFrequency(false)}
        />
      )}
      {isDeleteClinic && (
        <DeleteClinicPopup
          handleCancel={() => setIsDeleteClinic(false)}
          handleDelete={() => setIsDeleteClinic(false)}
        />
      )}
    </Mui.Grid>
  );
};

export default SetClinicsTable;

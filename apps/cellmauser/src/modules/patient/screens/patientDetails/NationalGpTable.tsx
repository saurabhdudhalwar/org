// This page is merged with create patient/GP List Table page and this page is for reference for react-team.
//  delete this page after integrating functionality

import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import * as Mui from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useSelector } from "react-redux";

import CellmaTable from "../../../../common/CellmaTable";
import translate from "../../assets/translationFiles/createPatientTranslation";

interface Props {
  iconHandler(event: any): unknown;
  addIconHandler(): unknown;
  nationalGpList: any;
  listCount: any;
}

const NationalGpTable: React.FC<Props> = (props) => {
  const { language } = useSelector((state: any) => state.language);
  const { isShowGpFullName } = useSelector((state: any) => state.patient);
  let rows;
  if (props.nationalGpList !== undefined) {
    rows = props.nationalGpList;
  }

  const columns: GridColDef[] = [
    {
      field: "apdId",
      headerName: translate("apdId", language),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 80,
      minWidth: 70,
      hide: true,
    },
    {
      field: "apdTitle",
      headerName: translate("title", language),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 60,
      minWidth: 70,
      hide: isShowGpFullName,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.apdTitle ? params?.row?.apdTitle : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "apdInitials",
      headerName: translate("initials", language),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 60,
      minWidth: 70,
      hide: isShowGpFullName,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.apdInitials ? params?.row?.apdInitials : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "apdSurname",
      headerName: translate("familyName", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 100,
      hide: isShowGpFullName,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.apdSurname ? params?.row?.apdSurname : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "apdFullname",
      headerName: translate("gpFullName", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 100,
      hide: !isShowGpFullName,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.apdFullname ? params?.row?.apdFullname : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "apdGpCode",
      headerName: translate("gpCode", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 50,
      maxWidth: 80,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.apdGpCode ? params?.row?.apdGpCode : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "apdPracticeName",
      headerName: translate("practiceName", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 60,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.apdPracticeName ? params?.row?.apdPracticeName : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "apdAddress2",
      headerName: translate("buildingNumber", language),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 180,
      minWidth: 170,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.apdAddress2 ? params?.row?.apdAddress2 : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "apdAddress4",
      headerName: translate("locality", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 110,
      maxWidth: 120,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.apdAddress4 ? params?.row?.apdAddress4 : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "apdAddress3",
      headerName: translate("town", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 100,
      maxWidth: 110,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.apdAddress3 ? params?.row?.apdAddress3 : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "apdPostcode",
      headerName: translate("postcode", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 80,
      maxWidth: 80,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.apdPostcode ? params?.row?.apdPostcode : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "apdCcg",
      headerName: translate("ccg", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 80,
      maxWidth: 80,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.apdCcg ? params?.row?.apdCcg : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "col11",
      headerName: translate("addGpToPatient", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 100,
      renderCell: () => {
        return (
          <Mui.IconButton
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
            aria-label="personAdd"
            title="Person add button"
            onClick={(event: any) => {
              event.stopPropagation(); // don't select this row after clicking
              props.iconHandler(event);
              props.addIconHandler();
            }}
          >
            <Mui.Tooltip title="Add GP to Patient" arrow placement="top">
              <PersonAddAlt1Icon sx={styles.personAddAlt1Icon} />
            </Mui.Tooltip>
          </Mui.IconButton>
        );
      },
    },
  ];

  return (
    <Mui.Box />
    // <CellmaTable
    //   getRowId={(row: any) => row.apdId}
    //   rows={rows}
    //   columns={columns}
    //   searchField
    //   listCount={props?.listCount}
    // />
  );
};

export default NationalGpTable;

const styles = {
  personAddAlt1Icon: {
    color: "primary.main",
  },
  editIcon: {
    color: "success.main",
  },
};

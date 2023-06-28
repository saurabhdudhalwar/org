import * as Mui from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { useSelector } from "react-redux";

import CellmaTable from "../../../../common/CellmaTable";
import * as Common from "../../../../common/CommonComponentsIndex";
import { getGender } from "../../../../utils/GeneralUtils";
import translate from "../../assets/translationFiles/patientSearchTranslation";

interface Props {
  duplicateCheckResponse: any;
  listCount: number;
}

const DuplicateCheckTable: React.FC<Props> = (props) => {
  const { language } = useSelector((state: any) => state.language);
  const patientsList = props?.duplicateCheckResponse;

  const columns: GridColDef[] = [
    {
      field: "patId",
      headerName: translate("patId", language),
      headerClassName: "tableHeader",
      flex: 1,
      hide: true,
      maxWidth: 100,
      minWidth: 100,
    },
    {
      field: "patTitle",
      headerName: translate("title", language),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 100,
      minWidth: 100,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.patTitle ? params?.row?.patTitle : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "patFirstname",
      headerName: translate("givenName", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 100,
      renderCell: (params: any) => (
        <Mui.Typography sx={{ textTransform: "capitalize" }}>
          {params?.row?.patFirstname ? params?.row?.patFirstname : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "patSurname",
      headerName: translate("familyName", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 100,
      renderCell: (params: any) => (
        <Mui.Typography sx={{ textTransform: "capitalize" }}>
          {params?.row?.patSurname ? params?.row?.patSurname : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "patMaidenName",
      headerName: translate("maidenName", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 120,
      renderCell: (params: any) => (
        <Mui.Typography sx={{ textTransform: "capitalize" }}>
          {params?.row?.patMaidenName ? params?.row?.patMaidenName : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "patSex",
      headerName: translate("sex", language),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 70,
      minWidth: 70,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.patSex ? getGender(params?.row?.patSex) : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "patDob",
      headerName: translate("born", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 100,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.patDob
            ? moment(params?.row?.patDob).format("DD-MM-YYYY")
            : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "patNhsRef",
      headerName: translate("nhsRef", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 100,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.patNhsRef ? params?.row?.patNhsRef : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "patAddId",
      headerName: translate("address", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 100,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.patAddId ? params?.row?.patAddId : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "patDod",
      headerName: translate("died", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 100,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.patDod !== null
            ? moment(params?.row?.patDod).format("DD-MM-YYYY")
            : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "search",
      headerName: translate("search", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 80,
      maxWidth: 80,
      sortable: false,
      renderCell: () => {
        return (
          <Common.CellmaLink
            label="Select"
            onClick={(e: any) => {
              e.stopPropagation(); // don't select this row after clicking
            }}
          >
            Select
          </Common.CellmaLink>
        );
      },
    },
  ];

  return (
    <CellmaTable
      rows={patientsList}
      columns={columns}
      getRowId={(row: any) => row.patId}
      searchField
      pageSize={10}
      noRecordsMessage={translate("noPatientFound", language)}
      listCount={props?.listCount}
    />
  );
};

export default DuplicateCheckTable;

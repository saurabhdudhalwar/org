// This page is merged with create patient/GP List Table page and this page is for reference for react-team.
//  delete this page after integrating functionality

import EditIcon from "@mui/icons-material/Edit";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { IconButton } from "@mui/material";
import * as Mui from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useSelector } from "react-redux";

import CellmaTable from "../../../../common/CellmaTable";
import translate from "../../assets/translationFiles/patientDetailsTranslation";

interface Props {
  iconHandler(event: any): unknown;
  addIconHandler(): unknown;
  editHandler(event: any, egpId: any): unknown;
  localGpList?: any;
  listCount?: any;
}

const LocalGpTable: React.FC<Props> = (props) => {
  const { language } = useSelector((state: any) => state.language);
  const { isShowGpFullName } = useSelector((state: any) => state.patient);
  let rows;
  if (props?.localGpList !== undefined) {
    rows = props?.localGpList;
  }

  // const columns: GridColDef[] = [
  //   {
  //     field: "egpId",
  //     headerName: translate("estId", language),
  //     headerClassName: "tableHeader",
  //     flex: 1,
  //     maxWidth: 80,
  //     minWidth: 70,
  //     hide: true,
  //   },
  //   {
  //     field: "egpTitle",
  //     headerName: translate("title", language),
  //     headerClassName: "tableHeader",
  //     flex: 1,
  //     maxWidth: 80,
  //     minWidth: 70,
  //   },
  //   {
  //     field: "egpInitials",
  //     headerName: translate("initials", language),
  //     headerClassName: "tableHeader",
  //     flex: 1,
  //     maxWidth: 80,
  //     minWidth: 70,
  //     hide: isShowGpFullName,
  //     renderCell: (params: any) => (
  //       <Mui.Typography>
  //         {params?.row?.egpInitials ? params?.row?.egpInitials : "-"}
  //       </Mui.Typography>
  //     ),
  //   },
  //   {
  //     field: "egpFirstName",
  //     headerName: translate("firstName", language),
  //     headerClassName: "tableHeader",
  //     flex: 1,
  //     minWidth: 100,
  //     hide: isShowGpFullName,
  //     renderCell: (params: any) => (
  //       <Mui.Typography>
  //         {params?.row?.egpFirstName ? params?.row?.egpFirstName : "-"}
  //       </Mui.Typography>
  //     ),
  //   },
  //   {
  //     field: "egpSurname",
  //     headerName: translate("familyName", language),
  //     headerClassName: "tableHeader",
  //     flex: 1,
  //     minWidth: 100,
  //     hide: isShowGpFullName,
  //     renderCell: (params: any) => (
  //       <Mui.Typography>
  //         {params?.row?.egpSurname ? params?.row?.egpSurname : "-"}
  //       </Mui.Typography>
  //     ),
  //   },
  //   {
  //     field: "egpFullname",
  //     headerName: translate("gpFullName", language),
  //     headerClassName: "tableHeader",
  //     flex: 1,
  //     minWidth: 200,
  //     hide: !isShowGpFullName,
  //     renderCell: (params: any) => (
  //       <Mui.Typography>
  //         {params?.row?.egpFullname ? params?.row?.egpFullname : "-"}
  //       </Mui.Typography>
  //     ),
  //   },
  //   {
  //     field: "egpGpCode",
  //     headerName: translate("gpCode", language),
  //     headerClassName: "tableHeader",
  //     flex: 1,
  //     minWidth: 100,
  //     renderCell: (params: any) => (
  //       <Mui.Typography>
  //         {params?.row?.egpGpCode ? params?.row?.egpGpCode : "-"}
  //       </Mui.Typography>
  //     ),
  //   },
  //   {
  //     field: "egpShow",
  //     headerName: translate("show", language),

  //     headerClassName: "tableHeader",
  //     flex: 1,
  //     maxWidth: 80,
  //     minWidth: 70,
  //     renderCell: (params: any) => (
  //       <Mui.Typography>
  //         {params?.row?.egpShow ? params?.row?.egpShow : "-"}
  //       </Mui.Typography>
  //     ),
  //   },
  //   {
  //     field: "egpCcg",
  //     headerName: translate("ccg", language),
  //     headerClassName: "tableHeader",
  //     flex: 1,
  //     minWidth: 100,
  //     renderCell: (params: any) => (
  //       <Mui.Typography>
  //         {params?.row?.egpCcg ? params?.row?.egpCcg : "-"}
  //       </Mui.Typography>
  //     ),
  //   },
  //   {
  //     field: "addAddress1",
  //     headerName: translate("practiceName", language),

  //     headerClassName: "tableHeader",
  //     flex: 1,
  //     minWidth: 100,
  //     renderCell: (params: any) => (
  //       <Mui.Typography>
  //         {params?.row?.addCompanyname ? params?.row?.addCompanyname : "-"}
  //       </Mui.Typography>
  //     ),
  //   },
  //   {
  //     field: "addAddress5",
  //     headerName: translate("postcode", language),
  //     headerClassName: "tableHeader",
  //     flex: 1,
  //     minWidth: 80,
  //     maxWidth: 80,
  //     renderCell: (params: any) => (
  //       <Mui.Typography>
  //         {params?.row?.addAddress5 ? params?.row?.addAddress5 : "-"}
  //       </Mui.Typography>
  //     ),
  //   },
  //   {
  //     field: "col10",
  //     headerName: translate("addGpToPatient", language),

  //     headerClassName: "tableHeader",
  //     flex: 1,
  //     minWidth: 100,
  //     renderCell: (params) => {
  //       return (
  //         <IconButton
  //           sx={{ display: "flex", justifyContent: "center", width: "100%" }}
  //           onClick={(event: any) => {
  //             event.stopPropagation(); // don't select this row after clicking
  //             props.iconHandler(event);
  //             props.addIconHandler();
  //           }}
  //         >
  //           <Mui.Tooltip title="Add GP to Patient" arrow placement="top">
  //             <PersonAddAlt1Icon sx={styles.personAddAlt1Icon} />
  //           </Mui.Tooltip>
  //         </IconButton>
  //       );
  //     },
  //   },
  //   {
  //     field: "col11",
  //     headerName: translate("edit", language),

  //     headerClassName: "tableHeader",
  //     flex: 1,
  //     minWidth: 50,
  //     maxWidth: 70,
  //     renderCell: (params) => {
  //       return (
  //         <IconButton
  //           sx={{ display: "flex", justifyContent: "center", width: "100%" }}
  //           onClick={(event: any) => {
  //             event.stopPropagation(); // don't select this row after clicking
  //             props.editHandler(event, params?.row?.egpId);
  //           }}
  //         >
  //           <Mui.Tooltip title="Edit" arrow placement="top">
  //             <EditIcon sx={styles.editIcon} />
  //           </Mui.Tooltip>
  //         </IconButton>
  //       );
  //     },
  //   },
  // ];

  return (
    <Mui.Box />
    // <CellmaTable
    //   getRowId={(row: any) => row.egpId}
    //   rows={rows}
    //   columns={columns}
    //   searchField
    //   listCount={props?.listCount}
    // />
  );
};

export default LocalGpTable;

const styles = {
  personAddAlt1Icon: {
    color: "primary.main",
  },
  editIcon: {
    color: "success.main",
  },
};

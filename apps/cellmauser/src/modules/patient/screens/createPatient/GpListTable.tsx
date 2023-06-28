import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import * as Mui from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";

import CellmaTable from "../../../../common/CellmaTable";
import dispatchSnackbar from "../../../../utils/ResponseCodeHandler";
import {
  useAddLocalGpToPatient,
  useAddNationalGpToPatient,
} from "../../api/useGP";
import { useGetGpDetails } from "../../api/usePatientGp";
import translate from "../../assets/translationFiles/createPatientTranslation";

interface Props {
  iconHandler(event: any): unknown;
  editHandler(event: any, egpId: any): unknown;
  gpList?: any;
  listCount?: any;
  nationalGpList?: any;
  nationalGpListCount?: any;
  isShowEditGpColumn?: any;
  addIconHandler(): unknown;
  listType: string;
}
const GpListTabel: React.FC<Props> = (props: any) => {
  const { language } = useSelector((state: any) => state.language);
  const { isShowGpFullName, patientId } = useSelector(
    (state: any) => state.patient
  );

  const dispatch = useDispatch();
  const { refetch: getPatientGpDetails } = useGetGpDetails(
    { patId: patientId },
    "editPatient"
  );
  const { mutate: addNationalGpToPatient } = useAddNationalGpToPatient();
  const { mutate: addLocallGpToPatient } = useAddLocalGpToPatient();

  let columns: GridColDef[] = [];
  if (props?.listType === "local Gp") {
    columns = [
      {
        field: "egpId",
        headerName: translate("estId", language),
        headerClassName: "tableHeader",
        flex: 1,
        maxWidth: 80,
        minWidth: 70,
        hide: true,
      },
      {
        field: "egpTitle",
        headerName: translate("title", language),
        headerClassName: "tableHeader",
        flex: 1,
        maxWidth: 80,
        minWidth: 70,
        hide: isShowGpFullName,
        renderCell: (params: any) => (
          <Mui.Typography>
            {params?.row?.egpTitle ? params?.row?.egpTitle : "-"}
          </Mui.Typography>
        ),
      },
      {
        field: "egpInitials",
        headerName: translate("initials", language),
        headerClassName: "tableHeader",
        flex: 1,
        maxWidth: 80,
        minWidth: 70,
        hide: isShowGpFullName,
        renderCell: (params: any) => (
          <Mui.Typography>
            {params?.row?.egpInitials ? params?.row?.egpInitials : "-"}
          </Mui.Typography>
        ),
      },
      {
        field: "egpFirstName",
        headerName: translate("firstName", language),
        headerClassName: "tableHeader",
        flex: 1,
        minWidth: 100,
        hide: isShowGpFullName,
        renderCell: (params: any) => (
          <Mui.Typography>
            {params?.row?.egpFirstName ? params?.row?.egpFirstName : "-"}
          </Mui.Typography>
        ),
      },
      {
        field: "egpSurname",
        headerName: translate("familyName", language),
        headerClassName: "tableHeader",
        flex: 1,
        minWidth: 100,
        hide: isShowGpFullName,
        renderCell: (params: any) => (
          <Mui.Typography>
            {params?.row?.egpSurname ? params?.row?.egpSurname : "-"}
          </Mui.Typography>
        ),
      },
      {
        field: "egpFullname",
        headerName: translate("gpFullName", language),
        headerClassName: "tableHeader",
        flex: 1,
        minWidth: 200,
        hide: !isShowGpFullName,
        renderCell: (params: any) => (
          <Mui.Typography>
            {params?.row?.egpFullname ? params?.row?.egpFullname : "-"}
          </Mui.Typography>
        ),
      },
      {
        field: "egpGpCode",
        headerName: translate("gpCode", language),

        headerClassName: "tableHeader",
        flex: 1,
        minWidth: 100,
        maxWidth: 120,
        renderCell: (params: any) => (
          <Mui.Typography>
            {params?.row?.egpGpCode ? params?.row?.egpGpCode : "-"}
          </Mui.Typography>
        ),
      },
      {
        field: "egpShow",
        headerName: translate("show", language),

        headerClassName: "tableHeader",
        flex: 1,
        maxWidth: 80,
        minWidth: 70,
        renderCell: (params: any) => (
          <Mui.Typography>
            {params?.row?.egpShow === 1 ? (
              <CheckIcon sx={{ color: "success.main" }} />
            ) : (
              <CloseIcon sx={{ color: "warning.dark" }} />
            )}
          </Mui.Typography>
        ),
      },
      {
        field: "addAddress1",
        headerName: translate("practiceName", language),

        headerClassName: "tableHeader",
        flex: 1,
        minWidth: 80,
        renderCell: (params: any) => (
          <Mui.Typography>
            {params?.row?.addCompanyname ? params?.row?.addCompanyname : "-"}
          </Mui.Typography>
        ),
      },
      {
        field: "addAddress5",
        headerName: translate("postcode", language),
        headerClassName: "tableHeader",
        flex: 1,
        minWidth: 100,
        maxWidth: 100,
        renderCell: (params: any) => (
          <Mui.Typography>
            {params?.row?.addAddress5 ? params?.row?.addAddress5 : "-"}
          </Mui.Typography>
        ),
      },
      {
        field: "col11",
        headerName: translate("addGpToPatient", language),
        headerClassName: "tableHeader",
        flex: 1,
        minWidth: 100,
        maxWidth: 140,
        sortable: false,
        renderCell: (params) => {
          return (
            <Mui.IconButton
              sx={{ display: "flex", justifyContent: "center", width: "100%" }}
              aria-label="personAdd"
              title={translate("addGpToPatient", language)}
              onClick={(event: any) => {
                // don't select this row after clicking
                addLocallGpToPatient(
                  {
                    patId: patientId,
                    egpId: params?.row?.egpId,
                  },
                  {
                    onSuccess: (response: any) => {
                      if (response?.status === 200) {
                        if (
                          response?.data?.validationCode ===
                          "patient.gp.add.success"
                        ) {
                          dispatchSnackbar(response, dispatch, language);
                          props.iconHandler();
                          props.addIconHandler();
                          getPatientGpDetails();
                        }
                      }
                    },
                  }
                );
                event.stopPropagation();
              }}
            >
              <PersonAddAlt1Icon sx={styles.personAddAlt1Icon} />
            </Mui.IconButton>
          );
        },
      },
      {
        field: "col12",
        headerName: translate("edit", language),
        headerClassName: "tableHeader",
        flex: 1,
        minWidth: 50,
        maxWidth: 70,
        hide: !props.isShowEditGpColumn,
        sortable: false,
        renderCell: (params) => {
          return (
            <Mui.IconButton
              sx={{ display: "flex", justifyContent: "center", width: "100%" }}
              aria-label="edit"
              title={translate("edit", language)}
              onClick={(event: any) => {
                event.stopPropagation(); // don't select this row after clicking

                props.editHandler(event, params?.row?.egpId);
              }}
            >
              <EditIcon sx={styles.editIcon} />
            </Mui.IconButton>
          );
        },
      },
    ];
  }

  if (props?.listType === "national Gp") {
    columns = [
      {
        field: "apdId",
        headerName: translate("estId", language),
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
        maxWidth: 80,
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
        maxWidth: 80,
        minWidth: 70,
        hide: isShowGpFullName,
        renderCell: (params: any) => (
          <Mui.Typography>
            {params?.row?.apdInitials ? params?.row?.apdInitials : "-"}
          </Mui.Typography>
        ),
      },
      {
        field: "apdFirstName",
        headerName: translate("firstName", language),
        headerClassName: "tableHeader",
        flex: 1,
        minWidth: 100,
        hide: isShowGpFullName,
        renderCell: (params: any) => (
          <Mui.Typography>
            {params?.row?.egpFirstName ? params?.row?.egpFirstName : "-"}
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
        minWidth: 200,
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
        minWidth: 100,
        maxWidth: 120,
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
        minWidth: 80,
        renderCell: (params: any) => (
          <Mui.Typography>
            {params?.row?.apdPracticeName ? params?.row?.apdPracticeName : "-"}
          </Mui.Typography>
        ),
      },

      {
        field: "apdPostcode",
        headerName: translate("postcode", language),
        headerClassName: "tableHeader",
        flex: 1,
        minWidth: 100,
        maxWidth: 100,
        renderCell: (params: any) => (
          <Mui.Typography>
            {params?.row?.apdPostcode ? params?.row?.apdPostcode : "-"}
          </Mui.Typography>
        ),
      },

      {
        field: "col12",
        headerName: translate("addGpToPatient", language),
        headerClassName: "tableHeader",
        flex: 1,
        minWidth: 100,
        maxWidth: 140,
        sortable: false,
        renderCell: (params) => {
          return (
            <Mui.IconButton
              sx={{ display: "flex", justifyContent: "center", width: "100%" }}
              aria-label="personAdd"
              onClick={(event: any) => {
                // don't select this row after clicking
                addNationalGpToPatient(
                  {
                    patId: patientId,
                    apdId: params.row.apdId,
                  },
                  {
                    onSuccess: (response: any) => {
                      if (response?.status === 200) {
                        if (
                          response?.data?.validationCode ===
                          "patient.gp.add.success"
                        ) {
                          dispatchSnackbar(response, dispatch, language);
                          props.iconHandler();
                          props.addIconHandler();
                          getPatientGpDetails();
                        }
                      }
                    },
                  }
                );
                event.stopPropagation();
              }}
            >
              <Mui.Tooltip
                title={translate("addGpToPatient", language)}
                arrow
                placement="top"
              >
                <PersonAddAlt1Icon sx={styles.personAddAlt1Icon} />
              </Mui.Tooltip>
            </Mui.IconButton>
          );
        },
      },
    ];
  }

  return (
    <>
      {props?.listType === "local Gp" && (
        <CellmaTable
          rows={props.gpList}
          getRowId={(row: any) => row?.egpId}
          columns={columns}
          searchField
          listCount={props?.listCount}
          noRecordsMessage={translate("noRecordsFound", language)}
        />
      )}
      {props?.listType === "national Gp" && (
        <CellmaTable
          rows={props.gpList}
          getRowId={(row: any) => row?.apdId}
          columns={columns}
          searchField
          listCount={props?.listCount}
          noRecordsMessage={translate("noRecordsFound", language)}
        />
      )}
    </>
  );
};

export default GpListTabel;

const styles = {
  personAddAlt1Icon: {
    color: "primary.main",
  },
  editIcon: {
    color: "success.main",
  },
};

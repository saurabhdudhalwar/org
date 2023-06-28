import { ReactNode, useEffect, useState } from "react";

import * as Mui from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";

import PatientDetailsAccordion from "./PatientDetailsAccordion";
import CellmaTable from "../../../../common/CellmaTable";
import * as Common from "../../../../common/CommonComponentsIndex";
import { getGender } from "../../../../utils/GeneralUtils";
import {
  useMutationSelectPatient,
  useSelectPatient,
} from "../../../authentication/api/useDeselectPatient";
import useGetPatientDisplay from "../../api/usePatientDisplay";
import { useUpdatePipIsPatient } from "../../api/usePIPDetails";
import translate from "../../assets/translationFiles/patientSearchTranslation";
import {
  setAddressId,
  setCliHidePatientRemindersPopup,
  setEstHidePipOnEmailMobilePage,
  setEstUseAddressLookup,
  setIsExistingPatient,
  setIsMultiplePatientSearched,
  setIsPatientSelected,
  setIsSinglePatientSearched,
  setPatientDod,
  setPatientId,
  setPatientInformation,
  setPipPatientId,
  setPreventDemographicsChange,
} from "../../store/PatientAction";
import ExportInterestedPartyList from "../createPatient/ExportInterestedPartyList";

interface Props {
  patientsList: any;
  listCount?: any;
  children?: ReactNode;
  onClick?: any;
  pipId?: any;
  refetchHandler?: any;
}

const PatientListTable: React.FC<Props> = (props) => {
  const [exportList, setExportList] = useState(false);
  const { language } = useSelector((state: any) => state.language);
  const { userRoles } = useSelector((state: any) => state.auth);
  const { cliBypassPatDetails, patientId, pageNumber } = useSelector(
    (state: any) => state.patient
  );
  const { data } = useGetPatientDisplay();
  const { setDrawerName } = useOutletContext<any>(); // <-- access context value
  const [isLegitimateRelationship, setIsLegitimateRelationship] = useState(
    !!data?.entity.nonCAAService ||
      !!data?.entity.showlegitimateRelationshippouup
  );
  const { mutate: updatePipIsPatient } = useUpdatePipIsPatient(
    props?.refetchHandler
  );
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const patientsList = props?.patientsList;
  const [patientDetails, setPatientDetails] = useState<any>({});
  const [open, setOpen] = useState(false);
  const { mutate: selectPatient } = useMutationSelectPatient();

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (patientsList.length === 1) {
      dispatch(setIsSinglePatientSearched(true));
      dispatch(setIsMultiplePatientSearched(false));
    } else {
      dispatch(setIsMultiplePatientSearched(true));
      dispatch(setIsSinglePatientSearched(false));
    }
    if (patientsList.length === 1) {
      setDrawerName("SinglePatientDrawer");
    } else if (patientsList.length > 1) {
      setDrawerName("MultiplePatientDrawer");
    }
  }, [patientsList.length, patientId]);

  const columns: GridColDef[] = [
    {
      field: "patMpiNumber",
      headerName: translate("mpiNumber", language),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 100,
      minWidth: 80,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.patMpiNumber ? params?.row?.patMpiNumber : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "patBarcode",
      headerName: translate("barcode", language),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 90,
      minWidth: 80,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.patBarcode ? params?.row?.patBarcode : "-"}
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
        <Mui.Typography>
          {params?.row?.patFirstname ? params?.row?.patFirstname : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "patSurname",
      headerName: translate("familyName", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 120,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.patSurname ? params?.row?.patSurname : "-"}
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
            ? moment(params?.row?.patDob).format("DD/MM/YYYY")
            : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "patHospitalRef",
      headerName: translate("hospitalRef", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 100,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.patHospitalRef ? params?.row?.patHospitalRef : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "patNhsRef",
      headerName: translate("nhsNumber", language),
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
      field: "patAddMobile",
      headerName: translate("mobile", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 100,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.patAddMobile ? params?.row?.patAddMobile : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "patAddAreaEliText",
      headerName: translate("area", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 100,
      renderCell: (params: any) => (
        <Mui.Tooltip
          title={
            params?.row?.patAddAreaEliText ? params?.row?.patAddAreaEliText : ""
          }
        >
          <Mui.Typography>
            {params?.row?.patAddAreaEliText
              ? params?.row?.patAddAreaEliText
              : "-"}
          </Mui.Typography>
        </Mui.Tooltip>
      ),
    },
    {
      field: "print",
      headerName: translate("print", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 100,
      hide: !data?.entity.documentManagementQuickAccess,
      renderCell: (params) => {
        return (
          <Common.CellmaLink
            label={translate("print", language)}
            onClick={(e: any) => {
              e.stopPropagation(); // don't select this row after clicking
            }}
          >
            {translate("print", language)}
          </Common.CellmaLink>
        );
      },
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
            ? moment(params?.row?.patDod).format("DD/MM/YYYY")
            : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "patShow",
      headerName: translate("merged", language),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 70,
      minWidth: 70,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.patShow !== null && params?.row?.patShow === 2
            ? "Yes"
            : "No"}
        </Mui.Typography>
      ),
    },
    {
      field: "col12",
      headerName: translate("select", language),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 60,
      minWidth: 60,
      sortable: false,
      renderCell: (params) => {
        return (
          <Common.CellmaLink
            label={translate("select", language)}
            type="submit"
            onClick={(e: any) => {
              if (props?.pipId !== undefined && props?.pipId !== "") {
                updatePipIsPatient({
                  pipId: parseInt(props?.pipId, 10),
                  patId: parseInt(params?.row?.patId, 10),
                });
                dispatch(setPipPatientId(params?.row?.patId));
              }
              if (props?.onClick) {
                props?.onClick();
              } else {
                e.stopPropagation(); // don't select this row after clicking
                setShowPopup(true);

                if (isLegitimateRelationship) {
                  setPatientDetails(params?.row);
                } else {
                  selectPatient(params.row.patId, {
                    onSuccess: (response: any) => {
                      if (response.status === 200) {
                        const responseCode = response?.data?.validationCode;
                        if (responseCode === "patient.selected.success") {
                          dispatch(setIsSinglePatientSearched(true));
                          dispatch(setIsMultiplePatientSearched(false));
                          dispatch(setIsPatientSelected(true));
                          dispatch(setIsExistingPatient(true));
                          dispatch(
                            setPatientInformation({
                              patTitle: params?.row?.patTitle,
                              patFirstname: params?.row?.patFirstname,
                              patSurname: params?.row?.patSurname,
                              patBarcode: params?.row?.patBarcode,
                              patDob: params?.row?.patDob,
                            })
                          );
                          dispatch(setPatientId(params?.row?.patId));
                          dispatch(setPatientDod(params?.row?.patDod));
                          dispatch(setIsPatientSelected(true));
                          dispatch(setAddressId(params?.row?.patAddId));
                          dispatch(
                            response?.data?.settings?.estUseAddressLookup === 1
                              ? setEstUseAddressLookup(1)
                              : setEstUseAddressLookup(0)
                          );
                          dispatch(
                            setEstHidePipOnEmailMobilePage(
                              response?.data?.settings
                                ?.hidePipOnEmailMobilePage === 1
                            )
                          );
                          dispatch(
                            setCliHidePatientRemindersPopup(
                              response?.data?.settings
                                ?.cliHidePatientRemindersPopup === 1
                            )
                          );
                          dispatch(
                            setPreventDemographicsChange(
                              response?.data?.settings
                                ?.estPreventDemographicsChange
                            )
                          );
                          if (props?.onClick) {
                            props?.onClick();
                          } else if (
                            cliBypassPatDetails === 1 &&
                            userRoles.includes("Registration")
                          ) {
                            navigate(
                              "/cellmaUser/patient/confirmPatientDetails",
                              {
                                state:
                                  response?.data?.informationMessages?.length >
                                    0 && response?.data?.informationMessages,
                              }
                            );
                          } else if (
                            cliBypassPatDetails === 1 &&
                            !userRoles.includes("Registration")
                          ) {
                            navigate("/cellmaUser/patient/contactTypeScreen");
                          } else if (
                            (cliBypassPatDetails === undefined ||
                              cliBypassPatDetails === 0) &&
                            !userRoles.includes("Registration")
                          ) {
                            navigate(
                              "/cellmaUser/patient/confirmPatientDetails",
                              {
                                state:
                                  response?.data?.informationMessages?.length >
                                    0 && response?.data?.informationMessages,
                              }
                            );
                          } else if (
                            (cliBypassPatDetails === undefined ||
                              cliBypassPatDetails === 0) &&
                            userRoles.includes("Registration")
                          ) {
                            navigate(
                              "/cellmaUser/patient/confirmPatientDetails",
                              {
                                state:
                                  response?.data?.informationMessages?.length >
                                    0 && response?.data?.informationMessages,
                              }
                            );
                          }
                        }
                      }
                    },
                  });
                }
              }
            }}
          >
            {translate("select", language)}
          </Common.CellmaLink>
        );
      },
    },
  ];

  // this Function Handel legitimate popup
  const handelClosePopup = () => {
    setShowPopup(false);
    dispatch(setIsPatientSelected(false));
  };

  return (
    <Mui.Grid container>
      <Mui.Grid item xs={12}>
        <CellmaTable
          rows={patientsList}
          columns={columns}
          getRowId={(row: any) => row?.patId}
          searchField
          noRecordsMessage={translate("noPatientFound", language)}
          listCount={props?.listCount}
          onRowClick={(params: any) => {
            if (props?.onClick) {
              props?.onClick();
            } else {
              setShowPopup(true);

              !isLegitimateRelationship &&
                selectPatient(params.row.patId, {
                  onSuccess: (response: any) => {
                    if (response.status === 200) {
                      const responseCode = response?.data?.validationCode;
                      if (responseCode === "patient.selected.success") {
                        dispatch(setIsSinglePatientSearched(true));
                        dispatch(setIsMultiplePatientSearched(false));
                        dispatch(setIsPatientSelected(true));
                        dispatch(setIsExistingPatient(true));
                        dispatch(
                          setPatientInformation({
                            patTitle: params?.row?.patTitle,
                            patFirstname: params?.row?.patFirstname,
                            patSurname: params?.row?.patSurname,
                            patBarcode: params?.row?.patBarcode,
                            patDob: params?.row?.patDob,
                          })
                        );
                        dispatch(setPatientId(params?.row?.patId));
                        dispatch(setPatientDod(params?.row?.patDod));
                        dispatch(setIsPatientSelected(true));
                        dispatch(setAddressId(params?.row?.patAddId));
                        dispatch(
                          response?.data?.settings?.estUseAddressLookup === 1
                            ? setEstUseAddressLookup(1)
                            : setEstUseAddressLookup(0)
                        );
                        dispatch(
                          setEstHidePipOnEmailMobilePage(
                            response?.data?.settings
                              ?.hidePipOnEmailMobilePage === 1
                          )
                        );
                        dispatch(
                          setCliHidePatientRemindersPopup(
                            response?.data?.settings
                              ?.cliHidePatientRemindersPopup === 1
                          )
                        );
                        dispatch(
                          setPreventDemographicsChange(
                            response?.data?.settings
                              ?.estPreventDemographicsChange
                          )
                        );
                        if (props?.onClick) {
                          props?.onClick();
                        } else if (
                          cliBypassPatDetails === 1 &&
                          userRoles.includes("Registration")
                        ) {
                          navigate(
                            "/cellmaUser/patient/confirmPatientDetails",
                            {
                              state:
                                response?.data?.informationMessages?.length >
                                  0 && response?.data?.informationMessages,
                            }
                          );
                        } else if (
                          cliBypassPatDetails === 1 &&
                          !userRoles.includes("Registration")
                        ) {
                          navigate("/cellmaUser/patient/contactTypeScreen");
                        } else if (
                          (cliBypassPatDetails === undefined ||
                            cliBypassPatDetails === 0) &&
                          !userRoles.includes("Registration")
                        ) {
                          navigate(
                            "/cellmaUser/patient/confirmPatientDetails",
                            {
                              state:
                                response?.data?.informationMessages?.length >
                                  0 && response?.data?.informationMessages,
                            }
                          );
                        } else if (
                          (cliBypassPatDetails === undefined ||
                            cliBypassPatDetails === 0) &&
                          userRoles.includes("Registration")
                        ) {
                          navigate(
                            "/cellmaUser/patient/confirmPatientDetails",
                            {
                              state:
                                response?.data?.informationMessages?.length >
                                  0 && response?.data?.informationMessages,
                            }
                          );
                        }
                      }
                    }
                  },
                });
            }
          }}
        />
      </Mui.Grid>
      <Mui.Grid item xs={12}>
        {props.children}
        {userRoles.includes("Administrator") ||
        userRoles.includes("Patient Administrator") ? (
          <Common.CellmaButton
            label={translate("exportList", language)}
            onClick={() => {
              if (props?.listCount > 1000) {
                setOpen(true);
              } else {
                setExportList(true);
              }
            }}
          />
        ) : null}
        {exportList ? (
          <ExportInterestedPartyList
            mode="patient list"
            columns={columns}
            rows={patientsList}
            listCount={props?.listCount}
            handleCancel={() => {
              setExportList(false);
              setOpen(false);
            }}
          />
        ) : null}
      </Mui.Grid>
      {patientsList.length === 1 && pageNumber === 1 && (
        <Mui.Grid item xs={12}>
          <PatientDetailsAccordion />
        </Mui.Grid>
      )}

      {isLegitimateRelationship && showPopup && (
        <Common.CellmaPopup
          title={translate("confirmLegitimate", language)}
          handleCancel={() => {
            setShowPopup(false);
          }}
        >
          <Mui.Grid container sx={{ padding: "10px" }} spacing={3}>
            <Mui.Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Mui.Typography variant="h4">
                {translate("confirmLegitimateText", language)}
              </Mui.Typography>
            </Mui.Grid>
            <Mui.Grid
              item
              container
              spacing={2}
              xs={12}
              sx={styles.popupContainer}
            >
              <Mui.Grid item>
                <Common.CellmaButton
                  label={translate("yes", language)}
                  type="submit"
                  onClick={() => {
                    if (props?.onClick) {
                      props?.onClick();
                    } else {
                      isLegitimateRelationship &&
                        selectPatient(patientDetails.patId, {
                          onSuccess: (response: any) => {
                            if (response.status === 200) {
                              const responseCode =
                                response?.data?.validationCode;
                              if (responseCode === "patient.selected.success") {
                                dispatch(setIsSinglePatientSearched(true));
                                dispatch(setIsMultiplePatientSearched(false));
                                dispatch(setIsPatientSelected(true));
                                dispatch(setIsExistingPatient(true));
                                dispatch(
                                  setPatientInformation({
                                    patTitle: patientDetails.patTitle,
                                    patFirstname: patientDetails.patFirstname,
                                    patSurname: patientDetails.patSurname,
                                    patBarcode: patientDetails.patBarcode,
                                    patDob: patientDetails.patDob,
                                  })
                                );
                                dispatch(setPatientId(patientDetails.patId));
                                dispatch(setPatientDod(patientDetails.patDod));
                                dispatch(setIsPatientSelected(true));
                                dispatch(setAddressId(patientDetails.patAddId));
                                dispatch(
                                  response?.data?.settings
                                    ?.estUseAddressLookup === 1
                                    ? setEstUseAddressLookup(1)
                                    : setEstUseAddressLookup(0)
                                );
                                dispatch(
                                  setEstHidePipOnEmailMobilePage(
                                    response?.data?.settings
                                      ?.hidePipOnEmailMobilePage === 1
                                  )
                                );
                                dispatch(
                                  setCliHidePatientRemindersPopup(
                                    response?.data?.settings
                                      ?.cliHidePatientRemindersPopup === 1
                                  )
                                );
                                dispatch(
                                  setPreventDemographicsChange(
                                    response?.data?.settings
                                      ?.estPreventDemographicsChange
                                  )
                                );
                                if (props?.onClick) {
                                  props?.onClick();
                                } else if (
                                  cliBypassPatDetails === 1 &&
                                  userRoles.includes("Registration")
                                ) {
                                  navigate(
                                    "/cellmaUser/patient/confirmPatientDetails",
                                    {
                                      state:
                                        response?.data?.informationMessages
                                          ?.length > 0 &&
                                        response?.data?.informationMessages,
                                    }
                                  );
                                } else if (
                                  cliBypassPatDetails === 1 &&
                                  !userRoles.includes("Registration")
                                ) {
                                  navigate(
                                    "/cellmaUser/patient/contactTypeScreen"
                                  );
                                } else if (
                                  (cliBypassPatDetails === undefined ||
                                    cliBypassPatDetails === 0) &&
                                  !userRoles.includes("Registration")
                                ) {
                                  navigate(
                                    "/cellmaUser/patient/confirmPatientDetails",
                                    {
                                      state:
                                        response?.data?.informationMessages
                                          ?.length > 0 &&
                                        response?.data?.informationMessages,
                                    }
                                  );
                                } else if (
                                  (cliBypassPatDetails === undefined ||
                                    cliBypassPatDetails === 0) &&
                                  userRoles.includes("Registration")
                                ) {
                                  navigate(
                                    "/cellmaUser/patient/confirmPatientDetails",
                                    {
                                      state:
                                        response?.data?.informationMessages
                                          ?.length > 0 &&
                                        response?.data?.informationMessages,
                                    }
                                  );
                                }
                              }
                            }
                          },
                        });
                    }
                  }}
                />
              </Mui.Grid>
              <Mui.Grid item>
                <Common.CellmaButton
                  label={translate("no", language)}
                  type="cancel"
                  onClick={handelClosePopup}
                />
              </Mui.Grid>
            </Mui.Grid>
          </Mui.Grid>
        </Common.CellmaPopup>
      )}
      {open && (
        <Common.CellmaPopup
          title={translate("exportRecords", language)}
          handleCancel={handleClose}
        >
          <Mui.Grid container sx={{ padding: "20px" }}>
            <Mui.Grid item>
              <Mui.Typography variant="h3">
                {translate("exportRecordMessage", language)}
              </Mui.Typography>
            </Mui.Grid>
            <Mui.Grid
              item
              container
              xs={12}
              spacing={2}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Mui.Grid item>
                <Common.CellmaButton
                  label={translate("ok", language)}
                  onClick={() => {
                    setExportList(true);
                  }}
                />
              </Mui.Grid>
              <Mui.Grid item>
                <Common.CellmaButton
                  onClick={handleClose}
                  label={translate("cancel", language)}
                />
              </Mui.Grid>
            </Mui.Grid>
          </Mui.Grid>
        </Common.CellmaPopup>
      )}
    </Mui.Grid>
  );
};

export default PatientListTable;

export const styles = {
  popupContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
};

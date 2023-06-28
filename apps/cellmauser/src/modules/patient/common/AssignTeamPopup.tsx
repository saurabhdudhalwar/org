import React, { useEffect, useState } from "react";

import { DeleteOutline, Edit } from "@mui/icons-material";
import * as Mui from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useFormik } from "formik";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

import PatientLinks from "./PatientLinks";
import useEstablishmentListItems from "../../../api/useEstablishmentListItems";
import CellmaTable from "../../../common/CellmaTable";
import * as Common from "../../../common/CommonComponentsIndex";
import { setSnackbar } from "../../../store/SnackbarAction";
import { showOverflowTooltip } from "../../../utils/GeneralUtils";
import {
  useAssignTeamDetails,
  useAssignTeamDisplay,
  useDeleteAssignTeamDetails,
} from "../api/useAssignTeamHp";
import translate from "../assets/translationFiles/commonPatientTranslation";
import {
  setActiveScreenName,
  setResetFormikForm,
} from "../store/PatientAction";

interface Props {
  handleClose: any;
  handleEdit: any;
  handleId: any;
}

const AssignTeamPopup: React.FC<Props> = (props: any) => {
  const [isDeleteAssignedTeamPopup, setIsDeleteAssignedTeamPopup] =
    useState(false);
  const [searchData, setSearchData] = useState<any>();
  const [phlId, setPhlId] = useState<any>();
  const dispatch = useDispatch();

  const { language } = useSelector((state: any) => state.language);
  const { patientId, resetFormikForm } = useSelector(
    (state: any) => state.patient
  );
  const { cliID } = useSelector((state: any) => state.auth);

  const { data: establishmentListItem } = useEstablishmentListItems([
    "hp Region",
    "speciality",
  ]);

  const { data: assignTeamDisplay } = useAssignTeamDisplay();
  const consultantList = assignTeamDisplay?.consultantList ?? [];
  const clinicList = assignTeamDisplay?.clinicList ?? [];

  const { mutate: deleteAssignTeamDetail } = useDeleteAssignTeamDetails();

  const {
    refetch: assignTeamRefetch,
    isLoading: assignTeamLoading,
    data: assignTeamDetails,
  } = useAssignTeamDetails({
    espId: searchData?.espId?.espId ? searchData?.espId?.espId : "",
    regionEliId: searchData?.regionEliId?.eliId
      ? searchData?.regionEliId?.eliId
      : "",
    patId: patientId,
    startDate: searchData?.startDate
      ? moment(searchData?.startDate).format("DD/MM/YYYY")
      : "",
    endDate: searchData?.endDate
      ? moment(searchData?.endDate).format("DD/MM/YYYY")
      : "",
    speciality: searchData?.speciality?.eliText
      ? searchData?.speciality?.eliText
      : "",
  });

  const assignTeamDetailsList: any = assignTeamDetails ?? [];

  const columns: GridColDef[] = [
    {
      field: "espId",
      headerName: translate("healthProfessionals", language),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 200,
      minWidth: 200,
      renderCell: (params: any) => (
        <>
          <Mui.Typography>
            {params?.row?.establishmentProfessional
              ? `${params?.row?.establishmentProfessional?.espTitle} ${
                  params?.row?.establishmentProfessional?.espFirstname
                } ${params?.row?.establishmentProfessional?.espSurname} ${
                  params?.row?.phlIsHpPrimaryContact === 1
                    ? "Key Contact"
                    : `(${params?.row?.establishmentProfessional?.espProfession})`
                }`
              : "-"}
          </Mui.Typography>
          {params?.row?.establishmentProfessional &&
            showOverflowTooltip(
              `${params?.row?.establishmentProfessional?.espTitle} ${params?.row?.establishmentProfessional?.espFirstname} ${params?.row?.establishmentProfessional?.espSurname}`
            )}
        </>
      ),
    },
    {
      field: "cliName",
      headerName: translate("service", language),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 200,
      minWidth: 200,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.cliName ? params?.row?.cliName : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "espSpecialty",
      headerName: translate("specialty", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 200,
      maxWidth: 200,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.establishmentProfessional?.espSpecialty
            ? params?.row?.establishmentProfessional?.espSpecialty
            : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "eliText",
      headerName: translate("team", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 150,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.establishmentListItem?.eliText
            ? params?.row?.establishmentListItem?.eliText
            : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "phlStartDate",
      headerName: translate("startDate", language),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 140,
      minWidth: 120,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.phlStartDate
            ? moment(params?.row?.phlStartDate).format("DD/MM/YYYY")
            : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "phlEndDate",
      headerName: translate("endDate", language),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 140,
      minWidth: 120,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.phlEndDate
            ? moment(params?.row?.phlEndDate).format("DD/MM/YYYY")
            : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "col6",
      headerName: "",
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 60,
      maxWidth: 70,
      sortable: false,
      renderCell: (params) => {
        return (
          <Mui.IconButton
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
            aria-label="edit"
            title={translate("edit", language)}
            onClick={(e: any) => {
              e.stopPropagation();
              props.handleEdit(); // don't select this row after clicking
              if (params?.row?.phlId !== undefined) {
                props.handleId(params?.row?.phlId);
              }
            }}
          >
            <Edit sx={{ color: "success.dark" }} />
          </Mui.IconButton>
        );
      },
    },
    {
      field: "col7",
      headerName: "",
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 60,
      maxWidth: 70,
      sortable: false,
      renderCell: (params) => {
        return (
          <Mui.IconButton
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
            aria-label="Delete"
            title={translate("delete", language)}
            onClick={(e: any) => {
              if (params?.row?.phlId !== undefined) {
                setPhlId(params?.row?.phlId);
              }
              e.stopPropagation();
              setIsDeleteAssignedTeamPopup(true); // don't select this row after clicking
            }}
          >
            <DeleteOutline sx={{ color: "warning.dark" }} />
          </Mui.IconButton>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(setActiveScreenName("AssignedTeam/HealthProfessionals"));
  }, [dispatch]);

  useEffect(() => {
    assignTeamRefetch();
  }, [assignTeamRefetch, searchData, patientId]);

  const assignTeamSearchForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      espId: "",
      regionEliId: "",
      patId: "",
      startDate: "",
      endDate: "",
      speciality: "",
      cliId: "",
    },
    validationSchema: yup.object().shape({
      startDate: yup
        .date()
        .nullable()
        .min(new Date("01/01/1900"), translate("invalidStartDateMsg", language))
        .max(new Date("12/31/2050"), translate("invalidStartDateMsg", language))
        .typeError(translate("invalidStartDateMsg", language)),
      endDate: yup
        .date()
        .nullable()
        .min(new Date("01/01/1900"), translate("invalidEndDateMsg", language))
        .test(
          "test",
          translate("invalidEndDate", language),
          (value: any, validationContext) => {
            const { parent } = validationContext;
            if (
              parent.startDate &&
              parent.endDate &&
              parent.startDate > parent.endDate
            )
              return false;
            return true;
          }
        )
        .max(new Date("12/31/2050"), translate("invalidEndDateMsg", language))
        .typeError(translate("invalidEndDateMsg", language)),
    }),
    onSubmit: (values: any) => {
      setSearchData(values);
    },
  });

  useEffect(() => {
    if (resetFormikForm === true) {
      assignTeamSearchForm.resetForm();
      assignTeamSearchForm.setFieldValue("startDate", null, false);
      assignTeamSearchForm.setFieldValue("endDate", null, false);
      if (clinicList !== undefined && cliID !== undefined) {
        clinicList?.filter((element: any) => {
          if (element?.cliId === Number(cliID)) {
            assignTeamSearchForm.setFieldValue("cliId", element);
          }
        });
      }
      dispatch(setResetFormikForm(false));
    }
  }, [resetFormikForm, clinicList, cliID]);

  useEffect(() => {
    if (clinicList !== undefined && cliID !== undefined) {
      clinicList?.filter((element: any) => {
        if (element?.cliId === Number(cliID)) {
          assignTeamSearchForm.setFieldValue("cliId", element);
        }
      });
    }
  }, [clinicList, cliID]);

  return (
    <>
      {assignTeamLoading && (
        <Mui.Backdrop sx={{ zIndex: "1500" }} open>
          <Mui.CircularProgress />
        </Mui.Backdrop>
      )}
      <Mui.Backdrop open>
        <Common.CellmaPopup
          title={translate("assignedTeamHPToPatient", language)}
          handleCancel={() => {
            dispatch(setActiveScreenName("DemographicScreen"));
            props.handleClose();
          }}
          fullScreen
        >
          <form onSubmit={assignTeamSearchForm.handleSubmit} noValidate>
            <Mui.Grid container spacing={2} sx={styles.popupGridContainer}>
              <Mui.Grid item xs={12}>
                <PatientLinks />
              </Mui.Grid>
              <Mui.Grid item xs={3}>
                <Common.CellmaAutoSelectField
                  freeSolo
                  clearable
                  label={translate("healthProfessionals", language)}
                  name="espId"
                  value={assignTeamSearchForm?.values?.espId ?? ""}
                  options={consultantList}
                  getOptionLabel={(option: any) =>
                    option?.espTitle
                      ? `${option?.espTitle} ${option?.espFirstname} ${option?.espSurname} (${option?.espProfession})`
                      : ""
                  }
                  onChange={(event: any, value: any) => {
                    assignTeamSearchForm.setFieldValue("espId", value);
                  }}
                  renderOption={(props: any, option: any) => (
                    <li {...props}>
                      {option?.espTitle} {option?.espFirstname}{" "}
                      {option?.espSurname} ({option?.espProfession})
                    </li>
                  )}
                />
              </Mui.Grid>
              <Mui.Grid item xs={3}>
                <Common.CellmaAutoSelectField
                  freeSolo
                  clearable
                  label={translate("team", language)}
                  name="regionEliId"
                  value={assignTeamSearchForm.values.regionEliId ?? ""}
                  options={establishmentListItem?.["hp Region"]}
                  onChange={(event: any, value: any) => {
                    assignTeamSearchForm.setFieldValue("regionEliId", value);
                  }}
                  getOptionLabel={(option: any) => option.eliText ?? ""}
                  renderOption={(props: any, option: any) => (
                    <li {...props}>{option.eliText}</li>
                  )}
                />
              </Mui.Grid>
              <Mui.Grid item xs={3}>
                <Common.CellmaAutoSelectField
                  label={translate("service", language)}
                  name="cliId"
                  options={clinicList}
                  value={assignTeamSearchForm.values.cliId ?? ""}
                  onChange={(event: any, value: any) => {
                    assignTeamSearchForm.setFieldValue("cliId", value);
                  }}
                  getOptionLabel={(option: any) => option.cliName ?? ""}
                  renderOption={(props: any, option: any) =>
                    option?.cliId === Number(cliID) && (
                      <li {...props}>{option.cliName}</li>
                    )
                  }
                />
              </Mui.Grid>
              <Mui.Grid item xs={3}>
                <Common.CellmaDatePicker
                  label={translate("startDate", language)}
                  name="startDate"
                  zIndex={1400}
                  maxDate={new Date("12/31/2050")}
                  value={assignTeamSearchForm.values.startDate}
                  onChange={(newDate: any) => {
                    assignTeamSearchForm.setFieldValue("startDate", newDate);
                    assignTeamSearchForm.setFieldTouched(
                      "startDate",
                      true,
                      false
                    );
                  }}
                  onBlur={assignTeamSearchForm.handleBlur}
                  error={assignTeamSearchForm.errors.startDate}
                />
              </Mui.Grid>
              <Mui.Grid item xs={3}>
                <Common.CellmaDatePicker
                  label={translate("endDate", language)}
                  name="endDate"
                  zIndex={1400}
                  maxDate={new Date("12/31/2050")}
                  value={assignTeamSearchForm.values.endDate}
                  onChange={(newDate: any) => {
                    assignTeamSearchForm.setFieldValue("endDate", newDate);
                    assignTeamSearchForm.setFieldTouched(
                      "endDate",
                      true,
                      false
                    );
                  }}
                  onBlur={assignTeamSearchForm.handleBlur}
                  error={assignTeamSearchForm.errors.endDate}
                />
              </Mui.Grid>
              <Mui.Grid item xs={3}>
                <Common.CellmaAutoSelectField
                  label={translate("specialty", language)}
                  name="speciality"
                  value={assignTeamSearchForm.values.speciality ?? ""}
                  options={establishmentListItem?.speciality}
                  getOptionLabel={(option: any) => option.eliText ?? ""}
                  onChange={(event: any, value: any) => {
                    assignTeamSearchForm.setFieldValue("speciality", value);
                  }}
                  renderOption={(props: any, option: any) => (
                    <li {...props}>{option.eliText}</li>
                  )}
                />
              </Mui.Grid>
              <Mui.Grid
                item
                xs={3}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Common.CellmaButton
                  label={translate("search", language)}
                  type="submit"
                />
              </Mui.Grid>

              <Mui.Grid item xs={12}>
                <CellmaTable
                  columns={columns}
                  rows={assignTeamDetailsList}
                  noRecordsMessage={translate("noRecordsFound", language)}
                  getRowId={(row: any) => row?.phlId}
                  listCount={assignTeamDetailsList?.length}
                />
              </Mui.Grid>
            </Mui.Grid>
          </form>
        </Common.CellmaPopup>
      </Mui.Backdrop>
      {isDeleteAssignedTeamPopup && (
        <Mui.Backdrop open>
          <Common.CellmaPopup
            title={translate("confirmation", language)}
            handleCancel={() => {
              setIsDeleteAssignedTeamPopup(false);
            }}
          >
            <Mui.Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center", margin: "20px" }}
            >
              <Mui.Typography variant="h4">
                {translate("deleteRecord", language)}
              </Mui.Typography>
            </Mui.Grid>
            <Mui.Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginX: "20px",
              }}
            >
              <Common.CellmaButton
                label={translate("ok", language)}
                onClick={() => {
                  deleteAssignTeamDetail(phlId, {
                    onSuccess: (response: any) => {
                      if (response.status === 200) {
                        setIsDeleteAssignedTeamPopup(false);
                        assignTeamRefetch();
                        dispatch(
                          setSnackbar(
                            true,
                            "success",
                            translate("recordDeletedSuccessfully", language),
                            4
                          )
                        );
                      }
                    },
                  });
                }}
              />
            </Mui.Grid>
          </Common.CellmaPopup>
        </Mui.Backdrop>
      )}
    </>
  );
};

export default AssignTeamPopup;

export const styles = {
  popupGridContainer: {
    paddingY: "15px",
    paddingX: "35px",
    display: "flex",
    alignItems: "center",
  },
};

import React, { useEffect, useState } from "react";

import * as Mui from "@mui/material";
import { useFormik } from "formik";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

import useEstablishmentListItems from "../../../api/useEstablishmentListItems";
import * as Common from "../../../common/CommonComponentsIndex";
import { isError } from "../../../utils/GeneralUtils";
import {
  useAssignTeamDetails,
  useAssignTeamDisplay,
  usePostAssignTeam,
  usePutAssignTeam,
} from "../api/useAssignTeamHp";
import translate from "../assets/translationFiles/commonPatientTranslation";
import { setResetFormikForm } from "../store/PatientAction";

interface Props {
  handleClose: any;
  handleSave: any;
  handleId: number;
}
const AssignTeamToPatientPopup: React.FC<Props> = (props: any) => {
  const [selectedHealthProfessional, setSelectedHealthProfessional] =
    useState(false);
  const [selectedTeam, setSelectedTeam] = useState(false);
  const { language } = useSelector((state: any) => state.language);
  const { patientId } = useSelector((state: any) => state.patient);
  const { estID } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  const { data: establishmentListItem } = useEstablishmentListItems([
    "hp Region",
  ]);

  const id: number = props?.handleId ?? 0;

  const { data: assignTeamDisplay } = useAssignTeamDisplay(id);
  const consultantList = assignTeamDisplay?.consultantList ?? [];
  const patientHpLinkingList = assignTeamDisplay?.patientHpLinkingList ?? "";
  const hpRegionList = establishmentListItem?.["hp Region"] ?? [];

  const { mutate: saveAssignTeamDetails } = usePostAssignTeam();

  const { mutate: updateAssignTeamDetails } = usePutAssignTeam();

  const { refetch: assignTeamRefetch } = useAssignTeamDetails({
    patId: patientId,
  });

  const onSaveDetailsSuccess = (response: any) => {
    if (response.status === 200) {
      props.handleClose();
      props.handleSave();
      assignTeamRefetch();
    }
  };

  const assignTeamAddForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      phlId: patientHpLinkingList?.phlId ? patientHpLinkingList?.phlId : "",
      phlEstId: estID,
      phlPatId: patientId,
      phlEspId: "",
      phlStartDate: patientHpLinkingList?.phlStartDate
        ? patientHpLinkingList?.phlStartDate
        : "",
      phlEndDate: patientHpLinkingList?.phlEndDate
        ? patientHpLinkingList?.phlEndDate
        : "",
      phlRegionEliId: "",
      phlIsHpPrimaryContact: false,
    },
    validationSchema: yup.object().shape({
      phlStartDate: yup
        .date()
        .nullable()
        .min(new Date("01/01/1900"), translate("invalidStartDateMsg", language))
        .max(new Date(), translate("futureDateAlert", language))
        .typeError(translate("invalidStartDateMsg", language)),
      phlEndDate: yup
        .date()
        .nullable()
        .min(new Date("01/01/1900"), translate("invalidEndDateMsg", language))
        .test(
          "test",
          translate("invalidEndDate", language),
          (value: any, validationContext) => {
            const { parent } = validationContext;
            if (
              parent.phlStartDate &&
              parent.phlEndDate &&
              parent.phlStartDate > parent.phlEndDate
            )
              return false;
            return true;
          }
        )
        .max(new Date("12/31/2050"), translate("invalidEndDateMsg", language))
        .typeError(translate("invalidEndDateMsg", language)),
    }),
    onSubmit: (values: any) => {
      const details = {
        phlId: values?.phlId ? values?.phlId : "",
        phlEstId: values?.phlEstId ? values?.phlEstId : "",
        phlPatId: values?.phlPatId ? values?.phlPatId : "",
        phlEspId: values?.phlEspId ? values?.phlEspId?.espId : "",
        phlStartDate: values?.phlStartDate
          ? moment(values?.phlStartDate).format("DD/MM/YYYY")
          : "",
        phlEndDate: values?.phlEndDate
          ? moment(values?.phlEndDate).format("DD/MM/YYYY")
          : "",
        phlRegionEliId: values?.phlRegionEliId
          ? values?.phlRegionEliId?.eliId
          : "",
        phlIsHpPrimaryContact:
          values?.phlIsHpPrimaryContact === true ? "1" : "0",
      };
      if (values.phlId === "") {
        saveAssignTeamDetails(details, {
          onSuccess: onSaveDetailsSuccess,
        });
      } else {
        updateAssignTeamDetails(details, {
          onSuccess: onSaveDetailsSuccess,
        });
      }
    },
  });

  useEffect(() => {
    if (
      consultantList !== undefined &&
      patientHpLinkingList?.phlEspId !== undefined
    ) {
      consultantList?.filter((element: any) => {
        if (element?.espId === patientHpLinkingList?.phlEspId) {
          assignTeamAddForm.setFieldValue("phlEspId", element);
          setSelectedTeam(true);
        }
      });
    }
    if (
      hpRegionList !== undefined &&
      patientHpLinkingList?.phlRegionEliId !== undefined
    ) {
      hpRegionList?.filter((element: any) => {
        if (element?.eliId === patientHpLinkingList?.phlRegionEliId) {
          assignTeamAddForm.setFieldValue("phlRegionEliId", element);
          setSelectedHealthProfessional(true);
        }
      });
    }
  }, [
    consultantList,
    patientHpLinkingList?.phlEspId,
    hpRegionList,
    patientHpLinkingList?.phlRegionEliId,
  ]);

  useEffect(() => {
    if (patientHpLinkingList?.phlIsHpPrimaryContact === 1) {
      assignTeamAddForm.setFieldValue("phlIsHpPrimaryContact", true);
    } else {
      assignTeamAddForm.setFieldValue("phlIsHpPrimaryContact", false);
    }
  }, [patientHpLinkingList?.phlIsHpPrimaryContact]);

  return (
    <Mui.Backdrop open>
      <Common.CellmaPopup
        title={translate("assignTeamHPToPatient", language)}
        handleCancel={() => {
          dispatch(setResetFormikForm(true));
          props.handleClose();
        }}
        fullScreen
      >
        <form onSubmit={assignTeamAddForm.handleSubmit} noValidate>
          <Mui.Grid container spacing={4} sx={styles.popupGridContainer}>
            <Mui.Grid item xs={3}>
              <Common.CellmaAutoSelectField
                freeSolo
                clearable={
                  !(
                    assignTeamAddForm?.values?.phlId !== "" &&
                    assignTeamAddForm?.values?.phlEspId !== ""
                  )
                }
                label={translate("healthProfessionals", language)}
                name="phlEspId"
                value={assignTeamAddForm?.values?.phlEspId ?? ""}
                disabled={selectedHealthProfessional}
                onChange={(event: any, value: any, reason: any) => {
                  assignTeamAddForm.setFieldValue("phlEspId", value);
                  if (
                    reason === "clear" &&
                    assignTeamAddForm?.values?.phlId === ""
                  ) {
                    setSelectedTeam(false);
                  } else if (
                    reason === "selectOption" &&
                    assignTeamAddForm?.values?.phlId === ""
                  ) {
                    setSelectedTeam(true);
                  }
                }}
                clearOnBlur
                options={consultantList}
                getOptionLabel={(option: any) =>
                  option?.espTitle
                    ? `${option?.espTitle} ${option?.espFirstname} ${option?.espSurname} (${option?.espProfession})`
                    : ""
                }
                renderOption={(props: any, option: any) => (
                  <li {...props}>
                    {option?.espTitle} {option?.espFirstname}{" "}
                    {option?.espSurname} ({option?.espProfession})
                  </li>
                )}
                onBlur={assignTeamAddForm.handleBlur}
                error={isError(assignTeamAddForm, "phlEspId")}
              />
            </Mui.Grid>
            <Mui.Grid item xs={3}>
              <Common.CellmaAutoSelectField
                freeSolo
                clearable={
                  !(
                    assignTeamAddForm?.values?.phlId !== "" &&
                    assignTeamAddForm?.values?.phlRegionEliId !== ""
                  )
                }
                clearOnBlur
                label={translate("team", language)}
                name="phlRegionEliId"
                value={assignTeamAddForm?.values?.phlRegionEliId ?? ""}
                options={hpRegionList}
                disabled={selectedTeam}
                onChange={(event: any, value: any, reason: any) => {
                  assignTeamAddForm.setFieldValue("phlRegionEliId", value);
                  if (
                    reason === "clear" &&
                    assignTeamAddForm?.values?.phlId === ""
                  ) {
                    setSelectedHealthProfessional(false);
                  } else if (
                    reason === "selectOption" &&
                    assignTeamAddForm?.values?.phlId === ""
                  ) {
                    setSelectedHealthProfessional(true);
                  }
                }}
                getOptionLabel={(team: any) => team.eliText ?? ""}
                renderOption={(props: any, option: any) => (
                  <li {...props}>{option.eliText}</li>
                )}
                onBlur={assignTeamAddForm.handleBlur}
                error={isError(assignTeamAddForm, "phlRegionEliId")}
              />
            </Mui.Grid>
            <Mui.Grid item xs={3}>
              <Common.CellmaDatePicker
                label={translate("startDate", language)}
                name="phlStartDate"
                zIndex={1400}
                maxDate={new Date()}
                value={assignTeamAddForm.values.phlStartDate}
                onChange={(newDate: any) => {
                  assignTeamAddForm.setFieldValue("phlStartDate", newDate);
                  assignTeamAddForm.setFieldTouched("startDate", true, false);
                }}
                onBlur={assignTeamAddForm.handleBlur}
                error={assignTeamAddForm.errors.phlStartDate}
              />
            </Mui.Grid>
            <Mui.Grid item xs={3}>
              <Common.CellmaDatePicker
                label={translate("endDate", language)}
                name="phlEndDate"
                zIndex={1400}
                maxDate={new Date("12/31/2050")}
                value={assignTeamAddForm.values.phlEndDate}
                onChange={(newDate: any) => {
                  assignTeamAddForm.setFieldValue("phlEndDate", newDate);
                  assignTeamAddForm.setFieldTouched("endDate", true, false);
                }}
                onBlur={assignTeamAddForm.handleBlur}
                error={assignTeamAddForm.errors.phlEndDate}
              />
            </Mui.Grid>
            <Mui.Grid item xs={3}>
              <Common.CellmaCheckbox
                label={translate("keyContact", language)}
                inputName="phlIsHpPrimaryContact"
                value={assignTeamAddForm.values.phlIsHpPrimaryContact}
                onHandleChange={(event: any, newValue: any) => {
                  assignTeamAddForm.setFieldValue(
                    "phlIsHpPrimaryContact",
                    newValue
                  );
                }}
                checked={assignTeamAddForm.values.phlIsHpPrimaryContact}
              />
            </Mui.Grid>
            <Mui.Grid item xs={3}>
              <Common.CellmaButton
                label={translate("save", language)}
                type="submit"
              />
            </Mui.Grid>
          </Mui.Grid>
        </form>
      </Common.CellmaPopup>
    </Mui.Backdrop>
  );
};

export default AssignTeamToPatientPopup;

export const styles = {
  popupGridContainer: {
    padding: "20px",
    display: "flex",
    alignItems: "center",
  },
};

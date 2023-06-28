// Page Name : "provisionalAppointment"
// Page Id : "c4eve12"

import { useEffect, useState } from "react";

import * as Mui from "@mui/material";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import * as yup from "yup";

import ProvisionalAppointmentTable from "./ProvisionalAppointmentTable";
import { ServiceAppointmentExportList } from "./ServiceAppointmentExportList";
import * as Common from "../../../../common/CommonComponentsIndex";
import { setIsUnderConstruction } from "../../../../store/CommonAction";
import { isError, openInNewTab } from "../../../../utils/GeneralUtils";
import * as validations from "../../../../utils/Validations";
import { formatNHSNumber } from "../../../../utils/Validations";
import * as dummyData from "../../assets/dummyData/ServiceAppointmentsDummyData";
import t from "../../assets/translationFiles/serviceAppointmentTranslation";
import { setActiveScreenName } from "../../store/EventDataAction";

const ProvisionalAppointment = () => {
  const [isExport, setIsExport] = useState(false);
  const [isProvisionalAppointmentSearch, setIsProvisionalAppointmentSearch] =
    useState(false);
  const { language } = useSelector((state: any) => state.language);
  const dispatch = useDispatch();

  const { setTitle, setIsLink, setSelectDateAndHp, setScreenName } =
    useOutletContext() as any;

  useEffect(() => {
    window.scrollTo(0, 0);
    setTitle(t("provisionalAppointments"));
    setIsLink(true);
    setScreenName("");
    setSelectDateAndHp(false);
    dispatch(setActiveScreenName("provisionalAppointments"));
  });

  useEffect(() => {
    if (Object.values(provisionalAppointmentForm?.errors).length !== 0) {
      provisionalAppointmentForm.validateForm(
        provisionalAppointmentForm?.values
      );
    }
  }, [language]);

  const provisionalAppointmentForm = useFormik({
    initialValues: {
      startDate: "",
      endDate: "",
      location: "",
      clinicType: "",
      patientBarcode: "",
      nhsRef: "",
      patientFamilyName: "",
      status: "",
      appointmentType: "",
      saveAsDefault: "",
    },
    validationSchema: yup.object().shape({
      startDate: yup
        .date()
        .nullable()
        .min(new Date("01/01/1900"), t("invalidDate"))
        .max(new Date("12/31/2050"), t("invalidDate"))
        .typeError(t("invalidDate")),
      endDate: yup
        .date()
        .nullable()
        .min(new Date("01/01/1900"), t("invalidDate"))
        .test("test", t("invalidEndDate"), (value: any, validationContext) => {
          const { parent } = validationContext;
          if (
            parent.startDate &&
            parent.endDate &&
            parent.startDate > parent.endDate
          )
            return false;
          return true;
        })
        .max(new Date("12/31/2050"), t("invalidDate"))
        .typeError(t("invalidDate")),
    }),
    onSubmit: (values: any) => {
      setIsProvisionalAppointmentSearch(true);
    },
  });

  return (
    <form onSubmit={provisionalAppointmentForm.handleSubmit} noValidate>
      <Mui.Grid container spacing={2}>
        <Mui.Grid item xs={2.4}>
          <Common.CellmaDatePicker
            label={t("startDate")}
            name="startDate"
            minDate={new Date("01/01/1900")}
            maxDate={new Date("12/31/2050")}
            value={provisionalAppointmentForm.values.startDate}
            onChange={(newDate: Date | null) => {
              provisionalAppointmentForm.setFieldValue("startDate", newDate);
              provisionalAppointmentForm.setFieldTouched(
                "startDate",
                true,
                false
              );
            }}
            onBlur={provisionalAppointmentForm.handleBlur}
            error={
              provisionalAppointmentForm.touched.startDate &&
              provisionalAppointmentForm.errors.startDate
                ? provisionalAppointmentForm.errors.startDate
                : ""
            }
          />
        </Mui.Grid>
        <Mui.Grid item xs={2.4}>
          <Common.CellmaDatePicker
            label={t("endDate")}
            name="endDate"
            minDate={new Date("01/01/1900")}
            maxDate={new Date("12/31/2050")}
            value={provisionalAppointmentForm.values.endDate}
            onChange={(newDate: Date | null) => {
              provisionalAppointmentForm.setFieldValue("endDate", newDate);
              provisionalAppointmentForm.setFieldTouched(
                "endDate",
                true,
                false
              );
            }}
            onBlur={provisionalAppointmentForm.handleBlur}
            error={
              provisionalAppointmentForm.touched.endDate &&
              provisionalAppointmentForm.errors.endDate
                ? provisionalAppointmentForm.errors.endDate
                : ""
            }
          />
        </Mui.Grid>
        <Mui.Grid item xs={2.4}>
          <Common.CellmaAutoSelectField
            label={t("location")}
            name="location"
            options={dummyData.LOCATIONS}
            value={provisionalAppointmentForm.values.location ?? ""}
            onChange={(event: any, value: any) => {
              provisionalAppointmentForm.setFieldValue("location", value);
            }}
            getOptionLabel={(location: any) => location.label ?? ""}
            renderOption={(props: any, location: any) => (
              <li {...props}>{location.label}</li>
            )}
          />
        </Mui.Grid>
        <Mui.Grid item xs={2.4}>
          <Common.CellmaAutoSelectField
            label={t("clinicType")}
            ariaLabel="clinicTypeProvisionalAppointment"
            name="clinicType"
            options={dummyData.CLINIC_TYPE}
            value={provisionalAppointmentForm.values.clinicType ?? ""}
            onChange={(event: any, value: any) => {
              provisionalAppointmentForm.setFieldValue("clinicType", value);
            }}
            getOptionLabel={(clinicType: any) => clinicType.label ?? ""}
            renderOption={(props: any, clinicType: any) => (
              <li {...props}>{clinicType.label}</li>
            )}
          />
        </Mui.Grid>
        <Mui.Grid item xs={2.4}>
          <Common.CellmaInputField
            label={t("patientBarcode")}
            name="patientBarcode"
            value={provisionalAppointmentForm.values.patientBarcode ?? ""}
            maxLength="8"
            onKeyPress={validations.allowOnlyDigit}
            onCopy={validations.restrictCutCopyPaste}
            onCut={validations.restrictCutCopyPaste}
            onPaste={validations.restrictCutCopyPaste}
            onHandleChange={provisionalAppointmentForm.handleChange}
          />
        </Mui.Grid>
        <Mui.Grid item xs={2.4}>
          <Common.CellmaInputField
            label={t("nhsRef")}
            name="nhsRef"
            maxLength="20"
            value={provisionalAppointmentForm.values.nhsRef ?? ""}
            onCopy={validations.restrictCutCopyPaste}
            onCut={validations.restrictCutCopyPaste}
            onPaste={validations.restrictCutCopyPaste}
            onKeyPress={validations.nhsNoValidation}
            onHandleChange={provisionalAppointmentForm.handleChange}
            onBlur={(event: any) => {
              provisionalAppointmentForm.setFieldValue(
                "nhsRef",
                formatNHSNumber(event.target.value)
              );
            }}
            errorText={isError(provisionalAppointmentForm, "nhsRef")}
          />
        </Mui.Grid>
        <Mui.Grid item xs={2.4}>
          <Common.CellmaInputField
            label={t("patientFamilyName")}
            name="patientFamilyName"
            style={{ textTransform: "capitalize" }}
            value={provisionalAppointmentForm.values.patientFamilyName ?? ""}
            onKeyPress={validations.allowCharHyphenApostropheSpace}
            onPaste={
              validations.restrictPasteEventForSpecialCharactersAndNumbers
            }
            onHandleChange={provisionalAppointmentForm.handleChange}
          />
        </Mui.Grid>
        <Mui.Grid item xs={2.4}>
          <Common.CellmaAutoSelectField
            label={t("status")}
            name="status"
            options={dummyData.PROVISIONAL_STATUS}
            value={provisionalAppointmentForm.values.status ?? ""}
            onChange={(event: any, value: any) => {
              provisionalAppointmentForm.setFieldValue("status", value);
            }}
            getOptionLabel={(status: any) => status.label ?? ""}
            renderOption={(props: any, status: any) => (
              <li {...props}>{status.label}</li>
            )}
          />
        </Mui.Grid>
        <Mui.Grid item xs={2.4}>
          <Common.CellmaAutoSelectField
            label={t("appointmentType")}
            ariaLabel="appointmentTypeProvisionalAppointment"
            name="appointmentType"
            options={dummyData.APPOINTMENTS_TYPE}
            value={provisionalAppointmentForm.values.appointmentType ?? ""}
            onChange={(event: any, value: any) => {
              provisionalAppointmentForm.setFieldValue(
                "appointmentType",
                value
              );
            }}
            getOptionLabel={(appointmentType: any) =>
              appointmentType.label ?? ""
            }
            renderOption={(props: any, appointmentType: any) => (
              <li {...props}>{appointmentType.label}</li>
            )}
          />
        </Mui.Grid>
        <Mui.Grid item xs={2.4} sx={{ display: "flex", alignItems: "center" }}>
          <Common.CellmaCheckbox
            label={t("saveAsDefault")}
            inputName="saveAsDefault"
            value={provisionalAppointmentForm.values.saveAsDefault}
            onHandleChange={provisionalAppointmentForm.handleChange}
          />
        </Mui.Grid>
        <Mui.Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "flex-end" }}
          gap={1}
        >
          <Common.CellmaButton label={t("search")} type="submit" />
          <Common.CellmaButton label={t("clear")} />
        </Mui.Grid>
        {isProvisionalAppointmentSearch && (
          <Mui.Grid item container xs={12}>
            <Mui.Grid item xs={12}>
              <ProvisionalAppointmentTable
                provisionalAppointmentRows={
                  dummyData.PROVISIONAL_APPOINTMENTS_ROWS
                }
              />
            </Mui.Grid>
            <Mui.Grid
              item
              xs={6}
              sx={{ display: "flex", justifyContent: "flex-start" }}
              gap={1}
            >
              <Common.CellmaButton
                label={t("print")}
                onClick={() =>
                  openInNewTab(
                    "/cellmaUser/printServiceAppointmentsTable",
                    "PrintServiceAppointmentsTable",
                    1200,
                    445
                  )
                }
              />
              <Common.CellmaButton
                label={t("exportList")}
                onClick={() => {
                  setIsExport(true);
                }}
              />
            </Mui.Grid>
            <Mui.Grid
              item
              xs={6}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Common.CellmaButton
                label={t("addToWorklist")}
                onClick={() => dispatch(setIsUnderConstruction(true))}
              />
            </Mui.Grid>
          </Mui.Grid>
        )}
        {isExport && (
          <Mui.Grid item xs={12}>
            <ServiceAppointmentExportList appointmentTypePopUp="provisionalAppointment"
              handleCancel={() => {
                setIsExport(false);
              }}
            />
          </Mui.Grid>
        )}
      </Mui.Grid>
    </form>
  );
};

export default ProvisionalAppointment;

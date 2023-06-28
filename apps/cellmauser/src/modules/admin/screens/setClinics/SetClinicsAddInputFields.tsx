import React, { useEffect } from "react";

import * as Mui from "@mui/material";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import * as yup from "yup";

import * as Common from "../../../../common/CommonComponentsIndex";
import { isError } from "../../../../utils/GeneralUtils";
import * as dummyData from "../../assets/dummyData/setClinicsDummyData";
import t from "../../assets/translationFiles/setClinicsTranslation";

interface Props {
  handleAdd(): any;
  handleSave(): any;
  mode: any;
}

const GridItem = (props: any) => {
  return (
    <Mui.Grid
      item
      xs={12}
      md={12 / 6}
      sx={{ display: "flex", alignItems: "center" }}
    >
      <Mui.Grid item xs={12}>
        {props.children}
      </Mui.Grid>
    </Mui.Grid>
  );
};

const SetClinicsAddInputFields: React.FC<Props> = (props) => {
  const { language } = useSelector((state: any) => state.language);

  const addClinicForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      service: "",
      specialty: "",
      clinicType: "",
      clinicLocation: "",
      team: "",
      patientWeb: "",
      protocolLocation: "",
      genderSpecific: "",
      frequency: "",
    },
    validationSchema: yup.object().shape({
      specialty: yup.object().nullable().required(t("specialtyRequired")),
      clinicType: yup.object().nullable().required(t("clinicTypeRequired")),
      clinicLocation: yup
        .object()
        .nullable()
        .required(t("clinicLocationRequired")),
      team: yup.object().nullable().required(t("teamRequired")),
    }),
    onSubmit: (values: any) => {
      if (props?.mode === "add") {
        props?.handleAdd();
      } else if (props?.mode === "edit") {
        props?.handleSave();
      }
    },
  });

  useEffect(() => {
    if (Object.values(addClinicForm?.errors).length !== 0) {
      window.scrollTo(0, 0);
      addClinicForm.validateForm(addClinicForm?.values);
    }
  }, [language]);

  return (
    <form onSubmit={addClinicForm.handleSubmit} noValidate>
      <Mui.Grid container item spacing={2}>
        <GridItem>
          <Common.CellmaAutoSelectField
            dummyData
            label={t("service")}
            name="service"
            ariaLabel="serviceAddInputField"
            options={dummyData.SERVICE}
            value={addClinicForm.values.service ?? ""}
            getOptionLabel={(occurrence: any) => occurrence.label ?? ""}
            renderOption={(props: any, occurrence: any) => (
              <li {...props}>{occurrence.label}</li>
            )}
            onChange={(event: any, value: any) => {
              addClinicForm.setFieldValue("service", value);
            }}
          />
        </GridItem>
        {/* if "Use Specialty and Region" setting is off then hide this specialty field */}
        <GridItem>
          <Common.CellmaAutoSelectField
            dummyData
            required
            label={t("specialty")}
            name="specialty"
            ariaLabel="specialtyAddInputField"
            options={dummyData.SPECIALTY}
            value={addClinicForm.values.specialty ?? ""}
            onChange={(event: any, value: any) => {
              addClinicForm.setFieldValue("specialty", value);
            }}
            getOptionLabel={(specialty: any) => specialty.label ?? ""}
            renderOption={(props: any, specialty: any) => (
              <li {...props}>{specialty.label}</li>
            )}
            onBlur={addClinicForm.handleBlur}
            error={isError(addClinicForm, "specialty")}
          />
        </GridItem>
        <GridItem>
          <Common.CellmaAutoSelectField
            dummyData
            required
            label={t("clinicType")}
            name="clinicType"
            ariaLabel="clinicTypeAddInputField"
            options={dummyData.CLINIC_TYPE}
            value={addClinicForm.values.clinicType ?? ""}
            onChange={(event: any, value: any) => {
              addClinicForm.setFieldValue("clinicType", value);
            }}
            getOptionLabel={(clinicType: any) => clinicType.label ?? ""}
            renderOption={(props: any, clinicType: any) => (
              <li {...props}>{clinicType.label}</li>
            )}
            onBlur={addClinicForm.handleBlur}
            error={isError(addClinicForm, "clinicType")}
          />
        </GridItem>
        <GridItem>
          <Common.CellmaAutoSelectField
            dummyData
            required
            label={t("clinicLocation")}
            name="clinicLocation"
            ariaLabel="clinicLocationAddInputField"
            options={dummyData.CLINIC_LOCATION}
            value={addClinicForm.values.clinicLocation ?? ""}
            onChange={(event: any, value: any) => {
              addClinicForm.setFieldValue("clinicLocation", value);
            }}
            getOptionLabel={(clinicLocation: any) => clinicLocation.label ?? ""}
            renderOption={(props: any, clinicLocation: any) => (
              <li {...props}>{clinicLocation.label}</li>
            )}
            onBlur={addClinicForm.handleBlur}
            error={isError(addClinicForm, "clinicLocation")}
          />
        </GridItem>

        {/* if "Use Specialty and Region" setting is off then hide this team field */}
        <GridItem>
          <Common.CellmaAutoSelectField
            dummyData
            required
            label={t("team")}
            name="team"
            ariaLabel="teamAddInputField"
            options={dummyData.TEAM}
            value={addClinicForm.values.team ?? ""}
            onChange={(event: any, value: any) => {
              addClinicForm.setFieldValue("team", value);
            }}
            getOptionLabel={(team: any) => team.label ?? ""}
            renderOption={(props: any, team: any) => (
              <li {...props}>{team.label}</li>
            )}
            onBlur={addClinicForm.handleBlur}
            error={isError(addClinicForm, "team")}
          />
        </GridItem>
        <GridItem>
          <Common.CellmaAutoSelectField
            dummyData
            label={t("patientWeb")}
            name="patientWeb"
            options={dummyData.PATIENT_WEB}
            getOptionLabel={(occurrence: any) => occurrence.label ?? "Yes"}
            renderOption={(props: any, occurrence: any) => (
              <li {...props}>{occurrence.label}</li>
            )}
            value={addClinicForm.values.patientWeb}
            onChange={(event: any, value: any) => {
              addClinicForm?.setFieldValue("patientWeb", value);
            }}
          />
        </GridItem>
        <GridItem>
          <Common.CellmaAutoSelectField
            dummyData
            label={t("protocolLocation")}
            name="protocolLocation"
            options={dummyData.PATIENT_WEB}
            getOptionLabel={(occurrence: any) => occurrence.label ?? "No"}
            renderOption={(props: any, occurrence: any) => (
              <li {...props}>{occurrence.label}</li>
            )}
            value={addClinicForm.values.protocolLocation}
            onChange={(event: any, value: any) => {
              addClinicForm?.setFieldValue("protocolLocation", value);
            }}
          />
        </GridItem>
        <GridItem>
          <Common.CellmaAutoSelectField
            dummyData
            label={t("genderSpecific")}
            name="genderSpecific"
            options={dummyData.PATIENT_WEB}
            getOptionLabel={(occurrence: any) => occurrence.label ?? ""}
            renderOption={(props: any, occurrence: any) => (
              <li {...props}>{occurrence.label}</li>
            )}
            value={addClinicForm.values.genderSpecific}
            onChange={(event: any, value: any) => {
              addClinicForm?.setFieldValue("genderSpecific", value);
            }}
          />
        </GridItem>
        <GridItem>
          <Common.CellmaAutoSelectField
            dummyData
            label={t("frequency")}
            name="frequency"
            options={dummyData.FREQUENCY}
            getOptionLabel={(occurrence: any) => occurrence.label ?? ""}
            renderOption={(props: any, occurrence: any) => (
              <li {...props}>{occurrence.label}</li>
            )}
            value={addClinicForm.values.frequency}
            onChange={(event: any, value: any) => {
              addClinicForm?.setFieldValue("frequency", value);
            }}
          />
        </GridItem>
        <Mui.Grid
          item
          xs={12}
          sx={{
            display: "flex",
            // alignItems: "flex-start",
            justifyContent: "flex-end",
          }}
        >
          {props?.mode === "add" && (
            <Common.CellmaButton label={t("add")} type="submit" />
          )}
          {props?.mode === "edit" && (
            <Common.CellmaButton label={t("save")} type="submit" />
          )}
        </Mui.Grid>
      </Mui.Grid>
    </form>
  );
};

export default SetClinicsAddInputFields;

import React, { useEffect } from "react";

import * as Mui from "@mui/material";
import { useFormik } from "formik";
import { useSelector } from "react-redux";

import * as Common from "../../../../common/CommonComponentsIndex";
import * as dummyData from "../../assets/dummyData/setClinicsDummyData";
import t from "../../assets/translationFiles/setClinicsTranslation";

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

const SetClinicsSearchInputFields = () => {
  const searchClinicForm = useFormik({
    initialValues: {
      service: "",
      specialty: "",
      clinicType: "",
      clinicLocation: "",
      team: "",
    },
    onSubmit: (values: any) => {},
  });
  return (
    <form onSubmit={searchClinicForm.handleSubmit} noValidate>
      <Mui.Grid container item spacing={2}>
        <GridItem>
          <Common.CellmaAutoSelectField
            dummyData
            label={t("service")}
            name="service"
            ariaLabel="serviceSearchInputField"
            options={dummyData.SERVICE}
            getOptionLabel={(occurrence: any) => occurrence.label ?? ""}
            renderOption={(props: any, occurrence: any) => (
              <li {...props}>{occurrence.label}</li>
            )}
            onChange={(event: any, value: any) => {
              searchClinicForm?.setFieldValue("service", value);
            }}
            onBlur={searchClinicForm.handleBlur}
          />
        </GridItem>

        {/* if "Use Specialty and Region" setting is off then hide this specialty field */}
        <GridItem>
          <Common.CellmaAutoSelectField
            dummyData
            label={t("specialty")}
            name="specialty"
            ariaLabel="specialtySearchInputField"
            options={dummyData.SPECIALTY}
            getOptionLabel={(occurrence: any) => occurrence.label ?? ""}
            renderOption={(props: any, occurrence: any) => (
              <li {...props}>{occurrence.label}</li>
            )}
            value={searchClinicForm.values.specialty}
            onChange={(event: any, value: any) => {
              searchClinicForm?.setFieldValue("specialty", value);
            }}
            onBlur={searchClinicForm.handleBlur}
          />
        </GridItem>
        <GridItem>
          <Common.CellmaAutoSelectField
            dummyData
            label={t("clinicType")}
            name="clinicType"
            ariaLabel="clinicTypeSearchInputField"
            options={dummyData.CLINIC_TYPE}
            getOptionLabel={(occurrence: any) => occurrence.label ?? ""}
            renderOption={(props: any, occurrence: any) => (
              <li {...props}>{occurrence.label}</li>
            )}
            value={searchClinicForm.values.clinicType}
            onChange={(event: any, value: any) => {
              searchClinicForm?.setFieldValue("clinicType", value);
            }}
            onBlur={searchClinicForm.handleBlur}
          />
        </GridItem>
        <GridItem>
          <Common.CellmaAutoSelectField
            dummyData
            label={t("clinicLocation")}
            name="clinicLocation"
            ariaLabel="clinicLocationSearchInputField"
            options={dummyData.CLINIC_LOCATION}
            getOptionLabel={(occurrence: any) => occurrence.label ?? ""}
            renderOption={(props: any, occurrence: any) => (
              <li {...props}>{occurrence.label}</li>
            )}
            value={searchClinicForm.values.clinicLocation}
            onChange={(event: any, value: any) => {
              searchClinicForm?.setFieldValue("clinicLocation", value);
            }}
            onBlur={searchClinicForm.handleBlur}
          />
        </GridItem>

        {/* if "Use Specialty and Region" setting is off then hide this team field */}
        <GridItem>
          <Common.CellmaAutoSelectField
            dummyData
            label={t("team")}
            name="team"
            ariaLabel="teamSearchInputField"
            options={dummyData.TEAM}
            getOptionLabel={(occurrence: any) => occurrence.label ?? ""}
            renderOption={(props: any, occurrence: any) => (
              <li {...props}>{occurrence.label}</li>
            )}
            value={searchClinicForm.values.team}
            onChange={(event: any, value: any) => {
              searchClinicForm?.setFieldValue("team", value);
            }}
            onBlur={searchClinicForm.handleBlur}
          />
        </GridItem>
        <GridItem>
          <Common.CellmaButton label={t("search")} type="submit" />
        </GridItem>
      </Mui.Grid>
    </form>
  );
};

export default SetClinicsSearchInputFields;

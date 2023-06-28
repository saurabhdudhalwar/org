import React, { useState } from "react";

import * as Mui from "@mui/material";
import { useSelector } from "react-redux";

import * as Common from "../../../../common/CommonComponentsIndex";
import t from "../../assets/translationFiles/ServiceBookAppointmentTranslation";

interface Props {
  handlerClinicLocation: any;
  handleHealthProfessional: any;
  handlerShowClinicLocation: any;
}
const ClinicLocationButton = (props: any) => {
  return (
    <Common.CellmaButton
      label={props.label}
      borderColor={props?.isSelected ? "primary.dark" : "common.white"}
      color={props?.isSelected ? "primary.dark" : "common.black"}
      backgroundColor={props?.isSelected ? "primary.light" : "grey.200"}
      borderRadius={5}
      onClick={() => {
        props.onClick();
      }}
    />
  );
};
const ClinicLocation: React.FC<Props> = (props: any) => {
  const [selectedClinicLocationButton, setSelectedClinicLocationButton] =
    useState("");

  return (
    <Mui.Grid container spacing={1}>
      <Mui.Grid item xs={12}>
        <Mui.Typography variant="h2">{t("clinicLocation")}</Mui.Typography>
      </Mui.Grid>
      <Mui.Grid item xs={12}>
        <Mui.Divider />
      </Mui.Grid>
      <Mui.Grid item sx={styles.ClinicLocationButton}>
        <ClinicLocationButton
          label="Archway Center"
          onClick={() => {
            setSelectedClinicLocationButton("archwayCenter");
            props.handlerClinicLocation();
            props.handleHealthProfessional();
            props.handlerShowClinicLocation();
          }}
          isSelected={selectedClinicLocationButton === "archwayCenter"}
        />
      </Mui.Grid>
      <Mui.Grid item sx={styles.ClinicLocationButton}>
        <ClinicLocationButton
          label="Buryfields Sexual Health Center"
          onClick={() => {
            setSelectedClinicLocationButton("buryfieldsSexualHealthCenter");
            props.handlerClinicLocation();
            props.handleHealthProfessional();
            props.handlerShowClinicLocation();
          }}
          isSelected={
            selectedClinicLocationButton === "buryfieldsSexualHealthCenter"
          }
        />
      </Mui.Grid>
      <Mui.Grid item sx={styles.ClinicLocationButton}>
        <ClinicLocationButton
          label="Earnsdale Sexual Health Center"
          onClick={() => {
            setSelectedClinicLocationButton("earnsdaleSexualHealthCenter");
            props.handlerClinicLocation();
            props.handleHealthProfessional();
            props.handlerShowClinicLocation();
          }}
          isSelected={
            selectedClinicLocationButton === "earnsdaleSexualHealthCenter"
          }
        />
      </Mui.Grid>
      <Mui.Grid item sx={styles.ClinicLocationButton}>
        <ClinicLocationButton
          label="All Locations"
          onClick={() => {
            setSelectedClinicLocationButton("AllLocations");
            props.handlerClinicLocation();
            props.handleHealthProfessional();
            props.handlerShowClinicLocation();
          }}
          isSelected={selectedClinicLocationButton === "AllLocations"}
        />
      </Mui.Grid>
    </Mui.Grid>
  );
};

export default ClinicLocation;

const styles = {
  ClinicLocationButton: {
    display: "flex",
    justifyContent: "center",
    marginRight: "15px",
  },
};

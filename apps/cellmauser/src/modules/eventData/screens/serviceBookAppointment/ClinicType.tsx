import React, { useState } from "react";

import * as Mui from "@mui/material";
import { useSelector } from "react-redux";

import * as Common from "../../../../common/CommonComponentsIndex";
import t from "../../assets/translationFiles/ServiceBookAppointmentTranslation";

interface Props {
  handlerClinicLocation: any;
  handlerClinicType: any;
  handlerShowClinicType: any;
}
const ClinicTypeButton = (props: any) => {
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

const ClinicType: React.FC<Props> = (props: any) => {
  const [selectedClinicTypeButton, setSelectedClinicTypeButton] = useState("");

  return (
    <Mui.Grid container spacing={1}>
      <Mui.Grid item xs={12}>
        <Mui.Typography variant="h2">{t("clinicType")}</Mui.Typography>
      </Mui.Grid>
      <Mui.Grid item xs={12}>
        <Mui.Divider />
      </Mui.Grid>
      <Mui.Grid container item>
        <Mui.Grid item sx={styles.ClinicTypeButton}>
          <ClinicTypeButton
            label="BME Outreach"
            onClick={() => {
              setSelectedClinicTypeButton("BMEOutreach");
              props.handlerClinicLocation();
              props.handlerClinicType();
              props.handlerShowClinicType();
            }}
            isSelected={selectedClinicTypeButton === "BMEOutreach"}
          />
        </Mui.Grid>
        <Mui.Grid item sx={styles.ClinicTypeButton}>
          <ClinicTypeButton
            label="CLASH Outreach"
            onClick={() => {
              setSelectedClinicTypeButton("CLASHOutreach");
              props.handlerClinicLocation();
              props.handlerClinicType();
              props.handlerShowClinicType();
            }}
            isSelected={selectedClinicTypeButton === "CLASHOutreach"}
          />
        </Mui.Grid>
        <Mui.Grid item sx={styles.ClinicTypeButton}>
          <ClinicTypeButton
            label="F2F"
            onClick={() => {
              setSelectedClinicTypeButton("F2F");
              props.handlerClinicLocation();
              props.handlerClinicType();
              props.handlerShowClinicType();
            }}
            isSelected={selectedClinicTypeButton === "F2F"}
          />
        </Mui.Grid>
        <Mui.Grid item sx={styles.ClinicTypeButton}>
          <ClinicTypeButton
            label="F2F Contraception"
            onClick={() => {
              setSelectedClinicTypeButton("F2FContraception");
              props.handlerClinicLocation();
              props.handlerClinicType();
              props.handlerShowClinicType();
            }}
            isSelected={selectedClinicTypeButton === "F2FContraception"}
          />
        </Mui.Grid>
        <Mui.Grid item sx={styles.ClinicTypeButton}>
          <ClinicTypeButton
            label="F2F Nurse"
            onClick={() => {
              setSelectedClinicTypeButton("F2FNurse");
              props.handlerClinicLocation();
              props.handlerClinicType();
              props.handlerShowClinicType();
            }}
            isSelected={selectedClinicTypeButton === "F2FNurse"}
          />
        </Mui.Grid>
        <Mui.Grid item sx={styles.ClinicTypeButton}>
          <ClinicTypeButton
            label="Fast Track Integrated"
            onClick={() => {
              setSelectedClinicTypeButton("fastTrackIntegrated");
              props.handlerClinicLocation();
              props.handlerClinicType();
              props.handlerShowClinicType();
            }}
            isSelected={selectedClinicTypeButton === "fastTrackIntegrated"}
          />
        </Mui.Grid>
        <Mui.Grid item sx={styles.ClinicTypeButton}>
          <ClinicTypeButton
            label="GUM CR"
            onClick={() => {
              setSelectedClinicTypeButton("GUMCR");
              props.handlerClinicLocation();
              props.handlerClinicType();
              props.handlerShowClinicType();
            }}
            isSelected={selectedClinicTypeButton === "GUMCR"}
          />
        </Mui.Grid>
        <Mui.Grid item sx={styles.ClinicTypeButton}>
          <ClinicTypeButton
            label="Nurse"
            onClick={() => {
              setSelectedClinicTypeButton("nurse");
              props.handlerClinicLocation();
              props.handlerClinicType();
              props.handlerShowClinicType();
            }}
            isSelected={selectedClinicTypeButton === "nurse"}
          />
        </Mui.Grid>
      </Mui.Grid>
    </Mui.Grid>
  );
};

export default ClinicType;

const styles = {
  ClinicTypeButton: {
    display: "flex",
    justifyContent: "center",
    marginRight: "15px",
  },
};

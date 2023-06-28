import React, { useState } from "react";

import * as Mui from "@mui/material";
import { useSelector } from "react-redux";

import * as Common from "../../../../common/CommonComponentsIndex";
import t from "../../assets/translationFiles/ServiceBookAppointmentTranslation";

interface Props {
  handlerNextButton: any;
}
const HealthProfessionalButton = (props: any) => {
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
const HealthProfessional: React.FC<Props> = (props: any) => {
  const [
    selectedHealthProfessionalButton,
    setSelectedHealthProfessionalButton,
  ] = useState("");
  return (
    <Mui.Grid container spacing={1}>
      <Mui.Grid item xs={12}>
        <Mui.Typography variant="h2">{t("healthProfessional")}</Mui.Typography>
      </Mui.Grid>
      <Mui.Grid item xs={12}>
        <Mui.Divider />
      </Mui.Grid>
      <Mui.Grid item sx={styles.HealthProfessionalButton}>
        <HealthProfessionalButton
          label="Dr. John"
          onClick={() => {
            setSelectedHealthProfessionalButton("drJohn");
            props.handlerNextButton();
          }}
          isSelected={selectedHealthProfessionalButton === "drJohn"}
        />
      </Mui.Grid>
      <Mui.Grid item sx={styles.HealthProfessionalButton}>
        <HealthProfessionalButton
          label="Dr. Emma Hooper"
          onClick={() => {
            setSelectedHealthProfessionalButton("emmaHooper");
            props.handlerNextButton();
          }}
          isSelected={selectedHealthProfessionalButton === "emmaHooper"}
        />
      </Mui.Grid>
      <Mui.Grid item sx={styles.HealthProfessionalButton}>
        <HealthProfessionalButton
          label="Dr. Laura Merwood"
          onClick={() => {
            setSelectedHealthProfessionalButton("lauraMerwood");
            props.handlerNextButton();
          }}
          isSelected={selectedHealthProfessionalButton === "lauraMerwood"}
        />
      </Mui.Grid>
      <Mui.Grid item sx={styles.HealthProfessionalButton}>
        <HealthProfessionalButton
          label="Dr. Sam Bealing"
          onClick={() => {
            setSelectedHealthProfessionalButton("samBealing");
            props.handlerNextButton();
          }}
          isSelected={selectedHealthProfessionalButton === "samBealing"}
        />
      </Mui.Grid>
      <Mui.Grid item sx={styles.HealthProfessionalButton}>
        <HealthProfessionalButton
          label="Dr. Sarie Cross"
          onClick={() => {
            setSelectedHealthProfessionalButton("sarieCross");
            props.handlerNextButton();
          }}
          isSelected={selectedHealthProfessionalButton === "sarieCross"}
        />
      </Mui.Grid>
      <Mui.Grid item sx={styles.HealthProfessionalButton}>
        <HealthProfessionalButton
          label="Dr. Louis Lee"
          onClick={() => {
            setSelectedHealthProfessionalButton("louisLee");
            props.handlerNextButton();
          }}
          isSelected={selectedHealthProfessionalButton === "louisLee"}
        />
      </Mui.Grid>
    </Mui.Grid>
  );
};

export default HealthProfessional;

const styles = {
  HealthProfessionalButton: {
    display: "flex",
    justifyContent: "center",
    marginRight: "15px",
  },
};

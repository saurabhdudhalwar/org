import React from "react";

import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

interface Props {
  defaultValue?: any;
  formLabel?: any;
  label1?: any;
  label2?: any;
  formControlLabel1?: any;
  formControlLabel2: any;
  value?: any;
  onChange?: any;
  name: any;
  hideLabel?: any;
  ariaLabel?: any;
}
const CellmaRadioButtonGroup: React.FC<Props> = (props: any) => {
  return (
    <FormControl sx={styles.radioButton}>
      <FormLabel
        id={props.formLabel}
        sx={{
          visibility: props.formLabel === "hideLabel" ? "hidden" : "visible",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Typography variant="h4">{props.formLabel}</Typography>
      </FormLabel>
      <RadioGroup
        defaultValue={props.defaultValue}
        onClick={props.onClick}
        sx={styles.radioButton}
        value={props.value}
        onChange={props.onChange}
        name={props.name}
      >
        <FormControlLabel
          data-testid={props?.label1}
          value={props.formControlLabel1}
          label={props.label1}
          control={<Radio />}
        />
        <FormControlLabel
          data-testid={props?.label2}
          value={props.formControlLabel2}
          label={props.label2}
          control={<Radio />}
        />
      </RadioGroup>
    </FormControl>
  );
};

const styles = {
  radioButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
};

export default CellmaRadioButtonGroup;

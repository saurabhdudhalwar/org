import {
  FocusEventHandler,
  MouseEventHandler,
  ReactEventHandler,
  useState,
} from "react";

import { FormControl, InputLabel, Stack, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface Props {
  size?: any;
  variant?: any;
  label?: string | undefined;
  required?: boolean | undefined;
  error?: any;
  id?: string | undefined;
  name?: string | undefined;
  ariaLabel?: any;
  value?: any;
  changeevent?: any;
  defaultValue?: any;
  blurevent?:
    | FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  disabled?: any;
  clickevent?: MouseEventHandler<HTMLDivElement> | undefined;
  onSelect?: ReactEventHandler<HTMLDivElement> | undefined;
  list?: any;
  options?: any;
  onBlur?: any; // correct ?
  maxLength?: any; // correct ?
}

export const CellmaSelectField: React.FC<Props> = (props) => {
  const [dropdownValue, setDropdownValue] = useState("");

  const handleChangeDropdown = (event: SelectChangeEvent) => {
    setDropdownValue(event.target.value);
  };

  return (
    <Stack>
      <FormControl
        fullWidth
        size={props.size ? props.size : "small"}
        variant={props.variant ? props.variant : "outlined"}
        aria-label={props?.label}
        sx={{
          borderRadius: "5px",
          backgroundColor: props?.disabled ? "grey.200" : "transparent",
        }}
      >
        <InputLabel
          htmlFor={props?.ariaLabel ? props?.ariaLabel : props?.label}
          required={props?.required}
          error={props.error}
          sx={{
            "& .MuiInputLabel-asterisk": {
              color: "error.dark",
            },
          }}
        >
          {props.label}
        </InputLabel>

        <Select
          id={props.id}
          name={props.name}
          data-testid={props?.label}
          size={props.size ? props.size : "small"}
          label={props.label}
          inputProps={{
            id: props.ariaLabel ? props.ariaLabel : props.label,
            // "data-testid": props?.label,
          }}
          value={props.value ? props.value : dropdownValue}
          onChange={
            props.changeevent ? props.changeevent : handleChangeDropdown
          }
          defaultValue={props.defaultValue}
          onBlur={props.blurevent}
          MenuProps={{
            PaperProps: {
              sx: {
                width: 200,
                maxHeight: 224,
              },
            },
          }}
          fullWidth
          error={!!props.error}
          disabled={!!props.disabled}
          onClick={props.clickevent}
          onSelect={props.onSelect}
          sx={{
            "& .MuiInputLabel-outlined.Mui-disabled": {
              color: props?.disabled && "common.black",
            },
            "& .MuiSvgIcon-root": {
              backgroundColor: "common.white",
              zIndex: "1000",
            },
          }}
        >
          {props.list
            ? props.list
            : props.options.map((option: any) => {
                return (
                  <MenuItem key={option.id} value={option.value}>
                    {option.value}
                  </MenuItem>
                );
              })}
        </Select>
      </FormControl>
      {props.error && (
        <Typography sx={{ fontSize: 12, color: "warning.dark" }}>
          {props.error}
        </Typography>
      )}
    </Stack>
  );
};

export default CellmaSelectField;

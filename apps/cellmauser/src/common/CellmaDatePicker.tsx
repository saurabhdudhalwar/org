import { FocusEventHandler, ReactNode } from "react";

import { Stack, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

interface Props {
  label?: ReactNode;
  value?: any;
  disabled?: any;
  inputFormat?: any;
  maxDate?: any;
  minDate?: any;
  mask?: any;
  onChange?: any;
  error?: any;
  size?: any;
  name?: string | undefined;
  onBlur?:
    | FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  required?: boolean | undefined;
  maxWidth?: any;
  sx?: any; // correct ?
  ariaLabel?: any;
  zIndex?: any;
}

const CellmaDatePicker: React.FC<Props> = (props) => {
  return (
    <Stack>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label={props.label}
          value={props.value}
          aria-label={props.ariaLabel ? props.ariaLabel : props.label}
          disabled={!!props.disabled}
          inputFormat={props.inputFormat ? props.inputFormat : "dd/MM/yyyy"}
          maxDate={props.maxDate}
          minDate={props.minDate}
          mask={props.mask ? props.mask : "__/__/____"}
          onChange={props.onChange}
          PopperProps={{
            style: { zIndex: props.zIndex ? props.zIndex : 1400 },
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              error={!!props.error}
              size={props.size ? props.size : "small"}
              autoComplete="off"
              name={props.name}
              onBlur={props.onBlur}
              data-testid={props?.label}
              required={props.required}
              sx={{
                "& .MuiInputLabel-outlined.Mui-disabled": {
                  color: props?.disabled && "common.black",
                },
                "& .MuiInputLabel-asterisk": {
                  color: "error.dark",
                },
                "& .MuiSvgIcon-root": {
                  backgroundColor: props?.disabled
                    ? "grey.200"
                    : "common.white",
                  zIndex: "1000",
                },
                maxWidth: props.maxWidth,
                backgroundColor: props.disabled ? "grey.200" : "transparent",
                borderRadius: "5px",
              }}
            />
          )}
        />
      </LocalizationProvider>
      {props.error && (
        <Typography sx={{ fontSize: 12, color: "warning.dark" }}>
          {props.error}
        </Typography>
      )}
    </Stack>
  );
};

export default CellmaDatePicker;

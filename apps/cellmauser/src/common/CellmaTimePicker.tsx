import {
  FocusEventHandler,
  KeyboardEventHandler,
  ReactNode,
  useState,
} from "react";

import { Stack, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

interface Props {
  label?: ReactNode;
  value?: any;
  onChange?: any;
  inputFormat?: any;
  mask?: any;
  name?: string | undefined;
  onKeyPress?: KeyboardEventHandler<HTMLDivElement> | undefined;
  error?: any;
  onBlur?:
    | FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  disabled?: boolean;
  ariaLabel?: any;
  required?: boolean | undefined;
  onClose?: any;
  zIndex?: any;
}

const CellmaTimePicker: React.FC<Props> = (props) => {
  return (
    <Stack>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
          label={props?.label}
          value={props?.value}
          onChange={props?.onChange}
          inputFormat={props.inputFormat ? props.inputFormat : "HH:mm"}
          disabled={!!props.disabled}
          mask={props?.mask ? props?.mask : "__:__"}
          ampm={false}
          PopperProps={{
            style: { zIndex: props.zIndex ? props.zIndex : 1200 },
          }}
          onClose={props?.onClose}
          renderInput={(params: any) => (
            <TextField
              aria-label={props?.ariaLabel ? props?.ariaLabel : props?.label}
              size="small"
              {...params}
              autoComplete="off"
              data-testid={props?.label}
              name={props?.name}
              onKeyPress={props?.onKeyPress}
              error={!!props.error}
              onBlur={props.onBlur}
              required={props.required}
              sx={{
                "& .MuiInputLabel-outlined.Mui-disabled": {
                  color: props?.disabled && "common.black",
                },
                "& .MuiInputLabel-asterisk": {
                  color: "warning.dark",
                },
                "& .MuiSvgIcon-root": {
                  backgroundColor: props?.disabled
                    ? "grey.200"
                    : "common.white",
                  zIndex: "1000",
                },

                borderRadius: "5px",
                backgroundColor: props.disabled ? "grey.200" : "transparent",
              }}
            />
          )}
        />
      </LocalizationProvider>
      {props.error && (
        <Typography sx={{ fontSize: 12, color: "warning.dark" }}>
          {props?.error}
        </Typography>
      )}
    </Stack>
  );
};

export default CellmaTimePicker;

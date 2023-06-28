import {
  FocusEventHandler,
  MouseEventHandler,
  ReactEventHandler,
  ReactNode,
} from "react";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
// import { useSelector } from "react-redux";

// import translate from "../assets/translationFiles/commonTranslation";

interface Props {
  size?: any;
  variant?: any;
  label: string | undefined;
  required?: boolean | undefined;
  error?: boolean | undefined;
  id?: string | undefined;
  name?: string | undefined;
  value?: any;
  onChange?:
    | ((event: SelectChangeEvent<any>, child: ReactNode) => void)
    | undefined;
  ariaLabel?: any;
  defaultValue?: any;
  onBlur?:
    | FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  disabled?: any;
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
  onSelect?: ReactEventHandler<HTMLDivElement> | undefined;
  list?: ReactNode;
  placeholder?: string; // correct
  translate: any;
}

export const CellmaSelectFieldWithCheckbox: React.FC<Props> = (props) => {

  return (
    <Stack>
      <FormControl
        fullWidth
        size={props.size ? props.size : "small"}
        variant={props.variant ? props.variant : "outlined"}
        aria-label={props.ariaLabel ? props.ariaLabel : props?.label}
      >
        <InputLabel
          htmlFor={props.ariaLabel ? props.ariaLabel : props?.label}
          required={props?.required}
          error={props.error}
          sx={{
            "& .MuiInputLabel-asterisk": {
              color: "warning.dark",
            },
          }}
        >
          {props.label}
        </InputLabel>

        <Select
          id={props.id}
          name={props.name}
          multiple
          value={props.value}
          onChange={props.onChange}
          renderValue={(selected) => selected.join(", ")}
          size={props.size ? props.size : "small"}
          label={props.label}
          inputProps={{ id: props.ariaLabel ? props.ariaLabel : props.label }}
          defaultValue={props.defaultValue}
          onBlur={props.onBlur}
          data-testid={props?.label}
          sx={{
            backgroundColor: props?.disabled && "grey.200",
            "& .MuiSvgIcon-root": {
              backgroundColor: "common.white",
              zIndex: "1000",
            },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                width: 200,
                maxHeight: 224,
                scrollbarWidth: "thin",
                "&::-webkit-scrollbar": {
                  width: "2px",
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "grey.100",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "grey.400",
                },
              },
            },
          }}
          error={!!props.error}
          disabled={!!props.disabled}
          onClick={props.onClick}
          onSelect={props.onSelect}
        >
          <MenuItem value="" disabled>
            {props.translate("pleaseSelect")}
          </MenuItem>
          {props.list}
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

export default CellmaSelectFieldWithCheckbox;
